import { useRef } from "react"
import { motion } from "motion/react"
import { Diamond, Terminal } from "lucide-react"

import { Beat, Board } from "@/components/ui/diagram"
import { Scene } from "@/components/ui/scene"
import { Typed } from "@/components/ui/typed"
import { SceneHeadline } from "@/components/ui/scene-headline"
import { useSceneStep } from "@/hooks/use-scene-step"
import { useBoardScale } from "@/hooks/use-board-scale"
import { EASE_SWAP } from "@/lib/motion"
import { cn } from "@/lib/utils"

/*
 * Control, three ways: the board as an API the assistant calls (and the frame
 * beside the code changing as each line lands), the variables you already
 * write in CSS, and WebMCP for handing the board to another agent.
 */

const W = 1000
const H = 430

const LINES = [
  { line: "Everything on the board is an API", sub: "300+ methods on window.canvas, and 25 tools your assistant calls to read, build and restyle the board." },
  { line: "With the controls you already know", sub: "Variables are plain CSS custom properties, read from your own theme files and Tailwind @theme." },
  { line: "Or hand the whole board to another agent", sub: "WebMCP serves the board to any MCP client on your machine: 29 tools, localhost only." },
]

const CODE = [
  { text: 'canvas.find("Hero")', at: 0.2 },
  { text: '  .setStyle({ gap: "var(--space-6)" })', at: 0.7 },
  { text: '  .setText("Ship the real thing")', at: 1.4 },
]

const VARIABLES = [
  { name: "--brand", light: "3576FF", dark: "4C8DFF", swatch: ["bg-swatch-brand", "bg-swatch-brand-dark"] },
  { name: "--paper", light: "F4F4F4", dark: "0E0E10", swatch: ["bg-swatch-paper", "bg-swatch-paper-dark"] },
  { name: "--radius-md", light: "8px", dark: "8px" },
  { name: "--space-6", light: "24px", dark: "24px", bound: true },
]

const TOOLS = ["get-document", "find-layers", "create-layer", "update-layer", "paste-html", "export-html", "observe-page"]

export function FullControl() {
  const ref = useRef<HTMLElement>(null)
  const { step } = useSceneStep(ref, 4)
  const { view, scale } = useBoardScale(W)
  const at = Math.min(step, 2)

  return (
    <Scene ref={ref} beats={3.6} id="control" aria-label="Full control">
      <SceneHeadline id={at} sub={LINES[at].sub}>
        {LINES[at].line}
      </SceneHeadline>

      <Board width={W} height={H} scale={scale} top={view.width >= 1024 ? "38svh" : "46svh"}>
        <Beat when={at === 0}>
          <div className="absolute top-8 left-[30px] w-[480px] rounded-card bg-ed-bar p-6 font-mono text-[15px] leading-8 text-ed-bar-ink shadow-card">
            {CODE.map((line) => (
              <Typed as="p" key={line.text} text={line.text} delay={line.at} speed={0.016} />
            ))}
          </div>
          <div className="absolute top-2 left-[560px] w-[410px]">
            <p className="mb-1.5 text-[11px] font-medium text-ink-muted">Hero</p>
            <motion.div
              className="flex flex-col rounded-[12px] bg-surface p-6 shadow-card outline-[1.5px] outline-ed-accent outline-solid"
              initial={{ gap: 8 }}
              animate={{ gap: 24 }}
              transition={{ duration: 0.4, delay: 1.2, ease: EASE_SWAP }}
            >
              <span className="block h-2 w-16 rounded-full bg-ai/60" />
              <Swapping from="Plan the week your team keeps" to="Ship the real thing" delay={2.1} />
              <span className="block h-2 w-4/5 rounded-full bg-ink/12" />
              <span className="block h-8 w-28 rounded-pill bg-ink" />
            </motion.div>
          </div>
        </Beat>

        <Beat when={at === 1}>
          <div className="absolute top-4 left-1/2 w-[640px] -translate-x-1/2 overflow-hidden rounded-[12px] bg-ed-panel text-ed-text shadow-window">
            <div className="flex h-10 items-center justify-between border-b border-ed-line px-4 text-[12px] font-medium">
              <span className="flex items-center gap-2">
                <Diamond className="size-3.5 text-ed-text-2" strokeWidth={1.75} /> Variables
              </span>
              <span className="font-mono text-[11px] text-ed-text-3">src/index.css</span>
            </div>
            <div className="grid grid-cols-[1.4fr_1fr_1fr] border-b border-ed-line px-4 py-2 text-[11px] text-ed-text-2">
              <span>Name</span>
              <span>Default</span>
              <span>Dark</span>
            </div>
            {VARIABLES.map((v, i) => (
              <motion.div
                key={v.name}
                className={cn("grid h-11 grid-cols-[1.4fr_1fr_1fr] items-center px-4 font-mono text-[13px]", v.bound && "bg-ed-selected")}
                initial={{ opacity: 0, transform: "translateY(6px)" }}
                animate={{ opacity: 1, transform: "translateY(0px)" }}
                transition={{ duration: 0.35, delay: 0.1 + i * 0.05, ease: EASE_SWAP }}
              >
                <span>{v.name}</span>
                {[v.light, v.dark].map((value, k) => (
                  <span key={k} className="flex items-center gap-2">
                    {v.swatch && <span className={cn("size-3.5 rounded-[3px] ring-1 ring-ed-swatch-ring", v.swatch[k])} />}
                    {value}
                  </span>
                ))}
              </motion.div>
            ))}
          </div>
          <motion.div
            className="absolute top-[292px] left-1/2 flex h-10 w-[300px] -translate-x-1/2 items-center gap-2 rounded-[8px] bg-ed-panel px-3 text-[13px] text-ed-text shadow-card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, delay: 0.45 }}
          >
            <span className="text-ed-text-2">Gap</span>
            <span className="ml-auto flex items-center gap-1.5 rounded-[5px] bg-ed-selected px-2 py-0.5 text-ed-accent">
              <Diamond className="size-3 fill-current" strokeWidth={0} /> space-6
            </span>
          </motion.div>
        </Beat>

        <Beat when={at === 2}>
          <div className="absolute top-6 left-1/2 w-[700px] -translate-x-1/2 rounded-card bg-ed-bar p-6 font-mono text-[14px] leading-7 text-ed-bar-ink shadow-card">
            <p className="mb-2 flex items-center gap-2 text-ed-bar-ink/60">
              <Terminal className="size-4" strokeWidth={1.75} /> any MCP client
            </p>
            <Typed as="p" text={"$ claude mcp add --transport http canvas \\"} delay={0.2} speed={0.016} />
            <Typed as="p" text={"    http://127.0.0.1:7317/mcp"} delay={0.9} speed={0.016} />
          </div>
          <ul className="absolute top-[220px] left-0 flex w-full flex-wrap justify-center gap-2 px-10">
            {[...TOOLS, "+22 more"].map((tool, i) => (
              <motion.li
                key={tool}
                className="rounded-pill border border-ink/12 bg-surface px-3 py-1 font-mono text-[12.5px] shadow-chip"
                initial={{ opacity: 0, transform: "translateY(8px)" }}
                animate={{ opacity: 1, transform: "translateY(0px)" }}
                transition={{ duration: 0.35, delay: 1.3 + i * 0.05, ease: EASE_SWAP }}
              >
                {tool}
              </motion.li>
            ))}
          </ul>
        </Beat>
      </Board>
    </Scene>
  )
}


/** The frame's heading changing as the API call that changes it finishes. */
function Swapping({ from, to, delay }: { from: string; to: string; delay: number }) {
  return (
    <span className="grid text-[26px] leading-tight font-semibold tracking-[-0.03em]">
      <motion.span
        className="[grid-area:1/1]"
        initial={{ opacity: 1, filter: "blur(0px)" }}
        animate={{ opacity: 0, filter: "blur(6px)" }}
        transition={{ duration: 0.3, delay }}
      >
        {from}
      </motion.span>
      <motion.span
        className="[grid-area:1/1]"
        initial={{ opacity: 0, filter: "blur(6px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.3, delay: delay + 0.1 }}
      >
        {to}
      </motion.span>
    </span>
  )
}
