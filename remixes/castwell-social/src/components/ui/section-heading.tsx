import type * as React from "react"

import { Reveal } from "@/components/motion/reveal"
import { Eyebrow } from "@/components/ui/eyebrow"
import { cn } from "@/lib/utils"

/**
 * Eyebrow, serif title, one line of support. Centred by default; `align`
 * "left" for the sections that read from the edge.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
  className,
}: {
  eyebrow?: string
  title: string
  description?: string
  align?: "center" | "left"
  tone?: "light" | "night"
  className?: string
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4 md:gap-5",
        align === "center" ? "mx-auto max-w-3xl items-center text-center" : "max-w-2xl items-start",
        className,
      )}
    >
      {eyebrow && <Eyebrow className={cn(tone === "night" && "text-night-muted")}>{eyebrow}</Eyebrow>}
      <h2
        className={cn(
          "font-serif text-title font-light text-balance",
          tone === "night" ? "text-night-ink" : "text-ink",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "max-w-xl text-[15px] leading-relaxed text-pretty md:text-base",
            tone === "night" ? "text-night-muted" : "text-ink-soft",
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  )
}
