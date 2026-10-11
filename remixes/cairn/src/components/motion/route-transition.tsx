import type * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

/**
 * Each page arrives the same way: a short rise and a fade, keyed by path so
 * a change of page plays it again. Quick (420ms, ease-out) — it says "new
 * page" and gets out of the way.
 */
export function RouteTransition({ path, children, distance = 12 }: { path: string; distance?: number; children?: React.ReactNode }) {
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  if (reduced || designing) return <>{children}</>
  return (
    <motion.div
      data-canvas-ignore
      key={path}
      initial={{ opacity: 0, transform: `translateY(${distance}px)` }}
      animate={{ opacity: 1, transform: "translateY(0px)" }}
      transition={{ duration: 0.42, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  )
}
