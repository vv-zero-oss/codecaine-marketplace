import { Closing } from "@/components/sections/closing"
import { Hero } from "@/components/sections/hero"
import { Pricing } from "@/components/sections/pricing"
import { Reviews } from "@/components/sections/reviews"
import { Statement } from "@/components/sections/statement"
import { Progress } from "@/components/sections/progress"
import { Vitals } from "@/components/sections/vitals"

/**
 * The home page reads as a conversation: what Cadence promises (hero), what it
 * is (statement and the product), what it reads from your body day to day,
 * how it shows progress over months, what it costs and why, what people say,
 * and a last invitation.
 */
export function HomePage() {
  return (
    <>
      <Hero />
      <Statement />
      <Vitals />
      <Progress />
      <Pricing />
      <Reviews />
      <Closing />
    </>
  )
}
