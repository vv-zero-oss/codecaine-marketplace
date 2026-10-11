import { useState } from "react"
import { ArrowRight, Loader2, RotateCcw } from "lucide-react"

import { ComponentSpecimen, StateLabel } from "@/components/brand/specimen"
import { SectionHeading } from "@/components/blocks/section-heading"
import { TemplateCard } from "@/components/blocks/template-card"
import { CityMap } from "@/components/map/city-map"
import { BrowserFrame, SkyPanel } from "@/components/map/frames"
import { GuidePanel, MapGuide } from "@/components/map/map-guide"
import { MapPin, PlaceCard } from "@/components/map/map-pin"
import { CountUp } from "@/components/motion/count-up"
import { StickerField } from "@/components/motion/sticker-field"
import { Typewriter } from "@/components/motion/typewriter"
import { UseCaseCard } from "@/components/sections/home/hero"
import { StoryStage } from "@/components/sections/home/map-story"
import { MapStudio } from "@/components/sections/studio/map-studio"
import { ShareDialog } from "@/components/sections/studio/share-dialog"
import { SignIn } from "@/components/site/sign-in"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button, ButtonLink } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { placeById, placesById } from "@/content/places"
import { TEMPLATES } from "@/content/templates"
import { pexels, SKIES } from "@/lib/photos"
import { cn } from "@/lib/utils"

function ButtonSpecimen() {
  return (
    <ComponentSpecimen
      name="Button"
      source="components/ui/button.tsx"
      description="An 8px radius. Primary is royal blue held in by a darker 1px edge and a soft blue shadow; outline is white on a hairline. A press sinks it to .97 in 140ms."
      code={`<ButtonLink href="/studio" size="lg">Make a map for free</ButtonLink>
<Button variant="outline">Copy embed code</Button>
<Button variant="link">See all templates <ArrowRight /></Button>`}
    >
      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap items-end gap-6">
          {(["primary", "outline", "ink", "soft", "ghost", "link"] as const).map((v) => (
            <StateLabel key={v} label={v}>
              <Button variant={v}>{v === "link" ? <>See all templates <ArrowRight /></> : "Make a map"}</Button>
            </StateLabel>
          ))}
        </div>
        <div className="flex flex-wrap items-end gap-6">
          <StateLabel label="sm"><Button size="sm">Share</Button></StateLabel>
          <StateLabel label="default"><Button>Try it for free</Button></StateLabel>
          <StateLabel label="lg"><Button size="lg">Make a map for free</Button></StateLabel>
          <StateLabel label="hover"><Button className="bg-accent-hover">Hovered</Button></StateLabel>
          <StateLabel label="focus"><Button className="ring-[3px] ring-accent/30">Focused</Button></StateLabel>
          <StateLabel label="loading"><Button disabled><Loader2 className="animate-spin" /> Sending</Button></StateLabel>
          <StateLabel label="disabled"><Button disabled>Pin it</Button></StateLabel>
        </div>
      </div>
    </ComponentSpecimen>
  )
}

function FieldsSpecimen() {
  const [on, setOn] = useState(true)
  const [v, setV] = useState([40])
  return (
    <ComponentSpecimen
      name="Input, Switch, Slider, Badge"
      source="components/ui/input.tsx · switch.tsx · slider.tsx · badge.tsx"
      description="shadcn's controls in the page's dress: white fields on a hairline shadow, an accent ring on focus and a red one when invalid."
      code={`<Input placeholder="you@example.com" aria-invalid={!!error} />
<Switch checked={labels} onCheckedChange={setLabels} />
<Slider value={[stop]} max={8} step={1} onValueChange={([v]) => setStop(v)} />
<Badge>Travel</Badge>`}
    >
      <div className="grid gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <StateLabel label="default" className="w-full"><Input placeholder="you@example.com" /></StateLabel>
          <StateLabel label="focus" className="w-full"><Input defaultValue="rowan@studio.example" className="shadow-[0_0_0_1.5px_var(--color-accent)]" /></StateLabel>
          <StateLabel label="invalid" className="w-full"><Input defaultValue="rowan@studio" aria-invalid /></StateLabel>
          <StateLabel label="disabled" className="w-full"><Input disabled placeholder="Disabled" /></StateLabel>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex items-end gap-6">
            <StateLabel label={on ? "on" : "off"}><Switch checked={on} onCheckedChange={setOn} /></StateLabel>
            <StateLabel label="disabled"><Switch disabled /></StateLabel>
          </div>
          <StateLabel label={`slider · ${v[0]}`} className="w-full"><Slider value={v} onValueChange={setV} /></StateLabel>
          <div className="flex flex-wrap items-end gap-3">
            <StateLabel label="default"><Badge>Travel</Badge></StateLabel>
            <StateLabel label="outline"><Badge variant="outline">Events</Badge></StateLabel>
          </div>
        </div>
      </div>
    </ComponentSpecimen>
  )
}

function OverlaysSpecimen() {
  return (
    <ComponentSpecimen
      name="Accordion, Sheet, Sign-in dialog"
      source="components/ui/accordion.tsx · sheet.tsx · site/sign-in.tsx"
      description="The FAQ's accordion, the mobile menu's sheet, and the sign-in dialog — validated email, loading, sent. Each is an editor action too."
      code={`<SignIn />
<Sheet><SheetTrigger>Menu</SheetTrigger><SheetContent side="right">…</SheetContent></Sheet>`}
    >
      <div className="grid gap-8 md:grid-cols-2">
        <Accordion type="single" collapsible defaultValue="a">
          <AccordionItem value="a" className="border-line">
            <AccordionTrigger className="text-[16px] text-ink hover:no-underline">What counts as a map view?</AccordionTrigger>
            <AccordionContent className="text-ink-3">One person opening one map, once.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="b" className="border-line">
            <AccordionTrigger className="text-[16px] text-ink hover:no-underline">Can I cancel?</AccordionTrigger>
            <AccordionContent className="text-ink-3">Any time, from Settings.</AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="flex flex-wrap items-start gap-3">
          <SignIn />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Open a sheet</Button>
            </SheetTrigger>
            <SheetContent side="right" className="border-l-0 bg-page p-6">
              <SheetTitle className="type-serif text-h3">A sheet</SheetTitle>
              <SheetDescription className="text-ink-3">The mobile menu slides in from here.</SheetDescription>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </ComponentSpecimen>
  )
}

function MapSpecimen() {
  const [theme, setTheme] = useState<"paper" | "harbour" | "meadow" | "dusk">("harbour")
  return (
    <ComponentSpecimen
      name="CityMap"
      source="components/map/city-map.tsx · map-base.tsx"
      description="The working map every mockup is made of. Drag, zoom, double-click, pick a pin. The view and the look are scalar props, so the editor can drive them."
      code={`<CityMap places={places} theme="harbour" pinStyle="photo" zoom={1.4} centerX={640} centerY={330} />`}
      tone="panel"
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          {(["paper", "harbour", "meadow", "dusk"] as const).map((t) => (
            <Button key={t} size="sm" variant={t === theme ? "ink" : "outline"} onClick={() => setTheme(t)} className="capitalize">
              {t}
            </Button>
          ))}
        </div>
        <CityMap places={placesById(["ferrol", "pilot", "second-shelf", "room-eleven", "farmers", "ferry", "lighthouse"])} theme={theme} zoom={1.3} centerX={720} centerY={300} className="h-[360px] rounded-(--radius-card)" />
      </div>
    </ComponentSpecimen>
  )
}

function PinSpecimen() {
  const place = placeById("ferrol")!
  return (
    <ComponentSpecimen
      name="MapPin, PlaceCard"
      source="components/map/map-pin.tsx"
      description="A photo pin on a white mat or an icon pin in its category's colour; the name shows on hover and when picked, with a soft ping. The card opens over a picked pin."
      code={`<MapPin place={place} pinStyle="photo" selected />
<PlaceCard place={place} />`}
      tone="panel"
    >
      <div className="flex flex-wrap items-end gap-12">
        {(
          [
            ["photo", false],
            ["photo", true],
            ["dot", false],
            ["dot", true],
          ] as const
        ).map(([style, sel]) => (
          <StateLabel key={`${style}${sel}`} label={`${style}${sel ? " · selected" : ""}`}>
            <div className="relative h-20 w-28">
              <div className="absolute top-12 left-1/2">
                <MapPin place={place} pinStyle={style} selected={sel} dropIn={false} />
              </div>
            </div>
          </StateLabel>
        ))}
        <StateLabel label="place card">
          <div className="relative h-[230px] w-[230px]">
            <div className="absolute bottom-0 left-1/2 [&>div]:bottom-0!">
              <PlaceCard place={place} />
            </div>
          </div>
        </StateLabel>
      </div>
    </ComponentSpecimen>
  )
}

function GuideSpecimen() {
  const [selected, setSelected] = useState<string | null>("pilot")
  const places = placesById(["ferrol", "pilot", "second-shelf", "cellar"])
  return (
    <ComponentSpecimen
      name="GuidePanel, MapGuide"
      source="components/map/map-guide.tsx"
      description="The guide a published map carries: cover, heading, intro, places grouped by kind, a search. MapGuide is the panel floating on a map — what an embed shows."
      code={`<MapGuide heading="Shop the Lantern Quarter" intro="…" cover={37267653} places={places} theme="harbour" />`}
      tone="panel"
    >
      <div className="grid gap-6 md:grid-cols-[240px_1fr]">
        <GuidePanel heading="Shop the Lantern Quarter" intro="The independent shops worth the walk." cover={37267653} places={places} selectedId={selected} onSelect={setSelected} className="h-[380px]" />
        <MapGuide heading="Open houses" intro="Viewings this weekend." cover={30580640} places={placesById(["two-gables", "brick-row", "glasshouse"])} theme="harbour" zoom={1.05} centerX={420} centerY={420} className="h-[380px] rounded-(--radius-card)" />
      </div>
    </ComponentSpecimen>
  )
}

function FramesSpecimen() {
  return (
    <ComponentSpecimen
      name="BrowserFrame, SkyPanel"
      source="components/map/frames.tsx"
      description="The window every mockup sits in, drawn in markup, and the photographed sky it floats on."
      code={`<SkyPanel photo={pexels(SKIES.lavender, 1100, 900)}>
  <BrowserFrame url="cairn.page/studio">…</BrowserFrame>
</SkyPanel>`}
    >
      <SkyPanel photo={pexels(SKIES.lavender, 1100, 700)} className="p-6 sm:p-10">
        <BrowserFrame url="cairn.page/slow-mornings" className="mx-auto h-[220px] max-w-[520px]">
          <CityMap places={placesById(["ferrol", "pilot"])} theme="paper" zoom={1.6} centerX={690} centerY={310} interactive={false} controls={false} className="absolute inset-0" />
        </BrowserFrame>
      </SkyPanel>
    </ComponentSpecimen>
  )
}

function CardsSpecimen() {
  return (
    <ComponentSpecimen
      name="UseCaseCard, TemplateCard"
      source="sections/home/hero.tsx · blocks/template-card.tsx"
      description="The hero's photo cards — hover to drop pins on the photo — and the template cards, whose live map leans in on hover."
      code={`<UseCaseCard label="Travel" href="/templates?kind=Travel" photo={30227319} alt="…" pins={[[40, 38], [66, 30]]} />
<TemplateCard template={template} onOpen={() => navigate(\`/studio?template=\${template.id}\`)} />`}
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <UseCaseCard label="Travel" href="/templates?kind=Travel" photo={30227319} alt="A snow-capped mountain under a pink sky" pins={[[40, 38], [66, 30], [30, 58]]} />
        <TemplateCard template={TEMPLATES[1]} />
        <TemplateCard template={TEMPLATES[3]} aspect="landscape" />
      </div>
    </ComponentSpecimen>
  )
}

function MotionSpecimen() {
  const [run, setRun] = useState(0)
  return (
    <ComponentSpecimen
      name="CountUp, Typewriter, StickerField"
      source="components/motion/*"
      description="The page's named motion pieces. Every knob is a scalar prop; all respect reduced motion and hold still while the page is being designed."
      code={`<CountUp value={48210} />
<Typewriter text="Slow mornings in the Lantern Quarter" speed={40} />
<StickerField parallax={140} drift draggable />`}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-end gap-10">
          <StateLabel label="CountUp">
            <span key={run} className="type-serif text-display text-ink">
              <CountUp value={48210} />
            </span>
          </StateLabel>
          <StateLabel label="Typewriter" className="min-w-[260px]">
            <span key={run} className="text-[16px] text-ink">
              <Typewriter text="Slow mornings in the Lantern Quarter" />
            </span>
          </StateLabel>
          <Button variant="outline" size="sm" onClick={() => setRun((r) => r + 1)}>
            <RotateCcw /> Replay
          </Button>
        </div>
        <div className="relative h-[280px] overflow-hidden rounded-(--radius-card) bg-panel">
          <StickerField parallax={60} />
          <p className="type-serif absolute inset-0 grid place-items-center text-h3 text-ink">Pick one up.</p>
        </div>
      </div>
    </ComponentSpecimen>
  )
}

function StorySpecimen() {
  const [step, setStep] = useState(1)
  return (
    <ComponentSpecimen
      name="StoryStage"
      source="sections/home/map-story.tsx"
      description="The pinned window of the home page's story at any of its four steps: ask, fill in, style, share."
      code={`<StoryStage step={2} />`}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          {["Ask", "Fill in", "Style", "Share"].map((label, i) => (
            <Button key={label} size="sm" variant={step === i ? "ink" : "outline"} onClick={() => setStep(i)}>
              {i + 1}. {label}
            </Button>
          ))}
        </div>
        <SkyPanel photo={pexels(SKIES.blush, 1000, 700)} className="p-5 sm:p-8">
          <StoryStage step={step} className={cn("mx-auto aspect-[4/3] w-full max-w-[640px]")} />
        </SkyPanel>
      </div>
    </ComponentSpecimen>
  )
}

function StudioSpecimen() {
  const [share, setShare] = useState(false)
  return (
    <ComponentSpecimen
      name="MapStudio, ShareDialog"
      source="sections/studio/map-studio.tsx · share-dialog.tsx"
      description="The whole map maker — Ask Cairn, click-to-add, reorderable list, styles, reader preview — and the share dialog with its live embed code."
      code={`<MapStudio templateId="event-map" persist />
<ShareDialog open={open} onOpenChange={setOpen} title="Slow mornings" theme="paper" />`}
      tone="panel"
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => setShare(true)}>
            Open the share dialog
          </Button>
          <ButtonLink href="/studio" variant="link" size="sm">
            Full screen <ArrowRight />
          </ButtonLink>
        </div>
        <MapStudio compact className="h-[620px] md:h-[520px]" />
        <ShareDialog open={share} onOpenChange={setShare} title="Slow mornings in the bay" theme="paper" />
      </div>
    </ComponentSpecimen>
  )
}

function HeadingSpecimen() {
  return (
    <ComponentSpecimen
      name="SectionHeading"
      source="components/blocks/section-heading.tsx · feature-row.tsx"
      description="How every section opens: the serif claim, the grey reason. FeatureRow pairs one with a product shot and alternates sides."
      code={`<SectionHeading title="Start with a template." lead="Borrow one and make it yours in a minute." />`}
    >
      <SectionHeading title="Start with a template." lead="Cairn makes maps of places — not charts of data. Borrow one and make it yours in a minute." />
    </ComponentSpecimen>
  )
}

export function ComponentLibrary() {
  return (
    <div className="flex flex-col gap-8">
      <ButtonSpecimen />
      <FieldsSpecimen />
      <OverlaysSpecimen />
      <HeadingSpecimen />
      <MapSpecimen />
      <PinSpecimen />
      <GuideSpecimen />
      <FramesSpecimen />
      <CardsSpecimen />
      <MotionSpecimen />
      <StorySpecimen />
      <StudioSpecimen />
    </div>
  )
}
