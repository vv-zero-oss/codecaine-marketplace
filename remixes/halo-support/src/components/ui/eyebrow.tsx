import { cn } from "@/lib/utils"

/** The small orange-dot label over a section title. */
export function Eyebrow({ children, className }: { children: string; className?: string }) {
  return (
    <p className={cn("flex items-center gap-2 font-mono text-[11px] font-medium tracking-[0.04em] text-ember uppercase", className)}>
      <span className="size-1.5 rounded-[2px] bg-ember" />
      {children}
    </p>
  )
}
