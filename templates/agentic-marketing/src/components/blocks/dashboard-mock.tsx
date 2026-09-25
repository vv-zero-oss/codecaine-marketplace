import {
  ArrowUp,
  ChevronDown,
  Home,
  LayoutGrid,
  Lightbulb,
  ListChecks,
  Loader,
  Paperclip,
  PanelLeft,
  Plus,
  Search,
  SlidersHorizontal,
} from "lucide-react"

import { BrandLogo } from "@/components/blocks/brand-logo"
import { LiveDot } from "@/components/blocks/live-dot"
import { Mark } from "@/components/blocks/wordmark"
import { dashboard } from "@/content"

const navIcons = [Home, Lightbulb, ListChecks, LayoutGrid]

/**
 * The product, drawn in HTML rather than pasted in as a screenshot: it stays
 * sharp at every width and its words live in `content.ts` with the rest.
 */
export function DashboardMock() {
  return (
    <div className="@container flex overflow-hidden rounded-panel bg-surface text-[11px] text-ink shadow-window select-none">
      <aside className="hidden w-[11.5rem] shrink-0 flex-col gap-4 border-r border-line bg-canvas-deep p-3 @[36rem]:flex">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 font-medium">
            <span className="grid size-4 place-items-center rounded-[4px] bg-mint-tint text-mint-ink">
              <Mark className="size-3" />
            </span>
            {dashboard.workspace}
            <ChevronDown className="size-3 text-ink-faint" />
          </span>
          <PanelLeft className="size-3.5 text-ink-faint" />
        </div>
        <div className="flex items-center gap-1.5 rounded-md bg-surface px-2 py-1.5 text-ink-faint shadow-hairline">
          <Search className="size-3" /> Search
          <span className="ml-auto rounded-[3px] bg-stone px-1 text-[9px]">⌘K</span>
        </div>
        <ul className="grid gap-0.5">
          {dashboard.nav.map((label, i) => {
            const Icon = navIcons[i]
            return (
              <li
                key={label}
                className={`flex items-center gap-2 rounded-md px-2 py-1 ${i === 0 ? "bg-stone font-medium" : "text-ink-soft"}`}
              >
                <Icon className="size-3" /> {label}
              </li>
            )
          })}
        </ul>
        <div className="grid gap-1">
          <p className="px-2 text-[10px] text-ink-faint">{dashboard.channelsLabel}</p>
          {dashboard.channels.map((c) => (
            <span key={c.name} className="flex items-center gap-2 px-2 py-0.5 text-ink-soft">
              <BrandLogo name={c.logo} className="size-3" /> {c.name}
            </span>
          ))}
        </div>
        <div className="grid gap-1">
          <p className="px-2 text-[10px] text-ink-faint">{dashboard.threadsLabel}</p>
          {dashboard.threads.map((t) => (
            <span key={t} className="truncate px-2 py-0.5 text-ink-soft">
              {t}
            </span>
          ))}
        </div>
      </aside>

      <div className="min-w-0 flex-1 p-4 @[36rem]:p-5">
        <div className="flex items-center justify-between">
          <p className="font-medium">{dashboard.overview}</p>
          <span className="flex items-center gap-1 text-ink-faint">
            <SlidersHorizontal className="size-3" /> Last 7 days
          </span>
        </div>
        <dl className="mt-3 grid grid-cols-2 gap-px overflow-hidden rounded-md bg-line shadow-hairline @[28rem]:grid-cols-4">
          {dashboard.kpis.map((k) => (
            <div key={k.label} className="bg-surface p-2.5">
              <dt className="text-[10px] text-ink-faint">{k.label}</dt>
              <dd className="mt-1 flex items-baseline gap-1.5">
                <span className="text-[13px] font-medium tabular-nums">{k.value}</span>
                <span className="rounded-[3px] bg-mint-wash px-1 text-[9px] text-mint-ink">{k.delta}</span>
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-5">
          <p className="font-medium">{dashboard.prompt}</p>
          <div className="mt-2 rounded-lg bg-surface p-2.5 shadow-card">
            <p className="text-ink-faint">{dashboard.promptHint}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-ink-soft">
                <Plus className="size-3" />
                <Paperclip className="size-3" />
                <span className="flex items-center gap-1 rounded-full bg-stone px-1.5 py-0.5">
                  <Mark className="size-2.5" /> {dashboard.agent}
                  <ChevronDown className="size-2.5" />
                </span>
              </span>
              <span className="grid size-5 place-items-center rounded-full bg-pine text-white">
                <ArrowUp className="size-3" />
              </span>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <p className="flex items-center gap-1.5 text-[10px] text-ink-faint">
            <LiveDot /> {dashboard.tasksLabel}
          </p>
          <ul className="mt-1.5 grid gap-0.5">
            {dashboard.tasks.map((t) => (
              <li key={t.title} className="flex items-center gap-2 rounded-md py-1">
                <Loader className="size-3 animate-[spin_2.4s_linear_infinite] text-ink-faint motion-reduce:animate-none" />
                <span className="truncate">{t.title}</span>
                <span className="ml-auto flex shrink-0 -space-x-1">
                  {t.tags.map((tag) => (
                    <span key={tag} className="grid size-4 place-items-center rounded-full bg-surface shadow-hairline">
                      <BrandLogo name={tag} className="size-2.5" />
                    </span>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 hidden @[28rem]:block">
          <p className="text-[10px] text-ink-faint">{dashboard.queueLabel}</p>
          <ul className="mt-1.5 grid grid-cols-3 gap-2">
            {dashboard.queue.map((q) => (
              <li key={q.title} className="rounded-md bg-canvas-deep p-2 shadow-hairline">
                <p className="truncate font-medium">{q.title}</p>
                <p className="mt-0.5 truncate text-[10px] text-ink-faint">{q.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
