import { cn } from "@/lib/utils"

/** A small label that sits on an illustration. */
function Chip({ children }: { children: string }) {
  return <span className="border border-line bg-paper px-2 py-1 font-mono text-[10px] text-ink-2">{children}</span>
}

const BARS = [3, 5, 4, 7, 5, 4, 2]

/** Latency, as bars built from squares; the last one is the one that matters. */
export function LatencyArt() {
  return (
    <div className="flex h-full flex-col items-center justify-end gap-5 pb-6">
      <div className="flex items-end gap-2">
        {BARS.map((n, i) => (
          <div key={i} className="flex flex-col-reverse gap-[3px]">
            {Array.from({ length: n }, (_, j) => (
              <span key={j} className={cn("size-4", i === BARS.length - 1 ? "bg-ink" : "bg-sky-2")} />
            ))}
          </div>
        ))}
      </div>
      <Chip>median 182 ms</Chip>
    </div>
  )
}

/** Usage-based price, as a row of squares filling up. */
export function PriceArt() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5">
      <div className="grid grid-cols-10 gap-[3px]">
        {Array.from({ length: 40 }, (_, i) => (
          <span key={i} className={cn("size-4", i < 17 ? "bg-accent" : "bg-surface-2")} />
        ))}
      </div>
      <Chip>$0.40 per 1M tokens</Chip>
    </div>
  )
}

/** Uptime, as a month of days with one soft spot. */
export function UptimeArt() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5">
      <div className="grid grid-cols-10 gap-[3px]">
        {Array.from({ length: 30 }, (_, i) => (
          <span key={i} className={cn("size-4", i === 12 ? "bg-warn-soft" : "bg-good-soft")} />
        ))}
      </div>
      <Chip>99.99% last 90 days</Chip>
    </div>
  )
}
