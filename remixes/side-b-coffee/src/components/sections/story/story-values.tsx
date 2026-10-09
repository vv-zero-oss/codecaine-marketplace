import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"

const VALUES = [
  { title: "We pay before the harvest.", body: "Prices are agreed with each producer before a single cherry is picked, and they don't move if the market does." },
  { title: "We roast what's been ordered.", body: "Tuesday's roast is last weekend's orders. Nothing sits on a shelf getting tired." },
  { title: "The record goes on first.", body: "Before the grinder, before the lights. A bar should sound like somebody lives there." },
  { title: "Nobody pours alone.", body: "Every barista trains at the plant, tastes every coffee and gets a say in what we buy next." },
]

/**
 * What we hold to, set big: four lines in the serif with hairlines between
 * them, each rising into place as it arrives, the explanation small beside it.
 */
export function StoryValues() {
  return (
    <section className="border-b border-line py-(--spacing-section)">
      <Container>
        <p className="type-label mb-8 text-[11.5px] text-ink-3">House rules</p>
        <ol className="border-t border-line">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} as="li" delay={i * 0.06} className="grid gap-3 border-b border-line py-8 md:grid-cols-[auto_1fr_minmax(0,32ch)] md:items-baseline md:gap-10">
              <span className="font-mono text-[13px] text-ember-ink tabular">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="type-display text-h2">{v.title}</h3>
              <p className="text-[15px] text-ink-2">{v.body}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  )
}
