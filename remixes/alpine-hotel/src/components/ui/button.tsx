import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Slot } from "radix-ui"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-control font-sans text-sm font-medium whitespace-nowrap transition-[background-color,color,border-color,transform] duration-(--duration-press) ease-(--ease-out) outline-none select-none active:scale-[0.97] focus-visible:ring-[3px] focus-visible:ring-signal/35 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-ink text-paper hover:bg-ink-soft",
        signal: "bg-signal text-sheet hover:bg-signal-deep",
        outline: "border border-ink bg-transparent text-ink hover:bg-ink hover:text-paper",
        "outline-light": "border border-pine-ink/50 bg-transparent text-pine-ink hover:border-pine-ink hover:bg-pine-ink/10",
        ghost: "text-ink hover:bg-paper-deep",
        link: "h-auto px-0 text-ink underline decoration-rule underline-offset-4 hover:decoration-ink",
        destructive: "bg-signal text-sheet hover:bg-signal-deep",
        secondary: "bg-paper-deep text-ink hover:bg-paper-edge",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-4 text-[13px]",
        lg: "h-12 px-7 text-[15px]",
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
