/**
 * Ember — a landing page for a virtual card company, in the dark.
 *
 * The page reads as a conversation: a card for every purchase (Hero) → what
 * you get (Perks) → why it matters (Manifesto) → free, instant and private
 * (Highlights) → how it works, pinned (StickySteps) → where it fits, sideways
 * (UseCases) → it works abroad (Coverage) → one customer's story, zoomed to
 * full screen (VideoStory) → more voices (Testimonials) → what is left to ask
 * (Faq) → get one (CallToAction). The page is a sheet with rounded bottom
 * corners, lifted off the black footer.
 */

import { SmoothScroll } from "@/components/motion/smooth-scroll"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { CallToAction } from "@/components/sections/call-to-action"
import { Coverage } from "@/components/sections/coverage"
import { Faq } from "@/components/sections/faq"
import { Hero } from "@/components/sections/hero"
import { Highlights } from "@/components/sections/highlights"
import { Manifesto } from "@/components/sections/manifesto"
import { StickySteps } from "@/components/sections/sticky-steps"
import { UseCases } from "@/components/sections/use-cases"
import { VideoStory } from "@/components/sections/video-story"
import { Perks } from "@/components/sections/perks"
import { Testimonials } from "@/components/sections/testimonials"
import { usePathname } from "@/lib/router"
import { BrandPage } from "@/pages/brand"

const SECTIONS = [
  { id: "top", Section: Hero },
  { id: "cards", Section: Perks },
  { id: "why", Section: Manifesto },
  { id: "security", Section: Highlights },
  { id: "how", Section: StickySteps },
  { id: "uses", Section: UseCases },
  { id: "coverage", Section: Coverage },
  { id: "story", Section: VideoStory },
  { id: "reviews", Section: Testimonials },
  { id: "pricing", Section: Faq },
  { id: "get-started", Section: CallToAction },
]

/** `?only=<id>` renders one block on its own — handy for comparing a section in isolation. */
function sections() {
  const only = new URLSearchParams(window.location.search).get("only")
  return only ? SECTIONS.filter((entry) => entry.id === only) : SECTIONS
}

/** `data-canvas-ignore` on the page wrapper, the sheet and `<main>`: structural, nothing to design. */
export default function App() {
  const brand = usePathname() === "/brand"
  return (
    <div className="page-grain bg-footer" data-canvas-ignore>
      <SmoothScroll />
      <div className="relative z-10 rounded-b-panel bg-canvas bg-(image:--atmos-hero) bg-size-[100%_1200px] bg-no-repeat shadow-[0_1px_0_var(--color-hairline)]" data-canvas-ignore>
        {brand ? (
          <BrandPage />
        ) : (
          <>
            <SiteHeader />
            <main data-canvas-ignore>
              {sections().map(({ id, Section }) => (
                <Section key={id} />
              ))}
            </main>
          </>
        )}
      </div>
      <SiteFooter />
    </div>
  )
}
