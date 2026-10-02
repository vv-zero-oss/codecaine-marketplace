import { CallToAction } from "@/components/sections/call-to-action"
import { DashboardStage } from "@/components/sections/dashboard-stage"
import { CtaBand } from "@/components/cta-band"
import { HowItWorks } from "@/components/sections/how-it-works"
import { Faq } from "@/components/sections/faq"
import { Hero } from "@/components/sections/hero"
import { LogoStrip } from "@/components/sections/logo-strip"
import { Pricing } from "@/components/sections/pricing"
import { Problem } from "@/components/sections/problem"
import { ScrambleFeatures } from "@/components/sections/scramble-features"
import { Stats } from "@/components/sections/stats"
import { Testimonials } from "@/components/sections/testimonials"

/** In the order they appear. The id is the section's own `id` attribute. */
const SECTIONS = [
  { id: "top", Section: Hero },
  { id: "logos", Section: LogoStrip },
  { id: "what", Section: ScrambleFeatures },
  { id: "gateway", Section: DashboardStage },
  { id: "problem", Section: Problem },
  { id: "how", Section: HowItWorks },
  { id: "stats", Section: Stats },
  { id: "players", Section: Testimonials },
  { id: "try", Section: TryBand },
  { id: "pricing", Section: Pricing },
  { id: "faq", Section: Faq },
  { id: "cta", Section: CallToAction },
]

function TryBand() {
  return <CtaBand title="See a request get stopped." body="Send a fake phishing link through the gateway in your browser." primary="Try the simulator" to="/how-it-works#try" tone="surface" />
}

/** `?only=<id>` renders one block on its own. It filters the list rather than
 *  wrapping each block, so every section still reports its own name. */
function sections() {
  const only = new URLSearchParams(window.location.search).get("only")
  return only ? SECTIONS.filter((entry) => entry.id === only) : SECTIONS
}

export function HomePage() {
  return (
    <>
      {sections().map(({ id, Section }) => (
        <Section key={id} />
      ))}
    </>
  )
}
