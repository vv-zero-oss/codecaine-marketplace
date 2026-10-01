import {
  Bell, BarChart3, ChevronsUpDown, CircleCheck, CreditCard, Home, Inbox, LineChart as TrendIcon, PanelLeft,
  Sparkles, SquareTerminal, Ticket, TrendingUp, ArrowUp, Navigation, Plus,
} from "lucide-react"
import { motion, useScroll, useTransform } from "motion/react"
import { useRef, useState } from "react"
import { useCanvasAction } from "@canvas/react"

import { LineChart } from "@/components/motion/line-chart"
import { HaloMark } from "@/components/ui/wordmark"
import { Container } from "@/components/ui/container"
import { Glow } from "@/components/ui/glow"
import { SHOWCASE } from "@/content"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { label: "Dashboard", icon: Home },
  { label: "Tickets", icon: Ticket },
  { label: "Review", icon: CircleCheck },
  { label: "KPIs", icon: TrendingUp },
  { label: "Metrics", icon: BarChart3 },
  { label: "Alerts", icon: Bell },
  { label: "Billing", icon: CreditCard },
]
const RANGES = ["1W", "4W", "3M", "12M", "YTD"]
const RANGE_SERIES = { "1W": 1, "4W": 2, "3M": 3, "12M": 4, YTD: 5 } as const

function Pill({ children, tone = "good" }: { children: React.ReactNode; tone?: "good" | "info" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-[5px] px-1.5 py-0.5 text-[10px] font-medium",
        tone === "good" ? "bg-good-soft text-good" : "bg-info/20 text-iris",
      )}
    >
      {children}
    </span>
  )
}

/** The product window: a believable KPI screen. Range tabs retarget the chart
 *  and the auto-improve switch really switches. */
export function ConsoleMock() {
  const [range, setRange] = useState<keyof typeof RANGE_SERIES>("1W")
  const [auto, setAuto] = useState(true)
  useCanvasAction("Auto-improve switch", (next) => setAuto(next ?? !auto), { on: auto, group: "Console" })

  return (
    <div className="overflow-hidden rounded-[14px] border border-line bg-panel text-text shadow-panel">
      <div className="flex h-[58px] items-center justify-between border-b border-line px-4 text-[13px]">
        <div className="flex min-w-0 items-center gap-3">
          <PanelLeft className="size-3.5 text-faint" />
          <span className="size-2.5 rounded-[3px] bg-iris" />
          <span className="truncate font-medium">Northwind Parcel</span>
          <span className="text-faint">/</span>
          <span className="hidden text-muted sm:inline">Operations</span>
          <span className="hidden items-center gap-1 rounded-md bg-good-soft px-1.5 py-0.5 text-[10px] text-good sm:inline-flex">
            <span className="size-1 rounded-full bg-good" />
            Prod
            <ChevronsUpDown className="size-2.5" />
          </span>
        </div>
        <HaloMark className="absolute left-1/2 hidden size-5 -translate-x-1/2 md:block" />
        <span className="hidden items-center gap-1.5 rounded-lg border border-line bg-white/4 px-2.5 py-1.5 text-xs sm:inline-flex">
          Work with <Navigation className="size-2.5 fill-current" /> Pilot
        </span>
      </div>

      <div className="grid lg:grid-cols-[168px_1fr]">
        <aside className="hidden border-r border-line p-2.5 text-[12px] lg:block">
          <div className="mb-3 grid grid-cols-2 rounded-lg bg-white/5 p-0.5 text-center">
            <span className="flex items-center justify-center gap-1 rounded-md bg-white/10 py-1.5"><SquareTerminal className="size-3" />Console</span>
            <span className="flex items-center justify-center gap-1 py-1.5 text-faint"><Navigation className="size-3" />Pilot</span>
          </div>
          <ul className="space-y-0.5">
            {NAV_ITEMS.map(({ label, icon: Icon }) => (
              <li key={label} className={cn("flex items-center gap-2.5 rounded-md px-2.5 py-1.5", label === "KPIs" ? "bg-white/9 text-text" : "text-muted")}>
                <Icon className="size-3.5" /> {label}
              </li>
            ))}
          </ul>
          <p className="mt-5 mb-1.5 px-2.5 text-[10px] text-faint">Agents</p>
          <ul className="space-y-0.5 text-faint">
            {["Pickup & drop-off", "In-transit", "End-to-end", "Post-delivery"].map((a) => (
              <li key={a} className="flex items-center gap-2.5 px-2.5 py-1.5"><Sparkles className="size-3" />{a}</li>
            ))}
          </ul>
        </aside>

        <div className="min-w-0 p-3 sm:p-4">
          <div className="flex flex-wrap items-center justify-between gap-3 text-[12px]">
            <p className="text-muted">KPIs <span className="mx-1 text-faint">›</span> <span className="text-text">Revenue Recovery</span></p>
            <div className="flex items-center gap-2">
              <div role="tablist" aria-label="Range" className="flex rounded-lg bg-white/5 p-0.5">
                {RANGES.map((r) => (
                  <button
                    key={r}
                    role="tab"
                    aria-selected={range === r}
                    onClick={() => setRange(r as keyof typeof RANGE_SERIES)}
                    className={cn("rounded-md px-2.5 py-1 text-[11px] transition-colors", range === r ? "bg-white/12 text-text" : "text-faint hover:text-muted")}
                  >
                    {r}
                  </button>
                ))}
              </div>
              <span className="hidden rounded-lg border border-line px-2.5 py-1.5 text-[11px] sm:inline">Edit KPI <kbd className="ml-1 rounded border border-line px-1 text-[9px] text-faint">E</kbd></span>
            </div>
          </div>

          <div className="mt-5 grid gap-4 xl:grid-cols-[1fr_auto]">
            <div>
              <h3 className="flex flex-wrap items-center gap-3 text-[22px] font-medium tracking-tight">
                Revenue Recovery <Pill tone="info"><TrendingUp className="size-2.5" />Trending to goal</Pill>
              </h3>
              <p className="mt-1.5 text-[11px] text-faint">
                Last measured <b className="font-medium text-text">Jun 15, 17:00</b> &nbsp; Windows <b className="font-medium text-text">14 / 14</b> &nbsp; Sample size <b className="font-medium text-text">83</b>
              </p>
              <div className="mt-4 flex gap-6 rounded-xl border border-line bg-white/3 p-4">
                {[
                  { label: "Current", value: "61%", pill: "↗ 15.8%" },
                  { label: "Potential", value: "84%", pill: "+ 23 pts" },
                ].map((k) => (
                  <div key={k.label}>
                    <p className="font-mono text-[9px] tracking-wider text-faint uppercase">{k.label}</p>
                    <p className="mt-1.5 flex items-center gap-2 text-[28px] leading-none font-medium tracking-tight tabular-nums">
                      {k.value} <Pill>{k.pill}</Pill>
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="self-start rounded-xl bg-white/5 p-3.5 text-[12px] xl:mt-8 xl:w-[345px]">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2.5">
                  <button
                    type="button"
                    role="switch"
                    aria-checked={auto}
                    aria-label="Auto-improve this KPI"
                    onClick={() => setAuto(!auto)}
                    className={cn("relative h-4 w-7 rounded-full transition-colors duration-200", auto ? "bg-info" : "bg-white/20")}
                  >
                    <span className={cn("absolute top-0.5 left-0.5 size-3 rounded-full bg-white transition-transform duration-200 ease-out-expo", auto && "translate-x-3")} />
                  </button>
                  Auto-improve this KPI with <Navigation className="size-2.5 fill-current" /> Pilot
                </label>
                <span className="rounded-md border border-line px-2 py-0.5 text-[11px]">Daily</span>
              </div>
              <p className="mt-2 text-[10px] text-faint">{auto ? "Last ran on Jun 15, 17:00 with no changes" : "Paused — Pilot will not run experiments"}</p>
            </div>
          </div>

          <div className="relative mt-5 h-[200px] sm:h-[250px]">
            {[["GOAL", "70%", "18%"], ["WARN", "25%", "62%"], ["CRITICAL", "20%", "76%"]].map(([l, v, top]) => (
              <div key={l} className="absolute inset-x-0 flex items-center gap-3" style={{ top }}>
                <span className="h-px flex-1 border-t border-dotted border-white/15" />
                <span className="font-mono text-[9px] text-faint">{l} {v}</span>
              </div>
            ))}
            <LineChart key={range} trend={range === "1W" ? "wave" : "up"} seed={RANGE_SERIES[range]} duration={1.4} className="absolute inset-0 pr-16" />
          </div>
        </div>
      </div>
    </div>
  )
}

/** The headline and the window rising into view as the page scrolls, fading
 *  at its bottom edge into the next block. */
export function ConsoleShowcase() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 35%"] })
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1])
  const lift = useTransform(scrollYProgress, [0, 1], [60, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0.25, 1])

  return (
    <section id="console" ref={ref} className="relative overflow-hidden pb-16 pt-12 sm:pt-20">
      <Glow tone="teal" intensity={0.16} />
      <Container className="relative">
        <h2 className="max-w-[700px] text-[clamp(22px,2.4vw,32px)] leading-[1.15] font-medium tracking-[-0.025em]">{SHOWCASE.title}</h2>
        <motion.div style={{ scale, y: lift, opacity }} className="mt-8 origin-top [mask-image:linear-gradient(to_bottom,#000_72%,transparent)]">
          <ConsoleMock />
        </motion.div>
      </Container>
    </section>
  )
}
