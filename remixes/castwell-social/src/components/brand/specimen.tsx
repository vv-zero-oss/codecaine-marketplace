import { Check, Copy } from "lucide-react"
import { useEffect, useRef, useState, type ReactNode } from "react"

import { Eyebrow } from "@/components/ui/eyebrow"
import { cn } from "@/lib/utils"

/**
 * The style guide's own building blocks, drawn the way the site draws
 * everything: square corners, 1px hairlines, a serif title over a grey
 * eyebrow. Nothing here is a new visual idea — it is the page's grammar
 * applied to documentation.
 */

/** One chapter: the number, a serif title and what it covers. */
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
    <section id={id} className="scroll-mt-28 border-t border-line py-14 md:py-20">
      <div className="flex flex-col gap-4 md:gap-5">
        <Eyebrow>
          <span className="tabular-nums">{String(index).padStart(2, "0")}</span> · Chapter
        </Eyebrow>
        <h2 className="font-serif text-title font-light text-balance text-ink">{title}</h2>
        {blurb ? <p className="max-w-2xl text-[15px] leading-relaxed text-pretty text-ink-soft md:text-base">{blurb}</p> : null}
      </div>
      <div className="mt-10 md:mt-14">{children}</div>
    </section>
  )
}

/** The small grey label over a group of samples. */
export function GroupLabel({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("mb-4 text-[13px] leading-none text-muted", className)}>{children}</p>
}

/** A mono line for a value read off the page. */
export function Mono({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("font-mono text-[11px] leading-relaxed break-all text-muted tabular-nums", className)}>{children}</span>
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
        "relative grid size-11 cursor-pointer place-items-center border-l border-night-line text-night-muted transition-[color,background-color,transform] duration-(--duration-press) ease-out-strong hover:bg-night-raised hover:text-night-ink focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none active:scale-[0.97]",
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
          "absolute size-4 text-mint transition-[opacity,transform] duration-150 ease-out-strong",
          copied ? "scale-100 opacity-100" : "scale-50 opacity-0",
        )}
      />
    </button>
  )
}

/** A night code block with a copy cell, for a component's usage. */
export function CodeSnippet({ code }: { code: string }) {
  return (
    <div className="night flex items-stretch border border-night-line bg-night text-night-ink">
      <pre className="min-w-0 flex-1 overflow-x-auto p-4 font-mono text-[12px] leading-relaxed">
        <code>{code}</code>
      </pre>
      <CopyButton text={code} className="self-start border-b" />
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
  className,
}: {
  name: string
  source: string
  description: string
  code: string
  children: ReactNode
  tone?: "page" | "sage" | "night" | "panel"
  previewClassName?: string
  className?: string
}) {
  return (
    <article className={cn("flex min-w-0 flex-col border border-line bg-page", className)}>
      <header className="flex flex-col gap-2 border-b border-line px-5 py-5 md:px-7">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="font-serif text-[1.5rem] leading-tight font-light text-ink">{name}</h3>
          <Mono>{source}</Mono>
        </div>
        <p className="max-w-2xl text-[14px] leading-relaxed text-ink-soft">{description}</p>
      </header>
      <div
        className={cn(
          "min-w-0 flex-1 p-5 md:p-8",
          tone === "page" && "bg-page",
          tone === "panel" && "bg-panel",
          tone === "sage" && "bg-sage",
          tone === "night" && "night night-grid bg-night text-night-ink",
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
export function StateLabel({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn("flex min-w-0 flex-col items-start gap-2", className)}>
      {children}
      <Mono>{label}</Mono>
    </div>
  )
}

/** A heavy section shown in a fixed-height, scrollable frame. */
export function Frame({ children, height = "h-[560px]", note }: { children: ReactNode; height?: string; note?: string }) {
  return (
    <div className="flex flex-col gap-3">
      <div className={cn("overflow-y-auto overscroll-contain border border-line", height)} data-lenis-prevent>
        {children}
      </div>
      {note ? <p className="text-[12px] text-muted">{note}</p> : null}
    </div>
  )
}
