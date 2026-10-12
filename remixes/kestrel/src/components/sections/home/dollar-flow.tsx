import { SectionHeading } from "@/components/blocks/section-heading"
import { DollarFlowStage } from "@/components/motion/dollar-flow-stage"
import { Container } from "@/components/ui/container"

/**
 * One team lunch, followed from the swipe to the closed books — the product
 * explained as a story rather than a feature list.
 */
export function DollarFlow() {
  return (
    <section id="flow" aria-label="How a dollar moves through Kestrel" className="pt-(--spacing-section)">
      <Container>
        <SectionHeading
          title="How a dollar moves through Kestrel."
          continuation="Five steps. You’ll only notice one."
          body="Follow a single team lunch from the card swipe to the closed books. Most of it happens while everyone’s still at the table."
        />
        <DollarFlowStage stepHeight={80} swap="slide" className="mt-12 lg:mt-4" />
      </Container>
    </section>
  )
}
