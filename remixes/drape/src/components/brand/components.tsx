import { useState } from "react"

import { ComponentSpecimen, StateLabel } from "@/components/brand/specimen"
import { Cursor } from "@/components/motion/cursor"
import { FadeIn } from "@/components/motion/fade-in"
import { HeadlineReveal } from "@/components/motion/headline-reveal"
import { Marquee } from "@/components/motion/marquee"
import { FloatCard } from "@/components/sections/controls"
import { FeatureCard } from "@/components/sections/features"
import { AppPanel } from "@/components/sections/room-zoom"
import { ShopMark } from "@/components/sections/shop-marquee"
import { StoryCard } from "@/components/sections/stories"
import { ColourwayTile, StepTabs } from "@/components/sections/toolkit"
import { FooterColumn, Newsletter } from "@/components/site-footer"
import { CarouselArrow, TryOnPrompt, TryOnStage } from "@/components/three/try-on-stage"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button, ButtonLink } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SectionHeading } from "@/components/ui/section-heading"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Wordmark } from "@/components/ui/wordmark"
import { COLOURWAYS, FAQS, FEATURES, SHOPS, STORIES } from "@/content"
import { cn } from "@/lib/utils"

const DARK = "bg-espresso grid-paper-dark"

export function ButtonSpecimen() {
  const variants = [
    { variant: "default", hover: "bg-clay-hover", ground: "" },
    { variant: "outline", hover: "bg-linen-2", ground: "" },
    { variant: "outline-dark", hover: "border-cream bg-cream/8", ground: DARK },
    { variant: "secondary", hover: "bg-espresso-4", ground: DARK },
    { variant: "ghost", hover: "bg-cream/8 text-cream", ground: DARK },
    { variant: "link", hover: "underline", ground: "" },
  ] as const
  return (
    <ComponentSpecimen
      name="Button · ButtonLink"
      source="components/ui/button.tsx"
      description="shadcn's button on Drape's recipe: 6px radius, 36px tall (44px on phones), 13px medium, a flat clay fill or a 1px outline, and a 0.97 press. ButtonLink is the same recipe on an anchor."
      code={`import { Button, ButtonLink } from "@/components/ui/button"

<ButtonLink href="#toolkit">Try it on</ButtonLink>
<Button variant="outline">See how it fits</Button>`}
      previewClassName="p-0 sm:p-0"
    >
      <div className="divide-y divide-line">
        {variants.map(({ variant, hover, ground }) => (
          <div key={variant} className={cn("flex flex-wrap items-end gap-x-6 gap-y-4 p-5 sm:p-6", ground)}>
            <span className={cn("w-full font-mono text-[11px] sm:w-24", ground ? "text-cream-3" : "text-ink-3")}>{variant}</span>
            <StateLabel label="default">
              <Button variant={variant}>Try it on</Button>
            </StateLabel>
            <StateLabel label="hover">
              <Button variant={variant} className={hover}>
                Try it on
              </Button>
            </StateLabel>
            <StateLabel label="focus">
              <Button variant={variant} className="ring-2 ring-clay ring-offset-2 ring-offset-linen">
                Try it on
              </Button>
            </StateLabel>
            <StateLabel label="disabled">
              <Button variant={variant} disabled>
                Try it on
              </Button>
            </StateLabel>
          </div>
        ))}
        <div className="flex flex-wrap items-end gap-6 p-5 sm:p-6">
          {(["xs", "sm", "default", "lg"] as const).map((size) => (
            <StateLabel key={size} label={size}>
              <ButtonLink href="#components" size={size}>
                Try it on
              </ButtonLink>
            </StateLabel>
          ))}
        </div>
      </div>
    </ComponentSpecimen>
  )
}

export function StageSpecimen() {
  return (
    <ComponentSpecimen
      name="TryOnStage"
      source="components/three/try-on-stage.tsx"
      description="The hero's three.js carousel: every look a pencil sketch drawn by a shader, the real photo inside a selection box that opens from the cursor. Hover the middle look, press the arrow to try it on, use ‹ › to turn. Props: index, tilt, spacing, lineWeight, boxWidth, boxHeight, autoplay."
      code={`import { TryOnStage } from "@/components/three/try-on-stage"

<TryOnStage className="h-[70svh]" tilt={4} lineWeight={1} boxWidth={0.62} />`}
      previewClassName="p-0 sm:p-0"
    >
      <div className="relative h-[520px] bg-linen grid-paper">
        <TryOnStage className="absolute inset-0" />
      </div>
    </ComponentSpecimen>
  )
}

export function PromptSpecimen() {
  return (
    <ComponentSpecimen
      name="TryOnPrompt · CarouselArrow"
      source="components/three/try-on-stage.tsx"
      description="The prompt that types itself onto the selection box's edge (typing, typed, tried on), and the carousel's arrows."
      code={`<TryOnPrompt text="Try the trench" full="Try the trench on me" visible worn={false} onSubmit={tryOn} />`}
    >
      <div className="flex flex-wrap items-end gap-x-10 gap-y-8">
        {[
          { label: "typing", text: "Try the tre", worn: false },
          { label: "typed", text: "Try the trench on me", worn: false },
          { label: "tried on", text: "", worn: true },
        ].map((state) => (
          <StateLabel key={state.label} label={state.label}>
            <TryOnPrompt
              text={state.text}
              full="Try the trench on me"
              visible
              worn={state.worn}
              onSubmit={() => undefined}
              className="static translate-y-0"
            />
          </StateLabel>
        ))}
        <StateLabel label="arrows">
          <div className="relative flex h-11 w-28 [&>button]:!static [&>button]:!translate-y-0">
            <CarouselArrow side="left" onClick={() => undefined} />
            <CarouselArrow side="right" onClick={() => undefined} />
          </div>
        </StateLabel>
      </div>
    </ComponentSpecimen>
  )
}

export function HeadlineSpecimen() {
  const [replay, setReplay] = useState(0)
  return (
    <ComponentSpecimen
      name="HeadlineReveal · SectionHeading · Wordmark"
      source="components/motion/headline-reveal.tsx"
      description="The script-word-plus-sans headline, written in from left to right by a soft mask (1000ms, ease-out). SectionHeading is the same pairing at section size; the wordmark borrows the script “d”."
      code={`<HeadlineReveal script="Wear" rest="it first" duration={1000} />
<SectionHeading title="Try more," script="return less" lede="…" />`}
    >
      <div className="space-y-8">
        <div className="flex items-end justify-between gap-4 overflow-hidden">
          <HeadlineReveal replay={replay} className="text-[clamp(3rem,10vw,6rem)]" />
          <Button variant="outline" size="sm" onClick={() => setReplay((r) => r + 1)}>
            Replay
          </Button>
        </div>
        <div className={cn("rounded-md p-6", DARK)}>
          <SectionHeading title="Try more," script="return less" lede="Change the colour, the size and the fit." />
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <Wordmark className="text-2xl" />
          <span className="rounded-sm bg-espresso px-3 py-2 text-cream">
            <Wordmark />
          </span>
        </div>
      </div>
    </ComponentSpecimen>
  )
}

export function CardsSpecimen() {
  const story = STORIES[0]
  const [open, setOpen] = useState(false)
  return (
    <ComponentSpecimen
      name="FeatureCard · StoryCard · FloatCard · AppPanel"
      source="components/sections/*.tsx"
      description="The page's cards on espresso: a photo card with a hover lift, a story card with a cursor-following pill that turns over to a quote on click, and the floating panels of the product."
      code={`<FeatureCard photo={6347515} title="Try on anything you find" body="…" tall />
<StoryCard photo={5920763} name="Fit notes: …" body="…" quote="…" open={open} onToggle={toggle} />`}
      previewClassName={DARK}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <FeatureCard photo={FEATURES[1].id} title={FEATURES[1].title} body={FEATURES[1].body} />
        <StoryCard
          photo={story.id}
          name={story.name}
          body={story.body}
          quote="“I stopped ordering three sizes to send two back.”"
          open={open}
          onToggle={() => setOpen(!open)}
        />
        <div className="relative space-y-4">
          <FloatCard title="Size">
            <p className="text-[12px] text-cream-3">Fits you best — 94% keep it.</p>
          </FloatCard>
          <div className="relative h-40">
            <AppPanel title="Layers" className="inset-x-0 top-0">
              <p className="px-1 text-[12px] text-cream">Long coat</p>
              <p className="px-1 text-[10px] text-cream-3">Maison Ardent · M</p>
            </AppPanel>
          </div>
        </div>
      </div>
    </ComponentSpecimen>
  )
}

export function ControlsSpecimen() {
  const [step, setStep] = useState(2)
  const [fit, setFit] = useState("regular")
  const [way, setWay] = useState(COLOURWAYS[1])
  const [email, setEmail] = useState("")
  return (
    <ComponentSpecimen
      name="StepTabs · ColourwayTile · ToggleGroup · Input"
      source="components/sections/toolkit.tsx, components/ui/*"
      description="The product's controls: the step tabs with their clay underline, a colourway tile (recoloured in the page, selected and not), the fit toggle, and the input in its default, error and focused states."
      code={`<StepTabs step={step} onSelect={setStep} />
<ColourwayTile way={COLOURWAYS[1]} index={0} active onChoose={choose} />`}
      previewClassName={DARK}
    >
      <div className="space-y-8">
        <StepTabs step={step} onSelect={setStep} />
        <div className="grid max-w-md grid-cols-4 gap-2">
          {COLOURWAYS.slice(0, 4).map((entry, index) => (
            <ColourwayTile key={entry.name} way={entry} index={index} active={entry.name === way.name} onChoose={setWay} />
          ))}
        </div>
        <ToggleGroup type="single" value={fit} onValueChange={(v) => v && setFit(v)} className="w-64 rounded-sm bg-espresso-3 p-0.5">
          {["slim", "regular", "relaxed"].map((value) => (
            <ToggleGroupItem
              key={value}
              value={value}
              className="h-8 flex-1 rounded-xs text-[12px] text-cream-3 capitalize hover:bg-transparent hover:text-cream data-[state=on]:bg-espresso-4 data-[state=on]:text-cream"
            >
              {value}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <div className="flex flex-wrap gap-6">
          <StateLabel label="default">
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="h-10 w-56 rounded-sm bg-paper text-ink" />
          </StateLabel>
          <StateLabel label="error">
            <Input aria-invalid defaultValue="you@" className="h-10 w-56 rounded-sm bg-paper text-ink" />
          </StateLabel>
          <StateLabel label="focus">
            <Input defaultValue="you@example.com" className="h-10 w-56 rounded-sm bg-paper text-ink ring-2 ring-clay" />
          </StateLabel>
        </div>
      </div>
    </ComponentSpecimen>
  )
}

export function MotionSpecimen() {
  const [key, setKey] = useState(0)
  return (
    <ComponentSpecimen
      name="Marquee · Cursor · FadeIn · ShopMark"
      source="components/motion/*.tsx"
      description="The page's small motion components, each with scalar props the editor can change: a seamless CSS marquee (speed, direction, paused), a collaborator's cursor (name, colour, wander), and the one entrance."
      code={`<Marquee speed={36} direction="left">{shops}</Marquee>
<Cursor name="Maya" color="var(--mustard)" x={20} y={30} dx={40} dy={20} />
<FadeIn delay={80}>…</FadeIn>`}
      previewClassName={DARK}
    >
      <div className="space-y-8">
        <Marquee speed={36}>
          {SHOPS.map((shop) => (
            <ShopMark key={shop.name} name={shop.name} font={shop.font} />
          ))}
        </Marquee>
        <div className="relative h-28 rounded-md border border-line-dark">
          <Cursor name="Maya" color="var(--mustard)" x={10} y={20} dx={60} dy={20} />
          <Cursor name="Jordan" color="var(--clay)" x={60} y={50} dx={-50} dy={-16} delay={0.4} />
        </div>
        <div className="flex items-center gap-4">
          <FadeIn key={key}>
            <div className="rounded-sm bg-espresso-3 px-4 py-3 text-[13px] text-cream">Faded in</div>
          </FadeIn>
          <Button variant="outline-dark" size="sm" onClick={() => setKey((k) => k + 1)}>
            Replay
          </Button>
        </div>
      </div>
    </ComponentSpecimen>
  )
}

export function FooterSpecimen() {
  return (
    <ComponentSpecimen
      name="Accordion · Newsletter · FooterColumn"
      source="components/ui/accordion.tsx, components/site-footer.tsx"
      description="The FAQ's accordion with a plus that turns to a cross, and the footer's pieces: a newsletter form that checks the address (try a bad one) and a link column."
      code={`<Accordion type="single" collapsible>…</Accordion>
<Newsletter />`}
      previewClassName="p-0 sm:p-0"
    >
      <div className={cn("p-5 sm:p-8", DARK)}>
        <Accordion type="single" collapsible defaultValue="0">
          {FAQS.slice(0, 3).map((item, index) => (
            <AccordionItem key={item.q} value={String(index)} className="border-line-dark">
              <AccordionTrigger className="text-[15px] font-normal text-cream">{item.q}</AccordionTrigger>
              <AccordionContent className="text-[14px] text-cream-2">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div className="flex flex-wrap gap-12 bg-clay-deep p-5 text-paper sm:p-8">
        <FooterColumn title="Product" links={["Fitting room", "Colourways", "Size advice"]} />
        <Newsletter />
      </div>
    </ComponentSpecimen>
  )
}

export function ComponentLibrary() {
  return (
    <div className="space-y-8">
      <ButtonSpecimen />
      <StageSpecimen />
      <PromptSpecimen />
      <HeadlineSpecimen />
      <CardsSpecimen />
      <ControlsSpecimen />
      <MotionSpecimen />
      <FooterSpecimen />
    </div>
  )
}
