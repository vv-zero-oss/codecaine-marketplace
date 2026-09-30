import type { Case } from "@/content"

/** Case colours to classes, written out whole so Tailwind generates them. */
export const CASE_BG: Record<Case["color"], string> = {
  blue: "bg-blue",
  pink: "bg-pink",
  orange: "bg-orange",
  red: "bg-red",
  green: "bg-green",
  yellow: "bg-yellow",
  lilac: "bg-lilac",
  mint: "bg-mint",
}

export const CASE_BORDER: Record<Case["color"], string> = {
  blue: "border-blue",
  pink: "border-pink",
  orange: "border-orange",
  red: "border-red",
  green: "border-green",
  yellow: "border-yellow",
  lilac: "border-lilac",
  mint: "border-mint",
}

export const SERVICE_LABEL = { animation: "Animation", video: "Video", social: "Social content" } as const

export function servicesLine(services: Case["services"]) {
  const names = services.map((s) => SERVICE_LABEL[s])
  return names.length > 1 ? `${names.slice(0, -1).join(", ")} & ${names.at(-1)}` : names[0]
}
