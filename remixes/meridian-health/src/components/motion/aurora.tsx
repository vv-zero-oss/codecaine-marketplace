import type { CSSProperties } from "react"

import { cn } from "@/lib/utils"

const TONES = {
  dawn: ["pastel-peach", "pastel-lilac", "pastel-sky", "pastel-rose"],
  mint: ["pastel-mint", "pastel-sky", "pastel-butter", "pastel-lilac"],
  lilac: ["pastel-lilac", "pastel-sky", "pastel-rose", "pastel-mint"],
  peach: ["pastel-peach", "pastel-butter", "pastel-rose", "pastel-lilac"],
  sky: ["pastel-sky", "pastel-mint", "pastel-lilac", "pastel-butter"],
} as const

/**
 * A soft pastel backdrop: four blurred colour blobs that drift slowly. Put it as the
 * first child of a `relative overflow-hidden` section; it never takes a click.
 */
export function Aurora({
  tone = "dawn",
  intensity = 0.9,
  speed = 18,
  className,
}: {
  tone?: keyof typeof TONES
  /** 0–1 — how strong the colour is. */
  intensity?: number
  /** Seconds for one drift cycle. */
  speed?: number
  className?: string
}) {
  const colors = TONES[tone]
  const spots = [
    { left: "-8%", top: "-10%", size: "52%", dx: "40px", dy: "30px" },
    { left: "46%", top: "-18%", size: "46%", dx: "-30px", dy: "40px" },
    { left: "58%", top: "42%", size: "50%", dx: "-36px", dy: "-26px" },
    { left: "-12%", top: "50%", size: "44%", dx: "30px", dy: "-30px" },
  ]
  return (
    <div aria-hidden="true" data-canvas-ignore className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden [mask-image:linear-gradient(transparent,#000_18%,#000_82%,transparent)]", className)} style={{ opacity: intensity }}>
      {spots.map((s, i) => (
        <span
          key={i}
          className="absolute aspect-square animate-[drift_var(--drift-speed)_ease-in-out_infinite] rounded-full blur-[70px] motion-reduce:animate-none"
          style={{ left: s.left, top: s.top, width: s.size, background: `var(--color-${colors[i]})`, animationDelay: `${i * -4}s`, "--drift-x": s.dx, "--drift-y": s.dy, "--drift-speed": `${speed}s` } as CSSProperties}
        />
      ))}
    </div>
  )
}
