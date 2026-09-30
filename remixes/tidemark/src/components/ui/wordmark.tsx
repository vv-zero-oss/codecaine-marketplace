import { cn } from "@/lib/utils"

/** The Tidemark mark: a ring with the tide line drawn through it. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn("size-6", className)} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M3.5 13.2c2.3-2 4.6-2 6.9 0s4.6 2 6.9 0c1-.9 2-1.2 3.2-1.2" />
    </svg>
  )
}

/** The mark and the name, the name set in the display serif. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <a href="#top" aria-label="Tidemark home" className={cn("inline-flex items-center gap-2 text-current", className)}>
      <LogoMark />
      <span className="font-serif text-[26px] leading-none tracking-[-0.01em]">Tidemark</span>
    </a>
  )
}
