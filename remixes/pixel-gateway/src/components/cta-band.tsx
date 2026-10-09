import { ArrowRight } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { Button, buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Link } from "@/lib/router"
import { openDialog } from "@/lib/ui-events"
import { cn } from "@/lib/utils"

/**
 * A call to action between sections: one line, one primary action, one softer
 * one. `to` makes the primary a link; without it the primary opens the login
 * dialog.
 */
export function CtaBand({
  title = "Ready to try it?",
  body,
  primary = "Get started",
  to = "/get-started",
  secondary = "Book a demo",
  tone = "accent",
  className,
}: {
  title?: string
  body?: string
  primary?: string
  to?: string
  secondary?: string
  tone?: "accent" | "surface"
  className?: string
}) {
  return (
    <section className={cn("bg-bg py-phi-5 sm:py-phi-5", className)}>
      <Container>
        <Reveal>
          <div className={cn("flex flex-col items-start justify-between gap-phi-3 p-phi-3 shadow-px-drop [--px-drop:rgba(0,0,0,0.5)] sm:p-phi-4 md:flex-row md:items-center", tone === "accent" ? "bg-accent/15 [--px-edge:var(--color-accent)]" : "bg-surface [--px-edge:var(--color-line-strong)]")}>
            <div className="max-w-measure">
              <h2 className="font-display text-base uppercase leading-snug sm:text-base">{title}</h2>
              {body ? <p className="mt-phi-2 text-lg text-fg-muted">{body}</p> : null}
            </div>
            <div className="flex flex-wrap gap-phi-2">
              <Link href={to} className={buttonVariants({ variant: "accent", size: "lg" })}>{primary} <ArrowRight /></Link>
              <Button variant="outline" size="lg" onClick={() => openDialog("demo")}>{secondary}</Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
