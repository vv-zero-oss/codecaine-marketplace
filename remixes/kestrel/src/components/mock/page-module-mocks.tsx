import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react"
import { ArrowRight, Bot, Camera, Check, Loader2, Pause, Play, Plane, RotateCcw, Sparkles, X } from "lucide-react"
import { useCanvasDesignMode } from "@canvas/react"

import { MockLabel } from "@/components/mock/page-app-window"
import { MiniCard } from "@/components/mock/page-mini-card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import type { ModuleId } from "@/content/platform"
import { money } from "@/lib/photos"
import { cn } from "@/lib/utils"

const EASE = [0.23, 1, 0.32, 1] as const

/** The white sheet each micro-mock sits on, inside its panel. */
function Sheet({ className, children }: { className?: string; children?: React.ReactNode }) {
  return <div className={cn("w-full max-w-[360px] rounded-(--radius-card) bg-raised p-4 shadow-(--shadow-float)", className)}>{children}</div>
}

function SmallButton({ className, ...props }: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex min-h-8 items-center justify-center gap-1.5 rounded-(--radius-field) bg-raised px-2.5 text-[12.5px] font-medium shadow-(--shadow-field) transition-[transform,background-color,opacity] duration-(--duration-hover) hover:bg-panel active:scale-[0.97] disabled:opacity-40",
        className,
      )}
      {...props}
    />
  )
}

function LimeButton({ className, ...props }: React.ComponentProps<"button">) {
  return <SmallButton className={cn("bg-lime text-lime-ink shadow-(--shadow-button) hover:bg-lime-hover", className)} {...props} />
}

/* ------------------------------------------------------------------ Cards */

const MERCHANTS = ["Software", "Travel", "Meals", "Ads"]

/** A card whose monthly limit follows the slider and whose merchant locks toggle. */
export function CardLimitMock() {
  const [limit, setLimit] = useState(4000)
  const [allowed, setAllowed] = useState<string[]>(["Software"])
  const spent = 2140
  return (
    <Sheet>
      <MiniCard holder="Ada Lindqvist" last4="4021" className="max-w-[240px]" />
      <div className="mt-4 flex items-baseline justify-between">
        <MockLabel>Monthly limit</MockLabel>
        <span className="text-[17px] font-medium tabular-nums">{money(limit, false)}</span>
      </div>
      <Slider className="py-3" min={500} max={20000} step={250} value={[limit]} onValueChange={([v]) => setLimit(v)} aria-label="Monthly limit" />
      <div className="h-1.5 overflow-hidden rounded-full bg-line">
        <div className={cn("h-full rounded-full transition-[width] duration-(--duration-swap) ease-(--ease-out-strong)", spent / limit > 0.9 ? "bg-signal-amber" : "bg-signal-green")} style={{ width: `${Math.min(100, (spent / limit) * 100)}%` }} />
      </div>
      <p className="mt-1.5 text-[12px] text-ink-3">{money(spent, false)} spent · {spent > limit ? "over limit — new charges decline" : `${money(limit - spent, false)} left`}</p>
      <MockLabel className="mt-4">Works at</MockLabel>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {MERCHANTS.map((m) => {
          const on = allowed.includes(m)
          return (
            <button
              key={m}
              type="button"
              aria-pressed={on}
              onClick={() => setAllowed((all) => (on ? all.filter((x) => x !== m) : [...all, m]))}
              className={cn(
                "inline-flex min-h-8 items-center gap-1 rounded-full px-2.5 text-[12px] transition-colors duration-(--duration-hover)",
                on ? "bg-ink text-page" : "bg-panel text-ink-3 hover:text-ink",
              )}
            >
              {on && <Check className="size-3" strokeWidth={3} />}
              {m}
            </button>
          )
        })}
      </div>
    </Sheet>
  )
}

/* --------------------------------------------------------------- Expenses */

type MatchState = "missing" | "reading" | "matched"

/** A transaction missing its receipt; snapping one reads it and matches it. */
export function ReceiptMatchMock() {
  const [state, setState] = useState<MatchState>("missing")
  const timer = useRef<number>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])
  const snap = () => {
    setState("reading")
    timer.current = window.setTimeout(() => setState("matched"), 1200)
  }
  const badge = { missing: ["amber", "Missing receipt"], reading: ["blue", "Reading…"], matched: ["green", "Matched"] } as const
  return (
    <Sheet>
      <div className="flex items-center gap-3">
        <span className="grid size-9 place-items-center rounded-(--radius-field) bg-panel text-[12px] font-medium">DC</span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[14px] font-medium">Dovetail Café</p>
          <p className="text-[12px] text-ink-3">Today, 12:41 · •• 4021</p>
        </div>
        <span className="text-[15px] font-medium tabular-nums">$86.40</span>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <Badge variant={badge[state][0]}>{state === "reading" && <Loader2 className="animate-spin" />}{badge[state][1]}</Badge>
        {state === "matched" && (
          <button type="button" onClick={() => setState("missing")} className="inline-flex min-h-8 items-center gap-1 text-[12px] text-ink-3 hover:text-ink">
            <RotateCcw className="size-3" /> Reset
          </button>
        )}
      </div>
      <div className="relative mt-3 h-[150px] overflow-hidden rounded-(--radius-field) bg-panel">
        <AnimatePresence mode="wait" initial={false}>
          {state === "missing" ? (
            <motion.div key="empty" exit={{ opacity: 0 }} className="grid h-full place-items-center">
              <LimeButton onClick={snap} className="min-h-10 px-3.5">
                <Camera className="size-4" /> Snap receipt
              </LimeButton>
            </motion.div>
          ) : (
            <motion.div
              key="receipt"
              initial={{ opacity: 0, transform: "translateY(40px) rotate(-4deg)" }}
              animate={{ opacity: 1, transform: "translateY(0px) rotate(-2deg)" }}
              transition={{ duration: 0.45, ease: EASE }}
              className="absolute top-3 left-4 w-[132px] rounded-[4px] bg-raised p-2.5 font-mono text-[9.5px] leading-[1.5] text-ink-2 shadow-(--shadow-card)"
            >
              <p className="text-center font-sans text-[11px] font-semibold text-ink">DOVETAIL CAFÉ</p>
              <p className="mt-1 flex justify-between"><span>Lunch × 4</span><span>72.00</span></p>
              <p className="flex justify-between"><span>Tax</span><span>6.40</span></p>
              <p className="flex justify-between"><span>Tip</span><span>8.00</span></p>
              <p className="mt-1 flex justify-between border-t border-dashed border-line-strong pt-1 text-ink"><span>TOTAL</span><span>86.40</span></p>
            </motion.div>
          )}
        </AnimatePresence>
        {state !== "missing" && (
          <div className="absolute top-3 right-3 flex w-[44%] flex-col gap-1.5 text-[11.5px]">
            {[["Category", "Team meals"], ["Tax", "$6.40"], ["Attendees", "4"]].map(([k, v], i) => (
              <motion.div
                key={k}
                initial={{ opacity: 0, transform: "translateX(8px)" }}
                animate={state === "matched" ? { opacity: 1, transform: "translateX(0px)" } : { opacity: 0.35, transform: "translateX(0px)" }}
                transition={{ duration: 0.3, ease: EASE, delay: state === "matched" ? i * 0.06 : 0 }}
                className="rounded-[5px] bg-raised px-2 py-1 shadow-(--shadow-xs)"
              >
                <span className="block text-[10px] text-ink-3">{k}</span>
                {state === "matched" ? v : "…"}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </Sheet>
  )
}

/* ----------------------------------------------------------------- Travel */

const FLIGHTS = [
  { id: "f1", carrier: "Larkspur Air", times: "07:10 → 09:55", price: 412 },
  { id: "f2", carrier: "Meridian", times: "12:35 → 15:20", price: 389 },
  { id: "f3", carrier: "Coastline", times: "18:05 → 20:40", price: 694 },
]
const CAP = 450

/** Three fares against a $450 cap; out-of-policy needs a reason before booking. */
export function TripMock() {
  const [pick, setPick] = useState("f2")
  const [reason, setReason] = useState("")
  const [booked, setBooked] = useState(false)
  const fare = FLIGHTS.find((f) => f.id === pick)!
  const outside = fare.price > CAP
  const canBook = !outside || reason.trim().length > 3
  return (
    <Sheet>
      <div className="flex items-center justify-between">
        <MockLabel>Austin → Denver · Nov 12</MockLabel>
        <Badge variant="outline">Cap {money(CAP, false)}</Badge>
      </div>
      <AnimatePresence mode="wait" initial={false}>
        {booked ? (
          <motion.div key="booked" initial={{ opacity: 0, filter: "blur(4px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="mt-4 flex flex-col items-center gap-2 py-6 text-center">
            <span className="grid size-10 place-items-center rounded-full bg-lime"><Plane className="size-4" /></span>
            <p className="text-[14px] font-medium">Booked on {fare.carrier}</p>
            <p className="text-[12px] text-ink-3">A trip card for {money(fare.price + 600, false)} was issued — flight, hotel and per diems.</p>
            <SmallButton onClick={() => { setBooked(false); setReason("") }}>Plan another</SmallButton>
          </motion.div>
        ) : (
          <motion.div key="pick" exit={{ opacity: 0 }} className="mt-3 flex flex-col gap-1.5">
            {FLIGHTS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setPick(f.id)}
                className={cn(
                  "flex min-h-11 items-center gap-3 rounded-(--radius-field) px-3 text-left transition-[background-color,box-shadow] duration-(--duration-hover)",
                  pick === f.id ? "bg-panel shadow-[0_0_0_1px_var(--color-ink)]" : "bg-panel/50 hover:bg-panel",
                )}
              >
                <span className="flex-1">
                  <span className="block text-[13px] font-medium">{f.carrier}</span>
                  <span className="block text-[11.5px] text-ink-3">{f.times}</span>
                </span>
                <span className="text-[13px] tabular-nums">{money(f.price, false)}</span>
                <Badge variant={f.price > CAP ? "red" : "green"}>{f.price > CAP ? "Over" : "In policy"}</Badge>
              </button>
            ))}
            <div className={cn("grid transition-[grid-template-rows] duration-(--duration-swap) ease-(--ease-out-strong)", outside ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
              <div className="overflow-hidden">
                <label className="mt-1 block text-[12px] text-ink-2" htmlFor="trip-reason">Why this fare? Your manager will see it.</label>
                <input id="trip-reason" value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Client moved the meeting to 9am" className="mt-1 h-9 w-full rounded-(--radius-field) bg-raised px-2.5 text-[13px] shadow-(--shadow-field) outline-none focus:shadow-[0_0_0_1px_var(--color-ink-3)]" />
              </div>
            </div>
            <LimeButton disabled={!canBook} onClick={() => setBooked(true)} className="mt-1 min-h-10">
              {outside ? "Request approval & book" : "Book · issue trip card"} <ArrowRight className="size-3.5" />
            </LimeButton>
          </motion.div>
        )}
      </AnimatePresence>
    </Sheet>
  )
}

/* ------------------------------------------------------------------ Bills */

type BillStep = "read" | "approved" | "rejected"

/** An invoice read into fields; approve or reject moves it down the timeline. */
export function BillApprovalMock() {
  const [step, setStep] = useState<BillStep>("read")
  const timeline = [
    { label: "Read from email", done: true },
    { label: "Coded to Facilities · 6420", done: true },
    { label: step === "rejected" ? "Rejected — vendor notified" : "Approved by Mira Okafor", done: step !== "read", bad: step === "rejected" },
    { label: "Paid Oct 21 by ACH", done: step === "approved" },
  ]
  return (
    <Sheet>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[14px] font-medium">Fernbank Facilities</p>
          <p className="text-[12px] text-ink-3">Invoice FB-20931 · due Oct 21</p>
        </div>
        <span className="text-[17px] font-medium tabular-nums">$6,840.00</span>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-1.5 text-[11.5px]">
        {[["Vendor", "Fernbank"], ["Terms", "Net 30"], ["GL", "6420"]].map(([k, v]) => (
          <div key={k} className="rounded-[5px] bg-lime-soft px-2 py-1">
            <span className="block text-[10px] text-ink-3">{k}</span>
            {v}
          </div>
        ))}
      </div>
      <ol className="mt-4 flex flex-col gap-2.5">
        {timeline.map((t) => (
          <li key={t.label} className="flex items-center gap-2.5 text-[12.5px]">
            <span className={cn("grid size-4 shrink-0 place-items-center rounded-full transition-colors duration-(--duration-swap)", t.bad ? "bg-signal-red text-page" : t.done ? "bg-ink text-page" : "bg-line")}>
              {t.bad ? <X className="size-2.5" strokeWidth={3} /> : t.done && <Check className="size-2.5" strokeWidth={3} />}
            </span>
            <span className={t.done ? "text-ink" : "text-ink-3"}>{t.label}</span>
          </li>
        ))}
      </ol>
      <div className="mt-4 flex gap-2">
        {step === "read" ? (
          <>
            <LimeButton className="flex-1" onClick={() => setStep("approved")}>Approve</LimeButton>
            <SmallButton className="flex-1" onClick={() => setStep("rejected")}>Reject</SmallButton>
          </>
        ) : (
          <SmallButton className="flex-1" onClick={() => setStep("read")}><RotateCcw className="size-3" /> Send another invoice</SmallButton>
        )}
      </div>
    </Sheet>
  )
}

/* ------------------------------------------------------------ Procurement */

const KINDS = ["Software", "Hardware", "Services"] as const

/** A purchase request whose approval chain is drawn from the amount and kind. */
export function PurchaseRequestMock() {
  const [kind, setKind] = useState<(typeof KINDS)[number]>("Software")
  const [amount, setAmount] = useState(7200)
  const [approved, setApproved] = useState(-1)
  const timer = useRef<number>(undefined)
  const chain = ["Budget owner", ...(kind === "Software" ? ["IT security"] : []), ...(amount > 5000 ? ["Finance"] : []), ...(amount > 25000 ? ["CFO"] : [])]
  useEffect(() => () => window.clearInterval(timer.current), [])
  useEffect(() => {
    window.clearInterval(timer.current)
    setApproved(-1)
  }, [kind, amount])
  const submit = () => {
    window.clearInterval(timer.current)
    let i = -1
    timer.current = window.setInterval(() => {
      i += 1
      setApproved(i)
      if (i >= chain.length - 1) window.clearInterval(timer.current)
    }, 550)
  }
  return (
    <Sheet>
      <MockLabel>New request</MockLabel>
      <div className="mt-2 grid grid-cols-3 gap-1 rounded-(--radius-field) bg-panel p-0.5">
        {KINDS.map((k) => (
          <button key={k} type="button" onClick={() => setKind(k)} className={cn("min-h-8 rounded-[5px] text-[12px] transition-colors duration-(--duration-hover)", kind === k ? "bg-raised text-ink shadow-(--shadow-xs)" : "text-ink-3 hover:text-ink")}>
            {k}
          </button>
        ))}
      </div>
      <div className="mt-3 flex items-baseline justify-between">
        <span className="text-[12px] text-ink-2">Amount</span>
        <span className="text-[17px] font-medium tabular-nums">{money(amount, false)}</span>
      </div>
      <Slider className="py-3" min={500} max={40000} step={100} value={[amount]} onValueChange={([v]) => setAmount(v)} aria-label="Amount" />
      <MockLabel className="mt-1">Approvals, in order</MockLabel>
      <ol className="mt-2 flex flex-col gap-1.5">
        <AnimatePresence initial={false}>
          {chain.map((who, i) => (
            <motion.li
              key={who}
              layout
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="flex items-center gap-2.5 text-[12.5px]"
            >
              <span className={cn("grid size-5 shrink-0 place-items-center rounded-full text-[10px] transition-colors duration-(--duration-swap)", i <= approved ? "bg-signal-green text-page" : "bg-panel text-ink-3")}>
                {i <= approved ? <Check className="size-3" strokeWidth={3} /> : i + 1}
              </span>
              <span className="flex-1">{who}</span>
              <span className="text-[11px] text-ink-3">{i <= approved ? "Approved" : "Waiting"}</span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ol>
      <LimeButton className="mt-4 min-h-10 w-full" onClick={submit} disabled={approved >= 0 && approved < chain.length - 1}>
        {approved >= chain.length - 1 ? "Approved — PO issued · send again" : "Submit request"}
      </LimeButton>
    </Sheet>
  )
}

/* ---------------------------------------------------------------- Vendors */

const RENEWALS: Record<number, { vendor: string; seats: number; used: number; price: number }> = {
  4: { vendor: "Brightdesk", seats: 50, used: 34, price: 18 },
  11: { vendor: "Quarry Cloud", seats: 120, used: 117, price: 22 },
  19: { vendor: "Notewell", seats: 80, used: 41, price: 10 },
  26: { vendor: "Pinpoint CRM", seats: 30, used: 28, price: 65 },
}

/** November on one grid; a renewal day opens its usage and a right-size button. */
export function RenewalCalendarMock() {
  const [day, setDay] = useState(4)
  const [seats, setSeats] = useState<Record<number, number>>({})
  const r = RENEWALS[day]
  const current = seats[day] ?? r.seats
  const target = Math.ceil(r.used / 5) * 5 + 5
  const saving = (r.seats - current) * r.price * 12
  // November 2026 starts on a Sunday.
  return (
    <Sheet>
      <div className="flex items-center justify-between">
        <MockLabel>November renewals</MockLabel>
        <Badge variant="amber">{Object.keys(RENEWALS).length} due</Badge>
      </div>
      <div className="mt-2 grid grid-cols-7 gap-1 text-center text-[11px]">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => <span key={i} className="text-ink-4">{d}</span>)}
        {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => {
          const has = d in RENEWALS
          return (
            <button
              key={d}
              type="button"
              disabled={!has}
              onClick={() => setDay(d)}
              className={cn(
                "relative grid aspect-square place-items-center rounded-[5px] tabular-nums transition-colors duration-(--duration-hover)",
                has ? "font-medium text-ink hover:bg-panel" : "text-ink-3",
                day === d && "bg-ink text-page hover:bg-ink",
              )}
            >
              {d}
              {has && <span className={cn("absolute bottom-0.5 size-1 rounded-full", day === d ? "bg-lime" : "bg-signal-amber")} />}
            </button>
          )
        })}
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={day} initial={{ opacity: 0, transform: "translateY(4px)" }} animate={{ opacity: 1, transform: "translateY(0px)" }} exit={{ opacity: 0 }} transition={{ duration: 0.2, ease: EASE }} className="mt-3 rounded-(--radius-field) bg-panel p-3">
          <div className="flex items-baseline justify-between">
            <p className="text-[13px] font-medium">{r.vendor}</p>
            <p className="text-[12px] text-ink-3">Nov {day}</p>
          </div>
          <p className="mt-1 text-[12px] text-ink-2">{r.used} of {current} seats used in the last 30 days</p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
            <div className="h-full rounded-full bg-ink transition-[width] duration-(--duration-swap) ease-(--ease-out-strong)" style={{ width: `${(r.used / current) * 100}%` }} />
          </div>
          {target < r.seats ? (
            saving > 0 ? (
              <p className="mt-2 flex items-center gap-1 text-[12px] text-signal-green"><Check className="size-3" /> Renewing at {current} seats saves {money(saving, false)} a year</p>
            ) : (
              <SmallButton className="mt-2 w-full" onClick={() => setSeats((all) => ({ ...all, [day]: target }))}>Renew at {target} seats</SmallButton>
            )
          ) : (
            <p className="mt-2 text-[12px] text-ink-3">Seats are well used — renew as is.</p>
          )}
        </motion.div>
      </AnimatePresence>
    </Sheet>
  )
}

/* ------------------------------------------------------------- Accounting */

const CHECKS = [
  { label: "Card transactions coded", auto: true },
  { label: "Receipts matched", auto: true },
  { label: "Bills accrued", auto: true },
  { label: "Prepaids amortised", auto: true },
  { label: "Bank reconciled", auto: false },
  { label: "Controller sign-off", auto: false },
]

/** Four of six close steps tick themselves; tick the last two to close. */
export function CloseChecklistMock() {
  const [done, setDone] = useState(() => CHECKS.map((c) => c.auto))
  const [closed, setClosed] = useState(false)
  const n = done.filter(Boolean).length
  return (
    <Sheet>
      <div className="flex items-center justify-between">
        <MockLabel>October close</MockLabel>
        <span className="text-[12px] text-ink-3 tabular-nums">Day 2 of 3</span>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <svg viewBox="0 0 36 36" className="size-12 -rotate-90" aria-hidden>
          <circle cx="18" cy="18" r="15" fill="none" stroke="var(--color-line)" strokeWidth="3.5" />
          <circle cx="18" cy="18" r="15" fill="none" stroke="var(--color-ink)" strokeWidth="3.5" strokeLinecap="round" strokeDasharray={`${(n / CHECKS.length) * 94.25} 94.25`} className="transition-[stroke-dasharray] duration-(--duration-swap) ease-(--ease-out-strong)" />
        </svg>
        <div>
          <p className="text-[20px] font-medium tracking-[-0.03em] tabular-nums">{Math.round((n / CHECKS.length) * 100)}%</p>
          <p className="text-[12px] text-ink-3">{closed ? "October is closed" : `${CHECKS.length - n} step${CHECKS.length - n === 1 ? "" : "s"} left`}</p>
        </div>
      </div>
      <ul className="mt-3 flex flex-col">
        {CHECKS.map((c, i) => (
          <li key={c.label}>
            <button
              type="button"
              disabled={closed}
              onClick={() => setDone((all) => all.map((v, j) => (j === i ? !v : v)))}
              className="flex min-h-9 w-full items-center gap-2.5 rounded-(--radius-field) px-1 text-left text-[12.5px] transition-colors hover:bg-panel disabled:hover:bg-transparent"
            >
              <span className={cn("grid size-4 shrink-0 place-items-center rounded-[4px] transition-colors duration-(--duration-hover)", done[i] ? "bg-ink text-page" : "shadow-(--shadow-field)")}>
                {done[i] && <Check className="size-3" strokeWidth={3} />}
              </span>
              <span className={cn("flex-1", done[i] && "text-ink-3")}>{c.label}</span>
              {c.auto && <span className="text-[10.5px] text-ink-3">by Kestrel</span>}
            </button>
          </li>
        ))}
      </ul>
      <LimeButton className="mt-3 min-h-10 w-full" disabled={n < CHECKS.length && !closed} onClick={() => (closed ? (setClosed(false), setDone(CHECKS.map((c) => c.auto))) : setClosed(true))}>
        {closed ? "Reopen for November" : "Close October"}
      </LimeButton>
    </Sheet>
  )
}

/* --------------------------------------------------------------- Treasury */

const BALANCE = 2_400_000
const RATE = 0.041

/** Sweep idle cash above a floor into treasury; the projected yield follows. */
export function YieldMock() {
  const [sweep, setSweep] = useState(true)
  const [floor, setFloor] = useState(600_000)
  const invested = sweep ? BALANCE - floor : 0
  return (
    <Sheet>
      <div className="flex items-center justify-between">
        <MockLabel>Cash · all accounts</MockLabel>
        <span className="text-[13px] font-medium tabular-nums">{money(BALANCE, false)}</span>
      </div>
      <div className="mt-3 flex h-3 overflow-hidden rounded-full bg-line">
        <div className="h-full bg-ink transition-[width] duration-(--duration-swap) ease-(--ease-out-strong)" style={{ width: `${((BALANCE - invested) / BALANCE) * 100}%` }} />
        <div className="h-full bg-lime transition-[width] duration-(--duration-swap) ease-(--ease-out-strong)" style={{ width: `${(invested / BALANCE) * 100}%` }} />
      </div>
      <div className="mt-2 flex justify-between text-[11.5px] text-ink-3">
        <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-ink" /> Operating {money(BALANCE - invested, false)}</span>
        <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-lime" /> Treasury {money(invested, false)}</span>
      </div>
      <label className="mt-4 flex min-h-9 items-center justify-between text-[13px]">
        Sweep idle cash nightly
        <Switch checked={sweep} onCheckedChange={setSweep} />
      </label>
      <div className={cn("transition-opacity duration-(--duration-hover)", !sweep && "pointer-events-none opacity-40")}>
        <div className="mt-2 flex items-baseline justify-between text-[12px] text-ink-2">
          <span>Keep in operating</span>
          <span className="tabular-nums">{money(floor, false)}</span>
        </div>
        <Slider className="py-3" min={100_000} max={2_000_000} step={50_000} value={[floor]} onValueChange={([v]) => setFloor(v)} aria-label="Operating floor" disabled={!sweep} />
      </div>
      <div className="mt-2 rounded-(--radius-field) bg-panel p-3">
        <p className="text-[11.5px] text-ink-3">Projected yield, next 12 months</p>
        <p className="text-[24px] font-medium tracking-[-0.03em] tabular-nums">{money(invested * RATE, false)}</p>
        <p className="text-[11px] text-ink-3">At an illustrative {(RATE * 100).toFixed(1)}% — rates change.</p>
      </div>
    </Sheet>
  )
}

/* ----------------------------------------------------------------- Agents */

const ACTIONS = [
  { who: "Receipt agent", what: "Texted Rafael for a $212.80 hotel receipt", kind: "chase" },
  { who: "Policy agent", what: "Flagged a $94 dinner over the $75 cap", kind: "flag" },
  { who: "Coding agent", what: "Coded 38 transactions to Software · 6110", kind: "code" },
  { who: "Receipt agent", what: "Matched a Quarry Cloud invoice from email", kind: "chase" },
  { who: "Policy agent", what: "Approved 12 meals under policy", kind: "code" },
  { who: "Close agent", what: "Drafted the October accrual for Marlow Legal", kind: "code" },
  { who: "Policy agent", what: "Asked Noor why a taxi was booked on Sunday", kind: "flag" },
  { who: "Coding agent", what: "Split a $1,240 order across two departments", kind: "code" },
] as const

/**
 * A live feed of what the agents did, one entry every `interval` seconds
 * while in view. Pausable; holds still while designing and for reduced
 * motion.
 */
export function AgentLogMock({ interval = 1.8 }: { interval?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: "-10% 0px" })
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const [paused, setPaused] = useState(false)
  const [onlyFlags, setOnlyFlags] = useState(false)
  const [count, setCount] = useState(4)
  const running = inView && !paused && !reduced && !designing

  useEffect(() => {
    if (!running) return
    const id = window.setInterval(() => setCount((c) => c + 1), interval * 1000)
    return () => window.clearInterval(id)
  }, [running, interval])

  const feed = Array.from({ length: count }, (_, i) => ({ ...ACTIONS[i % ACTIONS.length], id: i }))
    .reverse()
    .filter((a) => !onlyFlags || a.kind === "flag")
    .slice(0, 5)

  return (
    <div ref={ref} className="w-full max-w-[360px]">
      <Sheet>
        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-2 text-[13px] font-medium">
            <span className={cn("size-2 rounded-full", running ? "bg-signal-green" : "bg-ink-4")} />
            Agent activity
          </span>
          <div className="flex gap-1">
            <button type="button" aria-pressed={onlyFlags} onClick={() => setOnlyFlags((v) => !v)} className={cn("min-h-8 rounded-(--radius-field) px-2 text-[11.5px] transition-colors", onlyFlags ? "bg-ink text-page" : "bg-panel text-ink-2 hover:text-ink")}>
              Flags only
            </button>
            <button type="button" aria-label={paused ? "Resume" : "Pause"} onClick={() => setPaused((v) => !v)} className="grid size-8 place-items-center rounded-(--radius-field) bg-panel text-ink-2 transition-colors hover:text-ink">
              {paused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
            </button>
          </div>
        </div>
        <ul className="mt-3 flex min-h-[248px] flex-col gap-1.5">
          <AnimatePresence initial={false} mode="popLayout">
            {feed.map((a) => (
              <motion.li
                key={a.id}
                layout
                initial={{ opacity: 0, transform: "translateY(-8px)" }}
                animate={{ opacity: 1, transform: "translateY(0px)" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="flex gap-2.5 rounded-(--radius-field) bg-panel/60 p-2"
              >
                <span className={cn("grid size-6 shrink-0 place-items-center rounded-full", a.kind === "flag" ? "bg-signal-amber-soft text-signal-amber" : "bg-raised text-ink-2")}>
                  {a.kind === "flag" ? <Sparkles className="size-3" /> : <Bot className="size-3" />}
                </span>
                <span className="min-w-0">
                  <span className="block text-[11px] text-ink-3">{a.who} · just now</span>
                  <span className="block text-[12.5px] leading-snug">{a.what}</span>
                </span>
              </motion.li>
            ))}
          </AnimatePresence>
          {!feed.length && <li className="py-10 text-center text-[12.5px] text-ink-3">No flags yet — everything's inside policy.</li>}
        </ul>
      </Sheet>
    </div>
  )
}

export const MODULE_MOCKS: Record<ModuleId, React.ComponentType> = {
  cards: CardLimitMock,
  expenses: ReceiptMatchMock,
  travel: TripMock,
  bills: BillApprovalMock,
  procurement: PurchaseRequestMock,
  vendors: RenewalCalendarMock,
  accounting: CloseChecklistMock,
  treasury: YieldMock,
  agents: AgentLogMock,
}
