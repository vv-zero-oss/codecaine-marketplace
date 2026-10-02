import { Activity, ChevronRight, Droplet, Dumbbell, Heart, Moon } from "lucide-react"
import { useState } from "react"

import { Ring } from "@/components/motion/ring"
import { NavRow, Screen } from "@/components/screens/kit"
import { cn } from "@/lib/utils"

const MARKERS = [
  { id: "Sleep", icon: Moon, years: -1.7, pct: 78, tip: "Consistent bedtimes this month are doing the work." },
  { id: "Activity", icon: Activity, years: -1.2, pct: 66, tip: "Add one zone-2 session a week to widen the gap." },
  { id: "Fitness", icon: Heart, years: -4.6, pct: 92, tip: "VO₂ max is your biggest lever — it’s well ahead of your age." },
  { id: "Lifestyle", icon: Dumbbell, years: 1.7, pct: 38, tip: "Late dinners are pulling this one older. Try eating by 8." },
  { id: "Blood", icon: Droplet, years: -9.6, pct: 96, tip: "ApoB and glucose are excellent for your age." },
] as const

/** Biological age: pick a biomarker and the headline age and advice follow. */
const HABITS = [
  { id: "sleep", label: "+30 min sleep", gain: 0.4 },
  { id: "zone2", label: "2 zone-2 runs a week", gain: 0.7 },
  { id: "dinner", label: "Finish eating by 8 p.m.", gain: 0.3 },
  { id: "strength", label: "Lift twice a week", gain: 0.5 },
] as const

export function AgeScreen() {
  const [sel, setSel] = useState<string | null>(null)
  const [habits, setHabits] = useState<string[]>([])
  const chosen = MARKERS.find((m) => m.id === sel)
  const gain = HABITS.filter((h) => habits.includes(h.id)).reduce((a, h) => a + h.gain, 0)
  const total = (chosen ? 28.8 + chosen.years / 5 : 23.3) - gain
  return (
    <Screen className="bg-[linear-gradient(#e4f5ee,#fff_260px)]">
      <NavRow title="Biological Age" />
      <div className="mt-2 grid place-items-center">
        <Ring value={chosen ? chosen.pct : 80} size={150} stroke={12} color="var(--color-mint)">
          <div className="text-center">
            <div className="text-[34px] leading-none font-semibold tracking-tight tabular-nums">{total.toFixed(1)}</div>
            <div className="mt-1 text-[11px] text-ink-3">{chosen ? `${chosen.id} age` : "years old"}</div>
          </div>
        </Ring>
        <p className="mt-3 max-w-[260px] text-center text-[13px] leading-snug text-ink-2">
          {chosen ? chosen.tip : "5.5 years younger than your calendar age. Tap a biomarker to see why."}
        </p>
      </div>
      <div className="mt-5 text-[13px] font-semibold text-ink-2">Age biomarkers</div>
      <ul className="mt-2 space-y-2">
        {MARKERS.map(({ id, icon: Icon, years, pct }) => (
          <li key={id}>
            <button onClick={() => setSel(sel === id ? null : id)} className={cn("flex w-full items-center gap-3 rounded-2xl p-3 text-left transition-[background-color,box-shadow] duration-200", sel === id ? "bg-paper shadow-card" : "bg-tint/70")}>
              <Ring value={pct} size={40} stroke={4.5} color={years > 0 ? "var(--color-amber)" : "var(--color-mint)"}><Icon className="size-4 text-ink-2" /></Ring>
              <span className="flex-1"><span className="block text-[14px] font-semibold">{id}</span><span className={cn("text-[12px] font-medium", years > 0 ? "text-amber" : "text-mint")}>{Math.abs(years)} years {years > 0 ? "older" : "younger"}</span></span>
              <ChevronRight className="size-4 text-ink-3" />
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-5 text-[13px] font-semibold text-ink-2">What if you…</div>
      <div className="mt-2 flex flex-wrap gap-2">
        {HABITS.map((h) => {
          const on = habits.includes(h.id)
          return <button key={h.id} aria-pressed={on} onClick={() => setHabits(on ? habits.filter((x) => x !== h.id) : [...habits, h.id])} className={cn("h-9 rounded-full px-3.5 text-[13px] font-medium transition-[background-color,color,transform] duration-150 active:scale-95", on ? "bg-mint text-white" : "bg-tint text-ink-2")}>{h.label}</button>
        })}
      </div>
      <p className="mt-3 rounded-2xl bg-ink p-4 text-[13px] leading-snug text-white/85">{gain ? `That could take ${gain.toFixed(1)} years off in a year — ${total.toFixed(1)} would be your new age.` : "Pick a habit to see what it could do in a year."}</p>
    </Screen>
  )
}
