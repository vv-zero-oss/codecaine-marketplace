import { useRef } from "react"
import { motion, useScroll, useTransform, type MotionValue } from "motion/react"

import { Photo } from "@/components/blocks/photo"
import { useScrollScenes } from "@/hooks/use-media"
import { noticing } from "@/content"
import { cn } from "@/lib/utils"

/**
 * Where each photo lands, as a fraction of a 1200 × 752 window: the pictures
 * float around the sentence like things a child has pinned up. `at` is how far through the scene it arrives; `drift` how far
 * it climbs while the scene is held, so the layer feels deep rather than flat.
 */
const SPOTS = [
  { x: 423, y: 157, w: 100, h: 75, at: 0.08, drift: 40 },
  { x: 499, y: 72, w: 112, h: 100, at: 0.24, drift: 60 },
  { x: 912, y: 80, w: 77, h: 80, at: 0.2, drift: 30 },
  { x: 0, y: 190, w: 68, h: 110, at: 0.3, drift: 50 },
  { x: 1074, y: 191, w: 121, h: 136, at: 0.28, drift: 70 },
  { x: 79, y: 366, w: 48, h: 40, at: 0.12, drift: 20 },
  { x: 155, y: 507, w: 98, h: 90, at: 0.34, drift: 60 },
  { x: 453, y: 507, w: 56, h: 48, at: 0.16, drift: 30 },
  { x: 838, y: 599, w: 85, h: 102, at: 0.38, drift: 80 },
  { x: 992, y: 540, w: 145, h: 125, at: 0.32, drift: 50 },
  { x: 1168, y: 40, w: 32, h: 40, at: 0.22, drift: 20 },
  { x: 640, y: 640, w: 70, h: 60, at: 0.42, drift: 40 },
]

function ScatterPhoto({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const spot = SPOTS[index]
  const opacity = useTransform(progress, [spot.at, spot.at + 0.06], [0, 1])
  const scale = useTransform(progress, [spot.at, spot.at + 0.08], [0.92, 1])
  const y = useTransform(progress, [0, 1], [spot.drift, -spot.drift])
  const transform = useTransform([scale, y], ([s, dy]) => `translateY(${dy}px) scale(${s})`)
  return (
    <motion.div
      className={cn("absolute", index % 3 === 2 && "max-md:hidden")}
      style={{
        left: `${(spot.x / 1200) * 100}%`,
        top: `${(spot.y / 752) * 100}%`,
        width: `calc(${spot.w / 12}vw * var(--scatter-scale))`,
        height: `calc(${spot.h / 12}vw * var(--scatter-scale))`,
        opacity,
        transform,
      }}
    >
      <Photo photo={noticing.photos[index]} width={400} className="size-full" />
    </motion.div>
  )
}

/** One word of the sentence, inked in as the scroll reaches it. */
function Word({ children, range, progress }: { children: string; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.32, 1])
  return (
    <motion.span style={{ opacity }} className="inline">
      {children}{" "}
    </motion.span>
  )
}

/**
 * The page holds still while a sentence inks itself in, word by word, and
 * photographs arrive around it. Scroll-linked, because the reading pace is the
 * reader's: each word turns from grey to ink as the scroll passes it.
 *
 * Pinned on wide screens with motion allowed; on a phone or under reduced
 * motion the same scene scrolls past once, shorter, still inking in.
 */
export function Noticing() {
  const ref = useRef<HTMLElement>(null)
  const pinned = useScrollScenes()
  const { scrollYProgress: raw } = useScroll({ target: ref, offset: pinned ? ["start start", "end end"] : ["start end", "end start"] })
  // Through a function transform, so the word and photo opacities stay on the
  // JS value rather than a native ScrollTimeline (see `meet-product.tsx`).
  const scrollYProgress = useTransform(raw, (v) => v)
  const words = noticing.text.split(" ")
  const [from, to] = pinned ? [0.05, 0.62] : [0.25, 0.6]
  const step = (to - from) / words.length
  return (
    <section ref={ref} aria-label="What children notice" className={cn("relative [--scatter-scale:1.9] md:[--scatter-scale:1]", pinned ? "h-[300vh]" : "h-[120vh]")}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {SPOTS.map((_, index) => (
          <ScatterPhoto key={index} index={index} progress={scrollYProgress} />
        ))}
        <div className="absolute inset-0 flex items-center justify-center px-gutter">
          <p className="relative max-w-[min(360px,86vw)] text-center text-lead font-normal tracking-tight text-ink">
            {words.map((word, i) => (
              <Word key={i} progress={scrollYProgress} range={[from + i * step, from + (i + 1) * step]}>
                {word}
              </Word>
            ))}
          </p>
        </div>
      </div>
    </section>
  )
}
