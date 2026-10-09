import { ClosingCta } from "@/components/sections/home/closing-cta"
import { Converge } from "@/components/sections/home/converge"
import { DollarFlow } from "@/components/sections/home/dollar-flow"
import { Hero } from "@/components/sections/home/hero"
import { PlatformBento } from "@/components/sections/home/platform-bento"
import { Policy } from "@/components/sections/home/policy"
import { Proof } from "@/components/sections/home/proof"
import { Receipts } from "@/components/sections/home/receipts"
import { Savings } from "@/components/sections/home/savings"
import { Scale } from "@/components/sections/home/scale"
import { TeamStory } from "@/components/sections/home/team-story"

export function HomePage() {
  return (
    <>
      <Hero />
      <Proof />
      <PlatformBento />
      <Converge />
      <DollarFlow />
      <TeamStory />
      <Policy />
      <Scale />
      <Savings />
      <Receipts />
      <ClosingCta />
    </>
  )
}
