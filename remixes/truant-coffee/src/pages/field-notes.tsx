import { useEffect } from "react"

import { CtaBand } from "@/components/blocks/cta-band"
import { PageHero } from "@/components/blocks/page-hero"
import { StaggerIn, staggerItem } from "@/components/motion/stagger-in"
import { Reveal } from "@/components/motion/reveal"
import { scrollToY } from "@/components/motion/smooth-scroll"
import { Journeys } from "@/components/sections/journal/journeys"
import { PriceLedger } from "@/components/sections/journal/price-ledger"
import { PRODUCERS } from "@/content/origins"
import { photo } from "@/lib/photos"
import { motion } from "motion/react"

/** Field notes, as a story: where the coffee comes from, the trips, what we
 *  paid, and the people on both ends — then back to the shop. */
export function FieldNotesPage() {
  // A link to `/field-notes#producers` lands on the producers.
  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (!id) return
    const t = window.setTimeout(() => {
      const el = document.getElementById(id)
      if (el) scrollToY(el.getBoundingClientRect().top + window.scrollY - 40)
    }, 350)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <>
      <PageHero
        eyebrow="Field notes"
        title="Where it|comes from"
        intro="Every coffee we sell has a name on it that isn't ours. These are the farms, the trips, the prices and the people — the long way round, which is the only way we know."
        image="picker"
        alt="A harvester smiling as he picks ripe coffee cherries"
      />
      <Journeys />
      <PriceLedger />
      <section id="producers" className="bg-paper-2 px-[var(--spacing-gutter)] py-[var(--spacing-section)]">
        <Reveal>
          <p className="type-eyebrow text-ink-3">Producers and roasters</p>
          <h2 className="type-display mt-3 text-d4">Both ends of the bag</h2>
        </Reveal>
        <StaggerIn className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {PRODUCERS.map((p) => (
            <motion.figure key={p.name} variants={staggerItem} className="group flex flex-col overflow-hidden rounded-[var(--radius-card)] bg-raised shadow-card transition-shadow duration-300 hover:shadow-float">
              <div className="overflow-hidden">
                <img src={photo(p.photo, 700, 560)} alt={`${p.name}, ${p.place}`} loading="lazy" className="aspect-[5/4] w-full object-cover transition-transform duration-700 ease-[var(--ease-out-strong)] group-hover:scale-[1.04]" />
              </div>
              <blockquote className="type-display flex-1 p-5 text-d1 leading-[1.02]">“{p.quote}”</blockquote>
              <figcaption className="px-5 pb-5 text-caption text-ink-3">
                <span className="block text-[14px] text-ink">{p.name}</span>
                {p.place}
              </figcaption>
            </motion.figure>
          ))}
        </StaggerIn>
      </section>
      <CtaBand title="Taste the trip" body="Every farm on this page is on the shelf this week. Start with the one whose story you liked best." cta="Shop the coffees" href="/shop" image="lakeCanoe" alt="A lone canoe crossing a still mountain lake" />
    </>
  )
}
