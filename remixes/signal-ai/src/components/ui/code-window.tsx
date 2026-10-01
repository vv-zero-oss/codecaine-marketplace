import { Check, Copy } from "lucide-react"
import { useEffect, useRef, useState, type ReactNode } from "react"

import { cn } from "@/lib/utils"

const TOKEN = /("[^"]*"|\b(?:import|from|const|await|print|let|curl)\b|\b(?:xai|text|client|response)\b)/g

/** A tiny highlighter: keywords, strings and the names that matter. Enough for a three-line example. */
export function highlight(line: string): ReactNode[] {
  return line.split(TOKEN).map((part, i) => {
    if (/^"/.test(part)) return <span key={i} className="text-code-str">{part}</span>
    if (/^(import|from|const|await|print|let|curl)$/.test(part)) return <span key={i} className="text-code-key">{part}</span>
    if (/^(xai|text|client|response)$/.test(part)) return <span key={i} className="text-code-var">{part}</span>
    return part
  })
}

/** A window with traffic lights, a Copy button that confirms, and code that stays selectable. */
export function CodeWindow({ code, className }: { code: string; className?: string }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
    } catch {
      return
    }
    setCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 1400)
  }
  return (
    <div className={cn("overflow-hidden rounded-xl bg-code-bg shadow-frame", className)}>
      <div className="flex items-center gap-1.5 border-b border-line px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <button
          type="button"
          onClick={copy}
          className="ml-auto inline-flex min-h-8 items-center gap-1.5 rounded-md px-2 text-[11px] text-ink-2 transition-[color,transform] hover:text-ink active:scale-95"
        >
          {copied ? <Check className="size-3 text-good" /> : <Copy className="size-3" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-4 font-mono text-[11.5px] leading-[1.75] text-code-ink sm:px-5">
        <code>{code.split("\n").map((line, i) => (
          <div key={i}>{highlight(line) || " "}</div>
        ))}</code>
      </pre>
    </div>
  )
}
