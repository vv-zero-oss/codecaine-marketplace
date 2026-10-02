import { motion, useReducedMotion } from "motion/react"
import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * An entrance that lands in steps, like a sprite blinking onto the screen:
 * a short rise and a fade, quantised to five frames. Plays once, when the block
 * is a quarter of the way into view.
 */
export function Reveal({
  delay = 0,
  distance = 20,
  duration = 0.45,
  direction = "up",
  className,
  children,
}: {
  delay?: number
  distance?: number
  duration?: number
  direction?: "up" | "down" | "left" | "right"
  className?: string
  children?: React.ReactNode
}) {
  const reduced = useReducedMotion()
  const offset = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  }[direction]
  return (
    <motion.div
      className={cn(className)}
      initial={reduced ? false : { opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration, delay, ease: [0.22, 0.9, 0.24, 1] }}
    >
      {children}
    </motion.div>
  )
}
