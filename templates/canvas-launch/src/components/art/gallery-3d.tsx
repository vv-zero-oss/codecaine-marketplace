import type * as React from "react"
import { motion, useReducedMotion, useTransform, type MotionValue } from "motion/react"

import { cn } from "@/lib/utils"

/*
 * A ring of things people made, turning slowly in 3D behind the ask. Pure CSS
 * 3D: each card is rotated onto a cylinder and the cylinder turns — on its own,
 * and a little more as the reader scrolls. The cards are drawn in code from the
 * artwork tokens, so the ring needs no images.
 */

const CARDS: { title: string; art: React.ReactNode }[] = [
  {
    title: "Studio portfolio",
    art: (
      <div className="flex h-full flex-col justify-end bg-art-cream p-4 text-art-bg">
        <span className="text-[34px] leading-[0.9] font-semibold tracking-[-0.05em]">Form &amp; Field</span>
        <span className="mt-2 h-1 w-10 bg-art-coral" />
      </div>
    ),
  },
  {
    title: "Launch page",
    art: (
      <div className="relative h-full overflow-hidden bg-art-bg">
        <span className="absolute -bottom-10 left-1/2 size-40 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,var(--color-art-cream),var(--color-art-amber)_40%,var(--color-art-coral)_70%,transparent_72%)]" />
        <span className="absolute top-4 left-4 h-2 w-16 rounded-full bg-art-cream/80" />
      </div>
    ),
  },
  {
    title: "Analytics",
    art: (
      <div className="flex h-full items-end gap-1.5 bg-site-bg p-4">
        {[40, 65, 30, 80, 55, 90, 70].map((h, i) => (
          <span key={i} className={cn("flex-1 rounded-t-[3px]", i === 5 ? "bg-art-violet" : "bg-art-violet/30")} style={{ height: `${h}%` }} />
        ))}
      </div>
    ),
  },
  {
    title: "3D product viewer",
    art: (
      <div className="grid h-full place-items-center bg-[radial-gradient(circle_at_50%_40%,var(--color-art-violet),var(--color-art-bg)_70%)]">
        <span className="size-20 rounded-full bg-[radial-gradient(circle_at_35%_30%,var(--color-art-cream),var(--color-art-cyan)_35%,var(--color-art-violet)_75%)] shadow-card" />
      </div>
    ),
  },
  {
    title: "Storefront",
    art: (
      <div className="grid h-full grid-cols-2 gap-2 bg-art-cream p-3">
        {["bg-art-coral", "bg-art-amber", "bg-art-cyan", "bg-art-violet"].map((c) => (
          <span key={c} className={cn("rounded-[6px]", c)} />
        ))}
      </div>
    ),
  },
  {
    title: "Game menu",
    art: (
      <div className="grid h-full place-items-center bg-art-bg">
        <span className="rounded-[10px] bg-art-game px-5 py-2.5 text-[14px] font-bold text-on-accent shadow-[0_6px_0_var(--color-art-game-edge)]">PLAY</span>
      </div>
    ),
  },
  {
    title: "Docs",
    art: (
      <div className="flex h-full flex-col gap-2 bg-site-bg p-4">
        <span className="h-2.5 w-2/3 rounded-full bg-site-ink/80" />
        {[90, 75, 85, 60, 80].map((w, i) => (
          <span key={i} className="h-1.5 rounded-full bg-site-ink/15" style={{ width: `${w}%` }} />
        ))}
        <span className="mt-auto h-10 rounded-[6px] bg-art-bg" />
      </div>
    ),
  },
  {
    title: "Motion reel",
    art: (
      <div className="relative h-full overflow-hidden bg-art-bg">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="absolute top-1/2 left-1/2 rounded-full border-2 border-art-cyan/70"
            style={{ width: 50 + i * 36, height: 50 + i * 36, transform: "translate(-50%,-50%)" }}
          />
        ))}
        <span className="absolute top-1/2 left-1/2 size-8 -translate-1/2 rounded-full bg-art-amber" />
      </div>
    ),
  },
]

export function Gallery3D({ progress, className }: { progress: MotionValue<number>; className?: string }) {
  const reduce = useReducedMotion()
  const scrollTurn = useTransform(progress, [0, 1], [0, reduce ? 0 : -60])
  const n = CARDS.length
  const radius = 520
  return (
    <div className={cn("pointer-events-none absolute inset-0 [perspective:1400px]", className)} aria-hidden>
      <motion.div className="absolute top-1/2 left-1/2 [transform-style:preserve-3d]" style={{ rotateY: scrollTurn, rotateX: -8 }}>
        <div className={cn("[transform-style:preserve-3d]", !reduce && "animate-[turn_60s_linear_infinite]")}>
          {CARDS.map((card, i) => (
            <figure
              key={card.title}
              className="absolute m-0 h-[200px] w-[260px] [backface-visibility:hidden]"
              style={{ transform: `translate(-50%, -50%) rotateY(${(360 / n) * i}deg) translateZ(${radius}px)` }}
            >
              <div className="h-full overflow-hidden rounded-[14px] shadow-window">{card.art}</div>
              <figcaption className="mt-2 text-[12px] font-medium text-ink-muted">{card.title}</figcaption>
            </figure>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
