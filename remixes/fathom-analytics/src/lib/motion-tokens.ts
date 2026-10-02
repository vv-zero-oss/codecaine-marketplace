/**
 * The motion tokens from index.css, in the shape Framer Motion wants.
 * Change a curve or duration in both places; /brand plays the CSS ones.
 */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const
export const DURATION = { fast: 0.16, base: 0.32, slow: 0.7 } as const

/** Spring used for hover lifts and presses. */
export const SPRING = { type: "spring", stiffness: 380, damping: 32, mass: 0.7 } as const
