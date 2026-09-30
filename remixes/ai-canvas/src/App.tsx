/**
 * Boundless — a one-page site for an AI canvas, built from the canvas
 * scaffold (`sdk-scaffold`) and opted into `@canvas/react` in `main.tsx`.
 *
 * The story, in the order it is read: a night canvas that never stops
 * drifting, washing out to a white page; short scenes that each answer the
 * one before; the product walked through in three pinned steps; people and
 * agents together; an agent building from your system; and a closing call.
 *
 * Words and photographs live in `content.ts`; every colour, shadow and curve
 * in `index.css`; the hero's canvas in `components/canvas/`.
 */

import { useMotionValue } from "motion/react"

import { CallToAction } from "@/components/sections/call-to-action"
import { Hero } from "@/components/sections/hero"
import { KnowsYourSystem } from "@/components/sections/knows-your-system"
import { LivePages } from "@/components/sections/live-pages"
import { Manifesto, Place, Problem, RunFree, Scatter } from "@/components/sections/scenes"
import { SiteFooter } from "@/components/sections/site-footer"
import { SiteHeader } from "@/components/sections/site-header"
import { Together } from "@/components/sections/together"
import { HeroWashContext } from "@/hooks/use-hero-wash"
import { useSmoothScroll } from "@/hooks/use-smooth-scroll"

/** In the order the story is told. `?only=<id>` renders one on its own, as in
 *  the scaffold — handy for checking a section in the editor. */
const SECTIONS = [
  { id: "top", Section: Hero },
  { id: "scatter", Section: Scatter },
  { id: "problem", Section: Problem },
  { id: "manifesto", Section: Manifesto },
  { id: "live", Section: LivePages },
  { id: "together", Section: Together },
  { id: "system", Section: KnowsYourSystem },
  { id: "free", Section: RunFree },
  { id: "place", Section: Place },
  { id: "start", Section: CallToAction },
]

const only = new URLSearchParams(window.location.search).get("only")

/** `data-canvas-ignore` on the page wrapper and `<main>`: structural, with
 *  nothing of their own to design, so the canvas editor looks through them to
 *  what they hold (they stay in its layers panel). */
export default function App() {
  useSmoothScroll()
  // The hero writes how far it has washed out; the header reads it. With the
  // hero filtered out by `?only=`, the page starts on its light face.
  const wash = useMotionValue(only && only !== "top" ? 1 : 0)
  const sections = only ? SECTIONS.filter((entry) => entry.id === only) : SECTIONS

  return (
    <HeroWashContext.Provider value={wash}>
      <div className="min-h-screen bg-paper text-ink" data-canvas-ignore>
        <SiteHeader />
        <main data-canvas-ignore>
          {sections.map(({ id, Section }) => (
            <Section key={id} />
          ))}
        </main>
        <SiteFooter />
      </div>
    </HeroWashContext.Provider>
  )
}
