import { useState } from "react"
import { useCanvasAction } from "@canvas/react"

import { Doodle } from "@/components/mock/doodles"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Container } from "@/components/ui/container"

const FAQ = [
  ["Can I skip a delivery?", "Yes. Every shipping email has a Skip link, and you can skip up to the Sunday before roast day. Skip as many as you like — there's no minimum."],
  ["Can I pause for a while?", "Pause for two, four or eight weeks from your account, or reply to any email and we'll do it for you. Nothing is charged while you're paused."],
  ["Can I change the grind or the coffee?", "Any time before Sunday night. Swap coffees, sizes or grind from the next-delivery email; the change applies from the following Tuesday's roast."],
  ["Can I give a subscription as a gift?", "Gift subscriptions run for three, six or twelve months and are paid up front. We send a card on the day you choose and the first bag the following Friday."],
  ["How much is shipping?", "Free on every subscription delivery anywhere in the country. Bags travel in a recyclable mailer that fits through most letterboxes."],
  ["How do I cancel?", "One link, at the bottom of every email. No phone call, no questions — though we'd love to know why, if you'll tell us."],
] as const

/**
 * The questions people actually ask, answered plainly, in an accordion.
 * A tea-towel of a section: the kettle doodle and a line to email us.
 */
export function SubscribeFaq() {
  const [open, setOpen] = useState<string>("")
  useCanvasAction("FAQ open", (next) => setOpen((next ?? !open) ? FAQ[0][0] : ""), { on: !!open, group: "Subscribe" })

  return (
    <section className="border-b border-line py-(--spacing-section)">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.5fr]">
        <div className="space-y-5">
          <p className="type-label text-[11.5px] text-ink-3">Questions</p>
          <h2 className="type-display text-h1">
            The small <span className="text-sky-display">print,</span> in big type.
          </h2>
          <p className="max-w-[36ch] text-[16px] text-ink-2">
            Anything else, write to hello@sidebcoffee.co and a real person from the roastery will answer, usually before the kettle boils.
          </p>
          <Doodle name="kettle" className="w-32" />
        </div>
        <Accordion type="single" collapsible value={open} onValueChange={setOpen} className="border-t border-line">
          {FAQ.map(([q, a]) => (
            <AccordionItem key={q} value={q} className="border-line">
              <AccordionTrigger className="type-display py-5 text-h4 font-semibold hover:no-underline [&>svg]:size-5 [&>svg]:text-ink">{q}</AccordionTrigger>
              <AccordionContent className="max-w-[56ch] pb-6 text-[16px] leading-relaxed text-ink-2">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  )
}
