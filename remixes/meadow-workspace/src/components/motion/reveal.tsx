import { motion, useReducedMotion } from "motion/react"
import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

/**
 * Fades and lifts its content into place once, as it scrolls into view.
 *
 * It exists so a section's parts arrive in order — heading, then the thing it
 * introduces — rather than all at once. Every knob is a scalar prop so the
 * editor can retune it; reduced motion shows the content at rest.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  distance = 14,
  duration = 0.7,
  direction = "up",
}: {
  children: ReactNode
  className?: string
  delay?: number
  distance?: number
  duration?: number
  direction?: "up" | "down" | "left" | "right"
}) {
  const reduce = useReducedMotion()
  const axis = direction === "left" || direction === "right" ? "x" : "y"
  const sign = direction === "up" || direction === "left" ? 1 : -1
  const from = reduce ? {} : { opacity: 0, [axis]: distance * sign }
  return (
    <motion.div
      className={cn(className)}
      initial={from}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  )
}
