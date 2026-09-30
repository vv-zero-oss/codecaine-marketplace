import { useLayoutEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "motion/react"

import { ClipShape } from "@/components/blocks/clip-shape"
import { Eyebrow } from "@/components/blocks/eyebrow"
import { Film } from "@/components/blocks/film"
import { Photo } from "@/components/blocks/photo"
import { RiseText } from "@/components/blocks/rise-text"
import { process } from "@/content"
import { useMedia } from "@/hooks/use-media"
import type { ShapeName } from "@/lib/shapes"

const SHAPES: ShapeName[] = ["scallop", "arch", "pill", "blob", "burst"]

export type Step = (typeof process.steps)[number]

export function StepCard({ step, index }: { step: Step; index: number }) {
  return (
    <article className="flex w-full shrink-0 flex-col gap-6 md:w-[min(30vw,440px)]">
      <ClipShape shape={SHAPES[index % SHAPES.length]} className="aspect-[5/4] w-full bg-forest/10">
        {"film" in step && step.film ? (
          <Film film={step.film} />
        ) : "photo" in step && step.photo ? (
          <Photo photo={step.photo} width={900} className="absolute inset-0" />
        ) : null}
      </ClipShape>
      <div className="flex items-baseline justify-between gap-4 border-t-2 border-forest pt-4">
        <span className="font-condensed text-label uppercase">{step.n}</span>
        <span className="rounded-pill bg-orange px-3 py-1 font-condensed text-caption uppercase">{step.time}</span>
      </div>
      <h3 className="font-heavy text-[clamp(40px,5vw,80px)] leading-[0.85]">{step.title}</h3>
      <p className="max-w-[38ch] text-body text-ink-soft">{step.body}</p>
    </article>
  )
}

/**
 * Start to finish, as a row you travel along: pinned on wide screens, the
 * vertical scroll turns into a sideways move through the five steps, with a
 * bar filling underneath to say how far along you are. Each step's picture is
 * a different shape, and four of them are films of that step happening.
 * Phones and reduced motion get the same cards stacked, no pin.
 */
export function Process() {
  const pin = useMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)")
  const ref = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -distance])
  const bar = useTransform(scrollYProgress, [0.05, 0.95], [0, 1])

  useLayoutEffect(() => {
    if (!pin) return
    const measure = () => {
      const el = track.current
      if (el) setDistance(Math.max(0, el.scrollWidth - window.innerWidth))
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [pin])

  const heading = (
    <div className="shrink-0 md:w-[min(44vw,640px)]">
      <Eyebrow>{process.eyebrow}</Eyebrow>
      <h2 className="mt-4 font-heavy text-[clamp(44px,5.4vw,96px)] leading-[0.86]">
        <RiseText text="How a bird" />
        <br />
        <RiseText text="gets to you" delay={0.1} />
      </h2>
    </div>
  )

  if (!pin) {
    return (
      <section className="bg-lavender px-gutter py-section">
        {heading}
        <div className="mt-row flex flex-col gap-row">
          {process.steps.map((step, i) => (
            <StepCard key={step.n} step={step} index={i} />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} className="relative bg-lavender" style={{ height: `calc(100svh + ${distance}px + 40vh)` }}>
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        <motion.div ref={track} className="flex w-max items-start gap-[clamp(32px,4vw,72px)] px-gutter" style={{ x }}>
          {heading}
          {process.steps.map((step, i) => (
            <StepCard key={step.n} step={step} index={i} />
          ))}
        </motion.div>
        <div className="absolute inset-x-gutter bottom-8 h-1 overflow-hidden rounded-pill bg-forest/15">
          <motion.div className="h-full origin-left rounded-pill bg-forest" style={{ scaleX: bar }} />
        </div>
      </div>
    </section>
  )
}
