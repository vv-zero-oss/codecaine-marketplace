import { useCallback, useState } from "react"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Access } from "@/components/sections/access"
import { AnyProject } from "@/components/sections/any-project"
import { Assistant } from "@/components/sections/assistant"
import { ComponentNames } from "@/components/sections/component-names"
import { ComponentsScene } from "@/components/sections/components-scene"
import { Film } from "@/components/sections/film"
import { Journal } from "@/components/sections/journal"
import { MagicCast } from "@/components/sections/magic-cast"
import { OwnModel } from "@/components/sections/own-model"
import { RealElements } from "@/components/sections/real-elements"
import { Recreate } from "@/components/sections/recreate"
import { References } from "@/components/sections/references"
import { Story } from "@/components/sections/story"
import { useSmoothScroll } from "@/hooks/use-smooth-scroll"

/**
 * Codecaine's launch page, told as one scroll in four acts: the promise (the
 * editor on your running app); anything that renders, built from real parts
 * (any stack, component names, real elements, components and variants, the
 * change journal); the assistant, supercharged (Magic Cast, references, a live
 * page recreated, the board as context, bring your own model); and the ask.
 *
 * `data-canvas-ignore` on the page wrapper and `<main>`: structural, nothing of
 * their own to design, so the canvas editor looks through them (they stay in
 * its layers panel). See CLAUDE.md.
 */
export default function App() {
  useSmoothScroll()
  const [introDone, setIntroDone] = useState(false)
  const onIntroDone = useCallback(() => setIntroDone(true), [])

  return (
    <div className="bg-gradient-to-b from-paper to-paper-deep text-ink" data-canvas-ignore>
      <SiteHeader visible={introDone} />
      <main data-canvas-ignore>
        {/* I — the promise */}
        <Story onIntroDone={onIntroDone} />
        {/* II — anything that renders, built from real parts */}
        <AnyProject />
        <ComponentNames />
        <RealElements />
        <ComponentsScene />
        <Journal />
        {/* III — the assistant, supercharged */}
        <MagicCast />
        <References />
        <Recreate />
        <Assistant />
        <OwnModel />
        {/* IV — the ask */}
        <Film />
        <Access />
        <SiteFooter />
      </main>
    </div>
  )
}
