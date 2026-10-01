import { motion, useReducedMotion } from "motion/react"
import type { ReactNode } from "react"

/** Fades and lifts its child once, as it scrolls into view. Why: it paces a long page so each block lands as you reach it. */
export function Reveal({
  delay = 0,
  distance = 14,
  duration = 0.6,
  className,
  children,
}: {
  /** Seconds before it starts. */
  delay?: number
  /** Pixels it rises from. */
  distance?: number
  duration?: number
  className?: string
  children: ReactNode
}) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
