import { useState } from "react"
import { ArrowRight, Check } from "lucide-react"
import { BorderBeam } from "border-beam"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { useCanvasAction } from "@canvas/react"
import { Reveal } from "@/components/motion/reveal"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

type Plan = {
  name: string
  blurb: string
  monthly: number | null
  yearly: number | null
  unit: string
  cta: string
  featured?: boolean
  includes: string[]
}

export const PLANS: Plan[] = [
  {
    name: "Starter",
    blurb: "For creators and one-person marketing teams.",
    monthly: 29,
    yearly: 24,
    unit: "per month",
    cta: "Start free",
    includes: ["3 channels", "Scheduler and best-time slots", "AI captions, 300 a month", "20 video renders a month", "1 seat"],
  },
  {
    name: "Growth",
    blurb: "For brand teams posting every day, everywhere.",
    monthly: 99,
    yearly: 82,
    unit: "per month",
    cta: "Start 14-day trial",
    featured: true,
    includes: [
      "12 channels",
      "AI Marketing Manager and all agents",
      "Unlimited captions",
      "150 video renders a month",
      "Approvals and brand voice",
      "5 seats",
    ],
  },
  {
    name: "Scale",
    blurb: "For agencies and multi-market brands.",
    monthly: null,
    yearly: null,
    unit: "",
    cta: "Talk to sales",
    includes: ["Unlimited channels and brands", "Custom agents and workflows", "Unlimited renders", "SSO, audit export, SLA", "Dedicated strategist"],
  },
]

const EASE = [0.23, 1, 0.32, 1] as const

/** A price that rolls to the new figure when billing changes. */
export function Price({ value }: { value: number | null }) {
  const reduce = useReducedMotion()
  if (value === null) return <span className="font-serif text-[3.25rem] leading-none font-light text-ink">Custom</span>
  return (
    <span className="inline-flex items-start font-serif text-[3.25rem] leading-none font-light text-ink">
      <span className="mt-1 text-2xl">$</span>
      <span className="relative inline-block overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={value}
            className="inline-block tabular-nums"
            initial={reduce ? false : { transform: "translateY(60%)", opacity: 0, filter: "blur(4px)" }}
            animate={{ transform: "translateY(0%)", opacity: 1, filter: "blur(0px)" }}
            exit={{ transform: "translateY(-60%)", opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  )
}

export function PlanCard({ plan, yearly }: { plan: Plan; yearly: boolean }) {
  const body = (
    <div className={cn("flex h-full flex-col bg-page p-6 md:p-9", plan.featured && "bg-panel")}>
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-[1.75rem] font-light text-ink">{plan.name}</h3>
        {plan.featured && <span className="bg-mint px-2.5 py-1 text-[11px] font-medium text-ink">Most teams</span>}
      </div>
      <p className="mt-2 min-h-11 text-[14px] text-ink-soft">{plan.blurb}</p>
      <div className="mt-8 flex items-end gap-2">
        <Price value={yearly ? plan.yearly : plan.monthly} />
        {plan.unit && <span className="mb-1 text-[13px] text-muted">{plan.unit}</span>}
      </div>
      <p className="mt-2 h-4 text-[12px] text-muted">{plan.monthly && yearly ? "billed yearly" : plan.monthly ? "billed monthly" : "annual contract"}</p>
      <ButtonLink href="/pricing" variant={plan.featured ? "primary" : "outline"} className="mt-8 w-full">
        {plan.cta} <ArrowRight />
      </ButtonLink>
      <ul className="mt-8 flex flex-col gap-3 border-t border-line pt-6">
        {plan.includes.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-[14px] text-ink-soft">
            <Check className="mt-0.5 size-4 shrink-0 text-mint-ink" /> {f}
          </li>
        ))}
      </ul>
    </div>
  )
  return plan.featured ? (
    <BorderBeam size="md" colorVariant="mono" theme="light" strength={0.55} borderRadius={0} className="h-full">
      {body}
    </BorderBeam>
  ) : (
    body
  )
}

export function Plans() {
  const [yearly, setYearly] = useState(true)
  useCanvasAction("Yearly billing", (next) => setYearly(next ?? !yearly), { on: yearly, group: "Pricing" })
  return (
    <section className="bg-page pb-(--spacing-section)">
      <Container>
        <div className="flex items-center justify-center gap-3 text-[14px]">
          <span className={cn(!yearly ? "text-ink" : "text-muted")}>Monthly</span>
          <Switch checked={yearly} onCheckedChange={setYearly} aria-label="Bill yearly" className="data-[state=checked]:bg-ink" />
          <span className={cn(yearly ? "text-ink" : "text-muted")}>
            Yearly <span className="ml-1 bg-mint-soft px-1.5 py-0.5 text-[11px] font-medium text-mint-ink">2 months free</span>
          </span>
        </div>
        <Reveal className="mt-10 grid gap-px border border-line bg-line md:mt-12 lg:grid-cols-3">
          {PLANS.map((p) => (
            <PlanCard key={p.name} plan={p} yearly={yearly} />
          ))}
        </Reveal>
      </Container>
    </section>
  )
}
