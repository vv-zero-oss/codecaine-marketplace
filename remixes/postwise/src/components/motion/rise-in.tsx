import type * as React from "react"
import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { cn } from "@/lib/utils"

/**
 * The hero's product frame: it rises out of a blur as the page loads, then
 * grows to full size as it scrolls up to meet the reader.
 *
 * Measured off the reference: 0.1s in, ~0.8s to rest, blur 16px → 0 with a
 * fast-start ease-out and only a short rise; the scroll-linked scale goes from 0.9 to 1 over the
 * frame's first screen.
 */
export function RiseIn({
  delay = 0.1,
  duration = 0.8,
  blur = 16,
  distance = 24,
  scaleFrom = 0.9,
  className,
  children,
}: {
  delay?: number
  duration?: number
  blur?: number
  distance?: number
  /** The scale it starts from before scroll brings it to 1. */
  scaleFrom?: number
  className?: string
  children?: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = reduced || designing
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.25"] })
  const scale = useTransform(scrollYProgress, [0, 1], [still ? 1 : scaleFrom, 1])

  return (
    <motion.div ref={ref} style={{ scale }} className={cn("origin-top", className)}>
      <motion.div
        initial={still ? false : { opacity: 0, y: distance, filter: `blur(${blur}px)` }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ delay, duration, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
