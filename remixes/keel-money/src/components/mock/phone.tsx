import { useId } from "react"
import { MessageCircle, Settings2, Signal, Wifi } from "lucide-react"

import { DrawLine } from "@/components/motion/draw-line"
import { BudgetRing, MockHeading, MockPanel, Money } from "@/components/mock/bits"
import { linePath } from "@/components/mock/chart"
import { BUDGETS } from "@/components/mock/data"
import { Chip } from "@/components/ui/chip"
import { cn } from "@/lib/utils"

/** The phone's home screen: what's left this month, the line, what to review
 *  and the budgets as rings. `demo` adds the banner the try-it-first mode shows. */
export function PhoneScreen({ demo = false }: { demo?: boolean }) {
  const id = useId()
  const { d, end } = linePath([2, 2.6, 3.1, 3.4, 4.2, 4.4, 5.1, 5.3, 5.9], 200, 46)
  return (
    <div className="flex h-full flex-col bg-night px-3 pt-2 text-[10px] text-fg-2">
      <div className="flex items-center justify-between px-2 text-[11px] font-semibold text-fg">
        9:41
        <span className="flex items-center gap-1"><Signal className="size-3" /><Wifi className="size-3" /><span className="h-2.5 w-5 rounded-[3px] bg-fg" /></span>
      </div>
      {demo ? <p className="mt-2 rounded-[8px] bg-surface-2 py-1.5 text-center text-[10px] text-fg-2">You’re exploring the demo ✕</p> : null}
      <div className="mt-2 flex items-center justify-between px-1 text-fg-3">
        <Settings2 className="size-3.5" />
        <span className="font-display text-[16px] font-semibold text-fg">Keel</span>
        <MessageCircle className="size-3.5" />
      </div>
      <div className="mt-2 flex justify-center gap-1 text-[9px]">
        <span className="px-2 py-1 text-fg-4">Investments</span>
        <span className="rounded-full bg-blue-soft px-2 py-1 text-[#7aa7ff]">Dashboard</span>
        <span className="px-2 py-1 text-fg-4">Activity</span>
      </div>
      <MockPanel className="mt-2 p-3 text-center">
        <p className="font-display text-[15px] font-semibold text-fg"><Money value="2,140" /> left</p>
        <p className="text-[9px] text-fg-4">of $5,200 budgeted</p>
        <svg viewBox="0 0 200 46" className="mt-2 h-[46px] w-full overflow-visible" preserveAspectRatio="none">
          <defs>
            <linearGradient id={id} x1="0" x2="1">
              <stop offset="0" stopColor="var(--color-star)" />
              <stop offset="1" stopColor="var(--color-gain)" />
            </linearGradient>
          </defs>
          <DrawLine d={d} stroke={`url(#${id})`} width={2} dotX={end.x} dotY={end.y} />
        </svg>
      </MockPanel>
      <MockHeading title="To review" action="View all" className="mt-3 px-1 text-[9px]" />
      <MockPanel className="mt-1.5 flex flex-col gap-1.5 p-2.5">
        <p className="text-[9px] text-fg-4">So far today</p>
        <div className="flex items-center gap-1.5"><span className="flex-1 text-fg-2">Brightside Café</span><Chip tone="amber" className="text-[7px]">Dining</Chip><Money value="16.40" className="text-fg" /></div>
        <div className="flex items-center gap-1.5"><span className="flex-1 text-fg-2">Corner Market</span><Chip tone="lime" className="text-[7px]">Groceries</Chip><Money value="48.20" className="text-fg" /></div>
      </MockPanel>
      <MockHeading title="Budgets" action="Categories" className="mt-3 px-1 text-[9px]" />
      <div className="mt-2 flex justify-between px-0.5">
        {BUDGETS.map((b) => (
          <div key={b.label} className="flex flex-col items-center gap-1">
            <BudgetRing pct={b.pct} colour={b.colour} size={32}>
              <span className="text-[8px] font-semibold text-fg-2">{b.label.slice(0, 2)}</span>
            </BudgetRing>
            <Money value={b.left} className="text-[8px] text-fg" />
            <span className="text-[7px] text-fg-4">{b.over ? "over" : "left"}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/** A phone frame around a screen: a dark bezel, a soft rim light and the
 *  island at the top. */
export function PhoneFrame({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <div className={cn("relative aspect-[9/19] rounded-(--radius-device) bg-[#05070c] p-[7px] shadow-(--shadow-device)", className)}>
      <div className="relative h-full overflow-hidden rounded-[37px]">
        <span className="absolute top-2 left-1/2 z-10 h-[18px] w-[64px] -translate-x-1/2 rounded-full bg-black" />
        {children}
      </div>
    </div>
  )
}
