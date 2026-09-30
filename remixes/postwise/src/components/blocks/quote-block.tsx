import { motion, useReducedMotion } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { BrandLogo } from "@/components/ui/brand-logo"
import type { LogoKey } from "@/content"
import { avatar } from "@/lib/photos"
import { cn } from "@/lib/utils"

/**
 * A single large customer quote, with the speaker under a hairline that
 * draws itself in from the left when it comes into view.
 */
export function QuoteBlock({
  quote = "",
  name = "",
  role = "",
  photo = 6497112,
  logo = "linear",
  tone = "paper",
  className,
}: {
  quote?: string
  name?: string
  role?: string
  photo?: number
  logo?: LogoKey
  tone?: "paper" | "night"
  className?: string
}) {
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = reduced || designing
  const night = tone === "night"

  return (
    <figure className={cn("mx-auto w-full max-w-[640px]", className)}>
      <blockquote
        className={cn(
          "text-[clamp(22px,2.6vw,30px)] leading-[1.22] tracking-[-0.025em] text-pretty",
          night ? "text-night-fg" : "text-ink",
        )}
      >
        “{quote}”
      </blockquote>
      <motion.div
        aria-hidden
        className={cn(
          "mt-6 h-px w-full origin-left bg-gradient-to-r",
          night ? "from-night-muted/60 via-night-line to-transparent" : "from-ink-subtle/60 via-line-strong to-transparent",
        )}
        initial={still ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />
      <figcaption className="mt-4 flex items-center justify-between gap-4">
        <span className="flex items-center gap-3">
          <img
            src={avatar(photo)}
            alt={name}
            className="size-10 rounded-[var(--radius-chip)] object-cover"
            loading="lazy"
          />
          <span className="flex flex-col text-[14px] leading-tight">
            <span className={night ? "text-night-fg" : "text-ink"}>{name}</span>
            <span className={night ? "text-night-muted" : "text-ink-subtle"}>{role}</span>
          </span>
        </span>
        <BrandLogo logo={logo} tone={night ? "light" : "dark"} />
      </figcaption>
    </figure>
  )
}
