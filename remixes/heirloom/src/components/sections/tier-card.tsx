import { BorderBeam } from "border-beam"
import { Check } from "lucide-react"

import { ButtonLink } from "@/components/ui/button"
import { Tag } from "@/components/ui/tag"
import { cn } from "@/lib/utils"

/** A membership tier. The featured one is raised and carries the page's one
 *  border beam; `beam={false}` turns it off. */
export function TierCard({
  name,
  price,
  period,
  note,
  features,
  featured = false,
  beam = true,
}: {
  name: string
  price: string
  period: string
  note: string
  features: string[]
  featured?: boolean
  beam?: boolean
}) {
  const card = (
    <article
      className={cn(
        "flex h-full flex-col rounded-card border p-6 sm:p-7",
        featured ? "border-line-strong bg-surface-raised shadow-card" : "border-line bg-surface",
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium tracking-[-0.02em]">{name}</h3>
        {featured && <Tag>Most chosen</Tag>}
      </div>
      <p className="mt-6 flex items-baseline gap-1.5">
        <span className="text-[2.5rem] leading-none font-light tracking-[-0.04em] tabular-nums">{price}</span>
        {period && <span className="text-[13px] text-fg-subtle">{period}</span>}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-fg-muted">{note}</p>
      <ul className="mt-6 space-y-2.5 border-t border-line pt-6">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-[13px] text-fg/85">
            <Check aria-hidden className="mt-0.5 size-3.5 shrink-0 text-fg-muted" />
            {f}
          </li>
        ))}
      </ul>
      <ButtonLink href="/contact" variant={featured ? "solid" : "glass"} size="sm" className="mt-8 self-start">
        {price.startsWith("$") ? `Apply for ${name}` : "Request an invitation"}
      </ButtonLink>
    </article>
  )
  if (!featured || !beam) return card
  return (
    <BorderBeam size="md" colorVariant="mono" theme="dark" strength={0.6} borderRadius={10} className="h-full">
      {card}
    </BorderBeam>
  )
}
