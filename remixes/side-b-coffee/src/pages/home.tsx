import { Bars } from "@/components/sections/home/bars"
import { CommunityBoard } from "@/components/sections/home/community-board"
import { FarmToCup } from "@/components/sections/home/farm-to-cup"
import { Featured } from "@/components/sections/home/featured"
import { ListeningBar } from "@/components/sections/home/listening-bar"
import { Manifesto } from "@/components/sections/home/manifesto"
import { MerchShelf } from "@/components/sections/home/merch-shelf"
import { Shelf } from "@/components/sections/home/shelf"
import { SubscriptionBand } from "@/components/sections/home/subscription-band"
import { Wholesale } from "@/components/sections/home/wholesale"

/**
 * The home page, as a record (the hero sits above the header, in App): side A says who we are and what's on the
 * shelf; the flip side is how it's made, how it reaches you, the music,
 * the people and where to find us.
 */
export function HomePage() {
  return (
    <>
      <Manifesto />
      <Featured />
      <Shelf />
      <FarmToCup />
      <SubscriptionBand />
      <ListeningBar />
      <MerchShelf />
      <CommunityBoard />
      <Wholesale />
      <Bars />
    </>
  )
}
