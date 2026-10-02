import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Bus, Coffee, MapPin, Zap, type LucideIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useCanvasDesignMode } from "@canvas/react"

import { cn } from "@/lib/utils"

const EXAMPLES: { merchant: string; amount: string; when: string; tag: string; icon: LucideIcon }[] = [
  { merchant: "Cabco", amount: "−$38.50", when: "Today, 11:30 AM", tag: "Transport", icon: Bus },
  { merchant: "Blue Bottle", amount: "−$4.50", when: "Today, 8:12 AM", tag: "Food & drinks", icon: Coffee },
  { merchant: "Northline Power", amount: "−$62.00", when: "Yesterday, 7:02 PM", tag: "Utilities", icon: Zap },
]

const CHIPS = ["Transport", "Investment", "Food & drinks", "Personal", "Medical", "Gift", "Utilities", "Salary", "Shopping", "Groceries", "Entertainment", "Insurance"]

const PINS: [number, number][] = [[18, 22], [38, 12], [52, 38], [28, 52], [70, 20], [64, 62], [14, 70]]

/**
 * A payment arrives, its merchant is placed on a map and its category lights up,
 * then the next one does. `interval` is the time on each example in ms; `paused`
 * (and design mode, and reduced motion) hold it on the first example.
 */
export function MerchantMatch({ interval = 3200, paused = false, className }: { interval?: number; paused?: boolean; className?: string }) {
  const [index, setIndex] = useState(0)
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const hold = paused || reduced || designing

  useEffect(() => {
    if (hold) return
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % EXAMPLES.length), interval)
    return () => window.clearInterval(timer)
  }, [hold, interval])

  const current = EXAMPLES[index]
  return (
    <div className={cn("grid overflow-hidden rounded-3xl border border-ink-100 bg-white md:grid-cols-2", className)}>
      <div className="relative min-h-56 border-b border-ink-100 md:border-r md:border-b-0">
        <svg viewBox="0 0 100 80" preserveAspectRatio="none" className="absolute inset-0 size-full text-ink-200" aria-hidden="true">
          <g fill="none" stroke="currentColor" strokeWidth="0.6" vectorEffect="non-scaling-stroke">
            <path d="M0 30L25 28 32 18 44 18 44 6M25 28L22 62 40 62 40 80M44 34L60 24 82 24M60 24V6M0 72L18 64M60 50L100 46M60 50V80" />
          </g>
        </svg>
        {PINS.map(([x, y], i) => (
          <MapPin key={i} className={cn("absolute size-5 -translate-x-1/2 -translate-y-full text-ink-400 transition-colors duration-300", i === index % PINS.length && "text-brand-600")} style={{ left: `${x}%`, top: `${y}%` }} fill="currentColor" strokeWidth={1.5} stroke="white" />
        ))}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.merchant}
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-4 bottom-4 left-4 rounded-xl bg-white p-4 shadow-lift"
          >
            <p className="text-sm font-semibold text-ink-600">{current.merchant}</p>
            <p className="tabular mt-1 text-2xl font-extrabold">{current.amount}</p>
            <p className="mt-0.5 text-xs text-ink-400">{current.when}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex flex-wrap content-center gap-2 p-5 sm:p-8">
        {CHIPS.map((chip) => {
          const active = chip === current.tag
          return (
            <span
              key={chip}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold tracking-wide uppercase transition-[background-color,color,transform,box-shadow] duration-300 ease-[var(--ease-out)]",
                active ? "scale-105 bg-ink-900 text-white shadow-lift" : "bg-ink-50 text-ink-400",
              )}
            >
              {active ? <current.icon className="size-3.5" /> : null}
              {chip}
            </span>
          )
        })}
      </div>
    </div>
  )
}
