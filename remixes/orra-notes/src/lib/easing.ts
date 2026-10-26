/**
 * The motion tokens from `index.css`, as arrays Framer Motion can take.
 * Keep the two in step: `--ease-out-soft`, `--ease-in-out-soft`, `--ease-drawer`.
 */
export const EASE = {
  out: [0.23, 1, 0.32, 1],
  "in-out": [0.77, 0, 0.175, 1],
  drawer: [0.32, 0.72, 0, 1],
} as const

export type EaseName = keyof typeof EASE

export const DURATION = { fast: 0.16, base: 0.36, slow: 0.64 } as const
