import { ArrowUp, Check, Paperclip, Plus, Sparkles } from "lucide-react"

import { APP_MARKS } from "@/components/brand-marks"
import { AppTile } from "@/components/mockups/app-tile"
import { cn } from "@/lib/utils"
import { PHOTOS, pexels } from "@/photos"

/** The app window the workspace section shows, with a title row. */
export function WorkspaceWindow({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex h-full flex-col rounded-ui bg-glass p-3 shadow-subtle sm:p-4", className)}>
      <div className="flex items-center gap-2.5 px-1 pb-3 text-[14px] sm:text-[15px]">
        <span className="flex size-7 items-center justify-center rounded-ui bg-canvas shadow-subtle">
          <Sparkles className="size-3.5 text-bone" strokeWidth={1.6} />
        </span>
        {title}
      </div>
      {children}
    </div>
  )
}

const DECISIONS = [
  "Ship the onboarding redesign on 14 November",
  "Keep the free plan at 20 meetings a month",
  "Ines owns the pricing page copy",
]

/** A finished meeting summary: context, decisions, and what's still open. */
export function SummaryPanel() {
  return (
    <WorkspaceWindow title="Weekly product review · 32 min">
      <div className="rounded-ui bg-canvas p-4 text-[13px] leading-snug">
        <p className="text-[10px] tracking-[0.08em] text-mist uppercase">Summary</p>
        <p className="mt-1.5">
          The team agreed the onboarding redesign is ready. Pricing stays as is for now; the open question is whether
          annual plans get a discount.
        </p>
      </div>
      <div className="mt-1.5 rounded-ui bg-canvas p-4 text-[13px]">
        <p className="text-[10px] tracking-[0.08em] text-mist uppercase">Decisions</p>
        <ul className="mt-2 flex flex-col gap-2">
          {DECISIONS.map((decision) => (
            <li key={decision} className="flex gap-2">
              <Check className="mt-0.5 size-3.5 shrink-0 text-mint" strokeWidth={2} />
              {decision}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto flex items-center gap-2 rounded-ui bg-canvas px-3 py-2.5 text-[12px] text-ash">
        <span className="rounded-pill border border-hairline-strong px-2 py-0.5 text-bone">Open</span>
        Annual discount — decide by Friday
      </div>
    </WorkspaceWindow>
  )
}

const TASKS = [
  { task: "Send the onboarding deck to sales", owner: 0, due: "Today", done: true },
  { task: "Draft pricing page copy", owner: 2, due: "Thu" },
  { task: "Book usability sessions for v2", owner: 1, due: "Fri" },
  { task: "Share recap with the support team", owner: 3, due: "Mon" },
]

/** Action items Orra heard, each with an owner and a date. */
export function ActionsPanel() {
  return (
    <WorkspaceWindow title="Action items · 4 from today">
      <ul className="flex flex-col gap-1.5">
        {TASKS.map((item) => (
          <li key={item.task} className="flex items-center gap-3 rounded-ui bg-canvas px-3 py-2.5 text-[13px]">
            <span
              className={cn(
                "flex size-4 shrink-0 items-center justify-center rounded-[5px] border",
                item.done ? "border-mint bg-mint text-snow" : "border-hairline-strong",
              )}
            >
              {item.done ? <Check className="size-3" strokeWidth={2.5} /> : null}
            </span>
            <span className={cn("min-w-0 flex-1 truncate", item.done && "text-mist line-through")}>{item.task}</span>
            <span className="text-[11px] text-mist tabular-nums">{item.due}</span>
            <img src={pexels(PHOTOS.team[item.owner], 96)} alt="" className="size-6 rounded-pill object-cover" />
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="mt-auto flex h-10 items-center justify-center gap-1.5 rounded-ui border border-dashed border-hairline-strong text-[13px] text-ash transition-colors hover:bg-canvas"
      >
        <Plus className="size-3.5" /> Send all to Linear
      </button>
    </WorkspaceWindow>
  )
}

/** Ask Orra: a chat over every past conversation. */
export function AssistantPanel() {
  const slack = APP_MARKS.find((mark) => mark.id === "slack")!
  return (
    <WorkspaceWindow title="Ask Orra">
      <div className="ml-auto max-w-[85%] rounded-ui bg-snow px-4 py-2.5 text-[13px] leading-snug text-on-snow">
        What did Halden say about pricing last month?
      </div>
      <div className="mt-2 rounded-ui bg-canvas p-4 text-[13px] leading-snug">
        They’re happy with the per-seat price but want annual billing before renewing in March.
        <span className="mt-2 block text-[10px] tracking-[0.08em] text-mist uppercase">From “Halden check-in” · 14:32</span>
      </div>
      <div className="mt-2 flex items-center gap-3 rounded-ui bg-canvas p-3 text-[13px] leading-snug">
        <span className="relative">
          <AppTile mark={slack} className="w-10 rounded-[9px] shadow-none sm:w-10" />
          <span className="absolute -right-1 -bottom-1 flex size-4 items-center justify-center rounded-pill bg-canvas shadow-subtle">
            <Plus className="size-2.5" />
          </span>
        </span>
        Post this to #halden-account for the renewal team?
      </div>
      <div className="mt-auto rounded-ui bg-canvas p-3 shadow-subtle">
        <p className="px-1 text-[13px] text-mist">Ask about any meeting…</p>
        <div className="mt-3 flex items-center justify-between">
          <Paperclip className="size-4 text-ash" strokeWidth={1.6} />
          <span className="flex size-7 items-center justify-center rounded-pill bg-snow text-on-snow">
            <ArrowUp className="size-4" strokeWidth={2} />
          </span>
        </div>
      </div>
    </WorkspaceWindow>
  )
}
