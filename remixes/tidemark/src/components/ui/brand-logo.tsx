import { LOGOS, type LogoKey } from "@/content"
import { cn } from "@/lib/utils"

/**
 * A customer's logo, from SVGL, flattened to one ink so a row of them reads
 * as a set. `tone="light"` inverts it for the dark sections.
 */
export function BrandLogo({
  logo = "linear",
  tone = "dark",
  scale = 1,
  className,
}: {
  logo?: LogoKey
  tone?: "dark" | "light"
  scale?: number
  className?: string
}) {
  const entry = LOGOS[logo]
  const height = Math.round(entry.height * scale)
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-2 font-semibold tracking-[-0.02em]",
        tone === "light" ? "text-night-fg" : "text-ink",
        className,
      )}
      style={{ fontSize: Math.round(height * 0.95) }}
    >
      <img
        src={`${import.meta.env.BASE_URL}logos/${logo}.svg`}
        alt={entry.mark ? "" : entry.name}
        height={height}
        style={{ height }}
        className={cn("w-auto brightness-0", tone === "light" && "invert")}
        loading="lazy"
        draggable={false}
      />
      {entry.mark && <span>{entry.name}</span>}
    </span>
  )
}
