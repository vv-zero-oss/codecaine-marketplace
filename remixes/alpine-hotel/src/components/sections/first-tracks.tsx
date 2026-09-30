import { Container } from "@/components/ui/container"
import { TextClipParallax } from "@/components/motion/text-clip-parallax"
import { firstTracks } from "@/content"

/** Two words big enough to hold a snowboard run inside them. */
export function FirstTracks({
  lineOne = firstTracks.lineOne,
  lineTwo = firstTracks.lineTwo,
  caption = firstTracks.caption,
}: {
  lineOne?: string
  lineTwo?: string
  caption?: string
}) {
  return (
    <section id="first-tracks" className="bg-snow pt-(--spacing-section) pb-(--spacing-section)">
      <TextClipParallax lineOne={lineOne} lineTwo={lineTwo} src={firstTracks.film.src} poster={firstTracks.film.poster} />
      <Container className="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <p className="max-w-[38ch] text-base leading-snug text-ink sm:text-lg">{caption}</p>
        <p className="text-[13px] text-ink-mute">Sunnegga · 200 m from the door</p>
      </Container>
    </section>
  )
}
