import { cn } from "@/lib/utils"

/**
 * The small labels the reference pins to a section's corners —
 * "where you are" on the left, a quiet aside on the right.
 */
export function CornerLabels({ left, right, className }: { left?: string; right?: string; className?: string }) {
  return (
    <div className={cn("flex items-end justify-between gap-6 text-micro", className)}>
      <span>{left}</span>
      <span className="text-right">{right}</span>
    </div>
  )
}
