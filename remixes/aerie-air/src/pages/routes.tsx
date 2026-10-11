import { Careers } from "@/components/sections/routes/careers"
import { LaunchTimeline } from "@/components/sections/routes/launch-timeline"
import { OurStory } from "@/components/sections/routes/our-story"
import { Partners } from "@/components/sections/routes/partners"
import { RouteHero } from "@/components/sections/routes/route-hero"
import { TimeBack } from "@/components/sections/routes/time-back"
import { Waitlist } from "@/components/sections/routes/waitlist"
import type { PhotoName } from "@/lib/photos"

const CREDITS: PhotoName[] = ["briefcase", "trench-walk", "cabin-calm", "wing-dusk", "river-gold", "traffic", "pad-aerial", "pad-rooftop", "engineer", "hangar", "city-haze"]

/**
 * Routes — the network, the city, the people. The map answers "where can
 * it take me?"; time back answers "is that worth it?"; the launch timeline
 * "when?"; our story "who are you?"; partners "who else is in?"; careers
 * "can I help?"; and the waitlist asks the reader to come along.
 */
export function RoutesPage() {
  return (
    <>
      <RouteHero />
      <TimeBack />
      <LaunchTimeline />
      <OurStory />
      <Partners />
      <Careers />
      <Waitlist credits={CREDITS} />
    </>
  )
}
