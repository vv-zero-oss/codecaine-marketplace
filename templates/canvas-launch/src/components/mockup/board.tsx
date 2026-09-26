import type * as React from "react"
import {
  ChevronDown,
  Frame,
  ImagePlus,
  MousePointer2,
  MousePointerClick,
  PenTool,
  Square,
  Type,
  LayoutPanelTop,
} from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * The board: rulers, the dot grid, one framed live project with its button
 * selected, and the floating toolbar. The page inside the frame is a small,
 * plain landing page — the kind of project somebody points the editor at.
 */
export function Board({ hover = false }: { hover?: boolean }) {
  return (
    <div className="relative flex min-w-0 flex-1 flex-col bg-ed-canvas">
      <Rulers />
      <div
        className="relative flex-1 overflow-hidden"
        style={{
          backgroundImage: "radial-gradient(color-mix(in srgb, var(--color-ed-dot) 60%, transparent) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      >
        <FramedProject hover={hover} />
        <Toolbar />
      </div>
    </div>
  )
}

function Rulers() {
  const marks = [0, 100, 200, 300, 400, 500, 600, 700, 800]
  return (
    <div className="flex h-5 shrink-0 border-b border-ed-line bg-ed-panel">
      <div className="w-5 shrink-0 border-r border-ed-line" />
      <div className="relative flex-1 overflow-hidden text-[9px] text-ed-text-3">
        <span className="absolute inset-y-0 left-[262px] w-[124px] bg-ed-accent-soft" />
        {marks.map((m, i) => (
          <span key={m} className="absolute top-1" style={{ left: 60 + i * 100 }}>
            {m}
          </span>
        ))}
      </div>
    </div>
  )
}

function FramedProject({ hover }: { hover: boolean }) {
  return (
    <div className="absolute top-12 left-[74px] w-[700px]">
      <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-medium text-ed-text-2">
        localhost:5173 <span className="text-ed-text-3">· Desktop 1440</span>
      </div>
      <div className="overflow-hidden rounded-[6px] bg-site-bg shadow-ed-frame">
        <div className="flex items-center justify-between border-b border-site-line px-7 py-4 text-[11px] text-site-muted">
          <span className="text-[13px] font-semibold tracking-tight text-site-ink">Tidewater</span>
          <span className="flex gap-5">
            <span>Product</span>
            <span>Pricing</span>
            <span>Customers</span>
          </span>
          <span className="rounded-full border border-site-line px-3 py-1 text-site-soft">Sign in</span>
        </div>
        <div className="px-7 pt-10 pb-8">
          <p className="text-[10px] font-semibold tracking-[0.14em] text-ed-accent uppercase">Shift planning</p>
          <p className="mt-2 max-w-[420px] text-[30px] leading-[1.08] font-semibold tracking-[-0.03em] text-site-ink">
            Plan the week your team will actually keep.
          </p>
          <p className="mt-3 max-w-[380px] text-[12px] leading-[1.55] text-site-muted">
            Rotas that fix themselves when somebody calls in sick, and a phone app people open without being asked.
          </p>
          <div className="mt-6 flex items-center gap-4">
            <Selected label="ButtonLink" size="124 × 40" hover={hover}>
              <span className="block rounded-full bg-site-feature px-5 py-2.5 text-[12px] font-medium text-site-on-feature">
                Start free trial
              </span>
            </Selected>
            <span className="text-[12px] font-medium text-site-soft">See how it works →</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 px-7 pb-8">
          {["Team", "Business", "Enterprise"].map((plan, i) => (
            <div
              key={plan}
              className={cn(
                "rounded-[10px] border border-site-line p-4",
                i === 2 ? "bg-site-feature text-site-on-feature" : "bg-site-card text-site-ink",
              )}
            >
              <p className="text-[11px] font-medium opacity-70">{plan}</p>
              <p className="mt-1 text-[20px] font-semibold tracking-tight">{["$6", "$12", "Talk to us"][i]}</p>
              <div className="mt-3 space-y-1.5">
                {[70, 55, 62].map((w) => (
                  <span key={w} className="block h-1.5 rounded-full bg-current opacity-10" style={{ width: `${w}%` }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/**
 * The selection as the editor draws it: 1.5px outline, 8px handles, a size
 * chip — in pink rather than blue while the State strip is on Hover, which is
 * how the editor says you are designing a state rather than the resting look.
 */
function Selected({ label, size, hover, children }: { label: string; size: string; hover: boolean; children: React.ReactNode }) {
  return (
    <span className="relative inline-block">
      {children}
      <span className={cn("pointer-events-none absolute -inset-[3px] rounded-[2px] outline-[1.5px] outline-solid transition-colors", hover ? "outline-ed-state" : "outline-ed-accent")}>
        {["-top-1 -left-1", "-top-1 -right-1", "-bottom-1 -left-1", "-bottom-1 -right-1", "-top-1 left-1/2 -ml-1", "-bottom-1 left-1/2 -ml-1", "top-1/2 -left-1 -mt-1", "top-1/2 -right-1 -mt-1"].map(
          (pos) => (
            <span key={pos} className={cn("absolute size-2 rounded-[2px] border-[1.5px] bg-ed-handle shadow-sm", hover ? "border-ed-state" : "border-ed-accent", pos)} />
          ),
        )}
      </span>
      <span className={cn("absolute top-full left-1/2 mt-2.5 -translate-x-1/2 rounded-[3px] px-1.5 py-0.5 text-[10px] font-medium whitespace-nowrap text-ed-on-accent", hover ? "bg-ed-state" : "bg-ed-accent")}>
        {label} <span className="opacity-75">{size}</span>
      </span>
    </span>
  )
}

function Toolbar() {
  const slots = [
    { Icon: MousePointer2, active: true, menu: true },
    { Icon: LayoutPanelTop, menu: true },
    { Icon: Frame, menu: true },
    { Icon: Square, menu: true },
    { Icon: Type },
    { Icon: ImagePlus, menu: true },
    { Icon: PenTool },
  ]
  return (
    <div className="absolute bottom-4 left-1/2 flex h-11 -translate-x-1/2 items-center gap-1.5 rounded-full bg-ed-bar px-2 shadow-ed-bar">
      {slots.map(({ Icon, active, menu }, i) => (
        <span key={i} className="flex items-center">
          <span className={cn("grid size-7 place-items-center rounded-full text-ed-bar-ink", active && "bg-ed-bar-accent")}>
            <Icon className="size-[17px]" strokeWidth={1.5} />
          </span>
          {menu && <ChevronDown className="w-3.5 text-ed-bar-ink/70" size={10} strokeWidth={2} />}
        </span>
      ))}
      <span className="mx-1 h-7 w-px bg-ed-bar-line" />
      <span className="flex h-8 items-center rounded-full bg-ed-bar-line p-0.5">
        <span className="grid size-7 place-items-center rounded-full bg-ed-bar text-ed-bar-accent-text shadow-ed-switch">
          <MousePointer2 className="size-4" strokeWidth={1.5} />
        </span>
        <span className="grid size-7 place-items-center text-ed-bar-ink/70">
          <MousePointerClick className="size-4" strokeWidth={1.5} />
        </span>
      </span>
    </div>
  )
}

