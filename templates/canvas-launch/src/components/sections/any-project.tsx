import { useRef } from "react"
import type * as React from "react"
import { motion, useTransform, type MotionValue } from "motion/react"

import { Scene } from "@/components/ui/scene"
import { SceneHeadline } from "@/components/ui/scene-headline"
import { useSceneStep } from "@/hooks/use-scene-step"
import { useViewport } from "@/hooks/use-viewport"
import { cn } from "@/lib/utils"

/*
 * Any project: eight running apps on eight stacks fly in from the edges and
 * settle into a board — scrubbed by the scroll, like the name tags. The
 * point is the spread: a WordPress blog next to a Spring admin next to a
 * Rails store, all framed the same way.
 */

type Project = { stack: string; logo: string; mono?: boolean; host: string; kind: "blog" | "dash" | "store" | "admin" | "docs" | "landing" }

const PROJECTS: Project[] = [
  { stack: "WordPress", logo: "wordpress.svg", host: "localhost:8080", kind: "blog", mono: true },
  { stack: "Laravel", logo: "laravel.svg", host: "localhost:8000", kind: "dash" },
  { stack: "Spring · Java", logo: "spring.svg", host: "localhost:8081", kind: "admin" },
  { stack: "Rails", logo: "ruby.svg", host: "localhost:3000", kind: "store" },
  { stack: "Django", logo: "django.svg", host: "localhost:8001", kind: "docs", mono: true },
  { stack: "PHP", logo: "php.svg", host: "localhost:8888", kind: "landing" },
  { stack: ".NET", logo: "dotnet.svg", host: "localhost:5000", kind: "dash" },
  { stack: "Shopify theme", logo: "shopify.svg", host: "127.0.0.1:9292", kind: "store" },
]

const LINES = [
  { line: "Bring any project" },
  { line: "WordPress, Laravel, Java. It doesn't matter." },
  {
    line: "If a browser can draw it, your board can hold it",
    sub: "Codecaine frames the page your dev server serves. Nothing to install in your project, nothing to convert.",
  },
]

export function AnyProject() {
  const ref = useRef<HTMLElement>(null)
  const { step, progress } = useSceneStep(ref, 4)
  const view = useViewport()
  const at = Math.min(step, 2)
  const wide = view.width >= 1024
  const cols = wide ? 4 : 2
  const cardW = wide ? Math.min(290, (view.width - 160) / 4) : (view.width - 44) / 2
  const cardH = cardW * 0.68
  const gap = wide ? 28 : 12
  const gridW = cols * cardW + (cols - 1) * gap
  const top = wide ? view.height * 0.42 : view.height * 0.36
  const shown = wide ? PROJECTS : PROJECTS.slice(0, 6)

  return (
    <Scene ref={ref} beats={4} id="any-project" aria-label="Any project">
      <SceneHeadline id={at} sub={LINES[at].sub} size="lg">
        {LINES[at].line}
      </SceneHeadline>
      {shown.map((p, i) => {
        const col = i % cols
        const row = Math.floor(i / cols)
        const to = { x: (view.width - gridW) / 2 + col * (cardW + gap), y: top + row * (cardH + gap + 22) }
        // Each one starts off a different edge, a screen away.
        const angle = (i / shown.length) * Math.PI * 2 + 0.4
        const from = { x: to.x + Math.cos(angle) * view.width * 0.7, y: to.y + Math.sin(angle) * view.height * 0.8 }
        return <FlyingFrame key={p.stack} project={p} from={from} to={to} w={cardW} h={cardH} progress={progress} delay={i * 0.025} />
      })}
    </Scene>
  )
}

function FlyingFrame({
  project,
  from,
  to,
  w,
  h,
  progress,
  delay,
}: {
  project: Project
  from: { x: number; y: number }
  to: { x: number; y: number }
  w: number
  h: number
  progress: MotionValue<number>
  delay: number
}) {
  const t = useTransform(progress, [0.03 + delay, 0.36 + delay], [0, 1], { clamp: true, ease: (v) => 1 - Math.pow(1 - v, 3) })
  const x = useTransform(t, (v) => from.x + (to.x - from.x) * v)
  const y = useTransform(t, (v) => from.y + (to.y - from.y) * v)
  const rotate = useTransform(t, [0, 1], [delay * 200 - 3, 0])
  return (
    <motion.div className="absolute top-0 left-0" style={{ x, y, rotate, width: w }}>
      <p className="mb-1.5 flex items-center gap-1.5 truncate text-[11px] font-medium text-ink-muted">
        <img src={`/logos/${project.logo}`} alt="" className={cn("size-3.5", project.mono && "dark:invert")} />
        {project.stack}
        <span className="font-mono text-ink-faint">· {project.host}</span>
      </p>
      <div className="overflow-hidden rounded-[10px] bg-site-bg shadow-card" style={{ height: h }}>
        <Sketch kind={project.kind} />
      </div>
    </motion.div>
  )
}

/** A running app's first screen, sketched: enough to tell a blog from a store. */
function Sketch({ kind }: { kind: Project["kind"] }): React.ReactNode {
  const bar = <div className="flex items-center justify-between border-b border-site-line px-3 py-2"><span className="h-1.5 w-10 rounded-full bg-site-ink/70" /><span className="flex gap-1.5">{[0, 1, 2].map((i) => <span key={i} className="h-1 w-5 rounded-full bg-site-ink/20" />)}</span></div>
  if (kind === "blog")
    return (
      <div className="h-full">
        {bar}
        <div className="space-y-1.5 p-3">
          <span className="block h-2.5 w-3/4 rounded-full bg-site-ink/80" />
          <span className="block h-1.5 w-full rounded-full bg-site-ink/15" />
          <span className="block h-1.5 w-5/6 rounded-full bg-site-ink/15" />
          <span className="mt-2 block h-12 rounded-[6px] bg-art-amber/60" />
        </div>
      </div>
    )
  if (kind === "dash")
    return (
      <div className="flex h-full">
        <div className="w-1/4 space-y-1.5 bg-site-card p-2">{[0, 1, 2, 3].map((i) => <span key={i} className="block h-1.5 rounded-full bg-site-ink/20" />)}</div>
        <div className="flex flex-1 items-end gap-1 p-3">{[40, 70, 50, 85, 60].map((v, i) => <span key={i} className="flex-1 rounded-t-[2px] bg-art-violet/60" style={{ height: `${v}%` }} />)}</div>
      </div>
    )
  if (kind === "store")
    return (
      <div className="h-full">
        {bar}
        <div className="grid grid-cols-3 gap-1.5 p-2.5">{["bg-art-coral/60", "bg-art-cyan/50", "bg-art-amber/60"].map((c) => <span key={c} className={cn("h-14 rounded-[5px]", c)} />)}</div>
      </div>
    )
  if (kind === "admin")
    return (
      <div className="h-full">
        {bar}
        <div className="space-y-1 p-2.5">{[0, 1, 2, 3, 4].map((i) => <div key={i} className="flex gap-2"><span className="h-3 flex-1 rounded-[2px] bg-site-card" /><span className="h-3 w-8 rounded-[2px] bg-mint/40" /></div>)}</div>
      </div>
    )
  if (kind === "docs")
    return (
      <div className="flex h-full">
        <div className="w-1/3 space-y-1.5 border-r border-site-line p-2.5">{[0, 1, 2, 3, 4].map((i) => <span key={i} className="block h-1.5 rounded-full bg-site-ink/20" />)}</div>
        <div className="flex-1 space-y-1.5 p-2.5"><span className="block h-2 w-2/3 rounded-full bg-site-ink/70" /><span className="block h-10 rounded-[4px] bg-art-bg" /></div>
      </div>
    )
  return (
    <div className="grid h-full place-items-center bg-art-bg">
      <span className="h-3 w-2/3 rounded-full bg-art-cream/80" />
    </div>
  )
}
