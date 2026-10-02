import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"

import { BlurWords } from "@/components/motion/blur-words"
import { Reveal } from "@/components/motion/reveal"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"

/**
 * A full-bleed photograph with a statement across it. The picture moves slower
 * than the page (`parallax` is how much, in percent of the band's height).
 */
export function PhotoBand({
  id,
  image,
  alt,
  eyebrow,
  before,
  accent,
  cta,
  parallax = 12,
}: {
  id?: string
  image: string
  alt: string
  eyebrow?: string
  before: string
  accent: string
  cta: string
  parallax?: number
}) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${reduce ? 0 : parallax}%`, `${reduce ? 0 : parallax}%`])

  return (
    <section ref={ref} id={id} className="relative isolate flex min-h-[78svh] items-center overflow-hidden bg-ink py-24">
      <motion.img
        src={image}
        alt={alt}
        loading="lazy"
        style={{ y }}
        className="absolute inset-x-0 -top-[14%] -z-20 h-[128%] w-full object-cover"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-ink/55" />
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-ink to-transparent" />
      <Container className="flex flex-col items-center gap-5 text-center">
        {eyebrow && (
          <Reveal>
            <p className="text-[10px] font-medium tracking-[0.2em] text-fg/80 uppercase">{eyebrow}</p>
          </Reveal>
        )}
        <BlurWords
          before={before}
          accent={accent}
          className="max-w-2xl text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.1] font-medium tracking-[-0.035em]"
        />
        <Reveal delay={0.3}>
          <ButtonLink href="#join" variant="glass" size="sm">
            {cta}
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  )
}
