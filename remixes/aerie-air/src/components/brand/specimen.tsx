import { Check, Copy } from "lucide-react"
import { useEffect, useRef, useState, type ReactNode } from "react"

import { CornerLabels } from "@/components/blocks/corner-label"
import { cn } from "@/lib/utils"

/**
 * One chapter of the style guide: a corner label with its number, the
 * claim set loud in ink and its reason in a quieter grey, then what the
 * chapter covers. Ink on cream, so the floating header reads dark.
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
    <section id={id} data-chapter={id} data-header-tone="dark" className="scroll-mt-32 border-t border-line pt-10 pb-20 first:border-t-0 md:pb-32 lg:scroll-mt-20">
      <CornerLabels left={`${String(index).padStart(2, "0")} — ${title.replace(/\.$/, "")}`} right="Aerie brand guidelines" className="text-ink-3" />
      <h2 className="type-head mt-10 max-w-[16ch] text-display text-balance text-ink md:mt-16">
        {title}
        {continuation ? <span className="text-ink-3"> {continuation}</span> : null}
      </h2>
      {blurb ? <p className="mt-6 max-w-[52ch] text-lead text-ink-3">{blurb}</p> : null}
      <div className="mt-12 md:mt-16">{children}</div>
    </section>
  )
}

/** A small label over a group of samples, on a hairline. */
export function GroupLabel({ children, className }: { children: ReactNode; className?: string }) {
  return <h3 className={cn("mb-4 border-b border-line pb-2 text-micro text-ink-3", className)}>{children}</h3>
}

/** A raised cream card with the page's soft shadow. */
export function Panel({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("rounded-(--radius-card) bg-raised shadow-(--shadow-card)", className)}>{children}</div>
}

/** Copies a snippet, and says so for a moment: the icon cross-fades with a
 *  small scale and blur, so "copied" is felt as much as read. */
export function CopyButton({ text, className }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      /* blocked clipboard: still confirm the tap */
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
        "relative inline-flex h-9 items-center gap-1.5 rounded-full bg-dusk-2 px-3 text-micro text-dusk-muted transition-[background-color,color,transform] duration-(--duration-hover) ease-(--ease-out-strong) hover:text-dusk-fg focus-visible:ring-[3px] focus-visible:ring-sky/50 focus-visible:outline-none active:scale-[0.97] active:duration-(--duration-press)",
        className,
      )}
    >
      <span className="relative grid size-3.5 place-items-center">
        <Copy
          className={cn(
            "absolute size-3.5 transition-[opacity,transform,filter] duration-200 ease-(--ease-out-strong)",
            copied ? "scale-50 opacity-0 blur-[2px]" : "scale-100 opacity-100",
          )}
        />
        <Check
          className={cn(
            "absolute size-3.5 text-sky-200 transition-[opacity,transform,filter] duration-200 ease-(--ease-out-strong)",
            copied ? "scale-100 opacity-100" : "scale-50 opacity-0 blur-[2px]",
          )}
          strokeWidth={2.5}
        />
      </span>
      <span className="w-[46px] text-left">{copied ? "Copied" : "Copy"}</span>
    </button>
  )
}

/** A usage snippet on dusk, with a copy button. */
export function CodeSnippet({ code, className }: { code: string; className?: string }) {
  return (
    <div className={cn("relative border-t border-dusk-2 bg-dusk text-dusk-fg", className)}>
      <CopyButton text={code} className="absolute top-3 right-3" />
      <pre className="overflow-x-auto p-5 pt-16 font-mono sm:pt-5 sm:pr-28 text-[12.58px] leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  )
}

export type SpecimenTone = "page" | "panel" | "dusk" | "sky"

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
  tone?: SpecimenTone
  previewClassName?: string
}) {
  return (
    <article className="overflow-hidden rounded-(--radius-photo) bg-raised shadow-(--shadow-card)">
      <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-line px-5 py-5 sm:px-7">
        <h3 className="type-head text-h4 text-ink">{name}</h3>
        <code className="font-mono text-[11.5px] break-all text-ink-3">{source}</code>
        <div className="basis-full">
          <p className="mt-1 max-w-[68ch] text-body text-ink-2">{description}</p>
        </div>
      </header>
      <div
        className={cn(
          "p-5 sm:p-8",
          tone === "page" && "bg-page",
          tone === "panel" && "bg-panel",
          tone === "dusk" && "bg-dusk text-dusk-fg",
          tone === "sky" && "bg-sky text-on-sky",
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
  tone?: "page" | "dark"
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex min-w-0 flex-col items-start gap-2", className)}>
      {children}
      <span className={cn("font-mono text-[11px]", tone === "dark" ? "text-dusk-muted" : "text-ink-3")}>{label}</span>
    </div>
  )
}

/** A round play/replay button for motion samples. */
export function ReplayButton({ onClick, label, className }: { onClick: () => void; label: string; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "grid size-11 shrink-0 place-items-center rounded-full bg-ink text-page shadow-(--shadow-button) transition-[background-color,transform] duration-(--duration-hover) ease-(--ease-out-strong) hover:bg-ink-2 focus-visible:ring-[3px] focus-visible:ring-sky/35 focus-visible:outline-none active:scale-[0.94] active:duration-(--duration-press)",
        className,
      )}
    >
      <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
        <path d="M5 3.5v9l7.5-4.5z" fill="currentColor" />
      </svg>
    </button>
  )
}
