import { useState } from "react"
import { ArrowRight, Loader2, Plane, RotateCcw, Smartphone } from "lucide-react"

import { ComponentSpecimen, StateLabel } from "@/components/brand/specimen"
import { CtaBand } from "@/components/blocks/cta-band"
import { Aircraft } from "@/components/mock/aircraft"
import { BeltChip, FlightRow, GateChip, TailMark } from "@/components/mock/app-ui"
import { Laptop, PassportBooklet, Tablet, WatchFace } from "@/components/mock/devices"
import { FlightMap, type MapPalette } from "@/components/mock/flight-map"
import { NotificationCard } from "@/components/mock/notification-card"
import { Phone } from "@/components/mock/phone"
import { AirportScreen, ArrivalScreen, PassportScreen, PreflightScreen } from "@/components/mock/screens"
import { CountUp } from "@/components/motion/count-up"
import { SplitFlap } from "@/components/motion/split-flap"
import { InsidersDialog } from "@/components/site/insiders-dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { MY_FLIGHTS } from "@/lib/flights"
import { cn } from "@/lib/utils"

function ButtonSpecimen() {
  return (
    <ComponentSpecimen
      name="Button"
      source="components/ui/button.tsx"
      description="Pills, always. Amber is the one thing to press on a screen; ink everywhere else on day, white on night. Presses scale to 0.97."
      code={`<Button>Start a free week</Button>\n<Button variant="ink" size="lg">Give Contrail a try <ArrowRight /></Button>\n<ButtonLink href="/pricing" variant="outline">See pricing</ButtonLink>`}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-end gap-4">
          {(["amber", "ink", "outline", "ghost", "link"] as const).map((v) => (
            <StateLabel key={v} label={v}><Button variant={v}>Get the app</Button></StateLabel>
          ))}
          <div className="rounded-full bg-night p-2"><StateLabel label="night" tone="night"><Button variant="night">Get the app</Button></StateLabel></div>
        </div>
        <div className="flex flex-wrap items-end gap-4">
          <StateLabel label="sm"><Button size="sm">Small</Button></StateLabel>
          <StateLabel label="default"><Button>Default</Button></StateLabel>
          <StateLabel label="lg"><Button size="lg"><Smartphone /> Large</Button></StateLabel>
          <StateLabel label="icon"><Button size="icon" variant="outline" aria-label="Flight"><Plane /></Button></StateLabel>
          <StateLabel label="focus"><Button variant="ink" className="ring-[3px] ring-violet/30">Focused</Button></StateLabel>
          <StateLabel label="loading"><Button variant="ink" disabled><Loader2 className="animate-spin" /> Joining…</Button></StateLabel>
          <StateLabel label="disabled"><Button disabled>Disabled</Button></StateLabel>
        </div>
      </div>
    </ComponentSpecimen>
  )
}

function FieldSpecimen() {
  return (
    <ComponentSpecimen
      name="Input"
      source="components/ui/input.tsx"
      description="Fields with a hairline ring that turns violet on focus. Errors say how to fix it, in red, under the field."
      code={`<Input placeholder="you@example.com" />\n<Input aria-invalid placeholder="Their name" />`}
      tone="panel"
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StateLabel label="default" className="w-full"><Input placeholder="you@example.com" className="bg-raised" /></StateLabel>
        <StateLabel label="filled" className="w-full"><Input defaultValue="NW 214" className="bg-raised" /></StateLabel>
        <StateLabel label="error" className="w-full"><Input aria-invalid defaultValue="ama@" className="bg-raised" /><span className="text-[12.58px] text-red">Check the part after the @.</span></StateLabel>
        <StateLabel label="disabled" className="w-full"><Input disabled placeholder="Locked" className="bg-raised" /></StateLabel>
      </div>
    </ComponentSpecimen>
  )
}

function ControlsSpecimen() {
  const [on, setOn] = useState(true)
  const [billing, setBilling] = useState("yearly")
  const [volume, setVolume] = useState([60])
  return (
    <ComponentSpecimen
      name="Switch, toggle group, slider, tooltip, badge"
      source="components/ui/{switch,toggle-group,slider,tooltip,badge}.tsx"
      description="The small controls: alert switches in Friends, the billing toggle on Pricing, status badges."
      code={`<Switch checked={on} onCheckedChange={setOn} />\n<ToggleGroup type="single" value={billing} onValueChange={setBilling}>…</ToggleGroup>\n<Badge variant="green">On time</Badge>`}
    >
      <div className="flex flex-wrap items-center gap-8">
        <StateLabel label={on ? "switch · on" : "switch · off"}><Switch checked={on} onCheckedChange={setOn} aria-label="Demo switch" /></StateLabel>
        <StateLabel label="toggle group">
          <ToggleGroup type="single" value={billing} onValueChange={(v) => v && setBilling(v)} className="rounded-full bg-panel p-1">
            {["yearly", "monthly"].map((b) => (
              <ToggleGroupItem key={b} value={b} className="h-9 rounded-full! px-4 capitalize data-[state=on]:bg-raised data-[state=on]:shadow-(--shadow-card)">{b}</ToggleGroupItem>
            ))}
          </ToggleGroup>
        </StateLabel>
        <StateLabel label={`slider · ${volume[0]}`} className="w-48"><Slider value={volume} onValueChange={setVolume} max={100} step={1} /></StateLabel>
        <StateLabel label="tooltip">
          <Tooltip>
            <TooltipTrigger asChild><Button variant="outline" size="sm">Hover me</Button></TooltipTrigger>
            <TooltipContent>Inbound aircraft · A321neo</TooltipContent>
          </Tooltip>
        </StateLabel>
        <StateLabel label="badges">
          <span className="flex flex-wrap gap-1.5">
            <Badge variant="green">On time</Badge><Badge variant="red">30m late</Badge><Badge variant="amber">Gate B27</Badge><Badge variant="blue">Live</Badge><Badge variant="violet">Pro</Badge><Badge>Default</Badge>
          </span>
        </StateLabel>
      </div>
    </ComponentSpecimen>
  )
}

function DisclosureSpecimen() {
  return (
    <ComponentSpecimen
      name="Tabs, accordion, dialog"
      source="components/ui/{tabs,accordion,dialog}.tsx · site/insiders-dialog.tsx"
      description="Tabs switch views in place; the accordion carries FAQs and roles; the Insiders dialog is the newsletter, with validation and a success state."
      code={`<Accordion type="single" collapsible>…</Accordion>\n<InsidersDialog><Button>Join Insiders</Button></InsidersDialog>`}
    >
      <div className="grid gap-8 lg:grid-cols-3">
        <Tabs defaultValue="dep">
          <TabsList>
            <TabsTrigger value="dep">Departure</TabsTrigger>
            <TabsTrigger value="arr">Arrival</TabsTrigger>
          </TabsList>
          <TabsContent value="dep" className="pt-3 text-[15px] text-ink-2">SFO · Gate B27 · 06:00</TabsContent>
          <TabsContent value="arr" className="pt-3 text-[15px] text-ink-2">JFK · Gate 33 · 14:41</TabsContent>
        </Tabs>
        <Accordion type="single" collapsible defaultValue="a">
          <AccordionItem value="a"><AccordionTrigger className="hover:no-underline">Is my data private?</AccordionTrigger><AccordionContent className="text-ink-2">Yours alone, and whoever you choose.</AccordionContent></AccordionItem>
          <AccordionItem value="b"><AccordionTrigger className="hover:no-underline">Which airlines?</AccordionTrigger><AccordionContent className="text-ink-2">More than 1,000.</AccordionContent></AccordionItem>
        </Accordion>
        <div><InsidersDialog><Button variant="ink">Open the Insiders dialog <ArrowRight /></Button></InsidersDialog></div>
      </div>
    </ComponentSpecimen>
  )
}

function AppPiecesSpecimen() {
  return (
    <ComponentSpecimen
      name="App pieces: notification, flight row, chips, tail marks"
      source="components/mock/{notification-card,app-ui}.tsx"
      description="The parts every phone is built from. Sized in em, so they scale with the phone they're in."
      code={`<NotificationCard title="Gate changed" body="Now Terminal 1 · Gate B27" icon={<GateChip gate="B27" />} />\n<FlightRow flight={MY_FLIGHTS[0]} />`}
      tone="panel"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-3">
          <StateLabel label="active" className="w-full"><NotificationCard title="Gate changed" body="Now Terminal 1 · Gate B27" icon={<GateChip gate="B27" className="text-[13px]" />} className="w-full" /></StateLabel>
          <StateLabel label="dim" className="w-full"><NotificationCard title="NW 214 · Landed" body="6:32 pm, 22 min early" icon={<TailMark airline="NW" className="size-8" />} dim className="w-full" /></StateLabel>
          <StateLabel label="night" className="w-full"><div className="w-full rounded-(--radius-card) bg-night p-3"><NotificationCard tone="night" title="CR 88 · Delayed 30m" body="Inbound held in Denver" icon={<TailMark airline="CR" className="size-8" />} /></div></StateLabel>
        </div>
        <div className="flex flex-col gap-4">
          <div className="overflow-hidden rounded-(--radius-card) bg-raised text-[18px] shadow-(--shadow-card)">
            {MY_FLIGHTS.map((f) => <FlightRow key={f.number} flight={f} />)}
          </div>
          <div className="flex flex-wrap items-center gap-3 text-[18px]">
            <GateChip gate="B27" /><GateChip gate="33" arrival /><BeltChip belt={6} />
            {["NW", "CR", "MD", "SK", "AL"].map((a) => <TailMark key={a} airline={a} className="size-8" />)}
          </div>
        </div>
      </div>
    </ComponentSpecimen>
  )
}

function PhoneSpecimen() {
  const [screen, setScreen] = useState(0)
  const screens = [<PreflightScreen key={0} />, <AirportScreen key={1} />, <ArrivalScreen key={2} />, <PassportScreen key={3} />]
  return (
    <ComponentSpecimen
      name="Phone and its screens"
      source="components/mock/{phone,screens}.tsx"
      description="A drawn phone with a live screen: the map flies, the plane taxis. The four screens are the hero's four phases."
      code={`<Phone tone="light" className="w-[300px]">\n  <AirportScreen />\n</Phone>`}
      tone="panel"
    >
      <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
        <Phone tone={screen === 3 ? "dark" : "light"} className="w-[260px]">{screens[screen]}</Phone>
        <div className="flex flex-wrap gap-2 md:flex-col">
          {["Preflight", "At the airport", "After landing", "Passport"].map((label, i) => (
            <button key={label} type="button" onClick={() => setScreen(i)} className={cn("h-10 rounded-full px-4 text-left text-[14.5px] transition-colors", screen === i ? "bg-ink text-white" : "bg-raised text-ink-2 shadow-(--shadow-field) hover:text-ink")}>{label}</button>
          ))}
        </div>
      </div>
    </ComponentSpecimen>
  )
}

function MapSpecimen() {
  const [palette, setPalette] = useState<MapPalette>("day")
  return (
    <ComponentSpecimen
      name="Flight map"
      source="components/mock/flight-map.tsx"
      description="Natural Earth countries, real airports, great-circle routes and a plane on the first one. Every knob is a scalar the editor can drive."
      code={`<FlightMap region="atlantic" palette="${palette}" routes="SFO-JFK,JFK-LIS" duration={14} />`}
    >
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          {(["day", "violet", "night"] as const).map((p) => (
            <button key={p} type="button" onClick={() => setPalette(p)} className={cn("h-9 rounded-full px-4 text-[14px] capitalize transition-colors", palette === p ? "bg-ink text-white" : "bg-panel text-ink-2 hover:text-ink")}>{p}</button>
          ))}
        </div>
        <div className="aspect-[2/1] overflow-hidden rounded-(--radius-card)">
          <FlightMap region="atlantic" palette={palette} routes="SFO-JFK,JFK-LIS,LIS-OSL" width={800} height={400} />
        </div>
      </div>
    </ComponentSpecimen>
  )
}

function DataSpecimen() {
  const [run, setRun] = useState(0)
  return (
    <ComponentSpecimen
      name="Split-flap board, count-up, aircraft"
      source="components/motion/{split-flap,count-up}.tsx · mock/aircraft.tsx"
      description="The delay report's board turns leaf by leaf; figures count up once when seen; the aircraft is line work with no livery."
      code={`<SplitFlap text="32HRS" dimFrom={2} />\n<CountUp value={93931} prefix="" decimals={0} />\n<Aircraft />`}
      tone="night"
    >
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div>
          <SplitFlap key={run} text="32HRS" className="text-[52px]" />
          <button type="button" onClick={() => setRun((r) => r + 1)} className="mt-4 inline-flex h-9 items-center gap-1.5 rounded-full bg-night-2 px-3 text-[13.5px] text-night-2fg hover:text-white"><RotateCcw className="size-3.5" /> Replay</button>
          <p className="mt-6 font-data text-h2 font-medium text-night-fg"><CountUp key={run} value={93931} prefix="" decimals={0} /> km</p>
        </div>
        <div className="rounded-(--radius-card) bg-panel p-6"><Aircraft /></div>
      </div>
    </ComponentSpecimen>
  )
}

function DevicesSpecimen() {
  return (
    <ComponentSpecimen
      name="Devices"
      source="components/mock/devices.tsx"
      description="Laptop, tablet, watch and the passport booklet — the closing composition on the home page, each with live screens."
      code={`<Laptop className="w-[520px]" />\n<Tablet className="w-[300px]" />\n<WatchFace className="w-[120px]" />`}
      tone="panel"
    >
      <div className="flex flex-wrap items-end justify-center gap-6">
        <WatchFace className="w-[100px]" />
        <Laptop className="w-[min(420px,100%)]" />
        <Tablet className="w-[240px]" />
        <PassportBooklet className="w-[110px]" />
      </div>
    </ComponentSpecimen>
  )
}

function BlocksSpecimen() {
  return (
    <ComponentSpecimen
      name="CTA band"
      source="components/blocks/cta-band.tsx · blocks/page-hero.tsx"
      description="Every inner page opens with PageHero (mega headline, the turn in grey) and closes with this band."
      code={`<PageHero eyebrow="Pricing" title="One flight free." turn="Every flight after, calmer." />\n<CtaBand title="Your next flight, minus the guesswork." />`}
      previewClassName="p-0 sm:p-0 [&_section]:pb-0 [&_section]:pt-6"
    >
      <CtaBand />
    </ComponentSpecimen>
  )
}

/** Every component in the project, live, in its variants and states. */
export function ComponentLibrary() {
  return (
    <div className="flex flex-col gap-8">
      <ButtonSpecimen />
      <FieldSpecimen />
      <ControlsSpecimen />
      <DisclosureSpecimen />
      <AppPiecesSpecimen />
      <PhoneSpecimen />
      <MapSpecimen />
      <DataSpecimen />
      <DevicesSpecimen />
      <BlocksSpecimen />
    </div>
  )
}
