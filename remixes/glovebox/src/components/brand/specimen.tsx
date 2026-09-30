import { Check, Copy } from "lucide-react"
import { useEffect, useRef, useState, type ReactNode } from "react"

import { cn } from "@/lib/utils"

/** One chapter of the style guide: a small mono index, a serif title and what it covers. */
export function GuideSection({
  id,
  number,
  title,
  blurb,
  children,
}: {
  id: string
  number: string
  title: string
  blurb?: string
  children: ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-hairline py-16 first:border-t-0 first:pt-0 sm:py-20">
      <p className="font-mono text-[12px] text-muted">{number}</p>
      <h2 className="mt-2 font-display text-[clamp(2.125rem,2.4vw+1rem,3.25rem)] leading-[1.06] text-ink">{title}</h2>
      {blurb ? <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-muted sm:text-base">{blurb}</p> : null}
      <div className="mt-10">{children}</div>
    </section>
  )
}

/** The quiet label over a group of samples. */
export function GroupLabel({ children, className }: { children: ReactNode; className?: string }) {
  return <h3 className={cn("mb-3 text-[15px] text-muted", className)}>{children}</h3>
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
        "relative inline-flex size-11 items-center justify-center rounded-control text-faint transition-[color,background-color,transform] duration-(--duration-press) ease-(--ease-out) hover:bg-surface/10 hover:text-surface focus-visible:ring-2 focus-visible:ring-surface/40 focus-visible:outline-none active:scale-[0.97] sm:size-9",
        className,
      )}
    >
      <Copy
        className={cn(
          "absolute size-4 transition-[opacity,transform] duration-150 ease-(--ease-out)",
          copied ? "scale-50 opacity-0" : "scale-100 opacity-100",
        )}
        strokeWidth={1.5}
      />
      <Check
        className={cn(
          "absolute size-4 text-money-soft transition-[opacity,transform] duration-150 ease-(--ease-out)",
          copied ? "scale-100 opacity-100" : "scale-50 opacity-0",
        )}
        strokeWidth={1.8}
      />
    </button>
  )
}

/** A code block with a copy button, for a component's usage. */
export function CodeSnippet({ code }: { code: string }) {
  return (
    <div className="overflow-hidden rounded-tile bg-ink-strong text-surface">
      <div className="flex items-center justify-between border-b border-surface/10 pl-4">
        <span className="font-mono text-[11px] text-faint">Usage</span>
        <CopyButton text={code} />
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[12px] leading-relaxed">
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
  /** Said when the live sample is only part of the real thing. */
  note?: string
}) {
  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-panel bg-surface shadow-card">
      <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-hairline px-5 py-4 sm:px-6">
        <h3 className="font-display text-[1.625rem] leading-tight text-ink">{name}</h3>
        <code className="font-mono text-[11px] break-all text-muted">{source}</code>
        <p className="w-full pt-1 text-[15px] leading-relaxed text-ink-soft">{description}</p>
        {note ? (
          <p className="mt-2 w-full rounded-control bg-link-soft px-3 py-2 text-[14px] leading-snug text-link">{note}</p>
        ) : null}
      </header>
      <div className={cn("min-w-0 flex-1 bg-paper p-5 sm:p-8", previewClassName)}>{children}</div>
      <div className="border-t border-hairline p-3">
        <CodeSnippet code={code} />
      </div>
    </article>
  )
}

/** A state's name under the thing in that state. */
export function StateLabel({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col items-start gap-2", className)}>
      {children}
      <span className="font-mono text-[11px] text-muted">{label}</span>
    </div>
  )
}
