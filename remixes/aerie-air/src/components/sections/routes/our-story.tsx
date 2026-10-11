import { useLayoutEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "motion/react"

import { Container } from "@/components/ui/container"
import { Photo } from "@/components/blocks/photo"
import { CornerLabels } from "@/components/blocks/corner-label"
import { Reveal } from "@/components/motion/reveal"
import { cn } from "@/lib/utils"

import { usePinned } from "./use-pinned"

const MILESTONES = [
  { year: "2019", title: "A sketch on a ferry", text: "Two engineers, stuck on the water while the bridge stood still, draw a craft that could have flown them home." },
  { year: "2020", title: "The first hover", text: "A quarter-scale model lifts off a car park at night, and settles again without waking the street." },
  { year: "2021", title: "Full size", text: "The first full-scale airframe is rolled out of a rented hangar. It does not fly yet. It is very quiet about it." },
  { year: "2022", title: "Transition", text: "A pilot takes the craft from hover to wing-borne flight and back, over an empty test field." },
  { year: "2024", title: "A thousand flights", text: "Rain, gusts, cold mornings, heat. The test fleet passes a thousand flights without a single cancelled day of work." },
  { year: "2025", title: "The city says yes", text: "The first three rooftops are agreed with the city, the harbour board and the airport." },
  { year: "2026", title: "Pads go up", text: "Harbour Pier is the first to be built: a landing deck, a lounge, a charger, a lift to the street." },
  { year: "2027", title: "First passengers", text: "Spring. Four seats, one pilot, and a city that looks different from four hundred metres up." },
]

/**
 * Our story: the founding, told short, on the dusk ground — a wide photo
 * band, a few honest lines, then the milestones as a timeline you scrub
 * sideways by scrolling. Below `md` and for reduced motion the milestones
 * are a plain vertical list.
 */
export function OurStory({
  title = "The sky was always the easy part.",
}: {
  title?: string
}) {
  const pinned = usePinned()
  return (
    <section id="story" data-header-tone="light" className="relative scroll-mt-24 bg-dusk text-dusk-fg">
      <div className="relative">
        <Photo name="wing-dusk" rounded={false} className="h-[78svh] min-h-[460px] w-full" position="50% 60%" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-dusk/30 via-transparent to-dusk" />
        <Container className="absolute inset-x-0 bottom-0 pb-12 md:pb-20">
          <CornerLabels left="Our story — 04" right="Since 2019" className="mb-8 text-dusk-muted" />
          <Reveal>
            <h2 className="type-head max-w-[14ch] text-mega text-balance">{title}</h2>
          </Reveal>
        </Container>
      </div>

      <Container className="grid gap-12 py-(--spacing-section) md:grid-cols-12 md:gap-6">
        <Reveal className="flex flex-col gap-6 md:col-span-6 md:col-start-1">
          <p className="text-h3 type-head max-w-[22ch]">Flying was never the problem. Landing somewhere useful was.</p>
          <div className="flex max-w-[52ch] flex-col gap-4 text-body text-dusk-muted">
            <p>
              Aerie began in 2019 on a ferry that had stopped mid-river, because the bridge above it had stopped too. Two of us had spent our
              careers on aircraft that needed a runway and an hour of driving at either end. That afternoon the question changed: what if the
              runway was the roof of the building you were already in?
            </p>
            <p>
              So we built backwards from the rooftop. An aircraft quiet enough to land beside an office. Pads small enough to fit on one. A
              booking that takes less time than hailing a car. Everything else on this page follows from that.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-5 md:col-start-8">
          <Photo name="river-gold" className="aspect-[4/5] shadow-(--shadow-photo)" />
          <p className="mt-3 text-micro text-dusk-muted">The river at six. The bridge, as usual, at a standstill.</p>
        </Reveal>
      </Container>

      {pinned ? <ScrubbedMilestones /> : <ListedMilestones />}
    </section>
  )
}

function MilestoneCard({ m, className }: { m: (typeof MILESTONES)[number]; className?: string }) {
  return (
    <article className={cn("flex flex-col gap-4 border-t border-dusk-fg/20 pt-6", className)}>
      <p className="type-head text-display tabular-nums text-dusk-fg">{m.year}</p>
      <h3 className="type-head text-h4">{m.title}</h3>
      <p className="text-body text-dusk-muted">{m.text}</p>
    </article>
  )
}

function ScrubbedMilestones() {
  const ref = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLOListElement>(null)
  const [distance, setDistance] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -distance], { clamp: true })

  useLayoutEffect(() => {
    const el = track.current
    if (!el) return
    const measure = () => setDistance(Math.max(0, el.scrollWidth - window.innerWidth + 64))
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    window.addEventListener("resize", measure)
    return () => {
      observer.disconnect()
      window.removeEventListener("resize", measure)
    }
  }, [])

  return (
    <div ref={ref} className="relative h-[280svh]">
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        <Container className="mb-12 flex items-end justify-between gap-6">
          <p className="type-head text-h2">2019 → 2027</p>
          <p className="max-w-[28ch] text-right text-micro text-dusk-muted">Eight years, scrolled sideways. Keep going.</p>
        </Container>
        <motion.ol ref={track} style={{ x }} className="flex w-max gap-6 px-(--spacing-gutter)">
          {MILESTONES.map((m) => (
            <li key={m.year} className="w-[min(78vw,360px)] shrink-0">
              <MilestoneCard m={m} />
            </li>
          ))}
        </motion.ol>
        <Container className="mt-14">
          <div className="h-px w-full bg-dusk-fg/15">
            <motion.div style={{ scaleX: scrollYProgress }} className="h-px origin-left bg-dusk-fg" />
          </div>
        </Container>
      </div>
    </div>
  )
}

function ListedMilestones() {
  return (
    <Container className="pb-(--spacing-section)">
      <p className="type-head mb-10 text-h2">2019 → 2027</p>
      <ol className="grid gap-10 sm:grid-cols-2">
        {MILESTONES.map((m, i) => (
          <Reveal as="li" key={m.year} delay={(i % 2) * 0.06}>
            <MilestoneCard m={m} />
          </Reveal>
        ))}
      </ol>
    </Container>
  )
}
