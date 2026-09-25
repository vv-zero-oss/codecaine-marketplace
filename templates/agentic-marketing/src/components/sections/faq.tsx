import { Plus } from "lucide-react"
import { Accordion as AccordionPrimitive } from "radix-ui"

import { Frame, Section } from "@/components/blocks/frame"
import { Reveal } from "@/components/blocks/reveal"
import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion"
import { faq } from "@/content"

/**
 * The questions left over. shadcn's Accordion, with the reference's plus sign
 * in place of the chevron: it turns into a cross as the answer opens.
 */
export function Faq() {
  return (
    <Section id="faq">
      <Frame className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
        <Reveal className="flex flex-col justify-between gap-6">
          <h2 className="text-faq font-medium">{faq.title}</h2>
          <p className="max-w-[21rem] text-[12px] leading-relaxed text-ink-faint">{faq.aside}</p>
        </Reveal>
        <Reveal delay={0.06}>
          <Accordion type="single" collapsible className="w-full">
            {faq.items.map((item) => (
              <AccordionItem key={item.q} value={item.q} className="border-b-0">
                <AccordionPrimitive.Header className="flex">
                  <AccordionPrimitive.Trigger className="group flex min-h-[4.5rem] flex-1 items-center justify-between gap-6 rounded-md py-4 text-left text-[14px] font-medium text-ink outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40 sm:text-[15px]">
                    {item.q}
                    <Plus className="size-4 shrink-0 text-ink-faint transition-transform duration-200 ease-(--ease-out) group-data-[state=open]:rotate-45" />
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionContent className="max-w-[40rem] pb-5 text-[13px] leading-relaxed text-ink-soft">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Frame>
    </Section>
  )
}
