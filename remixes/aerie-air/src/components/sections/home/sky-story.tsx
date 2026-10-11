import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { photos } from "@/lib/photos"
import { ButtonLink } from "@/components/ui/button"
import { Reveal } from "@/components/motion/reveal"

/**
 * Where it came from: a dusk river city behind the line, the photograph
 * slowly closing in as it scrolls, two pills — the story and the jobs.
 */
export function SkyStory({
  title = "The sky was never the ceiling.",
  body = "In 2019 eleven engineers in a borrowed hangar asked why the quietest way across a city couldn't also be the fastest. Thousands of test flights later, the question has a timetable.",
}: {
  title?: string
  body?: string
}) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const scale = useTransform(scrollYProgress, [0, 1], [1.18, 1])

  return (
    <section ref={ref} data-header-tone="light" className="relative isolate flex min-h-[92svh] items-center overflow-hidden bg-dusk text-dusk-fg">
      <motion.img
        src={photos["river-pink"].src}
        alt={photos["river-pink"].alt}
        loading="lazy"
        style={reduced || designing ? undefined : { scale }}
        className="absolute inset-0 -z-10 size-full object-cover"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-dusk/70 via-dusk/20 to-dusk/40" />
      <div className="grid w-full gap-10 px-(--spacing-gutter) md:grid-cols-[1.4fr_1fr] md:items-center">
        <Reveal className="flex flex-col items-start gap-6">
          <h2 className="type-head max-w-[13ch] text-display">{title}</h2>
          <div className="flex flex-wrap gap-2">
            <ButtonLink href="/routes#story" variant="cream" size="sm">
              Read our story
            </ButtonLink>
            <ButtonLink href="/routes#careers" variant="glass" size="sm">
              Work at Aerie
            </ButtonLink>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="max-w-[30ch] text-body md:justify-self-end">
          {body}
        </Reveal>
      </div>
    </section>
  )
}
