import { useEffect, useRef, useState, type ReactNode } from "react"

import { Bracket } from "@/components/ui/bracket"
import { cn } from "@/lib/utils"

/**
 * The pieces the style guide is laid out with, in the site's own manner:
 * mono labels in capitals, hairline rules, no boxes and no shadows.
 */

/** One chapter: a numbered label, a light headline and what it covers. */
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
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28 border-t border-rule pt-6 pb-20 md:pb-28">
      <p className="font-mono text-label uppercase tracking-label text-ink-muted tabular-nums">
        {String(index).padStart(2, "0")} —
      </p>
      <h2 id={`${id}-title`} className="mt-4 text-headline font-light tracking-headline text-ink">
        {title}
      </h2>
      {blurb ? <p className="mt-4 max-w-[34rem] text-ink-soft">{blurb}</p> : null}
      <div className="mt-10">{children}</div>
    </section>
  )
}

/**
 * The small mono caption over a group of samples. Classes are joined, not
 * merged: tailwind-merge reads the custom `text-caption` size as a colour and
 * would drop it beside `text-ink-muted`.
 */
export function GroupLabel({ children, className, night }: { children: ReactNode; className?: string; night?: boolean }) {
  return (
    <h3
      className={[
        "font-mono text-caption uppercase tracking-label",
        night ? "text-night-muted" : "text-ink-muted",
        className ?? "mb-4",
      ].join(" ")}
    >
      {children}
    </h3>
  )
}

/** `[ COPY ]`, which answers `[ COPIED ]` for a moment. */
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
    <Bracket size="caption" onClick={copy} aria-label={copied ? "Copied" : "Copy the snippet"} className={className}>
      <span className="inline-block min-w-[6ch] text-center">{copied ? "Copied" : "Copy"}</span>
    </Bracket>
  )
}

/** A usage snippet, printed like the page prints everything: mono on night. */
export function CodeSnippet({ code }: { code: string }) {
  return (
    <div className="bg-night text-night-ink">
      <div className="flex items-center justify-between gap-4 border-b border-night-soft pl-4 pr-3">
        <span className="font-mono text-caption uppercase tracking-label text-night-muted">Usage</span>
        <CopyButton text={code} />
      </div>
      <pre className="no-scrollbar overflow-x-auto p-4 font-mono text-caption leading-relaxed">
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
}: {
  name: string
  source: string
  description: string
  code: string
  children: ReactNode
  previewClassName?: string
}) {
  return (
    <article className="min-w-0 border-t border-rule pt-4">
      <header className="grid gap-x-6 gap-y-1 md:grid-cols-[minmax(0,1fr)_auto]">
        <h3 className="font-mono text-label uppercase tracking-label">{name}</h3>
        <code className="font-mono text-caption text-ink-muted md:text-right">{source}</code>
        <p className="max-w-[40rem] text-ink-soft md:col-span-2">{description}</p>
      </header>
      <div className={cn("mt-5 border border-rule p-5 md:p-8", previewClassName)}>{children}</div>
      <CodeSnippet code={code} />
    </article>
  )
}

/** A state's name under the thing in that state. */
export function StateLabel({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-2">
      {children}
      <span className="font-mono text-caption uppercase tracking-label text-ink-muted">{label}</span>
    </div>
  )
}
