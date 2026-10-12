import { ArrowRight } from "lucide-react"

import { Link } from "@/lib/router"
import { cn } from "@/lib/utils"

/**
 * The reference's section head: a medium grotesk title, "View more" in small
 * caps at the far end, and a 1px rule under both.
 */
export function SectionTitle({
  title,
  href,
  action = "View more",
  className,
}: {
  title: string
  href?: string
  action?: string
  className?: string
}) {
  return (
    <div className={cn("flex items-end justify-between gap-6 border-b border-rule pb-3", className)}>
      <h2 className="type-title text-[19px] leading-tight text-ink md:text-[20.35px]">{title}</h2>
      {href && (
        <Link href={href} className="group/more type-label inline-flex shrink-0 items-center gap-1.5 pb-0.5 text-ink">
          <span className="link-draw">{action}</span>
          <ArrowRight className="size-3 -translate-x-1 opacity-0 transition-[opacity,transform] duration-(--duration-hover) ease-(--ease-out-strong) group-hover/more:translate-x-0 group-hover/more:opacity-100" />
        </Link>
      )}
    </div>
  )
}

/** The larger serif head the reference uses for "Selected Stories" and "Featured Products". */
export function SerifHead({
  title,
  blurb,
  href,
  action = "View more",
  className,
}: {
  title: string
  blurb?: string
  href?: string
  action?: string
  className?: string
}) {
  return (
    <div className={cn("grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_auto] md:items-start md:gap-8", className)}>
      <h2 className="type-display text-h4 text-ink">{title}</h2>
      {blurb ? <p className="max-w-[44ch] font-serif text-[15px] leading-[1.5] text-ink-2">{blurb}</p> : <span />}
      {href && (
        <Link href={href} className="type-label link-draw justify-self-start pt-1 text-ink md:justify-self-end">
          {action}
        </Link>
      )}
    </div>
  )
}
