import { ChevronDown, Loader2, Mail } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import { CountUp } from "@/components/motion/count-up"
import { IsoCube } from "@/components/motion/iso-cube"
import { Marquee } from "@/components/motion/marquee"
import { ScrambleText } from "@/components/motion/scramble-text"
import { TiltCard } from "@/components/motion/tilt-card"
import { PixelCode } from "@/components/pixel/pixel-code"
import { PixelSprite } from "@/components/pixel/pixel-sprite"
import { DashboardHero } from "@/components/sections/dashboard-stage"
import { AccessPass } from "@/components/sections/hero"
import { PlanCard } from "@/components/sections/pricing"
import { Hearts } from "@/components/sections/testimonials"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu"
import { Progress } from "@/components/ui/progress"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { PLANS } from "@/content"
import { CtaBand } from "@/components/cta-band"
import { Newsletter } from "@/components/newsletter"
import { SeatCalculator } from "@/components/seat-calculator"
import { CaseStrip } from "@/components/sections/case-strip"
import { ValueProposition } from "@/components/sections/value-proposition"
import { RequestSimulator } from "@/components/request-simulator"
import { Specimen, SubHeading } from "./specimen"

const VARIANTS = ["default", "primary", "accent", "outline", "ghost", "glass"] as const

/** Every component in the project, live, with its snippet. Add one to the
 *  project and it is added here in the same change. */
export function ComponentLibrary() {
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState([40])
  return (
    <>
      <SubHeading>primitives</SubHeading>
      <Specimen title="Button — variants" code={`<Button variant="primary">Start free</Button>\n// default · primary · accent · outline · ghost · glass`}>
        {VARIANTS.map((v) => <Button key={v} variant={v}>{v}</Button>)}
      </Specimen>
      <Specimen title="Button — sizes and states" note="Hover swaps colour on a 2-step; press drops 2px; focus draws a 4px ring." code={`<Button size="lg">Large</Button>\n<Button size="sm">Small</Button>\n<Button size="icon" aria-label="Mail"><Mail /></Button>\n<Button disabled>Disabled</Button>`}>
        <Button size="lg" variant="primary">Large</Button>
        <Button size="sm">Small</Button>
        <Button size="icon" variant="outline" aria-label="Mail"><Mail /></Button>
        <Button variant="accent" disabled>Disabled</Button>
        <Button
          variant="outline"
          onClick={() => {
            setLoading(true)
            setTimeout(() => setLoading(false), 1400)
          }}
        >
          {loading ? <Loader2 className="animate-spin" /> : null} {loading ? "Saving" : "Loading state"}
        </Button>
      </Specimen>
      <Specimen title="Badge" code={`<Badge tone="good">Online</Badge>\n// neutral · accent · good · warn · bad · outline`}>
        {(["neutral", "accent", "good", "warn", "bad", "outline"] as const).map((t) => <Badge key={t} tone={t}>{t}</Badge>)}
      </Specimen>
      <Specimen title="Accordion" code={`<Accordion type="single" collapsible>\n  <AccordionItem value="a">\n    <AccordionTrigger>Question</AccordionTrigger>\n    <AccordionContent>Answer</AccordionContent>\n  </AccordionItem>\n</Accordion>`} className="bg-surface p-phi-3 shadow-px [--px-edge:var(--color-line)]">
        <Accordion type="single" collapsible className="grid w-full gap-phi-2">
          <AccordionItem value="a"><AccordionTrigger>Does it slow browsing down?</AccordionTrigger><AccordionContent>No — about three milliseconds.</AccordionContent></AccordionItem>
          <AccordionItem value="b"><AccordionTrigger>Do I still need a VPN?</AccordionTrigger><AccordionContent>Most teams switch theirs off.</AccordionContent></AccordionItem>
        </Accordion>
      </Specimen>
      <Specimen title="Tabs" code={`<Tabs defaultValue="a">\n  <TabsList><TabsTrigger value="a">Monthly</TabsTrigger>…</TabsList>\n  <TabsContent value="a">…</TabsContent>\n</Tabs>`}>
        <Tabs defaultValue="a" className="w-full">
          <TabsList className="h-auto gap-1 bg-surface-2 p-1">
            <TabsTrigger value="a" className="min-h-11 px-phi-3 font-display text-label-sm uppercase data-[state=active]:bg-fg data-[state=active]:text-bg">Monthly</TabsTrigger>
            <TabsTrigger value="b" className="min-h-11 px-phi-3 font-display text-label-sm uppercase data-[state=active]:bg-fg data-[state=active]:text-bg">Yearly</TabsTrigger>
          </TabsList>
          <TabsContent value="a" className="mt-phi-2 text-base text-fg-muted">Billed every month.</TabsContent>
          <TabsContent value="b" className="mt-phi-2 text-base text-fg-muted">Billed once a year, 20% off.</TabsContent>
        </Tabs>
      </Specimen>
      <Specimen title="Switch, Slider, Progress" code={`<Switch />\n<Slider value={[40]} max={100} />\n<Progress value={60} />`}>
        <div className="grid w-full gap-phi-3 sm:grid-cols-3">
          <label className="flex items-center gap-phi-2 text-base"><Switch /> Auto-roll</label>
          <Slider value={value} onValueChange={setValue} max={100} aria-label="Level" />
          <Progress value={value[0]} aria-label="Level progress" />
        </div>
      </Specimen>
      <Specimen title="Tooltip" code={`<Tooltip>\n  <TooltipTrigger asChild><Button>Hover me</Button></TooltipTrigger>\n  <TooltipContent>Hint</TooltipContent>\n</Tooltip>`}>
        <Tooltip><TooltipTrigger asChild><Button variant="outline">Hover or focus me</Button></TooltipTrigger><TooltipContent>Press Start to continue</TooltipContent></Tooltip>
      </Specimen>
      <Specimen title="Dialog, Sheet, Dropdown" code={`<Dialog><DialogTrigger asChild>…</DialogTrigger><DialogContent>…</DialogContent></Dialog>\n<Sheet side="right">…</Sheet>\n<DropdownMenu>…</DropdownMenu>`}>
        <Dialog>
          <DialogTrigger asChild><Button variant="outline">Open dialog</Button></DialogTrigger>
          <DialogContent><DialogHeader><DialogTitle className="font-display text-sm uppercase">Dialog</DialogTitle><DialogDescription className="text-base">A notched panel over a dimmed screen.</DialogDescription></DialogHeader></DialogContent>
        </Dialog>
        <Sheet>
          <SheetTrigger asChild><Button variant="outline">Open sheet</Button></SheetTrigger>
          <SheetContent><SheetHeader><SheetTitle className="font-display text-xs uppercase">Sheet</SheetTitle><SheetDescription className="text-base">Slides in from the edge.</SheetDescription></SheetHeader></SheetContent>
        </Sheet>
        <DropdownMenu>
          <DropdownMenuTrigger asChild><Button variant="outline">Menu <ChevronDown /></Button></DropdownMenuTrigger>
          <DropdownMenuContent><DropdownMenuItem>Profile</DropdownMenuItem><DropdownMenuItem>Billing</DropdownMenuItem><DropdownMenuItem>Sign out</DropdownMenuItem></DropdownMenuContent>
        </DropdownMenu>
        <Button variant="outline" onClick={() => toast.success("Toast, on a two-step")}>Toast</Button>
      </Specimen>
      <Specimen title="Navigation menu" code={`<NavigationMenu><NavigationMenuList>\n  <NavigationMenuItem><NavigationMenuLink href="/products">Products</NavigationMenuLink></NavigationMenuItem>\n</NavigationMenuList></NavigationMenu>`}>
        <NavigationMenu><NavigationMenuList>{["Products", "Pricing", "Customers"].map((n) => <NavigationMenuItem key={n}><NavigationMenuLink href={`/${n.toLowerCase()}`} className="font-display text-label-sm uppercase">{n}</NavigationMenuLink></NavigationMenuItem>)}</NavigationMenuList></NavigationMenu>
      </Specimen>
      <Specimen title="Command palette" note="Opens anywhere with ⌘K / Ctrl+K." code={`<Command><CommandInput placeholder="Type a command…" /><CommandList>…</CommandList></Command>`}>
        <Command className="w-full max-w-md shadow-px-sm [--px-edge:var(--color-line)]">
          <CommandInput placeholder="Type a command…" />
          <CommandList><CommandEmpty>No results.</CommandEmpty><CommandGroup heading="Go to"><CommandItem>Products</CommandItem><CommandItem>Pricing</CommandItem><CommandItem>Generator</CommandItem></CommandGroup></CommandList>
        </Command>
      </Specimen>

      <SubHeading>composed</SubHeading>
      <Specimen title="TiltCard" code={`<TiltCard maxTilt={10} lift={12} perspective={900}>…</TiltCard>`}>
        <TiltCard maxTilt={12} lift={12} className="bg-surface-2 p-phi-4 shadow-px-drop [--px-drop:rgba(0,0,0,0.5)] [--px-edge:var(--color-line-strong)]"><span className="font-display text-xs uppercase [transform:translateZ(30px)]">Lean on me</span></TiltCard>
      </Specimen>
      <Specimen title="ScrambleText, CountUp, Hearts" code={`<ScrambleText text="SHADOW AI RADAR" trigger="hover" />\n<CountUp value={14200} />\n<Hearts count={4} />`}>
        <ScrambleText text="HOVER TO DECRYPT" trigger="hover" className="font-display text-sm" />
        <CountUp value={14200} className="font-display text-lg" />
        <Hearts count={4} />
      </Specimen>
      <Specimen title="IsoCube" code={`<IsoCube size={96} speed={14} tone="accent" />`}>
        <IsoCube tone="accent" size={72} /><IsoCube tone="warn" size={72} speed={9} /><IsoCube tone="good" size={72} spin={false} />
      </Specimen>
      <Specimen title="Marquee, PixelSprite, PixelCode" code={`<Marquee speed={30}>…</Marquee>\n<PixelSprite name="shield" scale={4} />\n<PixelCode seed="pass" />`}>
        <Marquee speed={18} className="w-full"><span className="font-display text-xs uppercase">Block · Detect · Control ·</span></Marquee>
        <PixelSprite name="shield" scale={5} /><PixelSprite name="plane" scale={5} /><PixelCode seed="brand" cols={8} rows={10} className="size-16" />
      </Specimen>
      <Specimen title="AccessPass" code={`<AccessPass title="Start your free run" from="Legacy" to="Keep" />`} className="grid place-items-center overflow-x-auto bg-[linear-gradient(to_bottom,var(--color-sky-2),var(--color-sky-4))] p-phi-2 sm:p-phi-4">
        <div className="w-full max-w-lg"><AccessPass /></div>
      </Specimen>
      <Specimen title="PlanCard" code={`<PlanCard plan={PLANS[1]} annual={false} />`} className="grid gap-phi-4 bg-surface p-phi-3 shadow-px md:grid-cols-2 [--px-edge:var(--color-line)]">
        <PlanCard plan={PLANS[0]} annual={false} /><PlanCard plan={PLANS[1]} annual />
      </Specimen>
      <Specimen title="CtaBand" note="Between sections: one line, a primary link and a softer button." code={`<CtaBand title="Ready to try it?" primary="Get started" to="/get-started" />`} className="bg-bg shadow-px [--px-edge:var(--color-line)]">
        <div className="w-full"><CtaBand title="Ready to try it?" body="No card, no call." className="py-phi-2" /></div>
      </Specimen>
      <Specimen title="Newsletter" code={`<Newsletter />`}>
        <Newsletter />
      </Specimen>
      <Specimen title="RequestSimulator" note="Four stops; each scenario stops or passes at its own." code={`<RequestSimulator stepMs={650} />`} className="bg-bg shadow-px [--px-edge:var(--color-line)]">
        <div className="w-full"><RequestSimulator /></div>
      </Specimen>
      <Specimen title="SeatCalculator" note="Seats in, a monthly bill out, assumptions printed beneath." code={`<SeatCalculator initialSeats={120} />`} className="bg-bg shadow-px [--px-edge:var(--color-line)]">
        <div className="w-full"><SeatCalculator /></div>
      </Specimen>
      <Specimen title="ValueProposition" code={`<ValueProposition />`} className="bg-bg shadow-px [--px-edge:var(--color-line)]">
        <div className="w-full"><ValueProposition /></div>
      </Specimen>
      <Specimen title="CaseStrip" code={`<CaseStrip />`} className="bg-bg shadow-px [--px-edge:var(--color-line)]">
        <div className="w-full"><CaseStrip /></div>
      </Specimen>
      <Specimen title="DashboardHero" note="The sticky panel. In the page it follows the scroll; here it is driven by hand." code={`<DashboardHero active={0} progress={0.33} onSelect={go} />`} className="bg-surface p-phi-2 shadow-px [--px-edge:var(--color-line)]">
        <DashboardDemo />
      </Specimen>
    </>
  )
}

function DashboardDemo() {
  const [active, setActive] = useState(0)
  return <div className="w-full"><DashboardHero active={active} progress={(active + 1) / 3} onSelect={setActive} /></div>
}
