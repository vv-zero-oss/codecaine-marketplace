import { cn } from "@/lib/utils"

/** The Postwise mark: an envelope's flap folded into a tile, with the reply dot. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn("size-5", className)} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2.5" y="4.5" width="19" height="15" rx="4.5" />
      <path d="m6.5 9 5.5 4 5.5-4" />
      <circle cx="19.5" cy="4.5" r="2.6" fill="currentColor" stroke="none" />
    </svg>
  )
}

/** The mark and the name. `compact` drops the name, as the floating nav does. */
export function Wordmark({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <a href="#top" aria-label="Postwise home" className={cn("inline-flex items-center gap-1.5 text-current", className)}>
      <LogoMark />
      {!compact && <span className="text-[19px] font-semibold tracking-[-0.04em]">postwise</span>}
    </a>
  )
}
