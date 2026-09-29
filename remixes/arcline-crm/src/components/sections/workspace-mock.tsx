import {
  ArrowUpRight,
  Bot,
  CalendarCheck,
  Check,
  ChevronDown,
  CircleDot,
  Clock,
  Home,
  Inbox,
  LayoutGrid,
  Mail,
  Search,
  Send,
  Settings,
  Sparkles,
  Users,
  Zap,
} from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

import { ArclineMark } from "@/components/ui/wordmark"
import type { WorkspaceTab } from "@/content"
import { curve } from "@/lib/motion"
import { cn } from "@/lib/utils"

/**
 * A picture of the product, built in HTML so it stays sharp and editable: a
 * light app window on the dark page, as product shots usually sit. Its main
 * panel changes with the tab chosen beside it.
 */

const DEALS = [
  { name: "Northbeam", stage: "Proposal", value: "$48,000", owner: "PS", heat: "hot" },
  { name: "Fieldwork", stage: "Discovery", value: "$22,500", owner: "JT", heat: "warm" },
  { name: "Kestrel Health", stage: "Negotiation", value: "$96,000", owner: "AM", heat: "hot" },
  { name: "Orbital Freight", stage: "Qualified", value: "$31,200", owner: "PS", heat: "cool" },
  { name: "Parcelwise", stage: "Proposal", value: "$18,750", owner: "LR", heat: "warm" },
  { name: "Lumen & Co", stage: "Discovery", value: "$12,400", owner: "JT", heat: "cool" },
] as const

const HEAT = {
  hot: "bg-coral/15 text-coral",
  warm: "bg-amber/15 text-[color-mix(in_oklab,var(--color-amber)_70%,var(--color-void))]",
  cool: "bg-sky/12 text-sky",
} as const

function Stat({ label, value, delta, tone }: { label: string; value: string; delta: string; tone: "up" | "down" }) {
  return (
    <div className="rounded-xl border border-black/[0.06] bg-white p-3 shadow-(--shadow-app)">
      <p className="text-[11px] text-black/50">{label}</p>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="text-[22px] tracking-[-0.02em] text-black/85">{value}</span>
        <span
          className={cn(
            "rounded px-1 text-[10px]",
            tone === "up" ? "bg-teal/15 text-forest" : "bg-coral/15 text-coral",
          )}
        >
          {delta}
        </span>
      </div>
    </div>
  )
}

function ChatPanel() {
  return (
    <div className="grid h-full gap-3 md:grid-cols-[1fr_0.9fr]">
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-3 gap-2">
          <Stat label="Open pipeline" value="$1.24M" delta="↑ 8%" tone="up" />
          <Stat label="Deals at risk" value="7" delta="↑ 2" tone="down" />
          <Stat label="Win rate" value="34%" delta="↑ 3pt" tone="up" />
        </div>
        <DealTable />
      </div>
      <div className="flex flex-col rounded-xl border border-black/[0.06] bg-white p-3">
        <p className="flex items-center gap-1.5 text-[11px] text-black/50">
          <Sparkles className="size-3" /> Arcline chat
        </p>
        <div className="mt-3 ml-auto max-w-[85%] rounded-lg rounded-br-sm bg-black/[0.05] px-2.5 py-2 text-[11px] text-black/75">
          Who went quiet after the pricing call?
        </div>
        <div className="mt-2 max-w-[92%] rounded-lg rounded-bl-sm bg-violet/10 px-2.5 py-2 text-[11px] leading-relaxed text-black/75">
          Three accounts haven't replied in 9+ days: <b className="font-medium">Northbeam</b>,{" "}
          <b className="font-medium">Parcelwise</b> and <b className="font-medium">Orbital Freight</b>. I drafted a follow-up
          for each — want to review them?
          <div className="mt-2 flex gap-1.5">
            <span className="rounded bg-white px-1.5 py-0.5 text-[10px] text-black/60 shadow-(--shadow-app-ring)">3 sources</span>
            <span className="rounded bg-violet px-1.5 py-0.5 text-[10px] text-white">Review drafts</span>
          </div>
        </div>
        <div className="mt-auto flex items-center gap-2 rounded-lg border border-black/[0.08] px-2 py-1.5 text-[11px] text-black/40">
          Ask about your pipeline… <Send className="ml-auto size-3" />
        </div>
      </div>
    </div>
  )
}

function DealTable() {
  return (
    <div className="overflow-hidden rounded-xl border border-black/[0.06] bg-white">
      <div className="grid grid-cols-[1.4fr_1fr_1fr_0.5fr] gap-2 border-b border-black/[0.06] px-3 py-2 text-[10px] text-black/45">
        <span>Deal</span>
        <span>Stage</span>
        <span>Value</span>
        <span>Owner</span>
      </div>
      {DEALS.map((deal) => (
        <div
          key={deal.name}
          className="grid grid-cols-[1.4fr_1fr_1fr_0.5fr] items-center gap-2 border-b border-black/[0.04] px-3 py-2 text-[11px] text-black/75 last:border-0"
        >
          <span className="truncate">{deal.name}</span>
          <span className={cn("w-fit rounded px-1.5 py-0.5 text-[10px]", HEAT[deal.heat])}>{deal.stage}</span>
          <span className="tabular-nums">{deal.value}</span>
          <span className="flex size-5 items-center justify-center rounded-full bg-black/[0.06] text-[9px]">{deal.owner}</span>
        </div>
      ))}
    </div>
  )
}

function PipelinePanel() {
  const stages = ["Qualified", "Discovery", "Proposal", "Negotiation"] as const
  return (
    <div className="grid h-full grid-cols-2 gap-2 md:grid-cols-4">
      {stages.map((stage, s) => (
        <div key={stage} className="flex flex-col gap-2 rounded-xl bg-black/[0.035] p-2">
          <p className="flex items-center justify-between px-1 text-[11px] text-black/55">
            {stage}
            <span className="text-black/35">{DEALS.filter((d) => d.stage === stage).length}</span>
          </p>
          {DEALS.filter((d) => d.stage === stage).map((deal) => (
            <div key={deal.name} className="rounded-lg border border-black/[0.06] bg-white p-2 shadow-(--shadow-app)">
              <p className="text-[11px] text-black/80">{deal.name}</p>
              <p className="mt-0.5 text-[10px] text-black/45 tabular-nums">{deal.value}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className={cn("rounded px-1 text-[9px]", HEAT[deal.heat])}>{deal.heat}</span>
                <span className="flex size-4 items-center justify-center rounded-full bg-black/[0.06] text-[8px]">{deal.owner}</span>
              </div>
            </div>
          ))}
          {s === 1 && (
            <div className="rounded-lg border border-dashed border-violet/50 bg-violet/5 p-2 text-[10px] text-violet">
              <Sparkles className="mb-1 size-3" />
              Arcline moved Fieldwork here after Tuesday's call
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function AutomationsPanel() {
  const steps = [
    { icon: Mail, title: "When a buyer replies", note: "Any deal in Proposal" },
    { icon: Bot, title: "Arcline scores intent", note: "Reads thread, attendees, pricing views" },
    { icon: CalendarCheck, title: "Propose a meeting", note: "Three slots from the owner's calendar" },
    { icon: Send, title: "Draft the follow-up", note: "Held for review before sending" },
  ]
  return (
    <div className="grid h-full gap-3 md:grid-cols-[1fr_0.8fr]">
      <div className="flex flex-col items-center gap-0 rounded-xl bg-black/[0.035] p-4">
        {steps.map((step, i) => (
          <div key={step.title} className="flex w-full max-w-[280px] flex-col items-center">
            <div className="flex w-full items-center gap-2.5 rounded-lg border border-black/[0.06] bg-white p-2.5 shadow-(--shadow-app)">
              <span className="flex size-7 items-center justify-center rounded-md bg-violet/10 text-violet">
                <step.icon className="size-3.5" />
              </span>
              <span>
                <span className="block text-[11px] text-black/80">{step.title}</span>
                <span className="block text-[10px] text-black/45">{step.note}</span>
              </span>
            </div>
            {i < steps.length - 1 && <span className="h-4 w-px bg-black/15" />}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2 rounded-xl border border-black/[0.06] bg-white p-3">
        <p className="text-[11px] text-black/50">Recent runs</p>
        {["Northbeam", "Kestrel Health", "Parcelwise", "Fieldwork"].map((name, i) => (
          <div key={name} className="flex items-center gap-2 border-b border-black/[0.04] py-1.5 text-[11px] text-black/75 last:border-0">
            {i === 2 ? <Clock className="size-3 text-amber" /> : <Check className="size-3 text-teal" />}
            {name}
            <span className="ml-auto text-[10px] text-black/40">{i === 2 ? "Waiting review" : `${(i + 1) * 4}m ago`}</span>
          </div>
        ))}
        <div className="mt-auto flex items-center gap-1.5 rounded-lg bg-teal/10 px-2 py-1.5 text-[10px] text-forest">
          <Zap className="size-3" /> 1,284 runs this month · 0 undone
        </div>
      </div>
    </div>
  )
}

export function WorkspaceMock({ tab, className }: { tab: WorkspaceTab; className?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-t-[var(--radius-field)] border border-b-0 border-white/10 bg-[color-mix(in_oklab,var(--color-fg)_92%,var(--color-violet))] text-black shadow-(--shadow-card) select-none",
        className,
      )}
      aria-hidden
    >
      {/* Window chrome */}
      <div className="flex items-center gap-3 border-b border-black/[0.06] bg-white/70 px-4 py-2.5 text-[12px] text-black/55">
        <ArclineMark className="h-3.5 w-auto text-black/70" />
        <span className="text-black/30">/</span>
        <span>Revenue</span>
        <span className="text-black/30">/</span>
        <span className="flex items-center gap-1 text-black/75">
          Q4 pipeline <ChevronDown className="size-3" />
        </span>
        <span className="ml-auto hidden items-center gap-1 rounded-md border border-black/[0.08] bg-white px-2 py-1 text-[11px] text-black/40 sm:flex">
          <Search className="size-3" /> Search deals
        </span>
        <span className="flex size-6 items-center justify-center rounded-full bg-violet text-[10px] text-white">PS</span>
      </div>

      <div className="flex">
        {/* Rail */}
        <div className="hidden flex-col items-center gap-4 border-r border-black/[0.06] bg-white/50 px-3 py-4 text-black/40 sm:flex">
          {[Home, Inbox, LayoutGrid, Users, Zap, CircleDot, Settings].map((Icon, i) => (
            <Icon key={i} className={cn("size-4", i === 2 && "text-violet")} strokeWidth={1.5} />
          ))}
        </div>

        <div className="min-h-[340px] flex-1 p-3 md:min-h-[440px] md:p-4">
          <div className="mb-3 flex items-center gap-2">
            <span className="rounded-md bg-[color-mix(in_oklab,var(--color-violet)_70%,var(--color-void))] px-2 py-1 text-[11px] text-white">
              Overview
            </span>
            {["Deals", "Accounts", "Forecast"].map((t) => (
              <span key={t} className="px-2 py-1 text-[11px] text-black/50">
                {t}
              </span>
            ))}
            <span className="ml-auto flex items-center gap-1 text-[11px] text-black/50">
              Open in board <ArrowUpRight className="size-3" />
            </span>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={curve("out", 0.35)}
            >
              {tab === "chat" && <ChatPanel />}
              {tab === "pipeline" && <PipelinePanel />}
              {tab === "automations" && <AutomationsPanel />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
