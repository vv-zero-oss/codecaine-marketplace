import { useState } from "react"
import { motion, useReducedMotion } from "motion/react"

import { Reveal } from "@/components/motion/reveal"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { C_MARKET, ORIGINS } from "@/content/origins"
import { money } from "@/lib/photos"

/**
 * What we paid, in the open: a bar for each origin's price per pound (or
 * kilo) against the commodity reference, drawn from zero as it scrolls in.
 * Sort it by price or by how long we've bought there.
 */
export function PriceLedger({ title = "What we paid" }: { title?: string }) {
  const reduced = useReducedMotion()
  const [per, setPer] = useState<"lb" | "kg">("lb")
  const [sort, setSort] = useState<"paid" | "since">("paid")
  const k = per === "kg" ? 2.2046 : 1
  const rows = [...ORIGINS].sort((a, b) => (sort === "paid" ? b.paid - a.paid : a.since - b.since))
  const max = Math.max(...ORIGINS.map((o) => o.paid)) * k

  return (
    <section id="ledger" className="px-[var(--spacing-gutter)] py-[var(--spacing-section)]">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.618fr]">
        <Reveal>
          <p className="type-eyebrow text-ink-3">Transparency</p>
          <h2 className="type-display mt-3 text-d4">{title}</h2>
          <p className="mt-4 max-w-[40ch] text-ink-2">
            Green coffee, per {per === "kg" ? "kilo" : "pound"}, free on board — against the commodity reference the same week ({money(C_MARKET * k)}). We publish it because a price nobody can see is a price nobody has to defend.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ToggleGroup type="single" value={per} onValueChange={(v) => v && setPer(v as "lb" | "kg")} variant="outline" aria-label="Unit">
              <ToggleGroupItem value="lb" className="h-9 px-3 text-[13px] data-[state=on]:bg-ink data-[state=on]:text-paper">Per lb</ToggleGroupItem>
              <ToggleGroupItem value="kg" className="h-9 px-3 text-[13px] data-[state=on]:bg-ink data-[state=on]:text-paper">Per kg</ToggleGroupItem>
            </ToggleGroup>
            <ToggleGroup type="single" value={sort} onValueChange={(v) => v && setSort(v as "paid" | "since")} variant="outline" aria-label="Sort">
              <ToggleGroupItem value="paid" className="h-9 px-3 text-[13px] data-[state=on]:bg-ink data-[state=on]:text-paper">By price</ToggleGroupItem>
              <ToggleGroupItem value="since" className="h-9 px-3 text-[13px] data-[state=on]:bg-ink data-[state=on]:text-paper">By years</ToggleGroupItem>
            </ToggleGroup>
          </div>
        </Reveal>
        <div className="rounded-[var(--radius-panel)] bg-raised p-5 pt-9 shadow-card sm:p-7 sm:pt-10">
          <div className="relative">
            {/* The market line */}
            <div className="pointer-events-none absolute inset-y-0 border-l border-dashed border-tomato" style={{ left: `calc(7.5rem + (100% - 7.5rem - 4.5rem) * ${(C_MARKET * k) / max})` }}>
              <span className="type-eyebrow absolute -top-5 -translate-x-1/2 whitespace-nowrap text-tomato">Market</span>
            </div>
            <ul className="space-y-4">
            {rows.map((o, i) => (
              <motion.li key={o.id} layout transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }} className="grid grid-cols-[7.5rem_1fr_4.5rem] items-center gap-0">
                <span className="text-[13px]">
                  {o.country}
                  <span className="block text-[11px] text-ink-3">since {o.since}</span>
                </span>
                <div className="h-7 overflow-hidden rounded-r-[var(--radius-tag)] bg-paper">
                  <motion.div
                    className="h-full rounded-r-[var(--radius-tag)] bg-ink"
                    initial={reduced ? false : { width: 0 }}
                    whileInView={{ width: `${((o.paid * k) / max) * 100}%` }}
                    animate={{ width: `${((o.paid * k) / max) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: i * 0.06, ease: [0.23, 1, 0.32, 1] }}
                  />
                </div>
                <span className="text-right text-[13px] tabular-nums">{money(o.paid * k)}</span>
              </motion.li>
            ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
