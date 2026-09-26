import type * as React from "react"
import { useRef } from "react"
import { motion } from "motion/react"
import { X } from "lucide-react"

import { Beat, Board, Pill, Wire } from "@/components/ui/diagram"
import { Scene } from "@/components/ui/scene"
import { SceneHeadline } from "@/components/ui/scene-headline"
import { useSceneStep } from "@/hooks/use-scene-step"
import { useBoardScale } from "@/hooks/use-board-scale"
import { EASE_SWAP } from "@/lib/motion"
import { cn } from "@/lib/utils"

/*
 * Why this is different, as a diagram: the usual road from a canvas to code is
 * a chain of hand-offs, and each link is somewhere the design gets
 * re-interpreted. The scene draws the chain, crosses it out, and replaces it
 * with one wire both ways.
 */

const W = 1000
const H = 400

const LINES = [
  { line: "Other canvases draw a copy of your app" },
  { line: "Then hand it back through an export, a file or a plugin" },
  { line: "Codecaine skips the translation" },
  {
    line: "If it serves HTML on localhost, it frames",
    sub: "Vite, Next.js, Laravel: nothing to install in your project and nothing to export. Saved changes go into your real source.",
  },
]

const CHAIN = [
  { label: "EXPORT", x: 322, y: 118 },
  { label: "HANDOFF FILE", x: 440, y: 262 },
  { label: "PLUGIN / MCP", x: 600, y: 118 },
]

const STACKS = ["Vite", "Next.js", "Laravel", "Rails", "Django", "Astro", "SvelteKit"]

export function RealCode() {
  const ref = useRef<HTMLElement>(null)
  const { step } = useSceneStep(ref, 5)
  const { view, scale } = useBoardScale(W)
  const at = Math.min(step, 3)
  const direct = at >= 2

  return (
    <Scene ref={ref} beats={4.5} id="real-code" aria-label="No translation layer">
      <SceneHeadline id={at} sub={LINES[at].sub} size="lg">
        {LINES[at].line}
      </SceneHeadline>

      <Board width={W} height={H} scale={scale} top={view.width >= 1024 ? "34svh" : "40svh"}>
        {/* The design */}
        <Card x={40} title={direct ? "localhost:5173" : "Canvas copy"} tone={direct ? "live" : "copy"}>
          <div className="space-y-2 p-4">
            <span className="block h-2.5 w-2/3 rounded-full bg-ink/70" />
            <span className="block h-2 w-full rounded-full bg-ink/15" />
            <span className="block h-2 w-4/5 rounded-full bg-ink/15" />
            <span className={cn("mt-3 block h-6 w-20 rounded-pill", direct ? "bg-mint" : "bg-ink/25")} />
          </div>
        </Card>

        {/* Your code */}
        <Card x={740} title="src/components/hero.tsx" tone="code">
          <div className="space-y-1.5 p-4 font-mono text-[10.5px] leading-4 text-ink-muted">
            <p>{"<section className=…>"}</p>
            <p className="pl-3">{"<h1>Plan the week…</h1>"}</p>
            <motion.p
              className="-mx-1 rounded-[3px] px-1 pl-4"
              initial={false}
              animate={{ backgroundColor: direct ? "color-mix(in srgb, var(--color-mint) 22%, transparent)" : "color-mix(in srgb, var(--color-mint) 0%, transparent)" }}
              transition={{ duration: 0.4, delay: direct ? 0.6 : 0 }}
            >
              {direct ? "<Button tone=\"mint\">" : "<Button>"}
            </motion.p>
            <p>{"</section>"}</p>
          </div>
        </Card>

        {/* The chain of hand-offs */}
        <Beat when={at <= 1}>
          <Wire width={W} height={H} dashed d="M260 200 C292 200 290 128 322 128" className="stroke-ink/35" />
          <Wire width={W} height={H} dashed delay={0.1} d="M388 128 C420 128 408 272 440 272" className="stroke-ink/35" />
          <Wire width={W} height={H} dashed delay={0.2} d="M546 272 C576 272 568 128 600 128" className="stroke-ink/35" />
          <Wire width={W} height={H} dashed delay={0.3} d="M706 128 C726 128 720 200 740 200" className="stroke-ink/35" />
          {CHAIN.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, transform: "translateY(8px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.08, ease: EASE_SWAP }}
            >
              <Pill className="border-ink/30 bg-surface text-ink-muted" style={{ left: c.x, top: c.y }}>
                {c.label}
              </Pill>
              {at === 1 && (
                <motion.span
                  className="absolute grid size-6 place-items-center rounded-pill bg-danger text-on-accent"
                  style={{ left: c.x + 44, top: c.y - 22 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25, delay: 0.1 + i * 0.12, ease: EASE_SWAP }}
                >
                  <X className="size-3.5" strokeWidth={2.5} />
                </motion.span>
              )}
            </motion.div>
          ))}
        </Beat>

        {/* One wire, both ways */}
        <Beat when={direct}>
          <Wire width={W} height={H} d="M262 186 H736" className="stroke-signal" />
          <Wire width={W} height={H} delay={0.15} d="M738 214 H264" className="stroke-mint-deep" />
          <svg className="absolute inset-0 overflow-visible" width={W} height={H} aria-hidden>
            <path d="M728 180 736 186 728 192" fill="none" strokeWidth={1.5} className="stroke-signal" />
            <path d="M272 208 264 214 272 220" fill="none" strokeWidth={1.5} className="stroke-mint-deep" />
          </svg>
          <Pill className="border-signal bg-surface text-signal" style={{ left: 440, top: 150 }}>
            DESIGN EDITS
          </Pill>
          <Pill className="border-mint-deep bg-surface text-mint-deep" style={{ left: 442, top: 230 }}>
            SAVED TO SOURCE
          </Pill>
        </Beat>

        <Beat when={at === 3}>
          <ul className="absolute top-[330px] left-0 flex w-full flex-wrap justify-center gap-2">
            {STACKS.map((name, i) => (
              <motion.li
                key={name}
                className="rounded-pill border border-ink/15 bg-surface px-3.5 py-1.5 text-[14px] font-medium shadow-chip"
                initial={{ opacity: 0, transform: "translateY(10px)" }}
                animate={{ opacity: 1, transform: "translateY(0px)" }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.05, ease: EASE_SWAP }}
              >
                {name}
              </motion.li>
            ))}
          </ul>
        </Beat>
      </Board>
    </Scene>
  )
}

function Card({
  x,
  title,
  tone,
  children,
}: {
  x: number
  title: string
  tone: "copy" | "live" | "code"
  children: React.ReactNode
}) {
  return (
    <div className="absolute top-[110px] w-[220px]" style={{ left: x }}>
      <p
        className={cn(
          "mb-1.5 font-mono text-[11px] transition-colors duration-300",
          tone === "live" ? "text-signal" : "text-ink-muted",
        )}
      >
        {title}
      </p>
      <div
        className={cn(
          "h-[140px] overflow-hidden rounded-[12px] bg-surface shadow-card transition-[box-shadow,opacity] duration-300",
          tone === "copy" && "opacity-80 [outline:1.5px_dashed_color-mix(in_srgb,var(--color-ink)_25%,transparent)]",
          tone === "live" && "[outline:1.5px_solid_var(--color-signal)]",
        )}
      >
        {children}
      </div>
    </div>
  )
}
