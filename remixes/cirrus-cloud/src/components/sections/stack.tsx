import { CardRail } from "@/components/blocks/card-rail"
import { SplitHeading } from "@/components/blocks/split-section"
import { Container } from "@/components/ui/container"
import { stack } from "@/content"

/** Whatever a team builds with, from the same spec. */
export function Stack() {
  return (
    <section id="stack" className="py-[calc(var(--spacing-section)/2)]">
      <Container>
        <SplitHeading heading={stack.heading.join(" ")} className="max-w-[34rem]" />
        <p className="mt-6 max-w-[40rem] text-body text-ink-soft">{stack.body}</p>
      </Container>
      <CardRail name="Stacks" cards={stack.cards} className="mt-14" />
    </section>
  )
}
