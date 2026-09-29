import { ArrowRight } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { newsletterPill } from "@/content"
import { cn } from "@/lib/utils"

/**
 * The dark pill that rides the top of the page and leads to the sign-up.
 *
 * It narrows by 30px a side once the page scrolls (306 → 246px, over 370ms,
 * decelerating). The width is not animated: the
 * fill is a separate layer whose `clip-path` closes in, and the label and the
 * arrow slide in with it — clip-path and transform, never layout. Over a dark
 * section it turns cream, so it never disappears into the page.
 */
export function NewsletterPill({ compact, tone }: { compact: boolean; tone: "light" | "dark" }) {
  const dark = tone === "dark"
  const inset = compact ? "var(--pill-inset)" : "0px"
  return (
    <a
      href={newsletterPill.href}
      className="group relative flex h-11 w-[var(--pill-width)] items-center justify-between rounded-pill [--pill-inset:12px] [--pill-width:212px] focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none sm:[--pill-inset:30px] sm:[--pill-width:306px]"
    >
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 rounded-pill transition-[clip-path,background-color] duration-(--duration-pill) ease-out-strong",
          dark ? "bg-cream" : "bg-pill",
        )}
        style={{ clipPath: `inset(0 ${inset} round 9999px)` }}
      />
      <span
        className={cn(
          "relative pl-4 text-[11.5px] transition-[transform,color] duration-(--duration-pill) ease-out-strong",
          dark ? "text-ink-soft" : "text-cream-muted",
        )}
        style={{ transform: `translateX(${inset})` }}
      >
        {newsletterPill.label}
      </span>
      <span
        aria-hidden
        className={cn(
          buttonVariants({ variant: dark ? "default" : "cream", size: "icon-sm" }),
          "relative mr-1.5 transition-[transform,background-color,color] duration-(--duration-pill) ease-out-strong",
        )}
        style={{ transform: `translateX(calc(-1 * ${inset}))` }}
      >
        <ArrowRight className="size-3.5 transition-transform duration-(--duration-press) ease-out-strong [@media(hover:hover)]:group-hover:translate-x-0.5" />
      </span>
    </a>
  )
}
