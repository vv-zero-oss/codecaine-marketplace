import type * as React from "react"
import { motion, useReducedMotion } from "motion/react"

import { useCanvasDesignMode } from "@canvas/react"
import { cn } from "@/lib/utils"

const EASE = [0.23, 1, 0.32, 1] as const

/**
 * Fades and lifts its content in once, the first time it scrolls into view.
 * It exists so a section arrives rather than pops; it never repeats.
 * Held at its end state while the page is being designed.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  distance = 16,
  duration = 0.7,
  as = "div",
}: {
  children?: React.ReactNode
  className?: string
  /** Seconds before it starts. */
  delay?: number
  /** Pixels it rises. */
  distance?: number
  /** Seconds. */
  duration?: number
  as?: "div" | "li" | "section" | "article"
}) {
  const reduce = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const Tag = motion[as]
  const still = designing || reduce
  return (
    <Tag
      className={cn(className)}
      initial={still ? false : { opacity: 0, transform: `translateY(${distance}px)` }}
      whileInView={{ opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </Tag>
  )
}
