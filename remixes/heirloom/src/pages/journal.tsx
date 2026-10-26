import { JournalGrid, Newsletter } from "@/components/sections/journal"
import { PageHero } from "@/components/sections/page-hero"
import { PAGE_HEROES } from "@/content"

export function JournalPage() {
  return (
    <>
      <PageHero
        eyebrow="Journal"
        before="Notes on patient"
        accent="capital."
        body="Essays from our partners, letters to members and the founders we back, in their own words."
        {...PAGE_HEROES.journal}
      />
      <JournalGrid />
      <Newsletter />
    </>
  )
}
