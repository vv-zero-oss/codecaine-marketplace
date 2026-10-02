import { Check, Copy } from "lucide-react"
import { useState } from "react"
import type * as React from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"

/** A chapter of the guide: an anchor, a title, a blurb and its content. */
export function GuideSection({ id, title, blurb, children }: { id: string; title: string; blurb: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-t-4 border-line py-phi-5 first:border-t-0 first:pt-0">
      <h2 className="font-display text-lg uppercase leading-tight sm:text-xl">{title}</h2>
      <p className="mt-phi-2 max-w-measure text-lg text-fg-muted">{blurb}</p>
      <div className="mt-phi-4 grid grid-cols-[minmax(0,1fr)] gap-phi-5">{children}</div>
    </section>
  )
}

export function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="font-mono text-xl uppercase tracking-widest text-accent-hi">{`> ${children}`}</h3>
}

/** One component, live, with the snippet that makes it. */
export function Specimen({ title, note, code, children, className }: { title: string; note?: string; code: string; children: React.ReactNode; className?: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    } catch {
      toast.error("Copy was blocked by the browser")
    }
  }
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-phi-2">
      <div className="flex items-center justify-between gap-phi-2">
        <div>
          <h4 className="font-display text-label uppercase">{title}</h4>
          {note ? <p className="mt-1.5 text-base text-fg-muted">{note}</p> : null}
        </div>
        <Button variant="ghost" size="sm" onClick={copy} aria-label={`Copy ${title} snippet`}>
          {copied ? <Check /> : <Copy />} {copied ? "Copied" : "Copy"}
        </Button>
      </div>
      <div className={className ?? "flex flex-wrap items-center gap-phi-2 bg-surface p-phi-3 shadow-px [--px-edge:var(--color-line)]"}>{children}</div>
      <pre className="overflow-x-auto bg-bg p-phi-2 font-mono text-lg leading-tight text-fg-muted shadow-px-sm [--px-edge:var(--color-line)]">
        <code>{code}</code>
      </pre>
    </div>
  )
}
