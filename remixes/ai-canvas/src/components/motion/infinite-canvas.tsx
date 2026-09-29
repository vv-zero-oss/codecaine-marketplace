import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import type { MotionValue } from "motion/react"
import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"

import { buildScene, paint, WORLD_H, WORLD_W, type SceneItem } from "@/components/canvas/scene"
import { CanvasRenderer, rgb, type Piece } from "@/components/canvas/renderer"
import { cn } from "@/lib/utils"

export type CanvasDirection = "diagonal" | "left" | "right" | "up" | "down"
export type CanvasIntro = "warp" | "fade" | "none"

const DIRECTIONS: Record<CanvasDirection, [number, number]> = {
  diagonal: [-0.89, -0.45],
  left: [-1, 0],
  right: [1, 0],
  up: [0, -1],
  down: [0, 1],
}

/** How long one piece takes to blur in — the page's tile arrival. */
const ARRIVE = 0.6
/** The warp's opening speed, in design px/s, before it settles to `speed`. */
const WARP = 1600
/** Long enough that the drift clock wrapping round is never seen. */
const LOOP = 1000

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
const clamp01 = (v: number) => Math.min(1, Math.max(0, v))

function token(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}

/**
 * An endless canvas that never stops drifting: photos first, then the frames,
 * live pages and agents of a design tool built in behind them. It is the one
 * piece of the page that is always moving, so the motion is slow and linear
 * and the world is a repeating tile — however long it runs, it never breaks.
 *
 * Motion blur follows velocity: the warp at the start, a push from the page's
 * scroll, a drag of the canvas. At the drift's own pace there is none.
 *
 * The drift is a GSAP tween held in a ref, so the canvas editor's Motion switch
 * finds and stops it; WebGL only draws what the tween says.
 */
export function InfiniteCanvas({
  speed = 18,
  direction = "diagonal",
  motionBlur = 1,
  intro = "warp",
  dotGrid = true,
  focus = true,
  paused = false,
  wash,
  className,
}: {
  /** Drift, in design pixels a second. */
  speed?: number
  direction?: CanvasDirection
  /** Shutter: 0 turns motion blur off, 1 is the designed amount, 2 doubles it. */
  motionBlur?: number
  intro?: CanvasIntro
  dotGrid?: boolean
  /** Dim and soften whatever passes behind the headline. */
  focus?: boolean
  paused?: boolean
  /** 0 → 1: the canvas washes out to paper (the hero's hand-over). */
  wash?: MotionValue<number>
  className?: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // Held for the editor's Motion switch — see `components/motion.ts` in the
  // scaffold. The drift never ends; the intro and the warp do.
  const drift = useRef<gsap.core.Tween | null>(null)
  const arrival = useRef<gsap.core.Tween | null>(null)
  const warp = useRef<gsap.core.Tween | null>(null)
  const [failed, setFailed] = useState(false)
  const [held, setHeld] = useState(false)
  const { designing } = useCanvasDesignMode()

  useCanvasAction("Canvas drift", (next) => setHeld(!(next ?? held)), { on: !held, group: "Hero" })

  // Live props, read by the frame loop without restarting it.
  const live = useRef({ speed, direction, motionBlur, dotGrid, focus, wash })
  live.current = { speed, direction, motionBlur, dotGrid, focus, wash }

  // The clocks the tweens move.
  const clock = useRef({ drift: 0, arrival: 0, boost: 0 })

  useEffect(() => {
    const running = !(paused || held)
    if (running) drift.current?.play()
    else drift.current?.pause()
  }, [paused, held])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    let renderer: CanvasRenderer
    try {
      renderer = new CanvasRenderer(canvas)
    } catch (error) {
      console.warn("InfiniteCanvas: no WebGL2, showing the night background instead.", error)
      setFailed(true)
      return
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
    const skipIntro = designing || intro === "none" || reduce.matches
    const scene: SceneItem[] = buildScene()
    const textures: (WebGLTexture | null)[] = scene.map(() => null)
    /** When each texture landed (ms), so a late one still blurs in. */
    const landed: number[] = scene.map(() => 0)
    let disposed = false

    const c = clock.current
    c.drift = 0
    c.arrival = skipIntro ? 10 : 0
    c.boost = !skipIntro && intro === "warp" ? 1 : 0

    // Fonts first: the frames' names and pages are set in Inter.
    const ready = document.fonts?.load ? document.fonts.load("500 12px Inter").catch(() => {}) : Promise.resolve()
    ready.then(() => {
      scene.forEach((item, i) => {
        paint(item)
          .then((source) => {
            if (disposed) return
            textures[i] = renderer.upload(source)
            landed[i] = performance.now()
          })
          .catch((error) => console.warn("InfiniteCanvas: could not paint", item.kind, error))
      })
    })

    drift.current = gsap.to(c, { drift: LOOP, duration: LOOP, ease: "none", repeat: -1 })
    if (paused || held) drift.current.pause()
    if (!skipIntro) {
      arrival.current = gsap.to(c, { arrival: 10, duration: 10, ease: "none", delay: 0.1 })
      if (intro === "warp") warp.current = gsap.to(c, { boost: 0, duration: 2.2, ease: "expo.out", delay: 0.1 })
    }

    // Camera, in design px; velocities in design px/s, as the content moves.
    const cam = { x: WORLD_W * 0.37, y: WORLD_H * 0.21 }
    const drag = { active: false, vx: 0, vy: 0, lastX: 0, lastY: 0, lastT: 0 }
    let lastDrift = 0
    let lastScroll = window.scrollY
    let scrollV = 0

    const colors = {
      night: rgb(token("--night") || "#0d0d0d"),
      paper: rgb(token("--paper") || "#ffffff"),
    }

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return
      drag.active = true
      drag.vx = drag.vy = 0
      drag.lastX = e.clientX
      drag.lastY = e.clientY
      drag.lastT = performance.now()
      canvas.setPointerCapture(e.pointerId)
      canvas.dataset.dragging = ""
    }
    const onMove = (e: PointerEvent) => {
      if (!drag.active) return
      const now = performance.now()
      const dt = Math.max(1, now - drag.lastT) / 1000
      const unit = unitFor(canvas.clientWidth)
      const dx = (e.clientX - drag.lastX) / unit
      const dy = (e.clientY - drag.lastY) / unit
      cam.x -= dx
      cam.y -= dy
      drag.vx = drag.vx * 0.6 + (dx / dt) * 0.4
      drag.vy = drag.vy * 0.6 + (dy / dt) * 0.4
      drag.lastX = e.clientX
      drag.lastY = e.clientY
      drag.lastT = now
    }
    const onUp = () => {
      drag.active = false
      delete canvas.dataset.dragging
    }
    canvas.addEventListener("pointerdown", onDown)
    canvas.addEventListener("pointermove", onMove)
    canvas.addEventListener("pointerup", onUp)
    canvas.addEventListener("pointercancel", onUp)

    const pieces: Piece[] = []

    const tick = (_time: number, deltaMs: number) => {
      if (disposed) return
      // `raw` for rates (a slow frame is not a fast canvas), `dt` for steps.
      const raw = deltaMs / 1000
      const dt = Math.min(0.05, raw)
      if (dt <= 0) return
      const p = live.current
      const reduced = reduce.matches
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      const vw = canvas.clientWidth
      const vh = canvas.clientHeight
      if (!vw || !vh) return
      renderer.resize(Math.round(vw * dpr), Math.round(vh * dpr))
      const unit = unitFor(vw)

      // Drift: how far the held tween's clock moved this frame. Paused, it
      // does not move, and neither does the canvas.
      let dClock = c.drift - lastDrift
      if (dClock < 0) dClock += LOOP
      lastDrift = c.drift
      const [dx, dy] = DIRECTIONS[p.direction] ?? DIRECTIONS.diagonal
      const cruise = reduced ? 0 : p.speed
      const boost = reduced ? 0 : c.boost * WARP
      const rate = dClock / Math.max(raw, 1e-4)
      let vx = dx * (cruise * rate + boost)
      let vy = dy * (cruise * rate + boost)

      // The page's scroll pushes the canvas the way the page is going.
      const sy = window.scrollY
      const inView = sy < vh * 2.5
      const scrolled = inView ? sy - lastScroll : 0
      lastScroll = sy
      scrollV += (scrolled / Math.max(raw, 1e-4) - scrollV) * 0.25
      if (!reduced) vy -= (scrollV * 0.45) / unit

      // The camera moves against the content.
      cam.x -= vx * dt
      cam.y -= vy * dt
      // A drag moves the camera itself (in the pointer handlers); released,
      // it coasts, then hands back to the drift.
      if (!drag.active) {
        const decay = Math.exp(-dt * 3.2)
        drag.vx *= decay
        drag.vy *= decay
        cam.x -= drag.vx * dt
        cam.y -= drag.vy * dt
      }
      // Either way, it is motion, and it blurs.
      vx += drag.vx
      vy += drag.vy

      // Shutter: the smear is the distance travelled in ~1.6 frames.
      const shutter = reduced ? 0 : (p.motionBlur * 1.6) / 60
      let bx = vx * shutter * unit * dpr
      let by = vy * shutter * unit * dpr
      const len = Math.hypot(bx, by)
      const cap = 110 * dpr
      if (len > cap) {
        bx *= cap / len
        by *= cap / len
      }

      const washed = clamp01(p.wash?.get() ?? 0)
      const bg = clamp01(washed * 1.6)
      const background: [number, number, number] = [
        colors.night[0] + (colors.paper[0] - colors.night[0]) * bg,
        colors.night[1] + (colors.paper[1] - colors.night[1]) * bg,
        colors.night[2] + (colors.paper[2] - colors.night[2]) * bg,
      ]

      // The pieces, wrapped: each one drawn wherever its tile repeats on screen.
      pieces.length = 0
      const now = performance.now()
      const W = WORLD_W * unit
      const H = WORLD_H * unit
      const margin = 480 * unit
      const camX = cam.x * unit
      const camY = cam.y * unit
      for (let i = 0; i < scene.length; i++) {
        const texture = textures[i]
        if (!texture) continue
        const item = scene[i]
        const scheduled = clamp01((c.arrival - item.delay) / ARRIVE)
        const late = skipIntro ? 1 : clamp01((now - landed[i]) / 1000 / ARRIVE)
        const alpha = easeOut(Math.min(scheduled, late))
        if (alpha <= 0) continue
        const bias = reduced ? 0 : (1 - alpha) * 5
        const w = item.w * unit
        const h = item.h * unit
        const baseX = mod(item.x * unit - camX + margin, W) - margin
        const baseY = mod(item.y * unit - camY + margin, H) - margin
        for (let x = baseX; x < vw + margin; x += W) {
          for (let y = baseY; y < vh + margin; y += H) {
            if (x + w < -margin || y + h < -margin) continue
            pieces.push({
              x: x * dpr,
              y: y * dpr,
              w: w * dpr,
              h: h * dpr,
              radius: item.radius * unit * dpr,
              alpha,
              bias,
              texture,
            })
          }
        }
      }

      const spacing = 28 * unit * dpr
      const gridIn = p.dotGrid ? easeOut(clamp01((c.arrival - 0.8) / 0.9)) : 0
      renderer.draw(pieces, {
        background,
        wash: clamp01((washed - 0.15) / 0.75),
        washColor: colors.paper,
        focus: p.focus ? 1 - washed : 0,
        blur: [bx, by],
        grid: {
          alpha: gridIn * 0.16 * (1 - bg),
          spacing,
          dot: Math.max(0.8, 1.1 * unit) * dpr,
          offset: [mod(camX * dpr, spacing), mod(camY * dpr, spacing)],
          color: colors.paper,
        },
      })
    }
    gsap.ticker.add(tick)

    const onLost = (e: Event) => {
      e.preventDefault()
      setFailed(true)
    }
    canvas.addEventListener("webglcontextlost", onLost)

    return () => {
      disposed = true
      gsap.ticker.remove(tick)
      drift.current?.kill()
      arrival.current?.kill()
      warp.current?.kill()
      drift.current = arrival.current = warp.current = null
      canvas.removeEventListener("pointerdown", onDown)
      canvas.removeEventListener("pointermove", onMove)
      canvas.removeEventListener("pointerup", onUp)
      canvas.removeEventListener("pointercancel", onUp)
      canvas.removeEventListener("webglcontextlost", onLost)
      renderer.destroy()
    }
    // The scene is built once; intro only matters at the start. Everything
    // else is read live from `live.current`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intro])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn(
        "block size-full touch-pan-y bg-night cursor-grab data-[dragging]:cursor-grabbing",
        failed && "hidden",
        className,
      )}
    />
  )
}

/** Design pixels → CSS pixels. A phone keeps pieces big enough to read. */
function unitFor(width: number) {
  return Math.min(1.35, Math.max(0.55, width / 1440))
}

function mod(n: number, m: number) {
  return ((n % m) + m) % m
}
