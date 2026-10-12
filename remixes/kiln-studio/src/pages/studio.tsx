import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"

import { ClosingCta } from "@/components/blocks/closing-cta"
import { PageHero } from "@/components/blocks/page-hero"
import { ScrollWords } from "@/components/motion/scroll-words"
import { SectionLabel } from "@/components/blocks/section-label"
import { Process } from "@/components/sections/studio/process"
import { Awards, Places } from "@/components/sections/studio/places"
import { Team, Values } from "@/components/sections/studio/team"
import { pexels } from "@/lib/photos"

/** A wide band of the studio at work that drifts against the scroll. */
function StudioBand() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"])
  return (
    <div ref={ref} className="relative mx-(--spacing-gutter) aspect-[16/9] overflow-hidden rounded-(--radius-cell) bg-panel shadow-(--shadow-card) md:aspect-[21/9]">
      <motion.img
        src={pexels(23471215, 2000, 1000)}
        alt="Four people on set in a white photo studio, laughing between takes"
        className="absolute inset-[-10%_0] h-[120%] w-full object-cover"
        style={reduced ? undefined : { y }}
      />
    </div>
  )
}

/**
 * Studio: who we are (the claim) → what it's like (the band) → what we
 * believe → how a project goes (the stacking process) → the rules →
 * the people → the two rooms → what others said → come and see.
 */
export function StudioPage() {
  return (
    <>
      <PageHero
        label="Studio"
        lines={["A kiln", "for ideas."]}
        muted={1}
        lead="Kiln started in 2014 in a Lisbon ceramics workshop with a soldering iron on the wheel. We still think the same way: ideas get better when they're made."
      >
        <dl className="grid grid-cols-3 gap-4 md:justify-self-end">
          {[
            ["Founded", "2014"],
            ["People", "46"],
            ["Studios", "2"],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="type-label text-ink-4">{k}</dt>
              <dd className="type-head mt-1 text-h3 text-ink tabular-nums">{v}</dd>
            </div>
          ))}
        </dl>
      </PageHero>
      <StudioBand />
      <section aria-label="What we believe" className="px-(--spacing-gutter) py-(--spacing-section)">
        <SectionLabel index="01">What we believe</SectionLabel>
        <ScrollWords
          className="type-head mt-10 max-w-[24ch] text-h2 text-ink"
          text="A deck can't tell you if something works. A prototype can. So we make the real thing as early as we can, then keep making it better until it's ready for people."
        />
      </section>
      <Process />
      <Values />
      <Team />
      <Places />
      <Awards />
      <ClosingCta title="Come and see the kiln." continuation="Coffee's on us, in either city." />
    </>
  )
}
