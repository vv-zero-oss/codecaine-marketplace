/**
 * Halo — a dark marketing page for an AI support platform.
 *
 * Reads as a list of sections: announcement, header, hero, console, industries,
 * three walkthroughs, languages, a customer story, the call to action, footer.
 * `/brand` is the style guide, rendered from the same tokens and components.
 */
import { useSmoothScroll } from "@/components/motion"
import { AnnouncementBar } from "@/components/announcement-bar"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { CallToAction } from "@/components/sections/call-to-action"
import { CaseStudy } from "@/components/sections/case-study"
import { ConsoleShowcase } from "@/components/sections/console-showcase"
import { FeatureTabs } from "@/components/sections/feature-tabs"
import { Hero } from "@/components/sections/hero"
import { Industries } from "@/components/sections/industries"
import { Languages } from "@/components/sections/languages"
import { usePathname } from "@/lib/router"
import { BrandPage } from "@/pages/brand"

/** `data-canvas-ignore` on the page wrapper and `<main>`: structural, so the
 *  editor looks through them to what they hold. */
export default function App() {
  useSmoothScroll()
  const pathname = usePathname()

  if (pathname === "/brand") {
    return (
      <div className="min-h-screen bg-bg text-text" data-canvas-ignore>
        <BrandPage />
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="overflow-x-clip bg-bg text-text" data-canvas-ignore>
      <AnnouncementBar />
      <SiteHeader />
      <main data-canvas-ignore>
        <Hero />
        <ConsoleShowcase />
        <Industries />
        <FeatureTabs group="build" />
        <FeatureTabs group="observe" />
        <FeatureTabs group="improve" />
        <Languages />
        <CaseStudy />
        <CallToAction />
      </main>
      <SiteFooter />
    </div>
  )
}
