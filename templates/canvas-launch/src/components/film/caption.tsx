import type * as React from "react"
import { AnimatePresence, motion } from "motion/react"

import { CAPTION_FROM, CAPTION_IN, CAPTION_OUT, EASE_SWAP } from "@/lib/motion"
import { cn } from "@/lib/utils"

export type CaptionLine = { key: string; text: React.ReactNode }

/**
 * The film's caption: lowercase, one or two lines, centred in a band ruled
 * across the page with a handle at each end — the frame of a selected layer,
 * drawn on the paper.
 *
 * Lines are keyed by their text, so a line the next beat keeps stays put and
 * only the new one arrives — the way the film adds "into codecaine is easy"
 * under "bringing your work" rather than swapping the caption. A line comes
 * up out of faint ink in place; a line that goes is cut.
 */
export function Caption({ lines, className }: { lines: CaptionLine[]; className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-x-0 z-20", className)}>
      <Rules />
      <h2 className="caption relative flex min-h-[2.3em] flex-col items-center justify-center px-4 text-center text-[clamp(32px,5.2vw,92px)] text-ink">
        <AnimatePresence mode="popLayout" initial={false}>
          {lines.map((line, i) => (
            <motion.span
              key={line.key}
              layout="position"
              className="block"
              initial={{ opacity: CAPTION_FROM }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: CAPTION_OUT } }}
              transition={{ duration: CAPTION_IN, ease: EASE_SWAP, delay: i * CAPTION_IN, layout: { duration: CAPTION_IN, ease: EASE_SWAP } }}
            >
              {line.text}
            </motion.span>
          ))}
        </AnimatePresence>
      </h2>
    </div>
  )
}

/** Two hairlines across the page above and below the caption, with handles. */
function Rules() {
  return (
    <div aria-hidden className="absolute inset-x-0 -top-3 -bottom-3">
      {["top-0", "bottom-0"].map((edge) => (
        <div key={edge} className={cn("absolute inset-x-0 h-px bg-paper-rule", edge)}>
          {["left-[3%]", "right-[3%]"].map((side) => (
            <span key={side} className={cn("absolute top-1/2 size-[7px] -translate-y-1/2 border border-ink-faint/70 bg-paper", side)} />
          ))}
        </div>
      ))}
    </div>
  )
}
