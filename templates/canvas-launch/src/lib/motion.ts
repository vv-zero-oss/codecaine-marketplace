/**
 * The motion values every animation on the page shares, as numbers Framer
 * Motion can take. They mirror the `--ease-*` tokens in `index.css`; change
 * one, change the other.
 *
 * Read off the reference film at 30fps:
 * - a caption is cut, not faded out (gone in one frame), and the next one
 *   comes up out of faint ink (≈30%) to full over ~5 frames, 0.17s, without
 *   moving;
 * - a second line is added under a caption the same way ~5 frames later — it
 *   is added, not swapped in with the first;
 * - a window appears within a frame or two and settles ~12px over ~0.35s;
 *   the camera and windows that travel move ease-in-out over ~0.6s;
 * - the app icon darkens as it is pressed (~0.17s) before the window opens.
 */
export const EASE_FILM = [0.65, 0, 0.35, 1] as const
export const EASE_SWAP = [0.22, 1, 0.36, 1] as const

export const CAPTION_IN = 0.17
export const CAPTION_OUT = 0.04
export const CAPTION_FROM = 0.3
export const APPEAR = 0.12
export const SETTLE = 0.35
export const MOVE = 0.6

/** Lenis tuned to the film: a light, quick settle rather than a float. */
export const LENIS_OPTIONS = { lerp: 0.1, wheelMultiplier: 0.9, smoothWheel: true } as const
