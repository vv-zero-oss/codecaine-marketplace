import { useRef } from "react"
import { ChevronRight } from "lucide-react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"

import { Fit } from "@/components/mockups/kit"
import { HeroApp } from "@/components/mockups/hero-app"
import { Reveal } from "@/components/motion/reveal"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Heading } from "@/components/ui/heading"
import { Section } from "@/components/ui/section"
import { HERO } from "@/content/home"
import { Link } from "@/lib/router"

/**
 * Hero: a pill, the promise in two lines, one sentence of how, two buttons —
 * then the product doing it. The copy comes into focus in order; the app
 * window settles back slightly as the page starts to scroll.
 */
export function Hero() {
  const stage = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: stage, offset: ["start 70%", "start 20%"] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 0.95])

  return (
    <Section id="top" className="overflow-hidden">
      <div
        aria-hidden
        className="texture-lines pointer-events-none absolute inset-x-0 bottom-0 h-[70%] opacity-60 [mask-image:linear-gradient(to_bottom,transparent,#000_40%,#000)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-[radial-gradient(60%_60%_at_50%_100%,color-mix(in_oklab,var(--purple)_16%,transparent),transparent_70%)]"
      />
      <Container className="relative flex flex-col items-center pt-16 text-center md:pt-24">
        <Reveal onMount>
          <Link
            href="/changelog"
            className="group/link inline-flex h-[30px] items-center gap-1 rounded-[13px] border border-line-strong py-1 pr-2 pl-3 text-[13px] text-ink-soft transition-colors duration-300 hover:bg-surface hover:duration-[50ms]"
          >
            <span className="size-1.5 rounded-full bg-green" />
            <span className="ml-1">{HERO.pill}</span>
            <ChevronRight className="size-3.5 text-ink-3 transition-transform duration-200 group-hover/link:translate-x-0.5" />
          </Link>
        </Reveal>
        <Reveal onMount delay={0.1} className="mt-9">
          <Heading as="h1" size="display" lead={HERO.title[0]} className="max-w-[14ch]" />
          <Heading as="p" size="display" rest={HERO.title[1]} className="max-w-[16ch]" />
        </Reveal>
        <Reveal onMount delay={0.2} className="mt-6">
          <p className="max-w-[27em] text-base text-ink-2 md:text-lead">{HERO.body}</p>
        </Reveal>
        <Reveal onMount delay={0.3} className="mt-9 flex gap-2.5">
          <ButtonLink href="/pricing" variant="outline">
            {HERO.secondary}
          </ButtonLink>
          <ButtonLink href="/pricing" variant="primary">
            {HERO.primary}
          </ButtonLink>
        </Reveal>
      </Container>

      <div ref={stage} className="relative mx-auto mt-16 w-full max-w-[1280px] px-3 pb-0 md:mt-20 md:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0, 0, 0, 1], delay: 0.4 }}
        >
          <motion.div style={{ scale }} className="origin-top">
            <Fit width={1280}>
              <HeroApp />
            </Fit>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  )
}
