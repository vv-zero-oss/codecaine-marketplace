import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Briefcase, Bus, Check, Coffee, MapPin, ShoppingBag, Tv, Utensils, Zap, type LucideIcon } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useCanvasDesignMode } from "@canvas/react"

import { cn } from "@/lib/utils"

const EXAMPLES: { merchant: string; amount: string; when: string; tag: string; icon: LucideIcon; why: string[] }[] = [
  { merchant: "Cabco", amount: "−$38.50", when: "Today, 11:30 AM", tag: "Transport", icon: Bus, why: ["Pick-up point matches a cab rank", "Paid within 2 minutes of a trip", "9 earlier rides, all Transport"] },
  { merchant: "Blue Bottle", amount: "−$4.50", when: "Today, 8:12 AM", tag: "Coffee", icon: Coffee, why: ["Card was tapped at a café on Elm St", "Same place as 14 earlier visits", "Under $6, before 9 AM"] },
  { merchant: "Northline Power", amount: "−$62.00", when: "Yesterday, 7:02 PM", tag: "Utilities", icon: Zap, why: ["Billed by a power provider", "Lands on the 2nd every month", "Amount within 8% of last month"] },
  { merchant: "Northwind Ltd", amount: "+$6,000", when: "1 Jul, 7:20 PM", tag: "Salary", icon: Briefcase, why: ["Incoming transfer, not a refund", "Same sender on the 1st for 8 months", "Largest deposit of the month"] },
  { merchant: "Market & Co", amount: "−$38.00", when: "Today, 6:21 PM", tag: "Shopping", icon: ShoppingBag, why: ["Retail terminal at a mixed store", "Basket size fits a grocery run", "You shop here on Thursdays"] },
  { merchant: "Streamly", amount: "−$13.00", when: "30 Nov, 12:15 AM", tag: "Subscription", icon: Tv, why: ["Same amount, same day, monthly", "Merchant sells a streaming plan", "Charged online, no receipt"] },
  { merchant: "Olive & Rye", amount: "−$54.20", when: "Sat, 9:40 PM", tag: "Dining", icon: Utensils, why: ["Table-service restaurant on Pine St", "Evening, weekend, shared bill size", "Tip added after the charge"] },
]

const PINS: [number, number][] = [[16, 20], [36, 30], [52, 18], [70, 30], [24, 50], [64, 52], [84, 22]]

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
      <div className="relative min-h-72 border-b md:min-h-96 border-ink-100 md:border-r md:border-b-0">
        <svg viewBox="0 0 100 80" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" aria-hidden="true">
          <rect width="100" height="80" fill="var(--color-ink-50)" />
          <path d="M-5 58C20 50 34 66 56 56S88 44 105 50" fill="none" stroke="var(--color-brand-200)" strokeWidth="7" opacity="0.7" />
          <g fill="var(--color-leaf-200)" opacity="0.8"><rect x="6" y="8" width="16" height="12" rx="3" /><rect x="74" y="60" width="18" height="14" rx="3" /></g>
          <g fill="white" stroke="var(--color-ink-100)" strokeWidth="0.4">
            <rect x="28" y="6" width="14" height="14" rx="1.5" /><rect x="46" y="6" width="12" height="10" rx="1.5" /><rect x="62" y="6" width="14" height="16" rx="1.5" />
            <rect x="82" y="8" width="14" height="12" rx="1.5" /><rect x="6" y="26" width="14" height="14" rx="1.5" /><rect x="28" y="28" width="14" height="10" rx="1.5" />
            <rect x="62" y="28" width="12" height="12" rx="1.5" /><rect x="80" y="26" width="16" height="14" rx="1.5" /><rect x="8" y="66" width="14" height="10" rx="1.5" />
            <rect x="28" y="66" width="16" height="10" rx="1.5" /><rect x="50" y="68" width="14" height="8" rx="1.5" />
          </g>
          <g fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" vectorEffect="non-scaling-stroke">
            <path d="M0 22H100M0 44H100M24 0V80M58 0V80M78 0V80" stroke="var(--color-ink-200)" strokeWidth="3.4" />
            <path d="M0 22H100M0 44H100M24 0V80M58 0V80M78 0V80" />
          </g>
        </svg>
        {PINS.map(([x, y], i) => (
          <MapPin
            key={i}
            className={cn("absolute size-5 -translate-x-1/2 -translate-y-full text-ink-600 drop-shadow-sm transition-colors duration-300", PINS[index % PINS.length] === PINS[i] && "text-brand-600")}
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
      <div className="flex flex-col justify-center gap-8 p-5 sm:p-10">
        <div className="flex flex-wrap gap-2">
        {EXAMPLES.map((example, i) => {
          const active = i === index
          return (
            <button
              key={example.tag}
              type="button"
              aria-pressed={active}
              onClick={() => pick(i)}
              className={cn(
                "inline-flex min-h-11 items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold tracking-wide uppercase transition-[background-color,color,transform,box-shadow] duration-300 ease-[var(--ease-out)] active:scale-95 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none",
                active ? "scale-105 bg-ink-900 text-white shadow-lift" : "bg-ink-50 text-ink-400 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-ink-100 [@media(hover:hover)_and_(pointer:fine)]:hover:text-ink-900",
              )}
            >
              {active ? <example.icon className="size-4" /> : null}
              {example.tag}
            </button>
          )
        })}
        </div>
        <div>
          <p className="text-[11px] font-semibold tracking-wider text-ink-400 uppercase">How Tally knew</p>
          <AnimatePresence mode="wait">
            <motion.ul
              key={current.merchant}
              initial={reduced ? false : { opacity: 0, transform: "translateY(8px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              className="mt-3 space-y-2.5 text-[15px] text-ink-900"
            >
              {current.why.map((line) => (
                <li key={line} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 size-4 shrink-0 text-leaf-500" strokeWidth={3} />
                  {line}
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
