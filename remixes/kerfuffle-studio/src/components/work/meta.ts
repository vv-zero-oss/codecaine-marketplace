import type { Case } from "@/content"

export const SERVICE_LABEL = { animation: "Animation", video: "Film", social: "Social" } as const

export function servicesLine(services: Case["services"]) {
  return services.map((s) => SERVICE_LABEL[s]).join(", ")
}
