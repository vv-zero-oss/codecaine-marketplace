import { motion } from "motion/react"
import { useId, useMemo } from "react"

import { useStill } from "@/components/motion"
import { cn } from "@/lib/utils"

/** A smooth line through generated points. `trend` shapes it, `seed` varies it,
 *  so a chart is two scalars rather than an array the editor cannot edit. */
export function seriesFor(trend: "up" | "down" | "wave" | "dip-rise", seed: number, count = 24): number[] {
  let s = seed * 9301 + 49297
  const noise = () => ((s = (s * 9301 + 49297) % 233280) / 233280 - 0.5) * 0.12
  return Array.from({ length: count }, (_, i) => {
    const t = i / (count - 1)
    const base =
      trend === "up" ? 0.18 + 0.7 * t
      : trend === "down" ? 0.86 - 0.7 * t
      : trend === "wave" ? 0.5 + 0.22 * Math.sin(t * Math.PI * 2.2)
      : 0.62 - 0.34 * Math.sin(Math.min(t * 1.6, 1) * Math.PI * 0.62) + Math.max(0, t - 0.45) * 0.95
    return Math.min(0.96, Math.max(0.04, base + noise()))
  })
}

/** Catmull-Rom through the points, as a cubic Bézier path in a 0–100 box. */
export function smoothPath(points: number[]): { line: string; at: (i: number) => [number, number] } {
  const xy = points.map((p, i) => [(i / (points.length - 1)) * 100, (1 - p) * 100] as [number, number])
  let d = `M ${xy[0][0]} ${xy[0][1]}`
  for (let i = 0; i < xy.length - 1; i++) {
    const [p0, p1, p2, p3] = [xy[Math.max(i - 1, 0)], xy[i], xy[i + 1], xy[Math.min(i + 2, xy.length - 1)]]
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += ` C ${c1[0]} ${c1[1]}, ${c2[0]} ${c2[1]}, ${p2[0]} ${p2[1]}`
  }
  return { line: d, at: (i) => xy[Math.min(Math.max(i, 0), xy.length - 1)] }
}

/**
 * A self-drawing line chart. The stroke keeps its width at any stretch
 * (`non-scaling-stroke`), and a clip wipes it in left to right once per
 * `seed`/`trend` (a dash-offset draw cannot be used: non-scaling strokes
 * measure dashes in screen pixels).
 */
export function LineChart({
  trend = "up",
  seed = 1,
  color = "var(--color-chart)",
  area = false,
  draw = true,
  duration = 2.4,
  strokeWidth = 2,
  className,
}: {
  trend?: "up" | "down" | "wave" | "dip-rise"
  seed?: number
  color?: string
  area?: boolean
  draw?: boolean
  duration?: number
  strokeWidth?: number
  className?: string
}) {
  const id = useId()
  const still = useStill()
  const { line } = useMemo(() => smoothPath(seriesFor(trend, seed)), [trend, seed])
  const animated = draw && !still
  return (
    <motion.svg
      key={`${trend}-${seed}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
      className={cn("size-full overflow-visible", className)}
      initial={animated ? { clipPath: "inset(-10% 100% -10% -2%)" } : false}
      animate={{ clipPath: "inset(-10% -2% -10% -2%)" }}
      transition={{ duration, ease: [0.65, 0, 0.35, 1] }}
    >
      {area ? (
        <>
          <defs>
            <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={color} stopOpacity="0.35" />
              <stop offset="1" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={`${line} L 100 100 L 0 100 Z`} fill={`url(#${id})`} />
        </>
      ) : null}
      <path
        d={line}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </motion.svg>
  )
}
