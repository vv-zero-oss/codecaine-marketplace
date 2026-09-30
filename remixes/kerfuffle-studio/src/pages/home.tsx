import { CtaBand } from "@/components/layout/site-footer"
import { Clients } from "@/components/sections/clients"
import { Hero } from "@/components/sections/hero"
import { Intro } from "@/components/sections/intro"
import { RecentWork } from "@/components/sections/recent-work"
import { Services } from "@/components/sections/services"
import { Team } from "@/components/sections/team"

export function HomePage() {
  return (
    <>
      <Hero />
      <Clients />
      <RecentWork />
      <Services index="02" />
      <Intro index="03" />
      <Team index="04" />
      <CtaBand />
    </>
  )
}
