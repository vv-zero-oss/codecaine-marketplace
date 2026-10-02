import { ChevronLeft, Pencil } from "lucide-react"
import { motion, type MotionValue } from "motion/react"
import type { CSSProperties } from "react"

import { ActivationCard, AskComposer, MetricsCard, RegistrationsCard } from "@/components/mocks/widgets"
import { cn } from "@/lib/utils"

type Fx = { style?: CSSProperties | Record<string, MotionValue | number | string> }

/** One of the home screen's tiles. Wrapped so the scene can move each by its own motion values. */
export function Tile({ children, className, style }: { children: React.ReactNode; className?: string } & Fx) {
  return (
    <motion.div className={cn("min-w-0", className)} style={style as never}>
      {children}
    </motion.div>
  )
}

export function MauCard({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-end justify-between rounded-card bg-surface p-4", className)}>
      <div>
        <p className="text-[11px] font-medium">MAU</p>
        <p className="tnum mt-6 text-lg leading-none font-medium">567k</p>
      </div>
      <svg viewBox="0 0 90 30" className="h-8 w-24 text-ink-3" fill="none"><path d="M0 24C12 24 14 12 28 14s16 10 30 4 20-14 32-12" stroke="currentColor" strokeWidth="1.2" /></svg>
    </div>
  )
}

export function HomeHeader() {
  return (
    <div className="flex items-center justify-between text-[10px]">
      <span className="flex items-center gap-2 font-medium"><ChevronLeft className="size-3 opacity-50" />Home</span>
      <span className="flex items-center gap-1 text-ink-2"><Pencil className="size-3" />Edit</span>
    </div>
  )
}

/** The answer a question gets: a trend chart, a summary and the findings behind it. */
export function AnswerView({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-3 text-[11px] leading-snug text-ink", className)}>
      <p className="ml-auto max-w-[78%] rounded-xl bg-surface px-3 py-2 text-xs font-medium shadow-card">What's the impact on subscriptions from the big launch this month?</p>
      <p className="text-ink-3">Reasoning ›</p>
      <div className="rounded-card bg-window p-3 shadow-card">
        <p className="text-xs font-medium">Subscription trend</p>
        <p className="text-[8px] text-ink-3">Last 90 days</p>
        <svg viewBox="0 0 300 70" className="mt-2 h-14 w-full" fill="none" aria-hidden>
          <path d="M0 56C30 54 50 44 80 46s40 14 70-6 50-4 80-16 50-8 70-12" stroke="var(--color-chart)" strokeWidth="1.4" />
          <path d="M0 60C40 58 60 52 100 54s60-6 90-10 70-8 110-8" stroke="var(--color-ember)" strokeOpacity="0.5" strokeWidth="1.2" strokeDasharray="3 3" />
        </svg>
      </div>
      <p className="text-xs font-medium">High-level impact</p>
      <p className="text-ink-2">Net new subscribers jumped from <b className="text-ink">1,962 → 3,609 (+83.9% MoM)</b>, the largest monthly increase this year. Timing indicates this was driven by the Mar 9th launch.</p>
      <p className="text-xs font-medium">Key findings</p>
      <ul className="space-y-1 text-ink-2">
        <li><b className="text-ink">New customers surged</b> — the single biggest driver, from 260 → 620 (+138% MoM).</li>
        <li><b className="text-ink">Modest reactivations</b> also improved, going from 140 → 170 (+25% MoM).</li>
        <li className="max-sm:hidden"><b className="text-ink">Stable subscription amounts</b> — new subscriptions maintain a stable mix at $19.2.</li>
      </ul>
    </div>
  )
}

/** The home screen, laid out. Used by the pinned hero and, still, as the stacked mobile hero. */
export function HomeGrid({ tile, className }: { tile?: Partial<Record<"metrics" | "reg" | "act" | "ask" | "mau" | "head" | "bar", Fx["style"]>>; className?: string }) {
  return (
    <div className={cn("grid h-full grid-cols-3 content-start gap-3 p-4 sm:p-5", className)}>
      <Tile style={tile?.bar} className="col-span-3"><HomeHeader /></Tile>
      <Tile style={tile?.head} className="col-span-3 mt-1 text-[11px] font-medium">Good morning, Alex</Tile>
      <Tile style={tile?.ask} className="col-span-3"><AskComposer className="h-[5.2rem]" text="What's the impact on subscriptions from the big launch this month?" /></Tile>
      <Tile style={tile?.metrics} className="col-span-2"><MetricsCard className="h-[10.5rem]" /></Tile>
      <Tile style={tile?.reg}><RegistrationsCard className="h-[10.5rem]" /></Tile>
      <Tile style={tile?.act}><ActivationCard className="h-[7.5rem]" /></Tile>
      <Tile style={tile?.mau} className="col-span-2"><MauCard className="h-[7.5rem]" /></Tile>
    </div>
  )
}
