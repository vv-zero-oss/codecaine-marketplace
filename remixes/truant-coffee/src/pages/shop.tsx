import { useState } from "react"

import { CtaBand } from "@/components/blocks/cta-band"
import { PageHero } from "@/components/blocks/page-hero"
import { QuickView } from "@/components/sections/shop/quick-view"
import { Shelf } from "@/components/sections/shop/shelf"
import { TasteMap } from "@/components/sections/shop/taste-map"
import { useCanvasAction } from "@canvas/react"

/** Shop, as a story: what's on the shelf, how to choose if you can't, and
 *  how never to have to choose again. */
export function ShopPage() {
  const [open, setOpen] = useState<string | null>(null)
  useCanvasAction("Quick view", (next) => setOpen((next ?? !open) ? "half-day-4" : null), { on: !!open, group: "Shop" })
  return (
    <>
      <PageHero
        eyebrow="Shop · ten coffees, four series"
        title="Pick your|hour"
        intro="Every coffee here was roasted this week and will be in a bag by Wednesday. Bright ones for the morning you got up early on purpose; heavy ones for the evening you didn't go out."
        image="sipper"
        alt="A young man drinking coffee from a striped mug against a misty hillside"
      />
      <Shelf onOpen={setOpen} />
      <TasteMap />
      <CtaBand />
      <QuickView coffeeId={open} onClose={() => setOpen(null)} />
    </>
  )
}
