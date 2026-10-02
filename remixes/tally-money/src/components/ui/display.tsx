import type * as React from "react"

import { cn } from "@/lib/utils"

const SIZES = {
  xl: "text-[clamp(3rem,9.5vw,7.25rem)] leading-[0.92] tracking-[-0.045em]",
  lg: "text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[0.98] tracking-[-0.04em]",
  md: "text-[clamp(2rem,4vw,3rem)] leading-[1] tracking-[-0.035em]",
} as const

/** The page's headline voice: heavy, tight, balanced. One component so every section speaks alike. */
export function Display({
  as: Tag = "h2",
  size = "lg",
  tone = "light",
  className,
  ...props
}: { as?: "h1" | "h2" | "h3" | "p"; size?: keyof typeof SIZES; tone?: "light" | "dark" } & React.ComponentProps<"h2">) {
  return <Tag className={cn("font-extrabold text-balance", SIZES[size], tone === "dark" ? "text-white" : "text-ink-900", className)} {...props} />
}
