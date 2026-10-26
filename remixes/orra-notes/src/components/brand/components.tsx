import { useState } from "react"
import { toast } from "sonner"

import { CodeSnippet, ComponentSpecimen, StateLabel } from "@/components/brand/specimen"
import { APP_MARKS } from "@/components/brand-marks"
import { useContactSales } from "@/components/contact-sales"
import { AppTile, OrraTile } from "@/components/mockups/app-tile"
import { NoteCard } from "@/components/mockups/note-card"
import { LibraryPhone, RecapDoc, ShareCard } from "@/components/mockups/rail-mockups"
import { Recorder } from "@/components/mockups/recorder"
import { ActionsPanel, AssistantPanel, SummaryPanel } from "@/components/mockups/workspace-panels"
import { BinaryOrb, OrbitMark } from "@/components/motion/binary-orb"
import { Marquee } from "@/components/motion/marquee"
import { Reveal } from "@/components/motion/reveal"
import { RotatingLine } from "@/components/motion/rotating-line"
import { AppWall, ProductCard } from "@/components/sections/capture"
import { StoryCarousel } from "@/components/sections/customers"
import { FeatureBullet, HeroShowcase, StatusBanner } from "@/components/sections/hero"
import { NoteFan } from "@/components/sections/memory"
import { McpCard } from "@/components/sections/security"
import { AvatarStack, Rating } from "@/components/sections/support"
import { FeatureLink, TeamMark } from "@/components/sections/teams"
import { ArrowLink } from "@/components/ui/arrow-link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SectionHeading } from "@/components/ui/section-heading"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SurfaceCard } from "@/components/ui/surface-card"
import { Textarea } from "@/components/ui/textarea"
import { Wordmark } from "@/components/ui/wordmark"
import { CAPTURE, CUSTOMERS, FEATURES, HERO, TEAMS } from "@/content"

const LINES = HERO.scenes.map((scene) => scene.line)

/** Every component in the project, live, in its variants and states. */
export function ComponentLibrary() {
  const contact = useContactSales()
  const [line, setLine] = useState(0)
  const [scene, setScene] = useState(0)

  return (
    <div className="space-y-8">
      <ComponentSpecimen
        name="Button"
        source="components/ui/button.tsx"
        description="shadcn's button as pills. White is the one filled action; everything else is a hairline ghost. Presses scale to 0.97."
        code={`<Button size="lg">Try it free</Button>\n<Button variant="secondary" size="lg">Book a demo</Button>\n<ButtonLink href="#signup" size="sm">Try it free</ButtonLink>`}
      >
        <div className="flex flex-wrap items-end gap-6">
          <StateLabel label="default · lg">
            <Button size="lg">Try it free</Button>
          </StateLabel>
          <StateLabel label="secondary · lg">
            <Button size="lg" variant="secondary">Book a demo</Button>
          </StateLabel>
          <StateLabel label="sm">
            <Button size="sm">Try it free</Button>
          </StateLabel>
          <StateLabel label="ghost">
            <Button variant="ghost">Ghost</Button>
          </StateLabel>
          <StateLabel label="focus">
            <Button className="ring-2 ring-snow/40">Focused</Button>
          </StateLabel>
          <StateLabel label="disabled">
            <Button disabled>Disabled</Button>
          </StateLabel>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="StatusBanner, FeatureBullet, ArrowLink"
        source="sections/hero.tsx · ui/arrow-link.tsx"
        description="The announcement pill, the hero's bullet rows (a 4px-radius white glyph and a line), and the quiet underlined link."
        code={`<StatusBanner text="New: ask questions across every meeting" />\n<FeatureBullet>Summaries the moment it ends</FeatureBullet>\n<ArrowLink href="/integrations">See integrations</ArrowLink>`}
        previewClassName="text-snow"
      >
        <div className="flex flex-col items-start gap-6 rounded-card p-6" style={{ background: "var(--gradient-horizon)" }}>
          <StatusBanner text={HERO.banner} />
          <ul className="flex flex-col gap-4">
            <FeatureBullet>{HERO.bullets[0]}</FeatureBullet>
            <FeatureBullet>{HERO.bullets[1]}</FeatureBullet>
          </ul>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-8">
          <ArrowLink href="#">See integrations</ArrowLink>
          <ArrowLink href="#" tone="muted">See pricing</ArrowLink>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Eyebrow, SectionHeading, Badge"
        source="ui/eyebrow.tsx · ui/section-heading.tsx · ui/badge.tsx"
        description="A spaced caption over a Geist heading at weight 500. Badges are hairline pills."
        code={`<SectionHeading eyebrow="Customers" title="Made for teams that talk all day." />\n<Badge variant="outline">Beta</Badge>`}
      >
        <div className="space-y-8">
          <SectionHeading eyebrow="Shared memory" title="One searchable memory" size="heading" />
          <div className="flex flex-wrap items-center gap-3">
            <Eyebrow>On your calls</Eyebrow>
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <span className="rounded-pill border border-hairline-strong px-2.5 py-0.5 text-caption text-bone">Beta</span>
          </div>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Form controls"
        source="ui/input.tsx · ui/select.tsx · ui/textarea.tsx · ui/label.tsx"
        description="shadcn's inputs on graphite, 44px tall, 10px corners, errors written under the field. Used in the Book a demo dialog."
        code={`<Label htmlFor="email">Work email</Label>\n<Input id="email" aria-invalid />\n<p className="text-[13px] text-rose">Use an address like you@company.com.</p>`}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="bg-name">Default</Label>
            <Input id="bg-name" placeholder="Your name" className="h-11" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="bg-email">Error</Label>
            <Input id="bg-email" defaultValue="sofie@" aria-invalid className="h-11" />
            <p className="text-[13px] text-rose">Use an address like you@company.com.</p>
          </div>
          <div className="grid gap-2">
            <Label>Select</Label>
            <Select defaultValue="b">
              <SelectTrigger className="h-11 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a">Just me</SelectItem>
                <SelectItem value="b">2 – 20 people</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="bg-disabled">Disabled</Label>
            <Input id="bg-disabled" disabled placeholder="Read only" className="h-11" />
          </div>
          <div className="grid gap-2 sm:col-span-2">
            <Label htmlFor="bg-msg">Textarea</Label>
            <Textarea id="bg-msg" placeholder="We run 30 customer calls a week…" />
          </div>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Dialog, Sheet, Toast"
        source="components/contact-sales.tsx · site-header.tsx · ui/sonner.tsx"
        description="Book a demo opens a dialog (validation, sending, sent). The mobile menu is a sheet. Confirmations are Sonner toasts. Each is a switch in the editor's Actions row."
        code={`const openDemo = useContactSales()\n<Button onClick={openDemo}>Book a demo</Button>\ntoast.success("Recap sent")`}
      >
        <div className="flex flex-wrap gap-3">
          <Button onClick={contact}>Open “Book a demo”</Button>
          <Button variant="secondary" onClick={() => toast.success("Recap sent to 4 people.")}>
            Show a toast
          </Button>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="SurfaceCard and ProductCard"
        source="ui/surface-card.tsx · sections/capture.tsx"
        description="Frosted glass at 10%, graphite or void, with a 1px inset hairline instead of a shadow. 24px corners, 40px for large panels."
        code={`<SurfaceCard className="p-7">…</SurfaceCard>\n<SurfaceCard tone="graphite" size="large">…</SurfaceCard>`}
      >
        <div className="grid gap-4 sm:grid-cols-3">
          <SurfaceCard className="h-28 p-4 text-sm">glass</SurfaceCard>
          <SurfaceCard tone="graphite" className="h-28 p-4 text-sm">graphite</SurfaceCard>
          <SurfaceCard tone="void" size="large" className="h-28 p-4 text-sm">void · large</SurfaceCard>
          <div className="sm:col-span-2">
            <ProductCard {...CAPTURE.calls} href="#">
              <AppWall className="absolute inset-x-0 bottom-8 sm:bottom-12" />
            </ProductCard>
          </div>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="RotatingLine"
        source="components/motion/rotating-line.tsx"
        description="A headline line that sinks and blurs out as the next one rises in. 360ms, --ease-out-soft. Props: text, distance (em), duration, blur."
        code={`<h1 className="text-display font-medium">\n  AI notes for\n  <RotatingLine text={scene.line} />\n</h1>`}
      >
        <div className="space-y-4">
          <p className="text-heading-lg font-medium">
            AI notes for
            <RotatingLine text={LINES[line]} />
          </p>
          <Button variant="secondary" onClick={() => setLine((value) => (value + 1) % LINES.length)}>
            Next line
          </Button>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="HeroShowcase"
        source="components/sections/hero.tsx"
        description="Scene pills over a white device frame (40px top corners). Transcript lines arrive, then Orra's notes; the active pill's bar is the timer. Props: interval, autoplay, lineStagger."
        code={`<HeroShowcase scenes={HERO.scenes} active={scene} onChange={setScene} interval={6} />`}
        previewClassName="p-4 sm:p-6"
      >
        <div className="rounded-card px-4 pt-6 sm:px-8" style={{ background: "var(--gradient-horizon)" }}>
          <HeroShowcase scenes={HERO.scenes} active={scene} onChange={setScene} />
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Marquee and AppWall"
        source="components/motion/marquee.tsx · sections/capture.tsx"
        description="A linear CSS drift (speed = seconds per loop, direction, paused). The app wall tilts two of them."
        code={`<Marquee speed={45} gap={48}>{items}</Marquee>\n<AppWall speed={48} tilt={-8} />`}
      >
        <Marquee speed={30} gap={40}>
          {TEAMS.map((team) => (
            <TeamMark key={team.name} {...team} />
          ))}
        </Marquee>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="App tiles, recorders, note cards"
        source="components/mockups/*"
        description="HTML product pictures: an app as a monochrome tile, a recorder in three shapes, a note in five surfaces."
        code={`<AppTile mark={APP_MARKS[0]} />\n<Recorder shape="desk" finish="silver" time="12:48" />\n<NoteCard finish="snow" title="Weekly planning" />`}
      >
        <div className="flex flex-wrap items-end gap-6">
          <AppTile mark={APP_MARKS[0]} />
          <OrraTile kind="record" />
          <div className="w-32">
            <Recorder shape="pin" className="aspect-[3/4]" />
          </div>
          <div className="w-32">
            <Recorder shape="desk" finish="silver" className="aspect-[5/8]" />
          </div>
          <div className="w-28">
            <Recorder shape="phone" className="aspect-[1/2]" />
          </div>
          <NoteCard finish="snow" />
          <NoteCard finish="glass" title="Client kickoff" />
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="NoteFan"
        source="components/sections/memory.tsx"
        description="Five notes spread from a stack into a fan when scrolled into view. Props: spread (0 keeps them stacked), stagger."
        code={`<NoteFan spread={1} stagger={0.05} />`}
      >
        <div className="flex justify-center overflow-hidden">
          <NoteFan />
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Workspace panels"
        source="components/mockups/workspace-panels.tsx"
        description="The three windows the feature tabs switch between."
        code={`<SummaryPanel />  <ActionsPanel />  <AssistantPanel />`}
      >
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="h-[440px]">
            <SummaryPanel />
          </div>
          <div className="h-[440px]">
            <ActionsPanel />
          </div>
          <div className="h-[440px]">
            <AssistantPanel />
          </div>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="StoryCarousel"
        source="components/sections/customers.tsx"
        description="Centre story at full size, neighbours a step back carrying the arrows. CSS transform transition, --ease-in-out-soft, 600ms; swipes on touch."
        code={`<StoryCarousel stories={CUSTOMERS.stories} start={1} />`}
        previewClassName="p-0 sm:p-0 py-6 sm:py-8"
      >
        <StoryCarousel stories={CUSTOMERS.stories} />
      </ComponentSpecimen>

      <ComponentSpecimen
        name="BinaryOrb, OrbitMark, McpCard"
        source="components/motion/binary-orb.tsx · sections/security.tsx"
        description="The violet spotlight as a planet of flickering digits, and three turning ellipses. CSS only. Props: size, flicker, seed; spinning."
        code={`<BinaryOrb size={680} flicker />\n<OrbitMark spinning />`}
        previewClassName="bg-void"
      >
        <div className="relative flex h-[420px] flex-col items-center justify-end overflow-hidden text-snow">
          <BinaryOrb size={380} className="absolute top-0 left-1/2 -translate-x-1/2" />
          <McpCard />
        </div>
        <OrbitMark className="mt-6" />
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Team marks, numbered rows, ratings, avatars"
        source="sections/teams.tsx · sections/support.tsx"
        description="Type-set team marks, the numbered feature row (name left, index right, no chrome), the star rating and the team stack."
        code={`<TeamMark name="Terra Vessel" style="serif" />\n<FeatureLink label="AI summaries" href="#" index={3} />\n<Rating value={4.8} />\n<AvatarStack />`}
      >
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="flex flex-wrap items-center gap-8">
            <TeamMark name="Terra Vessel" style="serif" />
            <TeamMark name="FIELDBLOOM" style="spaced" />
            <Rating value={4.8} />
            <AvatarStack />
          </div>
          <ol>
            {FEATURES.slice(0, 3).map((feature, index) => (
              <li key={feature.label}>
                <FeatureLink label={feature.label} href={feature.href} index={index + 1} />
              </li>
            ))}
          </ol>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Rail mockups"
        source="components/mockups/rail-mockups.tsx"
        description="The product pictures in the rail at the foot of the page."
        code={`<LibraryPhone />  <RecapDoc />  <ShareCard />`}
        previewClassName="bg-graphite"
      >
        <div className="grid items-center justify-items-center gap-6 lg:grid-cols-3">
          <LibraryPhone />
          <RecapDoc />
          <ShareCard />
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Reveal and Wordmark"
        source="components/motion/reveal.tsx · ui/wordmark.tsx"
        description="Reveal fades a block up 16px on first view (640ms, --ease-out-soft); held still in the editor and under reduced motion."
        code={`<Reveal delay={0.08}>…</Reveal>\n<Wordmark />`}
      >
        <Reveal className="flex items-center gap-6">
          <Wordmark className="text-3xl" />
          <OrbitMark spinning={false} className="size-10" />
        </Reveal>
      </ComponentSpecimen>

      <CodeSnippet
        code={`// Every section is a component — the home page is this list:\n<Hero /> <TeamStrip /> <FeatureIndex /> <Capture /> <Memory />\n<Workspace /> <Customers /> <Security /> <Support /> <CallToAction /> <ProductRail />`}
      />
    </div>
  )
}
