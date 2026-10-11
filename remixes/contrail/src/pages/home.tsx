import { DelayTimeline } from "@/components/sections/home/delay-timeline"
import { EverythingBento } from "@/components/sections/home/everything-bento"
import { FinalCta } from "@/components/sections/home/final-cta"
import { Friends } from "@/components/sections/home/friends"
import { HeroJourney } from "@/components/sections/home/hero-journey"
import { ImportFlights } from "@/components/sections/home/import-flights"
import { Manifesto } from "@/components/sections/home/manifesto"
import { PassportTeaser } from "@/components/sections/home/passport-teaser"
import { PressQuotes } from "@/components/sections/home/press-quotes"
import { Reasons } from "@/components/sections/home/reasons"
import { Testimonials } from "@/components/sections/home/testimonials"

/**
 * Home, as one trip and one argument: the promise and a trip in four phases
 * (hero), who says so (press), why it exists (manifesto), what it knows
 * (everything), how a delay is seen coming (timeline), how flights get in
 * (import), who else is told (friends), what a year adds up to (passport),
 * the small things (reasons), the receipts (reviews), and the last ask.
 */
export function HomePage() {
  return (
    <>
      <HeroJourney />
      <PressQuotes />
      <Manifesto />
      <EverythingBento />
      <DelayTimeline />
      <ImportFlights />
      <Friends />
      <PassportTeaser />
      <Reasons />
      <Testimonials />
      <FinalCta />
    </>
  )
}
