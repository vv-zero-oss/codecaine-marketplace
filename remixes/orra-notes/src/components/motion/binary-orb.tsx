import { useMemo } from "react"

import { cn } from "@/lib/utils"

/**
 * A planet of ones and zeros lit violet from below — the system's radial
 * spotlight, the one place the accent glows this strongly: a sphere, a second one
 * rising behind it, and a grid of digits masked to their shape that flickers
 * in columns. CSS only — a radial gradient, a mask and a keyframe — so it
 * costs nothing on the main thread and the editor's Motion switch stops it.
 *
 * Purpose: atmosphere for the privacy pitch, on a marketing page where
 * delight is allowed. `flicker` turns the digits' pulse off.
 */
export function BinaryOrb({
  size = 680,
  flicker = true,
  seed = 7,
  className,
}: {
  size?: number
  flicker?: boolean
  seed?: number
  className?: string
}) {
  const columns = useMemo(() => {
    let state = seed
    const random = () => {
      state = (state * 9301 + 49297) % 233280
      return state / 233280
    }
    return Array.from({ length: 34 }, () => ({
      digits: Array.from({ length: 52 }, () => (random() > 0.5 ? "1" : "0")).join("\n"),
      delay: `${(random() * 1.6).toFixed(2)}s`,
      duration: `${(1.2 + random() * 1.4).toFixed(2)}s`,
    }))
  }, [seed])

  const sphere =
    "radial-gradient(ellipse 70% 62% at 50% 96%, color-mix(in srgb, var(--violet) 45%, var(--snow)) 0%, var(--violet) 28%, color-mix(in srgb, var(--violet) 55%, var(--void)) 60%, color-mix(in srgb, var(--violet) 22%, var(--void)) 100%)"

  return (
    <div aria-hidden className={cn("pointer-events-none relative", className)} style={{ width: size, height: size * 1.25 }}>
      {/* The second sphere, lower and smaller, behind. */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-pill"
        style={{ width: size * 0.7, height: size * 0.7, top: size * 0.62, background: sphere, opacity: 0.85 }}
      />
      <div className="absolute inset-x-0 top-0 rounded-pill" style={{ height: size, background: sphere }} />
      {/* The digits, masked to the two spheres. */}
      <div
        className="absolute inset-0 flex justify-between overflow-hidden px-[6%] font-mono text-[13px] leading-[17px] whitespace-pre text-void/45"
        style={{
          maskImage: `radial-gradient(circle ${size / 2}px at 50% ${size / 2}px, black 98%, transparent 100%), radial-gradient(circle ${size * 0.35}px at 50% ${size * 0.97}px, black 98%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(circle ${size / 2}px at 50% ${size / 2}px, black 98%, transparent 100%), radial-gradient(circle ${size * 0.35}px at 50% ${size * 0.97}px, black 98%, transparent 100%)`,
        }}
      >
        {columns.map((column, index) => (
          <span
            key={index}
            className={cn(flicker && "animate-digits motion-reduce:animate-none")}
            style={{ animationDelay: column.delay, animationDuration: column.duration }}
          >
            {column.digits}
          </span>
        ))}
      </div>
    </div>
  )
}

/** Three ellipses turning about one axis — the mark for "agents connected". */
export function OrbitMark({ spinning = true, className }: { spinning?: boolean; className?: string }) {
  return (
    <div aria-hidden className={cn("relative size-24 [perspective:400px]", className)}>
      {[0, 60, 120].map((offset) => (
        <div
          key={offset}
          className={cn("absolute inset-0 [transform-style:preserve-3d]", spinning && "animate-orbit motion-reduce:animate-none")}
          style={{ animationDelay: `${(-offset / 360) * 14}s` }}
        >
          <div className="absolute inset-x-[22%] inset-y-0 rounded-[50%] border-[1.5px] border-snow/90" />
        </div>
      ))}
    </div>
  )
}
