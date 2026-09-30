import { useMemo, useRef } from "react"
import { useInView, useReducedMotion } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { cn } from "@/lib/utils"

/** The lower 48, clockwise from the Olympic peninsula, as [lon, lat]. */
const OUTLINE: [number, number][] = [
  [-124.7, 48.4], [-123.0, 49.0], [-95.2, 49.0], [-94.8, 49.4], [-89.6, 48.0], [-84.8, 46.6],
  [-83.5, 45.9], [-82.4, 43.0], [-79.0, 43.3], [-76.8, 43.6], [-74.9, 45.0], [-71.5, 45.0],
  [-70.0, 46.7], [-69.2, 47.4], [-67.8, 47.1], [-67.0, 44.8], [-70.2, 43.6], [-70.6, 42.6],
  [-70.0, 41.7], [-71.9, 41.3], [-74.0, 40.6], [-74.0, 39.6], [-75.0, 38.8], [-76.0, 37.0],
  [-75.5, 35.3], [-76.8, 34.7], [-78.9, 33.6], [-80.9, 32.0], [-81.4, 30.7], [-80.1, 27.0],
  [-80.4, 25.2], [-81.2, 25.2], [-82.7, 27.8], [-82.8, 29.0], [-84.3, 30.0], [-86.5, 30.4],
  [-89.4, 30.2], [-89.6, 29.2], [-91.3, 29.3], [-93.8, 29.7], [-95.0, 29.2], [-97.2, 27.6],
  [-97.4, 25.9], [-99.1, 26.4], [-101.4, 29.8], [-103.1, 29.0], [-104.6, 29.9], [-106.5, 31.8],
  [-108.2, 31.8], [-111.1, 31.3], [-114.8, 32.5], [-117.1, 32.5], [-118.5, 34.0], [-120.6, 34.6],
  [-121.9, 36.6], [-122.5, 37.8], [-123.8, 39.8], [-124.2, 41.9], [-124.1, 43.5], [-124.0, 46.3],
]

/** Where the members are: [lon, lat, weight 1–3]. */
const CITIES: [number, number, number][] = [
  [-122.3, 47.6, 3], [-122.7, 45.5, 2], [-122.4, 37.8, 3], [-121.9, 37.3, 2], [-121.5, 38.6, 1],
  [-118.2, 34.05, 3], [-117.2, 32.7, 2], [-115.1, 36.2, 1], [-112.1, 33.4, 2], [-111.9, 40.8, 1],
  [-116.2, 43.6, 1], [-105.0, 39.7, 2], [-106.6, 35.1, 1], [-96.8, 32.8, 3], [-95.4, 29.8, 3],
  [-97.7, 30.3, 2], [-98.5, 29.4, 1], [-97.5, 35.5, 1], [-94.6, 39.1, 1], [-93.3, 45.0, 2],
  [-87.6, 41.9, 3], [-83.0, 42.3, 2], [-90.2, 38.6, 1], [-86.8, 36.2, 2], [-84.4, 33.7, 3],
  [-80.2, 25.8, 3], [-82.5, 27.95, 2], [-81.4, 28.5, 1], [-80.8, 35.2, 2], [-78.6, 35.8, 1],
  [-77.0, 38.9, 3], [-75.2, 39.95, 2], [-74.0, 40.7, 3], [-71.06, 42.36, 3], [-80.0, 40.4, 1],
  [-83.0, 39.96, 1], [-90.07, 29.95, 1], [-90.05, 35.15, 1], [-70.3, 43.7, 1],
]

/** A sinusoidal projection about the country's middle meridian, which
 *  gives the northern border the gentle curve a map reader expects. */
function project([lon, lat]: [number, number]): [number, number] {
  return [(lon + 96) * Math.cos((lat * Math.PI) / 180), -lat]
}

function inside([x, y]: [number, number], poly: [number, number][]) {
  let hit = false
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i]
    const [xj, yj] = poly[j]
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) hit = !hit
  }
  return hit
}

/** A stable pseudo-random number per cell, so the map is the same every load. */
function hash(i: number, j: number) {
  const s = Math.sin(i * 127.1 + j * 311.7) * 43758.5453
  return s - Math.floor(s)
}

type Dot = { x: number; y: number; r: number; hot: boolean; sweep: number }

function buildDots(columns: number) {
  const poly = OUTLINE.map(project)
  const xs = poly.map((p) => p[0])
  const ys = poly.map((p) => p[1])
  const minX = Math.min(...xs)
  const maxX = Math.max(...xs)
  const minY = Math.min(...ys)
  const maxY = Math.max(...ys)
  const cell = (maxX - minX) / columns
  const rows = Math.ceil((maxY - minY) / cell)
  const cities = CITIES.map(([lon, lat, w]) => [...project([lon, lat]), w] as const)
  const dots: Dot[] = []

  for (let j = 0; j <= rows; j++) {
    for (let i = 0; i <= columns; i++) {
      const px = minX + i * cell
      const py = minY + j * cell
      if (!inside([px, py], poly)) continue
      let heat = 0
      for (const [cx, cy, w] of cities) {
        const d = Math.hypot(px - cx, py - cy) / cell
        const reach = 0.6 + w * 0.75
        if (d < reach) heat = Math.max(heat, (1 - d / reach) * (0.55 + w * 0.15) + hash(i, j) * 0.25)
      }
      const stray = hash(j, i) < 0.035
      const hot = heat > 0.32 || stray
      const r = hot ? (stray && heat <= 0.32 ? 0.2 : 0.2 + Math.min(heat, 1) * 0.18) : 0.14
      dots.push({ x: i, y: j, r, hot, sweep: i / columns })
    }
  }
  return { dots, width: columns, height: rows }
}

type DotMapProps = {
  /** Dots across the widest point. More is finer. */
  columns?: number
  /** Seconds the member dots take to sweep in, west to east. */
  sweep?: number
  className?: string
}

/**
 * The country as a field of pale dots, with members' cities picked out in
 * ink. The ink dots sweep in west to east the first time it is seen, so the
 * spread reads as "everywhere" rather than as a legend to study.
 */
export function DotMap({ columns = 76, sweep = 1.4, className }: DotMapProps) {
  const ref = useRef<SVGSVGElement>(null)
  const seen = useInView(ref, { once: true, margin: "0px 0px -15% 0px" })
  const reduce = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const on = seen || reduce || designing
  const { dots, width, height } = useMemo(() => buildDots(columns), [columns])

  return (
    <svg
      ref={ref}
      viewBox={`-1 -1 ${width + 2} ${height + 2}`}
      role="img"
      aria-label="A map of the United States with Glovebox members in every major city"
      data-on={on}
      className={cn("group h-auto w-full", className)}
    >
      {dots.map((d) =>
        d.hot ? (
          <circle
            key={`${d.x}-${d.y}`}
            cx={d.x}
            cy={d.y}
            r={d.r}
            className="origin-center fill-ink transition-[opacity,transform] duration-700 ease-(--ease-out) [transform-box:fill-box] group-data-[on=false]:scale-[0.2] group-data-[on=false]:opacity-0"
            style={{ transitionDelay: reduce ? "0ms" : `${Math.round(d.sweep * sweep * 1000)}ms` }}
          />
        ) : (
          <circle key={`${d.x}-${d.y}`} cx={d.x} cy={d.y} r={d.r} className="fill-dot" />
        ),
      )}
    </svg>
  )
}
