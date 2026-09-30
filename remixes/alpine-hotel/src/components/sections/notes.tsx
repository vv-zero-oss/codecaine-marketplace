import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { ParallaxCard } from "@/components/motion/parallax-card"
import { notes } from "@/content"

/** Guests in their own words — three postcards pinned at slightly different depths. */
export function Notes({ title = "Postcards from the house", lede = "What guests wrote in the book by the fire this winter." }: { title?: string; lede?: string }) {
  return (
    <section id="notes" className="overflow-hidden bg-snow py-(--spacing-section)">
      <Container>
        <SectionHeading title={title} lede={lede} />
        <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-6 lg:gap-10">
          {notes.map((n, i) => (
            <ParallaxCard key={n.name} speed={[40, 100, 60][i]} tilt={[-2.5, 1.5, -1][i]}>
              <NoteCard {...n} />
            </ParallaxCard>
          ))}
        </div>
      </Container>
    </section>
  )
}

export function NoteCard({ quote, name, from, image }: { quote: string; name: string; from: string; image: string }) {
  return (
    <figure className="flex h-full flex-col rounded-card bg-ice p-6 shadow-(--shadow-card)">
      <blockquote className="text-xl leading-snug tracking-[-0.01em] text-ink">“{quote}”</blockquote>
      <figcaption className="mt-auto flex items-center gap-3 pt-8">
        <img src={image} alt="" loading="lazy" className="size-11 rounded-pill object-cover" />
        <div>
          <p className="text-sm font-medium">{name}</p>
          <p className="text-xs text-ink-mute">{from}</p>
        </div>
      </figcaption>
    </figure>
  )
}
