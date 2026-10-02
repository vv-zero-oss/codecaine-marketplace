import { PixelSprite } from "@/components/pixel/pixel-sprite"
import { cn } from "@/lib/utils"

/**
 * The plane and its dithered contrail, crossing its box left to right. `duration`
 * is seconds per crossing; the loop steps in eight-frame hops so it reads as a
 * sprite, not a vector.
 */
export function PixelFlight({
  duration = 7,
  delay = 0,
  paused = false,
  className,
}: {
  duration?: number
  delay?: number
  paused?: boolean
  className?: string
}) {
  return (
    <div aria-hidden data-canvas-ignore className={cn("relative h-8 overflow-hidden", className)}>
      <div
        data-canvas-ignore
        className="absolute inset-y-0 left-0 flex w-full animate-fly items-center"
        style={{
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        <span className="h-1.5 w-[60%] bg-[repeating-linear-gradient(to_right,transparent_0_4px,var(--color-fg)_4px_8px)] [mask-image:linear-gradient(to_right,transparent,#000)]" />
        <PixelSprite name="plane" scale={3} className="rotate-90" />
      </div>
    </div>
  )
}
