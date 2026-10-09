import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Check, CreditCard, FileText, Landmark, Loader2, Minus, Plus, RefreshCw } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { AppWindow, MockLabel } from "@/components/mock/page-app-window"
import { MiniCard } from "@/components/mock/page-mini-card"
import { KestrelMark } from "@/components/site/logo"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { money } from "@/lib/photos"
import { cn } from "@/lib/utils"

type View = "cards" | "bills" | "accounting"

const NAV: { id: View; label: string; icon: typeof CreditCard }[] = [
  { id: "cards", label: "Cards", icon: CreditCard },
  { id: "bills", label: "Bills", icon: FileText },
  { id: "accounting", label: "Accounting", icon: Landmark },
]

/* ------------------------------------------------------------------ Cards */

const CARDS = [
  { id: "c1", holder: "Ada Lindqvist", name: "Design tools", last4: "4021", limit: 3000, spent: 2140 },
  { id: "c2", holder: "Rafael Ortiz", name: "Field sales travel", last4: "7713", limit: 8000, spent: 3360 },
  { id: "c3", holder: "Noor Haddad", name: "Office & snacks", last4: "0598", limit: 1200, spent: 1104 },
  { id: "c4", holder: "Theo Brandt", name: "Cloud hosting", last4: "3307", limit: 15000, spent: 9820 },
]

function CardsView() {
  const [selected, setSelected] = useState("c1")
  const [limits, setLimits] = useState<Record<string, number>>(() => Object.fromEntries(CARDS.map((c) => [c.id, c.limit])))
  const [frozen, setFrozen] = useState<Record<string, boolean>>({})
  const card = CARDS.find((c) => c.id === selected)!
  const limit = limits[card.id]
  const step = (delta: number) => setLimits((all) => ({ ...all, [card.id]: Math.max(500, all[card.id] + delta) }))

  return (
    <div className="grid gap-4 md:grid-cols-[1fr_220px]">
      <div className="flex flex-col">
        <MockLabel className="mb-2">Cards · {CARDS.length} active</MockLabel>
        <ul className="flex flex-col gap-1">
          {CARDS.map((c) => {
            const use = Math.min(1, c.spent / limits[c.id])
            return (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => setSelected(c.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-(--radius-field) px-2.5 py-2 text-left transition-colors duration-(--duration-hover)",
                    selected === c.id ? "bg-panel" : "hover:bg-panel/60",
                  )}
                >
                  <span className={cn("grid size-7 shrink-0 place-items-center rounded-[5px] bg-metal text-night-fg", frozen[c.id] && "opacity-50")}>
                    <KestrelMark className="size-3" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-medium text-ink">{c.name}</span>
                    <span className="block truncate text-[12px] text-ink-3">{c.holder} · •• {c.last4}</span>
                  </span>
                  <span className="hidden w-24 flex-col items-end gap-1 sm:flex">
                    <span className="text-[12px] tabular-nums text-ink-2">{money(c.spent, false)}</span>
                    <span className="h-1 w-full overflow-hidden rounded-full bg-line">
                      <span
                        className={cn("block h-full rounded-full transition-[width] duration-(--duration-swap) ease-(--ease-out-strong)", use > 0.9 ? "bg-signal-amber" : "bg-ink")}
                        style={{ width: `${use * 100}%` }}
                      />
                    </span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="flex flex-col gap-3 rounded-(--radius-card) bg-panel p-3">
        <MiniCard holder={card.holder} last4={card.last4} frozen={!!frozen[card.id]} />
        <div>
          <MockLabel>Monthly limit</MockLabel>
          <div className="mt-1 flex items-center justify-between gap-2">
            <button type="button" aria-label="Lower limit" onClick={() => step(-500)} className="grid size-7 place-items-center rounded-(--radius-field) bg-raised shadow-(--shadow-field) transition-transform active:scale-95">
              <Minus className="size-3.5" />
            </button>
            <span className="text-[17px] font-medium tabular-nums">{money(limit, false)}</span>
            <button type="button" aria-label="Raise limit" onClick={() => step(500)} className="grid size-7 place-items-center rounded-(--radius-field) bg-raised shadow-(--shadow-field) transition-transform active:scale-95">
              <Plus className="size-3.5" />
            </button>
          </div>
          <p className="mt-1 text-[11.5px] text-ink-3">{money(Math.max(0, limit - card.spent), false)} left this month</p>
        </div>
        <label className="flex items-center justify-between text-[13px] text-ink-2">
          Freeze card
          <Switch checked={!!frozen[card.id]} onCheckedChange={(on) => setFrozen((all) => ({ ...all, [card.id]: on }))} />
        </label>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ Bills */

type BillStatus = "review" | "scheduled" | "paid"
const BILLS: { id: string; vendor: string; due: string; amount: number; status: BillStatus }[] = [
  { id: "b1", vendor: "Hollis Print Co.", due: "Oct 14", amount: 4280, status: "review" },
  { id: "b2", vendor: "Northgate Logistics", due: "Oct 16", amount: 12950, status: "review" },
  { id: "b3", vendor: "Marlow Legal LLP", due: "Oct 21", amount: 6400, status: "scheduled" },
  { id: "b4", vendor: "Fernbank Facilities", due: "Oct 02", amount: 1875, status: "paid" },
  { id: "b5", vendor: "Quarry Cloud", due: "Oct 28", amount: 22310, status: "review" },
]
const BILL_BADGE: Record<BillStatus, { label: string; variant: "amber" | "blue" | "green" }> = {
  review: { label: "Needs approval", variant: "amber" },
  scheduled: { label: "Scheduled", variant: "blue" },
  paid: { label: "Paid", variant: "green" },
}

function BillsView() {
  const [bills, setBills] = useState(BILLS)
  const [filter, setFilter] = useState<"all" | BillStatus>("all")
  const shown = bills.filter((b) => filter === "all" || b.status === filter)
  const pending = bills.filter((b) => b.status === "review")
  const approve = (id: string) => setBills((all) => all.map((b) => (b.id === id ? { ...b, status: "scheduled" } : b)))

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex gap-1 rounded-(--radius-field) bg-panel p-0.5 text-[12px]">
          {(["all", "review", "scheduled", "paid"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn("rounded-[5px] px-2 py-1 transition-colors duration-(--duration-hover)", filter === f ? "bg-raised text-ink shadow-(--shadow-xs)" : "text-ink-3 hover:text-ink")}
            >
              {f === "all" ? "All" : BILL_BADGE[f].label}
            </button>
          ))}
        </div>
        <button
          type="button"
          disabled={!pending.length}
          onClick={() => setBills((all) => all.map((b) => (b.status === "review" ? { ...b, status: "scheduled" } : b)))}
          className="rounded-(--radius-field) bg-lime px-2.5 py-1 text-[12px] font-medium text-lime-ink shadow-(--shadow-button) transition-[transform,opacity] active:scale-[0.97] disabled:opacity-40"
        >
          Approve all ({pending.length})
        </button>
      </div>
      <ul className="flex min-h-[220px] flex-col">
        <AnimatePresence initial={false} mode="popLayout">
          {shown.map((b) => (
            <motion.li
              key={b.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="flex items-center gap-3 border-b border-line py-2 last:border-0"
            >
              <span className="grid size-7 shrink-0 place-items-center rounded-[5px] bg-panel text-[11px] font-medium text-ink-2">{b.vendor.slice(0, 2)}</span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-medium">{b.vendor}</span>
                <span className="block text-[12px] text-ink-3">Due {b.due}</span>
              </span>
              <span className="text-[13px] tabular-nums">{money(b.amount, false)}</span>
              {b.status === "review" ? (
                <button type="button" onClick={() => approve(b.id)} className="w-[104px] rounded-(--radius-field) bg-raised px-2 py-1 text-[12px] font-medium shadow-(--shadow-field) transition-[transform,background-color] hover:bg-panel active:scale-[0.97]">
                  Approve
                </button>
              ) : (
                <Badge variant={BILL_BADGE[b.status].variant} className="w-[104px]">{BILL_BADGE[b.status].label}</Badge>
              )}
            </motion.li>
          ))}
        </AnimatePresence>
        {!shown.length && <li className="py-10 text-center text-[13px] text-ink-3">Nothing here — you're all caught up.</li>}
      </ul>
    </div>
  )
}

/* ------------------------------------------------------------- Accounting */

const CLOSE_STEPS = [
  { id: "s1", label: "Card transactions coded", auto: true },
  { id: "s2", label: "Receipts matched", auto: true },
  { id: "s3", label: "Bills accrued", auto: true },
  { id: "s4", label: "Prepaids amortised", auto: false },
  { id: "s5", label: "Bank reconciled", auto: false },
  { id: "s6", label: "Controller review", auto: false },
]

function AccountingView() {
  const [done, setDone] = useState<Record<string, boolean>>(() => Object.fromEntries(CLOSE_STEPS.map((s) => [s.id, s.auto])))
  const [sync, setSync] = useState<"idle" | "running" | "done">("idle")
  const count = Object.values(done).filter(Boolean).length
  const progress = count / CLOSE_STEPS.length
  const runSync = () => {
    if (sync === "running") return
    setSync("running")
    window.setTimeout(() => setSync("done"), 1400)
  }

  return (
    <div className="grid gap-4 md:grid-cols-[1fr_200px]">
      <div>
        <div className="flex items-center justify-between">
          <MockLabel>October close</MockLabel>
          <span className="text-[12px] tabular-nums text-ink-3">{count}/{CLOSE_STEPS.length}</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
          <div className="h-full rounded-full bg-ink transition-[width] duration-(--duration-swap) ease-(--ease-out-strong)" style={{ width: `${progress * 100}%` }} />
        </div>
        <ul className="mt-3 flex flex-col gap-0.5">
          {CLOSE_STEPS.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => setDone((all) => ({ ...all, [s.id]: !all[s.id] }))}
                className="flex w-full items-center gap-2.5 rounded-(--radius-field) px-1.5 py-1.5 text-left text-[13px] transition-colors hover:bg-panel"
              >
                <span className={cn("grid size-4 shrink-0 place-items-center rounded-[4px] transition-colors duration-(--duration-hover)", done[s.id] ? "bg-ink text-page" : "shadow-(--shadow-field)")}>
                  {done[s.id] && <Check className="size-3" strokeWidth={3} />}
                </span>
                <span className={cn("flex-1", done[s.id] ? "text-ink-3 line-through decoration-ink-4" : "text-ink")}>{s.label}</span>
                {s.auto && <Badge variant="lime" className="text-[10.5px]">Auto</Badge>}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col justify-between gap-3 rounded-(--radius-card) bg-panel p-3">
        <div>
          <MockLabel>Ledger sync</MockLabel>
          <p className="mt-1 text-[24px] font-medium tracking-[-0.03em] tabular-nums">{sync === "done" ? "1,284" : "1,231"}</p>
          <p className="text-[12px] text-ink-3">transactions in your ledger</p>
        </div>
        <button
          type="button"
          onClick={runSync}
          className="inline-flex items-center justify-center gap-1.5 rounded-(--radius-field) bg-raised px-2.5 py-1.5 text-[12px] font-medium shadow-(--shadow-field) transition-transform active:scale-[0.97]"
        >
          {sync === "running" ? <Loader2 className="size-3.5 animate-spin" /> : sync === "done" ? <Check className="size-3.5 text-signal-green" /> : <RefreshCw className="size-3.5" />}
          {sync === "running" ? "Syncing…" : sync === "done" ? "53 new synced" : "Sync now"}
        </button>
        <button
          type="button"
          disabled={progress < 1}
          className="rounded-(--radius-field) bg-lime px-2.5 py-1.5 text-[12px] font-medium text-lime-ink shadow-(--shadow-button) transition-[transform,opacity] active:scale-[0.97] disabled:opacity-40"
          onClick={() => setDone(Object.fromEntries(CLOSE_STEPS.map((s) => [s.id, s.auto])))}
        >
          {progress < 1 ? "Tick every step to close" : "Close October · start over"}
        </button>
      </div>
    </div>
  )
}

const VIEWS: Record<View, () => React.ReactNode> = { cards: CardsView, bills: BillsView, accounting: AccountingView }

/**
 * The platform hero's product: a window whose sidebar really switches
 * between a cards view, a bills queue and the month-end close — every
 * control in each one works. Views cross-fade with a touch of blur.
 */
export function ProductWindow({ initialView = "cards", className }: { initialView?: View; className?: string }) {
  const [view, setView] = useState<View>(initialView)
  const reduced = useReducedMotion()
  const show = (id: View) => (next?: boolean) => { if (next ?? view !== id) setView(id) }
  useCanvasAction("Product demo: Cards", show("cards"), { on: view === "cards", group: "Platform" })
  useCanvasAction("Product demo: Bills", show("bills"), { on: view === "bills", group: "Platform" })
  useCanvasAction("Product demo: Accounting", show("accounting"), { on: view === "accounting", group: "Platform" })
  const Body = VIEWS[view]

  return (
    <AppWindow title="Kestrel — Acme Robotics" className={className} bodyClassName="grid min-h-[380px] sm:grid-cols-[168px_1fr]">
      <nav aria-label="Product demo" className="flex gap-1 overflow-x-auto border-b border-line bg-panel/50 p-2 sm:flex-col sm:border-r sm:border-b-0">
        <span className="hidden items-center gap-1.5 px-2 pt-1 pb-3 text-[13px] font-semibold tracking-[-0.03em] sm:flex">
          <KestrelMark className="size-3.5" /> Acme Robotics
        </span>
        {NAV.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setView(item.id)}
            aria-current={view === item.id ? "page" : undefined}
            className={cn(
              "relative flex min-h-9 shrink-0 items-center gap-2 rounded-(--radius-field) px-2.5 text-[13px] transition-colors duration-(--duration-hover)",
              view === item.id ? "text-ink" : "text-ink-3 hover:text-ink",
            )}
          >
            {view === item.id && (
              <motion.span
                layoutId="product-window-nav"
                className="absolute inset-0 rounded-(--radius-field) bg-raised shadow-(--shadow-card)"
                transition={reduced ? { duration: 0 } : { type: "spring", duration: 0.35, bounce: 0.12 }}
              />
            )}
            <item.icon className="relative size-4" strokeWidth={1.7} />
            <span className="relative">{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="relative min-w-0 p-4">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={view}
            initial={reduced ? { opacity: 0 } : { opacity: 0, filter: "blur(4px)", transform: "translateY(6px)" }}
            animate={{ opacity: 1, filter: "blur(0px)", transform: "translateY(0px)" }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          >
            <Body />
          </motion.div>
        </AnimatePresence>
      </div>
    </AppWindow>
  )
}
