import { Doodle } from "@/components/blocks/doodle"
import { FeatureDeck } from "@/components/motion/feature-deck"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { PLATFORM } from "@/content"

/**
 * The platform, as a deck of cards: one feature in front, the rest waiting
 * behind it by their tabs, with a hand-drawn note inviting a click.
 */
export function Platform() {
  return (
    <section id="platform" className="relative overflow-hidden py-section">
      {/* The mint light either side of the deck */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-[10%] h-[45%]">
        <div className="absolute -left-[8%] h-full w-[30%] rotate-12 bg-[radial-gradient(closest-side,var(--color-mist),transparent)] blur-2xl" />
        <div className="absolute -right-[8%] h-full w-[30%] -rotate-12 bg-[radial-gradient(closest-side,var(--color-mint),transparent)] opacity-70 blur-2xl" />
      </div>
      <Container className="relative">
        <Reveal className="flex flex-col items-center gap-4 text-center">
          <h2 className="type-display text-[clamp(34px,4.4vw,52px)] text-balance">
            <em className="font-light italic">{PLATFORM.titleStart}</em>
            {PLATFORM.titleRest}
            <br className="hidden sm:block" /> {PLATFORM.titleEnd}
          </h2>
          <p className="max-w-[360px] text-[15px] leading-[1.5] text-ink-muted sm:text-[16px]">{PLATFORM.body}</p>
        </Reveal>
        <div className="relative mx-auto mt-12 max-w-[1000px] md:mt-16">
          <Doodle text={PLATFORM.hint} className="absolute -top-24 right-0 hidden md:flex lg:-right-16" />
          <FeatureDeck />
        </div>
      </Container>
    </section>
  )
}
