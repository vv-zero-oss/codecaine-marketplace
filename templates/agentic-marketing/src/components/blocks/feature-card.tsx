import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * One bento tile: a stone (or forest) panel, its title and a line under it,
 * with an illustration in the space that is left. `captionAt` follows the
 * reference, which puts the words on top of some tiles and under others.
 */
export function FeatureCard({
  title,
  body,
  tone = "stone",
  captionAt = "bottom",
  className,
  children,
}: {
  title: string
  body: string
  tone?: "stone" | "forest" | "paper"
  captionAt?: "top" | "bottom"
  className?: string
  children: React.ReactNode
}) {
  const caption = (
    <div className="relative z-10">
      <h3 className={cn("text-[14px] font-medium", tone === "forest" ? "text-white" : "text-ink")}>{title}</h3>
      <p className={cn("mt-1 text-[12px] leading-relaxed", tone === "forest" ? "text-white/60" : "text-ink-soft")}>{body}</p>
    </div>
  )
  return (
    <article
      className={cn(
        "flex h-full min-h-[22rem] flex-col gap-6 overflow-hidden rounded-card p-6 md:min-h-[26rem]",
        tone === "stone" && "bg-stone",
        tone === "forest" && "bg-forest",
        tone === "paper" && "bg-surface shadow-hairline",
        className,
      )}
    >
      {captionAt === "top" && caption}
      <div className="grid flex-1 place-items-center">{children}</div>
      {captionAt === "bottom" && caption}
    </article>
  )
}
