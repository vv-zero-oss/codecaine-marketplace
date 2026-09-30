import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import type { ReactNode } from "react"

import { useCanvasDesignMode } from "@canvas/react"
import { ease } from "@/lib/motion-tokens"
import { cn } from "@/lib/utils"

/**
 * A tilted card that hangs at the edge of the hero and drifts.
 *
 * Three layers of motion, each with a reason: it settles in after the intro
 * text (so the words are read first), it breathes in place (so the hero is
 * alive while nobody scrolls), and it rises faster than the page as
 * the hero leaves (so it clears out of the way of the work below).
 *
 * Every knob is a scalar prop. The drift stops in the editor while the page
 * is being designed and under reduced motion.
 */
export function FloatingCard({
  top = "10%",
  left,
  right,
  rotate = -8,
  size = "md",
  drift = 10,
  driftSeconds = 7,
  delay = 0.25,
  parallax = 160,
  className,
  children,
}: {
  top?: string
  left?: string
  right?: string
  /** Resting tilt, in degrees. */
  rotate?: number
  size?: "sm" | "md" | "lg"
  /** How far it bobs, in px. 0 holds it still. */
  drift?: number
  /** One full bob, in seconds. */
  driftSeconds?: number
  /** Wait after the page arrives, in seconds. */
  delay?: number
  /** How much faster than the page it leaves, in px over the hero. */
  parallax?: number
  className?: string
  children: ReactNode
}) {
  const reduce = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = reduce || designing || drift === 0
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 700], [0, reduce ? 0 : -parallax])

  return (
    <motion.div
      className={cn(
        "pointer-events-none absolute z-10",
        size === "sm" && "w-[7.5rem] sm:w-36 lg:w-40",
        size === "md" && "w-32 sm:w-40 lg:w-48",
        size === "lg" && "w-36 sm:w-44 lg:w-56",
        className,
      )}
      style={{ top, left, right, y }}
    >
      <motion.div
        className="pointer-events-auto"
        initial={reduce ? false : { opacity: 0, scale: 0.9, rotate: rotate * 0.4 }}
        animate={{ opacity: 1, scale: 1, rotate }}
        transition={{ delay, duration: 0.9, ease: ease("out") }}
      >
        <motion.div
          animate={still ? { y: 0 } : { y: [0, -drift, 0] }}
          transition={still ? { duration: 0 } : { duration: driftSeconds, ease: ease("in-out"), repeat: Infinity, delay }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
