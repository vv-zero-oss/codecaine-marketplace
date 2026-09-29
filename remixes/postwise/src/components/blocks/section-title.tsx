import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * The section heading every block opens with: large, light, tight, with one
 * word set in italic for the accent. Two lines on purpose — `lineOne` and
 * `lineTwo` — as the page sets them.
 */
export function SectionTitle({
  lineOne,
  lineTwo,
  accent,
  accentPosition = "end",
  body,
  tone = "paper",
  size = "lg",
  align = "center",
  as: Tag = "h2",
  className,
  children,
}: {
  lineOne?: string
  lineTwo?: string
  /** The word set in italic, placed before or after `lineOne`. */
  accent?: string
  accentPosition?: "start" | "end" | "line-two"
  body?: string
  tone?: "paper" | "night"
  size?: "md" | "lg" | "xl"
  align?: "center" | "left"
  as?: "h1" | "h2"
  className?: string
  children?: React.ReactNode
}) {
  const em = accent ? <em className="font-light italic">{accent}</em> : null
  return (
    <div className={cn("flex flex-col gap-4", align === "center" ? "items-center text-center" : "items-start", className)}>
      <Tag
        className={cn(
          "type-display text-balance",
          size === "md" && "text-[clamp(28px,3.4vw,40px)]",
          size === "lg" && "text-[clamp(34px,4.4vw,52px)]",
          size === "xl" && "text-[clamp(40px,5.6vw,68px)]",
          tone === "night" ? "text-night-fg" : "text-ink",
        )}
      >
        {accentPosition === "start" && em}
        {lineOne}
        {accentPosition === "end" && em && <> {em}</>}
        {(lineTwo || accentPosition === "line-two") && <br className="hidden sm:block" />}
        {accentPosition === "line-two" && em && <>{em} </>}
        {lineTwo && <> {lineTwo}</>}
        {children}
      </Tag>
      {body && (
        <p
          className={cn(
            "max-w-[440px] text-[15px] leading-[1.5] text-pretty sm:text-[16px]",
            tone === "night" ? "text-night-muted" : "text-ink-muted",
          )}
        >
          {body}
        </p>
      )}
    </div>
  )
}
