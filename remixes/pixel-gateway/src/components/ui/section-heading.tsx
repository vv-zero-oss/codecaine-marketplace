import { cn } from "@/lib/utils"

/** The kicker, title and blurb every inner section opens with. */
export function SectionHeading({
  kicker,
  title,
  blurb,
  align = "left",
  className,
}: {
  kicker?: string
  title: string
  blurb?: string
  align?: "left" | "center"
  className?: string
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {kicker ? (
        <p className="font-mono text-xl uppercase tracking-widest text-accent-hi">{`> ${kicker}`}</p>
      ) : null}
      <h2 className="mt-2 text-balance text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[0.95] tracking-tight">
        {title}
      </h2>
      {blurb ? <p className="mt-4 max-w-2xl text-pretty text-lg text-fg-muted sm:text-xl">{blurb}</p> : null}
    </div>
  )
}
