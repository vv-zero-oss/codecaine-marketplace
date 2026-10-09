import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

import { cn } from "@/lib/utils"

/** Pill buttons: a dark primary, a soft grey secondary, a bare ghost. */
const buttonVariants = cva(
  "inline-flex shrink-0 select-none items-center justify-center gap-1.5 whitespace-nowrap rounded-pill text-[13px] font-medium transition-[background-color,color,transform,box-shadow] duration-(--duration-fast) ease-out-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-3.5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-ink text-ink-inverse hover:bg-ink/85",
        soft: "bg-ink/[0.05] text-ink hover:bg-ink/[0.09]",
        inverse: "bg-ink-inverse/10 text-ink-inverse hover:bg-ink-inverse/15",
        ghost: "text-ink hover:bg-ink/[0.05]",
      },
      size: {
        default: "h-11 px-5 sm:h-9 sm:px-4",
        sm: "h-11 px-4 sm:h-8 sm:px-3.5",
        lg: "h-11 px-6 text-sm",
        icon: "size-11 sm:size-9",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
)

type ButtonStyle = VariantProps<typeof buttonVariants>

export function Button({ className, variant, size, ...props }: React.ComponentProps<"button"> & ButtonStyle) {
  return <button className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

/** The same button as a link. A separate component (not `asChild`) so the editor names the layer after it. */
export function ButtonLink({ className, variant, size, ...props }: React.ComponentProps<"a"> & ButtonStyle) {
  return <a {...props} className={cn(buttonVariants({ variant, size, className }))} />
}

export { buttonVariants }
