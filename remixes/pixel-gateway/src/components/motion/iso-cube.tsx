import { cn } from "@/lib/utils"

const TONES = {
  accent: "bg-accent [--cube-edge:var(--color-accent-hi)]",
  sky: "bg-sky-3 [--cube-edge:var(--color-sky-5)]",
  good: "bg-good/80 [--cube-edge:var(--color-good)]",
  warn: "bg-warn/80 [--cube-edge:var(--color-warn)]",
} as const

/**
 * A pixel cube in real 3D: six dithered faces, spun by a CSS animation whose
 * length is the `speed` prop. `paused` holds it still; `spin={false}` leaves it
 * at the classic isometric angle.
 */
export function IsoCube({
  size = 96,
  speed = 14,
  spin = true,
  paused = false,
  tone = "accent",
  className,
}: {
  size?: number
  /** Seconds per full turn. */
  speed?: number
  spin?: boolean
  paused?: boolean
  tone?: keyof typeof TONES
  className?: string
}) {
  const half = size / 2
  const faces = [
    `rotateY(0deg) translateZ(${half}px)`,
    `rotateY(90deg) translateZ(${half}px)`,
    `rotateY(180deg) translateZ(${half}px)`,
    `rotateY(-90deg) translateZ(${half}px)`,
    `rotateX(90deg) translateZ(${half}px)`,
    `rotateX(-90deg) translateZ(${half}px)`,
  ]
  const shade = ["", "brightness-75", "brightness-90", "brightness-75", "brightness-125", "brightness-50"]
  return (
    <div className={cn("[perspective:800px]", className)} style={{ width: size, height: size }}>
      <div
        data-canvas-ignore
        className={cn("relative size-full preserve-3d", spin && "animate-spin-cube")}
        style={{
          animationDuration: `${speed}s`,
          animationPlayState: paused ? "paused" : "running",
          transform: spin ? undefined : "rotateX(-24deg) rotateY(38deg)",
        }}
      >
        {faces.map((transform, i) => (
          <div
            key={i}
            data-canvas-ignore
            className={cn(
              "px-dither absolute inset-0 border-4 border-(--cube-edge) backface-hidden",
              TONES[tone],
              shade[i],
            )}
            style={{ transform }}
          />
        ))}
      </div>
    </div>
  )
}
