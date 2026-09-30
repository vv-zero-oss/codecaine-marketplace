import { Check, Copy } from "lucide-react"
import { useEffect, useRef, useState, type ReactNode } from "react"

import { TyperText } from "@/components/motion/typer-text"
import { cn } from "@/lib/utils"

/**
 * The style guide's building blocks, in the page's own grammar: a heading
 * that types itself in over a mono caps label, hairline rules, paper under
 * the 9px grid, and nothing rounded.
 */

/** One chapter: a typed heading and its label on the left, what it covers on the right, then the samples. */
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
    <section id={id} className="scroll-mt-16 border-t border-hairline py-[clamp(4rem,2rem+5vw,8rem)]">
      <div className="grid gap-y-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,40.25rem)] lg:gap-x-16">
        <div className="max-w-[28rem]">
          <TyperText text={title} className="text-heading font-normal text-ink" />
          <p className="label mt-6 text-mute">Chapter {String(index).padStart(2, "0")}</p>
        </div>
        {blurb ? <p className="text-body text-ink-soft lg:pt-2">{blurb}</p> : null}
      </div>
      <div className="mt-12 md:mt-16">{children}</div>
    </section>
  )
}

/** The mono caps label over a group of samples. */
export function GroupLabel({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("label mb-4 text-mute", className)}>{children}</p>
}

/** A value read off the page, in mono. */
export function Mono({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("font-mono text-[0.6875rem] leading-relaxed break-all text-mute tabular-nums", className)}>{children}</span>
}

/** Copies a snippet, and swaps to a check for a moment. */
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
        "notch focus-notch relative inline-flex size-11 shrink-0 items-center justify-center bg-ink text-paper outline-none transition-[transform,background-color] duration-(--duration-press) ease-(--ease-out) active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-navy",
        className,
      )}
    >
      <Copy
        className={cn(
          "absolute size-4 transition-[opacity,transform] duration-150 ease-(--ease-out)",
          copied ? "scale-50 opacity-0" : "scale-100 opacity-100",
        )}
      />
      <Check
        className={cn(
          "absolute size-4 text-lime transition-[opacity,transform] duration-150 ease-(--ease-out)",
          copied ? "scale-100 opacity-100" : "scale-50 opacity-0",
        )}
      />
    </button>
  )
}

/** Usage, in mono on the wash, with a copy button. */
export function CodeSnippet({ code }: { code: string }) {
  return (
    <div className="flex items-start gap-3 border-t border-hairline bg-wash/60 p-3">
      <pre className="min-w-0 flex-1 overflow-x-auto px-2 py-2.5 font-mono text-[0.75rem] leading-relaxed text-ink">
        <code>{code}</code>
      </pre>
      <CopyButton text={code} />
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
    <article className={cn("flex min-w-0 flex-col border border-hairline bg-paper", className)}>
      <header className="flex flex-col gap-2 border-b border-hairline px-5 py-5 md:px-7">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="text-title text-ink">{name}</h3>
          <span className="label text-faint">{source}</span>
        </div>
        <p className="max-w-[40rem] text-small text-ink-soft">{description}</p>
      </header>
      <div className={cn("min-w-0 flex-1 p-5 md:p-8", previewClassName)}>{children}</div>
      <CodeSnippet code={code} />
    </article>
  )
}

/** A state's name under the thing in that state. */
export function StateLabel({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn("flex min-w-0 flex-col items-start gap-2.5", className)}>
      {children}
      <span className="label text-faint">{label}</span>
    </div>
  )
}
