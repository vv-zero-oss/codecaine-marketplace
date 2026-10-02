import { Bell, CalendarDays, Home, Receipt, Settings2, User, Zap } from "lucide-react"

import { Container } from "@/components/ui/container"
import { PhoneFrame } from "@/components/ui/phone-frame"
import { Tilt } from "@/components/motion/tilt"
import { Reveal } from "@/components/motion/reveal"
import { Parallax } from "@/components/motion/parallax"
import { CountUp } from "@/components/motion/count-up"

const BANKS = [
  ["Harbor", "$27,932"],
  ["Citrine", "$12,410"],
  ["Northline", "$2,586"],
  ["Oakmont", "$58,482"],
]

/** An area chart as one path; the fill fades to nothing at the baseline. */
function AreaChart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 100" preserveAspectRatio="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="area-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="var(--color-leaf-400)" stopOpacity="0.55" />
          <stop offset="1" stopColor="var(--color-leaf-400)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0 78 C30 74 50 70 80 66 S130 60 160 48 S210 40 240 26 S280 20 300 14 V100 H0Z" fill="url(#area-fill)" />
      <path d="M0 78 C30 74 50 70 80 66 S130 60 160 48 S210 40 240 26 S280 20 300 14" fill="none" stroke="var(--color-leaf-500)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

const DUE: Record<number, [string, string]> = {
  4: ["Streaming", "$13"],
  10: ["Phone plan", "$45"],
  13: ["Cloud storage", "$10"],
  18: ["Gym membership", "$30"],
  23: ["Rent", "$1,360"],
}

/** A day on the calendar. Days with a payment pop on hover or focus and name it. */
function CalendarDay({ day }: { day: number }) {
  const due = DUE[day]
  if (!due) return <span className="grid aspect-square place-items-center rounded-md bg-white/5 text-[9px] text-white/40">{day}</span>
  return (
    <button
      type="button"
      aria-label={`${due[0]}, ${due[1]}, on the ${day}th`}
      className="group relative grid aspect-square place-items-center rounded-md bg-brand-500 text-[9px] text-white transition-transform duration-150 ease-[var(--ease-out)] active:scale-90 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none [@media(hover:hover)_and_(pointer:fine)]:hover:scale-110"
    >
      {day}
      <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1.5 origin-bottom -translate-x-1/2 scale-95 rounded-md bg-white px-2 py-1 text-[10px] font-semibold whitespace-nowrap text-ink-900 opacity-0 shadow-lift transition-[opacity,transform] duration-150 ease-[var(--ease-out)] group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100">
        {due[0]} · {due[1]}
      </span>
    </button>
  )
}

function RecurringPanel() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl bg-white shadow-card">
      <div className="bg-night-800 p-4 text-white">
        <p className="flex items-center gap-2 text-[10px] font-semibold tracking-wider uppercase">
          <CalendarDays className="size-3" /> Recurring payments
        </p>
        <div className="mt-4 grid grid-cols-7 gap-1.5">
          {Array.from({ length: 28 }, (_, i) => (
            <CalendarDay key={i} day={i + 1} />
          ))}
        </div>
      </div>
      <ul className="divide-y divide-ink-100 p-3 text-xs">
        {[["Rent", "$1,360", "Due in 3 days"], ["Streaming", "$13", "Due in 17 days"]].map(([name, amount, due]) => (
          <li key={name} className="flex items-center justify-between py-2">
            <span>
              <span className="block font-semibold">{name}</span>
              <span className="text-[10px] text-ink-400">{due}</span>
            </span>
            <span className="tabular font-bold">{amount}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function DesktopMock() {
  return (
    <div className="rounded-2xl bg-ink-100 p-3 shadow-device sm:p-5">
      <div className="grid gap-3 sm:grid-cols-[0.8fr_1.6fr_1fr] sm:pr-24 lg:pr-40">
        <RecurringPanel />
        <div className="space-y-3">
          <div className="rounded-xl bg-white p-4 shadow-card">
            <p className="text-[10px] font-semibold tracking-wider text-ink-400 uppercase">Total balance</p>
            <CountUp value={101410} className="tabular mt-1 block text-3xl font-extrabold tracking-tight" />
            <p className="mt-0.5 text-[11px] font-medium text-leaf-500">↑ 12% compared to last month</p>
            <AreaChart className="mt-3 h-20 w-full" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {BANKS.slice(0, 2).map(([bank, amount]) => (
              <div key={bank} className="rounded-xl bg-white p-3 shadow-card">
                <p className="text-[10px] font-semibold tracking-wider text-ink-400 uppercase">{bank} bank</p>
                <p className="tabular mt-1 text-lg font-bold">{amount}</p>
              </div>
            ))}
          </div>
        </div>
        <ul className="hidden space-y-2 sm:block">
          {BANKS.map(([bank, amount]) => (
            <li key={bank} className="flex items-center justify-between rounded-xl bg-white px-3 py-2.5 text-xs shadow-card">
              <span className="font-semibold">{bank}</span>
              <span className="tabular text-ink-600">{amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function PhoneScreen() {
  return (
    <div className="flex h-full flex-col px-3 pb-3 text-left">
      <div className="flex items-center justify-between">
        <p className="text-xl font-extrabold tracking-tight">Home</p>
        <Bell className="size-4 text-ink-600" />
      </div>
      <div className="mt-3 rounded-xl bg-ink-50 p-3">
        <p className="flex items-center justify-between text-[10px] font-semibold text-ink-600">
          Total balance <Settings2 className="size-3" />
        </p>
        <p className="tabular mt-1 text-xl font-extrabold">$101,410</p>
        <AreaChart className="mt-1 h-8 w-full" />
      </div>
      <div className="mt-3 rounded-xl bg-ink-50 p-3 text-[10px]">
        <p className="font-semibold text-ink-600">Harbor National Bank</p>
        <p className="tabular mt-1 text-lg font-extrabold">$27,932</p>
        <p className="mt-2 text-ink-400">Last transaction</p>
        <p className="tabular font-semibold">-$932 · 13/05, 9:30 AM</p>
      </div>
      <nav className="mt-auto flex justify-between px-1 pt-3 text-[9px] font-medium text-ink-600">
        {[[Home, "Home"], [Receipt, "Activity"], [User, "You"], [Zap, "Tips"]].map(([Glyph, label]) => {
          const G = Glyph as typeof Home
          return (
            <span key={label as string} className="flex flex-col items-center gap-0.5">
              <G className="size-4" />
              {label as string}
            </span>
          )
        })}
      </nav>
    </div>
  )
}

/** The product at a glance: the desktop dashboard with the phone app overlapping it. */
export function Showcase() {
  return (
    <section id="features" className="bg-white pb-16 sm:pb-24">
      <Container>
        <Reveal distance={40}>
          <div className="relative mx-auto max-w-5xl">
            <Tilt max={2} lift={1.005}>
              <DesktopMock />
            </Tilt>
            <Parallax distance={30} className="mx-auto mt-6 w-44 sm:absolute sm:top-[-2rem] sm:right-[-0.5rem] sm:mt-0 sm:w-52 lg:right-6 lg:w-60">
              <Tilt max={9} lift={1.03}>
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
