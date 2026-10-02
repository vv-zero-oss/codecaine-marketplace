import { Coffee, Dumbbell, Moon, Sun, Utensils } from "lucide-react"

import { Ring } from "@/components/motion/ring"
import { Screen } from "@/components/screens/kit"
import { cn } from "@/lib/utils"

export const DAY = [
  { time: "6:30", facts: [["Deep sleep","2h 06m"],["Time asleep","8h 30m"],["Resting HR","48 bpm"]], label: "Wake", icon: Sun, ring: 92, score: "92", unit: "sleep", color: "var(--color-chart-2)", line: "8h 30m, no wake-ups after 3 a.m.", title: "Wake gently", body: "Meridian reads the night before you open your eyes — and times the alarm to your lightest sleep." },
  { time: "9:00", facts: [["HRV","62 ms"],["Readiness","Train"],["Target strain","55–68%"]], label: "Plan", icon: Coffee, ring: 70, score: "70", unit: "recovery", color: "var(--color-chart-3)", line: "HRV 62 ms, above baseline. Train today.", title: "Plan the day", body: "One recovery score, one suggestion. No dashboard to decode before breakfast." },
  { time: "12:30", facts: [["Calories","1,060"],["Protein","38 g"],["Water","1.2 L"]], label: "Fuel", icon: Utensils, ring: 55, score: "38", unit: "g protein", color: "var(--color-amber)", line: "Lunch logged. 102 g protein still to go.", title: "Fuel what's next", body: "Meals are matched against the session you're about to do, not a generic target." },
  { time: "17:45", facts: [["Heart rate","138 bpm"],["Zone 2","38 min"],["Strain","66%"]], label: "Train", icon: Dumbbell, ring: 66, score: "66", unit: "% strain", color: "var(--color-chart-1)", line: "Zone 2 for 38 min. Hold here, no harder.", title: "Train at the right dose", body: "Live strain against the ceiling your body set this morning. Push, hold or stop." },
  { time: "22:00", facts: [["Bedtime","10:45 p.m."],["Screens off","10:00"],["Deep-sleep gain","+40 min"]], label: "Rest", icon: Moon, ring: 40, score: "10:45", unit: "bedtime", color: "var(--color-violet)", line: "Screens down in 45 min for 40 more minutes of deep sleep.", title: "Wind down", body: "A nudge that arrives when it helps, with the reason attached." },
] as const

const STRAIN = [8, 10, 22, 30, 28, 46, 52, 44, 60, 66, 52, 30, 18]

/** The day, one stop at a time. `step` is driven by scroll in the section and by taps on the chips here. */
export function DayScreen({ step = 0, onStep }: { step?: number; onStep?: (i: number) => void }) {
  const d = DAY[step]
  const upto = Math.round(((step + 0.5) / DAY.length) * (STRAIN.length - 1))
  const W = 320
  const H = 110
  const pts = STRAIN.map((v, i) => [(i / (STRAIN.length - 1)) * W, H - 8 - (v / 70) * (H - 20)] as const)
  const path = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ")
  return (
    <Screen className="bg-[linear-gradient(#e9f0fc,#fff_280px)]">
      <div className="text-[13px] font-medium text-ink-3">Today</div>
      <div className="flex items-end gap-2">
        <h3 className="text-[44px] leading-none font-semibold tracking-tight tabular-nums">{d.time}</h3>
        <span className="mb-1 text-[14px] text-ink-3">{d.label}</span>
      </div>
      <div className="mt-5 flex items-center gap-4 rounded-3xl bg-paper p-4 shadow-card">
        <Ring value={d.ring} size={86} stroke={9} color={d.color}>
          <div className="text-center"><div className="text-[20px] leading-none font-semibold tabular-nums">{d.score}</div><div className="mt-0.5 text-[10px] text-ink-3">{d.unit}</div></div>
        </Ring>
        <p className="text-[14px] leading-snug font-medium">{d.line}</p>
      </div>
      <div className="mt-5 text-[13px] font-semibold text-ink-2">Strain through the day</div>
      <svg viewBox={`0 0 ${W} ${H}`} className="mt-2 w-full" aria-hidden="true">
        <path d={`${path} L${W} ${H} L0 ${H} Z`} fill="var(--color-chart-1)" opacity="0.1" />
        <path d={path} fill="none" stroke="var(--color-line)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <clipPath id="day-clip"><rect width={(upto / (STRAIN.length - 1)) * W} height={H} style={{ transition: "width 600ms var(--ease-out)" }} /></clipPath>
        <path d={path} fill="none" stroke="var(--color-chart-1)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" clipPath="url(#day-clip)" />
        <circle cx={pts[upto][0]} cy={pts[upto][1]} r="5" fill="var(--color-paper)" stroke="var(--color-chart-1)" strokeWidth="2.5" style={{ transition: "all 600ms var(--ease-out)" }} />
      </svg>
      <ul className="mt-4 divide-y divide-line overflow-hidden rounded-2xl bg-paper text-[13px] shadow-card">
        {d.facts.map(([k, v]) => (
          <li key={k} className="flex justify-between px-4 py-3"><span className="text-ink-2">{k}</span><b className="tabular-nums">{v}</b></li>
        ))}
      </ul>
      <div className="mt-4 grid grid-cols-5 gap-1.5">
        {DAY.map((s, i) => (
          <button key={s.time} onClick={() => onStep?.(i)} aria-label={`${s.time} ${s.label}`} aria-pressed={i === step} className={cn("flex flex-col items-center gap-1 rounded-2xl py-2.5 text-[11px] font-medium transition-[background-color,color,transform] duration-200 active:scale-95", i === step ? "bg-ink text-paper" : "bg-tint text-ink-2")}>
            <s.icon className="size-4" />
            <span className="tabular-nums">{s.time}</span>
          </button>
        ))}
      </div>
    </Screen>
  )
}
