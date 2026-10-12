import { useState } from "react"
import { useCanvasAction } from "@canvas/react"

import { CustomersHero } from "@/components/sections/customers/customers-hero"
import { FeaturedStory } from "@/components/sections/customers/featured-story"
import { LogoWall } from "@/components/sections/customers/logo-wall"
import { StoryGrid } from "@/components/sections/customers/story-grid"
import { StoryReader } from "@/components/sections/customers/story-reader"
import { PageClosing } from "@/components/sections/platform/page-closing"
import { FEATURED, type Story } from "@/content/customers"

/**
 * Customers, as a story: the number (hero), the one story to read first
 * (featured), every other team filterable by industry (grid), the wall of
 * names, and the ask. Any story opens in the reader sheet.
 */
export function CustomersPage() {
  const [reading, setReading] = useState<Story | null>(null)
  useCanvasAction("Customer story", (next) => setReading((next ?? !reading) ? FEATURED : null), { on: !!reading, group: "Customers" })

  return (
    <>
      <CustomersHero />
      <FeaturedStory story={FEATURED} onRead={() => setReading(FEATURED)} />
      <StoryGrid onRead={setReading} />
      <LogoWall />
      <PageClosing title="Your story starts" continuation="with one free card." formName="Customers signup" />
      <StoryReader story={reading} onClose={() => setReading(null)} />
    </>
  )
}
