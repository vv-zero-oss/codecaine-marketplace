import { Container } from "@/components/ui/container"
import { intro } from "@/content"

/** A paragraph set big, as the page's opening line of argument. */
export function Intro() {
  return (
    <section id="intro" className="pt-[clamp(4rem,2rem+8vw,11rem)] pb-[clamp(3.5rem,2rem+5vw,9rem)]">
      <Container>
        <p className="max-w-[72rem] text-lede text-ink">{intro}</p>
      </Container>
    </section>
  )
}
