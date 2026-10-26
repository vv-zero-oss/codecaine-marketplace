import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { DURATION, EASE } from "@/lib/easing"
import { cn } from "@/lib/utils"

/**
 * One line of a headline that changes with the hero's scene: the old words
 * sink and blur away while the new ones rise into place.
 *
 * Purpose: state indication — the headline names what the picture shows.
 * Measured off the reference: ~360ms, a strong ease-out, a short drop of about
 * a third of the line height, with a light blur on the way.
 */
export function RotatingLine({
  text,
  distance = 0.32,
  duration = DURATION.base,
  blur = 6,
  className,
}: {
  text: string
  distance?: number
  duration?: number
  blur?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  const offset = reduce ? 0 : distance
  return (
    <span className={cn("relative block", className)}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={text}
          className="block"
          initial={{ opacity: 0, transform: `translateY(${offset}em)`, filter: `blur(${reduce ? 0 : blur}px)` }}
          animate={{ opacity: 1, transform: "translateY(0em)", filter: "blur(0px)" }}
          exit={{ opacity: 0, transform: `translateY(${offset * 0.6}em)`, filter: `blur(${reduce ? 0 : blur}px)` }}
          transition={{ duration, ease: EASE.out }}
        >
          {text}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
