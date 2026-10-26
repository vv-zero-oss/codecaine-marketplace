import { motion, useReducedMotion } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { cn } from "@/lib/utils"

/**
 * A chart's line, drawn from left to right the first time it is seen — the
 * way the eye reads a trend anyway — then left alone. An optional end dot
 * lands as the line arrives.
 */
export function DrawLine({
  d,
  stroke = "var(--color-gain)",
  width = 2.5,
  duration = 1.4,
  delay = 0,
  dot = true,
  dotX,
  dotY,
  dotFill = "var(--color-surface)",
  className,
}: {
  /** The SVG path. */
  d: string
  stroke?: string
  width?: number
  duration?: number
  delay?: number
  dot?: boolean
  dotX?: number
  dotY?: number
  /** The end dot's centre — the card colour, so it reads as a ring. */
  dotFill?: string
  className?: string
}) {
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = reduced || designing
  return (
    <>
      <motion.path
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth={width}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        className={cn(className)}
        initial={still ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration, delay, ease: [0.65, 0, 0.35, 1] }}
      />
      {dot && dotX != null && dotY != null ? (
        <motion.circle
          cx={dotX}
          cy={dotY}
          r={3.5}
          fill={dotFill}
          stroke={stroke}
          strokeWidth={2.5}
          vectorEffect="non-scaling-stroke"
          initial={still ? false : { opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.4, delay: delay + duration * 0.92 }}
        />
      ) : null}
    </>
  )
}
