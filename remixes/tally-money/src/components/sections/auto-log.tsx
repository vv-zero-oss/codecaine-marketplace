import { Bus, ChevronDown, Coffee, ReceiptText, ShoppingBag, Tv, Wallet, type LucideIcon } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useEffect, useRef, useState } from "react"
import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"

import { Container } from "@/components/ui/container"
import { Display } from "@/components/ui/display"
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
type FeedRow = Row & { id: number }

const POOL: Row[] = [
  { merchant: "Olive & Rye", when: "Just now", amount: "$54", tag: "Food & drinks" },
  { merchant: "Metro Pass", when: "Just now", amount: "$22", tag: "Transport" },
  { merchant: "Paper & Pine", when: "Just now", amount: "$31", tag: "Shopping" },
  { merchant: "Streamly", when: "Just now", amount: "$13", tag: "Subscription" },
  { merchant: "Corner Cafe", when: "Just now", amount: "$4", tag: "Food & drinks" },
  { merchant: "Cabco", when: "Just now", amount: "$19", tag: "Transport" },
]

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

/**
 * Step one of the story: nothing to type. New payments arrive at the top of the
 * list on their own, every `interval` ms; hover or open a row and it holds still.
 * Purpose: explanation: show the thing happening, not describe it.
 */
export function AutoLog({ interval = 3800, paused = false }: { interval?: number; paused?: boolean }) {
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = paused || reduced || designing
  const nextId = useRef(ROWS.length)
  const [rows, setRows] = useState<FeedRow[]>(() => ROWS.map((r, id) => ({ ...r, id })))
  const [open, setOpen] = useState<number | null>(null)
  const [matched, setMatched] = useState(12)
  const hover = useRef(false)
  useCanvasAction("First payment open", (next) => setOpen(next === false ? null : next === true ? rows[0].id : open === rows[0].id ? null : rows[0].id), { on: open === rows[0]?.id, group: "Payments" })

  useEffect(() => {
    if (still) return
    const timer = window.setInterval(() => {
      if (hover.current || open !== null) return
      const pick = POOL[nextId.current % POOL.length]
      const id = nextId.current++
      setRows((cur) => [{ ...pick, id }, ...cur].slice(0, 4))
      setMatched((n) => n + 1)
    }, interval)
    return () => window.clearInterval(timer)
  }, [still, interval, open])

  return (
    <section className="bg-ink-50 py-20 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="lg:order-2">
          <Reveal direction="left" distance={20}>
            <AppIcon icon={Wallet} tone="green" />
            <Display className="mt-6">
              Stop logging expenses by hand.
            </Display>
            <div className="mt-6 flex flex-wrap gap-2">
              {["No receipts to scan", "No texts to forward"].map((label) => (
                <span key={label} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-xs font-semibold text-ink-600 shadow-card">
                  <ReceiptText className="size-3.5" /> {label}
                </span>
              ))}
            </div>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-600">
              It is easy to forget, fall off the wagon, and miss a week. Tally records every payment
              the moment your bank does, with the merchant, the time and the amount already filled
              in. Tap any payment to see how it was matched, or teach Tally a better category.
            </p>
          </Reveal>
        </div>
        <div className="lg:order-1" onPointerEnter={() => (hover.current = true)} onPointerLeave={() => (hover.current = false)}>
          <div className="mb-3 flex items-center justify-between px-1 text-[11px] font-semibold tracking-wider text-ink-600 uppercase">
            <span className="flex items-center gap-2">
              <span className="relative flex size-2">
                <span className={cn("absolute inline-flex size-full rounded-full bg-leaf-500 opacity-60", !still && "animate-ping")} />
                <span className="relative inline-flex size-2 rounded-full bg-leaf-500" />
              </span>
              Live from your bank
            </span>
            <span className="tabular">{matched} matched today</span>
          </div>
          <ul className="space-y-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {rows.map((row) => (
                <motion.li
                  key={row.id}
                  layout={!reduced}
                  initial={reduced ? false : { opacity: 0, transform: "translateY(-24px) scale(0.96)" }}
                  animate={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
                  exit={{ opacity: 0, transform: "translateY(16px) scale(0.97)" }}
                  transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
                >
                  <TransactionRow
                    {...row}
                    open={open === row.id}
                    onToggle={() => setOpen(open === row.id ? null : row.id)}
                    onRecategorise={(tag) => setRows((cur) => cur.map((r) => (r.id === row.id ? { ...r, tag } : r)))}
                  />
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </Container>
    </section>
  )
}
