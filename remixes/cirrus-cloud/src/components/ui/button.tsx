import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * The page's one button: a flat ink slab with pixel-notched corners.
 *
 * The press is a 0.97 scale over 140ms, so a tap is felt; hover only
 * lifts the fill, and only where there is a real pointer.
 */
const buttonVariants = cva(
  "notch inline-flex select-none items-center justify-center gap-3 whitespace-nowrap font-sans font-normal outline-none transition-[transform,background-color,color] duration-(--duration-press) ease-(--ease-out) active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cobalt disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        ink: "bg-ink text-paper [@media(hover:hover)_and_(pointer:fine)]:hover:bg-navy",
        paper: "bg-wash text-ink [@media(hover:hover)_and_(pointer:fine)]:hover:bg-lime",
      },
      size: {
        default: "h-[3.875rem] px-9 text-[1.125rem]",
        sm: "h-12 px-6 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "ink", size: "default" },
  },
)

type ButtonStyle = VariantProps<typeof buttonVariants>

export function Button({ className, variant, size, ...props }: React.ComponentProps<"button"> & ButtonStyle) {
  return <button type="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

/** The same button as a link — its own component, so the editor names it. */
export function ButtonLink({ className, variant, size, ...props }: React.ComponentProps<"a"> & ButtonStyle) {
  return <a {...props} className={cn(buttonVariants({ variant, size, className }))} />
}

export { buttonVariants }
