import { Check, Clock, CreditCard, FileText, Lock, Plus, ShieldAlert } from "lucide-react"

import { Sparkline } from "@/components/motion/sparkline"
import { cn } from "@/lib/utils"

/** Balances in several currencies, each with its flag-coloured code. */
export function CurrenciesArt() {
  const rows = [
    ["USD", "US dollar", "$612,340.22", "bg-night"],
    ["EUR", "Euro", "€184,009.50", "bg-coral"],
    ["GBP", "Pound sterling", "£92,418.10", "bg-ink-soft"],
    ["SGD", "Singapore dollar", "S$40,200.00", "bg-gain"],
  ]
  return (
    <ul className="flex flex-col divide-y divide-line rounded-[var(--radius-card)] bg-card px-4 shadow-(--shadow-hairline)">
      {rows.map(([code, name, amount, tone]) => (
        <li key={code} className="flex items-center gap-3 py-3 text-[13.5px]">
          <span className={cn("grid size-8 place-items-center rounded-none font-mono text-[10px] text-white", tone)}>{code}</span>
          <span className="flex-1 text-ink">{name}</span>
          <span className="font-mono tabular-nums text-ink">{amount}</span>
        </li>
      ))}
    </ul>
  )
}

/** Cards handed out, each with its own limit and how much of it is used. */
export function CardsArt() {
  const rows = [
    ["Amara Lewis", "Marketing", 62, "$3,100 / $5,000"],
    ["Jonas Weber", "Engineering", 28, "$840 / $3,000"],
    ["Travel pool", "Virtual", 81, "$8,100 / $10,000"],
  ]
  return (
    <div className="flex flex-col gap-2.5">
      {rows.map(([name, team, pct, label]) => (
        <div key={name as string} className="flex items-center gap-3 rounded-[var(--radius-field)] bg-card p-3 shadow-(--shadow-hairline)">
          <span className="grid h-7 w-10 place-items-center rounded-[5px] bg-night text-pink">
            <CreditCard className="size-3.5" />
          </span>
          <span className="flex min-w-0 flex-1 flex-col gap-1.5">
            <span className="flex flex-wrap justify-between gap-x-2 text-[12.5px]">
              <span className="text-ink">{name} <span className="text-ink-subtle">· {team}</span></span>
              <span className="font-mono text-[11.5px] text-ink-muted">{label}</span>
            </span>
            <span className="h-1.5 overflow-hidden rounded-full bg-paper-deep">
              <span className="block h-full rounded-full bg-night" style={{ width: `${pct}%` }} />
            </span>
          </span>
        </div>
      ))}
      <span className="flex items-center gap-1.5 self-start rounded-none border border-dashed border-line-strong px-3 py-1.5 text-[12.5px] text-ink-muted">
        <Plus className="size-3.5" /> Issue a card
      </span>
    </div>
  )
}

/** Treasury, on oxblood: the yield and the line it has drawn this year. */
export function TreasuryArt() {
  return (
    <div className="bg-night-card p-5 text-night-fg shadow-(--shadow-night)">
      <p className="type-eyebrow text-night-muted">Treasury yield</p>
      <p className="mt-2 font-mono text-[40px] leading-none tracking-[-0.04em]">4.10%</p>
      <p className="mt-1 text-[13px] text-pink">+ $69,970 earned this year</p>
      <Sparkline tone="night" className="mt-4" points="10,12,13,15,16,18,21,23,24,27,29,31,34" />
    </div>
  )
}

/** A bill moving through approval: read, approved, scheduled. */
export function BillsArt() {
  const steps = [
    ["Invoice read", "Acme Cloud · $12,400", true],
    ["Approved", "by Lena, CFO", true],
    ["Scheduled", "Pays Oct 14 · on due date", false],
  ] as const
  return (
    <div className="rounded-[var(--radius-card)] bg-card p-4 shadow-(--shadow-hairline)">
      <div className="flex items-center gap-3 border-b border-line pb-3">
        <span className="grid size-9 place-items-center rounded-[8px] bg-paper-deep text-ink"><FileText className="size-4" /></span>
        <span className="flex-1 text-[13.5px]"><span className="block text-ink">INV-2211.pdf</span><span className="text-ink-subtle">from billing@acmecloud.com</span></span>
      </div>
      <ol className="mt-3 flex flex-col gap-2.5">
        {steps.map(([title, body, done]) => (
          <li key={title} className="flex items-center gap-2.5 text-[13px]">
            <span className={cn("grid size-5 place-items-center rounded-none", done ? "bg-night text-pink" : "border border-line-strong text-ink-subtle")}>
              {done ? <Check className="size-3" strokeWidth={3} /> : <Clock className="size-3" />}
            </span>
            <span className="text-ink">{title}</span>
            <span className="text-ink-subtle">{body}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

/** A rule catching a charge before it lands. */
export function ControlsArt() {
  return (
    <div className="flex flex-col gap-2.5">
      {[
        ["Block gambling and cash advances", true],
        ["Receipts required over $75", true],
        ["Weekend spend needs approval", false],
      ].map(([rule, on]) => (
        <div key={rule as string} className="flex items-center justify-between gap-3 rounded-[var(--radius-field)] bg-card px-3 py-2.5 text-[13px] shadow-(--shadow-hairline)">
          <span className="flex items-center gap-2 text-ink"><Lock className="size-3.5 text-ink-subtle" /> {rule}</span>
          <span className={cn("relative h-4 w-7 shrink-0 rounded-full", on ? "bg-night" : "bg-line-strong")}>
            <span className={cn("absolute top-0.5 size-3 rounded-full bg-white", on ? "left-3.5" : "left-0.5")} />
          </span>
        </div>
      ))}
      <div className="flex items-center gap-2 rounded-[var(--radius-field)] border border-loss/30 bg-loss/5 px-3 py-2.5 text-[13px] text-loss">
        <ShieldAlert className="size-4" /> Declined: LuckyBet Online · $400.00
      </div>
    </div>
  )
}
