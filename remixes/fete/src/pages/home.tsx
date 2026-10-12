import { ClosingCta } from "@/components/blocks/closing-cta"
import { Categories, Communities, UpcomingMajor } from "@/components/sections/home/directory"
import { Hero } from "@/components/sections/home/hero"
import { HostStory } from "@/components/sections/home/host-story"
import { HostVoices } from "@/components/sections/home/host-voices"
import { SayYes } from "@/components/sections/home/say-yes"

/** The home page, as a list of what it says, in order. */
export function HomePage() {
  return (
    <>
      <Hero />
      <UpcomingMajor />
      <HostStory />
      <SayYes />
      <Communities />
      <Categories />
      <HostVoices />
      <ClosingCta />
    </>
  )
}
