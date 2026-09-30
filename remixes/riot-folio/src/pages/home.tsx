import { ClientWall } from "@/components/sections/client-wall"
import { HomeHero } from "@/components/sections/home-hero"
import { ProofLine } from "@/components/sections/proof-line"
import { Testimonials } from "@/components/sections/testimonials"
import { WorkGrid } from "@/components/sections/work-grid"
import { FlightProvider } from "@/components/motion/scroll-flight"

/** Who she is, the work, how much of it, who for, and what they said. */
export function HomePage() {
  return (
    <FlightProvider>
      <HomeHero />
      <WorkGrid />
      <ProofLine />
      <ClientWall />
      <Testimonials />
    </FlightProvider>
  )
}
