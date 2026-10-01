import { ArrowRight, Loader2, Plus } from "lucide-react"
import { useState } from "react"

import { ComponentSpecimen, StateLabel } from "@/components/brand/specimen"
import { CountUp } from "@/components/motion/count-up"
import { LineChart } from "@/components/motion/line-chart"
import { LogoMarquee } from "@/components/motion/logo-marquee"
import { Rotator } from "@/components/motion/rotator"
import { ScrambleText } from "@/components/motion/scramble-text"
import { CliCard } from "@/components/sections/cli-card"
import { ConsoleMock } from "@/components/sections/console-showcase"
import { IndustryCard } from "@/components/sections/industries"
import { Badge } from "@/components/ui/badge"
import { Button, ButtonLink } from "@/components/ui/button"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Glow } from "@/components/ui/glow"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Wordmark } from "@/components/ui/wordmark"
import { AgentChatVisual, ObjectiveVisual } from "@/components/visuals/visuals"
import { LOGOS } from "@/content"

export function ComponentLibrary() {
  const [words, setWords] = useState(0)
  return (
    <div className="space-y-6">
      <ComponentSpecimen name="Button" source="components/ui/button.tsx" description="A pill. White is the one primary action on a screen; outline-ember is the quiet secondary." code={`<Button variant="pill" size="lg">See a demo</Button>\n<ButtonLink variant="accent" href="#cta">Read the story</ButtonLink>`}>
        <div className="flex flex-wrap gap-6">
          {(["pill", "ghost", "outline", "accent"] as const).map((v) => <StateLabel key={v} label={v}><Button variant={v}>See a demo</Button></StateLabel>)}
          <StateLabel label="sizes"><div className="flex items-center gap-2"><Button size="sm">sm</Button><Button>default</Button><Button size="lg">lg</Button><Button size="icon" aria-label="Add"><Plus /></Button></div></StateLabel>
          <StateLabel label="disabled"><Button disabled>Unavailable</Button></StateLabel>
          <StateLabel label="loading"><Button><Loader2 className="animate-spin" />Sending</Button></StateLabel>
          <StateLabel label="as link"><ButtonLink href="#brand" variant="accent">Read the story <ArrowRight /></ButtonLink></StateLabel>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen name="Input" source="components/ui/input.tsx" description="The email field: focus lifts the border; an error turns it accent and says how to fix it." code={`<Input type="email" aria-invalid placeholder="Work email" />`}>
        <div className="grid max-w-md gap-4">
          <StateLabel label="default"><Input placeholder="Work email" className="h-11 border-line bg-white/5" /></StateLabel>
          <StateLabel label="filled"><Input defaultValue="maren@parcelo.example" className="h-11 border-line bg-white/5" /></StateLabel>
          <StateLabel label="error"><Input aria-invalid defaultValue="maren@" className="h-11 border-ember bg-white/5" /></StateLabel>
          <StateLabel label="disabled"><Input disabled placeholder="Work email" className="h-11 bg-white/5" /></StateLabel>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen name="Badge + Eyebrow" source="components/ui/badge.tsx, eyebrow.tsx" description="Status chips and the orange-dot label over a section title." code={`<Eyebrow>Observe</Eyebrow>\n<Badge variant="outline">Prod</Badge>`}>
        <div className="flex flex-wrap items-center gap-6"><Eyebrow>Observe</Eyebrow><Badge variant="outline">Prod</Badge><Badge>Trending to goal</Badge><Badge variant="secondary">Collecting data</Badge></div>
      </ComponentSpecimen>

      <ComponentSpecimen name="Wordmark" source="components/ui/wordmark.tsx" description="Mark and word, in the text colour." code={`<Wordmark />`}><Wordmark className="text-[28px]" /></ComponentSpecimen>

      <ComponentSpecimen name="Sheet (mobile menu)" source="components/ui/sheet.tsx" description="The navigation on small screens, opened from the header." code={`<Sheet><SheetTrigger asChild><Button/></SheetTrigger><SheetContent/></Sheet>`}>
        <Sheet>
          <SheetTrigger asChild><Button variant="outline">Open the sheet</Button></SheetTrigger>
          <SheetContent className="border-line bg-bg text-text"><SheetHeader><SheetTitle className="text-text"><Wordmark /></SheetTitle></SheetHeader></SheetContent>
        </Sheet>
      </ComponentSpecimen>

      <ComponentSpecimen name="ScrambleText" source="components/motion/scramble-text.tsx" description="Display type that resolves out of noise. Props: text, duration, delay, scanlines." code={`<ScrambleText text="Speaks natively" duration={0.9} />`}>
        <div className="scanline text-[clamp(24px,3vw,40px)]"><ScrambleText key={words} text={["Speaks natively", "Resolves first time", "Learns overnight"][words % 3]} scanlines={false} /></div>
        <Button variant="outline" size="sm" className="mt-4" onClick={() => setWords((w) => w + 1)}>Replay</Button>
      </ComponentSpecimen>

      <ComponentSpecimen name="Rotator + CountUp" source="components/motion/" description="A word that swaps in place, and a number that counts when it scrolls into view." code={`<Rotator words={["CSAT","Resolution Rate"]} index={i} />\n<CountUp to={99} duration={1.6} />`}>
        <div className="flex flex-wrap items-center gap-10"><p className="text-[28px] font-medium tracking-tight">Improve <Rotator words={["Resolution Rate", "CSAT", "Revenue Recovery"]} index={words} /></p><CountUp to={99} className="scanline text-[72px] leading-none" /></div>
      </ComponentSpecimen>

      <ComponentSpecimen name="LineChart" source="components/motion/line-chart.tsx" description="A self-drawing line. Props: trend, seed, color, area, draw, duration." code={`<LineChart trend="up" seed={5} area />`} previewClassName="h-64">
        <div className="h-full"><LineChart trend="dip-rise" seed={4} area key={words} /></div>
      </ComponentSpecimen>

      <ComponentSpecimen name="LogoMarquee" source="components/motion/logo-marquee.tsx" description="Customer wordmarks drifting left. Props: seconds, paused." code={`<LogoMarquee names={LOGOS} seconds={40} />`}><LogoMarquee names={LOGOS} seconds={30} /></ComponentSpecimen>

      <ComponentSpecimen name="IndustryCard" source="components/sections/industries.tsx" description="One card in the industries carousel." code={`<IndustryCard title="Retail" body="…" />`}><div className="max-w-[267px]"><IndustryCard title="Retail" body="Returns season, handled. Peak traffic without the temp roster." /></div></ComponentSpecimen>

      <ComponentSpecimen name="CliCard" source="components/sections/cli-card.tsx" description="The hero's terminal card: types a command, holds, clears." code={`<CliCard title="Introducing Halo CLI" length="1:08" />`}><CliCard /></ComponentSpecimen>

      <ComponentSpecimen name="Glow" source="components/ui/glow.tsx" description="The light behind a block. Props: tone, intensity, wide." code={`<Glow tone="amber" intensity={0.7} wide />`}><div className="relative h-48 overflow-hidden rounded-card border border-line"><Glow tone="amber" intensity={0.8} wide /></div></ComponentSpecimen>

      <ComponentSpecimen name="Walkthrough screens" source="components/visuals/visuals.tsx" description="The screens inside the three walkthroughs: agent chat, objective picker, opportunities, experiment, trend, threads." code={`<AgentChatVisual step={1} />\n<ObjectiveVisual />`} previewClassName="grid gap-8 lg:grid-cols-2"><AgentChatVisual step={1} /><ObjectiveVisual /></ComponentSpecimen>

      <ComponentSpecimen name="Console window" source="components/sections/console-showcase.tsx" description="The product window: range tabs retarget the chart; the auto-improve switch switches." code={`<ConsoleMock />`}><ConsoleMock /></ComponentSpecimen>
    </div>
  )
}
