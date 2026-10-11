import { Photo } from "@/components/blocks/photo"
import { Reveal } from "@/components/motion/reveal"
import { ScrubText } from "@/components/motion/scrub-text"
import { ButtonLink } from "@/components/ui/button"

/**
 * The turn of the story: a wide crop of someone setting off, and a
 * paragraph that inks itself in word by word as it scrolls past — the
 * reference's "imagine looking forward to your commute" moment.
 */
export function Manifesto({
  text = "Imagine looking forward to the commute. Forgetting what gridlock even felt like. Once flying is part of an ordinary Tuesday, the map of your day gets bigger.",
  cta = "Discover the experience",
}: {
  text?: string
  cta?: string
}) {
  return (
    <section data-header-tone="dark" className="bg-page px-(--spacing-gutter) py-(--spacing-section)">
      <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-7 lg:col-start-4">
          <Photo name="trench-back" position="50% 35%" className="aspect-[16/9] shadow-(--shadow-photo)" />
        </Reveal>
        <div className="flex flex-col gap-8 lg:col-span-8 lg:col-start-4">
          <ScrubText text={text} className="type-head text-h3 leading-[1.12] tracking-[-0.03em] text-ink" />
          <ButtonLink href="/experience" variant="ink" size="sm" className="self-start">
            {cta}
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
