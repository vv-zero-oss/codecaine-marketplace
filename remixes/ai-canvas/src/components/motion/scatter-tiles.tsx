import { useMemo } from "react"
import { motion, useReducedMotion } from "motion/react"

import { pexels, photos } from "@/content"
import { BLUR, DURATION, EASE_OUT } from "@/lib/motion"
import { cn } from "@/lib/utils"

/**
 * Small photographs appearing one by one around a line of text — the
 * "frame by frame" scene. Each tile blurs in on its own clock,
 * scattered over `spread` seconds, so the page fills the way a moodboard does:
 * a few, then many. Positions avoid the middle, where the words are.
 */
export function ScatterTiles({
  count = 30,
  spread = 2.2,
  size = 56,
  seed = 3,
  className,
}: {
  count?: number
  /** Seconds over which the tiles arrive. */
  spread?: number
  /** Tile size at 1440px, in px. */
  size?: number
  seed?: number
  className?: string
}) {
  const reduced = useReducedMotion()
  const tiles = useMemo(() => layout(count, seed), [count, seed])
  return (
    <motion.div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", className)}
      initial="hidden"
      whileInView="shown"
      viewport={{ amount: 0.5 }}
    >
      {tiles.map((tile, i) => {
        const photo = photos[(i * 7 + seed) % photos.length]
        return (
          <motion.img
            key={i}
            src={pexels(photo, 160)}
            alt=""
            loading="lazy"
            className="absolute rounded-tile object-cover"
            style={{
              left: `${tile.x}%`,
              top: `${tile.y}%`,
              width: `clamp(${Math.round(size * 0.62)}px, ${((size * tile.scale) / 14.4).toFixed(2)}vw, ${Math.round(size * tile.scale * 1.15)}px)`,
              aspectRatio: tile.aspect,
            }}
            variants={{
              hidden: { opacity: 0, filter: reduced ? "blur(0px)" : `blur(${BLUR * 0.7}px)` },
              shown: {
                opacity: 1,
                filter: "blur(0px)",
                transition: { duration: DURATION.tile, ease: EASE_OUT, delay: tile.t * spread },
              },
            }}
          />
        )
      })}
    </motion.div>
  )
}

function layout(count: number, seed: number) {
  let a = seed * 9301 + 49297
  const rand = () => {
    a = (a * 9301 + 49297) % 233280
    return a / 233280
  }
  const tiles: { x: number; y: number; scale: number; aspect: number; t: number }[] = []
  let guard = 0
  while (tiles.length < count && guard++ < count * 40) {
    const x = 4 + rand() * 90
    const y = 8 + rand() * 82
    // Keep the middle clear for the words.
    if (x > 16 && x < 80 && y > 36 && y < 62) continue
    if (tiles.some((t) => Math.abs(t.x - x) < 5.5 && Math.abs(t.y - y) < 7)) continue
    tiles.push({ x, y, scale: 0.8 + rand() * 0.5, aspect: [1, 0.82, 1.18][Math.floor(rand() * 3)], t: rand() })
  }
  return tiles
}
