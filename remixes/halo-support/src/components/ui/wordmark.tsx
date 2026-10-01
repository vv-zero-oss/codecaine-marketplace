import { cn } from "@/lib/utils"

/** The Halo mark: a ring with one lit arc. Drawn in `currentColor` with the
 *  arc in the accent, so it follows the text colour it sits in. */
export function HaloMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cn("size-6", className)} fill="none">
      <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="4" />
      <circle
        cx="16"
        cy="16"
        r="10"
        stroke="var(--color-ember)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="17 80"
        transform="rotate(-72 16 16)"
      />
    </svg>
  )
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-[22px] font-medium tracking-tight text-text", className)}>
      <HaloMark />
      Halo
    </span>
  )
}
