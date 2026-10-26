import { MessageCircle, Settings2, Signal, Wifi } from "lucide-react"

import { DrawLine } from "@/components/motion/draw-line"
import { GoalRing, MockHeading, MockPanel, Stat } from "@/components/mock/bits"
import { linePath } from "@/components/mock/chart"
import { GOALS } from "@/components/mock/data"
import { Chip } from "@/components/ui/chip"
import { cn } from "@/lib/utils"

/** The phone's home screen: this morning's recovery, the strain line, what
 *  to confirm and today's goals as rings. `demo` adds the try-it-first banner. */
export function PhoneScreen({ demo = false }: { demo?: boolean }) {
  const { d, end } = linePath([2, 2.4, 2.3, 3.1, 3.8, 3.6, 4.6, 5.2, 5.6], 200, 46)
  return (
    <div className="flex h-full flex-col bg-night px-3 pt-2 text-[10px] text-fg-2">
      <div className="flex items-center justify-between px-2 text-[11px] font-semibold text-fg">
        9:41
        <span className="flex items-center gap-1"><Signal className="size-3" /><Wifi className="size-3" /><span className="h-2.5 w-5 rounded-[3px] bg-fg" /></span>
      </div>
      {demo ? <p className="mt-2 rounded-full bg-surface-2 py-1.5 text-center text-[10px] text-fg-2">You’re exploring sample data ✕</p> : null}
      <div className="mt-2 flex items-center justify-between px-1 text-fg-3">
        <Settings2 className="size-3.5" />
        <span className="text-[16px] font-black tracking-[-0.02em] text-fg">Cadence</span>
        <MessageCircle className="size-3.5" />
      </div>
      <div className="mt-2 flex justify-center gap-1 text-[9px]">
        <span className="px-2 py-1 text-fg-4">Sleep</span>
        <span className="rounded-full bg-action px-2 py-1 font-semibold text-action-ink">Today</span>
        <span className="px-2 py-1 text-fg-4">Training</span>
      </div>
      <MockPanel className="mt-2 p-3 text-center">
        <p className="text-[15px] font-bold text-fg"><Stat value="84" unit="%" /> recovered</p>
        <p className="text-[9px] text-fg-4">ready for a hard session</p>
        <svg viewBox="0 0 200 46" className="mt-2 h-[46px] w-full overflow-visible" preserveAspectRatio="none">
          <DrawLine d={d} stroke="var(--color-action)" width={2} dotX={end.x} dotY={end.y} />
        </svg>
      </MockPanel>
      <MockHeading title="To confirm" action="View all" className="mt-3 px-1 text-[9px]" />
      <MockPanel className="mt-1.5 flex flex-col gap-1.5 p-2.5">
        <p className="text-[9px] text-fg-4">So far today</p>
        <div className="flex items-center gap-1.5"><span className="flex-1 text-fg-2">Morning run</span><Chip tone="sky" className="text-[7px]">Zone 2</Chip><Stat value="42" unit="m" className="text-fg" /></div>
        <div className="flex items-center gap-1.5"><span className="flex-1 text-fg-2">Mobility</span><Chip tone="lime" className="text-[7px]">Recovery</Chip><Stat value="15" unit="m" className="text-fg" /></div>
      </MockPanel>
      <MockHeading title="Goals" action="Edit" className="mt-3 px-1 text-[9px]" />
      <div className="mt-2 flex justify-between px-0.5">
        {GOALS.map((g) => (
          <div key={g.label} className="flex flex-col items-center gap-1">
            <GoalRing pct={g.pct} colour={g.colour} size={32}>
              <span className="text-[8px] font-semibold text-fg-2">{g.label.slice(0, 2)}</span>
            </GoalRing>
            <Stat value={g.value} unit={g.unit} className="text-[8px] text-fg" />
            <span className="text-[7px] text-fg-4">{g.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/** A phone frame around a screen: a dark bezel and the island at the top. */
export function PhoneFrame({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <div className={cn("relative aspect-[9/19] rounded-(--radius-device) bg-[#070806] p-[7px] shadow-(--shadow-device)", className)}>
      <div className="relative h-full overflow-hidden rounded-[37px]">
        <span className="absolute top-2 left-1/2 z-10 h-[18px] w-[64px] -translate-x-1/2 rounded-full bg-black" />
        {children}
      </div>
    </div>
  )
}
