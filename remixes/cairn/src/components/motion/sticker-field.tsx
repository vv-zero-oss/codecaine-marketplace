import { useEffect, useRef, useState } from "react"
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react"

import { pexels } from "@/lib/photos"
import { cn } from "@/lib/utils"

type Sticker = {
  photo: number
  alt: string
  /** position, in % of the field */
  x: number
  y: number
  size: number
  rotate: number
  /** how far it travels against the scroll; nearer stickers move more */
  depth: number
  round?: boolean
  /** shown below md, at this spot — above and below the headline */
  mobile?: [number, number]
}

const STICKERS: Sticker[] = [
  { photo: 7144297, alt: "A stack of pancakes", x: 3, y: 12, size: 124, rotate: -8, depth: 0.9, round: true, mobile: [4, 1] },
  { photo: 1775037, alt: "A croissant on a plate", x: 15, y: 34, size: 112, rotate: 9, depth: 0.5 },
  { photo: 1055271, alt: "A frosted cupcake", x: 6, y: 58, size: 118, rotate: -4, depth: 1.2, mobile: [10, 76] },
  { photo: 3328881, alt: "An orange vinyl record", x: 17, y: 78, size: 104, rotate: 14, depth: 0.7, round: true },
  { photo: 34491414, alt: "A cheeseburger", x: 80, y: 10, size: 128, rotate: 7, depth: 1.1, mobile: [70, 2] },
  { photo: 5447067, alt: "Three small pumpkins", x: 91, y: 34, size: 112, rotate: -10, depth: 0.6, round: true },
  { photo: 37253714, alt: "A pink sprinkled doughnut", x: 79, y: 56, size: 108, rotate: 6, depth: 1.3, round: true, mobile: [70, 78] },
  { photo: 36094445, alt: "A latte from above", x: 90, y: 78, size: 118, rotate: -6, depth: 0.8, round: true },
]

/**
 * Photographs of things people put on maps, die-cut like stickers and
 * scattered round the closing call to action. Each one drifts against the
 * scroll at its own depth (nearer ones move more), sways slowly on its own,
 * and can be picked up and dropped somewhere else.
 */
export function StickerField({
  parallax = 140,
  drift = true,
  draggable = true,
  className,
}: {
  /** px each sticker travels across the section, scaled by its depth */
  parallax?: number
  drift?: boolean
  draggable?: boolean
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  // Heavy parallax is toned down on small screens, where the stickers sit
  // close above and below the headline.
  const [narrow, setNarrow] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)")
    const update = () => setNarrow(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])
  return (
    <div ref={ref} data-canvas-ignore className={cn("pointer-events-none absolute inset-0", className)}>
      {STICKERS.map((s, i) => (
        <StickerItem
          key={s.photo}
          sticker={s}
          index={i}
          progress={scrollYProgress}
          parallax={reduced ? 0 : narrow ? parallax * 0.25 : parallax}
          drift={drift && !reduced}
          draggable={draggable}
        />
      ))}
    </div>
  )
}

function StickerItem({
  sticker,
  index,
  progress,
  parallax,
  drift,
  draggable,
}: {
  sticker: Sticker
  index: number
  progress: MotionValue<number>
  parallax: number
  drift: boolean
  draggable: boolean
}) {
  const y = useTransform(progress, [0, 1], [parallax * sticker.depth * 0.5, -parallax * sticker.depth * 0.5])
  return (
    <motion.div
      className={cn("absolute top-(--ym) left-(--xm) md:top-(--y) md:left-(--x)", sticker.mobile ? "block" : "hidden md:block")}
      style={{
        y,
        width: "var(--s)",
        ["--x" as string]: `${sticker.x}%`,
        ["--y" as string]: `${sticker.y}%`,
        ["--xm" as string]: `${sticker.mobile?.[0] ?? sticker.x}%`,
        ["--ym" as string]: `${sticker.mobile?.[1] ?? sticker.y}%`,
        ["--s" as string]: `clamp(76px, ${sticker.size / 13}vw, ${sticker.size}px)`,
      }}
    >
      <motion.div
        drag={draggable}
        dragMomentum
        dragElastic={0.2}
        whileHover={draggable ? { scale: 1.06, rotate: sticker.rotate * 0.4 } : undefined}
        whileDrag={{ scale: 1.12, rotate: 0, zIndex: 10 }}
        whileTap={{ scale: 1.08 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
        style={{ rotate: sticker.rotate }}
        className={cn("pointer-events-auto relative", draggable && "cursor-grab active:cursor-grabbing")}
      >
        <div
          className={drift ? "animate-drift" : undefined}
          style={{
            ["--drift-duration" as string]: `${7 + (index % 4) * 1.6}s`,
            ["--drift-from" as string]: `${-1.5 - (index % 3)}deg`,
            ["--drift-to" as string]: `${1.5 + (index % 2)}deg`,
            animationDelay: `${-index * 1.3}s`,
          }}
        >
          <div className={cn("bg-raised p-[5px] shadow-(--shadow-sticker)", sticker.round ? "rounded-full" : "rounded-(--radius-sticker)")}>
            <img
              src={pexels(sticker.photo, 280, 280)}
              alt={sticker.alt}
              draggable={false}
              loading="lazy"
              className={cn("aspect-square w-full object-cover", sticker.round ? "rounded-full" : "rounded-[17px]")}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
