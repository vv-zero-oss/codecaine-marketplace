import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

/**
 * The bot at work: a request, a thinking beat, then the answer. It loops so a
 * visitor sees the whole turn without touching anything.
 */
export function BotPreview({ cycle = 7000, className }: { cycle?: number; className?: string }) {
  const reduced = useReducedMotion()
  const [phase, setPhase] = useState<"thinking" | "answer">(reduced ? "answer" : "thinking")
  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => setPhase((p) => (p === "thinking" ? "answer" : "thinking")), cycle / 2)
    return () => window.clearInterval(id)
  }, [reduced, cycle])

  return (
    <div className={cn("flex h-full flex-col justify-center gap-3 px-5", className)}>
      <p className="max-w-[88%] self-end rounded-2xl bg-bubble-dark px-3.5 py-2.5 text-[13px] leading-snug text-paper">
        month-end is friday, close out the card for me?
      </p>
      <div className="relative min-h-[84px]">
        <AnimatePresence mode="wait" initial={false}>
          {phase === "thinking" ? (
            <motion.div
              key="thinking"
              className="flex items-center gap-1.5 px-1 pt-4 text-[12px] text-ink-3"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="flex gap-1">
                {[0, 0.15, 0.3].map((d) => (
                  <span key={d} className="size-2 animate-dot rounded-full bg-accent" style={{ animationDelay: `${d}s` }} />
                ))}
              </span>
              Thinking
            </motion.div>
          ) : (
            <motion.p
              key="answer"
              className="max-w-[92%] self-start rounded-2xl bg-surface-2 px-3.5 py-2.5 text-[13px] leading-snug text-ink"
              initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              i'll match every charge to a receipt and file the report. anything that doesn't line up, i ask instead of guessing.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
