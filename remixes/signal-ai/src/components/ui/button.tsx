import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-1.5 whitespace-nowrap text-[11px] font-medium tracking-[0.06em] uppercase transition-[background-color,transform,box-shadow] duration-150 ease-out select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30 focus-visible:ring-offset-2 focus-visible:ring-offset-paper active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-3.5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-ink text-paper shadow-button hover:bg-ink/85",
        outline: "border border-line-strong bg-paper text-ink hover:bg-surface",
        ghost: "text-ink-2 hover:bg-surface hover:text-ink",
      },
      size: {
        default: "h-11 px-4 sm:h-9",
        sm: "h-11 px-3.5 sm:h-8",
        lg: "h-11 px-6",
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

/** The same button as a link — two components, so the layers panel reads `ButtonLink`, not `Slot`. */
export function ButtonLink({ className, variant, size, ...props }: React.ComponentProps<"a"> & ButtonStyle) {
  return <a {...props} className={cn(buttonVariants({ variant, size, className }))} />
}

export { buttonVariants }
