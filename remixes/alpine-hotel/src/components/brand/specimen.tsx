import { Check, Copy } from "lucide-react"
import { useEffect, useRef, useState, type ReactNode } from "react"

import { Chapter } from "@/components/ui/chapter"
import { cn } from "@/lib/utils"

/** One chapter of the style guide, headed the way every chapter of the guide
 *  itself is: a numbered label on a rule, the title in the serif. */
export function GuideSection({
  id,
  number,
  label,
  title,
  lede,
  children,
}: {
  id: string
  number: string
  label: string
  title: string
  lede?: string
  children: ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-24 pb-(--spacing-section)">
      <Chapter number={number} label={label} title={title} lede={lede} />
      <div className="mt-12">{children}</div>
    </section>
  )
}

/** A printed label over a group of samples. */
export function GroupLabel({ children, className }: { children: ReactNode; className?: string }) {
  return <h3 className={cn("label mb-4 border-b border-rule pb-2 text-ink-faint", className)}>{children}</h3>
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
        "relative inline-flex size-9 items-center justify-center rounded-control text-pine-ink/60 transition-[background-color,color,transform] duration-(--duration-press) ease-(--ease-out) outline-none hover:bg-pine-ink/10 hover:text-pine-ink focus-visible:ring-[3px] focus-visible:ring-signal/35 active:scale-[0.97]",
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
          "absolute size-4 text-pine-ink transition-[opacity,transform] duration-150 ease-(--ease-out)",
          copied ? "scale-100 opacity-100" : "scale-50 opacity-0",
        )}
      />
    </button>
  )
}

/** A code block, printed white on the pine sheet, with a copy button. */
export function CodeSnippet({ code }: { code: string }) {
  return (
    <div className="relative rounded-print bg-pine text-pine-ink">
      <CopyButton text={code} className="absolute top-2 right-2" />
      <pre className="overflow-x-auto p-4 pr-14 font-mono text-[12px] leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  )
}

/** A live component on a sheet, its states side by side, and how to use it. */
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
  /** No clipping — for a piece pinned with `sticky`, which an
   *  `overflow: hidden` ancestor would stop from pinning. */
  bleed?: boolean
}) {
  return (
    <article className={cn("rounded-print bg-sheet shadow-(--shadow-sheet)", !bleed && "overflow-hidden")}>
      <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b-2 border-ink px-5 py-4 sm:px-8">
        <h3 className="font-serif text-2xl leading-tight">{name}</h3>
        <code className="label break-all text-ink-faint normal-case">{source}</code>
        <p className="mt-1 basis-full text-[15px] leading-relaxed text-ink-soft">
          <span className="block max-w-[72ch]">{description}</span>
        </p>
      </header>
      <div className={cn("bg-paper p-5 sm:p-8", previewClassName)}>{children}</div>
      <div className="border-t border-rule p-3">
        <CodeSnippet code={code} />
      </div>
    </article>
  )
}

/** A state's name under the thing in that state, as a figure caption. */
export function StateLabel({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col items-start gap-2", className)}>
      {children}
      <span className="label text-[10px] text-ink-faint">{label}</span>
    </div>
  )
}
