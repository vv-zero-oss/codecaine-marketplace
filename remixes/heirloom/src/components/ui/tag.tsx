import { cn } from "@/lib/utils"

/** The small uppercase chip that labels a card or a stat. */
export function Tag({ className, children }: { className?: string; children: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-5 items-center rounded-pill border border-line bg-glass px-2 text-[9px] font-medium tracking-[0.12em] text-fg-muted uppercase backdrop-blur-md",
        className,
      )}
    >
      {children}
    </span>
  )
}
