import { cn } from "@/lib/utils"

/** The Postwise mark: a folded paper plane. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn("size-5", className)} fill="currentColor">
      <path d="M2 11.6 22 2.5l-4.3 18.3-5.6-5.7-4 3.8v-5.6L19.4 5 10 13.1Z" />
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
