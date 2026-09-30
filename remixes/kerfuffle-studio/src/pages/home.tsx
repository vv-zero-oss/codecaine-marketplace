import { CtaBand } from "@/components/layout/site-footer"
import { Hero } from "@/components/sections/hero"
import { Intro } from "@/components/sections/intro"
import { RecentWork } from "@/components/sections/recent-work"
import { ServicesFan } from "@/components/sections/services-fan"
import { Team } from "@/components/sections/team"

export function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <RecentWork />
      <ServicesFan />
      <Team />
      <CtaBand />
    </>
  )
}
