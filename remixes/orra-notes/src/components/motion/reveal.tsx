import { motion, useReducedMotion } from "motion/react"
import type * as React from "react"

import { useCanvasDesignMode } from "@canvas/react"
import { DURATION, EASE, type EaseName } from "@/lib/easing"
import { cn } from "@/lib/utils"

/**
 * Fades a block up into place the first time it scrolls into view.
 *
 * Purpose: prevents a long marketing page from feeling static — each section
 * arrives as you reach it. Held at its end state while being designed in the
 * editor, so nothing is invisible under the cursor.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  distance = 16,
  duration = DURATION.slow,
  easing = "out",
  as = "div",
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  distance?: number
  duration?: number
  easing?: EaseName
  as?: "div" | "section" | "li"
}) {
  const reduce = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const Component = motion[as]
  const still = reduce || designing
  return (
    <Component
      className={cn(className)}
      initial={still ? false : { opacity: 0, transform: `translateY(${distance}px)` }}
      whileInView={{ opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration, delay, ease: EASE[easing] }}
    >
      {children}
    </Component>
  )
}
