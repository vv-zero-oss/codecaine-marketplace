import type * as React from "react"
import { motion } from "motion/react"

import { EASE_SWAP } from "@/lib/motion"
import { cn } from "@/lib/utils"

/*
 * Thirty years of tools that kept design and code apart, drawn in code as
 * period-typical windows — each one's chrome is what dates it. No product is
 * named; the year and the kind of tool are enough.
 */

type Kind = "paint" | "forms" | "page" | "ide" | "photo" | "vector" | "browser" | "code"

const WINDOWS: { kind: Kind; caption: string; x: number; y: number; w: number; mobile?: boolean }[] = [
  { kind: "browser", caption: "2020 — Browser design tool", x: 0.02, y: 0.13, w: 0.15 },
  { kind: "paint", caption: "1990 — Paint program", x: 0.11, y: 0.36, w: 0.12 },
  { kind: "photo", caption: "2010 — Image editor", x: 0.25, y: 0.1, w: 0.15, mobile: true },
  { kind: "vector", caption: "2014 — Vector design tool", x: 0.26, y: 0.44, w: 0.1 },
  { kind: "code", caption: "2025 — Code editor", x: 0.5, y: 0.09, w: 0.19, mobile: true },
  { kind: "ide", caption: "2007 — Interface builder", x: 0.43, y: 0.43, w: 0.14, mobile: true },
  { kind: "page", caption: "1998 — WYSIWYG page editor", x: 0.76, y: 0.05, w: 0.14 },
  { kind: "forms", caption: "1996 — Visual form builder", x: 0.72, y: 0.35, w: 0.17, mobile: true },
]

export function RetroWindows({ show, compact }: { show: boolean; compact: boolean }) {
  const list = compact ? WINDOWS.filter((w) => w.mobile) : WINDOWS
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {list.map((win, i) => {
        const pos = compact
          ? { left: `${[4, 52, 8, 50][i]}%`, top: `${[12, 16, 34, 38][i]}%`, width: "42%" }
          : { left: `${win.x * 100}%`, top: `${win.y * 100}%`, width: `${win.w * 100}%` }
        return (
          <motion.figure
            key={win.kind}
            className="absolute m-0"
            style={pos}
            initial={false}
            animate={
              show
                ? { opacity: 1, transform: "translateY(0px)", filter: "blur(0px)" }
                : { opacity: 0, transform: "translateY(40px)", filter: "blur(6px)" }
            }
            transition={{ duration: 0.6, ease: EASE_SWAP, delay: show ? i * 0.05 : 0 }}
          >
            <RetroWindow kind={win.kind} />
            <figcaption className="mt-1.5 text-[clamp(9px,0.75vw,11px)] text-ink-muted">{win.caption}</figcaption>
          </motion.figure>
        )
      })}
    </div>
  )
}

function RetroWindow({ kind }: { kind: Kind }) {
  const body = BODIES[kind]
  return (
    <div className={cn("aspect-[16/10.5] w-full overflow-hidden shadow-retro", body.frame)}>
      <div className={cn("flex h-[9%] items-center gap-[3%] px-[3%]", body.bar)}>
        {body.dots && (
          <span className="flex h-full items-center gap-[4%]">
            {["bg-period-light-close", "bg-period-light-min", "bg-period-light-max"].map((c) => (
              <span key={c} className={cn("aspect-square h-[45%] rounded-full", c)} />
            ))}
          </span>
        )}
        <span className="h-[30%] w-1/3 rounded-sm bg-current opacity-40" />
      </div>
      <div className="relative h-[91%]">{body.content}</div>
    </div>
  )
}

const lines = (n: number, cls: string, widths = [70, 45, 60, 35, 80, 50, 65, 40, 55, 75]) =>
  Array.from({ length: n }, (_, i) => (
    <span key={i} className={cn("block h-[5%] min-h-[2px] rounded-[1px]", cls)} style={{ width: `${widths[i % widths.length]}%` }} />
  ))

const BODIES: Record<Kind, { frame: string; bar: string; dots?: boolean; content: React.ReactNode }> = {
  paint: {
    frame: "bg-period-paint-frame border border-period-dark-edge",
    bar: "bg-period-paint-bar text-period-white",
    content: (
      <div className="flex h-full">
        <div className="grid w-[14%] grid-cols-2 content-start gap-[6%] bg-period-paint-tools p-[3%]">
          {Array.from({ length: 10 }, (_, i) => (
            <span key={i} className="aspect-square bg-period-paint-tool" />
          ))}
        </div>
        <div className="flex-1 bg-[radial-gradient(circle_at_40%_45%,var(--color-period-paint-glow-1)_0%,var(--color-period-paint-glow-2)_28%,var(--color-period-paint-glow-3)_60%)]" />
      </div>
    ),
  },
  forms: {
    frame: "bg-period-win-face border-2 border-t-white border-l-white border-r-period-win-shadow border-b-period-win-shadow",
    bar: "bg-gradient-to-r from-period-win-title to-period-win-title-end text-period-white",
    content: (
      <div className="flex h-full gap-[3%] p-[3%]">
        <div className="w-[38%] border border-period-win-edge bg-period-win-face p-[4%]">
          <span className="block h-[12%] w-full border border-period-win-edge bg-period-white" />
          <span className="mt-[8%] block h-[14%] w-[55%] border-2 border-t-white border-l-white border-r-period-win-shadow border-b-period-win-shadow bg-period-win-face" />
          <span className="mt-[8%] block h-[40%] w-full border border-period-win-edge bg-period-white" />
        </div>
        <div className="flex flex-1 flex-col gap-[4%] bg-period-white p-[3%]">{lines(10, "bg-period-win-title/70")}</div>
      </div>
    ),
  },
  page: {
    frame: "bg-period-win-desktop p-[2%]",
    bar: "bg-gradient-to-r from-period-win-title to-period-win-title-end text-period-white",
    content: (
      <div className="m-[2%] grid h-[88%] grid-cols-3 gap-[3%] border-2 border-t-white border-l-white border-r-period-win-shadow border-b-period-win-shadow bg-period-win-face p-[3%]">
        <div className="col-span-3 bg-period-white p-[2%]">{lines(2, "bg-period-win-link")}</div>
        <div className="border border-dashed border-period-win-shadow bg-period-white" />
        <div className="col-span-2 flex flex-col gap-[6%] bg-period-white p-[3%]">{lines(5, "bg-period-grey-mid")}</div>
      </div>
    ),
  },
  ide: {
    frame: "bg-gradient-to-b from-period-aqua-top to-period-aqua-bottom border border-period-aqua-edge",
    bar: "bg-gradient-to-b from-period-light-face to-period-aqua-bar-bottom text-period-grey-dark",
    dots: true,
    content: (
      <div className="flex h-full gap-[2%] p-[2%]">
        <div className="flex w-[26%] flex-col gap-[5%] bg-period-aqua-list p-[3%]">{lines(8, "bg-period-aqua-ink/60")}</div>
        <div className="flex flex-1 flex-col gap-[4%] bg-period-white p-[3%]">
          {lines(4, "bg-period-ide-keyword/60")}
          <span className="block h-[7%] w-full bg-period-ide-highlight" />
          {lines(4, "bg-period-ide-type/60")}
        </div>
      </div>
    ),
  },
  photo: {
    frame: "bg-period-dark-frame border border-period-black",
    bar: "bg-period-dark-panel text-period-white",
    content: (
      <div className="flex h-full gap-[2%] p-[2%]">
        <div className="w-[6%] bg-period-dark-panel" />
        <div className="flex-1 bg-[linear-gradient(160deg,var(--color-period-photo-sky),var(--color-period-photo-mid)_55%,var(--color-period-photo-deep))]" />
        <div className="flex w-[22%] flex-col gap-[5%] bg-period-dark-panel p-[3%]">{lines(6, "bg-period-white/30")}</div>
      </div>
    ),
  },
  vector: {
    frame: "bg-period-light-face border border-period-light-edge",
    bar: "bg-period-light-bar text-period-grey-dark",
    dots: true,
    content: (
      <div className="grid h-full grid-cols-2 gap-[6%] p-[8%]">
        {["bg-period-white", "bg-period-white", "bg-period-vector-peach", "bg-period-white"].map((c, i) => (
          <span key={i} className={cn("shadow-sm", c)} />
        ))}
      </div>
    ),
  },
  browser: {
    frame: "bg-period-white border border-period-light-bar",
    bar: "bg-period-dark-chrome text-period-white",
    content: (
      <div className="flex h-full">
        <div className="flex w-[20%] flex-col gap-[6%] border-r border-period-light-rule p-[3%]">{lines(7, "bg-period-grey")}</div>
        <div className="grid flex-1 grid-cols-3 gap-[5%] bg-period-light-canvas p-[6%]">
          {["bg-period-browser-mint", "bg-period-browser-peach", "bg-period-browser-lime"].map((c) => (
            <span key={c} className={cn("rounded-sm", c)} />
          ))}
        </div>
        <div className="flex w-[20%] flex-col gap-[6%] border-l border-period-light-rule p-[3%]">{lines(7, "bg-period-grey")}</div>
      </div>
    ),
  },
  code: {
    frame: "bg-period-code-bg border border-period-black",
    bar: "bg-period-dark-bar text-period-white",
    dots: true,
    content: (
      <div className="flex h-full">
        <div className="w-[16%] bg-period-code-side" />
        <div className="flex flex-1 flex-col gap-[3.5%] p-[3%]">
          {lines(5, "bg-period-code-keyword/70")}
          <span className="block h-[5%] w-[60%] bg-period-code-added/40" />
          <span className="block h-[5%] w-[70%] bg-period-code-removed/40" />
          {lines(4, "bg-period-code-string/70")}
        </div>
      </div>
    ),
  },
}
