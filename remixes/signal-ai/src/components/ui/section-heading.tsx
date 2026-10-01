import { cn } from "@/lib/utils"

/** A serif title with an optional line under it. */
export function SectionHeading({
  title,
  sub,
  align = "center",
  className,
}: {
  title: string
  sub?: string
  align?: "center" | "left"
  className?: string
}) {
  return (
    <div className={cn(align === "center" ? "mx-auto text-center" : "text-left", "max-w-2xl", className)}>
      <h2 className="font-serif text-[clamp(2.2rem,4.6vw,3.2rem)] leading-[0.95] font-normal tracking-[-0.02em] text-balance">{title}</h2>
      {sub ? <p className="mt-4 text-[14px] leading-relaxed text-ink-2">{sub}</p> : null}
    </div>
  )
}
