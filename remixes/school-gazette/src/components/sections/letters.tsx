import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"

const LETTERS = [
  ["Who can write for the Gazette?", "Anyone enrolled at Marlowe, from Year 7 up. You do not need to be good at English; you need to have noticed something."],
  ["How often does it come out?", "Four times a year: October, December, March and June. Online first, then a limited print run that is gone by lunch."],
  ["Is the radio brief real?", "Every morning at 08:10 in form rooms, and on the page above whenever you turn the dial. The voices are the Radio Club’s."],
  ["Why does it look like 1962?", "Because a printed page is still the best thing to be handed. The knobs and lights are there because it is more fun to press them."],
  ["Can the staff read it first?", "No. Mr. Adeyemi has asked eleven times. The answer has been the same eleven times."],
] as const

/** Letters & answers: the FAQ, set as a column of ruled questions. */
export function Letters() {
  return (
    <section id="letters" aria-labelledby="letters-title" className="scroll-mt-4 border-t-4 border-double border-ink">
      <Container className="grid gap-10 py-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div id="letters-title">
          <SectionHeading kicker="Letters" title="Questions, answered" deck="What readers ask the editors most, and what we tell them." />
        </div>
        <Accordion type="single" collapsible defaultValue="item-0">
          {LETTERS.map(([question, answer], i) => (
            <AccordionItem key={question} value={`item-${i}`}>
              <AccordionTrigger>{question}</AccordionTrigger>
              <AccordionContent>{answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  )
}
