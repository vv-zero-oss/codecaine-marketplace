import { useCanvasAction } from "@canvas/react"
import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"

import { BracketButton } from "@/components/ui/bracket-button"
import { Container } from "@/components/ui/container"
import { SectionHead } from "@/components/ui/section-head"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { EASE_OUT_QUINT } from "@/lib/motion"
import { cn } from "@/lib/utils"

type Billing = "monthly" | "yearly"

const PLANS = [
  {
    name: "Sketch",
    monthly: 0,
    yearly: 0,
    note: "For trying it on one project",
    features: ["20 edits a month", "Relight, Sky and Grade", "Web-size export", "One seat"],
    cta: "Start free",
  },
  {
    name: "Studio",
    monthly: 29,
    yearly: 24,
    note: "Per seat, for a practice's own shoots",
    features: ["Unlimited edits", "All eight edits", "Full-resolution 16-bit export", "Set grading across a project", "Named to your drawing register"],
    cta: "Start a 14-day trial",
    featured: true,
  },
  {
    name: "Practice",
    monthly: 89,
    yearly: 74,
    note: "Five seats, shared library",
    features: ["Everything in Studio", "Shared reference grades", "Brand-locked colour", "Single sign-on", "Priority rendering"],
    cta: "Talk to us",
  },
]

/**
 * Three plans in ruled columns. The billing toggle retypes every price in
 * place; the middle plan is the one most practices pick, so it carries the
 * page's one solid button.
 */
export function Pricing() {
  const [billing, setBilling] = useState<Billing>("yearly")
  useCanvasAction("Yearly billing", (next) => setBilling((next ?? billing !== "yearly") ? "yearly" : "monthly"), {
    group: "Pricing",
    on: billing === "yearly",
  })

  return (
    <section id="pricing" className="scroll-mt-16 py-section" aria-labelledby="pricing-title">
      <Container>
        <SectionHead index="05" label="Pricing" aside="Prices in USD, before tax" />
        <div className="my-12 flex flex-wrap items-end justify-between gap-6">
          <h2 id="pricing-title" className="max-w-[18ch] text-[clamp(1.75rem,3.6vw,3.25rem)] leading-[1.05] font-extrabold tracking-[-0.04em]">
            Cheaper than one reshoot.
          </h2>
          <ToggleGroup type="single" value={billing} onValueChange={(v) => v && setBilling(v as Billing)} className="gap-5" aria-label="Billing">
            {(["monthly", "yearly"] as Billing[]).map((b) => (
              <ToggleGroupItem
                key={b}
                value={b}
                className="group/bill h-auto min-h-11 min-w-0 gap-[0.9em] rounded-none bg-transparent px-0 text-ui font-normal uppercase tracking-ui text-ink hover:bg-transparent hover:text-ink data-[state=on]:bg-transparent data-[state=on]:text-ink md:min-h-8"
              >
                <span className="font-light text-muted">[</span>
                <span className="decoration-1 underline-offset-[5px] group-hover/bill:underline group-data-[state=on]/bill:underline">
                  {b}
                  {b === "yearly" && <span className="ml-2 text-blueprint">−17%</span>}
                </span>
                <span className="font-light text-muted">]</span>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <div className="grid border-t border-hairline md:grid-cols-3">
          {PLANS.map((plan) => (
            <PlanColumn key={plan.name} plan={plan} billing={billing} />
          ))}
        </div>
      </Container>
    </section>
  )
}

function PlanColumn({ plan, billing }: { plan: (typeof PLANS)[number]; billing: Billing }) {
  const price = plan[billing]
  return (
    <article
      className={cn(
        "flex flex-col gap-8 border-b border-hairline py-8 md:border-b-0 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0",
        plan.featured && "md:bg-paper-2 md:first:pl-6",
      )}
    >
      <header className="flex items-baseline justify-between text-ui uppercase tracking-ui">
        <h3>{plan.name}</h3>
        {plan.featured && <span className="text-blueprint">Most picked</span>}
      </header>
      <div>
        <div className="flex items-baseline gap-2">
          <span className="relative inline-flex h-[0.9em] overflow-hidden text-[clamp(3.5rem,6vw,5.5rem)] leading-[0.9] font-extrabold tracking-[-0.06em] tabular-nums">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.span
                key={price}
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.45, ease: EASE_OUT_QUINT }}
              >
                ${price}
              </motion.span>
            </AnimatePresence>
          </span>
          <span className="text-ui uppercase tracking-ui text-muted">/ month</span>
        </div>
        <p className="mt-3 text-body text-muted">{plan.note}</p>
      </div>
      <ul className="flex flex-col gap-2 text-body">
        {plan.features.map((f) => (
          <li key={f} className="flex gap-3">
            <span className="text-muted">—</span>
            {f}
          </li>
        ))}
      </ul>
      <div className="mt-auto">
        <BracketButton solid={plan.featured}>{plan.cta}</BracketButton>
      </div>
    </article>
  )
}
