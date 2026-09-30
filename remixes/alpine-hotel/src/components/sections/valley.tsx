import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { VideoZoomSplit } from "@/components/motion/video-zoom-split"
import { valley } from "@/content"

/**
 * What the hotel is next to: a film of the peak that grows to fill the
 * screen, then parts into three cards — winter, summer, evening.
 */
export function Valley({
  title = valley.title,
  body = valley.body,
  overlay = "The Matterhorn, twenty minutes up.",
}: {
  title?: string
  body?: string
  overlay?: string
}) {
  return (
    <section id="valley" className="relative bg-ice">
      <Container className="pt-(--spacing-section) pb-10">
        <SectionHeading eyebrow={valley.eyebrow} title={title} lede={body} />
      </Container>
      <VideoZoomSplit src={valley.film.src} poster={valley.film.poster} overlay={overlay}>
        {valley.cards.map((card) => (
          <ValleyCard key={card.title} {...card} />
        ))}
      </VideoZoomSplit>
    </section>
  )
}

export function ValleyCard({ kicker, title, note }: { kicker: string; title: string; note: string }) {
  return (
    <div className="flex flex-col justify-end p-4 text-snow sm:p-6">
      <p className="w-fit rounded-pill bg-snow/15 px-3 py-1 text-xs backdrop-blur-sm">{kicker}</p>
      <p className="font-headline mt-3 text-2xl sm:text-4xl">{title}</p>
      <p className="mt-1 text-sm text-snow/80">{note}</p>
    </div>
  )
}
