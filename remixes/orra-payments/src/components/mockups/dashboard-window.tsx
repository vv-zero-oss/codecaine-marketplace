import { ArrowUp, Paperclip, Plus, Sparkles } from "lucide-react"

import { PAYMENT_MARKS } from "@/components/brand-marks"
import { PaymentTile } from "@/components/mockups/payment-tile"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { PHOTOS, pexels } from "@/photos"

/** The white app window the dashboard section shows, with a title row. */
export function DashboardWindow({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex h-full flex-col rounded-xl bg-surface p-3 shadow-pop sm:p-4", className)}>
      <div className="flex items-center gap-2.5 px-1 pb-3 text-[14px] sm:text-[15px]">
        <span className="flex size-7 items-center justify-center rounded-md bg-paper shadow-soft">
          <Sparkles className="size-3.5 text-ink" strokeWidth={1.6} />
        </span>
        {title}
      </div>
      {children}
    </div>
  )
}

const MEMBERS = [
  { name: "Sofie Brandt", role: "Owner", email: "sofie@terravessel.eu" },
  { name: "Marco Vitale", role: "Finance", email: "marco@terravessel.eu" },
  { name: "Ines Duarte", role: "Support", email: "ines@terravessel.eu" },
  { name: "Kwame Asante", role: "Warehouse", email: "kwame@terravessel.eu" },
]

export function TeamPanel() {
  return (
    <DashboardWindow title="Team · 4 people">
      <ul className="flex flex-col gap-1.5">
        {MEMBERS.map((member, index) => (
          <li key={member.name} className="flex items-center gap-3 rounded-lg bg-paper px-3 py-2.5 text-[13px]">
            <img src={pexels(PHOTOS.team[index], 96)} alt="" className="size-8 rounded-full object-cover" />
            <span className="min-w-0 flex-1">
              <span className="block truncate font-medium">{member.name}</span>
              <span className="block truncate text-ink-3">{member.email}</span>
            </span>
            <Badge variant="secondary" className="rounded-full bg-surface font-normal text-ink-2">
              {member.role}
            </Badge>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="mt-auto flex h-10 items-center justify-center gap-1.5 rounded-lg border border-dashed border-line-strong text-[13px] text-ink-2 transition-colors hover:bg-paper"
      >
        <Plus className="size-3.5" /> Invite a teammate
      </button>
    </DashboardWindow>
  )
}

const WEEKS = [38, 52, 47, 61, 58, 72, 66, 84]
const METHODS = [
  { name: "Cards", share: 46 },
  { name: "Wallets", share: 31 },
  { name: "Pay later", share: 14 },
  { name: "Bank", share: 9 },
]

export function InsightsPanel() {
  const max = Math.max(...WEEKS)
  return (
    <DashboardWindow title="Insights · last 8 weeks">
      <div className="rounded-lg bg-paper p-4">
        <p className="text-[12px] text-ink-3">Net volume</p>
        <p className="mt-1 flex items-baseline gap-2 text-2xl tracking-[-0.03em] tabular-nums">
          €184,920 <span className="text-[12px] text-mint">+12.4%</span>
        </p>
        <div className="mt-4 flex h-28 items-end gap-2">
          {WEEKS.map((value, index) => (
            <span
              key={index}
              className={cn("flex-1 rounded-t-[4px]", index === WEEKS.length - 1 ? "bg-ember" : "bg-surface-3")}
              style={{ height: `${(value / max) * 100}%` }}
            />
          ))}
        </div>
      </div>
      <ul className="mt-1.5 grid grid-cols-2 gap-1.5">
        {METHODS.map((method) => (
          <li key={method.name} className="rounded-lg bg-paper px-3 py-2.5 text-[12px]">
            <span className="text-ink-3">{method.name}</span>
            <span className="mt-0.5 block text-base tabular-nums">{method.share}%</span>
          </li>
        ))}
      </ul>
    </DashboardWindow>
  )
}

export function AssistantPanel() {
  const klarna = PAYMENT_MARKS.find((mark) => mark.id === "klarna")!
  return (
    <DashboardWindow title="Orra assistant">
      <div className="rounded-xl bg-paper p-4 text-[13px] leading-snug">
        Hi, I’m your Orra assistant. Ask me anything about your account — or let me flag things worth doing when I
        spot them.
      </div>
      <div className="mt-2 flex items-center gap-3 rounded-xl bg-paper p-3 text-[13px] leading-snug">
        <span className="relative">
          <PaymentTile mark={klarna} className="w-10 rounded-[9px] shadow-none sm:w-10" />
          <span className="absolute -right-1 -bottom-1 flex size-4 items-center justify-center rounded-full bg-paper shadow-soft">
            <Plus className="size-2.5" />
          </span>
        </span>
        Turn on Klarna for your fast-growing customer base in Germany.
      </div>
      <div className="mt-auto rounded-xl bg-paper p-3 shadow-soft">
        <p className="px-1 text-[13px] text-ink-3">Write a message…</p>
        <div className="mt-3 flex items-center justify-between">
          <Paperclip className="size-4 text-ink-2" strokeWidth={1.6} />
          <span className="flex size-7 items-center justify-center rounded-full bg-cocoa text-ink-inverse">
            <ArrowUp className="size-4" strokeWidth={2} />
          </span>
        </div>
      </div>
    </DashboardWindow>
  )
}
