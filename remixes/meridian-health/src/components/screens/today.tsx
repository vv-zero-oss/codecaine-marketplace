import { Activity, Bed, HeartPulse, MessageCircle, Sun, TrendingUp } from "lucide-react"
import { useState } from "react"

import { Ring } from "@/components/motion/ring"
import { Screen, ScrubChart, Segmented, TabBar } from "@/components/screens/kit"
import { cn } from "@/lib/utils"

const RANGES = ["7D", "14D", "30D"] as const
const SERIES = {
  Strain: { color: "var(--color-chart-1)", unit: "%", value: 65, note: "A hard day. Keep tonight easy.", data: { "7D": [42, 55, 61, 48, 70, 58, 65], "14D": [40, 44, 52, 61, 49, 55, 63, 58, 66, 52, 47, 69, 60, 65], "30D": [38, 41, 46, 52, 49, 57, 60, 55, 63, 58, 50, 54, 66, 61, 59, 64, 52, 47, 60, 68, 57, 62, 53, 66, 59, 61, 56, 70, 63, 65] } },
  Sleep: { color: "var(--color-chart-2)", unit: "h", value: 8.5, note: "You banked a full cycle of deep sleep.", data: { "7D": [6.8, 7.2, 7.9, 6.5, 8.1, 7.7, 8.5], "14D": [6.5, 7, 7.4, 6.8, 7.9, 7.1, 6.6, 7.8, 8, 7.2, 7.5, 6.9, 8.1, 8.5], "30D": [6.4, 6.9, 7.2, 7.5, 6.8, 7.1, 7.7, 7.4, 6.6, 7.9, 8, 7.2, 7.6, 6.9, 7.3, 7.8, 8.2, 7.1, 6.7, 7.4, 7.9, 7.5, 8.1, 7.3, 7, 7.7, 8, 7.6, 8.2, 8.5] } },
  Recovery: { color: "var(--color-chart-3)", unit: "%", value: 70, note: "Ready to train. HRV is above baseline.", data: { "7D": [52, 61, 48, 66, 59, 72, 70], "14D": [50, 55, 61, 48, 66, 58, 63, 71, 54, 60, 68, 57, 72, 70], "30D": [49, 52, 58, 61, 55, 63, 50, 66, 59, 64, 71, 53, 60, 67, 56, 62, 69, 58, 54, 65, 72, 60, 57, 68, 63, 59, 66, 61, 72, 70] } },
} as const
type Metric = keyof typeof SERIES

/** The hero phone: pick a range, tap a metric, scrub its chart, switch tabs. */
export function TodayScreen() {
  const [range, setRange] = useState<(typeof RANGES)[number]>("7D")
  const [metric, setMetric] = useState<Metric>("Strain")
  const [tab, setTab] = useState("today")
  const [scrub, setScrub] = useState<number | null>(null)
  const s = SERIES[metric]
  const data = s.data[range] as readonly number[] as number[]
  const shown = scrub === null ? s.value : data[scrub]
  return (
    <Screen className="bg-[linear-gradient(#e9f0fc,#fff_240px)]">
      <div className="text-[13px] font-medium text-ink-3">Thursday, 2 October</div>
      <h3 className="text-[30px] font-semibold tracking-tight">{tab === "today" ? "Today" : tab === "trends" ? "Trends" : "Coach"}</h3>

      {tab === "coach" ? (
        <div className="mt-4 rounded-3xl bg-tint p-5 text-[15px] leading-snug">
          <div className="mb-1 font-semibold">Morning, Alex.</div>
          Your recovery is 70% and sleep was long. Today is a good day for the tempo run — keep the effort steady and drink before you’re thirsty.
        </div>
      ) : (
        <>
          <div className="mt-4 flex items-center gap-4 rounded-3xl bg-paper p-4 shadow-card">
            <Ring value={tab === "today" ? (metric === "Sleep" ? (s.value / 10) * 100 : s.value) : 0} size={92} stroke={9} color={s.color}>
              <div className="text-center">
                <div className="text-[26px] leading-none font-semibold tracking-tight tabular-nums">{Number(shown).toFixed(metric === "Sleep" ? 1 : 0)}</div>
                <div className="text-[11px] text-ink-3">{s.unit}</div>
              </div>
            </Ring>
            <div>
              <div className="text-[13px] font-medium text-ink-3">{metric} score</div>
              <div className="mt-0.5 text-[15px] leading-snug font-medium">{s.note}</div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2.5">
            {(Object.keys(SERIES) as Metric[]).map((name) => {
              const Icon = name === "Strain" ? Activity : name === "Sleep" ? Bed : HeartPulse
              return (
                <button
                  key={name}
                  onClick={() => setMetric(name)}
                  aria-pressed={metric === name}
                  className={cn("rounded-2xl p-3 text-left transition-[background-color,transform,box-shadow] duration-200 active:scale-95", metric === name ? "bg-ink text-paper shadow-card" : "bg-tint")}
                >
                  <Icon className="size-4" style={{ color: metric === name ? "#fff" : SERIES[name].color }} />
                  <div className="mt-3 text-[20px] leading-none font-semibold tabular-nums">
                    {SERIES[name].value}
                    <span className="text-[11px] font-medium opacity-60">{SERIES[name].unit}</span>
                  </div>
                  <div className="mt-1 text-[11px] opacity-60">{name}</div>
                </button>
              )
            })}
          </div>

          <div className="mt-5 flex items-center justify-between">
            <div className="text-[15px] font-semibold">{tab === "trends" ? "Last " : "Past "}{range.replace("D", " days")}</div>
            <Segmented options={RANGES} value={range} onChange={setRange} className="w-40" />
          </div>
          <div className="mt-4 pb-6">
            <ScrubChart key={metric + range} data={data} color={s.color} height={150} format={(v) => `${v}${s.unit}`} onScrub={setScrub} />
            <p className="mt-2 text-[12px] text-ink-3">Drag across the chart to read any day.</p>
          </div>
        </>
      )}

      <TabBar
        value={tab}
        onChange={setTab}
        items={[
          { id: "today", label: "Today", icon: <Sun className="size-5" /> },
          { id: "trends", label: "Trends", icon: <TrendingUp className="size-5" /> },
          { id: "coach", label: "Coach", icon: <MessageCircle className="size-5" /> },
        ]}
      />
    </Screen>
  )
}
