import { useLayoutEffect, useRef, useState, type ReactNode } from "react"

import { BrandLogo, type Brand } from "@/components/ui/brand-logo"
import { cn } from "@/lib/utils"

/**
 * The parts every product mockup is built from. The mockups are HTML, not
 * pictures: sharp at any size, editable in the canvas editor, and animated
 * with the same tokens as the page.
 */

/**
 * Draws its child at a fixed design width and scales it to whatever width it
 * is given — so a mockup keeps its proportions from a phone to a wide screen
 * without a second layout. The wrapper takes the scaled height.
 */
export function Fit({ width, children, className }: { width: number; children: ReactNode; className?: string }) {
  const outer = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  const [box, setBox] = useState({ scale: 1, height: 0 })

  useLayoutEffect(() => {
    const o = outer.current
    const i = inner.current
    if (!o || !i) return
    const measure = () => {
      const scale = Math.min(1, o.clientWidth / width)
      setBox({ scale, height: i.offsetHeight * scale })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(o)
    ro.observe(i)
    return () => ro.disconnect()
  }, [width])

  return (
    <div ref={outer} className={cn("relative w-full", className)} style={{ height: box.height || undefined }}>
      <div
        ref={inner}
        data-canvas-ignore
        className="absolute top-0 left-0 origin-top-left"
        style={{ width, transform: `scale(${box.scale})` }}
      >
        {children}
      </div>
    </div>
  )
}

/** An app window: a frosted frame with traffic lights around a surface. */
export function Window({
  title,
  dark = false,
  className,
  bodyClassName,
  children,
}: {
  title?: ReactNode
  dark?: boolean
  className?: string
  bodyClassName?: string
  children: ReactNode
}) {
  return (
    <div
      className={cn(
        "rounded-window px-1.5 pb-1.5 shadow-window backdrop-blur-md",
        dark ? "bg-void/90" : "bg-hover/80",
        className,
      )}
    >
      <div className="flex h-7 items-center gap-1.5 px-1.5">
        <span className="size-[9px] rounded-full bg-light-red" />
        <span className="size-[9px] rounded-full bg-light-yellow" />
        <span className="size-[9px] rounded-full bg-light-green" />
        {title && <span className="ml-2 truncate text-micro text-ink-2">{title}</span>}
      </div>
      <div
        className={cn(
          "overflow-hidden rounded-card border border-white/[0.05]",
          dark ? "bg-void" : "bg-surface",
          bodyClassName,
        )}
      >
        {children}
      </div>
    </div>
  )
}

/** A soft, floating card inside a mockup. */
export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("rounded-card bg-surface shadow-card", className)}>{children}</div>
}

const AVATAR_TONES = {
  accent: "bg-accent-tint text-accent-ink",
  green: "bg-green-tint text-green",
  orange: "bg-orange-tint text-orange",
  red: "bg-red-tint text-red",
  purple: "bg-purple-tint text-purple",
  yellow: "bg-yellow-tint text-yellow",
} as const

export type Tone = keyof typeof AVATAR_TONES

/** Initials in a tinted circle. */
export function Avatar({ initials, tone = "accent", size = 16, className }: { initials: string; tone?: Tone; size?: number; className?: string }) {
  return (
    <span
      className={cn("inline-flex shrink-0 items-center justify-center rounded-full font-semibold", AVATAR_TONES[tone], className)}
      style={{ width: size, height: size, fontSize: Math.max(7, size * 0.42) }}
    >
      {initials}
    </span>
  )
}

const CHIP_TONES = {
  neutral: "bg-hover text-ink-soft shadow-(--shadow-chip-neutral)",
  green: "bg-green-tint text-green shadow-(--shadow-chip-green)",
  accent: "bg-accent-tint text-accent-ink shadow-(--shadow-chip-accent)",
  orange: "bg-orange-tint text-orange shadow-(--shadow-chip-orange)",
  red: "bg-red-tint text-red shadow-(--shadow-chip-red)",
  purple: "bg-purple-tint text-purple shadow-(--shadow-chip-purple)",
  yellow: "bg-yellow-tint text-yellow shadow-(--shadow-chip-yellow)",
} as const

/** A small tinted label: a score, a stage, a status. */
export function Chip({ tone = "neutral", className, children }: { tone?: keyof typeof CHIP_TONES; className?: string; children: ReactNode }) {
  return (
    <span className={cn("inline-flex h-[22px] items-center gap-1 rounded-[7px] px-1.5 text-sm font-medium", CHIP_TONES[tone], className)}>
      {children}
    </span>
  )
}

/** A company's mark in a small rounded square: its logo if we have one, else its initial. */
export function CompanyMark({ name, brand, tone = "accent", size = 16 }: { name: string; brand?: Brand; tone?: Tone; size?: number }) {
  return (
    <span
      className={cn("inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[4.8px]", AVATAR_TONES[tone])}
      style={{ width: size, height: size, fontSize: size * 0.55 }}
    >
      {brand ? <BrandLogo brand={brand} scale={size / 30} fit={size * 0.72} label={false} /> : name[0]}
    </span>
  )
}

/** A key hint, like ⌘K. */
export function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-[6px] border border-white/[0.06] px-1 font-sans text-micro text-ink-3">
      {children}
    </kbd>
  )
}
