import { cn } from "@/lib/utils"

/** The centred title-and-blurb every second section on the page opens with. */
export function SectionHeading({
  title,
  blurb,
  className,
}: {
  title: string
  blurb?: string
  className?: string
}) {
  return (
    <div className={cn("mx-auto max-w-2xl text-center", className)}>
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      {blurb ? <p className="mt-4 text-quartz-600">{blurb}</p> : null}
    </div>
  )
}
