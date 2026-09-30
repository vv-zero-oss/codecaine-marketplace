import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Slot } from "radix-ui"

import { Link } from "@/lib/router"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-[var(--radius-button)] text-sm font-medium whitespace-nowrap transition-[background-color,color,transform,box-shadow] duration-[var(--duration-hover)] ease-[var(--ease-out-soft)] outline-none select-none focus-visible:ring-[3px] focus-visible:ring-ring/60 active:scale-[0.97] active:duration-[var(--duration-press)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-lime text-night shadow-[var(--shadow-button)] hover:bg-[color-mix(in_oklab,var(--color-lime),white_22%)]",
        pink: "bg-pink text-night shadow-[var(--shadow-button)] hover:bg-[color-mix(in_oklab,var(--color-pink),white_18%)]",
        secondary: "bg-ink text-night shadow-[var(--shadow-button)] hover:bg-ink-muted",
        outline: "border border-line-strong bg-transparent text-ink hover:bg-ground-raised",
        ghost: "text-ink-muted hover:bg-ground-raised hover:text-ink",
        link: "text-ink underline decoration-line-strong underline-offset-4 hover:decoration-lime",
      },
      size: {
        default: "h-10 px-4 has-[>svg]:px-3.5",
        sm: "h-8 gap-1.5 px-3 text-[13px] has-[>svg]:px-2.5",
        lg: "h-11 px-5 text-[15px] has-[>svg]:px-4",
        icon: "size-9",
        "icon-lg": "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

/**
 * The same button as a link that changes page without a reload.
 *
 * Its own component rather than `<Button asChild>`, so the editor's layers
 * panel reads `ButtonLink` instead of `Slot`.
 */
function ButtonLink({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<typeof Link> & VariantProps<typeof buttonVariants>) {
  return (
    <Link
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, ButtonLink, buttonVariants }
