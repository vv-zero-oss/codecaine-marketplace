import type { LucideIcon } from "lucide-react"

import { PixelEdge } from "@/components/motion/pixel-edge"
import { cn } from "@/lib/utils"

/** A framed tile: a sky gradient, a pixel mosaic along one side and one large line icon. */
export function ArtTile({ icon: Icon, seed = 1, tilt = 160, className }: { icon: LucideIcon; seed?: number; tilt?: number; className?: string }) {
  return (
    <div className={cn("border border-line bg-surface p-2.5 sm:p-3", className)}>
      <div
        className="relative grid aspect-[4/3] place-items-center overflow-hidden"
        style={{ backgroundImage: `linear-gradient(${tilt}deg, var(--sky) 0%, var(--sky-2) 55%, var(--paper) 120%)` }}
      >
        <PixelEdge edge="bottom" rows={3} cell={24} color="var(--paper)" seed={seed} density={0.8} interval={1800} />
        <Icon className="relative size-24 text-ink sm:size-28" strokeWidth={0.9} aria-hidden />
      </div>
    </div>
  )
}
