import { motion, useReducedMotion } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { curve, type Easing } from "@/lib/motion"
import { cn } from "@/lib/utils"

/**
 * A stacked headline whose lines rise out of their own baselines one after
 * another — the way the reference's hero type arrives. Lines are one string
 * split on "|", so the editor edits the words as a single prop. Measured off
 * the recording: each line travels its full height in ~0.9s on the strong
 * ease-out, 80ms apart.
 */
export function LineReveal({
  text = "Take|the|long|way",
  stagger = 0.08,
  duration = 0.9,
  delay = 0.1,
  easing = "out",
  as = "h1",
  className,
  lineClassName,
}: {
  text?: string
  stagger?: number
  duration?: number
  delay?: number
  easing?: Easing
  as?: "h1" | "h2" | "p"
  className?: string
  lineClassName?: string
}) {
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = reduced || designing
  const Tag = as
  const lines = text.split("|")
  return (
    <Tag className={className} aria-label={lines.join(" ")}>
      {lines.map((line, i) => (
        <span key={`${line}-${i}`} aria-hidden className="block overflow-hidden pb-[0.04em]">
          <motion.span
            className={cn("block", lineClassName)}
            initial={still ? false : { y: "105%" }}
            animate={{ y: "0%" }}
            transition={{ ...curve(easing, duration), delay: delay + i * stagger }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
