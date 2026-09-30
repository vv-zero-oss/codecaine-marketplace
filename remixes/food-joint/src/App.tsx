/**
 * Oakbird — a one-page site for a fried-chicken room, built from the canvas
 * scaffold (`scaffold-sdk`) and opted into `@canvas/react` in `main.tsx`.
 *
 * The page reads as a list of sections, each a named component, so the
 * editor's layers panel says `Hero`, `Oak`, `MenuSection` rather than
 * `section` and `div`. Words, photographs and films live in `content.ts`;
 * every colour, shadow and curve in `index.css`; the clip shapes in
 * `lib/shapes.ts`.
 */

import { useEffect, useState } from "react"

import { Booking } from "@/components/sections/booking"
import { Hero } from "@/components/sections/hero"
import { MenuSection } from "@/components/sections/menu"
import { Oak } from "@/components/sections/oak"
import { Preloader } from "@/components/sections/preloader"
import { Process } from "@/components/sections/process"
import { Reviews } from "@/components/sections/reviews"
import { Room } from "@/components/sections/room"
import { SiteFooter } from "@/components/sections/site-footer"
import { SiteHeader } from "@/components/sections/site-header"
import { Statement } from "@/components/sections/statement"
import { Ticker } from "@/components/sections/ticker"
import { LoadedContext } from "@/hooks/use-loaded"
import { useSmoothScroll } from "@/hooks/use-smooth-scroll"
import { sitePath, usePathname } from "@/lib/router"
import { BrandPage } from "@/pages/brand"

/** In the order the story is told. `?only=<id>` renders one on its own, as in
 *  the scaffold — handy for checking a section in the editor. */
const SECTIONS = [
  { id: "hero", Section: Hero },
  { id: "ticker", Section: Ticker },
  { id: "statement", Section: Statement },
  { id: "menu", Section: MenuSection },
  { id: "oak", Section: Oak },
  { id: "process", Section: Process },
  { id: "reviews", Section: Reviews },
  { id: "room", Section: Room },
  { id: "book", Section: Booking },
]

const only = new URLSearchParams(window.location.search).get("only")
/** `?only=`, `?nopreload` and the style guide skip the curtain. */
const withPreloader =
  !only && !new URLSearchParams(window.location.search).has("nopreload") && sitePath() === "/"

/** `data-canvas-ignore` on the page wrapper and `<main>`: structural, with
 *  nothing of their own to design, so the canvas editor looks through them to
 *  what they hold (they stay in its layers panel). */
export default function App() {
  const lenis = useSmoothScroll()
  // `loaded` flips as the curtain starts to lift, so the hero's entrance
  // plays while it goes; the curtain itself unmounts once it has gone.
  const [loaded, setLoaded] = useState(!withPreloader)
  const [curtain, setCurtain] = useState(withPreloader)
  const pathname = usePathname()

  useEffect(() => {
    if (loaded) {
      document.documentElement.removeAttribute("data-loading")
      lenis.current?.start()
    } else {
      window.scrollTo(0, 0)
      lenis.current?.stop()
    }
  }, [loaded, lenis])

  const sections = only ? SECTIONS.filter((entry) => entry.id === only) : SECTIONS

  if (pathname === "/brand") {
    return (
      <LoadedContext.Provider value={loaded}>
        <div className="min-h-screen bg-lime text-forest" data-canvas-ignore>
          <BrandPage />
          <SiteFooter />
        </div>
      </LoadedContext.Provider>
    )
  }

  return (
    <LoadedContext.Provider value={loaded}>
      {curtain && <Preloader onLift={() => setLoaded(true)} onDone={() => setCurtain(false)} />}
      <div className="min-h-screen bg-lime text-forest" data-canvas-ignore>
        <SiteHeader />
        <main data-canvas-ignore>
          {sections.map(({ id, Section }) => (
            <Section key={id} />
          ))}
        </main>
        <SiteFooter />
      </div>
    </LoadedContext.Provider>
  )
}
