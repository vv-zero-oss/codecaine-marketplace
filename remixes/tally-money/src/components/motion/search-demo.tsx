import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Briefcase, Bus, Coffee, SearchX, ShoppingBag, Tv, Zap, type LucideIcon } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"

import { cn } from "@/lib/utils"

type Tx = { merchant: string; amount: string; dir: "in" | "out"; tag: string; kw: string; when: string; days: number; icon: LucideIcon }

const TXS: Tx[] = [
  { merchant: "Blue Bottle", amount: "$5", dir: "out", tag: "Food & drinks", kw: "coffee cafe", when: "Today, 11:30 AM", days: 0, icon: Coffee },
  { merchant: "Blue Bottle", amount: "$4.50", dir: "out", tag: "Food & drinks", kw: "coffee cafe", when: "Yesterday, 8:12 AM", days: 1, icon: Coffee },
  { merchant: "Cabco", amount: "$38.50", dir: "out", tag: "Transport", kw: "taxi ride", when: "Today, 9:30 AM", days: 0, icon: Bus },
  { merchant: "Northwind Ltd", amount: "$6,000", dir: "in", tag: "Salary", kw: "pay income", when: "2 July, 7:20 PM", days: 6, icon: Briefcase },
  { merchant: "Streamly", amount: "$13", dir: "out", tag: "Subscription", kw: "video streaming", when: "3 days ago", days: 3, icon: Tv },
  { merchant: "Market & Co", amount: "$38", dir: "out", tag: "Shopping", kw: "groceries", when: "Yesterday, 6:21 PM", days: 1, icon: ShoppingBag },
  { merchant: "Northline Power", amount: "$62", dir: "out", tag: "Utilities", kw: "electricity bill", when: "2 days ago", days: 2, icon: Zap },
]

const DEMO = ["Coffee", "Salary", "Gym membership"]

type Dir = "in" | "out" | null
type Range = "today" | "week" | null

/**
 * A search bar that types its own queries until you click it, then it is yours:
 * type to filter the payments, and flip Incoming, Outgoing, Today or This week.
 * `typingSpeed` is ms per character and `hold` how long a demo result stays up.
 * Design mode and reduced motion stop on the first query. Purpose: explanation
 * first, then feedback: the demo teaches the gesture and hands over control.
 */
export function SearchDemo({ typingSpeed = 110, hold = 2600, className }: { typingSpeed?: number; hold?: number; className?: string }) {
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = reduced || designing
  const [mode, setMode] = useState<"demo" | "user">("demo")
  const [qi, setQi] = useState(0)
  const [typed, setTyped] = useState(still ? DEMO[0].length : 0)
  const [query, setQuery] = useState("")
  const [dir, setDir] = useState<Dir>(null)
  const [range, setRange] = useState<Range>(null)
  const input = useRef<HTMLInputElement>(null)

  useCanvasAction("Search query", (next) => { setMode("demo"); setTyped(0); setQi(next === false ? 0 : (qi + 1) % DEMO.length) }, { group: "Search demo" })

  const demoText = DEMO[qi].slice(0, typed)
  const text = mode === "demo" ? demoText : query
  const done = mode === "user" || typed >= DEMO[qi].length

  useEffect(() => {
    if (mode !== "demo") return
    if (still) return setTyped(DEMO[qi].length)
    setTyped(0)
    let n = 0
    let wait: number
    const type = window.setInterval(() => {
      n += 1
      setTyped(n)
      if (n >= DEMO[qi].length) {
        window.clearInterval(type)
        wait = window.setTimeout(() => setQi((i) => (i + 1) % DEMO.length), hold)
      }
    }, typingSpeed)
    return () => {
      window.clearInterval(type)
      window.clearTimeout(wait)
    }
  }, [mode, qi, still, typingSpeed, hold])

  useEffect(() => {
    if (mode === "user") input.current?.focus()
  }, [mode])

  const needle = text.trim().toLowerCase()
  const results = done
    ? TXS.filter((t) => (!needle || `${t.merchant} ${t.tag} ${t.kw}`.toLowerCase().includes(needle)) && (!dir || t.dir === dir) && (!range || (range === "today" ? t.days === 0 : t.days < 7))).slice(0, 3)
    : []

  const enterUser = () => {
    if (mode === "user") return
    setQuery("")
    setMode("user")
  }
  const leaveUser = () => {
    if (!query.trim()) setMode("demo")
  }

  const chip = (label: string, on: boolean, toggle: () => void) => (
    <button
      key={label}
      type="button"
      aria-pressed={on}
      onClick={() => {
        enterUser()
        toggle()
      }}
      className={cn(
        "inline-flex min-h-9 items-center gap-1.5 rounded-full px-2.5 text-[11px] font-semibold tracking-wide uppercase transition-[background-color,color,transform] duration-200 ease-[var(--ease-out)] active:scale-95 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none",
        on ? "bg-brand-500 text-white" : "text-ink-400 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-ink-100 [@media(hover:hover)_and_(pointer:fine)]:hover:text-ink-900",
      )}
    >
      <span className={cn("size-3 rounded-full transition-colors duration-200", on ? "bg-white" : "bg-ink-200")} />
      {label}
    </button>
  )

  return (
    <div className={cn("mx-auto w-full max-w-3xl", className)}>
      <div
        role="search"
        onClick={enterUser}
        className="flex h-14 cursor-text items-center rounded-xl bg-ink-900 px-4 text-white shadow-lift transition-shadow duration-200 focus-within:ring-2 focus-within:ring-brand-500 focus-within:ring-offset-2"
      >
        {mode === "user" ? (
          <input
            ref={input}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onBlur={leaveUser}
            onKeyDown={(event) => event.key === "Escape" && (setQuery(""), input.current?.blur())}
            aria-label="Search payments"
            placeholder="Search payments…"
            className="h-full min-w-0 flex-1 bg-transparent text-lg font-medium text-white outline-none placeholder:text-white/40"
          />
        ) : (
          <button type="button" onFocus={enterUser} aria-label="Search payments" className="flex h-full min-w-0 flex-1 items-center text-left text-lg font-medium focus-visible:outline-none">
            <span>{demoText}</span>
            <span className="ml-0.5 h-6 w-0.5 animate-caret bg-white/80" />
          </button>
        )}
        <span className="ml-3 hidden shrink-0 text-[11px] font-semibold tracking-wide text-white/40 uppercase sm:block">{mode === "demo" ? "Click to try" : `${results.length} found`}</span>
      </div>
      <div className="mt-3 flex flex-wrap justify-center gap-x-1 gap-y-1">
        {chip("Incoming", dir === "in", () => setDir(dir === "in" ? null : "in"))}
        {chip("Outgoing", dir === "out", () => setDir(dir === "out" ? null : "out"))}
        {chip("Today", range === "today", () => setRange(range === "today" ? null : "today"))}
        {chip("This week", range === "week", () => setRange(range === "week" ? null : "week"))}
      </div>
      <div className="mt-6 min-h-[16rem]">
        <ul className="mx-auto max-w-sm space-y-3" aria-live="polite">
          <AnimatePresence mode="popLayout" initial={false}>
            {results.map((t, i) => (
              <motion.li
                key={`${t.merchant}-${t.when}`}
                layout
                initial={still ? false : { opacity: 0, transform: "translateY(10px) scale(0.98)" }}
                animate={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
                exit={{ opacity: 0, transform: "scale(0.97)" }}
                transition={{ duration: 0.25, delay: i * 0.04, ease: [0.23, 1, 0.32, 1] }}
                className="rounded-xl bg-white p-4 text-left shadow-lift"
              >
                <div className="flex justify-between text-sm text-ink-600">
                  <span className="font-semibold">{t.merchant}</span>
                  <span>{t.when}</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className={cn("tabular text-2xl font-extrabold", t.dir === "in" && "text-leaf-500")}>{t.dir === "in" ? "+" : ""}{t.amount}</span>
                  <span className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-ink-600 uppercase">
                    <t.icon className="size-3.5" /> {t.tag}
                  </span>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
        <AnimatePresence>
          {done && results.length === 0 ? (
            <motion.p
              key="empty"
              initial={still ? false : { opacity: 0, transform: "translateY(8px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              className="mx-auto flex max-w-sm flex-col items-center gap-2 pt-6 text-sm text-ink-600"
            >
              <SearchX className="size-6 text-ink-400" />
              Nothing for “{text}”. Not a single payment. Good for you.
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  )
}
