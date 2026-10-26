import { useState } from "react"
import { ArrowRight, Loader2 } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { ComponentSpecimen, StateLabel } from "@/components/brand/specimen"
import { BudgetRing, Money } from "@/components/mock/bits"
import { DashboardMock } from "@/components/mock/dashboard"
import { PhoneFrame, PhoneScreen } from "@/components/mock/phone"
import { FeatureCard } from "@/components/sections/feature-card"
import { Laurel } from "@/components/sections/laurel"
import { ReviewCard } from "@/components/sections/reviews"
import { KeelLogo, KeelMark } from "@/components/site/logo"
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
      description="Primary is the glowing blue that starts something — one per view. Light is the header's quiet call to action, glass sits on night, outline on day. Every button presses to 0.97."
      code={`<Button>Start free</Button>
<Button variant="light" size="sm">Get started</Button>
<ButtonLink href="#pricing" variant="glass">Log in</ButtonLink>`}
    >
      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap items-end gap-6">
          <StateLabel label="primary"><Button className="pl-2.5"><KeelMark className="size-6 rounded-[7px] text-blue" />Start free</Button></StateLabel>
          <StateLabel label="light"><Button variant="light">Get started</Button></StateLabel>
          <StateLabel label="glass"><Button variant="glass">Log in</Button></StateLabel>
          <StateLabel label="ghost"><Button variant="ghost">Features</Button></StateLabel>
        </div>
        <div className="flex flex-wrap items-end gap-6">
          <StateLabel label="sm"><Button size="sm">Start free</Button></StateLabel>
          <StateLabel label="md"><Button size="md">Start free</Button></StateLabel>
          <StateLabel label="lg"><Button size="lg">Start free <ArrowRight /></Button></StateLabel>
          <StateLabel label="hover"><Button className="bg-blue-hover">Start free</Button></StateLabel>
          <StateLabel label="focus"><Button className="ring-[3px] ring-blue/50">Start free</Button></StateLabel>
          <StateLabel label="disabled"><Button disabled>Start free</Button></StateLabel>
          <StateLabel label="loading — click">
            <Button onClick={load} aria-busy={loading} className="min-w-32">
              {loading ? <Loader2 className="animate-spin" /> : null}
              {loading ? "Starting…" : "Start free"}
            </Button>
          </StateLabel>
        </div>
        <div className="rounded-(--radius-field) bg-day p-5">
          <StateLabel label="outline — on day" tone="day"><Button variant="outline">Add a property</Button></StateLabel>
        </div>
      </div>
    </ComponentSpecimen>
  )
}

function ChipSpecimen() {
  const tones = ["teal", "lime", "orange", "pink", "amber", "violet", "blue"] as const
  return (
    <ComponentSpecimen
      name="Chip"
      source="components/ui/chip.tsx"
      description="The app's small tinted label: a category in caps, or a change with its arrow. Colour is never the only signal — there is always a word or a sign."
      code={`<Chip tone="lime">Groceries</Chip>
<Chip tone="gain" caps={false}>↗ 2.29%</Chip>`}
    >
      <div className="flex flex-wrap gap-2">
        {tones.map((tone) => (
          <Chip key={tone} tone={tone}>{tone}</Chip>
        ))}
        <Chip tone="gain" caps={false}>↗ 2.29%</Chip>
        <Chip tone="loss" caps={false}>↘ 0.22%</Chip>
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
      description="Yearly or monthly. The thumb slides on the swap duration with the strong ease-out; the track turns blue when on."
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
    <DialogHeader><DialogTitle>Why isn’t Keel free?</DialogTitle></DialogHeader>
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
          <TooltipContent>Balances refresh every 4 hours</TooltipContent>
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
        name="KeelLogo and KeelMark"
        source="components/site/logo.tsx"
        description="The mark on its white tile, with or without the name."
        code={`<KeelLogo />\n<KeelMark className="size-11 rounded-[12px]" />`}
      >
        <div className="flex flex-wrap items-center gap-8">
          <KeelLogo />
          <KeelLogo showName={false} />
          <KeelMark className="size-11 rounded-[12px]" />
        </div>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="FeatureCard"
        source="components/sections/feature-card.tsx"
        description="A bento cell: title, one line of why, and a piece of the product. Night for spending, day for wealth; stacked or side by side."
        code={`<FeatureCard title="Cash flow" body="Money in, money out." tone="night">\n  <CashFlow />\n</FeatureCard>`}
      >
        <div className="grid gap-3 md:grid-cols-2">
          <FeatureCard title="Cash flow" body="Money in, money out, month by month — the trend drawn for you.">
            <div className="flex gap-2 px-6 pb-6"><Chip tone="blue">Car +123</Chip><Chip tone="amber">Rent +20</Chip></div>
          </FeatureCard>
          <div className="rounded-(--radius-card) bg-day p-3">
            <FeatureCard tone="day" title="Allocation" body="Too much in one place? See how spread out you really are.">
              <div className="px-6 pb-6"><span className="block h-1.5 w-2/3 rounded-full bg-blue" /></div>
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
          <ReviewCard review={{ kind: "post", name: "Theo Marsh", handle: "@theomarsh", avatar: 2, body: "Finally an app with a dashboard that shows every account in one place." }} />
          <ReviewCard review={{ kind: "rating", author: "Dana K.", title: "I’ve tried all of them", body: "Keel is the one I open daily. The interface is calm and the bank connections just work." }} />
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
        name="App mocks — DashboardMock, PhoneFrame, BudgetRing, Money"
        source="components/mock/"
        description="The product, drawn in HTML from the same tokens: never a screenshot, so it can never fall out of date with the palette."
        code={`<DashboardMock />\n<PhoneFrame><PhoneScreen /></PhoneFrame>\n<BudgetRing pct={0.7} colour="var(--color-warn)" />`}
      >
        <div className="grid items-start gap-6 lg:grid-cols-[1fr_200px]">
          <DashboardMock />
          <div className="flex flex-col items-center gap-6">
            <PhoneFrame className="w-[200px]"><PhoneScreen /></PhoneFrame>
            <div className="flex items-center gap-4">
              <BudgetRing pct={0.35} colour="var(--color-gain)" />
              <BudgetRing pct={0.7} colour="var(--color-warn)" />
              <BudgetRing pct={1} colour="var(--color-loss)" />
              <Money value="2,140" className="font-display text-[20px] font-semibold text-fg" />
            </div>
          </div>
        </div>
      </ComponentSpecimen>
    </div>
  )
}
