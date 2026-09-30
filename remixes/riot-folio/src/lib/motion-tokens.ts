/**
 * The motion tokens in `index.css`, for Framer Motion.
 *
 * Framer Motion wants an easing as four numbers and a duration in seconds, so
 * this reads the custom properties off the root once they exist and parses
 * them. Change a curve in `index.css` and every animation that names it moves
 * the new way.
 */

export type EasingName = "out" | "in-out" | "exit"
type Bezier = [number, number, number, number]

const FALLBACK: Record<EasingName, Bezier> = {
  out: [0.22, 1, 0.36, 1],
  "in-out": [0.65, 0, 0.35, 1],
  exit: [0.4, 0, 1, 1],
}

const VAR: Record<EasingName, string> = {
  out: "--ease-out-soft",
  "in-out": "--ease-in-out-soft",
  exit: "--ease-exit",
}

function readVar(name: string): string {
  if (typeof document === "undefined") return ""
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}

export function ease(name: EasingName): Bezier {
  const match = /cubic-bezier\(([^)]+)\)/.exec(readVar(VAR[name]))
  if (!match) return FALLBACK[name]
  const numbers = match[1].split(",").map(Number)
  return numbers.length === 4 && numbers.every(Number.isFinite) ? (numbers as Bezier) : FALLBACK[name]
}

/** A `--duration-*` token in seconds. */
export function duration(token: "press" | "hover" | "page-exit" | "page" | "quote" | "roll", fallbackMs: number): number {
  const raw = readVar(`--duration-${token}`)
  const ms = raw.endsWith("ms") ? parseFloat(raw) : raw.endsWith("s") ? parseFloat(raw) * 1000 : NaN
  return (Number.isFinite(ms) ? ms : fallbackMs) / 1000
}
