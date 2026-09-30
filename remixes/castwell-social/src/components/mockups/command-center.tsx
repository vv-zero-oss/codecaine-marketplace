import { CalendarDays, Clapperboard, Gauge, Inbox, LineChart, ShieldCheck, Sparkles } from "lucide-react"

import { BrandLogo, type Channel } from "@/components/ui/brand-logo"
import { LogoMark } from "@/components/ui/logo-mark"
import { AppWindow, Face, StatusPill, type Status } from "@/components/mockups/kit"
import type { PhotoKey } from "@/photos"
import { cn } from "@/lib/utils"

const NAV = [
  { label: "Dashboard", icon: Gauge, active: true },
  { label: "Calendar", icon: CalendarDays },
  { label: "Video Studio", icon: Clapperboard },
  { label: "Inbox", icon: Inbox },
  { label: "Approvals", icon: ShieldCheck },
  { label: "Analytics", icon: LineChart },
  { label: "Brand kit", icon: Sparkles },
]

const ROWS: { status: Status; post: string; channels: Channel[]; maker: PhotoKey; makerName: string; slot: string }[] = [
  { status: "scheduled", post: "Autumn drop teaser → 9:16 cut", channels: ["instagram", "tiktok"], maker: "maya", makerName: "Maya R.", slot: "Tue 18:30" },
  { status: "rendering", post: "Founder Q&A → 3 Shorts", channels: ["youtube"], maker: "theo", makerName: "AI Video", slot: "Wed 12:00" },
  { status: "review", post: "Hiring thread → carousel", channels: ["linkedin", "x"], maker: "ines", makerName: "Inès L.", slot: "Wed 09:15" },
  { status: "drafting", post: "Customer story → caption set", channels: ["instagram", "threads"], maker: "dev", makerName: "AI Copy", slot: "Thu 17:45" },
  { status: "queued", post: "Weekend recipe → pin + reel", channels: ["pinterest", "instagram"], maker: "maya", makerName: "Maya R.", slot: "Sat 10:00" },
]

/**
 * The hero's product window: this week's content, progress by stage and by
 * channel, and the queue of posts the AI team is moving through.
 */
export function CommandCenter({ className }: { className?: string }) {
  return (
    <AppWindow className={cn("grid grid-cols-1 text-left md:grid-cols-[200px_1fr]", className)}>
      <aside className="hidden flex-col border-r border-line md:flex">
        <div className="flex h-14 items-center border-b border-line px-5">
          <LogoMark className="size-5" />
        </div>
        <ul className="flex flex-col gap-0.5 p-3">
          {NAV.map(({ label, icon: Icon, active }) => (
            <li
              key={label}
              className={cn(
                "flex items-center gap-2.5 px-2.5 py-2 text-[13px]",
                active ? "border-l-2 border-mint bg-page font-medium text-ink" : "text-muted",
              )}
            >
              <Icon className="size-3.5" />
              {label}
            </li>
          ))}
        </ul>
      </aside>

      <div className="min-w-0 p-4 md:p-6">
        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-[15px] font-semibold text-ink">This week's content</p>
            <div className="border border-line bg-page p-4">
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-sm text-muted">
                  <span className="mr-1.5 text-2xl font-medium text-ink">64%</span>Published
                </p>
                <p className="text-[13px] font-medium text-ink">Week of 5 Oct</p>
              </div>
              <div className="mt-3 flex h-1.5 gap-0.5">
                <span className="w-[64%] bg-mint" />
                <span className="w-[14%] bg-periwinkle" />
                <span className="w-[8%] bg-coral-soft" />
                <span className="flex-1 bg-sage-deep" />
              </div>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted">
                <Legend className="bg-mint" label="Published" />
                <Legend className="bg-periwinkle" label="Rendering" />
                <Legend className="bg-coral-soft" label="In review" />
                <Legend className="bg-sage-deep" label="Planned" />
              </div>
            </div>
          </div>
          <div className="hidden sm:block">
            <p className="mb-3 text-[15px] font-semibold text-ink">By channel</p>
            <div className="grid grid-cols-2 border border-line bg-page">
              <div className="border-r border-line p-4">
                <p className="text-sm text-indigo">
                  <span className="mr-1.5 text-2xl font-medium">38</span>Scheduled
                </p>
                <p className="mt-3 flex items-center gap-1.5 text-[11px] text-muted">
                  <BrandLogo channel="instagram" className="size-3.5" />
                  <BrandLogo channel="tiktok" className="size-3.5" />
                  <BrandLogo channel="youtube" className="size-3.5" />
                  <BrandLogo channel="linkedin" className="size-3.5" />
                  <span className="ml-1">6 channels</span>
                </p>
              </div>
              <div className="p-4">
                <p className="text-sm text-mint-ink">
                  <span className="mr-1.5 text-2xl font-medium">12</span>Replies handled
                </p>
                <p className="mt-3 text-[11px] text-muted">in the last hour</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 border border-line bg-page">
          <div className="grid grid-cols-[92px_1fr_auto] items-center gap-3 border-b border-line px-3 py-2 text-[11px] text-muted sm:grid-cols-[92px_1fr_90px_120px_80px] md:gap-4">
            <span>Status</span>
            <span>Post</span>
            <span className="hidden sm:block">Channels</span>
            <span className="hidden sm:block">Owner</span>
            <span className="text-right">Slot</span>
          </div>
          {ROWS.map((r) => (
            <div
              key={r.post}
              className="grid grid-cols-[92px_1fr_auto] items-center gap-3 border-b border-line px-3 py-2.5 last:border-b-0 sm:grid-cols-[92px_1fr_90px_120px_80px] md:gap-4"
            >
              <StatusPill status={r.status} />
              <span className="truncate text-[12px] text-ink md:text-[13px]">{r.post}</span>
              <span className="hidden items-center gap-1.5 sm:flex">
                {r.channels.map((c) => (
                  <BrandLogo key={c} channel={c} className="size-3.5" />
                ))}
              </span>
              <span className="hidden items-center gap-2 text-[12px] text-ink sm:flex">
                <Face who={r.maker} />
                {r.makerName}
              </span>
              <span className="text-right text-[12px] text-muted tabular-nums">{r.slot}</span>
            </div>
          ))}
        </div>
      </div>
    </AppWindow>
  )
}

function Legend({ className, label }: { className: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={cn("size-1.5 rounded-full", className)} />
      {label}
    </span>
  )
}
