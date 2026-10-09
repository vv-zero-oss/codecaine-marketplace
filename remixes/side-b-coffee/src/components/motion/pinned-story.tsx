import { useEffect, useRef, useState, type ReactNode } from "react"
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll } from "motion/react"
import { useCanvasAction } from "@canvas/react"

import { photo } from "@/lib/photos"
import { cn } from "@/lib/utils"

export type StoryStep = {
  track: string
  title: string
  body: string
  stat: string
  statLabel: string
  photo: number
  alt: string
}

/**
 * A sticky scroll story. The picture side pins while the steps scroll past
 * it; as each step reaches the middle of the screen the photo crossfades to
 * its own (600ms) and settles from 106% to 100%, the big track number
 * flips, and a rail fills with the reader's progress (scroll-linked, no
 * easing — it is the scrollbar, restated).
 *
 * Below `lg` the picture pins to the top half of the screen and the steps
 * slide up underneath it. "Story step" in the editor's Actions walks it.
 */
export function PinnedStory({ steps, aside, className }: { steps: StoryStep[]; aside?: ReactNode; className?: string }) {
  const [active, setActive] = useState(0)
  const reduced = useReducedMotion()
  const list = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: list, offset: ["start 0.6", "end 0.6"] })
  useCanvasAction("Story step", (next) => setActive((i) => (next == null ? (i + 1) % steps.length : next ? steps.length - 1 : 0)), {
    on: active === steps.length - 1,
    group: "Farm to cup",
  })
  const step = steps[active]

  return (
    <div className={cn("relative grid lg:grid-cols-2 lg:gap-(--spacing-gutter)", className)}>
      {/* the pinned picture */}
      <div className="sticky top-14 z-10 h-[46svh] py-3 lg:top-[68px] lg:h-[calc(100svh-88px)] lg:py-0">
        <div className="relative isolate size-full overflow-hidden rounded-(--radius-card) bg-cocoa text-page shadow-(--shadow-float)">
          <AnimatePresence initial={false}>
            <motion.img
              key={step.photo}
              src={photo(step.photo, 1400)}
              alt={step.alt}
              className="absolute inset-0 size-full object-cover"
              initial={reduced ? { opacity: 0 } : { opacity: 0, transform: "scale(1.06)" }}
              animate={{ opacity: 1, transform: "scale(1)" }}
              exit={{ opacity: 0 }}
              transition={{ opacity: { duration: 0.6, ease: "easeInOut" }, transform: { duration: 1.4, ease: [0.23, 1, 0.32, 1] } }}
            />
          </AnimatePresence>
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,color-mix(in_oklab,var(--color-cocoa)_70%,transparent),transparent_55%)]" />

          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-8">
            <div className="overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.p
                  key={step.track}
                  className="type-display text-display leading-[0.8]"
                  initial={reduced ? { opacity: 0 } : { transform: "translateY(100%)", opacity: 0 }}
                  animate={{ transform: "translateY(0%)", opacity: 1 }}
                  exit={reduced ? { opacity: 0 } : { transform: "translateY(-60%)", opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                >
                  {step.track}
                </motion.p>
              </AnimatePresence>
            </div>
            <div className="text-right">
              <p className="font-mono text-[22px] leading-none tabular sm:text-[28px]">{step.stat}</p>
              <p className="type-label mt-1 text-[10.5px] text-page/75">{step.statLabel}</p>
            </div>
          </div>

          {/* progress rail */}
          <div className="absolute top-5 right-5 bottom-28 w-[3px] overflow-hidden rounded-full bg-page/25 sm:top-8 sm:right-8">
            <motion.div className="absolute inset-0 origin-top rounded-full bg-honey" style={{ scaleY: scrollYProgress }} />
          </div>
          <div className="absolute top-5 left-5 flex gap-1.5 sm:top-8 sm:left-8">
            {steps.map((s, i) => (
              <span key={s.track} className={cn("h-1.5 rounded-full transition-[width,background-color] duration-(--duration-swap) ease-(--ease-out-strong)", i === active ? "w-6 bg-page" : "w-1.5 bg-page/40")} />
            ))}
          </div>
        </div>
        {aside}
      </div>

      {/* the steps */}
      <ol ref={list} className="relative">
        {steps.map((s, i) => (
          <Step key={s.track} step={s} index={i} active={i === active} onEnter={() => setActive(i)} />
        ))}
      </ol>
    </div>
  )
}

function Step({ step, index, active, onEnter }: { step: StoryStep; index: number; active: boolean; onEnter: () => void }) {
  const ref = useRef<HTMLLIElement>(null)
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" })
  useEffect(() => {
    if (inView) onEnter()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  return (
    <li ref={ref} className="flex min-h-[56svh] flex-col justify-center border-t border-line py-14 first:border-t-0 lg:min-h-[68svh]">
      <div className={cn("max-w-[520px] space-y-5 transition-opacity duration-500", active ? "opacity-100" : "opacity-35")}>
        <p className="type-label text-[11.5px] text-ember-ink">
          Track {String(index + 1).padStart(2, "0")} · {step.statLabel}
        </p>
        <h3 className="type-display text-h2">{step.title}</h3>
        <p className="text-lead text-ink-2">{step.body}</p>
      </div>
    </li>
  )
}
