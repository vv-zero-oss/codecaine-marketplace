import type * as React from "react"
import { useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react"
import { BedDouble, Check, CircleAlert, FileText, Plane, UtensilsCrossed, Wine } from "lucide-react"
import { Switch } from "radix-ui"
import { useCanvasAction } from "@canvas/react"

import { KestrelMark } from "@/components/site/logo"
import { POLICY_TXNS, type Txn } from "@/content/home-story"
import { money } from "@/lib/photos"
import { cn } from "@/lib/utils"

export type Rules = {
  meals: { on: boolean; over: number }
  flights: { on: boolean; hours: number }
  hotels: { on: boolean; cap: number }
  alcohol: { on: boolean }
}

export const DEFAULT_RULES: Rules = {
  meals: { on: true, over: 75 },
  flights: { on: true, hours: 6 },
  hotels: { on: true, cap: 320 },
  alcohol: { on: true },
}

type Verdict = { ok: boolean; reason: string }

/** What the agent says about one transaction under the current rules. */
export function judge(txn: Txn, rules: Rules): Verdict {
  switch (txn.category) {
    case "meal":
      if (rules.meals.on && txn.amount > rules.meals.over && !txn.receipt) return { ok: false, reason: `Over $${rules.meals.over} with no receipt — asked ${txn.who} for one` }
      return { ok: true, reason: txn.amount > rules.meals.over ? "Receipt rule is off" : `Under $${rules.meals.over}, no receipt needed` }
    case "flight":
      if (rules.flights.on && txn.cabin === "Business" && (txn.hours ?? 0) < rules.flights.hours)
        return { ok: false, reason: `Business on a ${txn.hours}h flight — economy under ${rules.flights.hours}h` }
      return { ok: true, reason: txn.cabin === "Business" ? `${txn.hours}h — long enough for business` : `Economy, ${txn.hours}h` }
    case "hotel":
      if (rules.hotels.on && (txn.nightly ?? 0) > rules.hotels.cap) return { ok: false, reason: `$${txn.nightly}/night — over the $${rules.hotels.cap} cap` }
      return { ok: true, reason: `$${txn.nightly}/night, within the cap` }
    case "bar":
      if (rules.alcohol.on) return { ok: false, reason: "Alcohol isn’t reimbursable — moved to personal" }
      return { ok: true, reason: "Alcohol rule is off" }
  }
}

const ICONS = { meal: UtensilsCrossed, flight: Plane, hotel: BedDouble, bar: Wine } as const

/** A row of small choices — the rule's number. */
function Segmented<T extends number>({ value, options, format, onChange, disabled, label }: { value: T; options: T[]; format: (v: T) => string; onChange: (v: T) => void; disabled?: boolean; label: string }) {
  return (
    <div role="radiogroup" aria-label={label} className={cn("inline-flex rounded-(--radius-field) bg-panel p-0.5 transition-opacity duration-(--duration-hover)", disabled && "pointer-events-none opacity-40")}>
      {options.map((option) => {
        const on = option === value
        return (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(option)}
            className={cn(
              "h-9 min-w-12 rounded-[5px] px-2.5 font-mono text-[13px] transition-[background-color,color,box-shadow,transform] duration-(--duration-hover) active:scale-[0.96]",
              on ? "bg-raised text-ink shadow-(--shadow-field)" : "text-ink-3 hover:text-ink",
            )}
          >
            {format(option)}
          </button>
        )
      })}
    </div>
  )
}

function RuleSwitch({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <Switch.Root
      checked={checked}
      onCheckedChange={onChange}
      aria-label={label}
      className="relative inline-flex h-6 w-10 shrink-0 items-center rounded-full bg-line-strong p-0.5 transition-colors duration-(--duration-hover) data-[state=checked]:bg-ink before:absolute before:-inset-2.5 before:content-['']"
    >
      <Switch.Thumb className="block size-5 rounded-full bg-raised shadow-(--shadow-xs) transition-transform duration-(--duration-hover) ease-(--ease-out-strong) data-[state=checked]:translate-x-4" />
    </Switch.Root>
  )
}

function RuleRow({ title, on, onToggle, children }: { title: string; on: boolean; onToggle: (v: boolean) => void; children?: React.ReactNode }) {
  return (
    <li className="flex flex-col gap-3 border-t border-line py-4 sm:flex-row sm:items-center">
      <div className="flex flex-1 items-center gap-3">
        <RuleSwitch checked={on} onChange={onToggle} label={title} />
        <span className={cn("text-[15px] transition-colors duration-(--duration-hover)", on ? "text-ink" : "text-ink-3 line-through decoration-ink-4")}>{title}</span>
      </div>
      {children && <div className="pl-[52px] sm:pl-0">{children}</div>}
    </li>
  )
}

/** The handbook, as rules you can edit: switches and their numbers. */
export function PolicyDocument({ rules, onChange }: { rules: Rules; onChange: (next: Rules) => void }) {
  const set = <K extends keyof Rules>(key: K, patch: Partial<Rules[K]>) => onChange({ ...rules, [key]: { ...rules[key], ...patch } })
  return (
    <div className="rounded-(--radius-panel) bg-raised p-5 shadow-(--shadow-float) ring-1 ring-line sm:p-7">
      <div className="flex items-start gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-(--radius-card) bg-panel text-ink-2"><FileText className="size-5" strokeWidth={1.6} /></span>
        <div>
          <h3 className="type-head text-h4 text-ink">Travel & Expense Policy</h3>
          <p className="text-[14px] text-ink-3">Updated November 2026 · v8</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {["All employees", "US & Canada", "Effective now"].map((chip) => (
          <span key={chip} className="rounded-full bg-panel px-2.5 py-1 text-[12.5px] text-ink-2">{chip}</span>
        ))}
        <span className="inline-flex items-center gap-1 rounded-full bg-lime-soft px-2.5 py-1 text-[12.5px] text-ink"><KestrelMark className="size-3" /> Agent enforcing</span>
      </div>
      <ul className="mt-5">
        <RuleRow title="Meals need a receipt over" on={rules.meals.on} onToggle={(on) => set("meals", { on })}>
          <Segmented label="Receipt threshold" value={rules.meals.over} options={[50, 75, 150]} format={(v) => `$${v}`} onChange={(over) => set("meals", { over })} disabled={!rules.meals.on} />
        </RuleRow>
        <RuleRow title="Economy for flights under" on={rules.flights.on} onToggle={(on) => set("flights", { on })}>
          <Segmented label="Flight length" value={rules.flights.hours} options={[4, 6, 8]} format={(v) => `${v}h`} onChange={(hours) => set("flights", { hours })} disabled={!rules.flights.on} />
        </RuleRow>
        <RuleRow title="Hotels capped per night at" on={rules.hotels.on} onToggle={(on) => set("hotels", { on })}>
          <Segmented label="Hotel cap" value={rules.hotels.cap} options={[250, 320, 400]} format={(v) => `$${v}`} onChange={(cap) => set("hotels", { cap })} disabled={!rules.hotels.on} />
        </RuleRow>
        <RuleRow title="Alcohol is not reimbursable" on={rules.alcohol.on} onToggle={(on) => set("alcohol", { on })} />
      </ul>
    </div>
  )
}

/**
 * Six of this week's transactions, judged live against the rules. A change
 * of rule shows "Checking spend…" for a beat, then the rows re-sort —
 * flagged first — with a layout animation.
 */
export function SpendFeed({ rules, checkMs = 320 }: { rules: Rules; checkMs?: number }) {
  const [shown, setShown] = useState(rules)
  const [checking, setChecking] = useState(false)
  const [held, setHeld] = useState(false)
  const first = useRef(true)
  const reduced = useReducedMotion()

  useCanvasAction("Policy: checking spend", (next) => setHeld(next ?? !held), { on: held, group: "Policy" })

  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    setChecking(true)
    const timer = window.setTimeout(() => {
      setShown(rules)
      setChecking(false)
    }, checkMs)
    return () => window.clearTimeout(timer)
  }, [rules, checkMs])

  const rows = useMemo(
    () =>
      POLICY_TXNS.map((txn) => ({ txn, verdict: judge(txn, shown) })).sort((a, b) => Number(a.verdict.ok) - Number(b.verdict.ok)),
    [shown],
  )
  const flagged = rows.filter((row) => !row.verdict.ok).length
  const busy = checking || held

  return (
    <div className="flex flex-col overflow-hidden rounded-(--radius-panel) bg-panel ring-1 ring-line">
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
        <p className="text-[14px] text-ink">This week’s spend</p>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.p
            key={busy ? "busy" : `n${flagged}`}
            initial={{ opacity: 0, filter: "blur(3px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(3px)" }}
            transition={{ duration: 0.2 }}
            className={cn("rounded-full px-2.5 py-0.5 text-[12.5px]", busy ? "bg-raised text-ink-3" : flagged ? "bg-signal-red-soft text-signal-red" : "bg-signal-green-soft text-signal-green")}
          >
            {busy ? "Checking spend…" : flagged ? `${flagged} of ${rows.length} need a look` : "All in policy"}
          </motion.p>
        </AnimatePresence>
      </div>
      <LayoutGroup>
        <ul className="relative flex flex-col gap-1.5 p-2">
          {rows.map(({ txn, verdict }) => {
            const Icon = ICONS[txn.category]
            return (
              <motion.li
                key={txn.id}
                layout={reduced ? false : "position"}
                transition={{ type: "spring", duration: 0.5, bounce: 0.12 }}
                className="flex items-start gap-3 rounded-(--radius-card) bg-raised p-3 shadow-(--shadow-xs)"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-(--radius-field) bg-panel text-ink-2"><Icon className="size-4" strokeWidth={1.7} /></span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="truncate text-[14.5px] text-ink">{txn.merchant}</span>
                    <span className="shrink-0 font-mono text-[13.5px] text-ink tabular-nums">{money(txn.amount)}</span>
                  </span>
                  <span className={cn("mt-0.5 flex items-start gap-1.5 text-[13px] transition-colors duration-(--duration-hover)", verdict.ok ? "text-ink-3" : "text-signal-red")}>
                    {verdict.ok ? <Check className="mt-0.5 size-3.5 shrink-0 text-signal-green" strokeWidth={2.5} /> : <CircleAlert className="mt-0.5 size-3.5 shrink-0" />}
                    <span>{txn.who} · {verdict.reason}</span>
                  </span>
                </span>
              </motion.li>
            )
          })}
          <AnimatePresence>
            {busy && (
              <motion.span
                aria-hidden
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="pointer-events-none absolute inset-0 overflow-hidden rounded-(--radius-panel)"
              >
                <span className="absolute inset-0 bg-panel/40" />
                {!reduced && (
                  <motion.span
                    initial={{ transform: "translateY(-100%)" }}
                    animate={{ transform: "translateY(400%)" }}
                    transition={{ duration: 0.9, ease: "linear", repeat: Infinity }}
                    className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-transparent via-lime/25 to-transparent"
                  />
                )}
              </motion.span>
            )}
          </AnimatePresence>
        </ul>
      </LayoutGroup>
    </div>
  )
}
