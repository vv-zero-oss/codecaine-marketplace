import type { ReactNode } from "react"

import { Doodle, type DoodleName } from "@/components/mock/doodles"
import { cn } from "@/lib/utils"

/**
 * The shop's section title: a condensed serif line where one phrase is
 * picked out in a brand colour, a hand-drawn doodle leaning on its last
 * word, an optional mono kicker above, and room on the right for arrows
 * or a link.
 */
export function SectionHeading({
  kicker,
  before = "Rep the",
  highlight = "house band",
  after = "",
  tone = "ember",
  doodle = "record",
  size = "h2",
  actions,
  className,
}: {
  kicker?: string
  before?: string
  highlight?: string
  after?: string
  tone?: "ember" | "rust" | "sky" | "honey" | "moss"
  doodle?: DoodleName | "none"
  size?: "h2" | "h1"
  actions?: ReactNode
  className?: string
}) {
  const color = { ember: "text-ember", rust: "text-rust", sky: "text-sky-display", honey: "text-honey", moss: "text-moss" }[tone]
  return (
    <div className={cn("flex flex-wrap items-end justify-between gap-x-8 gap-y-4", className)}>
      <div>
        {kicker && <p className="type-label mb-3 text-[11.5px] text-ink-3">{kicker}</p>}
        <h2 className={cn("type-display text-balance", size === "h1" ? "text-h1" : "text-h2")}>
          {before} <span className={color}>{highlight}</span>
          {after}
          {doodle !== "none" && <Doodle name={doodle} className="ml-[0.15em] inline-block w-[1.2em] align-[-0.08em] text-ink" />}
        </h2>
      </div>
      {actions}
    </div>
  )
}
