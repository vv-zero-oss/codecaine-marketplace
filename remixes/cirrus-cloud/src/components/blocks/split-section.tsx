import type * as React from "react"

import { TyperText } from "@/components/motion/typer-text"
import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"

/**
 * The page's main rhythm: a heading and a mono label on the left, reading on
 * the right, set wide apart with a lot of paper above and below.
 */
export function SplitSection({
  id,
  heading,
  label,
  children,
  className,
}: {
  id: string
  heading: string
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section id={id} className={cn("py-[calc(var(--spacing-section)/2)]", className)}>
      <Container className="grid gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,40.25rem)] lg:gap-x-16">
        <SplitHeading heading={heading} label={label} />
        <div className="min-w-0">{children}</div>
      </Container>
    </section>
  )
}

/** A heading that types itself in, with its mono label underneath. */
export function SplitHeading({ heading, label, className }: { heading: string; label?: string; className?: string }) {
  return (
    <div className={cn("max-w-[28rem]", className)}>
      <TyperText text={heading} className="text-heading font-normal text-ink" />
      {label && <p className="label mt-6 text-mute">{label}</p>}
    </div>
  )
}

/** Justified reading copy, as the reference sets its long paragraphs. */
export function Prose({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "space-y-5 text-body text-ink-soft sm:text-justify sm:hyphens-auto [&_strong]:font-medium [&_strong]:text-ink",
        className,
      )}
    >
      {children}
    </div>
  )
}
