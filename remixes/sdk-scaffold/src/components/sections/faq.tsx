import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Container } from "@/components/ui/container"
import { FAQS } from "@/content"

/**
 * A Radix accordion, not `<details>`.
 *
 * Its open state lives in React and its panel animates from a height Radix
 * measures at runtime, so it only works if the project's own JavaScript is
 * running — which makes opening it the plainest possible proof that what the
 * editor framed is an application and not a picture of one.
 *
 * It is also the one place on this page where the answer the SDK gives is a
 * library's rather than ours: an element whose nearest component is Radix's
 * own `Primitive.div` reports that, because the innermost component is the one
 * an element is the root of. See the README.
 */
export function Faq() {
  return (
    <section id="faq" className="py-24">
      <Container className="max-w-3xl">
        <h2 className="text-center text-3xl font-semibold tracking-tight">
          Questions people actually ask
        </h2>
        <Accordion type="single" collapsible className="mt-12 border-t border-quartz-200">
          {FAQS.map((item, index) => (
            <AccordionItem key={item.q} value={`faq-${index}`}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  )
}
