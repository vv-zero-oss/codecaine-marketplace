import { useMemo, useState } from "react"
import { Check } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { Reveal } from "@/components/motion/reveal"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { quote, VERTIPORTS } from "@/content/network"
import { cn } from "@/lib/utils"
import { AnimatedNumber } from "./animated-number"

type Billing = "monthly" | "annual"

/** The lowest fare on the network, from the same quote every mockup uses. */
function lowestFare() {
  let min = Infinity
  for (const a of VERTIPORTS) for (const b of VERTIPORTS) if (a !== b) min = Math.min(min, quote(a, b).fare)
  return min
}

/**
 * Three ways to pay, priced off the real fares: a single seat, ten rides a
 * month, and a pooled account for a team. Annual billing takes about a
 * sixth off; the numbers glide to their new value when it is switched.
 */
export function FarePlans({ initialBilling = "monthly", highlight = "commuter" }: { initialBilling?: Billing; highlight?: "single" | "commuter" | "corporate" }) {
  const [billing, setBilling] = useState<Billing>(initialBilling)
  useCanvasAction("Annual pricing", (on) => setBilling((on ?? billing === "monthly") ? "annual" : "monthly"), { on: billing === "annual", group: "Fares" })

  const plans = useMemo(() => {
    const from = lowestFare()
    return [
      {
        id: "single" as const,
        name: "Single ride",
        lede: "For the flight you need today.",
        monthly: from,
        annual: Math.round((from * 0.85) / 5) * 5,
        unit: "a seat, and up",
        note: (b: Billing) => (b === "annual" ? "Members' fare, with a $99 yearly membership" : "No membership, pay as you fly"),
        perks: ["Both cars included", "Free changes until 2 hours before", "Seat choice at booking"],
        cta: "Book a seat",
      },
      {
        id: "commuter" as const,
        name: "Commuter 10-pack",
        lede: "Ten flights a month on one route.",
        monthly: 790,
        annual: 660,
        unit: "a month",
        note: (b: Billing) => (b === "annual" ? "Billed $7,920 once a year" : "Cancel any month"),
        perks: ["Ten flights, any time of day", "Priority on the 07:00 to 09:00 slots", "Unused flights roll over a month", "A seat held on your usual departure"],
        cta: "Start commuting",
      },
      {
        id: "corporate" as const,
        name: "Corporate",
        lede: "A shared account for a team that travels.",
        monthly: 3200,
        annual: 2690,
        unit: "a month",
        note: (b: Billing) => (b === "annual" ? "Billed yearly, 40 flights a month" : "40 flights a month, pooled"),
        perks: ["Flights pooled across your team", "One invoice, cost codes per trip", "Guest bookings for visitors", "A named account manager"],
        cta: "Talk to us",
      },
    ]
  }, [])

  return (
    <section data-header-tone="dark" className="relative border-t border-line py-(--spacing-section)">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <p className="text-micro text-ink-3">Fares and passes</p>
            <h2 className="type-head mt-4 max-w-[16ch] text-display text-balance">Priced like a cab ride you'd take anyway.</h2>
          </Reveal>
          <div role="radiogroup" aria-label="Billing" className="relative inline-flex w-fit rounded-full bg-panel p-1">
            {(["monthly", "annual"] as const).map((b) => (
              <button
                key={b}
                type="button"
                role="radio"
                aria-checked={billing === b}
                onClick={() => setBilling(b)}
                className={cn(
                  "relative h-11 rounded-full px-5 text-[14px] font-medium outline-none transition-[background-color,color,box-shadow,transform] duration-(--duration-hover) ease-(--ease-out-strong) active:scale-[0.97] focus-visible:ring-[3px] focus-visible:ring-sky/35",
                  billing === b ? "bg-raised text-ink shadow-(--shadow-xs)" : "text-ink-3 hover:text-ink",
                )}
              >
                {b === "monthly" ? "Monthly" : "Annual"}
                {b === "annual" && <span className="ml-2 rounded-full bg-sky-50 px-2 py-0.5 text-[11px] text-sky-700">Save 16%</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3 lg:mt-20 lg:gap-6">
          {plans.map((p, i) => {
            const featured = p.id === highlight
            return (
              <Reveal key={p.id} delay={i * 0.06} as="article" className={cn("flex flex-col rounded-(--radius-photo) p-6 sm:p-8", featured ? "bg-sky text-on-sky shadow-(--shadow-sky)" : "bg-raised shadow-(--shadow-card)")}>
                <div className="flex items-center justify-between gap-4">
                  <h3 className="type-head text-h4">{p.name}</h3>
                  {featured && <span className="rounded-full bg-on-sky/15 px-2.5 py-1 text-micro">Most booked</span>}
                </div>
                <p className={cn("mt-2 text-body", featured ? "text-on-sky-soft" : "text-ink-3")}>{p.lede}</p>
                <p className="type-head mt-10 flex items-baseline gap-2">
                  <AnimatedNumber value={billing === "annual" ? p.annual : p.monthly} prefix="$" className="text-display" />
                  <span className={cn("text-micro", featured ? "text-on-sky-soft" : "text-ink-3")}>{p.unit}</span>
                </p>
                <p className={cn("mt-2 min-h-[2.8em] text-micro", featured ? "text-on-sky-soft" : "text-ink-3")}>{p.note(billing)}</p>
                <ul className={cn("mt-6 flex flex-col gap-3 border-t pt-6 text-body", featured ? "border-on-sky/25" : "border-line")}>
                  {p.perks.map((perk) => (
                    <li key={perk} className="flex gap-3">
                      <Check className={cn("mt-1 size-4 shrink-0", featured ? "text-on-sky" : "text-sky")} />
                      {perk}
                    </li>
                  ))}
                </ul>
                <ButtonLink href="#book" variant={featured ? "cream" : "outline"} className="mt-10 w-full sm:w-fit">
                  {p.cta}
                </ButtonLink>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
