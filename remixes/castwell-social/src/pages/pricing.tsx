import { BadgePercent, CreditCard, Gift, Users } from "lucide-react"

import { CtaBand } from "@/components/site/cta-band"
import { Outcomes } from "@/components/sections/home/outcomes"
import { ComparePlans } from "@/components/sections/pricing/compare"
import { PricingFaq } from "@/components/sections/pricing/faq"
import { Plans } from "@/components/sections/pricing/plans"
import { PageHero, type ChipSpec } from "@/components/sections/shared/page-hero"
import { TrustStrip } from "@/components/sections/shared/trust-strip"

const CHIPS: ChipSpec[] = [
  { label: "14-day trial", tone: "mint", icon: <Gift />, depth: 0.25, size: "lg", className: "left-[6%] top-[30%]" },
  { label: "No card to start", tone: "butter", icon: <CreditCard />, depth: 0.2, className: "right-[8%] top-[22%]" },
  { label: "Seats that scale", tone: "periwinkle", icon: <Users />, depth: 0.3, size: "sm", className: "right-[12%] top-[70%]" },
  { label: "Nonprofit pricing", tone: "coral", icon: <BadgePercent />, depth: 0.15, size: "sm", className: "left-[16%] top-[74%]" },
  { tone: "mint", depth: 0.85, size: "lg", className: "left-[30%] top-[14%]" },
  { tone: "coral", depth: 0.8, className: "right-[30%] top-[86%]" },
]

export function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="A whole marketing team for less than one freelancer."
        description="Start free for 14 days on any plan. Every plan includes the scheduler and the video studio; the AI team grows with you."
        cta="Start free"
        secondary="Talk to sales"
        secondaryHref="/pricing#faq"
        chips={CHIPS}
        compact
      />
      <Plans />
      <TrustStrip />
      <ComparePlans />
      <PricingFaq />
      <Outcomes eyebrow="Why teams switch" title="It pays for itself in the first month" />
      <CtaBand title="Try the whole team free for 14 days." />
    </>
  )
}
