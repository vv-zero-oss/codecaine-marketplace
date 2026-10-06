/**
 * The token catalogue, as data.
 *
 * The Foundations page renders from these arrays instead of hand-written rows,
 * so a token added in src/styles/theme.css is documented by adding one entry here —
 * never by pasting a hex value or a duration into JSX.
 */

export const TYPE_SCALE = [
  { token: "text-3xl", metrics: "36/34", role: "type-display", sample: "Live demo" },
  { token: "text-2xl", metrics: "26/32", role: "type-title", sample: "Section title" },
  { token: "text-xl", metrics: "18/24", role: "type-eyebrow", sample: "Eyebrow" },
  { token: "text-lg", metrics: "16/24", role: "type-lead", sample: "Lead paragraph for hero subtitles" },
  { token: "text-md", metrics: "15/21", role: "type-heading", sample: "Card heading" },
  { token: "text-base", metrics: "14/20", role: "type-body-lg", sample: "Long-form body copy" },
  { token: "text-sm", metrics: "13/18", role: "type-body", sample: "UI default — buttons, rows, inputs, menu items" },
  { token: "text-xs", metrics: "12/16", role: "type-caption", sample: "Caption and helper text" },
  { token: "text-2xs", metrics: "11/14", role: "type-meta", sample: "Meta, section headers, keycaps" },
] as const;

export const SURFACE_TOKENS = ["bg", "surface", "surface-raised", "surface-sunken"] as const;

export const TEXT_TOKENS = [
  "fg",
  "fg-strong",
  "fg-muted",
  "fg-subtle",
  "fg-faint",
  "fg-disabled",
] as const;

export const STATUS_SWATCHES = [
  { label: "accent", fg: "--ui-accent", bg: "--ui-accent-bg" },
  { label: "success", fg: "--ui-success", bg: "--ui-success-bg" },
  { label: "danger", fg: "--ui-danger", bg: "--ui-danger-bg" },
] as const;

export const CATEGORY_CHIPS = ["easing", "duration", "scale", "blur", "delay"] as const;

export const ELEVATION_TOKENS = [
  { token: "shadow-ring", surface: "bg-surface" },
  { token: "shadow-drop", surface: "bg-surface" },
  { token: "shadow-btn", surface: "bg-surface" },
  { token: "shadow-card", surface: "bg-surface" },
  { token: "shadow-menu", surface: "bg-surface-raised" },
  { token: "shadow-panel", surface: "bg-surface" },
] as const;

export const DURATIONS = [
  { name: "micro", value: "120ms" },
  { name: "fast — closes, hovers", value: "150ms" },
  { name: "medium — opens, swaps", value: "250ms" },
  { name: "slow — panels", value: "400ms" },
  { name: "very slow — page moments", value: "600ms" },
] as const;

export const EASINGS = [
  { name: "smooth — the house curve", value: "cubic-bezier(.22, 1, .36, 1)" },
  { name: "morph — size changes", value: "cubic-bezier(.34, 1.25, .64, 1)" },
  { name: "bounce — badge pop", value: "cubic-bezier(.34, 1.36, .64, 1)" },
] as const;
