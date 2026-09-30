import { PixelSteps } from "@/components/motion/pixel-steps"
import { CtaBand } from "@/components/site/cta-band"
import { Channels } from "@/components/sections/home/channels"
import { HomeHero } from "@/components/sections/home/hero"
import { HowItWorks } from "@/components/sections/home/how-it-works"
import { Insights } from "@/components/sections/home/insights"
import { Outcomes } from "@/components/sections/home/outcomes"
import { Pillars } from "@/components/sections/home/pillars"
import { TrustStrip } from "@/components/sections/shared/trust-strip"

export function HomePage() {
  return (
    <>
      <HomeHero />
      <PixelSteps rise="up" columns={15} rows={6} lead="right" />
      <TrustStrip />
      <Pillars />
      <Outcomes />
      <HowItWorks />
      <Channels />
      <PixelSteps rise="up" columns={15} rows={5} className="mt-(--spacing-section)" />
      <Insights />
      <PixelSteps rise="down" columns={15} rows={5} lead="right" />
      <CtaBand />
    </>
  )
}
