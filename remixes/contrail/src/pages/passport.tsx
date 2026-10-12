import { useState } from "react"
import { useCanvasAction } from "@canvas/react"

import { CtaBand } from "@/components/blocks/cta-band"
import { RouteAtlas } from "@/components/sections/passport/route-atlas"
import { ShareCard } from "@/components/sections/passport/share-card"
import { YearHero } from "@/components/sections/passport/year-hero"
import { YearNumbers } from "@/components/sections/passport/year-numbers"
import { PASSPORT } from "@/lib/flights"

/**
 * Passport: a year of flying told as a story — how far (cover), where
 * (atlas), when, through where, on what and how late (numbers), and the card
 * you post about it (share). One switch on the cover changes the year for
 * every section.
 */
export function PassportPage() {
  const [year, setYear] = useState(2025)
  const data = PASSPORT.find((p) => p.year === year) ?? PASSPORT[1]
  PASSPORT.forEach((p) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useCanvasAction(`Passport — ${p.year}`, () => setYear(p.year), { on: year === p.year, group: "Passport year" })
  })
  return (
    <>
      <YearHero data={data} onYear={setYear} />
      <RouteAtlas data={data} />
      <YearNumbers data={data} onYear={setYear} />
      <ShareCard data={data} />
      <CtaBand title="Start your passport with your next flight." body="And import the ones you've already taken — every year you've flown, kept somewhere nice." secondary={{ label: "Compare plans", href: "/pricing" }} />
    </>
  )
}
