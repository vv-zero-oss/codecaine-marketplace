/**
 * The motion values every animation on the page shares, as numbers Framer
 * Motion can take. They mirror the `--ease-*` tokens in `index.css`; change
 * one, change the other.
 *
 * Measured off the reference recording at 60fps:
 * - a headline swap overlaps old and new over ~0.6s — the old line lifts and
 *   blurs out while the new one sharpens in from just below;
 * - a camera move across the editor takes ~0.5s and starts fast;
 * - the opening mark holds, then accelerates through its own hole over ~1.2s.
 */
export const EASE_SWAP = [0.22, 1, 0.36, 1] as const
export const EASE_CAMERA = [0.25, 1, 0.5, 1] as const
export const EASE_DIVE = [0.7, 0, 0.84, 0] as const

export const SWAP_DURATION = 0.6
export const CAMERA_DURATION = 0.75
export const SWAP_BLUR = 8
export const SWAP_LIFT = 14

/** Lenis tuned to the recording: a light, quick settle rather than a float. */
export const LENIS_OPTIONS = { lerp: 0.12, wheelMultiplier: 0.9, smoothWheel: true } as const
