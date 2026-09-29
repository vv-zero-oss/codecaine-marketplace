/**
 * The motion tokens, for Framer Motion.
 *
 * The same curves and durations as the `--ease-*` and `--duration-*` tokens in
 * `index.css` (CSS transitions read those; Framer Motion needs numbers). Change
 * one, change the other.
 */

export const EASE = {
  /** A fast start that settles — entrances, swaps, anything arriving. */
  out: [0.22, 1, 0.36, 1],
  /** Slow at both ends — things that move from one place to another. */
  inOut: [0.65, 0, 0.35, 1],
} as const

export type Easing = "out" | "in-out" | "spring"

/** The name a component's `easing` prop takes, as a Framer Motion transition. */
export function curve(easing: Easing, duration: number) {
  if (easing === "spring") return { type: "spring" as const, duration, bounce: 0.18 }
  return { duration, ease: easing === "out" ? EASE.out : EASE.inOut }
}

export const DURATION = {
  press: 0.12,
  hover: 0.2,
  /** A logo leaving its cell and the next one arriving. */
  swap: 0.45,
  reveal: 0.7,
} as const
