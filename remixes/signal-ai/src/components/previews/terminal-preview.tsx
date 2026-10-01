import { useEffect, useState } from "react"
import { useReducedMotion } from "motion/react"

import { ChatLoop } from "@/components/motion/chat-loop"
import { cn } from "@/lib/utils"

type Line = { kind: "tool" | "task" | "think" | "code" | "add" | "del" | "prompt"; text: string; dim?: string; n?: number }

const LINES: Line[] = [
  { kind: "prompt", text: "Add rate limiting to all API routes." },
  { kind: "think", text: "Thinking..." },
  { kind: "tool", text: "grep", dim: '"rateLimit" src/  no matches' },
  { kind: "tool", text: "read_file", dim: "src/api/routes.ts  42 lines" },
  { kind: "task", text: "Scan route handlers", dim: "explore" },
  { kind: "think", text: "Thought for 2.8s" },
  { kind: "tool", text: "Edit", dim: "src/api/routes.ts" },
  { kind: "code", text: "export async function handler(req) {", n: 42 },
  { kind: "add", text: "  const token = extractBearer(req);", n: 43 },
  { kind: "code", text: "  if (!token) return unauthorized();", n: 44 },
  { kind: "del", text: "  const session = getSession(req);", n: 47 },
  { kind: "add", text: "  req.user = payload;", n: 48 },
]

/** The coding agent's terminal: a run that streams upward, with a progress readout in the title bar. */
export function TerminalPreview({ duration = 22, className }: { duration?: number; className?: string }) {
  const reduced = useReducedMotion()
  const [pct, setPct] = useState(12.65)
  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => setPct((p) => (p >= 99 ? 12.65 : +(p + 0.1).toFixed(2))), 200)
    return () => window.clearInterval(id)
  }, [reduced])

  return (
    <div className={cn("flex h-full flex-col bg-terminal font-mono text-[10px] leading-[1.7] text-terminal-ink", className)}>
      <div className="flex items-center gap-1.5 px-3 pt-2.5 pb-2">
        <span className="size-2 bg-[#ff5f57]" />
        <span className="size-2 bg-[#febc2e]" />
        <span className="size-2 bg-[#28c840]" />
        <span className="ml-5 text-terminal-dim">projects/main</span>
        <span className="ml-auto flex items-center gap-1.5 text-terminal-dim tabular-nums">
          <span className="h-1.5 w-6 overflow-hidden bg-white/10">
            <span className="block h-full bg-white/80 transition-[width] duration-200 ease-linear" style={{ width: `${pct}%` }} />
          </span>
          {pct.toFixed(2)}%
        </span>
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden px-3">
        <ChatLoop duration={duration} className="gap-0">
          {LINES.map((l, i) => (
            <div
              key={i}
              className={cn(
                "-mx-3 flex gap-2 px-3 whitespace-pre",
                l.kind === "add" && "bg-diff-add",
                l.kind === "del" && "bg-diff-del",
                l.kind === "prompt" && "bg-white/[0.06] py-1",
              )}
            >
              {l.n ? <span className="w-4 text-terminal-dim">{l.n}</span> : null}
              {l.kind === "prompt" && <span className="text-sky-300">❯</span>}
              {l.kind === "tool" && <span className="text-emerald-400">▸ {l.text}</span>}
              {l.kind === "task" && <span>| {l.text}</span>}
              {l.kind === "think" && <span className="text-terminal-dim">◆ {l.text}</span>}
              {(l.kind === "code" || l.kind === "add" || l.kind === "del" || l.kind === "prompt") && <span>{l.text}</span>}
              {l.dim && <span className="text-terminal-dim">{l.dim}</span>}
            </div>
          ))}
        </ChatLoop>
      </div>
    </div>
  )
}
