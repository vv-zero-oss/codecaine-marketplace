import { useRef, useState } from "react"
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react"
import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"

import { PROCESS } from "@/content/site"
import { photo } from "@/lib/photos"
import { cn } from "@/lib/utils"

const EASE = [0.23, 1, 0.32, 1] as const

/**
 * How a story gets made, in four words. The section pins for four screens;
 * each screen's worth of scroll swaps the oversized word, opens the next
 * photograph from the bottom (a clip-path wipe) and moves the rail along.
 * Below md it unpins into a plain list — a pinned scene on a phone fights
 * the thumb.
 */
export function ProcessPinned({
  title = "How a story gets made",
  screensPerStep = 0.9,
}: {
  title?: string
  /** Scroll length per step, in screens. */
  screensPerStep?: number
}) {
  const ref = useRef<HTMLElement>(null)
  const [step, setStep] = useState(0)
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (designing) return
    setStep(Math.min(PROCESS.length - 1, Math.floor(v * PROCESS.length)))
  })
  useCanvasAction("Process step", () => setStep((s) => (s + 1) % PROCESS.length), { group: "Process" })

  const item = PROCESS[step]
  const fade = reduced ? { opacity: 0 } : { opacity: 0, transform: "translateY(40%)" }

  return (
    <>
      {/* md and up: the pinned scene */}
      <section
        ref={ref}
        aria-label={title}
        className="relative hidden border-t border-line md:block"
        style={{ height: `${100 + PROCESS.length * screensPerStep * 100}vh` }}
      >
        <div className="sticky top-0 grid h-svh grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] gap-[3.2vw] px-gutter pt-28 pb-12">
          <div className="flex min-h-0 flex-col">
            <p className="type-title text-[19px] text-ink">{title}</p>
            {/* the oversized word */}
            <div className="relative mt-auto overflow-hidden pb-[0.06em]">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.p
                  key={item.word}
                  initial={fade}
                  animate={{ opacity: 1, transform: "translateY(0%)" }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, transform: "translateY(-40%)" }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="type-display text-mega text-ink"
                >
                  {item.word}.
                </motion.p>
              </AnimatePresence>
            </div>
            <div className="mt-8 grid grid-cols-[auto_1fr] items-start gap-8 border-t border-rule pt-6">
              <span className="font-serif text-h3 text-ink-3 tabular-nums">{item.n}</span>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={item.n}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="font-serif text-h4 text-ink">{item.title}</p>
                  <p className="mt-3 max-w-[48ch] font-serif text-[16px] leading-[1.55] text-ink-2">{item.body}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          <div className="relative min-h-0">
            {PROCESS.map((p, i) => (
              <motion.div
                key={p.n}
                className="absolute inset-0 overflow-hidden bg-sheet"
                initial={false}
                animate={{ clipPath: i <= step ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" }}
                transition={{ duration: reduced ? 0 : 0.9, ease: [0.77, 0, 0.175, 1] }}
                style={{ zIndex: i }}
              >
                <motion.img
                  src={photo(p.photo, 1400)}
                  alt=""
                  className="size-full object-cover"
                  initial={false}
                  animate={{ transform: i === step || reduced ? "scale(1)" : "scale(1.08)" }}
                  transition={{ duration: 1.2, ease: EASE }}
                />
              </motion.div>
            ))}
            {/* the rail */}
            <ol className="absolute top-0 -left-[1.6vw] flex h-full flex-col justify-between py-1" aria-hidden>
              {PROCESS.map((p, i) => (
                <li key={p.n} className={cn("h-full w-px transition-colors duration-(--duration-swap)", i <= step ? "bg-ink" : "bg-line-strong")} />
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* below md: the same story as a list */}
      <section aria-label={title} className="border-t border-line px-gutter py-section md:hidden">
        <p className="type-title text-[19px] text-ink">{title}</p>
        <ol className="mt-10 flex flex-col gap-16">
          {PROCESS.map((p) => (
            <li key={p.n}>
              <p className="type-display text-mega text-ink">{p.word}.</p>
              <img src={photo(p.photo, 900)} alt="" loading="lazy" className="mt-6 aspect-[4/3] w-full object-cover" />
              <div className="mt-5 grid grid-cols-[2.5rem_1fr] gap-3 border-t border-rule pt-4">
                <span className="font-serif text-ink-3 tabular-nums">{p.n}</span>
                <div>
                  <p className="font-serif text-lead text-ink">{p.title}</p>
                  <p className="mt-2 font-serif text-ink-2">{p.body}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </>
  )
}
