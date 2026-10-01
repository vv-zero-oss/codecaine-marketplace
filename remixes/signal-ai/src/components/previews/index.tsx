import { VoiceOrb } from "@/components/motion/voice-orb"
import { BotPreview } from "./bot-preview"
import { ChatPreview } from "./chat-preview"
import { ImaginePreview } from "./imagine-preview"
import { TerminalPreview } from "./terminal-preview"

export const PRODUCTS = [
  { key: "chat", name: "Chat", blurb: "Frontier reasoning with real-time knowledge and web search." },
  { key: "build", name: "Build", blurb: "Plan, edit, and ship code from your terminal with AI." },
  { key: "imagine", name: "Imagine", blurb: "Generate and edit images and video from text." },
  { key: "voice", name: "Voice", blurb: "Build voice agents with sub-second latency." },
  { key: "bot", name: "Bot", blurb: "A new kind of colleague with its own computer." },
] as const

export type ProductKey = (typeof PRODUCTS)[number]["key"]

/** The live picture for each product, used by the bento and by the Products menu. */
export function ProductPreview({ product }: { product: ProductKey }) {
  switch (product) {
    case "chat":
      return (
        <div className="h-full overflow-hidden px-5 pt-4">
          <ChatPreview />
        </div>
      )
    case "build":
      return <TerminalPreview />
    case "imagine":
      return <ImaginePreview />
    case "voice":
      return (
        <div className="grid h-full place-items-center">
          <VoiceOrb size={140} />
        </div>
      )
    case "bot":
      return <BotPreview />
  }
}
