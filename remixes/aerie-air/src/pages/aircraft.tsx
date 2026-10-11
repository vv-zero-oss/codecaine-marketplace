import { AircraftCta } from "@/components/sections/aircraft/aircraft-cta"
import { AircraftHero } from "@/components/sections/aircraft/aircraft-hero"
import { Anatomy } from "@/components/sections/aircraft/anatomy"
import { BuiltByPeople } from "@/components/sections/aircraft/built-by-people"
import { ChargeDay } from "@/components/sections/aircraft/charge-day"
import { FlightTransition } from "@/components/sections/aircraft/flight-transition"
import { MotorRedundancy } from "@/components/sections/aircraft/motor-redundancy"
import { NoiseCompare } from "@/components/sections/aircraft/noise-compare"

/**
 * Aircraft — "the machine that makes it quiet". The craft itself, then one
 * flight from roof to roof, what it sounds like, what is inside it, what
 * happens when part of it stops, how it keeps flying all day, who builds
 * it, and an invitation to hear it.
 */
export function AircraftPage() {
  return (
    <>
      <AircraftHero />
      <FlightTransition />
      <NoiseCompare />
      <Anatomy />
      <MotorRedundancy />
      <ChargeDay />
      <BuiltByPeople />
      <AircraftCta />
    </>
  )
}
