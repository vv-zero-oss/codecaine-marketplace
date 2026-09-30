import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { Play } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { TestimonialCard } from "@/components/blocks/testimonial-card"
import { DotMap } from "@/components/motion/dot-map"
import { useRange } from "@/components/motion/progress"
import { Reveal } from "@/components/motion/reveal"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { SectionHeading } from "@/components/ui/section-heading"
import { media, photo } from "@/content"

export const stories = [
  {
    quote: "I used to dread renewal season. Now I get one message saying it’s handled, and how much I saved.",
    name: "Priya Raman",
    car: "2021 Honda Civic",
    image: photo(3783083, 900),
    alt: "A smiling woman in glasses looking out of her car window",
  },
  {
    quote: "A stone cracked my windscreen on a Tuesday. By Thursday it was fixed, and I hadn’t made a single call.",
    name: "Marcus Bell",
    car: "2018 Ford Ranger",
    image: photo(10400857, 900),
    alt: "A man in a bandana laughing as he leans on his car door",
  },
  {
    quote: "Three cars, two new drivers. Glovebox is the only reason I know what any of us is covered for.",
    name: "Elena Duarte",
    car: "2019 Subaru Outback",
    image: photo(8373542, 900),
    alt: "A woman smiling through a car window at sunset",
  },
]

/**
 * Who uses it: a map of members that holds still while their stories slide
 * up over it, with one member's film a tap away at the bottom.
 */
export function Proof() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] })
  const grow = useTransform(useRange(scrollYProgress, [0, 1], [0.9, 1]), (s) => `scale(${s})`)

  return (
    <section ref={ref} id="proof" className="relative">
      <div data-canvas-ignore className="sticky top-0 flex h-svh flex-col items-center overflow-hidden px-4 pt-[13svh]">
        <Reveal>
          <SectionHeading>
            Trusted by 40,000+
            <br />
            drivers nationwide
          </SectionHeading>
        </Reveal>
        <motion.div style={{ transform: grow }} className="mt-[4svh] w-[min(96vw,84rem)] origin-top">
          <DotMap />
        </motion.div>
      </div>

      <div
        data-canvas-ignore
        className="relative z-10 -mt-[42svh] flex flex-col items-center gap-[26svh] px-3 pb-[36svh] sm:px-6"
      >
        {stories.map((story) => (
          <TestimonialCard key={story.name} {...story} />
        ))}
      </div>

      <div data-canvas-ignore className="pointer-events-none sticky bottom-4 z-20 flex justify-center px-4 pb-1 sm:bottom-6">
        <StoryButton name="Hana" />
      </div>
    </section>
  )
}

/** A member's film, in a dialog: a thumbnail and a dark pill that opens it. */
export function StoryButton({ name = "Hana" }: { name?: string }) {
  const [open, setOpen] = useState(false)
  useCanvasAction("Story video", (next) => setOpen(next ?? !open), { on: open, group: "Stories" })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="group pointer-events-auto flex items-center gap-1 rounded-[0.75rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30">
        <span className="relative h-11 w-16 overflow-hidden rounded-[0.6rem]">
          <img src={media.story.poster} alt="" className="size-full object-cover" />
          <span className="absolute inset-0 grid place-items-center bg-ink-strong/25">
            <Play className="size-3.5 fill-surface text-surface" />
          </span>
        </span>
        <span className="flex h-11 items-center rounded-[0.6rem] bg-ink-strong px-4 text-[15px] text-surface transition-colors duration-(--duration-ui) group-hover:bg-ink">
          Watch {name}’s story
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{name}’s story</DialogTitle>
        <video
          src={media.story.src}
          poster={media.story.poster}
          controls
          autoPlay
          playsInline
          className="aspect-video w-full bg-ink-strong"
        />
      </DialogContent>
    </Dialog>
  )
}
