import { cn } from "@/lib/utils"

/**
 * Keel's mark: a hull under a level line, on a white tile. The line is the
 * promise — an even keel — and the hull is what keeps it there.
 */
export function KeelMark({ className, tile = true }: { className?: string; tile?: boolean }) {
  return (
    <span
      className={cn(
        "inline-grid size-7 shrink-0 place-items-center",
        tile && "rounded-[28%] bg-white text-night shadow-[inset_0_-1px_0_rgb(0_0_0/0.12)]",
        className,
      )}
    >
      <svg viewBox="0 0 24 24" className="size-[68%]" fill="none" aria-hidden>
        <path d="M4 9.5h16" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M5.5 12.5h13a6.5 6.5 0 0 1-13 0Z" fill="currentColor" />
        <path d="M12 17v3.5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      </svg>
    </span>
  )
}

/** The mark and the name, as the header and footer set them. */
export function KeelLogo({ className, showName = true }: { className?: string; showName?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 text-fg", className)}>
      <KeelMark />
      {showName ? <span className="font-display text-[17px] font-semibold tracking-[-0.01em]">Keel</span> : null}
    </span>
  )
}
