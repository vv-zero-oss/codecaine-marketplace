import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { Play } from "lucide-react"
import { useRef } from "react"

import { Slideshow } from "@/components/motion/slideshow"
import { BlurWords } from "@/components/motion/blur-words"
import { Button } from "@/components/ui/button"
import { HERO_SLIDES } from "@/content"

/** The photographs fall back and darken as the next section arrives. */
export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"])
  const dim = useTransform(scrollYProgress, [0, 0.9], [0, reduce ? 0 : 0.85])

  return (
    <section ref={ref} id="top" className="relative h-[100svh] min-h-[560px] overflow-hidden bg-ink">
      <motion.div className="absolute inset-0" style={{ y }}>
        <Slideshow slides={HERO_SLIDES} />
      </motion.div>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/15 to-ink/45" />
      <motion.div aria-hidden className="absolute inset-0 bg-ink" style={{ opacity: dim }} />

      <div data-canvas-ignore className="relative mx-auto flex h-full w-full max-w-[100rem] flex-col justify-end gap-8 px-5 pb-10 sm:px-8 sm:pb-12 lg:flex-row lg:items-end lg:justify-between">
        <BlurWords
          as="h1"
          before="Capital that"
          accent="remembers."
          delay={0.2}
          className="max-w-[14ch] text-[clamp(2.5rem,6.2vw,4.5rem)] leading-[0.98] font-medium tracking-[-0.045em]"
        />
        <div className="flex max-w-sm flex-col items-start gap-4 lg:items-start">
          <Button variant="warm" size="sm" className="self-start">
            <Play className="fill-current" aria-hidden />
            Watch the film
          </Button>
          <p className="text-sm leading-relaxed text-fg/85">
            A private family office for founders, athletes and artists who want their money to build things that outlast them.
          </p>
        </div>
      </div>
    </section>
  )
}
