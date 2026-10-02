import { Star } from "lucide-react"

import { Aurora } from "@/components/motion/aurora"
import { Marquee } from "@/components/motion/marquee"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { PHOTOS, photo } from "@/lib/photos"

const MOSAIC = [
  [PHOTOS.stretch, 150], [PHOTOS.friends, 120], [PHOTOS.swimmer, 170], [PHOTOS.runner2, 150], [PHOTOS.hiker2, 180],
  [PHOTOS.jogger2, 140], [PHOTOS.yoga, 170], [PHOTOS.friends2, 130], [PHOTOS.surfer, 160], [PHOTOS.cyclist, 150],
] as const

const REVIEWS = [
  { title: "Finally makes sense of my watch", by: "ironwren_k", date: "September 1, 2026", text: "I had three years of data and no idea what it meant. Meridian told me in one line that I was under-sleeping on Sundays. Fixed in a week." },
  { title: "The coach actually reads my labs", by: "d_oyelaran", date: "August 30, 2026", text: "It connected my cholesterol panel to my training load and suggested a swap. My doctor was impressed by the printout." },
  { title: "Calm, clear, no guilt", by: "marlow.t", date: "August 24, 2026", text: "No streak shaming. Recovery is low, it says rest, and I do. My resting heart rate is down six beats." },
  { title: "Best check-ins in any app", by: "petra-s", date: "August 12, 2026", text: "The evening nudge is the one that stuck. Bed by 10:45, deep sleep up half an hour. I didn’t think an app could do that." },
  { title: "Worth it for the sources alone", by: "kofi_run", date: "July 28, 2026", text: "When it says something it shows the paper. I’ve stopped Googling every claim." },
] as const

/** Real members, real days: a photo mosaic and a drifting wall of reviews. Hover to pause and read. */
export function Community() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <Aurora tone="peach" intensity={0.8} />
      <Container>
        <Reveal>
          <div className="mx-auto flex max-w-[760px] items-end justify-center gap-2 sm:gap-3">
            {MOSAIC.map(([id, h], i) => (
              <div key={id} className="min-w-0 flex-1 overflow-hidden rounded-xl bg-tint sm:rounded-2xl" style={{ height: h, marginBottom: (i % 3) * 16 }}>
                <img src={photo(id, 300)} alt="" loading="lazy" className="size-full object-cover transition-transform duration-700 ease-out hover:scale-110" />
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.06} className="mt-10 text-center">
          <h2 className="display text-[clamp(2rem,5vw,3.25rem)]">Crafted with care, loved everywhere</h2>
          <p className="mx-auto mt-3 max-w-md text-ink-2">Don’t take our word for it. See why people around the world trust Meridian to feel better, live longer and train smarter.</p>
        </Reveal>
      </Container>
      <Reveal delay={0.1} className="mt-10">
        <Marquee duration={70} direction="right" className="[mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
          {REVIEWS.map((r) => (
            <figure key={r.by} className="w-[290px] shrink-0 rounded-3xl bg-paper/70 p-5 shadow-card backdrop-blur sm:w-[320px]">
              <div className="flex text-amber" aria-label="5 out of 5 stars">{Array.from({ length: 5 }, (_, i) => <Star key={i} className="size-3.5 fill-current" />)}</div>
              <figcaption className="mt-3 text-[15px] font-semibold tracking-tight">{r.title}</figcaption>
              <div className="text-xs text-ink-3">{r.by}, {r.date}</div>
              <blockquote className="mt-3 text-sm leading-relaxed text-ink-2">“{r.text}”</blockquote>
            </figure>
          ))}
        </Marquee>
      </Reveal>
    </section>
  )
}
