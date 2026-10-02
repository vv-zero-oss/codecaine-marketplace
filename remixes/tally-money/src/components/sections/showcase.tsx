import { Bell, ChevronDown, ChevronRight, Cloud, Copy, Download, Dumbbell, House, Layers, Lightbulb, Music2, Plus, Receipt, Settings2, Tv, User, Wifi, type LucideIcon } from "lucide-react"
import { useId, useState } from "react"

import { Container } from "@/components/ui/container"
import { BankMark, type BankTone } from "@/components/ui/bank-mark"
import { PhoneFrame } from "@/components/ui/phone-frame"
import { Reveal } from "@/components/motion/reveal"
import { Parallax } from "@/components/motion/parallax"
import { Tilt } from "@/components/motion/tilt"
import { CountUp } from "@/components/motion/count-up"
import { smoothPath } from "@/lib/chart"
import { cn } from "@/lib/utils"

const BANKS: { name: string; tone: BankTone; amount: string; short: string }[] = [
  { name: "Harbor", tone: "harbor", amount: "$27,932", short: "27.9k" },
  { name: "Citrine", tone: "citrine", amount: "$12,410", short: "12.4k" },
  { name: "Northline", tone: "northline", amount: "$2,586", short: "2.6k" },
  { name: "Oakmont", tone: "oakmont", amount: "$58,482", short: "58.5k" },
]

const OVERLINE = "text-[10px] font-semibold tracking-wider text-ink-400 uppercase"

/* ─── Recurring payments ─────────────────────────────────────────────── */

/** January 2026 starts on a Thursday and today is the 20th. */
const MONTH = { blanks: 4, days: 31, today: 20 }
const DUE: Record<number, { name: string; amount: string; icon: LucideIcon; paid: boolean }> = {
  2: { name: "Cloud storage", amount: "$10", icon: Cloud, paid: true },
  5: { name: "Music plan", amount: "$12", icon: Music2, paid: true },
  9: { name: "Home internet", amount: "$55", icon: Wifi, paid: true },
  14: { name: "Streaming", amount: "$13", icon: Tv, paid: true },
  23: { name: "Rent", amount: "$1,360", icon: House, paid: false },
  26: { name: "Gym membership", amount: "$30", icon: Dumbbell, paid: false },
}

/** A day on the calendar. Days with a payment hold its icon, and pop on hover or focus to name it. */
function CalendarDay({ day }: { day: number }) {
  const due = DUE[day]
  const today = day === MONTH.today
  if (!due) {
    return (
      <span className={cn("grid aspect-square place-items-center rounded-md text-[9px] tabular-nums", today ? "bg-white text-night-800 font-bold" : "text-white/40")}>
        {day}
      </span>
    )
  }
  return (
    <button
      type="button"
      aria-label={`${due.name}, ${due.amount}, on the ${day}th`}
      className={cn(
        "group relative grid aspect-square place-items-center rounded-md transition-transform duration-150 ease-[var(--ease-out)] active:scale-90 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none [@media(hover:hover)_and_(pointer:fine)]:hover:scale-110",
        due.paid ? "bg-white/10 text-white/70" : "bg-brand-500 text-white",
      )}
    >
      <due.icon className="size-3" strokeWidth={2.25} />
      <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1.5 origin-bottom -translate-x-1/2 scale-95 rounded-md bg-white px-2 py-1 text-[10px] font-semibold whitespace-nowrap text-ink-900 opacity-0 shadow-lift transition-[opacity,transform] duration-150 ease-[var(--ease-out)] group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100">
        {due.name} · {due.amount}
      </span>
    </button>
  )
}

function PaymentCard({ icon: Glyph, name, date, due, amount, urgent }: { icon: LucideIcon; name: string; date: string; due: string; amount: string; urgent?: boolean }) {
  return (
    <div className="overflow-hidden rounded-xl border border-ink-100 bg-white">
      <div className="flex items-center gap-2 px-2.5 py-2">
        <span className="grid size-6 place-items-center rounded-md bg-ink-50 text-ink-900">
          <Glyph className="size-3.5" />
        </span>
        <span className="flex-1 truncate text-xs font-bold">{name}</span>
        <span className="rounded-md border border-ink-100 px-1.5 py-0.5 text-center text-[9px] leading-tight font-bold tracking-wide uppercase">{date}</span>
      </div>
      <div className={cn("flex items-center justify-between px-2.5 py-1.5 text-[10px] font-medium", urgent ? "bg-coral-100 text-coral-500" : "bg-ink-50 text-ink-600")}>
        <span>{due}</span>
        <span className="tabular-nums">
          <span className="font-bold">{amount}</span> monthly
        </span>
      </div>
    </div>
  )
}

function RecurringPanel() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-card">
      <div className="bg-night-800 p-4 text-white">
        <p className="flex items-center justify-between text-[10px] font-bold tracking-wider uppercase">
          Recurring payments <Plus className="size-3.5 text-white/60" />
        </p>
        <div className="mt-3 flex items-center justify-between rounded-lg bg-white/10 px-2.5 py-1.5 text-[11px] font-semibold">
          <ChevronDown className="size-3 rotate-90 text-white/60" />
          January 2026
          <ChevronRight className="size-3 text-white/60" />
        </div>
        <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[9px] font-semibold text-white/40">
          {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
            <span key={i}>{d}</span>
          ))}
        </div>
        <div className="mt-1 grid grid-cols-7 gap-1">
          {Array.from({ length: MONTH.blanks }, (_, i) => (
            <span key={`b${i}`} />
          ))}
          {Array.from({ length: MONTH.days }, (_, i) => (
            <CalendarDay key={i} day={i + 1} />
          ))}
        </div>
      </div>
      <div className="space-y-2 p-3 text-xs">
        <div className="flex items-center justify-between px-0.5 font-semibold text-ink-600">
          <span className="flex items-center gap-1"><ChevronRight className="size-3" /> Paid</span>
          <span className="tabular-nums text-ink-900">$90</span>
        </div>
        <div className="flex items-center justify-between px-0.5 font-semibold text-ink-600">
          <span className="flex items-center gap-1"><ChevronDown className="size-3" /> Upcoming</span>
          <span className="tabular-nums text-ink-900">$1,390</span>
        </div>
        <PaymentCard icon={House} name="Rent" date="23 Jan" due="Due in 3 days" amount="$1,360" urgent />
        <PaymentCard icon={Dumbbell} name="Gym membership" date="26 Jan" due="Due in 6 days" amount="$30" />
      </div>
    </div>
  )
}

/* ─── Balance ────────────────────────────────────────────────────────── */

const SERIES = [84200, 85100, 84700, 86900, 88200, 87600, 90100, 92400, 91800, 94300, 96800, 98200, 99600, 101410]
const CW = 400
const CH = 120
const MIN = 82000
const MAX = 104000
const cx = (i: number) => (i * CW) / (SERIES.length - 1)
const cy = (v: number) => CH - 8 - ((v - MIN) / (MAX - MIN)) * (CH - 24)
const LINE = smoothPath(SERIES.map((v, i) => [cx(i), cy(v)] as const))
const TICKS = [0, 3, 6, 9, 13]

/** The balance, day by day. Move across it to read any day. */
function BalanceChart() {
  const id = useId()
  const [index, setIndex] = useState(SERIES.length - 1)
  const pct = (index / (SERIES.length - 1)) * 100
  return (
    <div
      className="relative touch-pan-y select-none"
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        setIndex(Math.min(SERIES.length - 1, Math.max(0, Math.round(((event.clientX - rect.left) / rect.width) * (SERIES.length - 1)))))
      }}
      onPointerLeave={() => setIndex(SERIES.length - 1)}
    >
      <svg viewBox={`0 0 ${CW} ${CH}`} preserveAspectRatio="none" className="block h-28 w-full" aria-label="Total balance from 7 to 20 January" role="img">
        <defs>
          <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="var(--color-leaf-400)" stopOpacity="0.5" />
            <stop offset="1" stopColor="var(--color-leaf-400)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[24, 56, 88].map((gy) => (
          <line key={gy} x1="0" x2={CW} y1={gy} y2={gy} stroke="var(--color-ink-100)" strokeDasharray="3 5" vectorEffect="non-scaling-stroke" />
        ))}
        <path d={`${LINE} V${CH} H0Z`} fill={`url(#${id})`} />
        <path d={LINE} fill="none" stroke="var(--color-leaf-500)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      </svg>
      <span className="pointer-events-none absolute inset-y-0 w-px bg-ink-200 transition-[left] duration-100 ease-out" style={{ left: `${pct}%` }} />
      <span
        className="pointer-events-none absolute z-10 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-leaf-500 ring-2 ring-white transition-[left,top] duration-100 ease-out"
        style={{ left: `${pct}%`, top: `${(cy(SERIES[index]) / CH) * 100}%` }}
      />
      <span
        className="tabular pointer-events-none absolute z-10 -translate-x-1/2 rounded-md bg-ink-900 px-1.5 py-0.5 text-[10px] font-bold whitespace-nowrap text-white transition-[left,top] duration-100 ease-out"
        style={{ left: `clamp(2.5rem, ${pct}%, calc(100% - 2.5rem))`, top: `calc(${(cy(SERIES[index]) / CH) * 100}% - 1.75rem)` }}
      >
        ${SERIES[index].toLocaleString("en-US")} · {7 + index} Jan
      </span>
      <div className="mt-1 flex justify-between text-[9px] font-medium text-ink-400">
        {TICKS.map((t) => (
          <span key={t}>{7 + t} Jan</span>
        ))}
      </div>
    </div>
  )
}

function BankCard({ name, tone, amount, number, routing, swift }: { name: string; tone: BankTone; amount: string; number: string; routing: string; swift: string }) {
  const rows = [["Account", number], ["Routing", routing], ["SWIFT", swift], ["Holder", "AVA MORENO"]]
  return (
    <div className="rounded-2xl bg-white p-4 shadow-card">
      <p className="flex items-center gap-2 text-[10px] font-bold tracking-wider uppercase">
        <BankMark tone={tone} /> {name}
      </p>
      <p className="tabular mt-2 text-2xl font-extrabold tracking-tight">{amount}</p>
      <dl className="mt-3 space-y-1.5 text-[10px]">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-center justify-between">
            <dt className="font-semibold tracking-wider text-ink-400 uppercase">{k}</dt>
            <dd className="tabular flex items-center gap-1.5 font-semibold">
              {v} {k !== "Holder" ? <Copy className="size-2.5 text-ink-400" /> : null}
            </dd>
          </div>
        ))}
      </dl>
      <button type="button" className="mt-3 flex h-8 w-full items-center justify-center gap-1.5 rounded-lg border border-ink-100 text-[11px] font-semibold transition-[background-color,transform] duration-150 active:scale-[0.98] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-ink-50">
        <Download className="size-3" /> Download statement
      </button>
    </div>
  )
}

function Dashboard() {
  return (
    <div className="grid gap-3 md:grid-cols-[15.5rem_1fr]">
      <div className="order-2 md:order-1">
        <RecurringPanel />
      </div>
      <div className="order-1 min-w-0 space-y-3 md:order-2">
        <div className="px-1">
          <p className={OVERLINE}>Good morning, Ava</p>
          <p className="text-[11px] font-bold tracking-wide uppercase">It’s the 20th of January, a Tuesday</p>
        </div>
        <div className="grid gap-3 lg:grid-cols-[10.5rem_1fr]">
          <div className="flex flex-col rounded-2xl bg-white p-4 shadow-card">
            <p className={OVERLINE}>Banks</p>
            <ul className="mt-3 flex-1 space-y-2.5">
              {BANKS.map((bank) => (
                <li key={bank.name} className="flex items-center gap-2 text-[11px]">
                  <span className="grid size-3.5 place-items-center rounded-[4px] bg-ink-900 text-white">
                    <svg viewBox="0 0 12 12" className="size-2.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2.5 6.5l2.2 2L9.5 3.5" /></svg>
                  </span>
                  <BankMark tone={bank.tone} className="size-4 text-[8px]" />
                  <span className="tabular ml-auto font-semibold text-ink-600">{bank.amount}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 border-t border-ink-100 pt-3 text-[10px] leading-snug text-ink-400">4 accounts · synced 2 minutes ago</p>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-card">
            <p className={OVERLINE}>Total balance</p>
            <div className="mt-1 flex items-baseline gap-2">
              <CountUp value={101410} className="tabular text-4xl font-extrabold tracking-tight" />
              <span className="text-[11px] font-semibold text-leaf-500">↑ 12% vs last month</span>
            </div>
            <div className="mt-2">
              <BalanceChart />
            </div>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <BankCard name="Harbor National" tone="harbor" amount="$27,932" number="3453 6896 852" routing="021000089" swift="HRBRUS33" />
          <BankCard name="Citrine Credit" tone="citrine" amount="$12,410" number="9253 1187 004" routing="026009593" swift="CTRNUS44" />
        </div>
      </div>
    </div>
  )
}

/* ─── The phone ──────────────────────────────────────────────────────── */

function Sparkline({ className }: { className?: string }) {
  const d = smoothPath([[0, 18], [8, 16], [16, 17], [24, 11], [32, 12], [40, 6], [48, 2]])
  return (
    <svg viewBox="0 0 48 20" className={className} aria-hidden="true">
      <path d={d} fill="none" stroke="var(--color-leaf-500)" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  )
}

const TABS: [LucideIcon, string][] = [[House, "Home"], [Receipt, "Activity"], [User, "You"], [Lightbulb, "Tips"]]

function PhoneScreen() {
  return (
    <div className="flex h-full flex-col text-left">
      <div className="flex items-center justify-between px-4">
        <p className="text-[22px] leading-none font-extrabold tracking-tight">Home</p>
        <span className="flex items-center gap-2.5 text-ink-600">
          <Layers className="size-4" />
          <span className="relative">
            <Bell className="size-4" />
            <span className="absolute -top-0.5 -right-0.5 size-1.5 rounded-full bg-coral-500 ring-2 ring-white" />
          </span>
        </span>
      </div>
      <div className="mt-3 space-y-3 overflow-hidden px-3">
        <div>
          <p className="flex items-center justify-between px-1 pb-1 text-[9px] font-bold tracking-wider text-ink-600 uppercase">Total balance <Settings2 className="size-3" /></p>
          <div className="rounded-xl bg-ink-50 p-3">
            <div className="flex items-end justify-between">
              <span className="tabular text-xl font-extrabold tracking-tight">$101,410</span>
              <Sparkline className="h-5 w-12" />
            </div>
            <div className="mt-2 flex gap-1.5">
              {BANKS.slice(0, 3).map((bank) => (
                <span key={bank.name} className="tabular flex items-center gap-1 rounded-md bg-white px-1.5 py-1 text-[9px] font-bold shadow-card">
                  <BankMark tone={bank.tone} className="size-3 text-[6px]" /> {bank.short}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div>
          <p className="flex items-center justify-between px-1 pb-1 text-[9px] font-bold tracking-wider text-ink-600 uppercase">Bank accounts <Settings2 className="size-3" /></p>
          <div className="rounded-xl bg-ink-50 p-3">
            <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase"><BankMark tone="harbor" className="size-4 text-[8px]" /> Harbor National</p>
            <p className="mt-2 text-[9px] text-ink-400">Current balance</p>
            <p className="tabular text-lg font-extrabold tracking-tight">$27,932</p>
            <div className="mt-2 flex items-center justify-between border-t border-ink-200 pt-2 text-[9px]">
              <span className="text-ink-400">Last transaction</span>
              <span className="tabular font-bold">−$932 · 13 May</span>
            </div>
          </div>
        </div>
        <div>
          <p className="px-1 pb-1 text-[9px] font-bold tracking-wider text-ink-600 uppercase">Today</p>
          {[["Cabco", "Transport", "−$16"], ["Blue Bottle", "Coffee", "−$5"]].map(([m, c, a]) => (
            <div key={m} className="flex items-center justify-between border-b border-ink-100 py-1.5 text-[10px] last:border-0">
              <span><span className="block font-bold">{m}</span><span className="text-ink-400">{c}</span></span>
              <span className="tabular font-bold">{a}</span>
            </div>
          ))}
        </div>
      </div>
      <nav className="mt-auto flex justify-around border-t border-ink-100 px-2 pt-2 pb-1">
        {TABS.map(([Glyph, label], i) => (
          <span key={label} className={cn("flex flex-col items-center gap-0.5 text-[8px] font-semibold", i === 0 ? "text-brand-600" : "text-ink-400")}>
            <Glyph className="size-4" strokeWidth={i === 0 ? 2.5 : 2} />
            {label}
          </span>
        ))}
      </nav>
    </div>
  )
}

/** The product at a glance: the desktop dashboard, with the phone app standing beside it. */
export function Showcase() {
  return (
    <section id="features" className="bg-white pt-4 pb-16 sm:pt-14 sm:pb-24">
      <Container>
        <Reveal distance={40}>
          <div className="relative mx-auto max-w-6xl">
            <Tilt max={1.5} lift={1.003}>
              <div className="rounded-[1.75rem] border border-ink-100 bg-ink-100/70 p-3 shadow-device sm:p-4 lg:pr-[17rem]">
                <Dashboard />
              </div>
            </Tilt>
            <Parallax distance={16} className="relative z-10 mx-auto -mt-6 w-56 lg:absolute lg:top-[-2.5rem] lg:right-[-1.5rem] lg:mt-0 lg:w-[15.5rem]">
              <Tilt max={7} lift={1.02}>
                <PhoneFrame>
                  <PhoneScreen />
                </PhoneFrame>
              </Tilt>
            </Parallax>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
