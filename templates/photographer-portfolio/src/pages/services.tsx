import { Check } from "lucide-react"

import { CallToBook } from "@/components/call-to-book"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { faqs, services } from "@/content"
import { cn } from "@/lib/utils"

export function PackageCard({
  name,
  price,
  detail,
  includes,
  featured = false,
}: {
  name: string
  price: string
  detail: string
  includes: string[]
  featured?: boolean
}) {
  return (
    <div className={cn("flex flex-col border p-8", featured ? "border-ink bg-ink text-paper" : "border-ink/15")}>
      <p className={cn("text-xs uppercase tracking-[0.2em]", featured ? "text-paper/60" : "text-ink-400")}>{name}</p>
      <p className="mt-6 font-display text-5xl">{price}</p>
      <p className={cn("mt-4 text-sm leading-relaxed", featured ? "text-paper/75" : "text-ink-600")}>{detail}</p>
      <ul className="mt-8 flex-1 space-y-3 text-sm">
        {includes.map((item) => (
          <li key={item} className="flex items-center gap-3">
            <Check className="size-4 shrink-0 text-accent" /> {item}
          </li>
        ))}
      </ul>
      <ButtonLink href="/contact" variant={featured ? "light" : "outline"} className="mt-10">
        Enquire
      </ButtonLink>
    </div>
  )
}

export function ServicesPage() {
  return (
    <>
      <Container className="pt-20">
        <SectionHeading eyebrow="Services" title="Three ways to work together">
          Every package can be shaped around what you actually need — these are where most people start.
        </SectionHeading>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <PackageCard key={service.name} {...service} />
          ))}
        </div>
      </Container>
      <Container className="mt-32 grid gap-12 md:grid-cols-12">
        <SectionHeading eyebrow="Questions" title="Before you ask" className="md:col-span-4" />
        <Accordion type="single" collapsible className="md:col-span-8">
          {faqs.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question}>
              <AccordionTrigger className="font-display text-2xl font-normal">{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
      <CallToBook />
    </>
  )
}
