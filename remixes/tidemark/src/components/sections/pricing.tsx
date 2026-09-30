import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Check } from "lucide-react"
import { BorderBeam } from "border-beam"
import { useCanvasAction } from "@canvas/react"

import { SectionHeading } from "@/components/blocks/section-heading"
import { Reveal } from "@/components/motion/reveal"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PRICING, type Plan } from "@/content"
import { cn } from "@/lib/utils"

type Billing = "monthly" | "yearly"

/** The price, rolling to its new value when the billing period changes. */
function Price({ plan, billing, night }: { plan: Plan; billing: Billing; night: boolean }) {
  const reduced = useReducedMotion()
  const value = billing === "yearly" ? plan.yearly : plan.monthly
  const text = plan.label ?? `$${value}`
  return (
    <p className="flex items-baseline gap-2">
      <span className="type-display relative inline-flex overflow-hidden text-[56px] leading-[1]">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={text}
            initial={reduced ? false : { y: "55%", opacity: 0, filter: "blur(2px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={reduced ? undefined : { y: "-55%", opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
          >
            {text}
          </motion.span>
        </AnimatePresence>
      </span>
      {!plan.label && <span className="text-[15px] opacity-70">/month</span>}
    </p>
  )
}

/** One plan; the featured one is set in coral. */
export function PlanCard({ plan, billing = "monthly" }: { plan: Plan; billing?: Billing }) {
  const night = !!plan.featured
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-[var(--radius-panel)] p-7 md:p-8",
        night ? "bg-coral text-ink" : "bg-card text-ink shadow-(--shadow-card)",
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="type-caps text-[18px]">{plan.name}</h3>
        {night && <span className="type-eyebrow bg-ink px-2.5 py-1 text-coral">Most chosen</span>}
      </div>
      <p className={cn("mt-2 text-[14.5px]", night ? "text-ink/75" : "text-ink-muted")}>{plan.blurb}</p>
      <div className="mt-6">
        <Price plan={plan} billing={billing} night={night} />
      </div>
      <ul className={cn("mt-6 mb-auto flex flex-col gap-3 border-t pt-6", night ? "border-ink/25" : "border-line")}>
        {plan.features.map((f) => (
          <li key={f} className="flex gap-2.5 text-[15px] leading-snug">
            <Check className={cn("mt-0.5 size-4 shrink-0", night ? "text-ink" : "text-coral")} strokeWidth={2.4} />
            {f}
          </li>
        ))}
      </ul>
      <ButtonLink href="#start" variant={night ? "default" : "outline"} className="mt-8 w-full">
        {plan.cta}
      </ButtonLink>
    </article>
  )
}

/**
 * Pricing: a monthly/yearly switch and three plans. The featured plan wears
 * a slow border beam — the one on the page. "Yearly billing" is an action.
 */
export function Pricing({ start = "monthly" }: { start?: Billing }) {
  const [billing, setBilling] = useState<Billing>(start)
  useCanvasAction("Yearly billing", (next) => setBilling((next ?? billing === "monthly") ? "yearly" : "monthly"), { on: billing === "yearly", group: "Pricing" })

  return (
    <section id="pricing" className="py-section">
      <Container>
        <Reveal className="flex flex-col items-center gap-8 text-center">
          <SectionHeading align="center" eyebrow={PRICING.eyebrow} title={PRICING.title} body={PRICING.body} />
          <Tabs value={billing} onValueChange={(v) => setBilling(v as Billing)}>
            <TabsList className="h-auto rounded-none border border-ink bg-transparent p-0 group-data-[orientation=horizontal]/tabs:h-auto">
              {(["monthly", "yearly"] as const).map((key) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="type-caps h-10 rounded-none border-0 px-3 text-[11px] text-ink sm:px-5 sm:text-[12px] data-[state=active]:bg-ink data-[state=active]:text-pink data-[state=active]:shadow-none"
                >
                  {key === "monthly" ? PRICING.monthly : PRICING.yearly}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </Reveal>
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {PRICING.plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.06} className="h-full">
              {plan.featured ? (
                <BorderBeam size="md" colorVariant="sunset" theme="light" strength={0.7} duration={10} borderRadius={0} className="h-full">
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
