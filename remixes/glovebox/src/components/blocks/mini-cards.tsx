import { CircleCheck, Copy, Receipt, Timer } from "lucide-react"

import { Chip } from "@/components/ui/chip"
import { LogoMark } from "@/components/ui/logo-mark"
import { cn } from "@/lib/utils"

/**
 * The small cards that float around the stat: a switched renewal, a claim
 * in progress, a review of the cover. Each is a glance at Glovebox's work.
 */
export function InsurerMonogram({ letter, className }: { letter: string; className?: string }) {
  return (
    <span
      className={cn(
        "grid size-7 shrink-0 place-items-center rounded-[0.4rem] bg-ink-strong font-display text-[15px] text-surface",
        className,
      )}
    >
      {letter}
    </span>
  )
}

type RenewalCardProps = {
  insurer?: string
  amount?: string
  quoted?: string
  switched?: string
  className?: string
}

export function RenewalCard({
  insurer = "Northway Direct",
  amount = "$892.00",
  quoted = "Jan 14, 23:22",
  switched = "Jan 16, 10:01",
  className,
}: RenewalCardProps) {
  return (
    <div className={cn("w-60 rounded-tile bg-sand p-3 shadow-card", className)}>
      <div className="flex items-center gap-2">
        <InsurerMonogram letter={insurer.charAt(0)} />
        <span className="text-[13px] text-ink">{insurer}</span>
        <span className="ml-auto font-mono text-[11px] text-money tabular">{amount}</span>
      </div>
      <ol className="mt-3 space-y-2.5 text-[11px]">
        <li className="flex items-center gap-2">
          <CircleCheck className="size-3.5 fill-check text-sand" />
          <span className="text-ink">Quote accepted</span>
          <span className="text-muted">{quoted}</span>
        </li>
        <li className="flex items-center gap-2">
          <CircleCheck className="size-3.5 fill-check text-sand" />
          <span className="text-ink">Switched</span>
          <span className="text-muted">{switched}</span>
        </li>
      </ol>
    </div>
  )
}

export function ClaimCard({
  title = "Processing claim…",
  item = "Windscreen repair",
  amount = "$340.00",
  reference = "CLM 4471 209 5583",
  date = "Jan 4, 2027",
  className,
}: {
  title?: string
  item?: string
  amount?: string
  reference?: string
  date?: string
  className?: string
}) {
  return (
    <div className={cn("w-64 rounded-tile bg-sand p-2 shadow-card", className)}>
      <p className="flex items-center gap-1.5 px-1.5 pt-1 text-[12px] text-ink">
        <LogoMark className="size-3.5" />
        {title}
      </p>
      <div className="mt-2 flex items-center justify-between px-1.5">
        <Chip tone="money">
          <CircleCheck />
          Received
        </Chip>
        <span className="text-[11px] text-muted">{date}</span>
      </div>
      <div className="mt-2 flex items-start justify-between rounded-[0.5rem] bg-surface px-2.5 py-2">
        <div>
          <p className="text-[12px] text-ink">{item}</p>
          <p className="mt-0.5 font-mono text-[10px] text-faint">{reference}</p>
        </div>
        <span className="font-mono text-[12px] text-ink tabular">{amount}</span>
      </div>
    </div>
  )
}

export function ReviewCard({ className }: { className?: string }) {
  const rows = [
    { icon: Copy, label: "Duplicate roadside cover", value: "$84.00" },
    { icon: Receipt, label: "Unused rental car cover", value: "$61.00" },
    { icon: Timer, label: "Renewals due this quarter", value: "2" },
  ]
  return (
    <div className={cn("w-56 rounded-tile bg-sand p-2 shadow-card", className)}>
      <p className="flex items-center gap-1.5 px-1 pt-0.5 text-[11px] text-ink">
        <LogoMark className="size-3.5" />
        Reviewing your cover…
      </p>
      <ul className="mt-2 space-y-1">
        {rows.map(({ icon: Icon, label, value }) => (
          <li key={label} className="flex items-center gap-1.5 rounded-[0.4rem] bg-surface px-2 py-1.5 text-[10px] text-ink">
            <Icon className="size-3 text-muted" strokeWidth={1.6} />
            {label}
            <span className="ml-auto font-mono text-money tabular">{value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** A photograph in the scatter, cropped square-ish with the card radius. */
export function PhotoTile({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={cn("block rounded-tile object-cover shadow-float", className)}
    />
  )
}
