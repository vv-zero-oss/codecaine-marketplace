import { Container } from "@/components/ui/container"
import { Chapter } from "@/components/ui/chapter"
import { VideoZoomSplit } from "@/components/motion/video-zoom-split"
import { seasons } from "@/content"

/**
 * When the house is open. A film of the peak grows to fill the screen, then
 * parts into three panels: winter, summer, and the two months it is shut.
 */
export function Seasons({ title = seasons.title, lede = seasons.lede, overlay = seasons.overlay }: { title?: string; lede?: string; overlay?: string }) {
  return (
    <section id="seasons" className="relative">
      <Container className="pb-8">
        <Chapter number="02" label="Seasons" title={title} lede={lede} />
      </Container>
      <VideoZoomSplit src={seasons.film.src} poster={seasons.film.poster} overlay={overlay} radius={3} gutter={14} top={76}>
        {seasons.cards.map((card) => (
          <SeasonTag key={card.title} {...card} />
        ))}
      </VideoZoomSplit>
    </section>
  )
}

/** A paper tag pinned to the bottom of each panel. */
export function SeasonTag({ dates, title, note }: { dates: string; title: string; note: string }) {
  return (
    <div className="flex flex-col justify-end p-3 sm:p-5">
      <div className="max-w-sm rounded-print bg-paper p-4 text-ink shadow-(--shadow-print)">
        <p className="label text-signal">{dates}</p>
        <p className="mt-1 font-serif text-2xl sm:text-3xl">{title}</p>
        <p className="mt-1 text-sm leading-snug text-ink-soft">{note}</p>
      </div>
    </div>
  )
}
