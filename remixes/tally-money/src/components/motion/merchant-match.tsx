import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Briefcase, Bus, Coffee, MapPin, ShoppingBag, Tv, Utensils, Zap, type LucideIcon } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useCanvasDesignMode } from "@canvas/react"

import { cn } from "@/lib/utils"

const EXAMPLES: { merchant: string; amount: string; when: string; tag: string; icon: LucideIcon }[] = [
  { merchant: "Cabco", amount: "−$38.50", when: "Today, 11:30 AM", tag: "Transport", icon: Bus },
  { merchant: "Blue Bottle", amount: "−$4.50", when: "Today, 8:12 AM", tag: "Coffee", icon: Coffee },
  { merchant: "Northline Power", amount: "−$62.00", when: "Yesterday, 7:02 PM", tag: "Utilities", icon: Zap },
  { merchant: "Northwind Ltd", amount: "+$6,000", when: "1 Jul, 7:20 PM", tag: "Salary", icon: Briefcase },
  { merchant: "Market & Co", amount: "−$38.00", when: "Today, 6:21 PM", tag: "Shopping", icon: ShoppingBag },
  { merchant: "Streamly", amount: "−$13.00", when: "30 Nov, 12:15 AM", tag: "Subscription", icon: Tv },
  { merchant: "Olive & Rye", amount: "−$54.20", when: "Sat, 9:40 PM", tag: "Dining", icon: Utensils },
]

const PINS: [number, number][] = [[18, 22], [38, 12], [52, 38], [28, 52], [70, 20], [64, 62], [14, 70]]

/**
 * A payment arrives, its merchant is placed on a map and its category lights up,
 * then the next one does. Tap any category to jump to its payment; the cycle
 * waits `hold` ms before it carries on. `interval` is the time on each example
 * in ms; `paused` (and design mode, and reduced motion) hold it on one.
 */
export function MerchantMatch({ interval = 3200, hold = 7000, paused = false, className }: { interval?: number; hold?: number; paused?: boolean; className?: string }) {
  const [index, setIndex] = useState(0)
  const resumeAt = useRef(0)
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = paused || reduced || designing

  useEffect(() => {
    if (still) return
    const timer = window.setInterval(() => {
      if (Date.now() < resumeAt.current) return
      setIndex((i) => (i + 1) % EXAMPLES.length)
    }, interval)
    return () => window.clearInterval(timer)
  }, [still, interval])

  const pick = (i: number) => {
    resumeAt.current = Date.now() + hold
    setIndex(i)
  }

  const current = EXAMPLES[index]
  const pin = PINS[index % PINS.length]
  return (
    <div className={cn("grid overflow-hidden rounded-3xl border border-ink-100 bg-white md:grid-cols-2", className)}>
      <div className="relative min-h-56 border-b border-ink-100 md:border-r md:border-b-0">
        <svg viewBox="0 0 100 80" preserveAspectRatio="none" className="absolute inset-0 size-full text-ink-200" aria-hidden="true">
          <g fill="none" stroke="currentColor" strokeWidth="0.6" vectorEffect="non-scaling-stroke">
            <path d="M0 30L25 28 32 18 44 18 44 6M25 28L22 62 40 62 40 80M44 34L60 24 82 24M60 24V6M0 72L18 64M60 50L100 46M60 50V80" />
          </g>
        </svg>
        {PINS.map(([x, y], i) => (
          <MapPin
            key={i}
            className={cn("absolute size-5 -translate-x-1/2 -translate-y-full text-ink-400 transition-colors duration-300", PINS[index % PINS.length] === PINS[i] && "text-brand-600")}
            style={{ left: `${x}%`, top: `${y}%` }}
            fill="currentColor"
            strokeWidth={1.5}
            stroke="white"
          />
        ))}
        {/* A ring that lands where the merchant was found. */}
        <motion.span
          key={index}
          aria-hidden="true"
          className="pointer-events-none absolute size-8 -translate-x-1/2 -translate-y-[calc(100%-0.25rem)] rounded-full border-2 border-brand-500"
          style={{ left: `${pin[0]}%`, top: `${pin[1]}%` }}
          initial={reduced ? false : { opacity: 0.9, transform: "scale(0.4)" }}
          animate={{ opacity: 0, transform: "scale(1.6)" }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        />
        <AnimatePresence mode="wait">
          <motion.div
            key={current.merchant}
            initial={reduced ? false : { opacity: 0, transform: "translateY(12px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            exit={{ opacity: 0, transform: "translateY(-8px)" }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="absolute right-4 bottom-4 left-4 rounded-xl bg-white p-4 shadow-lift"
          >
            <p className="text-sm font-semibold text-ink-600">{current.merchant}</p>
            <p className="tabular mt-1 text-2xl font-extrabold">{current.amount}</p>
            <p className="mt-0.5 text-xs text-ink-400">{current.when}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex flex-wrap content-center gap-2 p-5 sm:p-8">
        {EXAMPLES.map((example, i) => {
          const active = i === index
          return (
            <button
              key={example.tag}
              type="button"
              aria-pressed={active}
              onClick={() => pick(i)}
              className={cn(
                "inline-flex min-h-9 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold tracking-wide uppercase transition-[background-color,color,transform,box-shadow] duration-300 ease-[var(--ease-out)] active:scale-95 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none",
                active ? "scale-105 bg-ink-900 text-white shadow-lift" : "bg-ink-50 text-ink-400 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-ink-100 [@media(hover:hover)_and_(pointer:fine)]:hover:text-ink-900",
              )}
            >
              {active ? <example.icon className="size-3.5" /> : null}
              {example.tag}
            </button>
          )
        })}
      </div>
    </div>
  )
}
