/**
 * The motion tokens, for Framer Motion.
 *
 * The same curves and durations as the `--ease-*` tokens in `index.css` (CSS
 * transitions read those; Framer Motion needs numbers). Change one, change
 * the other.
 */

export const EASE = {
  /** Arrives fast and settles long — entrances, anything landing. */
  out: [0, 0, 0, 1],
  /** Emphasized: the page's default for state changes. */
  emphasized: [0.2, 0, 0, 1],
  outCubic: [0.33, 1, 0.68, 1],
  inOutCubic: [0.65, 0, 0.35, 1],
  /** Charts and lines revealing left to right. */
  reveal: [0, 0, 0.58, 1],
} as const

export type Easing = "out" | "in-out" | "spring"

/** The name a component's `easing` prop takes, as a Framer Motion transition. */
export function curve(easing: Easing, duration: number) {
  if (easing === "spring") return { type: "spring" as const, duration, bounce: 0.16 }
  return { duration, ease: easing === "out" ? EASE.out : EASE.inOutCubic }
}
