import type * as React from "react"
import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"

import { useCanvasDesignMode } from "@canvas/react"
import { cn } from "@/lib/utils"

/**
 * Opens its content downward as it scrolls up the screen — the product
 * window starts as a strip under the hero and unfolds to full height.
 */
export function ScrollGrow({
  children,
  start = 22,
  className,
}: {
  children?: React.ReactNode
  /** Percent of the content visible before scrolling. */
  start?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.25"] })
  const clipPath = useTransform(scrollYProgress, (p) =>
    reduce || designing ? "inset(0 0 0% 0)" : `inset(0 0 ${Math.max(0, (100 - start) * (1 - p))}% 0)`,
  )
  return (
    <motion.div ref={ref} style={{ clipPath }} className={cn(className)}>
      {children}
    </motion.div>
  )
}
