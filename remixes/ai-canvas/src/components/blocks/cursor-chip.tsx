import { Sparkles } from "lucide-react"

import { cn } from "@/lib/utils"

export type CursorTone = "1" | "2" | "3" | "4" | "5" | "6"

const TONES: Record<CursorTone, string> = {
  "1": "bg-cursor-1 text-cursor-1",
  "2": "bg-cursor-2 text-cursor-2",
  "3": "bg-cursor-3 text-cursor-3",
  "4": "bg-cursor-4 text-cursor-4",
  "5": "bg-cursor-5 text-cursor-5",
  "6": "bg-cursor-6 text-cursor-6",
}

/**
 * A collaborator's pointer and name, as a multiplayer canvas draws them. An
 * agent's name carries a sparkle, so a person can tell who is who at a glance.
 */
export function CursorChip({
  name,
  agent = false,
  tone = "1",
  className,
}: {
  name: string
  agent?: boolean
  tone?: CursorTone
  className?: string
}) {
  const color = TONES[tone]
  return (
    <div className={cn("pointer-events-none flex items-start", className)}>
      <svg viewBox="0 0 16 16" className={cn("size-4 -rotate-6 drop-shadow-sm", color.split(" ")[1])} aria-hidden>
        <path d="M1.5 1.2 14 6.3 8.1 8 6.2 14.1Z" fill="currentColor" stroke="var(--paper)" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
      <span
        className={cn(
          "mt-3 -ml-0.5 inline-flex items-center gap-1 rounded-pill px-2 py-[3px] text-[11px] font-medium whitespace-nowrap text-paper shadow-chip",
          color.split(" ")[0],
        )}
      >
        {agent && <Sparkles className="size-3" aria-hidden />}
        {name}
      </span>
    </div>
  )
}
