import { useState } from "react"
import { Check, Smartphone } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { BorderBeam } from "border-beam"
import { useCanvasAction } from "@canvas/react"

import { Reveal } from "@/components/motion/reveal"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"

export type Billing = "yearly" | "monthly"

const PLANS = [
  {
    id: "free",
    name: "Free",
    blurb: "For the occasional trip.",
    price: { yearly: 0, monthly: 0 },
    note: { yearly: "Forever", monthly: "Forever" },
    cta: "Download",
    features: ["Live status and gates", "Your first flight with every Pro feature", "Friends can follow your flights", "Passport for the current year"],
  },
  {
    id: "pro",
    name: "Pro",
    blurb: "For anyone who flies more than twice a year.",
    price: { yearly: 4.17, monthly: 5.99 },
    note: { yearly: "$49.99 billed yearly", monthly: "Billed monthly" },
    cta: "Start a free week",
    features: ["Delay predictions, 25 hours out", "Where's my plane?", "Tower advisories and weather", "Fastest alerts, on every device", "60-day on-time forecast", "Passport for every year, with imports"],
  },
  {
    id: "family",
    name: "Family",
    blurb: "Pro for up to five people at home.",
    price: { yearly: 6.67, monthly: 9.99 },
    note: { yearly: "$79.99 billed yearly", monthly: "Billed monthly" },
    cta: "Start a free week",
    features: ["Everything in Pro, for five", "One shared friends map", "Each person keeps their own passport", "Add or swap people any time"],
  },
] as const

/** A price that rolls to its new value, digit by digit, when billing changes. */
function RollingPrice({ value }: { value: number }) {
  const reduced = useReducedMotion()
  const text = value === 0 ? "0" : value.toFixed(2)
  return (
    <span className="inline-flex overflow-hidden tabular-nums" aria-label={`$${text}`}>
      <span aria-hidden>$</span>
      {[...text].map((ch, i) => (
        <span key={i} className="relative inline-block" aria-hidden>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={ch + i}
              className="inline-block"
              initial={reduced ? { opacity: 0 } : { transform: "translateY(60%)", opacity: 0 }}
              animate={{ transform: "translateY(0%)", opacity: 1 }}
              exit={reduced ? { opacity: 0 } : { transform: "translateY(-60%)", opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1], delay: i * 0.025 }}
            >
              {ch}
            </motion.span>
          </AnimatePresence>
        </span>
      ))}
    </span>
  )
}

function PlanCard({ plan, billing }: { plan: (typeof PLANS)[number]; billing: Billing }) {
  const pro = plan.id === "pro"
  const card = (
    <article
      data-theme={pro ? "night" : undefined}
      className={cn(
        "flex h-full flex-col rounded-(--radius-panel) p-7",
        pro ? "bg-night text-night-fg shadow-(--shadow-lift)" : "bg-panel text-ink",
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-h4 font-semibold">{plan.name}</h3>
        {pro ? <span className="rounded-full bg-amber px-2.5 py-1 text-[12.58px] font-semibold text-amber-ink">Most flown</span> : null}
      </div>
      <p className={cn("mt-1", pro ? "text-night-2fg" : "text-ink-2")}>{plan.blurb}</p>
      <p className="mt-8 flex items-baseline gap-1.5">
        <span className="type-display text-h1"><RollingPrice value={plan.price[billing]} /></span>
        {plan.price[billing] ? <span className={pro ? "text-night-muted" : "text-ink-3"}>/ month</span> : null}
      </p>
      <p className={cn("mt-1 text-[14px]", pro ? "text-night-muted" : "text-ink-3")}>{plan.note[billing]}</p>
      <ButtonLink href="#compare" variant={pro ? "amber" : "ink"} className="mt-7 w-full">
        {plan.id === "free" ? <Smartphone /> : null} {plan.cta}
      </ButtonLink>
      <ul className="mt-8 flex flex-col gap-3 text-[15px]">
        {plan.features.map((f) => (
          <li key={f} className="flex gap-2.5">
            <Check className={cn("mt-0.5 size-4 shrink-0", pro ? "text-green-bright" : "text-green")} strokeWidth={2.6} />
            <span className={pro ? "text-night-2fg" : "text-ink-2"}>{f}</span>
          </li>
        ))}
      </ul>
    </article>
  )
  return pro ? (
    <BorderBeam size="md" colorVariant="ocean" theme="dark" strength={0.55} className="h-full rounded-(--radius-panel)">
      {card}
    </BorderBeam>
  ) : (
    card
  )
}

/**
 * The plans: a billing switch, three cards and prices that roll when it
 * flips. Pro wears the page's one beam — it's the one most people want.
 */
export function Plans() {
  const [billing, setBilling] = useState<Billing>("yearly")
  useCanvasAction("Monthly billing", (next) => setBilling((next ?? billing === "yearly") ? "monthly" : "yearly"), { on: billing === "monthly", group: "Pricing" })
  return (
    <section data-theme="day" className="bg-page pb-section">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-ink-2">Every plan starts with a week of Pro. Cancel in two taps.</p>
          <ToggleGroup
            type="single"
            value={billing}
            onValueChange={(v) => v && setBilling(v as Billing)}
            aria-label="Billing period"
            className="rounded-full bg-panel p-1"
          >
            {(["yearly", "monthly"] as const).map((b) => (
              <ToggleGroupItem
                key={b}
                value={b}
                className="relative h-10 rounded-full! px-4 text-[14.5px] capitalize data-[state=on]:bg-transparent data-[state=on]:text-ink hover:bg-transparent"
              >
                {billing === b ? <motion.span layoutId="billing" className="absolute inset-0 rounded-full bg-raised shadow-(--shadow-card)" transition={{ type: "spring", duration: 0.4, bounce: 0.15 }} /> : null}
                <span className="relative">{b}</span>
                {b === "yearly" ? <span className="relative ml-1.5 rounded-full bg-green/10 px-1.5 text-[12px] font-semibold text-green">−30%</span> : null}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 0.05} className="h-full">
              <PlanCard plan={plan} billing={billing} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
