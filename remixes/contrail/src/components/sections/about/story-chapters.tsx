import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useCanvasAction } from "@canvas/react"

import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { PHOTOS, pexels } from "@/lib/photos"
import { cn } from "@/lib/utils"

const CHAPTERS = [
  { year: "2019", title: "Forty minutes in Frankfurt.", body: "Our founder, then a first officer, watched a whole gate of passengers find out about a cancellation from the window. The crew had known for forty minutes. The passengers had the same data in theory — just not in their pockets.", photo: PHOTOS.terminal, alt: "A traveller waiting in an airport lounge by a window" },
  { year: "2020", title: "A spreadsheet, then a prototype.", body: "Two pilots and a dispatcher built a model of how delays travel: plane by plane, airport by airport. The first version ran on a laptop and texted twelve friends.", photo: PHOTOS.teamDesk, alt: "Two people working together over plans at a desk" },
  { year: "2022", title: "The app, and the first million.", body: "Contrail launched on iPhone with one promise — to tell you first. A year later a million people had it, mostly because their friends kept beating the airline to the news.", photo: PHOTOS.wingSunset, alt: "An aircraft wing against a sunset sky" },
  { year: "2024", title: "Friends, passports, the tower.", body: "We added sharing, the passport and official advisories from air traffic control. The app got bigger; we worked hard to keep it feeling small.", photo: PHOTOS.tarmacDusk, alt: "Aircraft parked at a gate at dusk" },
  { year: "2026", title: "Three cities, still flight nerds.", body: "Forty-one people in Lisbon, Montréal and Kyoto, three million travellers, and the same question asked of every feature: does this make flying calmer?", photo: PHOTOS.teamLounge, alt: "A team talking together in an office lounge" },
]

/**
 * How we got here: the photo holds still and changes with the chapter, while
 * the chapters scroll past beside it. Below `lg` the photos sit inline.
 */
export function StoryChapters() {
  const [active, setActive] = useState(0)
  const list = useRef<HTMLOListElement>(null)
  const reduced = useReducedMotion()
  CHAPTERS.forEach((c, i) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useCanvasAction(`Story — ${c.year}`, () => setActive(i), { on: active === i, group: "About story" })
  })

  useEffect(() => {
    const items = [...(list.current?.querySelectorAll<HTMLElement>("[data-chapter-index]") ?? [])]
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.chapterIndex))
      },
      { rootMargin: "-45% 0px -45% 0px" },
    )
    items.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section data-theme="day" className="bg-page pb-section">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="hidden lg:sticky lg:top-24 lg:block lg:h-[calc(100svh-8rem)] lg:self-start">
            <div className="relative h-full overflow-hidden rounded-(--radius-panel) bg-panel shadow-(--shadow-float)">
              <AnimatePresence initial={false}>
                <motion.img
                  key={active}
                  src={pexels(CHAPTERS[active].photo, 1000)}
                  alt={CHAPTERS[active].alt}
                  className="absolute inset-0 size-full object-cover"
                  initial={reduced ? { opacity: 0 } : { opacity: 0, transform: "scale(1.06)" }}
                  animate={{ opacity: 1, transform: "scale(1)" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                />
              </AnimatePresence>
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(transparent,rgb(6_4_26/0.6))]" />
              <p className="absolute bottom-6 left-7 font-data text-[clamp(64px,8vw,110px)] leading-none font-semibold tracking-[-0.03em] text-white">{CHAPTERS[active].year}</p>
            </div>
          </div>
          <ol ref={list} className="flex flex-col">
            {CHAPTERS.map((c, i) => (
              <li key={c.year} data-chapter-index={i} className="flex min-h-[70svh] flex-col justify-center py-10 lg:py-0">
                <Reveal>
                  <img src={pexels(c.photo, 800)} alt={c.alt} className="mb-6 aspect-[4/3] w-full rounded-(--radius-card) object-cover lg:hidden" />
                  <p className={cn("font-data text-[20px] font-semibold transition-colors duration-(--duration-swap)", i === active ? "text-violet" : "text-ink-4")}>{c.year}</p>
                  <h3 className="type-display mt-3 text-h2 text-balance">{c.title}</h3>
                  <p className="mt-5 max-w-[46ch] text-lead text-ink-2">{c.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  )
}
