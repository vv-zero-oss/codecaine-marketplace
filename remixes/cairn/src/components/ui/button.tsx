import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { Link } from "@/lib/router"
import { cn } from "@/lib/utils"

/**
 * shadcn's button, built the way the page's buttons are: an 8px radius, a
 * royal-blue fill held in by a darker 1px edge and a soft blue shadow, or a
 * white face with a hairline. A press sinks it 3%.
 */
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-(--radius-button) font-medium whitespace-nowrap transition-[background-color,color,box-shadow,transform] duration-(--duration-hover) ease-(--ease-out-strong) outline-none select-none active:scale-[0.97] active:duration-(--duration-press) focus-visible:ring-[3px] focus-visible:ring-accent/30 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary: "bg-accent text-white shadow-(--shadow-button) hover:bg-accent-hover active:bg-accent-press",
        outline: "bg-raised text-ink-2 shadow-(--shadow-outline) hover:bg-panel hover:text-ink",
        ink: "bg-ink text-page hover:bg-ink-2",
        soft: "bg-panel text-ink-2 hover:bg-panel-deep hover:text-ink",
        ghost: "text-ink-2 hover:bg-panel hover:text-ink",
        link: "text-accent-ink hover:text-accent [&_svg]:transition-transform [&_svg]:duration-(--duration-hover) hover:[&_svg]:translate-x-0.5",
      },
      size: {
        default: "h-11 px-5 text-[15px] tracking-[-0.01em]",
        sm: "h-9 px-3.5 text-[14px]",
        lg: "h-[52px] px-7 text-[16.5px] tracking-[-0.012em]",
        icon: "size-10",
      },
    },
    compoundVariants: [{ variant: "link", className: "h-auto px-0" }],
    defaultVariants: { variant: "primary", size: "default" },
  },
)

function Button({
  className,
  variant = "primary",
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
  variant = "primary",
  size = "default",
  href = "/",
  ...props
}: React.ComponentProps<"a"> & VariantProps<typeof buttonVariants>) {
  return <Link data-slot="button" href={href} {...props} className={cn(buttonVariants({ variant, size, className }))} />
}

export { Button, ButtonLink, buttonVariants }
