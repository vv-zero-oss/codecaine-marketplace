import { useRef, type ReactNode } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { cn } from "@/lib/utils"

/**
 * The pale chapter that rises over the night with rounded shoulders, and as
 * it leaves, draws in: it scales down from the top and rounds its lower
 * corners, so the dark section after it reads as a card coming up from
 * underneath.
 *
 * Read off the reference frame by frame: full width while it is read, then
 * over its last window of scroll it settles to ~92% width and its bottom
 * corners grow to the same radius as the top ones.
 */
export function RisingPanel({
  scaleTo = 0.92,
  radius = 32,
  className,
  children,
  id,
}: {
  /** How far it draws in, as a scale, by the time it has scrolled away. */
  scaleTo?: number
  /** Corner radius, in px. */
  radius?: number
  className?: string
  children?: ReactNode
  id?: string
}) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["end end", "end start"] })
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, scaleTo])
  const bottom = useTransform(scrollYProgress, [0, 0.4], [0, radius])
  const still = reduced || designing

  return (
    <motion.section
      ref={ref}
      id={id}
      className={cn("relative z-10 origin-top bg-day text-day-ink shadow-(--shadow-panel-day)", className)}
      style={{
        borderTopLeftRadius: radius,
        borderTopRightRadius: radius,
        borderBottomLeftRadius: still ? radius : bottom,
        borderBottomRightRadius: still ? radius : bottom,
        scale: still ? 1 : scale,
      }}
    >
      {children}
    </motion.section>
  )
}
