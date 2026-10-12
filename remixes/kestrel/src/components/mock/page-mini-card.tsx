import { KestrelMark } from "@/components/site/logo"
import { cn } from "@/lib/utils"

/**
 * A small metal card for the inner-page mockups: the fine guilloché lines,
 * the chip, the mark and the last four. `frozen` greys it out.
 */
export function MiniCard({
  holder = "Ada Lindqvist",
  last4 = "4021",
  frozen = false,
  className,
}: {
  holder?: string
  last4?: string
  frozen?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        "relative aspect-[1.586] w-full overflow-hidden rounded-[10px] bg-metal text-night-fg shadow-(--shadow-metal) transition-[filter,opacity] duration-(--duration-swap) ease-(--ease-out-strong)",
        frozen && "opacity-60 grayscale",
        className,
      )}
    >
      <svg viewBox="0 0 200 126" className="absolute inset-0 size-full" aria-hidden preserveAspectRatio="none">
        {Array.from({ length: 22 }, (_, i) => (
          <circle key={i} cx="210" cy="140" r={20 + i * 9} fill="none" stroke="var(--color-metal-line)" strokeWidth="0.6" />
        ))}
      </svg>
      <div className="relative flex h-full flex-col justify-between p-[8%]">
        <div className="flex items-start justify-between">
          <span className="inline-flex items-center gap-0.5 text-[13px] font-semibold tracking-[-0.04em]">
            kestrel <KestrelMark className="size-3" />
          </span>
          <span className="h-[18%] min-h-4 w-[16%] rounded-[3px] bg-gradient-to-br from-ink-4 to-ink-3 opacity-80" />
        </div>
        <div className="flex items-end justify-between text-[11px] text-night-muted">
          <span className="truncate">{holder}</span>
          <span className="font-mono tabular-nums">•• {last4}</span>
        </div>
      </div>
      {frozen && (
        <span className="absolute inset-0 grid place-items-center">
          <span className="rounded-full bg-raised/90 px-2.5 py-1 text-[11px] font-medium text-ink shadow-(--shadow-card)">Frozen</span>
        </span>
      )}
    </div>
  )
}
