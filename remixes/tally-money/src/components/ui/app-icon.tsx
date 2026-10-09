import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const TONES = {
  blue: "from-brand-500 to-brand-700",
  green: "from-leaf-400 to-leaf-500",
  amber: "from-amber-300 to-amber-500",
  coral: "from-coral-500 to-coral-600",
  night: "from-night-800 to-night-950",
} as const

/** The glossy rounded-square tile that sits above a section's heading. `tone` picks its colour. */
export function AppIcon({ icon: Glyph, tone = "blue", className }: { icon: LucideIcon; tone?: keyof typeof TONES; className?: string }) {
  return (
    <span
      className={cn(
        "grid size-14 place-items-center rounded-[1.1rem] bg-gradient-to-b text-white shadow-lift ring-1 ring-white/30 ring-inset transition-transform duration-200 ease-[var(--ease-out)] active:scale-95 [@media(hover:hover)_and_(pointer:fine)]:hover:-rotate-6 [@media(hover:hover)_and_(pointer:fine)]:hover:scale-110",
        TONES[tone],
        tone === "amber" && "text-ink-900",
        className,
      )}
    >
      <Glyph className="size-7" strokeWidth={2} />
    </span>
  )
}
