import { Check, Copy } from "lucide-react"
import { useEffect, useRef, useState, type ReactNode } from "react"

import { cn } from "@/lib/utils"

/**
 * One chapter of the style guide, set like a chapter opening in the books:
 * its number in small caps, the title in the display serif with its second
 * half in a quieter ink, a 1px rule, then what the chapter covers.
 */
/* Anchors: Lenis (the page's scroll) already lands 96px short of a target and
   adds its scroll-margin on top, so the margin here is only what the pinned
   chips add. Without Lenis — reduced motion — the browser scrolls, and the
   margin carries the whole header. */
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
    <section id={id} data-chapter={id} className="scroll-mt-12 border-t border-rule py-16 first:border-t-0 first:pt-0 motion-reduce:scroll-mt-36 md:py-24 lg:scroll-mt-4 lg:motion-reduce:scroll-mt-28">
      <p className="type-label text-ink-3 tabular-nums">Chapter {String(index).padStart(2, "0")}</p>
      <h2 className="type-display mt-4 max-w-[20ch] text-h1 text-balance text-ink">
        {title}
        {continuation ? <span className="text-ink-3 italic"> {continuation}</span> : null}
      </h2>
      {blurb ? <p className="mt-6 max-w-[54ch] font-serif text-lead text-ink-2">{blurb}</p> : null}
      <div className="mt-10 md:mt-14">{children}</div>
    </section>
  )
}

/** A small caps label over a group of samples, with the rule under it. */
export function GroupLabel({ children, className }: { children: ReactNode; className?: string }) {
  return <h3 className={cn("type-label mb-4 border-b border-line pb-2 text-ink-3", className)}>{children}</h3>
}

/** A raised sheet with a hairline edge — square, like a page. */
export function Panel({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("bg-raised shadow-(--shadow-hairline)", className)}>{children}</div>
}

/** Copies a snippet and says so for a moment: the icon swaps with a quick
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
        "type-label relative inline-flex h-9 items-center gap-2 rounded-(--radius-button) bg-night-2 px-3 text-night-muted transition-[background-color,color,transform] duration-(--duration-hover) ease-(--ease-out-strong) hover:bg-night-line hover:text-night-fg focus-visible:outline-night-fg active:scale-[0.97] active:duration-(--duration-press)",
        className,
      )}
    >
      <span className="relative grid size-3.5 place-items-center">
        <Copy
          className={cn(
            "absolute size-3.5 transition-[opacity,transform,filter] duration-200 ease-(--ease-out-strong)",
            copied ? "scale-50 opacity-0 blur-[2px]" : "scale-100 opacity-100",
          )}
          strokeWidth={1.6}
        />
        <Check
          className={cn(
            "absolute size-3.5 text-night-fg transition-[opacity,transform,filter] duration-200 ease-(--ease-out-strong)",
            copied ? "scale-100 opacity-100" : "scale-50 opacity-0 blur-[2px]",
          )}
          strokeWidth={2.2}
        />
      </span>
      <span className="w-[46px] text-left">{copied ? "Copied" : "Copy"}</span>
    </button>
  )
}

/** A usage snippet on night, with a copy button. */
export function CodeSnippet({ code, className }: { code: string; className?: string }) {
  return (
    <div className={cn("relative bg-night text-night-fg", className)}>
      <CopyButton text={code} className="absolute top-3 right-3" />
      <pre className="overflow-x-auto p-5 pr-28 font-mono text-[12.58px] leading-relaxed">
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
  tone = "page",
  previewClassName,
}: {
  name: string
  source: string
  description: string
  code: string
  children: ReactNode
  tone?: "page" | "sheet" | "stone" | "night"
  previewClassName?: string
}) {
  return (
    <article className="overflow-hidden bg-raised shadow-(--shadow-hairline)">
      <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-line px-5 py-5 sm:px-7">
        <h3 className="type-display text-h4 text-ink">{name}</h3>
        <code className="font-mono text-[11.5px] break-all text-ink-3">{source}</code>
        <p className="mt-2 w-full max-w-[68ch] font-serif text-[16px] text-ink-2">{description}</p>
      </header>
      <div
        className={cn(
          "p-5 sm:p-8",
          tone === "page" && "bg-page",
          tone === "sheet" && "bg-sheet",
          tone === "stone" && "bg-stone",
          tone === "night" && "bg-night text-night-fg",
          previewClassName,
        )}
      >
        {children}
      </div>
      <CodeSnippet code={code} />
    </article>
  )
}

/** A state's name under the thing in that state. */
export function StateLabel({
  label,
  tone = "page",
  children,
  className,
}: {
  label: string
  tone?: "page" | "night"
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex min-w-0 flex-col items-start gap-2.5", className)}>
      {children}
      <span className={cn("font-mono text-[11px]", tone === "night" ? "text-night-muted" : "text-ink-3")}>{label}</span>
    </div>
  )
}
