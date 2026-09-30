import { useEffect, useRef, useState, type ReactNode } from "react"
import { Check, ChevronDown, Copy } from "lucide-react"

import { Eyebrow } from "@/components/ui/eyebrow"
import { Heading } from "@/components/ui/heading"
import { cn } from "@/lib/utils"

/** One chapter of the style guide: an anchor, a two-tone title and its body. */
export function GuideSection({
  id,
  index,
  lead,
  rest,
  children,
}: {
  id: string
  index: number
  lead: string
  rest?: string
  children: ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-[120px] border-t border-line-strong py-16 first:border-t-0 first:pt-0 md:py-20">
      <div className="flex max-w-[640px] flex-col items-start gap-5">
        <Eyebrow className="tabular">{String(index).padStart(2, "0")}</Eyebrow>
        <Heading as="h2" size="h2" lead={lead} rest={rest} />
      </div>
      <div className="mt-10 md:mt-12">{children}</div>
    </section>
  )
}

/** A small label over a group of samples. */
export function GroupLabel({ children, className }: { children: ReactNode; className?: string }) {
  return <h3 className={cn("mb-4 text-sm font-medium text-ink-soft", className)}>{children}</h3>
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
        "relative flex h-7 items-center gap-1.5 rounded-control px-2 text-caption text-ink-2 transition-colors duration-300 hover:bg-hover-2 hover:text-ink hover:duration-[50ms] active:bg-line-bold",
        className,
      )}
    >
      <span className="relative size-3.5">
        <Copy
          className={cn(
            "absolute inset-0 size-3.5 transition-[opacity,transform,filter] duration-200 ease-out-cubic",
            copied ? "scale-50 opacity-0 blur-[2px]" : "scale-100 opacity-100",
          )}
        />
        <Check
          className={cn(
            "absolute inset-0 size-3.5 text-green transition-[opacity,transform,filter] duration-200 ease-out-cubic",
            copied ? "scale-100 opacity-100" : "scale-50 opacity-0 blur-[2px]",
          )}
        />
      </span>
      {copied ? "Copied" : "Copy"}
    </button>
  )
}

/** A code block with a copy button, for a component's usage. */
export function CodeSnippet({ code, label = "TSX" }: { code: string; label?: string }) {
  return (
    <div className="overflow-hidden rounded-card border border-line-strong bg-page">
      <div className="flex h-10 items-center border-b border-line-strong pr-1.5 pl-4 text-caption text-ink-3">
        {label}
        <CopyButton text={code} className="ml-auto" />
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-[20px] text-ink-soft">
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
    <article className={cn("flex min-w-0 flex-col overflow-hidden rounded-panel border border-line-strong bg-canvas", className)}>
      <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-line-strong px-5 py-4 sm:px-6">
        <h4 className="text-h4 font-medium text-ink">{name}</h4>
        <code className="font-mono text-micro break-all text-ink-3">{source}</code>
        <p className="w-full text-sm text-ink-2">{description}</p>
      </header>
      <div className={cn("texture-dots min-w-0 flex-1 bg-page p-5 sm:p-8", previewClassName)}>{children}</div>
      <div className="border-t border-line-strong p-3">
        <CodeSnippet code={code} />
      </div>
    </article>
  )
}

/** A state's name under the thing in that state. */
export function StateLabel({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn("flex min-w-0 flex-col items-start gap-2", className)}>
      {children}
      <span className="font-mono text-micro text-ink-3">{label}</span>
    </div>
  )
}

/**
 * A whole section of the site, live, in a frame. Held to a window's height
 * with a fade until it is opened, so the guide stays scannable.
 */
export function SectionFrame({
  name,
  source,
  note,
  code,
  children,
  collapsedHeight = 560,
}: {
  name: string
  source: string
  note?: string
  code: string
  children: ReactNode
  collapsedHeight?: number
}) {
  const [open, setOpen] = useState(false)
  return (
    <article className="min-w-0 overflow-hidden rounded-panel border border-line-strong bg-canvas">
      <header className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-line-strong px-5 py-4 sm:px-6">
        <div className="min-w-0">
          <h4 className="text-h4 font-medium text-ink">{name}</h4>
          <code className="font-mono text-micro break-all text-ink-3">{source}</code>
        </div>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="inline-flex h-8 items-center gap-1.5 rounded-button border border-line-strong px-2.5 text-caption font-medium text-ink transition-colors duration-300 hover:border-line-bold hover:bg-surface hover:duration-[50ms]"
        >
          {open ? "Collapse" : "Show the whole section"}
          <ChevronDown className={cn("size-3.5 transition-transform duration-300 ease-emphasized", open && "rotate-180")} />
        </button>
        {note && <p className="w-full text-sm text-ink-2">{note}</p>}
      </header>
      <div className="relative bg-page">
        <div className="overflow-hidden" style={{ maxHeight: open ? undefined : collapsedHeight }}>
          {children}
        </div>
        {!open && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-page"
          />
        )}
      </div>
      <div className="border-t border-line-strong p-3">
        <CodeSnippet code={code} />
      </div>
    </article>
  )
}
