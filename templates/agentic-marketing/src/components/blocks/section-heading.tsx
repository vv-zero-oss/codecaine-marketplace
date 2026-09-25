import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * The reference's heading: two lines in one weight-contrast pair, one ink and
 * one grey. Which comes first varies by section, so `order` says so.
 */
export function SectionHeading({
  light,
  bold,
  order = "light-first",
  size = "headline",
  as: Tag = "h2",
  className,
  children,
}: {
  light: string
  bold: string
  order?: "light-first" | "bold-first"
  size?: "headline" | "title"
  as?: "h1" | "h2" | "h3"
  className?: string
  children?: React.ReactNode
}) {
  const lightLine = <span className="block text-ink-faint">{light}</span>
  const boldLine = <span className="block text-ink">{bold}</span>
  return (
    <div className={cn("max-w-[36rem]", className)}>
      <Tag className={cn("font-[550] text-balance", size === "headline" ? "text-headline" : "text-title")}>
        {order === "light-first" ? (
          <>
            {lightLine}
            {boldLine}
          </>
        ) : (
          <>
            {boldLine}
            {lightLine}
          </>
        )}
      </Tag>
      {children && <div className="mt-3 text-[14px] leading-relaxed text-ink-soft">{children}</div>}
    </div>
  )
}
