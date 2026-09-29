/**
 * The page's curves and durations for Framer Motion, mirroring the tokens in
 * `index.css` (`--ease-out-strong`, `--blur-reveal`, …) so a CSS transition
 * and a Motion animation on the same page share one feel.
 *
 * The blur-ins were read off the reference frame by frame: a word or a tile
 * goes from blurred and transparent to sharp in ~0.6s, strongly eased out,
 * with nothing moving — the blur is the motion.
 */
export const EASE_OUT = [0.23, 1, 0.32, 1] as const
export const EASE_IN_OUT = [0.77, 0, 0.175, 1] as const
export const EASE_DRAWER = [0.32, 0.72, 0, 1] as const

export const DURATION = {
  press: 0.14,
  hover: 0.2,
  reveal: 0.6,
  tile: 0.6,
  swap: 0.45,
} as const

/** Blur, in px, a revealed thing starts from. */
export const BLUR = 12

/** Stagger between words entering together. */
export const STAGGER = 0.07

export const SPRING_FOLLOW = { type: "spring", duration: 0.6, bounce: 0.1 } as const
export const SPRING_POP = { type: "spring", duration: 0.5, bounce: 0.2 } as const

export type Easing = "out" | "in-out" | "drawer"
export const EASINGS: Record<Easing, readonly [number, number, number, number]> = {
  out: EASE_OUT,
  "in-out": EASE_IN_OUT,
  drawer: EASE_DRAWER,
}
