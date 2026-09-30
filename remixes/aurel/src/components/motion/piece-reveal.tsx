import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"

import { MixedTitle } from "@/components/ui/mixed-title"
import { useRange } from "@/lib/scroll"
import { cn } from "@/lib/utils"

/**
 * Two lines and a garment, layered on a pinned stage.
 *
 * The first line waits mid-screen; the garment rises from below and passes
 * in front of it; the second line comes up in front of the garment. The
 * garment's lower edge dissolves into the paper, so the section after it
 * reads as written on the cloth. Timings from the recording: the garment
 * travels ~70% of a screen over the first half of the track, the second
 * line enters over the middle third.
 */
export function PieceReveal({
  first,
  second,
  image,
  alt,
  length = 260,
  rise = 70,
  className,
}: {
  first: string
  second: string
  image: string
  alt: string
  /** Height of the pinned track, in vh. */
  length?: number
  /** How far below its resting place the garment starts, in vh. */
  rise?: number
  className?: string
}) {
  const track = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress: p } = useScroll({ target: track, offset: ["start start", "end end"] })
  const r = (from: number, to: number) => (reduced ? to : from)

  const garmentY = useTransform(p, [0, 0.55], [`${r(rise, 0)}vh`, "0vh"])
  const firstY = useTransform(p, [0, 0.6], [`${r(0, -6)}vh`, "-6vh"])
  const firstOpacity = useRange(p, [0.45, 0.7], [1, reduced ? 1 : 0.15])
  const secondY = useTransform(p, [0.3, 0.7], [`${r(24, 0)}vh`, "0vh"])
  const secondOpacity = useRange(p, [0.3, 0.6], [r(0, 1), 1])

  return (
    <section ref={track} className={cn("relative", className)} style={{ height: `${Math.max(100, length)}vh` }}>
      {/* `bg-paper` on the stage: sticky makes it a stacking context, so it
          is what the garment's multiply blends against. */}
      <div className="sticky top-0 h-svh overflow-hidden bg-paper" data-canvas-ignore>
        <motion.div style={{ y: firstY, opacity: firstOpacity }} className="absolute inset-x-0 top-[26%] z-0 px-gutter text-center">
          <MixedTitle as="h2" text={first} className="mx-auto max-w-[16ch] text-[clamp(44px,6vw,108px)] leading-[0.9] tracking-[-0.015em] text-ink" />
        </motion.div>
        <motion.figure
          style={{ y: garmentY }}
          className="absolute inset-x-0 top-[4vh] z-10 mx-auto h-[112%] w-[min(94vw,820px)] mix-blend-multiply [mask-image:linear-gradient(to_bottom,black_55%,transparent_84%)]"
        >
          {/* Multiplied onto the paper: the photograph's white ground turns
              into the page, and only the garment is left standing on it. */}
          <img src={image} alt={alt} className="size-full object-cover object-[50%_12%] grayscale-[0.9] contrast-[1.04]" decoding="async" />
        </motion.figure>
        <motion.div style={{ y: secondY, opacity: secondOpacity }} className="absolute inset-x-0 bottom-[9%] z-20 px-gutter text-center">
          <MixedTitle as="p" text={second} className="mx-auto max-w-[14ch] text-[clamp(44px,6vw,108px)] leading-[0.9] tracking-[-0.015em] text-ink" />
        </motion.div>
      </div>
    </section>
  )
}
