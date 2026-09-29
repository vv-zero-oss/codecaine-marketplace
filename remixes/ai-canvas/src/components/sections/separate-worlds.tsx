import { useRef } from "react"
import { motion, useReducedMotion, useScroll } from "motion/react"

import { BlurText } from "@/components/motion/blur-text"
import { DriftBand } from "@/components/motion/drift-band"
import { worlds } from "@/content"
import { BLUR } from "@/lib/motion"
import { useScrub, useScrubBlur } from "@/lib/scrub"

/**
 * The problem, shown before it is said: forty years of the machines design
 * was handed over on, drifting past in the upper golden band (61.8%), each
 * captioned with its year and what the handoff was then. The headline sits
 * in the lower band (38.2%), its first line sharpening whole and its second
 * word by word.
 */
export function SeparateWorlds() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] })
  // The section scrolls in (first third), holds, then leaves blurred.
  const opacity = useScrub(scrollYProgress, [0.86, 1], [1, 0])
  const filter = useScrubBlur(scrollYProgress, [0.86, 1], [0, reduced ? 0 : BLUR])

  return (
    <section ref={ref} id="worlds" className="relative h-[260svh]">
      <motion.div
        className="sticky top-0 grid h-svh rows-golden-below overflow-hidden pt-nav"
        style={{ opacity, filter }}
        data-canvas-ignore
      >
        <DriftBand items={worlds.eras} progress={scrollYProgress} className="mt-phi-4" />
        <div className="flex items-start justify-center px-gutter pt-phi-3">
          <h2 className="text-center text-scene font-medium tracking-scene text-balance">
            <BlurText text={worlds.first} by="line" />
            <br />
            <BlurText text={worlds.second} delay={0.3} />
          </h2>
        </div>
      </motion.div>
    </section>
  )
}
