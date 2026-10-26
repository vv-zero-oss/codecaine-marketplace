/** Every token the style guide shows, grouped the way a designer reaches for
 *  them. Names only: the values are read from the stylesheet at runtime. */
export const COLOUR_GROUPS: { title: string; tokens: string[] }[] = [
  { title: "Brand greens", tokens: ["forest-ink", "spruce", "lime-voltage", "linen-mist"] },
  { title: "Supporting accents", tokens: ["signal-blue", "alarm-red"] },
  { title: "Neutrals", tokens: ["obsidian", "charcoal", "slate", "pebble", "fog", "paper"] },
  { title: "Night — the page", tokens: ["night", "night-deep", "surface", "surface-2", "surface-3", "line", "line-strong"] },
  { title: "Text on night", tokens: ["fg", "fg-2", "fg-3", "fg-4"] },
  { title: "Action — lime, once per view", tokens: ["action", "action-hover", "action-press", "action-soft", "action-ink", "action-banner"] },
  { title: "Day — the progress chapter", tokens: ["day", "day-card", "day-ink", "day-ink-2", "day-ink-3", "day-line"] },
  { title: "Signals", tokens: ["gain", "gain-soft", "loss", "loss-soft", "warn"] },
  { title: "Chips — palette tints readable on Forest Ink", tokens: ["tag-lime", "tag-mist", "tag-sky", "tag-coral", "tag-sand", "tag-sage"] },
]

export const CONTRAST_PAIRS: { fg: string; bg: string; use: string }[] = [
  { fg: "fg", bg: "night", use: "Headlines and body on night" },
  { fg: "fg-2", bg: "night", use: "Secondary copy" },
  { fg: "fg-3", bg: "surface-2", use: "Card explanations on Forest Ink" },
  { fg: "action", bg: "forest-ink", use: "Lime emphasis on dark green" },
  { fg: "action-ink", bg: "action", use: "Button labels on lime" },
  { fg: "forest-ink", bg: "linen-mist", use: "Headlines on the day chapter" },
  { fg: "charcoal", bg: "paper", use: "Copy on Paper cards" },
  { fg: "fg-4", bg: "surface-2", use: "Timestamps, decoration only" },
]

export const TYPE_SCALE: { token: string; sample: string; family: "display" | "sans" }[] = [
  { token: "hero", sample: "Every heartbeat.", family: "display" },
  { token: "h2", sample: "Find your rhythm", family: "display" },
  { token: "statement", sample: "Cadence keeps your whole body in rhythm.", family: "sans" },
  { token: "h3", sample: "All of you, one screen", family: "sans" },
  { token: "lead", sample: "Heart rate, sleep, HRV and every workout.", family: "sans" },
  { token: "h4", sample: "Try it on sample data", family: "sans" },
  { token: "body", sample: "Correct one once and Cadence learns your routine.", family: "sans" },
  { token: "caption", sample: "3 bpm lower than last month", family: "sans" },
  { token: "micro", sample: "ZONE 2 · ENDURANCE", family: "sans" },
]

export const RADII = ["chip", "button", "field", "card", "panel", "device", "pill"]
export const SHADOWS = ["card", "day-card", "glass", "pill", "device"]
export const SPACING = [4, 8, 12, 16, 24, 32, 48, 64, 96]
export const EASINGS = ["ease-out-strong", "ease-in-out-strong", "ease-drift"]
export const DURATIONS = ["duration-press", "duration-hover", "duration-swap", "duration-reveal", "duration-float"]
