import { cn } from "@/lib/utils"

/** Adwright's own mark: two strokes meeting in an upward tick. */
export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn("size-5", className)}>
      <path d="M3 18.5 9.2 5.5h2.6L18 18.5h-3l-1.3-2.9H7.3L6 18.5H3Zm5.4-5.4h4.2L10.5 8.4l-2.1 4.7Z" fill="currentColor" />
      <path d="m16.4 9.6 2.2 2.4 3.4-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Wordmark({ name, className }: { name: string; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-[15px] font-semibold tracking-[-0.02em]", className)}>
      <Mark />
      {name}
    </span>
  )
}
