import { useMemo } from "react"

import { cn } from "@/lib/utils"

/** A deterministic star field, so the orb is the same on every render. */
function stars(count: number) {
  let seed = 7
  const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647)
  return Array.from({ length: count }, () => ({
    x: rand() * 100,
    y: rand() * 100,
    r: 0.2 + rand() * 0.7,
    o: 0.35 + rand() * 0.65,
  }))
}

/** The voice product's sphere: a dark glass ball, a slow-turning sky of stars and a violet sheen. */
export function VoiceOrb({
  size = 172,
  speed = 80,
  paused = false,
  className,
}: {
  /** Diameter in px. */
  size?: number
  /** Seconds per turn. */
  speed?: number
  paused?: boolean
  className?: string
}) {
  const field = useMemo(() => stars(90), [])
  return (
    <div
      className={cn("relative shrink-0 overflow-hidden rounded-full", className)}
      style={{
        width: size,
        height: size,
        background: "radial-gradient(circle at 35% 30%, #3a2a66 0%, #150f2a 45%, #07060f 100%)",
        boxShadow: "inset -8px -10px 30px rgb(0 0 0 / 0.55), inset 6px 6px 22px rgb(150 120 255 / 0.28), 0 18px 40px -18px rgb(40 20 90 / 0.6)",
      }}
    >
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 size-full animate-orb"
        style={{ animationDuration: `${speed}s`, animationPlayState: paused ? "paused" : "running" }}
        aria-hidden
      >
        {field.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#fff" opacity={s.o} />
        ))}
      </svg>
      <div
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{ background: "radial-gradient(circle at 70% 85%, rgb(120 160 255 / 0.28), transparent 45%), radial-gradient(circle at 25% 20%, rgb(255 255 255 / 0.12), transparent 30%)" }}
      />
    </div>
  )
}
