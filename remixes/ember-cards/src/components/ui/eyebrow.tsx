import { cn } from "@/lib/utils"

/** The small label above a heading, with a faint champagne glow behind it. */
export function Eyebrow({ label, className }: { label: string; className?: string }) {
  return (
    <p
      className={cn(
        "relative inline-flex h-6 items-center rounded-chip px-2.5 text-[0.6875rem] font-medium text-ink",
        "before:absolute before:inset-x-1 before:inset-y-0.5 before:-z-10 before:rounded-chip before:bg-accent/20 before:blur-md",
        "bg-surface/80 text-ink-soft shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(255_255_255/0.05)]",
        className,
      )}
    >
      {label}
    </p>
  )
}
