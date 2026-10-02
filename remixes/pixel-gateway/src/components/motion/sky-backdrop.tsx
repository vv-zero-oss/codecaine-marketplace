import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useMemo, useRef } from "react"

import { PixelSprite } from "@/components/pixel/pixel-sprite"
import { rng } from "@/lib/rng"
import { cn } from "@/lib/utils"

/**
 * The dusk sky behind the hero: a pixelated photograph under a five-stop wash,
 * stars that blink on a step, and pixel clouds drifting at three speeds. The
 * photograph sinks slower than the page as you scroll, which is the parallax;
 * `parallax` is how much, in px over the section's height.
 */
export function SkyBackdrop({
  image,
  parallax = 120,
  stars = 36,
  clouds = 3,
  className,
}: {
  image: string
  parallax?: number
  stars?: number
  clouds?: number
  className?: string
}) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : parallax])
  const field = useMemo(() => {
    const r = rng("pixelkeep-sky")
    return Array.from({ length: stars }, () => ({
      left: `${r.int(2, 98)}%`,
      top: `${r.int(4, 55)}%`,
      size: r.chance(0.2) ? 6 : 4,
      delay: r.next() * 2.4,
    }))
  }, [stars])

  return (
    <div ref={ref} aria-hidden data-canvas-ignore className={cn("absolute inset-0 overflow-hidden", className)}>
      <motion.div
        data-canvas-ignore
        style={{ y, backgroundImage: `url(${image})` }}
        className="pixelated absolute -inset-x-0 -top-10 bottom-[-160px] bg-cover bg-center opacity-80 brightness-90 contrast-125 saturate-150"
      />
      <div
        data-canvas-ignore
        className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--color-sky-1)_0%,color-mix(in_oklab,var(--color-sky-2)_94%,transparent)_28%,color-mix(in_oklab,var(--color-sky-3)_62%,transparent)_52%,color-mix(in_oklab,var(--color-sky-4)_30%,transparent)_80%,var(--color-bg)_100%)]"
      />
      <div data-canvas-ignore className="px-dither absolute inset-0 opacity-60" />
      {field.map((s, i) => (
        <span
          key={i}
          className="absolute animate-twinkle bg-fg"
          style={{ left: s.left, top: s.top, width: s.size, height: s.size, animationDelay: `${s.delay}s` }}
        />
      ))}
      {Array.from({ length: clouds }, (_, i) => (
        <div
          key={i}
          data-canvas-ignore
          className="absolute left-0 animate-drift opacity-25"
          style={{
            top: `${16 + i * 22}%`,
            animationDuration: `${70 + i * 38}s`,
            animationDelay: `-${i * 31}s`,
          }}
        >
          <PixelSprite name="cloud" scale={10 + i * 4} />
        </div>
      ))}
    </div>
  )
}
