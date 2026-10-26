import { ArrowDownRight, ArrowLeft, ArrowUpRight, Home } from "lucide-react"

import { DrawLine } from "@/components/motion/draw-line"
import { RisingPanel } from "@/components/motion/rising-panel"
import { linePath, series } from "@/components/mock/chart"
import { Money } from "@/components/mock/bits"
import { FeatureCard } from "@/components/sections/feature-card"
import { SectionHeading } from "@/components/sections/section-heading"
import { Button } from "@/components/ui/button"
import { Chip } from "@/components/ui/chip"
import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"

const ACCOUNTS = [
  { name: "Northfield Brokerage", seen: "2 hours ago", change: "0.22%", up: false, value: "3,360", colour: "bg-blue" },
  { name: "Harbor 401(k)", seen: "4 hours ago", change: "1.97%", up: true, value: "6,281", colour: "bg-loss" },
  { name: "Cobalt Crypto", seen: "1 hour ago", change: "1.81%", up: true, value: "2,906", colour: "bg-tag-violet" },
  { name: "Evergreen Roth IRA", seen: "Yesterday", change: "0.64%", up: true, value: "4,278", colour: "bg-gain" },
]

function Delta({ value, up }: { value: string; up: boolean }) {
  return (
    <Chip tone={up ? "gain" : "loss"} caps={false}>
      {up ? <ArrowUpRight strokeWidth={3} /> : <ArrowDownRight strokeWidth={3} />}
      {value}
    </Chip>
  )
}

function NetWorth() {
  const { d, area, end } = linePath([2, 2.1, 2.6, 3.6, 3.2, 3.8, 3.4, 3.9, 3.7, 4.4, 4.5, 4.9, 5.6, 5.5], 400, 120)
  return (
    <div className="px-6 pb-6">
      <div className="rounded-[14px] p-4 shadow-[0_0_0_1px_var(--color-day-line)]">
        <div className="flex flex-col items-center">
          <Delta value="2.29%" up />
          <p className="mt-1.5 font-display text-[22px] font-semibold text-day-ink"><Money value="16,825" /></p>
          <p className="text-[12px] text-day-ink-3">total balance</p>
        </div>
        <svg viewBox="0 0 400 120" className="mt-3 h-[120px] w-full overflow-visible" preserveAspectRatio="none">
          <defs>
            <linearGradient id="worth-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="var(--color-gain)" stopOpacity="0.16" />
              <stop offset="1" stopColor="var(--color-gain)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={area} fill="url(#worth-fill)" />
          <DrawLine d={d} stroke="var(--color-gain)" dotX={end.x} dotY={end.y} dotFill="var(--color-day-card)" />
        </svg>
      </div>
      <div className="mt-5 flex justify-between text-[12px]">
        <span className="font-medium text-day-ink">Accounts</span>
        <span className="text-day-ink-3">3m change</span>
      </div>
      <ul className="mt-2 flex flex-col">
        {ACCOUNTS.map((a) => (
          <li key={a.name} className="flex items-center gap-3 py-2">
            <span className={cn("grid size-7 place-items-center rounded-full text-[12px] font-bold text-white", a.colour)}>{a.name[0]}</span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13px] text-day-ink">{a.name}</span>
              <span className="block text-[11px] text-day-ink-3">{a.seen}</span>
            </span>
            <Delta value={a.change} up={a.up} />
            <Money value={a.value} className="w-14 text-right text-[13px] text-day-ink" />
          </li>
        ))}
      </ul>
    </div>
  )
}

const TICKERS = [
  { symbol: "ORBT", name: "Orbital", change: "1.91%", up: true, seed: 3 },
  { symbol: "FERN", name: "Fernway", change: "1.52%", up: true, seed: 11 },
  { symbol: "LUMA", name: "Luma Energy", change: "1.64%", up: false, seed: 5 },
  { symbol: "TOTL", name: "Total Market", change: "1.47%", up: true, seed: 17 },
]

function Tickers() {
  return (
    <div className="grid grid-cols-2 gap-2 px-6 pb-6 sm:grid-cols-4">
      {TICKERS.map((t) => {
        const { d } = linePath(series(t.seed, 22, t.up ? 0.25 : -0.25, 1.1), 100, 40, 3, 0.1)
        return (
          <div key={t.symbol} className="flex flex-col items-center rounded-[12px] p-2.5 shadow-[0_0_0_1px_var(--color-day-line)]">
            <span className="self-start text-[13px] font-semibold text-day-ink">{t.symbol}</span>
            <span className="self-start truncate text-[11px] text-day-ink-3">{t.name}</span>
            <svg viewBox="0 0 100 40" className="my-2 h-10 w-full" preserveAspectRatio="none">
              <DrawLine d={d} stroke={t.up ? "var(--color-gain)" : "var(--color-loss)"} width={1.8} dot={false} />
            </svg>
            <Delta value={t.change} up={t.up} />
          </div>
        )
      })}
    </div>
  )
}

const ALLOCATION = [
  { label: "Equity", pct: 0.58 },
  { label: "Crypto", pct: 0.34 },
  { label: "Bonds", pct: 0.16 },
  { label: "Cash", pct: 0.1 },
]

function Allocation() {
  return (
    <div className="px-6 pb-6">
      <div className="flex justify-between text-[12px]">
        <span className="font-medium text-day-ink">Allocation</span>
        <span className="text-day-ink-3">By share</span>
      </div>
      <ul className="mt-3 flex flex-col gap-2.5">
        {ALLOCATION.map((a) => (
          <li key={a.label} className="grid grid-cols-[52px_1fr] items-center gap-2 text-[12px] text-day-ink-2">
            {a.label}
            <span className="h-1.5 rounded-full bg-day-line">
              <span className="block h-full rounded-full bg-blue" style={{ width: `${a.pct * 100}%` }} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function HomeValue() {
  return (
    <div className="pb-6 pl-6">
      <div className="rounded-l-[14px] p-3 shadow-[0_0_0_1px_var(--color-day-line)]">
        <div className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.06em] text-day-ink-3 uppercase">
          <ArrowLeft className="size-3" /> Property
        </div>
        <div className="mt-4 flex flex-col items-center gap-2 text-center">
          <span className="grid size-9 place-items-center rounded-full bg-blue text-white">
            <Home className="size-4" />
          </span>
          <p className="text-[12px] text-day-ink-2">Start with your address</p>
          <Button variant="outline" size="sm" className="h-7 text-[12px]">Add a property</Button>
        </div>
      </div>
    </div>
  )
}

/**
 * The wealth chapter, on a pale panel that rises over the night and draws in
 * as it leaves (see `RisingPanel`).
 */
export function Wealth({ title = "Grow your wealth, watch it compound" }: { title?: string }) {
  return (
    <RisingPanel className="py-(--spacing-section)">
      <Container>
        <SectionHeading title={title} className="text-day-ink" />
        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 md:mt-16">
          <FeatureCard
            tone="day"
            title="Everything you own, one screen"
            body="Brokerage, retirement, crypto, even your home. A net worth without five logins."
            className="sm:col-span-2 lg:row-span-2"
          >
            <NetWorth />
          </FeatureCard>
          <FeatureCard tone="day" title="Live performance" body="Estimates through the day. Check when you want to, not when you have to." delay={0.08} className="sm:col-span-2">
            <Tickers />
          </FeatureCard>
          <FeatureCard tone="day" title="Allocation" body="Too much in one place? See how spread out you really are." delay={0.12}>
            <Allocation />
          </FeatureCard>
          <FeatureCard tone="day" title="Home value" body="Add your address and Keel keeps an estimate of what it’s worth." delay={0.16}>
            <HomeValue />
          </FeatureCard>
        </div>
      </Container>
    </RisingPanel>
  )
}
