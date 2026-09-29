import { useRef } from "react"
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react"
import { ArrowRight } from "lucide-react"
import { useCanvasDesignMode } from "@canvas/react"

import { InfiniteCanvas } from "@/components/motion/infinite-canvas"
import { SceneText } from "@/components/blocks/scene-text"
import { ButtonLink } from "@/components/ui/button"
import { hero, scenes } from "@/content"
import { useHeroWash } from "@/hooks/use-hero-wash"
import { useScrub, useScrubBlur } from "@/lib/scrub"
import { BLUR, DURATION, EASE_OUT } from "@/lib/motion"

/**
 * The night canvas, pinned for two screens of scroll.
 *
 * On arrival the photos blur in, then the canvas builds behind them and the
 * headline sharpens over it. As the reader scrolls, the headline blurs away,
 * the canvas washes out to paper — tiles last — and the first line of the
 * story sharpens in its place, so the dark page hands over to the white one
 * without a cut.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })

  // The hand-over, read off the reference: headline gone by a third, canvas
  // washed by 85%, the next line in over the washed tiles.
  const wash = useScrub(scrollYProgress, [0.12, 0.8], [0, 1])
  const shared = useHeroWash()
  useMotionValueEvent(wash, "change", (v) => shared.set(v))

  const blurMax = reduced ? 0 : BLUR * 1.4
  const contentOpacity = useScrub(scrollYProgress, [0, 0.3], [1, 0])
  const contentFilter = useScrubBlur(scrollYProgress, [0, 0.3], [0, blurMax])
  const contentScale = useScrub(scrollYProgress, [0, 0.3], [1, 0.97])
  // Without WebGL the canvas steps aside; the stage's own night and this
  // paper layer still make the hand-over.
  const paperOpacity = useScrub(wash, [0, 0.62], [0, 1])
  const nextOpacity = useScrub(scrollYProgress, [0.55, 0.85], [0, 1])
  const nextFilter = useScrubBlur(scrollYProgress, [0.55, 0.85], [blurMax, 0])

  // Entrance: after the tiles, as in the reference. The editor holds it at
  // its end state.
  const enter = (delay: number) =>
    designing
      ? {}
      : {
          initial: { opacity: 0, filter: `blur(${reduced ? 0 : BLUR}px)` },
          animate: { opacity: 1, filter: "blur(0px)" },
          transition: { duration: DURATION.reveal, ease: EASE_OUT, delay },
        }

  return (
    <section ref={ref} id="top" className="relative h-[230svh] bg-paper">
      <div className="sticky top-0 h-svh overflow-hidden bg-night">
        <motion.div aria-hidden className="absolute inset-0 bg-paper" style={{ opacity: paperOpacity }} />
        <InfiniteCanvas wash={wash} className="absolute inset-0" />

        <motion.div
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-gutter pt-nav text-center text-on-night"
          style={{ opacity: contentOpacity, filter: contentFilter, scale: contentScale }}
        >
          <motion.a
            href="#live"
            className="pointer-events-auto mb-6 inline-flex h-7 items-center gap-1.5 rounded-pill bg-night-raised/90 px-3 text-micro font-medium text-mist backdrop-blur-sm transition-colors duration-(--duration-hover) hover:text-on-night"
            {...enter(0.9)}
          >
            {hero.badge}
            <ArrowRight className="size-3" aria-hidden />
          </motion.a>
          <motion.h1 className="text-hero font-normal tracking-display text-balance" {...enter(1.0)}>
            {hero.titleTop}
            <br />
            {hero.titleBottom}
          </motion.h1>
          <motion.p className="mt-5 max-w-[34ch] text-body text-mist" {...enter(1.12)}>
            {hero.lede}
          </motion.p>
          <motion.div className="pointer-events-auto mt-8" {...enter(1.24)}>
            <ButtonLink href={hero.cta.href} variant="paper" size="hero">
              {hero.cta.label}
            </ButtonLink>
          </motion.div>
        </motion.div>

        <motion.div
          className="pointer-events-none absolute inset-0 flex items-center justify-center px-gutter"
          style={{ opacity: nextOpacity, filter: nextFilter }}
        >
          <SceneText first={scenes.opening.first} second={scenes.opening.second} />
        </motion.div>
      </div>
    </section>
  )
}
