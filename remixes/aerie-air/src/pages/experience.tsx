/**
 * Experience — one trip, door to door. The promise (door to door by way of
 * the sky), the five screens of a real morning, the seat you'll sit in,
 * booking that seat, what it costs, the questions people ask next, and the
 * way onward.
 */
import { BookingWidget } from "@/components/sections/experience/booking-widget"
import { CabinSeatMap } from "@/components/sections/experience/cabin-seat-map"
import { ClosingCta } from "@/components/sections/experience/closing-cta"
import { ExperienceFaq } from "@/components/sections/experience/experience-faq"
import { ExperienceHero } from "@/components/sections/experience/experience-hero"
import { FarePlans } from "@/components/sections/experience/fare-plans"
import { TripJourney } from "@/components/sections/experience/trip-journey"

export function ExperiencePage() {
  return (
    <>
      <ExperienceHero />
      <TripJourney />
      <CabinSeatMap />
      <BookingWidget />
      <FarePlans />
      <ExperienceFaq />
      <ClosingCta credits={["trench-turn", "cabin-smile", "window-city", "cabin-dusk", "river-gold", "window-glow"]} />
    </>
  )
}
