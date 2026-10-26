import { Activity, Bike, Dumbbell, Footprints, HeartPulse, Moon, Thermometer, Wind } from "lucide-react"

import { DrawLine } from "@/components/motion/draw-line"
import { MockHeading, MockPanel, Stat } from "@/components/mock/bits"
import { linePath } from "@/components/mock/chart"
import { SESSIONS } from "@/components/mock/data"
import { FeatureCard } from "@/components/sections/feature-card"
import { SectionHeading } from "@/components/sections/section-heading"
import { Chip } from "@/components/ui/chip"
import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"

function SessionList() {
  return (
    <MockPanel className="m-6 mt-0 p-3 text-[12px] sm:absolute sm:inset-y-6 sm:right-0 sm:left-0 sm:m-0 sm:rounded-r-none">
      <MockHeading title="Detected automatically" />
      <div className="mt-2 flex flex-col">
        {SESSIONS.map((t) => (
          <div key={t.name} className="flex items-center gap-2 border-b border-line py-1.5 last:border-0">
            <span className="min-w-0 flex-1 truncate text-fg-2">{t.name}</span>
            <Chip tone={t.tone}>{t.tag}</Chip>
          </div>
        ))}
      </div>
    </MockPanel>
  )
}

/** Resting heart rate over a month: this month trending down against last. */
function RestingLine() {
  const now = linePath([62, 61, 62, 60, 60.5, 59, 59.4, 58, 58.6, 57, 57.4, 56, 56.2, 55, 54], 400, 120)
  const last = linePath([63, 62.6, 62.8, 62, 62.4, 61.6, 62, 61.2, 61.6, 61, 61.2, 60.6, 61, 60.4, 60.6], 400, 120)
  return (
    <div className="px-6 pb-6">
      <svg viewBox="0 0 400 120" className="h-[150px] w-full overflow-visible" preserveAspectRatio="none">
        <path d={last.d} fill="none" stroke="var(--color-fg-4)" strokeWidth="1.5" strokeDasharray="4 5" vectorEffect="non-scaling-stroke" />
        <DrawLine d={now.d} stroke="var(--color-action)" dotX={now.end.x} dotY={now.end.y} dotFill="var(--color-surface-2)" />
      </svg>
      <div className="mt-3 flex items-center gap-4 text-[12px] text-fg-3">
        <span className="flex items-center gap-1.5"><span className="h-0.5 w-4 rounded bg-action" /> This month</span>
        <span className="flex items-center gap-1.5"><span className="h-0.5 w-4 rounded border-t border-dashed border-fg-4" /> Last month</span>
      </div>
    </div>
  )
}

const NIGHTS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const SLEEP = [0.62, 0.9, 0.55, 0.8, 0.48, 0.95, 0.86]

function SleepBars() {
  return (
    <MockPanel className="m-6 mt-0 p-4 text-center sm:absolute sm:inset-y-6 sm:right-0 sm:left-0 sm:m-0 sm:rounded-r-none">
      <p className="text-[17px] font-bold text-fg">Sleep this week</p>
      <div className="mt-3 grid grid-cols-2 text-[10px] text-fg-4 uppercase">
        <span>Average</span>
        <span>Sleep debt</span>
      </div>
      <div className="grid grid-cols-2 text-[18px] font-bold text-fg">
        <Stat value="7h 12" unit="m" />
        <Stat value="1h 40" unit="m" />
      </div>
      <div className="grid grid-cols-2 text-[11px] text-fg-3">
        <span>+24m on last week</span>
        <span>clears by Sunday</span>
      </div>
      <div className="relative mt-4 flex h-16 items-end justify-between gap-2 border-b border-line-strong px-1">
        {SLEEP.map((v, i) => (
          <span key={i} className={cn("w-2.5 rounded-t-full", v < 0.6 ? "bg-loss" : "bg-action")} style={{ height: `${v * 100}%` }} />
        ))}
      </div>
      <div className="mt-1.5 flex justify-between px-0.5 text-[9px] text-fg-4 uppercase">
        {NIGHTS.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
    </MockPanel>
  )
}

const LOAD = [
  { label: "Run", icon: Footprints, amount: "+12", tone: "text-action bg-action-soft" },
  { label: "Ride", icon: Bike, amount: "+8", tone: "text-tag-sky bg-tag-sky/14" },
  { label: "Strength", icon: Dumbbell, amount: "+6", tone: "text-tag-sand bg-tag-sand/14" },
  { label: "Rest day", icon: Moon, amount: "−9", tone: "text-tag-mist bg-tag-mist/12" },
]

function TrainingLoad() {
  return (
    <ul className="flex flex-col gap-2 px-6 pb-6">
      {LOAD.map(({ label, icon: Icon, amount, tone }) => (
        <li key={label} className={cn("flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-[13px] font-medium", tone)}>
          <Icon className="size-3.5" />
          {label}
          <span className="ml-1 text-fg tabular-nums">{amount}</span>
        </li>
      ))}
    </ul>
  )
}

const ALERTS = [
  { date: "Mon", label: "HRV dipped 18%", icon: Activity },
  { date: "Tue", label: "Resting HR up 6 bpm", icon: HeartPulse },
  { date: "Tue", label: "Skin temp +0.6°", icon: Thermometer },
  { date: "Wed", label: "Breathing rate high", icon: Wind },
]

function EarlySignals() {
  return (
    <div className="pb-6 pl-6">
      <p className="type-eyebrow text-fg-4">This week</p>
      <MockPanel className="mt-2 rounded-r-none">
        {ALERTS.map(({ date, label, icon: Icon }) => (
          <div key={label} className="flex items-center gap-3 border-b border-line px-3 py-2.5 text-[12px] last:border-0">
            <span className="w-8 text-fg-4">{date}</span>
            <Icon className="size-3.5 text-fg-3" />
            <span className="truncate text-fg-2">{label}</span>
          </div>
        ))}
      </MockPanel>
    </div>
  )
}

/** The vitals chapter: five cells, each one signal Cadence reads for you. */
export function Vitals({ title = "Read your body, train smarter" }: { title?: string }) {
  return (
    <section className="relative pt-(--spacing-section) pb-(--spacing-section)">
      <Container>
        <SectionHeading title={title} className="text-fg" />
        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 md:mt-16">
          <FeatureCard
            title="Every session, logged"
            body="Runs, rides and lifts are detected and tagged by zone. Correct one once and Cadence learns your routine."
            layout="side"
            className="min-h-[300px] sm:col-span-2"
          >
            <SessionList />
          </FeatureCard>
          <FeatureCard
            title="Resting heart rate"
            body="The quietest number you have, and the most honest. Watch it fall as your fitness climbs."
            delay={0.08}
            className="sm:col-span-2"
          >
            <RestingLine />
          </FeatureCard>
          <FeatureCard
            title="Sleep that adds up"
            body="Short nights become debt, and Cadence plans the early ones that pay it back."
            layout="side"
            className="min-h-[300px] sm:col-span-2"
          >
            <SleepBars />
          </FeatureCard>
          <FeatureCard title="Training load" body="What each session cost, and what rest gave back." delay={0.08}>
            <TrainingLoad />
          </FeatureCard>
          <FeatureCard title="Early signals" body="Your body says ‘slow down’ before you feel it. Cadence hears it first." delay={0.16}>
            <EarlySignals />
          </FeatureCard>
        </div>
      </Container>
    </section>
  )
}
