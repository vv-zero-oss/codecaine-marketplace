/**
 * Glovebox — a landing page for a car insurance manager.
 *
 * A pinned hero whose footage a clip-path closes in on while the camera pushes
 * in; three feature cards dealt one under the next; a pinned statistic with
 * work drifting past it; a member map with stories sliding over it; how it
 * works; questions; and a closing frame that clips open the reverse way.
 */

import { useSmoothScroll } from "@/components/motion/use-smooth-scroll"
import { SiteFooter } from "@/components/site-footer"
import { SiteNav } from "@/components/site-nav"
import { Closing } from "@/components/sections/closing"
import { Faq } from "@/components/sections/faq"
import { Features } from "@/components/sections/features"
import { Hero } from "@/components/sections/hero"
import { HowItWorks } from "@/components/sections/how-it-works"
import { Proof } from "@/components/sections/proof"
import { Stat } from "@/components/sections/stat"
import { usePathname } from "@/lib/router"
import { BrandPage } from "@/pages/brand"

const SECTIONS = [
  { id: "top", Section: Hero },
  { id: "features", Section: Features },
  { id: "results", Section: Stat },
  { id: "proof", Section: Proof },
  { id: "how", Section: HowItWorks },
  { id: "faq", Section: Faq },
  { id: "cta", Section: Closing },
]

/** `?only=<id>` renders one block on its own, for screenshots and tests. */
function sections() {
  const only = new URLSearchParams(window.location.search).get("only")
  return only ? SECTIONS.filter((entry) => entry.id === only) : SECTIONS
}

/** `data-canvas-ignore` on the page wrapper and `<main>`: structural, so the
 *  editor looks through them to what they hold. See CLAUDE.md. */
export default function App() {
  useSmoothScroll()
  const pathname = usePathname()

  if (pathname === "/brand") {
    return (
      <div className="min-h-svh overflow-x-clip bg-paper text-ink" data-canvas-ignore>
        <BrandPage />
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="min-h-svh overflow-x-clip bg-paper text-ink" data-canvas-ignore>
      <SiteNav />
      <main data-canvas-ignore>
        {sections().map(({ id, Section }) => (
          <Section key={id} />
        ))}
      </main>
      <SiteFooter />
    </div>
  )
}
