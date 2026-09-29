import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

import { cn } from "@/lib/utils"
import { Link } from "@/router"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-xs font-medium uppercase tracking-[0.18em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        solid: "bg-ink text-paper hover:bg-ink/85",
        outline: "border border-ink/25 text-ink hover:border-ink",
        light: "bg-paper text-ink hover:bg-paper-200",
        link: "text-ink underline decoration-ink/30 underline-offset-8 hover:decoration-ink",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4",
        lg: "h-13 px-8",
      },
    },
    defaultVariants: { variant: "solid", size: "default" },
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

/** The same button as a link. Its own component rather than `asChild`, so the
 *  editor's layer is named `ButtonLink` and not Radix's `Slot`. */
export function ButtonLink({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"a"> & ButtonStyle) {
  return <Link {...props} className={cn(buttonVariants({ variant, size, className }))} />
}
