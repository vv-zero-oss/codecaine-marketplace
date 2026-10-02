import { Bus, ChevronDown, Coffee, ReceiptText, ShoppingBag, Tv, Wallet, type LucideIcon } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useState } from "react"
import { useCanvasAction } from "@canvas/react"

import { Container } from "@/components/ui/container"
import { AppIcon } from "@/components/ui/app-icon"
import { Reveal } from "@/components/motion/reveal"
import { cn } from "@/lib/utils"

const ICONS: Record<string, LucideIcon> = {
  Subscription: Tv,
  Transport: Bus,
  Shopping: ShoppingBag,
  "Food & drinks": Coffee,
}
const CATEGORIES = Object.keys(ICONS)

type Row = { merchant: string; when: string; amount: string; tag: string }

const ROWS: Row[] = [
  { merchant: "Streamly", when: "30 Nov, 12:15 AM", amount: "$13", tag: "Subscription" },
  { merchant: "Cabco", when: "Today, 9:30 AM", amount: "$16", tag: "Transport" },
  { merchant: "Market & Co", when: "Today, 6:21 PM", amount: "$38", tag: "Shopping" },
  { merchant: "Blue Bottle", when: "Today, 11:17 AM", amount: "$5", tag: "Food & drinks" },
]

/**
 * One payment. With `onToggle` it becomes a button that opens a drawer under the
 * row: tap a category there and the label swaps in place. Purpose: feedback and
 * state indication: the app visibly learns from the correction.
 */
export function TransactionRow({
  merchant,
  when,
  amount,
  tag,
  open = false,
  onToggle,
  onRecategorise,
}: Row & { open?: boolean; onToggle?: () => void; onRecategorise?: (tag: string) => void }) {
  const Glyph = ICONS[tag] ?? Tv
  const reduced = useReducedMotion()
  const face = (
    <>
      <div className="min-w-0 text-left">
        <p className="truncate text-sm font-semibold">{merchant}</p>
        <p className="text-xs text-ink-400">{when}</p>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <div className="flex flex-col items-end gap-1">
          <span className="tabular text-base font-bold">{amount}</span>
          <span className="relative flex h-5 items-center overflow-hidden rounded-md bg-ink-50 px-1.5 text-[10px] font-semibold tracking-wide text-ink-600 uppercase">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={tag}
                className="flex items-center gap-1"
                initial={reduced ? false : { opacity: 0, transform: "translateY(6px)" }}
                animate={{ opacity: 1, transform: "translateY(0px)" }}
                exit={{ opacity: 0, transform: "translateY(-6px)" }}
                transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              >
                <Glyph className="size-3" /> {tag}
              </motion.span>
            </AnimatePresence>
          </span>
        </div>
        {onToggle ? <ChevronDown className={cn("size-4 text-ink-400 transition-transform duration-200 ease-[var(--ease-out)]", open && "rotate-180")} /> : null}
      </div>
    </>
  )
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-card transition-[box-shadow,transform] duration-200 ease-[var(--ease-out)] [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-0.5 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-lift">
      {onToggle ? (
        <button type="button" aria-expanded={open} onClick={onToggle} className="flex w-full items-center justify-between gap-3 px-4 py-3 transition-transform duration-150 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none focus-visible:ring-inset">
          {face}
        </button>
      ) : (
        <div className="flex items-center justify-between gap-3 px-4 py-3">{face}</div>
      )}
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-ink-100 px-4 pt-3 pb-4">
              <p className="text-[11px] font-semibold tracking-wider text-ink-400 uppercase">Wrong category? Teach Tally</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => onRecategorise?.(category)}
                    className={cn(
                      "rounded-full px-2.5 py-1 text-[11px] font-semibold transition-[background-color,color,transform] duration-150 ease-out active:scale-95",
                      category === tag ? "bg-ink-900 text-white" : "bg-ink-100 text-ink-600 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-ink-200",
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-xs text-ink-400">Harbor National Bank · Checking ••4821 · matched automatically</p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

/** Step one of the story: nothing to type. Rows land by themselves; tap one to open it. */
export function AutoLog() {
  const reduced = useReducedMotion()
  const [rows, setRows] = useState(ROWS)
  const [open, setOpen] = useState<number | null>(null)
  useCanvasAction("First payment open", (next) => setOpen(next === false ? null : next === true ? 1 : open === 1 ? null : 1), { on: open === 1, group: "Payments" })

  return (
    <section className="bg-white py-16 sm:py-24">
      <Container className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
        <div className="space-y-3 md:order-1">
          {rows.map((row, index) => (
            <motion.div
              key={row.merchant}
              initial={reduced ? false : { opacity: 0, transform: "translateY(20px) scale(0.97)" }}
              whileInView={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.6, delay: index * 0.12, ease: [0.23, 1, 0.32, 1] }}
            >
              <TransactionRow
                {...row}
                open={open === index}
                onToggle={() => setOpen(open === index ? null : index)}
                onRecategorise={(tag) => setRows((current) => current.map((r, i) => (i === index ? { ...r, tag } : r)))}
              />
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
              in. Tap any payment to see how it was matched, or teach Tally a better category.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
