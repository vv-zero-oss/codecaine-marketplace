import { motion, useReducedMotion } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { cn } from "@/lib/utils"

/**
 * A single-series line with a soft fill under it, revealed left to right
 * once when it comes into view (a clip, so it stays exact however the line
 * is stretched). One hue, no axes — the figure beside it carries the
 * number; this carries the direction.
 */
export function Sparkline({
  points = "",
  tone = "light",
  duration = 1.1,
  className,
}: {
  /** Comma-separated values, oldest first. */
  points?: string
  tone?: "light" | "night"
  duration?: number
  className?: string
}) {
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = reduced || designing
  const values = points.split(",").map(Number).filter((n) => !Number.isNaN(n))
  const w = 240
  const h = 64
  const min = Math.min(...values)
  const max = Math.max(...values)
  const xy = values.map((v, i) => [(i / Math.max(1, values.length - 1)) * w, h - 4 - ((v - min) / (max - min || 1)) * (h - 10)])
  const line = xy.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ")
  const area = `${line} L${w} ${h} L0 ${h} Z`
  const stroke = tone === "night" ? "var(--color-chart-night)" : "var(--color-chart)"

  return (
    <motion.svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className={cn("h-16 w-full overflow-visible", className)}
      aria-hidden
      initial={still ? false : { clipPath: "inset(0 100% 0 0)" }}
      whileInView={{ clipPath: "inset(0 0% 0 0)" }}
      viewport={{ once: true }}
      transition={{ duration, ease: [0.77, 0, 0.175, 1] }}
    >
      <defs>
        <linearGradient id={`spark-${tone}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={stroke} stopOpacity="0.18" />
          <stop offset="1" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#spark-${tone})`} />
      <path d={line} fill="none" stroke={stroke} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </motion.svg>
  )
}
