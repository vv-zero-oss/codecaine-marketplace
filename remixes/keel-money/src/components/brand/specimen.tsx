import { Check, Copy } from "lucide-react"
import { useEffect, useRef, useState, type ReactNode } from "react"

import { cn } from "@/lib/utils"

/** One chapter of the style guide: a number, a two-tone headline, a blurb. */
export function GuideSection({
  id,
  index,
  title,
  continuation,
  blurb,
  children,
}: {
  id: string
  index: number
  title: string
  continuation?: string
  blurb?: string
  children: ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-32 border-t border-line py-16 first:border-t-0 first:pt-0 md:py-24 lg:scroll-mt-28">
      <p className="font-mono text-[12px] text-fg-3 tabular-nums">{String(index).padStart(2, "0")}</p>
      <h2 className="type-display mt-3 max-w-[22ch] text-h2 text-balance text-fg">
        {title}
        {continuation ? <span className="text-fg-4"> {continuation}</span> : null}
      </h2>
      {blurb ? <p className="mt-5 max-w-[56ch] text-[17px] text-fg-2">{blurb}</p> : null}
      <div className="mt-10 md:mt-12">{children}</div>
    </section>
  )
}

/** A small caps label over a group of samples. */
export function GroupLabel({ children, className }: { children: ReactNode; className?: string }) {
  return <h3 className={cn("type-eyebrow mb-3 font-sans text-fg-3", className)}>{children}</h3>
}

/** A night card, the same surface the site's cards use. */
export function Panel({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("rounded-(--radius-card) bg-surface shadow-(--shadow-card)", className)}>{children}</div>
}

/** Copies a snippet and says so for a moment — the icon swaps with a quick
 *  scale-and-fade, so "copied" is felt as much as read. */
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
        "inline-flex h-8 items-center gap-1.5 rounded-(--radius-button) bg-surface-2 px-2.5 text-[12px] text-fg-3 transition-[background-color,color,transform] duration-(--duration-hover) ease-(--ease-out-strong) hover:bg-surface-3 hover:text-fg focus-visible:ring-[3px] focus-visible:ring-blue/50 focus-visible:outline-none active:scale-[0.97]",
        className,
      )}
    >
      <span className="relative grid size-3.5 place-items-center">
        <Copy className={cn("absolute size-3.5 transition-[opacity,transform,filter] duration-200 ease-(--ease-out-strong)", copied ? "scale-50 opacity-0 blur-[2px]" : "scale-100 opacity-100")} />
        <Check className={cn("absolute size-3.5 text-gain transition-[opacity,transform,filter] duration-200 ease-(--ease-out-strong)", copied ? "scale-100 opacity-100" : "scale-50 opacity-0 blur-[2px]")} strokeWidth={2.5} />
      </span>
      <span className="w-[42px] text-left">{copied ? "Copied" : "Copy"}</span>
    </button>
  )
}

/** A usage snippet with a copy button. */
export function CodeSnippet({ code, className }: { code: string; className?: string }) {
  return (
    <div className={cn("relative border-t border-line bg-night-deep text-fg-2", className)}>
      <CopyButton text={code} className="absolute top-2.5 right-2.5" />
      <pre className="overflow-x-auto p-4 pr-24 font-mono text-[12px] leading-relaxed">
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
  tone = "night",
  previewClassName,
}: {
  name: string
  source: string
  description: string
  code: string
  children: ReactNode
  tone?: "night" | "day"
  previewClassName?: string
}) {
  return (
    <article className="overflow-hidden rounded-(--radius-card) bg-surface shadow-(--shadow-card)">
      <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-line px-5 py-4 sm:px-6">
        <h3 className="type-display text-[20px] text-fg">{name}</h3>
        <code className="font-mono text-[11.5px] break-all text-fg-4">{source}</code>
        <p className="mt-1 w-full max-w-[70ch] text-[15px] text-fg-3">{description}</p>
      </header>
      <div className={cn("p-5 sm:p-8", tone === "night" ? "bg-night" : "bg-day text-day-ink", previewClassName)}>{children}</div>
      <CodeSnippet code={code} />
    </article>
  )
}

/** A state's name under the thing in that state. */
export function StateLabel({ label, children, className, tone = "night" }: { label: string; children: ReactNode; className?: string; tone?: "night" | "day" }) {
  return (
    <div className={cn("flex min-w-0 flex-col items-start gap-2", className)}>
      {children}
      <span className={cn("font-mono text-[11px]", tone === "night" ? "text-fg-4" : "text-day-ink-3")}>{label}</span>
    </div>
  )
}
