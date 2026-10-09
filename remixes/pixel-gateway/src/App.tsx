/**
 * Pixelkeep — a pixel-art secure web gateway, authored as named components.
 *
 * Home is a list of sections; four inner pages (products, pricing, customers,
 * the template generator) and `/brand` share one header, one status bar and one
 * footer. Lenis carries the scroll, Framer Motion the rest, and everything
 * the editor should be able to reach is a named component with scalar props.
 */
import { useEffect } from "react"

import { useSmoothScroll } from "@/components/motion"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { StatusBar } from "@/components/status-bar"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { restoreTheme } from "@/lib/theme"
import { usePathname } from "@/lib/router"
import { AboutPage } from "@/pages/about"
import { BrandPage } from "@/pages/brand"
import { CaseStudiesPage } from "@/pages/case-studies"
import { CustomersPage } from "@/pages/customers"
import { GetStartedPage } from "@/pages/get-started"
import { GeneratorPage } from "@/pages/generator"
import { HomePage } from "@/pages/home"
import { HowItWorksPage } from "@/pages/how-it-works"
import { PricingPage } from "@/pages/pricing"
import { ProductsPage } from "@/pages/products"
import { SecurityPage } from "@/pages/security"
import { FloatingCta } from "@/components/floating-cta"

const PAGES: Record<string, () => React.JSX.Element> = {
  "/": HomePage,
  "/products": ProductsPage,
  "/pricing": PricingPage,
  "/customers": CustomersPage,
  "/case-studies": CaseStudiesPage,
  "/generator": GeneratorPage,
  "/brand": BrandPage,
  "/how-it-works": HowItWorksPage,
  "/get-started": GetStartedPage,
  "/security": SecurityPage,
  "/about": AboutPage,
}

const TITLES: Record<string, string> = {
  "/": "Pixelkeep — the 8-bit secure web gateway",
  "/products": "Products — Pixelkeep",
  "/pricing": "Pricing — Pixelkeep",
  "/customers": "Customers — Pixelkeep",
  "/case-studies": "Case studies — Pixelkeep",
  "/generator": "Template generator — Pixelkeep",
  "/brand": "Brand guidelines — Pixelkeep",
  "/how-it-works": "How it works — Pixelkeep",
  "/get-started": "Get started — Pixelkeep",
  "/security": "Security — Pixelkeep",
  "/about": "About — Pixelkeep",
}

/** `data-canvas-ignore` on the page wrapper and `<main>`: structural, with
 *  nothing of their own to design (they stay in the layers panel). */
export default function App() {
  useSmoothScroll()
  const pathname = usePathname()
  const Page = PAGES[pathname] ?? HomePage
  useEffect(() => restoreTheme(), [])
  useEffect(() => {
    document.title = TITLES[pathname] ?? TITLES["/"]
  }, [pathname])

  return (
    <TooltipProvider delayDuration={150}>
      <div className="min-h-svh bg-bg text-fg" data-canvas-ignore>
        <SiteHeader />
        <main data-canvas-ignore>
          <Page />
        </main>
        <SiteFooter />
        <FloatingCta />
        <StatusBar />
        <Toaster />
      </div>
    </TooltipProvider>
  )
}
