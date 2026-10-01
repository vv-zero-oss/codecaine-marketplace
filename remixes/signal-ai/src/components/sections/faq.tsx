import { useState } from "react"
import { useCanvasAction } from "@canvas/react"

import { Reveal } from "@/components/motion/reveal"
import { ButtonLink } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Container } from "@/components/ui/container"

const FAQ = [
  { q: "Which models can I use?", a: "Every Vantage model is on the same API: Vantage 4 for reasoning and code, Vantage 4 mini for fast, low-cost work, plus voice and image models. Switching is a change to one string." },
  { q: "How is pricing calculated?", a: "By usage: tokens in and out for text, seconds for voice, and images generated. There are no seats or minimums, and the rate card on the pricing page is the whole bill." },
  { q: "Will you train on my data?", a: "No. Requests sent through the API are never used to train models. Enterprise plans add configurable retention and data residency." },
  { q: "What are the rate limits?", a: "New accounts start with a generous default that rises automatically as your usage grows. If you need more sooner, sales can set custom limits." },
  { q: "Do you offer a service agreement?", a: "Yes. Enterprise plans include an uptime commitment, a named support engineer, single sign-on and audit logging." },
  { q: "Can I try it before I commit?", a: "Start with free credits, build against the real API and add a card only when you go live." },
]

/** Questions a buyer asks before a call, answered plainly. */
export function Faq() {
  const [open, setOpen] = useState("")
  useCanvasAction("FAQ: first answer", (next) => setOpen(next === false || open === "item-0" ? "" : "item-0"), { on: open === "item-0", group: "FAQ" })
  return (
    <section id="faq" className="pb-24 sm:pb-32">
      <Container className="grid gap-10 md:grid-cols-[1fr_1.6fr] md:gap-16">
        <Reveal>
          <h2 className="font-serif text-[clamp(2.2rem,4.6vw,3.2rem)] leading-[0.95] tracking-[-0.02em]">Questions, answered</h2>
          <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-ink-2">Still unsure? Talk to someone who has shipped with the API.</p>
          <ButtonLink href="#start" variant="outline" className="mt-6">
            Contact Sales
          </ButtonLink>
        </Reveal>
        <Reveal delay={0.08}>
          <Accordion type="single" collapsible value={open} onValueChange={setOpen} className="border-t border-line">
            {FAQ.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Container>
    </section>
  )
}
