import { Plus } from "lucide-react"
import { Accordion as AccordionPrimitive } from "radix-ui"
import { useState } from "react"
import { useCanvasAction } from "@canvas/react"
import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion"
import { Container } from "@/components/ui/container"
import { faqs } from "@/content"

/** A short label on the left, the questions on the right, one open at a time. */
export function Faq({ title = "Questions? Answered." }: { title?: string }) {
  const [open, setOpen] = useState("")
  useCanvasAction("First answer open", (next) => setOpen((next ?? open !== "q0") ? "q0" : ""), { on: open === "q0", group: "FAQ" })

  return (
    <section id="faq" className="bg-snow py-(--spacing-section)">
      <Container className="grid gap-8 md:grid-cols-2">
        <h2 className="text-xl font-medium tracking-[-0.01em] sm:text-2xl">{title}</h2>
        <Accordion type="single" collapsible value={open} onValueChange={setOpen}>
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`q${i}`} className="border-hairline">
              <FaqQuestion question={f.q} />
              <AccordionContent className="px-2 pb-5 text-base leading-relaxed text-ink-soft sm:px-5">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  )
}

/** The question row: a grey pill fills in under it on hover, the plus turns to a cross when open. */
export function FaqQuestion({ question }: { question: string }) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger className="group flex min-h-14 flex-1 items-center justify-between gap-4 rounded-xl px-2 py-3 text-left text-lg transition-colors duration-200 outline-none hover:bg-mist focus-visible:ring-[3px] focus-visible:ring-rust/40 sm:px-5 sm:text-xl">
        {question}
        <Plus className="size-5 shrink-0 text-ink-mute transition-transform duration-300 ease-(--ease-out) group-data-[state=open]:rotate-45" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}
