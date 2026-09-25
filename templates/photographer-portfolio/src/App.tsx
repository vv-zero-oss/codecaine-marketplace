/**
 * A photographer's portfolio: home, portfolio, a gallery per story, about,
 * services and contact.
 *
 * Every section is a named component and every page is its own, so the
 * editor's layers panel reads `HomeHero`, `GalleryCard`, `PackageCard` rather
 * than `section` and `div.grid` — that is what `@canvas/react` (see
 * `main.tsx`) buys. Words and pictures live in `content.ts`.
 */

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { AboutPage } from "@/pages/about"
import { ContactPage } from "@/pages/contact"
import { GalleryPage } from "@/pages/gallery"
import { HomePage } from "@/pages/home"
import { NotFoundPage } from "@/pages/not-found"
import { PortfolioPage } from "@/pages/portfolio"
import { ServicesPage } from "@/pages/services"
import { matchPath, usePathname } from "@/router"

function Page({ pathname }: { pathname: string }) {
  const path = pathname.replace(/\/+$/, "") || "/"
  if (path === "/") return <HomePage />
  if (path === "/portfolio") return <PortfolioPage />
  const gallery = matchPath("/portfolio/:slug", path)
  if (gallery) return <GalleryPage slug={gallery.slug} />
  if (path === "/about") return <AboutPage />
  if (path === "/services") return <ServicesPage />
  if (path === "/contact") return <ContactPage />
  return <NotFoundPage />
}

/** `data-canvas-ignore` on the page wrapper and `<main>`: structural, with
 *  nothing of their own to design, so the canvas editor looks through them
 *  to what they hold (they stay in its layers panel). See CLAUDE.md. */
export default function App() {
  const pathname = usePathname()
  return (
    <div className="min-h-screen" data-canvas-ignore>
      <SiteHeader />
      <main data-canvas-ignore>
        <Page pathname={pathname} />
      </main>
      <SiteFooter />
    </div>
  )
}
