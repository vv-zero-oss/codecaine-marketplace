import { useCanvasAction } from "@canvas/react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react"
import { useRef, useState } from "react"

import { Button, ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { STORIES, pexels } from "@/content"
import { ease } from "@/lib/tokens"
import { cn } from "@/lib/utils"

const QUOTES = [
  "“I stopped ordering three sizes to send two back. I order one, and it's the right one.”",
  "“It showed me in a green I'd have walked past. Now half my wardrobe is that green.”",
  "“Sixteen blazers, one evening, one tab. I picked the rust and I've had three compliments.”",
  "“Drape told me the coat would be short in the arms. It was right — I sized up.”",
  "“For the first time, my shirts fit at the shoulder and the waist at the same time.”",
]

/**
 * Stories — people who've used it, in a row you scroll sideways. Hover a
 * card and a "Read story" pill follows the cursor (as the reference's
 * "Watch video" does); click and the card turns over to their words.
 */
export function Stories({
  title = "Real people, real closets",
  lede = "See how people use Drape to buy less and wear more of what they buy.",
}: {
  title?: string
  lede?: string
}) {
  const track = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState<number | null>(null)
  useCanvasAction("First story open", (next) => setOpen((next ?? open !== 0) ? 0 : null), { on: open === 0, group: "Stories" })

  const nudge = (dir: 1 | -1) => {
    const element = track.current
    if (!element) return
    element.scrollBy({ left: dir * Math.min(element.clientWidth * 0.8, 420), behavior: "smooth" })
  }

  return (
    <section id="stories" className="overflow-hidden bg-espresso py-24 sm:py-32">
      <Container className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading title={title} className="max-w-md" />
        <div className="max-w-sm">
          <p className="text-[14px] leading-relaxed text-cream-2">{lede}</p>
          <div className="mt-4 flex items-center gap-2">
            <ButtonLink href="#faq" size="sm">
              Start your own
            </ButtonLink>
            <Button variant="ghost" size="icon" aria-label="Previous stories" onClick={() => nudge(-1)}>
              <ArrowLeft />
            </Button>
            <Button variant="ghost" size="icon" aria-label="More stories" onClick={() => nudge(1)}>
              <ArrowRight />
            </Button>
          </div>
        </div>
      </Container>

      <div
        ref={track}
        data-lenis-prevent-wheel=""
        className="mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-4 pb-4 [scrollbar-width:none] sm:px-6 lg:px-[max(1.5rem,calc((100vw-1240px)/2+1.5rem))]"
      >
        {STORIES.map((story, index) => (
          <StoryCard
            key={story.id}
            photo={story.id}
            name={story.name}
            body={story.body}
            quote={QUOTES[index]}
            open={open === index}
            onToggle={() => setOpen(open === index ? null : index)}
          />
        ))}
      </div>
    </section>
  )
}

export function StoryCard({
  photo,
  name,
  body,
  quote,
  open,
  onToggle,
}: {
  photo: number
  name: string
  body: string
  quote: string
  open: boolean
  onToggle: () => void
}) {
  const reduced = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 500, damping: 40 })
  const sy = useSpring(y, { stiffness: 500, damping: 40 })
  const [hover, setHover] = useState(false)

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect()
        x.set(event.clientX - bounds.left)
        y.set(event.clientY - bounds.top)
      }}
      onPointerEnter={(event) => event.pointerType === "mouse" && setHover(true)}
      onPointerLeave={() => setHover(false)}
      className="group relative aspect-[4/5] w-[78vw] max-w-[380px] shrink-0 cursor-none snap-start overflow-hidden rounded-md bg-espresso-3 text-left sm:w-[36vw] max-[639px]:cursor-pointer"
    >
      <img
        src={pexels(photo, 760, 950)}
        alt={name.replace("Fit notes: ", "")}
        loading="lazy"
        className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-(--ease-out) group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4">
        <p className="text-[14px] font-medium text-cream">{name}</p>
        <p className="mt-1 text-[12px] leading-snug text-cream-2">{body}</p>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.3, ease: ease.out }}
            className="absolute inset-0 flex flex-col justify-end bg-espresso/88 p-5 backdrop-blur-sm"
          >
            <p className="font-display text-[20px] leading-snug font-medium tracking-[-0.02em] text-cream">{quote}</p>
            <p className="mt-3 text-[12px] text-cream-3">{name.replace("Fit notes: ", "")} · tap to close</p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.span
        aria-hidden
        style={{ x: sx, y: sy }}
        className={cn(
          "pointer-events-none absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-paper px-2.5 py-1 text-[12px] font-medium whitespace-nowrap text-ink shadow-pill transition-[opacity,scale] duration-150",
          hover ? "scale-100 opacity-100" : "scale-75 opacity-0",
        )}
      >
        {open ? "Close" : "Read story"}
      </motion.span>
    </button>
  )
}
