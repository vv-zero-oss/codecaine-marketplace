import { PageHero } from "@/components/blocks/page-hero"
import { Closing } from "@/components/sections/closing"
import { ServerRoom } from "@/components/sections/masthead"
import { CityEdges, NetworkStats, RegionTable } from "@/components/sections/network"
import { networkPage } from "@/content"

/** The edge network: the server room, its numbers, its regions and cities. */
export function NetworkPage() {
  const { hero, cta } = networkPage
  return (
    <>
      <PageHero title={hero.title} strap={hero.strap} blurb={hero.blurb}>
        <ServerRoom traffic={1.6} />
      </PageHero>
      <NetworkStats />
      <RegionTable />
      <CityEdges />
      <Closing marquee={cta.marquee} cta={cta.button} />
    </>
  )
}
