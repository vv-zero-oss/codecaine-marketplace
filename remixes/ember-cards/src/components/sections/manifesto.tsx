import { Container } from "@/components/ui/container"
import { Eyebrow } from "@/components/ui/eyebrow"
import { ScrollText } from "@/components/motion/scroll-text"
import { MANIFESTO } from "@/content"

/** Why Ember exists, in one large paragraph that lights up as it is read. */
export function Manifesto({ eyebrow = MANIFESTO.eyebrow, text = MANIFESTO.text, accent = MANIFESTO.accent }: { eyebrow?: string; text?: string; accent?: string }) {
  return (
    <section id="why" className="py-24 sm:py-40">
      <Container className="max-w-[1080px]">
        <Eyebrow label={eyebrow} className="mb-8" />
        <ScrollText text={text} accent={accent} />
      </Container>
    </section>
  )
}
