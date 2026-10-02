import { Reveal } from "@/components/motion/reveal"
import { AppleIcon } from "@/components/ui/apple-icon"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"

/** The last word: one sentence, one button. */
export function FinalCta() {
  return (
    <section className="py-28 text-center sm:py-40">
      <Container>
        <Reveal>
          <h2 className="display text-[clamp(2rem,5vw,3.25rem)]">Ready when you are</h2>
          <p className="mx-auto mt-3 max-w-sm text-ink-2">Start with one step. Log one thing at a time. Meridian meets you where you are and helps you move forward.</p>
          <ButtonLink href="#download" size="lg" className="mt-7"><AppleIcon /> Download app</ButtonLink>
        </Reveal>
      </Container>
    </section>
  )
}
