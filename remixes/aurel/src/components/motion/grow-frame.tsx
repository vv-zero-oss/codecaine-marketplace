import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useRef, type ReactNode } from "react"

import { cn } from "@/lib/utils"

/**
 * A small photograph under a heading that grows to fill the screen.
 *
 * The heading stays pinned behind; the frame opens from a card-sized
 * window below it to the whole screen, less a hairline margin, and the
 * picture inside settles from a slight zoom. From the recording: the
 * frame opens over ~1.4 screens of scroll with an ease-out, starting at
 * about a fifth of the width.
 */
export function GrowFrame({
  image,
  alt,
  heading,
  start = 26,
  length = 260,
  focus = "50% 50%",
  className,
}: {
  image: string
  alt: string
  heading?: ReactNode
  /** Width of the frame before it grows, in % of the screen. */
  start?: number
  /** Height of the pinned track, in vh. */
  length?: number
  /** Which part of the photograph stays in view (CSS object-position). */
  focus?: string
  className?: string
}) {
  const track = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] })
  const t = useTransform(scrollYProgress, [0.1, 0.75], [0, 1], { clamp: true })
  const eased = useTransform(t, (v) => (reduced ? 1 : 1 - Math.pow(1 - v, 3)))
  const side = (100 - start) / 2
  const clip = useTransform(eased, (v) => {
    const x = side + (1.2 - side) * v
    const top = 44 + (1.8 - 44) * v
    const bottom = 8 + (1.8 - 8) * v
    return `inset(${top}% ${x}% ${bottom}% ${x}%)`
  })
  const zoom = useTransform(eased, [0, 1], [1.18, 1])

  return (
    <section ref={track} className={cn("relative", className)} style={{ height: `${Math.max(100, length)}vh` }}>
      <div className="sticky top-0 h-svh overflow-hidden" data-canvas-ignore>
        {heading && <div className="absolute inset-x-0 top-[13%] z-0 px-gutter">{heading}</div>}
        <motion.div className="absolute inset-0 z-10 overflow-hidden" style={{ clipPath: clip }}>
          <motion.img src={image} alt={alt} style={{ scale: zoom, objectPosition: focus }} className="size-full object-cover" decoding="async" loading="lazy" />
        </motion.div>
      </div>
    </section>
  )
}
