import { PageHero } from "@/components/blocks/page-hero"
import { Closing } from "@/components/sections/closing"
import { Compare } from "@/components/sections/compare"
import { Faq } from "@/components/sections/faq"
import { Pricing } from "@/components/sections/pricing"
import { pricingPage } from "@/content"

/** Plans, the comparison, and the questions people ask before choosing. */
export function PricingPage() {
  const { hero, cta } = pricingPage
  return (
    <>
      <PageHero title={hero.title} strap={hero.strap} blurb={hero.blurb} />
      <Pricing />
      <Compare />
      <Faq />
      <Closing marquee={cta.marquee} cta={cta.button} />
    </>
  )
}
