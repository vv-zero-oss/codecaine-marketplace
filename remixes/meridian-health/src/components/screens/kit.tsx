import { useRef, useState, type ReactNode } from "react"

import { cn } from "@/lib/utils"

/** The page behind every in-phone screen: status-bar room on top, hidden-scrollbar scroll inside. */
export function Screen({ className, children }: { className?: string; children?: ReactNode }) {
  return (
    <div
      data-lenis-prevent
      className={cn(
        "absolute inset-0 overflow-x-hidden overflow-y-auto bg-paper px-5 pt-[64px] pb-24 text-ink [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      {children}
    </div>
  )
}

/** A segmented control. The thumb slides; the labels are real buttons. */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  dark = false,
  className,
}: {
  options: readonly T[]
  value: T
  onChange: (next: T) => void
  dark?: boolean
  className?: string
}) {
  const index = options.indexOf(value)
  return (
    <div
      role="tablist"
      className={cn("relative grid rounded-full p-1 text-[13px] font-medium", dark ? "bg-white/10" : "bg-tint", className)}
      style={{ gridTemplateColumns: `repeat(${options.length}, 1fr)` }}
    >
      <span
        aria-hidden="true"
        className={cn("absolute inset-y-1 rounded-full shadow-sm transition-transform duration-300 ease-out", dark ? "bg-white/20" : "bg-paper")}
        style={{ width: `calc((100% - 8px) / ${options.length})`, transform: `translateX(${index * 100}%)`, left: 4 }}
      />
      {options.map((option) => (
        <button
          key={option}
          role="tab"
          aria-selected={option === value}
          onClick={() => onChange(option)}
          className={cn("relative z-10 h-8 rounded-full transition-colors", option === value ? "" : dark ? "text-white/60" : "text-ink-3")}
        >
          {option}
        </button>
      ))}
    </div>
  )
}

/** Bottom tab bar shared by the screens that have tabs. */
export function TabBar({ items, value, onChange }: { items: { id: string; label: string; icon: ReactNode }[]; value: string; onChange: (id: string) => void }) {
  return (
    <div className="absolute inset-x-0 bottom-0 z-10 flex justify-around border-t border-line bg-paper/90 px-4 pt-2 pb-8 backdrop-blur">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onChange(item.id)}
          className={cn("flex w-16 flex-col items-center gap-0.5 text-[11px] font-medium transition-colors", value === item.id ? "text-ink" : "text-ink-3")}
        >
          <span className={cn("transition-transform duration-200", value === item.id && "scale-110")}>{item.icon}</span>
          {item.label}
        </button>
      ))}
    </div>
  )
}

/**
 * A line chart you can scrub. Move a finger or the pointer along it and the
 * nearest point lights up; `format` turns the value into the readout.
 */
export function ScrubChart({
  data,
  color = "var(--color-chart-1)",
  fill = true,
  height = 140,
  format = (v: number) => String(Math.round(v)),
  labels,
  onScrub,
  className,
}: {
  data: number[]
  color?: string
  fill?: boolean
  height?: number
  format?: (value: number) => string
  labels?: string[]
  onScrub?: (index: number | null) => void
  className?: string
}) {
  const [active, setActive] = useState<number | null>(null)
  const box = useRef<SVGSVGElement>(null)
  const W = 320
  const min = Math.min(...data)
  const max = Math.max(...data)
  const x = (i: number) => (i / (data.length - 1)) * W
  const y = (v: number) => 12 + (1 - (v - min) / (max - min || 1)) * (height - 28)
  const path = data.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ")
  const move = (clientX: number) => {
    const r = box.current!.getBoundingClientRect()
    const i = Math.round(((clientX - r.left) / r.width) * (data.length - 1))
    const next = Math.max(0, Math.min(data.length - 1, i))
    setActive(next)
    onScrub?.(next)
  }
  const leave = () => {
    setActive(null)
    onScrub?.(null)
  }
  return (
    <svg
      ref={box}
      viewBox={`0 0 ${W} ${height}`}
      className={cn("w-full touch-none overflow-visible", className)}
      style={{ height }}
      onPointerMove={(e) => move(e.clientX)}
      onPointerDown={(e) => move(e.clientX)}
      onPointerLeave={leave}
      onPointerUp={leave}
    >
      <defs>
        <linearGradient id={`fill-${color.replace(/\W/g, "")}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.28" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {fill && <path d={`${path} L${W} ${height} L0 ${height} Z`} fill={`url(#fill-${color.replace(/\W/g, "")})`} />}
      <path d={path} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      {active !== null && (
        <g>
          <line x1={x(active)} x2={x(active)} y1="0" y2={height} stroke={color} strokeOpacity="0.35" strokeDasharray="3 3" />
          <circle cx={x(active)} cy={y(data[active])} r="5" fill="var(--color-paper)" stroke={color} strokeWidth="2.5" />
          <g transform={`translate(${Math.min(W - 64, Math.max(0, x(active) - 32))} 0)`}>
            <rect width="64" height="22" rx="11" fill="var(--color-ink)" />
            <text x="32" y="15" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">
              {format(data[active])}
              {labels ? ` · ${labels[active]}` : ""}
            </text>
          </g>
        </g>
      )}
    </svg>
  )
}

/** A small back / close / more row at the head of a screen. */
export function NavRow({ title, left, right }: { title?: string; left?: ReactNode; right?: ReactNode }) {
  return (
    <div className="flex h-10 items-center justify-between">
      <div className="size-10">{left}</div>
      {title && <div className="text-[15px] font-semibold">{title}</div>}
      <div className="size-10 text-right">{right}</div>
    </div>
  )
}
