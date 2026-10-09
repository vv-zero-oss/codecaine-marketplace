/**
 * Ordinary Matter — a publication about people who make things by hand.
 *
 * Every page reads as a conversation, each section answering the question
 * the one before it raised. The story reader and the bag live once, here,
 * and open from any page.
 */

import { RouteTransition } from "@/components/motion/route-transition"
import { SmoothScroll } from "@/components/motion/smooth-scroll"
import { BagSheet } from "@/components/site/bag-sheet"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { StoryReader } from "@/components/site/story-reader"
import { BagProvider } from "@/lib/bag"
import { ReaderProvider } from "@/lib/reader"
import { usePathname } from "@/lib/router"
import { AboutPage } from "@/pages/about"
import { BrandPage } from "@/pages/brand"
import { HomePage } from "@/pages/home"
import { ShopPage } from "@/pages/shop"
import { StoriesPage } from "@/pages/stories"

const PAGES: Record<string, () => React.ReactNode> = {
  "/": HomePage,
  "/stories": StoriesPage,
  "/shop": ShopPage,
  "/about": AboutPage,
  "/brand": BrandPage,
}

/** `data-canvas-ignore` on the page wrapper and `<main>`: structural, with
 *  nothing of their own to design, so the canvas editor looks through them
 *  to what they hold (they stay in its layers panel). See CLAUDE.md. */
export default function App() {
  const pathname = usePathname()
  const Page = PAGES[pathname] ?? HomePage

  return (
    <BagProvider>
      <ReaderProvider>
        <div className="min-h-screen bg-page text-ink" data-canvas-ignore>
          <SmoothScroll lerp={0.09} />
          <SiteHeader />
          <main data-canvas-ignore className="relative">
            <RouteTransition path={pathname}>
              <Page />
            </RouteTransition>
          </main>
          <SiteFooter />
          <StoryReader />
          <BagSheet />
        </div>
      </ReaderProvider>
    </BagProvider>
  )
}
