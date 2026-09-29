import { RibbonBadge } from "@/components/ui/badge"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { CheckIcon } from "@/components/ui/icon"
import { SectionHeading } from "@/components/ui/section-heading"
import { PLANS } from "@/content"

/** A bullet whose icon precedes its words, which is the order a transfer that
 *  puts the text back on the parent reverses. */
export function PlanFeature({ children }: { children: string }) {
  return (
    <li className="flex items-start gap-2.5 text-quartz-600">
      <span className="mt-0.5 text-indigo-600">
        <CheckIcon />
      </span>
      {children}
    </li>
  )
}

export function PlanCard({
  name,
  price,
  cadence,
  blurb,
  features,
  featured,
}: (typeof PLANS)[number]) {
  return (
    <div
      className={
        featured
          ? "plan-card relative rounded-2xl border-2 border-indigo-600 bg-white p-8 shadow-xl shadow-indigo-600/10"
          : "plan-card relative rounded-2xl border border-quartz-200 bg-white p-8"
      }
    >
      {featured && <RibbonBadge>Most popular</RibbonBadge>}
      <h3 className="text-sm font-medium tracking-widest text-quartz-400 uppercase">{name}</h3>
      <p className="mt-4 flex items-baseline gap-1.5">
        <span className="text-4xl font-semibold tracking-tight">{price}</span>
        <span className="text-sm text-quartz-400">{cadence}</span>
      </p>
      <p className="mt-3 text-sm text-quartz-600">{blurb}</p>
      <ul className="mt-6 space-y-3 text-sm">
        {features.map((feature) => (
          <PlanFeature key={feature}>{feature}</PlanFeature>
        ))}
      </ul>
      <ButtonLink
        href="#start"
        className="mt-8 w-full"
        variant={featured ? "primary" : "outline"}
      >
        {price === "Let's talk" ? "Contact sales" : "Start free"}
      </ButtonLink>
    </div>
  )
}

export function Pricing() {
  return (
    <section id="pricing" className="bg-quartz-50/60 py-24">
      <Container>
        <SectionHeading
          title="Priced per person, not per surprise"
          blurb="Every plan includes preview environments."
        />
        <div className="mt-16 grid items-start gap-6 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <PlanCard key={plan.name} {...plan} />
          ))}
        </div>
      </Container>
    </section>
  )
}
