import { ArrowDownRight, ArrowUp, ArrowUpRight, Navigation, Paperclip, Plus, X } from "lucide-react"
import { animate, motion } from "motion/react"
import { useEffect, useState } from "react"

import { useStill } from "@/components/motion"
import { LineChart } from "@/components/motion/line-chart"
import { cn } from "@/lib/utils"

/** Types `text` once on mount (or shows it whole when motion is off). */
function useTyped(text: string, speed = 0.035, delay = 0.3) {
  const still = useStill()
  const [n, setN] = useState(still ? text.length : 0)
  useEffect(() => {
    if (still) return setN(text.length)
    setN(0)
    const c = animate(0, text.length, { duration: text.length * speed, delay, ease: "linear", onUpdate: (v) => setN(Math.floor(v)) })
    return () => c.stop()
  }, [text, speed, delay, still])
  return text.slice(0, n)
}

const rise = (i: number) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 0.15 + i * 0.12, duration: 0.5, ease: [0.23, 1, 0.32, 1] as const },
})

const FRAME = "w-[min(100%,440px)] rounded-[14px] border border-line-strong bg-[#101012]/90 text-[12px] shadow-panel backdrop-blur-md"

/* ── Build ───────────────────────────────────────────────────────────── */

export function NewAgentVisual() {
  const typed = useTyped("Set up an agent for damaged-parcel claims", 0.04, 0.6)
  return (
    <div className={cn(FRAME, "p-4")}>
      <div className="flex justify-between text-[11px] text-muted"><span>New agent</span><X className="size-3" /></div>
      <motion.div {...rise(0)} className="mt-5 text-center">
        <p className="text-[22px] font-medium tracking-tight">Ask <Navigation className="inline size-4 fill-ember text-ember" /> Pilot</p>
        <p className="mt-1.5 text-muted">What would you like to accomplish?</p>
      </motion.div>
      <motion.div {...rise(1)} className="mt-4 flex flex-wrap justify-center gap-1.5">
        {["Edit knowledge base files", "Analyze trends", "Review tickets", "Answer questions", "Review & improve agents"].map((c) => (
          <span key={c} className="rounded-full border border-line bg-white/4 px-2.5 py-1 text-[11px] text-muted">{c}</span>
        ))}
      </motion.div>
      <motion.div {...rise(2)} className="mt-5 rounded-xl border border-line bg-black/40 p-3">
        <p className="min-h-10 text-text">{typed}<span className="ml-px inline-block h-3 w-px bg-text align-middle [animation:caret_1s_steps(1)_infinite]" /></p>
        <div className="mt-2 flex items-center justify-between text-faint">
          <span className="flex items-center gap-2"><Plus className="size-3" /><Paperclip className="size-3" /></span>
          <span className="flex size-6 items-center justify-center rounded-full bg-text text-onlight"><ArrowUp className="size-3" /></span>
        </div>
      </motion.div>
    </div>
  )
}

export function AgentChatVisual({ step }: { step: 1 | 2 }) {
  const ask = step === 1 ? "Make replies match our brand voice" : "Escalate to a person when a refund is over $200"
  const reads = step === 1
    ? [["Read", "Brand guidelines.pdf"], ["Read", "Saved replies"], ["Reviewed", "Past agent replies"]]
    : [["Read", "Refund policy"], ["Read", "Escalation playbook"], ["Reviewed", "Transferred tickets"]]
  return (
    <div className={cn(FRAME, "p-4")}>
      <p className="text-[11px] text-muted">Returns agent</p>
      <motion.p {...rise(0)} className="mt-5 ml-auto w-fit max-w-[80%] rounded-xl bg-white/9 px-3 py-2">{ask}</motion.p>
      <ul className="mt-5 space-y-2 text-muted">
        {reads.map(([verb, what], i) => (
          <motion.li key={what} {...rise(i + 1)}><span className="text-text">{verb}</span> <span className="text-faint">{what}</span></motion.li>
        ))}
      </ul>
      <motion.div {...rise(5)} className="mt-14 flex items-center justify-between rounded-xl border border-line bg-black/40 px-3 py-2.5 text-faint">
        Ask a follow-up…<span className="flex size-6 items-center justify-center rounded-full bg-text text-onlight"><ArrowUp className="size-3" /></span>
      </motion.div>
    </div>
  )
}

/* ── Observe ─────────────────────────────────────────────────────────── */

export function SegmentVisual() {
  const typed = useTyped("show me conversations we resolved successfully", 0.04, 0.4)
  return (
    <div className="w-[min(100%,540px)] rounded-xl border border-line-strong bg-[#101012]/90 px-3.5 py-3.5 text-[13px] shadow-panel">
      <div className="flex items-center gap-3">
        <span className="size-5 rounded-md bg-gradient-to-br from-ember via-[#ff9a3c] to-info" />
        <p className="flex-1 truncate">{typed}<span className="ml-px inline-block h-3.5 w-px bg-text align-middle [animation:caret_1s_steps(1)_infinite]" /></p>
        <span className="flex size-7 items-center justify-center rounded-full bg-text text-onlight"><ArrowUp className="size-3.5" /></span>
      </div>
    </div>
  )
}

export function ThreadsVisual() {
  const rows = [
    ["I was charged twice for the same order.", "Frustrated", "Resolved"],
    ["I want to cancel my membership.", "Frustrated", "Resolved"],
    ["I returned my order two weeks ago and still have no refund.", "Frustrated", "Resolved"],
    ["I cancelled last month and got charged again.", "Angry", "Calm"],
    ["The app says delivered but I have nothing.", "Upset", "Resolved"],
  ]
  return (
    <div className="w-[min(100%,560px)] space-y-2 px-1 text-[12px]">
      <p className="mb-3 font-mono text-[9px] tracking-wider text-faint uppercase">Frustrated customers · last 30 days</p>
      {rows.map(([q, a, b], i) => (
        <motion.div key={q} {...rise(i)} className="rounded-lg border border-line bg-surface/90 px-3 py-2.5">
          <p><span className="mr-2 font-mono text-[9px] text-faint">USER</span>{q}</p>
          <p className="mt-1 text-[10px]"><span className="text-ember">{a}</span> <span className="text-faint">›</span> <span className="text-good">{b}</span></p>
        </motion.div>
      ))}
    </div>
  )
}

export function TrendVisual() {
  const [flip, setFlip] = useState(false)
  useEffect(() => {
    const t = window.setInterval(() => setFlip((f) => !f), 5000)
    return () => window.clearInterval(t)
  }, [])
  const up = !flip
  return (
    <div className="w-[min(100%,620px)] rounded-xl border border-line bg-[#0e0e10]/90 p-5 shadow-panel">
      <p className="font-mono text-[9px] tracking-wider text-faint uppercase">{up ? "Frustrated conversations" : "Escalations"} · last 30 days</p>
      <p className="mt-3 text-[11px] text-muted">{up ? "Resolution rate" : "Escalation rate"}</p>
      <p className="text-[44px] leading-none font-medium tracking-tight tabular-nums">{up ? "52%" : "9%"} <span className="text-[11px] font-normal text-good">{up ? "↗ +23 pts since March" : "↘ −4 pts since March"}</span></p>
      <div className="mt-4 h-[200px]"><LineChart key={String(up)} trend={up ? "up" : "down"} seed={up ? 11 : 12} area duration={1.4} /></div>
      <div className="mt-3 flex gap-5 text-[11px] text-muted"><span>9% <span className="text-faint">CSAT</span></span><span>4.6 <span className="text-faint">/ 5</span></span></div>
    </div>
  )
}

/* ── Improve ─────────────────────────────────────────────────────────── */

export function ObjectiveVisual() {
  const rows = [["Resolution Rate", "52.4%", true], ["Customer Satisfaction", "4.6 / 5", true], ["Abandonment Rate", "6.1%", false], ["Escalation Rate", "9.0%", false]] as const
  const [on, setOn] = useState(0)
  return (
    <div className="w-[min(100%,640px)] rounded-2xl border border-line bg-[#0e0e10]/90 p-5 shadow-panel sm:p-7">
      <h4 className="text-[26px] font-medium tracking-tight">Choose an objective</h4>
      <p className="mt-2 text-[13px] text-muted">Pick a metric — Pilot keeps improving it for you.</p>
      <ul className="mt-6 max-w-[320px] space-y-1">
        {rows.map(([name, val, up], i) => (
          <motion.li key={name} {...rise(i)}>
            <button onClick={() => setOn(i)} className={cn("flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-[13px] transition-colors", on === i ? "bg-white/8" : "hover:bg-white/4")}>
              {name}
              <span className="flex items-center gap-2 text-[11px] text-muted tabular-nums">{val}{up ? <ArrowUpRight className="size-3 text-good" /> : <ArrowDownRight className="size-3 text-good" />}</span>
            </button>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

export function OpportunitiesVisual() {
  const cols = [
    ["Triage", ["Add order context to the first response", "Disambiguate billing intent sooner"]],
    ["Ready", ["Quick-issue menu before live agent transfer", "Read hold time before transferring"]],
    ["Running", ["Conversation memory for repeat callers"]],
    ["Adopted", []],
  ] as const
  return (
    <div className="w-[min(100%,680px)] rounded-2xl border border-line bg-[#0e0e10]/90 p-5 shadow-panel sm:p-7">
      <div className="flex items-start justify-between"><h4 className="text-[26px] font-medium tracking-tight">Opportunities</h4><span className="rounded-full bg-text px-3 py-1 text-[11px] font-medium text-onlight">Resolution Rate</span></div>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {cols.map(([name, cards], c) => (
          <div key={name} className="space-y-2">
            <p className="font-mono text-[9px] tracking-wider text-faint uppercase">{name}</p>
            {cards.map((card, i) => (
              <motion.div key={card} {...rise(c + i)} className="rounded-lg border border-line bg-surface p-2.5 text-[11px] leading-snug">
                {card}<p className="mt-2"><span className="rounded bg-good-soft px-1 py-0.5 text-[9px] text-good">+{(1.2 + i * 0.7 + c * 0.4).toFixed(1)} pts</span></p>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export function ExperimentVisual() {
  return (
    <div className="w-[min(100%,680px)] rounded-2xl border border-line bg-[#0e0e10]/90 p-5 shadow-panel sm:p-7">
      <div className="flex items-start justify-between"><h4 className="text-[22px] font-medium tracking-tight">Quick-issue menu before live transfer</h4><span className="hidden rounded bg-good-soft px-1.5 py-0.5 font-mono text-[9px] text-good sm:block">Collecting data</span></div>
      <div className="mt-4 flex gap-8 text-[11px] text-muted">
        <div><p className="font-mono text-[9px] tracking-wider text-faint uppercase">Lift vs control</p><p className="text-[28px] font-medium text-good tabular-nums">+1.2 <span className="text-[11px]">pts</span></p></div>
        <div><p className="font-mono text-[9px] tracking-wider text-faint uppercase">Running on</p><p className="text-[28px] font-medium text-text tabular-nums">10% <span className="text-[11px] text-muted">of traffic</span></p></div>
      </div>
      <div className="mt-3 h-[170px]"><LineChart trend="up" seed={21} area duration={1.6} /></div>
      <div className="mt-4 flex items-center justify-between text-[10px] text-faint">
        <span>2,431 conversations · 5 weeks</span>
        <span className="flex gap-2"><span className="rounded-full border border-line-strong px-3 py-1.5 text-text">Stop experiment</span><span className="rounded-full bg-text px-3 py-1.5 font-medium text-onlight">Scale to 100%</span></span>
      </div>
    </div>
  )
}
