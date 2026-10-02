import { motion, useReducedMotion } from "motion/react"
import type * as React from "react"
import { useCanvasDesignMode } from "@canvas/react"

import { cn } from "@/lib/utils"

type Direction = "up" | "down" | "left" | "right" | "none"

/**
 * Fades and slides its content in once, when it scrolls into view.
 *
 * Every knob is a scalar prop, so the editor's panel can retune it live.
 * Reduced motion and the editor's design mode both hold it at its end state.
 */
export function Reveal({
  direction = "up",
  distance = 24,
  delay = 0,
  duration = 0.7,
  className,
  children,
}: {
  direction?: Direction
  distance?: number
  delay?: number
  duration?: number
  className?: string
  children?: React.ReactNode
}) {
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = reduced || designing
  const x = direction === "left" ? distance : direction === "right" ? -distance : 0
  const y = direction === "up" ? distance : direction === "down" ? -distance : 0
  return (
    <motion.div
      className={cn(className)}
      initial={still ? false : { opacity: 0, transform: `translate(${x}px, ${y}px)` }}
      whileInView={{ opacity: 1, transform: "translate(0px, 0px)" }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  )
}
