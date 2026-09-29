import { useEffect, useState } from "react"
import {
  ArrowUp,
  Bell,
  Building2,
  CalendarDays,
  ChevronDown,
  CircleCheck,
  FileText,
  Handshake,
  Home,
  ListChecks,
  Mic,
  PanelLeft,
  Phone,
  Search,
  Settings2,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"

import { Shimmer } from "@/components/atoms/Shimmer"
import { BorderBeam } from "@/components/ui/border-beam"
import { HERO_APP } from "@/content/home"
import { EASE } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { photo } from "@/photos"
import { Avatar, CompanyMark, Kbd, Window } from "./kit"

type Scene = "home" | "typing" | "thinking" | "answer"
const ORDER: Scene[] = ["home", "typing", "thinking", "answer"]
/** How long each scene holds, in seconds. Typing lasts as long as the text takes. */
const HOLD: Record<Scene, number> = { home: 1.6, typing: 0, thinking: 1.8, answer: 6 }

function Sidebar() {
  const nav = [
    { icon: Home, label: "Home", active: true },
    { icon: Bell, label: "Notifications" },
    { icon: ListChecks, label: "Tasks" },
    { icon: FileText, label: "Notes" },
    { icon: Phone, label: "Calls" },
    { icon: Workflow, label: "Automations" },
  ]
  const records = [
    { icon: Building2, label: "Companies", tone: "text-accent" },
    { icon: Users, label: "People", tone: "text-orange" },
    { icon: Handshake, label: "Deals", tone: "text-green" },
  ]
  return (
    <aside className="flex w-[220px] shrink-0 flex-col gap-3 border-r border-line bg-inset px-2.5 py-2.5">
      <div className="flex h-8 items-center gap-2 px-1">
        <span className="flex size-[21px] items-center justify-center rounded-[7px] bg-accent-strong text-[11px] font-bold text-white">N</span>
        <span className="text-sm font-semibold text-ink">{HERO_APP.workspace}</span>
        <ChevronDown className="size-3.5 text-ink-3" />
        <PanelLeft className="ml-auto size-3.5 text-ink-3" />
      </div>
      <div className="flex gap-1.5">
        <div className="flex h-[26px] flex-1 items-center gap-2 rounded-control bg-surface px-2 text-caption text-ink-2 shadow-hairline">
          <Sparkles className="size-3" /> Quick actions <span className="ml-auto"><Kbd>⌘K</Kbd></span>
        </div>
        <span className="flex size-[26px] items-center justify-center rounded-control bg-surface shadow-hairline">
          <Search className="size-3 text-ink-2" />
        </span>
      </div>
      <nav className="flex flex-col gap-px">
        {nav.map((n) => (
          <span
            key={n.label}
            className={cn(
              "flex h-[26px] items-center gap-2 rounded-[9px] px-2 text-sm text-ink-soft",
              n.active && "bg-hover-2 text-ink",
            )}
          >
            <n.icon className="size-3.5 opacity-80" /> {n.label}
          </span>
        ))}
      </nav>
      <div>
        <p className="px-2 pb-1 text-caption text-ink-3">Records</p>
        {records.map((r) => (
          <span key={r.label} className="flex h-[26px] items-center gap-2 px-2 text-sm text-ink-soft">
            <r.icon className={cn("size-3.5", r.tone)} /> {r.label}
          </span>
        ))}
      </div>
      <div>
        <p className="px-2 pb-1 text-caption text-ink-3">Lists</p>
        {["Q4 pipeline", "Expansion targets", "Stalled > 7 days"].map((l, i) => (
          <span key={l} className="relative flex h-[26px] items-center pl-6 text-sm text-ink-2">
            <span className="absolute top-0 left-3 h-full w-px bg-line-strong" />
            <span className={cn("absolute left-3 w-2 border-t border-line-strong", i === 2 ? "top-1/2" : "top-1/2")} />
            {l}
          </span>
        ))}
      </div>
    </aside>
  )
}

function PromptBox({ text, typing }: { text: string; typing: boolean }) {
  return (
    <BorderBeam size="sm" colorVariant="ocean" strength={0.6} duration={7} className="rounded-[14px]">
      <div className="flex h-[102px] flex-col justify-between rounded-[14px] border border-line-strong bg-inset p-3 shadow-lg">
        <p className="text-sm text-ink">
          {text || <span className="text-ink-3">Ask anything about your pipeline…</span>}
          {typing && <span className="ml-px inline-block h-[15px] w-[2px] translate-y-[3px] animate-caret bg-accent-strong" />}
        </p>
        <div className="flex items-center justify-end gap-2 text-sm text-ink-3">
          Auto <Sparkles className="size-3.5" />
          <span className="flex size-[25px] items-center justify-center rounded-control bg-accent-strong text-white">
            <ArrowUp className="size-3.5" />
          </span>
        </div>
      </div>
    </BorderBeam>
  )
}

function HomeScene({ typed, typing }: { typed: string; typing: boolean }) {
  return (
    <div className="mx-auto flex w-[560px] flex-col gap-4 pt-10">
      <p className="text-[20px] leading-6 font-semibold text-ink">{HERO_APP.greeting}</p>
      <PromptBox text={typed} typing={typing} />
      <div className="flex gap-2">
        {HERO_APP.suggestions.map((s, i) => (
          <span key={s} className="flex h-[25px] items-center gap-1.5 rounded-control border border-white/[0.06] px-2 text-caption text-ink-2">
            {i === 0 ? <CalendarDays className="size-3 text-accent" /> : <Mic className="size-3 text-red" />} {s}
          </span>
        ))}
      </div>
      <div className="mt-2">
        <p className="mb-2 text-caption text-ink-3">Meetings today</p>
        {[
          ["Orbital Freight — pricing review", "14:00", "bg-green"],
          ["Kestrel Health — security Q&A", "15:30", "bg-orange"],
          ["Fieldwork — demo", "Thu", "bg-accent"],
        ].map(([t, time, dot]) => (
          <div key={t} className="flex h-8 items-center gap-2 border-b border-line text-sm text-ink-soft">
            <span className={cn("size-[7px] rounded-full", dot)} /> {t}
            <span className="ml-auto text-caption text-ink-3">{time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function AnswerScene({ showAnswer }: { showAnswer: boolean }) {
  return (
    <div className="mx-auto flex w-[600px] flex-col gap-4 pt-6">
      <div className="ml-auto max-w-[80%] rounded-[10px] bg-white/[0.06] px-2.5 py-1.5 text-sm text-ink">{HERO_APP.prompt}</div>
      {!showAnswer ? (
        <p className="flex items-center gap-2 text-sm">
          <Sparkles className="size-3.5 text-accent" />
          <Shimmer>{HERO_APP.thinking}…</Shimmer>
        </p>
      ) : (
        <div className="flex flex-col gap-2.5">
          <p className="text-sm text-ink-soft">
            Three deals slipped. Here's what I'd do — <span className="font-semibold text-ink">drafts are ready</span> for each:
          </p>
          {HERO_APP.answer.map((deal, i) => (
            <motion.div
              key={deal.name}
              initial={{ opacity: 0, y: 6, filter: "blur(2px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.45, ease: EASE.out, delay: 0.15 + i * 0.22 }}
              className="relative flex items-start gap-2.5 rounded-card border border-line-strong bg-inset py-2.5 pr-3 pl-4"
            >
              <span className="absolute top-2.5 bottom-2.5 left-1.5 w-[3px] rounded-full bg-green" />
              <CompanyMark name={deal.name} tone={(["accent", "green", "orange"] as const)[i]} />
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                  {deal.name} <span className="text-caption font-normal text-ink-3 tabular">{deal.value}</span>
                </p>
                <p className="text-caption text-ink-2">{deal.reason}</p>
              </div>
              <span className="flex h-6 items-center gap-1 rounded-control bg-hover-2 px-2 text-caption text-ink">
                <CircleCheck className="size-3 text-green" /> Review
              </span>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

function SlackThread() {
  return (
    <Window className="w-[250px]" title="# pipeline">
      <div className="flex flex-col gap-2.5 p-3 text-caption">
        <div className="flex gap-2">
          <Avatar initials="DW" tone="orange" size={20} />
          <div>
            <p className="font-semibold text-ink">Dana <span className="font-normal text-ink-3">9:24</span></p>
            <p className="text-ink-2"><span className="text-accent-ink">@arcline</span> which deals will slip this quarter?</p>
          </div>
        </div>
        <div className="flex gap-2">
          <span className="flex size-5 shrink-0 items-center justify-center rounded-[6px] bg-ink text-page">
            <Sparkles className="size-3" />
          </span>
          <div>
            <p className="font-semibold text-ink">
              Arcline <span className="rounded bg-hover-2 px-1 text-micro text-ink-2">APP</span> <span className="font-normal text-ink-3">9:24</span>
            </p>
            <p className="text-ink-2">Three at risk, $162k total. Fieldwork is the biggest — drafts are in your inbox.</p>
          </div>
        </div>
      </div>
    </Window>
  )
}

function AgentTerminal() {
  return (
    <Window dark className="w-[300px]">
      <div className="flex flex-col gap-1 p-3 font-mono text-[10px] leading-[15px] text-ink-soft">
        <p className="text-ink">&gt; Find yesterday's calls with pricing objections and draft replies</p>
        <p><span className="text-orange">●</span> Ran 3 tools</p>
        <p className="text-ink-2">  ⎿ search-calls --since=yesterday</p>
        <p className="text-ink-2">  ⎿ extract-objections --topic=pricing</p>
        <p className="text-ink-2">  ⎿ draft-email ×4</p>
        <p><span className="text-green">●</span> 4 drafts queued for review</p>
        <p className="mt-1 border-t border-line pt-1.5 text-ink-3">
          <span className="text-orange">▶▶ auto</span> · arcline-agent · 1M context
        </p>
      </div>
    </Window>
  )
}

function CallRecorder() {
  return (
    <Window className="w-[240px]" title="Call · Orbital Freight">
      <div className="p-2">
        <div className="relative aspect-video overflow-hidden rounded-control">
          <img src={photo("call", 480)} alt="" className="size-full object-cover" />
          <span className="absolute right-1.5 bottom-1.5 rounded bg-void/80 px-1 text-micro text-ink tabular">24:16</span>
        </div>
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-hover-2">
          <div className="h-full w-[62%] rounded-full bg-accent" />
        </div>
        <div className="mt-2 flex gap-3 text-micro text-ink-2">
          <span className="text-ink">Transcript</span> <span>Speakers</span>
        </div>
        <div className="mt-1.5 flex flex-col gap-1 text-micro text-ink-2">
          <p><span className="text-ink-3 tabular">08:12</span> We'd sign this quarter if SSO…</p>
          <p><span className="text-ink-3 tabular">08:40</span> Let me send the security pack.</p>
        </div>
      </div>
    </Window>
  )
}

/**
 * The hero's product shot: Arcline answering "which deals slipped?", played
 * as a loop — the home screen, the question typing itself, a thinking state,
 * then the answer arriving deal by deal. Three satellite windows show where
 * the same agent turns up: Slack, a terminal and a call recording.
 *
 * Holds on the answer while the page is designed and for reduced motion.
 * `Hero scene` in the editor steps through the scenes.
 */
export function HeroApp({ speed = 45, paused = false }: { speed?: number; paused?: boolean }) {
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = paused || designing || !!reduced
  const [scene, setScene] = useState<Scene>(still ? "answer" : "home")
  const [typed, setTyped] = useState("")

  useCanvasAction("Hero scene", () => setScene((s) => ORDER[(ORDER.indexOf(s) + 1) % ORDER.length]), { group: "Hero" })

  useEffect(() => {
    if (still) {
      setTyped(HERO_APP.prompt)
      return
    }
    let timer = 0
    if (scene === "typing") {
      let n = 0
      timer = window.setInterval(() => {
        n += 1
        setTyped(HERO_APP.prompt.slice(0, n))
        if (n >= HERO_APP.prompt.length) {
          window.clearInterval(timer)
          timer = window.setTimeout(() => setScene("thinking"), 500)
        }
      }, 1000 / speed)
      return () => {
        window.clearInterval(timer)
        window.clearTimeout(timer)
      }
    }
    if (scene === "home") setTyped("")
    timer = window.setTimeout(() => setScene(ORDER[(ORDER.indexOf(scene) + 1) % ORDER.length]), HOLD[scene] * 1000)
    return () => window.clearTimeout(timer)
  }, [scene, still, speed])

  const chat = scene === "thinking" || scene === "answer"

  return (
    <div className="relative h-[700px] w-[1280px]">
      <Window className="absolute top-0 left-[170px] w-[940px]" bodyClassName="flex h-[620px]">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex h-[42px] items-center gap-2 border-b border-line px-4 text-sm text-ink">
            {chat ? (
              <>
                <Sparkles className="size-3.5 text-accent" /> Slipped deals this week
              </>
            ) : (
              <>
                <Home className="size-3.5 text-ink-2" /> Home
              </>
            )}
            <span className="ml-auto flex items-center gap-3 text-caption text-ink-3">
              <Settings2 className="size-3.5" /> Configure
            </span>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={chat ? "chat" : "home"}
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.3, ease: EASE.emphasized }}
              className="flex-1 px-6"
            >
              {chat ? (
                <AnswerScene showAnswer={scene === "answer"} />
              ) : (
                <HomeScene typed={typed} typing={scene === "typing"} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </Window>

      <div className="absolute top-[36px] left-0 animate-bob [--bob-duration:5.2s]">
        <SlackThread />
      </div>
      <div className="absolute top-[420px] left-[20px] animate-bob [--bob-duration:6s] [animation-delay:1.2s]">
        <AgentTerminal />
      </div>
      <div className="absolute top-[150px] right-0 animate-bob [--bob-duration:5.6s] [animation-delay:0.6s]">
        <CallRecorder />
      </div>
    </div>
  )
}
