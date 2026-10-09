import { Check, Copy } from "lucide-react"
import { useEffect, useRef, useState, type ReactNode } from "react"

import { cn } from "@/lib/utils"

/**
 * One chapter of the style guide: a track number, the serif headline with
 * its second half in rust, and what the chapter covers.
 */
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
    <section id={id} className="scroll-mt-32 border-t border-line py-16 first:border-t-0 first:pt-0 md:py-24 lg:scroll-mt-20">
      <p className="type-label text-[11.5px] text-ink-3 tabular">Track {String(index).padStart(2, "0")}</p>
      <h2 className="type-display mt-3 max-w-[20ch] text-h1 text-balance text-ink">
        {title}
        {continuation ? <span className="text-rust"> {continuation}</span> : null}
      </h2>
      {blurb ? <p className="mt-5 max-w-[56ch] text-lead text-ink-2">{blurb}</p> : null}
      <div className="mt-10 md:mt-12">{children}</div>
    </section>
  )
}

/** A mono caps label over a group of samples. */
export function GroupLabel({ children, className }: { children: ReactNode; className?: string }) {
  return <h3 className={cn("type-label mb-3 text-[11px] text-ink-3", className)}>{children}</h3>
}

/** A raised cream card with the page's soft shadow. */
export function Panel({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("rounded-(--radius-card) bg-raised shadow-(--shadow-card)", className)}>{children}</div>
}

/** Copies a snippet and says so for a moment: the icon swaps with a quick
 *  scale-and-fade (200ms ease-out), so "copied" is felt as much as read. */
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
        "type-label relative inline-flex h-8 items-center gap-1.5 rounded-(--radius-button) bg-white/10 px-2.5 text-[10.5px] text-page/75 transition-[background-color,color,transform] duration-(--duration-hover) ease-(--ease-out-strong) hover:bg-white/15 hover:text-page focus-visible:ring-[3px] focus-visible:ring-honey/50 focus-visible:outline-none active:scale-[0.97] active:duration-(--duration-press)",
        className,
      )}
    >
      <span className="relative grid size-3.5 place-items-center">
        <Copy className={cn("absolute size-3.5 transition-[opacity,transform] duration-200 ease-(--ease-out-strong)", copied ? "scale-50 opacity-0" : "scale-100 opacity-100")} />
        <Check className={cn("absolute size-3.5 text-honey transition-[opacity,transform] duration-200 ease-(--ease-out-strong)", copied ? "scale-100 opacity-100" : "scale-50 opacity-0")} strokeWidth={2.5} />
      </span>
      <span className="w-[46px] text-left">{copied ? "Copied" : "Copy"}</span>
    </button>
  )
}

/** A usage snippet on cocoa, with a copy button. */
export function CodeSnippet({ code, className }: { code: string; className?: string }) {
  return (
    <div className={cn("relative bg-cocoa text-page", className)}>
      <CopyButton text={code} className="absolute top-2.5 right-2.5" />
      <pre className="overflow-x-auto p-4 pr-28 font-mono text-[12.58px] leading-relaxed">
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
  tone?: "page" | "panel" | "cocoa" | "rust"
  previewClassName?: string
}) {
  return (
    <article className="min-w-0 overflow-hidden rounded-(--radius-panel) bg-raised shadow-(--shadow-card)">
      <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-line px-5 py-4 sm:px-6">
        <h3 className="type-display text-h4 text-ink">{name}</h3>
        <code className="font-mono text-[11.5px] break-all text-ink-3">{source}</code>
        <p className="mt-1 w-full max-w-[70ch] text-[15px] text-ink-2">{description}</p>
      </header>
      <div
        className={cn(
          "p-5 sm:p-8",
          tone === "page" && "bg-page",
          tone === "panel" && "bg-panel",
          tone === "cocoa" && "bg-cocoa text-page",
          tone === "rust" && "bg-rust text-page",
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
export function StateLabel({ label, children, className, light = false }: { label: string; children: ReactNode; className?: string; light?: boolean }) {
  return (
    <div className={cn("flex min-w-0 flex-col items-start gap-2", className)}>
      {children}
      <span className={cn("font-mono text-[11px]", light ? "text-page/70" : "text-ink-3")}>{label}</span>
    </div>
  )
}
