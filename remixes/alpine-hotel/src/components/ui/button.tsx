import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Slot } from "radix-ui"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-pill text-sm font-medium whitespace-nowrap transition-[background-color,color,box-shadow,transform] duration-(--duration-press) ease-(--ease-press) outline-none select-none active:scale-[0.97] focus-visible:ring-[3px] focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-rust text-snow shadow-(--shadow-button) hover:bg-rust-deep",
        ink: "bg-ink text-snow hover:bg-ink-soft",
        pill: "bg-mist text-ink hover:bg-ice-deep",
        snow: "bg-snow text-ink shadow-(--shadow-pill) hover:bg-ice",
        outline: "border border-hairline-strong bg-transparent text-ink hover:bg-ice",
        "outline-light": "border border-snow/40 bg-transparent text-snow hover:bg-snow/10",
        ghost: "text-ink hover:bg-ice",
        link: "text-rust underline-offset-4 hover:underline",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        secondary: "bg-ice text-ink hover:bg-ice-deep",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-4 text-[13px]",
        lg: "h-[3.125rem] px-7",
        icon: "size-11",
        "icon-sm": "size-9",
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

export { Button, buttonVariants }
