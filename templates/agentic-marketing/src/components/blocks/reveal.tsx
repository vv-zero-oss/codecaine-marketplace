import { motion, useReducedMotion } from "motion/react"
import type * as React from "react"

/**
 * Scroll reveal for the marketing sections: a short rise and fade, once.
 * Purpose: pacing — each block arrives as the reader reaches it, rather than
 * the whole page being there before the eye is. Reduced motion keeps the fade
 * and drops the movement.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  as?: "div" | "li" | "article"
}) {
  const reduce = useReducedMotion()
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, transform: reduce ? "none" : "translateY(14px)" }}
      whileInView={{ opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay }}
    >
      {children}
    </Tag>
  )
}
