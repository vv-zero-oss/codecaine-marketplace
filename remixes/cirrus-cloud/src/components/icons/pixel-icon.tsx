import { cn } from "@/lib/utils"
import { PIXEL_ICONS, type PixelIconName } from "./pixel-icon-data"

/**
 * One pixel icon, drawn crisp on its 24px grid in the current text colour.
 * Decorative unless given a `label`.
 */
export function PixelIcon({ name, label, className }: { name: PixelIconName; label?: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      shapeRendering="crispEdges"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn("size-4 shrink-0", className)}
      dangerouslySetInnerHTML={{ __html: PIXEL_ICONS[name] }}
    />
  )
}

export type { PixelIconName }
