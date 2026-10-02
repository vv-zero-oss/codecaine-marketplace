import { Bell, Check, ExternalLink, Pause, Play, X } from "lucide-react"
import { useEffect, useState } from "react"

import { Ring } from "@/components/motion/ring"
import { NavRow, Screen } from "@/components/screens/kit"
import { cn } from "@/lib/utils"

/* ─── Food ────────────────────────────────────────────────────────────── */

const MEALS = [
  { id: "yogurt", name: "Greek yogurt, berries, oats", kcal: 320, p: 24, c: 38, f: 8 },
  { id: "coffee", name: "Flat white, oat milk", kcal: 95, p: 3, c: 12, f: 4 },
  { id: "salmon", name: "Salmon, quinoa, greens", kcal: 540, p: 38, c: 42, f: 22 },
  { id: "bar", name: "Almond & date bar", kcal: 210, p: 6, c: 28, f: 9 },
] as const

/** Tap a meal to log it — the ring and macros recompute. */
export function FoodScreen() {
  const [logged, setLogged] = useState<string[]>(["yogurt", "coffee"])
  const sum = (k: "kcal" | "p" | "c" | "f") => MEALS.filter((m) => logged.includes(m.id)).reduce((a, m) => a + m[k], 0)
  const toggle = (id: string) => setLogged((l) => (l.includes(id) ? l.filter((x) => x !== id) : [...l, id]))
  return (
    <Screen className="bg-[linear-gradient(#fff1e3,#fff_240px)]">
      <NavRow title="Nutrition" />
      <div className="mt-2 flex items-center gap-5">
        <Ring value={(sum("kcal") / 2100) * 100} size={118} stroke={11} color="var(--color-amber)">
          <div className="text-center"><div className="text-[24px] leading-none font-semibold tabular-nums">{sum("kcal")}</div><div className="text-[11px] text-ink-3">of 2,100</div></div>
        </Ring>
        <div className="flex-1 space-y-2.5 text-[12px]">
          {([["Protein", "p", 140, "var(--color-chart-3)"], ["Carbs", "c", 230, "var(--color-chart-2)"], ["Fat", "f", 70, "var(--color-chart-1)"]] as const).map(([label, k, goal, color]) => (
            <div key={label}>
              <div className="flex justify-between text-ink-2"><span>{label}</span><span className="tabular-nums">{sum(k)}g</span></div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-line"><div className="h-full rounded-full transition-[width] duration-500 ease-out" style={{ width: `${Math.min(100, (sum(k) / goal) * 100)}%`, background: color }} /></div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 text-[13px] font-semibold text-ink-2">Today — tap to log</div>
      <ul className="mt-2 space-y-2">
        {MEALS.map((m) => (
          <li key={m.id}>
            <button onClick={() => toggle(m.id)} aria-pressed={logged.includes(m.id)} className={cn("flex w-full items-center gap-3 rounded-2xl p-3 text-left transition-[background-color,transform] duration-200 active:scale-[0.98]", logged.includes(m.id) ? "bg-paper shadow-card" : "bg-tint/70")}>
              <span className={cn("grid size-6 place-items-center rounded-full border-2 transition-colors", logged.includes(m.id) ? "border-mint bg-mint text-white" : "border-line")}>{logged.includes(m.id) && <Check className="size-3.5" />}</span>
              <span className="flex-1 text-[14px] font-medium">{m.name}</span>
              <span className="text-[13px] text-ink-3 tabular-nums">{m.kcal}</span>
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-4 rounded-2xl bg-ink p-4 text-[13px] leading-snug text-white/85">
        {sum("p") >= 100 ? "Protein is on target. Recovery will thank you tonight." : `You’re ${140 - sum("p")} g of protein short. ${logged.includes("salmon") ? "Add the almond bar to close the gap." : "The salmon bowl alone would cover most of it."}`}
      </p>
    </Screen>
  )
}

/* ─── Training plan ───────────────────────────────────────────────────── */

const MOVES = [
  { name: "Barbell back squat", sets: "4 × 6", note: "RPE 7" },
  { name: "Bulgarian split squat", sets: "3 × 8", note: "each leg" },
  { name: "Romanian deadlift", sets: "3 × 8", note: "RPE 7" },
  { name: "Plank walk-outs", sets: "3 × 10", note: "slow" },
] as const

export function PlanScreen() {
  const [done, setDone] = useState<string[]>([])
  const [running, setRunning] = useState(false)
  const [seconds, setSeconds] = useState(0)
  useEffect(() => {
    if (!running) return
    const id = window.setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => window.clearInterval(id)
  }, [running])
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0")
  const ss = String(seconds % 60).padStart(2, "0")
  return (
    <Screen className="bg-[linear-gradient(#e3f0fb,#fff_240px)]">
      <NavRow title="Lower body strength" />
      <div className="mt-1 text-[13px] text-ink-3">Built for recovery 70% · 48 min · Gym</div>
      <ul className="mt-4 space-y-2">
        {MOVES.map((m) => (
          <li key={m.name}>
            <button onClick={() => setDone((d) => (d.includes(m.name) ? d.filter((x) => x !== m.name) : [...d, m.name]))} className={cn("flex w-full items-center gap-3 rounded-2xl p-3.5 text-left transition-colors duration-200", done.includes(m.name) ? "bg-mint/10" : "bg-tint/70")}>
              <span className={cn("grid size-6 place-items-center rounded-full border-2 transition-colors", done.includes(m.name) ? "border-mint bg-mint text-white" : "border-ink-3/40")}>{done.includes(m.name) && <Check className="size-3.5" />}</span>
              <span className="flex-1"><span className={cn("block text-[14px] font-medium", done.includes(m.name) && "text-ink-3 line-through")}>{m.name}</span><span className="text-[12px] text-ink-3">{m.note}</span></span>
              <span className="text-[13px] font-semibold tabular-nums">{m.sets}</span>
            </button>
          </li>
        ))}
      </ul>
      <div className="absolute inset-x-5 bottom-10 flex items-center gap-3 rounded-full bg-ink p-1.5 pl-5 text-paper shadow-card">
        <span className="flex-1 text-[15px] font-semibold tabular-nums">{mm}:{ss}</span>
        <span className="text-[12px] text-white/50">{done.length}/{MOVES.length}</span>
        <button onClick={() => setRunning(!running)} className="flex h-11 items-center gap-1.5 rounded-full bg-paper px-5 text-[14px] font-semibold text-ink transition-transform active:scale-95">
          {running ? <><Pause className="size-4" /> Pause</> : <><Play className="size-4" /> {seconds ? "Resume" : "Start"}</>}
        </button>
      </div>
    </Screen>
  )
}

/* ─── Sources ─────────────────────────────────────────────────────────── */

const SOURCES = [
  { title: "Heart-rate variability, sleep quality and physical activity in medical students", host: "journals.sagepub.com", quote: "Higher nightly HRV tracked with longer deep-sleep share and better next-day training tolerance." },
  { title: "Real-world effects of alcohol on heart rate and sleep, by age and sex", host: "nature.com", quote: "Even one drink raised overnight resting heart rate and cut HRV for the first half of the night." },
  { title: "Consistency of sleep timing and cardiometabolic health", host: "ahajournals.org", quote: "A bedtime that varies by more than an hour carries a measurable cost, independent of duration." },
] as const

export function SourcesScreen() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <Screen className="bg-[linear-gradient(#efe9fb,#fff_220px)]">
      <NavRow title="Sources" left={<span className="grid size-9 place-items-center rounded-full bg-paper shadow-sm"><X className="size-4" /></span>} />
      <p className="mt-2 text-[14px] leading-snug text-ink-2">Meridian read <b className="text-ink">3 studies</b> before answering “Does a late drink hurt my recovery?”</p>
      <ul className="mt-4 space-y-2.5">
        {SOURCES.map((s, i) => (
          <li key={s.title}>
            <button onClick={() => setOpen(open === i ? null : i)} className="w-full rounded-2xl bg-paper p-3.5 text-left shadow-card">
              <span className="block text-[14px] leading-snug font-semibold">{s.title}</span>
              <span className="mt-1 flex items-center gap-1 text-[12px] text-ink-3"><ExternalLink className="size-3" />{s.host}</span>
              <span className={cn("grid transition-[grid-template-rows] duration-300 ease-out", open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                <span className="overflow-hidden"><span className="mt-2 block rounded-xl bg-tint p-3 text-[13px] leading-snug text-ink-2">“{s.quote}”</span></span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </Screen>
  )
}

/* ─── Check-ins ───────────────────────────────────────────────────────── */

const CHECKINS = [
  { id: "morning", label: "Morning brief", when: "7:30 a.m.", msg: "Recovery 70%. Good day to train — I’d keep it under 68% strain." },
  { id: "hydrate", label: "Hydration nudge", when: "2:00 p.m.", msg: "You’re 0.8 L behind this afternoon. A glass now keeps the evening run easy." },
  { id: "winddown", label: "Wind-down", when: "9:45 p.m.", msg: "Bedtime in an hour. Screens down and lights low gets you 40 more minutes of deep sleep." },
  { id: "weekly", label: "Weekly summary", when: "Sun 6 p.m.", msg: "Best week since March: sleep +24 min, HRV +6 ms, three workouts done." },
] as const

export function CheckinScreen() {
  const [on, setOn] = useState<string[]>(["morning", "winddown"])
  const [last, setLast] = useState<string>("morning")
  const note = CHECKINS.find((c) => c.id === last)!
  return (
    <Screen className="bg-[linear-gradient(#e5f3fb,#fff_220px)]">
      <NavRow title="Check-ins" />
      <div key={last} className="mt-2 flex animate-[pop-in_260ms_var(--ease-out)] gap-3 rounded-2xl bg-paper p-3.5 shadow-card">
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-ink text-paper"><Bell className="size-4" /></span>
        <div className="text-[13px] leading-snug"><div className="flex justify-between"><b>Meridian</b><span className="text-ink-3">now</span></div>{note.msg}</div>
      </div>
      <ul className="mt-5 space-y-2">
        {CHECKINS.map((c) => {
          const active = on.includes(c.id)
          return (
            <li key={c.id} className="flex items-center gap-3 rounded-2xl bg-tint/70 p-3.5">
              <button className="flex-1 text-left" onClick={() => setLast(c.id)}>
                <span className="block text-[14px] font-medium">{c.label}</span>
                <span className="text-[12px] text-ink-3">{c.when} · tap to preview</span>
              </button>
              <button
                role="switch"
                aria-checked={active}
                aria-label={c.label}
                onClick={() => { setOn(active ? on.filter((x) => x !== c.id) : [...on, c.id]); setLast(c.id) }}
                className={cn("relative h-7 w-12 rounded-full transition-colors duration-200", active ? "bg-mint" : "bg-ink-3/30")}
              >
                <span className={cn("absolute top-0.5 left-0.5 size-6 rounded-full bg-paper shadow transition-transform duration-200 ease-out", active && "translate-x-5")} />
              </button>
            </li>
          )
        })}
      </ul>
    </Screen>
  )
}
