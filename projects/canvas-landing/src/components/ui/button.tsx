import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * The page's one button: a pill. `ink` is the call to action, `soft` the quiet
 * one beside it. Press scales it a touch (under 100ms back, 160ms down) so it
 * answers the finger, and the arrow in a `soft` one leans toward where it
 * goes.
 */
const buttonVariants = cva(
  "group/button inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium tracking-[-0.01em] transition-[transform,background-color,opacity] duration-160 ease-out active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-[1.05em] [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        ink: "bg-ink text-white hover:bg-ink-hover",
        soft: "bg-surface-2 text-ink hover:bg-surface-3 [&_svg]:transition-transform [&_svg]:duration-200 hover:[&_svg]:translate-x-0.5",
      },
      size: {
        default: "h-11 px-5 text-[15px]",
        lg: "h-[50px] px-6 text-[17px] md:text-[18px]",
      },
    },
    defaultVariants: { variant: "ink", size: "default" },
  },
)

type ButtonStyle = VariantProps<typeof buttonVariants>

export function Button({ className, variant, size, ...props }: React.ComponentProps<"button"> & ButtonStyle) {
  return <button className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

/**
 * The same button, as a link. Two components rather than `asChild`, so the
 * editor's layers panel reads `ButtonLink` and not Radix's `Slot`.
 */
export function ButtonLink({ className, variant, size, ...props }: React.ComponentProps<"a"> & ButtonStyle) {
  return <a {...props} className={cn(buttonVariants({ variant, size, className }))} />
}

export { buttonVariants }
