import { ArrowDownRight, ArrowLeft, ArrowUpRight, Droplets } from "lucide-react"

import { DrawLine } from "@/components/motion/draw-line"
import { RisingPanel } from "@/components/motion/rising-panel"
import { linePath, series } from "@/components/mock/chart"
import { Stat } from "@/components/mock/bits"
import { FeatureCard } from "@/components/sections/feature-card"
import { SectionHeading } from "@/components/sections/section-heading"
import { Button } from "@/components/ui/button"
import { Chip } from "@/components/ui/chip"
import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"

const DEVICES = [
  { name: "Wrist band", seen: "Synced 2 min ago", change: "0.8%", up: true, value: "84%", colour: "bg-forest-ink" },
  { name: "Smart ring", seen: "Synced 1 hour ago", change: "1.2%", up: true, value: "61%", colour: "bg-spruce" },
  { name: "Smart scale", seen: "This morning", change: "0.4%", up: false, value: "71.2 kg", colour: "bg-signal-blue" },
  { name: "Chest strap", seen: "Yesterday", change: "2.1%", up: true, value: "idle", colour: "bg-alarm-red" },
]

/** On day, the change pill is Forest Ink on Linen Mist — lime would not read. */
function Delta({ value, up }: { value: string; up: boolean }) {
  return (
    <Chip tone="day" caps={false} className={cn(!up && "bg-alarm-red/10 text-alarm-red")}>
      {up ? <ArrowUpRight strokeWidth={3} /> : <ArrowDownRight strokeWidth={3} />}
      {value}
    </Chip>
  )
}

function FitnessScore() {
  const { d, area, end } = linePath([38, 38.4, 39.2, 40.6, 40.2, 41.4, 41, 42.2, 42, 43.4, 43.6, 44.2, 45.4, 45.6], 400, 120)
  return (
    <div className="px-6 pb-6">
      <div className="rounded-(--radius-field) bg-day p-4">
        <div className="flex flex-col items-center">
          <Delta value="4.6 this quarter" up />
          <p className="mt-1.5 text-[26px] font-black tracking-[-0.03em] text-day-ink"><Stat value="45.6" /></p>
          <p className="text-[12px] text-day-ink-3">VO₂ max · ml/kg/min</p>
        </div>
        <svg viewBox="0 0 400 120" className="mt-3 h-[120px] w-full overflow-visible" preserveAspectRatio="none">
          <path d={area} fill="var(--color-forest-ink)" fillOpacity="0.06" />
          <DrawLine d={d} stroke="var(--color-forest-ink)" dotX={end.x} dotY={end.y} dotFill="var(--color-day)" />
        </svg>
      </div>
      <div className="mt-5 flex justify-between text-[12px]">
        <span className="font-semibold text-day-ink">Devices</span>
        <span className="text-day-ink-3">Battery · reading</span>
      </div>
      <ul className="mt-2 flex flex-col">
        {DEVICES.map((a) => (
          <li key={a.name} className="flex items-center gap-3 py-2">
            <span className={cn("grid size-7 place-items-center rounded-full text-[12px] font-bold text-paper", a.colour)}>{a.name[0]}</span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[14px] font-medium text-day-ink">{a.name}</span>
              <span className="block text-[12px] text-day-ink-3">{a.seen}</span>
            </span>
            <span className="w-16 text-right text-[13px] text-day-ink tabular-nums">{a.value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

const VITALS = [
  { symbol: "HR", name: "Heart rate", change: "54 bpm", up: true, seed: 3 },
  { symbol: "HRV", name: "Variability", change: "68 ms", up: true, seed: 11 },
  { symbol: "SpO₂", name: "Oxygen", change: "97%", up: false, seed: 5 },
  { symbol: "RESP", name: "Breathing", change: "14 /min", up: true, seed: 17 },
]

function LiveVitals() {
  return (
    <div className="grid grid-cols-2 gap-2 px-6 pb-6 sm:grid-cols-4">
      {VITALS.map((t) => {
        const { d } = linePath(series(t.seed, 22, t.up ? 0.25 : -0.25, 1.1), 100, 40, 3, 0.1)
        return (
          <div key={t.symbol} className="flex flex-col items-center rounded-(--radius-field) bg-day p-2.5">
            <span className="self-start text-[13px] font-bold text-day-ink">{t.symbol}</span>
            <span className="self-start truncate text-[11px] text-day-ink-3">{t.name}</span>
            <svg viewBox="0 0 100 40" className="my-2 h-10 w-full" preserveAspectRatio="none">
              <DrawLine d={d} stroke={t.up ? "var(--color-spruce)" : "var(--color-alarm-red)"} width={1.8} dot={false} />
            </svg>
            <span className="rounded-full bg-paper px-2 py-0.5 text-[11px] font-semibold text-day-ink tabular-nums">{t.change}</span>
          </div>
        )
      })}
    </div>
  )
}

const COMPOSITION = [
  { label: "Muscle", pct: 0.62 },
  { label: "Water", pct: 0.55 },
  { label: "Fat", pct: 0.18 },
  { label: "Bone", pct: 0.12 },
]

function Composition() {
  return (
    <div className="px-6 pb-6">
      <div className="flex justify-between text-[12px]">
        <span className="font-semibold text-day-ink">Body composition</span>
        <span className="text-day-ink-3">% of mass</span>
      </div>
      <ul className="mt-3 flex flex-col gap-2.5">
        {COMPOSITION.map((a) => (
          <li key={a.label} className="grid grid-cols-[52px_1fr] items-center gap-2 text-[12px] text-day-ink-2">
            {a.label}
            <span className="h-2 rounded-full bg-day">
              <span className="block h-full rounded-full bg-forest-ink" style={{ width: `${a.pct * 100}%` }} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function LabResults() {
  return (
    <div className="pb-6 pl-6">
      <div className="rounded-l-(--radius-field) bg-day p-3">
        <div className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.06em] text-day-ink-3 uppercase">
          <ArrowLeft className="size-3" /> Lab results
        </div>
        <div className="mt-4 flex flex-col items-center gap-2 text-center">
          <span className="grid size-9 place-items-center rounded-full bg-forest-ink text-action">
            <Droplets className="size-4" />
          </span>
          <p className="text-[12px] text-day-ink-2">Upload a blood panel</p>
          <Button variant="outline" size="sm" className="h-8 text-[13px]">Add results</Button>
        </div>
      </div>
    </div>
  )
}

/**
 * The progress chapter, on a Linen Mist panel that rises over the night and
 * draws in as it leaves (see `RisingPanel`).
 */
export function Progress({ title = "Build fitness, watch it compound" }: { title?: string }) {
  return (
    <RisingPanel className="py-(--spacing-section)">
      <Container>
        <SectionHeading title={title} className="text-day-ink" />
        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 md:mt-16">
          <FeatureCard
            tone="day"
            title="All of you, one screen"
            body="Wrist, ring, scale and strap in one place. Your fitness score without five apps."
            className="sm:col-span-2 lg:row-span-2"
          >
            <FitnessScore />
          </FeatureCard>
          <FeatureCard tone="day" title="Live vitals" body="Read through the day. Check when you want to, not when you have to." delay={0.08} className="sm:col-span-2">
            <LiveVitals />
          </FeatureCard>
          <FeatureCard tone="day" title="Composition" body="Weight hides the story. See what’s muscle and what isn’t." delay={0.12}>
            <Composition />
          </FeatureCard>
          <FeatureCard tone="day" title="Lab results" body="Add a blood panel and Cadence tracks every marker over time." delay={0.16}>
            <LabResults />
          </FeatureCard>
        </div>
      </Container>
    </RisingPanel>
  )
}
