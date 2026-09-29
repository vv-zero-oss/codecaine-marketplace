import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * Pills throughout: a cream fill for the primary action, a hairline outline
 * for the secondary one. Both press down a touch — the only motion a button
 * needs.
 */
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-normal whitespace-nowrap tracking-[0.01em] transition-[background-color,border-color,color,transform] duration-(--duration-hover) ease-(--ease-out-quint) outline-none select-none active:scale-[0.97] active:duration-(--duration-press) focus-visible:ring-2 focus-visible:ring-muted/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-cream text-ink hover:bg-cream-hover",
        outline: "border border-line-button bg-transparent text-fg hover:border-muted hover:bg-white/[0.04]",
        ghost: "text-fg hover:bg-white/[0.06]",
        soft: "bg-raised text-fg shadow-(--shadow-field) hover:bg-lift",
        link: "h-auto rounded-none px-0 text-fg underline decoration-line-button underline-offset-[6px] hover:decoration-fg active:scale-100",
      },
      size: {
        default: "h-11 px-5 text-[15px] md:h-[50px] md:px-6 md:text-[17px]",
        sm: "h-9 px-4 text-sm",
        lg: "h-14 px-10 text-[17px] md:h-[80px] md:min-w-[300px] md:text-xl",
        icon: "size-11",
        "icon-sm": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

type ButtonStyle = VariantProps<typeof buttonVariants>

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & ButtonStyle & { asChild?: boolean }) {
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
 * The same button as a link. Its own component rather than
 * `<Button asChild><a/></Button>`, so the editor's layers panel names the
 * anchor `ButtonLink` instead of the `Slot` in between.
 */
function ButtonLink({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<"a"> & ButtonStyle) {
  return <a {...props} className={cn(buttonVariants({ variant, size, className }))} />
}

export { Button, ButtonLink, buttonVariants }
