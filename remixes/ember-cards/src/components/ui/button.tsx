import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * The page's one button: a soft-black pill with white text, pressed down a
 * touch on click. `light` is the white pill used on dark surfaces.
 */
const buttonVariants = cva(
  "inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-chip font-medium transition-[background-color,color,transform] duration-(--duration-hover) ease-out active:scale-[0.97] active:duration-(--duration-press) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-button text-button-ink shadow-button hover:bg-button-hover",
        inverse: "bg-inverse-ink text-inverse hover:bg-black",
        light: "bg-surface text-ink shadow-item hover:bg-surface-raised",
        ghost: "text-ink-soft hover:text-ink",
      },
      size: {
        default: "h-11 px-6 text-sm sm:h-10",
        sm: "h-11 px-5 text-[0.8125rem] sm:h-9",
        lg: "h-12 px-7 text-[0.9375rem]",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
)

type ButtonStyle = VariantProps<typeof buttonVariants>

export function Button({ className, variant, size, ...props }: React.ComponentProps<"button"> & ButtonStyle) {
  return <button className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

/** The same button as a link — its own component so the layer reads `ButtonLink`, not `Slot`. */
export function ButtonLink({ className, variant, size, ...props }: React.ComponentProps<"a"> & ButtonStyle) {
  return <a {...props} className={cn(buttonVariants({ variant, size, className }))} />
}

export { buttonVariants }
