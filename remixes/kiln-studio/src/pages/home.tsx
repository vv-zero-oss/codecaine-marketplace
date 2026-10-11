import { ClosingCta } from "@/components/blocks/closing-cta"
import { Clients } from "@/components/sections/home/clients"
import { DisciplinesStory } from "@/components/sections/home/disciplines-story"
import { Manifesto } from "@/components/sections/home/manifesto"
import { Numbers } from "@/components/sections/home/numbers"
import { SelectedWork } from "@/components/sections/home/selected-work"
import { StudioTeaser } from "@/components/sections/home/studio-teaser"
import { WorkSection } from "@/components/sections/home/work-section"

/**
 * Home, as a conversation: here's everything we've made (the wall) → here's
 * what we believe → here's what that looks like, working → here's what
 * we're proudest of → the numbers → who trusted us → the room it happens
 * in → so, what are you making?
 */
export function HomePage() {
  return (
    <>
      <WorkSection />
      <Manifesto />
      <DisciplinesStory />
      <SelectedWork />
      <Numbers />
      <Clients />
      <StudioTeaser />
      <ClosingCta />
    </>
  )
}
