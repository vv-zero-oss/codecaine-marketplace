import { Bus, Coffee, ReceiptText, ShoppingBag, Tv, Wallet, type LucideIcon } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"

import { Container } from "@/components/ui/container"
import { AppIcon } from "@/components/ui/app-icon"
import { Reveal } from "@/components/motion/reveal"

const ROWS: { merchant: string; when: string; amount: string; tag: string; icon: LucideIcon }[] = [
  { merchant: "Streamly", when: "30 Nov, 12:15 AM", amount: "$13", tag: "Subscription", icon: Tv },
  { merchant: "Cabco", when: "Today, 9:30 AM", amount: "$16", tag: "Transport", icon: Bus },
  { merchant: "Market & Co", when: "Today, 6:21 PM", amount: "$38", tag: "Shopping", icon: ShoppingBag },
  { merchant: "Blue Bottle", when: "Today, 11:17 AM", amount: "$5", tag: "Food & drinks", icon: Coffee },
]

export function TransactionRow({ merchant, when, amount, tag, icon: Glyph }: (typeof ROWS)[number]) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-white px-4 py-3 shadow-card">
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold">{merchant}</p>
        <p className="text-xs text-ink-400">{when}</p>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1">
        <span className="tabular text-base font-bold">{amount}</span>
        <span className="flex items-center gap-1 rounded-md bg-ink-50 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-ink-600 uppercase">
          <Glyph className="size-3" /> {tag}
        </span>
      </div>
    </div>
  )
}

/** Step one of the story: nothing to type. Rows land in the list by themselves. */
export function AutoLog() {
  const reduced = useReducedMotion()
  return (
    <section className="bg-white py-16 sm:py-24">
      <Container className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
        <div className="space-y-3 md:order-1">
          {ROWS.map((row, index) => (
            <motion.div
              key={row.merchant}
              initial={reduced ? false : { opacity: 0, y: 20, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <TransactionRow {...row} />
            </motion.div>
          ))}
        </div>
        <div className="md:order-2">
          <Reveal direction="left" distance={20}>
            <AppIcon icon={Wallet} />
            <h2 className="mt-5 text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.02] font-extrabold tracking-[-0.03em] text-balance">
              Stop logging expenses by hand.
            </h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {["No receipts to scan", "No texts to forward"].map((label) => (
                <span key={label} className="inline-flex items-center gap-1.5 rounded-full bg-ink-100 px-3 py-1.5 text-xs font-semibold text-ink-600">
                  <ReceiptText className="size-3.5" /> {label}
                </span>
              ))}
            </div>
            <p className="mt-5 max-w-md text-base leading-relaxed text-ink-600">
              It is easy to forget, fall off the wagon, and miss a week. Tally records every payment
              the moment your bank does, with the merchant, the time and the amount already filled
              in. You get to relax and focus on things that matter more than tracking expenses.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
