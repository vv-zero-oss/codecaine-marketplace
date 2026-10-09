import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

/** A pill switch with a check in the thumb. Transitions (never keyframes) so a fast double flip retargets. */
export function Switch({
  checked,
  onCheckedChange,
  label,
  className,
}: {
  checked: boolean
  onCheckedChange: (next: boolean) => void
  label: string
  className?: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "relative h-8 w-14 shrink-0 rounded-full transition-[background-color,transform] duration-300 ease-[var(--ease-out)] active:scale-95 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:outline-none",
        checked ? "bg-leaf-500" : "bg-ink-200",
        className,
      )}
    >
      <span
        className={cn(
          "absolute top-1 left-1 grid size-6 place-items-center rounded-full bg-white shadow-card transition-transform duration-300 ease-[var(--ease-out)]",
          checked && "translate-x-6",
        )}
      >
        <Check className={cn("size-3.5 text-leaf-500 transition-opacity duration-200", checked ? "opacity-100" : "opacity-0")} strokeWidth={3} />
      </span>
    </button>
  )
}
