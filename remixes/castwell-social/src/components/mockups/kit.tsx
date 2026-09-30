import type * as React from "react"

import { photo, type PhotoKey } from "@/photos"
import { cn } from "@/lib/utils"

export type Status = "scheduled" | "drafting" | "rendering" | "review" | "queued" | "published"

const STATUS: Record<Status, { label: string; className: string }> = {
  scheduled: { label: "Scheduled", className: "bg-mint-soft text-mint-ink" },
  drafting: { label: "Drafting", className: "bg-sage-deep text-ink-soft" },
  rendering: { label: "Rendering", className: "bg-periwinkle text-ink" },
  review: { label: "Needs review", className: "bg-coral-soft text-ink" },
  queued: { label: "Queued", className: "bg-butter text-ink" },
  published: { label: "Published", className: "bg-mint text-ink" },
}

/** The coloured status tag every mockup row starts with. */
export function StatusPill({ status = "scheduled", className }: { status?: Status; className?: string }) {
  const s = STATUS[status]
  return (
    <span className={cn("inline-flex h-6 w-[92px] items-center justify-center text-[11px] font-medium", s.className, className)}>
      {s.label}
    </span>
  )
}

/** A small round portrait from the photo set. */
export function Face({ who, className }: { who: PhotoKey; className?: string }) {
  return (
    <img
      src={photo(who, 96)}
      alt=""
      loading="lazy"
      className={cn("size-5 shrink-0 rounded-full object-cover", className)}
    />
  )
}

/** A hairline box with a small title — the building block of every diagram. */
export function Frame({
  title,
  children,
  tone = "light",
  className,
}: {
  title?: string
  children?: React.ReactNode
  tone?: "light" | "night"
  className?: string
}) {
  return (
    <div
      className={cn(
        "border p-3",
        tone === "night" ? "border-night-line-strong bg-night text-night-ink" : "border-line bg-page text-ink",
        className,
      )}
    >
      {title && (
        <p className={cn("mb-2.5 text-[11px]", tone === "night" ? "text-night-ink/80" : "text-muted")}>{title}</p>
      )}
      {children}
    </div>
  )
}

/** The window chrome around a product mockup. */
export function AppWindow({ children, className }: { children?: React.ReactNode; className?: string }) {
  return <div className={cn("border border-line-strong/70 bg-panel", className)}>{children}</div>
}
