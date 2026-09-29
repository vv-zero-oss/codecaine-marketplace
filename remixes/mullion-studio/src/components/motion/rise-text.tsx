import { motion, useReducedMotion } from "motion/react"

import { EASINGS, type EasingName } from "@/lib/motion"
import { cn } from "@/lib/utils"

/**
 * Oversize letters that rise out of a mask one after another the first time
 * they come into view. The mask is the line box itself, so each letter slides
 * up from behind its own baseline rather than fading in from nowhere.
 */
export function RiseText({
  text = "Mullion",
  stagger = 0.045,
  duration = 1.1,
  delay = 0,
  easing = "expo",
  once = true,
  className,
}: {
  text?: string
  stagger?: number
  duration?: number
  delay?: number
  easing?: EasingName
  once?: boolean
  className?: string
}) {
  const reduced = useReducedMotion()
  return (
    <motion.span
      key={`${text}-${stagger}-${duration}-${easing}`}
      className={cn("inline-flex overflow-hidden", className)}
      aria-label={text}
      initial="hidden"
      whileInView="shown"
      viewport={{ once, amount: 0.4 }}
    >
      {[...text].map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block will-change-transform"
          variants={{
            hidden: reduced ? { y: 0 } : { y: "105%" },
            shown: { y: 0, transition: { duration, ease: EASINGS[easing], delay: delay + i * stagger } },
          }}
        >
          {ch === " " ? " " : ch}
        </motion.span>
      ))}
    </motion.span>
  )
}
