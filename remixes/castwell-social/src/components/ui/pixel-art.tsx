import type * as React from "react"

import { cn } from "@/lib/utils"

const PALETTES = {
  mint: ["var(--mint-tile)", "var(--mint)", "var(--mint-soft)", "#c9f1e3"],
  graphite: ["#3b3b39", "#5b5b58", "#2a2a28", "#777773"],
  sage: ["var(--sage-deep)", "#c7d3c3", "#e9efe2", "#b7c5b3"],
  coral: ["var(--coral-soft)", "var(--coral)", "#f6c3c4", "#eaa3a4"],
} as const

/**
 * A field of square cells in one palette, seeded so it draws the same every
 * time — the cover art for articles and templates. Icons sit on top in discs.
 */
export function PixelArt({
  palette = "mint",
  seed = 1,
  cols = 16,
  rows = 11,
  icons,
  className,
}: {
  palette?: keyof typeof PALETTES
  seed?: number
  cols?: number
  rows?: number
  icons?: React.ReactNode
  className?: string
}) {
  const colors = PALETTES[palette]
  let s = seed * 9301 + 49297
  const rand = () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
  const cells = Array.from({ length: cols * rows }, (_, i) => {
    const x = i % cols
    // vertical runs: cells tend to repeat the one above
    return colors[Math.floor((rand() * 0.7 + ((x % 3) / 3) * 0.3) * colors.length)]
  })
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <svg viewBox={`0 0 ${cols} ${rows}`} preserveAspectRatio="none" className="absolute inset-0 size-full" shapeRendering="crispEdges" aria-hidden>
        {cells.map((c, i) => (
          <rect key={i} x={i % cols} y={Math.floor(i / cols)} width="1" height="1" fill={c} />
        ))}
      </svg>
      {icons && <div className="relative flex size-full items-center justify-center gap-3">{icons}</div>}
    </div>
  )
}

/** An icon in a white disc, for placing on pixel art. */
export function ArtDisc({ children, tone = "light" }: { children: React.ReactNode; tone?: "light" | "dark" }) {
  return (
    <span
      className={cn(
        "grid size-12 place-items-center rounded-full md:size-14 [&_svg]:size-5 md:[&_svg]:size-6",
        tone === "light" ? "bg-page text-ink" : "bg-ink text-page",
      )}
    >
      {children}
    </span>
  )
}
