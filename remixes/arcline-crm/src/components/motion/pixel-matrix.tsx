import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * A small grid of pixels inside a circle, drawing one of three glyphs over
 * and over — a readout of what the agent is doing, not decoration.
 *
 * - `capture`: a frame fills in edge by edge, like a record being logged;
 * - `qualify`: bars rise from the floor, like a score climbing;
 * - `close`: a tick draws from its heel to its tip.
 *
 * Pure CSS (the `pixel` keyframes), each lit pixel delayed by where it sits,
 * so the editor's Motion switch reaches it and reduced motion holds the glyph
 * lit and still.
 */

type Pattern = "capture" | "qualify" | "close"
type Tone = "sky" | "amber" | "teal" | "coral"

const N = 9

function lit(pattern: Pattern, x: number, y: number): number | null {
  if (pattern === "capture") {
    const edge = x === 1 || x === 7 || y === 1 || y === 7
    const inside = x >= 1 && x <= 7 && y >= 1 && y <= 7
    if (edge && inside) {
      // Walk the frame clockwise from the top-left corner.
      if (y === 1) return x - 1
      if (x === 7) return 6 + (y - 1)
      if (y === 7) return 12 + (7 - x)
      return 18 + (7 - y)
    }
    if (y === 4 && x >= 3 && x <= 5) return 24 + (x - 3)
    return null
  }
  if (pattern === "qualify") {
    const heights = [0, 3, 5, 4, 7, 6, 8, 0, 0]
    const h = heights[x]
    if (x >= 1 && x <= 6 && y >= N - h) return (N - 1 - y) * 1.4 + x * 0.8
    return null
  }
  // close: a tick
  const tick: [number, number][] = [
    [1, 4], [2, 5], [3, 6], [4, 5], [5, 4], [6, 3], [7, 2], [8, 1],
    [1, 5], [2, 6], [3, 7], [4, 6], [5, 5], [6, 4], [7, 3],
  ]
  const at = tick.findIndex(([tx, ty]) => tx === x && ty === y)
  return at === -1 ? null : (at % 8) * 1.2
}

export function PixelMatrix({
  pattern = "capture",
  tone = "sky",
  speed = 4.8,
  paused = false,
  className,
}: {
  pattern?: Pattern
  tone?: Tone
  /** Seconds for one full draw. */
  speed?: number
  paused?: boolean
  className?: string
}) {
  const cells: React.ReactNode[] = []
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      const order = lit(pattern, x, y)
      cells.push(
        <span
          key={`${x}-${y}`}
          className={cn(
            "aspect-square rounded-[1px]",
            order === null ? "bg-white/[0.05]" : "animate-[pixel_var(--pixel-speed)_linear_infinite] motion-reduce:animate-none",
          )}
          style={
            order === null
              ? undefined
              : {
                  backgroundColor: `var(--color-${tone})`,
                  animationDelay: `${order * (speed / 60)}s`,
                  animationPlayState: paused ? "paused" : "running",
                }
          }
        />,
      )
    }
  }

  return (
    <div
      className={cn(
        "relative flex aspect-square items-center justify-center rounded-full border border-line-strong",
        className,
      )}
      style={
        {
          "--pixel-speed": `${speed}s`,
          background: `radial-gradient(circle at 50% 60%, color-mix(in oklab, var(--color-${tone}) 14%, transparent), transparent 70%)`,
        } as React.CSSProperties
      }
    >
      <div data-canvas-ignore className="grid w-[46%] grid-cols-9 gap-[5%]">
        {cells}
      </div>
    </div>
  )
}
