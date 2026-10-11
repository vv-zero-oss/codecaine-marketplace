import { CountUp } from "@/components/motion/count-up"
import { Reveal } from "@/components/motion/reveal"
import { SectionLabel } from "@/components/blocks/section-label"

const STATS = [
  { value: 12, label: "years at the kiln", note: "Founded in Lisbon, 2014." },
  { value: 186, label: "projects shipped", note: "From a neon wall to a bank." },
  { value: 38, label: "awards", note: "We'd rather show you the work." },
  { value: 46, label: "people, two cities", note: "Lisbon and Montréal." },
]

/** The studio in four numbers, each counting up once as it arrives. */
export function Numbers() {
  return (
    <section aria-label="In numbers" className="px-(--spacing-gutter) pb-(--spacing-section)">
      <SectionLabel index="04">In numbers</SectionLabel>
      <dl className="mt-10 grid grid-cols-2 border-t border-line-2 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06} className="border-b border-line-2 py-8 pr-6 odd:border-r lg:border-r lg:last:border-r-0 lg:[&:not(:first-child)]:pl-6 max-lg:even:pl-6">
            <dt className="sr-only">{s.label}</dt>
            <dd>
              <CountUp value={s.value} className="type-head block text-mega text-ink tabular-nums" />
              <span className="mt-4 block text-[17px] font-medium tracking-[-0.02em] text-ink">{s.label}</span>
              <span className="mt-1 block text-[15px] text-ink-3">{s.note}</span>
            </dd>
          </Reveal>
        ))}
      </dl>
    </section>
  )
}
