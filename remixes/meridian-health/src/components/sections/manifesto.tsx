import { Container } from "@/components/ui/container"
import { ScrollText } from "@/components/motion/scroll-text"

/** A pause between the proof and the product: one paragraph that reads itself in as you scroll. */
export function Manifesto() {
  return (
    <section className="py-28 sm:py-44">
      <Container>
        <p className="mb-6 text-center text-xs font-medium tracking-widest text-ink-3 uppercase">Why Meridian</p>
        <ScrollText
          className="display mx-auto max-w-[22ch] justify-center text-center text-[clamp(1.9rem,5vw,3.5rem)]"
          text="Your body talks all day. Your watch hears it, your bloodwork confirms it, and nobody translates. Meridian does."
        />
      </Container>
    </section>
  )
}
