import { LatencyArt, PriceArt, UptimeArt } from "@/components/art/pixel-art"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"

const CARDS = [
  { Art: LatencyArt, title: "Fast", text: "Answers start in under 200 ms at the median, so voice and chat feel like conversation, not a queue." },
  { Art: PriceArt, title: "Predictable", text: "Pay for tokens you use. No seats, no minimums, and the rate card is the whole bill." },
  { Art: UptimeArt, title: "Dependable", text: "Multi-region failover and a public status page. Incidents are posted when they start, not after." },
]

/** Three reasons teams switch, each with a small illustration built from squares. */
export function Why() {
  return (
    <section id="why" className="pb-24 sm:pb-32">
      <Container>
        <Reveal>
          <SectionHeading title="Why teams switch" sub="Simplify the everyday parts of running models so your team can focus on the product." />
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {CARDS.map(({ Art, title, text }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <article className="h-full border border-line bg-surface">
                <div className="h-56">
                  <Art />
                </div>
                <div className="p-6 pt-4">
                  <h3 className="font-serif text-[28px] leading-none tracking-[-0.01em]">{title}</h3>
                  <p className="mt-3 text-[13px] leading-relaxed text-ink-2">{text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
