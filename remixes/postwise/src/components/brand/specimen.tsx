import { Check, Copy } from "lucide-react"
import { useEffect, useRef, useState, type ReactNode } from "react"

import { cn } from "@/lib/utils"

/** One chapter of the style guide: an anchor, a light display title and what it covers. */
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
    <section id={id} className="scroll-mt-24 border-t border-line py-14 first:border-t-0 first:pt-0 md:py-20">
      <p className="font-mono text-[12px] tracking-[0.06em] text-ink-subtle uppercase">{String(index).padStart(2, "0")}</p>
      <h2 className="type-display mt-2 text-[clamp(30px,3.4vw,42px)] text-balance text-ink">{title}</h2>
      {blurb ? <p className="mt-3 max-w-[560px] text-[15px] leading-[1.55] text-ink-muted">{blurb}</p> : null}
      <div className="mt-10">{children}</div>
    </section>
  )
}

/** A small mono label over a group of samples. */
export function GroupLabel({ children }: { children: ReactNode }) {
  return <h3 className="mb-3 font-mono text-[11.5px] tracking-[0.06em] text-ink-subtle uppercase">{children}</h3>
}

/** A white card on paper, the surface most samples sit on. */
export function Panel({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("rounded-[var(--radius-panel)] border border-line bg-card shadow-(--shadow-card)", className)}>{children}</div>
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
        "relative inline-flex size-9 items-center justify-center rounded-[var(--radius-field)] text-night-muted transition-[background-color,color,transform] duration-(--duration-hover) ease-(--ease-out-quint) hover:bg-night-raised hover:text-night-fg focus-visible:ring-[3px] focus-visible:ring-night-subtle/60 focus-visible:outline-none active:scale-[0.97] active:duration-(--duration-press)",
        className,
      )}
    >
      <Copy
        className={cn(
          "absolute size-4 transition-[opacity,transform] duration-150 ease-(--ease-out-quint)",
          copied ? "scale-50 opacity-0" : "scale-100 opacity-100",
        )}
      />
      <Check
        className={cn(
          "absolute size-4 text-go transition-[opacity,transform] duration-150 ease-(--ease-out-quint)",
          copied ? "scale-100 opacity-100" : "scale-50 opacity-0",
        )}
      />
    </button>
  )
}

/** A code block on lagoon, with a copy button — a component's usage. */
export function CodeSnippet({ code }: { code: string }) {
  return (
    <div className="relative rounded-[var(--radius-card)] bg-night text-night-fg">
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
  tone = "paper",
  previewClassName,
}: {
  name: string
  source: string
  description: string
  code: string
  children: ReactNode
  tone?: "paper" | "night" | "card"
  previewClassName?: string
}) {
  return (
    <article className="overflow-hidden rounded-[var(--radius-panel)] border border-line bg-card shadow-(--shadow-card)">
      <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-line px-5 py-4 sm:px-6">
        <h3 className="text-[17px] font-medium tracking-[-0.01em] text-ink">{name}</h3>
        <code className="font-mono text-[11.5px] break-all text-ink-subtle">{source}</code>
        <p className="w-full text-[14px] leading-[1.5] text-ink-muted">{description}</p>
      </header>
      <div
        className={cn(
          "p-5 sm:p-8",
          tone === "paper" && "bg-paper",
          tone === "card" && "bg-card",
          tone === "night" && "bg-night text-night-fg",
          previewClassName,
        )}
      >
        {children}
      </div>
      <div className="border-t border-line p-3">
        <CodeSnippet code={code} />
      </div>
    </article>
  )
}

/** A state's name under the thing in that state. */
export function StateLabel({ label, tone = "paper", children, className }: { label: string; tone?: "paper" | "night"; children: ReactNode; className?: string }) {
  return (
    <div className={cn("flex min-w-0 flex-col items-start gap-2", className)}>
      {children}
      <span className={cn("font-mono text-[11px]", tone === "night" ? "text-night-subtle" : "text-ink-subtle")}>{label}</span>
    </div>
  )
}
