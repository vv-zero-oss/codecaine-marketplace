import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Slot } from "radix-ui"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 font-medium whitespace-nowrap outline-none select-none transition-[background-color,color,box-shadow,transform] duration-(--duration-fast) ease-out-soft active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-snow/40 disabled:pointer-events-none disabled:opacity-50 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-snow text-on-snow hover:bg-snow-dim",
        secondary: "border border-hairline-strong text-snow/85 hover:bg-glass hover:text-snow",
        outline: "border border-hairline-strong text-bone hover:bg-glass",
        ghost: "text-bone/85 hover:bg-glass hover:text-snow",
        inverse: "bg-canvas text-bone hover:bg-graphite",
        destructive: "bg-destructive text-snow hover:bg-destructive/90",
        link: "text-bone underline decoration-bone/40 underline-offset-4 hover:decoration-bone",
      },
      size: {
        default: "h-10 rounded-pill px-5 text-[15px]",
        sm: "h-8 rounded-pill px-3.5 text-[14px]",
        lg: "h-11 rounded-pill px-6 text-base",
        icon: "size-11 rounded-pill",
        "icon-sm": "size-9 rounded-pill",
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
 * The same button, as a link. A separate component rather than
 * `<Button asChild>` so the editor's layers read `ButtonLink`, not `Slot`.
 */
function ButtonLink({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<"a"> & VariantProps<typeof buttonVariants>) {
  return <a {...props} className={cn(buttonVariants({ variant, size, className }))} />
}

export { Button, ButtonLink, buttonVariants }
