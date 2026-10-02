import { BorderBeam } from "border-beam"
import { Check } from "lucide-react"
import { motion } from "motion/react"
import { useState } from "react"
import { useCanvasAction } from "@canvas/react"

import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Display } from "@/components/ui/display"
import { CountUp } from "@/components/motion/count-up"
import { Reveal } from "@/components/motion/reveal"
import { cn } from "@/lib/utils"

const FREE = ["Link up to 2 accounts", "Automatic merchants and categories", "Search, recall and filter", "Monthly cash-flow view"]
const PLUS = ["Unlimited accounts", "Recurring-payment calendar and alerts", "Household view for two", "Statement exports", "Priority support"]

function Feature({ children }: { children: string }) {
  return (
    <li className="flex items-start gap-2.5 text-[15px]">
      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-leaf-200 text-night-950">
        <Check className="size-3" strokeWidth={3} />
      </span>
      {children}
    </li>
  )
}

/** Monthly or yearly, as a sliding pill. The thumb glides between the two with a shared layout. */
export function BillingToggle({ yearly, onChange }: { yearly: boolean; onChange: (yearly: boolean) => void }) {
  return (
    <div role="radiogroup" aria-label="Billing period" className="relative inline-grid grid-cols-2 rounded-full bg-ink-200/70 p-1 text-sm font-semibold">
      {[false, true].map((value) => (
        <button
          key={String(value)}
          type="button"
          role="radio"
          aria-checked={yearly === value}
          onClick={() => onChange(value)}
          className="relative z-10 min-h-10 rounded-full px-5 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none"
        >
          {yearly === value ? <motion.span layoutId="billing-thumb" transition={{ type: "spring", duration: 0.4, bounce: 0.15 }} className="absolute inset-0 -z-10 rounded-full bg-white shadow-card" /> : null}
          <span className={cn(yearly === value ? "text-ink-900" : "text-ink-600")}>
            {value ? "Yearly" : "Monthly"}
            {value ? <span className="ml-1.5 text-[11px] font-bold text-leaf-500">−33%</span> : null}
          </span>
        </button>
      ))}
    </div>
  )
}

export function Pricing() {
  const [yearly, setYearly] = useState(true)
  useCanvasAction("Billing yearly", (next) => setYearly(next ?? !yearly), { on: yearly, group: "Pricing" })
  return (
    <section id="pricing" className="bg-ink-50 py-20 sm:py-28">
      <Container>
        <Reveal className="text-center">
          <Display className="mx-auto max-w-3xl">Free to see. Cheap to go deeper.</Display>
          <div className="mt-8">
            <BillingToggle yearly={yearly} onChange={setYearly} />
          </div>
        </Reveal>
        <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl bg-white p-7 shadow-card sm:p-9">
              <p className="text-sm font-bold tracking-wider text-ink-400 uppercase">Tally</p>
              <p className="tabular mt-3 text-6xl font-extrabold tracking-[-0.04em]">$0</p>
              <p className="mt-1 text-ink-600">Free, for as long as you like.</p>
              <ButtonLink href="#download" variant="outline" size="lg" className="mt-7 w-full">Get the app</ButtonLink>
              <ul className="mt-7 space-y-3.5">{FREE.map((f) => <Feature key={f}>{f}</Feature>)}</ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <BorderBeam size="md" colorVariant="ocean" strength={0.6} theme="light" className="h-full rounded-3xl">
              <div className="h-full rounded-3xl bg-white p-7 shadow-lift sm:p-9">
                <p className="flex items-center justify-between text-sm font-bold tracking-wider text-brand-600 uppercase">
                  Tally Plus <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[11px]">Most chosen</span>
                </p>
                <p className="mt-3 flex items-baseline gap-1 text-6xl font-extrabold tracking-[-0.04em]">
                  <CountUp value={yearly ? 4 : 6} duration={0.5} className="tabular" />
                  <span className="text-lg font-semibold tracking-normal text-ink-600">/ month</span>
                </p>
                <p className="mt-1 text-ink-600">{yearly ? "Billed $48 once a year." : "Billed monthly. Cancel any time."}</p>
                <ButtonLink href="#download" variant="primary" size="lg" className="mt-7 w-full">Start 30 days free</ButtonLink>
                <ul className="mt-7 space-y-3.5">
                  <li className="text-[15px] font-semibold">Everything in Tally, plus</li>
                  {PLUS.map((f) => <Feature key={f}>{f}</Feature>)}
                </ul>
              </div>
            </BorderBeam>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
