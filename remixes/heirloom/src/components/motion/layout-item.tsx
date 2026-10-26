import { motion, useReducedMotion } from "motion/react"
import type * as React from "react"

/**
 * A grid item that slides to its new place when a filter changes the grid,
 * and fades out of a blur when it leaves — so a visitor sees which cards
 * stayed rather than a grid that blinked. Wrap the list in `AnimatePresence
 * mode="popLayout"`.
 */
export function LayoutItem({
  duration = 0.5,
  scale = 0.96,
  className,
  children,
}: {
  duration?: number
  scale?: number
  className?: string
  children?: React.ReactNode
}) {
  const reduce = useReducedMotion()
  const hidden = reduce ? { opacity: 0 } : { opacity: 0, scale, filter: "blur(6px)" }
  return (
    <motion.div
      layout={!reduce}
      className={className}
      initial={hidden}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={hidden}
      transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
