/**
 * Kerfuffle — a motion studio's site, authored as named components and opted
 * into `@canvas/react` (see `main.tsx`).
 *
 * Six pages and a style guide: home, about, work, a case study per project,
 * what we do, contact and `/brand`. Every page change runs through the blue
 * brush stroke in `components/motion/brush-transition.tsx`; Lenis carries the
 * scroll; everything else moves with Motion or CSS.
 */

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { BrushTransition } from "@/components/motion/brush-transition"
import { SmoothScroll } from "@/components/motion/smooth-scroll"
import { usePathname } from "@/lib/router"
import { AboutPage } from "@/pages/about"
import { BrandPage } from "@/pages/brand"
import { CasePage } from "@/pages/case"
import { ContactPage } from "@/pages/contact"
import { HomePage } from "@/pages/home"
import { WhatWeDoPage } from "@/pages/what-we-do"
import { WorkPage } from "@/pages/work"

function Page({ pathname }: { pathname: string }) {
  if (pathname === "/about") return <AboutPage />
  if (pathname === "/work") return <WorkPage />
  if (pathname.startsWith("/work/")) return <CasePage key={pathname} slug={pathname.slice("/work/".length)} />
  if (pathname === "/what-we-do") return <WhatWeDoPage />
  if (pathname === "/contact") return <ContactPage />
  if (pathname === "/brand") return <BrandPage />
  return <HomePage />
}

/** `data-canvas-ignore` on the page wrapper and `<main>`: structural, with
 *  nothing of their own to design, so the canvas editor looks through them
 *  to what they hold (they stay in its layers panel). See CLAUDE.md. */
export default function App() {
  const pathname = usePathname()
  return (
    <div className="min-h-svh bg-paper text-ink" data-canvas-ignore>
      <SmoothScroll />
      <SiteHeader pathname={pathname} />
      <main data-canvas-ignore>
        <Page pathname={pathname} />
      </main>
      <SiteFooter pathname={pathname} />
      <BrushTransition />
    </div>
  )
}
