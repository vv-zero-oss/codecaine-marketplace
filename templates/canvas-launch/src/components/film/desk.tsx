import type * as React from "react"
import { ArrowLeft, ArrowRight, Check, Globe, Lock, MoreVertical, Puzzle, RotateCw } from "lucide-react"

import { Mark } from "@/components/ui/mark"
import { cn } from "@/lib/utils"

/*
 * Everything else on the desk the film is shot on: the app icon, the pointer,
 * the dock, a browser, a code editor, the agent's terminal, a context menu and
 * the small status pills. All drawn in code, all in the page's tokens.
 */

/** Codecaine's app icon: the mark on an ink tile, the way the dock shows it. */
export function AppIcon({ className }: { className?: string }) {
  return (
    <span className={cn("grid aspect-square place-items-center rounded-[22%] bg-ink shadow-chip", className)}>
      <Mark className="size-[58%] text-on-ink" />
    </span>
  )
}

/** The system pointer: ink with a paper outline, so it reads on anything. */
export function Pointer({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 24" className={cn("w-5 drop-shadow-sm", className)} aria-hidden>
      <path d="M2 1.5v18.2l4.6-4.4 3 6.9 3.1-1.3-3-6.8h6.4Z" className="fill-ink stroke-paper" strokeWidth={1.4} strokeLinejoin="round" />
    </svg>
  )
}

/** A named pointer — a person or the assistant — with its colour chip. */
export function NamedPointer({ name, tone }: { name: string; tone: "a" | "b" | "ai" }) {
  const fill = tone === "a" ? "fill-cursor-a" : tone === "b" ? "fill-cursor-b" : "fill-ai"
  const bg = tone === "a" ? "bg-cursor-a" : tone === "b" ? "bg-cursor-b" : "bg-ai"
  return (
    <span className="pointer-events-none flex flex-col items-start">
      <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
        <path d="M1.5 1.2 14.6 6.1 8.4 8.1 6.3 14.5Z" className={fill} />
      </svg>
      <span className={cn("-mt-0.5 ml-3 rounded-[5px] px-1.5 py-0.5 text-[11px] font-medium whitespace-nowrap text-on-accent", bg)}>{name}</span>
    </span>
  )
}

const DOCK = [
  { name: "Codecaine" },
  { name: "Chrome", logo: "/logos/chrome.svg" },
  { name: "GitHub", logo: "/logos/github_light.svg", mono: true },
  { name: "VS Code", logo: "/logos/vscode.svg" },
]

/** The macOS dock with the four apps a project lives between. `lift` raises one. */
export function Dock({ lift }: { lift?: number }) {
  return (
    <div className="flex items-end gap-2.5 rounded-[20px] bg-surface/70 p-2 shadow-window backdrop-blur-xl">
      {DOCK.map((app, i) => (
        <span
          key={app.name}
          className="relative flex flex-col items-center transition-transform duration-300 ease-swap"
          style={{ transform: lift === i ? "translateY(-10px) scale(1.12)" : undefined }}
        >
          {app.logo ? (
            <span className="grid size-[52px] place-items-center rounded-[12px] bg-surface shadow-chip">
              <img src={app.logo} alt={app.name} className={cn("size-8", app.mono && "dark:invert")} />
            </span>
          ) : (
            <AppIcon className="size-[52px]" />
          )}
          <span className="mt-1 size-1 rounded-full bg-ink-muted" />
        </span>
      ))}
    </div>
  )
}

/** A browser window — tab, toolbar with an extension slot, and the page. */
export function Browser({
  url,
  title,
  children,
  width,
  height,
}: {
  url: string
  title: string
  children: React.ReactNode
  width: number
  height: number
}) {
  return (
    <div className="overflow-hidden rounded-window bg-browser-chrome shadow-window" style={{ width, height }}>
      <div className="flex h-9 items-end gap-2 bg-browser-bar px-3">
        <span className="mb-3 flex gap-1.5">
          {["bg-period-light-close", "bg-period-light-min", "bg-period-light-max"].map((c) => (
            <span key={c} className={cn("size-2.5 rounded-full", c)} />
          ))}
        </span>
        <span className="flex h-7 w-48 items-center gap-2 rounded-t-[8px] bg-browser-chrome px-3 text-[11px] text-ink-soft">
          <Globe className="size-3" /> {title}
        </span>
      </div>
      <div className="flex h-9 items-center gap-3 px-3 text-ink-muted">
        <ArrowLeft className="size-3.5" />
        <ArrowRight className="size-3.5" />
        <RotateCw className="size-3.5" />
        <span className="flex h-6 flex-1 items-center gap-2 rounded-full bg-browser-field px-3 text-[11px] text-ink-soft">
          <Lock className="size-3" /> {url}
        </span>
        <Puzzle className="size-3.5" />
        <span className="grid size-5 place-items-center rounded-full bg-mark-deep text-[9px] font-semibold text-on-accent">J</span>
        <MoreVertical className="size-3.5" />
      </div>
      <div className="relative" style={{ height: height - 72 }}>
        {children}
      </div>
    </div>
  )
}

/** The code editor the project is open in: a file tree and the component. */
export function CodeWindow({ width, height }: { width: number; height: number }) {
  const k = "text-code-key"
  const s = "text-code-string"
  const f = "text-code-fn"
  const lines: React.ReactNode[] = [
    <><span className={k}>import</span> {"{ Cover }"} <span className={k}>from</span> <span className={s}>"./cover"</span></>,
    <><span className={k}>import</span> {"{ Track }"} <span className={k}>from</span> <span className={s}>"./track"</span></>,
    <><span className={k}>import</span> {"{ records }"} <span className={k}>from</span> <span className={s}>"../lib/records"</span></>,
    "",
    <><span className={k}>export function</span> <span className={f}>AlbumView</span>{"({ id }) {"}</>,
    <>{"  "}<span className={k}>const</span> album = records.<span className={f}>find</span>{"(id)"}</>,
    <>{"  "}<span className={k}>return</span> (</>,
    <>{"    <"}<span className={f}>section</span> className=<span className={s}>"album"</span>{">"}</>,
    <>{"      <"}<span className={f}>Cover</span> src={"{album.cover}"} {"/>"}</>,
    <>{"      <"}<span className={f}>h1</span>{">{album.title}</"}<span className={f}>h1</span>{">"}</>,
    <>{"      {album.tracks."}<span className={f}>map</span>{"((t) => <"}<span className={f}>Track</span>{" {...t} />)}"}</>,
    <>{"    </"}<span className={f}>section</span>{">"}</>,
    "  )",
    "}",
  ]
  return (
    <div className="overflow-hidden rounded-window bg-code-bg font-mono shadow-window" style={{ width, height }}>
      <div className="flex h-9 items-center gap-3 border-b border-code-line bg-code-bar px-3 text-[11px] text-code-muted">
        <span className="flex gap-1.5">
          {["bg-period-light-close", "bg-period-light-min", "bg-period-light-max"].map((c) => (
            <span key={c} className={cn("size-2.5 rounded-full", c)} />
          ))}
        </span>
        <span className="rounded-[5px] bg-code-line px-2 py-0.5 text-code-text">album-view.tsx</span>
        <span>cover.tsx</span>
        <span>tokens.css</span>
      </div>
      <div className="flex h-full">
        <div className="w-40 shrink-0 border-r border-code-line p-3 text-[11px] leading-6 text-code-muted">
          <p className="text-code-text">longwave</p>
          <p className="pl-3">src</p>
          <p className="pl-6">components</p>
          <p className="pl-9 text-code-text">album-view.tsx</p>
          <p className="pl-9">cover.tsx</p>
          <p className="pl-9">track.tsx</p>
          <p className="pl-6">lib</p>
          <p className="pl-3">package.json</p>
        </div>
        <pre className="m-0 flex-1 p-3 text-[12px] leading-6 text-code-text">
          {lines.map((l, i) => (
            <div key={i} className="flex gap-4">
              <span className="w-5 text-right text-code-muted">{i + 1}</span>
              <span>{l}</span>
            </div>
          ))}
        </pre>
      </div>
    </div>
  )
}

/** The agent's own window: a prompt, then the tool calls it makes on the board. */
export function AgentWindow({
  width,
  lines,
}: {
  width: number
  lines: { kind: "prompt" | "tool" | "note"; text: string; detail?: string[] }[]
}) {
  return (
    <div className="overflow-hidden rounded-window bg-term-bg font-mono text-term-ink shadow-window" style={{ width }}>
      <div className="flex h-8 items-center gap-3 border-b border-ed-line px-3 text-[11px] text-term-muted">
        <span className="flex gap-1.5">
          {["bg-period-light-close", "bg-period-light-min", "bg-period-light-max"].map((c) => (
            <span key={c} className={cn("size-2.5 rounded-full", c)} />
          ))}
        </span>
        <span className="mx-auto">Agent · your CLI</span>
      </div>
      <div className="space-y-2.5 p-4 text-[12px] leading-5">
        {lines.map((l, i) => (
          <div key={i}>
            {l.kind === "prompt" && (
              <p>
                <span className="text-term-accent">›</span> {l.text}
              </p>
            )}
            {l.kind === "tool" && (
              <p className="flex items-start gap-2">
                <span className="mt-1.5 size-2 shrink-0 rounded-[2px] bg-term-muted" />
                <span>
                  {l.text}
                  {l.detail?.map((d) => (
                    <span key={d} className="block pl-3 text-term-muted">
                      {d}
                    </span>
                  ))}
                </span>
              </p>
            )}
            {l.kind === "note" && <p className="text-term-muted">{l.text}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}

/** A context menu in the system's style, one row highlighted. */
export function ContextMenu({ items, active }: { items: { label: string; keys?: string; divider?: boolean }[]; active?: number }) {
  return (
    <div className="w-60 rounded-[12px] bg-surface/95 p-1.5 text-[14px] text-ink shadow-menu backdrop-blur-xl">
      {items.map((item, i) => (
        <div key={item.label}>
          {item.divider && <div className="mx-2 my-1 h-px bg-paper-rule" />}
          <div className={cn("flex h-8 items-center justify-between rounded-[7px] px-2.5", i === active && "bg-signal text-on-accent")}>
            <span>{item.label}</span>
            {item.keys && <span className={cn("text-[13px]", i === active ? "text-on-accent/80" : "text-ink-muted")}>{item.keys}</span>}
          </div>
        </div>
      ))}
    </div>
  )
}

/** The import's progress pill, then its done toast. */
export function ProgressPill({ label, percent }: { label: string; percent: number }) {
  return (
    <div className="flex h-11 items-center gap-3 rounded-[10px] bg-surface px-4 text-[14px] text-ink-soft shadow-chip">
      <span className="size-4 animate-spin-fast rounded-full border-2 border-ink/15 border-t-ink-soft" />
      {label}
      <span className="w-10 text-right font-mono text-[13px] text-ink-muted tabular-nums">{percent}%</span>
    </div>
  )
}

export function DoneToast({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-11 items-center gap-2.5 rounded-[10px] bg-surface px-4 text-[14px] text-ink-soft shadow-chip">
      <span className="grid size-4 place-items-center rounded-full bg-signal text-on-accent">
        <Check className="size-2.5" strokeWidth={3} />
      </span>
      {children}
    </div>
  )
}
