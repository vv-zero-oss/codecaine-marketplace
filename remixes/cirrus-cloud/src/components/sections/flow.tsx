import { SplitHeading } from "@/components/blocks/split-section"
import { StepRow } from "@/components/blocks/step-row"
import { PixelStream } from "@/components/motion/pixel-stream"
import { Container } from "@/components/ui/container"
import { flow } from "@/content"

/** How it works: four verbs, and a diagram of options narrowing into a build. */
export function Flow() {
  return (
    <section id="how" className="py-[calc(var(--spacing-section)/2)]">
      <Container>
        <SplitHeading heading={flow.heading.join(" ")} className="max-w-[24rem]" />
        <p className="mt-10 max-w-[32.5rem] text-body text-ink-soft">{flow.body}</p>
        <PixelStream variant="explore" className="mt-12 mb-10" />
        <StepRow steps={flow.steps} />
      </Container>
    </section>
  )
}
