import type * as React from "react"
import { Heart } from "lucide-react"

import { cn } from "@/lib/utils"

export type Mood = "starlit" | "electric" | "lovestruck"

export const MOODS: { id: Mood; word: string; label: string }[] = [
  { id: "starlit", word: "Starlit", label: "Starlit — night sky" },
  { id: "electric", word: "Electric", label: "Electric — colour wash" },
  { id: "lovestruck", word: "Lovestruck", label: "Lovestruck — hearts" },
]

/** The hearts that drift up through the lovestruck mood: x %, start y %,
 *  size px, seconds per rise, delay. Fixed, so every render matches. */
const HEARTS = [
  [6, 18, 84, 9, 0],
  [18, 66, 56, 11, 1.2],
  [30, 30, 40, 8.5, 3.6],
  [38, 8, 70, 10, 2.4],
  [52, 74, 110, 12, 0.6],
  [62, 40, 48, 9, 4.4],
  [70, 6, 76, 9.5, 3.1],
  [80, 56, 60, 10.5, 1.8],
  [88, 22, 96, 12.5, 4],
  [24, 90, 72, 11, 5.2],
  [46, 50, 36, 8, 6.1],
  [94, 78, 64, 10, 2.2],
] as const

/** Streaks for the starlit mood: seeded, so every render draws the same
 *  sky. Each starts somewhere off-centre and runs outward. */
const STREAKS = (() => {
  let seed = 11
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647
  const colours = ["#ffffff", "#b9cdff", "#ffb3e1", "#ffe2b0", "#9fe8ff"]
  return Array.from({ length: 220 }, () => {
    const a = rnd() * Math.PI * 2
    const r1 = 40 + rnd() * 260
    const r2 = r1 + 180 + rnd() * 700
    return {
      x1: Math.cos(a) * r1,
      y1: Math.sin(a) * r1,
      x2: Math.cos(a) * r2,
      y2: Math.sin(a) * r2,
      w: 1.5 + rnd() * 5,
      o: 0.25 + rnd() * 0.6,
      c: colours[Math.floor(rnd() * colours.length)],
    }
  })
})()

/**
 * What fills the hero's circle for each mood. Three backgrounds, each one
 * slow and ambient: a starburst that turns once every 14s, a colour wash
 * that drifts on a 9s in-out, hearts that rise and fade. CSS keyframes and
 * no filters (a blur inside a clip-path leaks in Chromium), so the editor's
 * Motion switch stops all three and reduced motion holds each one still.
 */
export function MoodBackdrop({ mood, className }: { mood: Mood; className?: string }) {
  return (
    <div aria-hidden className={cn("absolute inset-0 overflow-hidden", className)}>
      {mood === "starlit" && (
        <div className="absolute inset-0 bg-night">
          {/* Light-speed streaks, rotating slowly about the circle's centre. */}
          <svg
            viewBox="-1000 -1000 2000 2000"
            className="absolute top-[var(--oy,50%)] left-[var(--ox,50%)] aspect-square w-[max(200%,1800px)] -translate-x-1/2 -translate-y-1/2 blur-[2px] motion-safe:animate-starburst"
          >
            <g strokeLinecap="round">
              {STREAKS.map((k, i) => (
                <line key={i} x1={k.x1} y1={k.y1} x2={k.x2} y2={k.y2} stroke={k.c} strokeWidth={k.w} strokeOpacity={k.o} />
              ))}
            </g>
          </svg>
          <div className="absolute inset-0 [background:radial-gradient(circle_at_var(--ox,50%)_var(--oy,50%),rgb(13_14_18/0.85)_0%,rgb(13_14_18/0.2)_22%,transparent_50%)]" />
        </div>
      )}
      {mood === "electric" && (
        <div className="absolute inset-0 bg-flare-2">
          <div
            className="absolute -inset-[20%] motion-safe:animate-mesh"
            style={{
              background:
                "radial-gradient(40% 50% at 22% 30%, var(--color-flare-1) 0%, transparent 70%), radial-gradient(45% 55% at 78% 22%, var(--color-flare-5) 0%, transparent 72%), radial-gradient(50% 50% at 70% 78%, var(--color-sun) 0%, transparent 70%), radial-gradient(40% 45% at 30% 80%, var(--color-flare-3) 0%, transparent 70%)",
            }}
          />
        </div>
      )}
      {mood === "lovestruck" && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,var(--color-heart)_0%,var(--color-heart-deep)_75%)]">
          {HEARTS.map(([x, y, size, seconds, delay], i) => (
            <span
              key={i}
              className="absolute motion-safe:animate-[heart-rise_var(--rise)_linear_infinite]"
              style={{ left: `${x}%`, top: `${y}%`, "--rise": `${seconds}s`, animationDelay: `-${delay + seconds * 0.4}s` } as React.CSSProperties}
            >
              <Heart style={{ width: size * 1.5, height: size * 1.5 }} fill="url(#heart-fill)" stroke="none" />
            </span>
          ))}
          <svg width="0" height="0" className="absolute">
            <defs>
              <radialGradient id="heart-fill" cx="35%" cy="30%" r="75%">
                <stop offset="0%" stopColor="#ff8a97" />
                <stop offset="45%" stopColor="#f0304c" />
                <stop offset="100%" stopColor="#b3122e" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      )}
    </div>
  )
}
