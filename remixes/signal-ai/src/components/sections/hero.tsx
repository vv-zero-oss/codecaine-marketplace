import { motion } from "motion/react"
import { ArrowRight, Play } from "lucide-react"

import { WordRotator } from "@/components/motion/word-rotator"
import { ButtonLink } from "@/components/ui/button"
import { PixelEdge } from "@/components/motion/pixel-edge"
import { Container } from "@/components/ui/container"

/** The announcement above the headline: what is new, in one line. */
export function AnnouncementPill({ tag = "New", text = "Meet Vantage 4", detail = "Our new model" }: { tag?: string; text?: string; detail?: string }) {
  return (
    <a
      href="#news"
      className="group inline-flex items-center gap-2 border border-line bg-paper py-1 pr-1 pl-1.5 text-[12px] shadow-card transition-shadow duration-200 hover:shadow-pop"
    >
      <span className="bg-sky px-1.5 py-px text-[9px] font-medium tracking-wide text-sky-ink uppercase">{tag}</span>
      <span className="font-medium text-ink">{text}</span>
      <span className="hidden text-ink-3 sm:inline">· {detail}</span>
      <span className="grid size-5 place-items-center bg-surface-2 text-ink-2 transition-transform duration-200 group-hover:scale-110">
        <Play className="size-2.5 fill-current" />
      </span>
    </a>
  )
}

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
})

export function Hero() {
  return (
    <section id="top" className="relative pt-10 pb-[170px] sm:pt-[60px] sm:pb-[190px]">
      <Container className="flex flex-col items-center text-center">
        <motion.div {...rise(0)}>
          <AnnouncementPill />
        </motion.div>
        <motion.h1
          {...rise(0.06)}
          className="mt-8 font-serif text-[clamp(2.8rem,8vw,5rem)] leading-[0.9] font-normal tracking-[-0.02em] text-balance text-ink"
        >
          Frontier AI models
          <br />
          for everything you <WordRotator />
          <span aria-hidden>.</span>
        </motion.h1>
        <motion.p {...rise(0.12)} className="mt-6 max-w-[34rem] text-[14px] leading-relaxed tracking-[-0.01em] text-ink-2">
          Reasoning, code, voice, images, and video. Trained on the world's largest supercluster.
        </motion.p>
        <motion.div {...rise(0.18)} className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
          <ButtonLink href="#developers" size="lg">
            Get API Access <ArrowRight />
          </ButtonLink>
          <ButtonLink href="#developers" variant="outline" size="lg">
            View Documentation
          </ButtonLink>
        </motion.div>
      </Container>
      <PixelEdge rows={5} cell={30} seed={3} density={1} solidEdge />
    </section>
  )
}
