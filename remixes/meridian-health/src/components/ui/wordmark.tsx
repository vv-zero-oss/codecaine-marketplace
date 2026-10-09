import { cn } from "@/lib/utils"

/** The Meridian mark: a rounded stroke that bends like a pulse line, with one live dot. */
export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" className={cn("size-6", className)} aria-hidden="true">
      <path
        d="M4 19c0-4 3-6 7-6h6c2 0 4 1.5 4 3.5S19 20 17 20H9"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="21.5" cy="8" r="2.6" className="fill-mint" />
    </svg>
  )
}

export function Wordmark({ className, markClassName }: { className?: string; markClassName?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-[17px] font-semibold tracking-tight", className)}>
      <Mark className={markClassName} />
      Meridian
    </span>
  )
}
