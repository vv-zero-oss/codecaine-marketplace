import { Frame, MousePointer2 } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import type * as React from "react"

import { HeroVideo } from "@/components/hero-video"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

/** The curve every entrance on this page shares: out, strongly. */
const EASE = [0.23, 1, 0.32, 1] as const

/** A small tile that sits in the headline at the height of the letters. */
function InlineChip({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "mx-[0.17em] inline-flex size-[0.82em] items-center justify-center rounded-[0.22em] align-[-0.07em]",
        className,
      )}
    >
      {children}
    </span>
  )
}

/**
 * The headline, three lines, with a tile in each: the product's own icon, the
 * pointer, and the frame tool. Each line rises in on its own, 80ms behind the
 * one above; reduced motion shows it set.
 */
function HeroHeading() {
  const reduced = useReducedMotion()
  const line = (i: number) => ({
    initial: reduced ? false : { opacity: 0, transform: "translateY(18px)" },
    animate: { opacity: 1, transform: "translateY(0px)" },
    transition: { duration: 0.7, delay: 0.08 * i, ease: EASE },
  })
  return (
    <h1 className="mx-auto text-balance text-center text-display font-semibold text-ink">
      <motion.span className="block" {...line(0)}>
        Where
        <InlineChip>
          <img src="/brand/canvas-icon.png" alt="" className="size-full" />
        </InlineChip>
        designers
      </motion.span>
      <motion.span className="block" {...line(1)}>
        and agents
        <InlineChip className="bg-surface text-ink">
          <MousePointer2 className="size-[0.46em]" strokeWidth={2.4} fill="currentColor" />
        </InlineChip>
        build
      </motion.span>
      <motion.span className="block" {...line(2)}>
        sites
        <InlineChip className="bg-purple text-white">
          <Frame className="size-[0.46em]" strokeWidth={2.4} />
        </InlineChip>
        that ship
      </motion.span>
    </h1>
  )
}

/**
 * The first screen: the claim, one line under it, two ways in, and the
 * product doing the thing, in a frame.
 */
export function Hero() {
  const reduced = useReducedMotion()
  const rise = (delay: number) => ({
    initial: reduced ? false : { opacity: 0, transform: "translateY(14px)" },
    animate: { opacity: 1, transform: "translateY(0px)" },
    transition: { duration: 0.7, delay, ease: EASE },
  })

  return (
    <section id="top" className="pt-[clamp(112px,23vw,330px)] pb-[clamp(40px,6vw,96px)]">
      <Container className="max-w-none px-[clamp(16px,4.6vw,80px)]">
        <HeroHeading />
        <motion.p
          {...rise(0.3)}
          className="mx-auto mt-[clamp(18px,2.8vw,40px)] max-w-[44ch] text-center text-lead text-ink-2"
        >
          The design editor for the web.
          <br />
          Draw it, direct it, or hand it to an agent.
        </motion.p>
        <motion.div {...rise(0.4)} className="mt-[clamp(26px,3.6vw,52px)] flex flex-wrap items-center justify-center gap-2.5">
          <ButtonLink href="#download" variant="ink" size="lg">
            Download Canvas
          </ButtonLink>
          <ButtonLink href="#how" variant="soft" size="lg">
            See how it works
            <ArrowRight aria-hidden />
          </ButtonLink>
        </motion.div>

        <motion.div
          {...rise(0.55)}
          className="mx-auto mt-[clamp(48px,13.5vw,195px)] rounded-frame bg-surface p-[clamp(10px,3.2vw,46px)]"
        >
          <HeroVideo
            src="/media/hero-build.mp4"
            poster="/media/hero-build-poster.jpg"
            className="rounded-screen"
          />
        </motion.div>
      </Container>
    </section>
  )
}
