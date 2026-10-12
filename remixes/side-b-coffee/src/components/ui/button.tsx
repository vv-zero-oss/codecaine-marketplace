import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { Link } from "@/lib/router"
import { cn } from "@/lib/utils"

/**
 * The shop's buttons are printed labels: mono caps, square shoulders (3px),
 * a flat ink fill and a hairline of shade along the bottom edge. They press
 * down 3% and darken one step on hover — no glow, no gradient.
 */
const buttonVariants = cva(
  "type-label inline-flex shrink-0 items-center justify-center gap-2 rounded-(--radius-button) whitespace-nowrap transition-[background-color,color,box-shadow,transform] duration-(--duration-hover) ease-(--ease-out-strong) outline-none select-none active:scale-[0.97] active:duration-(--duration-press) focus-visible:ring-[3px] focus-visible:ring-ember/40 disabled:pointer-events-none disabled:opacity-45 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
  {
    variants: {
      variant: {
        rust: "bg-rust text-page shadow-(--shadow-button) hover:bg-rust-hover active:bg-rust-press",
        ember: "bg-ember text-page shadow-(--shadow-button) hover:bg-ember-ink",
        honey: "bg-honey text-ink shadow-(--shadow-button) hover:bg-[color-mix(in_oklab,var(--color-honey),var(--color-ink)_10%)]",
        sky: "bg-sky text-ink shadow-(--shadow-button) hover:bg-[color-mix(in_oklab,var(--color-sky),var(--color-ink)_12%)]",
        ink: "bg-ink text-page shadow-(--shadow-button) hover:bg-cocoa",
        paper: "bg-raised text-ink shadow-(--shadow-xs) hover:bg-page",
        outline: "bg-transparent text-ink shadow-[inset_0_0_0_1px_var(--color-line-strong)] hover:bg-panel",
        ghost: "text-ink-2 hover:bg-panel hover:text-ink",
        link: "px-0 text-ink underline-offset-4 hover:underline",
      },
      size: {
        chip: "h-7 px-2 text-[12.58px] tracking-[0.1em]",
        sm: "h-9 px-3 text-[12.58px]",
        default: "h-11 px-4 text-[13px]",
        lg: "h-13 px-6 text-[14px]",
        icon: "size-9",
      },
    },
    compoundVariants: [{ variant: "link", className: "h-auto px-0" }],
    defaultVariants: { variant: "rust", size: "default" },
  },
)

function Button({
  className,
  variant = "rust",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "button"
  return <Comp data-slot="button" data-variant={variant} className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

/**
 * The same button as a link, through the site's router. Its own component
 * rather than `<Button asChild>`, so the editor's layers read `ButtonLink`.
 */
function ButtonLink({
  className,
  variant = "rust",
  size = "default",
  href = "/",
  ...props
}: React.ComponentProps<"a"> & VariantProps<typeof buttonVariants>) {
  return <Link data-slot="button" href={href} {...props} className={cn(buttonVariants({ variant, size, className }))} />
}

export { Button, ButtonLink, buttonVariants }
