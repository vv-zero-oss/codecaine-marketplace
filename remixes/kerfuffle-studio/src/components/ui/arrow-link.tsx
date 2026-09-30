import { ArrowDown, ArrowRight } from "lucide-react"

import { Link } from "@/lib/router"
import { cn } from "@/lib/utils"

/**
 * A text link with a round arrow: the underline wipes in from the left on
 * hover (or stays when `underlined`), and the arrow nudges the way it points.
 */
export function ArrowLink({
  label = "Take a look",
  href = "/",
  direction = "right",
  underlined = false,
  tone = "ink",
  className,
}: {
  label?: string
  href?: string
  direction?: "right" | "down"
  underlined?: boolean
  tone?: "ink" | "snow"
  className?: string
}) {
  const Arrow = direction === "down" ? ArrowDown : ArrowRight
  const content = (
    <>
      <span className="relative pb-1">
        {label}
        <span
          aria-hidden
          className={cn(
            "absolute inset-x-0 bottom-0 h-[2px] origin-left bg-current transition-transform duration-(--duration-slow) ease-out group-hover/arrow:scale-x-100",
            underlined ? "scale-x-100" : "scale-x-0",
          )}
        />
      </span>
      <span
        className={cn(
          "flex size-9 items-center justify-center rounded-full border transition-[transform,background-color,color] duration-(--duration-base) ease-out",
          tone === "snow"
            ? "border-snow/40 group-hover/arrow:bg-lime group-hover/arrow:text-ink"
            : "border-ink/25 group-hover/arrow:bg-flame group-hover/arrow:text-snow group-hover/arrow:border-flame",
          direction === "down" ? "group-hover/arrow:translate-y-0.5" : "group-hover/arrow:translate-x-1",
        )}
      >
        <Arrow className="size-4" strokeWidth={2.25} />
      </span>
    </>
  )
  const classes = cn(
    "group/arrow inline-flex items-center gap-3 label text-sm",
    tone === "snow" ? "text-snow" : "text-ink",
    className,
  )
  return href.startsWith("/") && !href.startsWith("/#") ? (
    <Link href={href} className={classes}>
      {content}
    </Link>
  ) : (
    <a href={href.replace(/^\//, "")} className={classes}>
      {content}
    </a>
  )
}
