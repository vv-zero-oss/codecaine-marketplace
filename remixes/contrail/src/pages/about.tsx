import { CtaBand } from "@/components/blocks/cta-band"
import { PageHero } from "@/components/blocks/page-hero"
import { Offices } from "@/components/sections/about/offices"
import { PressCareers } from "@/components/sections/about/press-careers"
import { StoryChapters } from "@/components/sections/about/story-chapters"
import { Team } from "@/components/sections/about/team"
import { Values } from "@/components/sections/about/values"

/**
 * About: why it started (hero), how it grew (chapters), what it holds to
 * (values), who makes it (team), where (offices), and how to write about or
 * join it (press and careers).
 */
export function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="We missed a connection in Frankfurt."
        turn="Then we built the app we needed."
        lead="Contrail started with pilots and dispatchers who knew how much a passenger isn't told. It's still made by them — and by a few people who just fly a lot."
      />
      <StoryChapters />
      <Values />
      <Team />
      <Offices />
      <PressCareers />
      <CtaBand title="Fly with the people who built it for themselves." secondary={{ label: "Read the brand guide", href: "/brand" }} />
    </>
  )
}
