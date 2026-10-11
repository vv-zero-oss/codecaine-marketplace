import { useState } from "react"
import { ArrowRight, ArrowUpRight, Info, Loader2 } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { ProductComponents } from "@/components/brand/components-product"
import { ComponentSpecimen, GroupLabel, ReplayButton, StateLabel } from "@/components/brand/specimen"
import { CornerLabels } from "@/components/blocks/corner-label"
import { Photo, PhotoCredits } from "@/components/blocks/photo"
import { SectionHeading } from "@/components/blocks/section-heading"
import { Cloud } from "@/components/motion/cloud"
import { CountUp } from "@/components/motion/count-up"
import { HorizonStripes } from "@/components/motion/horizon-stripes"
import { Marquee } from "@/components/motion/marquee"
import { Reveal } from "@/components/motion/reveal"
import { ScrubText } from "@/components/motion/scrub-text"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

/* ─── Primitives ──────────────────────────────────────────────────────── */

function ButtonSpecimen() {
  const variants = ["ink", "sky", "cream", "outline", "soft", "ghost", "link"] as const
  return (
    <ComponentSpecimen
      name="Button"
      source="components/ui/button.tsx"
      description="Always a pill. Ink is the one thing to press on cream, sky the one on a loud band; outline and soft sit beside them. Presses scale to .97 in 140ms; focus draws a 3px sky ring."
      code={`<Button variant="sky" size="lg">Join the waitlist <ArrowRight /></Button>
<Button variant="outline">Discover the aircraft</Button>
<ButtonLink href="/experience" variant="ink">Book a seat</ButtonLink>`}
    >
      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap items-end gap-x-6 gap-y-5">
          {variants.map((v) => (
            <StateLabel key={v} label={v}>
              <Button variant={v}>
                {v === "link" ? (
                  <>
                    Read more <ArrowRight />
                  </>
                ) : (
                  "Book a seat"
                )}
              </Button>
            </StateLabel>
          ))}
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex flex-wrap items-end gap-4 rounded-(--radius-card) bg-sky p-5">
            <StateLabel label="cream on sky" tone="dark" className="[&>span]:text-on-sky-soft">
              <Button variant="cream">Join the waitlist</Button>
            </StateLabel>
            <StateLabel label="glass on sky" tone="dark" className="[&>span]:text-on-sky-soft">
              <Button variant="glass">See the routes</Button>
            </StateLabel>
          </div>
          <div className="flex flex-wrap items-end gap-4 rounded-(--radius-card) bg-dusk p-5">
            <StateLabel label="outline-light on dusk" tone="dark">
              <Button variant="outline-light">
                The aircraft <ArrowUpRight />
              </Button>
            </StateLabel>
            <StateLabel label="sky on dusk" tone="dark">
              <Button variant="sky">Book</Button>
            </StateLabel>
          </div>
        </div>
        <div className="flex flex-wrap items-end gap-x-6 gap-y-5">
          <StateLabel label="sm">
            <Button size="sm">Sign in</Button>
          </StateLabel>
          <StateLabel label="default">
            <Button>Next</Button>
          </StateLabel>
          <StateLabel label="lg">
            <Button size="lg">Reserve</Button>
          </StateLabel>
          <StateLabel label="icon">
            <Button size="icon" variant="soft" aria-label="Next">
              <ArrowRight />
            </Button>
          </StateLabel>
          <StateLabel label="hover">
            <Button className="bg-ink-2">Hovered</Button>
          </StateLabel>
          <StateLabel label="focus">
            <Button className="ring-[3px] ring-sky/35">Focused</Button>
          </StateLabel>
          <StateLabel label="loading">
            <Button disabled>
              <Loader2 className="animate-spin" /> Booking
            </Button>
          </StateLabel>
          <StateLabel label="disabled">
            <Button disabled>Book a seat</Button>
          </StateLabel>
        </div>
      </div>
    </ComponentSpecimen>
  )
}

function FieldsSpecimen() {
  const [name, setName] = useState("")
  const touched = name.length > 0
  const valid = /^\S+@\S+\.\S+$/.test(name)
  return (
    <ComponentSpecimen
      name="Input and Label"
      source="components/ui/input.tsx · label.tsx"
      description="Raised cream fields on a soft hairline shadow; focus draws a 1.5px ink ring, an error a red one, and the message says how to fix it. 48px tall, 16px text so phones never zoom."
      code={`<Label htmlFor="email">Email</Label>
<Input id="email" type="email" aria-invalid={!valid} placeholder="you@city.com" />`}
      tone="panel"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-2 md:col-span-2">
          <Label htmlFor="brand-email" className="text-micro text-ink-2">
            Email — try it
          </Label>
          <Input id="brand-email" type="email" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={touched && !valid} placeholder="you@city.com" />
          <p className={cn("text-micro", touched && !valid ? "text-signal-red" : touched ? "text-signal-green" : "text-ink-3")}>
            {!touched ? "We send one email when your pad opens." : valid ? "Looks right." : "Add the part after the @ — like you@city.com."}
          </p>
        </div>
        <StateLabel label="default" className="items-stretch">
          <Input placeholder="Harbour Pier" />
        </StateLabel>
        <StateLabel label="focus" className="items-stretch">
          <Input defaultValue="Midtown Roof" className="shadow-[0_0_0_1.5px_var(--color-ink)]" />
        </StateLabel>
        <StateLabel label="error" className="items-stretch">
          <Input aria-invalid placeholder="Pick a pad" />
        </StateLabel>
        <StateLabel label="disabled" className="items-stretch">
          <Input disabled defaultValue="International" />
        </StateLabel>
      </div>
    </ComponentSpecimen>
  )
}

function ControlsSpecimen() {
  const [seats, setSeats] = useState([2])
  const [quiet, setQuiet] = useState(true)
  const [bags, setBags] = useState("cabin")
  const [mode, setMode] = useState("hover")
  return (
    <ComponentSpecimen
      name="Slider, Switch, RadioGroup, ToggleGroup"
      source="components/ui/slider.tsx · switch.tsx · radio-group.tsx · toggle-group.tsx"
      description="shadcn controls in the page's ink: a slider with a ringed thumb, a switch that slides on the strong ease-out, radio cards for choices with a reason, and a pill toggle group for two or three modes."
      code={`<Slider value={[seats]} min={1} max={4} onValueChange={([v]) => setSeats(v)} />
<Switch checked={quiet} onCheckedChange={setQuiet} />
<RadioGroup value={bags} onValueChange={setBags}>…</RadioGroup>
<ToggleGroup type="single" value={mode} onValueChange={setMode}>…</ToggleGroup>`}
    >
      <div className="grid gap-10 md:grid-cols-2">
        <StateLabel label={`slider — ${seats[0]} seat${seats[0] > 1 ? "s" : ""}`} className="items-stretch">
          <Slider aria-label="Seats" value={seats} min={1} max={4} step={1} onValueChange={setSeats} />
        </StateLabel>
        <div className="flex flex-wrap items-end gap-8">
          <StateLabel label={`switch — ${quiet ? "on" : "off"}`}>
            <label className="flex min-h-11 items-center gap-3 text-body text-ink-2">
              <Switch checked={quiet} onCheckedChange={setQuiet} aria-label="Quiet cabin" /> Quiet cabin
            </label>
          </StateLabel>
          <StateLabel label="switch — disabled">
            <Switch disabled aria-label="Disabled" />
          </StateLabel>
        </div>
        <StateLabel label={`radio group — ${bags}`} className="items-stretch">
          <RadioGroup value={bags} onValueChange={setBags} aria-label="Luggage" className="gap-2">
            {[
              ["cabin", "Cabin bag", "Under the seat in front"],
              ["hold", "One case", "Stowed in the nose, 23 kg"],
            ].map(([value, title, note]) => (
              <label
                key={value}
                className={cn(
                  "flex min-h-14 cursor-pointer items-center gap-3 rounded-(--radius-card) bg-raised px-4 py-3 shadow-(--shadow-field) transition-shadow duration-(--duration-hover)",
                  bags === value && "shadow-[0_0_0_1.5px_var(--color-ink)]",
                )}
              >
                <RadioGroupItem value={value} className="border-line-strong" />
                <span>
                  <span className="block text-[15px] font-medium text-ink">{title}</span>
                  <span className="block text-micro text-ink-3">{note}</span>
                </span>
              </label>
            ))}
          </RadioGroup>
        </StateLabel>
        <StateLabel label={`toggle group — ${mode}`}>
          <ToggleGroup type="single" value={mode} spacing={1} onValueChange={(v) => v && setMode(v)} aria-label="Rotor mode" className="rounded-full bg-panel p-1">
            {["hover", "cruise", "land"].map((m) => (
              <ToggleGroupItem
                key={m}
                value={m}
                className="!h-11 !rounded-full !px-5 text-[15px] capitalize text-ink-3 transition-[background-color,color,transform] duration-(--duration-hover) hover:!bg-panel-deep active:scale-[0.97] data-[state=on]:!bg-ink data-[state=on]:!text-page"
              >
                {m}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </StateLabel>
      </div>
    </ComponentSpecimen>
  )
}

function TabsSpecimen() {
  const [tab, setTab] = useState("commute")
  useCanvasAction("Tab", (next) => setTab(next ? "weekend" : "commute"), { on: tab === "weekend", group: "Brand · Components" })
  return (
    <ComponentSpecimen
      name="Tabs"
      source="components/ui/tabs.tsx"
      description="The line variant, with a 2px ink underline under the active tab — for switching between views of the same thing."
      code={`<Tabs value={tab} onValueChange={setTab}>
  <TabsList variant="line"><TabsTrigger value="commute">Commute</TabsTrigger>…</TabsList>
  <TabsContent value="commute">…</TabsContent>
</Tabs>`}
    >
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList variant="line" className="h-auto gap-1">
          {["commute", "airport", "weekend"].map((t) => (
            <TabsTrigger key={t} value={t} className="h-11 flex-none px-3 text-[15px] capitalize">
              {t}
            </TabsTrigger>
          ))}
        </TabsList>
        {[
          ["commute", "Midtown to Harbour, 7 minutes. The road takes 48."],
          ["airport", "Midtown to International, 9 minutes. Check-in closes in 20."],
          ["weekend", "Riverside to the Stadium Deck, before the anthem."],
        ].map(([t, copy]) => (
          <TabsContent key={t} value={t} className="pt-6 text-lead text-ink-2">
            {copy}
          </TabsContent>
        ))}
      </Tabs>
    </ComponentSpecimen>
  )
}

function AccordionSpecimen() {
  const [open, setOpen] = useState("noise")
  useCanvasAction("FAQ item open", (next) => setOpen((next ?? !open) ? "noise" : ""), { on: !!open, group: "Brand · Components" })
  return (
    <ComponentSpecimen
      name="Accordion"
      source="components/ui/accordion.tsx"
      description="FAQs and job listings: an h4 question on a hairline, the chevron turning as the answer opens on a 260ms ease-out."
      code={`<Accordion type="single" collapsible>
  <AccordionItem value="noise" className="border-line">
    <AccordionTrigger className="text-h4 font-medium hover:no-underline">How loud is it?</AccordionTrigger>
    <AccordionContent className="text-body text-ink-2">…</AccordionContent>
  </AccordionItem>
</Accordion>`}
    >
      <Accordion type="single" collapsible value={open} onValueChange={setOpen} className="border-t border-line">
        {[
          ["noise", "How loud is it?", "About as loud as a conversation on the street below, from 500 metres away. Inside, you can talk without raising your voice."],
          ["bags", "Can I bring a suitcase?", "One case up to 23 kg rides in the nose, and a cabin bag fits under the seat in front."],
          ["weather", "What if the weather turns?", "If we can’t fly, we send a car to the same door at no charge, and tell you before you leave."],
        ].map(([v, q, a]) => (
          <AccordionItem key={v} value={v} className="border-line">
            <AccordionTrigger className="min-h-11 py-5 text-h4 font-medium tracking-[-0.024em] hover:no-underline [&>svg]:size-5 [&>svg]:text-ink-3">{q}</AccordionTrigger>
            <AccordionContent className="max-w-[58ch] pb-6 text-body text-ink-2">{a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </ComponentSpecimen>
  )
}

function OverlaysSpecimen() {
  const [open, setOpen] = useState(false)
  useCanvasAction("Dialog open", (next) => setOpen(next ?? !open), { on: open, group: "Brand · Components" })
  return (
    <ComponentSpecimen
      name="Dialog and Tooltip"
      source="components/ui/dialog.tsx · tooltip.tsx"
      description="Dialogs sit on cream with the photo radius and the device shadow; tooltips are small ink labels for an icon that needs a word. Wrap tooltips in their own TooltipProvider."
      code={`<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild><Button variant="outline">Cancel trip</Button></DialogTrigger>
  <DialogContent className="rounded-(--radius-photo) bg-page shadow-(--shadow-device)">…</DialogContent>
</Dialog>
<TooltipProvider><Tooltip><TooltipTrigger>…</TooltipTrigger><TooltipContent>…</TooltipContent></Tooltip></TooltipProvider>`}
    >
      <div className="flex flex-wrap items-end gap-8">
        <StateLabel label={`dialog — ${open ? "open" : "closed"}`}>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Cancel this trip</Button>
            </DialogTrigger>
            <DialogContent className="rounded-(--radius-photo) border-line bg-page p-6 shadow-(--shadow-device) sm:max-w-md sm:p-8">
              <DialogHeader>
                <DialogTitle className="type-head text-h3 text-ink">Cancel AER-7KQ2?</DialogTitle>
                <DialogDescription className="text-body text-ink-2">More than two hours out, so the full fare comes back to your card in a day or two.</DialogDescription>
              </DialogHeader>
              <DialogFooter className="mt-2 gap-2">
                <DialogClose asChild>
                  <Button variant="soft">Keep it</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button>Cancel trip</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </StateLabel>
        <StateLabel label="tooltip — hover or focus">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="soft" size="icon" aria-label="About the fare">
                  <Info />
                </Button>
              </TooltipTrigger>
              <TooltipContent sideOffset={6} className="rounded-(--radius-field) bg-ink px-3 py-2 text-micro text-page">
                From 49, plus 4.20 a kilometre
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </StateLabel>
      </div>
    </ComponentSpecimen>
  )
}

function BadgeProgressSpecimen() {
  const [charge, setCharge] = useState(68)
  return (
    <ComponentSpecimen
      name="Badge and Progress"
      source="components/ui/badge.tsx · progress.tsx"
      description="Badges carry a status in a word — colour is never the only cue. Progress is a thin rounded bar for charge, boarding and steps."
      code={`<Badge variant="green">In build</Badge>
<Progress value={charge} className="h-1.5 bg-panel-deep [&>div]:bg-sky" />`}
    >
      <div className="grid gap-10 md:grid-cols-2">
        <div className="flex flex-wrap gap-5">
          {(
            [
              ["default", "Permitted"],
              ["sky", "New route"],
              ["green", "In build"],
              ["ember", "Sunset slot"],
              ["dusk", "Night"],
              ["outline", "In design"],
            ] as const
          ).map(([v, text]) => (
            <StateLabel key={v} label={v}>
              <Badge variant={v}>{text}</Badge>
            </StateLabel>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <StateLabel label={`progress — ${charge}% charged`} className="items-stretch">
            <Progress value={charge} aria-label="Charge" className="h-1.5 bg-panel-deep [&>div]:bg-sky [&>div]:transition-transform [&>div]:duration-(--duration-swap)" />
          </StateLabel>
          <div className="flex gap-2">
            {[20, 68, 100].map((n) => (
              <Button key={n} size="sm" variant={charge === n ? "ink" : "soft"} onClick={() => setCharge(n)}>
                {n}%
              </Button>
            ))}
          </div>
        </div>
      </div>
    </ComponentSpecimen>
  )
}

/* ─── Blocks ──────────────────────────────────────────────────────────── */

function PhotoSpecimen() {
  const [pos, setPos] = useState("50% 50%")
  return (
    <ComponentSpecimen
      name="Photo and PhotoCredits"
      source="components/blocks/photo.tsx"
      description="A Pexels photograph by name, cover-cropped into whatever box it is given, with the photo radius. position moves the crop; rounded={false} for a full-bleed band. Credits go at the bottom of every page."
      code={`<Photo name="window-city" position="30% 50%" className="aspect-[3/4] shadow-(--shadow-photo)" />
<PhotoCredits names={["window-city", "pad-garden"]} />`}
    >
      <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <Photo name="window-city" position={pos} className="aspect-[3/4] shadow-(--shadow-photo)" />
        <div className="flex flex-col gap-5">
          <div>
            <p className="mb-2 text-micro text-ink-3">position</p>
            <div className="flex flex-wrap gap-2">
              {["20% 50%", "50% 50%", "80% 50%"].map((p) => (
                <Button key={p} size="sm" variant={pos === p ? "ink" : "soft"} onClick={() => setPos(p)}>
                  {p}
                </Button>
              ))}
            </div>
          </div>
          <Photo name="pad-garden" className="aspect-[16/9] shadow-(--shadow-photo)" />
          <PhotoCredits names={["window-city", "pad-garden"]} />
        </div>
      </div>
    </ComponentSpecimen>
  )
}

function HeadingSpecimen() {
  const [size, setSize] = useState<"h2" | "display" | "mega">("display")
  return (
    <ComponentSpecimen
      name="SectionHeading and CornerLabels"
      source="components/blocks/section-heading.tsx · corner-label.tsx"
      description="Every section opens the same way: tiny corner labels pinned to its edges, a micro eyebrow, then one loud medium-weight line on the golden scale and a quiet lead."
      code={`<CornerLabels left="The aircraft" right="Built to be heard less" />
<SectionHeading eyebrow="Quiet by design" title="Softer than the street below." size="display" lead="…" />`}
    >
      <div className="flex flex-col gap-10">
        <CornerLabels left="The aircraft" right="Built to be heard less" className="text-ink-3" />
        <SectionHeading
          key={size}
          eyebrow="Quiet by design"
          title="Softer than the street below."
          size={size}
          lead="Six slow-turning rotors and no engine to speak of. From the pavement, it sounds like the wind."
        />
        <div className="flex flex-wrap gap-2">
          {(["h2", "display", "mega"] as const).map((s) => (
            <Button key={s} size="sm" variant={size === s ? "ink" : "soft"} onClick={() => setSize(s)}>
              size="{s}"
            </Button>
          ))}
        </div>
      </div>
    </ComponentSpecimen>
  )
}

/* ─── Motion components ───────────────────────────────────────────────── */

function RevealSpecimen() {
  const [run, setRun] = useState(0)
  return (
    <ComponentSpecimen
      name="Reveal"
      source="components/motion/reveal.tsx"
      description="Content rises 24px into place the first time it scrolls into view, on the strong ease-out. Shown at its end state while designing and for reduced motion."
      code={`<Reveal y={24} delay={0.1} duration={0.8} easing="out">…</Reveal>`}
    >
      <div className="flex items-center justify-between gap-6">
        <div key={run} className="grid flex-1 gap-3 sm:grid-cols-3">
          {["Book", "Board", "Lift"].map((w, i) => (
            <Reveal key={w} delay={i * 0.08}>
              <div className="rounded-(--radius-card) bg-raised p-5 shadow-(--shadow-card)">
                <p className="font-mono text-micro text-ink-3">0{i + 1}</p>
                <p className="type-head mt-6 text-h3 text-ink">{w}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <ReplayButton onClick={() => setRun((r) => r + 1)} label="Replay reveal" />
      </div>
    </ComponentSpecimen>
  )
}

function ScrubSpecimen() {
  return (
    <ComponentSpecimen
      name="ScrubText"
      source="components/motion/scrub-text.tsx"
      description="A sentence that inks itself in word by word as it scrolls through the window — scrubbed by scroll, never timed. Scroll this one past the middle of the screen."
      code={`<ScrubText text="Imagine looking forward to the way home." start={0.85} end={0.35} className="type-head text-display" />`}
    >
      <ScrubText text="Imagine looking forward to the way home. Ten quiet minutes, the river gold beneath you." start={0.9} end={0.45} className="type-head max-w-[22ch] text-h2 text-ink" />
    </ComponentSpecimen>
  )
}

function CountUpSpecimen() {
  const [run, setRun] = useState(0)
  return (
    <ComponentSpecimen
      name="CountUp"
      source="components/motion/count-up.tsx"
      description="A number that counts up once it is seen — for the few figures that carry a claim. Tabular numerals, so nothing shifts as it counts."
      code={`<CountUp value={290} suffix=" km/h" duration={1.6} />`}
    >
      <div className="flex items-center justify-between gap-6">
        <div key={run} className="grid flex-1 grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            [4, "", "passengers"],
            [290, "", "km/h"],
            [160, "", "km range"],
            [45, "", "dB at 500 m"],
          ].map(([v, s, l]) => (
            <div key={l as string}>
              <CountUp value={v as number} suffix={s as string} className="type-head block text-display text-ink tabular-nums" />
              <p className="mt-1 text-micro text-ink-3">{l}</p>
            </div>
          ))}
        </div>
        <ReplayButton onClick={() => setRun((r) => r + 1)} label="Replay count" />
      </div>
    </ComponentSpecimen>
  )
}

function MarqueeSpecimen() {
  const [speed, setSpeed] = useState(30)
  const [direction, setDirection] = useState<"left" | "right">("left")
  return (
    <ComponentSpecimen
      name="Marquee"
      source="components/motion/marquee.tsx"
      description="A row that drifts sideways forever, doubled so the loop has no seam. CSS, so the editor's Motion switch stops it; pauses on hover; stops for reduced motion."
      code={`<Marquee speed={30} direction="left" pauseOnHover>…</Marquee>`}
      tone="sky"
      previewClassName="px-0 sm:px-0"
    >
      <Marquee speed={speed} direction={direction} className="text-on-sky">
        {["Harbour Pier", "Midtown Roof", "International", "Northgate Yards", "Riverside Park", "Stadium Deck"].map((p) => (
          <span key={p} className="type-head flex items-center gap-8 pr-8 text-h2 whitespace-nowrap">
            {p}
            <Cloud shape="puff" className="w-16" />
          </span>
        ))}
      </Marquee>
      <div className="mt-6 flex flex-wrap gap-2 px-5 sm:px-8">
        {[60, 30, 15].map((s) => (
          <Button key={s} size="sm" variant={speed === s ? "cream" : "glass"} onClick={() => setSpeed(s)}>
            {s}s loop
          </Button>
        ))}
        <Button size="sm" variant="glass" onClick={() => setDirection((d) => (d === "left" ? "right" : "left"))}>
          direction: {direction}
        </Button>
      </div>
    </ComponentSpecimen>
  )
}

function StripesCloudSpecimen() {
  return (
    <ComponentSpecimen
      name="HorizonStripes and Cloud"
      source="components/motion/horizon-stripes.tsx · cloud.tsx"
      description="The horizon that closes every page: navy, ember and peach sweep in from the left as it scrolls up, each a beat behind the one above, their edges curved like the earth's. Clouds are drawn, in three shapes."
      code={`<HorizonStripes stiffness={120} />
<Cloud shape="tall" className="w-64" />`}
      previewClassName="p-0 sm:p-0"
    >
      <div className="relative flex flex-col justify-end overflow-hidden bg-sky pt-10">
        <div className="mb-8 flex items-end justify-around px-6">
          <Cloud shape="long" className="w-40 sm:w-56" />
          <Cloud shape="tall" className="w-32 sm:w-48" />
        </div>
        <HorizonStripes />
      </div>
    </ComponentSpecimen>
  )
}

/* ─── The library ─────────────────────────────────────────────────────── */

export function ComponentLibrary() {
  return (
    <div className="flex flex-col gap-14">
      <div className="flex flex-col gap-6">
        <GroupLabel>Primitives — shadcn, in Aerie’s ink</GroupLabel>
        <ButtonSpecimen />
        <FieldsSpecimen />
        <ControlsSpecimen />
        <TabsSpecimen />
        <AccordionSpecimen />
        <OverlaysSpecimen />
        <BadgeProgressSpecimen />
      </div>
      <div className="flex flex-col gap-6">
        <GroupLabel>Blocks</GroupLabel>
        <PhotoSpecimen />
        <HeadingSpecimen />
      </div>
      <div className="flex flex-col gap-6">
        <GroupLabel>Motion components — named, with scalar props</GroupLabel>
        <RevealSpecimen />
        <ScrubSpecimen />
        <CountUpSpecimen />
        <MarqueeSpecimen />
        <StripesCloudSpecimen />
      </div>
      <ProductComponents />
    </div>
  )
}
