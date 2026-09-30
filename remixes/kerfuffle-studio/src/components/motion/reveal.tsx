import { motion } from "motion/react"
import type { ReactNode } from "react"

import { useCanvasDesignMode } from "@canvas/react"

import { cn } from "@/lib/utils"

/**
 * Rises into place the first time it scrolls into view. While the page is
 * being designed it sits at its end state, so nothing is caught mid-flight.
 */
export function Reveal({
  children,
  delay = 0,
  distance = 28,
  duration = 0.8,
  className,
}: {
  children: ReactNode
  delay?: number
  distance?: number
  duration?: number
  className?: string
}) {
  const { designing } = useCanvasDesignMode()
  return (
    <motion.div
      className={cn(className)}
      initial={designing ? false : { opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
