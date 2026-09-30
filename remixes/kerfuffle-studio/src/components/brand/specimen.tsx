import { Check, Copy } from "lucide-react"
import { useEffect, useRef, useState, type ReactNode } from "react"

import { cn } from "@/lib/utils"

/** One chapter of the style guide: an anchor, a title and what it covers. */
export function GuideSection({
  id,
  title,
  blurb,
  children,
}: {
  id: string
  title: string
  blurb?: string
  children: ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-line py-14 first:border-t-0 first:pt-0">
      <h2 className="display text-5xl md:text-6xl">{title}</h2>
      {blurb ? <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">{blurb}</p> : null}
      <div className="mt-8">{children}</div>
    </section>
  )
}

/** A small caps label over a group of samples. */
export function GroupLabel({ children }: { children: string }) {
  return <h3 className="mb-3 label text-xs tracking-widest text-ink-mute">{children}</h3>
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
        "relative inline-flex size-9 items-center justify-center rounded-none text-ink-mute transition-colors hover:bg-card/10 hover:text-white focus-visible:ring-2 focus-visible:ring-flame focus-visible:outline-none active:scale-95",
        className,
      )}
    >
      <Copy
        className={cn(
          "absolute size-4 transition-[opacity,transform] duration-150 ease-out",
          copied ? "scale-50 opacity-0" : "scale-100 opacity-100",
        )}
      />
      <Check
        className={cn(
          "absolute size-4 text-green transition-[opacity,transform] duration-150 ease-out",
          copied ? "scale-100 opacity-100" : "scale-50 opacity-0",
        )}
      />
    </button>
  )
}

/** A code block with a copy button, for a component's usage. */
export function CodeSnippet({ code }: { code: string }) {
  return (
    <div className="relative rounded-none bg-night text-snow">
      <CopyButton text={code} className="absolute top-2 right-2" />
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
}: {
  name: string
  source: string
  description: string
  code: string
  children: ReactNode
  previewClassName?: string
}) {
  return (
    <article className="overflow-hidden rounded-card border-2 border-ink bg-card">
      <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-line px-5 py-4 sm:px-6">
        <h3 className="label text-lg">{name}</h3>
        <code className="font-mono text-xs text-ink-mute">{source}</code>
        <p className="w-full text-sm text-ink-soft">{description}</p>
      </header>
      <div className={cn("bg-paper p-5 sm:p-8", previewClassName)}>{children}</div>
      <div className="border-t border-line p-3">
        <CodeSnippet code={code} />
      </div>
    </article>
  )
}

/** A state's name under the thing in that state. */
export function StateLabel({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-2">
      {children}
      <span className="font-mono text-[11px] text-ink-mute">{label}</span>
    </div>
  )
}
