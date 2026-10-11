import { useState } from "react"
import { useCanvasAction } from "@canvas/react"

import { PageHero } from "@/components/blocks/page-hero"
import { Reveal } from "@/components/motion/reveal"
import { Builder } from "@/components/sections/subscribe/builder"
import { RoastWeek } from "@/components/sections/subscribe/roast-week"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const FAQ = [
  ["Can I skip a delivery?", "Yes — open your subscription from the rail and press Skip next to the next date. It's gone, and the one after moves up."],
  ["What does the rotation send?", "Each delivery comes from the next series in line — Recess, Detour, Field Trip, Late Bell — and always whatever's best off the drum that week. Field Trip lots go to rotation subscribers first."],
  ["How fresh is it when it arrives?", "Roasted Tuesday, shipped Wednesday, at your door by Friday in most of the US. The roast date and the curve are printed on the bag."],
  ["Can I change coffee halfway?", "Any time before Monday night; the change goes in that week's roast. After that it applies to the next delivery."],
  ["What if I'm away?", "Pause it. Nothing ships and nothing's charged until you press Resume."],
  ["Is shipping really free?", "On every subscription delivery, any size. One-off orders ship free over $45."],
]

/** Subscribe, as a story: the promise, the builder, what happens in the
 *  week after you press start, and every question people ask first. */
export function SubscribePage() {
  const [open, setOpen] = useState<string>("")
  useCanvasAction("FAQ: first answer open", (next) => setOpen((next ?? open !== "0") ? "0" : ""), { on: open === "0", group: "Subscribe" })
  return (
    <>
      <PageHero
        eyebrow="Subscribe · up to 15% off"
        title="Never open|an empty bag"
        intro="Choose a coffee or let us choose, decide how much and how often, and the bags keep coming. Skip one when you're away, pause when you've got too many, and never pay to ship."
        image="moka"
        alt="A moka pot and two mugs on a camp table beside a lake at dawn"
      />
      <Builder />
      <RoastWeek />
      <section className="grid gap-10 px-[var(--spacing-gutter)] py-[var(--spacing-section)] lg:grid-cols-[1fr_1.618fr]">
        <Reveal>
          <p className="type-eyebrow text-ink-3">Questions</p>
          <h2 className="type-display mt-3 text-d4">Asked first, answered plainly</h2>
        </Reveal>
        <Accordion type="single" collapsible value={open} onValueChange={setOpen} className="border-t border-ink">
          {FAQ.map(([q, a], i) => (
            <AccordionItem key={q} value={String(i)} className="border-ink/20">
              <AccordionTrigger className="type-display py-5 text-d1 font-normal hover:no-underline hover:text-tomato [&>svg]:size-5 [&>svg]:text-ink">{q}</AccordionTrigger>
              <AccordionContent className="max-w-[60ch] text-body text-ink-2">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </>
  )
}
