import { CtaBand } from "@/components/blocks/cta-band"
import { PageHero } from "@/components/blocks/page-hero"
import { Compare } from "@/components/sections/pricing/compare"
import { Faq } from "@/components/sections/pricing/faq"
import { Gift } from "@/components/sections/pricing/gift"
import { Plans } from "@/components/sections/pricing/plans"

/**
 * Pricing, as a short conversation: what's free and what Pro adds (plans),
 * the detail for people who read the small print (compare), giving it to
 * someone else (gift), the questions left (FAQ), and the ask.
 */
export function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="One flight free."
        turn="Every flight after, calmer."
        lead="Start with your next trip on us, every Pro feature switched on. If you fly more than twice a year, Pro pays for itself the first time it gets you onto an earlier flight."
      />
      <Plans />
      <Compare />
      <Gift />
      <Faq />
      <CtaBand secondary={{ label: "See your passport", href: "/passport" }} />
    </>
  )
}
