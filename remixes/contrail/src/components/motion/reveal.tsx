import type * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { curve, type Easing } from "@/lib/motion"

/**
 * Content that rises into place the first time it scrolls into view.
 *
 * Short travel (24px) and an ease-out, so a section feels like it arrives
 * rather than performs. Shown at its end state while the page is being
 * designed and for reduced motion — nobody styles an element that is
 * invisible.
 */
export function Reveal({
  y = 24,
  delay = 0,
  duration = 0.7,
  easing = "out",
  as = "div",
  className,
  children,
}: {
  y?: number
  delay?: number
  duration?: number
  easing?: Easing
  as?: "div" | "section" | "li" | "article"
  className?: string
  children?: React.ReactNode
}) {
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const Tag = motion[as]

  if (reduced || designing) {
    const Plain = as
    return <Plain className={className}>{children}</Plain>
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ ...curve(easing, duration), delay }}
    >
      {children}
    </Tag>
  )
}
