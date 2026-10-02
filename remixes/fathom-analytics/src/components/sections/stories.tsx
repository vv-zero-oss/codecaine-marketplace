import { AnimatePresence, motion, useTransform, type MotionValue } from "motion/react"
import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"
import { useRef, useState } from "react"

import { StickyScene, scrollToStep, useStep } from "@/components/motion/sticky-scene"
import { WordReveal } from "@/components/motion/word-reveal"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Eyebrow } from "@/components/ui/section-title"
import { STORIES } from "@/content"
import { EASE_OUT } from "@/lib/motion-tokens"
import { cn } from "@/lib/utils"

function StoryAction({ label, active, go }: { label: string; active: boolean; go: () => void }) {
  useCanvasAction(label, () => go(), { on: active, group: "Customer stories" })
  return null
}

function StoryStage({ p, pinned, holdVh, sceneRef, media }: { p: MotionValue<number>; pinned: boolean; holdVh: number; sceneRef: React.RefObject<HTMLDivElement | null>; media: "video" | "photo" }) {
  const n = STORIES.length
  const scrolled = useStep(p, n)
  const [manual, setManual] = useState(0)
  const index = pinned ? scrolled : manual
  const story = STORIES[index]
  const { designing } = useCanvasDesignMode()
  // Progress inside the current story, so each quote fills in as you scroll through it.
  const local = useTransform(p, (v) => (v >= 1 ? 1 : (v * n) % 1))
  const words: MotionValue<number> = pinned ? local : p
  const go = (i: number) => (pinned ? scrollToStep(sceneRef.current?.firstElementChild as HTMLElement | null, i, n, 100 + n * holdVh) : setManual(i))

  return (
    <div data-canvas-ignore className="relative flex min-h-screen flex-1 items-center py-20 md:min-h-0 md:h-full">
      <Container className="grid items-center gap-10 md:grid-cols-[1.1fr_1fr] md:gap-8">
        <div className="flex flex-col">
          <Eyebrow className="text-sky-ink/70">Customer story</Eyebrow>
          <blockquote className="display mt-6 min-h-[9.5rem] text-[clamp(1.7rem,3.3vw,2.5rem)] sm:min-h-[13rem] md:min-h-[15rem]">
            <span aria-hidden className="mr-1">“</span>
            <WordReveal key={story.company} text={story.quote} progress={words} start={0} end={0.62} />
          </blockquote>
          <p className="mt-4 text-[13px] text-sky-ink/70">{story.byline}</p>
          <div className="mt-6 flex items-center gap-2">
            <ButtonLink href="#customers" size="lg">Read the story</ButtonLink>
            <ButtonLink href="#customers" variant="ghost" size="lg">All stories</ButtonLink>
          </div>
          <div role="tablist" aria-label="Customer stories" className="mt-10 flex items-center gap-1 sm:gap-6">
            {STORIES.map((s, i) => (
              <button key={s.company} role="tab" aria-selected={i === index} onClick={() => go(i)} className={cn("relative min-h-11 px-3 font-serif text-xl tracking-tight transition-opacity duration-(--duration-base) sm:px-0", i === index ? "opacity-100" : "opacity-35 hover:opacity-70")}>
                {s.company}.
                <span className="absolute inset-x-3 bottom-1.5 h-px bg-sky-ink/20 sm:inset-x-0"><motion.span className="block h-full origin-left bg-sky-ink" animate={{ scaleX: i === index ? 1 : 0 }} transition={{ duration: 0.5, ease: EASE_OUT }} /></span>
              </button>
            ))}
          </div>
        </div>

        <div className="relative mx-auto aspect-[4/4.4] w-full max-w-[26rem] overflow-hidden rounded-[14px] bg-sky-ink/10 shadow-card md:max-w-none">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div key={story.company} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7, ease: EASE_OUT }} className="absolute inset-0">
              {media === "video" ? (
                <video src={story.video} poster={story.poster} autoPlay={!designing} muted loop playsInline preload="metadata" className="size-full object-cover grayscale" />
              ) : (
                <img src={story.photo} alt={`${story.name}, ${story.role}`} className="size-full object-cover grayscale" />
              )}
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/60 to-transparent p-4 pt-16 text-ink-inverse">
                <p className="text-[13px] font-medium">{story.name}</p>
                <p className="text-xs text-ink-inverse/75">{story.role}</p>
              </figcaption>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
      {STORIES.map((s, i) => <StoryAction key={s.company} label={`Story: ${s.company}`} active={i === index} go={() => go(i)} />)}
    </div>
  )
}

/**
 * A pinned testimonial slider. The section holds still while scrolling turns
 * the pages: each customer's quote fills in word by word beside a muted,
 * looping, greyscale video of them. Click a name to jump. `media` picks video
 * or still photo. Why it exists: proof is read at the visitor's pace, with a face.
 */
export function Stories({ holdVh = 90, media = "video" }: { holdVh?: number; media?: "video" | "photo" }) {
  const sceneRef = useRef<HTMLDivElement>(null)
  return (
    <section id="stories" data-canvas-ignore className="bg-sky text-sky-ink">
      <div ref={sceneRef} data-canvas-ignore>
        <StickyScene heightVh={100 + STORIES.length * holdVh} stageClassName="flex flex-col">
          {(p, pinned) => <StoryStage {...{ p, pinned, holdVh, sceneRef, media }} />}
        </StickyScene>
      </div>
    </section>
  )
}
