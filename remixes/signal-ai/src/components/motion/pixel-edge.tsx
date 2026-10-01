import { useEffect, useMemo, useRef, useState } from "react"
import { useReducedMotion } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { cn } from "@/lib/utils"

/** A stable 0–1 hash of a cell, so the mosaic is the same on every render. */
function hash(r: number, c: number, seed: number) {
  let h = (r * 374761393 + c * 668265263 + seed * 2147483647) | 0
  h = (h ^ (h >>> 13)) * 1274126177
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295
}

/**
 * A band of square pixels along the edge of a section. Squares are sparse on
 * the side facing the content and dense at the page edge, so the section
 * dissolves into a mosaic. With `flicker` a few squares switch on and off, which
 * is the only motion — slow, and stopped for reduced motion or while designing.
 */
export function PixelEdge({
  cell = 26,
  rows = 4,
  color = "var(--sky)",
  altColor = "var(--paper)",
  altShare = 0,
  edge = "bottom",
  density = 0.9,
  solidEdge = false,
  seed = 5,
  flicker = true,
  interval = 1100,
  className,
}: {
  /** Square size in px. */
  cell?: number
  rows?: number
  color?: string
  /** A second square colour, mixed in at `altShare`. */
  altColor?: string
  /** 0–1: the share of squares drawn in `altColor`. */
  altShare?: number
  edge?: "top" | "bottom"
  /** 0–1: how full the row at the page edge is. */
  density?: number
  /** Keep the row at the page edge fully filled, so the band runs into a field of the same colour. */
  solidEdge?: boolean
  seed?: number
  flicker?: boolean
  /** Ms between flickers. */
  interval?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [cols, setCols] = useState(0)
  const [flipped, setFlipped] = useState<Set<string>>(() => new Set())
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const measure = () => setCols(Math.ceil(el.clientWidth / cell) + 1)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [cell])

  useEffect(() => {
    if (!flicker || reduced || designing || !cols) return
    const id = window.setInterval(() => {
      setFlipped((prev) => {
        const next = new Set(prev)
        for (let i = 0; i < 3; i++) {
          const row = Math.floor(Math.random() * rows)
          if (solidEdge && row === (edge === "bottom" ? rows - 1 : 0)) continue
          const key = `${row}:${Math.floor(Math.random() * cols)}`
          if (next.has(key)) next.delete(key)
          else next.add(key)
        }
        return next
      })
    }, interval)
    return () => window.clearInterval(id)
  }, [flicker, reduced, designing, cols, rows, interval, solidEdge, edge])

  const cells = useMemo(() => {
    const out: { r: number; c: number; fill: string; on: boolean }[] = []
    for (let r = 0; r < rows; r++) {
      // Fullness grows toward the page edge.
      const depth = edge === "bottom" ? (r + 1) / rows : (rows - r) / rows
      const p = Math.pow(depth, 1.35) * density
      for (let c = 0; c < cols; c++) {
        const base = hash(r, c, seed) < p
        const edgeRow = r === (edge === "bottom" ? rows - 1 : 0)
        const on = solidEdge && edgeRow ? true : flipped.has(`${r}:${c}`) ? !base : base
        out.push({ r, c, on, fill: hash(c, r, seed + 11) < altShare ? altColor : color })
      }
    }
    return out
  }, [rows, cols, edge, density, solidEdge, seed, flipped, color, altColor, altShare])

  return (
    <div
      ref={ref}
      aria-hidden
      data-canvas-ignore
      className={cn("pointer-events-none absolute inset-x-0 overflow-hidden", edge === "bottom" ? "bottom-0" : "top-0", className)}
      style={{ height: rows * cell }}
    >
      <svg width="100%" height="100%" shapeRendering="crispEdges" className="block">
        {cells.map(({ r, c, on, fill }) => (
          <rect
            key={`${r}:${c}`}
            x={c * cell}
            y={r * cell}
            width={cell}
            height={cell}
            fill={fill}
            className="transition-opacity duration-500 ease-out"
            opacity={on ? 1 : 0}
          />
        ))}
      </svg>
    </div>
  )
}
