/**
 * Aurel — a fashion house's site: home, the collection, a product, the
 * atelier, the journal, the house and appointments.
 *
 * Every section is a named component and every piece of motion is its own
 * (see `components/motion/`), so the canvas editor's layers panel reads
 * `HeroFilm`, `PieceReveal`, `StackCards` rather than `section` and
 * `div.sticky`. Words and pictures live in `content.ts`.
 */

import { useState } from "react"

import { useCanvasAction } from "@canvas/react"
import { SmoothScroll } from "@/components/motion/smooth-scroll"
import { BagProvider } from "@/components/site/bag"
import { BagSheet } from "@/components/site/bag-sheet"
import { MenuOverlay } from "@/components/site/menu-overlay"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { Toaster } from "@/components/ui/sonner"
import { AppointmentsPage } from "@/pages/appointments"
import { AtelierPage } from "@/pages/atelier"
import { CollectionPage } from "@/pages/collection"
import { HomePage } from "@/pages/home"
import { HousePage } from "@/pages/house"
import { JournalPage } from "@/pages/journal"
import { NotFoundPage } from "@/pages/not-found"
import { ProductPage } from "@/pages/product"
import { matchPath, usePathname } from "@/router"

function Page({ pathname }: { pathname: string }) {
  const path = pathname.replace(/\/+$/, "") || "/"
  if (path === "/") return <HomePage />
  if (path === "/collection") return <CollectionPage />
  const product = matchPath("/collection/:slug", path)
  if (product) return <ProductPage slug={product.slug} />
  if (path === "/atelier") return <AtelierPage />
  if (path === "/journal") return <JournalPage />
  if (path === "/house") return <HousePage />
  if (path === "/appointments") return <AppointmentsPage />
  return <NotFoundPage />
}

/** `data-canvas-ignore` on the page wrapper and `<main>`: structural, with
 *  nothing of their own to design, so the canvas editor looks through them
 *  to what they hold (they stay in its layers panel). See CLAUDE.md. */
export default function App() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  useCanvasAction("Menu", (next) => setMenuOpen(next ?? !menuOpen), { on: menuOpen, group: "Site" })

  return (
    <SmoothScroll resetKey={pathname}>
      <BagProvider>
        <div className="min-h-svh bg-paper text-ink" data-canvas-ignore>
          <SiteHeader onMenu={() => setMenuOpen(true)} menuOpen={menuOpen} />
          <main className="relative z-10 bg-paper" data-canvas-ignore>
            <Page key={pathname} pathname={pathname} />
          </main>
          <SiteFooter />
          <MenuOverlay open={menuOpen} onOpenChange={setMenuOpen} pathname={pathname} />
          <BagSheet />
          <Toaster position="bottom-center" toastOptions={{ className: "!rounded-none !bg-chip !font-sans !text-ink !shadow-chip !border-line" }} />
        </div>
      </BagProvider>
    </SmoothScroll>
  )
}
