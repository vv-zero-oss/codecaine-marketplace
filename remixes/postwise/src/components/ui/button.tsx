import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Slot } from "radix-ui"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-[var(--radius-field)] text-[15px] font-medium tracking-[-0.01em] whitespace-nowrap transition-[background-color,color,box-shadow,transform] duration-(--duration-hover) ease-(--ease-out-quint) outline-none select-none active:scale-[0.97] active:duration-(--duration-press) focus-visible:ring-[3px] focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-ink text-white shadow-(--shadow-button) hover:bg-ink-soft",
        outline: "border border-line-strong bg-card text-ink hover:bg-paper",
        light: "bg-white text-ink shadow-(--shadow-button) hover:bg-paper",
        night: "border border-night-line bg-night-raised text-night-fg hover:bg-night-line",
        ghost: "text-ink-muted hover:bg-paper-deep hover:text-ink",
        link: "text-ink underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4",
        sm: "h-9 px-3.5 text-[14px]",
        lg: "h-11 px-5",
        icon: "size-11",
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
 * The same button as a link. A separate component rather than
 * `<Button asChild>`, so the editor's layers read `ButtonLink` instead of the
 * `Slot` that `asChild` puts in between.
 */
function ButtonLink({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<"a"> & VariantProps<typeof buttonVariants>) {
  return (
    <a
      data-slot="button"
      {...props}
      className={cn(buttonVariants({ variant, size, className }))}
    />
  )
}

export { Button, ButtonLink, buttonVariants }
