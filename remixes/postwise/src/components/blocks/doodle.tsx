import { motion, useReducedMotion } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { cn } from "@/lib/utils"

/**
 * A handwritten note with a looping arrow, pointing at something worth
 * clicking. The arrow draws itself once when it scrolls into view.
 */
export function Doodle({
  text = "click me!",
  arrow = "down-left",
  tone = "paper",
  className,
}: {
  text?: string
  arrow?: "down-left" | "down-right" | "down"
  tone?: "paper" | "night"
  className?: string
}) {
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = reduced || designing

  const paths = {
    "down-left": "M78 6 C 70 30, 40 20, 44 40 C 47 54, 66 46, 56 34 C 46 24, 26 44, 8 62 M8 62 l 2 -12 M8 62 l 12 -3",
    "down-right": "M10 6 C 20 30, 50 18, 46 40 C 43 54, 24 46, 34 34 C 44 24, 64 44, 82 62 M82 62 l -2 -12 M82 62 l -12 -3",
    down: "M40 4 C 60 20, 20 30, 40 46 C 48 52, 44 58, 40 66 M40 66 l -7 -8 M40 66 l 7 -8",
  } as const

  return (
    <div
      className={cn(
        "pointer-events-none flex flex-col items-center gap-0 font-hand select-none",
        tone === "night" ? "text-night-fg" : "text-ink",
        className,
      )}
    >
      <span className="-rotate-12 text-[26px] leading-[0.8] whitespace-pre-line">{text}</span>
      <svg viewBox="0 0 90 70" className="h-14 w-20" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round">
        <motion.path
          d={paths[arrow]}
          initial={still ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1], delay: 0.2 }}
        />
      </svg>
    </div>
  )
}

/** Three short strokes that flick out from a word, like a hand-drawn spark. */
export function Spark({ side = "left", className }: { side?: "left" | "right"; className?: string }) {
  return (
    <svg
      viewBox="0 0 16 24"
      aria-hidden
      className={cn("inline-block h-[0.55em] w-auto align-middle", side === "right" && "-scale-x-100", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
    >
      <path d="M14 3 8 7M13 12H5M14 21l-6-4" />
    </svg>
  )
}

/** A small hand-drawn heart pair, for the testimonials heading. */
export function Hearts({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 34" aria-hidden className={cn("inline-block h-[0.8em] w-auto", className)} fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round">
      <path d="M10 14c-4-5-9-1-6 3l6 6 6-7c3-4-2-8-6-2Z" />
      <path d="M20 5c-2-3-6 0-4 2l4 4 4-4c2-3-2-5-4-2Z" />
      <path d="M22 22l3 6M18 26l1 5" />
    </svg>
  )
}
