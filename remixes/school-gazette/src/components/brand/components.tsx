import { useState } from "react"
import { Menu, Play, Send, Square } from "lucide-react"

import { LedBoard } from "@/components/led/led-board"
import { Masthead } from "@/components/masthead"
import { Cube3D } from "@/components/motion/cube-3d"
import { Ticker } from "@/components/motion/ticker"
import { Tilt3D } from "@/components/motion/tilt-3d"
import { SchoolRadio } from "@/components/radio/school-radio"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button, DomeButton } from "@/components/ui/button"
import { Photo } from "@/components/ui/photo"
import { Coupon, Manicule, Stamp, Starburst, Tape } from "@/components/ui/retro"
import { RotaryKnob } from "@/components/ui/rotary-knob"
import { SevenSegment } from "@/components/ui/seven-segment"
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PHOTOS } from "@/data/photos"
import { ComponentSpecimen, StateLabel } from "./specimen"

function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap items-end gap-6">{children}</div>
}

/** Every component in the project, live, in its variants and states — with how to use it. */
export function ComponentLibrary() {
  const [on, setOn] = useState(true)
  const [fader, setFader] = useState([60])
  const [knob, setKnob] = useState(40)
  return (
    <div className="flex flex-col gap-8">
      <ComponentSpecimen
        name="Button" source="components/ui/button.tsx"
        description="The retro key. A hard offset shadow under the cap: pressed, it drops 3px in 90ms and the shadow closes. Variants for ink, spot colour, paper and brass; stamp for a rubber stamp; link for text."
        code={`<Button variant="rust" size="lg">Send</Button>\n<ButtonLink href="#write" variant="stamp">Approved</ButtonLink>`}
      >
        <div className="flex flex-col gap-8">
          <Row>
            {(["ink", "rust", "paper", "brass", "stamp", "link"] as const).map((v) => <StateLabel key={v} label={v}><Button variant={v}>{v}</Button></StateLabel>)}
          </Row>
          <Row>
            <StateLabel label="size sm"><Button size="sm">Small</Button></StateLabel>
            <StateLabel label="size lg"><Button size="lg" variant="rust">Large</Button></StateLabel>
            <StateLabel label="icon"><Button size="icon" variant="paper" aria-label="Menu"><Menu /></Button></StateLabel>
            <StateLabel label="disabled"><Button disabled>Disabled</Button></StateLabel>
          </Row>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="DomeButton" source="components/ui/button.tsx"
        description="The big round arcade key, for the one thing worth pressing: send, play. Four tones and three sizes."
        code={`<DomeButton tone="rust" size="md" aria-label="Send"><Send /></DomeButton>`}
      >
        <Row>
          {(["rust", "brass", "teal", "ink"] as const).map((tone) => <StateLabel key={tone} label={tone}><DomeButton tone={tone} aria-label={tone}><Play /></DomeButton></StateLabel>)}
          <StateLabel label="sm"><DomeButton size="sm" aria-label="small"><Square /></DomeButton></StateLabel>
          <StateLabel label="lg"><DomeButton size="lg" aria-label="large"><Send /></DomeButton></StateLabel>
        </Row>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Switch, Slider, RotaryKnob" source="components/ui/{switch,slider,rotary-knob}.tsx"
        description="The retro controls. A brass lever on a recessed plate; a fader on a routed groove; a bakelite knob you drag, or turn with the arrow keys (Shift for big steps)."
        code={`<Switch checked={on} onCheckedChange={setOn} />\n<Slider value={[60]} onValueChange={setFader} />\n<RotaryKnob label="Volume" value={40} onValueChange={setKnob} />`}
        previewClassName="bg-bakelite [background-image:none] text-paper-light"
      >
        <Row>
          <StateLabel label={on ? "on" : "off"}><Switch checked={on} onCheckedChange={setOn} aria-label="Demo switch" /></StateLabel>
          <StateLabel label="disabled"><Switch disabled aria-label="Disabled switch" /></StateLabel>
          <div className="w-56"><StateLabel label={`fader ${fader[0]}`}><Slider value={fader} onValueChange={setFader} aria-label="Demo fader" /></StateLabel></div>
          <RotaryKnob label={`Knob ${knob}`} value={knob} onValueChange={setKnob} />
        </Row>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="SevenSegment and LedBoard" source="components/ui/seven-segment.tsx · components/led/led-board.tsx"
        description="Glowing segments behind glass, on an embossed riveted plate. The colour follows data-led on any ancestor; the board has a live countdown and a House Points scoreboard."
        code={`<div data-led="amber"><SevenSegment value="12:34" height={56} /></div>\n<LedBoard title="Founders’ Day" targetDate="2026-12-12T18:00:00" hue="amber" />`}
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap gap-4">
            {(["amber", "red", "green"] as const).map((h) => <div key={h} data-led={h} className="rounded-[10px] border-2 border-black bg-lcd px-5 py-3 shadow-deboss"><SevenSegment value="12:34" height={48} /></div>)}
          </div>
          <LedBoard />
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="SchoolRadio" source="components/radio/school-radio.tsx"
        description="The tabletop radio and its brief. Props: station, powered, volume, typeSpeed. Static is real audio; Read aloud uses the browser’s voice."
        code={`<SchoolRadio station="sport" powered volume={55} typeSpeed={18} />`}
        previewClassName="bg-desk [background-image:none]"
      >
        <SchoolRadio station="sport" />
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Tabs and Accordion" source="components/ui/{tabs,accordion}.tsx"
        description="Index tabs that join the card; a ledger of questions with a plus that turns 135°."
        code={`<Tabs defaultValue="a"><TabsList><TabsTrigger value="a">Story</TabsTrigger></TabsList></Tabs>\n<Accordion type="single" collapsible>…</Accordion>`}
      >
        <div className="grid gap-8 lg:grid-cols-2">
          <Tabs defaultValue="a">
            <TabsList><TabsTrigger value="a">Story</TabsTrigger><TabsTrigger value="b">Photo</TabsTrigger><TabsTrigger value="c" disabled>Letter</TabsTrigger></TabsList>
            <TabsContent value="a" className="paper-card border-2 border-ink p-4">A pitch with a beginning, a middle and a deadline.</TabsContent>
            <TabsContent value="b" className="paper-card border-2 border-ink p-4">A picture, and what happened just outside the frame.</TabsContent>
          </Tabs>
          <Accordion type="single" collapsible defaultValue="q1">
            <AccordionItem value="q1"><AccordionTrigger>Who can write?</AccordionTrigger><AccordionContent>Anyone enrolled at Marlowe.</AccordionContent></AccordionItem>
            <AccordionItem value="q2"><AccordionTrigger>How often?</AccordionTrigger><AccordionContent>Four times a year.</AccordionContent></AccordionItem>
          </Accordion>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Sheet" source="components/ui/sheet.tsx"
        description="The mobile menu: a page that slides in from the right on Radix Dialog, with focus trapped and Esc to close."
        code={`<Sheet><SheetTrigger>Open</SheetTrigger><SheetContent><SheetTitle>Contents</SheetTitle></SheetContent></Sheet>`}
      >
        <Sheet>
          <SheetTrigger asChild><Button variant="paper">Open the sheet</Button></SheetTrigger>
          <SheetContent><SheetTitle className="display text-4xl">Contents</SheetTitle><SheetDescription className="kicker text-ink-faint">A sample sheet</SheetDescription></SheetContent>
        </Sheet>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Badge, Stamp, Starburst, Coupon, Tape, Manicule" source="components/ui/{badge,retro}.tsx"
        description="The small printed things: a NEW tag, a perforated postage stamp, a turning starburst, a clip-out coupon, masking tape and a pointing hand."
        code={`<Badge>New</Badge>\n<Stamp>…</Stamp>\n<Starburst label="New!" sub="issue 3" />\n<Coupon title="One free cookie" body="…" code="MRL-0042" />`}
      >
        <Row>
          <StateLabel label="tag"><Badge>New</Badge></StateLabel>
          <StateLabel label="ink"><Badge variant="ink">Live</Badge></StateLabel>
          <StateLabel label="outline"><Badge variant="outline">Draft</Badge></StateLabel>
          <StateLabel label="Starburst"><Starburst label="New!" size={88} /></StateLabel>
          <StateLabel label="Stamp"><Stamp className="w-28 -rotate-2"><p className="font-display text-2xl">No. 42</p><p className="kicker text-[0.5rem]">Marlowe FM</p></Stamp></StateLabel>
          <StateLabel label="Manicule"><Manicule /></StateLabel>
          <StateLabel label="Tape"><div className="relative h-12 w-28 bg-paper-bright"><Tape className="-top-3 left-4 -rotate-3" /></div></StateLabel>
          <Coupon title="One free cookie" body="Hand this to the canteen." code="MRL-0042" className="w-64" />
        </Row>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Cube3D, Tilt3D, Ticker, Masthead, Photo" source="components/motion/* · components/masthead.tsx · components/ui/photo.tsx"
        description="The 3D and motion pieces. Cube3D turns on CSS keyframes (so the editor’s Motion switch stops it); Tilt3D follows the pointer; Ticker is a seamless marquee; Masthead stretches its text to the block."
        code={`<Cube3D size={92} speed={16} labels="A,B,C,1,2,3" tone="cream" />\n<Tilt3D max={9}><Photo … /></Tilt3D>\n<Ticker text="One · Two · Three" speed={40} />\n<Masthead text="GAZETTE" tone="ink" />`}
      >
        <div className="flex flex-col gap-8">
          <Row>
            <StateLabel label="cream"><Cube3D size={84} speed={14} /></StateLabel>
            <StateLabel label="ink"><Cube3D size={84} speed={10} tone="ink" labels="★,✎,♪,☀,✿,♟" /></StateLabel>
            <StateLabel label="rust"><Cube3D size={84} speed={12} tone="rust" labels="FM,AM,1,2,3,4" /></StateLabel>
            <StateLabel label="Tilt3D — move the pointer over it"><Tilt3D><Photo src={PHOTOS.art} alt="An art class" className="aspect-[4/3] w-52" /></Tilt3D></StateLabel>
          </Row>
          <div className="bg-ink py-2 text-paper-light"><Ticker text="Mock timetables are up · First XI win · Founders’ Day is coming" /></div>
          <div className="max-w-md"><Masthead text="RADIO" tone="rust" /></div>
        </div>
      </ComponentSpecimen>
    </div>
  )
}
