/**
 * Codecaine — the homepage, its features page, and the design system both
 * are built on.
 *
 *   /                the landing page (light marketing surface, `--lp-*`)
 *   /features        everything the canvas does
 *   /brand           brand guidelines: foundations, components, the panel
 *                    shell (also served at /design-system)
 *   /shadcn          every shadcn/ui component on the same tokens
 *
 * The marketing pages bring their own chrome (`SiteShell`); the two system
 * pages share `SiteHeader` and the toast host.
 */

import { useEffect } from "react"
import { useSmoothScroll } from "@/components/motion"
import { SiteHeader } from "@/components/site/site-header"
import { ToastHost } from "@/components/site/toast-host"
import { usePathname } from "@/lib/router"
import { DesignSystemPage } from "@/pages/design-system"
import { FeaturesPage } from "@/pages/features"
import { LandingPage } from "@/pages/home"
import { ShadcnPage } from "@/pages/shadcn"

const TITLES: Record<string, string> = {
  "/": "Codecaine — The canvas for your real code",
  "/features": "Features — Codecaine",
  "/brand": "Transitions — Refine design system",
  "/design-system": "Transitions — Refine design system",
  "/shadcn": "shadcn/ui on Refine tokens",
}

export default function App() {
  useSmoothScroll()
  const pathname = usePathname()
  const route = pathname in TITLES ? pathname : "/"

  useEffect(() => {
    document.title = TITLES[route]
  }, [route])

  if (route === "/") return <LandingPage />
  if (route === "/features") return <FeaturesPage />

  return (
    <div className="min-h-screen bg-bg text-fg" data-canvas-ignore>
      <SiteHeader />
      {route === "/shadcn" ? <ShadcnPage /> : <DesignSystemPage />}
      <ToastHost />
    </div>
  )
}
