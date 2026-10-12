import { cn } from "@/lib/utils"

/**
 * Aerie's mark: one wing stroke, like a nest or a bird's open wings, and the
 * craft — a dot — lifting clear of it. Drawn in `currentColor`, so it takes the
 * colour of whatever it sits in.
 */
export function AerieMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden className={cn("size-6", className)}>
      <path d="M3 12.5C8 15 12.5 19.5 16 26c3.5-6.5 8-11 13-13.5" stroke="currentColor" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="16" cy="9" r="3.6" fill="currentColor" />
    </svg>
  )
}

/** The mark beside the wordmark, set in the site's own face. */
export function Logo({ className, markClassName }: { className?: string; markClassName?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-[0.28em] text-[22px] leading-none font-semibold tracking-[-0.05em]", className)}>
      <AerieMark className={cn("size-[1.1em]", markClassName)} />
      aerie
    </span>
  )
}
