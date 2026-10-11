import { motion } from "motion/react"

import { CountUp } from "@/components/motion/count-up"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { PASSPORT, type PassportYear } from "@/lib/flights"
import { cn } from "@/lib/utils"

/** The year switch every section on the page follows. */
export function YearSwitch({ year, onChange, tone = "night" }: { year: number; onChange: (y: number) => void; tone?: "night" | "day" }) {
  return (
    <div role="tablist" aria-label="Year" className={cn("inline-flex gap-1 rounded-full p-1", tone === "night" ? "bg-night-2 shadow-[0_0_0_1px_var(--color-night-line)]" : "bg-panel")}>
      {PASSPORT.map((p) => (
        <button
          key={p.year}
          role="tab"
          aria-selected={year === p.year}
          onClick={() => onChange(p.year)}
          className={cn(
            "relative h-10 rounded-full px-5 text-[15px] font-medium tabular-nums transition-colors duration-(--duration-hover)",
            year === p.year ? (tone === "night" ? "text-ink" : "text-white") : tone === "night" ? "text-night-2fg hover:text-white" : "text-ink-2 hover:text-ink",
          )}
        >
          {year === p.year ? <motion.span layoutId={`year-${tone}`} className={cn("absolute inset-0 rounded-full", tone === "night" ? "bg-white" : "bg-ink")} transition={{ type: "spring", duration: 0.4, bounce: 0.15 }} /> : null}
          <span className="relative">{p.year}</span>
        </button>
      ))}
    </div>
  )
}

/**
 * The passport's cover: the year's distance set enormous, the rest of the
 * year in a row underneath, and the switch that changes all of it.
 */
export function YearHero({ data, onYear }: { data: PassportYear; onYear: (y: number) => void }) {
  const stats = [
    { label: "Flights", value: data.flights },
    { label: "Hours in the air", value: data.hours },
    { label: "Airports", value: data.airports },
    { label: "Countries", value: data.countries },
  ]
  return (
    <section data-theme="night" className="relative overflow-hidden bg-night pt-36 pb-20 sm:pt-44 md:pb-28">
      <div aria-hidden className="night-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_20%,black,transparent)]" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-[80%] bg-[radial-gradient(ellipse_55%_60%_at_50%_0%,rgb(91_43_217/0.45),transparent)]" />
      <Container className="relative">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="type-eyebrow text-violet-glow">Contrail Passport</p>
            <YearSwitch year={data.year} onChange={onYear} />
          </div>
          <h1 className="type-display mt-10 text-mega text-night-fg">
            <CountUp key={data.year} value={data.km} prefix="" decimals={0} duration={1.4} />
            <span className="text-night-dim"> km</span>
          </h1>
          <p className="mt-6 max-w-[48ch] text-lead text-night-2fg">
            That's {(data.km / 40075).toFixed(1)} times round the Earth in {data.year}. Your worst day was {data.worstDelay.flight}, {data.worstDelay.route}: {data.worstDelay.hours} hours late. Everything else is below.
          </p>
        </Reveal>
        <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-(--radius-card) bg-night-line md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.05} className="bg-night-2 p-6">
              <dt className="text-[14px] text-night-muted">{s.label}</dt>
              <dd className="mt-2 font-data text-h2 leading-none font-medium text-night-fg">
                <CountUp key={`${data.year}-${s.label}`} value={s.value} prefix="" decimals={0} />
              </dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  )
}
