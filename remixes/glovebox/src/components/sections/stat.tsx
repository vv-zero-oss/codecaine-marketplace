import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"

import { ClaimCard, PhotoTile, RenewalCard, ReviewCard } from "@/components/blocks/mini-cards"
import { FloatTile } from "@/components/motion/float-tile"
import { StageProgress, mixToken, useRange, useStageProgress } from "@/components/motion/progress"
import { photo } from "@/content"

/**
 * The proof in one number, held in the middle of the screen while Glovebox's
 * work drifts past it at different depths — then the number hands over to
 * what it means.
 */
export function Stat() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })

  return (
    <StageProgress.Provider value={scrollYProgress}>
      <section ref={ref} id="results" aria-label="Results" className="relative h-[240svh] sm:h-[280svh]">
        <div data-canvas-ignore className="sticky top-0 h-svh overflow-hidden">
          <FloatTile x={40} y={-14} depth={0.45}>
            <PhotoTile
              src={photo(97079, 500)}
              alt="A hand holding out a set of car keys"
              className="h-32 w-28 sm:h-44 sm:w-40"
            />
          </FloatTile>
          <FloatTile x={3} y={36} depth={0.55} className="hidden sm:block">
            <PhotoTile
              src={photo(38368133, 500)}
              alt="Cars parked along a tree-lined street in autumn"
              className="h-32 w-28 sm:h-48 sm:w-44"
            />
          </FloatTile>
          <FloatTile x={10} y={26} depth={0.38} className="hidden sm:block">
            <RenewalCard />
          </FloatTile>
          <FloatTile x={80} y={52} depth={0.5} className="hidden sm:block">
            <PhotoTile
              src={photo(19477337, 500)}
              alt="Hands resting on a steering wheel"
              className="h-32 w-28 sm:h-44 sm:w-44"
            />
          </FloatTile>
          <FloatTile x={77} y={44} depth={0.32} className="hidden lg:block">
            <ClaimCard />
          </FloatTile>
          <FloatTile x={42} y={86} depth={0.26} className="hidden sm:block">
            <ReviewCard />
          </FloatTile>
          <FloatTile x={14} y={84} depth={0.9}>
            <PhotoTile
              src={photo(29217852, 400)}
              alt="Car keys held inside a car"
              className="h-28 w-24"
            />
          </FloatTile>
          <Statements />
        </div>
      </section>
    </StageProgress.Provider>
  )
}

function Statements() {
  const progress = useStageProgress()
  const ink = (p: number) => mixToken("--color-faint", "--color-ink", p)
  const firstColor = useTransform(useRange(progress, [0, 0.1], [0, 1]), ink)
  const firstOpacity = useRange(progress, [0.36, 0.44], [1, 0])
  const firstLift = useTransform(useRange(progress, [0.36, 0.44], [0, -24]), (y) => `translateY(${y}px)`)
  const secondColor = useTransform(useRange(progress, [0.5, 0.62], [0, 1]), ink)
  const secondOpacity = useRange(progress, [0.5, 0.58], [0, 1])
  const secondLift = useTransform(useRange(progress, [0.5, 0.58], [24, 0]), (y) => `translateY(${y}px)`)

  const type = "font-display text-center text-[clamp(2rem,3.4vw+1rem,4.5rem)] leading-[1.06] text-balance"
  return (
    <div className="pointer-events-none absolute inset-0 grid place-items-center px-6">
      <motion.p
        style={{ color: firstColor, opacity: firstOpacity, transform: firstLift }}
        className={`${type} col-start-1 row-start-1`}
      >
        <span className="block text-[clamp(3.5rem,5vw+1.5rem,7rem)] leading-none tracking-[-0.03em] tabular">
          92%
        </span>
        of renewals are handled
        <br />
        without a phone call
      </motion.p>
      <motion.p
        style={{ color: secondColor, opacity: secondOpacity, transform: secondLift }}
        className={`${type} col-start-1 row-start-1`}
      >
        The more Glovebox learns,
        <br />
        the less it asks of you
      </motion.p>
    </div>
  )
}
