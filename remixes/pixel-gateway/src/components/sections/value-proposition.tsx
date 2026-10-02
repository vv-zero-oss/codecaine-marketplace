import { Check, Minus } from "lucide-react"

import { CountUp } from "@/components/motion/count-up"
import { Reveal } from "@/components/motion/reveal"
import { TiltCard } from "@/components/motion/tilt-card"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { COMPARE, PILLARS } from "@/content"

/**
 * The promise in one screen: three pillars, each with its number, then the old
 * way and the new way row by row. The heading sits in the narrow column and the
 * pillars in the wide one, a φ split.
 */
export function ValueProposition() {
  return (
    <section id="value" className="bg-bg py-phi-6 sm:py-phi-7">
      <Container>
        <SectionHeading kicker="why it is different" title="Nothing in the way." blurb="Most gateways make you pay for protection with speed. Pixelkeep checks on the device, so you do not." />
        <ul className="mt-phi-5 grid gap-phi-4 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <li key={p.title}>
              <Reveal delay={i * 0.08} className="h-full">
                <TiltCard maxTilt={8} lift={10} className="flex h-full flex-col gap-phi-3 bg-surface p-phi-3 shadow-px-drop [--px-drop:rgba(0,0,0,0.5)] [--px-edge:var(--color-line)] sm:p-phi-4">
                  <p className="font-display text-2xl text-accent-hi [transform:translateZ(28px)]"><CountUp value={p.value} suffix={p.suffix} /></p>
                  <h3 className="text-xl font-semibold">{p.title}</h3>
                  <p className="text-base text-fg-muted">{p.body}</p>
                </TiltCard>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
      <Container className="mt-phi-6">
        <Reveal>
          <div className="overflow-x-auto shadow-px [--px-edge:var(--color-line)]">
            <table className="w-full min-w-[34rem] border-collapse text-left">
              <caption className="sr-only">The old way compared with Pixelkeep</caption>
              <thead className="bg-surface-2 font-display text-label uppercase">
                <tr>
                  <th scope="col" className="p-phi-3 font-normal text-fg-subtle">&nbsp;</th>
                  <th scope="col" className="p-phi-3 font-normal text-fg-muted">The old gateway</th>
                  <th scope="col" className="p-phi-3 font-normal text-accent-hi">Pixelkeep</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((r) => (
                  <tr key={r.row} className="border-t-2 border-line bg-surface">
                    <th scope="row" className="p-phi-3 text-base font-semibold">{r.row}</th>
                    <td className="p-phi-3 text-base text-fg-muted"><span className="inline-flex items-start gap-phi-1"><Minus className="mt-1 size-4 shrink-0 text-fg-subtle" strokeWidth={4} />{r.legacy}</span></td>
                    <td className="p-phi-3 text-base"><span className="inline-flex items-start gap-phi-1"><Check className="mt-1 size-4 shrink-0 text-good" strokeWidth={4} />{r.keep}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
