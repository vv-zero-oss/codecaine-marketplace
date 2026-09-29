import { useCanvasAction } from "@canvas/react"
import { useState } from "react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Container } from "@/components/ui/container"
import { SectionHead } from "@/components/ui/section-head"

const QUESTIONS = [
  {
    q: "Is it honest to change the sky in a photograph of a building?",
    a: "Mullion never moves, adds or removes architecture. Every export carries an edit log in its metadata, and the Awards preset limits edits to light and colour so the frames stay eligible where rules require it.",
  },
  {
    q: "Will it work on renders as well as photographs?",
    a: "Yes. Renders take Relight, Sky and Season especially well, because the geometry is clean. Many practices use it to bring a render's light in line with the site photography of the finished building.",
  },
  {
    q: "What happens to our images?",
    a: "Frames are processed in the EU or US region you choose, encrypted at rest, and deleted from our servers thirty days after export. They are never used to train models.",
  },
  {
    q: "Does it replace our photographer?",
    a: "No — it saves the reshoot. The photographer's composition, lens and timing are the frame; Mullion fixes what the weather and the site did on the day.",
  },
  {
    q: "Which file types can we bring in?",
    a: "RAW from every major camera, DNG, TIFF, PSD with layers flattened on import, JPEG and PNG, up to 150 megapixels a frame.",
  },
]

/** The questions a practice asks before trusting a tool with its portfolio. */
export function Faq() {
  const [open, setOpen] = useState("")
  QUESTIONS.forEach((item, i) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useCanvasAction(`Question ${i + 1} open`, (next) => setOpen((next ?? open !== `q${i}`) ? `q${i}` : ""), {
      group: "FAQ",
      on: open === `q${i}`,
    })
  })

  return (
    <section id="faq" className="pb-section" aria-labelledby="faq-title">
      <Container className="grid gap-10 lg:grid-cols-[1fr_2fr]">
        <div>
          <SectionHead index="06" label="Questions" className="lg:border-b-0" />
          <h2 id="faq-title" className="mt-10 max-w-[14ch] text-[clamp(1.75rem,3.6vw,3.25rem)] leading-[1.05] font-extrabold tracking-[-0.04em]">
            Before you trust it with a portfolio.
          </h2>
        </div>
        <Accordion type="single" collapsible value={open} onValueChange={setOpen} className="border-t border-hairline">
          {QUESTIONS.map((item, i) => (
            <AccordionItem key={item.q} value={`q${i}`} className="border-hairline">
              <AccordionTrigger className="min-h-11 py-5 text-body font-normal hover:no-underline [&[data-state=open]>svg]:rotate-45">
                <span className="flex gap-5">
                  <span className="text-muted tabular-nums">0{i + 1}</span>
                  {item.q}
                </span>
              </AccordionTrigger>
              <AccordionContent className="max-w-[60ch] pl-10 text-body text-muted">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  )
}
