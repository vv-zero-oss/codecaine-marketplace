import { createContext, useContext } from "react"
import { useTransform, type MotionValue } from "motion/react"

/**
 * The scroll progress (0 → 1) of the nearest pinned stage — a
 * `ClipZoomVideo` or a pinned section — so what is laid over or around it can
 * move in step without the progress being passed down as a prop (the editor
 * can only edit scalar props, and a `MotionValue` is not one).
 */
export const StageProgress = createContext<MotionValue<number> | null>(null)

export function useStageProgress() {
  const progress = useContext(StageProgress)
  if (!progress) throw new Error("useStageProgress must be used inside a pinned stage")
  return progress
}

/** Piecewise-linear, clamped at both ends. */
export function interpolate(v: number, input: readonly number[], output: readonly number[]) {
  if (v <= input[0]) return output[0]
  for (let i = 1; i < input.length; i++) {
    if (v <= input[i]) {
      const t = (v - input[i - 1]) / (input[i] - input[i - 1] || 1)
      return output[i - 1] + (output[i] - output[i - 1]) * t
    }
  }
  return output[output.length - 1]
}

/**
 * `useTransform(value, input, output)` for numbers, but computed in a
 * function so it always clamps: handed a plain range mapping of scroll
 * progress, Motion may move it onto a native scroll timeline, which on some
 * builds keeps going past the last stop instead of holding it.
 */
export function useRange(value: MotionValue<number>, input: readonly number[], output: readonly number[]) {
  return useTransform(value, (v: number) => interpolate(v, input, output))
}

/** A colour between two tokens, `amount` 0 → 1 from `from` to `to`. */
export function mixToken(from: string, to: string, amount: number) {
  return `color-mix(in srgb, var(${to}) ${(amount * 100).toFixed(1)}%, var(${from}))`
}
