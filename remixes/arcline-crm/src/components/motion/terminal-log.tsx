import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { curve } from "@/lib/motion"
import { cn } from "@/lib/utils"

/**
 * The status readout in the corner of a figure: the current step in full,
 * the one before it dimmed above, and a blinking prompt while it works.
 *
 * `lines` is one string, a step per line, so it stays a single editable text
 * prop in the canvas editor. Steps roll up every `interval` seconds; held on
 * the last one while designing and for reduced motion.
 */
export function TerminalLog({
  lines,
  interval = 1.8,
  paused = false,
  className,
}: {
  lines: string
  interval?: number
  paused?: boolean
  className?: string
}) {
  const steps = lines.split("\n").filter(Boolean)
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = paused || designing || reduced
  const [at, setAt] = useState(still ? steps.length - 1 : 0)

  useEffect(() => {
    if (still) {
      setAt(steps.length - 1)
      return
    }
    const id = window.setInterval(() => setAt((n) => (n + 1) % steps.length), interval * 1000)
    return () => window.clearInterval(id)
  }, [still, interval, steps.length])

  const previous = at > 0 ? steps[at - 1] : null

  return (
    <div className={cn("type-eyebrow relative h-[54px] overflow-hidden leading-[20px]", className)} aria-live="off">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          key={at}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={curve("out", 0.4)}
        >
          <div className="text-faint">{previous ?? " "}</div>
          <div className="text-muted">{steps[at]}</div>
        </motion.div>
      </AnimatePresence>
      <div className="text-faint">
        <span className="animate-caret motion-reduce:animate-none">{at === steps.length - 1 ? ">" : "…"}</span>
      </div>
    </div>
  )
}
