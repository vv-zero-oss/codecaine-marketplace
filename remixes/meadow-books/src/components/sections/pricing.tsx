import { BorderBeam } from "border-beam"
import { Check, Lock, RotateCcw, Sparkles, Users } from "lucide-react"
import { useState } from "react"
import { useCanvasAction } from "@canvas/react"

import { Reveal } from "@/components/motion/reveal"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

type Plan = { name: string; blurb: string; monthly: number | null; features: string[]; cta: string; featured?: boolean }

const PLANS: Plan[] = [
  { name: "Solo", blurb: "For freelancers and sole traders keeping their own books.", monthly: 0, cta: "Start free", features: ["1 bank account", "50 AI-coded transactions a month", "Invoices and receipts", "Basic reports"] },
  { name: "Business", blurb: "For small businesses that want the books done for them.", monthly: 38, cta: "Start 14-day trial", featured: true, features: ["Unlimited accounts and transactions", "All skills and month-end close", "Reconciliation and invoice chasing", "Tax set-asides and filings pack", "Accountant seats included"] },
  { name: "Practice", blurb: "For accounting firms looking after many clients.", monthly: null, cta: "Talk to sales", features: ["Everything in Business", "Multi-client dashboard", "Review queues and sign-offs", "White-label client portal"] },
]

/** Three plans, a billing toggle, and a beam round the one to look at first.
 *  The yearly price is the monthly price with two months off. */
export function Pricing() {
  const [billing, setBilling] = useState("yearly")
  useCanvasAction("Yearly billing", (next) => setBilling((next ?? billing !== "yearly") ? "yearly" : "monthly"), { on: billing === "yearly", group: "Pricing" })

  return (
    <section id="pricing" className="bg-page px-2 sm:px-3">
      <div className="relative overflow-hidden rounded-[var(--radius-section)] bg-surface py-14 shadow-card sm:py-24">
      <span aria-hidden="true" className="absolute inset-x-0 top-0 -z-0 h-72 bg-gradient-to-b from-sky-100/80 to-transparent" />
      <Container className="relative">
        <Reveal className="flex flex-col items-center gap-6">
          <SectionHeading align="center" title="Pricing that grows with your business" description="Start free. Pay when the books get busy. Cancel from settings, any time." />
          <Tabs value={billing} onValueChange={setBilling}>
            <TabsList aria-label="Billing period" className="rounded-[var(--radius-panel)] bg-ink-100 p-1">
              <TabsTrigger value="monthly" className="min-h-9 data-[state=active]:bg-surface data-[state=active]:shadow-card">Monthly</TabsTrigger>
              <TabsTrigger value="yearly" className="min-h-9 data-[state=active]:bg-surface data-[state=active]:shadow-card">Yearly <span className="ml-1 text-leaf">−2 months</span></TabsTrigger>
            </TabsList>
          </Tabs>
        </Reveal>
        <ul className="mt-9 grid items-stretch gap-4 md:grid-cols-3">
          {PLANS.map((plan, i) => {
            const price = plan.monthly === null ? null : billing === "yearly" ? Math.round((plan.monthly * 10) / 12) : plan.monthly
            const card = (
              <article className={cn("flex h-full flex-col gap-6 rounded-[var(--radius-card)] p-6 sm:p-7", plan.featured ? "bg-surface shadow-lift" : "bg-page shadow-card")}>
                <div>
                  <h3 className="flex items-center gap-2 text-[15px] font-semibold">{plan.name}{plan.featured ? <span className="rounded-md bg-sky-100 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-sky-600 uppercase">Most chosen</span> : null}</h3>
                  <p className="mt-1.5 text-[13px] leading-snug text-ink-500">{plan.blurb}</p>
                </div>
                <p className="flex items-baseline gap-1">
                  <span className="font-display text-[44px] leading-none font-semibold tracking-[-0.05em] tabular-nums">{price === null ? "Custom" : `$${price}`}</span>
                  {price === null ? null : <span className="text-[13px] text-ink-500">/ month</span>}
                </p>
                <ButtonLink href="#cta" variant={plan.featured ? "default" : "light"} size="lg" className="w-full">{plan.cta}</ButtonLink>
                <ul className="flex flex-col gap-2.5 border-t border-ink-100 pt-5 text-[14px] text-ink-700">
                  {plan.features.map((f) => (<li key={f} className="flex gap-2.5"><Check className="mt-0.5 size-4 shrink-0 text-leaf" />{f}</li>))}
                </ul>
              </article>
            )
            return (
              <li key={plan.name}>
                <Reveal delay={i * 0.07} className="h-full">
                  {plan.featured ? (
                    <BorderBeam size="md" colorVariant="ocean" strength={0.6} theme="light" className="h-full rounded-[18px]">{card}</BorderBeam>
                  ) : card}
                </Reveal>
              </li>
            )
          })}
        </ul>
        <Reveal className="mt-8">
          <ul className="grid grid-cols-2 gap-x-4 gap-y-3 rounded-[var(--radius-card)] bg-page px-5 py-4 text-[13px] text-ink-700 sm:grid-cols-4">
            {[[Sparkles, "AI on every plan"], [Lock, "Bank-grade encryption"], [Users, "Free accountant access"], [RotateCcw, "Export your data any time"]].map(([I, l]) => { const Icon = I as typeof Lock; return <li key={l as string} className="flex items-center gap-2"><Icon className="size-4 text-sky-600" />{l as string}</li> })}
          </ul>
        </Reveal>
      </Container>
      </div>
    </section>
  )
}
