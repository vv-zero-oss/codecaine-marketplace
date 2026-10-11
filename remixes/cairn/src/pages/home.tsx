import { ClosingCta } from "@/components/sections/home/closing-cta"
import { Embed } from "@/components/sections/home/embed"
import { Hero } from "@/components/sections/home/hero"
import { InteractiveMaps } from "@/components/sections/home/interactive-maps"
import { MapStory } from "@/components/sections/home/map-story"
import { OwnData } from "@/components/sections/home/own-data"
import { Press } from "@/components/sections/home/press"
import { StudioPreview } from "@/components/sections/home/studio-preview"
import { TemplatesPreview } from "@/components/sections/home/templates-preview"
import { Voices } from "@/components/sections/home/voices"

/**
 * Home, as a conversation. The promise and who it's for (hero) → people
 * already talk about it (press) → what a map feels like (interactive) →
 * how one gets made (the pinned story) → where it goes (embed) → it can be
 * your data (spreadsheet) → you needn't start blank (templates) → the tool
 * itself, live (studio) → it works for people like you (voices) → go.
 */
export function HomePage() {
  return (
    <>
      <Hero />
      <Press />
      <InteractiveMaps />
      <MapStory />
      <Embed />
      <OwnData />
      <TemplatesPreview />
      <StudioPreview />
      <Voices />
      <ClosingCta />
    </>
  )
}
