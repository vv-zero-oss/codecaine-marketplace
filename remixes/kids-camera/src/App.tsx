/**
 * Lumo — a one-page site for a children's camera, built from the canvas
 * scaffold (`scaffold-sdk`) and opted into `@canvas/react` in `main.tsx`.
 *
 * The page reads as a list of sections, each a named component, so the
 * editor's layers panel says `Hero`, `Noticing`, `ThroughTheirEyes` rather
 * than `section` and `div`. Words and pictures live in `content.ts`, every
 * colour, shadow and curve in `index.css`.
 */

import { DoodleWall } from "@/components/sections/doodle-wall"
import { FieldNotes } from "@/components/sections/field-notes"
import { Hero } from "@/components/sections/hero"
import { Makers } from "@/components/sections/makers"
import { MeetProduct } from "@/components/sections/meet-product"
import { Noticing } from "@/components/sections/noticing"
import { Principles } from "@/components/sections/principles"
import { SiteFooter } from "@/components/sections/site-footer"
import { SiteHeader } from "@/components/sections/site-header"
import { ThroughTheirEyes } from "@/components/sections/through-their-eyes"
import { Uses } from "@/components/sections/uses"
import { useSmoothScroll } from "@/hooks/use-smooth-scroll"

/** In the order the story is told. `?only=<id>` renders one on its own, as in
 *  the scaffold — handy for checking a section in the editor. */
const SECTIONS = [
  { id: "hero", Section: Hero },
  { id: "noticing", Section: Noticing },
  { id: "through-their-eyes", Section: ThroughTheirEyes },
  { id: "principles", Section: Principles },
  { id: "product", Section: MeetProduct },
  { id: "uses", Section: Uses },
  { id: "field-notes", Section: FieldNotes },
  { id: "makers", Section: Makers },
  { id: "doodle", Section: DoodleWall },
]

function sections() {
  const only = new URLSearchParams(window.location.search).get("only")
  return only ? SECTIONS.filter((entry) => entry.id === only) : SECTIONS
}

/** `data-canvas-ignore` on the page wrapper and `<main>`: structural, with
 *  nothing of their own to design, so the canvas editor looks through them to
 *  what they hold (they stay in its layers panel). */
export default function App() {
  useSmoothScroll()
  return (
    <div className="min-h-screen bg-paper text-ink" data-canvas-ignore>
      <SiteHeader />
      <main data-canvas-ignore>
        {sections().map(({ id, Section }) => (
          <Section key={id} />
        ))}
      </main>
      <SiteFooter />
    </div>
  )
}
