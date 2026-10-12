import { useState } from "react"

import { FeatureRow } from "@/components/blocks/feature-row"
import { CityMap } from "@/components/map/city-map"
import { SkyPanel } from "@/components/map/frames"
import { GuidePanel } from "@/components/map/map-guide"
import { ButtonLink } from "@/components/ui/button"
import { placesById } from "@/content/places"
import { pexels, SKIES } from "@/lib/photos"

const PLACES = placesById(["fernhill-park", "lighthouse", "lido", "ferry", "salt-house", "room-eleven", "farmers"])

/**
 * The first look at a Cairn map, and it is a real one: a phone-shaped
 * card floating on a lavender sky, the map on top and its guide below.
 * Tap a row, the map flies there; tap a pin, the row lights up.
 */
export function InteractiveMaps() {
  const [selected, setSelected] = useState<string | null>(null)
  return (
    <FeatureRow
      title="Maps that feel like a place."
      body="Ask for what you want on the map and Cairn finds it, pins it and writes it up. Every map is responsive, fast and works on any device — no code, no API keys."
      action={<ButtonLink href="/studio">Try it for free</ButtonLink>}
      media={
        <SkyPanel photo={pexels(SKIES.lavender, 1100, 900)} className="flex aspect-[476/400] items-center justify-center py-6 md:aspect-[476/420]">
          <div className="flex h-full w-[46%] min-w-[220px] flex-col overflow-hidden rounded-[14px] bg-raised shadow-(--shadow-window)">
            <CityMap
              places={PLACES}
              theme="dusk"
              zoom={1.15}
              centerX={800}
              centerY={330}
              selectedId={selected}
              onSelect={setSelected}
              showCard={false}
              controls={false}
              className="h-[52%] shrink-0"
            />
            <GuidePanel
              heading="A weekend in Halden Bay"
              intro="Seven things to do between the ferry and the lighthouse."
              cover={693751}
              places={PLACES}
              selectedId={selected}
              onSelect={setSelected}
              search={false}
              compact
              className="min-h-0 flex-1 rounded-none shadow-none"
            />
          </div>
        </SkyPanel>
      }
    />
  )
}
