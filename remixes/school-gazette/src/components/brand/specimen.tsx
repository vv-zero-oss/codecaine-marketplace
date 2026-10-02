import { Check, Copy } from "lucide-react"
import { useEffect, useRef, useState, type ReactNode } from "react"

import { cn } from "@/lib/utils"

/** One chapter of the style guide: an anchor, a title and what it covers. */
export function GuideSection({ id, title, blurb, children }: { id: string; title: string; blurb?: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-6 border-t-4 border-double border-ink py-12 first:border-t-0 first:pt-0">
      <h2 className="display text-[clamp(2.2rem,5vw,3.6rem)]">{title}</h2>
      {blurb ? <p className="mt-3 max-w-2xl text-[1.05rem] leading-snug text-ink-soft">{blurb}</p> : null}
      <div className="mt-8">{children}</div>
    </section>
  )
}

export function GroupLabel({ children }: { children: string }) {
  return <h3 className="kicker mb-3 text-ink-soft">{children}</h3>
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
      className={cn("relative inline-flex size-11 items-center justify-center rounded-key text-paper-light/60 transition-[color,transform] hover:text-paper-light focus-visible:outline-2 focus-visible:outline-rust active:scale-95", className)}
    >
      <Copy className={cn("absolute size-4 transition-[opacity,transform] duration-150 ease-out", copied ? "scale-50 opacity-0" : "scale-100 opacity-100")} />
      <Check className={cn("absolute size-4 text-led-green transition-[opacity,transform] duration-150 ease-out", copied ? "scale-100 opacity-100" : "scale-50 opacity-0")} style={{ color: "var(--led-green)" }} />
    </button>
  )
}

export function CodeSnippet({ code }: { code: string }) {
  return (
    <div className="relative bg-ink text-paper-light">
      <CopyButton text={code} className="absolute top-1 right-1" />
      <pre className="overflow-x-auto p-4 pr-14 font-type text-[0.74rem] leading-relaxed"><code>{code}</code></pre>
    </div>
  )
}

/** A live component, its states side by side, and how to use it. */
export function ComponentSpecimen({ name, source, description, code, children, previewClassName }: { name: string; source: string; description: string; code: string; children: ReactNode; previewClassName?: string }) {
  return (
    <article className="overflow-hidden border-2 border-ink bg-paper-light shadow-card">
      <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b-2 border-ink px-5 py-4">
        <h3 className="font-condensed text-2xl uppercase">{name}</h3>
        <code className="font-type text-xs text-ink-faint">{source}</code>
        <p className="w-full text-[0.95rem] text-ink-soft">{description}</p>
      </header>
      <div className={cn("paper-sheet p-5 sm:p-8", previewClassName)}>{children}</div>
      <CodeSnippet code={code} />
    </article>
  )
}

export function StateLabel({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-2">
      {children}
      <span className="font-type text-[0.68rem] text-ink-faint">{label}</span>
    </div>
  )
}
