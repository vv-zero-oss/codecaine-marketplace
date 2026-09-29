/**
 * The page's motion constants — the same values as the `--ease-*` and
 * `--duration-*` tokens in `index.css`, as arrays Framer Motion takes.
 */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const
export const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const
export const EASE_IN_OUT_QUART = [0.76, 0, 0.24, 1] as const

export const DURATION = {
  press: 0.12,
  swap: 0.35,
  wipe: 0.8,
  spread: 0.9,
} as const

/** The spring the draggable compare handle settles with. */
export const HANDLE_SPRING = { type: "spring", stiffness: 420, damping: 42, mass: 0.6 } as const

/** The named curves a motion component's `easing` prop picks from. */
export type EasingName = "expo" | "quint" | "in-out"
export const EASINGS: Record<EasingName, readonly [number, number, number, number]> = {
  expo: EASE_OUT_EXPO,
  quint: EASE_OUT_QUINT,
  "in-out": EASE_IN_OUT_QUART,
}
