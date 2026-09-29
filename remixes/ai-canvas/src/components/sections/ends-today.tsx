import { useRef } from "react"
import { motion, useReducedMotion, useScroll } from "motion/react"

import { SceneText } from "@/components/blocks/scene-text"
import { ScrubReveal } from "@/components/motion/scrub-reveal"
import { endsToday, mockups } from "@/content"
import { BLUR } from "@/lib/motion"
import { useScrub, useScrubBlur } from "@/lib/scrub"

/**
 * The turn. The product shot rises out of a blur to the golden measure
 * (61.8% of the screen), its lower edge fading into the paper, and the words
 * sit over that fade — first "That ends today", then what that means. Both
 * swaps are blur crossfades on the scroll.
 */
export function EndsToday() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] })
  const blur = reduced ? 0 : BLUR

  const scale = useScrub(scrollYProgress, [0.12, 0.4], [reduced ? 1 : 0.86, 1])
  const rise = useScrub(scrollYProgress, [0.12, 0.4], [reduced ? 0 : 55, 0])
  const shotOpacity = useScrub(scrollYProgress, [0.12, 0.34], [0, 1])
  const shotFilter = useScrubBlur(scrollYProgress, [0.12, 0.34], [blur, 0])

  const firstOut = useScrub(scrollYProgress, [0.6, 0.66], [1, 0])
  const firstBlur = useScrubBlur(scrollYProgress, [0.6, 0.66], [0, blur])
  const leave = useScrub(scrollYProgress, [0.9, 1], [1, 0])
  const leaveBlur = useScrubBlur(scrollYProgress, [0.9, 1], [0, blur])

  return (
    <section ref={ref} id="ends-today" className="relative h-[240svh]">
      <motion.div
        className="sticky top-0 flex h-svh flex-col items-center justify-center overflow-hidden px-gutter pt-nav"
        style={{ opacity: leave, filter: leaveBlur }}
        data-canvas-ignore
      >
        <motion.img
          src={mockups.light.src}
          alt={mockups.light.alt}
          className="w-full rounded-frame [mask-image:linear-gradient(to_bottom,black_50%,transparent_88%)] sm:w-golden"
          style={{ scale, y: rise, opacity: shotOpacity, filter: shotFilter }}
        />
        {/* The words overlap only the shot's faded edge, by a φ step, on a
            soft pool of paper so they read over any frame. */}
        <div className="relative isolate -mt-phi-5 grid place-items-center before:absolute before:-inset-x-phi-6 before:-inset-y-phi-4 before:-z-10 before:bg-[radial-gradient(closest-side,var(--paper)_55%,transparent)] sm:-mt-phi-6">
          <ScrubReveal progress={scrollYProgress} from={0.34} to={0.44} className="col-start-1 row-start-1">
            <motion.div style={{ opacity: firstOut, filter: firstBlur }}>
              <SceneText first={endsToday.first} />
            </motion.div>
          </ScrubReveal>
          <ScrubReveal progress={scrollYProgress} from={0.64} to={0.72} className="col-start-1 row-start-1">
            <SceneText first={endsToday.second} second={endsToday.third} />
          </ScrubReveal>
        </div>
      </motion.div>
    </section>
  )
}
