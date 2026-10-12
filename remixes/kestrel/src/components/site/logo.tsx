import { cn } from "@/lib/utils"

/**
 * The Kestrel mark — a bird holding still in the wind, drawn as two wedges —
 * and the lowercase wordmark beside it. `currentColor` throughout, so it
 * takes the colour of wherever it sits.
 */
export function KestrelMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={cn("size-5", className)}>
      <path d="M2 9.5 11.2 13 9 21.5 6.6 14.4Z" />
      <path d="M22 4.5 13 13.2 10.6 11.9Z" opacity="0.92" />
      <circle cx="13.6" cy="8.2" r="1.6" />
    </svg>
  )
}

export function Logo({ className, mark = true }: { className?: string; mark?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-1 text-[21px] leading-none font-semibold tracking-[-0.045em]", className)}>
      kestrel
      {mark && <KestrelMark className="size-[18px] -translate-y-px" />}
    </span>
  )
}
