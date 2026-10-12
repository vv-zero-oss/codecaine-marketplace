import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { RollingNumber } from "@/components/motion/rolling-number"
import { ButtonLink } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { SAVINGS } from "@/content/home-end"
import { cn } from "@/lib/utils"

type Inputs = { people: number; invoices: number; close: number }
const DEFAULTS: Inputs = { people: 120, invoices: 400, close: 60 }
const LARGE: Inputs = { people: 1500, invoices: 4000, close: 160 }

/** Median figures: what one card, one invoice and one close hour cost a team. */
function estimate({ people, invoices, close }: Inputs) {
  const hours = Math.round(people * 1.2 * 12 * 0.8 + invoices * 0.2 * 12 * 0.85 + close * 12 * 0.6)
  const time = hours * 48
  const cashback = Math.round(people * 900 * 12 * 0.015)
  const software = 3600 + people * 60
  return { hours, time, cashback, software, total: time + cashback + software }
}

const FIELDS: { key: keyof Inputs; label: string; min: number; max: number; step: number; unit: string }[] = [
  { key: "people", label: "People with a company card", min: 10, max: 2000, step: 10, unit: "people" },
  { key: "invoices", label: "Invoices a month", min: 10, max: 5000, step: 10, unit: "invoices" },
  { key: "close", label: "Hours your team spends on each close", min: 10, max: 200, step: 5, unit: "hours" },
]

/** One input: its label, the live value, and a slider with a 44px hit area. */
function SliderField({ label, value, min, max, step, unit, onChange }: { label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (v: number) => void }) {
  const id = label.toLowerCase().replace(/\W+/g, "-")
  return (
    <div className="flex flex-col">
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-[15px] text-ink-2">{label}</label>
        <span className="font-mono text-[15px] text-ink tabular-nums">{value.toLocaleString("en-US")}</span>
      </div>
      <Slider
        id={id}
        aria-label={label}
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        className="h-11 [&_[data-slot=slider-range]]:bg-ink [&_[data-slot=slider-thumb]]:size-5 [&_[data-slot=slider-thumb]]:border-ink [&_[data-slot=slider-thumb]]:shadow-(--shadow-card) [&_[data-slot=slider-thumb]]:transition-transform [&_[data-slot=slider-thumb]]:active:scale-110 [&_[data-slot=slider-track]]:bg-panel-deep"
      />
      <div className="-mt-2 flex justify-between font-mono text-[11px] text-ink-4">
        <span>{min.toLocaleString("en-US")}</span>
        <span>{max.toLocaleString("en-US")} {unit}</span>
      </div>
    </div>
  )
}

const SEGMENTS = [
  { key: "cashback", label: "Card cashback", swatch: "bg-lime" },
  { key: "software", label: "Tools you can cancel", swatch: "bg-ink" },
  { key: "time", label: "Hours given back", swatch: "bg-ink-4" },
] as const

/**
 * The savings estimate. Three sliders in, two loud numbers out, and a bar
 * that shows where the money comes from. Every number retargets as you drag.
 */
export function SavingsCalculator({ hourlyCost = 48 }: { hourlyCost?: number }) {
  const [inputs, setInputs] = useState<Inputs>(DEFAULTS)
  const large = inputs.people === LARGE.people && inputs.invoices === LARGE.invoices && inputs.close === LARGE.close
  useCanvasAction("Savings: large company", (next) => setInputs((next ?? !large) ? LARGE : DEFAULTS), { on: large, group: "Savings" })

  const base = estimate(inputs)
  const result = { ...base, time: base.hours * hourlyCost }
  const total = result.time + result.cashback + result.software
  let running = 0
  const layers = SEGMENTS.map((s) => {
    running += result[s.key]
    return { ...s, value: result[s.key], reach: running / total }
  })

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <div className="flex flex-col gap-7 rounded-(--radius-panel) bg-raised p-6 shadow-(--shadow-card) sm:p-8">
        {FIELDS.map((f) => (
          <SliderField key={f.key} label={f.label} min={f.min} max={f.max} step={f.step} unit={f.unit} value={inputs[f.key]} onChange={(v) => setInputs((s) => ({ ...s, [f.key]: v }))} />
        ))}
        <p className="mt-auto text-[13px] text-ink-3">{SAVINGS.note}</p>
      </div>

      <div className="flex flex-col rounded-(--radius-panel) bg-panel p-6 sm:p-8" aria-live="polite">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <div>
            <p className="type-eyebrow text-ink-3">Back to you, each year</p>
            <RollingNumber value={total} prefix="$" className="type-head mt-2 block text-mega text-ink" />
          </div>
          <div>
            <p className="type-eyebrow text-ink-3">Hours your team gets back</p>
            <RollingNumber value={result.hours} suffix=" h" className="type-head mt-2 block text-mega text-ink-soft" />
          </div>
        </div>

        <div className="mt-10">
          <div className="relative h-4 overflow-hidden rounded-full bg-panel-deep">
            {[...layers].reverse().map((l) => (
              <span
                key={l.key}
                className={cn("absolute inset-0 origin-left rounded-full transition-transform duration-500 ease-(--ease-out-strong)", l.swatch)}
                style={{ transform: `scaleX(${l.reach})` }}
              />
            ))}
          </div>
          <ul className="mt-5 grid gap-3 sm:grid-cols-3">
            {layers.map((l) => (
              <li key={l.key} className="flex items-start gap-2">
                <span className={cn("mt-1.5 size-2.5 shrink-0 rounded-full", l.swatch)} />
                <span className="flex flex-col">
                  <span className="text-[14px] text-ink-2">{l.label}</span>
                  <RollingNumber value={l.value} prefix="$" className="font-mono text-[15px] text-ink" />
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4 lg:mt-auto lg:pt-10">
          <ButtonLink href="/pricing" size="lg">
            {SAVINGS.cta}
            <ArrowRight />
          </ButtonLink>
          <span className="text-[13px] text-ink-3">At ${hourlyCost}/hour, fully loaded.</span>
        </div>
      </div>
    </div>
  )
}
