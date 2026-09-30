import { Check, Copy } from "lucide-react"
import { useEffect, useRef, useState, type ReactNode } from "react"

import { cn } from "@/lib/utils"

/** One chapter of the style guide: an anchor, a number, a title in the scene
 *  voice and what it covers. */
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
    <section id={id} className="scroll-mt-[calc(var(--spacing-nav)+24px)] border-t border-hairline py-16 first:border-t-0 first:pt-0 sm:py-20">
      <p className="text-nav font-medium text-mist tabular-nums">0{index}</p>
      <h2 className="mt-2 text-scene font-medium tracking-scene text-balance">{title}</h2>
      {blurb ? <p className="mt-3 max-w-[60ch] text-body text-ink-soft">{blurb}</p> : null}
      <div className="mt-10">{children}</div>
    </section>
  )
}

/** A quiet label over a group of samples. */
export function GroupLabel({ children }: { children: ReactNode }) {
  return <h3 className="mb-3 text-nav font-medium text-mist">{children}</h3>
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
        "relative inline-flex size-9 items-center justify-center rounded-pill text-mist transition-[background-color,color,transform] duration-(--duration-press) ease-out-strong hover:bg-night-field hover:text-on-night focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none active:scale-[0.97]",
        className,
      )}
    >
      <Copy
        className={cn(
          "absolute size-4 transition-[opacity,transform,filter] duration-(--duration-hover) ease-out-strong",
          copied ? "scale-50 opacity-0 blur-[2px]" : "scale-100 opacity-100 blur-0",
        )}
      />
      <Check
        className={cn(
          "absolute size-4 text-live transition-[opacity,transform,filter] duration-(--duration-hover) ease-out-strong",
          copied ? "scale-100 opacity-100 blur-0" : "scale-50 opacity-0 blur-[2px]",
        )}
      />
    </button>
  )
}

/** A code block on the night surface, with a copy button. */
export function CodeSnippet({ code }: { code: string }) {
  return (
    <div className="relative rounded-frame bg-night text-on-night">
      <CopyButton text={code} className="absolute top-2 right-2" />
      <pre className="overflow-x-auto p-4 pr-14 font-mono text-[12px] leading-relaxed">
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
  bleed = false,
}: {
  name: string
  source: string
  description: ReactNode
  code: string
  children: ReactNode
  previewClassName?: string
  /** Let the preview overflow the card — for a piece pinned with `sticky`,
   *  which an `overflow: hidden` ancestor would stop from pinning. */
  bleed?: boolean
}) {
  return (
    <article className={cn("rounded-card bg-paper shadow-card", !bleed && "overflow-hidden")}>
      <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-5 py-4 sm:px-6">
        <h3 className="text-[17px] font-medium tracking-[-0.02em]">{name}</h3>
        <code className="font-mono text-[11px] break-all text-mist">{source}</code>
        <p className="w-full text-[14px] leading-relaxed text-ink-soft">{description}</p>
      </header>
      <div className={cn("border-y border-hairline bg-mauve-50/60 p-5 sm:p-8", previewClassName)}>{children}</div>
      <div className="p-3">
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
      <span className="font-mono text-[11px] text-mist">{label}</span>
    </div>
  )
}

/** Remounts what it holds on press, so a one-shot animation plays again. */
export function Replay({ children, label = "Replay", className }: { children: (key: number) => ReactNode; label?: string; className?: string }) {
  const [key, setKey] = useState(0)
  return (
    <div className={cn("flex flex-col items-start gap-4", className)}>
      {children(key)}
      <button
        type="button"
        onClick={() => setKey((k) => k + 1)}
        className="inline-flex h-9 items-center rounded-pill bg-paper px-4 text-[13px] font-medium shadow-chip transition-transform duration-(--duration-press) ease-out-strong focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none active:scale-[0.97]"
      >
        {label}
      </button>
    </div>
  )
}
