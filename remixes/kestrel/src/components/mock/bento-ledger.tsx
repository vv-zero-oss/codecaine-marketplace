import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react"
import { Check } from "lucide-react"
import { useCanvasDesignMode } from "@canvas/react"

import { LEDGER_ROWS } from "@/content/home-top"
import { money } from "@/lib/photos"
import { cn } from "@/lib/utils"

/**
 * Transactions coding themselves: each row's GL account arrives in turn,
 * with a tick, while the ledger is on screen; then the batch clears and the
 * next one starts. Fully coded while designing or reduced.
 */
export function AutoLedger({ step = 0.7, hold = 2.4, className }: { step?: number; hold?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: "-15% 0px" })
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = reduced || designing
  const [coded, setCoded] = useState(still ? LEDGER_ROWS.length : 0)

  useEffect(() => {
    if (still) {
      setCoded(LEDGER_ROWS.length)
      return
    }
    if (!inView) return
    const done = coded >= LEDGER_ROWS.length
    const t = window.setTimeout(() => setCoded(done ? 0 : coded + 1), (done ? hold : step) * 1000)
    return () => window.clearTimeout(t)
  }, [inView, coded, still, step, hold])

  return (
    <div ref={ref} className={cn("overflow-hidden rounded-t-(--radius-card) bg-raised shadow-(--shadow-float)", className)}>
      <div className="flex items-center justify-between border-b border-line px-3.5 py-2.5">
        <span className="type-eyebrow text-[10px] text-ink-3">September close</span>
        <span className="font-mono text-[11px] text-ink-2 tabular-nums">
          {coded}/{LEDGER_ROWS.length} coded
        </span>
      </div>
      <ul>
        {LEDGER_ROWS.map((row, i) => {
          const done = i < coded
          return (
            <li key={row.vendor} className="grid grid-cols-[1fr_auto] items-center gap-x-3 border-b border-line px-3.5 py-2 last:border-0">
              <span className="truncate text-[13px] text-ink">{row.vendor}</span>
              <span className="text-right font-mono text-[12px] text-ink-2 tabular-nums">{money(row.amount)}</span>
              <span className="relative h-5 overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  {done ? (
                    <motion.span
                      key="code"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, transition: { duration: 0.15 } }}
                      transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                      className="absolute inset-0 flex items-center text-[11.5px] text-ink-3"
                    >
                      {row.code}
                    </motion.span>
                  ) : (
                    <motion.span key="empty" exit={{ opacity: 0 }} className="absolute inset-y-1.5 left-0 w-24 rounded-full bg-panel" />
                  )}
                </AnimatePresence>
              </span>
              <span className={cn("grid size-4 place-items-center justify-self-end rounded-full transition-colors duration-(--duration-hover)", done ? "bg-signal-green text-white" : "bg-panel text-transparent")}>
                <Check className="size-2.5" strokeWidth={3} />
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
