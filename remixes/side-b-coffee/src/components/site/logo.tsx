import { cn } from "@/lib/utils"

/**
 * The record mark: a small LP with the sun in its label. Drawn on the
 * 24px grid with a 1.6 stroke so it sits beside the wordmark at any size.
 */
export function RecordMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className={cn("size-7", className)} aria-hidden>
      <rect x="2.5" y="4.5" width="27" height="23" rx="3" />
      <circle cx="16" cy="16" r="8.5" />
      <circle cx="16" cy="16" r="5.5" strokeDasharray="1 2" />
      <circle cx="16" cy="16" r="2.2" fill="currentColor" />
      <path d="M6 8.5 L8.5 8.5 M23.5 23.5 L26 23.5 M6 23.5 L7 23.5" />
    </svg>
  )
}

/**
 * The wordmark: "Side B Coffee" set in the condensed serif, tight. Inline
 * in the header; stacked over two lines, very large, in the footer.
 */
export function Logo({ stacked = false, className }: { stacked?: boolean; className?: string }) {
  if (stacked) {
    return (
      <span className={cn("type-display block text-[clamp(64px,9vw,128px)] leading-[0.84] tracking-[-0.045em] text-ink", className)}>
        Side B
        <span className="flex items-end gap-[0.12em]">
          Coffee
          <RecordMark className="mb-[0.1em] size-[0.62em] text-ink" />
        </span>
      </span>
    )
  }
  return (
    <span className={cn("type-display inline-flex items-center gap-1.5 text-[23px] leading-none tracking-[-0.03em] text-ink", className)}>
      <RecordMark className="size-[1.15em]" />
      side b coffee
    </span>
  )
}
