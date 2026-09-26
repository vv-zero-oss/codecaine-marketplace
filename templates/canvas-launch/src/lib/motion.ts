/**
 * The motion values every animation on the page shares, as numbers Framer
 * Motion can take. They mirror the `--ease-*` tokens in `index.css`; change
 * one, change the other.
 *
 * Measured off the reference recording at 60fps:
 * - a headline swap overlaps old and new over ~0.45s — both lift ~20px, the
 *   old line blurring out while the new one sharpens in from below;
 * - a camera move across the editor takes ~0.45s and starts fast, and the
 *   copy beside it arrives ~0.3s after it settles;
 * - the opening mark holds, then accelerates through its own hole over ~1.2s.
 */
export const EASE_SWAP = [0.22, 1, 0.36, 1] as const
export const EASE_CAMERA = [0.25, 1, 0.5, 1] as const
export const EASE_DIVE = [0.7, 0, 0.84, 0] as const

export const SWAP_DURATION = 0.45
export const CAMERA_DURATION = 0.45
export const AFTER_CAMERA = 0.35
export const SWAP_BLUR = 8
export const SWAP_LIFT = 20

/** Lenis tuned to the recording: a light, quick settle rather than a float. */
export const LENIS_OPTIONS = { lerp: 0.12, wheelMultiplier: 0.9, smoothWheel: true } as const
