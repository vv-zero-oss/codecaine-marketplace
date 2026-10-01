import { ArrowUp, Mic, Square } from "lucide-react"
import { animate } from "motion/react"
import { useEffect, useMemo, useRef, useState } from "react"
import { useCanvasAction } from "@canvas/react"
import { VoiceBeam, useMicrophone } from "voice-glow"

import { useStill } from "@/components/motion"
import { WordReveal } from "@/components/motion/word-reveal"
import { HaloMark } from "@/components/ui/wordmark"
import { cn } from "@/lib/utils"

type Phase = "typing" | "thinking" | "answer"

/** The seven lobe colours of the glow, read from the `--color-voice-*` tokens
 *  so the palette is changed in index.css, not here. */
export function useVoiceColors(): string[] | undefined {
  const [colors, setColors] = useState<string[]>()
  useEffect(() => {
    const style = getComputedStyle(document.documentElement)
    setColors([1, 2, 3, 4, 5, 6, 7].map((n) => style.getPropertyValue(`--color-voice-${n}`).trim()).filter(Boolean))
  }, [])
  return colors
}

/**
 * A prompt box with a voice-reactive glow along its bottom edge. It plays a
 * loop on its own — types a question, thinks (the glow gathers into a beam that
 * travels), then answers word by word — and the mic button hands the glow to
 * the real microphone instead.
 */
export function VoiceComposer({
  prompts,
  thinkSeconds = 1.9,
  holdSeconds = 3.6,
  typeSpeed = 0.045,
  hint,
  className,
}: {
  prompts: { ask: string; answer: string }[]
  thinkSeconds?: number
  holdSeconds?: number
  typeSpeed?: number
  hint?: string
  className?: string
}) {
  const still = useStill()
  const mic = useMicrophone()
  const colors = useVoiceColors()
  const live = mic.state === "live"

  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>(still ? "answer" : "typing")
  const [chars, setChars] = useState(still ? prompts[0].ask.length : 0)
  const current = prompts[index % prompts.length]
  // While the question is typed the glow is driven as if it were being spoken:
  // each character nudges the level, and the voice-glow release smooths it.
  const spoken = useRef(0)

  // The loop: type → think → answer → next. Paused while the mic is live or
  // while the page is being designed (the frame holds on an answer).
  useEffect(() => {
    if (still) {
      setPhase("answer")
      setChars(current.ask.length)
      return
    }
    if (live) return
    let timer = 0
    let typing: ReturnType<typeof animate> | undefined
    if (phase === "typing") {
      setChars(0)
      typing = animate(0, current.ask.length, {
        duration: current.ask.length * typeSpeed,
        delay: 0.5,
        ease: "linear",
        onUpdate: (v) => {
          setChars(Math.floor(v))
          spoken.current = 0.35 + Math.random() * 0.55
        },
        onComplete: () => {
          spoken.current = 0
          setPhase("thinking")
        },
      })
    } else if (phase === "thinking") {
      timer = window.setTimeout(() => setPhase("answer"), thinkSeconds * 1000)
    } else {
      timer = window.setTimeout(() => {
        setIndex((i) => (i + 1) % prompts.length)
        setPhase("typing")
      }, holdSeconds * 1000)
    }
    return () => {
      typing?.stop()
      window.clearTimeout(timer)
    }
  }, [phase, index, live, still, current.ask, typeSpeed, thinkSeconds, holdSeconds, prompts.length])

  useCanvasAction("Voice composer: thinking", (next) => setPhase(next === false ? "typing" : "thinking"), { on: phase === "thinking", group: "Hero" })
  useCanvasAction("Voice composer: answer", (next) => setPhase(next === false ? "typing" : "answer"), { on: phase === "answer", group: "Hero" })

  const text = useMemo(() => current.ask.slice(0, phase === "typing" ? chars : current.ask.length), [current.ask, chars, phase])

  return (
    <div className={cn("mx-auto w-full max-w-[620px]", className)}>
      <VoiceBeam
        type="default"
        stream={mic.stream}
        level={() => spoken.current}
        processing={phase === "thinking"}
        processingLevel={0.8}
        colors={colors}
        theme="dark"
        scale={1.7}
        idle={0.5}
        reach={2.2}
        spread={1.2}
        flow={70}
      >
        <div className="flex min-h-[132px] flex-col justify-between gap-5 rounded-[22px] border border-line-strong bg-surface/70 p-4 text-left shadow-card backdrop-blur-xl">
          <p className="min-h-6 px-1 text-[16px] leading-6 text-text" aria-live="polite">
            {live ? (
              <span className="text-muted">Listening…</span>
            ) : text ? (
              text
            ) : (
              <span className="text-faint">Ask Halo about your queue…</span>
            )}
            {!live && phase === "typing" ? (
              <span className="ml-px inline-block h-4 w-px translate-y-0.5 bg-text [animation:caret_1s_steps(1)_infinite]" />
            ) : null}
          </p>
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex h-9 items-center gap-2 rounded-full border border-line bg-white/5 px-3 text-[12px] text-muted">
              <HaloMark className="size-3.5" />
              Agent (auto)
            </span>
            <span className="flex items-center gap-2">
              <button
                type="button"
                aria-label={live ? "Stop listening" : "Talk to Halo"}
                aria-pressed={live}
                disabled={!mic.supported}
                onClick={live ? mic.stop : mic.start}
                className={cn(
                  "flex size-11 shrink-0 items-center justify-center rounded-full border border-line-strong transition-[background-color,color,transform] duration-150 ease-out-expo active:scale-95 disabled:opacity-40",
                  live ? "bg-iris text-onlight" : "bg-white/5 text-muted hover:bg-white/10 hover:text-text",
                )}
              >
                {live ? <Square className="size-3.5 fill-current" /> : <Mic className="size-4" />}
              </button>
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-text text-onlight shadow-pill" aria-hidden>
                <ArrowUp className="size-4" />
              </span>
            </span>
          </div>
        </div>
      </VoiceBeam>

      <div className="mt-6 min-h-[4rem] text-center">
        {phase === "answer" && !live ? (
          <p key={`${index}-answer`} className="mx-auto max-w-[520px] text-[15px] leading-relaxed text-muted">
            <WordReveal text={current.answer} />
          </p>
        ) : phase === "thinking" ? (
          <p className="font-mono text-[11px] tracking-wider text-faint uppercase">Reading 2,431 conversations…</p>
        ) : null}
        {mic.state === "denied" ? <p className="text-[12px] text-faint">Microphone access is blocked in this browser.</p> : null}
        {hint && phase === "typing" && !live && mic.supported ? <p className="font-mono text-[11px] tracking-wider text-ghost uppercase">{hint}</p> : null}
      </div>
    </div>
  )
}
