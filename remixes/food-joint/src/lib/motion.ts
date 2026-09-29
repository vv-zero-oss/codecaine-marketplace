/**
 * The page's curves and durations for Framer Motion, mirroring the tokens in
 * `index.css` (`--ease-out-strong`, `--duration-reveal`, …) so a CSS
 * transition and a Motion animation on the same page share one feel.
 */
export const EASE_OUT = [0.23, 1, 0.32, 1] as const
export const EASE_IN_OUT = [0.77, 0, 0.175, 1] as const
export const EASE_DRAWER = [0.32, 0.72, 0, 1] as const

export const DURATION = {
  hover: 0.2,
  item: 0.3,
  reveal: 0.7,
  curtain: 0.9,
  hero: 1.1,
} as const

/** The springs: a settled one for things that follow the pointer, a lively
 *  one for the few one-time moments that are allowed a bounce. */
export const SPRING_FOLLOW = { type: "spring", duration: 0.5, bounce: 0.15 } as const
export const SPRING_POP = { type: "spring", duration: 0.6, bounce: 0.3 } as const

/** Stagger between siblings entering together. */
export const STAGGER = 0.05
