import { Closing } from "@/components/sections/closing"
import { Hero } from "@/components/sections/hero"
import { Pricing } from "@/components/sections/pricing"
import { Reviews } from "@/components/sections/reviews"
import { Spending } from "@/components/sections/spending"
import { Statement } from "@/components/sections/statement"
import { Wealth } from "@/components/sections/wealth"

/**
 * The home page reads as a conversation: what Keel promises (hero), what it is
 * (statement and the product), how it handles spending, how it handles
 * wealth, what it costs and why, what people say, and a last invitation.
 */
export function HomePage() {
  return (
    <>
      <Hero />
      <Statement />
      <Spending />
      <Wealth />
      <Pricing />
      <Reviews />
      <Closing />
    </>
  )
}
