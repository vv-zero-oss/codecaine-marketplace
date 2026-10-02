import { Blocks, BookOpenCheck, Building2, FileText, Landmark, Network, Plug, Receipt, ReceiptText, Table2 } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"

type Node = { icon: React.ComponentType<{ className?: string }>; title: string; sub: string; rows: [string, string][]; tone: string; pos: string }

const NODES: Node[] = [
  { icon: BookOpenCheck, title: "Journal entry JE-2201", sub: "Mar 12 · posted by Meadow", tone: "bg-leaf/15 text-leaf", rows: [["Debit", "6200 Software"], ["Credit", "1010 Operating"], ["Amount", "$45.00"]], pos: "left-[34%] top-[2%]" },
  { icon: ReceiptText, title: "Invoice INV-1042", sub: "Tallow · Paid", tone: "bg-coral/15 text-coral", rows: [["Issued", "Mar 1"], ["Amount", "$2,400.00"], ["Paid", "Mar 9, 14:12"]], pos: "left-[62%] top-[8%]" },
  { icon: Receipt, title: "Receipt · Blue Bottle", sub: "Read from photo", tone: "bg-teal/20 text-teal", rows: [["Date", "Mar 11"], ["Total", "$18.50"], ["Category", "Meals"]], pos: "left-[16%] top-[22%]" },
  { icon: Landmark, title: "Bank line ••4417", sub: "Operating · Mar 9", tone: "bg-lilac/20 text-lilac", rows: [["Payee", "Stripe"], ["Amount", "+$4,210"], ["Matched", "24 charges"]], pos: "left-[38%] top-[36%]" },
  { icon: FileText, title: "Q1 expenses.pdf", sub: "Report · 2.4 MB", tone: "bg-sky-100 text-sky-600", rows: [["Type", "PDF report"], ["Owner", "Priya Nair"], ["Shared", "With accountant"]], pos: "left-[1%] top-[48%]" },
  { icon: Building2, title: "Figma, Inc.", sub: "Vendor · Software", tone: "bg-apricot/20 text-apricot", rows: [["Spend YTD", "$1,980"], ["Bills", "14"], ["Terms", "Monthly"]], pos: "left-[58%] top-[56%]" },
]

const POINTS = [
  { icon: Plug, title: "Live bank feeds", body: "Banks, cards, payment processors and payroll, connected read-only." },
  { icon: Table2, title: "One ledger", body: "Every receipt, bill and payout filed with a category, a source and a date." },
  { icon: Blocks, title: "Your chart of accounts", body: "Custom accounts, tracking tags and tax codes the AI learns and follows." },
  { icon: Network, title: "Every number traceable", body: "Click any figure to see the entries, documents and decisions behind it." },
]

function NodeCard({ node }: { node: Node }) {
  const Icon = node.icon
  return (
    <div className="w-[190px] rounded-xl bg-surface p-3 text-left text-[10px] shadow-lift">
      <div className="flex items-center gap-2">
        <span className={`grid size-6 place-items-center rounded-md ${node.tone}`}><Icon className="size-3.5" /></span>
        <div className="min-w-0"><p className="truncate text-[11px] font-semibold text-ink-900">{node.title}</p><p className="truncate text-ink-400">{node.sub}</p></div>
      </div>
      <dl className="mt-2.5 flex flex-col gap-1.5 text-ink-700">
        {node.rows.map(([k, v]) => (<div key={k} className="flex gap-3"><dt className="w-14 shrink-0 text-ink-400">{k}</dt><dd className="truncate font-medium">{v}</dd></div>))}
      </dl>
    </div>
  )
}

/** A loose cluster of linked records — the graph the assistant reads — with
 *  the four ideas that hold it up underneath. Below `md` the cluster stacks
 *  into a short list rather than scaling a canvas down to nothing. */
export function ContextGraph() {
  return (
    <section id="graph" className="bg-page py-16 sm:py-24">
      <Container>
        <Reveal><SectionHeading align="center" title="Every number links back to its source" description="Bank feeds, receipts, invoices and payroll connect into one ledger you can trace line by line." /></Reveal>
        <Reveal delay={0.1} className="relative mt-10 hidden h-[400px] md:block" >
          <svg aria-hidden="true" viewBox="0 0 1000 400" preserveAspectRatio="none" className="absolute inset-0 size-full text-ink-200">
            <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 5" vectorEffect="non-scaling-stroke">
              <path d="M340 70 L240 150 M340 70 L560 170 M640 60 L560 170 M240 150 L130 230 M560 170 L650 250 M240 150 L560 170" vectorEffect="non-scaling-stroke" />
              <path d="M130 230 L560 170" vectorEffect="non-scaling-stroke" />
            </g>
          </svg>
          {[["left-[6%] top-[8%]", "bg-sky-100"], ["left-[88%] top-[40%]", "bg-teal/25"], ["left-[48%] top-[88%]", "bg-lilac/25"], ["left-[26%] top-[84%]", "bg-apricot/30"], ["left-[84%] top-[84%]", "bg-coral/20"], ["left-[22%] top-[6%]", "bg-leaf/20"]].map(([pos, tone], i) => (
            <span key={i} aria-hidden="true" className={`absolute size-8 rounded-lg shadow-card ${pos} ${tone}`} />
          ))}
          {NODES.map((node, i) => (
            <div key={node.title} className={`absolute ${node.pos}`} style={{ animation: `drift ${6 + i}s ease-in-out ${i * -1.3}s infinite` }}>
              <NodeCard node={node} />
            </div>
          ))}
        </Reveal>
        <Reveal delay={0.1} className="mt-10 grid justify-items-center gap-3 sm:grid-cols-2 md:hidden">
          {NODES.slice(0, 4).map((node) => <NodeCard key={node.title} node={node} />)}
        </Reveal>
        <Reveal className="mt-14">
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {POINTS.map(({ icon: Icon, title, body }) => (
              <li key={title}>
                <h3 className="flex items-center gap-2 text-[13px] font-semibold"><Icon className="size-4 text-ink-500" />{title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-500">{body}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  )
}
