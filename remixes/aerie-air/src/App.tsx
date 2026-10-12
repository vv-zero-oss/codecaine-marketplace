/**
 * Aerie — an all-electric air taxi, rooftop to rooftop across the city.
 *
 * Every page is a story. Home: the promise (skip the street), what the
 * ride feels like, how booking works, what makes it quiet, who it is built
 * with, what is new, and the city it could make. Experience walks one trip
 * door to door and books a seat; Aircraft opens the machine up; Routes is
 * the network, the timetable of launches and the team. /brand is the
 * system underneath.
 */

import { RouteTransition } from "@/components/motion/route-transition"
import { SmoothScroll } from "@/components/motion/smooth-scroll"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { usePathname } from "@/lib/router"
import { AircraftPage } from "@/pages/aircraft"
import { BrandPage } from "@/pages/brand"
import { ExperiencePage } from "@/pages/experience"
import { HomePage } from "@/pages/home"
import { RoutesPage } from "@/pages/routes"

const PAGES: Record<string, () => React.ReactNode> = {
  "/": HomePage,
  "/experience": ExperiencePage,
  "/aircraft": AircraftPage,
  "/routes": RoutesPage,
  "/brand": BrandPage,
}

/** `data-canvas-ignore` on the page wrapper and `<main>`: structural, with
 *  nothing of their own to design, so the canvas editor looks through them
 *  to what they hold (they stay in its layers panel). See CLAUDE.md. */
export default function App() {
  const pathname = usePathname()
  const Page = PAGES[pathname] ?? HomePage

  return (
    <div className="min-h-screen bg-page text-ink" data-canvas-ignore>
      <SmoothScroll lerp={0.085} />
      <SiteHeader />
      <main data-canvas-ignore className="relative">
        <RouteTransition path={pathname}>
          <Page />
        </RouteTransition>
      </main>
      <SiteFooter />
    </div>
  )
}
