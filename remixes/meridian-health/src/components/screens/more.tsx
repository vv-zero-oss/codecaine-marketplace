import { Frown, Meh, Minus, Plus, Smile, Timer } from "lucide-react"
import { useEffect } from "react"
import { useState } from "react"

import { NavRow, Screen } from "@/components/screens/kit"
import { cn } from "@/lib/utils"

/* ─── Cycle ───────────────────────────────────────────────────────────── */

const PHASES = [
  { name: "Menstrual", days: [1, 5], color: "var(--color-rose)", tip: "Lower energy is normal. Walks and mobility feel best." },
  { name: "Follicular", days: [6, 13], color: "var(--color-ocean)", tip: "Energy climbs. A good window for new strength PRs." },
  { name: "Ovulatory", days: [14, 16], color: "var(--color-mint)", tip: "Peak power. Go hard if recovery agrees." },
  { name: "Luteal", days: [17, 28], color: "var(--color-violet)", tip: "Body temperature rises. Prioritise sleep and easy zone-2." },
] as const

const SYMPTOMS = ["Cramps", "Low energy", "Great mood", "Headache", "Bloating"] as const
export function CycleScreen() {
  const [day, setDay] = useState(15)
  const [logged, setLogged] = useState<Record<number, string[]>>({ 15: ["Great mood"] })
  const today = logged[day] ?? []
  const phase = PHASES.find((p) => day >= p.days[0] && day <= p.days[1])!
  return (
    <Screen className="bg-[linear-gradient(#fbe9f0,#fff_240px)]">
      <NavRow title="Cycle" />
      <div className="mt-2 text-center"><div className="text-[13px] text-ink-3">Day {day}</div><div className="text-[30px] font-semibold tracking-tight" style={{ color: phase.color }}>{phase.name}</div></div>
      <div className="mt-5 grid grid-cols-7 gap-1.5">
        {Array.from({ length: 28 }, (_, i) => i + 1).map((d) => {
          const p = PHASES.find((x) => d >= x.days[0] && d <= x.days[1])!
          return (
            <button key={d} onClick={() => setDay(d)} aria-label={`Day ${d}`} aria-pressed={d === day} className={cn("aspect-square rounded-xl text-[13px] font-medium tabular-nums transition-[transform,background-color] duration-150 active:scale-90", d === day ? "scale-110 text-white" : "text-ink-2")} style={{ background: d === day ? p.color : `color-mix(in oklab, ${p.color} 14%, white)` }}>{d}</button>
          )
        })}
      </div>
      <p className="mt-5 rounded-2xl bg-paper p-4 text-[14px] leading-snug text-ink-2 shadow-card">{phase.tip}</p>
      <div className="mt-4 text-[13px] font-semibold text-ink-2">How does day {day} feel?</div>
      <div className="mt-2 flex flex-wrap gap-2">
        {SYMPTOMS.map((sy) => { const on = today.includes(sy); return <button key={sy} aria-pressed={on} onClick={() => setLogged({ ...logged, [day]: on ? today.filter((x) => x !== sy) : [...today, sy] })} className={cn("h-9 rounded-full px-3.5 text-[13px] font-medium transition-[background-color,color,transform] duration-150 active:scale-95", on ? "text-white" : "bg-tint text-ink-2")} style={on ? { background: phase.color } : undefined}>{sy}</button> })}
      </div>
      <p className="mt-3 text-[12px] text-ink-3">{Object.values(logged).flat().length} symptoms logged this cycle.</p>
    </Screen>
  )
}

/* ─── Lifting log ─────────────────────────────────────────────────────── */

export function LiftScreen() {
  const [rest, setRest] = useState(0)
  useEffect(() => {
    if (rest <= 0) return
    const id = window.setTimeout(() => setRest(rest - 1), 1000)
    return () => window.clearTimeout(id)
  }, [rest])
  const [kg, setKg] = useState(80)
  const [reps, setReps] = useState(6)
  const [sets, setSets] = useState<{ kg: number; reps: number }[]>([{ kg: 70, reps: 8 }, { kg: 75, reps: 6 }])
  const volume = sets.reduce((a, s) => a + s.kg * s.reps, 0)
  const Stepper = ({ label, value, set, step }: { label: string; value: number; set: (n: number) => void; step: number }) => (
    <div className="flex-1 rounded-2xl bg-tint p-3 text-center">
      <div className="text-[12px] text-ink-3">{label}</div>
      <div className="flex items-center justify-between">
        <button aria-label={`Less ${label}`} onClick={() => set(Math.max(0, value - step))} className="grid size-9 place-items-center rounded-full bg-paper shadow-sm active:scale-90"><Minus className="size-4" /></button>
        <span className="text-[24px] font-semibold tabular-nums">{value}</span>
        <button aria-label={`More ${label}`} onClick={() => set(value + step)} className="grid size-9 place-items-center rounded-full bg-paper shadow-sm active:scale-90"><Plus className="size-4" /></button>
      </div>
    </div>
  )
  return (
    <Screen className="bg-[linear-gradient(#e7ecfa,#fff_240px)]">
      <NavRow title="Back squat" />
      <div className="mt-2 flex gap-2.5"><Stepper label="kg" value={kg} set={setKg} step={2.5} /><Stepper label="reps" value={reps} set={setReps} step={1} /></div>
      <button onClick={() => { setSets([...sets, { kg, reps }]); setRest(90) }} className="mt-3 h-12 w-full rounded-full bg-ink text-[15px] font-semibold text-paper transition-transform active:scale-[0.97]">Log set {sets.length + 1}</button>
      <div className={cn("mt-3 flex items-center justify-between rounded-2xl px-4 py-3 text-[13px] transition-colors", rest ? "bg-ink text-paper" : "bg-tint text-ink-3")}>
        <span className="flex items-center gap-2"><Timer className="size-4" />{rest ? "Rest" : "Rest timer starts when you log"}</span>
        <b className="tabular-nums">{rest ? `${Math.floor(rest / 60)}:${String(rest % 60).padStart(2, "0")}` : "1:30"}</b>
      </div>
      <div className="mt-4 flex items-baseline justify-between text-[13px] text-ink-3"><span>Today{sets.some((x) => x.kg * (1 + x.reps / 30) > 100) && <b className="ml-2 rounded-full bg-amber/20 px-2 py-0.5 text-amber">New 1RM estimate</b>}</span><span className="tabular-nums">Volume {volume.toLocaleString()} kg · est. 1RM {Math.round(Math.max(...sets.map((x) => x.kg * (1 + x.reps / 30))))}</span></div>
      <ul className="mt-2 space-y-1.5">
        {sets.map((s, i) => <li key={i} className="flex animate-[pop-in_220ms_var(--ease-out)] justify-between rounded-xl bg-tint/70 px-4 py-3 text-[14px]"><span className="text-ink-3">Set {i + 1}</span><b className="tabular-nums">{s.kg} kg × {s.reps}</b></li>)}
      </ul>
    </Screen>
  )
}

/* ─── Journal ─────────────────────────────────────────────────────────── */

const TAGS = ["Alcohol", "Caffeine late", "Stressful day", "Sauna", "Travel", "Meditated"] as const
export function JournalScreen() {
  const [mood, setMood] = useState(1)
  const [picked, setPicked] = useState<string[]>(["Meditated"])
  const [saved, setSaved] = useState(false)
  const effect = picked.includes("Alcohol") ? "Alcohol usually costs you ~9 ms of HRV." : picked.includes("Caffeine late") ? "Late caffeine delays your sleep by ~40 min." : picked.includes("Meditated") ? "Meditation days: resting HR 2 bpm lower." : "Tag your day to see what moves your numbers."
  return (
    <Screen className="bg-[linear-gradient(#fdf1de,#fff_240px)]">
      <NavRow title="Journal" />
      <div className="mt-2 text-[15px] font-medium">How did today feel?</div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {[[Frown, "Rough"], [Meh, "Okay"], [Smile, "Good"]].map(([Icon, label], i) => { const I = Icon as typeof Smile; return <button key={i} aria-pressed={mood === i} onClick={() => { setSaved(false); setMood(i) }} className={cn("flex flex-col items-center gap-1 rounded-2xl py-3 text-[12px] font-medium transition-[background-color,transform] duration-150 active:scale-95", mood === i ? "bg-ink text-paper" : "bg-tint text-ink-2")}><I className="size-6" />{label as string}</button> })}
      </div>
      <div className="mt-5 text-[15px] font-medium">What shaped today?</div>
      <div className="mt-3 flex flex-wrap gap-2">
        {TAGS.map((t) => { const on = picked.includes(t); return <button key={t} aria-pressed={on} onClick={() => { setSaved(false); setPicked(on ? picked.filter((x) => x !== t) : [...picked, t]) }} className={cn("h-9 rounded-full px-3.5 text-[13px] font-medium transition-[background-color,color,transform] duration-150 active:scale-95", on ? "bg-ink text-paper" : "bg-tint text-ink-2")}>{t}</button> })}
      </div>
      <div className="mt-5 rounded-2xl bg-paper p-4 text-[14px] leading-snug text-ink-2 shadow-card">{effect}</div>
      <button onClick={() => setSaved(true)} className={cn("mt-4 h-12 w-full rounded-full text-[15px] font-semibold transition-[background-color,transform] duration-200 active:scale-[0.97]", saved ? "bg-mint text-white" : "bg-ink text-paper")}>{saved ? "Saved ✓" : "Save today"}</button>
      {saved && <p className="mt-3 animate-[pop-in_240ms_var(--ease-out)] text-center text-[13px] text-ink-2">Logged: {["rough", "okay", "good"][mood]} day{picked.length ? ` · ${picked.join(", ").toLowerCase()}` : ""}.</p>}
    </Screen>
  )
}
