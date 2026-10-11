import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { AircraftSide } from "@/components/mock/aircraft"
import { Cloud } from "@/components/motion/cloud"
import { cn } from "@/lib/utils"

const VISIONS = [
  "Imagine a city where every cross-town invitation is an easy yes.",
  "Where match day doesn't end in a two-hour crawl home.",
  "Where the streets get calmer, and the rooftops get busier.",
]

/**
 * The close: the reference's blue "Dream of flight" chapter. The words set
 * as large as the page allows, clouds climbing over them as it scrolls, and
 * then a sky of three short visions with the craft crossing between them.
 * Clouds drift in CSS (stopped by the editor's Motion switch); their climb
 * and the crossings are scroll-scrubbed.
 */
export function DreamOfFlight({ title = "Dream of flight", climb = 60 }: { title?: string; /** How far (svh) the clouds climb. */ climb?: number }) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = !!(reduced || designing)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const near = useTransform(scrollYProgress, [0.28, 0.6], [`${climb}svh`, "0svh"])
  const far = useTransform(scrollYProgress, [0.28, 0.6], [`${climb / 2}svh`, "0svh"])

  return (
    <section ref={ref} data-header-tone="light" className="relative overflow-hidden bg-sky text-on-sky">
      <div className="relative flex h-svh flex-col justify-between px-(--spacing-gutter) pt-20 pb-[4svh]">
        <div className="flex justify-between text-micro">
          <span>Our future vision</span>
          <span>A new kind of commute</span>
        </div>
        <h2 className="type-head relative z-0 text-tera whitespace-nowrap text-page max-sm:text-[19vw] max-sm:whitespace-normal">{title}</h2>
      </div>

      {/* clouds that climb over the words */}
      <motion.div style={{ y: still ? `${climb}svh` : far }} aria-hidden className="pointer-events-none absolute inset-x-0 top-[62svh] z-10 h-[60svh] max-sm:top-[96svh]">
        <Drift className="absolute -left-[6%] top-[8%] w-[38vw] min-w-56" shape="long" duration={80} />
        <Drift className="absolute right-[-4%] top-0 w-[30vw] min-w-48" shape="puff" duration={95} reverse />
      </motion.div>
      <motion.div style={{ y: still ? `${climb}svh` : near }} aria-hidden className="pointer-events-none absolute inset-x-0 top-[74svh] z-10 h-[70svh] max-sm:top-[104svh]">
        <Drift className="absolute left-[18%] top-[10%] w-[56vw] min-w-72" shape="tall" duration={70} />
        <Drift className="absolute -right-[10%] top-[30%] w-[44vw] min-w-64" shape="long" duration={110} reverse />
      </motion.div>

      <div className={cn("relative z-20 flex flex-col gap-[clamp(64px,18svh,200px)] px-(--spacing-gutter) pb-(--spacing-section)", still ? "pt-[85svh]" : "pt-[30svh]")}>
        {VISIONS.map((v, i) => (
          <Vision key={v} index={i} text={v} still={still} />
        ))}
      </div>
    </section>
  )
}

function Drift({ className, shape, duration, reverse = false }: { className: string; shape: "tall" | "long" | "puff"; duration: number; reverse?: boolean }) {
  return (
    <div className={cn("animate-drift motion-reduce:animate-none", className)} style={{ "--drift-duration": `${duration}s`, animationDirection: reverse ? "alternate-reverse" : "alternate" } as React.CSSProperties}>
      <Cloud shape={shape} className="w-full" />
    </div>
  )
}

function Vision({ index, text, still }: { index: number; text: string; still: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const side = index % 2 === 0
  return (
    <div ref={ref} className={cn("relative grid gap-6 md:grid-cols-2", index === 1 && "md:pl-[16%]")}>
      <div className={cn("flex flex-col gap-3", !side && "md:col-start-2")}>
        <p className="text-micro text-on-sky-soft">Future vision — {index + 1}</p>
        <p className="type-head max-w-[20ch] text-h3 text-page">{text}</p>
      </div>
      <Crossing progress={scrollYProgress} still={still} fromLeft={!side} />
    </div>
  )
}

function Crossing({ progress, still, fromLeft }: { progress: MotionValue<number>; still: boolean; fromLeft: boolean }) {
  const x = useTransform(progress, [0, 1], fromLeft ? ["-30%", "60%"] : ["60%", "-30%"])
  const y = useTransform(progress, [0, 1], ["30%", "-40%"])
  return (
    <motion.div
      aria-hidden
      style={still ? undefined : { x, y }}
      className={cn("pointer-events-none w-[min(46vw,320px)]", fromLeft ? "md:col-start-1 md:row-start-1" : "md:col-start-2", fromLeft && "-scale-x-100")}
    >
      <AircraftSide mode="cruise" tone="light" />
    </motion.div>
  )
}
