import { useState } from "react"

import { useCanvasAction } from "@canvas/react"
import { Reveal } from "@/components/motion/reveal"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { Section } from "@/components/sections/shared/section"

const FAQS = [
  {
    q: "Will the AI post without asking me?",
    a: "Only where you say it can. Every workflow starts with approvals on; you choose which posts or replies may go out on their own, per channel.",
  },
  {
    q: "Which channels can Castwell publish to?",
    a: "Instagram, TikTok, YouTube, LinkedIn, X, Threads, Facebook, Pinterest and Bluesky, using each network's official API. Anything else with an API can be added on Scale.",
  },
  {
    q: "Who owns the videos the studio makes?",
    a: "You do. Renders, scripts and captions are yours to use anywhere. Stock and music in templates are licensed for commercial social use.",
  },
  {
    q: "How does it learn our brand voice?",
    a: "Point it at your best posts, your style guide and a few words to avoid. It drafts from that and learns from every edit your team makes.",
  },
  {
    q: "Is our data used to train shared models?",
    a: "No. Your brand memory, drafts and analytics stay in your workspace and are never used to train models for anyone else.",
  },
  {
    q: "Can we switch plans or cancel?",
    a: "Any time. Upgrades take effect straight away; downgrades and cancellations at the end of the billing period. Yearly plans are refunded pro rata.",
  },
]

export function PricingFaq() {
  const [open, setOpen] = useState<string>("")
  FAQS.forEach((f, i) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useCanvasAction(f.q, (next) => setOpen(next === false ? "" : `q${i}`), { on: open === `q${i}`, group: "FAQ" })
  })
  return (
    <Section id="faq">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <SectionHeading
          align="left"
          eyebrow="FAQ"
          title="Questions teams ask before they switch"
          description="Something else on your mind? Our team answers within the hour on weekdays."
        />
        <Reveal>
          <Accordion type="single" collapsible value={open} onValueChange={setOpen} className="border-t border-line">
            {FAQS.map((f, i) => (
              <AccordionItem key={f.q} value={`q${i}`} className="border-line">
                <AccordionTrigger className="min-h-14 cursor-pointer rounded-none py-5 font-serif text-[1.2rem] leading-snug font-light text-ink hover:no-underline md:text-[1.35rem]">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="max-w-xl pb-6 text-[15px] leading-relaxed text-ink-soft">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Container>
    </Section>
  )
}
