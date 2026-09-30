import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react"
import { Flame, Lock, Plus, SlidersHorizontal } from "lucide-react"
import { useRef, useState } from "react"
import { useCanvasAction } from "@canvas/react"

import { Container } from "@/components/ui/container"
import { Eyebrow } from "@/components/ui/eyebrow"
import { MetalCard, type MetalFinish } from "@/components/ui/metal-card"
import { SplitText } from "@/components/motion/split-text"
import { STEPS } from "@/content"
import { cn } from "@/lib/utils"

const ICONS = [Plus, Lock, SlidersHorizontal, Flame]
const EASE = [0.23, 1, 0.32, 1] as const

// Each step wears its own finish, so the change of state is felt, not read.
const STEP_FINISHES: MetalFinish[] = ["titanium", "chrome", "champagne", "graphite"]

/**
 * The card in the middle of "How it works", in whichever state the step is
 * about: new, locked to a shop, capped, or burned. It is the same card
 * throughout — it turns a little and changes metal as the steps pass, and
 * once burned it goes to cold graphite and dims.
 */
export function StepCard({ step, holder = "Nora Lindqvist", last4 = "4821" }: { step: number; holder?: string; last4?: string }) {
  const reduce = useReducedMotion()
  const burned = step === 3
  return (
    <div className="relative mx-auto w-full max-w-[420px]">
      <motion.div
        aria-hidden
        className="absolute -inset-12 -z-10 rounded-full bg-accent/10 blur-3xl"
        animate={{ opacity: burned ? 0.2 : 0.7 }}
        transition={{ duration: 0.6, ease: EASE }}
      />
      <motion.div
        className="relative"
        animate={
          reduce
            ? { opacity: burned ? 0.45 : 1 }
            : { opacity: burned ? 0.45 : 1, transform: `rotate(${[-6, -2, 2, 5][step]}deg) scale(${burned ? 0.95 : 1})` }
        }
        transition={{ duration: 0.6, ease: EASE }}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={step}
            className="[&:not(:first-child)]:absolute [&:not(:first-child)]:inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <MetalCard finish={STEP_FINISHES[step]} holder={holder} last4={last4} label={burned ? "Burned" : "Virtual"} />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <div className="mt-8 flex h-10 justify-center">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={step}
            className={cn(
              "inline-flex h-10 items-center gap-2 rounded-chip px-4 text-sm font-medium shadow-chip",
              burned ? "metal metal-graphite text-ink-soft" : "bg-surface-raised text-ink",
            )}
            initial={reduce ? { opacity: 0 } : { opacity: 0, filter: "blur(6px)", transform: "translateY(12px)" }}
            animate={{ opacity: 1, filter: "blur(0px)", transform: "translateY(0px)" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, filter: "blur(6px)", transform: "translateY(-12px)" }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            {STEPS.items[step].tag}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  )
}

/** One row of the step list: number, title, and the body when it is the current step. */
export function StepItem({ index, active, title, body }: { index: number; active: boolean; title: string; body: string }) {
  const Icon = ICONS[index]
  return (
    <li className={cn("border-t border-hairline py-5 transition-opacity duration-500 ease-out", active ? "opacity-100" : "opacity-35")}>
      <div className="flex items-center gap-4">
        <span
          className={cn(
            "grid size-9 shrink-0 place-items-center rounded-full transition-colors duration-500 ease-out",
            active ? "metal metal-champagne text-inverse-ink" : "bg-surface-raised text-muted",
          )}
        >
          <Icon className="size-4" />
        </span>
        <h3 className="font-serif text-[1.75rem] leading-none text-ink">{title}</h3>
        <span className="ml-auto font-mono text-xs text-subtle">0{index + 1}</span>
      </div>
      <div
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-500 ease-out",
          active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <p className="overflow-hidden pt-3 pl-13 text-[0.9375rem] leading-relaxed text-muted">{body}</p>
      </div>
    </li>
  )
}

/** Registers one step as a switch in the canvas editor's Actions row. */
function StepAction({ label, on, onShow }: { label: string; on: boolean; onShow: () => void }) {
  useCanvasAction(label, onShow, { on, group: "How it works" })
  return null
}

/**
 * "How it works", pinned: the section is four screens tall and its content
 * stays on screen while the scroll walks through the four steps — the list
 * highlights the current one and the card beside it changes state to match.
 */
export function StickySteps({ eyebrow = STEPS.eyebrow, title = STEPS.title, screensPerStep = 0.8 }: { eyebrow?: string; title?: string; screensPerStep?: number }) {
  const ref = useRef<HTMLElement>(null)
  const [step, setStep] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setStep(Math.min(STEPS.items.length - 1, Math.max(0, Math.floor(p * STEPS.items.length))))
  })
  const progress = (step + 1) / STEPS.items.length

  return (
    <section
      id="how"
      ref={ref}
      className="relative"
      style={{ height: `${100 + STEPS.items.length * screensPerStep * 100}svh` }}
    >
      {STEPS.items.map((item, i) => (
        <StepAction key={item.title} label={`Step ${i + 1}: ${item.title}`} on={step === i} onShow={() => setStep(i)} />
      ))}
      <div data-canvas-ignore className="sticky top-0 flex h-svh items-center overflow-hidden">
        <Container className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <div className="order-2 lg:order-1">
            <Eyebrow label={eyebrow} className="mb-5" />
            <SplitText text={title} className="font-serif text-headline text-ink" />
            <ol className="mt-8 hidden lg:block">
              {STEPS.items.map((item, i) => (
                <StepItem key={item.title} index={i} active={i === step} title={item.title} body={item.body} />
              ))}
            </ol>
            <div className="mt-6 lg:hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={step}
                  initial={{ opacity: 0, filter: "blur(6px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(6px)" }}
                  transition={{ duration: 0.25, ease: EASE }}
                >
                  <p className="font-serif text-2xl text-ink">
                    <span className="mr-2 font-mono text-sm text-accent">0{step + 1}</span>
                    {STEPS.items[step].title}
                  </p>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{STEPS.items[step].body}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="mt-6 h-px w-full bg-hairline" aria-hidden>
              <div
                className="h-px origin-left bg-accent transition-transform duration-500 ease-out"
                style={{ transform: `scaleX(${progress})` }}
              />
            </div>
          </div>
          <div className="order-1 px-6 lg:order-2">
            <StepCard step={step} />
          </div>
        </Container>
      </div>
    </section>
  )
}
