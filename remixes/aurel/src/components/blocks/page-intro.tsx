import { FadeUp } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"

/** How every inner page opens: eyebrow, a large mixed title, one paragraph. */
export function PageIntro({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  return (
    <Container className="pt-[clamp(140px,22vh,240px)] pb-[clamp(56px,9vh,120px)]">
      <FadeUp>
        <SectionHeading as="h1" eyebrow={eyebrow} title={title} size="xl" />
      </FadeUp>
      <FadeUp delay={0.12} className="mx-auto mt-8 max-w-[520px] text-center">
        <p className="font-serif text-[clamp(17px,1.15vw,20px)] leading-[1.6] text-ink-soft">{intro}</p>
      </FadeUp>
    </Container>
  )
}
