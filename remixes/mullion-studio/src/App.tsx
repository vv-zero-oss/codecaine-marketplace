/**
 * Mullion — image editing for architects.
 *
 * The page reads as the story a practice would ask it to tell: the archive of
 * edited frames (a field you pan by scrolling), the four edits in oversize
 * type, the studio where one frame is split raw against edited, the full set
 * of edits, how it works (held on screen as it is scrolled), why it exists,
 * pricing, questions, and the last ask.
 */

import { ArchiveProvider } from "@/components/archive-state"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { SmoothScroll } from "@/components/smooth-scroll"
import { Archive } from "@/components/sections/archive"
import { Closing } from "@/components/sections/closing"
import { EditBand } from "@/components/sections/edit-band"
import { Faq } from "@/components/sections/faq"
import { Pricing } from "@/components/sections/pricing"
import { Statement } from "@/components/sections/statement"
import { Studio } from "@/components/sections/studio"
import { Toolkit } from "@/components/sections/toolkit"
import { Workflow } from "@/components/sections/workflow"

/** In the order they appear; the id is the section's own `id`, for `?only=`. */
const SECTIONS = [
  { id: "archive", Section: Archive },
  { id: "band", Section: EditBand },
  { id: "studio", Section: Studio },
  { id: "tools", Section: Toolkit },
  { id: "workflow", Section: Workflow },
  { id: "why", Section: Statement },
  { id: "pricing", Section: Pricing },
  { id: "faq", Section: Faq },
  { id: "start", Section: Closing },
]

/** `?only=<id>` renders one block on its own. */
function sections() {
  const only = new URLSearchParams(window.location.search).get("only")
  return only ? SECTIONS.filter((entry) => entry.id === only) : SECTIONS
}

/** `data-canvas-ignore` on the page wrapper and `<main>`: structural, so the
 *  canvas editor looks through them to what they hold. See CLAUDE.md. */
export default function App() {
  return (
    <SmoothScroll>
      <ArchiveProvider>
        <div className="min-h-svh bg-paper text-ink" data-canvas-ignore>
          <SiteHeader />
          <main data-canvas-ignore>
            {sections().map(({ id, Section }) => (
              <Section key={id} />
            ))}
          </main>
          <SiteFooter />
        </div>
      </ArchiveProvider>
    </SmoothScroll>
  )
}
