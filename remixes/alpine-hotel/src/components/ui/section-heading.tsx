import { cn } from "@/lib/utils"

/** A centred section title with its lede — the page's one heading pattern. */
export function SectionHeading({
  title,
  lede,
  eyebrow,
  align = "center",
  tone = "ink",
  className,
}: {
  title: string
  lede?: string
  eyebrow?: string
  align?: "center" | "left"
  tone?: "ink" | "snow"
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        tone === "snow" ? "text-snow" : "text-ink",
        className,
      )}
    >
      {eyebrow && (
        <p className={cn("text-[13px] font-medium", tone === "snow" ? "text-snow/70" : "text-rust")}>{eyebrow}</p>
      )}
      <h2 className="font-headline max-w-[16ch] text-title text-balance">{title}</h2>
      {lede && (
        <p className={cn("max-w-[44ch] text-base leading-snug text-pretty sm:text-lg", tone === "snow" ? "text-snow/80" : "text-ink-soft")}>
          {lede}
        </p>
      )}
    </div>
  )
}
