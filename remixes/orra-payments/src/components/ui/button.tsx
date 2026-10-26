import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Slot } from "radix-ui"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 font-medium whitespace-nowrap outline-none select-none transition-[background-color,color,box-shadow,transform] duration-(--duration-fast) ease-out-soft active:scale-[0.97] focus-visible:ring-[3px] focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-50 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-cocoa text-ink-inverse shadow-button hover:bg-cocoa-hover",
        secondary: "bg-surface-2 text-ink shadow-soft hover:bg-surface-3",
        outline: "border border-line-strong bg-paper text-ink hover:bg-surface",
        ghost: "text-ink hover:bg-surface",
        inverse: "bg-paper text-ink hover:bg-surface",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        link: "text-ember-deep underline decoration-ember/40 underline-offset-4 hover:decoration-ember",
      },
      size: {
        default: "h-11 rounded-lg px-5 text-[15px]",
        sm: "h-[34px] rounded-md px-[15px] text-[14.5px]",
        lg: "h-12 rounded-lg px-6 text-base",
        icon: "size-11 rounded-full",
        "icon-sm": "size-9 rounded-full",
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
