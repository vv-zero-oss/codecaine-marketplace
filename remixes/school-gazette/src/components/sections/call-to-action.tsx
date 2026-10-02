import { Masthead } from "@/components/masthead"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"

/** The closing band: the question the page has been building to, in the biggest type on it. */
export function CallToAction() {
  return (
    <section id="cta" className="border-t-4 border-double border-ink">
      <Container className="flex flex-col items-center gap-8 py-14 text-center">
        <p className="kicker text-ink-soft">Issue 4 closes on 20 November</p>
        <Masthead text="YOUR NAME HERE" tone="rust" />
        <p className="max-w-lg text-[clamp(1.05rem,2vw,1.3rem)] leading-snug">Every name in this paper started as someone who said “I could write that.” Say it, then send it.</p>
        <ButtonLink href="#write" variant="ink" size="lg">Send us your story</ButtonLink>
      </Container>
    </section>
  )
}
