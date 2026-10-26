import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import type * as React from "react"

import { cn } from "@/lib/utils"

/** shadcn's radio group, laid out as cards: a label and a hint per choice. */
export function RadioGroup({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return <RadioGroupPrimitive.Root className={cn("grid gap-2", className)} {...props} />
}

export function RadioCard({
  className,
  label,
  hint,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item> & { label: string; hint?: string }) {
  return (
    <RadioGroupPrimitive.Item
      className={cn(
        "group/radio flex min-h-14 flex-col items-start justify-center gap-0.5 rounded-tile border border-line bg-surface px-4 py-3 text-left transition-[border-color,background-color,transform] duration-200 ease-soft hover:border-line-strong active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg",
        "data-[state=checked]:border-fg/70 data-[state=checked]:bg-surface-raised",
        className,
      )}
      {...props}
    >
      <span className="flex w-full items-center justify-between gap-3 text-[13px] font-medium">
        {label}
        <span className="flex size-3.5 items-center justify-center rounded-pill border border-line-strong group-data-[state=checked]/radio:border-fg">
          <RadioGroupPrimitive.Indicator className="size-1.5 rounded-pill bg-fg" />
        </span>
      </span>
      {hint && <span className="text-[11px] text-fg-subtle">{hint}</span>}
    </RadioGroupPrimitive.Item>
  )
}
