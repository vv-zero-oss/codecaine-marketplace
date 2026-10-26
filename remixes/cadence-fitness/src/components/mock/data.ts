import type { ComponentProps } from "react"

import type { Chip } from "@/components/ui/chip"

type Tone = NonNullable<ComponentProps<typeof Chip>["tone"]>

/** The sample athlete the mocks show: a real-looking week of training. */
export const SESSIONS: { day: string; name: string; tag: string; tone: Tone; value: string; unit: string }[] = [
  { day: "Today", name: "Morning run", tag: "Zone 2", tone: "sky", value: "42", unit: "min" },
  { day: "Today", name: "Mobility flow", tag: "Recovery", tone: "lime", value: "15", unit: "min" },
  { day: "Today", name: "Commute ride", tag: "Zone 3", tone: "sand", value: "8.4", unit: "km" },
  { day: "Yesterday", name: "Track intervals", tag: "Zone 5", tone: "coral", value: "36", unit: "min" },
  { day: "Yesterday", name: "Upper body", tag: "Strength", tone: "sage", value: "50", unit: "min" },
  { day: "Yesterday", name: "Evening walk", tag: "Zone 1", tone: "mist", value: "6,240", unit: "steps" },
]

export const ZONES = [
  { name: "Zone 5 · Max", value: "12", colour: "var(--color-loss)" },
  { name: "Zone 4 · Threshold", value: "28", colour: "var(--color-tag-sand)" },
  { name: "Zone 3 · Tempo", value: "46", colour: "var(--color-warn)" },
  { name: "Zone 2 · Endurance", value: "184", colour: "var(--color-action)" },
  { name: "Zone 1 · Easy", value: "96", colour: "var(--color-tag-sky)" },
  { name: "Strength", value: "110", colour: "var(--color-tag-mist)" },
  { name: "Mobility", value: "40", colour: "var(--color-tag-coral)" },
]

export const GOALS = [
  { label: "Move", value: "640", unit: "kcal", pct: 1, colour: "var(--color-loss)" },
  { label: "Steps", value: "9.2k", unit: "", pct: 0.92, colour: "var(--color-action)" },
  { label: "Sleep", value: "7.4", unit: "h", pct: 0.82, colour: "var(--color-tag-mist)" },
  { label: "Water", value: "1.6", unit: "L", pct: 0.62, colour: "var(--color-tag-sky)" },
  { label: "Mind", value: "8", unit: "min", pct: 0.4, colour: "var(--color-warn)" },
]
