import type { Tone } from "@/content"

/** A tone's fill and the ink that reads on it, as Tailwind classes. */
export const TONE_FILL: Record<Tone, string> = {
  lime: "bg-lime text-night",
  pink: "bg-pink text-night",
  orange: "bg-orange text-night",
  sun: "bg-sun text-night",
  mint: "bg-mint text-night",
  violet: "bg-violet text-night",
}

export const TONE_TEXT: Record<Tone, string> = {
  lime: "text-lime",
  pink: "text-pink",
  orange: "text-orange",
  sun: "text-sun",
  mint: "text-mint",
  violet: "text-violet",
}

export const TONES: Tone[] = ["lime", "pink", "orange", "sun", "mint", "violet"]
