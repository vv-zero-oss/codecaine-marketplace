import { Check } from "lucide-react"

import { Prose, SplitSection } from "@/components/blocks/split-section"
import { ButtonLink } from "@/components/ui/button"
import { Chip } from "@/components/ui/chip"
import { Container } from "@/components/ui/container"
import { pricing } from "@/content"
import { cn } from "@/lib/utils"

type Plan = (typeof pricing.plans)[number]

/** Three plans in hairline columns, billed by the minute. */
export function Pricing() {
  return (
    <div id="pricing">
      <SplitSection id="pricing-intro" heading={pricing.heading} label={pricing.label} className="pb-14">
        <Prose>
          <p>{pricing.body}</p>
        </Prose>
      </SplitSection>
      <section aria-label="Plans" className="pb-[calc(var(--spacing-section)/2)]">
        <Container>
          <div className="grid border-t border-hairline md:grid-cols-3">
            {pricing.plans.map((plan) => (
              <PlanColumn key={plan.name} plan={plan} />
            ))}
          </div>
        </Container>
      </section>
    </div>
  )
}

export function PlanColumn({ plan }: { plan: Plan }) {
  return (
    <article
      className={cn(
        "flex flex-col border-b border-hairline py-9 md:border-b-0 md:px-8 md:first:pl-0 md:last:pr-0 md:[&+&]:border-l",
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-title text-ink">{plan.name}</h3>
        {plan.featured && <Chip tone="lime">Most teams</Chip>}
      </div>
      <p className="mt-2 text-small text-ink-soft">{plan.blurb}</p>
      <p className="mt-8 flex items-baseline gap-2">
        <span className="text-heading text-ink">{plan.price}</span>
        <span className="label text-mute">{plan.unit}</span>
      </p>
      <ul className="mt-8 space-y-3 text-small text-ink-soft">
        {plan.features.map((feature) => (
          <li key={feature} className="flex gap-3">
            <Check aria-hidden className="mt-1 size-3.5 shrink-0 text-cobalt" />
            {feature}
          </li>
        ))}
      </ul>
      <ButtonLink
        href="#start"
        variant={plan.featured ? "ink" : "paper"}
        size="sm"
        className="mt-10 self-start"
      >
        {plan.cta}
      </ButtonLink>
    </article>
  )
}
