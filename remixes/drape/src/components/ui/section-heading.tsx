import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

/**
 * A section title in the page's voice: a sans heading that may carry one
 * script word (`script`), the way the hero does, and an optional lede.
 */
export function SectionHeading({
  title,
  script,
  lede,
  align = "left",
  tone = "dark",
  className,
  children,
}: {
  title: string
  script?: string
  lede?: string
  align?: "left" | "center"
  tone?: "dark" | "light"
  className?: string
  children?: ReactNode
}) {
  return (
    <div className={cn(align === "center" && "mx-auto text-center", "max-w-2xl", className)}>
      <h2
        className={cn(
          "font-display text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.04] font-medium tracking-[-0.035em] text-balance",
          tone === "dark" ? "text-cream" : "text-ink",
        )}
      >
        {title}
        {script ? (
          <>
            {" "}
            <span className="font-script font-normal tracking-normal">{script}</span>
          </>
        ) : null}
      </h2>
      {lede ? (
        <p className={cn("mt-4 text-[15px] leading-relaxed text-pretty", tone === "dark" ? "text-cream-2" : "text-ink-2")}>
          {lede}
        </p>
      ) : null}
      {children}
    </div>
  )
}
