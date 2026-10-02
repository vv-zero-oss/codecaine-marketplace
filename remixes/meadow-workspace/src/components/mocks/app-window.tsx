import {
  Building2, CheckCircle2, CircleDot, FileText, Home, Inbox, Mic, Plus, Search, SquareCheckBig, Users, Zap,
} from "lucide-react"

import { cn } from "@/lib/utils"

const NAV = [
  { label: "Home", icon: Home, active: true },
  { label: "Inbox", icon: Inbox },
  { label: "People", icon: Users },
  { label: "Companies", icon: Building2 },
  { label: "Tasks", icon: SquareCheckBig },
  { label: "Documents", icon: FileText },
  { label: "Automations", icon: Zap },
]

const RUNS = [
  { label: "Enrich new lead — Alex Rivera", time: "9:12 AM", done: false },
  { label: "Send onboarding sequence", time: "8:45 AM", done: true },
  { label: "Sync CRM to chat", time: "8:30 AM", done: true },
]

/** The product's home screen, drawn as markup: the sidebar, a greeting, the
 *  assistant's composer and the morning's automation runs. */
export function AppWindow({ className }: { className?: string }) {
  return (
    <div
      data-canvas-ignore={false}
      className={cn("grid overflow-hidden rounded-t-[var(--radius-window)] bg-surface text-left text-ink-900 shadow-window md:grid-cols-[166px_1fr]", className)}
    >
      <aside className="hidden flex-col gap-0.5 border-r border-ink-100 bg-surface-muted p-2.5 text-[12px] md:flex">
        <div className="mb-1.5 flex items-center gap-2 px-2 py-1.5 font-semibold">
          <span className="grid size-4 place-items-center rounded bg-sky-600 text-[9px] text-white">M</span>
          Fernhill Co.
        </div>
        <div className="flex items-center gap-2 px-2 py-1.5 text-ink-500">
          <Search className="size-3.5" /> Search
        </div>
        {NAV.map(({ label, icon: Icon, active }) => (
          <div
            key={label}
            className={cn("flex items-center gap-2 rounded-md px-2 py-1.5", active ? "bg-ink-100 font-medium text-ink-900" : "text-ink-700")}
          >
            <Icon className="size-3.5 text-ink-500" /> {label}
          </div>
        ))}
        <div className="mt-3 px-2 text-[11px] text-ink-400">Lists</div>
        <div className="px-2 py-1.5 text-ink-700">Pipeline</div>
        <div className="px-2 py-1.5 text-ink-700">Launch tasks</div>
      </aside>
      <div className="flex flex-col items-center gap-4 px-4 pt-8 pb-0 sm:px-10 md:pt-10">
        <div className="flex w-full max-w-[500px] items-center gap-3">
          <span className="size-9 shrink-0 rounded-full bg-gradient-to-b from-sky-300 to-leaf/60" />
          <div>
            <p className="text-[17px] font-semibold tracking-[-0.02em]">Good morning, Priya</p>
            <p className="text-[11px] text-ink-500">Thursday, March 12 · Lisbon · 19°C</p>
          </div>
        </div>
        <div className="w-full max-w-[500px] rounded-xl bg-surface p-3 text-[12px] shadow-card">
          <p className="text-ink-400">Ask Meadow anything…</p>
          <div className="mt-4 flex items-center gap-3 text-ink-500">
            <Plus className="size-3.5" />
            <span className="flex items-center gap-1 text-sky-600"><Zap className="size-3" /> Skills</span>
            <Mic className="ml-auto size-3.5" />
          </div>
        </div>
        <div className="w-full max-w-[500px] rounded-xl bg-surface p-3 shadow-card">
          <p className="mb-2 text-[11px] font-medium text-ink-500">Automations</p>
          <ul className="flex flex-col gap-2 text-[12px]">
            {RUNS.map((run) => (
              <li key={run.label} className="flex items-center gap-2">
                {run.done ? <CheckCircle2 className="size-3.5 text-teal" /> : <CircleDot className="size-3.5 text-apricot" />}
                <span className="font-medium">{run.label}</span>
                <span className="ml-auto text-ink-400 tabular-nums">{run.time}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="h-10 w-full max-w-[500px] rounded-t-xl bg-surface shadow-card" />
      </div>
    </div>
  )
}
