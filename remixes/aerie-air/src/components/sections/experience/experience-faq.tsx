import { useState } from "react"
import { useCanvasAction } from "@canvas/react"

import { Reveal } from "@/components/motion/reveal"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Container } from "@/components/ui/container"

const FAQS = [
  { id: "luggage", q: "How much can I bring?", a: "One cabin bag up to 12 kg and 55 × 40 × 23 cm, which rides in the hold, plus a personal item under your seat. The cabin shares 48 kg of hold space, so we weigh bags at the lift. Skis, bikes and instruments in hard cases need a note at booking." },
  { id: "weather", q: "What happens when the weather turns?", a: "Our pilots fly in rain and wind that would ground a drone, but not in thunderstorms, icing or low cloud over the pads. If we cancel for weather we tell you at least 45 minutes ahead where we can, refund in full, and the car still takes you the whole way by road at no charge." },
  { id: "safety", q: "How is it kept safe?", a: "Six independent motors and six battery packs: the aircraft can land with any one of them out. Every flight has a commercially licensed pilot, every pad has a ground crew, and the aircraft is checked between every flight, not every day." },
  { id: "access", q: "Can I fly if I use a wheelchair?", a: "Yes. Every vertiport has step-free access from the street to the pad, and the cabin door sits at wheelchair-transfer height. Tell us at booking and we'll stow a folding chair in the hold and have crew meet you at both ends." },
  { id: "children", q: "Can children fly?", a: "Children under two fly on an adult's lap for free. From two they need their own seat; from twelve they can fly alone with a consent form. Car seats for the ride to the pad are in the booking, just tell us the ages." },
  { id: "pets", q: "Can I bring my dog?", a: "Small dogs and cats in a soft carrier under the seat fly for free, one per passenger. Assistance dogs fly at no charge on the floor in front of the back row. Larger pets can't fly with us yet." },
  { id: "cancel", q: "What if my plans change?", a: "Change the time or the route for free until two hours before you lift. Cancel more than two hours out and you get the whole fare back; inside two hours we keep half. Commuter flights you don't use roll over to the next month." },
  { id: "noise", q: "Will my neighbours hear it?", a: "Barely. On take-off we're about as loud as a conversation across a table at 100 metres; in cruise overhead, quieter than the traffic below. We publish a noise map for every pad and keep away from homes before 07:00 and after 22:00." },
]

/**
 * The questions people ask after they've seen the price, answered plainly.
 * Each item can be opened from the editor's Actions row.
 */
export function ExperienceFaq({ title = "Before you fly." }: { title?: string }) {
  const [open, setOpen] = useState<string[]>([])
  return (
    <section data-header-tone="dark" className="relative border-t border-line py-(--spacing-section)">
      {FAQS.map((f) => (
        <FaqAction key={f.id} id={f.id} label={f.q} open={open.includes(f.id)} setOpen={setOpen} />
      ))}
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-4">
          <Reveal className="lg:sticky lg:top-28">
            <p className="text-micro text-ink-3">Questions</p>
            <h2 className="type-head mt-4 text-display text-balance">{title}</h2>
            <p className="mt-6 max-w-[30ch] text-body text-ink-3">
              Anything else, write to <a className="link-line text-ink" href="mailto:hello@aerie.example">hello@aerie.example</a>. A person answers, usually within the hour.
            </p>
          </Reveal>
        </div>
        <Accordion type="multiple" value={open} onValueChange={setOpen} className="border-t border-line lg:col-span-7 lg:col-start-6">
          {FAQS.map((f) => (
            <AccordionItem key={f.id} value={f.id} className="border-line">
              <AccordionTrigger className="min-h-11 py-6 text-h4 font-medium tracking-[-0.024em] hover:no-underline [&>svg]:size-5 [&>svg]:text-ink-3">{f.q}</AccordionTrigger>
              <AccordionContent className="max-w-[58ch] pb-7 text-body text-ink-2">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  )
}

function FaqAction({ id, label, open, setOpen }: { id: string; label: string; open: boolean; setOpen: React.Dispatch<React.SetStateAction<string[]>> }) {
  useCanvasAction(
    label,
    (next) => setOpen((list) => ((next ?? !open) ? [...list.filter((x) => x !== id), id] : list.filter((x) => x !== id))),
    { on: open, group: "FAQ" },
  )
  return null
}
