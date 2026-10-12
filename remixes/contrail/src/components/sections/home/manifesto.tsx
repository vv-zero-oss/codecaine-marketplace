import { useState } from "react"
import { Footprints, Sparkles, Sun } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

import { ContrailMark } from "@/components/site/logo"
import { ScrollStory } from "@/components/motion/scroll-story"
import { Container } from "@/components/ui/container"
import { avatar, PEOPLE } from "@/lib/photos"

const STORY = `When you were small, the airport was where the adventure started. {spark}

Now it's guesswork. A delay nobody explains. A gate that moves {gate} while you're in line for coffee. An agent who knows less than the board.

We were tired of it too.

We're pilots, dispatchers and people who simply fly too much, and we knew the information existed — it just never reached the passenger. So we built Contrail. {app}

It watches the plane before yours and the weather at both ends, {sun} and tells you the moment anything changes. {one} It tells the people waiting for you, too. {face}

Flying can feel calm again. That's the whole idea.`

/** The gate chip in the story: it changes gate as you read past it. */
function MovingGate({ moved }: { moved: boolean }) {
  return (
    <span className="mx-1 inline-flex h-[1.5em] translate-y-[0.2em] items-center gap-1 overflow-hidden rounded-full bg-night-3 py-0.5 pr-2.5 pl-1 align-baseline text-[0.85em] font-bold text-white shadow-[0_0_0_1px_var(--color-night-line)]">
      <span className="grid size-[1.2em] place-items-center rounded-full bg-white text-night"><Footprints className="size-[0.75em]" /></span>
      <span className="relative inline-grid h-[1.2em] w-[1.6em] overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.span
            key={moved ? "B3" : "A7"}
            initial={{ transform: "translateY(100%)", opacity: 0 }}
            animate={{ transform: "translateY(0%)", opacity: 1 }}
            exit={{ transform: "translateY(-100%)", opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
            className={moved ? "absolute inset-0 text-amber" : "absolute inset-0"}
          >
            {moved ? "B3" : "A7"}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  )
}

/**
 * Why Contrail exists, read line by line: the text lights up as it passes the
 * middle of the window, and the little things in it move when their words do.
 */
export function Manifesto({ text = STORY }: { text?: string }) {
  const [progress, setProgress] = useState(0)
  const tokens = {
    spark: <Sparkles className="mx-1 inline size-[0.9em] -translate-y-[0.1em] text-amber" />,
    gate: <MovingGate moved={progress > 0.22} />,
    app: <ContrailMark tone="light" className="mx-1 inline size-[1.25em] -translate-y-[0.12em] rotate-[-6deg] rounded-[0.3em] shadow-[0_4px_14px_rgb(139_92_255/0.35)]" />,
    sun: <Sun className="mx-1 inline size-[0.95em] -translate-y-[0.1em] animate-orbit text-amber [--orbit-duration:12s]" />,
    one: (
      <span className="mx-1 inline-grid size-[1.2em] -translate-y-[0.1em] place-items-center rounded-full bg-red-bright text-[0.7em] font-bold text-white tabular-nums">
        {progress > 0.72 ? 2 : 1}
      </span>
    ),
    face: <img src={avatar(PEOPLE[1], 64)} alt="" className="mx-1 inline size-[1.2em] -translate-y-[0.1em] rounded-full object-cover ring-2 ring-night-3" />,
  }
  return (
    <section data-theme="night" className="bg-night pb-section">
      <Container>
        <ScrollStory
          text={text}
          tokens={tokens}
          onProgress={setProgress}
          className="mx-auto max-w-[34ch] text-[clamp(20.35px,1.9vw,25.89px)] leading-[1.5] font-semibold tracking-[-0.026em] text-night-fg"
        />
      </Container>
    </section>
  )
}
