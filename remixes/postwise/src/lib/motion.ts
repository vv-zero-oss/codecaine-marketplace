import type { Transition } from "motion/react"

/**
 * The page's curves, by name — the same values as the `--ease-*` tokens in
 * `index.css`, so CSS and Framer Motion move alike. A component takes one of
 * these names as a string prop, which the editor turns into a dropdown.
 */
export type Easing = "out" | "in-out" | "spring"

const BEZIER = {
  out: [0.22, 1, 0.36, 1],
  "in-out": [0.65, 0, 0.35, 1],
} as const

export function curve(easing: Easing, duration: number): Transition {
  if (easing === "spring") return { type: "spring", duration, bounce: 0.18 }
  return { ease: [...BEZIER[easing]] as [number, number, number, number], duration }
}
