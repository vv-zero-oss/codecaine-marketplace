import { Check, ChevronDown } from "lucide-react"
import { Select as SelectPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * A compact select in the shop's label style — Radix Select underneath, so
 * keyboard, typeahead and the native-feeling list come with it. The list
 * drops from the trigger (transform-origin at the trigger, 160ms ease-out).
 */
export function SortSelect<T extends string>({
  value,
  onChange,
  options,
  label = "Sort",
  className,
}: {
  value: T
  onChange: (v: T) => void
  options: { value: T; label: string }[]
  label?: string
  className?: string
}) {
  return (
    <SelectPrimitive.Root value={value} onValueChange={(v) => onChange(v as T)}>
      <SelectPrimitive.Trigger
        aria-label={label}
        className={cn(
          "type-label inline-flex h-9 shrink-0 items-center gap-2 rounded-(--radius-button) bg-raised px-3 text-[11.5px] text-ink shadow-[inset_0_0_0_1px_var(--color-line-strong)] transition-colors outline-none hover:bg-panel focus-visible:ring-[3px] focus-visible:ring-ember/40",
          className,
        )}
      >
        <span className="text-ink-3">{label}:</span>
        <SelectPrimitive.Value />
        <SelectPrimitive.Icon>
          <ChevronDown className="size-3.5 text-ink-3" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          sideOffset={6}
          align="end"
          className="z-50 min-w-[var(--radix-select-trigger-width)] origin-(--radix-select-content-transform-origin) overflow-hidden rounded-(--radius-field) bg-raised p-1 shadow-(--shadow-float) data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:duration-150"
        >
          <SelectPrimitive.Viewport>
            {options.map((o) => (
              <SelectPrimitive.Item
                key={o.value}
                value={o.value}
                className="relative flex h-9 cursor-pointer items-center rounded-(--radius-chip) pr-8 pl-3 text-[14px] text-ink outline-none select-none data-[highlighted]:bg-panel"
              >
                <SelectPrimitive.ItemText>{o.label}</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator className="absolute right-2.5">
                  <Check className="size-3.5 text-rust" />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  )
}
