import { Check, Droplets, Flame, Minus, Moon, Plus, Wind } from "lucide-react"
import { useEffect, useState } from "react"

import { Ring } from "@/components/motion/ring"
import { NavRow, Screen, ScrubChart, Segmented } from "@/components/screens/kit"
import { cn } from "@/lib/utils"

/* ─── Strain ──────────────────────────────────────────────────────────── */

const HR = {
  Day: { data: [58, 61, 74, 98, 132, 148, 126, 104, 92, 110, 138, 121, 96, 82, 74, 68, 62], labels: ["6a", "7a", "8a", "9a", "10a", "11a", "12p", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "10p"], strain: 65 },
  Week: { data: [96, 112, 88, 134, 102, 127, 118], labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], strain: 58 },
} as const

const WORKOUTS = [
  { id: "run", name: "Morning run", meta: "5.2 km · 31 min", add: 14 },
  { id: "lift", name: "Strength session", meta: "Lower body · 48 min", add: 9 },
  { id: "walk", name: "Walk to the studio", meta: "2.1 km · 24 min", add: 3 },
] as const

export function StrainScreen() {
  const [span, setSpan] = useState<"Day" | "Week">("Day")
  const [scrub, setScrub] = useState<number | null>(null)
  const [done, setDone] = useState<string[]>(["run"])
  const h = HR[span]
  const extra = WORKOUTS.filter((w) => done.includes(w.id)).reduce((a, w) => a + w.add, 0)
  const strain = Math.min(100, h.strain - 14 + extra + (span === "Week" ? 0 : 0))
  const label = strain < 40 ? "Light" : strain < 70 ? "Moderate" : "High"
  return (
    <Screen className="bg-[linear-gradient(#fff4ec,#fff_300px)]">
      <NavRow title="Strain Score" />
      <div className="mt-2 flex items-end gap-1">
        <span className="text-[56px] leading-none font-semibold tracking-tight tabular-nums">{strain}</span>
        <span className="pb-2 text-[20px] font-semibold text-ink-3">%</span>
        <span className="mb-2 ml-auto rounded-full bg-chart-1/15 px-2.5 py-1 text-[12px] font-semibold text-chart-1 transition-colors">{label}</span>
      </div>
      <Segmented options={["Day", "Week"] as const} value={span} onChange={setSpan} className="mt-4" />
      <div className="mt-6">
        <ScrubChart key={span} data={[...h.data]} labels={[...h.labels]} height={170} color="var(--color-chart-1)" format={(v) => `${v} bpm`} onScrub={setScrub} />
      </div>
      <div className="mt-3 flex items-center justify-between rounded-2xl bg-tint p-4 text-[14px]">
        <span className="text-ink-2">{scrub === null ? "Average heart rate" : `At ${h.labels[scrub]}`}</span>
        <span className="font-semibold tabular-nums">{scrub === null ? Math.round(h.data.reduce((a, b) => a + b, 0) / h.data.length) : h.data[scrub]} bpm</span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3 text-[13px]">
        <div className="rounded-2xl bg-tint p-4"><Flame className="size-4 text-chart-1" /><div className="mt-2 text-[22px] font-semibold tabular-nums">{span === "Day" ? "612" : "4,180"}</div><div className="text-ink-3">active kcal</div></div>
        <div className="rounded-2xl bg-tint p-4"><Wind className="size-4 text-chart-2" /><div className="mt-2 text-[22px] font-semibold tabular-nums">{span === "Day" ? "46" : "5h 12m"}</div><div className="text-ink-3">zone 3+ min</div></div>
      </div>
      <div className="mt-5 text-[13px] font-semibold text-ink-2">Workouts — tap to count them</div>
      <ul className="mt-2 space-y-2">
        {WORKOUTS.map((w) => {
          const on = done.includes(w.id)
          return (
            <li key={w.id}>
              <button onClick={() => setDone(on ? done.filter((x) => x !== w.id) : [...done, w.id])} aria-pressed={on} className={cn("flex w-full items-center gap-3 rounded-2xl p-3 text-left transition-[background-color,transform] duration-200 active:scale-[0.98]", on ? "bg-paper shadow-card" : "bg-tint/70")}>
                <span className={cn("grid size-6 place-items-center rounded-full border-2 transition-colors", on ? "border-chart-1 bg-chart-1 text-white" : "border-ink-3/40")}>{on && <Check className="size-3.5" />}</span>
                <span className="flex-1"><span className="block text-[14px] font-medium">{w.name}</span><span className="text-[12px] text-ink-3">{w.meta}</span></span>
                <span className="text-[13px] font-semibold text-chart-1 tabular-nums">+{w.add}%</span>
              </button>
            </li>
          )
        })}
      </ul>
    </Screen>
  )
}

/* ─── Sleep ───────────────────────────────────────────────────────────── */

const STAGES = [
  { name: "Awake", color: "#f7b267", level: 0, hours: 0.4, note: "Brief wake-ups around 3 a.m. — normal." },
  { name: "REM", color: "#7aa2ff", level: 1, hours: 2.1, note: "Dream sleep. This is when memory sets." },
  { name: "Light", color: "#4e6fd8", level: 2, hours: 3.9, note: "Most of the night, and the easiest to wake from." },
  { name: "Deep", color: "#2a3f9e", level: 3, hours: 2.1, note: "Where the body repairs. You got a full 2h 6m." },
] as const
const NIGHT = [2, 2, 3, 3, 2, 1, 2, 3, 3, 2, 0, 1, 2, 1, 2, 2, 1, 1, 0, 2, 1, 1, 2, 2]

export function SleepScreen() {
  const [stage, setStage] = useState<number | null>(3)
  const [bed, setBed] = useState(45) // minutes after 22:00
  const [alarm, setAlarm] = useState(true)
  const asleep = (7.5 * 60 + 120 - bed) / 60 // wake 07:30
  const t = 22 * 60 + bed
  const clock = `${((Math.floor(t / 60) + 11) % 12) + 1}:${String(t % 60).padStart(2, "0")} ${t >= 24 * 60 ? "a.m." : "p.m."}`
  const sel = stage === null ? null : STAGES[stage]
  return (
    <Screen className="bg-[#0f1424] text-white">
      <NavRow title="Sleep" />
      <div className="mt-2 text-[13px] text-white/50">Last night · 11:02 p.m. – 7:34 a.m.</div>
      <div className="mt-1 flex items-end justify-between">
        <div className="text-[50px] leading-none font-semibold tracking-tight">8h <span className="tabular-nums">30m</span></div>
        <Ring value={92} size={64} stroke={7} color="#7aa2ff" track="rgb(255 255 255 / 0.12)"><span className="text-[15px] font-semibold">92</span></Ring>
      </div>
      <div className="mt-8 flex h-[150px] items-start gap-[3px]">
        {NIGHT.map((level, i) => (
          <button
            key={i}
            onClick={() => setStage(level)}
            aria-label={STAGES[level].name}
            className="h-[30px] flex-1 rounded-sm transition-[opacity,transform] duration-200 active:scale-95"
            style={{ background: STAGES[level].color, opacity: stage === null || stage === level ? 1 : 0.28, marginTop: level * 40 }}
          />
        ))}
      </div>
      <div className="mt-5 grid grid-cols-4 gap-2">
        {STAGES.map((st, i) => (
          <button key={st.name} onClick={() => setStage(stage === i ? null : i)} className={cn("rounded-2xl border p-2.5 text-left text-[12px] transition-colors", stage === i ? "border-white/40 bg-white/10" : "border-white/10")}>
            <span className="mb-1.5 block size-2 rounded-full" style={{ background: st.color }} />
            <div className="text-white/60">{st.name}</div>
            <div className="font-semibold tabular-nums">{Math.floor(st.hours)}h {Math.round((st.hours % 1) * 60)}m</div>
          </button>
        ))}
      </div>
      <div className="mt-4 min-h-16 rounded-2xl bg-white/8 p-4 text-[14px] leading-snug text-white/80">
        {sel ? <><b className="text-white">{sel.name}.</b> {sel.note}</> : "Tap a stage, or a bar, to see what it did for you."}
      </div>
      <div className="mt-3 rounded-2xl bg-white/8 p-4">
        <div className="flex items-center justify-between text-[13px] text-white/60"><span className="flex items-center gap-2"><Moon className="size-4" /> Bedtime tonight</span><span className="text-white/50">{asleep.toFixed(1)} h in bed</span></div>
        <div className="mt-2 flex items-center justify-between">
          <button aria-label="Earlier" onClick={() => setBed(Math.max(0, bed - 15))} className="grid size-10 place-items-center rounded-full bg-white/10 active:scale-90"><Minus className="size-4" /></button>
          <span className="text-[26px] font-semibold tabular-nums">{clock}</span>
          <button aria-label="Later" onClick={() => setBed(Math.min(120, bed + 15))} className="grid size-10 place-items-center rounded-full bg-white/10 active:scale-90"><Plus className="size-4" /></button>
        </div>
        <button role="switch" aria-checked={alarm} onClick={() => setAlarm(!alarm)} className="mt-3 flex w-full items-center justify-between text-[13px] text-white/70">
          Wind-down reminder, 45 min before
          <span className={cn("relative h-6 w-10 rounded-full transition-colors", alarm ? "bg-mint" : "bg-white/20")}><span className={cn("absolute top-0.5 left-0.5 size-5 rounded-full bg-white transition-transform duration-200", alarm && "translate-x-4")} /></span>
        </button>
      </div>
    </Screen>
  )
}

/* ─── Recovery ────────────────────────────────────────────────────────── */

const RECOVERY = {
  HRV: { value: 62, unit: "ms", pct: 70, note: "Above your 55 ms baseline." },
  RHR: { value: 48, unit: "bpm", pct: 82, note: "Lowest in two weeks." },
  Resp: { value: 14.2, unit: "br/min", pct: 64, note: "Steady overnight." },
} as const

export function RecoveryScreen() {
  const [metric, setMetric] = useState<keyof typeof RECOVERY>("HRV")
  const [glasses, setGlasses] = useState(3)
  const [breathing, setBreathing] = useState(false)
  const [inhale, setInhale] = useState(true)
  useEffect(() => {
    if (!breathing) return
    setInhale(true)
    const id = window.setInterval(() => setInhale((v) => !v), 4000)
    return () => window.clearInterval(id)
  }, [breathing])
  const r = { ...RECOVERY[metric], pct: Math.min(99, RECOVERY[metric].pct + glasses - 3 + (breathing ? 2 : 0)) }
  return (
    <Screen className="bg-[linear-gradient(#e6f6ea,#fff_320px)]">
      <NavRow title="Recovery" />
      <div className="mt-4 grid place-items-center">
        <Ring value={r.pct} size={190} stroke={16} color="var(--color-chart-3)">
          <div className="text-center">
            <div className="text-[44px] leading-none font-semibold tracking-tight tabular-nums">{r.pct}%</div>
            <div className="mt-1 text-[13px] text-ink-3">{metric === "HRV" ? "Recovery" : metric === "RHR" ? "Heart rest" : "Breathing"}</div>
          </div>
        </Ring>
      </div>
      <Segmented options={["HRV", "RHR", "Resp"] as const} value={metric} onChange={setMetric} className="mt-7" />
      <div className="mt-4 rounded-3xl bg-paper p-5 shadow-card">
        <div className="flex items-baseline gap-1.5">
          <span className="text-[34px] font-semibold tracking-tight tabular-nums">{r.value}</span>
          <span className="text-[14px] text-ink-3">{r.unit}</span>
        </div>
        <p className="mt-1 text-[14px] text-ink-2">{r.note}</p>
      </div>
      <div className="mt-3 flex items-center gap-3 rounded-2xl bg-tint p-4 text-[13px] text-ink-2">
        <Droplets className="size-5 text-ocean" />
        <span className="flex-1"><b className="text-ink">{glasses}</b> of 8 glasses<span className="mt-1.5 flex gap-1">{Array.from({ length: 8 }, (_, i) => <span key={i} className={cn("h-1.5 flex-1 rounded-full transition-colors", i < glasses ? "bg-ocean" : "bg-line")} />)}</span></span>
        <button aria-label="Add a glass" onClick={() => setGlasses(Math.min(8, glasses + 1))} className="grid size-9 place-items-center rounded-full bg-paper shadow-sm active:scale-90"><Plus className="size-4" /></button>
      </div>
      <button onClick={() => setBreathing(!breathing)} aria-pressed={breathing} className={cn("mt-3 w-full overflow-hidden rounded-2xl p-4 text-left transition-colors duration-300", breathing ? "bg-ink text-paper" : "bg-tint")}>
        <span className="flex items-center gap-4">
          <span className="relative grid size-12 place-items-center"><span className={cn("absolute rounded-full bg-mint/40 transition-[width,height] ease-in-out", breathing ? (inhale ? "size-12" : "size-5") : "size-8")} style={{ transitionDuration: "4s" }} /><Wind className="relative size-4" /></span>
          <span className="flex-1"><span className="block text-[14px] font-semibold">{breathing ? (inhale ? "Breathe in…" : "Breathe out…") : "Breathe for 2 minutes"}</span><span className={cn("text-[12px]", breathing ? "text-white/60" : "text-ink-3")}>{breathing ? "Tap to stop" : "Slow breathing lifts tomorrow’s HRV"}</span></span>
        </span>
      </button>
    </Screen>
  )
}
