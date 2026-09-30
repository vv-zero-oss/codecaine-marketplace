import { useEffect, useRef, useState } from "react"
import {
  Bot,
  Briefcase,
  CalendarCheck,
  ChevronDown,
  Clock,
  Copy,
  DollarSign,
  GitBranch,
  Mail,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Search,
  Send,
  User,
  Zap,
} from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

import { EASE } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { usePlay } from "./capture"
import { Avatar, Card, Chip, CompanyMark, type Tone } from "./kit"

/* ─────────────────────────── Workflow ─────────────────────────── */

type FlowNode = { id: string; x: number; y: number; w?: number; h?: number; icon: typeof Mail; tone: string; title: string; sub: string }

const NODES: FlowNode[] = [
  { id: "trigger", x: 40, y: 150, icon: Mail, tone: "bg-accent-tint text-accent", title: "Buyer replies", sub: "Deals in Proposal" },
  { id: "score", x: 320, y: 150, icon: Bot, tone: "bg-purple-tint text-purple", title: "Score intent", sub: "Arcline agent" },
  { id: "if", x: 600, y: 132, h: 110, icon: GitBranch, tone: "bg-orange-tint text-orange", title: "If intent ≥ 80", sub: "Condition" },
  { id: "book", x: 870, y: 60, icon: CalendarCheck, tone: "bg-green-tint text-green", title: "Propose a meeting", sub: "3 slots from calendar" },
  { id: "draft", x: 870, y: 250, icon: Send, tone: "bg-yellow-tint text-yellow", title: "Draft follow-up", sub: "Held for review" },
]

const EDGES = [
  "M256 187 H320",
  "M536 187 H600",
  "M816 170 H840 Q852 170 852 158 V109 Q852 97 864 97 H870",
  "M816 205 H840 Q852 205 852 217 V275 Q852 287 864 287 H870",
]

/**
 * A workflow on a dotted canvas: the trigger wears its blue tab, the
 * connectors draw themselves in, and a status pill rises over the running
 * step, then reports it done.
 */
export function WorkflowCanvas() {
  const ref = useRef<HTMLDivElement>(null)
  const { play, still } = usePlay(ref)
  const [status, setStatus] = useState<"running" | "done">(still ? "done" : "running")

  useEffect(() => {
    if (!play || still) return
    const id = window.setInterval(() => setStatus((s) => (s === "running" ? "done" : "running")), 2400)
    return () => window.clearInterval(id)
  }, [play, still])

  return (
    <div ref={ref} className="texture-dots relative h-[400px] w-[1120px] overflow-hidden rounded-window bg-canvas">
      <svg className="absolute inset-0 size-full" fill="none">
        {EDGES.map((d, i) => (
          <path
            key={d}
            d={d}
            stroke="var(--line-bold)"
            strokeWidth={1}
            strokeDasharray={400}
            style={{
              ["--line-length" as string]: 400,
              animation: play && !still ? `draw-line 900ms var(--ease-out-cubic) ${0.2 + i * 0.18}s both` : undefined,
            }}
          />
        ))}
      </svg>
      {NODES.map((n, i) => (
        <motion.div
          key={n.id}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={play ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.45, ease: EASE.out, delay: i * 0.12 }}
          className="absolute"
          style={{ left: n.x, top: n.y }}
        >
          {n.id === "trigger" && (
            <span className="absolute -top-6 left-0 flex h-6 items-center gap-1 rounded-t-[10px] bg-accent-strong px-2.5 text-caption text-white">
              ▷ Trigger
            </span>
          )}
          {n.id === "score" && (
            <AnimatePresence mode="wait">
              <motion.span
                key={status}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease: EASE.out }}
                className="absolute -top-8 left-1/2 -translate-x-1/2"
              >
                <Chip tone={status === "running" ? "accent" : "green"} className="h-6 rounded-full text-caption">
                  {status === "running" ? "● running" : "✓ completed"}
                </Chip>
              </motion.span>
            </AnimatePresence>
          )}
          <div
            className={cn(
              "relative flex w-[216px] gap-2.5 rounded-[15px] bg-surface p-2.5 shadow-card",
              n.id === "trigger" && "rounded-tl-none shadow-(--shadow-outline-accent)",
            )}
            style={{ height: n.h ?? 74 }}
          >
            <span className={cn("flex size-[26px] shrink-0 items-center justify-center rounded-control", n.tone)}>
              <n.icon className="size-3.5" />
            </span>
            <div>
              <p className="text-[15px] font-medium text-ink">{n.title}</p>
              <p className="text-caption text-ink-2">{n.sub}</p>
              {n.id === "if" && (
                <div className="mt-2 flex flex-col gap-1 text-caption text-ink-3">
                  <span>True →</span>
                  <span>False →</span>
                </div>
              )}
            </div>
            <span className="absolute top-1/2 -left-[3px] size-1.5 -translate-y-1/2 rounded-full border border-line-bold bg-canvas" />
            <span className="absolute top-1/2 -right-[3px] size-1.5 -translate-y-1/2 rounded-full border border-line-bold bg-canvas" />
          </div>
        </motion.div>
      ))}
    </div>
  )
}

/** A sequence's six steps: done in green, the current one pulsing, the rest waiting. */
export function SequenceSteps() {
  const steps = ["Intro email", "LinkedIn touch", "Follow-up + case study", "Call", "Breakup email", "Handoff"]
  return (
    <Card className="w-[400px] p-4">
      <div className="flex items-center gap-2 text-sm text-ink">
        <Zap className="size-3.5 text-yellow" /> Enterprise outbound
        <Chip tone="green" className="ml-auto h-5 text-caption">Adapting</Chip>
      </div>
      <div className="mt-3 flex gap-1">
        {steps.map((s, i) => (
          <span
            key={s}
            className={cn("h-1.5 flex-1 rounded-full", i < 2 ? "bg-green" : i === 2 ? "animate-pulse bg-accent" : "bg-hover-2")}
          />
        ))}
      </div>
      <ul className="mt-3 flex flex-col gap-1.5 text-caption">
        {steps.slice(0, 4).map((s, i) => (
          <li key={s} className={cn("flex items-center gap-2", i < 2 ? "text-ink-3 line-through" : i === 2 ? "text-ink" : "text-ink-2")}>
            <span className="w-4 text-ink-3 tabular">{i + 1}</span> {s}
            {i === 2 && <span className="ml-auto text-accent-ink">Maya replied — sending case study</span>}
          </li>
        ))}
      </ul>
    </Card>
  )
}

/* ─────────────────────────── Kanban ─────────────────────────── */

const STAGES: { name: string; dot: string; deals: { company: string; tone: Tone; value: string; date: string; owner: string; next: string; age: string }[] }[] = [
  {
    name: "Qualified",
    dot: "bg-orange",
    deals: [
      { company: "Loom", tone: "red", value: "20,800", date: "Oct 14", owner: "D", next: "Discovery call", age: "3d" },
      { company: "Discord", tone: "accent", value: "12,400", date: "Oct 30", owner: "S", next: "Send one-pager", age: "6d" },
    ],
  },
  {
    name: "Discovery",
    dot: "bg-accent",
    deals: [
      { company: "Fieldwork", tone: "green", value: "48,000", date: "Nov 2", owner: "P", next: "Demo Thursday", age: "12d" },
      { company: "Webflow", tone: "yellow", value: "31,200", date: "Nov 18", owner: "M", next: "Security pack", age: "4d" },
    ],
  },
  {
    name: "Proposal",
    dot: "bg-purple",
    deals: [{ company: "Kestrel Health", tone: "purple", value: "96,000", date: "Oct 28", owner: "A", next: "Legal review", age: "9d" }],
  },
  {
    name: "Won",
    dot: "bg-green",
    deals: [{ company: "Orbital Freight", tone: "orange", value: "64,500", date: "Sep 26", owner: "T", next: "Kickoff booked", age: "1d" }],
  },
]

/** The pipeline board: four stages, each deal a small record. */
export function PipelineBoard() {
  const ref = useRef<HTMLDivElement>(null)
  const { play } = usePlay(ref)
  return (
    <div ref={ref} className="flex w-[1160px] gap-4">
      {STAGES.map((stage, s) => (
        <div key={stage.name} className="w-[272px] shrink-0 rounded-t-card bg-surface/60 p-2">
          <div className="flex h-9 items-center gap-2 px-1.5 text-sm font-semibold text-ink">
            <span className={cn("size-2 rounded-full", stage.dot)} /> {stage.name}
            <span className="rounded bg-hover-2 px-1.5 text-caption font-normal text-ink-2">{stage.deals.length}</span>
            <Plus className="ml-auto size-3.5 text-ink-3" />
          </div>
          <div className="flex flex-col gap-2">
            {stage.deals.map((d, i) => (
              <motion.div
                key={d.company}
                initial={{ opacity: 0, y: 10 }}
                animate={play ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: EASE.out, delay: s * 0.1 + i * 0.08 }}
                className="rounded-card border border-white/[0.06] bg-surface pt-1.5"
              >
                {[
                  { icon: Briefcase, el: <span className="text-ink underline decoration-line-bold underline-offset-2"><CompanyMark name={d.company} tone={d.tone} size={14} /> {d.company}</span> },
                  { icon: Clock, el: <span className="text-ink-soft">{d.date}</span> },
                  { icon: DollarSign, el: <span className="text-ink tabular"><span className="text-ink-3">USD</span> ${d.value}</span> },
                  { icon: User, el: <span className="flex items-center gap-1.5 text-ink-soft"><Avatar initials={d.owner} tone={d.tone} size={14} /> Owner</span> },
                  { icon: Send, el: <span className="text-ink-2">{d.next}</span> },
                ].map((row, r) => (
                  <div key={r} className="flex h-8 items-center gap-2 px-2.5 text-sm">
                    <row.icon className="size-3.5 text-ink-3" />
                    {row.el}
                  </div>
                ))}
                <div className="flex h-10 items-center gap-3 border-t border-line px-2.5 text-ink-3">
                  <MessageSquare className="size-3.5" /> <Mail className="size-3.5" /> <MoreHorizontal className="size-3.5" />
                  <span className="ml-auto text-caption opacity-80">⏱ {d.age}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ─────────────────────────── Analyst ─────────────────────────── */

/** An answer that shows its working: tools used, then the SQL it ran. */
export function AnalystCard() {
  const [copied, setCopied] = useState(false)
  return (
    <div className="flex w-[440px] flex-col gap-3">
      <div className="ml-auto rounded-[10px] bg-white/[0.06] px-2.5 py-1.5 text-sm text-ink">What's our Q4 commit by region?</div>
      <Card className="p-5">
        <p className="flex items-center gap-1 text-caption text-ink-2">
          2 tools used <ChevronDown className="size-3" />
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <span className="flex h-[23px] items-center gap-1.5 rounded-control border border-line-strong px-2 text-caption text-ink-soft">
            <Search className="size-3" /> Fields searched: 19 results
          </span>
          <span className="flex h-[23px] items-center gap-1.5 rounded-control border border-line-strong px-2 text-caption text-ink-soft">
            <Zap className="size-3" /> Query ran: 1,452 rows in 6.2s
          </span>
        </div>
        <div className="relative mt-3 overflow-hidden rounded-card bg-inset p-3 font-mono text-[11px] leading-[17px] text-ink-soft">
          <button
            type="button"
            onClick={() => {
              setCopied(true)
              window.setTimeout(() => setCopied(false), 1400)
            }}
            className="absolute top-2 right-2 flex h-6 items-center gap-1 rounded-control px-1.5 text-micro text-ink-2 transition-colors hover:bg-hover-2 hover:text-ink"
            aria-label="Copy query"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={copied ? "done" : "copy"}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-1"
              >
                {copied ? "Copied" : <Copy className="size-3" />}
              </motion.span>
            </AnimatePresence>
          </button>
          <p><span className="text-purple">SELECT</span> region, <span className="text-accent-ink">sum</span>(amount)</p>
          <p><span className="text-purple">FROM</span> deals</p>
          <p><span className="text-purple">WHERE</span> close_quarter = <span className="text-green">'2026-Q4'</span></p>
          <p className="opacity-50"><span className="text-purple">AND</span> forecast = <span className="text-green">'commit'</span></p>
        </div>
        <p className="mt-3 text-sm text-ink-soft">
          <span className="font-semibold text-ink">$1.24M commit.</span> North America $712k, EMEA $418k, APAC $110k.
        </p>
      </Card>
    </div>
  )
}

/* ─────────────────────────── Charts ─────────────────────────── */

/** Pipeline by region: two smooth lines, revealed left to right. */
export function LineChart() {
  const ref = useRef<HTMLDivElement>(null)
  const { play } = usePlay(ref)
  const us = "M0 110 C60 100 90 70 150 74 S250 40 310 46 S420 18 520 22"
  const emea = "M0 130 C70 126 110 110 170 112 S270 88 330 90 S440 70 520 64"
  return (
    <Card className="w-[560px] p-4">
      <div ref={ref} className="flex items-center gap-3 text-sm text-ink">
        Pipeline by region
        <span className="ml-auto flex items-center gap-3 text-caption text-ink-2">
          <span className="flex items-center gap-1.5"><span className="size-[7px] rounded-full bg-accent-strong" /> North America</span>
          <span className="flex items-center gap-1.5"><span className="size-[7px] rounded-full bg-green" /> EMEA</span>
        </span>
      </div>
      <svg viewBox="0 0 520 150" className="mt-3 h-[150px] w-full overflow-visible" fill="none">
        {[30, 70, 110, 150].map((y) => (
          <line key={y} x1={0} x2={520} y1={y} y2={y} stroke="var(--line)" />
        ))}
        <g
          style={{
            clipPath: play ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
            transition: "clip-path 1.2s var(--ease-reveal) 0.1s",
          }}
        >
          <path d={`${emea} V150 H0 Z`} fill="var(--green)" opacity={0.1} />
          <path d={emea} stroke="var(--green)" strokeWidth={1.5} />
          <path d={us} stroke="var(--accent-strong)" strokeWidth={1.5} />
        </g>
      </svg>
      <div className="mt-1 flex justify-between text-micro text-ink-3">
        {["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
    </Card>
  )
}

/** Account health: stacked bars that grow from the floor. */
export function HealthBars() {
  const ref = useRef<HTMLDivElement>(null)
  const { play } = usePlay(ref)
  const bars = [
    [60, 22, 8],
    [66, 18, 10],
    [58, 24, 14],
    [72, 16, 6],
    [78, 12, 5],
  ]
  return (
    <Card className="w-[560px] p-4">
      <div ref={ref} className="flex items-center gap-4 text-sm text-ink">
        Account health
        <span className="ml-auto flex gap-3 text-caption text-ink-2">
          <span className="flex items-center gap-1.5"><span className="size-[7px] rounded-full bg-accent-strong" /> Healthy</span>
          <span className="flex items-center gap-1.5"><span className="size-[7px] rounded-full bg-yellow" /> Watch</span>
          <span className="flex items-center gap-1.5"><span className="size-[7px] rounded-full bg-red" /> At risk</span>
        </span>
      </div>
      <div className="mt-4 flex h-[220px] items-end justify-around gap-6 border-b border-line px-4">
        {bars.map((b, i) => (
          <motion.div
            key={i}
            className="flex w-[58px] flex-col-reverse origin-bottom"
            initial={{ scaleY: 0 }}
            animate={play ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, ease: EASE.outCubic, delay: 0.1 + i * 0.08 }}
          >
            <span className="bg-accent-strong" style={{ height: b[0] * 2 }} />
            <span className="bg-yellow" style={{ height: b[1] * 2 }} />
            <span className="bg-red" style={{ height: b[2] * 2 }} />
          </motion.div>
        ))}
      </div>
      <div className="mt-1.5 flex justify-around text-micro text-ink-3">
        {["May", "Jun", "Jul", "Aug", "Sep"].map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
    </Card>
  )
}

/** The accounts at risk, numbered, each with the reasons behind it. */
export function RiskList() {
  const risks = [
    { name: "Kestrel Health", tone: "purple" as Tone, lines: [["Usage", "down 22% this month"], ["Champion", "changed roles"]] },
    { name: "Parcelwise", tone: "accent" as Tone, lines: [["Tickets", "3 unhappy this week"], ["Renewal", "in 41 days"]] },
  ]
  return (
    <Card className="flex w-[480px] flex-col gap-4 p-4">
      {risks.map((r, i) => (
        <div key={r.name} className="flex flex-col gap-2">
          <p className="flex items-center gap-2 text-sm text-ink">
            <span className="text-ink-3 tabular">{i + 1}.</span>
            <span className="flex h-9 items-center gap-2 rounded-card bg-surface px-2.5 shadow-card">
              <CompanyMark name={r.name} tone={r.tone} /> {r.name}
            </span>
            <span className="ml-auto flex items-center gap-1 text-caption text-red">● High</span>
          </p>
          <ul className="flex flex-col gap-1 pl-6">
            {r.lines.map(([k, v]) => (
              <li key={k} className="text-caption text-ink-2">
                · <span className="text-ink">{k}:</span> {v}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </Card>
  )
}

/* ─────────────────────────── Signals ─────────────────────────── */

const SIGNALS: { who: string; tone: Tone; label: string; chip: string; chipTone: "green" | "purple" | "accent" | "yellow" }[] = [
  { who: "Loom", tone: "red", label: "Seat growth this month", chip: "+42% seats", chipTone: "green" },
  { who: "Supabase", tone: "orange", label: "Raised a round", chip: "$250M Series D", chipTone: "purple" },
  { who: "Fieldwork", tone: "green", label: "New executive", chip: "VP Revenue", chipTone: "accent" },
  { who: "Webflow", tone: "yellow", label: "Opened a new team", chip: "Enterprise AEs", chipTone: "yellow" },
  { who: "Linear", tone: "accent", label: "Visited pricing", chip: "4 times", chipTone: "accent" },
]

/** Signals streaming onto accounts — a column that scrolls without end. */
export function SignalsFeed() {
  const items = [...SIGNALS, ...SIGNALS]
  return (
    <div className="fade-y h-[300px] w-[380px] overflow-hidden">
      <div className="flex animate-scroll-y flex-col gap-3 [--scroll-duration:24s] motion-reduce:animate-none">
        {items.map((s, i) => (
          <div key={i} className="flex flex-col gap-1.5">
            <p className="flex items-center gap-2 text-caption text-ink-soft">
              <CompanyMark name={s.who} tone={s.tone} /> {s.who}
            </p>
            <Card className="flex items-center gap-2 px-3 py-2.5 text-caption text-ink-2">
              {s.label}
              <Chip tone={s.chipTone} className="ml-auto h-6 text-caption">{s.chip}</Chip>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}

/** A person's card on top of two copies — "the record changed". */
export function RecordStack() {
  return (
    <div className="relative h-[260px] w-[380px]">
      <div className="absolute top-6 left-10 h-[210px] w-[300px] rotate-[-5deg] rounded-card bg-surface/60 shadow-card" />
      <div className="absolute top-3 left-10 h-[210px] w-[300px] rotate-[3deg] rounded-card bg-surface/80 shadow-card" />
      <Card className="absolute top-0 left-10 w-[300px] p-4 shadow-raised">
        <div className="flex items-center gap-2.5">
          <Avatar initials="MO" tone="green" size={32} />
          <div>
            <p className="text-sm font-semibold text-ink">Maya Okonkwo</p>
            <p className="text-caption text-ink-2">
              <span className="text-ink-3 line-through">Head of Sales</span> → VP Revenue
            </p>
          </div>
        </div>
        <ul className="mt-3 flex flex-col gap-1.5 text-caption text-ink-2">
          <li className="text-accent-ink">maya@fieldwork.co <span className="text-ink-3">+3</span></li>
          <li>Lisbon, Portugal</li>
          <li className="flex items-center gap-1.5"><CompanyMark name="Fieldwork" tone="green" size={14} /> Fieldwork</li>
        </ul>
        <p className="mt-3 flex items-center gap-3 border-t border-line pt-3 text-caption text-ink-3">
          4 · ✓ · <MessageSquare className="size-3" /> <span className="ml-auto">1d</span>
        </p>
      </Card>
    </div>
  )
}
