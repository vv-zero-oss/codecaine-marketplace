import { useState } from "react"
import { ArrowRight, Loader2 } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { ComponentSpecimen, StateLabel } from "@/components/brand/specimen"
import { ActivityPill } from "@/components/motion/activity-pill"
import { GoalRing, Stat } from "@/components/mock/bits"
import { DashboardMock } from "@/components/mock/dashboard"
import { PhoneFrame, PhoneScreen } from "@/components/mock/phone"
import { FeatureCard } from "@/components/sections/feature-card"
import { Laurel } from "@/components/sections/laurel"
import { ReviewCard } from "@/components/sections/reviews"
import { CadenceLogo, CadenceMark } from "@/components/site/logo"
import { Button } from "@/components/ui/button"
import { Chip } from "@/components/ui/chip"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

function ButtonSpecimen() {
  const [loading, setLoading] = useState(false)
  const load = () => {
    setLoading(true)
    window.setTimeout(() => setLoading(false), 1400)
  }
  return (
    <ComponentSpecimen
      name="Button"
      source="components/ui/button.tsx"
      description="Every button is a pill. Primary is the flat lime fill that starts something — one per view. Light is the header's Paper call to action, glass sits on night, outline (Forest Ink hairline) on day. Every button presses to 0.97."
      code={`<Button>Start free</Button>
<Button variant="light" size="sm">Get started</Button>
<ButtonLink href="#pricing" variant="glass">Log in</ButtonLink>`}
    >
      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap items-end gap-6">
          <StateLabel label="primary"><Button className="pl-3"><CadenceMark className="size-6 rounded-full bg-forest-ink text-action" />Start free</Button></StateLabel>
          <StateLabel label="light"><Button variant="light">Get started</Button></StateLabel>
          <StateLabel label="glass"><Button variant="glass">Log in</Button></StateLabel>
          <StateLabel label="ghost"><Button variant="ghost">Features</Button></StateLabel>
        </div>
        <div className="flex flex-wrap items-end gap-6">
          <StateLabel label="sm"><Button size="sm">Start free</Button></StateLabel>
          <StateLabel label="md"><Button size="md">Start free</Button></StateLabel>
          <StateLabel label="lg"><Button size="lg">Start free <ArrowRight /></Button></StateLabel>
          <StateLabel label="hover"><Button className="bg-action-hover">Start free</Button></StateLabel>
          <StateLabel label="focus"><Button className="ring-[3px] ring-action/50">Start free</Button></StateLabel>
          <StateLabel label="disabled"><Button disabled>Start free</Button></StateLabel>
          <StateLabel label="loading — click">
            <Button onClick={load} aria-busy={loading} className="min-w-32">
              {loading ? <Loader2 className="animate-spin" /> : null}
              {loading ? "Starting…" : "Start free"}
            </Button>
          </StateLabel>
        </div>
        <div className="rounded-(--radius-field) bg-day p-5">
          <StateLabel label="outline — on day" tone="day"><Button variant="outline">Add results</Button></StateLabel>
        </div>
      </div>
    </ComponentSpecimen>
  )
}

function ChipSpecimen() {
  const tones = ["lime", "mist", "sky", "coral", "sand", "sage"] as const
  return (
    <ComponentSpecimen
      name="Chip"
      source="components/ui/chip.tsx"
      description="The app's small tinted pill: a zone or activity in caps, or a change with its arrow. Colour is never the only signal — there is always a word or a sign."
      code={`<Chip tone="sky">Zone 2</Chip>
<Chip tone="gain" caps={false}>↗ HRV 68 ms</Chip>`}
    >
      <div className="flex flex-wrap gap-2">
        {tones.map((tone) => (
          <Chip key={tone} tone={tone}>{tone}</Chip>
        ))}
        <Chip tone="gain" caps={false}>↗ HRV 68 ms</Chip>
        <Chip tone="loss" caps={false}>↘ Sleep −40m</Chip><Chip tone="day" caps={false}>On day</Chip>
      </div>
    </ComponentSpecimen>
  )
}

function SwitchSpecimen() {
  const [on, setOn] = useState(false)
  return (
    <ComponentSpecimen
      name="Switch"
      source="components/ui/switch.tsx (shadcn)"
      description="Yearly or monthly. The thumb slides on the swap duration with the strong ease-out; the track turns lime when on."
      code={`<Switch checked={monthly} onCheckedChange={setMonthly} aria-label="Bill monthly" />`}
    >
      <div className="flex flex-wrap items-end gap-8">
        <StateLabel label="interactive"><Switch checked={on} onCheckedChange={setOn} aria-label="Demo switch" /></StateLabel>
        <StateLabel label="off"><Switch checked={false} aria-label="Off" /></StateLabel>
        <StateLabel label="on"><Switch checked aria-label="On" /></StateLabel>
        <StateLabel label="sm"><Switch size="sm" defaultChecked aria-label="Small" /></StateLabel>
        <StateLabel label="disabled"><Switch disabled aria-label="Disabled" /></StateLabel>
      </div>
    </ComponentSpecimen>
  )
}

function OverlaySpecimen() {
  const [dialog, setDialog] = useState(false)
  const [sheet, setSheet] = useState(false)
  useCanvasAction("Demo dialog", (next) => setDialog(next ?? !dialog), { on: dialog, group: "Brand guidelines" })
  useCanvasAction("Demo sheet", (next) => setSheet(next ?? !sheet), { on: sheet, group: "Brand guidelines" })
  return (
    <ComponentSpecimen
      name="Dialog, Sheet, Tooltip"
      source="components/ui/dialog.tsx · sheet.tsx · tooltip.tsx (shadcn)"
      description="Overlays on night: a blurred scrim, a surface card, the card shadow. The dialog answers a question in place; the sheet is the mobile menu."
      code={`<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader><DialogTitle>Why isn’t Cadence free?</DialogTitle></DialogHeader>
  </DialogContent>
</Dialog>`}
    >
      <div className="flex flex-wrap gap-3">
        <Button variant="glass" onClick={() => setDialog(true)}>Open dialog</Button>
        <Button variant="glass" onClick={() => setSheet(true)}>Open sheet</Button>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="glass">Hover for a tooltip</Button>
          </TooltipTrigger>
          <TooltipContent>Vitals sync every 15 minutes</TooltipContent>
        </Tooltip>
      </div>
      <Dialog open={dialog} onOpenChange={setDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>A dialog</DialogTitle>
            <DialogDescription>One question, answered without leaving the page.</DialogDescription>
          </DialogHeader>
          <DialogFooter showCloseButton />
        </DialogContent>
      </Dialog>
      <Sheet open={sheet} onOpenChange={setSheet}>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>A sheet</SheetTitle>
            <SheetDescription>The header's menu uses this from the top on small screens.</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </ComponentSpecimen>
  )
}

export function ComponentLibrary() {
  return (
    <div className="flex flex-col gap-6">
      <ButtonSpecimen />
      <ChipSpecimen />
      <SwitchSpecimen />
      <OverlaySpecimen />
      <ComponentSpecimen
        name="CadenceLogo and CadenceMark"
        source="components/site/logo.tsx"
        description="The mark on its white tile, with or without the name."
        code={`<CadenceLogo />\n<CadenceMark className="size-11 rounded-[12px]" />`}
      >
        <div className="flex flex-wrap items-center gap-8">
          <CadenceLogo />
          <CadenceLogo showName={false} />
          <CadenceMark className="size-11 rounded-[12px]" />
        </div>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="FeatureCard"
        source="components/sections/feature-card.tsx"
        description="A bento cell: title, one line of why, and a piece of the product. Forest Ink for vitals, Paper on Linen Mist for progress; stacked or side by side."
        code={`<FeatureCard title="Training load" body="What each session cost." tone="night">\n  <TrainingLoad />\n</FeatureCard>`}
      >
        <div className="grid gap-3 md:grid-cols-2">
          <FeatureCard title="Training load" body="What each session cost, and what rest gave back.">
            <div className="flex gap-2 px-6 pb-6"><Chip tone="lime">Run +12</Chip><Chip tone="sky">Ride +8</Chip></div>
          </FeatureCard>
          <div className="rounded-(--radius-card) bg-day p-3">
            <FeatureCard tone="day" title="Composition" body="Weight hides the story. See what’s muscle and what isn’t.">
              <div className="px-6 pb-6"><span className="block h-1.5 w-2/3 rounded-full bg-forest-ink" /></div>
            </FeatureCard>
          </div>
        </div>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="ReviewCard"
        source="components/sections/reviews.tsx"
        description="A post with a face and a handle, or a rating with a title. Masonry columns on the page."
        code={`<ReviewCard review={{ kind: "rating", author: "Dana K.", title: "I’ve tried all of them", body: "…" }} />`}
      >
        <div className="grid gap-3 md:grid-cols-2">
          <ReviewCard review={{ kind: "post", name: "Theo Marsh", handle: "@theomarsh", avatar: 2, body: "Finally my ring, my watch and my scale on one screen." }} />
          <ReviewCard review={{ kind: "rating", author: "Dana K.", title: "I’ve tried all of them", body: "Cadence is the one I open every morning. Calm design, and my devices just sync." }} />
        </div>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="ActivityPill"
        source="components/motion/activity-pill.tsx"
        description="The glossy pill the hero's PillBurst throws: an icon in a disc, a label in black caps, in six palette fills. Lime is used once in the set, so it stays an accent."
        code={`<ActivityPill label="Running" icon="run" colour="lime" />`}
      >
        <div className="flex flex-wrap gap-3">
          <ActivityPill label="Running" icon="run" colour="lime" />
          <ActivityPill label="Yoga" icon="yoga" colour="spruce" />
          <ActivityPill label="Cycling" icon="ride" colour="red" />
          <ActivityPill label="Strength" icon="lift" colour="mist" />
          <ActivityPill label="Swim" icon="swim" colour="blue" />
          <ActivityPill label="Sleep" icon="sleep" colour="paper" />
        </div>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="Laurel"
        source="components/sections/laurel.tsx"
        description="A recognition between two drawn laurel branches, under the hero."
        code={`<Laurel title="Editors’ pick" />`}
      >
        <div className="flex flex-wrap gap-6">
          <Laurel title="Editors’ pick" />
          <Laurel title="Design award finalist" />
        </div>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="App mocks — DashboardMock, PhoneFrame, GoalRing, Stat"
        source="components/mock/"
        description="The product, drawn in HTML from the same tokens: never a screenshot, so it can never fall out of date with the palette."
        code={`<DashboardMock />\n<PhoneFrame><PhoneScreen /></PhoneFrame>\n<GoalRing pct={0.7} colour="var(--color-warn)" />`}
      >
        <div className="grid items-start gap-6 lg:grid-cols-[1fr_200px]">
          <DashboardMock />
          <div className="flex flex-col items-center gap-6">
            <PhoneFrame className="w-[200px]"><PhoneScreen /></PhoneFrame>
            <div className="flex items-center gap-4">
              <GoalRing pct={0.35} colour="var(--color-gain)" />
              <GoalRing pct={0.7} colour="var(--color-warn)" />
              <GoalRing pct={1} colour="var(--color-loss)" />
              <Stat value="84" unit="%" className="text-[22px] font-black text-fg" />
            </div>
          </div>
        </div>
      </ComponentSpecimen>
    </div>
  )
}
