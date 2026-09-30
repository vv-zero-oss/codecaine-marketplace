import { Check, Copy } from "lucide-react"
import { useEffect, useRef, useState, type ReactNode } from "react"

import { Eyebrow } from "@/components/ui/section-heading"
import { cn } from "@/lib/utils"

/**
 * The pieces the style guide is laid out with, in the site's own manner:
 * eyebrows in spaced capitals, display serif titles, square hairline frames.
 */

/** One chapter: an eyebrow, a serif title and what it covers. */
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
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28 border-t border-ink/10 pt-10 pb-24 md:pb-32">
      <Eyebrow>Chapter {String(index).padStart(2, "0")}</Eyebrow>
      <h2 id={`${id}-title`} className="mt-4 font-display text-4xl leading-[1.05] md:text-5xl">
        {title}
      </h2>
      {blurb ? <p className="mt-5 max-w-2xl leading-relaxed text-ink-600">{blurb}</p> : null}
      <div className="mt-12">{children}</div>
    </section>
  )
}

/** The eyebrow over a group of samples. */
export function GroupLabel({ children }: { children: ReactNode }) {
  return <Eyebrow className="mb-5">{children}</Eyebrow>
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
        "relative inline-flex size-11 items-center justify-center text-paper/60 transition-colors hover:text-paper focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none active:scale-95",
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
          "absolute size-4 text-accent transition-[opacity,transform] duration-150 ease-out",
          copied ? "scale-100 opacity-100" : "scale-50 opacity-0",
        )}
      />
    </button>
  )
}

/** A usage snippet: paper on ink, like the call to book. */
export function CodeSnippet({ code }: { code: string }) {
  return (
    <div className="bg-ink text-paper">
      <div className="flex items-center justify-between border-b border-paper/10 pl-5">
        <span className="text-[11px] font-medium tracking-[0.28em] text-paper/60 uppercase">Usage</span>
        <CopyButton text={code} />
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-xs leading-relaxed">
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
    <article className="min-w-0 border border-ink/15 bg-paper">
      <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-ink/10 px-6 py-5">
        <h3 className="font-display text-2xl">{name}</h3>
        <code className="font-mono text-xs text-ink-400">{source}</code>
        <p className="w-full max-w-2xl text-sm leading-relaxed text-ink-600">{description}</p>
      </header>
      <div className={cn("p-6 md:p-10", previewClassName)}>{children}</div>
      <CodeSnippet code={code} />
    </article>
  )
}

/** A state's name under the thing in that state. */
export function StateLabel({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-3">
      {children}
      <span className="text-[10px] tracking-[0.2em] text-ink-400 uppercase">{label}</span>
    </div>
  )
}

/**
 * A full-width section of the site, shown inside the guide. It clips what
 * the section draws outside itself, and says where it came from.
 */
export function SectionFrame({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
  return (
    <figure className="mx-0">
      <div className={cn("relative overflow-hidden border border-ink/10 bg-paper", className)}>{children}</div>
      <figcaption className="mt-3 text-[10px] tracking-[0.2em] text-ink-400 uppercase">{label}</figcaption>
    </figure>
  )
}
