import { motion, useReducedMotion } from "motion/react"
import type * as React from "react"
import { useCanvasDesignMode } from "@canvas/react"

import { cn } from "@/lib/utils"

/** The curves a `Reveal` can take, named the way a designer would pick them. */
export type RevealEasing = "out" | "in-out" | "spring"

const EASINGS = {
  out: [0.23, 1, 0.32, 1],
  "in-out": [0.77, 0, 0.175, 1],
} as const

/**
 * The page's one entrance: a blur that clears as the element fades in and
 * rises a few pixels. Read off the reference frame by frame — about 600ms,
 * a strong ease-out, 8px of blur and ~16px of travel, each block following
 * the one above it by ~60–100ms.
 *
 * Plays once, when the element first scrolls into view. Reduced motion keeps
 * the fade and drops the blur and travel; in the canvas editor it holds at
 * its end state so the page can be designed.
 */
export function Reveal({
  children,
  delay = 0,
  duration = 0.6,
  distance = 16,
  blur = 8,
  easing = "out",
  once = true,
  className,
}: {
  children: React.ReactNode
  delay?: number
  duration?: number
  distance?: number
  blur?: number
  easing?: RevealEasing
  once?: boolean
  className?: string
}) {
  const reduce = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const travel = reduce ? 0 : distance
  const haze = reduce ? 0 : blur
  const transition =
    easing === "spring"
      ? { type: "spring" as const, duration, bounce: 0.2, delay }
      : { duration: reduce ? 0.3 : duration, ease: EASINGS[easing], delay }

  return (
    <motion.div
      className={cn(className)}
      initial={designing ? false : { opacity: 0, filter: `blur(${haze}px)`, transform: `translateY(${travel}px)` }}
      whileInView={{ opacity: 1, filter: "blur(0px)", transform: "translateY(0px)" }}
      viewport={{ once, margin: "0px 0px -10% 0px" }}
      transition={transition}
    >
      {children}
    </motion.div>
  )
}
