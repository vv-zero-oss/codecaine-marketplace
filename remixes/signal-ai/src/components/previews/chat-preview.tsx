import { ChatLoop } from "@/components/motion/chat-loop"
import { cn } from "@/lib/utils"

const THREAD = [
  { from: "user", text: "Explain quantum entanglement simply" },
  { from: "ai", text: "Two particles become linked — measuring one instantly determines the other, regardless of distance." },
  { from: "user", text: "Why is the sky blue?" },
  { from: "ai", text: "Shorter blue wavelengths scatter more off air molecules than longer red ones." },
  { from: "user", text: "How do black holes form?" },
  { from: "ai", text: "A massive star exhausts its fuel and gravity collapses the core into a singularity." },
  { from: "user", text: "What causes aurora borealis?" },
  { from: "ai", text: "Solar particles hit atmospheric gases near the poles, exciting them to glow." },
] as const

/** A conversation that scrolls on its own: the question, then the answer. */
export function ChatPreview({ duration = 28, className }: { duration?: number; className?: string }) {
  return (
    <ChatLoop duration={duration} className={className}>
      {THREAD.map((m, i) => (
        <p
          key={i}
          className={cn(
            "max-w-[86%] px-3 py-2 text-[11px] leading-[1.45] tracking-[-0.005em]",
            m.from === "user"
              ? "self-end border border-line bg-bubble text-ink shadow-card"
              : "self-start border border-line bg-bubble text-ink-2 shadow-card",
          )}
        >
          {m.text}
        </p>
      ))}
    </ChatLoop>
  )
}
