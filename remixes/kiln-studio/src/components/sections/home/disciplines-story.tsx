import { useRef, useState, type ReactNode } from "react"
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react"
import { useCanvasAction } from "@canvas/react"

import { SectionLabel } from "@/components/blocks/section-label"
import { FieldApp } from "@/components/mock/field-app"
import { BrowserFrame, FitScreen, PhoneFrame } from "@/components/mock/frames"
import { GlazeLab } from "@/components/mock/glaze-lab"
import { PosterMaker } from "@/components/mock/poster-maker"
import { scrollToY } from "@/components/motion/smooth-scroll"
import { useMedia } from "@/lib/use-media"
import { cn } from "@/lib/utils"

type Step = { word: string; line: string; examples: string; device: () => ReactNode }

const STEPS: Step[] = [
  {
    word: "Experience",
    line: "Sites, games, installations and XR — things you play, walk through and touch. Like this one: pick a glaze, set the heat, fire.",
    examples: "Second Sight · Night Signal · Bowl Sessions",
    device: () => (
      <BrowserFrame url="glazelab.kiln.studio" className="w-full max-w-[640px]">
        <div className="h-[clamp(360px,46svh,430px)]">
          <GlazeLab />
        </div>
      </BrowserFrame>
    ),
  },
  {
    word: "Product",
    line: "Apps, tools and services people come back to every day. This one records the city: press the mic, then stop.",
    examples: "Hold Please · Glasshouse · Loud Mouth",
    device: () => (
      <PhoneFrame className="h-[min(74svh,660px)] max-sm:h-[600px]">
        <FitScreen width={390} height={844}>
          <FieldApp />
        </FitScreen>
      </PhoneFrame>
    ),
  },
  {
    word: "Communication",
    line: "Campaigns, film and identity that say one thing, loudly. Write the headline — the board sets it as big as it'll go.",
    examples: "Flock · Shadowplay · Say No",
    device: () => (
      <div className="w-full max-w-[640px]">
        <PosterMaker />
      </div>
    ),
  },
]

/**
 * What the studio makes, as a pinned stage: the three disciplines stacked
 * as one loud sentence on the left, and on the right a device that works —
 * a browser toy, a phone app, a billboard you write — swapping as you
 * scroll. The section is three windows tall; the stage holds still while
 * the words take turns. Below lg it unpins into three stacked chapters.
 */
export function DisciplinesStory() {
  const wide = useMedia("(min-width: 1024px)")
  return wide ? <PinnedStory /> : <StackedStory />
}

function PinnedStory() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  useMotionValueEvent(scrollYProgress, "change", (p) => setActive(Math.min(STEPS.length - 1, Math.max(0, Math.floor(p * STEPS.length * 0.999)))))
  useCanvasAction("What we make: next", () => setActive((a) => (a + 1) % STEPS.length), { group: "What we make" })

  const jump = (i: number) => {
    const el = ref.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    const run = el.offsetHeight - window.innerHeight
    scrollToY(top + run * ((i + 0.5) / STEPS.length))
  }

  return (
      <section ref={ref} aria-label="What we make" className="relative" style={{ height: `${STEPS.length * 100 + 40}svh` }}>
        <div className="sticky top-0 flex h-svh items-center overflow-hidden px-(--spacing-gutter)">
          <div className="grid w-full grid-cols-[1fr_1.1fr] items-center gap-[clamp(32px,5vw,96px)]">
            <div>
              <SectionLabel index="02">What we make</SectionLabel>
              <h2 className="type-head mt-8 text-[clamp(41.89px,6.4vw,109.66px)] leading-[0.92] tracking-[-0.052em]">
                {STEPS.map((s, i) => (
                  <span key={s.word} className="block whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => jump(i)}
                      aria-current={i === active ? "step" : undefined}
                      className={cn(
                        "text-left underline-offset-[0.1em] transition-[color,text-decoration-color] duration-(--duration-rise) ease-(--ease-out-strong)",
                        i === active ? "text-ink underline decoration-[0.05em]" : "text-ink-5 decoration-transparent hover:text-ink-4",
                      )}
                    >
                      {s.word}
                    </button>
                    <span className={cn("transition-colors duration-(--duration-rise)", i === active ? "text-ink" : "text-ink-5")}>{i < STEPS.length - 1 ? "," : "."}</span>
                  </span>
                ))}
              </h2>
              <div className="relative mt-10 h-[150px] max-w-[46ch]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, transform: reduced ? "none" : "translateY(10px)" }}
                    animate={{ opacity: 1, transform: "translateY(0px)" }}
                    exit={{ opacity: 0, transform: reduced ? "none" : "translateY(-6px)" }}
                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <p className="text-lead text-ink-2">{STEPS[active].line}</p>
                    <p className="type-label mt-4 text-ink-4">{STEPS[active].examples}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
              {/* progress: three segments, the current one filling with the scroll */}
              <div className="mt-8 flex items-center gap-4">
                <span className="type-label text-ink-3 tabular-nums">
                  {String(active + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
                </span>
                <span className="flex gap-1.5">
                  {STEPS.map((s, i) => (
                    <span key={s.word} className="h-[3px] w-10 overflow-hidden rounded-full bg-raised">
                      <span className={cn("block h-full origin-left bg-ember transition-transform duration-(--duration-rise) ease-(--ease-out-strong)", i <= active ? "scale-x-100" : "scale-x-0")} />
                    </span>
                  ))}
                </span>
              </div>
            </div>
            <div className="relative flex h-[min(80svh,720px)] items-center justify-center">
              <div aria-hidden className="absolute inset-[8%] rounded-full bg-ember-deep/25 blur-[100px]" />
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={active}
                  className="relative flex w-full items-center justify-center"
                  initial={{ opacity: 0, transform: reduced ? "none" : "translateY(40px) scale(0.96)" }}
                  animate={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
                  exit={{ opacity: 0, transform: reduced ? "none" : "translateY(-30px) scale(0.98)" }}
                  transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
                >
                  {STEPS[active].device()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
  )
}

/** Below lg: three chapters, unpinned. */
function StackedStory() {
  return (
      <section aria-label="What we make" className="px-(--spacing-gutter) py-(--spacing-section)">
        <SectionLabel index="02">What we make</SectionLabel>
        <div className="mt-10 flex flex-col gap-24">
          {STEPS.map((s, i) => (
            <div key={s.word} className="flex flex-col gap-8">
              <div>
                <h3 className="type-head text-display text-ink">
                  {s.word}
                  {i < STEPS.length - 1 ? "," : "."}
                </h3>
                <p className="mt-5 max-w-[46ch] text-lead text-ink-2">{s.line}</p>
                <p className="type-label mt-4 text-ink-4">{s.examples}</p>
              </div>
              <div className="flex justify-center">{s.device()}</div>
            </div>
          ))}
        </div>
      </section>
  )
}
