import type * as React from "react"
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { LogoMark } from "@/components/ui/wordmark"
import { cn } from "@/lib/utils"

/**
 * The Tidemark card, in brushed forest metal, turning a few degrees toward
 * the pointer on a spring — decorative, so it only runs where there is a
 * fine pointer, and not while designing or with reduced motion. A sheen
 * follows the tilt. `frozen` greys it out with a frost badge.
 */
export function MetalCard({
  holder = "",
  last4 = "0000",
  expiry = "00/00",
  tilt = 10,
  frozen = false,
  className,
}: {
  holder?: string
  last4?: string
  expiry?: string
  /** The most it turns, in degrees. */
  tilt?: number
  frozen?: boolean
  className?: string
}) {
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = reduced || designing
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const spring = { stiffness: 150, damping: 18, mass: 0.6 }
  const rotateY = useSpring(useTransform(px, [0, 1], [-tilt, tilt]), spring)
  const rotateX = useSpring(useTransform(py, [0, 1], [tilt * 0.7, -tilt * 0.7]), spring)
  const sheen = useTransform(px, [0, 1], ["20%", "80%"])
  const sheenBg = useTransform(sheen, (s) => `radial-gradient(60% 80% at ${s} 0%, rgb(255 255 255 / 0.22), transparent 60%)`)

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (still || e.pointerType !== "mouse") return
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }
  const onLeave = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <div className={cn("[perspective:1200px]", className)} onPointerMove={onMove} onPointerLeave={onLeave}>
      <motion.div
        style={{ rotateX: still ? 0 : rotateX, rotateY: still ? 0 : rotateY }}
        className={cn(
          "relative aspect-[1.586] w-full overflow-hidden rounded-[18px] bg-[linear-gradient(135deg,#1d4a38_0%,var(--color-forest)_45%,var(--color-forest-deep)_100%)] p-5 text-forest-fg shadow-(--shadow-metal) transition-[filter] duration-(--duration-swap) sm:p-6",
          frozen && "grayscale-[0.7] brightness-110",
        )}
      >
        {/* Brushed grain and the moving sheen */}
        <div aria-hidden className="absolute inset-0 opacity-[0.12] bg-[repeating-linear-gradient(90deg,#fff_0_1px,transparent_1px_3px)]" />
        <motion.div
          aria-hidden
          className="absolute inset-0"
          style={{ background: sheenBg }}
        />
        <div className="relative flex h-full flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="flex items-center gap-2">
              <LogoMark className="size-6" />
              <span className="font-serif text-[22px] leading-none">Tidemark</span>
            </span>
            <span className="font-mono text-[11px] tracking-[0.1em] text-forest-muted uppercase">Business</span>
          </div>
          {/* The chip, in brass */}
          <span aria-hidden className="h-8 w-11 rounded-[6px] bg-[linear-gradient(135deg,var(--color-brass-soft),var(--color-brass))] shadow-[inset_0_0_0_1px_rgb(0_0_0/0.15)]" />
          <div className="flex items-end justify-between gap-4 font-mono text-[12px] tracking-[0.06em] sm:text-[13px]">
            <span className="flex flex-col gap-1">
              <span className="text-[15px] tracking-[0.18em] sm:text-[17px]">•••• {last4}</span>
              <span className="text-forest-muted uppercase">{holder}</span>
            </span>
            <span className="text-forest-muted">{expiry}</span>
          </div>
        </div>
        {frozen && (
          <span className="absolute top-4 left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-3 py-1 font-mono text-[11px] tracking-[0.08em] text-ink uppercase">
            Frozen
          </span>
        )}
      </motion.div>
    </div>
  )
}
