import { cva, type VariantProps } from "class-variance-authority"
import { ArrowRight, type LucideIcon } from "lucide-react"
import type * as React from "react"

import { Link } from "@/lib/router"
import { cn } from "@/lib/utils"

/**
 * A plain, solid button: label and a small arrow that nudges on hover, a
 * slight squeeze on press. Three tones, two sizes.
 */
const buttonVariants = cva(
  "group/button inline-flex items-center justify-center gap-2 rounded-sm text-sm font-medium whitespace-nowrap transition-[background-color,color,transform] duration-(--duration-fast) ease-out select-none active:scale-[0.97] disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      tone: {
        ink: "bg-ink text-snow hover:bg-night-raised",
        accent: "bg-accent text-snow hover:bg-accent-deep",
        snow: "bg-snow text-ink hover:bg-card",
        outline: "border border-current/25 text-current hover:border-current",
      },
      size: {
        md: "h-11 px-5",
        lg: "h-13 px-6 text-base",
      },
    },
    defaultVariants: { tone: "ink", size: "md" },
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
      <span>{label}</span>
      {loading ? (
        <span className="size-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        <Icon
          className="size-4 transition-transform duration-(--duration-base) ease-out group-hover/button:translate-x-0.5"
          strokeWidth={2}
        />
      )}
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
