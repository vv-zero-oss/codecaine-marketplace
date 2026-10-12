import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { Link } from "@/lib/router"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-[background-color,color,box-shadow,transform] duration-(--duration-hover) ease-(--ease-out-strong) outline-none select-none active:scale-[0.97] active:duration-(--duration-press) focus-visible:ring-[3px] focus-visible:ring-violet/30 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        amber: "bg-amber text-amber-ink shadow-(--shadow-button) hover:bg-amber-hover active:bg-amber-press",
        ink: "bg-ink text-page shadow-(--shadow-button) hover:bg-ink-2",
        outline: "bg-raised text-ink shadow-(--shadow-field) hover:bg-panel",
        ghost: "text-ink-2 hover:bg-panel hover:text-ink",
        night: "bg-white text-ink hover:bg-white/90",
        link: "px-0 text-ink-2 hover:text-ink [&_svg]:transition-transform [&_svg]:duration-(--duration-hover) hover:[&_svg]:translate-x-0.5",
      },
      size: {
        default: "h-11 px-5 text-[15px]",
        sm: "h-9 px-3.5 text-[14px]",
        lg: "h-12 px-6 text-[16px]",
        icon: "size-11",
      },
    },
    compoundVariants: [{ variant: "link", className: "h-auto px-0" }],
    defaultVariants: { variant: "amber", size: "default" },
  },
)

function Button({
  className,
  variant = "amber",
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
  variant = "amber",
  size = "default",
  href = "/",
  ...props
}: React.ComponentProps<"a"> & VariantProps<typeof buttonVariants>) {
  return <Link data-slot="button" href={href} {...props} className={cn(buttonVariants({ variant, size, className }))} />
}

export { Button, ButtonLink, buttonVariants }
