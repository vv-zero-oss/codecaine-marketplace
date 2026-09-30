import { cva, type VariantProps } from "class-variance-authority"
import { ArrowRight, type LucideIcon } from "lucide-react"
import type * as React from "react"

import { Link } from "@/lib/router"
import { cn } from "@/lib/utils"

/**
 * The studio's button: a square icon cell and a label cell, side by side,
 * with a hairline gap between them. Square corners, condensed caps.
 *
 * On hover the arrow leaves to the right and comes back in from the left; on
 * press the whole button sinks a pixel.
 */
const buttonVariants = cva(
  "group/button inline-flex items-stretch gap-[2px] label text-sm leading-none whitespace-nowrap transition-transform duration-(--duration-fast) ease-out select-none active:translate-y-px disabled:pointer-events-none disabled:opacity-40 [&>span]:transition-colors [&>span]:duration-(--duration-fast)",
  {
    variants: {
      tone: {
        blue: "text-snow [&>span]:bg-blue hover:[&>span]:bg-blue-deep",
        pink: "text-ink [&>span]:bg-pink hover:[&>span]:bg-pink-deep hover:text-snow",
        white: "text-ink [&>span]:bg-card hover:[&>span]:bg-paper",
        ink: "text-snow [&>span]:bg-ink hover:[&>span]:bg-night-raised",
      },
      size: {
        sm: "h-9 [&>span:first-child]:w-9 [&>span:last-child]:px-3 text-xs",
        md: "h-11 [&>span:first-child]:w-11 [&>span:last-child]:px-4",
        lg: "h-14 [&>span:first-child]:w-14 [&>span:last-child]:px-5 text-base",
      },
    },
    defaultVariants: { tone: "blue", size: "md" },
  },
)

type ButtonStyle = VariantProps<typeof buttonVariants>

type Shared = ButtonStyle & {
  label: string
  icon?: LucideIcon
  loading?: boolean
}

function Inner({ label, icon: Icon = ArrowRight, loading }: Pick<Shared, "label" | "icon" | "loading">) {
  return (
    <>
      <span className="relative flex shrink-0 items-center justify-center overflow-hidden">
        {loading ? (
          <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          <>
            <Icon className="size-4 transition-transform duration-(--duration-base) ease-out group-hover/button:translate-x-[180%]" strokeWidth={2.5} />
            <Icon
              aria-hidden
              className="absolute size-4 -translate-x-[180%] transition-transform duration-(--duration-base) ease-out group-hover/button:translate-x-0"
              strokeWidth={2.5}
            />
          </>
        )}
      </span>
      <span className="flex items-center">{label}</span>
    </>
  )
}

export function Button({
  className,
  tone,
  size,
  label,
  icon,
  loading,
  ...props
}: Omit<React.ComponentProps<"button">, "children"> & Shared) {
  return (
    <button className={cn(buttonVariants({ tone, size }), className)} disabled={loading || props.disabled} {...props}>
      <Inner label={label} icon={icon} loading={loading} />
    </button>
  )
}

/** The same button as a link: internal paths go through the page transition. */
export function ButtonLink({
  className,
  tone,
  size,
  label,
  icon,
  href = "/",
  ...props
}: Omit<React.ComponentProps<"a">, "children"> & Shared) {
  const classes = cn(buttonVariants({ tone, size }), className)
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes} {...props}>
        <Inner label={label} icon={icon} />
      </Link>
    )
  }
  return (
    <a href={href} className={classes} {...props}>
      <Inner label={label} icon={icon} />
    </a>
  )
}

export { buttonVariants }
