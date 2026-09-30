import { useCanvasDesignMode } from "@canvas/react"
import { motion, useReducedMotion } from "motion/react"
import type { ReactNode } from "react"

import { ease } from "@/lib/tokens"
import { cn } from "@/lib/utils"

/**
 * FadeIn — the page's one entrance: 16px up and in, ease-out, once, when a
 * block first scrolls into view. Held at its end state while designing.
 */
export function FadeIn({
  children,
  delay = 0,
  distance = 16,
  duration = 600,
  className,
}: {
  children: ReactNode
  delay?: number
  distance?: number
  duration?: number
  className?: string
}) {
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = reduced || designing
  return (
    <motion.div
      className={cn(className)}
      initial={still ? false : { opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: duration / 1000, delay: delay / 1000, ease: ease.out }}
    >
      {children}
    </motion.div>
  )
}
