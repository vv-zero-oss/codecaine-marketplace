import { CornerLabels } from "@/components/blocks/corner-label"
import { PhotoCredits } from "@/components/blocks/photo"
import { AircraftSide } from "@/components/mock/aircraft"
import { Reveal } from "@/components/motion/reveal"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"

/** The close: the quiet is easier to hear than to read about. */
export function AircraftCta({
  title = "Hear it for yourself.",
  lead = "First passenger flights in spring 2027. Book a seat on one, or come to a demonstration at Midtown Roof and stand underneath it.",
}: {
  title?: string
  lead?: string
}) {
  return (
    <section data-header-tone="light" className="overflow-hidden border-b border-white/15 bg-sky pt-(--spacing-section) pb-12 text-on-sky">
      <Container>
        <CornerLabels left="Coming spring 2027" right="Rooftop to rooftop" className="text-on-sky-soft" />
        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end">
          <Reveal className="flex flex-col items-start gap-8">
            <h2 className="type-head max-w-[10ch] text-mega text-balance">{title}</h2>
            <p className="max-w-[40ch] text-lead text-on-sky-soft">{lead}</p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/experience" variant="cream" size="lg">
                Book a first flight
              </ButtonLink>
              <ButtonLink href="/routes" variant="outline-light" size="lg">
                See the routes
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <AircraftSide mode="cruise" tone="light" />
          </Reveal>
        </div>
        <PhotoCredits names={["hangar", "engineer", "motor-hands"]} className="mt-20 text-on-sky-soft md:mt-28" />
      </Container>
    </section>
  )
}
