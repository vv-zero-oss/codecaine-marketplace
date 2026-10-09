import { Reveal } from "@/components/motion/reveal"
import { SerifHead } from "@/components/sections/section-title"
import { StoryCard } from "@/components/sections/story-card"
import { STORIES } from "@/content/stories"

/**
 * "Selected stories": a narrow, a wide and a narrow, then four across — the
 * reference's rhythm. Each card opens the reader.
 */
export function SelectedStories({
  title = "Selected Stories",
  blurb = "Ordinary Matter follows the lives, spaces and stories of people who make things by hand, wherever they are.",
}: {
  title?: string
  blurb?: string
}) {
  const [a, b, c, ...rest] = [STORIES[11], STORIES[1], STORIES[5], STORIES[4], STORIES[9], STORIES[6], STORIES[8]]
  return (
    <section className="px-gutter py-section">
      <Reveal>
        <SerifHead title={title} blurb={blurb} href="/stories" />
      </Reveal>
      <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-12 md:mt-20 md:grid-cols-4 md:gap-x-[3.2vw] md:gap-y-16">
        <Reveal className="md:col-span-1">
          <StoryCard story={a} />
        </Reveal>
        <Reveal delay={0.06} className="col-span-2 row-start-1 md:row-start-auto">
          <StoryCard story={b} ratio="wide" sizes="(min-width: 768px) 46vw, 92vw" />
        </Reveal>
        <Reveal delay={0.12}>
          <StoryCard story={c} />
        </Reveal>
        {rest.map((s, i) => (
          <Reveal key={s.slug} delay={0.04 * i}>
            <StoryCard story={s} ratio="tall" />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
