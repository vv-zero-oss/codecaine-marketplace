import { Check, Copy } from "lucide-react"
import { useEffect, useRef, useState, type ReactNode } from "react"

import { cn } from "@/lib/utils"

/** One chapter of the style guide: a number, a condensed title and what it covers. */
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
    <section id={id} className="scroll-mt-24 border-t border-ink/15 py-16 first:border-t-0 first:pt-0 sm:py-24">
      <p className="label text-ink-soft tabular-nums">{String(index).padStart(2, "0")}</p>
      <h2 className="mt-4 font-condensed text-[clamp(2.6rem,5vw,4.8rem)] leading-[0.9]">{title}</h2>
      {blurb ? <p className="mt-5 max-w-[36rem] text-body text-ink-soft">{blurb}</p> : null}
      <div className="mt-10 sm:mt-12">{children}</div>
    </section>
  )
}

/** The small spaced capitals over a group of samples. */
export function GroupLabel({ children, className }: { children: ReactNode; className?: string }) {
  return <h3 className={cn("label mb-4 text-ink-soft", className)}>{children}</h3>
}

/** A paper card on the limestone ground, cut square like the note card. */
export function Panel({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("rounded-[var(--radius-card)] border border-ink/10 bg-paper", className)}>{children}</div>
}

/** A computed value, printed small. */
export function Value({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("block font-mono text-[11px] leading-relaxed break-all text-ink-soft tabular-nums", className)}>{children}</span>
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
        "relative inline-flex size-11 items-center justify-center rounded-full text-shell/60 transition-[background-color,color,transform] duration-300 ease-[var(--ease-out-soft)] hover:bg-shell/10 hover:text-shell focus-visible:ring-1 focus-visible:ring-shell focus-visible:outline-none active:scale-90",
        className,
      )}
    >
      <Copy
        strokeWidth={1.5}
        className={cn(
          "absolute size-4 transition-[opacity,transform] duration-200 ease-[var(--ease-out-soft)]",
          copied ? "scale-50 opacity-0" : "scale-100 opacity-100",
        )}
      />
      <Check
        strokeWidth={1.5}
        className={cn(
          "absolute size-4 text-pale transition-[opacity,transform] duration-200 ease-[var(--ease-out-soft)]",
          copied ? "scale-100 opacity-100" : "scale-50 opacity-0",
        )}
      />
    </button>
  )
}

/** A code block in deep olive, with a copy button. */
export function CodeSnippet({ code }: { code: string }) {
  return (
    <div className="relative rounded-[var(--radius-card)] bg-deep text-shell">
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
    <article className="min-w-0 overflow-hidden rounded-[var(--radius-card)] border border-ink/10 bg-paper">
      <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-b border-ink/10 px-5 py-5 sm:px-6">
        <h3 className="font-condensed text-[2rem] leading-none">{name}</h3>
        <code className="font-mono text-[11px] text-ink-soft">{source}</code>
        <p className="w-full text-body text-ink-soft">{description}</p>
        {note ? <p className="label w-full text-[0.625rem] tracking-[0.14em] text-deep-soft">{note}</p> : null}
      </header>
      <div className={cn("bg-shell p-5 sm:p-8", previewClassName)}>{children}</div>
      <div className="border-t border-ink/10 p-2">
        <CodeSnippet code={code} />
      </div>
    </article>
  )
}

/** A state's name under the thing in that state. */
export function StateLabel({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col items-start gap-3", className)}>
      {children}
      <span className="font-mono text-[11px] text-ink-soft">{label}</span>
    </div>
  )
}
