import { useRef, useState } from "react"
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "motion/react"
import { useCanvasAction } from "@canvas/react"

import { Container } from "@/components/ui/container"
import { Photo } from "@/components/blocks/photo"
import { SectionHeading } from "@/components/blocks/section-heading"
import { CornerLabels } from "@/components/blocks/corner-label"
import { Reveal } from "@/components/motion/reveal"
import { quote, vertiport } from "@/content/network"
import type { PhotoName } from "@/lib/photos"
import { cn } from "@/lib/utils"

import { usePinned } from "./use-pinned"

/** Working weeks in a year, once holidays are taken out. */
const WEEKS = 46

type Story = { name: string; role: string; photo: PhotoName; from: string; to: string; trips: number; line: string }

const STORIES: Story[] = [
  {
    name: "Amara",
    role: "Partner, a law firm on the waterfront",
    photo: "briefcase",
    from: "harbour",
    to: "midtown",
    trips: 8,
    line: "Four days a week she used to leave at seven to be at her desk by nine. Now she leaves after breakfast.",
  },
  {
    name: "Teo",
    role: "Architect, between two sites",
    photo: "trench-walk",
    from: "northgate",
    to: "riverside",
    trips: 6,
    line: "Three site visits a week, across the river and back. The bridge used to take the afternoon.",
  },
  {
    name: "Hana",
    role: "Consultant, flies out twice a week",
    photo: "cabin-calm",
    from: "midtown",
    to: "airport",
    trips: 4,
    line: "Office to gate, with time for a coffee she drinks sitting down. She has stopped booking the early taxi.",
  },
]

const withNumbers = STORIES.map((s) => {
  const trip = quote(vertiport(s.from), vertiport(s.to))
  return { ...s, trip, yearly: trip.savedMin * s.trips * WEEKS }
})
const TOTAL = withNumbers.reduce((sum, s) => sum + s.yearly, 0)

/**
 * Time back: three commuters, and the minutes a year the network returns to
 * them. From `md` up the stage pins and a big counter climbs as you scroll
 * through their stories; below that, and for reduced motion, they stack.
 */
export function TimeBack() {
  const pinned = usePinned()
  return (
    <section data-header-tone="dark" className="relative bg-page text-ink">
      {pinned ? <PinnedStory /> : <StackedStory />}
    </section>
  )
}

function Intro({ className }: { className?: string }) {
  return (
    <SectionHeading
      eyebrow="Time back — 02"
      title="A route is only a line until you count what it returns."
      lead="Three people, three regular trips. Every number below is the same quote the map gives you, multiplied by a working year."
      className={className}
    />
  )
}

function PinnedStory() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const c1 = withNumbers[0].yearly
  const c2 = c1 + withNumbers[1].yearly
  const minutes = useTransform(scrollYProgress, [0.04, 0.27, 0.37, 0.6, 0.7, 0.93], [0, c1, c1, c2, c2, TOTAL], { clamp: true })
  const shown = useTransform(minutes, (n) => Math.round(n).toLocaleString("en-US"))
  const hours = useTransform(minutes, (n) => `${Math.round(n / 60).toLocaleString("en-US")} hours`)
  useMotionValueEvent(scrollYProgress, "change", (p) => setActive(Math.min(2, Math.max(0, Math.floor(p * 3)))))

  useCanvasAction("Story: Amara", () => scrollToStory(ref.current, 0), { on: active === 0, group: "Time back" })
  useCanvasAction("Story: Teo", () => scrollToStory(ref.current, 1), { on: active === 1, group: "Time back" })
  useCanvasAction("Story: Hana", () => scrollToStory(ref.current, 2), { on: active === 2, group: "Time back" })

  const story = withNumbers[active]
  return (
    <>
      <Container className="pt-(--spacing-section) pb-16">
        <Intro />
      </Container>
      <div ref={ref} className="relative h-[330svh]">
        <div className="sticky top-0 flex h-svh items-center">
          <Container className="grid grid-cols-12 items-center gap-6">
            <div className="col-span-7 flex flex-col gap-6">
              <p className="text-micro text-ink-3">Minutes back this year, for these three alone</p>
              <motion.p className="type-head text-giga tabular-nums" aria-live="off">
                {shown}
              </motion.p>
              <p className="text-h3 type-head text-ink-2">
                That is <motion.span className="tabular-nums">{hours}</motion.span> not spent in traffic.
              </p>
              <ol className="mt-4 flex gap-2" aria-label="Stories">
                {withNumbers.map((s, i) => (
                  <li key={s.name}>
                    <button
                      type="button"
                      onClick={() => scrollToStory(ref.current, i)}
                      className={cn(
                        "inline-flex h-11 items-center gap-2 rounded-(--radius-button) px-4 text-micro transition-[background-color,color,transform] duration-(--duration-hover) active:scale-[0.97]",
                        i === active ? "bg-ink text-page" : "bg-panel text-ink-2 hover:bg-panel-deep",
                      )}
                    >
                      <span className="font-mono">0{i + 1}</span> {s.name}
                    </button>
                  </li>
                ))}
              </ol>
            </div>
            <div className="col-span-5 flex flex-col gap-5">
              <div className="relative aspect-[4/5] max-h-[62svh] w-full overflow-hidden rounded-(--radius-photo) shadow-(--shadow-photo)">
                {withNumbers.map((s, i) => (
                  <motion.div
                    key={s.photo}
                    className="absolute inset-0"
                    initial={false}
                    animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 1.04 }}
                    transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <Photo name={s.photo} rounded={false} className="size-full" />
                  </motion.div>
                ))}
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={story.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                >
                  <StoryCaption story={story} />
                </motion.div>
              </AnimatePresence>
            </div>
          </Container>
        </div>
      </div>
    </>
  )
}

function scrollToStory(el: HTMLElement | null, i: number) {
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY
  const span = el.offsetHeight - window.innerHeight
  window.scrollTo({ top: top + span * ((i + 0.85) / 3), behavior: "smooth" })
}

function StoryCaption({ story }: { story: (typeof withNumbers)[number] }) {
  const a = vertiport(story.from)
  const b = vertiport(story.to)
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-h4 type-head">{story.name}</p>
        <p className="font-mono text-micro text-ink-3">
          {a.code} → {b.code}
        </p>
      </div>
      <p className="text-micro text-ink-3">{story.role}</p>
      <p className="max-w-[46ch] text-body text-ink-2">{story.line}</p>
      <p className="text-micro text-ink-3 tabular-nums">
        {story.trips} flights a week · {story.trip.savedMin} min saved each ·{" "}
        <span className="font-medium text-ink">{story.yearly.toLocaleString("en-US")} min a year</span>
      </p>
    </div>
  )
}

function StackedStory() {
  return (
    <Container className="py-(--spacing-section)">
      <Intro />
      <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-6">
        {withNumbers.map((s, i) => (
          <Reveal key={s.name} delay={i * 0.06} className="flex flex-col gap-5">
            <Photo name={s.photo} className="aspect-[4/5] shadow-(--shadow-photo)" />
            <StoryCaption story={s} />
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-16 flex flex-col gap-3 border-t border-line pt-10">
        <p className="text-micro text-ink-3">Minutes back this year, for these three alone</p>
        <p className="type-head text-mega tabular-nums">{TOTAL.toLocaleString("en-US")}</p>
        <p className="text-h4 type-head text-ink-2">That is {Math.round(TOTAL / 60).toLocaleString("en-US")} hours not spent in traffic.</p>
      </Reveal>
      <CornerLabels left="Weeks counted: 46" right="Quotes at rush hour" className="mt-14 text-ink-3" />
    </Container>
  )
}
