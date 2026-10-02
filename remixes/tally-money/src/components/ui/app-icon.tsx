import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/** The glossy rounded-square tile that sits above a section's heading. */
export function AppIcon({ icon: Glyph, className }: { icon: LucideIcon; className?: string }) {
  return (
    <span
      className={cn(
        "grid size-12 place-items-center transition-transform duration-200 ease-[var(--ease-out)] active:scale-95 [@media(hover:hover)_and_(pointer:fine)]:hover:-rotate-6 [@media(hover:hover)_and_(pointer:fine)]:hover:scale-110 rounded-[0.9rem] bg-gradient-to-b from-brand-500 to-brand-700 text-white shadow-lift ring-1 ring-white/30 ring-inset",
        className,
      )}
    >
      <Glyph className="size-6" strokeWidth={2} />
    </span>
  )
}
