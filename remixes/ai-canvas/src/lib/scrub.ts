import { useTransform, type MotionValue } from "motion/react"

/**
 * Values scrubbed by a scroll progress.
 *
 * Function transforms on purpose. Handed an array range, Motion passes
 * `opacity` and `filter` to the browser's native ScrollTimeline, and on a
 * pinned (`position: sticky`) target that timeline maps the offsets wrongly —
 * measured here: the hero's headline faded out, then came back as the page
 * scrolled on. A function keeps the mapping on Motion's own progress, which
 * is right.
 */
function amount(v: number, a: number, b: number) {
  return Math.min(1, Math.max(0, (v - a) / (b - a)))
}

export function useScrub(value: MotionValue<number>, [a, b]: [number, number], [from, to]: [number, number]) {
  return useTransform(value, (v) => from + (to - from) * amount(v, a, b))
}

export function useScrubBlur(value: MotionValue<number>, [a, b]: [number, number], [from, to]: [number, number]) {
  return useTransform(value, (v) => `blur(${(from + (to - from) * amount(v, a, b)).toFixed(2)}px)`)
}
