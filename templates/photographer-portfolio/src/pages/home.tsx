import { ArrowRight } from "lucide-react"

import { CallToBook } from "@/components/call-to-book"
import { GalleryCard } from "@/components/gallery-card"
import { Photo } from "@/components/photo"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Eyebrow, SectionHeading } from "@/components/ui/section-heading"
import { galleries, photo, press, testimonials } from "@/content"

export function HomeHero() {
  return (
    <section className="relative">
      <Container className="grid gap-10 pt-16 pb-20 md:grid-cols-12 md:items-end md:pt-24">
        <div className="md:col-span-7">
          <Eyebrow>Weddings · Portraits · Editorial</Eyebrow>
          <h1 className="mt-6 font-display text-6xl leading-[0.95] tracking-tight md:text-8xl">
            Quiet photographs of <em className="text-accent">loud</em> days.
          </h1>
          <p className="mt-8 max-w-md leading-relaxed text-ink-600">
            Documentary photography for people who would rather be in the moment than posing for it.
            Based in Lisbon, working wherever the story is.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href="/portfolio">View portfolio</ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              Check a date
            </ButtonLink>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 md:col-span-5">
          <Photo src={photo("hero-a")} alt="Bride laughing in a garden" ratio="tall" />
          <Photo src={photo("hero-b")} alt="Portrait by a window" ratio="tall" className="mt-12" />
        </div>
      </Container>
    </section>
  )
}

export function PressStrip() {
  return (
    <section className="border-y border-ink/10">
      <Container className="flex flex-wrap items-center justify-between gap-x-10 gap-y-4 py-8">
        <Eyebrow>As seen in</Eyebrow>
        {press.map((name) => (
          <span key={name} className="font-display text-xl text-ink-600 italic">
            {name}
          </span>
        ))}
      </Container>
    </section>
  )
}

export function FeaturedWork() {
  return (
    <section className="mt-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Selected work" title="Recent stories" />
          <ButtonLink href="/portfolio" variant="link">
            All galleries <ArrowRight />
          </ButtonLink>
        </div>
        <div className="mt-14 grid gap-x-8 gap-y-16 md:grid-cols-3">
          {galleries.slice(0, 3).map((gallery, index) => (
            <GalleryCard key={gallery.slug} gallery={gallery} ratio={index === 1 ? "tall" : "portrait"} />
          ))}
        </div>
      </Container>
    </section>
  )
}

export function Testimonial({ quote, name, context }: { quote: string; name: string; context: string }) {
  return (
    <figure className="border-t border-ink/15 pt-8">
      <blockquote className="font-display text-2xl leading-snug italic">“{quote}”</blockquote>
      <figcaption className="mt-6 text-xs uppercase tracking-[0.2em] text-ink-400">
        {name} — {context}
      </figcaption>
    </figure>
  )
}

export function Testimonials() {
  return (
    <section className="mt-32">
      <Container>
        <SectionHeading eyebrow="Kind words" title="From people I've photographed" />
        <div className="mt-14 grid gap-12 md:grid-cols-3">
          {testimonials.map((item) => (
            <Testimonial key={item.name} {...item} />
          ))}
        </div>
      </Container>
    </section>
  )
}

export function HomePage() {
  return (
    <>
      <HomeHero />
      <PressStrip />
      <FeaturedWork />
      <Testimonials />
      <CallToBook />
    </>
  )
}
