/**
 * Arcline — a CRM whose agents do the busywork of selling.
 *
 * Five pages behind a forty-line router (`lib/router.tsx`): Home, Agents,
 * Customers, Pricing and Changelog — and `/brand`, the brand guidelines.
 * Every page is a list of sections.
 *
 * The whole site sits in one frame: two vertical hairlines a gutter in from
 * the window's edges, with the sections meeting between them at horizontal
 * hairlines.
 */

import { useEffect } from "react"

import { SmoothScroll } from "@/components/motion/smooth-scroll"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { usePathname } from "@/lib/router"
import { AgentsPage } from "@/pages/agents"
import { BrandPage } from "@/pages/brand"
import { ChangelogPage } from "@/pages/changelog"
import { CustomersPage } from "@/pages/customers"
import { HomePage } from "@/pages/home"
import { PricingPage } from "@/pages/pricing"

const PAGES: Record<string, { title: string; Page: () => React.JSX.Element }> = {
  "/": { title: "Arcline — the CRM that works the pipeline for you", Page: HomePage },
  "/agents": { title: "Agents — Arcline", Page: AgentsPage },
  "/customers": { title: "Customers — Arcline", Page: CustomersPage },
  "/pricing": { title: "Pricing — Arcline", Page: PricingPage },
  "/changelog": { title: "Changelog — Arcline", Page: ChangelogPage },
  "/brand": { title: "Brand guidelines — Arcline", Page: BrandPage },
}

/** `data-canvas-ignore` on the page wrapper, the frame and `<main>`:
 *  structural, so the canvas editor looks through them. */
export default function App() {
  const pathname = usePathname().replace(/\/$/, "") || "/"
  const { title, Page } = PAGES[pathname] ?? PAGES["/"]

  useEffect(() => {
    document.title = title
  }, [title])

  // A link to "/#platform" lands on the page, then on the section.
  useEffect(() => {
    const hash = window.location.hash
    if (!hash) return
    const t = window.setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" }), 60)
    return () => window.clearTimeout(t)
  }, [pathname])

  return (
    <div className="min-h-screen bg-page text-ink" data-canvas-ignore>
      <SmoothScroll />
      <SiteHeader />
      <div data-canvas-ignore className="mx-auto max-w-[1440px] border-line-strong min-[1488px]:border-x">
        <main data-canvas-ignore>
          <Page key={pathname} />
        </main>
        <SiteFooter />
      </div>
    </div>
  )
}
