import { SectionIntro } from "@/components/sections/section-intro"
import { Container } from "@/components/ui/container"

export function Partners() {
  return (
    <section id="join" className="bg-ink pt-8 pb-28 sm:pt-[10vh] sm:pb-[22vh]">
      <Container>
        <SectionIntro
          before="Build what endures, with"
          accent="patient"
          after="partners."
          body="We partner early and stay close, supporting founders who advance humanity with capital, storytelling and hands-on help from day one."
          cta="Learn more"
          href="#stories"
        />
      </Container>
    </section>
  )
}
