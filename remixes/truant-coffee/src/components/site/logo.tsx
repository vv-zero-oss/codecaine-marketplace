import { cn } from "@/lib/utils"

/**
 * The mark: a T leaving in a hurry — its bar and stem, with two speed lines
 * trailing off to the left. Drawn in `currentColor`, so it takes the colour
 * of wherever it sits.
 */
export function TruantMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 28" aria-hidden className={cn("h-6 w-auto", className)} fill="currentColor">
      <rect x="12" y="2" width="26" height="6" rx="0.5" />
      <rect x="20" y="8" width="8" height="18" rx="0.5" />
      <rect x="0" y="11" width="16" height="3.4" rx="0.5" />
      <rect x="5" y="18" width="11" height="3.4" rx="0.5" />
    </svg>
  )
}

/** The mark with the wordmark set beside it in the poster face. */
export function TruantLogo({ className, wordmark = true }: { className?: string; wordmark?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <TruantMark />
      {wordmark && <span className="type-display text-[22px] leading-none tracking-[0.01em]">Truant</span>}
    </span>
  )
}
