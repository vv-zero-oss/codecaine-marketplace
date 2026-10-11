import type { Project } from "@/data/projects"
import { cn } from "@/lib/utils"

/** A client's name set as its wordmark — invented clients, so their marks are type. */
export function ClientMark({ client, mark, className }: { client: string; mark: Project["mark"]; className?: string }) {
  return (
    <span
      className={cn(
        "leading-none whitespace-nowrap",
        mark === "sans" && "font-sans font-semibold tracking-[-0.03em]",
        mark === "serif" && "font-serif text-[1.18em] italic",
        mark === "mono" && "font-mono text-[0.86em] font-medium tracking-[0.06em] uppercase",
        mark === "heavy" && "font-sans font-extrabold tracking-[-0.05em] uppercase",
        className,
      )}
    >
      {client}
    </span>
  )
}
