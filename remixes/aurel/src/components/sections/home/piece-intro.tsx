import { PieceReveal } from "@/components/motion/piece-reveal"
import { FadeUp } from "@/components/motion/reveal"
import { ButtonLink } from "@/components/ui/button-link"
import { Container } from "@/components/ui/container"
import { home } from "@/content"

/** What the house is: the garment rising through two lines, then the
 *  paragraph that says it plainly, written on the cloth's fading hem. */
export function PieceIntro() {
  const { piece } = home
  return (
    <section id="piece" className="relative">
      <PieceReveal first={piece.first} second={piece.second} image={piece.image} alt={piece.alt} />
      <Container className="relative flex flex-col items-center pt-[4vh] pb-section text-center">
        <FadeUp className="flex max-w-[460px] flex-col items-center gap-6">
          <p className="font-sans text-[clamp(22px,1.75vw,32px)] font-medium leading-[1.12] tracking-[-0.02em] text-balance text-ink">{piece.lead}</p>
          <p className="font-serif text-[clamp(16px,1vw,18px)] leading-[1.6] text-ink-soft">{piece.body}</p>
          <ButtonLink href="/appointments" label={piece.cta} className="mt-6" />
        </FadeUp>
      </Container>
    </section>
  )
}
