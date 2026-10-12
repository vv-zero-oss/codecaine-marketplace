import { motion, useReducedMotion } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { cn } from "@/lib/utils"

/**
 * A lime stroke that draws itself under a phrase once, the first time it is
 * seen — the one mark on the closing line, pointing at the payoff.
 */
export function UnderlineDraw({
  duration = 0.9,
  delay = 0.35,
  thickness = 7,
  className,
}: {
  duration?: number
  delay?: number
  thickness?: number
  className?: string
}) {
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = reduced || designing
  return (
    <svg viewBox="0 0 300 20" preserveAspectRatio="none" aria-hidden className={cn("pointer-events-none absolute inset-x-0 -bottom-[0.08em] h-[0.2em] w-full", className)}>
      <motion.path
        d="M3 13 C 70 5, 150 4, 297 9"
        fill="none"
        stroke="var(--color-lime)"
        strokeWidth={thickness}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={still ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "0px 0px -20% 0px" }}
        transition={{ duration, delay, ease: [0.77, 0, 0.175, 1] }}
      />
    </svg>
  )
}
