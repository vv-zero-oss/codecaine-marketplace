/**
 * Kiln Studio — a technology-led creative studio in Lisbon and Montréal.
 *
 * Every page is a story. Home: the work, all of it, as a wall you drag
 * (or an index you read), then what the studio believes, what it makes —
 * experience, product, communication, each one a working device on a pinned
 * stage — the work it's proudest of, the numbers, who it works with, the
 * room it works in, and the ask. Studio is how and who; Careers is who's
 * next; each case study is one project told brief → idea → what we made →
 * what happened. `/brand` is the system underneath.
 */

import { IntroLoader } from "@/components/motion/intro-loader"
import { RouteTransition } from "@/components/motion/route-transition"
import { SmoothScroll } from "@/components/motion/smooth-scroll"
import { BottomBar } from "@/components/site/bottom-bar"
import { ContactProvider } from "@/components/site/contact-sheet"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { TooltipProvider } from "@/components/ui/tooltip"
import { FilterPanel } from "@/components/work/filter-panel"
import { WorkProvider } from "@/components/work/work-state"
import { usePathname } from "@/lib/router"
import { BrandPage } from "@/pages/brand"
import { CareersPage } from "@/pages/careers"
import { HomePage } from "@/pages/home"
import { ProjectPage } from "@/pages/project"
import { StudioPage } from "@/pages/studio"

function page(pathname: string) {
  if (pathname.startsWith("/work/")) return <ProjectPage slug={pathname.slice("/work/".length)} />
  if (pathname === "/studio") return <StudioPage />
  if (pathname === "/careers") return <CareersPage />
  if (pathname === "/brand") return <BrandPage />
  return <HomePage />
}

/** `data-canvas-ignore` on the page wrapper and `<main>`: structural, with
 *  nothing of their own to design, so the canvas editor looks through them
 *  to what they hold (they stay in its layers panel). See CLAUDE.md. */
export default function App() {
  const pathname = usePathname()
  return (
    <TooltipProvider delayDuration={300}>
      <ContactProvider>
        <WorkProvider>
          <div className="min-h-screen bg-page text-ink" data-canvas-ignore>
            <SmoothScroll lerp={0.09} />
            {pathname === "/" && <IntroLoader />}
            <SiteHeader />
            <main data-canvas-ignore className="relative">
              <RouteTransition path={pathname}>{page(pathname)}</RouteTransition>
            </main>
            <SiteFooter />
            <BottomBar />
            <FilterPanel />
          </div>
        </WorkProvider>
      </ContactProvider>
    </TooltipProvider>
  )
}
