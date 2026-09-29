import { useState } from "react"
import { Check } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useCanvasAction } from "@canvas/react"

import { Reveal } from "@/components/motion/reveal"
import { BorderBeam } from "@/components/ui/border-beam"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PRICING } from "@/content"
import { curve } from "@/lib/motion"
import { cn } from "@/lib/utils"

type Billing = "monthly" | "yearly"
type Plan = (typeof PRICING.plans)[number]

/** The price, rolling to its new value when billing changes. */
function Price({ value }: { value: number | null }) {
  const text = value === null ? "Custom" : `$${value}`
  return (
    <span className="relative inline-flex h-[1.1em] overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={text}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={curve("out", 0.35)}
        >
          {text}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

/** One plan: name, who it is for, price, the way in, and what it includes. */
export function PlanCard({ plan, billing }: { plan: Plan; billing: Billing }) {
  const featured = "featured" in plan && plan.featured
  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-[var(--radius-card)] border p-6 md:p-8",
        featured ? "border-line-button bg-raised shadow-(--shadow-card)" : "border-line-strong bg-panel/60",
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-[22px] tracking-[-0.02em] text-fg">{plan.name}</h3>
        {featured && <span className="type-eyebrow rounded-[var(--radius-chip)] bg-void px-2 py-1 text-[11px] text-blush">Most teams</span>}
      </div>
      <p className="mt-2 text-[15px] text-muted">{plan.blurb}</p>
      <p className="type-heading mt-8 text-[52px] text-fg">
        <Price value={billing === "yearly" ? plan.yearly : plan.monthly} />
      </p>
      <p className="mt-1 text-[14px] text-subtle">{plan.unit}</p>
      <ButtonLink href="#cta" variant={featured ? "default" : "outline"} className="mt-8 w-full">
        {plan.cta}
      </ButtonLink>
      <ul className="mt-8 flex flex-col gap-3 border-t border-line pt-6">
        {plan.features.map((f) => (
          <li key={f} className="flex gap-3 text-[15px] text-fg-soft">
            <Check className="mt-0.5 size-4 shrink-0 text-teal" />
            {f}
          </li>
        ))}
      </ul>
    </div>
  )
}

/** What it costs: three plans, a monthly/yearly switch, the middle plan in a beam. */
export function Pricing() {
  const [billing, setBilling] = useState<Billing>("yearly")
  useCanvasAction("Yearly billing", (next) => setBilling((next ?? billing !== "yearly") ? "yearly" : "monthly"), {
    on: billing === "yearly",
    group: "Pricing",
  })

  return (
    <section id="pricing" className="pb-[var(--spacing-section)]">
      <Container>
        <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionHeading size="lg">{PRICING.title}</SectionHeading>
            <p className="mt-5 max-w-[44ch] text-[17px] leading-[1.55] text-muted md:text-[20px]">{PRICING.body}</p>
          </div>
          <Tabs value={billing} onValueChange={(v) => setBilling(v as Billing)}>
            <TabsList className="!h-12 rounded-full border border-line-strong bg-panel p-1">
              {(["monthly", "yearly"] as const).map((b) => (
                <TabsTrigger
                  key={b}
                  value={b}
                  className="!h-10 rounded-full border-0 px-5 text-[15px] font-normal text-muted capitalize data-[state=active]:bg-cream data-[state=active]:text-ink dark:data-[state=active]:border-0 dark:data-[state=active]:bg-cream dark:data-[state=active]:text-ink"
                >
                  {b}
                  {b === "yearly" && <span className="ml-1.5 text-[12px] opacity-70">−17%</span>}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </Reveal>

        <div className="mt-14 grid gap-5 md:mt-16 lg:grid-cols-3">
          {PRICING.plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.08}>
              {"featured" in plan && plan.featured ? (
                <BorderBeam size="md" colorVariant="colorful" strength={0.55} duration={9} className="h-full rounded-[var(--radius-card)]">
                  <PlanCard plan={plan} billing={billing} />
                </BorderBeam>
              ) : (
                <PlanCard plan={plan} billing={billing} />
              )}
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
