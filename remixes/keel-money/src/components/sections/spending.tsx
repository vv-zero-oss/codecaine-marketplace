import { Car, Clapperboard, Dumbbell, Home, Sparkles, Utensils, Zap } from "lucide-react"

import { DrawLine } from "@/components/motion/draw-line"
import { MockHeading, MockPanel, Money } from "@/components/mock/bits"
import { linePath } from "@/components/mock/chart"
import { TRANSACTIONS } from "@/components/mock/data"
import { FeatureCard } from "@/components/sections/feature-card"
import { SectionHeading } from "@/components/sections/section-heading"
import { Chip } from "@/components/ui/chip"
import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"

function ReviewList() {
  return (
    <MockPanel className="m-6 mt-0 p-3 text-[12px] sm:absolute sm:inset-y-6 sm:right-0 sm:left-0 sm:m-0 sm:rounded-r-none">
      <MockHeading title="Transactions to review" />
      <div className="mt-2 flex flex-col">
        {TRANSACTIONS.map((t) => (
          <div key={t.name} className="flex items-center gap-2 border-b border-line py-1.5 last:border-0">
            <span className="min-w-0 flex-1 truncate text-fg-2">{t.name}</span>
            <Chip tone={t.tone}>{t.tag}</Chip>
          </div>
        ))}
      </div>
    </MockPanel>
  )
}

function SpendLine() {
  const now = linePath([2, 3, 2.6, 4, 3.6, 5.2, 4.8, 6.4, 5.8, 7.6, 6.8, 9, 8.4, 10.6, 10.2], 400, 120)
  const last = linePath([1.6, 2.4, 3, 3.4, 4.2, 4.6, 5.4, 5.8, 6.6, 7.2, 7.8, 8.6, 9.2, 10, 10.6], 400, 120)
  return (
    <div className="px-6 pb-6">
      <svg viewBox="0 0 400 120" className="h-[150px] w-full overflow-visible" preserveAspectRatio="none">
        <path d={last.d} fill="none" stroke="var(--color-fg-4)" strokeWidth="1.5" strokeDasharray="4 5" vectorEffect="non-scaling-stroke" />
        <DrawLine d={now.d} stroke="var(--color-gain)" dotX={now.end.x} dotY={now.end.y} />
      </svg>
      <div className="mt-3 flex items-center gap-4 text-[12px] text-fg-3">
        <span className="flex items-center gap-1.5"><span className="h-0.5 w-4 rounded bg-gain" /> This month</span>
        <span className="flex items-center gap-1.5"><span className="h-0.5 w-4 rounded border-t border-dashed border-fg-4" /> Last month</span>
      </div>
    </div>
  )
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]
const SPENT = [0.55, 0.9, 0.35, 0.6, 0.25, 0.2, 0.22]

function RolloverBars() {
  return (
    <MockPanel className="m-6 mt-0 p-4 text-center sm:absolute sm:inset-y-6 sm:right-0 sm:left-0 sm:m-0 sm:rounded-r-none">
      <p className="font-display text-[17px] font-semibold text-fg">Dining out</p>
      <div className="mt-3 grid grid-cols-2 text-[10px] text-fg-4 uppercase">
        <span>Spent</span>
        <span>Rolled over</span>
      </div>
      <div className="grid grid-cols-2 font-display text-[18px] font-semibold text-fg">
        <Money value="25.49" />
        <Money value="42.33" />
      </div>
      <div className="grid grid-cols-2 text-[11px] text-fg-3">
        <span>$96.84 under</span>
        <span>from February</span>
      </div>
      <div className="relative mt-4 flex h-16 items-end justify-between gap-2 border-b border-line-strong px-1">
        {SPENT.map((v, i) => (
          <span
            key={i}
            className={cn("w-2.5 rounded-t-[3px]", v > 0.5 ? "bg-loss" : "bg-gain")}
            style={{ height: `${v * 100}%` }}
          />
        ))}
      </div>
      <div className="mt-1.5 flex justify-between px-0.5 text-[9px] text-fg-4 uppercase">
        {MONTHS.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
    </MockPanel>
  )
}

const FLOWS = [
  { label: "Car", icon: Car, amount: "+123", tone: "text-[#7aa7ff] bg-blue-soft" },
  { label: "Utilities", icon: Zap, amount: "+85", tone: "text-tag-amber bg-tag-amber/14" },
  { label: "Rent", icon: Home, amount: "+20", tone: "text-tag-amber bg-tag-amber/14" },
  { label: "Dining", icon: Utensils, amount: "−64", tone: "text-loss bg-loss-soft" },
]

function CashFlow() {
  return (
    <ul className="flex flex-col gap-2 px-6 pb-6">
      {FLOWS.map(({ label, icon: Icon, amount, tone }) => (
        <li key={label} className={cn("flex w-fit items-center gap-2 rounded-[10px] px-2.5 py-1.5 text-[13px] font-medium", tone)}>
          <span className="size-1.5 rounded-full bg-current" />
          <Icon className="size-3.5" />
          {label}
          <span className="ml-1 text-fg tabular-nums">{amount}</span>
        </li>
      ))}
    </ul>
  )
}

const UPCOMING = [
  { date: "Dec 1", label: "Streaming plan", icon: Clapperboard },
  { date: "Dec 1", label: "Gym membership", icon: Dumbbell },
  { date: "Dec 2", label: "Meal kit", icon: Utensils },
  { date: "Dec 4", label: "Photo storage", icon: Sparkles },
]

function Upcoming() {
  return (
    <div className="pb-6 pl-6">
      <p className="type-eyebrow text-fg-4">Upcoming</p>
      <MockPanel className="mt-2 rounded-r-none">
        {UPCOMING.map(({ date, label, icon: Icon }) => (
          <div key={label} className="flex items-center gap-3 border-b border-line px-3 py-2.5 text-[12px] last:border-0">
            <span className="w-9 text-fg-4">{date}</span>
            <Icon className="size-3.5 text-fg-3" />
            <span className="truncate text-fg-2">{label}</span>
          </div>
        ))}
      </MockPanel>
    </div>
  )
}

/** The spending chapter: five cells, each one habit Keel takes off your hands. */
export function Spending({ title = "See your spending, keep more of it" }: { title?: string }) {
  return (
    <section className="relative pt-(--spacing-section) pb-(--spacing-section)">
      <Container>
        <SectionHeading title={title} className="text-fg" />
        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 md:mt-16">
          <FeatureCard
            title="Know where it went"
            body="Every purchase lands categorised. Correct one once and Keel remembers, so review takes seconds."
            layout="side"
            className="min-h-[300px] sm:col-span-2"
          >
            <ReviewList />
          </FeatureCard>
          <FeatureCard
            title="Read the line"
            body="Open the app to one line: this month’s spending against last, with what’s still due."
            delay={0.08}
            className="sm:col-span-2"
          >
            <SpendLine />
          </FeatureCard>
          <FeatureCard
            title="Carry it forward"
            body="Came in under on dining? The leftover rolls into next month instead of vanishing."
            layout="side"
            className="min-h-[300px] sm:col-span-2"
          >
            <RolloverBars />
          </FeatureCard>
          <FeatureCard title="Cash flow" body="Money in, money out, month by month — the trend drawn for you." delay={0.08}>
            <CashFlow />
          </FeatureCard>
          <FeatureCard title="Catch subscriptions" body="The free trial you forgot is now a charge. Keel flags it before the second one." delay={0.16}>
            <Upcoming />
          </FeatureCard>
        </div>
      </Container>
    </section>
  )
}
