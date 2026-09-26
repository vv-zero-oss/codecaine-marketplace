import { useRef } from "react"
import { motion, useReducedMotion, useTransform, type MotionValue } from "motion/react"

import { NameTag } from "@/components/ui/name-tag"
import { Scene } from "@/components/ui/scene"
import { SwapText } from "@/components/ui/swap-text"
import { useSceneStep } from "@/hooks/use-scene-step"
import { useViewport } from "@/hooks/use-viewport"
import { EASE_SWAP } from "@/lib/motion"

/**
 * Name tags scattered to the edges of the screen drift in and gather round the
 * line as the reader scrolls — scrubbed, not timed, so the reader's own scroll
 * is what pulls them together. Then the line changes and all but two leave.
 *
 * `from` is where a tag starts, as a fraction of the screen; `to` is where it
 * gathers, in px from the centre at a 1440px-wide screen (scaled down below it).
 */
const TAGS = [
  { label: "Navbar", tone: "bg-tag-green text-white", arrow: "text-tag-green", from: [0.03, 0.47], to: [-415, -62] },
  { label: "Hero", tone: "bg-tag-lime text-ink", arrow: "text-tag-lime", from: [0.17, 0.95], to: [-112, -122] },
  { label: "PlanCard", tone: "bg-tag-pink text-white", arrow: "text-tag-pink", from: [0.93, 0.91], to: [246, -110] },
  { label: "LogoCloud", tone: "bg-tag-sea text-white", arrow: "text-tag-sea", from: [0.02, 0.82], to: [-256, 16] },
  { label: "FeatureCard", tone: "bg-tag-teal text-ink", arrow: "text-tag-teal", from: [0.38, 0.92], to: [138, 2] },
  { label: "Footer", tone: "bg-tag-plum text-white", arrow: "text-tag-plum", from: [0.91, 0.21], to: [334, 16] },
  { label: "ButtonLink", tone: "bg-signal text-white", arrow: "text-signal", from: [0.07, 0.33], to: [-330, 72], keep: true },
  { label: "Pricing", tone: "bg-tag-yellow text-ink", arrow: "text-tag-yellow", from: [0.22, 0.04], to: [-136, 82] },
  { label: "SectionHeading", tone: "bg-violet text-white", arrow: "text-violet", from: [0.82, 0.62], to: [-10, 134], keep: true },
  { label: "Faq", tone: "bg-tag-orange text-white", arrow: "text-tag-orange", from: [0.66, 0.08], to: [100, 98] },
] as const

const LINES = ["Not just boxes on a board", "Your components, by their own names"]

export function ComponentNames() {
  const ref = useRef<HTMLElement>(null)
  const { step, progress } = useSceneStep(ref, 3)
  const view = useViewport()
  const reduce = useReducedMotion()
  const line = step >= 2 ? 1 : 0

  return (
    <Scene ref={ref} beats={3.2} id="components" aria-label="Component names">
      <div className="absolute inset-0 grid place-items-center px-4 text-center">
        <SwapText
          id={line}
          className={
            line === 0
              ? "text-[clamp(30px,3.9vw,56px)]"
              : "max-w-[12ch] text-[clamp(40px,4.5vw,64px)] sm:max-w-[16ch]"
          }
        >
          {LINES[line]}
        </SwapText>
      </div>
      {TAGS.map((tag) => (
        <GatheringTag
          key={tag.label}
          tag={tag}
          progress={progress}
          view={view}
          gone={line === 1 && !("keep" in tag)}
          still={!!reduce}
        />
      ))}
    </Scene>
  )
}

function GatheringTag({
  tag,
  progress,
  view,
  gone,
  still,
}: {
  tag: (typeof TAGS)[number]
  progress: MotionValue<number>
  view: { width: number; height: number }
  gone: boolean
  still: boolean
}) {
  // Below desktop the gathering keeps its height and narrows, so the tags stay
  // readable around the line instead of piling onto it.
  const wide = view.width >= 1024
  const kx = wide ? Math.min(1, view.width / 1440) : 0.42
  const ky = wide ? kx : 1.25
  const startX = tag.from[0] * view.width
  const startY = tag.from[1] * view.height
  const endX = Math.min(view.width - 110, Math.max(8, view.width / 2 + tag.to[0] * kx - (wide ? 0 : 30)))
  const endY = view.height / 2 + tag.to[1] * ky
  // Gathered by the time the reader is half way through the scene; an ease-out
  // on the scrub so they arrive and settle rather than stop dead.
  const t = useTransform(progress, [0.02, 0.5], [still ? 1 : 0, 1], { clamp: true, ease: easeOut })
  const x = useTransform(t, (v) => startX + (endX - startX) * v)
  const y = useTransform(t, (v) => startY + (endY - startY) * v)

  return (
    <motion.div className="absolute top-0 left-0" style={{ x, y }}>
      <motion.div
        initial={false}
        animate={gone ? { opacity: 0, filter: "blur(6px)" } : { opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.45, ease: EASE_SWAP }}
      >
        <NameTag label={tag.label} tone={tag.tone} arrow={tag.arrow} className="origin-top-left scale-[0.8] sm:scale-100" />
      </motion.div>
    </motion.div>
  )
}

function easeOut(v: number) {
  return 1 - Math.pow(1 - v, 3)
}
