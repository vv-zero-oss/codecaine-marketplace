import { Mic, NotebookPen } from "lucide-react"

import type { AppMark } from "@/components/brand-marks"
import { cn } from "@/lib/utils"

const TILE =
  "flex aspect-[6/5] w-[112px] shrink-0 items-center justify-center rounded-card shadow-subtle sm:w-[124px]"

/** An app Orra works with, as a monochrome tile: graphite, a hairline edge, its mark in bone. */
export function AppTile({ mark, className }: { mark: AppMark; className?: string }) {
  return (
    <div
      title={mark.name}
      className={cn(TILE, "bg-graphite text-bone", className)}
    >
      <svg viewBox="0 0 24 24" className="size-[46%]" aria-label={mark.name} role="img" dangerouslySetInnerHTML={{ __html: mark.body }} />
    </div>
  )
}

/** Orra's own two tiles: the recorder and the notebook. */
export function OrraTile({ kind }: { kind: "record" | "notes" }) {
  const Icon = kind === "record" ? Mic : NotebookPen
  return (
    <div className={cn(TILE, kind === "record" ? "bg-snow text-on-snow" : "bg-raised text-bone")}>
      <Icon className="size-[44%]" strokeWidth={1.4} />
    </div>
  )
}
