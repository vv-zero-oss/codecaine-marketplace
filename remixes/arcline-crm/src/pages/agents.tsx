import { useRef, useState } from "react"
import { Copy, Check } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useCanvasAction } from "@canvas/react"

import { Isocon, type IsoconName } from "@/components/icons/isocon"
import { AgentRun, PersonaSuggestion, StreamingAnswer } from "@/components/mockups/agent-ui"
import { Card } from "@/components/mockups/kit"
import { Reveal } from "@/components/motion/reveal"
import { FinalCta } from "@/components/sections/closing"
import { Horizon } from "@/components/sections/memory"
import { Quote } from "@/components/sections/quote"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Heading, Lede } from "@/components/ui/heading"
import { Section } from "@/components/ui/section"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MEMORY } from "@/content/home"
import { AGENTS } from "@/content/pages"
import { EASE } from "@/lib/motion"
import { cn } from "@/lib/utils"

/**
 * A wave of pins: thin vertical lines with a dot on top, their heights
 * tracing a slow U. Background for the Agents hero.
 */
export function PinWave({ count = 120 }: { count?: number }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 flex h-[420px] items-end justify-between px-2 [mask-image:linear-gradient(to_top,#000_40%,transparent)]">
      {Array.from({ length: count }, (_, i) => {
        const t = i / (count - 1)
        const h = 90 + 260 * Math.pow(Math.abs(t - 0.5) * 2, 2.2)
        return (
          <span key={i} className="relative w-px bg-line-strong" style={{ height: h }}>
            <span className="absolute -top-[1px] left-1/2 size-[3px] -translate-x-1/2 rounded-full bg-ink-faint" />
          </span>
        )
      })}
    </div>
  )
}

/** Persona tabs over a tick ruler; the chosen persona's pitch beside its suggestion card. */
export function Personas() {
  const items = AGENTS.personas.items
  const [active, setActive] = useState(0)
  useCanvasAction("Next persona", () => setActive((a) => (a + 1) % items.length), { group: "Agents" })
  const p = items[active]

  return (
    <Section>
      <Container className="py-[var(--spacing-section)]">
        <Reveal>
          <Heading size="h2" lead={AGENTS.personas.title} className="text-center text-[28px] leading-8 md:text-[32px] md:leading-9" />
        </Reveal>
        <Tabs value={p.id} onValueChange={(v) => setActive(items.findIndex((it) => it.id === v))} className="gap-0">
        <TabsList variant="line" className="relative mx-auto mt-10 flex !h-auto w-full max-w-[720px] justify-between p-0">
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-2"
            style={{ backgroundImage: "repeating-linear-gradient(90deg, var(--line-strong) 0 1px, transparent 1px 12px)" }}
          />
          {items.map((it, i) => (
            <TabsTrigger
              key={it.id}
              value={it.id}
              className={cn(
                "relative !h-auto flex-none rounded-none border-0 px-3 pb-5 text-sm font-medium transition-colors duration-300 after:hidden data-[state=active]:shadow-none md:text-base",
                active === i ? "text-ink" : "text-ink-3 hover:text-ink-2",
              )}
            >
              {it.label}
              {active === i && (
                <motion.span layoutId="persona-marker" className="absolute inset-x-3 bottom-0 h-2 bg-accent" transition={{ duration: 0.35, ease: EASE.outCubic }} />
              )}
            </TabsTrigger>
          ))}
        </TabsList>
        </Tabs>
        <AnimatePresence mode="wait">
          <motion.div
            key={p.id}
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.3, ease: EASE.emphasized }}
            className="mt-10 grid grid-cols-1 [&>*]:min-w-0 gap-10 rounded-panel border border-line-strong bg-canvas p-6 md:p-12 lg:grid-cols-2 lg:items-center"
          >
            <Heading as="h3" size="statement" lead={p.lead} rest={p.rest} className="max-w-[22ch]" />
            <div className="flex justify-center">
              <PersonaSuggestion persona={p} />
            </div>
          </motion.div>
        </AnimatePresence>
      </Container>
    </Section>
  )
}

const TILE_TONE = {
  accent: "bg-accent-tint text-accent-ink",
  green: "bg-green-tint text-green",
  red: "bg-red-tint text-red",
  orange: "bg-orange-tint text-orange",
  purple: "bg-purple-tint text-purple",
  cyan: "bg-accent-tint text-cyan",
} as const

/** One saved prompt: an icon tile, a title and the prompt; copies on click. */
export function PromptCard({ item }: { item: (typeof AGENTS.library.items)[number] }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(item.body).catch(() => {})
        setCopied(true)
        window.setTimeout(() => setCopied(false), 1400)
      }}
      className="group/iso flex w-[254px] shrink-0 snap-start flex-col gap-4 rounded-card border border-line-strong bg-surface p-4 text-left transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-line-bold hover:duration-150 active:translate-y-0"
    >
      <span className="flex items-center justify-between">
        <span className={cn("flex size-9 items-center justify-center rounded-control p-1.5", TILE_TONE[item.tone])}>
          <Isocon name={item.icon as IsoconName} draw />
        </span>
        <span className="flex items-center gap-1 text-caption text-ink-3 opacity-0 transition-opacity duration-200 group-hover/iso:opacity-100">
          {copied ? <Check className="size-3.5 text-green" /> : <Copy className="size-3.5" />} {copied ? "Copied" : "Copy"}
        </span>
      </span>
      <span>
        <span className="block text-base font-medium text-ink">{item.title}</span>
        <span className="mt-1 block text-[13px] text-ink-2">“{item.body}”</span>
      </span>
      <span className="text-caption text-ink-3">Arcline</span>
    </button>
  )
}

/** Agents: ask it anything, see it for your role, watch it work, start from a prompt. */
export function AgentsPage() {
  const scroller = useRef<HTMLDivElement>(null)
  return (
    <>
      <Section className="overflow-hidden">
        <PinWave />
        <Container className="relative flex flex-col items-center pt-20 pb-24 text-center md:pt-28">
          <Reveal onMount>
            <Heading as="h1" size="display" lead={AGENTS.title} />
          </Reveal>
          <Reveal onMount delay={0.1} className="mt-5">
            <p className="max-w-[26em] text-lead text-ink-soft md:text-[20px] md:leading-[26px]">{AGENTS.body}</p>
          </Reveal>
          <Reveal onMount delay={0.3} className="mt-12 w-full max-w-[560px] text-left">
            <Card className="mb-3 ml-auto w-fit max-w-[90%] px-3 py-2 text-sm text-ink">{AGENTS.question}</Card>
            <Card className="p-4">
              <StreamingAnswer />
            </Card>
          </Reveal>
        </Container>
      </Section>

      <Section tone="canvas">
        <Container className="flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
          <p className="text-lead font-medium text-ink">{AGENTS.bar.text}</p>
          <div className="flex gap-2.5">
            <ButtonLink href="/pricing">{AGENTS.bar.secondary}</ButtonLink>
            <ButtonLink href="/pricing" variant="primary">
              {AGENTS.bar.primary}
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <Personas />

      <Section tone="void" className="overflow-hidden">
        <div className="relative flex min-h-[420px] flex-col items-center pt-24 text-center">
          <Horizon />
          <Reveal className="relative">
            <p className="text-base text-ink-2">Powered by</p>
            <p className="font-display mt-2 text-[clamp(44px,6vw,72px)] leading-none font-semibold tracking-[-0.024em] text-ink">Deal Memory</p>
          </Reveal>
        </div>
        <div className="relative grid border-t border-dashed border-line-strong sm:grid-cols-2 lg:grid-cols-5">
          {MEMORY.cells.map((c) => (
            <div key={c.title} tabIndex={0} className="group/iso relative flex flex-col gap-10 border-b border-dashed border-line-strong p-7 outline-none sm:border-r lg:border-b-0 lg:last:border-r-0">
              <span aria-hidden className="absolute -top-[3px] -left-[3px] size-1.5 bg-line-bold" />
              <div className="w-10 text-ink-2 group-hover/iso:text-accent-ink">
                <Isocon name={c.icon as IsoconName} draw />
              </div>
              <div>
                <p className="text-base font-medium text-ink">{c.title}</p>
                <p className="mt-1 text-sm text-ink-2">{c.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <Container className="grid grid-cols-1 gap-12 py-[var(--spacing-section)] lg:grid-cols-2 lg:items-center [&>*]:min-w-0">
          <Reveal>
            <Heading lead={AGENTS.tasks.lead} rest={AGENTS.tasks.rest} className="max-w-[16ch]" />
          </Reveal>
          <Reveal delay={0.1} className="flex justify-center overflow-hidden rounded-panel border border-line-strong bg-canvas p-4 texture-dots sm:p-8">
            <div className="w-full max-w-[420px]">
              <AgentRun />
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Container className="pt-[var(--spacing-section)]">
          <Reveal>
            <Heading lead={AGENTS.library.title} />
            <Lede className="mt-3">{AGENTS.library.body}</Lede>
          </Reveal>
        </Container>
        <div
          ref={scroller}
          className="mt-10 flex snap-x gap-3 overflow-x-auto px-5 pb-[var(--spacing-section)] sm:px-8 lg:px-[58px] [&::-webkit-scrollbar]:hidden"
        >
          {AGENTS.library.items.map((item) => (
            <PromptCard key={item.title} item={item} />
          ))}
        </div>
      </Section>

      <Quote />
      <FinalCta title={["Put Arcline", "to work."]} />
    </>
  )
}
