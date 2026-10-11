import { ClosingCta } from "@/components/blocks/closing-cta"
import { PayoutCalculator } from "@/components/sections/pricing/payout-calculator"
import { Plans } from "@/components/sections/pricing/plans"
import { PricingFaq } from "@/components/sections/pricing/pricing-faq"

/** Pricing: what it costs, what you keep, what people ask, the last ask. */
export function PricingPage() {
  return (
    <>
      <Plans />
      <PayoutCalculator />
      <PricingFaq />
      <ClosingCta title="Host the first one" continuation="on us." primary="Start hosting" primaryHref="/create" secondary="Find something tonight" secondaryHref="/discover" />
    </>
  )
}
