import { ArrowDown, ArrowRight } from "lucide-react"

import { Link } from "@/lib/router"
import { cn } from "@/lib/utils"

/** A text link with an arrow; the underline draws in from the left on hover. */
export function ArrowLink({
  label = "View",
  href = "/",
  direction = "right",
  className,
}: {
  label?: string
  href?: string
  direction?: "right" | "down"
  className?: string
}) {
  const Arrow = direction === "down" ? ArrowDown : ArrowRight
  const content = (
    <>
      <span className="relative">
        {label}
        <span
          aria-hidden
          className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-(--duration-base) ease-out group-hover/arrow:scale-x-100"
        />
      </span>
      <Arrow
        className={cn(
          "size-4 transition-transform duration-(--duration-base) ease-out",
          direction === "down" ? "group-hover/arrow:translate-y-0.5" : "group-hover/arrow:translate-x-0.5",
        )}
        strokeWidth={2}
      />
    </>
  )
  const classes = cn("group/arrow inline-flex items-center gap-2 text-sm font-medium", className)
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
