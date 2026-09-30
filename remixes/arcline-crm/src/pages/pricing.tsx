import { useState } from "react"
import { Check, Minus } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useCanvasAction } from "@canvas/react"

import { Reveal } from "@/components/motion/reveal"
import { BorderBeam } from "@/components/ui/border-beam"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Heading } from "@/components/ui/heading"
import { LogoWall } from "@/components/ui/logo-wall"
import { Section } from "@/components/ui/section"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { LOGOS } from "@/content/home"
import { PRICING } from "@/content/pages"
import { EASE } from "@/lib/motion"
import { cn } from "@/lib/utils"

type Billing = "monthly" | "annual"
type Plan = (typeof PRICING.plans)[number]

/** Monthly / Annual: a sliding thumb on a sunken track. */
export function BillingToggle({ value, onChange }: { value: Billing; onChange: (b: Billing) => void }) {
  return (
    <div role="radiogroup" aria-label="Billing period" className="relative inline-flex rounded-card bg-surface p-0.5 shadow-hairline">
      {(["monthly", "annual"] as const).map((b) => (
        <button
          key={b}
          type="button"
          role="radio"
          aria-checked={value === b}
          onClick={() => onChange(b)}
          className={cn(
            "relative z-10 h-9 w-[94px] rounded-button text-sm font-medium capitalize transition-colors duration-500 ease-emphasized",
            value === b ? "text-ink" : "text-ink-3 hover:text-ink-2",
          )}
        >
          {value === b && (
            <motion.span
              layoutId="billing-thumb"
              className="absolute inset-0 -z-10 rounded-button bg-hover-2 shadow-btn"
              transition={{ duration: 0.5, ease: EASE.emphasized }}
            />
          )}
          {b}
        </button>
      ))}
    </div>
  )
}

/** A price that rolls to its new value: the old one drops away, the new one rises in. */
export function RollingPrice({ value }: { value: number | null }) {
  const text = value === null ? "Custom" : `$${value}`
  return (
    <span className="relative inline-flex h-11 overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={text}
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE.out }}
          className="font-display text-[40px] leading-[44px] font-semibold tracking-[-0.02em] text-ink tabular"
        >
          {text}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export function PlanCard({ plan, billing }: { plan: Plan; billing: Billing }) {
  const featured = "featured" in plan && plan.featured
  const saving = billing === "annual" && plan.monthly !== null && plan.monthly > 0
  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-panel border bg-surface px-6 pt-5 pb-6 shadow-sm transition-[border-color] duration-300",
        featured ? "border-accent/60 shadow-ring-accent" : "border-line-strong hover:border-line-bold",
      )}
    >
      <p className="text-[20px] font-medium text-ink">{plan.name}</p>
      <div className="mt-4 flex items-center gap-2">
        <RollingPrice value={billing === "annual" ? plan.annual : plan.monthly} />
        <AnimatePresence>
          {saving && (
            <motion.span
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              transition={{ opacity: { duration: 0.3 }, x: { duration: 0.6, ease: EASE.out } }}
              className="rounded-control border border-accent/30 bg-accent-tint px-1.5 text-caption font-medium text-accent-ink"
            >
              Save 20%
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <p className="mt-1 text-caption text-ink-3">
        {plan.note}
        {plan.monthly ? (
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={billing} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
              , billed {billing === "annual" ? "annually" : "monthly"}
            </motion.span>
          </AnimatePresence>
        ) : null}
      </p>
      <p className="mt-6 text-sm font-semibold text-ink">{plan.tagline}</p>
      <ul className="mt-3 flex flex-col gap-2.5">
        {plan.features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-sm text-ink-2">
            <Check className="size-3.5 shrink-0 text-ink-3" /> {f}
          </li>
        ))}
      </ul>
      <ButtonLink href="/pricing" variant={featured ? "primary" : "outline"} className="mt-8 w-full">
        {plan.cta}
      </ButtonLink>
    </div>
  )
}

function Value({ v }: { v: string | boolean }) {
  if (v === true) return <Check className="mx-auto size-4 rounded-full bg-ink p-0.5 text-page" aria-label="Included" />
  if (v === false) return <Minus className="mx-auto size-4 text-ink-faint" aria-label="Not included" />
  return <span>{v}</span>
}

/** Every plan, every feature: plan names stay pinned while the rows scroll under them. */
export function CompareTable({ billing }: { billing: Billing }) {
  const grid = "grid grid-cols-[minmax(160px,220px)_repeat(4,minmax(110px,1fr))] gap-x-6"
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[760px]">
        <div className={cn(grid, "sticky top-[68px] z-10 border-b border-line-strong bg-page/95 py-5 backdrop-blur-md")}>
          <span className="text-caption text-ink-3">Compare plans</span>
          {PRICING.plans.map((p) => (
            <div key={p.name} className="text-center">
              <p className="text-h3 font-medium text-ink">{p.name}</p>
              <p className="text-caption text-ink-3 tabular">
                {p.monthly === null ? "Custom" : `$${billing === "annual" ? p.annual : p.monthly} per seat`}
              </p>
            </div>
          ))}
        </div>
        {PRICING.compare.map((g) => (
          <div key={g.group}>
            <p className="pt-10 pb-3 text-lead font-medium text-ink">{g.group}</p>
            {g.rows.map((r) => (
              <div key={r.label} className={cn(grid, "h-14 items-center border-b border-line-strong text-sm")}>
                <span className="text-ink-2">{r.label}</span>
                {r.values.map((v, i) => (
                  <span key={i} className={cn("text-center text-ink-soft", i === 2 && "self-stretch bg-canvas/80 flex items-center justify-center")}>
                    <Value v={v} />
                  </span>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/** Pricing: the plans, who uses them, every feature side by side, and the last questions. */
export function PricingPage() {
  const [billing, setBilling] = useState<Billing>("annual")
  useCanvasAction("Annual billing", (next) => setBilling((next ?? billing !== "annual") ? "annual" : "monthly"), {
    on: billing === "annual",
    group: "Pricing",
  })

  return (
    <>
      <Section className="overflow-hidden">
        <Container className="flex flex-col items-center pt-16 text-center md:pt-24">
          <Reveal onMount>
            <Heading as="h1" size="h1" lead={PRICING.title} />
          </Reveal>
          <Reveal onMount delay={0.1} className="mt-4 text-base text-ink-soft md:text-lead">
            {PRICING.body.map((l) => (
              <p key={l}>{l}</p>
            ))}
          </Reveal>
          <Reveal onMount delay={0.2} className="mt-8">
            <BillingToggle value={billing} onChange={setBilling} />
          </Reveal>
        </Container>

        <Container className="relative pt-14 pb-[var(--spacing-section)]">
          {/* Construction lines around the cards, with a + at each corner. */}
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-9 bottom-[calc(var(--spacing-section)-24px)] hidden border-y border-dashed border-line-strong lg:block">
            {["top-0 left-[58px]", "top-0 right-[58px]", "bottom-0 left-[58px]", "bottom-0 right-[58px]"].map((p) => (
              <span key={p} className={cn("absolute font-mono text-caption leading-none text-ink-faint", p, p.includes("top") ? "-translate-y-1/2" : "translate-y-1/2", p.includes("left") ? "-translate-x-1/2" : "translate-x-1/2")}>
                +
              </span>
            ))}
          </div>
          <div className="relative grid grid-cols-1 [&>*]:min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PRICING.plans.map((plan, i) => (
              <Reveal key={plan.name} delay={0.25 + i * 0.06} onMount>
                {"featured" in plan && plan.featured ? (
                  <BorderBeam size="md" colorVariant="ocean" strength={0.5} duration={9} className="h-full rounded-panel">
                    <PlanCard plan={plan} billing={billing} />
                  </BorderBeam>
                ) : (
                  <PlanCard plan={plan} billing={billing} />
                )}
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <LogoWall brands={[...LOGOS, "discord", "loom"]} columns={6} withStories={0} />
      </Section>

      <Section>
        <Container className="py-[var(--spacing-section)]">
          <CompareTable billing={billing} />
        </Container>
      </Section>

      <Section id="faq">
        <Container className="mx-auto max-w-[800px] py-[var(--spacing-section)]">
          <Heading lead="Questions, answered." className="mb-10 text-center" />
          <Accordion type="single" collapsible className="border-t border-line-strong">
            {PRICING.faq.map((f) => (
              <AccordionItem key={f.q} value={f.q} className="border-line-strong">
                <AccordionTrigger className="group/faq items-center py-7 text-base font-semibold text-ink hover:no-underline [&>svg]:hidden">
                  {f.q}
                  <span className="ml-auto font-mono text-sm font-normal text-ink-3 transition-colors group-hover/faq:text-ink">
                    <span className="group-data-[state=open]/faq:hidden">[+]</span>
                    <span className="hidden group-data-[state=open]/faq:inline">[−]</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="max-w-[60ch] pb-7 text-sm text-ink-2 md:text-base">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
      </Section>
    </>
  )
}
