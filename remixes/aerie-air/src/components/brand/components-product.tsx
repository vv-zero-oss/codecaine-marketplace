import { useState } from "react"
import { useCanvasAction } from "@canvas/react"

import { ComponentSpecimen, GroupLabel, StateLabel } from "@/components/brand/specimen"
import { Photo } from "@/components/blocks/photo"
import { AircraftSide } from "@/components/mock/aircraft"
import { PhoneFrame } from "@/components/mock/phone-frame"
import { RotorModeToggle } from "@/components/sections/aircraft/aircraft-hero"
import { CraftPlan, type PlanPart } from "@/components/sections/aircraft/craft-plan"
import { BoardingPass, TimeBars } from "@/components/sections/experience/booking-widget"
import { CabinPlan, type SeatId } from "@/components/sections/experience/cabin-seat-map"
import { QrCode } from "@/components/sections/experience/qr-code"
import { RouteMini } from "@/components/sections/experience/route-mini"
import { BoardScreen, TapScreen } from "@/components/sections/experience/trip-screens"
import { JourneyPhone } from "@/components/sections/home/journey-phone"
import { NetworkMap } from "@/components/sections/routes/network-map"
import { QuotePanel } from "@/components/sections/routes/route-hero"
import { Button } from "@/components/ui/button"
import { VERTIPORTS } from "@/content/network"
import { cn } from "@/lib/utils"

/** A row of small pill choices, for driving a specimen's props. */
function Choices<T extends string>({
  label,
  options,
  value,
  onChange,
  dark = false,
}: {
  label: string
  options: readonly T[]
  value: T
  onChange: (v: T) => void
  dark?: boolean
}) {
  return (
    <div>
      <p className={cn("mb-2 text-micro", dark ? "text-dusk-muted" : "text-ink-3")}>{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <Button key={o} size="sm" variant={value === o ? (dark ? "cream" : "ink") : dark ? "outline-light" : "soft"} onClick={() => onChange(o)}>
            {o}
          </Button>
        ))}
      </div>
    </div>
  )
}

function PhoneSpecimen() {
  const [screen, setScreen] = useState<"tap" | "board">("tap")
  return (
    <ComponentSpecimen
      name="PhoneFrame and StatusBar"
      source="components/mock/phone-frame.tsx"
      description="A phone drawn in SVG — frame, side buttons, island — whose screen is real, working UI. Every screen starts with a StatusBar, dark or light to match it."
      code={`<PhoneFrame className="w-[280px]">
  <StatusBar tone="dark" time="08:31" />
  …the live screen…
</PhoneFrame>`}
      tone="panel"
    >
      <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-center sm:justify-center sm:gap-12">
        <PhoneFrame className="w-[min(280px,72vw)]">{screen === "tap" ? <TapScreen /> : <BoardScreen />}</PhoneFrame>
        <Choices label="screen" options={["tap", "board"] as const} value={screen} onChange={setScreen} />
      </div>
    </ComponentSpecimen>
  )
}

function JourneyPhoneSpecimen() {
  return (
    <ComponentSpecimen
      name="JourneyPhone"
      source="components/sections/home/journey-phone.tsx"
      description="The app on glass over a photograph, and it works: pick the pads, a departure, swap the direction, then press and hold to book. Times and fares come from quote(), as everywhere."
      code={`<div className="relative">
  <Photo name="city-sunset" className="aspect-[16/10]" />
  <div className="absolute inset-0 grid place-items-center"><JourneyPhone holdMs={900} /></div>
</div>`}
      previewClassName="p-0 sm:p-0"
    >
      <div className="relative">
        <Photo name="city-sunset" rounded={false} className="aspect-[4/5] sm:aspect-[16/10]" />
        <div className="absolute inset-0 flex items-center justify-center py-8">
          <JourneyPhone />
        </div>
        <p className="absolute bottom-4 left-4 rounded-full bg-dusk/40 px-3 py-1 text-micro text-dusk-fg backdrop-blur-md">Hold the button to book</p>
      </div>
    </ComponentSpecimen>
  )
}

function AircraftSpecimen() {
  const [mode, setMode] = useState<"hover" | "cruise">("hover")
  const [tone, setTone] = useState<"light" | "dark">("dark")
  return (
    <ComponentSpecimen
      name="AircraftSide and RotorModeToggle"
      source="components/mock/aircraft.tsx · sections/aircraft/aircraft-hero.tsx"
      description="The craft side on, drawn in SVG from the tokens. mode tilts the four visible rotors on a 900ms in-out; tone='dark' for cream, 'light' for dusk and sky. The toggle is the pill switch the aircraft page uses on dusk."
      code={`<RotorModeToggle mode={mode} onModeChange={setMode} />
<AircraftSide mode={mode} tone="light" spinning />`}
      tone={tone === "light" ? "dusk" : "page"}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          {tone === "light" ? (
            <RotorModeToggle mode={mode} onModeChange={setMode} />
          ) : (
            <Choices label="mode" options={["hover", "cruise"] as const} value={mode} onChange={setMode} />
          )}
          <Choices label="tone" options={["dark", "light"] as const} value={tone} onChange={setTone} dark={tone === "light"} />
        </div>
        <AircraftSide mode={mode} tone={tone} className="mx-auto max-w-[620px]" />
      </div>
    </ComponentSpecimen>
  )
}

function CraftPlanSpecimen() {
  const [tilt, setTilt] = useState(0)
  const [emphasis, setEmphasis] = useState<PlanPart>("none")
  const [failed, setFailed] = useState("")
  return (
    <ComponentSpecimen
      name="CraftPlan"
      source="components/sections/aircraft/craft-plan.tsx"
      description="The craft from above: six rotors that tilt from 0 (hover) to 90 (cruise), an x-ray of the systems under the skin with one lit in sky, and rotors that can be stopped to show the others carry it."
      code={`<CraftPlan tilt={45} tone="light" xray emphasis="battery" failed="2,5" />`}
      tone="dusk"
    >
      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-center">
        <CraftPlan tilt={tilt} tone="light" xray={emphasis !== "none"} emphasis={emphasis} failed={failed} className="mx-auto max-w-[360px]" />
        <div className="flex flex-col gap-5">
          <Choices label="tilt" options={["0", "45", "90"] as const} value={String(tilt) as "0" | "45" | "90"} onChange={(v) => setTilt(+v)} dark />
          <Choices label="emphasis (x-ray)" options={["none", "cabin", "battery", "motors", "parachute"] as const} value={emphasis as "none"} onChange={setEmphasis} dark />
          <Choices label="failed rotors" options={["", "2", "2,5"] as const} value={failed as ""} onChange={setFailed} dark />
        </div>
      </div>
    </ComponentSpecimen>
  )
}

function CabinPlanSpecimen() {
  const [seat, setSeat] = useState<SeatId>("1A")
  return (
    <ComponentSpecimen
      name="CabinPlan"
      source="components/sections/experience/cabin-seat-map.tsx"
      description="The cabin from above on dusk, the four seats a real radio group — arrow keys move between them, and the chosen seat lights in sky."
      code={`<CabinPlan seatId={seat} onPick={setSeat} />`}
      tone="dusk"
    >
      <div className="grid items-center gap-6 sm:grid-cols-[minmax(0,1fr)_auto]">
        <div className="mx-auto w-full max-w-[280px]">
          <CabinPlan seatId={seat} onPick={setSeat} />
        </div>
        <p className="text-center font-mono text-micro text-dusk-muted sm:text-left">
          seatId=
          <span className="text-dusk-fg">"{seat}"</span>
        </p>
      </div>
    </ComponentSpecimen>
  )
}

function BoardingSpecimen() {
  const [ref, setRef] = useState("AER-7KQ2")
  return (
    <ComponentSpecimen
      name="BoardingPass, QrCode, RouteMini and TimeBars"
      source="sections/experience/booking-widget.tsx · qr-code.tsx · route-mini.tsx"
      description="What a booking ends in: the pass, its reference with a copy button, and a code drawn from the reference — change it and the code redraws. RouteMini draws the trip's line across the six pads."
      code={`<BoardingPass reference="AER-7KQ2" fromCode="MDT" toCode="INT" departs="08:45" lands="08:52" />
<QrCode value="AER-7KQ2" className="size-32 text-ink" />
<RouteMini fromId="midtown" toId="airport" />
<TimeBars flightMin={7} roadMin={90} />`}
    >
      <div className="flex flex-col gap-10">
        <BoardingPass reference={ref} />
        <div className="grid gap-8 border-t border-line pt-8 md:grid-cols-2">
          <StateLabel label={`QrCode value="${ref}"`}>
            <div className="flex flex-wrap items-center gap-5">
              <QrCode value={ref} className="size-28 rounded-(--radius-card) text-ink shadow-(--shadow-hairline)" />
              <div className="flex flex-col gap-2">
                {["AER-7KQ2", "AER-3MX9", "AER-0QP4"].map((r) => (
                  <Button key={r} size="sm" variant={ref === r ? "ink" : "soft"} onClick={() => setRef(r)} className="font-mono">
                    {r}
                  </Button>
                ))}
              </div>
            </div>
          </StateLabel>
          <RouteMiniDemo />
        </div>
        <StateLabel label="TimeBars flightMin={7} roadMin={90}">
          <div className="max-w-md">
            <TimeBars flightMin={7} roadMin={90} />
          </div>
        </StateLabel>
      </div>
    </ComponentSpecimen>
  )
}

function RouteMiniDemo() {
  const [to, setTo] = useState("airport")
  return (
    <StateLabel label={`RouteMini fromId="midtown" toId="${to}"`} className="items-stretch">
      <RouteMini fromId="midtown" toId={to} className="w-full rounded-(--radius-field) bg-panel" />
      <div className="flex flex-wrap gap-2">
        {VERTIPORTS.filter((v) => v.id !== "midtown").map((v) => (
          <Button key={v.id} size="sm" variant={to === v.id ? "ink" : "soft"} onClick={() => setTo(v.id)} className="font-mono">
            {v.code}
          </Button>
        ))}
      </div>
    </StateLabel>
  )
}

function NetworkSpecimen() {
  const [from, setFrom] = useState<string | null>("harbour")
  const [to, setTo] = useState<string | null>("airport")
  useCanvasAction("Route picked", (next) => {
    const on = next ?? !(from && to)
    setFrom(on ? "harbour" : null)
    setTo(on ? "airport" : null)
  }, { on: !!(from && to), group: "Brand · Components" })
  const pick = (id: string) => {
    if (!from || (from && to)) {
      setFrom(id)
      setTo(null)
    } else if (id !== from) setTo(id)
  }
  return (
    <ComponentSpecimen
      name="NetworkMap and QuotePanel"
      source="components/sections/routes/network-map.tsx · route-hero.tsx"
      description="The live network on sky: tap a pad to leave from and another to land at; the arc draws and a small craft flies it. The quote beside it is the same trip, in minutes, kilometres and fare."
      code={`<NetworkMap from={from} to={to} onPick={pick} flightSeconds={2.6} loop pulse showStreets showNames />
<QuotePanel from={from} to={to} onFrom={setFrom} onTo={setTo} onSwap={swap} onClear={clear} />`}
      tone="sky"
    >
      <div className="grid gap-5 lg:grid-cols-12">
        <div className="flex items-center overflow-hidden rounded-(--radius-photo) bg-sky-hover/40 p-2 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.14)] sm:p-4 lg:col-span-8">
          <NetworkMap from={from} to={to} onPick={pick} />
        </div>
        <QuotePanel
          from={from}
          to={to}
          onFrom={(id) => {
            setFrom(id)
            if (id === to) setTo(null)
          }}
          onTo={(id) => {
            setTo(id)
            if (id === from) setFrom(null)
          }}
          onSwap={() => {
            setFrom(to)
            setTo(from)
          }}
          onClear={() => {
            setFrom(null)
            setTo(null)
          }}
          className="lg:col-span-4"
        />
      </div>
    </ComponentSpecimen>
  )
}

/** The pieces the pages are built from — live, in the states they ship in. */
export function ProductComponents() {
  return (
    <>
      <div className="flex flex-col gap-6">
        <GroupLabel>Devices and the craft</GroupLabel>
        <PhoneSpecimen />
        <JourneyPhoneSpecimen />
        <AircraftSpecimen />
        <CraftPlanSpecimen />
      </div>
      <div className="flex flex-col gap-6">
        <GroupLabel>From the pages — experience and routes</GroupLabel>
        <CabinPlanSpecimen />
        <BoardingSpecimen />
        <NetworkSpecimen />
      </div>
    </>
  )
}
