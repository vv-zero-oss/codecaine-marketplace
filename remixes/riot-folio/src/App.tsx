/**
 * Riot Folio — a loud portfolio for one independent builder.
 *
 * Home, work (the case studies and a filterable archive), a case study per
 * project, about, contact and the style guide at `/brand`. Every section is a
 * named component and every page is its own, so the editor's layers panel
 * reads `HomeHero`, `WorkCard`, `QuoteCarousel` rather than `section` and
 * `div.grid`. Words and pictures live in `content.ts`, colours and motion in
 * `index.css`.
 */

import { useSmoothScroll } from "@/components/motion"
import { PageTransition } from "@/components/motion/page-transition"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { TooltipProvider } from "@/components/ui/tooltip"
import { matchPath, usePathname } from "@/lib/router"
import { AboutPage } from "@/pages/about"
import { BrandPage } from "@/pages/brand"
import { CaseStudyPage } from "@/pages/case-study"
import { ContactPage } from "@/pages/contact"
import { HomePage } from "@/pages/home"
import { NotFoundPage } from "@/pages/not-found"
import { WorkPage } from "@/pages/work"

function Page({ path }: { path: string }) {
  if (path === "/") return <HomePage />
  if (path === "/work") return <WorkPage />
  const study = matchPath("/work/:slug", path)
  if (study) return <CaseStudyPage slug={study.slug} />
  if (path === "/about") return <AboutPage />
  if (path === "/contact") return <ContactPage />
  if (path === "/brand") return <BrandPage />
  return <NotFoundPage />
}

/** `data-canvas-ignore` on the page wrapper and `<main>`: structural, with
 *  nothing of their own to design, so the canvas editor looks through them
 *  to what they hold (they stay in its layers panel). See CLAUDE.md. */
export default function App() {
  const lenis = useSmoothScroll()
  const pathname = usePathname()
  const path = pathname.replace(/\/+$/, "") || "/"

  // The old page has blurred out where it stood; go to the top (or to the
  // anchor asked for) before the new one comes in.
  const toTop = () => {
    const anchor = window.location.hash ? document.querySelector(window.location.hash) : null
    if (lenis.current) {
      if (anchor) lenis.current.scrollTo(anchor as HTMLElement, { immediate: true, offset: -96 })
      else lenis.current.scrollTo(0, { immediate: true, force: true })
    } else if (anchor) anchor.scrollIntoView()
    else window.scrollTo(0, 0)
  }

  return (
    <TooltipProvider delayDuration={200}>
      <div className="min-h-screen overflow-x-clip bg-ground text-ink" data-canvas-ignore>
        <SiteHeader />
        <main data-canvas-ignore>
          <PageTransition pageKey={path} onExitComplete={toTop}>
            <Page path={path} />
          </PageTransition>
        </main>
        <SiteFooter />
      </div>
    </TooltipProvider>
  )
}
