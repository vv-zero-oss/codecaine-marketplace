import { useState } from "react"
import { useCanvasAction } from "@canvas/react"

import { SplitSection } from "@/components/blocks/split-section"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { faq } from "@/content"

/** The questions a team asks before it moves its machines. */
export function Faq() {
  const [open, setOpen] = useState<string[]>([])
  const toggle = (id: string, on?: boolean) =>
    setOpen((current) => {
      const next = on ?? !current.includes(id)
      return next ? [...new Set([...current, id])] : current.filter((v) => v !== id)
    })

  return (
    <SplitSection id="faq" heading={faq.heading} label={faq.label}>
      <Accordion type="multiple" value={open} onValueChange={setOpen}>
        {faq.items.map((item, i) => (
          <FaqItem key={item.q} id={`q${i}`} question={item.q} answer={item.a} open={open.includes(`q${i}`)} onToggle={toggle} />
        ))}
      </Accordion>
    </SplitSection>
  )
}

export function FaqItem({
  id,
  question,
  answer,
  open,
  onToggle,
}: {
  id: string
  question: string
  answer: string
  open: boolean
  onToggle: (id: string, on?: boolean) => void
}) {
  useCanvasAction(question, (on) => onToggle(id, on), { on: open, group: "FAQ" })
  return (
    <AccordionItem value={id}>
      <AccordionTrigger>{question}</AccordionTrigger>
      <AccordionContent>{answer}</AccordionContent>
    </AccordionItem>
  )
}
