import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Check, Laptop } from "lucide-react"
import { BorderBeam } from "border-beam"
import { useCanvasAction } from "@canvas/react"

import { Reveal } from "@/components/motion/reveal"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PRICING, type Plan } from "@/content"
import { cn } from "@/lib/utils"

type Billing = "monthly" | "yearly"

/** The price, which rolls to its new value when the billing period changes. */
function Price({ plan, billing }: { plan: Plan; billing: Billing }) {
  const reduced = useReducedMotion()
  const value = billing === "yearly" ? plan.yearly : plan.monthly
  const text = plan.label ?? `$${value}`
  return (
    <p className="flex items-baseline gap-2">
      <span className="relative inline-flex overflow-hidden text-[clamp(44px,4.2vw,58px)] leading-[1.1] font-semibold tracking-[-0.04em] text-ink">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={text}
            initial={reduced ? false : { y: "60%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduced ? undefined : { y: "-60%", opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {text}
          </motion.span>
        </AnimatePresence>
      </span>
      {plan.unit && <span className="text-[18px] text-ink-subtle">{plan.unit}</span>}
    </p>
  )
}

/**
 * One plan: name, price, a hairline, what's included and the button. The
 * featured plan carries a sea-glass wash rising from its foot.
 */
export function PlanCard({ plan, billing = "monthly" }: { plan: Plan; billing?: Billing }) {
  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-[24px] border border-line bg-card p-7 md:p-10">
      {plan.featured && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(180deg,transparent_38%,#000_92%)]"
          style={{
            backgroundImage:
              "radial-gradient(60% 45% at 8% 100%, var(--color-teal), transparent 70%), radial-gradient(55% 50% at 55% 100%, var(--color-mint), transparent 70%), radial-gradient(55% 55% at 100% 90%, var(--color-apricot), transparent 70%), radial-gradient(40% 35% at 85% 60%, var(--color-peach), transparent 70%)",
          }}
        />
      )}
      <div className="relative flex flex-1 flex-col">
        <h3 className="text-[22px] tracking-[-0.01em] text-ink md:text-[26px]">{plan.name}</h3>
        <div className="mt-2">
          <Price plan={plan} billing={billing} />
        </div>
        <span className="my-6 block h-px bg-line md:my-7" />
        <p className="text-[16px] font-medium text-ink-subtle md:text-[17px]">{plan.lead}</p>
        <ul className="mt-4 flex flex-col gap-2.5">
          {plan.features.map((feature) => (
            <li key={feature} className="flex gap-2.5 text-[16px] leading-snug text-ink md:text-[17px]">
              <Check className="mt-0.5 size-4 shrink-0" strokeWidth={2.2} />
              {feature}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap gap-3 pt-10">
          <ButtonLink href="#cta" className="h-12 rounded-[8px] px-5 text-[16px]">
            {plan.secondary && <Laptop className="size-4" />}
            {plan.cta}
          </ButtonLink>
          {plan.secondary && (
            <ButtonLink href="#cta" variant="outline" className="h-12 rounded-[8px] px-5 text-[16px]">
              {plan.secondary}
            </ButtonLink>
          )}
        </div>
      </div>
    </article>
  )
}

/**
 * Pricing: a mono monthly/yearly switch, then individual plans in three and
 * team plans in two. The featured plan wears a slow border beam — the one
 * on the page. "Yearly billing" is an action in the editor.
 */
export function Pricing({ start = "monthly" }: { start?: Billing }) {
  const [billing, setBilling] = useState<Billing>(start)
  useCanvasAction("Yearly billing", (next) => setBilling((next ?? billing === "monthly") ? "yearly" : "monthly"), {
    on: billing === "yearly",
    group: "Pricing",
  })

  const card = (plan: Plan) =>
    plan.featured ? (
      <BorderBeam size="md" colorVariant="forest" theme="light" strength={0.6} duration={9} borderRadius={24} className="h-full">
        <PlanCard plan={plan} billing={billing} />
      </BorderBeam>
    ) : (
      <PlanCard plan={plan} billing={billing} />
    )

  return (
    <section id="pricing" className="py-section">
      <Container className="max-w-[1240px]">
        <Reveal>
          <h2 className="text-[clamp(40px,4.6vw,60px)] leading-none font-semibold tracking-[-0.04em] text-ink">{PRICING.title}</h2>
          <p className="mt-4 text-[clamp(18px,1.8vw,24px)] text-ink-muted">{PRICING.body}</p>
        </Reveal>

        <div className="mt-10 flex justify-center">
          <Tabs value={billing} onValueChange={(v) => setBilling(v as Billing)}>
            <TabsList className="h-auto gap-0 rounded-[6px] border border-line-strong bg-paper-deep/60 p-0.5 group-data-[orientation=horizontal]/tabs:h-auto">
              {(["monthly", "yearly"] as const).map((key) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className={cn(
                    "h-9 rounded-[4px] border-0 px-3.5 font-mono text-[12.5px] font-normal tracking-[0.06em] text-ink-subtle uppercase sm:px-4 sm:text-[13px]",
                    "data-[state=active]:bg-card data-[state=active]:text-ink data-[state=active]:shadow-(--shadow-field)",
                  )}
                >
                  {key === "monthly" ? PRICING.monthly : PRICING.yearly}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <h3 className="mt-10 text-[clamp(22px,2vw,28px)] font-semibold tracking-[-0.02em] text-ink">{PRICING.individual}</h3>
        <div className="mt-6 grid gap-6 lg:grid-cols-3 lg:gap-8">
          {PRICING.individualPlans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.06} className="h-full">
              {card(plan)}
            </Reveal>
          ))}
        </div>

        <h3 className="mt-16 text-[clamp(22px,2vw,28px)] font-semibold tracking-[-0.02em] text-ink">{PRICING.team}</h3>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:gap-8">
          {PRICING.teamPlans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.06} className="h-full">
              {card(plan)}
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
