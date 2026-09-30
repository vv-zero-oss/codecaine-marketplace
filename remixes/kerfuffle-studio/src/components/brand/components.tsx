import { Mail, Phone, Send } from "lucide-react"

import { ComponentSpecimen, StateLabel } from "@/components/brand/specimen"
import { CountUp } from "@/components/motion/count-up"
import { FanCards } from "@/components/motion/fan-cards"
import { ImageTrail } from "@/components/motion/image-trail"
import { Marquee } from "@/components/motion/marquee"
import { Reveal } from "@/components/motion/reveal"
import { ScrollBadge } from "@/components/motion/scroll-badge"
import { StickerBurst } from "@/components/motion/sticker-burst"
import { ClientRow } from "@/components/sections/hero"
import { ContactForm } from "@/components/sections/contact-form"
import { ServiceCard } from "@/components/sections/services-fan"
import { Portrait } from "@/components/sections/team"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button, ButtonLink } from "@/components/ui/button"
import { DisplayHeading, Eyebrow } from "@/components/ui/heading"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Polaroid } from "@/components/ui/polaroid"
import { ScribbleLink } from "@/components/ui/scribble-link"
import { Emblem, Sticker } from "@/components/ui/sticker"
import { Textarea } from "@/components/ui/textarea"
import { Wordmark } from "@/components/ui/wordmark"
import { CaseFrame } from "@/components/work/case-frame"
import { WorkCard } from "@/components/work/work-card"
import { CASES, FAQ, photo, SERVICES, TEAM, TRAIL } from "@/content"

/**
 * Every component in the project, live — the real ones, imported from where
 * the pages import them, in their variants and states.
 */
export function ComponentLibrary() {
  return (
    <div className="space-y-8">
      <ComponentSpecimen
        name="Button / ButtonLink"
        source="components/ui/button.tsx"
        description="An icon cell and a label cell. Four tones, three sizes; the arrow slides through on hover, the button sinks on press. Internal hrefs go through the page transition."
        code={`<ButtonLink href="/about" label="More about us" />\n<Button tone="pink" size="lg" icon={Send} label="Send your brief" loading={sending} />`}
      >
        <div className="space-y-8">
          <div className="flex flex-wrap items-end gap-6">
            <StateLabel label="tone=blue">
              <Button label="More about us" />
            </StateLabel>
            <StateLabel label="tone=pink">
              <Button tone="pink" label="View our work" />
            </StateLabel>
            <StateLabel label="tone=white">
              <Button tone="white" label="Contact" />
            </StateLabel>
            <StateLabel label="tone=ink">
              <Button tone="ink" label="Read more" />
            </StateLabel>
          </div>
          <div className="flex flex-wrap items-end gap-6">
            <StateLabel label="size=sm">
              <Button size="sm" label="Small" />
            </StateLabel>
            <StateLabel label="size=md">
              <Button label="Medium" />
            </StateLabel>
            <StateLabel label="size=lg · icon">
              <Button size="lg" icon={Send} label="Large" />
            </StateLabel>
            <StateLabel label="icon=Phone / Mail">
              <div className="flex gap-2">
                <ButtonLink href="tel:+31102048817" tone="pink" icon={Phone} label="Call us" />
                <ButtonLink href="mailto:hello@kerfuffle.studio" icon={Mail} label="Email us" />
              </div>
            </StateLabel>
          </div>
          <div className="flex flex-wrap items-end gap-6">
            <StateLabel label="focus">
              <Button label="Focused" className="outline-2 outline-offset-3 outline-blue" />
            </StateLabel>
            <StateLabel label="loading">
              <Button label="Sending…" loading />
            </StateLabel>
            <StateLabel label="disabled">
              <Button label="Disabled" disabled />
            </StateLabel>
          </div>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="ScribbleLink"
        source="components/ui/scribble-link.tsx"
        description="The “Discover more” link: serif, a hand-drawn blue loop under it, a square arrow. The loop redraws on hover when not drawn."
        code={`<ScribbleLink href="/what-we-do" label="Discover more" />\n<ScribbleLink href="/#intro" direction="down" drawn={false} />`}
      >
        <div className="flex flex-wrap items-center gap-10">
          <StateLabel label="drawn (default)">
            <ScribbleLink href="/brand" label="Discover more" />
          </StateLabel>
          <StateLabel label="drawn=false · hover to draw">
            <ScribbleLink href="/brand" label="Meet the crew" direction="down" drawn={false} />
          </StateLabel>
          <div className="bg-night p-5">
            <StateLabel label="tone=snow">
              <ScribbleLink href="/brand" label="See the reel" tone="snow" />
            </StateLabel>
          </div>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="DisplayHeading / Eyebrow"
        source="components/ui/heading.tsx"
        description="Serif eyebrow, heavy condensed caps, answered by a serif line — stacked or inline, three sizes, centred or left."
        code={`<DisplayHeading eyebrow="Who we are" bold="The makers at" serif="Kerfuffle" size="md" />`}
      >
        <div className="grid gap-10 md:grid-cols-2">
          <DisplayHeading eyebrow="Who we are" bold="The makers at" serif="Kerfuffle" size="md" />
          <DisplayHeading eyebrow="Recent" bold="Recent" serif="work" inline size="md" align="left" />
          <Eyebrow>Eyebrow alone: too good to scroll past.</Eyebrow>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Wordmark / Emblem / Sticker"
        source="components/ui/wordmark.tsx · components/ui/sticker.tsx"
        description="The signature in three tones; the KF seal; die-cut stickers in six colours."
        code={`<Wordmark tone="blue" />\n<Emblem />\n<Sticker text="No fluff!" tone="blue" rotate={-6} />`}
      >
        <div className="flex flex-wrap items-center gap-8">
          <Wordmark />
          <span className="bg-night px-4 py-2">
            <Wordmark tone="snow" />
          </span>
          <Wordmark tone="ink" />
          <Emblem className="text-4xl" />
          {(["blue", "green", "red", "pink", "orange", "yellow"] as const).map((tone, i) => (
            <Sticker key={tone} text={tone} tone={tone} rotate={i % 2 ? 5 : -5} />
          ))}
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="WorkCard / CaseFrame"
        source="components/work/"
        description="A case in the grid (hover it: a “View case” pill follows the pointer) and in the reel's coloured frame."
        code={`<WorkCard item={CASES[0]} />\n<CaseFrame item={CASES[1]} />`}
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <WorkCard item={CASES[0]} />
          <div className="aspect-[4/3] sm:col-span-1 lg:col-span-2">
            <CaseFrame item={CASES[1]} />
          </div>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="ServiceCard / FanCards"
        source="components/sections/services-fan.tsx · components/motion/fan-cards.tsx"
        description="Service cards in the three service colours, fanned out on scroll. Props: spread."
        code={`<FanCards spread={1}>{SERVICES.map((s) => <ServiceCard service={s} />)}</FanCards>`}
      >
        <FanCards spread={0.8}>
          {SERVICES.map((service) => (
            <ServiceCard key={service.key} service={service} />
          ))}
        </FanCards>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Portrait / Polaroid"
        source="components/sections/team.tsx · components/ui/polaroid.tsx"
        description="A crew portrait with its name set in bubble type (and, on the about page, the role); a polaroid for snapshots."
        code={`<Portrait person={TEAM[0]} showRole />\n<Polaroid src={photo(6141089, 900)} alt="…" rotate={-4} />`}
      >
        <div className="grid gap-6 sm:grid-cols-3">
          <Portrait person={TEAM[0]} />
          <Portrait person={TEAM[1]} showRole tilt={2} />
          <Polaroid src={photo(6141089, 600)} alt="The crew outside the studio" rotate={-4} className="aspect-[4/5]" />
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="ImageTrail"
        source="components/motion/image-trail.tsx"
        description="Pictures dropped under the pointer every `spacing` px, each gone after `lifetime` ms; draws its own figure-eight when idle. Move over the box."
        code={`<ImageTrail images={TRAIL.join("|")} spacing={110} lifetime={1100} size={240} />`}
      >
        <div className="relative h-80 overflow-hidden bg-card">
          <ImageTrail images={TRAIL.join("|")} size={160} />
          <p className="pointer-events-none relative z-10 flex h-full items-center justify-center display text-6xl">Move here</p>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Marquee / ClientRow"
        source="components/motion/marquee.tsx"
        description="An endless CSS row: duration, direction, gap, pause on hover."
        code={`<Marquee duration={36} direction="left" gap={88}>{…}</Marquee>`}
      >
        <div className="space-y-6">
          <ClientRow className="pt-0" />
          <Marquee duration={20} direction="right" gap={24}>
            {["No fluff!", "Pixel pushers", "Always in motion", "Made in Rotterdam"].map((t, i) => (
              <Sticker key={t} text={t} tone={(["blue", "pink", "yellow", "red"] as const)[i]} rotate={0} className="text-base md:text-lg" />
            ))}
          </Marquee>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="StickerBurst"
        source="components/motion/sticker-burst.tsx"
        description="Stickers that pop onto whatever it wraps; click to add one. Registered as the “Stickers” action."
        code={`<StickerBurst count={6}><h1>…</h1></StickerBurst>`}
      >
        <StickerBurst count={4} className="bg-card py-16">
          <p className="text-center display text-7xl">Click me</p>
        </StickerBurst>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="ScrollBadge / CountUp / Reveal"
        source="components/motion/"
        description="A badge that turns with the scroll; a number that counts up once in view; a block that rises into place."
        code={`<ScrollBadge text="This is how we scroll • " perTurn={1400} />\n<CountUp value={140} suffix="+" />\n<Reveal delay={0.1}>…</Reveal>`}
      >
        <div className="flex flex-wrap items-center gap-10">
          <ScrollBadge />
          <CountUp value={140} suffix="+" className="display text-7xl" />
          <Reveal>
            <p className="font-serif text-3xl">I rose into place.</p>
          </Reveal>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Input / Textarea / Label"
        source="components/ui/input.tsx · textarea.tsx · label.tsx (shadcn)"
        description="Square fields on paper that turn white with a blue edge on focus, red when invalid."
        code={`<Label htmlFor="email">Email</Label>\n<Input id="email" type="email" aria-invalid={!!error} />`}
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <StateLabel label="default">
            <div className="grid w-full gap-2">
              <Label htmlFor="s-name" className="label text-sm">Your name</Label>
              <Input id="s-name" placeholder="Sam de Vries" />
            </div>
          </StateLabel>
          <StateLabel label="invalid">
            <div className="grid w-full gap-2">
              <Label htmlFor="s-email" className="label text-sm">Email</Label>
              <Input id="s-email" aria-invalid defaultValue="sam@" />
              <p className="text-sm text-red">We need an email address we can reply to.</p>
            </div>
          </StateLabel>
          <StateLabel label="disabled">
            <Input disabled placeholder="Not now" />
          </StateLabel>
          <StateLabel label="textarea">
            <Textarea placeholder="What should move?" />
          </StateLabel>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Accordion (FAQ)"
        source="components/ui/accordion.tsx (shadcn)"
        description="Serif questions on ink hairlines; the chevron turns blue."
        code={`<Accordion type="single" collapsible>…</Accordion>`}
      >
        <Accordion type="single" collapsible defaultValue="q0" className="border-t border-ink">
          {FAQ.slice(0, 2).map((item, i) => (
            <AccordionItem key={item.q} value={`q${i}`} className="border-ink">
              <AccordionTrigger className="rounded-none py-4 font-serif text-2xl hover:no-underline [&>svg]:size-5 [&>svg]:text-blue">{item.q}</AccordionTrigger>
              <AccordionContent className="text-base text-ink-soft">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="ContactForm"
        source="components/sections/contact-form.tsx"
        description="The brief form: inline validation, chips for kind and budget, a shake on a bad submit, a loading button and a thank-you that uses your name."
        code={`<ContactForm />`}
      >
        <ContactForm />
      </ComponentSpecimen>
    </div>
  )
}
