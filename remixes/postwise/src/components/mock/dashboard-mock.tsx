import {
  BarChart3,
  Bell,
  ChevronsUpDown,
  Clock,
  Home,
  Inbox,
  LifeBuoy,
  MessageSquare,
  MoreHorizontal,
  Search,
  Send,
  Settings,
  Sparkles,
  Tag as TagIcon,
  Users,
  Workflow,
} from "lucide-react"

import { AppWindow } from "@/components/mock/parts"
import { LogoMark } from "@/components/ui/wordmark"
import { cn } from "@/lib/utils"

const BARS = [38, 64, 88, 52, 55, 70, 46, 72, 49, 90, 62, 44, 66, 40, 81, 38, 60, 54]
const NAV = [
  ["Review", [["Home", Home, true], ["Scribe", Sparkles]]],
  ["Inbox", [["Needs reply", Inbox], ["Follow-ups", Clock], ["Sent", Send]]],
  ["Team", [["People", Users], ["Shared inboxes", MessageSquare], ["Rules", Workflow], ["Labels", TagIcon]]],
  ["Insights", [["Reports", BarChart3], ["Settings", Settings]]],
] as const

const ACTIVITY = [
  ["NO", "Nora", "approved a draft to", "Northwind — renewal terms", "6 min ago"],
  ["AK", "Akin", "assigned", "Invoice #2041 overdue", "22 min ago"],
  ["LM", "Lea", "wrote a rule for", "Receipts and invoices", "1 hour ago"],
  ["HS", "Hana", "cleared", "Support queue — 14 threads", "2 hours ago"],
] as const

/**
 * The team view of Postwise: a sidebar, a greeting, the threads to pick up,
 * a month of replies as bars, what the team did, and prompts for Scribe.
 * Plain markup at 1320px, scaled by `ScaledFrame`.
 */
export function DashboardMock({ className }: { className?: string }) {
  return (
    <AppWindow className={cn("w-[1320px] rounded-b-none text-[13px]", className)}>
      <div className="flex h-[720px]">
        <aside className="flex w-[200px] flex-col gap-1 bg-card-soft px-3 py-4">
          <p className="mb-2 flex items-center gap-2 px-2 text-[13.5px] font-semibold">
            <span className="grid size-6 place-items-center rounded-[6px] bg-lagoon text-night-fg">
              <LogoMark className="size-3.5" />
            </span>
            Postwise
            <ChevronsUpDown className="ml-auto size-3.5 text-ink-subtle" />
          </p>
          {NAV.map(([group, items]) => (
            <div key={group} className="mt-2">
              <p className="px-2 pb-1 text-[11.5px] text-ink-subtle">{group}</p>
              {items.map(([label, Icon, on]) => (
                <p key={label} className={cn("flex items-center gap-2.5 rounded-[7px] px-2 py-1.5", on ? "bg-card font-medium shadow-(--shadow-card)" : "text-ink-soft")}>
                  <Icon className={cn("size-4", on ? "text-app-accent" : "text-ink-subtle")} strokeWidth={1.6} />
                  {label}
                </p>
              ))}
            </div>
          ))}
        </aside>

        <div className="flex flex-1 flex-col">
          <div className="flex items-center gap-3 px-5 py-2.5">
            <span className="mx-auto flex w-[420px] items-center gap-2 rounded-[7px] border border-line px-3 py-1.5 text-ink-subtle">
              <Search className="size-3.5" /> Search threads, people, rules…
              <span className="ml-auto text-[11px]">⌘ K</span>
            </span>
            <LifeBuoy className="size-4 text-ink-subtle" />
            <Bell className="size-4 text-ink-subtle" />
            <Settings className="size-4 text-ink-subtle" />
          </div>

          <div className="grid flex-1 grid-cols-[1fr_260px] gap-8 px-6 pt-4">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-[8px] bg-sprout text-app-accent">
                  <Home className="size-5" />
                </span>
                <span>
                  <p className="text-[18px] font-medium tracking-[-0.01em]">Morning, Sam!</p>
                  <p className="text-ink-muted">Scribe drafted 23 replies overnight.</p>
                </span>
              </div>

              <div>
                <p className="mb-2 text-ink-muted">Pick up where you left off</p>
                <div className="grid grid-cols-3 gap-3">
                  {["Northwind renewal", "Board update draft", "Hiring: senior designer"].map((t) => (
                    <div key={t} className="rounded-[8px] border border-line p-3">
                      <p className="flex items-center justify-between text-[11.5px] text-ink-subtle">
                        <span className="flex items-center gap-1.5"><MessageSquare className="size-3.5" /> Thread</span>
                        4 hours ago
                      </p>
                      <p className="mt-4 font-medium">{t}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 flex items-center justify-between text-ink-muted">
                  Replies sent this month
                  <span className="font-medium text-app-accent">More reports</span>
                </p>
                <div className="relative flex h-[220px] items-end gap-2.5 border-b border-line pl-8">
                  {[0, 1, 2, 3].map((i) => (
                    <span key={i} className="absolute inset-x-8 border-t border-line/70" style={{ bottom: `${i * 33}%` }} />
                  ))}
                  {BARS.map((h, i) => (
                    <span key={i} className="relative flex-1 rounded-t-[3px] bg-mint" style={{ height: `${h}%` }} />
                  ))}
                </div>
                <p className="mt-1.5 flex justify-between pl-8 text-[11px] text-ink-subtle">
                  <span>Sep 1</span><span>Sep 8</span><span>Sep 15</span><span>Sep 22</span><span>Sep 29</span>
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-ink-muted">What’s the team up to?</p>
              {ACTIVITY.map(([initials, name, verb, target, when]) => (
                <div key={name} className="flex gap-2.5">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-paper-deep text-[10px] font-medium">{initials}</span>
                  <p className="text-[12px] leading-snug">
                    <span className="font-medium">{name}</span> <span className="text-ink-muted">{verb}</span>{" "}
                    <span className="text-app-accent">{target}</span>
                    <span className="block text-[11px] text-ink-subtle">{when}</span>
                  </p>
                </div>
              ))}
              <div className="mt-2 rounded-[8px] border border-line p-3 font-mono text-[10.5px] leading-snug">
                <p className="font-medium tracking-wide text-ink">INBOX ZERO STREAK</p>
                <p className="text-ink-subtle">12 days and counting.</p>
                <p className="mt-2 flex gap-1">
                  {Array.from({ length: 12 }, (_, i) => (
                    <span key={i} className="h-3 flex-1 rounded-[2px] bg-teal" style={{ opacity: 0.35 + i * 0.05 }} />
                  ))}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 border-t border-line px-5 py-2.5 text-[11.5px]">
            {["Why did replies dip on the 12th?", "Draft a rule for invoices", "Who’s waiting on us?"].map((p) => (
              <span key={p} className="rounded-[5px] border border-line px-2 py-1 text-ink-soft">{p}</span>
            ))}
            <span className="ml-auto inline-flex items-center gap-1.5 rounded-[6px] border border-app-accent/40 px-2.5 py-1 font-medium text-app-accent">
              <Sparkles className="size-3.5" /> Ask Scribe
            </span>
            <MoreHorizontal className="size-4 text-ink-subtle" />
          </div>
        </div>
      </div>
    </AppWindow>
  )
}
