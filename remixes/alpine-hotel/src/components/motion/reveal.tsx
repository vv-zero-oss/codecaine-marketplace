import type { ReactNode } from "react"
import { motion, useReducedMotion } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"
import { EASE_OUT } from "@/components/motion/smooth-scroll"
import { cn } from "@/lib/utils"

/**
 * Fades and lifts its content the first time it scrolls into view. `delay`
 * staggers siblings; `distance` is the lift in px. While the page is being
 * designed in the editor it holds at its end state.
 */
export function Reveal({
  children,
  delay = 0,
  distance = 24,
  duration = 0.7,
  className,
}: {
  children: ReactNode
  delay?: number
  distance?: number
  duration?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  if (reduce || designing) return <div className={className}>{children}</div>
  return (
    <motion.div
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration, delay, ease: EASE_OUT }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
