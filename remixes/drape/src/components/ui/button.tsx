import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Slot } from "radix-ui"

/**
 * Buttons as the reference builds them: small radius (6px), 36px tall, 13px
 * medium text, a flat fill or a 1px outline, and a 0.97 press.
 */
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-sm text-[13px] font-medium whitespace-nowrap transition-[background-color,border-color,color,transform] duration-150 ease-out outline-none select-none active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-offset-2 focus-visible:ring-offset-linen disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-clay text-paper hover:bg-clay-hover",
        outline: "border border-ink bg-paper text-ink hover:bg-linen-2",
        "outline-dark": "border border-cream/70 bg-transparent text-cream hover:border-cream hover:bg-cream/8",
        secondary: "bg-espresso-3 text-cream hover:bg-espresso-4",
        ghost: "text-cream-2 hover:bg-cream/8 hover:text-cream",
        link: "text-clay underline-offset-4 hover:underline",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
      },
      size: {
        default: "h-9 px-4 max-sm:h-11",
        xs: "h-6 gap-1 rounded-xs px-2 text-xs",
        sm: "h-8 gap-1.5 px-3 max-sm:h-10",
        lg: "h-11 px-6 text-sm",
        icon: "size-9 max-sm:size-11",
        "icon-xs": "size-6 rounded-xs",
        "icon-sm": "size-8",
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
 * The same button as an anchor. A component of its own rather than
 * `<Button asChild>`, so the editor's layers read `ButtonLink` instead of
 * Radix's `Slot`.
 */
function ButtonLink({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<"a"> & VariantProps<typeof buttonVariants>) {
  return <a data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

export { Button, ButtonLink, buttonVariants }
