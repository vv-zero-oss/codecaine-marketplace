import { useEffect } from "react"

import { PageClosing } from "@/components/sections/platform/page-closing"
import { CompareTable } from "@/components/sections/pricing/compare-table"
import { FreeStrip } from "@/components/sections/pricing/free-strip"
import { PricingFaq } from "@/components/sections/pricing/pricing-faq"
import { PricingPlans } from "@/components/sections/pricing/pricing-plans"

/**
 * Pricing, as a story: the promise and the three plans, what's free on all
 * of them, the full comparison for the careful buyer, the questions people
 * ask, and the sign-up the plan buttons lead to.
 */
export function PricingPage() {
  useEffect(() => {
    const follow = () => {
      const id = window.location.hash.slice(1)
      if (id) window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" }), 60)
    }
    follow()
    window.addEventListener("kestrel:navigate", follow)
    return () => window.removeEventListener("kestrel:navigate", follow)
  }, [])

  return (
    <>
      <PricingPlans />
      <FreeStrip />
      <CompareTable />
      <PricingFaq />
      <PageClosing id="signup" title="Your first card is free." continuation="So is your hundredth." formName="Pricing signup" />
    </>
  )
}
