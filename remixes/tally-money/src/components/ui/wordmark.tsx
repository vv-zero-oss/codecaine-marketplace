import { cn } from "@/lib/utils"

/** The mark: a rounded square holding three stacked bars — a tally. */
export function Mark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "grid size-6 place-items-center rounded-[0.45rem] bg-gradient-to-br from-brand-500 to-leaf-500",
        className,
      )}
    >
      <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <path d="M4 3.5v9M8 3.5v9M12 3.5v9" />
      </svg>
    </span>
  )
}

/** The logo, twice: a link in the header, plain text in the footer. */
export function Wordmark({ href, className }: { href?: string; className?: string }) {
  const content = (
    <>
      <Mark />
      Tally
    </>
  )
  const shared = cn("flex items-center gap-2 text-lg font-extrabold tracking-tight text-ink-900", className)
  if (href) {
    return (
      <a href={href} className={shared}>
        {content}
      </a>
    )
  }
  return <span className={shared}>{content}</span>
}
