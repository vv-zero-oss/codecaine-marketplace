import { Check, Copy } from "lucide-react"
import { useEffect, useRef, useState, type ReactNode } from "react"

import { cn } from "@/lib/utils"

export function GuideSection({ id, title, blurb, children }: { id: string; title: string; blurb?: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-line py-14 first:border-t-0 first:pt-0">
      <h2 className="text-[26px] tracking-[-0.04em]">{title}</h2>
      {blurb ? <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-ink-2">{blurb}</p> : null}
      <div className="mt-8 space-y-10">{children}</div>
    </section>
  )
}

export function GroupLabel({ children }: { children: string }) {
  return <h3 className="mb-3 text-[11px] tracking-widest text-ink-3 uppercase">{children}</h3>
}

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
      className={cn("relative inline-flex size-9 items-center justify-center text-terminal-dim transition-[color,transform] hover:text-white active:scale-95", className)}
    >
      <Copy className={cn("absolute size-4 transition-[opacity,transform] duration-150", copied ? "scale-50 opacity-0" : "opacity-100")} />
      <Check className={cn("absolute size-4 text-good transition-[opacity,transform] duration-150", copied ? "opacity-100" : "scale-50 opacity-0")} />
    </button>
  )
}

export function CodeSnippet({ code }: { code: string }) {
  return (
    <div className="relative bg-terminal text-terminal-ink">
      <CopyButton text={code} className="absolute top-2 right-2" />
      <pre className="overflow-x-auto p-4 pr-14 font-mono text-[11px] leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  )
}

/** A live component, its states side by side, and how to use it. */
export function ComponentSpecimen({ name, source, description, code, children, previewClassName }: { name: string; source: string; description: string; code: string; children: ReactNode; previewClassName?: string }) {
  return (
    <article className="overflow-hidden border border-line bg-paper">
      <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-line px-5 py-4">
        <h3 className="text-[15px] font-medium tracking-[-0.02em]">{name}</h3>
        <code className="font-mono text-[11px] text-ink-3">{source}</code>
        <p className="w-full text-[13px] text-ink-2">{description}</p>
      </header>
      <div className={cn("bg-surface p-5 sm:p-8", previewClassName)}>{children}</div>
      <div className="border-t border-line p-3">
        <CodeSnippet code={code} />
      </div>
    </article>
  )
}

export function StateLabel({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-2">
      {children}
      <span className="font-mono text-[10px] text-ink-3">{label}</span>
    </div>
  )
}
