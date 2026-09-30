import { useState } from "react"
import { Check } from "lucide-react"

import { SectionHeading } from "@/components/blocks/section-heading"
import { Reveal } from "@/components/motion/reveal"
import { YieldChart } from "@/components/motion/yield-chart"
import { Container } from "@/components/ui/container"
import { Slider } from "@/components/ui/slider"
import { TREASURY } from "@/content"
import { money } from "@/lib/photos"

const yearly = (amount: number, rate: number) => amount * (Math.pow(1 + rate / 12, 12) - 1)

/**
 * The treasury calculator: pick how much you keep, read what a year earns
 * here against a typical checking account, and see the year as a line.
 */
export function YieldCalculator({ start = TREASURY.calculator.start }: { start?: number }) {
  const c = TREASURY.calculator
  const [amount, setAmount] = useState(start)
  const earned = yearly(amount, c.rate)
  const checking = yearly(amount, c.checkingRate)

  return (
    <div className="rounded-[var(--radius-panel)] bg-forest-card p-5 shadow-(--shadow-night) sm:p-7">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="type-eyebrow text-forest-muted">{c.label}</p>
          <p className="mt-2 font-mono text-[clamp(30px,3.4vw,44px)] leading-none tracking-[-0.04em] text-forest-fg tabular-nums">{money(amount, false)}</p>
        </div>
        <div className="text-right">
          <p className="type-eyebrow text-forest-muted">{c.earnLabel}</p>
          <p className="mt-2 font-mono text-[clamp(24px,2.6vw,32px)] leading-none tracking-[-0.03em] text-lime tabular-nums">+ {money(earned, false)}</p>
          <p className="mt-1.5 text-[12.5px] text-forest-muted">a year · vs {money(checking, false)} at {c.compareLabel.toLowerCase()}</p>
        </div>
      </div>
      <Slider
        aria-label="Balance kept in treasury"
        min={c.min}
        max={c.max}
        step={c.step}
        value={[amount]}
        onValueChange={([v]) => setAmount(v)}
        className="mt-7 py-3 [&_[data-slot=slider-range]]:bg-lime [&_[data-slot=slider-thumb]]:size-6 [&_[data-slot=slider-thumb]]:border-2 [&_[data-slot=slider-thumb]]:border-lime [&_[data-slot=slider-thumb]]:bg-forest-deep [&_[data-slot=slider-track]]:bg-forest-line"
      />
      <div className="mt-1 flex justify-between font-mono text-[11px] text-forest-muted">
        <span>{money(c.min, false)}</span>
        <span>{money(c.max, false)}</span>
      </div>
      <YieldChart amount={amount} rate={c.rate} className="mt-8" />
      <p className="mt-4 text-[12px] leading-snug text-forest-muted">{c.footnote}</p>
    </div>
  )
}

/** Treasury, on the forest ground: why idle cash should earn, and the calculator that shows how much. */
export function Treasury() {
  return (
    <section id="treasury" className="bg-forest py-section text-forest-fg">
      <Container className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal className="flex flex-col gap-8 lg:sticky lg:top-28">
          <SectionHeading tone="forest" eyebrow={TREASURY.eyebrow} title={TREASURY.title} accent={TREASURY.titleAccent} body={TREASURY.body} />
          <ul className="flex flex-col gap-3 border-t border-forest-line pt-6">
            {TREASURY.points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-[15.5px] text-forest-fg">
                <span className="grid size-6 place-items-center rounded-full bg-lime text-forest-deep">
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal y={32} delay={0.08}>
          <YieldCalculator />
        </Reveal>
      </Container>
    </section>
  )
}
