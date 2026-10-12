import { cn } from "@/lib/utils"

/**
 * The mark: a burst of six rounded rays — a firework seen from below, or a
 * table seen from above. Drawn on a 24 grid, in currentColor.
 */
export function FeteMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-5", className)} role={title ? "img" : undefined} aria-hidden={title ? undefined : true}>
      {title && <title>{title}</title>}
      <g fill="currentColor">
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <rect key={deg} x="10.6" y="1.6" width="2.8" height="7.6" rx="1.4" transform={`rotate(${deg} 12 12)`} />
        ))}
        <circle cx="12" cy="12" r="1.9" />
      </g>
    </svg>
  )
}

/** The wordmark: "fête", lower case, tight, with the mark as its spark. */
export function Logo({ className, mark = true }: { className?: string; mark?: boolean }) {
  return (
    <span className={cn("inline-flex items-start gap-[0.08em] text-[22px] leading-none font-semibold tracking-[-0.05em]", className)}>
      fête
      {mark && <FeteMark className="mt-[-0.12em] size-[0.42em]" />}
    </span>
  )
}
