/**
 * Orra — an AI note-taker's home page, plus its brand guidelines at /brand.
 *
 * The page reads as a list of sections, in the order a visitor meets them.
 * Every structural wrapper is marked `data-canvas-ignore` so the canvas
 * editor's pointer reaches the sections and cards inside.
 */
import { ContactSalesProvider } from "@/components/contact-sales"
import { useSmoothScroll } from "@/components/motion"
import { CallToAction } from "@/components/sections/call-to-action"
import { Capture } from "@/components/sections/capture"
import { Customers } from "@/components/sections/customers"
import { Hero } from "@/components/sections/hero"
import { Memory } from "@/components/sections/memory"
import { ProductRail } from "@/components/sections/product-rail"
import { Security } from "@/components/sections/security"
import { Support } from "@/components/sections/support"
import { FeatureIndex, TeamStrip } from "@/components/sections/teams"
import { Workspace } from "@/components/sections/workspace"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Toaster } from "@/components/ui/sonner"
import { usePathname } from "@/lib/router"
import { BrandPage } from "@/pages/brand"

const SECTIONS = [
  { id: "top", Section: Hero },
  { id: "teams", Section: TeamStrip },
  { id: "features", Section: FeatureIndex },
  { id: "capture", Section: Capture },
  { id: "memory", Section: Memory },
  { id: "workspace", Section: Workspace },
  { id: "customers", Section: Customers },
  { id: "security", Section: Security },
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
      <div className="min-h-screen overflow-x-clip bg-canvas text-bone" data-canvas-ignore>
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
      <Toaster position="bottom-right" theme="dark" />
    </ContactSalesProvider>
  )
}
