import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"

import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { WordReveal } from "@/components/motion/word-reveal"
import { useMedia } from "@/lib/use-media"

/**
 * The closing call to action. A door swings open as the section scrolls in,
 * light spilling out of it. `openAngle` is how far (degrees). Why: it is the
 * only literal invitation on the page, and the scroll does the inviting.
 */
export function CtaDoor({ title = "Get started for free", body = "Try Fathom for free with up to 5 users. Connect your database or explore a demo.", openAngle = 64 }: { title?: string; body?: string; openAngle?: number }) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useMedia("(prefers-reduced-motion: reduce)")
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start 0.9", "center 0.45"] })
  const angle = useTransform(p, [0, 1], [0, reduce ? 0 : -openAngle])
  const spill = useTransform(p, [0.1, 1], [0, 1])
  return (
    <section id="cta" ref={ref} data-canvas-ignore className="overflow-hidden bg-paper py-24 sm:py-36">
      <Container className="grid items-center gap-14 md:grid-cols-[1.2fr_1fr]">
        <div>
          <h2 className="display text-[clamp(2.4rem,5.4vw,3.8rem)]">
            <WordReveal text={title} progress={p} end={0.8} />
          </h2>
          <p className="mt-4 max-w-[26rem] text-[17px] leading-snug text-ink-2">{body}</p>
          <div className="mt-7 flex items-center gap-2">
            <ButtonLink href="#top" size="lg">Get started</ButtonLink>
            <ButtonLink href="#top" variant="ghost" size="lg">Book a demo</ButtonLink>
          </div>
        </div>
        <div className="mx-auto [perspective:1100px]" aria-hidden>
          <div className="relative h-[19rem] w-40 border border-line-strong bg-paper sm:h-[24rem] sm:w-52">
            <motion.div style={{ opacity: spill }} className="absolute inset-0 [background:linear-gradient(100deg,var(--color-wash-peach),var(--color-wash-rose)_55%,var(--color-wash-lilac))]" />
            <motion.div style={{ rotateY: angle }} className="absolute inset-0 origin-left border-r border-line-strong bg-window shadow-card will-change-transform [transform-style:preserve-3d]">
              <span className="absolute top-1/2 right-3 h-8 w-1 rounded-full bg-ink" />
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  )
}
