import { Check } from "lucide-react"

import { ButtonLink } from "@/components/ui/button"

/** One way to get started: what you get, then one button. */
export function PlanCard({
  title,
  blurb,
  features,
  cta,
  primary = false,
}: {
  title: string
  blurb: string
  features: string[]
  cta: string
  primary?: boolean
}) {
  return (
    <article className="flex flex-col rounded-panel bg-surface p-6 shadow-card sm:p-8">
      <h3 className="text-[19px] font-normal tracking-[-0.03em]">{title}</h3>
      <p className="mt-2 text-[14px] text-ink-2">{blurb}</p>
      <ul className="mt-8 flex flex-1 flex-col gap-3 text-[13px]">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-3">
            <Check className="size-3.5 text-ink-3" />
            {f}
          </li>
        ))}
      </ul>
      <ButtonLink href="#start" variant={primary ? "default" : "outline"} size="lg" className="mt-10 w-full">
        {cta}
      </ButtonLink>
    </article>
  )
}
