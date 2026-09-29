import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"
import { DURATION, EASE_OUT } from "@/lib/motion"

/**
 * Display words that rise into place letter by letter, each out of its own
 * masked line, the first time they are on screen (or when `play` flips true —
 * the hero waits for the preloader). The letters are there for screen readers
 * as one word; the split copies are hidden from them.
 */
export function RiseText({
  text,
  className,
  letterClassName,
  play,
  delay = 0,
  stagger = 0.045,
}: {
  text: string
  className?: string
  letterClassName?: string
  play?: boolean
  delay?: number
  stagger?: number
}) {
  const reduced = useReducedMotion()
  // Watched on the line, not the letters: a letter pushed below its masked
  // line is clipped away, so it would never count as in view itself.
  const line = useRef<HTMLSpanElement>(null)
  const seen = useInView(line, { once: true, margin: "0px 0px -10% 0px" })
  const on = play ?? seen
  const shown = { transform: "translateY(0%)", opacity: 1 }
  const hidden = reduced ? { transform: "translateY(0%)", opacity: 0 } : { transform: "translateY(105%)", opacity: 1 }
  return (
    <span ref={line} className={cn("inline-block overflow-hidden pb-[0.04em] align-bottom", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="inline-flex">
        {[...text].map((ch, i) => (
          <motion.span
            key={i}
            className={cn("inline-block whitespace-pre", letterClassName)}
            initial={hidden}
            animate={on ? shown : hidden}
            transition={{ duration: reduced ? 0.3 : DURATION.hero, ease: EASE_OUT, delay: delay + i * stagger }}
          >
            {ch === " " ? <span className="inline-block w-[0.22em]" /> : ch}
          </motion.span>
        ))}
      </span>
    </span>
  )
}
