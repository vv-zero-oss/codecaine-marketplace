import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { Link } from "@/lib/router"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex font-medium shrink-0 items-center justify-center gap-2 rounded-(--radius-button) whitespace-nowrap transition-[background-color,color,box-shadow,transform] duration-(--duration-hover) ease-(--ease-out-strong) outline-none select-none active:scale-[0.97] active:duration-(--duration-press) focus-visible:ring-[3px] focus-visible:ring-sky/35 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        ink: "bg-ink text-page shadow-(--shadow-button) hover:bg-ink-2",
        sky: "bg-sky text-on-sky shadow-(--shadow-sky) hover:bg-sky-hover active:bg-sky-press",
        cream: "bg-page text-ink shadow-(--shadow-xs) hover:bg-raised",
        outline: "bg-transparent text-ink shadow-[inset_0_0_0_1px_var(--color-ink)] hover:bg-ink hover:text-page",
        "outline-light": "bg-transparent text-dusk-fg shadow-[inset_0_0_0_1px_rgb(244_241_218/0.5)] hover:bg-dusk-fg hover:text-dusk",
        soft: "bg-panel text-ink-2 hover:bg-panel-deep hover:text-ink",
        ghost: "text-ink-2 hover:bg-panel hover:text-ink",
        glass: "bg-white/14 text-white shadow-[inset_0_0_0_1px_rgb(255_255_255/0.28)] backdrop-blur-md hover:bg-white/24",
        link: "px-0 text-ink-2 hover:text-ink [&_svg]:transition-transform [&_svg]:duration-(--duration-hover) hover:[&_svg]:translate-x-0.5",
      },
      size: {
        default: "h-11 px-5 text-[15px]",
        sm: "h-8 px-3.5 text-[12.58px]",
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
