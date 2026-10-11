import { useState } from "react"
import { ArrowRight, Loader2 } from "lucide-react"

import { ComponentSpecimen, StateLabel } from "@/components/brand/specimen"
import { FieldApp } from "@/components/mock/field-app"
import { BrowserFrame, FitScreen, PhoneFrame } from "@/components/mock/frames"
import { GlazeLab } from "@/components/mock/glaze-lab"
import { PosterMaker } from "@/components/mock/poster-maker"
import { CountUp } from "@/components/motion/count-up"
import { DragStrip } from "@/components/motion/drag-strip"
import { Marquee } from "@/components/motion/marquee"
import { ProjectWall } from "@/components/motion/project-wall"
import { PillNav } from "@/components/site/bottom-bar"
import { useContact } from "@/components/site/contact-sheet"
import { KilnMark } from "@/components/site/logo"
import { SoundToggle, StudioClock } from "@/components/site/site-header"
import { ProcessCard } from "@/components/sections/studio/process"
import { TeamCard } from "@/components/sections/studio/team"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { ClientMark } from "@/components/work/client-mark"
import { ProjectCell } from "@/components/work/project-cell"
import { useWork } from "@/components/work/work-state"
import { PROJECTS, projectBySlug } from "@/data/projects"
import { PROCESS, STUDIOS, TEAM } from "@/data/studio"

export function ComponentLibrary() {
  const { setOpen } = useContact()
  const { setFilterOpen } = useWork()
  const [view, setView] = useState("grid")
  const [on, setOn] = useState(true)
  const [heat, setHeat] = useState([1180])
  return (
    <div className="flex flex-col gap-8">
      <ComponentSpecimen
        name="Button"
        source="components/ui/button.tsx"
        description="Pills. Bone is the primary (Let's Talk, Close); ember is reserved for the one action that sends something; glass sits over imagery (Filter)."
        code={`<Button>Let's Talk</Button>\n<Button variant="ember">Send the brief <ArrowRight /></Button>\n<Button variant="glass">Filter</Button>\n<ButtonLink href="/studio" variant="outline">How we work</ButtonLink>`}
      >
        <div className="flex flex-col gap-8">
          <div className="flex flex-wrap items-end gap-4">
            {(["bone", "ember", "soft", "glass", "outline", "ghost", "link"] as const).map((v) => (
              <StateLabel key={v} label={v}>
                <Button variant={v}>{v === "link" ? "Read more" : "Let's Talk"}</Button>
              </StateLabel>
            ))}
          </div>
          <div className="flex flex-wrap items-end gap-4">
            {(["sm", "default", "lg", "xl"] as const).map((s) => (
              <StateLabel key={s} label={s}>
                <Button size={s}>
                  Let's Talk <ArrowRight />
                </Button>
              </StateLabel>
            ))}
          </div>
          <div className="flex flex-wrap items-end gap-4">
            <StateLabel label="hover">
              <Button className="bg-bone-2">Hover</Button>
            </StateLabel>
            <StateLabel label="focus">
              <Button className="ring-[3px] ring-ember/40">Focus</Button>
            </StateLabel>
            <StateLabel label="pressed">
              <Button className="scale-[0.97]">Pressed</Button>
            </StateLabel>
            <StateLabel label="loading">
              <Button variant="ember" disabled>
                <Loader2 className="animate-spin" /> Sending
              </Button>
            </StateLabel>
            <StateLabel label="disabled">
              <Button disabled>Next</Button>
            </StateLabel>
          </div>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Badge"
        source="components/ui/badge.tsx"
        description="Mono uppercase pills for tags, cities and contract types."
        code={`<Badge>Website</Badge>\n<Badge variant="outline">Lisbon</Badge>\n<Badge variant="ember">Freelance</Badge>`}
      >
        <div className="flex flex-wrap gap-2">
          {(["default", "outline", "ember", "ok", "warn", "error"] as const).map((v) => (
            <Badge key={v} variant={v}>
              {v}
            </Badge>
          ))}
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Input, Textarea"
        source="components/ui/input.tsx · textarea.tsx"
        description="Soot fields with an inset hairline; an ember ring on focus, a coral one when invalid, with the fix written underneath."
        code={`<Input type="email" placeholder="you@studio.com" aria-invalid={!!error} />\n<Textarea placeholder="What is it?" />`}
      >
        <div className="grid gap-6 md:grid-cols-2">
          <StateLabel label="default" className="w-full">
            <Input placeholder="you@studio.com" />
          </StateLabel>
          <StateLabel label="focus" className="w-full">
            <Input defaultValue="ines@kiln.studio" className="shadow-[inset_0_0_0_1.5px_var(--color-ember)]" />
          </StateLabel>
          <StateLabel label="error" className="w-full">
            <Input defaultValue="ines@" aria-invalid />
            <span className="text-[13px] text-error">An email we can write back to — like name@company.com.</span>
          </StateLabel>
          <StateLabel label="disabled" className="w-full">
            <Input disabled placeholder="Disabled" />
          </StateLabel>
          <StateLabel label="textarea" className="w-full md:col-span-2">
            <Textarea placeholder="We're launching… and we want people to…" />
          </StateLabel>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Switch, Checkbox, Slider, Toggle group, Tooltip"
        source="components/ui/*.tsx"
        description="The small controls, all shadcn: ember means on."
        code={`<Switch checked={on} onCheckedChange={setOn} />\n<Slider min={900} max={1300} step={10} value={heat} onValueChange={setHeat} />\n<ToggleGroup type="single" value={view} onValueChange={setView}>…</ToggleGroup>`}
      >
        <div className="flex flex-wrap items-center gap-10">
          <StateLabel label={on ? "on" : "off"}>
            <Switch checked={on} onCheckedChange={setOn} aria-label="Example switch" />
          </StateLabel>
          <StateLabel label="checkbox">
            <Checkbox defaultChecked aria-label="Example checkbox" />
          </StateLabel>
          <StateLabel label={`${heat[0]}°C`} className="w-56">
            <Slider min={900} max={1300} step={10} value={heat} onValueChange={setHeat} aria-label="Example slider" />
          </StateLabel>
          <StateLabel label={view}>
            <ToggleGroup type="single" value={view} onValueChange={(v) => v && setView(v)} className="rounded-full bg-raised p-1">
              {["grid", "list"].map((v) => (
                <ToggleGroupItem key={v} value={v} className="rounded-full! px-4 text-ink-3 data-[state=on]:bg-bone data-[state=on]:text-bone-ink">
                  {v}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </StateLabel>
          <StateLabel label="tooltip">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="soft" size="sm">
                  Hover me
                </Button>
              </TooltipTrigger>
              <TooltipContent>Opens the brief</TooltipContent>
            </Tooltip>
          </StateLabel>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Accordion"
        source="components/ui/accordion.tsx"
        description="Open roles on Careers. One open at a time; the content eases down in 260ms."
        code={`<Accordion type="single" collapsible>\n  <AccordionItem value="role">\n    <AccordionTrigger>Senior Creative Technologist</AccordionTrigger>\n    <AccordionContent>…</AccordionContent>\n  </AccordionItem>\n</Accordion>`}
      >
        <Accordion type="single" collapsible defaultValue="a" className="border-t border-line-2">
          {[
            ["a", "Senior Creative Technologist", "Prototype the impossible in a week, then make it run at 60fps on a phone."],
            ["b", "Design Director", "Set the bar for type, motion and craft across the studio."],
          ].map(([v, t, d]) => (
            <AccordionItem key={v} value={v} className="border-line-2">
              <AccordionTrigger className="text-[17px] text-ink hover:no-underline">{t}</AccordionTrigger>
              <AccordionContent className="text-[15px] text-ink-3">{d}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Sheets — Let's Talk, Filter"
        source="site/contact-sheet.tsx · work/filter-panel.tsx · sections/careers/apply-sheet.tsx"
        description="Side sheets on the drawer curve (520ms). Let's Talk is a three-step brief; Filter sets the disciplines as one loud sentence; Apply takes a CV by drag and drop."
        code={`const { setOpen } = useContact()\n<Button onClick={() => setOpen(true)}>Let's Talk</Button>`}
      >
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => setOpen(true)}>Open Let's Talk</Button>
          <Button variant="glass" onClick={() => setFilterOpen(true)}>
            Open Filter
          </Button>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Pill nav, Sound toggle, Studio clock"
        source="site/bottom-bar.tsx · site/site-header.tsx"
        description="The site's chrome: the nav pill with a white pill that springs to the current page, a sound switch that really plays, and live clocks."
        code={`<PillNav />\n<SoundToggle />\n<StudioClock city="Lisbon" country="PT" timeZone="Europe/Lisbon" live />`}
      >
        <div className="flex flex-wrap items-center gap-10">
          <PillNav />
          <SoundToggle />
          <div className="flex flex-col gap-1">
            {STUDIOS.map((s, i) => (
              <StudioClock key={s.city} {...s} live={i === 0} />
            ))}
          </div>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Project cell, Client mark"
        source="work/project-cell.tsx · work/client-mark.tsx"
        description="One cell of the wall: lightens in 240ms on hover, the work lifts 3.5%. Client names are set as type wordmarks in four styles."
        code={`<ProjectCell project={projectBySlug("flock")!} />\n<ClientMark client="Sable & Co" mark="serif" />`}
        tone="dots"
      >
        <div className="flex flex-wrap items-center gap-10">
          <ProjectCell project={projectBySlug("flock")!} className="w-[280px] border-l border-t" style={{ height: 290 }} />
          <div className="flex flex-col gap-4">
            {(["sans", "serif", "mono", "heavy"] as const).map((m) => (
              <ClientMark key={m} client={PROJECTS.find((p) => p.mark === m)!.client} mark={m} className="text-[28px] text-ink-2" />
            ))}
          </div>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Project wall"
        source="motion/project-wall.tsx"
        description="The curved, draggable, endless wall. Props: speed, curvature (0 is flat), direction, paused, momentum. Drift stops with the editor's Motion switch."
        code={`<ProjectWall projects={PROJECTS} speed={16} curvature={1.15} direction="diagonal" />`}
        previewClassName="p-0 sm:p-0"
      >
        <div className="relative h-[460px] overflow-hidden [&>div]:h-full">
          <ProjectWall projects={PROJECTS} curvature={1.15} speed={10} />
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Devices — browser, phone, billboard"
        source="mock/frames.tsx · glaze-lab.tsx · field-app.tsx · poster-maker.tsx"
        description="SVG frames with real, working interfaces inside: fire a glaze, record a field note, write a billboard."
        code={`<BrowserFrame url="glazelab.kiln.studio"><GlazeLab /></BrowserFrame>\n<PhoneFrame><FitScreen width={390} height={844}><FieldApp /></FitScreen></PhoneFrame>\n<PosterMaker />`}
      >
        <div className="grid items-center gap-10 lg:grid-cols-[1.4fr_0.8fr]">
          <BrowserFrame url="glazelab.kiln.studio">
            <div className="h-[380px]">
              <GlazeLab />
            </div>
          </BrowserFrame>
          <PhoneFrame className="mx-auto h-[540px]">
            <FitScreen width={390} height={844}>
              <FieldApp />
            </FitScreen>
          </PhoneFrame>
          <div className="lg:col-span-2">
            <PosterMaker />
          </div>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Process card, Team card"
        source="sections/studio/process.tsx · team.tsx"
        description="The stacking process card, and a person — portrait in black and white, one true thing on hover or focus."
        code={`<StackCards>{PROCESS.map((p, i) => <ProcessCard key={p.step} index={i} {...p} />)}</StackCards>\n<TeamCard {...TEAM[0]} />`}
      >
        <div className="grid items-start gap-6 lg:grid-cols-[2fr_1fr]">
          <ProcessCard index={0} {...PROCESS[0]} />
          <TeamCard {...TEAM[0]} />
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Count up, Marquee, Drag strip"
        source="motion/count-up.tsx · marquee.tsx · drag-strip.tsx"
        description="Numbers that land once; marks that drift (CSS, so the editor stops them); a row you throw sideways."
        code={`<CountUp value={186} />\n<Marquee speed={50} direction="left">…</Marquee>\n<DragStrip>…</DragStrip>`}
      >
        <div className="flex flex-col gap-8">
          <CountUp value={186} className="type-head text-mega text-ink tabular-nums" />
          <Marquee speed={30}>
            {["Halden", "Tessel", "Moraine", "Orla", "Pomelo", "Verdant"].map((c) => (
              <span key={c} className="px-8 text-[32px] font-semibold tracking-[-0.04em] text-ink-4">
                {c}
              </span>
            ))}
          </Marquee>
          <DragStrip>
            {PROJECTS.slice(0, 8).map((p) => (
              <ProjectCell key={p.slug} project={p} className="w-[200px] shrink-0 border-t border-l" style={{ height: 210 }} />
            ))}
          </DragStrip>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Empty states"
        source="work/project-list.tsx · sections/careers/roles.tsx"
        description="Every filter has a way back: say what happened, offer the reset."
        code={`<p>Nothing we've made matches all of those at once.</p>\n<Button variant="soft" onClick={reset}>Clear 3 filters</Button>`}
      >
        <div className="flex flex-col items-start gap-4">
          <KilnMark className="w-8 text-ink-5" />
          <p className="text-lead text-ink-2">Nothing we've made matches all of those at once.</p>
          <Button variant="soft">Clear 3 filters</Button>
        </div>
      </ComponentSpecimen>
    </div>
  )
}
