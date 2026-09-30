import { transform, useTransform, type MotionValue } from "motion/react"

/**
 * `useTransform(value, input, output)`, computed in JavaScript.
 *
 * Motion hands a plain range mapping of scroll progress on `opacity` to the
 * browser's native scroll timeline, and with a pinned (sticky) stage that
 * timeline's range comes out wrong — the fade runs backwards past the end.
 * A function transform cannot be handed over, so this one always follows
 * the same progress the transforms beside it do.
 */
export function useRange(value: MotionValue<number>, input: number[], output: number[]) {
  const [a, b] = [input.join(), output.join()]
  return useTransform(value, (v) => transform(v, a.split(",").map(Number), b.split(",").map(Number)))
}
