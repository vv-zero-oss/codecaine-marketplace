import type * as React from "react"

import { Eyebrow } from "@/components/ui/eyebrow"
import { cn } from "@/lib/utils"

/** An eyebrow over a headline, left-aligned or centred. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "center",
  size = "headline",
  className,
}: {
  eyebrow?: string
  title: React.ReactNode
  lead?: React.ReactNode
  align?: "left" | "center"
  size?: "headline" | "title"
  className?: string
}) {
  return (
    <div className={cn(align === "center" ? "mx-auto text-center" : "text-left", className)}>
      {eyebrow ? <Eyebrow className="mb-3">{eyebrow}</Eyebrow> : null}
      <h2 className={cn("text-balance", size === "headline" ? "text-headline" : "text-title")}>{title}</h2>
      {lead ? (
        <p className={cn("mt-4 text-lg leading-snug text-ink-2 sm:text-xl", align === "center" && "mx-auto max-w-xl")}>
          {lead}
        </p>
      ) : null}
    </div>
  )
}
