import { Check } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useState, type FormEvent } from "react"

import { useCanvasAction } from "@canvas/react"
import { FadeUp } from "@/components/motion/reveal"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MixedTitle } from "@/components/ui/mixed-title"
import { SectionHeading } from "@/components/ui/section-heading"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { appointments, brand } from "@/content"

export const field = "h-12 rounded-none border-0 border-b border-ink/30 bg-transparent px-0 font-sans text-[16px] shadow-none focus-visible:border-ink focus-visible:ring-0"

/**
 * Appointments: the workroom photograph pinned on the left, the booking
 * form on the right, with its sent state and the FAQ below.
 */
export function AppointmentsPage() {
  const [sent, setSent] = useState(false)
  const [faq, setFaq] = useState("")
  useCanvasAction("Booking sent", (next) => setSent(next ?? !sent), { on: sent, group: "Appointments" })
  useCanvasAction("First question open", (next) => setFaq((next ?? faq === "") ? appointments.faq[0].q : ""), { on: faq === appointments.faq[0].q, group: "Appointments" })

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSent(true)
  }

  return (
    <div className="grid lg:grid-cols-2">
      <div className="p-2 pt-[88px] lg:pt-2">
        <div className="aspect-[4/5] overflow-hidden lg:sticky lg:top-2 lg:aspect-auto lg:h-[calc(100svh-16px)]">
          <img src={appointments.image.src} alt={appointments.image.alt} className="size-full bg-paper-deep object-cover" />
        </div>
      </div>
      <div className="px-gutter pb-section pt-12 lg:pt-[clamp(140px,20vh,220px)]">
        <FadeUp>
          <SectionHeading as="h1" eyebrow={appointments.eyebrow} title={appointments.title} align="left" size="lg" />
          <p className="mt-6 max-w-[48ch] font-serif text-[18px] leading-[1.6] text-ink-soft">{appointments.intro}</p>
        </FadeUp>
        <div className="mt-14 min-h-[560px]">
          <AnimatePresence mode="wait" initial={false}>
            {sent ? (
              <motion.div key="sent" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="flex flex-col items-start gap-5 bg-chip p-8 shadow-chip sm:p-12">
                <span className="grid size-12 place-items-center rounded-full bg-ink text-paper">
                  <Check className="size-5" />
                </span>
                <MixedTitle as="h2" text="_we have your_ REQUEST." className="text-[clamp(36px,4vw,64px)] leading-[0.9]" />
                <p className="max-w-[44ch] font-serif text-[17px] leading-[1.6] text-ink-soft">
                  A tailor will write within a working day to confirm the time. If it is sooner than that, call us on {brand.phone}.
                </p>
                <Button variant="chip" size="chip" onClick={() => setSent(false)}>
                  <MixedTitle as="span" text="Book _another_" />
                </Button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={submit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -12 }} className="grid gap-8 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name" className="font-sans text-[13px] font-normal uppercase tracking-[0.06em]">Name</Label>
                  <Input id="name" required autoComplete="name" className={field} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email" className="font-sans text-[13px] font-normal uppercase tracking-[0.06em]">Email</Label>
                  <Input id="email" type="email" required autoComplete="email" className={field} />
                </div>
                <div className="flex flex-col gap-2 sm:col-span-2">
                  <Label htmlFor="kind" className="font-sans text-[13px] font-normal uppercase tracking-[0.06em]">Appointment</Label>
                  <Select defaultValue={appointments.kinds[0].value}>
                    <SelectTrigger id="kind" className={`${field} w-full data-[size=default]:h-12`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-none border-line bg-chip">
                      {appointments.kinds.map((kind) => (
                        <SelectItem key={kind.value} value={kind.value} className="rounded-none py-3 font-sans text-[15px]">
                          {kind.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="date" className="font-sans text-[13px] font-normal uppercase tracking-[0.06em]">Preferred day</Label>
                  <Input id="date" type="date" required className={field} />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-sans text-[13px] uppercase tracking-[0.06em]">Time of day</span>
                  <ToggleGroup type="single" defaultValue="morning" className="flex w-full gap-2" aria-label="Time of day">
                    {["morning", "afternoon", "evening"].map((time) => (
                      <ToggleGroupItem key={time} value={time} className="h-12 flex-1 rounded-none border border-line-strong bg-transparent font-sans text-[14px] capitalize hover:border-ink hover:bg-transparent data-[state=on]:border-ink data-[state=on]:bg-ink data-[state=on]:text-paper">
                        {time}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </div>
                <div className="flex flex-col gap-2 sm:col-span-2">
                  <Label htmlFor="notes" className="font-sans text-[13px] font-normal uppercase tracking-[0.06em]">What would you like to see?</Label>
                  <Textarea id="notes" rows={4} className="min-h-28 rounded-none border-0 border-b border-ink/30 bg-transparent px-0 font-sans text-[16px] shadow-none focus-visible:border-ink focus-visible:ring-0" />
                </div>
                <Button type="submit" variant="ink" size="chip" className="w-full sm:col-span-2 sm:w-fit sm:px-14">
                  <MixedTitle as="span" text="Request _an_ APPOINTMENT" />
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
        <div className="mt-20 grid gap-10 border-t border-ink/15 pt-10 sm:grid-cols-2">
          <div>
            <p className="font-sans text-[13px] uppercase tracking-[0.06em]">Hours</p>
            <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 font-serif text-[17px]">
              {appointments.hours.map(([day, time]) => (
                <div key={day} className="contents">
                  <dt className="text-ink-muted">{day}</dt>
                  <dd>{time}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <p className="font-sans text-[13px] uppercase tracking-[0.06em]">The house</p>
            <p className="mt-4 font-serif text-[17px] leading-[1.6]">
              {brand.address[0]}
              <br />
              {brand.address[1]}
              <br />
              <a href={`mailto:${brand.email}`} className="underline underline-offset-4">{brand.email}</a>
            </p>
          </div>
        </div>
        <Accordion type="single" collapsible value={faq} onValueChange={setFaq} className="mt-16 border-t border-line">
          {appointments.faq.map((item) => (
            <AccordionItem key={item.q} value={item.q} className="border-line">
              <AccordionTrigger className="rounded-none py-5 font-sans text-[16px] font-normal hover:no-underline">{item.q}</AccordionTrigger>
              <AccordionContent className="font-serif text-[17px] leading-[1.6] text-ink-soft">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
