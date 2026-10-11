import { Reveal } from "@/components/motion/reveal"
import { StickerField } from "@/components/motion/sticker-field"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"

/**
 * The last ask, said as big as the first, with the things people pin —
 * breakfasts, records, a compass — scattered round it. They drift with the
 * scroll, and you can pick them up.
 */
export function ClosingCta({ title = "Put your world on the map." }: { title?: string }) {
  return (
    <section className="relative overflow-hidden py-40 md:py-44">
      <StickerField />
      <Container className="relative flex flex-col items-center text-center">
        <Reveal className="flex flex-col items-center">
          <h2 className="type-serif max-w-[11ch] text-mega text-ink">{title}</h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/studio" size="lg">
              Try it for free
            </ButtonLink>
            <ButtonLink href="/templates" variant="outline" size="lg">
              See templates
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
