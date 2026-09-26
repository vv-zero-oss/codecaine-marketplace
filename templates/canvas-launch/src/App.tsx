import { useCallback, useState } from "react"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Assistant } from "@/components/sections/assistant"
import { ComponentNames } from "@/components/sections/component-names"
import { Film } from "@/components/sections/film"
import { Journal } from "@/components/sections/journal"
import { Story } from "@/components/sections/story"
import { Waitlist } from "@/components/sections/waitlist"
import { useSmoothScroll } from "@/hooks/use-smooth-scroll"

/**
 * Codecaine's launch page, told as one scroll: the promise and the editor,
 * components by name, the change journal, the assistant, a film, then the ask
 * and the sign-off on one closing gradient.
 *
 * `data-canvas-ignore` on the page wrapper, `<main>` and the closing backdrop:
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
        <ComponentNames />
        <Journal />
        <Assistant />
        <Film />
        <div className="bg-closing bg-fixed" data-canvas-ignore>
          <Waitlist />
          <SiteFooter />
        </div>
      </main>
    </div>
  )
}
