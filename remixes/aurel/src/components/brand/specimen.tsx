import { Check, Copy } from "lucide-react"
import { useEffect, useRef, useState, type ReactNode } from "react"

import { MixedTitle } from "@/components/ui/mixed-title"
import { cn } from "@/lib/utils"

/** The house's small label: 13px grotesk capitals, spaced. */
export const LABEL = "font-sans text-[13px] uppercase tracking-[0.06em]"

/** One chapter of the style guide: its number, a mixed title and a line. */
export function GuideSection({
  id,
  index,
  title,
  intro,
  children,
}: {
  id: string
  index: number
  title: string
  intro?: string
  children: ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-[120px] border-t border-ink/15 pt-10 pb-[clamp(72px,9vw,160px)]">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:items-end">
        <div className="flex items-baseline gap-5">
          <span className="font-serif text-[16px] tabular-nums text-ink-muted">{String(index).padStart(2, "0")}</span>
          <MixedTitle as="h2" text={title} className="text-[clamp(44px,6vw,104px)] leading-[0.9] tracking-[-0.015em] text-ink" />
        </div>
        {intro && <p className="max-w-[52ch] font-serif text-[17px] leading-[1.6] text-ink-soft lg:justify-self-end">{intro}</p>}
      </div>
      <div className="mt-12 lg:mt-16">{children}</div>
    </section>
  )
}

/** A small label over a group of samples. */
export function GroupLabel({ children, className }: { children: ReactNode; className?: string }) {
  return <h3 className={cn(LABEL, "mb-5 text-ink", className)}>{children}</h3>
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
      /* clipboard can be blocked; the feedback still shows */
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
        LABEL,
        "inline-flex h-9 items-center gap-2 px-3 text-[12px] text-paper/70 transition-colors duration-(--duration-hover) hover:text-paper active:scale-[0.97] active:duration-(--duration-press)",
        className,
      )}
    >
      <span className="relative size-3.5">
        <Copy
          strokeWidth={1.25}
          className={cn(
            "absolute inset-0 size-3.5 transition-[opacity,transform] duration-(--duration-hover) ease-(--ease-out-soft)",
            copied ? "scale-50 opacity-0" : "scale-100 opacity-100",
          )}
        />
        <Check
          strokeWidth={1.5}
          className={cn(
            "absolute inset-0 size-3.5 transition-[opacity,transform] duration-(--duration-hover) ease-(--ease-out-soft)",
            copied ? "scale-100 opacity-100" : "scale-50 opacity-0",
          )}
        />
      </span>
      {copied ? "Copied" : "Copy"}
    </button>
  )
}

/** A code block with a copy button, for a component's usage. */
export function CodeSnippet({ code }: { code: string }) {
  return (
    <div className="relative bg-ink text-paper">
      <CopyButton text={code} className="absolute top-1.5 right-1.5" />
      <pre className="overflow-x-auto p-5 pr-24 font-mono text-[12px] leading-relaxed">
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
  className,
}: {
  name: string
  source: string
  description: string
  code: string
  children: ReactNode
  previewClassName?: string
  className?: string
}) {
  return (
    <article className={cn("flex min-w-0 flex-col bg-chip shadow-sheet", className)}>
      <header className="border-b border-line px-5 py-5 sm:px-8">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h4 className="font-display text-[clamp(26px,2vw,34px)] leading-none tracking-[-0.01em] text-ink">{name}</h4>
          <code className="font-mono text-[11px] break-all text-ink-muted">{source}</code>
        </div>
        <p className="mt-2 max-w-[70ch] font-serif text-[16px] leading-[1.55] text-ink-soft">{description}</p>
      </header>
      <div className={cn("min-w-0 flex-1 bg-paper p-5 sm:p-8", previewClassName)}>{children}</div>
      <CodeSnippet code={code} />
    </article>
  )
}

/** A state's name under the thing in that state. */
export function StateLabel({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn("flex min-w-0 flex-col items-start gap-2.5", className)}>
      {children}
      <span className="font-mono text-[11px] text-ink-muted">{label}</span>
    </div>
  )
}
