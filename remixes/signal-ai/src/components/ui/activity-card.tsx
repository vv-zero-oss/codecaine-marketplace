import type { ReactNode } from "react"

import { CountUp } from "@/components/motion/count-up"
import { cn } from "@/lib/utils"

type Tone = "good" | "warn"

/** A round initial: the avatar for a model or a team. */
function Avatar({ initial }: { initial: string }) {
  return (
    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-gradient-to-br from-sky-2 to-accent text-[10px] font-medium text-white">
      {initial}
    </span>
  )
}

/** One entry: a context chip, who or what it is, a status badge and an action. */
export function ActivityRow({
  chip,
  name,
  meta,
  tags,
  badge,
  tone = "good",
  action,
}: {
  chip: string
  name: string
  meta: string
  tags?: string
  badge: string
  tone?: Tone
  action: string
}) {
  return (
    <div className="px-3 py-3">
      <span className="inline-flex items-center gap-1 rounded-[3px] bg-surface px-1.5 py-0.5 text-[9px] text-ink-2">
        <span className="size-1.5 rounded-[1px] bg-accent" />
        {chip}
      </span>
      <div className="mt-2 flex items-start gap-2.5">
        <Avatar initial={name.slice(0, 1).toUpperCase()} />
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5 text-[12px] font-medium tracking-[-0.01em]">
            {name}
            <span className="size-1.5 rounded-full bg-accent-2" />
          </p>
          <p className="mt-0.5 text-[9px] text-ink-3">{meta}</p>
          {tags ? <p className="mt-0.5 text-[9px] text-ink-3">{tags}</p> : null}
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className={cn("rounded-[3px] px-1.5 py-0.5 text-[8px] font-medium", tone === "good" ? "bg-good-soft text-good" : "bg-warn-soft text-warn")}>{badge}</span>
          <button type="button" className="min-h-6 text-[9px] font-medium text-ink transition-opacity hover:opacity-60">
            + {action}
          </button>
        </div>
      </div>
    </div>
  )
}

/** A dated group of rows in a hairline box. */
export function ActivityGroup({ label, date, children }: { label: string; date: string; children: ReactNode }) {
  return (
    <section className="overflow-hidden rounded-lg border border-line">
      <header className="flex items-center justify-between border-b border-line px-3 py-2 text-[9px] tracking-wide text-ink-3 uppercase">
        <span>{label}</span>
        <span className="normal-case">{date}</span>
      </header>
      <div className="divide-y divide-line">{children}</div>
    </section>
  )
}

/**
 * The white card on the blue field: a title, grouped activity, and a row of
 * three counted figures divided by hairlines.
 */
export function ActivityCard({
  title,
  stats,
  children,
  className,
}: {
  title: string
  stats: { to: number; suffix: string; label: string }[]
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn("w-full max-w-[460px] rounded-[14px] bg-paper p-5 shadow-frame sm:p-8", className)}>
      <h2 className="text-center text-[19px] font-semibold tracking-[-0.03em] text-balance">{title}</h2>
      <div className="mt-6 flex flex-col gap-3">{children}</div>
      <dl className="mt-7 grid grid-cols-3 divide-x divide-line text-center">
        {stats.map((s, i) => (
          <div key={s.label} className="px-2">
            <dt className="text-[18px] font-semibold tracking-[-0.03em]">
              <CountUp to={s.to} suffix={s.suffix} delay={i * 0.12} />
            </dt>
            <dd className="mt-0.5 text-[9px] text-ink-3">{s.label}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
