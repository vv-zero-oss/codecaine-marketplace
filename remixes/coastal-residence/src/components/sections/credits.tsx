import { motion } from "motion/react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Bloom } from "@/components/ui/bloom"
import { StretchText } from "@/components/ui/stretch-text"
import { credits } from "@/content"

/** Who is behind it: three names that open to a line each. */
export function Credits() {
  return (
    <section id="team" data-tone="dark" className="relative overflow-hidden bg-shell pb-32 pt-36 text-ink">
      <Bloom src={credits.bloom} flip corner="top-right" className="-right-16 -top-10 h-[80vh] w-[28vw] min-w-56" />
      <p className="label relative text-center">
        {credits.tagline[0]}
        <br />
        {credits.tagline[1]}
      </p>
      <motion.span
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, amount: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto mt-14 block h-[26vh] w-px origin-top bg-ink"
      />
      <Accordion type="single" collapsible className="relative mx-auto mt-20 flex max-w-[44rem] flex-col items-center px-5">
        {credits.items.map((item) => (
          <AccordionItem key={item.title} value={item.title} className="w-full border-none text-center">
            <AccordionTrigger className="group relative mx-auto flex w-fit justify-center py-1 font-condensed text-[clamp(2.6rem,4.2vw,4.8rem)] font-medium leading-[0.95] hover:no-underline [&>svg]:hidden">
              <StretchText text={item.title} />
              {item.sup && <sup className="ml-2 font-condensed text-[0.3em]">{item.sup}</sup>}
              <span aria-hidden="true" className="absolute -right-8 top-2 font-sans text-2xl font-light transition-transform duration-300 ease-[var(--ease-out-soft)] group-data-[state=open]:rotate-45">
                +
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-6 pt-2 text-center text-body text-ink-soft">{item.body}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
