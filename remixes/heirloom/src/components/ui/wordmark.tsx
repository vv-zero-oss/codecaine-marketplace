import { cn } from "@/lib/utils"

/** Two nested arches: the doorway a family walks through, drawn once. */
export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden className={cn("size-[18px]", className)}>
      <path d="M3 18V9a7 7 0 0 1 14 0v9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7 18v-8a3 3 0 0 1 6 0v8" stroke="currentColor" strokeWidth="1.6" opacity="0.55" />
    </svg>
  )
}

/** The logo: a link in the header, plain text in the footer. */
export function Wordmark({ href, className }: { href?: string; className?: string }) {
  const content = (
    <>
      <span className="text-[22px] leading-none font-medium tracking-[-0.04em] lowercase">heirloom</span>
      <Mark />
    </>
  )
  const shared = cn("inline-flex items-center gap-1.5 text-fg", className)
  return href ? (
    <a href={href} aria-label="Heirloom home" className={shared}>
      {content}
    </a>
  ) : (
    <span className={shared}>{content}</span>
  )
}
