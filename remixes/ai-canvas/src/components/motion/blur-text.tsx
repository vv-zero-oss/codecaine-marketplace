import { Fragment } from "react"
import { motion, useReducedMotion } from "motion/react"

import { BLUR, DURATION, EASE_OUT, STAGGER } from "@/lib/motion"
import { cn } from "@/lib/utils"

/**
 * Words that arrive out of focus and sharpen, one after another — the
 * reference's reveal, read off its frames: no travel, only blur and opacity,
 * ~0.6s each, strongly eased out.
 *
 * `by="line"` brings the whole line in at once; `by="word"` staggers it.
 * Reduced motion keeps the fade and drops the blur.
 */
export function BlurText({
  text,
  by = "word",
  stagger = STAGGER,
  duration = DURATION.reveal,
  delay = 0,
  blur = BLUR,
  from = "transparent",
  once = false,
  className,
}: {
  text: string
  by?: "word" | "line"
  stagger?: number
  duration?: number
  delay?: number
  blur?: number
  /** Where the words start: invisible, or visible in the muted ink. */
  from?: "transparent" | "muted"
  once?: boolean
  className?: string
}) {
  const reduced = useReducedMotion()
  // Always word by word, so a long line can wrap on a phone; "line" just
  // brings every word in on the same beat.
  const parts = text.split(" ")
  const hidden = {
    opacity: from === "muted" ? 0.35 : 0,
    filter: reduced ? "blur(0px)" : `blur(${blur}px)`,
  }
  return (
    <motion.span
      className={cn("inline-block", className)}
      initial="hidden"
      whileInView="shown"
      viewport={{ once, amount: 0.6 }}
      transition={{ staggerChildren: by === "word" ? stagger : 0, delayChildren: delay }}
    >
      {parts.map((part, i) => (
        <Fragment key={`${part}-${i}`}>
          <motion.span
            className="inline-block will-change-[filter,opacity]"
            variants={{
              hidden,
              shown: { opacity: 1, filter: "blur(0px)", transition: { duration, ease: EASE_OUT } },
            }}
          >
            {part}
          </motion.span>
          {i < parts.length - 1 ? " " : null}
        </Fragment>
      ))}
    </motion.span>
  )
}
