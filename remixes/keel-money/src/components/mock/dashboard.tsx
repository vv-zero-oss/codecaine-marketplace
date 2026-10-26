import { useId } from "react"
import { ChartLine, Check, CreditCard, Gauge, Landmark, LayoutGrid, Repeat, Search, Settings, Tags, Wallet } from "lucide-react"

import { DrawLine } from "@/components/motion/draw-line"
import { linePath, series } from "@/components/mock/chart"
import { MockHeading, MockPanel, Money } from "@/components/mock/bits"
import { CATEGORIES, TRANSACTIONS } from "@/components/mock/data"
import { Chip } from "@/components/ui/chip"
import { cn } from "@/lib/utils"

const NAV = [
  { label: "Dashboard", icon: Gauge, on: true },
  { label: "Transactions", icon: Repeat },
  { label: "Accounts", icon: Landmark },
  { label: "Investments", icon: ChartLine },
  { label: "Categories", icon: Tags },
  { label: "Recurring", icon: LayoutGrid },
]

/** The monthly-spending line: warm while it runs hot, green as it cools. */
function SpendingChart() {
  const id = useId()
  const values = [3, 4, 3.5, 6, 5.5, 8, 7, 7.4, 9, 8.2, 11, 10.4, 12, 15, 14.2, 14]
  const { d, end } = linePath(values, 280, 90)
  return (
    <svg viewBox="0 0 280 90" className="h-[90px] w-full overflow-visible" preserveAspectRatio="none">
      <defs>
        <linearGradient id={id} x1="0" x2="1">
          <stop offset="0" stopColor="var(--color-warn)" />
          <stop offset="0.45" stopColor="var(--color-loss)" />
          <stop offset="0.7" stopColor="var(--color-warn)" />
          <stop offset="1" stopColor="var(--color-gain)" />
        </linearGradient>
      </defs>
      <DrawLine d={d} stroke={`url(#${id})`} dotX={end.x} dotY={end.y} />
    </svg>
  )
}

/**
 * The desktop app, drawn in HTML: sidebar, the month's spending, net worth,
 * the transactions waiting for review and the top categories. Everything in it
 * is sample data; it exists to show the product, not to be one.
 */
export function DashboardMock({ className }: { className?: string }) {
  const worth = linePath(series(7, 24, 0.5, 0.6), 200, 50)
  return (
    <div className={cn("flex overflow-hidden rounded-[18px] bg-surface text-[11px] text-fg-2 shadow-(--shadow-card)", className)}>
      <aside className="hidden w-[168px] shrink-0 flex-col gap-0.5 border-r border-line p-3 sm:flex">
        <div className="mb-2 flex items-center gap-2 rounded-[8px] px-2 py-1.5 text-fg-4">
          <Search className="size-3" /> Search
        </div>
        {NAV.map(({ label, icon: Icon, on }) => (
          <div key={label} className={cn("flex items-center gap-2 rounded-[8px] px-2 py-1.5", on ? "bg-blue text-white" : "text-fg-3")}>
            <Icon className="size-3.5" /> {label}
          </div>
        ))}
        <div className="mt-4 flex flex-col gap-1.5 px-2 text-fg-4">
          <span className="flex items-center gap-2"><CreditCard className="size-3" /> Credit cards</span>
          <span className="flex justify-between pl-5 text-fg-3">Everyday Card <Money value="832" /></span>
          <span className="flex justify-between pl-5 text-fg-3">Travel Rewards <Money value="1,594" /></span>
          <span className="mt-1 flex items-center gap-2"><Wallet className="size-3" /> Cash</span>
          <span className="flex items-center gap-2"><ChartLine className="size-3" /> Investments</span>
        </div>
        <div className="mt-auto flex items-center gap-2 px-2 pt-6 text-fg-4">
          <Settings className="size-3" /> Settings
        </div>
      </aside>
      <div className="grid min-w-0 flex-1 gap-3 p-3 md:grid-cols-[1.35fr_1fr]">
        <MockPanel className="p-3">
          <MockHeading title="Monthly spending" action="Transactions" />
          <p className="mt-2 text-center font-display text-[17px] font-semibold text-fg"><Money value="1,240" /> spent</p>
          <p className="text-center text-[10px] text-fg-4">$1,580 spent last month</p>
          <div className="mt-2"><SpendingChart /></div>
        </MockPanel>
        <MockPanel className="p-3">
          <MockHeading title="Net worth" />
          <p className="mt-2 font-display text-[17px] font-semibold text-fg"><Money value="148,600" /></p>
          <Chip tone="gain" caps={false} className="mt-1">↗ 3.2%</Chip>
          <svg viewBox="0 0 200 50" className="mt-3 h-[60px] w-full" preserveAspectRatio="none">
            <path d={worth.d} fill="none" stroke="var(--color-blue)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            <path d="M0 44 L200 40" stroke="var(--color-candy-orange)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          </svg>
        </MockPanel>
        <MockPanel className="p-3">
          <MockHeading title="Transactions to review" action="View all" />
          {["Today", "Yesterday"].map((day) => (
            <div key={day} className="mt-2.5">
              <p className="type-eyebrow text-[9px] text-fg-4">{day}</p>
              {TRANSACTIONS.filter((t) => t.day === day).map((t) => (
                <div key={t.name} className="flex items-center gap-2 py-1">
                  <span className="min-w-0 flex-1 truncate text-fg-2">{t.name}</span>
                  <Chip tone={t.tone} className="text-[8px]">{t.tag}</Chip>
                  <Money value={t.amount} className="w-11 text-right text-fg" />
                </div>
              ))}
            </div>
          ))}
          <div className="mt-2 flex justify-end">
            <span className="inline-flex items-center gap-1 rounded-[8px] bg-surface-3 px-2 py-1 text-[10px] text-fg-2">
              <Check className="size-3" /> Mark 6 as reviewed
            </span>
          </div>
        </MockPanel>
        <MockPanel className="hidden p-3 md:block">
          <MockHeading title="Top categories" />
          <ul className="mt-2 flex flex-col gap-1.5">
            {CATEGORIES.map((c) => (
              <li key={c.name} className="flex items-center gap-2">
                <span className="size-2 rounded-full" style={{ background: c.colour }} />
                <span className="flex-1 text-fg-2">{c.name}</span>
                <Money value={c.amount} className="text-fg" />
              </li>
            ))}
          </ul>
        </MockPanel>
      </div>
    </div>
  )
}
