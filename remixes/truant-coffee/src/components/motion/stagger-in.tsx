import type * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

/**
 * A row of things that arrive one after another when the row scrolls into
 * view — 18px rise, 60ms apart. Each child keeps its own element; this only
 * times them.
 */
export function StaggerIn({ stagger = 0.06, y = 18, className, children }: { stagger?: number; y?: number; className?: string; children?: React.ReactNode }) {
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  if (reduced || designing) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  )
}

export const staggerItem = {
  hidden: { opacity: 0, y: 18 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] } },
}
