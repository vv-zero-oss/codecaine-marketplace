import { cn } from "@/lib/utils"

/** A section's title and the line under it. Every section opens with one, so
 *  the scale lives here and nowhere else. */
export function SectionHeading({
  title,
  description,
  align = "left",
  tone = "dark",
  className,
}: {
  title: string
  description?: string
  align?: "left" | "center"
  tone?: "dark" | "light"
  className?: string
}) {
  return (
    <div className={cn("flex flex-col gap-3", align === "center" && "items-center text-center", className)}>
      <h2
        className={cn(
          "font-display text-[clamp(28px,4.4vw,38px)] leading-[1.08] font-semibold tracking-[-0.035em] text-balance",
          tone === "light" ? "text-white" : "text-ink-900",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className={cn("max-w-[640px] text-[15px] leading-relaxed text-pretty", tone === "light" ? "text-white/85" : "text-ink-500")}>
          {description}
        </p>
      ) : null}
    </div>
  )
}
