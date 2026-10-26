import { cn } from "@/lib/utils"

/**
 * Orra's logo: a ring with a notch — a coin seen edge-on, a loop closed — and
 * the name set lowercase. Draws in `currentColor`, so it is dark on paper and
 * white on espresso without a second file.
 */
export function Wordmark({ className, markOnly = false }: { className?: string; markOnly?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-[22px] font-semibold tracking-[-0.06em]", className)}>
      <OrraMark className="size-[0.95em]" />
      {markOnly ? <span className="sr-only">Orra</span> : <span className="-mt-[0.08em] leading-none">orra</span>}
    </span>
  )
}

export function OrraMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path
        d="M12 3.5a8.5 8.5 0 1 0 8.5 8.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <circle cx="19.6" cy="5.2" r="2.1" fill="var(--ember)" />
    </svg>
  )
}
