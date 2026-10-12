import { BrewGuide } from "@/components/sections/home/brew-guide"
import { Collections } from "@/components/sections/home/collections"
import { Hero } from "@/components/sections/home/hero"
import { Mission } from "@/components/sections/home/mission"
import { NeverRunDry } from "@/components/sections/home/never-run-dry"
import { Places } from "@/components/sections/home/places"
import { RoastLog } from "@/components/sections/home/roast-log"

/** The home page, as a story: the promise, what we roast, why, how, the
 *  offer, how to brew it, and where to find us. */
export function HomePage() {
  return (
    <>
      <Hero />
      <Collections />
      <Mission />
      <RoastLog />
      <NeverRunDry />
      <BrewGuide />
      <Places />
    </>
  )
}
