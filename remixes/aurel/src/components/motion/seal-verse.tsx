import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react"
import { useRef } from "react"

import { MixedTitle } from "@/components/ui/mixed-title"
import { cn } from "@/lib/utils"

/**
 * A verse set in two columns with a silver seal between them.
 *
 * The verse scrolls up past a pinned seal, which turns on its vertical axis
 * as it goes — edge-on, then face-on again — like a coin rolled between two
 * fingers. `turns` is how many half-turns it makes over the section.
 */
export function SealVerse({
  lines,
  by,
  monogram = "A",
  turns = 3,
  length = 240,
  className,
}: {
  lines: string[][]
  by: string
  monogram?: string
  turns?: number
  length?: number
  className?: string
}) {
  const track = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] })
  const textY = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["38%", "-38%"])
  const spin = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : turns * 180])
  const tilt = useTransform(scrollYProgress, [0, 0.5, 1], [-8, 6, -4])
  const sheen = useTransform(spin, (d) => 0.55 + 0.45 * Math.abs(Math.cos((d * Math.PI) / 180)))

  return (
    <section ref={track} className={cn("relative", className)} style={{ height: `${Math.max(100, length)}vh` }}>
      <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden" data-canvas-ignore>
        <motion.div style={{ y: textY }} className="w-full px-4 text-center">
          {lines.map(([left, right], index) => (
            <div key={index} className="grid grid-cols-[1fr_clamp(72px,11vw,190px)_1fr] items-baseline font-display text-[clamp(30px,6vw,110px)] leading-[1.02] tracking-[-0.015em] text-ink">
              <span className="text-right">{left}</span>
              <span aria-hidden />
              <span className="text-left">{right}</span>
            </div>
          ))}
          <MixedTitle as="p" text={by} className="mt-8 text-[13px] tracking-[0.04em] text-ink-soft sm:text-[15px]" />
        </motion.div>
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 [perspective:900px]">
          <Seal monogram={monogram} spin={spin} tilt={tilt} sheen={sheen} />
        </div>
      </div>
    </section>
  )
}

/** The silver seal: a pressed disc with the house monogram in relief. */
function Seal({ monogram, spin, tilt, sheen }: { monogram: string; spin: MotionValue<number>; tilt: MotionValue<number>; sheen: MotionValue<number> }) {
  const filter = useTransform(sheen, (s) => `brightness(${s})`)
  return (
    <motion.div
      style={{ rotateY: spin, rotateZ: tilt, filter }}
      className="grid size-[clamp(64px,9.5vw,170px)] place-items-center rounded-full bg-seal shadow-seal [transform-style:preserve-3d]"
    >
      <div className="grid size-[82%] place-items-center rounded-full border border-white/25 shadow-[inset_0_2px_6px_rgb(0_0_0/0.45)]">
        <span className="font-display text-[clamp(34px,5vw,88px)] italic leading-none text-silver-lo [text-shadow:0_1px_0_rgb(255_255_255/0.5),0_-1px_1px_rgb(0_0_0/0.35)]">{monogram}</span>
      </div>
    </motion.div>
  )
}
