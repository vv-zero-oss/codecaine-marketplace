/**
 * Arcline — a landing page for an AI CRM.
 *
 * The page reads as a list of sections, in the order a visitor's questions
 * come: what is it (Hero), can I trust it (Intro), how does it work
 * (Intelligence), what's new (Showcase), what does it do (Features), what is
 * it like (Workspace), does it work (Proof), what does it cost (Pricing),
 * what about… (Faq), what else (Journal) and — now what (CallToAction).
 */

import { SmoothScroll } from "@/components/motion/smooth-scroll"
import { CallToAction } from "@/components/sections/call-to-action"
import { Faq } from "@/components/sections/faq"
import { Features } from "@/components/sections/features"
import { Hero } from "@/components/sections/hero"
import { Intelligence } from "@/components/sections/intelligence"
import { Intro } from "@/components/sections/intro"
import { Journal } from "@/components/sections/journal"
import { Pricing } from "@/components/sections/pricing"
import { Proof } from "@/components/sections/proof"
import { Showcase } from "@/components/sections/showcase"
import { Workspace } from "@/components/sections/workspace"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"

const SECTIONS = [
  { id: "top", Section: Hero },
  { id: "intro", Section: Intro },
  { id: "qualify", Section: Intelligence },
  { id: "agents", Section: Showcase },
  { id: "features", Section: Features },
  { id: "workspace", Section: Workspace },
  { id: "customers", Section: Proof },
  { id: "pricing", Section: Pricing },
  { id: "faq", Section: Faq },
  { id: "blog", Section: Journal },
  { id: "cta", Section: CallToAction },
]

/** `?only=<id>` renders one section on its own, for screenshots and checks. */
function sections() {
  const only = new URLSearchParams(window.location.search).get("only")
  return only ? SECTIONS.filter((entry) => entry.id === only) : SECTIONS
}

/** `data-canvas-ignore` on the page wrapper and `<main>`: structural, so the
 *  canvas editor looks through them (they stay in its layers panel). */
export default function App() {
  return (
    <div className="min-h-screen bg-ink text-fg" data-canvas-ignore>
      <SmoothScroll />
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
