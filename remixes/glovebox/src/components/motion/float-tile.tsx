import { motion, useReducedMotion, useTransform } from "motion/react"

import { cn } from "@/lib/utils"
import { useRange, useStageProgress } from "./progress"

type FloatTileProps = {
  /** Where the tile sits, in % of the stage from the left and top. */
  x?: number
  y?: number
  /** How far it drifts across the scroll, in screen-heights. Higher reads
   *  as nearer. Negative drifts down. */
  depth?: number
  className?: string
  children?: React.ReactNode
}

/**
 * A photo or card floating around a pinned statement, drifting upward at its
 * own rate as the page scrolls — parallax that says "there is a lot going on
 * around this number" without any of it asking to be read.
 */
export function FloatTile({ x = 10, y = 20, depth = 0.4, className, children }: FloatTileProps) {
  const progress = useStageProgress()
  const reduce = useReducedMotion()
  const travel = useRange(progress, [0, 1], [depth * 50, depth * -50])
  const transform = useTransform(travel, (v) => `translateY(${v}svh)`)
  return (
    <motion.div
      className={cn("absolute will-change-transform", className)}
      style={{ left: `${x}%`, top: `${y}%`, transform: reduce ? "none" : transform }}
    >
      {children}
    </motion.div>
  )
}
