import {
  ArrowLeftRight, BarChart3, CheckCircle2, Flag, Landmark, LayoutDashboard, LoaderCircle, Mic, Percent, Plus, Receipt, ReceiptText, Search, Zap,
} from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useEffect, useState, type PointerEvent } from "react"
import { useCanvasDesignMode } from "@canvas/react"

import { cn } from "@/lib/utils"

const NAV = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "Transactions", icon: ArrowLeftRight, badge: true },
  { label: "Invoices", icon: ReceiptText },
  { label: "Bills", icon: Receipt },
  { label: "Reconcile", icon: Landmark },
  { label: "Reports", icon: BarChart3 },
  { label: "Tax", icon: Percent },
]

type Run = { id: number; label: string; time: string; status: "running" | "done" | "review" }

/** What the assistant gets up to while a month is closing. Entries marked
 *  `flag` finish as "needs a look" rather than done: the AI asks, not assumes. */
const FEED: { label: string; flag?: boolean }[] = [
  { label: "Coded 24 Stripe payouts → Sales" },
  { label: "Matched invoice #1042 to payment" },
  { label: "Possible duplicate — Figma $45", flag: true },
  { label: "Reconciled card ••4417 · 128 lines" },
  { label: "Receipt read — Blue Bottle $18.50" },
  { label: "Drafted accrual — March rent" },
  { label: "Unusual amount — AWS +38%", flag: true },
  { label: "Posted payroll journal" },
]

const PROMPTS = ["Ask your books anything…", "How much did we spend on software in Q1?", "Which invoices are overdue?", "Reconcile last week's card spend"]

/** Types each prompt out, holds, deletes, and moves to the next. Settles on
 *  the first prompt, whole, when `live` is off. */
function useTypewriter(live: boolean) {
  const [state, setState] = useState({ i: 0, n: PROMPTS[0].length, dir: 0 })
  useEffect(() => {
    if (!live) return
    setState({ i: 1, n: 0, dir: 1 })
  }, [live])
  useEffect(() => {
    if (!live || state.dir === 0) return
    const text = PROMPTS[state.i]
    const timer = window.setTimeout(
      () => {
        setState((s) => {
          if (s.dir === 1 && s.n < text.length) return { ...s, n: s.n + 1 }
          if (s.dir === 1) return { ...s, dir: -1 }
          if (s.n > 0) return { ...s, n: s.n - 1 }
          return { i: (s.i + 1) % PROMPTS.length, n: 0, dir: 1 }
        })
      },
      state.dir === 1 && state.n === text.length ? 1600 : state.dir === 1 ? 45 : 18,
    )
    return () => window.clearTimeout(timer)
  }, [live, state])
  return PROMPTS[state.i].slice(0, state.n)
}

/** A feed that keeps getting new work: the newest run spins, then ticks off
 *  while the next one arrives above it. Held still when not `live`. */
function useRuns(live: boolean) {
  const [runs, setRuns] = useState<Run[]>([
    { id: 0, label: "Categorised 18 card payments", time: "9:12 AM", status: "done" },
    { id: 1, label: "Matched 6 invoices to deposits", time: "8:45 AM", status: "done" },
    { id: 2, label: "Imported bank feed — Operating", time: "8:30 AM", status: "done" },
  ])
  useEffect(() => {
    if (!live) return
    let id = 3
    const timers: number[] = []
    const tick = () => {
      const mine = id++
      const item = FEED[mine % FEED.length]
      setRuns((r) => [{ id: mine, label: item.label, time: "just now", status: "running" as const }, ...r].slice(0, 3))
      timers.push(window.setTimeout(() => setRuns((r) => r.map((x) => (x.id === mine ? { ...x, status: item.flag ? "review" : "done", time: "now" } : x))), 1500))
    }
    const first = window.setTimeout(tick, 1200)
    const every = window.setInterval(tick, 3400)
    return () => {
      window.clearTimeout(first)
      window.clearInterval(every)
      timers.forEach(window.clearTimeout)
    }
  }, [live])
  return runs
}

/**
 * The product's overview, drawn as a living board: the assistant types its
 * questions, a feed of bookkeeping runs spins and completes (some stop to ask
 * for a look), the to-review count ticks down, and a soft spotlight follows the pointer across the glass. All
 * of it holds still for reduced motion and while the page is being designed.
 */
export function AppWindow({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const live = !reduce && !designing
  const prompt = useTypewriter(live)
  const runs = useRuns(live)

  const move = (event: PointerEvent<HTMLDivElement>) => {
    const box = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty("--mx", `${event.clientX - box.left}px`)
    event.currentTarget.style.setProperty("--my", `${event.clientY - box.top}px`)
  }

  return (
    <div
      data-canvas-ignore={false}
      onPointerMove={live ? move : undefined}
      className={cn(
        "group/board relative grid overflow-hidden rounded-t-[var(--radius-window)] bg-surface text-left text-ink-900 shadow-window md:grid-cols-[166px_1fr]",
        className,
      )}
    >
      {/* The spotlight: a wash of sky that follows the cursor. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover/board:opacity-100 [background:radial-gradient(260px_circle_at_var(--mx,50%)_var(--my,40%),rgb(86_180_251/0.16),transparent_70%)]"
      />
      <aside className="hidden flex-col gap-0.5 border-r border-ink-100 bg-surface-muted p-2.5 text-[12px] md:flex">
        <div className="mb-1.5 flex items-center gap-2 px-2 py-1.5 font-semibold">
          <span className="grid size-4 place-items-center rounded-[5px] bg-sky-600 text-[9px] text-white">M</span>
          Fernhill Co.
        </div>
        <div className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-ink-500">
          <Search className="size-3.5" /> Search
          <kbd className="ml-auto rounded-md bg-surface px-1 text-[10px] text-ink-400 shadow-card">⌘K</kbd>
        </div>
        {NAV.map(({ label, icon: Icon, active, badge }) => (
          <div
            key={label}
            className={cn("flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors duration-150", active ? "bg-ink-100 font-medium text-ink-900" : "text-ink-700 hover:bg-ink-100/60")}
          >
            <Icon className="size-3.5 text-ink-500" /> {label}
            {badge ? <InboxCount live={live} /> : null}
          </div>
        ))}
        <div className="mt-3 px-2 text-[11px] text-ink-400">Accounts</div>
        <div className="rounded-lg px-2 py-1.5 text-ink-700">Operating ••4417</div>
        <div className="rounded-lg px-2 py-1.5 text-ink-700">Business card</div>
      </aside>
      <div className="flex flex-col items-center gap-3.5 px-4 pt-7 pb-0 sm:px-10 md:pt-8">
        <div className="flex w-full max-w-[500px] items-center gap-3">
          <ProgressRing />
          <div>
            <p className="text-[17px] font-semibold tracking-[-0.02em]">March close · 83% done</p>
            <p className="text-[11px] text-ink-500">4 days left · 3 entries need your eye</p>
          </div>
        </div>
        <div className="w-full max-w-[500px] rounded-xl bg-surface p-3 text-[12px] shadow-card">
          <p className="h-4 truncate text-ink-400">
            {prompt}
            {live ? <span className="ml-px inline-block h-3.5 w-px translate-y-0.5 bg-sky-600 [animation:blink_1s_steps(1)_infinite]" /> : null}
          </p>
          <div className="mt-3.5 flex items-center gap-3 text-ink-500">
            <Plus className="size-3.5" />
            <span className="flex items-center gap-1 text-sky-600"><Zap className="size-3" /> Skills</span>
            <Mic className="ml-auto size-3.5" />
          </div>
        </div>
        <dl className="grid w-full max-w-[500px] grid-cols-3 gap-2 text-[11px]">
          {[["Cash", "$142,380", "+4.2%", true], ["Receivable", "$38,900", "9 open", false], ["Runway", "14 mo", "steady", false]].map(([k, v, d, spark]) => (
            <div key={k as string} className="rounded-xl bg-surface p-2.5 shadow-card">
              <dt className="text-ink-500">{k as string}</dt>
              <dd className="mt-0.5 text-[15px] font-semibold tracking-[-0.02em] tabular-nums">{v as string}</dd>
              <dd className="flex items-center justify-between text-leaf">
                {d as string}
                {spark ? <svg viewBox="0 0 40 12" className="h-3 w-10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="0,10 7,8 13,9 20,5 27,6 33,2 40,3" /></svg> : null}
              </dd>
            </div>
          ))}
        </dl>
        <div className="w-full max-w-[500px] rounded-xl bg-surface p-3 shadow-card">
          <p className="mb-2 flex items-center gap-1.5 text-[11px] font-medium text-ink-500">
            Bookkeeping
            {live ? <span className="relative flex size-1.5"><span className="absolute inline-flex size-full animate-ping rounded-full bg-leaf/60" /><span className="relative size-1.5 rounded-full bg-leaf" /></span> : null}
          </p>
          <ul className="flex h-[66px] flex-col gap-2 overflow-hidden text-[12px]">
            <AnimatePresence initial={false} mode="popLayout">
              {runs.map((run) => (
                <motion.li
                  key={run.id}
                  layout={!reduce}
                  initial={reduce ? false : { opacity: 0, y: -16, filter: "blur(3px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={reduce ? undefined : { opacity: 0, y: 14 }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  className="flex items-center gap-2"
                >
                  {run.status === "running" ? <LoaderCircle className="size-3.5 animate-spin text-apricot" /> : run.status === "review" ? <Flag className="size-3.5 text-coral" /> : <CheckCircle2 className="size-3.5 text-teal" />}
                  <span className="truncate font-medium">{run.label}</span>
                  <span className={cn("ml-auto shrink-0 tabular-nums", run.status === "review" ? "font-medium text-coral" : "text-ink-400")}>{run.status === "review" ? "Review" : run.time}</span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
        <div className="h-10 w-full max-w-[500px] rounded-t-xl bg-surface shadow-card" />
      </div>
    </div>
  )
}

/** How far through the month the books are. */
function ProgressRing() {
  return (
    <span className="relative grid size-9 shrink-0 place-items-center" aria-hidden="true">
      <svg viewBox="0 0 36 36" className="size-9 -rotate-90">
        <circle cx="18" cy="18" r="15" fill="none" className="stroke-ink-100" strokeWidth="4" />
        <circle cx="18" cy="18" r="15" fill="none" className="stroke-sky-500" strokeWidth="4" strokeLinecap="round" strokeDasharray="78 94.2" />
      </svg>
    </span>
  )
}

/** The to-review count falls as the assistant codes transactions. */
function InboxCount({ live }: { live: boolean }) {
  const [n, setN] = useState(14)
  useEffect(() => {
    if (!live) return
    const t = window.setInterval(() => setN((v) => (v <= 3 ? 14 : v - 1)), 3400)
    return () => window.clearInterval(t)
  }, [live])
  return <span className="ml-auto rounded-md bg-sky-100 px-1.5 text-[10px] font-semibold text-sky-600 tabular-nums">{n}</span>
}
