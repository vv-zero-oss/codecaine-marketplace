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
        <p className="font-mono text-lg uppercase tracking-widest text-accent-hi">{`> ${kicker}`}</p>
      ) : null}
      <h2 className="mt-phi-1 text-balance text-4xl font-bold">
        {title}
      </h2>
      {blurb ? <p className="mt-phi-2 max-w-measure text-pretty text-base text-fg-muted sm:text-lg">{blurb}</p> : null}
    </div>
  )
}
