import { Droplets, Flame, Moon, Wind } from "lucide-react"
import { useState } from "react"

import { Ring } from "@/components/motion/ring"
import { NavRow, Screen, ScrubChart, Segmented } from "@/components/screens/kit"
import { cn } from "@/lib/utils"

/* ─── Strain ──────────────────────────────────────────────────────────── */

const HR = {
  Day: { data: [58, 61, 74, 98, 132, 148, 126, 104, 92, 110, 138, 121, 96, 82, 74, 68, 62], labels: ["6a", "7a", "8a", "9a", "10a", "11a", "12p", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "10p"], strain: 65 },
  Week: { data: [96, 112, 88, 134, 102, 127, 118], labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], strain: 58 },
} as const

export function StrainScreen() {
  const [span, setSpan] = useState<"Day" | "Week">("Day")
  const [scrub, setScrub] = useState<number | null>(null)
  const h = HR[span]
  return (
    <Screen className="bg-[linear-gradient(#fff4ec,#fff_300px)]">
      <NavRow title="Strain Score" />
      <div className="mt-2 flex items-end gap-1">
        <span className="text-[56px] leading-none font-semibold tracking-tight tabular-nums">{h.strain}</span>
        <span className="pb-2 text-[20px] font-semibold text-ink-3">%</span>
        <span className="mb-2 ml-auto rounded-full bg-chart-1/15 px-2.5 py-1 text-[12px] font-semibold text-chart-1">Moderate</span>
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
      <div className="mt-3 flex items-center gap-2 text-[13px] text-white/60"><Moon className="size-4" /> Bedtime target tonight: 10:45 p.m.</div>
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
  const r = RECOVERY[metric]
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
      <div className="mt-3 flex items-center gap-3 rounded-2xl bg-tint p-4 text-[13px] text-ink-2"><Droplets className="size-4 text-ocean" /> Hydrate early — you ran 0.8 L low yesterday.</div>
    </Screen>
  )
}
