import { cn } from "@/lib/utils"

/** The centred title and one soft line under it that opens a section. */
export function SectionHeading({
  title,
  blurb,
  className,
  tone = "light",
}: {
  title: string
  blurb?: string
  className?: string
  tone?: "light" | "dark"
}) {
  return (
    <div className={cn("mx-auto max-w-2xl text-center", className)}>
      <h2
        className={cn(
          "text-[clamp(2rem,5vw,3.5rem)] leading-[1.02] font-extrabold tracking-[-0.03em] text-balance",
          tone === "dark" ? "text-white" : "text-ink-900",
        )}
      >
        {title}
      </h2>
      {blurb ? (
        <p className={cn("mt-4 text-base sm:text-lg", tone === "dark" ? "text-white/70" : "text-ink-600")}>{blurb}</p>
      ) : null}
    </div>
  )
}
