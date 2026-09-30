/**
 * Castwell — a social media command center run by an AI marketing team.
 *
 * Five pages behind a small router (`lib/router.tsx`): Home, AI Marketing
 * Manager, AI Video Studio, Scheduler and Pricing. Every page is a list of
 * sections; the header and footer are shared.
 */

import { useEffect } from "react"

import { SmoothScroll } from "@/components/motion/smooth-scroll"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { usePathname } from "@/lib/router"
import { HomePage } from "@/pages/home"
import { MarketingManagerPage } from "@/pages/marketing-manager"
import { PricingPage } from "@/pages/pricing"
import { SchedulerPage } from "@/pages/scheduler"
import { VideoStudioPage } from "@/pages/video-studio"

const PAGES: Record<string, { title: string; Page: () => React.JSX.Element }> = {
  "/": { title: "Castwell — your AI marketing team for every channel", Page: HomePage },
  "/marketing-manager": { title: "AI Marketing Manager — Castwell", Page: MarketingManagerPage },
  "/video-studio": { title: "AI Video Studio — Castwell", Page: VideoStudioPage },
  "/scheduler": { title: "Scheduler — Castwell", Page: SchedulerPage },
  "/pricing": { title: "Pricing — Castwell", Page: PricingPage },
}

/** `data-canvas-ignore` on the page wrapper and `<main>`: structural, so the
 *  canvas editor looks through them. */
export default function App() {
  const pathname = usePathname().replace(/\/$/, "") || "/"
  const { title, Page } = PAGES[pathname] ?? PAGES["/"]

  useEffect(() => {
    document.title = title
  }, [title])

  // A link to "/#channels" lands on the page, then on the section.
  useEffect(() => {
    const hash = window.location.hash
    if (!hash) return
    const t = window.setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" }), 80)
    return () => window.clearTimeout(t)
  }, [pathname])

  return (
    <div className="min-h-screen overflow-x-clip bg-page text-ink" data-canvas-ignore>
      <SmoothScroll />
      <SiteHeader />
      <main data-canvas-ignore>
        <Page key={pathname} />
      </main>
      <SiteFooter />
    </div>
  )
}
