import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { ButtonLink } from "@/components/ui/button"
import { photo } from "@/lib/photos"
import { cn } from "@/lib/utils"

/** Where each letter starts before it falls into place: x and y in em,
 *  degrees of turn. Fixed, so every render scatters the same way. */
function scatter(seed: number) {
  const r = (n: number) => {
    const v = Math.sin(seed * 9301 + n * 49297) * 233280
    return v - Math.floor(v)
  }
  return { x: (r(1) - 0.5) * 1.6, y: 0.7 + r(2) * 1.4, rotate: (r(3) - 0.5) * 70 }
}

function Letter({ char, seed, progress, from, to }: { char: string; seed: number; progress: MotionValue<number>; from: number; to: number }) {
  const s = scatter(seed)
  const x = useTransform(progress, [from, to], [`${s.x}em`, "0em"])
  const y = useTransform(progress, [from, to], [`${s.y}em`, "0em"])
  const rotate = useTransform(progress, [from, to], [s.rotate, 0])
  const opacity = useTransform(progress, [from, from + (to - from) * 0.35], [0, 1])
  return (
    <motion.span style={{ x, y, rotate, opacity }} className="inline-block origin-bottom">
      {char}
    </motion.span>
  )
}

/** A word whose letters tumble in from below and click into a line,
 *  scrubbed by scroll. */
function TumbleWord({ word, progress, start, end, offset, className }: { word: string; progress: MotionValue<number>; start: number; end: number; offset: number; className?: string }) {
  const chars = word.split("")
  const step = (end - start) / (chars.length + 2)
  return (
    <span aria-hidden className={cn("type-display block whitespace-nowrap", className)}>
      {chars.map((c, i) => (
        <Letter key={i} char={c} seed={offset + i} progress={progress} from={start + i * step} to={start + (i + 3) * step} />
      ))}
    </span>
  )
}

function Steps() {
  return (
    <ol className="type-display grid grid-cols-[auto_1fr] gap-x-6 text-[15px] leading-[1.45] md:text-[17px]">
      {["Pick your coffee and size", "Pick how often", "Skip the coffee run"].map((s, i) => (
        <li key={s} className="contents">
          <span className="text-ink-3">0{i + 1}</span>
          <span>{s}</span>
        </li>
      ))}
    </ol>
  )
}

/**
 * The subscription, sold the loud way. One pinned window: NEVER, RUN and DRY
 * tumble in letter by letter as you scroll and lock into a poster around
 * the three steps, a pour-over and the offer. Reduced motion and design mode
 * show the poster finished.
 */
export function NeverRunDry({
  words = "Never|Run|Dry",
  offer = "Subscribe to deliveries every one, two or four weeks and save up to 15% on every bag. Pick one coffee, or let the roasters rotate you through the series.",
}: {
  words?: string
  offer?: string
}) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = reduced || designing
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const progress = useTransform(scrollYProgress, (v) => (still ? 1 : v))
  const detail = useTransform(progress, [0.42, 0.62], [0, 1])
  const detailY = useTransform(progress, [0.42, 0.62], [24, 0])
  const photoClip = useTransform(progress, [0.36, 0.6], ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"])
  const [w1, w2, w3] = words.split("|")

  return (
    <section ref={ref} id="never-run-dry" className={cn("relative bg-paper", still ? "h-[100svh] min-h-[720px]" : "h-[240vh] lg:h-[300vh]")} aria-label={`${words.replaceAll("|", " ")} — subscriptions`}>
      <div className="sticky top-[84px] grid h-[calc(100svh-84px)] grid-rows-[auto_1fr_auto] overflow-hidden px-[var(--spacing-gutter)] pt-6 pb-8 lg:top-0 lg:h-[100svh] lg:pt-8">
        <div className="flex items-start justify-between gap-6">
          <motion.div style={{ opacity: detail }} className="hidden md:block lg:pl-16">
            <Steps />
          </motion.div>
          <TumbleWord word={w1} progress={progress} start={0} end={0.26} offset={0} className="text-d5 leading-[0.8] md:hidden" />
          <TumbleWord word={w2} progress={progress} start={0.12} end={0.36} offset={20} className="text-d5 leading-[0.8]" />
        </div>

        <div className="relative grid items-center gap-6 md:grid-cols-[auto_1fr]">
          <motion.div style={{ clipPath: photoClip }} className="mx-auto w-[46%] max-w-[300px] overflow-hidden rounded-[var(--radius-tag)] shadow-photo md:mx-0 md:ml-[18%] md:w-[min(24vw,300px)]">
            <img src={photo("chemex", 700, 820)} alt="Coffee dripping through a glass pour-over into a carafe" loading="lazy" className="aspect-[6/7] w-full object-cover" />
          </motion.div>
          <motion.div style={{ opacity: detail, y: detailY }} className="max-w-[30ch] md:ml-[8%]">
            <div className="mb-4 md:hidden">
              <Steps />
            </div>
            <p className="type-display text-d1 leading-[1]">{offer}</p>
            <ButtonLink href="/subscribe" className="mt-4">
              Subscribe
            </ButtonLink>
          </motion.div>
        </div>

        <div className="flex items-end justify-between gap-4">
          <TumbleWord word={w1} progress={progress} start={0} end={0.26} offset={0} className="hidden text-d5 leading-[0.8] md:block" />
          <TumbleWord word={w3} progress={progress} start={0.22} end={0.44} offset={40} className="mx-auto text-d6 leading-[0.78] md:mx-0 md:mr-[12%]" />
        </div>
      </div>
    </section>
  )
}
