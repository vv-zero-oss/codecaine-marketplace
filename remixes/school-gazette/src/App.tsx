/**
 * The Marlowe Gazette — a school magazine as a vintage broadsheet.
 *
 * The page is a list of sections, in the order a reader meets them: front page,
 * the editor's note, the radio, the scoreboard, the features, the noticeboard,
 * the submissions desk, the letters, the close. Lenis carries the scroll; the
 * whole page is thrown onto the desk on arrival (`PageToss`).
 */

import { PageToss } from "@/components/motion/page-toss"
import { useSmoothScroll } from "@/components/motion"
import { CallToAction } from "@/components/sections/call-to-action"
import { EditorsNote } from "@/components/sections/editors-note"
import { Hero } from "@/components/sections/hero"
import { InsideIssue } from "@/components/sections/inside-issue"
import { LedSection } from "@/components/sections/led-section"
import { Letters } from "@/components/sections/letters"
import { Noticeboard } from "@/components/sections/noticeboard"
import { RadioSection } from "@/components/sections/radio-section"
import { WriteForUs } from "@/components/sections/write-for-us"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { usePathname } from "@/lib/router"
import { BrandPage } from "@/pages/brand"

/** In the order they appear. The id is the section's own `id` attribute. */
const SECTIONS = [
  { id: "top", Section: Hero },
  { id: "editors", Section: EditorsNote },
  { id: "radio", Section: RadioSection },
  { id: "scoreboard", Section: LedSection },
  { id: "inside", Section: InsideIssue },
  { id: "clubs", Section: Noticeboard },
  { id: "write", Section: WriteForUs },
  { id: "letters", Section: Letters },
  { id: "cta", Section: CallToAction },
]

/** `?only=<id>` renders one block on its own, for measuring or previewing a section. */
function sections() {
  const only = new URLSearchParams(window.location.search).get("only")
  return only ? SECTIONS.filter((entry) => entry.id === only) : SECTIONS
}

/** `data-canvas-ignore` on the wrapper and `<main>`: structural, nothing of their own to design. */
export default function App() {
  useSmoothScroll()
  const pathname = usePathname()

  if (pathname === "/brand") {
    return (
      <div className="paper-sheet text-ink" data-canvas-ignore>
        <BrandPage />
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-desk text-ink" data-canvas-ignore>
      <PageToss>
        <SiteHeader />
        <main data-canvas-ignore>
          {sections().map(({ id, Section }) => (
            <Section key={id} />
          ))}
        </main>
        <SiteFooter />
      </PageToss>
    </div>
  )
}
