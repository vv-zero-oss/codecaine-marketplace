/**
 * Motion durations live in CSS (`--duration-*` in src/styles/theme.css) and nowhere
 * else. When JS has to hold a class for the length of an exit animation it
 * reads the token rather than repeating the number — so retiming the system is
 * still a one-line change in theme.css.
 */
export const DURATION_TOKENS = {
  micro: "--duration-micro",
  fast: "--duration-fast",
  medium: "--duration-medium",
  slow: "--duration-slow",
  verySlow: "--duration-very-slow",
} as const;

export type DurationToken = keyof typeof DURATION_TOKENS;

/** Fallbacks mirror theme.css, used only before hydration / in tests. */
const FALLBACK_MS: Record<DurationToken, number> = {
  micro: 120,
  fast: 150,
  medium: 250,
  slow: 400,
  verySlow: 600,
};

export function durationMs(token: DurationToken): number {
  if (typeof window === "undefined") return FALLBACK_MS[token];
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(DURATION_TOKENS[token])
    .trim();
  if (raw.endsWith("ms")) return Number.parseFloat(raw);
  if (raw.endsWith("s")) return Number.parseFloat(raw) * 1000;
  return FALLBACK_MS[token];
}

/** True when the visitor asked the OS for less motion. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}
