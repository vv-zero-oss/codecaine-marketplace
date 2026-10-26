import { cn } from "@/lib/utils"

/** The small caps line over a left-aligned block: "Portfolio", "Principles". */
export function SectionLabel({ children, className }: { children: string; className?: string }) {
  return <p className={cn("text-[10px] font-medium tracking-[0.2em] text-fg-subtle uppercase", className)}>{children}</p>
}
