import { Check, Copy } from "lucide-react"
import { useEffect, useRef, useState, type ReactNode } from "react"

import { cn } from "@/lib/utils"

/** One chapter of the style guide: a number, a serif title and what it covers. */
export function GuideSection({
  id,
  index,
  title,
  blurb,
  children,
}: {
  id: string
  index: number
  title: string
  blurb?: string
  children: ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-hairline py-16 first:border-t-0 first:pt-0 sm:py-24">
      <p className="font-mono text-xs text-subtle tabular-nums">{String(index).padStart(2, "0")}</p>
      <h2 className="mt-3 font-serif text-headline text-ink">{title}</h2>
      {blurb ? <p className="mt-4 max-w-2xl text-[0.9375rem] leading-relaxed text-muted sm:text-base">{blurb}</p> : null}
      <div className="mt-10 sm:mt-12">{children}</div>
    </section>
  )
}

/** The small label over a group of samples. */
export function GroupLabel({ children, className }: { children: ReactNode; className?: string }) {
  return <h3 className={cn("mb-3 text-[0.6875rem] font-medium tracking-[0.14em] text-subtle uppercase", className)}>{children}</h3>
}

/** A graphite panel, lit from above like the page's cards. */
export function Panel({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("rounded-card bg-surface shadow-card", className)}>{children}</div>
}

/** A computed value, printed small. */
export function Value({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("block font-mono text-[11px] leading-relaxed break-all text-muted tabular-nums", className)}>{children}</span>
}

/** Copies a snippet, and says so for a moment. */
export function CopyButton({ text, className }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      return
    }
    setCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 1400)
  }
  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Copied" : "Copy code"}
      className={cn(
        "relative inline-flex size-11 items-center justify-center rounded-full text-subtle transition-[background-color,color,transform] duration-(--duration-hover) ease-out hover:bg-hairline hover:text-ink focus-visible:ring-2 focus-visible:ring-ink/30 focus-visible:outline-none active:scale-[0.94] active:duration-(--duration-press) sm:size-9",
        className,
      )}
    >
      <Copy
        className={cn(
          "absolute size-4 transition-[opacity,transform,filter] duration-(--duration-hover) ease-out",
          copied ? "scale-50 opacity-0 blur-[2px]" : "scale-100 opacity-100",
        )}
      />
      <Check
        className={cn(
          "absolute size-4 text-accent transition-[opacity,transform,filter] duration-(--duration-hover) ease-out",
          copied ? "scale-100 opacity-100" : "scale-50 opacity-0 blur-[2px]",
        )}
      />
    </button>
  )
}

/** A code block with a copy button, for a component's usage. */
export function CodeSnippet({ code }: { code: string }) {
  return (
    <div className="relative rounded-item bg-footer text-ink-soft shadow-item">
      <CopyButton text={code} className="absolute top-1 right-1" />
      <pre className="overflow-x-auto p-4 pr-14 font-mono text-xs leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  )
}

/** A live component, its states side by side, and how to use it. */
export function ComponentSpecimen({
  name,
  source,
  description,
  code,
  children,
  previewClassName,
  note,
}: {
  name: string
  source: string
  description: string
  code: string
  children: ReactNode
  previewClassName?: string
  /** Said plainly when the page can only show part of the thing. */
  note?: string
}) {
  return (
    <article className="min-w-0 overflow-hidden rounded-card bg-surface shadow-card">
      <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1.5 px-5 pt-5 pb-4 sm:px-6">
        <h3 className="font-serif text-[1.75rem] leading-tight text-ink">{name}</h3>
        <code className="font-mono text-[11px] text-subtle">{source}</code>
        <p className="w-full text-[0.875rem] leading-relaxed text-muted">{description}</p>
        {note ? (
          <p className="mt-1 w-full rounded-item bg-accent/8 px-3 py-2 text-[0.75rem] leading-relaxed text-accent-soft">{note}</p>
        ) : null}
      </header>
      <div className={cn("mx-2 rounded-item bg-canvas p-5 shadow-item sm:p-8", previewClassName)}>{children}</div>
      <div className="p-2">
        <CodeSnippet code={code} />
      </div>
    </article>
  )
}

/** A state's name under the thing in that state. */
export function StateLabel({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col items-start gap-2.5", className)}>
      {children}
      <span className="font-mono text-[11px] text-subtle">{label}</span>
    </div>
  )
}
