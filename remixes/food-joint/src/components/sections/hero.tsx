import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"

import { ClipShape } from "@/components/blocks/clip-shape"
import { CtaEllipse } from "@/components/blocks/cta-ellipse"
import { Photo } from "@/components/blocks/photo"
import { RiseText } from "@/components/blocks/rise-text"
import { SpinBadge } from "@/components/blocks/spin-badge"
import { cta, hero } from "@/content"
import { useFitText } from "@/hooks/use-fit-text"
import { useLoaded } from "@/hooks/use-loaded"
import { DURATION, EASE_OUT, SPRING_POP } from "@/lib/motion"
import { pillow } from "@/lib/shapes"

/**
 * The first screen: the food in a soft, lopsided cushion (an SVG clip path),
 * two enormous words set over its lower half, and the orange stamp to book.
 *
 * Motion, once the preloader lifts: the cushion settles in from a slight
 * zoom, the letters rise out of their line one after another, and the stamp
 * pops on last (the one bounce on the page — it is seen once). On scroll, the
 * cushion swells rounder and the photograph drifts down inside it, so the
 * frame and the picture move at different speeds. Reduced motion: fades only,
 * nothing tied to the scroll.
 */
export function Hero() {
  const loaded = useLoaded()
  const reduced = useReducedMotion()
  const section = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end start"] })
  const clip = useTransform(scrollYProgress, (p) => pillow(reduced ? 0 : Math.min(1, p * 1.6)))
  const drift = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["0%", "16%"])
  const lift = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["0%", "-22%"])
  const fitWide = useFitText<HTMLSpanElement>()
  const fitNarrow = useFitText<HTMLSpanElement>()
  const [first, second] = hero.title

  return (
    <section ref={section} id="top" className="relative flex h-svh min-h-[600px] flex-col overflow-hidden bg-lime pt-16 sm:min-h-[680px]">
      <motion.div
        className="relative mx-gutter h-[62%] sm:h-[76%]"
        initial={reduced ? { opacity: 0 } : { opacity: 0, transform: "scale(0.94)" }}
        animate={loaded ? { opacity: 1, transform: "scale(1)" } : undefined}
        transition={{ duration: DURATION.hero, ease: EASE_OUT }}
      >
        <ClipShape shape="pillow" d={clip} className="absolute inset-0">
          <Photo
            photo={hero.photo}
            width={2000}
            eager
            className="absolute inset-0 bg-orange"
            imgClassName="scale-[1.18]"
            imgStyle={{ y: drift }}
          />
        </ClipShape>

        <motion.p
          className="absolute top-[9%] left-[5%] flex items-center gap-2 rounded-pill bg-cream px-4 py-2 font-condensed text-label uppercase"
          initial={{ opacity: 0, transform: "translateY(8px)" }}
          animate={loaded ? { opacity: 1, transform: "translateY(0px)" } : undefined}
          transition={{ duration: DURATION.reveal, ease: EASE_OUT, delay: 0.7 }}
        >
          <span aria-hidden className="relative flex size-2.5">
            <span className="absolute inset-0 animate-ping rounded-pill bg-orange opacity-70 motion-reduce:hidden" />
            <span className="relative size-2.5 rounded-pill bg-orange" />
          </span>
          {hero.status}
        </motion.p>

        <SpinBadge className="absolute -top-3 right-[4%] hidden sm:block" show={loaded} />
      </motion.div>

      <motion.div className="absolute inset-x-0 bottom-[4%] z-10 px-gutter" style={{ y: lift }}>
        {/* Wide screens: one line, fitted to the width. */}
        <h1 className="hidden leading-[0.78] sm:block">
          <span ref={fitWide} className="inline-block w-max font-heavy text-forest [font-stretch:var(--stretch-hero)]">
            <RiseText text={`${first} ${second}`} play={loaded} delay={0.25} />
          </span>
        </h1>
        {/* Phones: two lines, stacked, sized so the longer one fills the width. */}
        <h1 className="leading-[0.8] sm:hidden">
          <span ref={fitNarrow} className="inline-flex w-max flex-col font-heavy text-forest [font-stretch:var(--stretch-hero)]">
            <RiseText text={first} play={loaded} delay={0.25} />
            <RiseText text={second} play={loaded} delay={0.4} />
          </span>
        </h1>
      </motion.div>

      <motion.div
        className="absolute right-[5%] bottom-[5%] z-20 sm:bottom-[6%]"
        initial={reduced ? { opacity: 0 } : { opacity: 0, transform: "scale(0.6) rotate(-14deg)" }}
        animate={loaded ? { opacity: 1, transform: "scale(1) rotate(0deg)" } : undefined}
        transition={reduced ? { duration: 0.3 } : { ...SPRING_POP, delay: 0.85 }}
      >
        <CtaEllipse href={cta.href} className="text-[clamp(22px,3.1vw,50px)] leading-none">
          {cta.label}
        </CtaEllipse>
      </motion.div>

    </section>
  )
}
