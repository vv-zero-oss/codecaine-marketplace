import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Heading } from "@/components/ui/heading"
import { Section } from "@/components/ui/section"
import { SCALE } from "@/content/home"

/**
 * An exponential curve that reveals itself left to right over 1.2s, with the
 * fine line texture filling the area under it.
 */
export function GrowthCurve() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" })
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const shown = inView || reduced || designing
  const d = "M0 300 C 180 296, 300 284, 380 262 S 520 190, 580 120 S 660 20, 700 0"

  return (
    <div ref={ref} className="relative h-[320px] w-full">
      <svg viewBox="0 0 700 300" preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible" fill="none">
        <defs>
          <pattern id="curve-lines" width="8" height="8" patternUnits="userSpaceOnUse">
            <rect width="1" height="8" fill="var(--accent-strong)" opacity="0.35" />
          </pattern>
          <linearGradient id="curve-fade" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0.9" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id="curve-mask">
            <rect width="700" height="300" fill="url(#curve-fade)" />
          </mask>
        </defs>
        <g
          style={{
            clipPath: shown ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
            transition: "clip-path 1.2s var(--ease-reveal) 0.1s",
          }}
        >
          <path d={`${d} V300 H0 Z`} fill="url(#curve-lines)" mask="url(#curve-mask)" />
          <path d={d} stroke="var(--accent-strong)" strokeWidth={2} vectorEffect="non-scaling-stroke" />
        </g>
      </svg>
      <motion.span
        className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 rounded-control bg-accent-strong px-2 py-0.5 text-caption font-medium text-white"
        initial={{ opacity: 0 }}
        animate={shown ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 1.3 }}
      >
        IPO
      </motion.span>
    </div>
  )
}

/** Does it scale: four numbers, each on a blue rule, and the curve they draw. */
export function Scale() {
  return (
    <Section id="scale">
      <Container className="grid grid-cols-1 [&>*]:min-w-0 gap-14 py-[var(--spacing-section)] lg:grid-cols-2 lg:items-end">
        <Reveal className="flex flex-col items-start gap-6">
          <Eyebrow>{SCALE.eyebrow}</Eyebrow>
          <Heading lead={SCALE.lead} rest={SCALE.rest} className="max-w-[14ch]" />
          <dl className="mt-8 grid w-full max-w-[528px] grid-cols-2 gap-y-10">
            {SCALE.stats.map((s) => (
              <div key={s.label} className="border-l-2 border-accent-strong pl-6">
                <dt className="font-display text-[32px] leading-8 font-medium tracking-[-0.01em] text-ink tabular">{s.value}</dt>
                <dd className="mt-2 text-base text-ink-2">{s.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <GrowthCurve />
      </Container>
    </Section>
  )
}
