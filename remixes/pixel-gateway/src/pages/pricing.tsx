import { Check, Minus } from "lucide-react"

import { PageHero } from "@/components/page-hero"
import { CallToAction } from "@/components/sections/call-to-action"
import { Faq } from "@/components/sections/faq"
import { Pricing } from "@/components/sections/pricing"
import { SeatCalculator } from "@/components/seat-calculator"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"

const ROWS: [string, boolean, boolean, boolean][] = [
  ["TLS inspection and URL filtering", true, true, true],
  ["Shadow AI radar", false, true, true],
  ["Prompt and SaaS DLP", false, true, true],
  ["Instant policy push with rollback", false, true, true],
  ["SSO and SCIM", false, false, true],
  ["Private regions", false, false, true],
]

function Cell({ on }: { on: boolean }) {
  return on ? <Check className="mx-auto size-5 text-good" strokeWidth={4} aria-label="Included" /> : <Minus className="mx-auto size-5 text-fg-subtle" strokeWidth={4} aria-label="Not included" />
}

export function PricingPage() {
  return (
    <>
      <PageHero kicker="pricing" title="Simple prices. No surprise bosses." blurb="Start on your own laptop for free. Add the team and the AI tools when you are ready." />
      <Pricing heading={false} />
      <SeatCalculator />
      <section className="bg-bg py-phi-6 sm:py-phi-7">
        <Container>
          <SectionHeading kicker="compare" title="What each class gets." />
          <div className="mt-phi-4 overflow-x-auto shadow-px [--px-edge:var(--color-line)]">
            <table className="w-full min-w-[34rem] border-collapse text-left text-base">
              <thead className="bg-surface-2 font-display text-label-sm uppercase">
                <tr>
                  <th className="p-phi-2">Feature</th>
                  <th className="p-phi-2 text-center">Player One</th>
                  <th className="p-phi-2 text-center text-accent-hi">Co-op</th>
                  <th className="p-phi-2 text-center">Boss Level</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map(([label, a, b, c]) => (
                  <tr key={label} className="border-t-2 border-line bg-surface">
                    <th scope="row" className="p-phi-2 font-normal">{label}</th>
                    <td className="p-phi-2"><Cell on={a} /></td>
                    <td className="p-phi-2"><Cell on={b} /></td>
                    <td className="p-phi-2"><Cell on={c} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>
      <Faq />
      <CallToAction title="Ready player?" />
    </>
  )
}
