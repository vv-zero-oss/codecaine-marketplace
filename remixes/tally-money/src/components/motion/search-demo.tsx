import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Briefcase, Coffee, RotateCw, type LucideIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"

import { cn } from "@/lib/utils"

const QUERIES: { text: string; merchant: string; when: string; amount: string; tag: string; icon: LucideIcon }[] = [
  { text: "Coffee", merchant: "Blue Bottle", when: "Today, 11:30 AM", amount: "$5", tag: "Food & drinks", icon: Coffee },
  { text: "Salary", merchant: "Northwind Ltd", when: "02 July, 07:20 PM", amount: "$6,000", tag: "Salary", icon: Briefcase },
]

const FILTERS = ["Incoming", "Outgoing", "Tags", "Today", "This month", "This week"]

/**
 * Types a query into the search bar, shows the matching payment, then moves to
 * the next. `typingSpeed` is ms per character; `hold` is how long a result stays
 * up. Design mode and reduced motion stop on the first result, fully typed.
 */
export function SearchDemo({ typingSpeed = 110, hold = 2600, className }: { typingSpeed?: number; hold?: number; className?: string }) {
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = reduced || designing
  const [qi, setQi] = useState(0)
  const [typed, setTyped] = useState(still ? QUERIES[0].text.length : 0)
  const query = QUERIES[qi]

  useCanvasAction("Search result", (next) => setQi(next === false ? 0 : (qi + 1) % QUERIES.length), { group: "Search demo" })

  useEffect(() => {
    if (still) return setTyped(query.text.length)
    setTyped(0)
    let n = 0
    let wait: number
    const type = window.setInterval(() => {
      n += 1
      setTyped(n)
      if (n >= query.text.length) {
        window.clearInterval(type)
        wait = window.setTimeout(() => setQi((i) => (i + 1) % QUERIES.length), hold)
      }
    }, typingSpeed)
    return () => {
      window.clearInterval(type)
      window.clearTimeout(wait)
    }
  }, [qi, still, typingSpeed, hold, query.text.length])

  const done = typed >= query.text.length
  return (
    <div className={cn("mx-auto w-full max-w-3xl", className)}>
      <div className="flex h-14 items-center rounded-xl bg-ink-900 px-4 text-white shadow-lift">
        <span className="text-lg font-medium">{query.text.slice(0, typed)}</span>
        <span className="ml-0.5 h-6 w-0.5 animate-caret bg-white/80" />
        <RotateCw className="ml-auto size-4 text-white/60" />
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[11px] font-semibold tracking-wide text-ink-400 uppercase">
        {FILTERS.map((f) => (
          <span key={f} className="flex items-center gap-1.5">
            <span className="size-3 rounded-full bg-ink-200" />
            {f}
          </span>
        ))}
      </div>
      <div className="mt-8 min-h-28">
        <AnimatePresence mode="wait">
          {done ? (
            <motion.div
              key={query.text}
              initial={still ? false : { opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto max-w-sm rounded-xl bg-white p-4 shadow-lift"
            >
              <div className="flex justify-between text-sm text-ink-600">
                <span className="font-semibold">{query.merchant}</span>
                <span>{query.when}</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="tabular text-2xl font-extrabold">{query.amount}</span>
                <span className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-ink-600 uppercase">
                  <query.icon className="size-3.5" /> {query.tag}
                </span>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  )
}
