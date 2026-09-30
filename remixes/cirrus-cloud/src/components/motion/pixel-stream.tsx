import { useEffect, useMemo, useRef } from "react"

import { cn } from "@/lib/utils"
import { fitCanvas, hash2, readPalette, useFrameLoop, type Palette } from "./frame-loop"

/**
 * A diagram drawn in pixels: a stream of squares flowing left to right that
 * shows a process taking shape.
 *
 * - `explore` — a loose cobalt cloud (the options) narrows to a thin thread
 *   (the choice), then opens into a twisting gold double strand (the thing
 *   being built).
 * - `spec` — scattered navy (what a team has), cobalt and navy streams
 *   (what gets described), a dense gold body (what runs), and a lime plume
 *   rising to the top right, shedding red sparks below (what gets checked).
 *
 * Every square snaps to the 9px grid. Particles travel at their own pace, so
 * the shape holds while everything in it moves.
 */
export function PixelStream({
  variant = "explore",
  cell = 9,
  speed = 1,
  density = 1,
  playing = true,
  className,
}: {
  variant?: "explore" | "spec"
  cell?: number
  /** 1 is the reference pace. */
  speed?: number
  /** Multiplies the number of squares. */
  density?: number
  playing?: boolean
  className?: string
}) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const palette = useRef<Palette | null>(null)
  const visible = useRef(false)

  const particles = useMemo(() => {
    const count = Math.round((variant === "explore" ? 900 : 2600) * density)
    return Array.from({ length: count }, (_, n) => ({
      u: hash2(n, 1),
      r: hash2(n, 2) * 2 - 1,
      q: hash2(n, 3),
      v: 0.6 + hash2(n, 4) * 0.8,
    }))
  }, [variant, density])

  useEffect(() => {
    const el = canvas.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => (visible.current = entry.isIntersecting), { rootMargin: "120px" })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useFrameLoop(
    (time, dt) => {
      const el = canvas.current
      if (!el || (!visible.current && time > 0)) return
      palette.current ??= readPalette()
      const p = palette.current
      const { ctx, w, h } = fitCanvas(el)
      ctx.clearRect(0, 0, w, h)
      const k = h / 420
      const t = time * speed
      const size = cell - 1
      const seen = new Set<number>()

      for (let n = 0; n < particles.length; n++) {
        const part = particles[n]
        part.u = (part.u + dt * speed * 0.035 * part.v) % 1
        const u = part.u
        const placed = variant === "explore" ? explore(u, part.r, part.q, t, p) : spec(u, part.r, part.q, t, p)
        if (!placed) continue
        const [dy, color, alpha] = placed
        const i = Math.round((u * (w - cell)) / cell)
        const j = Math.round((h / 2 + dy * k) / cell)
        if (j < 0 || j * cell > h - cell) continue
        const key = i * 4096 + j
        if (seen.has(key)) continue
        seen.add(key)
        ctx.globalAlpha = alpha
        ctx.fillStyle = color
        ctx.fillRect(i * cell, j * cell, size, size)
      }
      ctx.globalAlpha = 1
    },
    { playing: playing && speed > 0, deps: [variant, cell, speed, particles] },
  )

  return <canvas ref={canvas} aria-hidden className={cn("block h-[clamp(240px,32vw,420px)] w-full", className)} />
}

type Placed = [dy: number, color: string, alpha: number] | null

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

/** Options → a choice → a build: a cloud, a thread, a twisting double strand. */
function explore(u: number, r: number, q: number, t: number, p: Palette): Placed {
  if (u < 0.46) {
    // The cloud narrows toward the thread.
    const spread = 190 * (1 - smooth(0, 0.46, u)) + 8
    const sparse = 1 - smooth(0.0, 0.4, u) * 0.35
    if (q > sparse) return null
    const dy = r * spread + Math.sin(u * 30 + t) * 4
    const color = q < 0.08 ? p.gold : q < 0.45 ? p.cobalt : q < 0.75 ? p.cobaltSoft : p.cobaltPale
    return [dy, color, 1]
  }
  // Two gold strands, twisting wider as they go.
  const a = (u - 0.46) / 0.54
  const amp = 10 + 120 * smooth(0, 1, a)
  const phase = u * 18 - t * 0.9
  const strand = r > 0 ? 1 : -1
  const dy = Math.sin(phase + (strand > 0 ? 0 : Math.PI)) * amp - a * 40 + (Math.abs(r) - 0.5) * 10
  const front = Math.cos(phase + (strand > 0 ? 0 : Math.PI)) > 0
  const color = q < 0.06 ? p.cobalt : front ? p.gold : q < 0.5 ? p.goldSoft : p.goldPale
  return [dy, color, 1]
}

/** What a team has → what it describes → what runs → what gets checked. */
function spec(u: number, r: number, q: number, t: number, p: Palette): Placed {
  const wobble = Math.sin(u * 22 + t * 0.8) * 5
  if (u < 0.26) {
    if (q > 0.55) return null
    const spread = 190 - u * 260
    return [r * spread + 10 + wobble, p.navy, 1]
  }
  if (u < 0.56) {
    // Two streams: cobalt above, navy below, tightening toward the gold.
    const a = (u - 0.26) / 0.3
    if (q < 0.5) return [-40 + r * (70 - a * 20) + wobble, q < 0.04 ? p.navy : p.cobalt, 1]
    if (q < 0.9) return [60 - a * 40 + r * (60 - a * 30) + wobble, p.navy, 1]
    return null
  }
  if (u < 0.8) {
    const a = (u - 0.56) / 0.24
    if (q > 0.94) {
      // Sparks shed from the underside.
      if (a < 0.3) return null
      return [80 + a * 60 + r * 40 + wobble, p.signal, 1]
    }
    return [-a * 40 + r * (95 - a * 10) + wobble, q < 0.05 ? p.cobalt : p.gold, 1]
  }
  const a = (u - 0.8) / 0.2
  if (q > 0.9) return [110 + a * 90 + r * 40, p.signal, 1]
  if (q < 0.25) return [-30 - a * 50 + r * 80 + wobble, p.gold, 1]
  // The plume rises toward the top right.
  return [-60 - a * 140 + r * (60 + a * 20) + wobble, p.lime, 1]
}
