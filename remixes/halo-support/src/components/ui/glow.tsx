import { cn } from "@/lib/utils"

const TONES = {
  amber: "var(--color-glow-amber)",
  teal: "var(--color-glow-teal)",
  green: "var(--color-glow-green)",
  red: "var(--color-glow-red)",
} as const

/** The light behind a block: a vertical beam and a low wash rising from the
 *  bottom edge. Purely atmosphere — it sits behind the content. */
export function Glow({
  tone = "amber",
  intensity = 0.55,
  wide = false,
  className,
}: {
  tone?: keyof typeof TONES
  intensity?: number
  /** Adds a second, redder wash bleeding in from the lower left. */
  wide?: boolean
  className?: string
}) {
  const colour = TONES[tone]
  return (
    <div aria-hidden data-canvas-ignore className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div
        className="absolute inset-0"
        style={{
          opacity: intensity,
          background: `radial-gradient(120% 70% at 50% 112%, ${colour} 0%, transparent 62%)`,
        }}
      />
      {wide ? (
        <div
          className="absolute inset-0"
          style={{
            opacity: intensity * 0.55,
            background: "radial-gradient(60% 55% at 0% 100%, var(--color-glow-red) 0%, transparent 70%), radial-gradient(45% 40% at 100% 100%, var(--color-glow-amber) 0%, transparent 70%)",
          }}
        />
      ) : null}
      <div
        className="absolute bottom-0 left-1/2 h-[55%] w-[7%] min-w-10 -translate-x-1/2 origin-bottom blur-2xl [animation:beam-breathe_6s_var(--ease-in-out-soft)_infinite]"
        style={{ opacity: intensity * 0.9, background: `linear-gradient(to top, ${colour}, transparent)` }}
      />
    </div>
  )
}
