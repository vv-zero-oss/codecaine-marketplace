import type { Case } from "@/content"

/** Case colours to classes, written out whole so Tailwind generates them. */
export const CASE_BG: Record<Case["color"], string> = {
  flame: "bg-flame",
  lime: "bg-lime",
  violet: "bg-violet",
  red: "bg-red",
  green: "bg-green",
  yellow: "bg-yellow",
  iris: "bg-iris",
  mint: "bg-mint",
}

export const CASE_BORDER: Record<Case["color"], string> = {
  flame: "border-flame",
  lime: "border-lime",
  violet: "border-violet",
  red: "border-red",
  green: "border-green",
  yellow: "border-yellow",
  iris: "border-iris",
  mint: "border-mint",
}

export const SERVICE_LABEL = { animation: "Animation", video: "Video", social: "Social content" } as const

export function servicesLine(services: Case["services"]) {
  const names = services.map((s) => SERVICE_LABEL[s])
  return names.length > 1 ? `${names.slice(0, -1).join(", ")} & ${names.at(-1)}` : names[0]
}
