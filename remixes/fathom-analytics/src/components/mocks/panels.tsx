import { ArrowUp, Check, Search } from "lucide-react"

import { AppWindow } from "@/components/mocks/app-window"
import { cn } from "@/lib/utils"

const SUGGEST = ["What drove the spike in signups last week?", "Compare revenue by region this quarter", "Which plans churn fastest?"]

/** Explore: the empty chat, waiting for a question. */
export function ExplorePanel() {
  return (
    <AppWindow active="Fathom AI">
      <div className="flex h-full flex-col items-center justify-center gap-5 px-6 pb-8">
        <p className="font-serif text-2xl tracking-tight">How can I help?</p>
        <div className="grid w-full max-w-md grid-cols-3 gap-2">
          {SUGGEST.map((s) => <p key={s} className="rounded-xl bg-surface p-2.5 text-[9px] leading-snug text-ink-2">{s}</p>)}
        </div>
        <div className="flex w-full max-w-md items-center justify-between rounded-xl bg-window p-3 text-[10px] text-ink-3 shadow-card">Ask anything…<span className="grid size-5 place-items-center rounded-full bg-ink text-ink-inverse"><ArrowUp className="size-3" /></span></div>
      </div>
    </AppWindow>
  )
}

const ROWS = [["Active users", "58.2k", "+4.1%"], ["Net revenue", "$1.84M", "+6.8%"], ["Churn", "2.3%", "−0.4%"], ["NPS", "47", "+3"]]

/** Reports: a finished, shareable write-up. */
export function ReportsPanel() {
  return (
    <AppWindow active="Reports">
      <div className="space-y-3 p-5 pt-9 text-[9px]">
        <p className="font-serif text-xl tracking-tight">January performance review</p>
        <p className="leading-snug text-ink-2">Revenue grew 6.8% on stronger enterprise renewals. Churn fell for the third straight month.</p>
        <div className="divide-y divide-line rounded-xl border border-line">
          {ROWS.map(([m, v, d]) => <p key={m} className="tnum grid grid-cols-[1fr_auto_3rem] gap-3 px-3 py-2"><span>{m}</span><span className="font-medium">{v}</span><span className="text-right text-emerald-700">{d}</span></p>)}
        </div>
        <div className="flex h-16 items-end gap-1.5 rounded-xl bg-chart-soft p-3">{[30, 44, 38, 56, 50, 70, 64, 82].map((h, i) => <span key={i} className="flex-1 rounded-[2px] bg-chart" style={{ height: `${h}%` }} />)}</div>
      </div>
    </AppWindow>
  )
}

const DRILL = [["Enterprise", 82], ["Mid-market", 61], ["Self-serve", 44], ["Partners", 23]] as const

/** Drill down: one number, broken apart. */
export function DrillPanel() {
  return (
    <AppWindow active="Metrics">
      <div className="space-y-4 p-5 pt-9 text-[9px]">
        <div><p className="text-ink-3">Net revenue by segment</p><p className="tnum text-2xl font-medium tracking-tight">$1.84M</p></div>
        {DRILL.map(([name, v]) => (
          <div key={name} className="space-y-1"><p className="flex justify-between"><span>{name}</span><span className="tnum text-ink-2">{v}%</span></p><span className="block h-2 rounded-full bg-surface-2"><span className="block h-full rounded-full bg-chart" style={{ width: `${v}%` }} /></span></div>
        ))}
        <p className="rounded-lg bg-ember-soft px-3 py-2 text-ember">Enterprise renewals explain 71% of the month's growth.</p>
      </div>
    </AppWindow>
  )
}

const TARGETS = [["Activation", 103, "bg-emerald-600"], ["Registrations", 75, "bg-ember"], ["Net revenue", 91, "bg-chart"], ["Support CSAT", 58, "bg-ink-3"]] as const

/** Targets: goals with progress. */
export function TargetsPanel() {
  return (
    <AppWindow active="Metrics">
      <div className="space-y-3 p-5 pt-9 text-[9px]">
        <p className="font-serif text-xl tracking-tight">Q4 targets</p>
        {TARGETS.map(([name, v, tone]) => (
          <div key={name} className="rounded-xl border border-line p-3"><p className="flex items-center justify-between"><span className="font-medium">{name}</span><span className="tnum flex items-center gap-1 text-ink-2">{v >= 100 && <Check className="size-3 text-emerald-700" />}{v}%</span></p><span className="mt-2 block h-1.5 rounded-full bg-surface-2"><span className={cn("block h-full rounded-full", tone)} style={{ width: `${Math.min(v, 100)}%` }} /></span></div>
        ))}
      </div>
    </AppWindow>
  )
}

/** Maps: a dotted territory map. */
export function MapsPanel() {
  const dots = Array.from({ length: 150 }, (_, i) => ({ x: (i % 15) * 6.6 + 4, y: Math.floor(i / 15) * 8 + 4, on: ((i * 7) % 11) < 6 && Math.abs((i % 15) - 7) + Math.abs(Math.floor(i / 15) - 4) < 9, hot: (i * 13) % 17 === 0 }))
  return (
    <AppWindow active="Maps">
      <div className="p-5 pt-9 text-[9px]">
        <div className="mb-3 flex items-center justify-between"><p className="font-serif text-xl tracking-tight">Signups by territory</p><Search className="size-3 text-ink-3" /></div>
        <svg viewBox="0 0 100 84" className="w-full" aria-hidden>
          {dots.filter((d) => d.on).map((d, i) => <circle key={i} cx={d.x} cy={d.y} r={d.hot ? 2.4 : 1.4} fill={d.hot ? "var(--color-ember)" : "var(--color-ink-3)"} fillOpacity={d.hot ? 0.9 : 0.5} />)}
        </svg>
      </div>
    </AppWindow>
  )
}

export const ENGAGE_PANELS = [ExplorePanel, ReportsPanel, DrillPanel, TargetsPanel, MapsPanel]
