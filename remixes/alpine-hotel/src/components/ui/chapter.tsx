import { cn } from "@/lib/utils"

/**
 * A section's heading, set like a chapter in a printed guide: a numbered
 * label on a rule, the title in the serif, an optional lede beside it.
 */
export function Chapter({
  number,
  label,
  title,
  lede,
  tone = "ink",
  className,
}: {
  number: string
  label: string
  title: string
  lede?: string
  tone?: "ink" | "light"
  className?: string
}) {
  const light = tone === "light"
  return (
    <header className={cn("grid gap-6 md:grid-cols-12 md:gap-8", className)}>
      <div className={cn("flex items-center gap-3 border-t pt-3 md:col-span-12", light ? "border-pine-ink/30" : "border-ink")}>
        <span className={cn("label", light ? "text-pine-ink" : "text-ink")}>No. {number}</span>
        <span className={cn("label", light ? "text-pine-ink/60" : "text-ink-faint")}>{label}</span>
      </div>
      <h2
        className={cn(
          "font-serif text-display font-normal tracking-[-0.02em] text-balance md:col-span-7",
          light ? "text-pine-ink" : "text-ink",
        )}
      >
        {title}
      </h2>
      {lede && (
        <p className={cn("self-end text-base leading-relaxed text-pretty md:col-span-4 md:col-start-9", light ? "text-pine-ink/75" : "text-ink-soft")}>
          {lede}
        </p>
      )}
    </header>
  )
}
