import { ArrowRight, Loader2 } from "lucide-react"

import { ComponentSpecimen, StateLabel } from "@/components/brand/specimen"
import { AvatarCloud, Duotone, LockCard, PayPattern, WordmarkCard } from "@/components/media/media"
import { CycleStack } from "@/components/motion/cycle-stack"
import { PhotoFan } from "@/components/motion/photo-fan"
import { QuoteCarousel } from "@/components/motion/quote-carousel"
import { RollingNumber } from "@/components/motion/rolling-number"
import { ClientFace } from "@/components/sections/home-hero"
import { ClientTile } from "@/components/sections/client-wall"
import { PressCard } from "@/components/sections/case-study"
import { EmailCopy } from "@/components/sections/email-copy"
import { PageIntro } from "@/components/sections/page-intro"
import { StatGrid } from "@/components/sections/stat-grid"
import { WorkCard } from "@/components/sections/work-grid"
import { Button, ButtonLink } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { ABOUT, PROJECTS, pexels } from "@/content"

const card = "aspect-[4/5] w-28 rounded-[var(--radius-media)] shadow-[var(--shadow-media)]"

/** Every component in the project, live, in its variants and states. */
export function ComponentLibrary() {
  return (
    <div className="space-y-8">
      <ComponentSpecimen
        name="Button"
        source="components/ui/button.tsx"
        description="shadcn’s button on the page’s tokens. Lime is the one primary action per screen; pink is for the second loud one."
        code={`<Button>View work</Button>\n<Button variant="pink">Start a conversation</Button>\n<Button variant="outline" size="sm">Filter</Button>`}
      >
        <div className="flex flex-wrap items-end gap-6">
          <StateLabel label="default">
            <Button>View work</Button>
          </StateLabel>
          <StateLabel label="pink">
            <Button variant="pink">Start a conversation</Button>
          </StateLabel>
          <StateLabel label="secondary">
            <Button variant="secondary">Secondary</Button>
          </StateLabel>
          <StateLabel label="outline">
            <Button variant="outline">Outline</Button>
          </StateLabel>
          <StateLabel label="ghost">
            <Button variant="ghost">Ghost</Button>
          </StateLabel>
          <StateLabel label="link">
            <Button variant="link">Link</Button>
          </StateLabel>
        </div>
        <div className="mt-8 flex flex-wrap items-end gap-6">
          <StateLabel label="hover">
            <Button className="bg-[color-mix(in_oklab,var(--color-lime),white_22%)]">Hover</Button>
          </StateLabel>
          <StateLabel label="focus">
            <Button className="ring-[3px] ring-ring/60">Focus</Button>
          </StateLabel>
          <StateLabel label="pressed">
            <Button className="scale-[0.97]">Pressed</Button>
          </StateLabel>
          <StateLabel label="loading">
            <Button disabled>
              <Loader2 className="animate-spin" />
              Sending
            </Button>
          </StateLabel>
          <StateLabel label="disabled">
            <Button disabled>Disabled</Button>
          </StateLabel>
          <StateLabel label="sm · default · lg · icon">
            <div className="flex items-center gap-2">
              <Button size="sm">Small</Button>
              <Button>Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon" aria-label="Next">
                <ArrowRight />
              </Button>
            </div>
          </StateLabel>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="ButtonLink"
        source="components/ui/button.tsx"
        description="The same button as a link that changes page without a reload — its own component so the layers panel names it."
        code={`<ButtonLink href="/work">View work <ArrowRight /></ButtonLink>`}
      >
        <ButtonLink href="/work" className="group">
          View work
          <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </ButtonLink>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="WorkCard"
        source="components/sections/work-grid.tsx"
        description="A project in a tile of its own tone. The picture lifts on hover. `fly` starts it in the hero and flies it in on scroll (home page only)."
        code={`<WorkCard project={PROJECTS[0]} />\n<WorkCard project={PROJECTS[0]} fly />`}
      >
        <ul className="grid grid-cols-2 gap-[var(--spacing-tile-gap)] sm:grid-cols-3 lg:grid-cols-6">
          {PROJECTS.map((p) => (
            <li key={p.slug}>
              <WorkCard project={p} />
            </li>
          ))}
        </ul>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Project media"
        source="components/media/media.tsx"
        description="What a project shows in its frame: a duotone photo, a crowd of faces, the product as a pattern, a lock, a wordmark."
        code={`<Duotone src={pexels(id)} alt="…" tone="mint" />\n<AvatarCloud tone="pink" />\n<PayPattern />\n<LockCard />\n<WordmarkCard word="Halden" sub="Homes" />`}
      >
        <div className="flex flex-wrap gap-4">
          <StateLabel label="Duotone">
            <Duotone src={pexels(29708270, 400)} alt="A speaker on stage" tone="orange" className={card} />
          </StateLabel>
          <StateLabel label="AvatarCloud">
            <AvatarCloud className={card} />
          </StateLabel>
          <StateLabel label="PayPattern">
            <PayPattern className={card} />
          </StateLabel>
          <StateLabel label="LockCard">
            <LockCard className={card} />
          </StateLabel>
          <StateLabel label="WordmarkCard">
            <WordmarkCard word="Halden" sub="Homes" className={card} />
          </StateLabel>
          <StateLabel label="CycleStack">
            <CycleStack interval={2}>
              <ClientFace index={0} className={card} />
              <ClientFace index={3} className={card} />
              <ClientFace index={5} className={card} />
            </CycleStack>
          </StateLabel>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="ClientTile"
        source="components/sections/client-wall.tsx"
        description="A client’s mark, set in type. Floods with a tone under the cursor — hover one."
        code={`<ul className="grid grid-cols-4 gap-2.5"><ClientTile index={0} /></ul>`}
      >
        <ul className="grid max-w-md grid-cols-4 gap-[var(--spacing-tile-gap)]">
          {[0, 2, 4, 5].map((i) => (
            <ClientTile key={i} index={i} />
          ))}
        </ul>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="RollingNumber · StatGrid"
        source="components/motion/rolling-number.tsx"
        description="Digits that roll into place like an odometer when they scroll into view. Props: value, prefix, suffix, duration, stagger, spins."
        code={`<RollingNumber value={120} suffix="+" />\n<StatGrid stats={ABOUT.stats} />`}
      >
        <StatGrid stats={ABOUT.stats} />
      </ComponentSpecimen>

      <ComponentSpecimen
        name="QuoteCarousel"
        source="components/motion/quote-carousel.tsx"
        description="One quote at a time, changing on a timer the active bar makes visible. Pauses on hover; the bars jump. Actions: Next testimonial, Pause testimonials."
        code={`<QuoteCarousel interval={7} autoplay startAt={0} />`}
      >
        <QuoteCarousel interval={5} className="max-w-2xl" />
      </ComponentSpecimen>

      <ComponentSpecimen
        name="PhotoFan"
        source="components/motion/photo-fan.tsx"
        description="Photographs dealt out from a stack when they come into view, one per tone. Props: spread, tilt, stagger."
        code={`<PhotoFan spread={1} tilt={5} />`}
      >
        <PhotoFan />
      </ComponentSpecimen>

      <ComponentSpecimen
        name="EmailCopy"
        source="components/sections/email-copy.tsx"
        description="The address to click, and a button that copies it and says so. Action: Email copied."
        code={`<EmailCopy email="hello@example.com" />`}
      >
        <EmailCopy />
      </ComponentSpecimen>

      <ComponentSpecimen
        name="PageIntro · PressCard"
        source="components/sections/page-intro.tsx · case-study.tsx"
        description="The opening of every inner page, and a headline about the work."
        code={`<PageIntro title="About" lede="…" />\n<PressCard headline="…" outlet="Tessera Tech" />`}
      >
        <div className="grid gap-8 lg:grid-cols-2">
          <PageIntro title="Contact" lede="The fastest way to reach me is email." />
          <ul>
            <PressCard headline="Four countries loosen rules on share options" outlet="The Signal" />
          </ul>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Input · Table · Tooltip"
        source="components/ui/"
        description="shadcn primitives on the page’s tokens, as the work archive uses them."
        code={`<Input placeholder="Filter…" />\n<Table>…</Table>\n<Tooltip><TooltipTrigger>…</TooltipTrigger><TooltipContent>Copied</TooltipContent></Tooltip>`}
      >
        <div className="space-y-6">
          <div className="flex flex-wrap items-end gap-6">
            <StateLabel label="default">
              <Input placeholder="Filter…" className="w-56 border-line-strong bg-ground-deep" />
            </StateLabel>
            <StateLabel label="focus">
              <Input placeholder="Filter…" className="w-56 border-ring bg-ground-deep ring-[3px] ring-ring/50" />
            </StateLabel>
            <StateLabel label="disabled">
              <Input placeholder="Filter…" disabled className="w-56 border-line-strong bg-ground-deep" />
            </StateLabel>
            <StateLabel label="tooltip">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Hover me</Button>
                </TooltipTrigger>
                <TooltipContent>Copied</TooltipContent>
              </Tooltip>
            </StateLabel>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="border-line hover:bg-transparent">
                <TableHead className="text-ink-faint">Year</TableHead>
                <TableHead className="text-ink-faint">Client</TableHead>
                <TableHead className="text-ink-faint">Sector</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {PROJECTS.slice(0, 3).map((p) => (
                <TableRow key={p.slug} className="border-line hover:bg-lime hover:text-night">
                  <TableCell>{p.year}</TableCell>
                  <TableCell>{p.title}</TableCell>
                  <TableCell>{p.sector}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Also on the site"
        source="motion/ · site-header.tsx"
        description="FloatingCard (the hero’s drifting cards), ScrollFlight + FlightSlot (the flight into the grid), PageTransition (the blur between pages), and the header’s mobile Sheet — reach it from the editor’s Actions row as “Mobile menu”."
        code={`<FloatingCard top="10%" left="-2%" rotate={-12} drift={10}>…</FloatingCard>\n<FlightSlot id="crowdline" top="7%" left="-1.5%" rotate={-14} />\n<ScrollFlight slot="crowdline">…</ScrollFlight>`}
      >
        <p className="text-sm text-ink-muted">
          Scroll the home page on a wide screen to see them together. Number on its own:{" "}
          <span className="text-2xl font-semibold text-lime">
            <RollingNumber value={900} suffix="+" />
          </span>
        </p>
      </ComponentSpecimen>
    </div>
  )
}
