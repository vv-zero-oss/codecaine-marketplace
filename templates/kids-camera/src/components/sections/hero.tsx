import { motion, useReducedMotion } from "motion/react"

import { CameraSticker } from "@/components/blocks/camera-sticker"
import { Photo } from "@/components/blocks/photo"
import { Container } from "@/components/ui/container"
import { hero } from "@/content"

/**
 * The opening: a two-line headline set wide across the page, the second line
 * pushed to the right edge, the product sticker slapped across the corner of
 * the photograph beneath.
 *
 * The hero holds still. The sticker is the
 * one thing that answers a hand: a press squashes it like the vinyl it looks
 * like, a spring so it can be pressed again mid-bounce.
 */
export function Hero() {
  const reduce = useReducedMotion()
  const [first, second] = hero.lines
  return (
    <section id="top" className="relative pt-[clamp(120px,15vw,190px)]">
      <Container>
        <h1 className="text-display font-normal tracking-display text-ink">
          <span className="block">{first}</span>
          <span className="block text-right">{second}</span>
        </h1>
        <p className="mt-5 max-w-[210px] text-caption text-ink md:absolute md:top-[calc(clamp(120px,15vw,190px)+0.9*var(--text-display)+40px)] md:mt-0">
          {hero.intro}
        </p>
      </Container>

      <div className="relative mt-6 px-gutter md:mt-[clamp(20px,2.6vw,36px)]">
        <motion.div
          className="absolute top-0 right-8 md:right-auto md:left-[18.75%] z-10 w-[clamp(120px,21.7vw,300px)] -translate-y-[45%] cursor-grab"
          initial={false}
          style={{ rotate: 14 }}
          whileTap={reduce ? undefined : { scale: 0.94, rotate: 8 }}
          transition={{ type: "spring", duration: 0.45, bounce: 0.3 }}
        >
          <CameraSticker className="block h-auto w-full" />
        </motion.div>
        <Photo photo={hero.photo} width={2400} eager className="aspect-[4/3] w-full rounded-photo md:aspect-[2.08/1]" />
      </div>
    </section>
  )
}
