import { useCallback, useState } from "react"

import { InfiniteGrid } from "@/components/canvas/infinite-grid"
import { IntroLoader } from "@/components/intro-loader"
import { SiteHeader } from "@/components/site-header"
import { cn } from "@/lib/utils"

const SEEN = "overtime:intro-seen"

function seenIntro() {
  try {
    return window.sessionStorage.getItem(SEEN) === "1"
  } catch {
    return false
  }
}

function markIntroSeen() {
  try {
    window.sessionStorage.setItem(SEEN, "1")
  } catch {
    // Private mode: the intro simply plays again next time.
  }
}

/**
 * Home: the loading line, then the grid's intro, then the grid.
 *
 * `?intro` forces the intro to play again; `?nointro` skips it — handy when
 * editing the page.
 */
export function GridPage({ pathname }: { pathname: string }) {
  const [stage, setStage] = useState<"loading" | "intro" | "live">(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.has("nointro")) return "live"
    if (params.has("intro")) return "loading"
    return seenIntro() ? "live" : "loading"
  })

  const onLoaded = useCallback(() => {
    markIntroSeen()
    setStage("intro")
  }, [])
  // The header arrives with the burst, not before: until then the page is
  // only the portraits.
  const [header, setHeader] = useState(stage === "live")
  const onIntroPhase = useCallback((phase: "burst" | "live") => {
    setHeader(true)
    if (phase === "live") setStage("live")
  }, [])

  return (
    <>
      <InfiniteGrid stage={stage} onIntroPhase={onIntroPhase} />
      {stage === "loading" && <IntroLoader onDone={onLoaded} />}
      <div
        aria-hidden={!header}
        className={cn(
          "transition-opacity duration-500 ease-(--ease-out-quart)",
          header ? "opacity-100" : "pointer-events-none invisible opacity-0",
        )}
      >
        <SiteHeader pathname={pathname} tools />
      </div>
    </>
  )
}
