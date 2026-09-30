import { Check, FileText, Sparkles, TrendingUp, X } from "lucide-react"

import { StreamingText } from "@/components/motion/streaming-text"
import { AppWindow, Face } from "@/components/mockups/kit"
import { BrandLogo } from "@/components/ui/brand-logo"
import { LogoMark } from "@/components/ui/logo-mark"
import { cn } from "@/lib/utils"

const PLAN = [
  { day: "Tue", channel: "instagram" as const, what: "Reel — autumn drop, 3 hooks to test", tone: "bg-mint-soft" },
  { day: "Wed", channel: "linkedin" as const, what: "Carousel — hiring, 6 slides", tone: "bg-periwinkle" },
  { day: "Thu", channel: "tiktok" as const, what: "Trend remix — “packing with me”", tone: "bg-coral-soft" },
  { day: "Fri", channel: "youtube" as const, what: "Short — founder Q&A clip 2", tone: "bg-butter" },
]

/**
 * The Monday brief the AI Marketing Manager writes: what happened last week,
 * what it plans this week, and the posts waiting on a yes.
 */
export function WeeklyBrief({ className }: { className?: string }) {
  return (
    <AppWindow className={cn("grid grid-cols-1 text-left lg:grid-cols-[1.25fr_1fr]", className)}>
      <div className="min-w-0 border-b border-line p-5 md:p-7 lg:border-r lg:border-b-0">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="grid size-8 place-items-center bg-ink text-page">
            <LogoMark className="size-4" />
          </span>
          <div>
            <p className="text-[13px] font-medium text-ink">AI Marketing Manager</p>
            <p className="text-[11px] text-muted">Monday brief · 5 Oct, 07:00</p>
          </div>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-mint-soft px-2.5 py-1 text-[11px] font-medium text-mint-ink">
            <Sparkles className="size-3" /> Live
          </span>
        </div>
        <StreamingText
          label="Monday brief"
          className="mt-5 min-h-[7.5rem] font-serif text-[1.15rem] leading-snug font-light text-ink md:text-[1.35rem]"
          text="Last week reach grew 18%, driven by Tuesday's reel. Saves on carousels dropped, so I've shortened them to six slides. This week: lean into the autumn drop, test three hooks, and answer the sizing questions before they pile up."
        />
        <div className="mt-5 flex flex-wrap gap-2">
          {["Weekly report.pdf", "Hook test results", "Competitor digest"].map((s) => (
            <span key={s} className="inline-flex items-center gap-1.5 border border-line bg-page px-2.5 py-1.5 text-[11px] text-ink-soft">
              <FileText className="size-3" /> {s}
            </span>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-3 border border-line bg-page">
          {[
            ["+18%", "Reach"],
            ["4.9%", "Engagement"],
            ["312", "Replies sent"],
          ].map(([n, l], i) => (
            <div key={l} className={cn("p-3", i < 2 && "border-r border-line")}>
              <p className="text-lg font-medium text-ink tabular-nums">{n}</p>
              <p className="text-[11px] text-muted">{l}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="min-w-0 p-5 md:p-7">
        <p className="flex items-center gap-2 text-[13px] font-semibold text-ink">
          <TrendingUp className="size-3.5 text-mint-ink" /> This week's plan
        </p>
        <ul className="mt-4 flex flex-col border border-line bg-page">
          {PLAN.map((p) => (
            <li key={p.day} className="flex items-center gap-3 border-b border-line px-3 py-2.5 last:border-b-0">
              <span className={cn("grid h-6 w-10 place-items-center text-[11px] font-medium text-ink", p.tone)}>{p.day}</span>
              <BrandLogo channel={p.channel} className="size-4" />
              <span className="min-w-0 truncate text-[12px] text-ink md:text-[13px]">{p.what}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-[13px] font-semibold text-ink">Waiting on you</p>
        <div className="mt-3 flex items-center gap-3 border border-line bg-page p-3">
          <Face who="maya" className="size-8" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12px] text-ink">Reel caption v3 — “Packed for the first cold morning.”</p>
            <p className="text-[11px] text-muted">Brand check passed · Tue 18:30</p>
          </div>
          <span className="grid size-8 place-items-center border border-line text-muted"><X className="size-3.5" /></span>
          <span className="grid size-8 place-items-center bg-ink text-page"><Check className="size-3.5" /></span>
        </div>
      </div>
    </AppWindow>
  )
}
