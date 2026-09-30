import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * The shadcn button, in Glovebox's hand: a small, square-shouldered pill with
 * a 10px radius, a quiet press (scale 0.97) and no shadow of its own.
 */
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-control font-sans text-[15px] leading-none font-normal transition-[background-color,color,transform,box-shadow] duration-(--duration-press) ease-(--ease-out) select-none active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30 focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        ink: "bg-ink-strong text-surface hover:bg-ink",
        white: "bg-surface text-ink shadow-press hover:bg-surface-soft",
        ghost: "text-ink hover:bg-sand-deep",
      },
      size: {
        default: "h-11 px-4 sm:h-10",
        sm: "h-10 px-3.5 text-sm sm:h-9",
        icon: "size-11 sm:size-9",
      },
    },
    defaultVariants: { variant: "ink", size: "default" },
  },
)

type ButtonStyle = VariantProps<typeof buttonVariants>

export function Button({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"button"> & ButtonStyle) {
  return <button className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

/** The same button as a link — its own component rather than `asChild`, so
 *  the editor's layers panel reads `ButtonLink` instead of `Slot`. */
export function ButtonLink({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"a"> & ButtonStyle) {
  return <a {...props} className={cn(buttonVariants({ variant, size, className }))} />
}

export { buttonVariants }
