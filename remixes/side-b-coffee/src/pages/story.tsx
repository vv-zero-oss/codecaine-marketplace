import { LinerNotes } from "@/components/sections/story/liner-notes"
import { StoryCta } from "@/components/sections/story/story-cta"
import { StoryNumbers } from "@/components/sections/story/story-numbers"
import { StoryOpening } from "@/components/sections/story/story-opening"
import { StoryValues } from "@/components/sections/story/story-values"
import { TheBand } from "@/components/sections/story/the-band"

/**
 * Our story, as an album: the sleeve (who we are), the liner notes (ten
 * years, sideways), the band (who you'll meet), the run-out numbers, the
 * house rules, and the instruction on the label — flip it over.
 */
export function StoryPage() {
  return (
    <>
      <StoryOpening />
      <LinerNotes />
      <TheBand />
      <StoryNumbers />
      <StoryValues />
      <StoryCta />
    </>
  )
}
