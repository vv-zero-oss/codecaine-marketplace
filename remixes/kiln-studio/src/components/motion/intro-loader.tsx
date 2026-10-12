import { useCallback, useEffect, useRef, useState } from "react"
import { useReducedMotion } from "motion/react"
import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"

import { VESSEL_BODY, VESSEL_BOX, VESSEL_EYE, VESSEL_HANDLES } from "@/components/site/logo"
import { createClock } from "@/lib/clock-animation"
import { finishIntro, resetIntro, useIntroDone } from "@/lib/intro"
import { cn } from "@/lib/utils"

/**
 * The opening: the name, then the vessel arriving out of big pixels, then
 * fired through five glazes in hard cuts — clay, denim, peach on a tan
 * ground, rose, chrome — then stippled into dust that blows out to the
 * edges as the wall arrives. Timings read off the reference at 60fps.
 *
 * Drawn on a canvas, timed by a Web Animation (see `clock-animation.ts`), so
 * the editor's Motion switch finishing animations finishes this too. It
 * plays once a session; skipped while designing; reduced motion gets a
 * short fade of the name and nothing else. Click, Esc or "Skip" end it.
 */

type Glaze = "clay" | "denim" | "peach" | "rose" | "chrome"

// Milliseconds at speed 1.
const T = {
  text: 900,
  pixel: 1700,
  glazes: [
    { at: 1700, glaze: "clay" as Glaze },
    { at: 2000, glaze: "denim" as Glaze },
    { at: 2330, glaze: "peach" as Glaze },
    { at: 2660, glaze: "rose" as Glaze },
    { at: 2990, glaze: "chrome" as Glaze },
  ],
  stipple: 3330,
  scatter: 3730,
  fade: 4430,
  end: 4830,
}

const easeOut = (x: number) => 1 - Math.pow(1 - x, 3)
const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)
const clamp01 = (x: number) => Math.min(1, Math.max(0, x))
const css = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim()

function speckle(size: number, dark: string, light: string) {
  const c = document.createElement("canvas")
  c.width = c.height = size
  const x = c.getContext("2d")!
  for (let i = 0; i < size * 4; i++) {
    x.fillStyle = Math.random() > 0.5 ? dark : light
    x.globalAlpha = 0.25 + Math.random() * 0.5
    x.beginPath()
    x.arc(Math.random() * size, Math.random() * size, 0.4 + Math.random() * 1.6, 0, Math.PI * 2)
    x.fill()
  }
  return c
}

export function IntroLoader({ speed = 1, wordmark = "Kiln Studio®", tagline = "Technology creative" }: { speed?: number; wordmark?: string; tagline?: string }) {
  const done = useIntroDone()
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const clockRef = useRef<ReturnType<typeof createClock> | null>(null)
  const [phase, setPhase] = useState<"text" | "vessel" | "leaving">("text")

  useCanvasAction("Replay intro", () => resetIntro(), { group: "Home" })

  const skip = useCallback(() => finishIntro(), [])

  useEffect(() => {
    if (designing && !done) finishIntro()
  }, [designing, done])

  // Hold the page still underneath while it plays.
  useEffect(() => {
    if (done) return
    const root = document.documentElement
    const before = root.style.overflow
    root.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && finishIntro()
    window.addEventListener("keydown", onKey)
    return () => {
      root.style.overflow = before
      window.removeEventListener("keydown", onKey)
    }
  }, [done])

  useEffect(() => {
    if (done || designing) return
    const canvas = canvasRef.current
    if (!canvas) return
    setPhase("text")

    if (reduced) {
      const id = window.setTimeout(finishIntro, 900)
      return () => window.clearTimeout(id)
    }

    const ctx = canvas.getContext("2d")!
    const body = new Path2D(VESSEL_BODY)
    const handles = new Path2D(VESSEL_HANDLES)
    const page = css("--color-page") || "#070706"
    const glaze = {
      clay: css("--color-glaze-clay"),
      denim: css("--color-glaze-denim"),
      peach: css("--color-glaze-peach"),
      tan: css("--color-glaze-tan"),
      rose: css("--color-glaze-rose"),
      chrome: css("--color-glaze-chrome"),
      ember: css("--color-ember-soft"),
      deep: css("--color-ember-deep"),
    }
    const grain = speckle(48, "#3a1400", "#ffd9a4")
    const denimGrain = speckle(32, "#1c2e44", "#9fb7d1")
    const offscreen = document.createElement("canvas")
    const off = offscreen.getContext("2d", { willReadFrequently: true })!
    let w = 0
    let h = 0
    let dpr = 1
    let points: { x: number; y: number; vx: number; vy: number; r: number }[] = []

    const geometry = () => {
      const s = Math.min(h * 0.6, 520) / VESSEL_BOX.height
      return { s, cx: w / 2, cy: h / 2 + h * 0.02 }
    }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      offscreen.width = w
      offscreen.height = h
      // Dust: points sampled off the solid vessel, each with its own way out.
      const { s, cx, cy } = geometry()
      off.clearRect(0, 0, w, h)
      off.setTransform(s, 0, 0, s, cx - (VESSEL_BOX.width / 2) * s, cy - (VESSEL_BOX.height / 2) * s)
      off.fill(body)
      off.setTransform(1, 0, 0, 1, 0, 0)
      const data = off.getImageData(0, 0, w, h).data
      const step = Math.max(4, Math.round(s * 0.62))
      points = []
      for (let y = 0; y < h; y += step)
        for (let x = 0; x < w; x += step) {
          if (data[(y * w + x) * 4 + 3] < 128) continue
          const px = x + (Math.random() - 0.5) * step
          const py = y + (Math.random() - 0.5) * step
          const dx = px - cx
          const dy = py - cy
          const len = Math.hypot(dx, dy) || 1
          const push = 0.6 + Math.random() * 1.4
          points.push({ x: px, y: py, vx: (dx / len) * push + (Math.random() - 0.5) * 0.5, vy: (dy / len) * push + (Math.random() - 0.5) * 0.5, r: 0.5 + Math.random() * 1.1 })
        }
    }
    resize()
    window.addEventListener("resize", resize)

    /** Fills the vessel (already transformed) with one glaze. */
    const fillGlaze = (c: CanvasRenderingContext2D, g: Glaze, t: number) => {
      const turn = Math.sin(t / 380) // the highlight drifts as if it were turning
      c.save()
      c.clip(body)
      if (g === "clay") {
        const grad = c.createRadialGradient(14 + turn * 4, 16, 2, 20, 26, 30)
        grad.addColorStop(0, glaze.ember)
        grad.addColorStop(0.45, glaze.clay)
        grad.addColorStop(1, glaze.deep)
        c.fillStyle = grad
        c.fillRect(0, 0, 40, 52)
        c.globalAlpha = 0.55
        c.fillStyle = c.createPattern(grain, "repeat")!
        c.save()
        c.scale(0.12, 0.12)
        c.fillRect(0, 0, 400, 520)
        c.restore()
      } else if (g === "denim") {
        c.fillStyle = glaze.denim
        c.fillRect(0, 0, 40, 52)
        c.globalAlpha = 0.6
        c.fillStyle = c.createPattern(denimGrain, "repeat")!
        c.save()
        c.scale(0.1, 0.1)
        c.fillRect(0, 0, 400, 520)
        c.restore()
        c.globalAlpha = 0.9
        c.setLineDash([1.1, 0.9])
        c.lineWidth = 0.42
        c.strokeStyle = "#e8d9b0"
        c.save()
        c.translate(20, 27)
        c.scale(0.9, 0.93)
        c.translate(-20, -27)
        c.stroke(body)
        c.restore()
      } else if (g === "peach") {
        const grad = c.createLinearGradient(8, 8, 34, 50)
        grad.addColorStop(0, "#ffb347")
        grad.addColorStop(0.35, glaze.peach)
        grad.addColorStop(1, "#7a0f1c")
        c.fillStyle = grad
        c.fillRect(0, 0, 40, 52)
        const hi = c.createRadialGradient(15 + turn * 3, 15, 0, 15 + turn * 3, 15, 9)
        hi.addColorStop(0, "rgb(255 240 210 / 0.75)")
        hi.addColorStop(1, "rgb(255 240 210 / 0)")
        c.fillStyle = hi
        c.fillRect(0, 0, 40, 52)
      } else if (g === "rose") {
        const grad = c.createRadialGradient(16, 20, 1, 20, 28, 28)
        grad.addColorStop(0, "#ffc4e1")
        grad.addColorStop(0.4, glaze.rose)
        grad.addColorStop(1, "#6e1240")
        c.fillStyle = grad
        c.fillRect(0, 0, 40, 52)
        c.fillStyle = "rgb(255 255 255 / 0.85)"
        c.beginPath()
        c.ellipse(13 + turn * 2, 20, 1.6, 6, -0.25, 0, Math.PI * 2)
        c.fill()
      } else {
        const grad = c.createLinearGradient(5 + turn * 6, 0, 35 + turn * 6, 52)
        ;[
          [0, "#3d4148"],
          [0.18, glaze.chrome],
          [0.3, "#ffffff"],
          [0.42, "#5b6068"],
          [0.58, "#e4e7eb"],
          [0.72, "#262a30"],
          [0.86, "#b9bec6"],
          [1, "#1a1d22"],
        ].forEach(([o, c]) => grad.addColorStop(o as number, c as string))
        c.fillStyle = grad
        c.fillRect(0, 0, 40, 52)
      }
      c.restore()
      // Handles in the same glaze's mid tone, then the eye.
      c.lineCap = "round"
      c.lineWidth = 2.2
      c.setLineDash([])
      c.strokeStyle = { clay: glaze.clay, denim: glaze.denim, peach: glaze.peach, rose: glaze.rose, chrome: glaze.chrome }[g]
      c.stroke(handles)
      c.fillStyle = page
      c.beginPath()
      c.arc(VESSEL_EYE.cx, VESSEL_EYE.cy, VESSEL_EYE.r, 0, Math.PI * 2)
      c.fill()
    }

    /** The vessel, transformed into place with a slow turntable squash. */
    const drawVessel = (target: CanvasRenderingContext2D, g: Glaze, t: number) => {
      const { s, cx, cy } = geometry()
      const squash = 0.9 + 0.1 * Math.cos(t / 520)
      target.save()
      target.translate(cx, cy)
      target.scale(s * squash, s)
      target.translate(-VESSEL_BOX.width / 2, -VESSEL_BOX.height / 2)
      fillGlaze(target, g, t)
      target.restore()
    }

    const clock = createClock(canvas, T.end / speed)
    clockRef.current = clock
    let raf = 0
    let lastPhase = ""

    const frame = () => {
      const t = clock.now() * speed
      if (clock.finished || t >= T.end) {
        finishIntro()
        return
      }
      const next = t < T.text ? "text" : t < T.fade ? "vessel" : "leaving"
      if (next !== lastPhase) {
        lastPhase = next
        setPhase(next)
      }
      if (lineRef.current) lineRef.current.style.transform = `scaleX(${clamp01(t / T.fade)})`

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.fillStyle = page
      ctx.fillRect(0, 0, w, h)

      if (t >= T.text && t < T.stipple) {
        const current = [...T.glazes].reverse().find((g) => t >= g.at)?.glaze ?? "clay"
        if (current === "peach") {
          // The peach glaze is shot on a tan sweep with a dark vignette.
          const v = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.1, w / 2, h / 2, Math.max(w, h) * 0.62)
          v.addColorStop(0, glaze.tan)
          v.addColorStop(0.55, "#7d5e40")
          v.addColorStop(1, page)
          ctx.fillStyle = v
          ctx.fillRect(0, 0, w, h)
        }
        if (t < T.pixel) {
          // Out of big pixels: render small, scale up without smoothing.
          const k = easeOut(clamp01((t - T.text) / (T.pixel - T.text)))
          const block = Math.max(1, Math.round(30 * (1 - k)))
          off.setTransform(1, 0, 0, 1, 0, 0)
          off.clearRect(0, 0, w, h)
          off.save()
          off.scale(1 / block, 1 / block)
          drawVessel(off, "clay", t)
          off.restore()
          ctx.imageSmoothingEnabled = false
          ctx.globalAlpha = clamp01(k * 3)
          ctx.drawImage(offscreen, 0, 0, Math.ceil(w / block), Math.ceil(h / block), 0, 0, Math.ceil(w / block) * block, Math.ceil(h / block) * block)
          ctx.globalAlpha = 1
          ctx.imageSmoothingEnabled = true
        } else {
          drawVessel(ctx, current, t)
        }
      } else if (t >= T.stipple) {
        // Stipple: the chrome vessel gives way to white dust, then the dust blows out.
        const p = clamp01((t - T.stipple) / (T.scatter - T.stipple))
        const q = easeInOut(clamp01((t - T.scatter) / (T.fade - T.scatter)))
        if (p < 1) {
          ctx.globalAlpha = 1 - p
          drawVessel(ctx, "chrome", t)
          ctx.globalAlpha = 1
        }
        const travel = Math.max(w, h) * 0.75
        ctx.fillStyle = "#f4f4f2"
        for (const pt of points) {
          const a = p * (1 - q * q)
          if (a <= 0.01) continue
          ctx.globalAlpha = a
          ctx.beginPath()
          ctx.arc(pt.x + pt.vx * q * travel, pt.y + pt.vy * q * travel, pt.r * (1 + q * 3.2), 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.globalAlpha = 1
      }
      raf = requestAnimationFrame(frame)
    }

    raf = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(raf)
      clock.cancel()
      clockRef.current = null
      window.removeEventListener("resize", resize)
    }
  }, [done, designing, reduced, speed])

  if (done) return null

  return (
    <div
      role="dialog"
      aria-label="Intro"
      onClick={skip}
      className={cn(
        "fixed inset-0 z-[100] bg-page transition-opacity duration-(--duration-rise) ease-(--ease-out-strong)",
        phase === "leaving" ? "pointer-events-none opacity-0" : "opacity-100",
      )}
    >
      <canvas ref={canvasRef} className="absolute inset-0 size-full" aria-hidden />
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-center gap-[clamp(48px,14vw,220px)] px-6 text-[13px] font-semibold tracking-[-0.01em] uppercase transition-opacity duration-150",
          phase === "text" ? "opacity-100" : "opacity-0",
        )}
      >
        <span className="italic">{wordmark}</span>
        <span className="font-medium">{tagline}</span>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-line">
        <div ref={lineRef} className="h-full origin-left scale-x-0 bg-ember" />
      </div>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          skip()
        }}
        className="type-label absolute right-5 bottom-5 rounded-full px-3 py-2 text-ink-3 transition-colors duration-(--duration-hover) hover:text-ink"
      >
        Skip intro <span className="text-ink-5">[esc]</span>
      </button>
    </div>
  )
}
