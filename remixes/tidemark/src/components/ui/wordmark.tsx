import { cn } from "@/lib/utils"

/** The Tidemark mark: a ring with the tide line drawn through it. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn("size-6", className)} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M3.5 13.2c2.3-2 4.6-2 6.9 0s4.6 2 6.9 0c1-.9 2-1.2 3.2-1.2" />
    </svg>
  )
}

/** The name in wide heavy caps — the page's poster voice, small. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <a href="#top" aria-label="Tidemark home" className={cn("type-caps inline-flex items-center text-[17px] leading-none sm:text-[20px] tracking-[0.01em] text-current md:text-[22px]", className)}>
      Tidemark
    </a>
  )
}
