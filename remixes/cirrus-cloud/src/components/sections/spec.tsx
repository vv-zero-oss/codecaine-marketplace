import { Prose, SplitHeading } from "@/components/blocks/split-section"
import { StepRow } from "@/components/blocks/step-row"
import { PixelStream } from "@/components/motion/pixel-stream"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { spec } from "@/content"

/** The product itself: one file that describes every machine. */
export function Spec() {
  return (
    <section id="spec" className="py-[calc(var(--spacing-section)/2)]">
      <Container>
        <div className="grid gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,40.25rem)] lg:gap-x-16">
          <SplitHeading heading={spec.heading} label={spec.label} />
          <div>
            <Prose>
              <p>
                <strong>{spec.lead}</strong> {spec.body}
              </p>
            </Prose>
            <ButtonLink href="#pricing" className="mt-7">
              {spec.cta}
            </ButtonLink>
          </div>
        </div>
        <PixelStream variant="spec" className="mt-12 mb-10" />
        <StepRow steps={spec.steps} />
      </Container>
    </section>
  )
}
