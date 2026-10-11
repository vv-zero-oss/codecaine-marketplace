import { cn } from "@/lib/utils"

/** The mark: a plane climbing out of the corner, its two trails behind it,
 *  on the app icon's rounded square. */
export function ContrailMark({ className, tone = "ink" }: { className?: string; tone?: "ink" | "light" }) {
  const bg = tone === "ink" ? "var(--color-ink)" : "#ffffff"
  const fg = tone === "ink" ? "#ffffff" : "var(--color-ink)"
  return (
    <svg viewBox="0 0 32 32" className={cn("size-8 shrink-0", className)} aria-hidden>
      <rect width={32} height={32} rx={8.5} fill={bg} />
      <path d="M6.5 22.5 14 15" stroke={fg} strokeWidth={1.6} strokeLinecap="round" opacity={0.45} />
      <path d="M9.5 25.5 17 18" stroke={fg} strokeWidth={1.6} strokeLinecap="round" opacity={0.45} />
      <path
        d="M24.6 7.4c.9.9.5 2.1-.4 3l-2.6 2.6 1.5 7.7-1.6 1.6-3.4-6-2.9 2.9.3 2.6-1.2 1.2-1.5-3-3-1.5 1.2-1.2 2.6.3 2.9-2.9-6-3.4 1.6-1.6 7.7 1.5 2.6-2.6c.9-.9 2.1-1.3 3-.4Z"
        fill={fg}
      />
    </svg>
  )
}

/** Mark and wordmark together. */
export function Logo({ className, tone = "ink" }: { className?: string; tone?: "ink" | "light" }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <ContrailMark tone={tone} />
      <span className="text-[19px] font-semibold tracking-[-0.03em]">Contrail</span>
    </span>
  )
}
