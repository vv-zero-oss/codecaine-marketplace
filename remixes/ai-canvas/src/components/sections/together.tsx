import { useRef } from "react"
import { motion, useReducedMotion, useScroll } from "motion/react"

import { SceneText } from "@/components/blocks/scene-text"
import { FlyingCursors } from "@/components/motion/flying-cursors"
import { together } from "@/content"
import { useScrub, useScrubBlur } from "@/lib/scrub"
import { BLUR } from "@/lib/motion"

/**
 * Multiplayer, pinned: pointers scattered over a white screen — people and
 * agents — close in on the headline as you scroll, and the headline turns
 * from what it is not into what it is.
 */
export function Together() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const gather = useScrub(scrollYProgress, [0.05, 0.75], [0, 1])
  const blur = reduced ? 0 : BLUR
  const beforeOpacity = useScrub(scrollYProgress, [0.42, 0.52], [1, 0])
  const beforeFilter = useScrubBlur(scrollYProgress, [0.42, 0.52], [0, blur])
  const afterOpacity = useScrub(scrollYProgress, [0.5, 0.62], [0, 1])
  const afterFilter = useScrubBlur(scrollYProgress, [0.5, 0.62], [blur, 0])

  return (
    <section ref={ref} id="together" className="relative h-[240svh]">
      <div className="sticky top-0 h-svh overflow-hidden" data-canvas-ignore>
        <FlyingCursors cursors={together.cursors} progress={gather} />
        <div className="absolute inset-0 grid place-items-center px-gutter">
          <motion.div className="col-start-1 row-start-1" style={{ opacity: beforeOpacity, filter: beforeFilter }}>
            <SceneText first={together.before} />
          </motion.div>
          {/* The answer lands at hero size, the one time the story raises
              its voice after the hero. */}
          <motion.div className="col-start-1 row-start-1" style={{ opacity: afterOpacity, filter: afterFilter }}>
            <SceneText first={together.after} className="max-w-[11ch] text-hero font-normal tracking-display" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
