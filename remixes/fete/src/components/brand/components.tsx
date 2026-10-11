import { useState } from "react"
import { ArrowRight, Loader2 } from "lucide-react"

import { ComponentSpecimen, StateLabel } from "@/components/brand/specimen"
import { EventCard } from "@/components/blocks/event-card"
import { SectionHeading } from "@/components/blocks/section-heading"
import { InviteCard, TicketCode } from "@/components/mock/invite-card"
import { Phone } from "@/components/mock/phone"
import { Poster } from "@/components/mock/poster"
import { ScreenCheckIn, ScreenInvite } from "@/components/mock/story-screens"
import { Marquee } from "@/components/motion/marquee"
import { MoodBackdrop } from "@/components/motion/mood-backdrop"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { EVENTS, findEvent } from "@/content/events"

function ButtonSpecimen() {
  return (
    <ComponentSpecimen
      name="Button"
      source="components/ui/button.tsx"
      description="Always a pill. Ink is the one thing to press; outline and soft sit beside it; glass lives on a mood. Presses scale to .97 in 140ms."
      code={`<Button>Host your first event</Button>
<Button variant="outline">Find something tonight</Button>
<ButtonLink href="/create" variant="soft">Sign in</ButtonLink>`}
    >
      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap items-end gap-6">
          {(["ink", "outline", "soft", "ghost", "link"] as const).map((v) => (
            <StateLabel key={v} label={v}>
              <Button variant={v}>{v === "link" ? <>Find something <ArrowRight /></> : "Get my ticket"}</Button>
            </StateLabel>
          ))}
          <StateLabel label="glass (on a mood)">
            <div className="relative overflow-hidden rounded-full p-2">
              <MoodBackdrop mood="electric" />
              <Button variant="glass" className="relative">Host your first event</Button>
            </div>
          </StateLabel>
        </div>
        <div className="flex flex-wrap items-end gap-6">
          <StateLabel label="sm"><Button size="sm">Sign in</Button></StateLabel>
          <StateLabel label="default"><Button>Next</Button></StateLabel>
          <StateLabel label="lg"><Button size="lg">Publish page</Button></StateLabel>
          <StateLabel label="hover"><Button className="bg-ink-2">Hovered</Button></StateLabel>
          <StateLabel label="focus"><Button className="ring-[3px] ring-ink/15">Focused</Button></StateLabel>
          <StateLabel label="loading"><Button disabled><Loader2 className="animate-spin" /> Publishing</Button></StateLabel>
          <StateLabel label="disabled"><Button disabled>Get my ticket</Button></StateLabel>
        </div>
      </div>
    </ComponentSpecimen>
  )
}

function FieldsSpecimen() {
  const [on, setOn] = useState(true)
  const [cap, setCap] = useState([60])
  return (
    <ComponentSpecimen
      name="Input, Switch, Slider"
      source="components/ui/input.tsx · switch.tsx · slider.tsx"
      description="White fields on a soft hairline shadow; focus draws a 1.5px ink ring, an error a red one. Switches and sliders are shadcn, recoloured to ink."
      code={`<Input placeholder="Sunday Supper Club" aria-invalid={missing} />
<Switch checked={free} onCheckedChange={setFree} />
<Slider value={[capacity]} min={8} max={400} onValueChange={([v]) => setCapacity(v)} />`}
      tone="panel"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <StateLabel label="default" className="items-stretch"><Input placeholder="Event name" /></StateLabel>
        <StateLabel label="focus" className="items-stretch"><Input defaultValue="Golden Hour Rooftop" className="shadow-[0_0_0_1.5px_var(--color-ink)]" /></StateLabel>
        <StateLabel label="error" className="items-stretch"><Input aria-invalid placeholder="Give it a name" /></StateLabel>
        <StateLabel label="disabled" className="items-stretch"><Input disabled defaultValue="Published" /></StateLabel>
        <StateLabel label={`switch — ${on ? "on" : "off"}`}><Switch checked={on} onCheckedChange={setOn} /></StateLabel>
        <StateLabel label={`slider — ${cap[0]}`} className="items-stretch"><Slider value={cap} min={8} max={400} step={4} onValueChange={setCap} /></StateLabel>
      </div>
    </ComponentSpecimen>
  )
}

function BadgeSpecimen() {
  return (
    <ComponentSpecimen name="Badge" source="components/ui/badge.tsx" description="Prices, statuses and plus-ones. Colour is never the only cue — the word is always there." code={`<Badge variant="green">Free</Badge>`}>
      <div className="flex flex-wrap gap-4">
        {(["default", "berry", "green", "amber", "blue", "red", "outline"] as const).map((v) => (
          <StateLabel key={v} label={v}>
            <Badge variant={v}>{{ default: "$28", berry: "Plus", green: "Free", amber: "+1", blue: "New", red: "Sold out", outline: "Draft" }[v]}</Badge>
          </StateLabel>
        ))}
      </div>
    </ComponentSpecimen>
  )
}

function SheetAccordionSpecimen() {
  return (
    <ComponentSpecimen
      name="Sheet and Accordion"
      source="components/ui/sheet.tsx · accordion.tsx"
      description="The event sheet in Discover and the mobile menu are shadcn sheets; the pricing FAQ is a shadcn accordion."
      code={`<Sheet open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
  <SheetContent side="right"><InviteCard eventId={open.id} /></SheetContent>
</Sheet>`}
    >
      <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-start">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open a sheet</Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-panel p-6">
            <SheetTitle>Cocktail Hour, Volume 9</SheetTitle>
            <SheetDescription>Sheets slide in from the side on a strong ease-out.</SheetDescription>
          </SheetContent>
        </Sheet>
        <Accordion type="single" collapsible defaultValue="a" className="border-t border-line">
          <AccordionItem value="a" className="border-b border-line">
            <AccordionTrigger className="text-[17px] text-ink hover:no-underline">When do I get paid?</AccordionTrigger>
            <AccordionContent className="text-[15px] text-ink-3">Two business days after each event.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="b" className="border-b border-line">
            <AccordionTrigger className="text-[17px] text-ink hover:no-underline">Can I bring my mailing list?</AccordionTrigger>
            <AccordionContent className="text-[15px] text-ink-3">Import a CSV any time.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </ComponentSpecimen>
  )
}

function PosterSpecimen() {
  const picks = ["cocktail-hour", "book-talk", "poker-night", "breathe"].map((id) => findEvent(id)!)
  return (
    <ComponentSpecimen
      name="Poster"
      source="components/mock/poster.tsx"
      description="An event’s artwork in a 5px white mat with the poster shadow. Four faces — block, serif, script, outline — over a photo or a flat ground. Real type, so it scales."
      code={`<Poster event={findEvent("cocktail-hour")} className="size-40" />`}
      tone="panel"
    >
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
        {picks.map((e) => (
          <StateLabel key={e.id} label={e.poster.type} className="items-stretch">
            <Poster event={e} className="aspect-square w-full" />
          </StateLabel>
        ))}
      </div>
    </ComponentSpecimen>
  )
}

function CardsSpecimen() {
  return (
    <ComponentSpecimen
      name="EventCard and SectionHeading"
      source="components/blocks/event-card.tsx · section-heading.tsx"
      description="Cards lift their poster and tilt it a degree on hover; the whole card is one button. Headings come in the reference’s small row size or the loud two-tone size."
      code={`<SectionHeading title="This season’s big ones" link="/discover" />
<SectionHeading size="loud" title="Say yes in one tap." continuation="No account, no fuss." />
<EventCard event={event} onOpen={setOpen} />`}
    >
      <SectionHeading title="This season’s big ones" link="/discover" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {EVENTS.slice(3, 6).map((e) => (
          <EventCard key={e.id} event={e} />
        ))}
      </div>
      <div className="mt-10">
        <SectionHeading size="loud" title="Say yes in one tap." continuation="No account, no fuss." className="mb-0 md:mb-0" />
      </div>
    </ComponentSpecimen>
  )
}

function InviteSpecimen() {
  return (
    <ComponentSpecimen
      name="InviteCard and ticket"
      source="components/mock/invite-card.tsx"
      description="A working RSVP: Going / Maybe / Can’t go on a sliding pill, a name, plus-ones, then a ticket whose code is drawn from your name. Confetti for the yes, and only for the yes."
      code={`<InviteCard eventId="cocktail-hour" maxPlusOnes={3} />`}
      tone="panel"
    >
      <div className="grid items-start gap-8 md:grid-cols-[1fr_auto]">
        <InviteCard eventId="rooftop" />
        <StateLabel label="ticket code — seeded by name">
          <span className="rounded-[10px] bg-raised p-2 text-ink shadow-(--shadow-card)">
            <TicketCode seed="Alex Rivera" className="size-24" />
          </span>
        </StateLabel>
      </div>
    </ComponentSpecimen>
  )
}

function PhoneSpecimen() {
  return (
    <ComponentSpecimen
      name="Phone and story screens"
      source="components/mock/phone.tsx · story-screens.tsx"
      description="A 390×844 frame with an SVG status bar and island. Screens size in cqw and take t (0–1) — the pinned story drives it with scroll."
      code={`<Phone dark><ScreenCheckIn t={0.6} /></Phone>`}
    >
      <div className="flex flex-wrap justify-center gap-8">
        <StateLabel label="ScreenInvite t=0.7"><Phone className="w-[220px]"><ScreenInvite t={0.7} /></Phone></StateLabel>
        <StateLabel label="ScreenCheckIn t=0.6, dark"><Phone dark className="w-[220px]"><ScreenCheckIn t={0.6} /></Phone></StateLabel>
      </div>
    </ComponentSpecimen>
  )
}

function MarqueeSpecimen() {
  return (
    <ComponentSpecimen name="Marquee" source="components/motion/marquee.tsx" description="A CSS loop with its content doubled; pauses on hover, stops under reduced motion and the editor’s Motion switch." code={`<Marquee speed={46}>…</Marquee>`}>
      <Marquee speed={30} className="border-y border-line py-3">
        {["Lisbon", "Brooklyn", "Seoul", "Mexico City", "Melbourne", "Berlin"].map((c) => (
          <span key={c} className="flex items-center gap-3 px-6 text-[16px] text-ink-2">
            {c} <span className="size-1.5 rounded-full flare-fill" />
          </span>
        ))}
      </Marquee>
    </ComponentSpecimen>
  )
}

/** Every component in the project, live, in its variants and states. */
export function ComponentLibrary() {
  return (
    <div className="flex flex-col gap-8">
      <ButtonSpecimen />
      <FieldsSpecimen />
      <BadgeSpecimen />
      <SheetAccordionSpecimen />
      <PosterSpecimen />
      <CardsSpecimen />
      <InviteSpecimen />
      <PhoneSpecimen />
      <MarqueeSpecimen />
    </div>
  )
}
