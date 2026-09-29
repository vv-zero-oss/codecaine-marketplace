import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * A section's title: light, tight and large, one line per string in `lines`
 * so the breaks are the ones the copy was written with — from `md` up; on a
 * phone the lines run on and wrap wherever they fit.
 */
export function SectionHeading({
  lines,
  as: Tag = "h2",
  size = "lg",
  className,
  children,
}: {
  lines?: readonly string[]
  as?: "h1" | "h2" | "h3"
  size?: "xl" | "lg" | "md"
  className?: string
  children?: React.ReactNode
}) {
  return (
    <Tag
      className={cn(
        size === "xl" && "type-display text-[clamp(44px,6.2vw,92px)]",
        size === "lg" && "type-heading text-[clamp(36px,4.4vw,68px)]",
        size === "md" && "type-heading text-[clamp(30px,3vw,48px)]",
        "text-fg",
        className,
      )}
    >
      {lines?.map((line, i) => (
        <span key={i} className="md:block">
          {line}
          {i < lines.length - 1 && " "}
        </span>
      ))}
      {children}
    </Tag>
  )
}
