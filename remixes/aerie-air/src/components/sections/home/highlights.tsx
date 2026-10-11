import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { Photo } from "@/components/blocks/photo"
import { Reveal } from "@/components/motion/reveal"
import { Link } from "@/lib/router"
import type { PhotoName } from "@/lib/photos"
import { cn } from "@/lib/utils"

const MOMENTS: { photo: PhotoName; thumb: PhotoName; thumbSide: "left" | "right"; text: string; position?: string }[] = [
  { photo: "towers-up", thumb: "cabin-dusk", thumbSide: "right", text: "Leave the street-level crawl behind and take a commute that runs through open air." },
  { photo: "trench-turn", thumb: "window-city", thumbSide: "left", text: "A car meets you at the door and hands you to the pad — one choreographed ride, start to finish.", position: "50% 30%" },
  { photo: "cabin-smile", thumb: "pad-garden", thumbSide: "right", text: "Sit back. Every seat is a window seat, and the city is the view.", position: "60% 40%" },
]

/**
 * "Experience highlights": tall portrait photographs climbing past a small
 * one that moves at its own speed, a line of copy and a link beside each —
 * the reference's gallery, with the corner labels held at the bottom of the
 * window while it scrolls.
 */
export function Highlights({ parallax = 120 }: { /** How far (px) the small photos drift against the big ones. */ parallax?: number }) {
  return (
    <section data-header-tone="dark" className="relative bg-page pt-[clamp(48px,10svh,120px)]">
      <div className="flex flex-col gap-[clamp(48px,10svh,120px)] px-(--spacing-gutter)">
        {MOMENTS.map((m, i) => (
          <Moment key={m.photo} {...m} index={i} parallax={parallax} />
        ))}
      </div>
      <div data-canvas-ignore className="pointer-events-none sticky bottom-0 z-10 mt-16 hidden justify-between px-(--spacing-gutter) pb-6 text-micro md:flex">
        <span>Experience highlights</span>
        <span>Skip town, take the sky</span>
      </div>
    </section>
  )
}

function Moment({
  photo,
  thumb,
  thumbSide,
  text,
  position,
  index,
  parallax,
}: (typeof MOMENTS)[number] & { index: number; parallax: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const drift = useTransform(scrollYProgress, [0, 1], [parallax, -parallax])
  const still = reduced || designing

  return (
    <div ref={ref} className="grid grid-cols-12 items-start gap-x-4 gap-y-6">
      <motion.div
        style={still ? undefined : { y: drift }}
        className={cn(
          "col-span-4 row-start-1 sm:col-span-2 lg:col-span-1",
          thumbSide === "left" ? "col-start-1 self-start sm:col-start-2 lg:col-start-3" : "col-start-9 self-end sm:col-start-11 lg:col-start-10",
        )}
      >
        <Photo name={thumb} className="aspect-[4/5] rounded-(--radius-card) shadow-(--shadow-card)" />
      </motion.div>
      <Reveal className="col-span-10 col-start-2 row-start-2 sm:col-span-8 sm:col-start-3 sm:row-start-1 lg:col-span-5 lg:col-start-4">
        <Photo name={photo} position={position} className="aspect-[4/5] shadow-(--shadow-photo) sm:aspect-[3/4]" priority={index === 0} />
      </Reveal>
      <Reveal
        delay={0.1}
        className="col-span-10 col-start-2 row-start-3 flex flex-col gap-4 sm:col-span-6 sm:col-start-3 lg:col-span-3 lg:col-start-9 lg:row-start-1 lg:self-center"
      >
        <p className="max-w-[22ch] text-lead font-medium">{text}</p>
        <Link href="/experience" className="link-line self-start text-body font-medium">
          Discover the experience
        </Link>
      </Reveal>
    </div>
  )
}
