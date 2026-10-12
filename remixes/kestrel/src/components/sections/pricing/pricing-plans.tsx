import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { BorderBeam } from "border-beam"
import { ArrowRight, Check } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { Reveal } from "@/components/motion/reveal"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { PLANS, type Plan } from "@/content/pricing"
import { cn } from "@/lib/utils"

type Billing = "monthly" | "annual"

/** Monthly or annual, as a segmented control whose pill slides between the two. */
export function BillingToggle({ value, onChange }: { value: Billing; onChange: (next: Billing) => void }) {
  const reduced = useReducedMotion()
  return (
    <div role="radiogroup" aria-label="Billing period" className="inline-flex rounded-full bg-panel p-1 shadow-(--shadow-hairline)">
      {(["monthly", "annual"] as const).map((b) => (
        <button
          key={b}
          type="button"
          role="radio"
          aria-checked={value === b}
          onClick={() => onChange(b)}
          className={cn("relative inline-flex min-h-10 items-center gap-2 rounded-full px-4 text-[15px] transition-colors duration-(--duration-hover)", value === b ? "text-ink" : "text-ink-3 hover:text-ink")}
        >
          {value === b && (
            <motion.span
              layoutId="billing-pill"
              className="absolute inset-0 rounded-full bg-raised shadow-(--shadow-card)"
              transition={reduced ? { duration: 0 } : { type: "spring", duration: 0.35, bounce: 0.15 }}
            />
          )}
          <span className="relative">{b === "monthly" ? "Monthly" : "Annual"}</span>
          {b === "annual" && <span className="relative rounded-full bg-lime px-1.5 py-0.5 text-[11.5px] font-medium text-lime-ink">−20%</span>}
        </button>
      ))}
    </div>
  )
}

/** A price that rolls to its new value: the old figure lifts away, the new one rises in. */
export function PriceNumber({ value, className }: { value: number; className?: string }) {
  const reduced = useReducedMotion()
  return (
    <span className={cn("relative inline-flex overflow-hidden tabular-nums", className)}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={reduced ? { opacity: 0 } : { opacity: 0, transform: "translateY(60%)", filter: "blur(4px)" }}
          animate={{ opacity: 1, transform: "translateY(0%)", filter: "blur(0px)" }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, transform: "translateY(-60%)", filter: "blur(4px)" }}
          transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
        >
          ${value}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function PlanCard({ plan, billing }: { plan: Plan; billing: Billing }) {
  const price = billing === "annual" ? plan.annual : plan.monthly
  return (
    <div className={cn("flex h-full flex-col rounded-(--radius-card) p-6 sm:p-7", plan.featured ? "bg-raised shadow-(--shadow-float)" : "bg-panel")}>
      <div className="flex items-center justify-between">
        <h3 className="text-h4 type-head">{plan.name}</h3>
        {plan.featured && <span className="rounded-full bg-lime px-2 py-0.5 text-[12px] font-medium text-lime-ink">Most teams</span>}
      </div>
      <p className="mt-2 min-h-[48px] text-[15px] text-ink-2">{plan.pitch}</p>
      <div className="mt-6 flex items-end gap-2">
        {price === null ? (
          <span className="text-h2 type-head">Custom</span>
        ) : (
          <PriceNumber value={price} className="text-h1 type-head" />
        )}
        <span className="pb-1.5 text-[14px] leading-tight text-ink-3">
          {plan.unit}
          {price !== null && price > 0 && billing === "annual" && <span className="block">billed yearly</span>}
        </span>
      </div>
      <ButtonLink href={plan.ctaHref} variant={plan.featured ? "lime" : plan.id === "enterprise" ? "ink" : "outline"} size="lg" className="mt-6 w-full">
        {plan.cta} <ArrowRight />
      </ButtonLink>
      <p className="mt-8 text-[14px] font-medium">{plan.lead}</p>
      <ul className="mt-3 flex flex-col gap-2.5">
        {plan.features.map((f) => (
          <li key={f} className="flex gap-2.5 text-[15px] text-ink-2">
            <Check className={cn("mt-1 size-4 shrink-0", plan.featured ? "text-ink" : "text-ink-3")} strokeWidth={2.2} />
            {f}
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * The pricing page's opening: the promise, the billing switch and the three
 * plans — Grow carries the border beam, because it's the one most teams
 * pick.
 */
export function PricingPlans() {
  const [billing, setBilling] = useState<Billing>("annual")
  const reduced = useReducedMotion()
  useCanvasAction("Pricing: annual", (next) => setBilling((next ?? billing !== "annual") ? "annual" : "monthly"), { on: billing === "annual", group: "Pricing" })

  return (
    <section className="relative pt-16 pb-16 sm:pt-24">
      <div aria-hidden className="dot-grid absolute inset-x-0 top-0 h-[420px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <Container className="relative">
        <Reveal className="flex flex-col items-center text-center">
          <p className="type-eyebrow text-ink-2">Pricing</p>
          <h1 className="type-head text-display mt-5 text-balance">
            Free to start.
            <br />
            <span className="text-ink-soft">Honest after.</span>
          </h1>
          <p className="text-lead mt-5 max-w-[44ch] text-ink-2">
            Cards and expenses cost nothing, for every seat, for good. Pay only when you want the controls a bigger team needs.
          </p>
          <div className="mt-8">
            <BillingToggle value={billing} onChange={setBilling} />
          </div>
        </Reveal>
        <div className="mt-12 grid items-stretch gap-4 lg:grid-cols-3">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 0.06} className="h-full">
              {plan.featured ? (
                <BorderBeam size="md" colorVariant="mono" strength={0.6} theme="light" borderRadius={12} active={!reduced} className="h-full rounded-(--radius-card)">
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
