import { ArrowUpRight } from "lucide-react"

import { SectionHeading } from "@/components/blocks/section-label"
import { Reveal } from "@/components/motion/reveal"
import { AWARDS, STUDIOS } from "@/data/studio"
import { useClock } from "@/lib/clock"
import { pexels } from "@/lib/photos"
import { play } from "@/lib/sound"

/** One studio: its room, its address, what time it is there now. */
export function StudioPlace({ city, country, address, timeZone, photo }: { city: string; country: string; address: string; timeZone: string; photo: number }) {
  const { time, offset } = useClock(timeZone)
  const hour = Number(time.slice(0, 2))
  const open = hour >= 9 && hour < 19
  return (
    <article>
      <div className="relative aspect-[4/3] overflow-hidden rounded-(--radius-cell) bg-panel shadow-(--shadow-card)">
        <img src={pexels(photo, 1200, 900)} alt={`The ${city} studio`} loading="lazy" className="absolute inset-0 size-full object-cover" />
      </div>
      <div className="mt-6 flex items-start justify-between gap-6">
        <div>
          <h3 className="type-head text-h3 text-ink">
            {city}, {country}
          </h3>
          <p className="mt-2 text-[16px] text-ink-3">{address}</p>
        </div>
        <div className="text-right">
          <p className="type-head text-h3 text-ink tabular-nums">{time}</p>
          <p className="type-label mt-2 flex items-center justify-end gap-2 text-ink-3">
            <span className={open ? "size-[6px] animate-pulse-dot rounded-full bg-ember" : "size-[6px] rounded-full bg-ink-5"} />
            {open ? "In the studio" : "Closed till nine"} · {offset}
          </p>
        </div>
      </div>
      <a
        href={`https://www.openstreetmap.org/search?query=${encodeURIComponent(`${address}, ${city}`)}`}
        target="_blank"
        rel="noreferrer"
        className="group/map mt-5 inline-flex items-center gap-1 text-[15px] text-ink-2 transition-colors duration-(--duration-hover) hover:text-ink"
      >
        Find us <ArrowUpRight className="size-4 transition-transform duration-(--duration-hover) ease-(--ease-out-strong) group-hover/map:translate-x-0.5 group-hover/map:-translate-y-0.5" />
      </a>
    </article>
  )
}

export function Places() {
  return (
    <section aria-label="Studios" className="px-(--spacing-gutter) py-(--spacing-section)">
      <SectionHeading index="05" label="Studios" title="Lisbon and Montréal." continuation="Five hours apart, so the kiln never cools." />
      <div className="mt-14 grid gap-14 md:grid-cols-2 md:gap-8">
        {STUDIOS.map((s, i) => (
          <Reveal key={s.city} delay={i * 0.08}>
            <StudioPlace {...s} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/** Recognition, kept as a plain ledger. */
export function Awards() {
  return (
    <section aria-label="Recognition" className="px-(--spacing-gutter) pb-(--spacing-section)">
      <SectionHeading index="06" label="Recognition" title="Some nice things people said." continuation="Mostly about the work." />
      <ul className="mt-14 border-t border-line-2">
        {AWARDS.map((a) => (
          <li
            key={`${a.year}-${a.award}`}
            onPointerEnter={() => play("tick")}
            className="grid grid-cols-[4rem_1fr] gap-x-4 gap-y-1 border-b border-line py-4 transition-colors duration-(--duration-hover) hover:bg-panel md:grid-cols-[6rem_1.3fr_1fr_1fr] md:px-2"
          >
            <span className="type-label pt-1 text-ink-4 tabular-nums">{a.year}</span>
            <span className="text-[17px] font-medium tracking-[-0.02em] text-ink">{a.award}</span>
            <span className="col-start-2 text-[15px] text-ink-3 md:col-start-auto">{a.body}</span>
            <span className="col-start-2 text-[15px] text-ink-2 md:col-start-auto md:text-right">{a.project}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
