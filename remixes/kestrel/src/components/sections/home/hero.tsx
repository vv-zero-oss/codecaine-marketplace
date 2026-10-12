import { motion, useReducedMotion } from "motion/react"
import { Sparkle } from "lucide-react"

import { EmailCapture } from "@/components/blocks/email-capture"
import { HeroStage } from "@/components/motion/hero-stage"
import { LiveCounter } from "@/components/motion/live-counter"
import { Marquee } from "@/components/motion/marquee"
import { Container } from "@/components/ui/container"
import { AGENT_COUNTERS, HERO } from "@/content/home-top"

const EASE = [0.23, 1, 0.32, 1] as const

/** The eyebrow: a running share of all spend Kestrel has reconciled today. */
function SpendTicker() {
  return (
    <p className="flex flex-wrap items-center gap-2 type-eyebrow text-ink-2">
      {HERO.tickerLabel}
      <span className="rounded-(--radius-chip) bg-panel px-1.5 py-0.5 text-[11.5px] text-ink shadow-(--shadow-hairline)">
        <LiveCounter start={HERO.tickerStart} rate={0.0000031} decimals={7} suffix="%" interval={140} />
      </span>
    </p>
  )
}

/** One live counter in the strip: label, then the figure in a chip. */
function AgentCounter({ label, start, rate }: { label: string; start: number; rate: number }) {
  return (
    <span className="flex shrink-0 items-center gap-2 border-l border-line px-5 type-eyebrow text-ink-3">
      {label}:
      <span className="rounded-(--radius-chip) bg-panel px-1.5 py-0.5 text-[11.5px] text-ink">
        <LiveCounter start={start} rate={rate} interval={1100} />
      </span>
    </span>
  )
}

/** "Agents at work today": the label pinned, the counters drifting past. */
function AgentStrip() {
  return (
    <div className="flex items-center border-y border-line bg-page">
      <p className="flex shrink-0 items-center gap-2 py-3 pr-4 type-eyebrow text-ink">
        <Sparkle className="size-3.5" strokeWidth={1.8} />
        <span className="hidden sm:inline">Agents at work today</span>
        <span className="sm:hidden">Today</span>
      </p>
      <Marquee speed={70} className="min-w-0 flex-1 py-3 [mask-image:linear-gradient(90deg,transparent,black_6%,black_90%,transparent)]">
        {AGENT_COUNTERS.map((c) => (
          <AgentCounter key={c.label} {...c} />
        ))}
      </Marquee>
    </div>
  )
}

/**
 * The hero: a live ticker, the promise in two tones, the email field, and
 * the product working on its own in a panel on the dot grid.
 */
export function Hero() {
  const reduced = useReducedMotion()
  const rise = (delay: number) =>
    reduced
      ? {}
      : { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, ease: EASE, delay } }

  return (
    <section id="top" className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[720px] dot-grid [mask-image:linear-gradient(180deg,black_30%,transparent)]" aria-hidden />
      <Container className="relative pt-12 sm:pt-16 lg:pt-20">
        <motion.div {...rise(0)}>
          <SpendTicker />
        </motion.div>
        <motion.h1 {...rise(0.06)} className="type-head mt-5 max-w-[16ch] text-h1 text-balance text-ink lg:max-w-none">
          {HERO.title} <span className="text-ink-soft">{HERO.continuation}</span>
        </motion.h1>
        <motion.p {...rise(0.12)} className="mt-4 max-w-[60ch] text-lead text-ink-2">
          {HERO.body}
        </motion.p>
        <motion.div {...rise(0.18)} className="mt-7">
          <EmailCapture cta={HERO.cta} name="Hero signup" />
        </motion.div>

        <motion.div
          {...(reduced ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, ease: EASE, delay: 0.26 } })}
          className="relative mt-6 overflow-hidden rounded-(--radius-panel) bg-panel px-2 pt-6 pb-4 shadow-(--shadow-hairline) sm:px-6 sm:pt-10"
        >
          <div className="pointer-events-none absolute inset-0 dot-grid opacity-70 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" aria-hidden />
          <HeroStage className="relative" />
        </motion.div>
      </Container>
      <Container className="mt-8">
        <AgentStrip />
      </Container>
    </section>
  )
}
