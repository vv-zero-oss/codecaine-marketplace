import { Activity, BedDouble, Check, Dumbbell, HeartPulse, LayoutGrid, Search, Settings, TrendingUp, Watch } from "lucide-react"

import { DrawLine } from "@/components/motion/draw-line"
import { linePath, series } from "@/components/mock/chart"
import { MockHeading, MockPanel, Stat } from "@/components/mock/bits"
import { SESSIONS, ZONES } from "@/components/mock/data"
import { Chip } from "@/components/ui/chip"
import { cn } from "@/lib/utils"

const NAV = [
  { label: "Today", icon: LayoutGrid, on: true },
  { label: "Heart", icon: HeartPulse },
  { label: "Sleep", icon: BedDouble },
  { label: "Workouts", icon: Dumbbell },
  { label: "Trends", icon: TrendingUp },
  { label: "Activity", icon: Activity },
]

/** Today's heart rate: calm overnight, a spike for the morning run, settling. */
function HeartChart() {
  const values = [52, 51, 50, 52, 54, 58, 96, 142, 151, 138, 104, 82, 74, 70, 72, 68]
  const { d, end } = linePath(values, 280, 90)
  return (
    <svg viewBox="0 0 280 90" className="h-[90px] w-full overflow-visible" preserveAspectRatio="none">
      <DrawLine d={d} stroke="var(--color-loss)" dotX={end.x} dotY={end.y} />
    </svg>
  )
}

/**
 * The desktop app, drawn in HTML: sidebar, today's heart rate, recovery and
 * HRV, the sessions waiting to be confirmed and minutes in each zone.
 * Everything in it is sample data; it exists to show the product.
 */
export function DashboardMock({ className }: { className?: string }) {
  const hrv = linePath(series(7, 24, 0.35, 0.8), 200, 50)
  return (
    <div className={cn("flex overflow-hidden rounded-[18px] bg-surface text-[11px] text-fg-2 shadow-(--shadow-card)", className)}>
      <aside className="hidden w-[168px] shrink-0 flex-col gap-0.5 border-r border-line p-3 sm:flex">
        <div className="mb-2 flex items-center gap-2 rounded-full px-2 py-1.5 text-fg-4">
          <Search className="size-3" /> Search
        </div>
        {NAV.map(({ label, icon: Icon, on }) => (
          <div key={label} className={cn("flex items-center gap-2 rounded-full px-2.5 py-1.5", on ? "bg-action font-semibold text-action-ink" : "text-fg-3")}>
            <Icon className="size-3.5" /> {label}
          </div>
        ))}
        <div className="mt-4 flex flex-col gap-1.5 px-2 text-fg-4">
          <span className="flex items-center gap-2"><Watch className="size-3" /> Devices</span>
          <span className="flex justify-between pl-5 text-fg-3">Wrist band <span className="text-gain">84%</span></span>
          <span className="flex justify-between pl-5 text-fg-3">Smart ring <span className="text-gain">61%</span></span>
          <span className="flex justify-between pl-5 text-fg-3">Chest strap <span>idle</span></span>
        </div>
        <div className="mt-auto flex items-center gap-2 px-2 pt-6 text-fg-4">
          <Settings className="size-3" /> Settings
        </div>
      </aside>
      <div className="grid min-w-0 flex-1 gap-3 p-3 md:grid-cols-[1.35fr_1fr]">
        <MockPanel className="p-3">
          <MockHeading title="Heart rate · today" action="Details" />
          <p className="mt-2 text-center text-[17px] font-bold text-fg"><Stat value="54" unit="bpm" /> resting</p>
          <p className="text-center text-[10px] text-fg-4">3 bpm lower than last month</p>
          <div className="mt-2"><HeartChart /></div>
        </MockPanel>
        <MockPanel className="p-3">
          <MockHeading title="Recovery" />
          <p className="mt-2 text-[17px] font-bold text-fg"><Stat value="84" unit="%" /></p>
          <Chip tone="gain" caps={false} className="mt-1">↗ HRV 68 ms</Chip>
          <svg viewBox="0 0 200 50" className="mt-3 h-[60px] w-full" preserveAspectRatio="none">
            <path d={hrv.d} fill="none" stroke="var(--color-action)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            <path d="M0 40 L200 36" stroke="var(--color-tag-sky)" strokeWidth="2" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
          </svg>
        </MockPanel>
        <MockPanel className="p-3">
          <MockHeading title="Sessions to confirm" action="View all" />
          {["Today", "Yesterday"].map((day) => (
            <div key={day} className="mt-2.5">
              <p className="type-eyebrow text-[9px] text-fg-4">{day}</p>
              {SESSIONS.filter((t) => t.day === day).map((t) => (
                <div key={t.name} className="flex items-center gap-2 py-1">
                  <span className="min-w-0 flex-1 truncate text-fg-2">{t.name}</span>
                  <Chip tone={t.tone} className="text-[8px]">{t.tag}</Chip>
                  <Stat value={t.value} unit={t.unit} className="w-16 text-right text-fg" />
                </div>
              ))}
            </div>
          ))}
          <div className="mt-2 flex justify-end">
            <span className="inline-flex items-center gap-1 rounded-full bg-surface-3 px-2.5 py-1 text-[10px] text-fg-2">
              <Check className="size-3" /> Confirm 6 sessions
            </span>
          </div>
        </MockPanel>
        <MockPanel className="hidden p-3 md:block">
          <MockHeading title="Minutes by zone · week" />
          <ul className="mt-2 flex flex-col gap-1.5">
            {ZONES.map((z) => (
              <li key={z.name} className="flex items-center gap-2">
                <span className="size-2 rounded-full" style={{ background: z.colour }} />
                <span className="flex-1 text-fg-2">{z.name}</span>
                <Stat value={z.value} unit="m" className="text-fg" />
              </li>
            ))}
          </ul>
        </MockPanel>
      </div>
    </div>
  )
}
