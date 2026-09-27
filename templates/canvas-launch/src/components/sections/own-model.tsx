import { useRef } from "react"

import { ModelWall, type Ball } from "@/components/art/model-wall"
import { Scene } from "@/components/ui/scene"
import { SceneHeadline } from "@/components/ui/scene-headline"
import { useSceneStep } from "@/hooks/use-scene-step"

/*
 * Bring your own model: every model family bb can drive falls onto the floor
 * of the stage as a ball, under real gravity. The joke is the pile — there are
 * too many to care which one you use.
 */

const BALLS: Ball[] = [
  { name: "Claude", logo: "claude-ai-icon.svg", size: 170 },
  { name: "GPT", logo: "openai.svg", mono: true, size: 160 },
  { name: "Codex", logo: "codex_light.svg", mono: true, size: 130 },
  { name: "Gemini", logo: "gemini.svg", size: 150 },
  { name: "Grok", logo: "xai_light.svg", mono: true, size: 120 },
  { name: "Kimi", logo: "kimi-icon.svg", size: 115 },
  { name: "Qwen", logo: "qwen_light.svg", mono: true, size: 125 },
  { name: "DeepSeek", logo: "deepseek.svg", size: 140 },
  { name: "Mistral", logo: "mistral-ai_logo.svg", size: 120 },
  { name: "GLM", letter: "GLM", size: 105 },
  { name: "Cursor", logo: "cursor_light.svg", mono: true, size: 130 },
  { name: "OpenCode", logo: "opencode.svg", mono: true, size: 110 },
  { name: "Pi", letter: "π", size: 100 },
  { name: "Claude Opus", logo: "claude-ai-icon.svg", size: 120 },
  { name: "GPT mini", logo: "openai.svg", mono: true, size: 95 },
  { name: "Gemini Flash", logo: "gemini.svg", size: 100 },
]

const LINES = [
  { line: "Bring your own model" },
  { line: "Honestly, we don't care which" },
  {
    line: "You already pay for it. Why pay twice?",
    sub: "The assistant runs through bb on the CLI you're signed into: Claude Code, Codex, Cursor, OpenCode, Pi or any ACP agent. There is no AI add-on to buy.",
  },
]

export function OwnModel() {
  const ref = useRef<HTMLElement>(null)
  const { step } = useSceneStep(ref, 4)
  const at = Math.min(step, 2)

  return (
    <Scene ref={ref} beats={4} id="models" aria-label="Bring your own model">
      <p className="sr-only">Models: {BALLS.map((b) => b.name).join(", ")}.</p>
      <ModelWall balls={BALLS} drop={step >= 1} />
      <SceneHeadline id={at} sub={LINES[at].sub} size={at === 0 ? "xl" : "lg"} className="top-[18svh]">
        {LINES[at].line}
      </SceneHeadline>
    </Scene>
  )
}
