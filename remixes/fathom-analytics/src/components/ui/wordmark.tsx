import { cn } from "@/lib/utils"

/** The Fathom mark: a plumb line dropping into a ring. */
export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={cn("size-5", className)} aria-hidden="true">
      <path d="M4.5 10.5a7.5 7.5 0 0 1 15 0c0 3-2.2 4.6-4.4 5.6-1.6.8-2.6 1.8-2.6 3.4" />
      <circle cx="12" cy="10.5" r="2.6" />
      <circle cx="12" cy="20.2" r="0.6" fill="currentColor" />
    </svg>
  )
}

export function Wordmark({ href, className }: { href?: string; className?: string }) {
  const content = (
    <>
      <Mark />
      <span className="font-sans text-[17px] font-medium tracking-[-0.02em]">Fathom</span>
    </>
  )
  const shared = cn("inline-flex items-center gap-1.5", className)
  return href ? (
    <a href={href} className={shared} aria-label="Fathom home">
      {content}
    </a>
  ) : (
    <span className={shared}>{content}</span>
  )
}
