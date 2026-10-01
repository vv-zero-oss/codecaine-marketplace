import { cn } from "@/lib/utils"

/** The Vantage mark: a ring and the arc of an orbit across it. */
export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden className={cn("size-6", className)} fill="none" stroke="currentColor" strokeWidth="2.6">
      <circle cx="20" cy="20" r="9" />
      <path d="M4 26c10 5 26-2 32-14" strokeLinecap="round" stroke="var(--accent)" />
    </svg>
  )
}

/** The logo: a link in the header, plain text in the footer. */
export function Wordmark({ href, className }: { href?: string; className?: string }) {
  const content = (
    <>
      <Mark />
      <span className="text-[17px] font-medium tracking-[0.04em] uppercase">Vantage</span>
    </>
  )
  const shared = cn("flex items-center gap-2 text-ink", href && "min-h-11", className)
  if (href) {
    return (
      <a href={href} className={shared} aria-label="Vantage home">
        {content}
      </a>
    )
  }
  return <span className={shared}>{content}</span>
}
