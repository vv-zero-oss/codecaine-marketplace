import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { BorderBeam } from "border-beam"
import { Check } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { Reveal } from "@/components/motion/reveal"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"

type Billing = "monthly" | "yearly"

const PLANS = [
  {
    id: "free",
    name: "Free",
    tagline: "For anyone hosting anything.",
    price: { monthly: 0, yearly: 0 },
    fee: "5% + 30¢ on paid tickets",
    cta: "Start hosting",
    features: ["Unlimited events and guests", "Posters, moods and your own page", "RSVPs, waitlists and plus-ones", "Check-in from any phone", "Payouts in two business days"],
  },
  {
    id: "plus",
    name: "Fête Plus",
    tagline: "For the people who host every week.",
    price: { monthly: 59, yearly: 49 },
    fee: "0% platform fee — card fees only",
    cta: "Try Plus free for 14 days",
    featured: true,
    features: ["Everything in Free", "No platform fee on tickets", "Up to five co-hosts and door staff", "Member tiers and a community page", "Morning-after recaps, automatically", "Your own domain and branding"],
  },
] as const

/** The figure in a plan card, rolling to its new value when billing changes. */
function Price({ value }: { value: number }) {
  const reduced = useReducedMotion()
  return (
    <span className="relative inline-flex h-[1em] overflow-hidden leading-none tabular-nums">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={reduced ? { opacity: 0 } : { y: "70%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={reduced ? { opacity: 0 } : { y: "-70%", opacity: 0 }}
          transition={{ duration: 0.36, ease: [0.23, 1, 0.32, 1] }}
        >
          ${value}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function PlanCard({ plan, billing }: { plan: (typeof PLANS)[number]; billing: Billing }) {
  const featured = "featured" in plan
  return (
    <div className={cn("flex h-full flex-col rounded-(--radius-panel) bg-raised p-6 sm:p-8", featured ? "shadow-(--shadow-lift)" : "border border-line")}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-h4 font-semibold whitespace-nowrap text-ink">{plan.name}</h3>
        {featured && <span className="rounded-full bg-berry-soft px-2.5 py-1 text-[12px] font-medium whitespace-nowrap text-berry">Most hosts upgrade by month three</span>}
      </div>
      <p className="mt-1 text-ink-3">{plan.tagline}</p>
      <p className="mt-8 flex items-end gap-2">
        <span className="text-[clamp(53.29px,6vw,86.23px)] font-semibold tracking-[-0.05em] text-ink">
          <Price value={plan.price[billing]} />
        </span>
        <span className="mb-2 text-[15px] text-ink-3">{plan.price[billing] ? (billing === "yearly" ? "/ month, billed yearly" : "/ month") : "forever"}</span>
      </p>
      <p className="mt-2 text-[15px] font-medium text-ink-2">{plan.fee}</p>
      <ul className="mt-8 flex flex-1 flex-col gap-3 border-t border-line pt-6">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-[15px] text-ink-2">
            <Check className={cn("mt-0.5 size-4 shrink-0", featured ? "text-berry" : "text-ink-3")} strokeWidth={2.4} />
            {f}
          </li>
        ))}
      </ul>
      <ButtonLink href="/create" variant={featured ? "ink" : "outline"} size="lg" className="mt-8 w-full">
        {plan.cta}
      </ButtonLink>
    </div>
  )
}

/**
 * Two plans, side by side: free for everyone, Plus for weekly hosts. The
 * billing switch rolls each figure to its new value; Plus carries the page's
 * one border beam.
 */
export function Plans() {
  const [billing, setBilling] = useState<Billing>("yearly")
  const reduced = useReducedMotion()
  useCanvasAction("Monthly billing", (next) => setBilling((next ?? billing === "yearly") ? "monthly" : "yearly"), { on: billing === "monthly", group: "Pricing" })

  return (
    <section className="pt-28 pb-16 md:pt-36 md:pb-24">
      <Container className="max-w-[1080px]">
        <Reveal className="text-center">
          <p className="type-eyebrow text-berry">Pricing</p>
          <h1 className="type-head mx-auto mt-4 max-w-[11ch] text-giga text-ink">
            Free to host. <span className="flare-text">Fair</span> when you sell.
          </h1>
          <p className="mx-auto mt-10 max-w-[46ch] text-lead text-ink-3">
            Free events cost nothing, ever. Paid ones cost a small fee — or none at all on Plus.
          </p>
          <div className="mt-10 inline-flex rounded-full bg-panel p-1" role="radiogroup" aria-label="Billing">
            {(["monthly", "yearly"] as Billing[]).map((b) => (
              <button key={b} type="button" role="radio" aria-checked={billing === b} onClick={() => setBilling(b)} className={cn("relative h-10 rounded-full px-5 text-[15px] font-medium transition-colors", billing === b ? "text-ink" : "text-ink-3 hover:text-ink")}>
                {billing === b && <motion.span layoutId="billing-pill" className="absolute inset-0 rounded-full bg-raised shadow-(--shadow-xs)" transition={{ type: "spring", duration: 0.35, bounce: 0.12 }} />}
                <span className="relative">
                  {b === "monthly" ? "Monthly" : "Yearly"}
                  {b === "yearly" && <span className="ml-1.5 text-berry">−17%</span>}
                </span>
              </button>
            ))}
          </div>
        </Reveal>
        <div className="mt-14 grid items-stretch gap-5 md:grid-cols-2">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 0.08} className="h-full">
              {"featured" in plan ? (
                <BorderBeam size="md" colorVariant="sunset" strength={0.55} theme="light" borderRadius={20} active={!reduced} className="h-full rounded-(--radius-panel)">
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
