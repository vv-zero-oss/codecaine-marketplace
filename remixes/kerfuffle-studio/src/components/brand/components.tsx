import { Mail, Send } from "lucide-react"

import { ComponentSpecimen, StateLabel } from "@/components/brand/specimen"
import { CountUp } from "@/components/motion/count-up"
import { HoverPreview } from "@/components/motion/hover-preview"
import { ImageTrail } from "@/components/motion/image-trail"
import { Marquee } from "@/components/motion/marquee"
import { Reveal } from "@/components/motion/reveal"
import { ContactForm } from "@/components/sections/contact-form"
import { ServiceRow } from "@/components/sections/services"
import { Portrait } from "@/components/sections/team"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowLink } from "@/components/ui/arrow-link"
import { Button, ButtonLink } from "@/components/ui/button"
import { SectionHeader } from "@/components/ui/heading"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Wordmark } from "@/components/ui/wordmark"
import { CaseFrame } from "@/components/work/case-frame"
import { WorkCard } from "@/components/work/work-card"
import { CASES, CLIENTS, FAQ, photo, SERVICES, TEAM, TRAIL } from "@/content"

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
        description="Solid, 4px corners, label then a small arrow that nudges on hover; squeezes to 0.97 on press. Internal hrefs go through the page transition."
        code={`<ButtonLink href="/contact" label="Start a project" />\n<Button tone="ink" size="lg" icon={Send} label="Send brief" loading={sending} />`}
      >
        <div className="space-y-8">
          <div className="flex flex-wrap items-end gap-6">
            <StateLabel label="tone=ink">
              <Button label="Start a project" />
            </StateLabel>
            <StateLabel label="tone=accent">
              <Button tone="accent" label="Send brief" icon={Send} />
            </StateLabel>
            <StateLabel label="tone=outline">
              <Button tone="outline" label="All projects" />
            </StateLabel>
            <div className="bg-night p-4">
              <StateLabel label="tone=snow">
                <ButtonLink href="mailto:hello@kerfuffle.studio" tone="snow" icon={Mail} label="Write to us" />
              </StateLabel>
            </div>
          </div>
          <div className="flex flex-wrap items-end gap-6">
            <StateLabel label="size=lg">
              <Button size="lg" label="Large" />
            </StateLabel>
            <StateLabel label="focus">
              <Button label="Focused" className="outline-2 outline-offset-3 outline-accent" />
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
        name="ArrowLink"
        source="components/ui/arrow-link.tsx"
        description="Text link with an arrow; the underline draws in from the left on hover."
        code={`<ArrowLink href="/work" label="All 12 projects" />\n<ArrowLink href="/#work" label="Selected work" direction="down" />`}
      >
        <div className="flex flex-wrap items-center gap-10">
          <ArrowLink href="/brand" label="All 12 projects" />
          <ArrowLink href="/brand" label="Selected work" direction="down" />
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="SectionHeader"
        source="components/ui/heading.tsx"
        description="Every section starts on the grid: numbered mono label in columns 1–3, heading from column 4, optional paragraph. Two sizes."
        code={`<SectionHeader index="02" label="Services" title="Three things, done in-house." />`}
      >
        <div className="space-y-12">
          <SectionHeader index="02" label="Services" title="Three things, done in-house." />
          <SectionHeader label="With aside" title="The people you brief make it." aside="An optional paragraph sits under the heading." />
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen name="Wordmark" source="components/ui/wordmark.tsx" description="The name with its accent full stop, on paper and on ink." code={`<Wordmark />\n<Wordmark tone="snow" />`}>
        <div className="flex flex-wrap items-center gap-8">
          <Wordmark className="text-3xl" />
          <span className="bg-night px-5 py-3">
            <Wordmark tone="snow" className="text-3xl" />
          </span>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="WorkCard / CaseFrame"
        source="components/work/"
        description="A case in the grid, and as a card in the pinned reel on ink."
        code={`<WorkCard item={CASES[0]} index={0} />\n<CaseFrame item={CASES[1]} index={1} />`}
      >
        <div className="grid gap-6 md:grid-cols-2">
          <WorkCard item={CASES[0]} index={0} />
          <div className="aspect-[4/3] bg-night p-4">
            <CaseFrame item={CASES[1]} index={1} />
          </div>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="HoverPreview / ServiceRow"
        source="components/motion/hover-preview.tsx"
        description="Rows that show a picture by the pointer while hovered; it follows on a spring (stiffness, damping) and crossfades between rows. Touch shows an inline thumbnail."
        code={`<HoverPreview images={urls.join("|")} rows={SERVICES.map((s, i) => <ServiceRow service={s} index={i} />)} />`}
      >
        <HoverPreview
          images={SERVICES.map((s) => photo(s.image, 600)).join("|")}
          width={240}
          rows={SERVICES.map((service, i) => <ServiceRow key={service.key} service={service} index={i} />)}
        />
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Portrait"
        source="components/sections/team.tsx"
        description="Greyscale until hovered; name and role under a hairline, and a line on the about page."
        code={`<Portrait person={TEAM[0]} showLine />`}
      >
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          <Portrait person={TEAM[0]} />
          <Portrait person={TEAM[1]} showLine />
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="ImageTrail"
        source="components/motion/image-trail.tsx"
        description="Pictures dropped under the pointer every `spacing` px, gone after `lifetime` ms; draws its own path when idle. Move over the box."
        code={`<ImageTrail images={TRAIL.join("|")} spacing={110} lifetime={1100} size={260} />`}
      >
        <div className="relative h-80 overflow-hidden bg-card">
          <ImageTrail images={TRAIL.join("|")} size={160} tilt={0} />
          <p className="pointer-events-none relative z-10 flex h-full items-center justify-center display text-5xl">Move here</p>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen name="Marquee" source="components/motion/marquee.tsx" description="An endless CSS row: duration, direction, gap, pause on hover." code={`<Marquee duration={50} gap={64}>{…}</Marquee>`}>
        <Marquee duration={30} gap={48}>
          {CLIENTS.map((name) => (
            <span key={name} className="text-2xl tracking-[-0.03em] whitespace-nowrap text-ink-soft">
              {name}
            </span>
          ))}
        </Marquee>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="CountUp / Reveal"
        source="components/motion/"
        description="A number that counts up once in view; a block that rises into place."
        code={`<CountUp value={140} suffix="+" />\n<Reveal delay={0.1}>…</Reveal>`}
      >
        <div className="flex flex-wrap items-end gap-10">
          <CountUp value={140} suffix="+" className="display text-7xl tabular-nums" />
          <Reveal>
            <p className="text-lg">Rises into place.</p>
          </Reveal>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Input / Textarea / Label"
        source="components/ui/ (shadcn)"
        description="Underline fields: a hairline that darkens on hover and turns ink on focus, danger when invalid."
        code={`<Label htmlFor="email">Email</Label>\n<Input id="email" type="email" aria-invalid={!!error} />`}
      >
        <div className="grid gap-8 sm:grid-cols-2">
          <StateLabel label="default">
            <div className="grid w-full gap-1">
              <Label htmlFor="s-name" className="label text-ink-mute">Name</Label>
              <Input id="s-name" placeholder="Sam de Vries" />
            </div>
          </StateLabel>
          <StateLabel label="invalid">
            <div className="grid w-full gap-1">
              <Label htmlFor="s-email" className="label text-ink-mute">Email</Label>
              <Input id="s-email" aria-invalid defaultValue="sam@" />
              <p className="text-sm text-danger">We need an address we can reply to.</p>
            </div>
          </StateLabel>
          <StateLabel label="disabled">
            <Input disabled placeholder="Not now" />
          </StateLabel>
          <StateLabel label="textarea">
            <Textarea placeholder="What should it do?" />
          </StateLabel>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen name="Accordion (FAQ)" source="components/ui/accordion.tsx (shadcn)" description="Questions on hairlines." code={`<Accordion type="single" collapsible>…</Accordion>`}>
        <Accordion type="single" collapsible defaultValue="q0">
          {FAQ.slice(0, 2).map((item, i) => (
            <AccordionItem key={item.q} value={`q${i}`} className="border-line">
              <AccordionTrigger className="rounded-none py-4 text-lg font-medium hover:no-underline">{item.q}</AccordionTrigger>
              <AccordionContent className="text-base text-ink-soft">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="ContactForm"
        source="components/sections/contact-form.tsx"
        description="Inline validation, chips for kind and budget, a shake on a bad submit, a loading button and a confirmation."
        code={`<ContactForm />`}
      >
        <ContactForm />
      </ComponentSpecimen>
    </div>
  )
}

