import { motion, useReducedMotion } from "motion/react"
import type * as React from "react"

/** Fades and lifts its children into place once they scroll into view. */
export function Reveal({
  delay = 0,
  duration = 0.9,
  distance = 18,
  blur = 6,
  className,
  children,
}: {
  delay?: number
  duration?: number
  distance?: number
  blur?: number
  className?: string
  children?: React.ReactNode
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: distance, filter: `blur(${blur}px)` }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
