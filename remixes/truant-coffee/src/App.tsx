/**
 * Truant Coffee Co. — single origins roasted on the shore of Lake Superior,
 * for the hour you stole back.
 *
 * Every page is a conversation. Home: the promise (take the long way), what
 * we roast (four series, stacked as you scroll), why (the mission, and a
 * photograph that opens up to fill the window), how (this week's roast,
 * logged), the offer (never run dry), how to brew it, and where to find us.
 * Shop lets you choose, Subscribe makes it automatic, Field Notes shows
 * where it comes from and what we paid, and /brand is the system underneath.
 */

import { RouteTransition } from "@/components/motion/route-transition"
import { SmoothScroll } from "@/components/motion/smooth-scroll"
import { AccountSheet } from "@/components/site/account-sheet"
import { CartSheet } from "@/components/site/cart-sheet"
import { MenuSheet } from "@/components/site/menu-sheet"
import { PromoTab } from "@/components/site/promo-tab"
import { FloatingLogo, MobileBar, SiteRail } from "@/components/site/site-chrome"
import { SiteFooter } from "@/components/site/site-footer"
import { TooltipProvider } from "@/components/ui/tooltip"
import { usePathname } from "@/lib/router"
import { StoreProvider } from "@/lib/store"
import { BrandPage } from "@/pages/brand"
import { FieldNotesPage } from "@/pages/field-notes"
import { HomePage } from "@/pages/home"
import { ShopPage } from "@/pages/shop"
import { SubscribePage } from "@/pages/subscribe"

const PAGES: Record<string, () => React.ReactNode> = {
  "/": HomePage,
  "/shop": ShopPage,
  "/subscribe": SubscribePage,
  "/field-notes": FieldNotesPage,
  "/brand": BrandPage,
}

/** `data-canvas-ignore` on the page wrapper and `<main>`: structural, with
 *  nothing of their own to design, so the canvas editor looks through them
 *  to what they hold (they stay in its layers panel). See CLAUDE.md. */
export default function App() {
  const pathname = usePathname()
  const Page = PAGES[pathname] ?? HomePage

  return (
    <StoreProvider>
      <TooltipProvider delayDuration={200}>
        <div className="min-h-screen bg-paper text-ink" data-canvas-ignore>
          <SmoothScroll lerp={0.085} />
          <FloatingLogo />
          <SiteRail />
          <MobileBar />
          <PromoTab />
          <main data-canvas-ignore className="relative pt-[84px] lg:pt-0 lg:pr-[var(--spacing-rail)]">
            <RouteTransition path={pathname}>
              <Page />
            </RouteTransition>
          </main>
          <SiteFooter />
          <MenuSheet />
          <CartSheet />
          <AccountSheet />
        </div>
      </TooltipProvider>
    </StoreProvider>
  )
}
