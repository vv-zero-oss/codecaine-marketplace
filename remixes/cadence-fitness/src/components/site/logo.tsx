import { cn } from "@/lib/utils"

/**
 * Cadence's mark: one heartbeat on a white tile — a flat line, a single
 * spike, and flat again. Steady is the point.
 */
export function CadenceMark({ className, tile = true }: { className?: string; tile?: boolean }) {
  return (
    <span
      className={cn(
        "inline-grid size-7 shrink-0 place-items-center",
        tile && "rounded-[28%] bg-white text-night shadow-[inset_0_-1px_0_rgb(0_0_0/0.12)]",
        className,
      )}
    >
      <svg viewBox="0 0 24 24" className="size-[72%]" fill="none" aria-hidden>
        <path
          d="M2.5 13h4.2l2.1-4.5 3.4 9 2.6-7 1.4 2.5h5.3"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

/** The mark and the name, as the header and footer set them. */
export function CadenceLogo({ className, showName = true }: { className?: string; showName?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 text-fg", className)}>
      <CadenceMark />
      {showName ? <span className="font-display text-[17px] font-semibold tracking-[-0.01em]">Cadence</span> : null}
    </span>
  )
}
