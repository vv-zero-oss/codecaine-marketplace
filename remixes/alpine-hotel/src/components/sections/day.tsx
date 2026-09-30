import { Container } from "@/components/ui/container"
import { Chapter } from "@/components/ui/chapter"
import { TornEdge } from "@/components/ui/torn-edge"
import { TextClipParallax } from "@/components/motion/text-clip-parallax"
import { Reveal } from "@/components/motion/reveal"
import { day, firstTracks } from "@/content"

/**
 * What a day here is actually like, as a timetable — times in mono, what
 * happens in the serif, the detail in small type. The snowboard footage in
 * the letters above it is the 08:00 line.
 */
export function Day({ title = day.title, lede = day.lede }: { title?: string; lede?: string }) {
  return (
    <section id="day" className="relative mt-(--spacing-section)">
      <TornEdge tone="paper-deep" seed={11} className="-mb-px" />
      <div className="bg-paper-deep pt-16 pb-(--spacing-section)">
        <Container>
          <Chapter number="03" label="A day" title={title} lede={lede} />
        </Container>
        <TextClipParallax
          lineOne={firstTracks.lineOne}
          lineTwo={firstTracks.lineTwo}
          src={firstTracks.film.src}
          poster={firstTracks.film.poster}
          tone="paper-deep"
          className="mt-10"
        />
        <Container>
          <ol className="mt-6 border-t border-ink">
            {day.rows.map((row, i) => (
              <Reveal key={row.time} delay={i * 0.04} distance={10}>
                <li className="grid grid-cols-[4.5rem_1fr] gap-x-4 border-b border-rule py-5 sm:grid-cols-[7rem_1fr_1.1fr] sm:gap-x-8">
                  <span className="font-mono text-lg text-signal tabular-nums sm:text-xl">{row.time}</span>
                  <span className="font-serif text-xl leading-snug sm:text-2xl">{row.what}</span>
                  <span className="col-start-2 mt-1 text-[15px] leading-relaxed text-ink-soft sm:col-start-3 sm:mt-0">{row.note}</span>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </div>
      <TornEdge tone="paper-deep" seed={23} flip className="-mt-px" />
    </section>
  )
}
