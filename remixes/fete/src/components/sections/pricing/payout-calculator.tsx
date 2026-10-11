import { useState } from "react"
import { motion } from "motion/react"

import { SectionHeading } from "@/components/blocks/section-heading"
import { Container } from "@/components/ui/container"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

/** Card processing, which every plan pays: 2.9% + 30¢ a ticket. */
const card = (price: number) => price * 0.029 + 0.3

/**
 * What you take home: set a ticket price and a crowd, and the bar splits
 * the gross into your payout, our fee and the card network's — for both
 * plans, so the break-even point is something you can see, not read.
 */
export function PayoutCalculator() {
  const [price, setPrice] = useState(25)
  const [guests, setGuests] = useState(80)
  const gross = price * guests
  const cards = card(price) * guests
  const feeFree = (price * 0.05 + 0.3) * guests
  const plusMonthly = 59
  const takeFree = Math.max(0, gross - cards - feeFree)
  const takePlus = Math.max(0, gross - cards - plusMonthly)
  const better = takePlus > takeFree ? "plus" : "free"

  const rows = [
    { id: "free", label: "On Free", take: takeFree, fee: feeFree, feeLabel: "Fête fee" },
    { id: "plus", label: "On Plus", take: takePlus, fee: plusMonthly, feeLabel: "Plus, one month" },
  ] as const

  return (
    <section className="py-section">
      <Container className="max-w-[1080px]">
        <SectionHeading size="loud" eyebrow="Payouts" title="See what you take home." continuation="Before you sell a ticket." />
        <div className="grid gap-10 rounded-[28px] bg-panel p-6 sm:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="flex flex-col gap-10">
            <div>
              <div className="mb-4 flex items-baseline justify-between">
                <span className="text-[15px] font-medium text-ink-2">Ticket price</span>
                <span className="text-h4 font-semibold text-ink tabular-nums">${price}</span>
              </div>
              <Slider value={[price]} min={5} max={150} step={1} onValueChange={([v]) => setPrice(v)} aria-label="Ticket price" />
            </div>
            <div>
              <div className="mb-4 flex items-baseline justify-between">
                <span className="text-[15px] font-medium text-ink-2">Guests a month</span>
                <span className="text-h4 font-semibold text-ink tabular-nums">{guests}</span>
              </div>
              <Slider value={[guests]} min={10} max={1000} step={10} onValueChange={([v]) => setGuests(v)} aria-label="Guests a month" />
            </div>
            <p className="text-[15px] leading-relaxed text-ink-3">
              Gross <span className="font-medium text-ink tabular-nums">${gross.toLocaleString("en-US")}</span>. Card processing ({`2.9% + 30¢`}) is the same on both plans and goes to the card network, not to us.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            {rows.map((r) => (
              <div key={r.id} className={cn("rounded-(--radius-panel) bg-raised p-5 transition-shadow duration-(--duration-swap)", better === r.id ? "shadow-[0_0_0_1.5px_var(--color-ink),var(--shadow-card)]" : "shadow-(--shadow-xs)")}>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-[15px] font-medium text-ink-2">
                    {r.label}
                    {better === r.id && <span className="ml-2 rounded-full bg-ink px-2 py-0.5 text-[12px] text-page">Better for you</span>}
                  </span>
                  <span className="text-[clamp(32.94px,4vw,41.89px)] font-semibold tracking-[-0.04em] text-ink">
                    <span className="tabular-nums">${Math.round(r.take).toLocaleString("en-US")}</span>
                  </span>
                </div>
                <div className="mt-4 flex h-3 gap-0.5 overflow-hidden rounded-full" aria-hidden>
                  <motion.span className="h-full rounded-l-full bg-ink" animate={{ flexGrow: r.take }} transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }} style={{ flexBasis: 0 }} />
                  <motion.span className="h-full flare-fill" animate={{ flexGrow: r.fee }} transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }} style={{ flexBasis: 0 }} />
                  <motion.span className="h-full rounded-r-full bg-ink-4" animate={{ flexGrow: cards }} transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }} style={{ flexBasis: 0 }} />
                </div>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[13px] text-ink-3 tabular-nums">
                  <span className="inline-flex items-center gap-1.5"><span className="size-2 rounded-full bg-ink" /> You</span>
                  <span className="inline-flex items-center gap-1.5"><span className="size-2 rounded-full flare-fill" /> {r.feeLabel} ${Math.round(r.fee).toLocaleString("en-US")}</span>
                  <span className="inline-flex items-center gap-1.5"><span className="size-2 rounded-full bg-ink-4" /> Cards ${Math.round(cards).toLocaleString("en-US")}</span>
                </div>
              </div>
            ))}
            <p className="text-[14px] text-ink-3">
              {better === "plus"
                ? `Plus pays for itself here — you keep $${Math.round(takePlus - takeFree).toLocaleString("en-US")} more a month.`
                : `Stay on Free for now — Plus starts paying off at about ${Math.ceil(59 / (price * 0.05 + 0.3))} paid guests a month.`}
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
