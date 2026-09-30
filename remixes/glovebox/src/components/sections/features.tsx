import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react"
import { ArrowUp, Mic, Plus } from "lucide-react"
import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"

import { TaskPanel, TaskRow } from "@/components/blocks/task-panel"
import { ClipCard } from "@/components/motion/clip-card"
import { mixToken, useRange } from "@/components/motion/progress"
import { Reveal } from "@/components/motion/reveal"
import { TypeLine } from "@/components/motion/type-line"
import { Container } from "@/components/ui/container"
import { LogoMark } from "@/components/ui/logo-mark"
import { SectionHeading } from "@/components/ui/section-heading"
import { media } from "@/content"
import { cn } from "@/lib/utils"

/**
 * What Glovebox does, as three cards stacked in place: each pins in the
 * middle of the screen and the next slides up over it. It reads your
 * policies, keeps you in the loop, and answers your questions.
 */
export function Features() {
  const second = useRef<HTMLDivElement>(null)
  const third = useRef<HTMLDivElement>(null)
  return (
    <section id="features" className="relative pt-[16svh] pb-[8svh] sm:pt-[18svh]">
      <Container className="flex flex-col items-center">
        <Reveal>
          <LogoMark className="size-16 text-ink sm:size-24" />
        </Reveal>
        <Reveal delay={0.08}>
          <SectionHeading size="lg" className="mt-6 sm:mt-8">
            AI that runs your
            <br />
            car insurance
          </SectionHeading>
        </Reveal>
      </Container>

      {/* One shared container, so each sticky stage pins while the next
          slides up over it; the bottom padding holds the last card. */}
      <div data-canvas-ignore className="relative mt-[8svh] pb-[35svh] sm:mt-[10svh]">
        <FeatureRow
          index={0}
          side="left"
          title="Glovebox reads your policies"
          body="Forward a renewal letter or connect your insurer. Glovebox pulls out the cover, the excess and every date that matters."
          src={media.policies.src}
          poster={media.policies.poster}
          next={second}
        >
          <PoliciesPanel />
        </FeatureRow>
        <FeatureRow
          ref={second}
          index={1}
          side="right"
          title="Keeps you in the loop"
          body="Watch renewals and claims move on their own, and step in only when a decision is really yours."
          src={media.loop.src}
          poster={media.loop.poster}
          next={third}
        >
          <LoopPanel />
        </FeatureRow>
        <FeatureRow
          ref={third}
          index={2}
          side="left"
          title="And answers your questions"
          body="Can a friend borrow the car? What's your excess on the Civic? Ask the way you'd ask a person."
          src={media.answers.src}
          poster={media.answers.poster}
        >
          <AskPanel />
        </FeatureRow>
      </div>
    </section>
  )
}

type FeatureRowProps = {
  index: number
  side: "left" | "right"
  title: string
  body: string
  src: string
  poster: string
  /** The stage that slides over this one, if any. */
  next?: React.RefObject<HTMLDivElement | null>
  ref?: React.Ref<HTMLDivElement>
  children?: React.ReactNode
}

/**
 * One pinned stage: the card holds still in the middle of the screen while
 * the next stage slides up over it. As it is covered it settles back a
 * little and its caption fades, so the captions of stacked cards never
 * overlap.
 */
function FeatureRow({ index, side, title, body, src, poster, next, ref, children }: FeatureRowProps) {
  const own = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress: arriving } = useScroll({ target: own, offset: ["start end", "start start"] })
  const { scrollYProgress: covering } = useScroll({ target: next ?? own, offset: ["start end", "start start"] })
  const covered = useTransform(covering, (v) => (next ? v : 0))

  // Ink while this card holds the screen, faint before it arrives.
  const lit = useRange(arriving, [0.55, 0.95], [0, 1])
  const heading = useTransform(lit, (p) => mixToken("--color-faint", "--color-ink", p))
  const copy = useTransform(lit, (p) => mixToken("--color-faint", "--color-ink-soft", p))
  const captionOpacity = useRange(covered, [0.35, 0.75], [1, 0])
  const settle = useTransform(useRange(covered, [0, 1], [1, 0.92]), (s) => `scale(${s})`)

  return (
    <div
      ref={(node) => {
        own.current = node
        if (typeof ref === "function") ref(node)
        else if (ref) ref.current = node
      }}
      data-canvas-ignore
      className="sticky top-0 flex h-svh flex-col justify-center px-3 pt-16 pb-6 sm:px-6 xl:pt-0 xl:pb-0"
      style={{ zIndex: index + 1 }}
    >
      <motion.div
        data-canvas-ignore
        style={{ transform: reduce ? "none" : settle }}
        className="mx-auto w-full max-w-[66rem] origin-top xl:w-[min(56vw,calc(76svh*1.5))]"
      >
        <ClipCard
          src={src}
          poster={poster}
          radius={48}
          className="grid aspect-[4/5] max-h-[62svh] grid-cols-[minmax(0,1fr)] place-items-center px-4 sm:aspect-[16/11] sm:max-h-none sm:px-10 xl:aspect-[3/2]"
        >
          <Reveal distance={20} className="w-full max-w-[35rem]">
            {children}
          </Reveal>
        </ClipCard>
      </motion.div>
      <motion.div
        style={{ opacity: captionOpacity }}
        className={cn(
          "mx-auto mt-5 w-full max-w-[66rem] px-1 sm:mt-8 xl:absolute xl:top-1/2 xl:mt-0 xl:w-[min(16rem,calc(19vw-2rem))] xl:-translate-y-1/2 xl:px-0",
          side === "left" ? "xl:left-[4.5vw]" : "xl:right-[4.5vw]",
        )}
      >
        <motion.h3
          style={{ color: heading }}
          className="max-w-[14ch] font-display text-[clamp(1.625rem,0.9vw+1.1rem,2.125rem)] leading-[1.08] tracking-[-0.02em]"
        >
          {title}
        </motion.h3>
        <motion.p style={{ color: copy }} className="mt-3 max-w-[34ch] text-[15px] leading-[1.45] sm:text-base">
          {body}
        </motion.p>
      </motion.div>
    </div>
  )
}

/**
 * Steps a panel through its jobs, one every `interval` seconds, the first
 * time it is on screen. In the editor it rests on the last step, the state
 * worth styling.
 */
function useSteps(ref: React.RefObject<Element | null>, count: number, interval = 2.4) {
  const inView = useInView(ref, { once: true, margin: "0px 0px -25% 0px" })
  const { designing } = useCanvasDesignMode()
  const [step, setStep] = useState(0)
  useEffect(() => {
    if (!inView || designing) return
    if (step >= count - 1) return
    const id = window.setTimeout(() => setStep((s) => s + 1), interval * 1000)
    return () => window.clearTimeout(id)
  }, [inView, designing, step, count, interval])
  return designing ? count - 1 : step
}

export function PoliciesPanel() {
  const ref = useRef<HTMLDivElement>(null)
  const step = useSteps(ref, 3)
  return (
    <div ref={ref} className="w-full min-w-0">
      <TaskPanel>
        <TaskRow
          icon="search"
          label="Reading policy from Harbor Mutual"
          state={step === 0 ? "running" : "done"}
          status={step === 0 ? "Extracting cover…" : "3 cars, 4 drivers"}
        />
        <TaskRow
          icon="shield"
          label="Checking the excess on the Outback"
          state={step === 0 ? "queued" : step === 1 ? "running" : "done"}
          status={step === 0 ? "Up next" : step === 1 ? "Reading…" : "$500"}
        />
      </TaskPanel>
    </div>
  )
}

export function LoopPanel() {
  const ref = useRef<HTMLDivElement>(null)
  const step = useSteps(ref, 3, 2.6)
  return (
    <div ref={ref} className="w-full min-w-0">
      <TaskPanel>
        <TaskRow
          icon="filter"
          label="Compare 41 renewal quotes"
          state={step === 0 ? "running" : "done"}
          status={step === 0 ? "Comparing…" : "$312 cheaper"}
        />
        <TaskRow
          icon="refresh"
          label="Switch the Outback to Northway"
          state={step === 0 ? "queued" : step === 1 ? "running" : "done"}
          status={step === 0 ? "Up next" : step === 1 ? "Waiting on you" : "Approved"}
        />
        <TaskRow icon="gauge" label="Update the Civic's mileage" state="queued" status="Next week" />
      </TaskPanel>
    </div>
  )
}

export function AskPanel() {
  const [answered, setAnswered] = useState(false)
  useCanvasAction("Answer shown", (next) => setAnswered(next ?? !answered), { on: answered, group: "Features" })

  return (
    <div className="flex w-full flex-col items-center gap-3">
      <div className="flex min-h-14 w-full items-center gap-3 rounded-full bg-surface py-2 pr-2 pl-4 shadow-panel">
        <Plus className="size-5 shrink-0 text-muted" strokeWidth={1.4} />
        <TypeLine
          text="Am I covered if Sam drives the Outback this weekend?"
          className="min-w-0 flex-1 text-left text-sm text-ink sm:text-[15px]"
          onDone={() => setAnswered(true)}
        />
        <Mic className="hidden size-4 shrink-0 text-muted sm:block" strokeWidth={1.5} />
        <span className="grid size-9 shrink-0 place-items-center rounded-full border border-ink/70 text-ink">
          <ArrowUp className="size-4" strokeWidth={1.6} />
        </span>
      </div>
      <AnimatePresence>
        {answered && (
          <motion.div
            initial={{ opacity: 0, transform: "translateY(8px) scale(0.98)" }}
            animate={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1], delay: 0.3 }}
            className="w-full rounded-panel bg-surface-soft p-4 text-left shadow-panel sm:p-5"
          >
            <p className="flex items-center gap-2 text-sm text-muted">
              <LogoMark className="size-4 text-ink" />
              Glovebox
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink sm:text-[15px]">
              Yes. Sam is listed as an occasional driver on your Harbor Mutual policy until March 27. If anything
              happens, the excess is <span className="font-mono text-money">$500</span>.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
