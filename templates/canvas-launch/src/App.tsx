import { useCallback, useState } from "react"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Assistant } from "@/components/sections/assistant"
import { FullControl } from "@/components/sections/full-control"
import { ImportWeb } from "@/components/sections/import-web"
import { MagicCast } from "@/components/sections/magic-cast"
import { Modes } from "@/components/sections/modes"
import { OwnModel } from "@/components/sections/own-model"
import { ParallelRuns } from "@/components/sections/parallel-runs"
import { RealCode } from "@/components/sections/real-code"
import { ComponentNames } from "@/components/sections/component-names"
import { Film } from "@/components/sections/film"
import { Journal } from "@/components/sections/journal"
import { Story } from "@/components/sections/story"
import { Waitlist } from "@/components/sections/waitlist"
import { useSmoothScroll } from "@/hooks/use-smooth-scroll"

/**
 * Codecaine's launch page, told as one scroll: the promise and the editor, no
 * translation layer, components by name, the change journal, Magic Cast, the
 * assistant and its parallel runs, full control, importing the web, the modes,
 * bring your own model, a film, then the ask and the sign-off on one closing
 * gradient.
 *
 * `data-canvas-ignore` on the page wrapper and `<main>`:
 * structural, nothing of their own to design, so the canvas editor looks
 * through them (they stay in its layers panel). See CLAUDE.md.
 */
export default function App() {
  useSmoothScroll()
  const [introDone, setIntroDone] = useState(false)
  const onIntroDone = useCallback(() => setIntroDone(true), [])

  return (
    <div className="bg-gradient-to-b from-paper to-paper-deep text-ink" data-canvas-ignore>
      <SiteHeader visible={introDone} />
      <main data-canvas-ignore>
        <Story onIntroDone={onIntroDone} />
        <RealCode />
        <ComponentNames />
        <Journal />
        <MagicCast />
        <Assistant />
        <ParallelRuns />
        <FullControl />
        <ImportWeb />
        <Modes />
        <OwnModel />
        <Film />
        <Waitlist />
        <SiteFooter />
      </main>
    </div>
  )
}
