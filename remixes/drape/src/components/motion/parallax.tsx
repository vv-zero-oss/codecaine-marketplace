import { useCanvasDesignMode } from "@canvas/react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useRef, type ReactNode } from "react"

import { cn } from "@/lib/utils"

/**
 * Parallax — moves its content against the scroll by `distance` pixels over
 * the time it crosses the screen. Positive drifts up faster than the page,
 * negative lags behind it. Off under reduced motion, halved on phones, and
 * still while designing.
 */
export function Parallax({
  children,
  distance = 80,
  className,
}: {
  children: ReactNode
  distance?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const scale = typeof window !== "undefined" && window.innerWidth < 640 ? 0.5 : 1
  const still = reduced || designing
  const y = useTransform(scrollYProgress, [0, 1], still ? [0, 0] : [distance * scale, -distance * scale])
  return (
    <motion.div ref={ref} style={{ y }} className={cn(className)}>
      {children}
    </motion.div>
  )
}
