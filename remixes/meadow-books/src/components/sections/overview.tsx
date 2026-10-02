import { ArrowLeftRight, Camera, ChevronDown, FileSpreadsheet, Landmark, LineChart, ReceiptText, Send } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useState } from "react"
import { useCanvasAction } from "@canvas/react"

import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

const FEATURES = [
  {
    id: "transactions",
    icon: ArrowLeftRight,
    title: "Transactions & receipts",
    body: "Connect your banks and cards, snap or forward receipts. Meadow reads each one, codes it, and matches it to the payment — no typing, no shoebox.",
    replaces: [FileSpreadsheet, Camera],
  },
  { id: "invoices", icon: Send, title: "Invoicing & payments", body: "Create, send and chase invoices in a few clicks. When the payment lands, it reconciles itself and the invoice marks as paid." },
  { id: "reconcile", icon: Landmark, title: "Reconciliation", body: "Bank lines match to your books continuously, so month-end is a short review of exceptions instead of a project." },
  { id: "reports", icon: LineChart, title: "Reports & tax", body: "Live profit and loss, balance sheet and cash flow, with tax set-asides worked out as you post." },
]

const TXNS = [
  { name: "Blue Bottle Coffee", amount: "−$18.50", cat: "Meals", tone: "bg-apricot/20 text-apricot", note: "Receipt matched" },
  { name: "Stripe payout", amount: "+$4,210.00", cat: "Sales", tone: "bg-teal/20 text-teal", note: "24 charges grouped" },
  { name: "Figma", amount: "−$45.00", cat: "Software", tone: "bg-sky-100 text-sky-600", note: "Recurring · rule applied" },
]

function TransactionsPanel() {
  return (
    <div className="flex w-full max-w-[330px] flex-col gap-2 text-[11px] text-ink-900">
      {TXNS.map((t) => (
        <div key={t.name} className="rounded-lg bg-surface p-3 leading-snug shadow-lift">
          <div className="flex items-center gap-2">
            <span className="font-semibold">{t.name}</span>
            <span className={cn("ml-auto font-semibold tabular-nums", t.amount.startsWith("+") && "text-leaf")}>{t.amount}</span>
          </div>
          <div className="mt-1.5 flex items-center gap-2">
            <span className={cn("rounded px-1.5 py-0.5 text-[9px] font-semibold", t.tone)}>{t.cat}</span>
            <span className="text-ink-400">{t.note}</span>
          </div>
        </div>
      ))}
      <div className="rounded-lg bg-surface p-3 shadow-lift">
        <p className="mb-1.5 text-ink-400">Meadow suggests</p>
        <p>Code <strong className="font-semibold">AWS · $312.40</strong> to Hosting — same as last 11 months.</p>
        <div className="mt-2 flex items-center gap-2">
          <span className="inline-flex h-6 items-center gap-1 rounded bg-sky-600 px-2 font-medium text-white">Approve <ChevronDown className="size-3" /></span>
          <span className="text-ink-400">98% confident</span>
        </div>
      </div>
    </div>
  )
}

function ListPanel({ rows }: { rows: { label: string; meta: string; tone: string }[] }) {
  return (
    <ul className="flex w-full max-w-[310px] flex-col gap-2 text-[12px]">
      {rows.map((r) => (
        <li key={r.label} className="flex items-center gap-2.5 rounded-lg bg-surface p-3 shadow-lift">
          <span className={cn("size-2 rounded-full", r.tone)} />
          <span className="font-medium">{r.label}</span>
          <span className="ml-auto text-ink-400 tabular-nums">{r.meta}</span>
        </li>
      ))}
    </ul>
  )
}

function ReconcilePanel() {
  return (
    <div className="flex w-full max-w-[310px] flex-col gap-2.5 text-[12px]">
      <div className="rounded-lg bg-surface p-3.5 shadow-lift">
        <p className="flex items-baseline justify-between"><span className="font-semibold">Operating ••4417</span><span className="text-ink-400">March</span></p>
        <p className="mt-2 flex items-baseline gap-1.5"><span className="font-display text-[26px] font-semibold tracking-[-0.04em] tabular-nums">125</span><span className="text-ink-500">of 128 lines matched</span></p>
        <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-ink-100"><span className="block h-full w-[97%] rounded-full bg-leaf" /></span>
      </div>
      <ListPanel rows={[{ label: "Duplicate charge — Figma", meta: "$45.00", tone: "bg-coral" }, { label: "No receipt — Train tickets", meta: "$86.20", tone: "bg-apricot" }]} />
    </div>
  )
}

const PANELS: Record<string, React.ReactNode> = {
  transactions: <TransactionsPanel />,
  invoices: <ListPanel rows={[
    { label: "INV-1042 · Tallow", meta: "Paid", tone: "bg-leaf" },
    { label: "INV-1043 · Orchard Row", meta: "Due in 6 days", tone: "bg-apricot" },
    { label: "INV-1039 · Larkfield", meta: "12 days late", tone: "bg-coral" },
  ]} />,
  reconcile: <ReconcilePanel />,
  reports: <ListPanel rows={[
    { label: "Revenue", meta: "$84,200", tone: "bg-teal" },
    { label: "Expenses", meta: "$51,730", tone: "bg-periwinkle" },
    { label: "Net profit", meta: "$32,470", tone: "bg-leaf" },
  ]} />,
}

/**
 * Four jobs, one list. The open item shows what it does and the panel on the
 * right shows it happening; the others stay as quiet titles until chosen.
 */
export function Overview() {
  const [active, setActive] = useState("transactions")
  const reduce = useReducedMotion()
  useCanvasAction("Overview tab", (next) => setActive(typeof next === "string" ? next : "transactions"), { group: "Overview" })

  return (
    <section id="overview" className="bg-page py-16 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading title="Everything your books need, in one clearing" description="From the first receipt to the final report, every step of the books lives in one place." />
        </Reveal>
        <Reveal delay={0.08} className="mt-8">
          <Tabs value={active} onValueChange={setActive} orientation="vertical" className="grid overflow-hidden rounded-[var(--radius-card)] bg-surface-muted shadow-lift md:grid-cols-2">
            <TabsList className="flex-col gap-0 p-6 sm:p-8 md:py-10" aria-label="Product areas">
              {FEATURES.map((f) => {
                const open = f.id === active
                const Icon = f.icon
                return (
                  <TabsTrigger
                    key={f.id}
                    value={f.id}
                    className="group h-auto w-full flex-col items-stretch gap-0 rounded-none border-b border-ink-100 bg-transparent px-1 py-4 text-left last:border-b-0 hover:bg-transparent data-[state=active]:bg-transparent"
                  >
                    <span className={cn("flex items-center gap-3 font-display text-[20px] font-semibold tracking-[-0.02em] transition-colors duration-200", open ? "text-ink-900" : "text-ink-500")}>
                      <Icon className="size-4 shrink-0 text-ink-500" strokeWidth={1.75} />
                      {f.title}
                    </span>
                    <motion.span
                      initial={false}
                      animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
                      transition={{ duration: reduce ? 0 : 0.35, ease: [0.23, 1, 0.32, 1] }}
                      className="block overflow-hidden"
                    >
                      <span className="mt-2 block pl-7 text-[14px] leading-[1.7] font-normal text-wrap text-ink-500">{f.body}</span>
                      {f.replaces ? (
                        <span className="mt-3 flex items-center gap-2 pl-7 text-[12px] text-ink-500">
                          Replaces
                          {f.replaces.map((R, i) => (
                            <span key={i} className="grid size-5 place-items-center rounded-md bg-surface shadow-card"><R className="size-3" /></span>
                          ))}
                        </span>
                      ) : null}
                    </motion.span>
                  </TabsTrigger>
                )
              })}
            </TabsList>
            <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden bg-gradient-to-b from-sky-500 to-sky-100 p-6 md:min-h-[400px]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  initial={reduce ? false : { opacity: 0, y: 12, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={reduce ? undefined : { opacity: 0, y: -8, filter: "blur(4px)" }}
                  transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                  className="flex w-full justify-center"
                >
                  {PANELS[active]}
                </motion.div>
              </AnimatePresence>
            </div>
          </Tabs>
        </Reveal>
      </Container>
    </section>
  )
}
