import { FlowDiagram } from "@/components/motion/flow-diagram"
import { PixelMatrix } from "@/components/motion/pixel-matrix"
import { Reveal } from "@/components/motion/reveal"
import { TerminalLog } from "@/components/motion/terminal-log"
import { ArrowLink } from "@/components/ui/arrow-link"
import { Container } from "@/components/ui/container"
import { INTELLIGENCE } from "@/content"

/** One agent at work: its readout in a framed box, then what it does. */
function AgentCard({ card, index }: { card: (typeof INTELLIGENCE.cards)[number]; index: number }) {
  return (
    <Reveal as="article" delay={index * 0.08} className="flex flex-col">
      <div className="relative flex aspect-[541/400] flex-col overflow-hidden border border-line-strong p-5">
        <TerminalLog lines={card.log.join("\n")} interval={2.2 + index * 0.3} />
        <PixelMatrix
          pattern={card.pattern}
          tone={card.tone}
          speed={4.8 + index * 0.4}
          className="absolute top-[20%] left-1/2 w-[45%] -translate-x-1/2"
        />
      </div>
      <p className="mt-6 text-[15px] text-fg-soft">{card.eyebrow}</p>
      <h3 className="type-heading mt-2 text-[24px] text-fg md:text-[28px]">{card.title}</h3>
      <p className="mt-3 max-w-[44ch] text-[15px] leading-[1.5] text-muted md:text-[16px]">{card.body}</p>
      <div className="mt-5">
        <ArrowLink>{card.link}</ArrowLink>
      </div>
    </Reveal>
  )
}

/**
 * How a signal becomes a deal: the flow figure in a hairline frame, the
 * claim beside it, then the three agents that do the work.
 */
export function Intelligence() {
  return (
    <section id="qualify" className="pb-[var(--spacing-section)]">
      <Container>
        <Reveal className="border border-line-strong">
          <div className="relative p-4 md:p-5">
            <TerminalLog lines={INTELLIGENCE.log.join("\n")} />
            <FlowDiagram
              signalsLabel={INTELLIGENCE.left}
              outcomesLabel={INTELLIGENCE.right}
              className="mt-2 md:-mt-4"
            />
            <div className="type-eyebrow mt-2 flex justify-between text-faint">
              <span>{INTELLIGENCE.figure}</span>
              <span>{INTELLIGENCE.status}</span>
            </div>
          </div>
          <div className="grid gap-8 px-6 pt-10 pb-12 md:grid-cols-2 md:gap-12 md:px-[52px] md:pt-12 md:pb-[52px]">
            <div>
              <p className="text-[17px] text-fg-soft">{INTELLIGENCE.eyebrow}</p>
              <h2 className="type-heading mt-5 max-w-[16ch] text-[clamp(30px,2.6vw,44px)] text-fg">{INTELLIGENCE.title}</h2>
            </div>
            <div className="md:pt-1">
              <p className="max-w-[36ch] text-[18px] leading-[1.55] text-fg-soft md:text-[21px]">{INTELLIGENCE.body}</p>
              <div className="mt-6">
                <ArrowLink>{INTELLIGENCE.link}</ArrowLink>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-14 md:grid-cols-3 md:gap-[52px]">
          {INTELLIGENCE.cards.map((card, i) => (
            <AgentCard key={card.title} card={card} index={i} />
          ))}
        </div>
      </Container>
    </section>
  )
}
