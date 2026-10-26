/**
 * Orra — a payments platform's home page, plus its brand guidelines at /brand.
 *
 * The page reads as a list of sections, in the order a visitor meets them.
 * Every structural wrapper is marked `data-canvas-ignore` so the canvas
 * editor's pointer reaches the sections and cards inside.
 */
import { ContactSalesProvider } from "@/components/contact-sales"
import { useSmoothScroll } from "@/components/motion"
import { Accounts } from "@/components/sections/accounts"
import { CallToAction } from "@/components/sections/call-to-action"
import { Customers } from "@/components/sections/customers"
import { Dashboard } from "@/components/sections/dashboard"
import { Developers } from "@/components/sections/developers"
import { Hero } from "@/components/sections/hero"
import { MerchantStrip, ProductIndex } from "@/components/sections/merchants"
import { Payments } from "@/components/sections/payments"
import { ProductRail } from "@/components/sections/product-rail"
import { Support } from "@/components/sections/support"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Toaster } from "@/components/ui/sonner"
import { usePathname } from "@/lib/router"
import { BrandPage } from "@/pages/brand"

const SECTIONS = [
  { id: "top", Section: Hero },
  { id: "merchants", Section: MerchantStrip },
  { id: "products", Section: ProductIndex },
  { id: "payments", Section: Payments },
  { id: "accounts", Section: Accounts },
  { id: "dashboard", Section: Dashboard },
  { id: "customers", Section: Customers },
  { id: "developers", Section: Developers },
  { id: "support", Section: Support },
  { id: "pricing", Section: CallToAction },
  { id: "rail", Section: ProductRail },
]

/** `?only=<id>` renders one section on its own — handy for screenshots. */
function sections() {
  const only = new URLSearchParams(window.location.search).get("only")
  return only ? SECTIONS.filter((entry) => entry.id === only) : SECTIONS
}

export default function App() {
  useSmoothScroll()
  const pathname = usePathname()

  return (
    <ContactSalesProvider>
      <div className="min-h-screen overflow-x-clip bg-paper text-ink" data-canvas-ignore>
        <SiteHeader />
        {pathname === "/brand" ? (
          <BrandPage />
        ) : (
          <main data-canvas-ignore>
            {sections().map(({ id, Section }) => (
              <Section key={id} />
            ))}
          </main>
        )}
        <SiteFooter />
      </div>
      <Toaster position="bottom-right" />
    </ContactSalesProvider>
  )
}
