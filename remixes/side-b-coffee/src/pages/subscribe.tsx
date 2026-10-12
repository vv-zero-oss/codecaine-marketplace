import { Builder } from "@/components/sections/subscribe/builder"
import { SubscribeFaq } from "@/components/sections/subscribe/faq"
import { GiftBand } from "@/components/sections/subscribe/gift-band"
import { HowItWorks } from "@/components/sections/subscribe/how-it-works"
import { SubscribeHero } from "@/components/sections/subscribe/subscribe-hero"

/**
 * Subscribe, as a conversation: the promise (never run out), building
 * yours in four steps, what happens after you press start, the questions
 * people ask, and — once you're sold — giving one away.
 */
export function SubscribePage() {
  return (
    <>
      <SubscribeHero />
      <Builder />
      <HowItWorks />
      <SubscribeFaq />
      <GiftBand />
    </>
  )
}
