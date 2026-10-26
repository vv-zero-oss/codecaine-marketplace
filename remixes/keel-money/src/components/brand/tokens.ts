/** Every token the style guide shows, grouped the way a designer reaches for
 *  them. Names only: the values are read from the stylesheet at runtime. */
export const COLOUR_GROUPS: { title: string; tokens: string[] }[] = [
  { title: "Night surfaces", tokens: ["night", "night-deep", "night-glow", "surface", "surface-2", "surface-3"] },
  { title: "Text on night", tokens: ["fg", "fg-2", "fg-3", "fg-4", "silver-hi", "silver-lo"] },
  { title: "Lines", tokens: ["line", "line-strong", "day-line"] },
  { title: "Blue — the action", tokens: ["blue", "blue-hover", "blue-press", "blue-banner", "blue-soft", "blue-ink"] },
  { title: "Day — the wealth chapter", tokens: ["day", "day-card", "day-ink", "day-ink-2", "day-ink-3"] },
  { title: "Signals", tokens: ["gain", "gain-soft", "gain-ink", "loss", "loss-soft", "star", "warn"] },
  { title: "Candy — the hero pills", tokens: ["candy-green", "candy-violet", "candy-red", "candy-slate", "candy-pink", "candy-orange"] },
  { title: "Category chips", tokens: ["tag-teal", "tag-lime", "tag-orange", "tag-pink", "tag-amber", "tag-violet"] },
]

export const CONTRAST_PAIRS: { fg: string; bg: string; use: string }[] = [
  { fg: "fg", bg: "night", use: "Headlines and body on night" },
  { fg: "fg-2", bg: "night", use: "Secondary copy" },
  { fg: "fg-3", bg: "surface", use: "Card explanations" },
  { fg: "fg-4", bg: "surface", use: "Timestamps, decoration only" },
  { fg: "day-ink", bg: "day", use: "Headlines on day" },
  { fg: "day-ink-2", bg: "day-card", use: "Copy on white cards" },
  { fg: "blue-ink", bg: "blue", use: "Button labels" },
  { fg: "day-ink", bg: "day", use: "Header button label" },
]

export const TYPE_SCALE: { token: string; sample: string; family: "display" | "sans" }[] = [
  { token: "hero", sample: "Every dollar.", family: "display" },
  { token: "h2", sample: "Fair pricing, said plainly", family: "display" },
  { token: "statement", sample: "Keel keeps your money on an even course.", family: "display" },
  { token: "h3", sample: "Everything you own, one screen", family: "display" },
  { token: "lead", sample: "Checking, cards, savings and investments, sorted.", family: "sans" },
  { token: "h4", sample: "Try the demo first", family: "display" },
  { token: "body", sample: "Correct one once and Keel remembers, so review takes seconds.", family: "sans" },
  { token: "caption", sample: "$1,580 spent last month", family: "sans" },
  { token: "micro", sample: "ROLLED OVER · FROM FEBRUARY", family: "sans" },
]

export const RADII = ["chip", "button", "field", "card", "panel", "device", "pill"]
export const SHADOWS = ["card", "inner", "glass", "button", "button-light", "pill", "device", "day-card"]
export const SPACING = [4, 8, 12, 16, 24, 32, 48, 64, 96]
export const EASINGS = ["ease-out-strong", "ease-in-out-strong", "ease-drift"]
export const DURATIONS = ["duration-press", "duration-hover", "duration-swap", "duration-reveal", "duration-float"]
