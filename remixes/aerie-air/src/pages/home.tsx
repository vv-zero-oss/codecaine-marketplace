import { PhotoCredits } from "@/components/blocks/photo"
import { DayReplanned } from "@/components/sections/home/day-replanned"
import { DoorToDoor } from "@/components/sections/home/door-to-door"
import { DreamOfFlight } from "@/components/sections/home/dream-of-flight"
import { EngineeringBand } from "@/components/sections/home/engineering-band"
import { HeroFlight } from "@/components/sections/home/hero-flight"
import { Highlights } from "@/components/sections/home/highlights"
import { Manifesto } from "@/components/sections/home/manifesto"
import { News } from "@/components/sections/home/news"
import { SkyStory } from "@/components/sections/home/sky-story"

/**
 * Home, as a story. The promise (skip the street) → what it feels like
 * (highlights) → why it matters (imagine) → how it works (the app) → what
 * it gives back (a day re-planned) → what makes it possible (the machine)
 * → what's happening (notes) → where it came from (the story) → where it's
 * going (dream of flight).
 */
export function HomePage() {
  return (
    <>
      <HeroFlight />
      <Highlights />
      <Manifesto />
      <DoorToDoor />
      <DayReplanned />
      <EngineeringBand />
      <News />
      <SkyStory />
      <DreamOfFlight />
      <div data-header-tone="light" className="bg-sky px-(--spacing-gutter) pb-6">
        <PhotoCredits
          className="text-on-sky-soft [&_a]:text-on-sky"
          names={["cabin-dusk", "wing-pink", "city-haze", "towers-up", "trench-turn", "cabin-smile", "window-city", "pad-garden", "trench-back", "city-sunset", "cabin-calm", "wing-dusk", "pad-aerial", "hangar", "cockpit", "engineer", "river-pink"]}
        />
      </div>
    </>
  )
}
