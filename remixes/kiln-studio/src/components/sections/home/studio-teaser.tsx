import { useRef } from "react"
import { ArrowRight } from "lucide-react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"

import { SectionLabel } from "@/components/blocks/section-label"
import { ButtonLink } from "@/components/ui/button"
import { STUDIOS } from "@/data/studio"
import { pexels } from "@/lib/photos"

/**
 * The room the work comes out of: a wide photograph that settles from a
 * slight zoom as it scrolls into place, two cities beside it, and the way
 * in to the studio page and the jobs.
 */
export function StudioTeaser() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const scale = useTransform(scrollYProgress, [0, 0.6], [1.14, 1])
  const y = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"])

  return (
    <section aria-label="Inside the studio" className="px-(--spacing-gutter) py-(--spacing-section)">
      <SectionLabel index="06">Inside</SectionLabel>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
        <div ref={ref} className="relative aspect-[4/3] overflow-hidden rounded-(--radius-cell) bg-panel shadow-(--shadow-card) lg:aspect-[16/11]">
          <motion.img
            src={pexels(STUDIOS[0].photo, 1600, 1100)}
            alt="Makers bent over long tables in the Lisbon workshop"
            loading="lazy"
            className="absolute inset-0 size-full object-cover"
            style={reduced ? undefined : { scale, y }}
          />
          <span className="type-label absolute bottom-4 left-4 rounded-full bg-page/70 px-3 py-1.5 text-ink backdrop-blur-md">Lisbon, Rua da Cerâmica</span>
        </div>
        <div className="flex flex-col justify-between gap-10">
          <h2 className="type-head text-h2 text-ink">
            Two rooms, one workshop. <span className="text-ink-4">Nobody hands anything over the wall.</span>
          </h2>
          <div className="flex flex-col gap-6">
            <p className="max-w-[40ch] text-[17px] text-ink-3">
              The people who sketch it on Monday are the people who solder it on Thursday. That's the whole method — and why we keep the studio small enough to fit round two tables.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/studio" size="lg">
                Meet the studio <ArrowRight />
              </ButtonLink>
              <ButtonLink href="/careers" variant="outline" size="lg">
                We're hiring
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
