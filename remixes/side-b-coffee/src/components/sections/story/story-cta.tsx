import { Doodle } from "@/components/mock/doodles"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"

/** The last track: flip the record over — go and taste it. */
export function StoryCta() {
  return (
    <section className="bg-ember text-page">
      <Container className="flex flex-col gap-10 py-(--spacing-section) md:flex-row md:items-end md:justify-between">
        <div className="space-y-6">
          <h2 className="type-display text-display">
            Now flip
            <br />
            it over.
          </h2>
          <p className="max-w-[44ch] text-lead text-page/90">That's the story. The rest is in the bag — roasted Tuesday, on your doorstep by Friday.</p>
          <div className="flex flex-wrap gap-2">
            <ButtonLink href="/shop" variant="paper">
              Shop coffee
            </ButtonLink>
            <ButtonLink href="/subscribe" variant="ink">
              Start a subscription
            </ButtonLink>
          </div>
        </div>
        <Doodle name="cup" className="w-36 text-page md:w-48" />
      </Container>
    </section>
  )
}
