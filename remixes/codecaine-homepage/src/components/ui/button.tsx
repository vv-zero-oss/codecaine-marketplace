import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Slot } from "radix-ui"

/**
 * shadcn's Button API on the house button.
 *
 * Every variant resolves to a `.btn-*` skin from src/styles/components.css rather than
 * to shadcn's own palette, so a <Button variant="secondary"> and a hand-written
 * `.btn .btn-soft` are the same control: same inset-shadow border, same three
 * heights (32 / 36 / 40 from --spacing-control-*), same `scale: .96` press.
 *
 * variant → skin
 *   default     → btn-solid   high-contrast fill, one per view
 *   outline     → btn-raised  white/elevated, the default affirmative action
 *   secondary   → btn-soft    tinted flat fill
 *   ghost       → btn-ghost   transparent until hovered
 *   accent      → btn-accent  the branded "smart" action
 *   destructive → btn-danger
 *   link        → text link, no box
 */
const buttonVariants = cva("btn", {
  variants: {
    variant: {
      default: "btn-solid",
      destructive: "btn-danger",
      outline: "btn-raised",
      secondary: "btn-soft",
      ghost: "btn-ghost",
      accent: "btn-accent",
      link: "btn-link",
    },
    size: {
      default: "btn-md",
      xs: "btn-xs",
      sm: "btn-sm",
      lg: "btn-lg",
      icon: "btn-icon btn-md",
      "icon-xs": "btn-icon btn-xs",
      "icon-sm": "btn-icon btn-sm",
      "icon-lg": "btn-icon btn-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

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
