import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"
import { fbm, fitCanvas, hash2, noise2, readPalette, useFrameLoop, type Palette } from "./frame-loop"

/**
 * The hero's weather: a full-bleed field of 8px squares on a 9px pitch,
 * banded diagonally — navy, cobalt, a gold core flecked with signal red and
 * lime, then cobalt and navy again — and warped by slowly drifting noise, so
 * the bands flow up and to the right like a front moving through.
 *
 * Its foot is ragged: every column stops at its own depth, a few drip lower.
 * As the page scrolls past, that edge climbs and the field erodes from the
 * bottom up.
 */
export function PixelField({
  cell = 9,
  speed = 1,
  tilt = 31,
  erodeOnScroll = true,
  playing = true,
  className,
}: {
  /** Pitch of the grid in px: an (n−1)px square and a 1px gap. */
  cell?: number
  /** 1 is the reference pace; 0 holds the weather still. */
  speed?: number
  /** Angle of the bands, in degrees above horizontal. */
  tilt?: number
  /** Whether the field erodes from its foot as the page scrolls past it. */
  erodeOnScroll?: boolean
  playing?: boolean
  className?: string
}) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const palette = useRef<Palette | null>(null)
  const visible = useRef(true)

  useEffect(() => {
    const el = canvas.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => (visible.current = entry.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useFrameLoop(
    (time) => {
      const el = canvas.current
      if (!el || (!visible.current && time > 0)) return
      palette.current ??= readPalette()
      const p = palette.current
      const { ctx, w, h } = fitCanvas(el)
      ctx.clearRect(0, 0, w, h)

      const t = time * speed
      const rect = el.getBoundingClientRect()
      const scrolled = erodeOnScroll ? Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height))) : 0

      const cols = Math.ceil(w / cell)
      const rows = Math.ceil(h / cell)
      const slope = Math.tan((tilt * Math.PI) / 180)
      const cos = Math.cos((tilt * Math.PI) / 180)
      // The scale the reference's band widths were read at: a 620px field.
      const k = h / 620
      const core = 80 * k
      const blue = 190 * k
      const navy = 300 * k
      const sparse = 400 * k

      const buckets: Record<string, number[]> = {}
      const put = (color: string, i: number, j: number) => (buckets[color] ??= []).push(i, j)

      for (let i = 0; i < cols; i++) {
        const x = i * cell
        // Each column's own foot, with the odd longer drip.
        const drip = hash2(i, 7) > 0.86 ? (18 + hash2(i, 9) * 50) * k : 0
        const foot = h * (0.74 + noise2(i * 0.11, 3.3) * 0.2) + drip - scrolled * h * 1.25
        const yc = h * 0.28 + (w * 0.5 - x) * slope

        for (let j = 0; j < rows; j++) {
          const y = j * cell
          if (y > foot) break

          // Distance from the band's centre line, warped by drifting noise.
          const flow = (x * 0.9 + y * 0.5) / 240 - t * 0.12
          let s = (y - yc) * cos
          s += (fbm(flow, y / 300 + t * 0.03) - 0.5) * 130 * k
          s += (noise2(i * 0.8 + t * 0.9, j * 0.8 - t * 0.4) - 0.5) * 70 * k
          // The stripes repeat across the field: void, navy, cobalt, a gold
          // core, cobalt, navy, void — then again.
          const period = 960 * k
          const wrapped = ((((s + period / 2) % period) + period) % period) - period / 2
          const d = Math.abs(wrapped)
          const main = Math.abs(s) < period / 2

          if (d < core) {
            // The core: gold, with red and lime weather in its upper reach.
            const heat = noise2(i * 0.35 + t * 0.5, j * 0.35 - t * 0.2)
            const upper = x > w * 0.45 && y < h * 0.4
            if (main && upper && heat > 0.74 && y < h * 0.12) put(p.lime, i, j)
            else if (main && upper && heat > 0.56) put(p.signal, i, j)
            else if (heat > 0.9) put(p.signal, i, j)
            else put(p.gold, i, j)
          } else if (d < blue) {
            const fleck = hash2(i + Math.floor(t * 3), j)
            put(fleck > 0.93 ? p.navy : fleck < 0.04 ? p.gold : p.cobalt, i, j)
          } else if (d < navy) {
            put(hash2(i, j + Math.floor(t * 2)) > 0.9 ? p.cobalt : p.navy, i, j)
          } else if (d < sparse) {
            const keep = 1 - (d - navy) / (sparse - navy)
            if (hash2(i + Math.floor(t * 2), j) < keep * 0.8) put(p.navy, i, j)
          } else if (hash2(i, j + Math.floor(t)) > 0.992) {
            put(p.navy, i, j)
          }
        }
      }

      const size = cell - 1
      for (const color in buckets) {
        ctx.fillStyle = color
        const cells = buckets[color]
        for (let n = 0; n < cells.length; n += 2) ctx.fillRect(cells[n] * cell, cells[n + 1] * cell, size, size)
      }
    },
    { playing: playing && speed > 0, deps: [cell, speed, tilt, erodeOnScroll] },
  )

  return (
    <canvas
      ref={canvas}
      aria-hidden
      className={cn("block h-[clamp(320px,34vw,640px)] w-full", className)}
    />
  )
}
