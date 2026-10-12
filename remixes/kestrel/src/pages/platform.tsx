import { useEffect } from "react"

import { IntegrationsGrid } from "@/components/sections/platform/integrations-grid"
import { ModuleExplorer, scrollToModule } from "@/components/sections/platform/module-explorer"
import { PageClosing } from "@/components/sections/platform/page-closing"
import { PlatformHero } from "@/components/sections/platform/platform-hero"
import { SecurityBand } from "@/components/sections/platform/security-band"

/**
 * Follow a `#module` in the address — on arrival, and when a menu link
 * changes the hash while the page is already open.
 */
function useHashScroll() {
  useEffect(() => {
    const follow = () => {
      const id = window.location.hash.slice(1)
      if (id) window.setTimeout(() => scrollToModule(id), 60)
    }
    follow()
    window.addEventListener("kestrel:navigate", follow)
    window.addEventListener("popstate", follow)
    return () => {
      window.removeEventListener("kestrel:navigate", follow)
      window.removeEventListener("popstate", follow)
    }
  }, [])
}

/**
 * The platform, as a story: the claim and a product you can click (hero),
 * every module in turn with the list pinned beside you (explorer), why it's
 * safe (security), what it connects to (integrations), and the ask.
 */
export function PlatformPage() {
  useHashScroll()
  return (
    <>
      <PlatformHero />
      <ModuleExplorer />
      <SecurityBand />
      <IntegrationsGrid />
      <PageClosing
        title="Put the busywork on autopilot."
        continuation="Keep the judgement calls."
        formName="Platform signup"
      />
    </>
  )
}
