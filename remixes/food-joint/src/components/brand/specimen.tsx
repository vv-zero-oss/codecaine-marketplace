import { Check, Copy } from "lucide-react"
import { useEffect, useRef, useState, type ReactNode } from "react"

import { Eyebrow } from "@/components/blocks/eyebrow"
import { cn } from "@/lib/utils"

/** One chapter of the style guide: the eyebrow, a heavy title and what it covers. */
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
    <section id={id} className="scroll-mt-24 border-t-2 border-forest py-row first:border-t-0 first:pt-0">
      <Eyebrow>{number}</Eyebrow>
      <h2 className="mt-3 font-heavy text-[clamp(40px,5vw,80px)] leading-[0.86]">{title}</h2>
      {blurb ? <p className="mt-4 max-w-[52ch] text-body text-ink-soft">{blurb}</p> : null}
      <div className="mt-10">{children}</div>
    </section>
  )
}

/** The condensed label over a group of samples. */
export function GroupLabel({ children, className }: { children: ReactNode; className?: string }) {
  return <h3 className={cn("mb-4 font-condensed text-label uppercase", className)}>{children}</h3>
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
        "relative inline-flex size-11 items-center justify-center rounded-pill text-on-forest-muted transition-[color,transform] duration-(--duration-press) ease-out-strong focus-visible:ring-2 focus-visible:ring-lime focus-visible:outline-none active:scale-[0.96] [@media(hover:hover)]:hover:text-lime",
        className,
      )}
    >
      <Copy
        className={cn(
          "absolute size-4 transition-[opacity,transform] duration-150 ease-out-strong",
          copied ? "scale-50 opacity-0" : "scale-100 opacity-100",
        )}
      />
      <Check
        className={cn(
          "absolute size-4 text-lime transition-[opacity,transform] duration-150 ease-out-strong",
          copied ? "scale-100 opacity-100" : "scale-50 opacity-0",
        )}
      />
    </button>
  )
}

/** A code block with a copy button, for a component's usage. */
export function CodeSnippet({ code }: { code: string }) {
  return (
    <div className="overflow-hidden rounded-field bg-forest text-cream">
      <div className="flex items-center justify-between border-b border-hairline-forest pl-4">
        <span className="font-condensed text-caption text-on-forest-muted uppercase">Usage</span>
        <CopyButton text={code} />
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-caption leading-relaxed">
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
    <article className="flex min-w-0 flex-col overflow-hidden rounded-card border-2 border-forest bg-cream">
      <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b-2 border-forest px-5 py-4 sm:px-6">
        <h3 className="font-heavy text-[clamp(22px,2vw,30px)] leading-none">{name}</h3>
        <code className="font-mono text-caption break-all text-ink-soft">{source}</code>
        <p className="w-full pt-1 text-ui text-ink-soft">{description}</p>
        {note ? (
          <p className="mt-2 w-full rounded-field bg-lavender px-3 py-2 text-ui text-forest">{note}</p>
        ) : null}
      </header>
      <div className={cn("min-w-0 flex-1 bg-lime p-5 sm:p-8", previewClassName)}>{children}</div>
      <div className="border-t-2 border-forest p-3">
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
      <span className="font-mono text-[11px] text-ink-soft">{label}</span>
    </div>
  )
}

/** A frame for a whole section, drawn at full width inside the guide. */
export function SectionFrame({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("relative overflow-hidden rounded-field border-2 border-forest", className)}>{children}</div>
}
