import { SectionRail } from "@/components/motion/section-rail"
import { ClosingCall } from "@/components/blocks/closing-call"
import { ArchiveWall } from "@/components/sections/home/archive-wall"
import { CraftFrame } from "@/components/sections/home/craft-frame"
import { HomeHero } from "@/components/sections/home/home-hero"
import { HouseVerse } from "@/components/sections/home/house-verse"
import { PieceIntro } from "@/components/sections/home/piece-intro"
import { ProcessBand } from "@/components/sections/home/process-band"
import { WardrobeSplit } from "@/components/sections/home/wardrobe-split"

export function HomePage() {
  return (
    <>
      <SectionRail sections="top,piece,craft,process,wardrobe,archive,verse,closing" />
      <HomeHero />
      <PieceIntro />
      <CraftFrame />
      <ProcessBand />
      <WardrobeSplit />
      <ArchiveWall />
      <HouseVerse />
      <ClosingCall />
    </>
  )
}
