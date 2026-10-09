import { SectionHeading } from "@/components/blocks/section-heading"
import { SavingsCalculator } from "@/components/mock/savings-calculator"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { SAVINGS } from "@/content/home-end"

/** Savings: after seeing it work, the visitor prices it for their own team. */
export function Savings() {
  return (
    <section id="savings" className="scroll-mt-20 py-(--spacing-section)">
      <Container>
        <SectionHeading size="display" title={SAVINGS.title} continuation={SAVINGS.continuation} />
        <Reveal delay={0.08} className="mt-12 lg:mt-16">
          <SavingsCalculator />
        </Reveal>
      </Container>
    </section>
  )
}
