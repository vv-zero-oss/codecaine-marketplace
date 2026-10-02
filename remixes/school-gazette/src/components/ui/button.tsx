import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * The retro key. Hard offset shadow under the cap, so pressing it is a real
 * physical move: 3px down in 90ms, the shadow shrinks to match, and it comes
 * back on release. `stamp` is a rubber stamp instead of a key.
 */
const buttonVariants = cva(
  "relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap font-type uppercase tracking-[0.12em] touch-manipulation transition-[transform,box-shadow,background-color,color] duration-[var(--duration-press)] ease-[var(--ease-press)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rust disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        ink: "rounded-key border-2 border-ink bg-ink text-paper-light shadow-[var(--shadow-key),inset_0_1px_0_rgb(255_255_255/0.22)] hover:bg-ink-soft active:translate-y-[3px] active:shadow-key-down",
        rust: "rounded-key border-2 border-ink bg-rust text-paper-bright shadow-key hover:bg-rust-light active:translate-y-[3px] active:shadow-key-down",
        paper: "rounded-key border-2 border-ink bg-paper-bright text-ink shadow-key hover:bg-paper-light active:translate-y-[3px] active:shadow-key-down",
        brass: "rounded-key border-2 border-ink bg-brass text-ink shadow-key hover:brightness-110 active:translate-y-[3px] active:shadow-key-down",
        stamp: "rounded-sharp border-2 border-dashed border-rust bg-transparent text-rust -rotate-2 hover:bg-rust hover:text-paper-bright active:scale-95",
        link: "text-ink underline decoration-2 underline-offset-4 decoration-rust hover:text-rust active:translate-y-px",
      },
      size: {
        default: "min-h-11 px-5 text-[0.8rem]",
        sm: "min-h-11 px-4 text-[0.72rem] sm:min-h-9",
        lg: "min-h-14 px-7 text-[0.92rem]",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "ink", size: "default" },
  },
)

type ButtonStyle = VariantProps<typeof buttonVariants>

export function Button({ className, variant, size, ...props }: React.ComponentProps<"button"> & ButtonStyle) {
  return <button type="button" className={cn(buttonVariants({ variant, size }), className)} {...props} />
}

/** The same key, as a link — two components rather than `asChild`, so the
 *  editor's layers panel names the element it actually is. */
export function ButtonLink({ className, variant, size, ...props }: React.ComponentProps<"a"> & ButtonStyle) {
  return <a {...props} className={cn(buttonVariants({ variant, size }), className)} />
}

/**
 * The big round arcade key: a domed cap on a bezel, glossy highlight, a ring
 * that sinks when it is pressed. For the things worth pressing — Play, Send.
 */
const domeVariants = cva(
  "group relative inline-grid place-items-center rounded-full border-2 border-ink shadow-[0_5px_0_var(--ink),0_9px_12px_rgb(0_0_0/0.35)] transition-[transform,box-shadow] duration-[var(--duration-press)] ease-[var(--ease-press)] active:translate-y-1 active:shadow-[0_1px_0_var(--ink),0_2px_4px_rgb(0_0_0/0.35)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rust touch-manipulation [&_svg]:size-5",
  {
    variants: {
      tone: {
        rust: "bg-[radial-gradient(circle_at_32%_28%,var(--rust-light),var(--rust)_45%,var(--rust-deep))] text-paper-bright",
        brass: "bg-[radial-gradient(circle_at_32%_28%,#f1d98f,var(--brass)_48%,var(--brass-deep))] text-ink",
        teal: "bg-[radial-gradient(circle_at_32%_28%,#6aa6a9,var(--teal)_48%,var(--teal-deep))] text-paper-bright",
        ink: "bg-[radial-gradient(circle_at_32%_28%,var(--ink-faint),var(--ink-soft)_48%,var(--ink))] text-paper-light",
      },
      size: { sm: "size-12", md: "size-16", lg: "size-20" },
    },
    defaultVariants: { tone: "rust", size: "md" },
  },
)

export function DomeButton({
  className,
  tone,
  size,
  children,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof domeVariants>) {
  return (
    <button type="button" className={cn(domeVariants({ tone, size }), className)} {...props}>
      <span aria-hidden className="pointer-events-none absolute inset-[18%] rounded-full bg-[radial-gradient(circle_at_35%_25%,rgb(255_255_255/0.55),transparent_55%)]" />
      <span className="relative z-10 grid place-items-center">{children}</span>
    </button>
  )
}

export { buttonVariants, domeVariants }
