import type * as React from "react"
import { useLayoutEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

/**
 * Device frames drawn in SVG, with the live interface laid inside them as
 * real HTML — so what's on the screen can be clicked, typed into and
 * dragged. The frame scales with its container; the screen keeps its own
 * pixel size and is scaled to fit by the parent.
 */

/** A browser window: SVG title bar with three dots and an address pill. */
export function BrowserFrame({ url = "kiln.studio", className, children }: { url?: string; className?: string; children?: React.ReactNode }) {
  return (
    <div className={cn("overflow-hidden rounded-[14px] bg-panel shadow-(--shadow-device)", className)}>
      <svg viewBox="0 0 640 40" className="block w-full" aria-hidden>
        <rect width="640" height="40" fill="var(--color-panel-2)" />
        <circle cx="20" cy="20" r="5.5" fill="var(--color-line-3)" />
        <circle cx="38" cy="20" r="5.5" fill="var(--color-line-3)" />
        <circle cx="56" cy="20" r="5.5" fill="var(--color-line-3)" />
        <rect x="190" y="10" width="260" height="20" rx="10" fill="var(--color-panel)" />
        <path d="M206 17.5v-2a3 3 0 0 1 6 0v2M204.5 17.5h9v6h-9z" fill="none" stroke="var(--color-ink-4)" strokeWidth="1.2" strokeLinejoin="round" />
        <text x="320" y="24.5" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="var(--color-ink-3)">
          {url}
        </text>
        <line x1="0" y1="39.5" x2="640" y2="39.5" stroke="var(--color-line)" />
      </svg>
      <div className="relative">{children}</div>
    </div>
  )
}

/**
 * A phone: the body, side buttons and island in SVG over a 390×844 screen.
 * The screen is real HTML and is clipped to the display's radius.
 */
export function PhoneFrame({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <div className={cn("relative aspect-[430/884] drop-shadow-[0_40px_60px_rgb(0_0_0/0.55)]", className)}>
      <div className="absolute inset-[2.2%_4.4%] overflow-hidden rounded-[13%/6.2%] bg-page">{children}</div>
      <svg viewBox="0 0 430 884" className="pointer-events-none absolute inset-0 size-full" aria-hidden>
        {/* side buttons */}
        <rect x="0" y="190" width="5" height="34" rx="2" fill="var(--color-raised)" />
        <rect x="0" y="250" width="5" height="62" rx="2" fill="var(--color-raised)" />
        <rect x="0" y="326" width="5" height="62" rx="2" fill="var(--color-raised)" />
        <rect x="425" y="270" width="5" height="96" rx="2" fill="var(--color-raised)" />
        {/* body: an outer rim and a bezel ring, punched out where the screen is */}
        <path
          fillRule="evenodd"
          fill="var(--color-panel-2)"
          d="M66 4h298a62 62 0 0 1 62 62v752a62 62 0 0 1-62 62H66A62 62 0 0 1 4 818V66A62 62 0 0 1 66 4zM75 19.5h280a49 49 0 0 1 49 49v747a49 49 0 0 1-49 49H75a49 49 0 0 1-49-49V68.5a49 49 0 0 1 49-49z"
        />
        <path d="M66 4h298a62 62 0 0 1 62 62v752a62 62 0 0 1-62 62H66A62 62 0 0 1 4 818V66A62 62 0 0 1 66 4z" fill="none" stroke="var(--color-line-3)" strokeWidth="1.5" />
        {/* the island */}
        <rect x="160" y="34" width="110" height="32" rx="16" fill="#000" />
        <circle cx="250" cy="50" r="6" fill="#0d0f14" />
      </svg>
    </div>
  )
}

/**
 * A roadside billboard: the face is live HTML; the catwalk, lamps, posts and
 * a little horizon are SVG.
 */
export function BillboardFrame({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <div className={cn("relative", className)}>
      <div className="relative z-10 mx-[3%] aspect-[2/1] overflow-hidden rounded-[3px] shadow-[0_0_0_6px_var(--color-panel-2),0_0_0_7px_var(--color-line-3),var(--shadow-device)]">{children}</div>
      <svg viewBox="0 0 600 190" className="-mt-[1px] block w-full" aria-hidden>
        {/* lamps over the face */}
        {[120, 300, 480].map((x) => (
          <g key={x}>
            <path d={`M${x} 2v14`} stroke="var(--color-line-3)" strokeWidth="3" />
            <rect x={x - 16} y="14" width="32" height="7" rx="2" fill="var(--color-raised)" />
          </g>
        ))}
        {/* catwalk */}
        <rect x="18" y="0" width="564" height="5" fill="var(--color-raised)" />
        <path d="M18 5v14M582 5v14" stroke="var(--color-line-3)" strokeWidth="2" />
        {Array.from({ length: 29 }, (_, i) => (
          <path key={i} d={`M${18 + i * 20} 5v14`} stroke="var(--color-line-2)" strokeWidth="1.5" />
        ))}
        <path d="M18 19h564" stroke="var(--color-line-3)" strokeWidth="2" />
        {/* posts and braces */}
        <path d="M200 19v150M400 19v150" stroke="var(--color-panel-2)" strokeWidth="14" />
        <path d="M200 60l200 70M400 60l-200 70" stroke="var(--color-line-2)" strokeWidth="3" />
        {/* the ground */}
        <path d="M0 170h600" stroke="var(--color-line-2)" strokeWidth="1.5" />
        <path d="M60 182h120M260 186h80M430 182h110" stroke="var(--color-line)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  )
}

/**
 * Lays a fixed-size screen (a 390×844 app, a 1200×600 poster) into whatever
 * box it is given, scaled to fit — so the interface inside is designed at
 * its real size and stays sharp at every size it is shown.
 */
export function FitScreen({ width, height, className, children }: { width: number; height: number; className?: string; children?: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [width])
  return (
    <div ref={ref} className={cn("relative size-full overflow-hidden", className)} style={{ aspectRatio: `${width}/${height}` }}>
      <div data-canvas-ignore className="absolute top-0 left-0 origin-top-left" style={{ width, height, transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  )
}
