import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { Link } from "@/lib/router"
import { cn } from "@/lib/utils"

/**
 * Print-square buttons in the grotesk. The press is a 3% scale on a 140ms
 * ease-out — felt, not seen.
 */
const buttonVariants = cva(
  "type-title inline-flex shrink-0 items-center justify-center gap-2 rounded-(--radius-button) whitespace-nowrap transition-[background-color,color,box-shadow,transform] duration-(--duration-hover) ease-(--ease-out-strong) outline-none select-none active:scale-[0.97] active:duration-(--duration-press) focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-page disabled:pointer-events-none disabled:opacity-45 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        ink: "bg-ink text-page hover:bg-ink-2",
        outline: "bg-transparent text-ink shadow-[inset_0_0_0_1px_var(--color-ink)] hover:bg-ink hover:text-page",
        quiet: "bg-sheet text-ink hover:bg-line",
        paper: "bg-page text-ink shadow-(--shadow-soft) hover:bg-raised",
        ghost: "text-ink-2 hover:bg-sheet hover:text-ink",
        night: "bg-night-fg text-night hover:bg-raised",
        link: "type-label px-0 text-ink [&_svg]:size-3 [&_svg]:transition-transform [&_svg]:duration-(--duration-hover) hover:[&_svg]:translate-x-0.5",
      },
      size: {
        default: "h-11 px-5 text-[15px]",
        sm: "h-9 px-3.5 text-[14px]",
        lg: "h-13 px-7 text-[16px]",
        icon: "size-11",
      },
    },
    compoundVariants: [{ variant: "link", className: "h-auto px-0" }],
    defaultVariants: { variant: "ink", size: "default" },
  },
)

function Button({
  className,
  variant = "ink",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "button"
  return <Comp data-slot="button" data-variant={variant} className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

/**
 * The same button as a link, through the site's router. A component of its
 * own rather than `<Button asChild>`, so the editor's layers read
 * `ButtonLink` instead of the `Slot` that `asChild` puts in between.
 */
function ButtonLink({
  className,
  variant = "ink",
  size = "default",
  href = "/",
  ...props
}: React.ComponentProps<"a"> & VariantProps<typeof buttonVariants>) {
  return <Link data-slot="button" href={href} {...props} className={cn(buttonVariants({ variant, size, className }))} />
}

export { Button, ButtonLink, buttonVariants }
