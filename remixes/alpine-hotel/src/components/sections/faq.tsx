import { Plus } from "lucide-react"
import { Accordion as AccordionPrimitive } from "radix-ui"
import { useState } from "react"
import { useCanvasAction } from "@canvas/react"
import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion"
import { Container } from "@/components/ui/container"
import { Chapter } from "@/components/ui/chapter"
import { faqs } from "@/content"

/** The questions the front desk answers most often, one open at a time. */
export function Faq({ title = "What people ask before they book." }: { title?: string }) {
  const [open, setOpen] = useState("")
  useCanvasAction("First answer open", (next) => setOpen((next ?? open !== "q0") ? "q0" : ""), { on: open === "q0", group: "FAQ" })

  return (
    <section id="faq" className="pb-(--spacing-section)">
      <Container>
        <Chapter number="07" label="Questions" title={title} />
        <div className="mt-10 grid lg:grid-cols-12">
          <Accordion type="single" collapsible value={open} onValueChange={setOpen} className="border-t border-ink lg:col-span-8 lg:col-start-5">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`q${i}`} className="border-rule">
                <FaqQuestion question={f.q} />
                <AccordionContent className="max-w-[60ch] pb-6 text-base leading-relaxed text-ink-soft">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </section>
  )
}

/** The question row; the plus turns to a cross when open. */
export function FaqQuestion({ question }: { question: string }) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger className="group flex min-h-16 flex-1 items-center justify-between gap-6 py-4 text-left font-serif text-xl transition-colors duration-150 outline-none hover:text-signal focus-visible:text-signal sm:text-2xl">
        {question}
        <Plus className="size-5 shrink-0 text-ink-faint transition-transform duration-200 ease-(--ease-out) group-data-[state=open]:rotate-45" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}
