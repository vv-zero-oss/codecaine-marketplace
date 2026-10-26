import type * as React from "react"

import { Eyebrow } from "@/components/ui/eyebrow"
import { cn } from "@/lib/utils"

/** A caption over a Geist heading, left-aligned or centred. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  size = "heading-lg",
  className,
}: {
  eyebrow?: string
  title: React.ReactNode
  lead?: React.ReactNode
  align?: "left" | "center"
  size?: "heading-lg" | "heading"
  className?: string
}) {
  return (
    <div className={cn(align === "center" ? "mx-auto text-center" : "text-left", className)}>
      {eyebrow ? <Eyebrow className="mb-3">{eyebrow}</Eyebrow> : null}
      <h2
        className={cn(
          "font-heading font-medium text-balance text-bone",
          size === "heading-lg" ? "text-heading-lg" : "text-heading",
        )}
      >
        {title}
      </h2>
      {lead ? (
        <p className={cn("mt-4 font-heading text-subheading font-medium text-ash", align === "center" && "mx-auto max-w-xl")}>
          {lead}
        </p>
      ) : null}
    </div>
  )
}
