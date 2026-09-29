import { Star } from "lucide-react"

import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { Reveal } from "@/components/motion/reveal"
import { TESTIMONIALS } from "@/content"

/** Five soft-pink stars, a serif quote and the handle it came from. */
export function Testimonial({ quote, author, stars = 5 }: { quote: string; author: string; stars?: number }) {
  return (
    <figure className="flex h-full flex-col rounded-[10px] bg-surface/80 px-4 pt-3.5 pb-4 shadow-card">
      <div className="flex gap-0.5 text-accent" aria-label={`${stars} out of 5 stars`}>
        {Array.from({ length: stars }).map((_, i) => (
          <Star key={i} className="size-3 fill-current" strokeWidth={0} />
        ))}
      </div>
      <blockquote className="mt-2.5 font-serif text-[1.3125rem] leading-[1.2] whitespace-pre-line text-ink">{quote}</blockquote>
      <figcaption className="mt-auto pt-5 text-[0.6875rem] text-ink-soft">{author}</figcaption>
    </figure>
  )
}

/** A lilac-washed panel that rounds up out of the page, with three short quotes. */
export function Testimonials({ title = TESTIMONIALS.title }: { title?: string }) {
  return (
    <section
      id="reviews"
      className="grain rounded-t-panel bg-(image:--atmos-panel) [--grain-opacity:0.12] pt-20 pb-16 sm:pt-28 sm:pb-24"
    >
      <Container className="relative z-2">
        <SectionHeading title={title} />
        <div className="mx-auto mt-12 grid max-w-[916px] gap-4 sm:mt-14 md:grid-cols-3 md:gap-7">
          {TESTIMONIALS.items.map((item, i) => (
            <Reveal key={item.author} delay={i * 0.08} className="h-full">
              <Testimonial quote={item.quote} author={item.author} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
