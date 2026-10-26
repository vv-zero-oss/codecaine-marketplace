import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"

import { BlurWords } from "@/components/motion/blur-words"
import { Reveal } from "@/components/motion/reveal"

/**
 * How every inner page opens: a photograph under the transparent header, the
 * page's title blurring in at the bottom left, a line of support beside it.
 * The home page's hero, shorter and without the slideshow.
 */
export function PageHero({
  eyebrow,
  before,
  accent,
  after,
  body,
  image,
  alt,
  parallax = 14,
}: {
  eyebrow: string
  before: string
  accent: string
  after?: string
  body: string
  image: string
  alt: string
  parallax?: number
}) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : `${parallax}%`])
  const dim = useTransform(scrollYProgress, [0, 0.9], [0, reduce ? 0 : 0.8])

  return (
    <section ref={ref} className="relative isolate h-[78svh] min-h-[520px] overflow-hidden bg-ink">
      <motion.img src={image} alt={alt} style={{ y }} className="absolute inset-0 -z-20 size-full object-cover" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/30 to-ink/50" />
      <motion.div aria-hidden className="absolute inset-0 -z-10 bg-ink" style={{ opacity: dim }} />

      <div
        data-canvas-ignore
        className="mx-auto flex h-full w-full max-w-[100rem] flex-col justify-end gap-6 px-5 pb-10 sm:px-8 sm:pb-14 lg:flex-row lg:items-end lg:justify-between"
      >
        <div className="flex flex-col gap-4">
          <Reveal>
            <p className="text-[10px] font-medium tracking-[0.2em] text-fg/80 uppercase">{eyebrow}</p>
          </Reveal>
          <BlurWords
            as="h1"
            before={before}
            accent={accent}
            after={after}
            delay={0.15}
            className="max-w-[16ch] text-[clamp(2.25rem,5.4vw,4rem)] leading-[1] font-medium tracking-[-0.045em]"
          />
        </div>
        <Reveal delay={0.45} className="max-w-sm">
          <p className="text-sm leading-relaxed text-fg/85">{body}</p>
        </Reveal>
      </div>
    </section>
  )
}
