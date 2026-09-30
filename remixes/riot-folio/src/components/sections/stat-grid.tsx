import { RollingNumber } from "@/components/motion/rolling-number"
import { cn } from "@/lib/utils"

type Stat = { value: number; prefix?: string; suffix?: string; label: string }

/** Big numbers that roll in, two by two, each with what it counts. */
export function StatGrid({ stats, accent = "text-lime", className }: { stats: Stat[]; accent?: string; className?: string }) {
  return (
    <dl className={cn("grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-16", className)}>
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col-reverse">
          <dt className="mt-2 text-[15px] leading-snug text-ink-muted sm:text-base">{stat.label}</dt>
          <dd className={cn("text-[clamp(2.75rem,2rem+3vw,4.25rem)] leading-none font-semibold tracking-[-0.045em]", accent)}>
            <RollingNumber value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
          </dd>
        </div>
      ))}
    </dl>
  )
}
