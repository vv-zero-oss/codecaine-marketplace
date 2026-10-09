import { useEffect, useRef, useState } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { Container } from "@/components/ui/container"
import { photo, PHOTOS } from "@/lib/photos"
import { cn } from "@/lib/utils"

type Chapter = { year: string; title: string; body: string; photo: number; alt: string }

const CHAPTERS: Chapter[] = [
  {
    year: "2016",
    title: "We bought a record-pressing plant.",
    body: "Two of us, a bank loan and a building on Foundry Lane that still smelled of hot vinyl. The floor was rated for presses, which meant it would take a roaster.",
    photo: PHOTOS.slimCrate,
    alt: "Old records stacked in a wooden crate",
  },
  {
    year: "2017",
    title: "First roast, mostly smoke.",
    body: "A second-hand fifteen-kilo drum and a lot of burnt Brazil. By spring we were selling bags at the farmers' market from a table with a turntable on it.",
    photo: PHOTOS.roastedBeans,
    alt: "Coffee turning in a roaster drum",
  },
  {
    year: "2019",
    title: "Elm Street opens, records and all.",
    body: "A narrow shop with a long bar, six hundred LPs on the back wall and a pair of speakers too big for the room. Theo washed the first cup.",
    photo: PHOTOS.turntable,
    alt: "A record playing on the bar's turntable",
  },
  {
    year: "2021",
    title: "We met Rosa Elena.",
    body: "Our first trip to Huila. We came home with a handshake on three harvests at a price agreed before picking — the way we've bought every coffee since.",
    photo: PHOTOS.pickerSmile,
    alt: "A smiling harvester picking coffee cherries",
  },
  {
    year: "2024",
    title: "A smaller roaster, on purpose.",
    body: "We swapped fifteen kilos for five, so we could roast to order every Tuesday, taste every batch and ship it the same afternoon.",
    photo: PHOTOS.roasterPanel,
    alt: "Our roaster checking the panel of the new machine",
  },
  {
    year: "2026",
    title: "Two bars, one plant, forty cafés.",
    body: "Still roasting on Foundry Lane, still playing records too loud on Elm Street. The coffee got better. The record collection got worse, in the best way.",
    photo: PHOTOS.friendsTable,
    alt: "Friends talking over coffee at a table in the bar",
  },
]

/** True from the `md` breakpoint up; read live so a resize swaps layouts. */
function useWide() {
  const [wide, setWide] = useState(() => typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)")
    const update = () => setWide(mq.matches)
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])
  return wide
}

/**
 * The liner notes: ten years as a row of chapters that slides sideways as
 * you scroll down. The section pins for the length of the row; scroll
 * progress maps straight onto the track's translate (no easing — the
 * scroll is the easing, and Lenis already smooths it).
 *
 * Below `md`, for reduced motion and while the page is being designed, the
 * chapters stack vertically instead.
 */
export function LinerNotes() {
  const wide = useWide()
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const pinned = wide && !reduced && !designing

  return (
    <section className="border-b border-line bg-panel">
      {pinned ? <PinnedTrack /> : <StackedList />}
    </section>
  )
}

function Heading() {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6">
      <h2 className="type-display text-h1">
        The <span className="text-ember">liner notes.</span>
      </h2>
      <p className="type-label text-[11.5px] text-ink-3">2016 — 2026 · six tracks</p>
    </div>
  )
}

function PinnedTrack() {
  const wrapper = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)
  const { scrollYProgress } = useScroll({ target: wrapper, offset: ["start start", "end end"] })
  const transform = useTransform(scrollYProgress, (p) => `translateX(${-p * distance}px)`)
  const fill = useTransform(scrollYProgress, (p) => `scaleX(${p})`)

  useEffect(() => {
    const el = track.current
    if (!el) return
    const measure = () => setDistance(Math.max(0, el.scrollWidth - window.innerWidth))
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    window.addEventListener("resize", measure)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", measure)
    }
  }, [])

  return (
    <div ref={wrapper} style={{ height: `calc(100svh + ${distance}px)` }} className="relative">
      <div className="sticky top-14 flex h-[calc(100svh-56px)] flex-col justify-center gap-10 overflow-hidden py-10 lg:top-[52px] lg:h-[calc(100svh-52px)]">
        <Container>
          <Heading />
        </Container>
        <motion.div ref={track} data-canvas-ignore className="flex w-max gap-(--spacing-gutter) px-(--spacing-gutter)" style={{ transform }}>
          {CHAPTERS.map((c) => (
            <ChapterCard key={c.year} chapter={c} className="w-[min(560px,44vw)]" />
          ))}
        </motion.div>
        <Container>
          <div className="h-[3px] overflow-hidden rounded-full bg-line-strong">
            <motion.div className="h-full origin-left rounded-full bg-ember" style={{ transform: fill }} />
          </div>
        </Container>
      </div>
    </div>
  )
}

function StackedList() {
  return (
    <Container className="space-y-10 py-(--spacing-section)">
      <Heading />
      <div className="grid gap-10 sm:grid-cols-2">
        {CHAPTERS.map((c) => (
          <ChapterCard key={c.year} chapter={c} />
        ))}
      </div>
    </Container>
  )
}

function ChapterCard({ chapter, className }: { chapter: Chapter; className?: string }) {
  return (
    <article className={cn("group/chapter grid shrink-0 gap-5 sm:grid-cols-[0.9fr_1fr] sm:items-end", className)}>
      <div className="aspect-[4/5] overflow-hidden rounded-(--radius-card) bg-panel-deep shadow-(--shadow-card)">
        <img src={photo(chapter.photo, 900)} alt={chapter.alt} loading="lazy" className="size-full object-cover transition-transform duration-700 ease-(--ease-out-strong) group-hover/chapter:scale-[1.04]" />
      </div>
      <div className="space-y-3">
        <p className="type-display text-display leading-[0.8] text-rust">{chapter.year}</p>
        <h3 className="type-display text-h4">{chapter.title}</h3>
        <p className="text-[15px] text-ink-2">{chapter.body}</p>
      </div>
    </article>
  )
}
