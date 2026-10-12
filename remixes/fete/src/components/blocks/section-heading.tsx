import type { ReactNode } from "react"
import { ArrowRight } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { Link } from "@/lib/router"
import { cn } from "@/lib/utils"

/**
 * A section's title row. `size="row"` is the reference's small bold label
 * over a row of cards; `size="loud"` is the oversized two-tone headline the
 * story sections open with — the claim in ink, the reason in soft grey.
 */
export function SectionHeading({
  title,
  continuation,
  eyebrow,
  link,
  linkLabel = "See all",
  size = "row",
  align = "left",
  className,
}: {
  title: ReactNode
  continuation?: ReactNode
  eyebrow?: string
  link?: string
  linkLabel?: string
  size?: "row" | "loud"
  align?: "left" | "center"
  className?: string
}) {
  if (size === "row") {
    return (
      <div className={cn("mb-5 flex items-end justify-between gap-4", className)}>
        <h2 className="text-[22px] font-semibold tracking-[-0.022em] text-ink md:text-h4">{title}</h2>
        {link && (
          <Link href={link} className="group inline-flex min-h-11 items-center gap-1 text-[15px] text-ink-3 transition-colors duration-(--duration-hover) hover:text-ink">
            {linkLabel}
            <ArrowRight className="size-4 transition-transform duration-(--duration-hover) ease-(--ease-out-strong) group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>
    )
  }
  return (
    <Reveal className={cn("mb-12 md:mb-16", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className="type-eyebrow mb-4 text-berry">{eyebrow}</p>}
      <h2 className={cn("type-head text-display text-balance text-ink", align === "center" && "mx-auto", "max-w-[18ch]")}>
        {title}
        {continuation && <span className="text-ink-4"> {continuation}</span>}
      </h2>
    </Reveal>
  )
}
