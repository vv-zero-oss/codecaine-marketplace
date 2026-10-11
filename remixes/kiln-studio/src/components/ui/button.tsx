import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { Link } from "@/lib/router"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex font-medium shrink-0 items-center justify-center gap-2 rounded-(--radius-button) whitespace-nowrap transition-[background-color,color,box-shadow,transform] duration-(--duration-hover) ease-(--ease-out-strong) outline-none select-none active:scale-[0.97] active:duration-(--duration-press) focus-visible:ring-[3px] focus-visible:ring-ember/40 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        bone: "bg-bone text-bone-ink shadow-(--shadow-pill) hover:bg-bone-2",
        ember: "bg-ember text-bone-ink shadow-(--shadow-ember) hover:bg-ember-soft",
        soft: "bg-panel-2 text-ink hover:bg-raised",
        glass: "bg-ink/14 text-ink shadow-[inset_0_0_0_1px_rgb(244_244_242/0.1)] backdrop-blur-xl hover:bg-ink/22",
        outline: "text-ink shadow-[inset_0_0_0_1px_var(--color-line-3)] hover:bg-panel-2 hover:shadow-[inset_0_0_0_1px_var(--color-ink-5)]",
        ghost: "text-ink-2 hover:bg-panel-2 hover:text-ink",
        link: "px-0 text-ink-2 hover:text-ink [&_svg]:transition-transform [&_svg]:duration-(--duration-hover) hover:[&_svg]:translate-x-0.5",
      },
      size: {
        default: "h-11 px-5 text-[15px]",
        sm: "h-9 px-3.5 text-[14px]",
        lg: "h-14 px-7 text-[17px]",
        xl: "h-[clamp(56px,6vw,84px)] px-[clamp(24px,3vw,44px)] text-[clamp(17px,1.6vw,25.89px)] tracking-[-0.02em]",
        icon: "size-11",
      },
    },
    compoundVariants: [{ variant: "link", className: "h-auto px-0" }],
    defaultVariants: { variant: "bone", size: "default" },
  },
)

function Button({
  className,
  variant = "bone",
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
  variant = "bone",
  size = "default",
  href = "/",
  ...props
}: React.ComponentProps<"a"> & VariantProps<typeof buttonVariants>) {
  return <Link data-slot="button" href={href} {...props} className={cn(buttonVariants({ variant, size, className }))} />
}

export { Button, ButtonLink, buttonVariants }
