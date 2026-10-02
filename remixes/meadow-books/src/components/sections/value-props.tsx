import { BarChart3, Check, Clock, ShieldCheck, Sparkles } from "lucide-react"

import { CountUp } from "@/components/motion/count-up"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { SkyPanel } from "@/components/ui/sky-panel"
import { cn } from "@/lib/utils"

const ROWS = [
  ["Blue Bottle Coffee", "$18.50", "Meals", "bg-apricot/20 text-apricot"],
  ["Figma", "$45.00", "Software", "bg-sky-100 text-sky-600"],
  ["Tallow — INV-1042", "$2,400", "Sales", "bg-teal/20 text-teal"],
] as const

function CodingVisual() {
  return (
    <ul className="flex w-[250px] flex-col gap-2 text-[12px]">
      {ROWS.map(([name, amount, cat, tone], i) => (
        <li key={name} className="flex items-center gap-2 rounded-lg bg-surface px-3 py-2.5 shadow-lift" style={{ transform: `translateX(${(i - 1) * 8}px)` }}>
          <span className="min-w-0 flex-1 truncate font-medium">{name}</span>
          <span className="tabular-nums text-ink-500">{amount}</span>
          <span className={cn("rounded-md px-1.5 py-0.5 text-[10px] font-semibold", tone)}>{cat}</span>
        </li>
      ))}
    </ul>
  )
}

function CloseVisual() {
  const days = [["Jan", 86], ["Feb", 64], ["Mar", 30]] as const
  return (
    <div className="flex w-[220px] flex-col gap-3 rounded-xl bg-surface p-4 shadow-lift">
      <div className="flex items-center justify-between text-[11px]"><span className="flex items-center gap-1.5 font-semibold"><BarChart3 className="size-3.5 text-sky-600" />Days to close</span><span className="rounded bg-leaf/15 px-1.5 py-0.5 font-semibold text-leaf">−3.6 days</span></div>
      <div className="flex h-[68px] items-end gap-3">
        {days.map(([d, h], i) => (
          <div key={d} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
            <span className={cn("w-full rounded-md", i === 2 ? "bg-sky-500" : "bg-sky-200")} style={{ height: `${h}%` }} />
            <span className="text-[10px] text-ink-400">{d}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function TrailVisual() {
  const rows = [["Receipt attached", true], ["Matched to bank line", true], ["Approved by Priya", false]] as const
  return (
    <div className="flex w-[220px] flex-col gap-2.5 rounded-xl bg-surface p-4 text-[12px] shadow-lift">
      <p className="text-[11px] font-semibold text-ink-500">Journal entry JE-2201</p>
      {rows.map(([label, done]) => (
        <p key={label} className="flex items-center gap-2.5">
          <span className={cn("grid size-4 place-items-center rounded-full", done ? "bg-leaf text-white" : "border border-ink-200")}>{done ? <Check className="size-2.5" strokeWidth={3} /> : null}</span>
          <span className={done ? "text-ink-700" : "font-medium"}>{label}</span>
        </p>
      ))}
      <span className="mt-1 block h-1.5 overflow-hidden rounded-full bg-ink-100"><span className="block h-full w-2/3 rounded-full bg-sky-500" /></span>
    </div>
  )
}

const PROPS = [
  { icon: Sparkles, visual: <CodingVisual />, stat: 98, suffix: "%", label: "coded automatically", title: "Every transaction, coded", body: "Bank feeds, cards and receipts are read, matched and categorised the way your accountant would — and every correction you make is remembered." },
  { icon: Clock, visual: <CloseVisual />, stat: 4, suffix: " hrs", label: "to close the month", title: "Month-end in an afternoon", body: "Accounts reconcile as the month goes, so closing is a review of what Meadow flagged — not a week of catching up." },
  { icon: ShieldCheck, visual: <TrailVisual />, stat: 100, suffix: "%", label: "traceable", title: "Audit-ready by default", body: "Every entry links to its source document and shows who — or what — posted it. Your accountant gets a clean trail, not a shoebox." },
]

/** The case for the product in three claims. Each card shows the claim as a
 *  small picture on sky first, then states it with a number to remember. */
export function ValueProps() {
  return (
    <section id="value" className="relative bg-page py-14 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading align="center" title="Less bookkeeping. More business." description="Accounting is mostly typing in numbers somebody already wrote down. Meadow reads them for you, and you review only what matters." />
        </Reveal>
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {PROPS.map(({ icon: Icon, visual, stat, suffix, label, title, body }, i) => (
            <li key={title}>
              <Reveal delay={i * 0.07} className="h-full">
                <article className="flex h-full flex-col gap-5 rounded-[var(--radius-card)] bg-surface p-2.5 shadow-card">
                  <SkyPanel className="h-[190px]">{visual}</SkyPanel>
                  <div className="flex flex-1 flex-col gap-3 px-3.5 pb-4">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="shrink-0 font-display text-[44px] leading-none font-semibold tracking-[-0.05em] whitespace-nowrap tabular-nums"><CountUp value={stat} suffix={suffix} /></p>
                      <p className="flex items-center gap-1.5 text-[12px] font-medium text-ink-400"><Icon className="size-3.5" />{label}</p>
                    </div>
                    <h3 className="text-[16px] font-semibold tracking-tight">{title}</h3>
                    <p className="text-[14px] leading-relaxed text-ink-500">{body}</p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
