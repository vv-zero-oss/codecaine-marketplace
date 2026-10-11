import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { BorderBeam } from "border-beam"
import { Check, Minus } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { SectionHeading } from "@/components/blocks/section-heading"
import { Reveal } from "@/components/motion/reveal"
import { ClosingCta } from "@/components/sections/home/closing-cta"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

type Billing = "monthly" | "yearly"

const PLANS = [
  {
    id: "free",
    name: "Free",
    monthly: 0,
    blurb: "For a map or three, and finding out if Cairn is for you.",
    views: 5000,
    cta: "Start free",
    features: ["3 maps", "5,000 map views a month", "Ask Cairn — 20 requests a day", "Embed anywhere", "Cairn badge on maps"],
  },
  {
    id: "plus",
    name: "Plus",
    monthly: 14,
    blurb: "For a guide people come back to — a festival, a newsletter, a shop.",
    views: 100000,
    cta: "Try Plus free for 14 days",
    featured: true,
    features: ["Unlimited maps", "100,000 map views a month", "Unlimited Ask Cairn", "Spreadsheet sync, every hour", "Your own colours and fonts", "No badge"],
  },
  {
    id: "team",
    name: "Team",
    monthly: 39,
    blurb: "For organisations with several maps and several people editing them.",
    views: 1000000,
    cta: "Start a team",
    features: ["Everything in Plus", "1,000,000 map views a month", "5 editors, then $6 each", "Live sync with Sheets and Airtable", "Custom domain", "Priority help from a person"],
  },
]

const price = (monthly: number, billing: Billing) => (billing === "yearly" ? Math.round((monthly * 10) / 12) : monthly)

/**
 * /pricing — it says what it costs, then helps you work out which plan you
 * need, then answers what people ask before they pay.
 */
export function PricingPage() {
  const [billing, setBilling] = useState<Billing>("yearly")
  useCanvasAction("Monthly billing", (next) => setBilling((next ?? billing === "yearly") ? "monthly" : "yearly"), { on: billing === "monthly", group: "Pricing" })
  return (
    <>
      <section className="pt-[124px] pb-12 md:pt-[160px] md:pb-16">
        <Container className="flex flex-col items-center text-center">
          <Reveal className="flex flex-col items-center">
            <p className="type-eyebrow text-accent-ink">Pricing</p>
            <h1 className="type-serif mt-4 max-w-[12ch] text-mega text-ink">Free until it&rsquo;s busy.</h1>
            <p className="mt-7 max-w-[40ch] text-lead text-ink-3">Every plan makes the same maps. You pay when lots of people start opening them.</p>
            <BillingToggle billing={billing} onChange={setBilling} className="mt-10" />
          </Reveal>
        </Container>
      </section>

      <section className="pb-section">
        <Container className="max-w-[1120px]">
          <div className="grid items-stretch gap-5 md:grid-cols-3">
            {PLANS.map((plan, i) => (
              <Reveal key={plan.id} delay={i * 0.06} className="flex">
                <PlanCard plan={plan} billing={billing} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <ViewsCalculator billing={billing} />
      <Compare />
      <Faq />
      <ClosingCta title="Your first three maps are free." />
    </>
  )
}

function BillingToggle({ billing, onChange, className }: { billing: Billing; onChange: (b: Billing) => void; className?: string }) {
  return (
    <div role="radiogroup" aria-label="Billing" className={cn("relative flex rounded-[11px] bg-panel p-1", className)}>
      {(["monthly", "yearly"] as const).map((b) => (
        <button
          key={b}
          type="button"
          role="radio"
          aria-checked={billing === b}
          onClick={() => onChange(b)}
          className={cn("relative flex h-10 items-center gap-2 rounded-[8px] px-4 text-[14.5px] font-medium transition-colors", billing === b ? "text-ink" : "text-ink-3 hover:text-ink")}
        >
          {billing === b ? <motion.span layoutId="billing" className="absolute inset-0 rounded-[8px] bg-raised shadow-(--shadow-xs)" transition={{ type: "spring", stiffness: 420, damping: 34 }} /> : null}
          <span className="relative">{b === "monthly" ? "Monthly" : "Yearly"}</span>
          {b === "yearly" ? <span className="relative rounded-full bg-accent-soft px-1.5 py-0.5 text-[11.5px] text-accent-ink">2 months free</span> : null}
        </button>
      ))}
    </div>
  )
}

/** The price, rolling to its new value when the billing changes. */
function Price({ value }: { value: number }) {
  const reduced = useReducedMotion()
  return (
    <span className="relative inline-flex overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={reduced ? { opacity: 0 } : { y: "60%", opacity: 0, filter: "blur(4px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={reduced ? { opacity: 0 } : { y: "-60%", opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
          className="tabular-nums"
        >
          ${value}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function PlanCard({ plan, billing }: { plan: (typeof PLANS)[number]; billing: Billing }) {
  const card = (
    <article
      className={cn(
        "flex h-full w-full flex-col rounded-(--radius-panel) p-6 sm:p-7",
        plan.featured ? "bg-raised shadow-(--shadow-window)" : "bg-cream",
      )}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-[17px] font-semibold tracking-[-0.015em] text-ink">{plan.name}</h2>
        {plan.featured ? <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[12px] font-medium text-accent-ink">Most maps live here</span> : null}
      </div>
      <p className="mt-2 min-h-[48px] text-[14.5px] text-ink-3">{plan.blurb}</p>
      <p className="type-serif mt-6 flex items-baseline gap-1.5 text-display text-ink">
        <Price value={price(plan.monthly, billing)} />
        <span className="font-sans text-[14px] font-normal tracking-normal text-ink-3">/ month</span>
      </p>
      <p className="mt-1 h-5 text-[13px] text-ink-soft">
        {plan.monthly === 0 ? "Free for ever" : billing === "yearly" ? `Billed $${plan.monthly * 10} a year` : "Billed monthly, cancel any time"}
      </p>
      <ButtonLink href="/studio" variant={plan.featured ? "primary" : "outline"} className="mt-6 w-full">
        {plan.cta}
      </ButtonLink>
      <ul className="mt-7 flex flex-col gap-2.5 border-t border-line pt-6">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-[14.5px] text-ink-2">
            <Check className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={2.4} /> {f}
          </li>
        ))}
      </ul>
    </article>
  )
  if (!plan.featured) return card
  return (
    <BorderBeam size="md" colorVariant="ocean" theme="light" strength={0.55} borderRadius={18} className="flex h-full w-full">
      {card}
    </BorderBeam>
  )
}

const STOPS = [1000, 5000, 20000, 50000, 100000, 250000, 500000, 1000000, 2000000]

/** Works out the plan from how many people will open the map. */
function ViewsCalculator({ billing }: { billing: Billing }) {
  const [stop, setStop] = useState(3)
  const views = STOPS[stop]
  const plan = PLANS.find((p) => p.views >= views) ?? PLANS[2]
  const over = views > PLANS[2].views
  const extra = over ? Math.ceil((views - PLANS[2].views) / 100000) * 4 : 0
  const total = price(plan.monthly, billing) + extra
  return (
    <section className="pb-section">
      <Container className="max-w-[1000px]">
        <SectionHeading title="How busy will it get?" lead="Drag to how many times a month you expect your maps to be opened. We'll tell you what you'd pay." />
        <Reveal className="mt-10 grid gap-8 rounded-(--radius-panel) bg-cream p-6 sm:p-9 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div>
            <p className="flex items-baseline justify-between text-[14px] text-ink-3">
              Map views a month
              <span className="type-serif text-h3 text-ink tabular-nums">{views.toLocaleString("en-GB")}</span>
            </p>
            <Slider value={[stop]} min={0} max={STOPS.length - 1} step={1} onValueChange={([v]) => setStop(v)} className="mt-6" aria-label="Map views a month" />
            <div className="mt-3 flex justify-between text-[12px] text-ink-soft tabular-nums">
              <span>1k</span>
              <span>100k</span>
              <span>2M</span>
            </div>
          </div>
          <div className="rounded-(--radius-card) bg-raised p-5 shadow-(--shadow-card)">
            <p className="text-[13px] text-ink-3">You'd be on</p>
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={plan.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                className="type-serif text-h3 text-ink"
              >
                {plan.name}
              </motion.p>
            </AnimatePresence>
            <p className="mt-3 flex items-baseline gap-1.5 text-ink">
              <span className="type-serif text-h2">
                <Price value={total} />
              </span>
              <span className="text-[14px] text-ink-3">/ month</span>
            </p>
            <p className="mt-2 min-h-[40px] text-[13px] text-ink-3">
              {over ? `Includes $${extra} for the views over 1M, at $4 per 100k.` : plan.monthly === 0 ? "Nothing to pay. Upgrade when you outgrow it." : `${plan.views.toLocaleString("en-GB")} views included.`}
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

const ROWS: [string, (string | boolean)[]][] = [
  ["Maps", ["3", "Unlimited", "Unlimited"]],
  ["Map views a month", ["5,000", "100,000", "1,000,000"]],
  ["Ask Cairn", ["20 a day", "Unlimited", "Unlimited"]],
  ["Embed on any site", [true, true, true]],
  ["Spreadsheet import", [true, true, true]],
  ["Spreadsheet sync", [false, "Hourly", "Live"]],
  ["Your colours and fonts", [false, true, true]],
  ["Remove the Cairn badge", [false, true, true]],
  ["Editors", ["1", "1", "5 + $6 each"]],
  ["Custom domain", [false, false, true]],
]

function Compare() {
  return (
    <section className="pb-section">
      <Container className="max-w-[1000px]">
        <SectionHeading title="Side by side." />
        <Reveal className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left text-[14.5px]">
            <thead>
              <tr className="border-b border-line-strong">
                <th className="py-3 pr-4 font-normal text-ink-3">
                  <span className="sr-only">Feature</span>
                </th>
                {PLANS.map((p) => (
                  <th key={p.id} className={cn("w-[22%] py-3 font-semibold", p.featured ? "text-accent-ink" : "text-ink")}>
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([label, values]) => (
                <tr key={label} className="border-b border-line transition-colors hover:bg-panel/60">
                  <th scope="row" className="py-3.5 pr-4 font-normal text-ink-2">
                    {label}
                  </th>
                  {values.map((v, i) => (
                    <td key={i} className="py-3.5 text-ink tabular-nums">
                      {v === true ? <Check className="size-4 text-accent" aria-label="Included" /> : v === false ? <Minus className="size-4 text-ink-4" aria-label="Not included" /> : v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </Container>
    </section>
  )
}

const FAQ = [
  ["What counts as a map view?", "One person opening one map, once — however long they spend on it and however many pins they tap. Embedded maps count the same as links."],
  ["What happens if I go over my views?", "Nothing breaks. On Free we'll email you and keep the maps up for the month; on paid plans the extra is $4 per 100,000 views, and you can set a cap."],
  ["Where does Ask Cairn get its places?", "From public listings and the details you add. Every place it suggests shows you its source, and nothing is published until you keep it."],
  ["Can I use my own spreadsheet?", "Yes — upload a CSV, or connect a Google Sheet or Airtable base. A name and an address, or a neighbourhood, are all Cairn needs."],
  ["Will my map work on phones?", "Every Cairn map is responsive: the guide becomes a sheet you swipe up, and the map fills the rest."],
  ["Can I cancel?", "Any time, from Settings. Your maps stay up on the Free plan, and you can export everything as a CSV."],
]

function Faq() {
  const [open, setOpen] = useState<string>("")
  useCanvasAction("FAQ: first answer open", (next) => setOpen((next ?? !open) ? FAQ[0][0] : ""), { on: open === FAQ[0][0], group: "Pricing" })
  return (
    <section id="faq" className="scroll-mt-24 pb-section">
      <Container className="grid max-w-[1000px] gap-10 md:grid-cols-[1fr_1.5fr]">
        <SectionHeading title="Asked before paying." lead="Anything else, write to us — a person answers within a day." />
        <Reveal>
          <Accordion type="single" collapsible value={open} onValueChange={setOpen}>
            {FAQ.map(([q, a]) => (
              <AccordionItem key={q} value={q} className="border-line">
                <AccordionTrigger className="py-5 text-[17px] font-medium tracking-[-0.012em] text-ink hover:no-underline [&>svg]:text-ink-3">{q}</AccordionTrigger>
                <AccordionContent className="pb-5 text-[15.5px] leading-relaxed text-ink-3">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Container>
    </section>
  )
}
