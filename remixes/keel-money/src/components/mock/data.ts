import type { ComponentProps } from "react"

import type { Chip } from "@/components/ui/chip"

type Tone = NonNullable<ComponentProps<typeof Chip>["tone"]>

/** The sample household the mocks show: one month of a real-looking life. */
export const TRANSACTIONS: { day: string; name: string; tag: string; tone: Tone; amount: string }[] = [
  { day: "Today", name: "Streamline Music", tag: "Subscriptions", tone: "teal", amount: "11.99" },
  { day: "Today", name: "Corner Market", tag: "Groceries", tone: "lime", amount: "48.20" },
  { day: "Today", name: "Metro Rideshare", tag: "Transport", tone: "orange", amount: "18.75" },
  { day: "Yesterday", name: "Lantern Cinema", tag: "Fun", tone: "pink", amount: "24.00" },
  { day: "Yesterday", name: "Greenleaf Salads", tag: "Dining", tone: "amber", amount: "14.60" },
  { day: "Yesterday", name: "Hardware Co.", tag: "Home", tone: "violet", amount: "62.35" },
]

export const CATEGORIES = [
  { name: "Food & Drink", amount: "412", colour: "var(--color-tag-amber)" },
  { name: "Dining out", amount: "96", colour: "var(--color-tag-orange)" },
  { name: "Groceries", amount: "288", colour: "var(--color-tag-lime)" },
  { name: "Coffee", amount: "28", colour: "var(--color-tag-amber)" },
  { name: "Essentials", amount: "702", colour: "var(--color-tag-teal)" },
  { name: "Shopping", amount: "84", colour: "var(--color-tag-pink)" },
  { name: "Fun", amount: "52", colour: "var(--color-tag-violet)" },
]

export const BUDGETS = [
  { label: "Car", left: "212", over: true, pct: 1, colour: "var(--color-loss)" },
  { label: "Gifts", left: "18", over: true, pct: 1, colour: "var(--color-loss)" },
  { label: "Groceries", left: "64", over: false, pct: 0.7, colour: "var(--color-warn)" },
  { label: "Transit", left: "41", over: false, pct: 0.62, colour: "var(--color-warn)" },
  { label: "Dining", left: "180", over: false, pct: 0.35, colour: "var(--color-gain)" },
]
