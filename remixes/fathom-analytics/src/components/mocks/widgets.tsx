import { ArrowUp, AtSign, Clock3 } from "lucide-react"

import { cn } from "@/lib/utils"

const BARS = [34, 58, 44, 72, 40, 62, 50, 78, 46, 66, 38, 70, 56, 64]
const REGIONS = [["Europe", "1 373"], ["North America", "930"], ["Africa", "745"], ["Asia", "432"], ["Other", "23"]]

/** A little cursor with a name tag, the kind collaborators leave on a shared board. */
export function Presence({ initials, tone, className }: { initials: string; tone: "mint" | "sky"; className?: string }) {
  return (
    <span className={cn("pointer-events-none absolute flex items-end", className)} aria-hidden>
      <svg viewBox="0 0 16 16" className="mb-3 -mr-1 size-4 text-ink" fill="currentColor"><path d="M2 1l11 5-5 1.6L6 13z" /></svg>
      <span className={cn("grid size-9 place-items-center rounded-full border text-[11px] font-medium", tone === "mint" ? "border-emerald-700/40 bg-mint text-emerald-900" : "border-sky-ink/40 bg-sky text-sky-ink")}>{initials}</span>
    </span>
  )
}

/** New users + region table, in one blue card. */
export function MetricsCard({ className }: { className?: string }) {
  return (
    <div className={cn("grid grid-cols-[1.25fr_1fr] gap-4 rounded-card bg-chart-soft p-4 text-chart shadow-card", className)}>
      <div className="flex min-w-0 flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <span className="text-[11px] font-medium">New users</span>
          <div className="text-right">
            <p className="tnum text-[clamp(1.1rem,2.4vw,1.6rem)] leading-none font-medium tracking-tight">3 503</p>
            <p className="mt-1 text-[9px] opacity-70">↑ 6.2% vs last week</p>
          </div>
        </div>
        <div className="mt-3 flex h-[46%] min-h-10 items-end gap-[5%]">
          {BARS.map((h, i) => (
            <span key={i} className="flex-1 rounded-[1px] bg-chart" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
      <div className="min-w-0">
        <p className="mb-1.5 text-[11px] font-medium">Region</p>
        {REGIONS.map(([name, value]) => (
          <p key={name} className="flex justify-between border-t border-chart/10 py-[3px] text-[9px] text-chart/70 first:border-t-0">
            <span className="truncate">{name}</span>
            <span className="tnum">{value}</span>
          </p>
        ))}
      </div>
    </div>
  )
}

export function RegistrationsCard({ className }: { className?: string }) {
  const r = 34
  const c = 2 * Math.PI * r
  return (
    <div className={cn("flex flex-col justify-between rounded-card bg-ember-soft p-4 text-ember shadow-card", className)}>
      <span className="text-[11px] font-medium">Registrations</span>
      <div className="relative mx-auto my-2 size-[4.6rem]">
        <svg viewBox="0 0 80 80" className="size-full -rotate-90">
          <circle cx="40" cy="40" r={r} fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="2.5" />
          <circle cx="40" cy="40" r={r} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * 0.25} />
        </svg>
        <span className="absolute inset-0 grid place-content-center text-center">
          <span className="tnum text-base leading-none font-medium">75%</span>
          <span className="text-[7px] opacity-70">of target</span>
        </span>
      </div>
      <div>
        <p className="tnum text-sm leading-none font-medium">2.4k</p>
        <p className="mt-1 text-[8px] opacity-70">↑ 5.5% vs last week</p>
      </div>
    </div>
  )
}

export function ActivationCard({ className }: { className?: string }) {
  return (
    <div className={cn("relative flex flex-col justify-between rounded-card bg-window p-4 shadow-card", className)}>
      <span className="text-[11px] font-medium">Activation</span>
      <svg viewBox="0 0 180 80" className="my-1 h-auto w-full text-ink" fill="none" aria-hidden>
        <path d="M0 40h180" stroke="currentColor" strokeOpacity="0.2" strokeDasharray="3 3" />
        <path d="M6 70C34 70 40 54 62 52S92 56 110 38s30-8 38-20 22-4 28-6" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="176" cy="12" r="2.5" fill="currentColor" />
        <circle cx="6" cy="70" r="2.5" fill="var(--color-window)" stroke="currentColor" />
      </svg>
      <div className="flex items-end justify-between">
        <div>
          <p className="tnum text-sm leading-none font-medium">46.2%</p>
          <p className="mt-1 text-[8px] text-ink-3">103% of target</p>
        </div>
        <span className="flex gap-3 text-[8px] text-ink-3"><span>Aug</span><span>Sep</span><span>Oct</span><span className="rounded-full border border-line-strong px-1.5 text-ink">Nov</span></span>
      </div>
      <Presence initials="JB" tone="mint" className="-top-4 -left-6" />
    </div>
  )
}

export function AskComposer({ className, text = "Ask anything…" }: { className?: string; text?: string }) {
  return (
    <div className={cn("relative flex flex-col justify-between rounded-card bg-window p-4 shadow-float", className)}>
      <p className="text-[11px] text-ink-3">{text}</p>
      <div className="mt-6 flex items-center justify-between">
        <span className="flex gap-2 text-ink-2"><AtSign className="size-3" /><Clock3 className="size-3" /></span>
        <span className="grid size-6 place-items-center rounded-full bg-ink text-ink-inverse"><ArrowUp className="size-3" /></span>
      </div>
      <Presence initials="AF" tone="sky" className="right-[38%] -bottom-5" />
    </div>
  )
}
