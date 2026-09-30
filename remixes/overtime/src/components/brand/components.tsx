import { useCanvasAction } from "@canvas/react"
import { useMotionValue } from "motion/react"
import { useState, type ReactNode } from "react"

import { Mark } from "@/components/brand/foundations"
import { ComponentSpecimen, GroupLabel, StateLabel } from "@/components/brand/specimen"
import { InfiniteGrid } from "@/components/canvas/infinite-grid"
import { IntroLoader } from "@/components/intro-loader"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { ArchivePhotos } from "@/components/story/archive-photos"
import { FactList } from "@/components/story/fact-list"
import { MoreVoices } from "@/components/story/more-voices"
import { PortraitReveal } from "@/components/story/portrait-reveal"
import { StoryText } from "@/components/story/story-text"
import { Bracket, BracketLink } from "@/components/ui/bracket"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { ScrambleText } from "@/components/ui/scramble-text"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { TypeReveal } from "@/components/ui/type-reveal"
import { findPerson, people, pexels, project, sessions, sportAccent } from "@/content"
import { Float, WritersIndex } from "@/pages/about-page"
import { ListRow } from "@/pages/list-page"
import { cn } from "@/lib/utils"

const PERSON = findPerson("mateo-arrieta") ?? people[0]

/** The word of a bracket drawn in its hover / focus / press state, so it can be
 *  seen without a pointer. The word is the one span that is not aria-hidden. */
const INVERTED = "[&>span:not([aria-hidden])]:bg-(--page-ink) [&>span:not([aria-hidden])]:text-(--page-bg)"

/**
 * A frame the page's full-screen pieces can be shown in. A transform makes it
 * the containing block for their `position: fixed`, so the header, the intro
 * and the grid fill the frame instead of the window.
 */
function Frame({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("relative overflow-hidden bg-paper [transform:translateZ(0)]", className)}>{children}</div>
  )
}

/** Replays whatever it holds, by remounting it. */
function Replay({ label = "Replay", children }: { label?: string; children: (run: number) => ReactNode }) {
  const [run, setRun] = useState(0)
  return (
    <div>
      <div className="mb-4 flex justify-end">
        <Bracket size="caption" onClick={() => setRun((n) => n + 1)}>
          {label}
        </Bracket>
      </div>
      {children(run)}
    </div>
  )
}

/* ─── components/ui ───────────────────────────────────────────────────── */

export function BracketSpecimen() {
  return (
    <ComponentSpecimen
      name="Bracket · BracketLink"
      source="components/ui/bracket.tsx"
      description="The site’s one button: a word between square brackets. The brackets hold still; the word inverts into a solid block on hover, focus and press, and is underlined when it is the current page. Two sizes, two tones, and bare (no brackets). BracketLink is the same recipe on the router’s Link. It has no disabled look — nothing on the site is ever disabled."
      code={`import { Bracket, BracketLink } from "@/components/ui/bracket"

<Bracket onClick={close}>Close</Bracket>
<BracketLink href="/list" active={pathname === "/list"}>List</BracketLink>
<Bracket bare size="caption" tone="muted">Clear</Bracket>`}
    >
      <div className="space-y-8">
        <div className="flex flex-wrap items-end gap-x-8 gap-y-5">
          <StateLabel label="default">
            <Bracket>Learn more</Bracket>
          </StateLabel>
          <StateLabel label="hover · focus · press">
            <Bracket className={INVERTED}>Learn more</Bracket>
          </StateLabel>
          <StateLabel label="active — current page">
            <Bracket active>Grid</Bracket>
          </StateLabel>
          <StateLabel label="bare">
            <Bracket bare>Search</Bracket>
          </StateLabel>
          <StateLabel label="with icon">
            <Bracket aria-label="Play" className="tracking-normal">
              <Mark className="text-[0.7em]" />
            </Bracket>
          </StateLabel>
        </div>
        <div className="flex flex-wrap items-end gap-x-8 gap-y-5">
          <StateLabel label="size caption">
            <Bracket size="caption">Skip</Bracket>
          </StateLabel>
          <StateLabel label="tone muted">
            <Bracket size="caption" tone="muted">
              Clear
            </Bracket>
          </StateLabel>
          <StateLabel label="BracketLink">
            <BracketLink href="/about">About the issue</BracketLink>
          </StateLabel>
          <StateLabel label="BracketLink, active, bare">
            <BracketLink href="/brand" active bare>
              Brand guidelines
            </BracketLink>
          </StateLabel>
        </div>
        <div className="bg-night p-5 text-night-ink [--page-bg:var(--color-night)] [--page-ink:var(--color-night-ink)]">
          <GroupLabel night>At night — the list view’s tokens</GroupLabel>
          <div className="flex flex-wrap gap-x-8 gap-y-5">
            <Bracket>Learn more</Bracket>
            <Bracket className={INVERTED}>Learn more</Bracket>
            <Bracket active>List</Bracket>
          </div>
        </div>
      </div>
    </ComponentSpecimen>
  )
}

export function CheckboxSpecimen() {
  const [ticked, setTicked] = useState(true)
  return (
    <ComponentSpecimen
      name="Checkbox"
      source="components/ui/checkbox.tsx"
      description="shadcn’s checkbox (Radix), drawn as a pair of brackets that fill with a solid block when ticked. The block scales in over --duration-fast. Used for the sport filters."
      code={`import { Checkbox } from "@/components/ui/checkbox"

<label className="flex items-center gap-2.5">
  <Checkbox checked={on} onCheckedChange={toggle} />
  <span>Boxing</span>
</label>`}
    >
      <div className="flex flex-wrap items-end gap-x-8 gap-y-5">
        <StateLabel label="interactive">
          <label className="flex cursor-pointer items-center gap-2.5">
            <Checkbox checked={ticked} onCheckedChange={(value) => setTicked(value === true)} />
            <span>Cycling</span>
          </label>
        </StateLabel>
        <StateLabel label="unchecked">
          <label className="flex items-center gap-2.5">
            <Checkbox checked={false} />
            <span>Boxing</span>
          </label>
        </StateLabel>
        <StateLabel label="checked">
          <label className="flex items-center gap-2.5">
            <Checkbox checked />
            <span>Track</span>
          </label>
        </StateLabel>
        <StateLabel label="disabled">
          <label className="flex items-center gap-2.5 opacity-50">
            <Checkbox disabled />
            <span>Rugby</span>
          </label>
        </StateLabel>
        <StateLabel label="disabled, checked">
          <label className="flex items-center gap-2.5 opacity-50">
            <Checkbox disabled checked />
            <span>Tennis</span>
          </label>
        </StateLabel>
      </div>
    </ComponentSpecimen>
  )
}

export function InputSpecimen() {
  const [value, setValue] = useState("")
  return (
    <ComponentSpecimen
      name="Input"
      source="components/ui/input.tsx"
      description="shadcn’s input reduced to a caret on a hairline: no box, no radius, mono capitals. The line goes to full ink on focus. Search in the header and on the about page."
      code={`import { Input } from "@/components/ui/input"

<Input value={query} placeholder="Name, sport, club" onChange={(e) => setQuery(e.target.value)} />`}
    >
      <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <StateLabel label="interactive">
          <Input value={value} onChange={(event) => setValue(event.target.value)} placeholder="Name, sport, club" aria-label="Try the input" />
        </StateLabel>
        <StateLabel label="filled">
          <Input defaultValue="Arrieta" aria-label="Filled" />
        </StateLabel>
        <StateLabel label="focus">
          <Input defaultValue="Cycl" aria-label="Focused" className="border-current" />
        </StateLabel>
        <StateLabel label="disabled">
          <Input placeholder="Name, sport, club" disabled aria-label="Disabled" className="opacity-50" />
        </StateLabel>
      </div>
    </ComponentSpecimen>
  )
}

export function SheetSpecimen() {
  const [open, setOpen] = useState(false)
  useCanvasAction("Style guide sheet", (next) => setOpen(next ?? !open), { on: open, group: "Brand guidelines" })
  return (
    <ComponentSpecimen
      name="Sheet"
      source="components/ui/sheet.tsx"
      description="shadcn’s sheet (Radix Dialog) as the phone menu: it drops from the top edge, full width, in the page’s own paper and ink, over a 20% black overlay. The close control is the caller’s — a [ CLOSE ] like every other button."
      code={`<Sheet open={open} onOpenChange={setOpen}>
  <SheetTrigger asChild><Bracket>Menu</Bracket></SheetTrigger>
  <SheetContent className="px-gutter pt-4 pb-10">
    <SheetTitle>Overtime</SheetTitle>
    <SheetClose asChild><Bracket>Close</Bracket></SheetClose>
  </SheetContent>
</Sheet>`}
    >
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Bracket>Open the sheet</Bracket>
        </SheetTrigger>
        <SheetContent className="px-gutter pt-4 pb-10">
          <div className="flex items-center justify-between">
            <SheetTitle className="font-mono text-label uppercase tracking-label">{project.name}</SheetTitle>
            <SheetClose asChild>
              <Bracket>Close</Bracket>
            </SheetClose>
          </div>
          <SheetDescription className="max-w-[28rem] text-ink-soft">
            This is the sheet the phone menu uses. It drops in over 420ms on the out-expo curve and lifts away in 260ms.
          </SheetDescription>
        </SheetContent>
      </Sheet>
    </ComponentSpecimen>
  )
}

export function TextMotionSpecimens() {
  const [text, setText] = useState("84 Overtime")
  return (
    <div className="grid gap-12 lg:grid-cols-2">
      <ComponentSpecimen
        name="ScrambleText"
        source="components/ui/scramble-text.tsx"
        description="Text that decodes into place, left to right. Replays whenever text or replay changes; reduced motion prints it at once. speed is milliseconds per letter."
        code={`<ScrambleText text={\`\${count} Overtime\`} />
<ScrambleText text={view.label} replay={pathname} speed={28} delay={0} />`}
      >
        <div className="space-y-5">
          <p className="font-mono text-label uppercase tracking-label">
            <ScrambleText text={text} />
          </p>
          <div className="flex flex-wrap gap-x-6">
            {["84 Overtime", "12 Overtime", "Grid", "Gallery"].map((option) => (
              <Bracket key={option} size="caption" active={text === option} onClick={() => setText(option)}>
                {option}
              </Bracket>
            ))}
          </div>
        </div>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="TypeReveal"
        source="components/ui/type-reveal.tsx"
        description="Text typed in behind a solid block cursor that runs a few characters ahead. Runs once after delay; perChar sets the pace. How a profile’s facts arrive."
        code={`<TypeReveal text={person.club} delay={450} perChar={22} />`}
      >
        <Replay>
          {(run) => (
            <p key={run}>
              <TypeReveal text={`${PERSON.club}, ${PERSON.born}`} delay={200} />
            </p>
          )}
        </Replay>
      </ComponentSpecimen>
    </div>
  )
}

/* ─── Composed ────────────────────────────────────────────────────────── */

export function HeaderSpecimen() {
  return (
    <ComponentSpecimen
      name="SiteHeader"
      source="components/site-header.tsx"
      description="The header every index page shares, floating over the page with a fade of its background under it: the count, the three views, the about link. tools adds FILTERS and SEARCH (which narrow the grid and the list); blend turns it white and difference-blended over full-bleed pictures. Below md the views move into the Sheet behind [ MENU ]. Shown here in frames — it is also live at the top of this page."
      code={`<SiteHeader pathname={pathname} />
<SiteHeader pathname="/" tools />
<SiteHeader pathname="/gallery" blend />`}
      previewClassName="p-0 md:p-0 space-y-px bg-rule"
    >
      <div className="space-y-px">
        <Frame className="h-56">
          <SiteHeader pathname="/list" tools />
          <p className="absolute right-gutter bottom-3 font-mono text-caption uppercase tracking-label text-ink-muted">tools</p>
        </Frame>
        <Frame className="h-44">
          <img src={pexels(people[6].photo, 1400)} alt="" className="absolute inset-0 size-full object-cover object-[50%_30%]" />
          <SiteHeader pathname="/gallery" blend />
          <p className="absolute right-gutter bottom-3 font-mono text-caption uppercase tracking-label text-blend mix-blend-difference">
            blend
          </p>
        </Frame>
      </div>
    </ComponentSpecimen>
  )
}

export function FooterSpecimen() {
  return (
    <ComponentSpecimen
      name="SiteFooter"
      source="components/site-footer.tsx"
      description="The foot of every page that scrolls: the name and the way to these guidelines, then one row of small print — rights, the issue, the photo credit. tone “night” for the list."
      code={`<SiteFooter />
<SiteFooter tone="night" />`}
      previewClassName="p-0 md:p-0"
    >
      <div className="bg-paper">
        <SiteFooter />
      </div>
      <div className="bg-night text-night-ink">
        <SiteFooter tone="night" />
      </div>
    </ComponentSpecimen>
  )
}

export function GridSpecimen() {
  return (
    <ComponentSpecimen
      name="InfiniteGrid"
      source="components/canvas/infinite-grid.tsx"
      description="The home page: all eighty-four portraits on an endless WebGL sheet. Drag, scroll or use the arrow keys to move, pinch or ⌘/ctrl + scroll to zoom, click a portrait to open it. While it moves each picture clips into a rounded window and blurs along the direction of travel. Live in a frame here, already settled — the intro (a diamond, then the burst) plays only on the home page."
      code={`<InfiniteGrid stage="live" />
<InfiniteGrid stage={stage} onIntroPhase={(phase) => …} />`}
      previewClassName="p-0 md:p-0"
    >
      <Frame className="h-[22rem] md:h-[30rem]">
        <InfiniteGrid stage="live" />
      </Frame>
    </ComponentSpecimen>
  )
}

export function IntroSpecimen() {
  return (
    <ComponentSpecimen
      name="IntroLoader"
      source="components/intro-loader.tsx"
      description="The first thing a visitor reads: one line about the issue, decoded into place while the portraits load, then it fades away. [ SKIP ] goes straight on. In a frame here; press Replay to see it again."
      code={`{stage === "loading" && <IntroLoader onDone={() => setStage("intro")} />}`}
    >
      <Replay>
        {(run) => (
          <Frame className="h-80 border border-rule">
            <p className="absolute inset-0 flex items-center justify-center font-mono text-caption uppercase tracking-label text-ink-muted">
              The grid arrives here
            </p>
            <IntroLoader key={run} onDone={() => undefined} />
          </Frame>
        )}
      </Replay>
    </ComponentSpecimen>
  )
}

export function ListRowSpecimen() {
  const [hovered, setHovered] = useState<string | null>(null)
  const rows = people.slice(0, 3)
  return (
    <ComponentSpecimen
      name="ListRow"
      source="pages/list-page.tsx"
      description="One athlete on the list: portrait, name, the sport’s dot, sport and club, and [ LEARN MORE ]. Hovering a row dims the others to 35% and inverts its bracket. Hover the rows here; the last pair is drawn in the hovered and dimmed states."
      code={`<ListRow
  person={person}
  index={i}
  active={hovered === person.slug}
  dimmed={hovered !== null && hovered !== person.slug}
  onHover={() => setHovered(person.slug)}
/>`}
      previewClassName="bg-night text-night-ink"
    >
      <ul className="flex flex-col gap-6 md:gap-9" onMouseLeave={() => setHovered(null)}>
        {rows.map((person, index) => (
          <ListRow
            key={person.slug}
            person={person}
            index={index}
            active={hovered === person.slug}
            dimmed={hovered !== null && hovered !== person.slug}
            onHover={() => setHovered(person.slug)}
          />
        ))}
      </ul>
      <GroupLabel night className="mt-10 mb-4">States — active, dimmed</GroupLabel>
      <ul className="flex flex-col gap-6">
        <ListRow person={people[3]} index={0} active dimmed={false} onHover={() => undefined} />
        <ListRow person={people[4]} index={1} active={false} dimmed onHover={() => undefined} />
      </ul>
    </ComponentSpecimen>
  )
}

export function StorySpecimens() {
  return (
    <div className="space-y-12">
      <div className="grid gap-12 lg:grid-cols-2">
        <ComponentSpecimen
          name="PortraitReveal"
          source="components/story/portrait-reveal.tsx"
          description="A portrait that arrives behind a sweep of ink: a panel grows across the frame from the left, then slides off to the right and leaves the picture. It waits for the image to decode."
          code={`<PortraitReveal
  src={pexels(person.photo, 1000, 1250)}
  alt={\`Portrait of \${person.name}\`}
  className="aspect-[4/5] rounded-card"
/>`}
        >
          <Replay>
            {(run) => (
              <div className="relative mx-auto max-w-[18rem]">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-x-8 -bottom-10 h-2/3 rounded-full opacity-25 blur-[80px]"
                  style={{ background: sportAccent[PERSON.category] }}
                />
                <PortraitReveal
                  key={run}
                  src={pexels(PERSON.photo, 600, 750)}
                  alt={`Portrait of ${PERSON.name}`}
                  className="relative aspect-[4/5] w-full rounded-card"
                />
              </div>
            )}
          </Replay>
        </ComponentSpecimen>
        <ComponentSpecimen
          name="FactList"
          source="components/story/fact-list.tsx"
          description="The facts beside a portrait — name, sport, discipline, born, club, career, age — each typed in after the one before."
          code={`<FactList person={person} />`}
        >
          <Replay>{(run) => <FactList key={run} person={PERSON} />}</Replay>
        </ComponentSpecimen>
      </div>
      <ComponentSpecimen
        name="StoryText"
        source="components/story/story-text.tsx"
        description="The headline and the profile, with [ – ] / [ + ] to fold the text away and a player that reads it aloud with the browser’s own voice (hidden where the browser has none). Its line fills as the voice gets through the words."
        code={`<StoryText person={person} />`}
      >
        <div className="max-w-[34rem]">
          <StoryText person={PERSON} />
        </div>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="ArchivePhotos"
        source="components/story/archive-photos.tsx"
        description="Frames from the archive under the portrait: one wide, one narrow and set left, each dated and in grey. They rise in as they are reached."
        code={`<ArchivePhotos person={person} />`}
      >
        <div className="mx-auto max-w-[28rem]">
          <ArchivePhotos person={PERSON} />
        </div>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="MoreVoices"
        source="components/story/more-voices.tsx"
        description="The next fourteen athletes as a strip that scrolls sideways — drag, swipe or scroll it — with a short bar that says how far along you are. Portraits grow 4% on hover."
        code={`<MoreVoices person={person} />`}
        previewClassName="px-0 md:px-0"
      >
        <MoreVoices person={PERSON} />
      </ComponentSpecimen>
    </div>
  )
}

export function AboutSpecimens() {
  const progress = useMotionValue(0.5)
  const [value, setValue] = useState(50)
  return (
    <div className="space-y-12">
      <ComponentSpecimen
        name="Float"
        source="pages/about-page.tsx"
        description="A photograph that drifts against the scroll on the about page — positive speeds rise faster than the page, negative ones lag. On the page scroll drives it; here the slider stands in for the scroll. Hidden below md, where the pictures become a row."
        code={`const { scrollYProgress } = useScroll({ target: room, offset: ["start end", "end start"] })

<Float progress={scrollYProgress} speed={0.35} className="left-[8%] top-[2%] w-[13vw] aspect-[4/3]">
  <img src={pexels(photo, 700)} alt="" className="size-full rounded-card object-cover" />
</Float>`}
      >
        <div className="relative h-72 overflow-hidden">
          <Float progress={progress} speed={0.12} className="top-[25%] left-[6%] aspect-[4/3] w-[30%]">
            <img src={pexels(sessions[0].photo, 500)} alt="" className="size-full rounded-card object-cover" />
          </Float>
          <Float progress={progress} speed={-0.08} className="top-[20%] right-[8%] aspect-[3/4] w-[22%]">
            <img src={pexels(sessions[2].photo, 400)} alt="" className="size-full rounded-card object-cover" />
          </Float>
          <p className="absolute inset-0 flex items-center justify-center font-mono text-caption uppercase tracking-label text-ink-muted md:hidden">
            Floats show from md up
          </p>
        </div>
        <label className="mt-4 flex items-center gap-4 font-mono text-caption uppercase tracking-label text-ink-muted">
          Scroll
          <input
            type="range"
            min={0}
            max={100}
            value={value}
            onChange={(event) => {
              const next = Number(event.target.value)
              setValue(next)
              progress.set(next / 100)
            }}
            className="h-11 flex-1 accent-(--color-ink)"
          />
          <span className="w-8 text-right tabular-nums">{value}</span>
        </label>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="WritersIndex"
        source="pages/about-page.tsx"
        description="The issue’s writers and everyone each of them profiled. A row goes solid under the pointer, like a selected line in a terminal; SEARCH narrows it to a name. Try “Arrieta”."
        code={`<WritersIndex />`}
        previewClassName="px-0 md:px-0 max-h-[28rem] overflow-y-auto overscroll-contain"
      >
        <WritersIndex />
      </ComponentSpecimen>
    </div>
  )
}

export function GallerySpecimen() {
  const person = people[8]
  return (
    <ComponentSpecimen
      name="Gallery frame"
      source="pages/gallery-page.tsx"
      description="Shown in part. The gallery is every portrait full screen, one after another; it takes the wheel, the arrow keys and touch for the whole window, so it cannot live inside another page. One frame of it here — the picture full-bleed, the name and the counter difference-blended — and the real thing is one link away."
      code={`// A route, not a component: /gallery
<BracketLink href="/gallery">Gallery</BracketLink>`}
      previewClassName="p-0 md:p-0"
    >
      <Frame className="h-80">
        <img src={pexels(person.photo, 1400)} alt="" className="absolute inset-0 size-full object-cover object-[50%_30%]" />
        <p className="absolute bottom-6 left-gutter font-mono text-caption uppercase tracking-label text-blend mix-blend-difference">
          {person.number} — {person.name}
        </p>
        <p className="absolute right-gutter bottom-6 font-mono text-caption tracking-label text-blend tabular-nums mix-blend-difference">
          {String(person.number).padStart(2, "0")} / {people.length}
        </p>
        <div className="absolute top-4 right-gutter text-blend mix-blend-difference [--page-bg:var(--color-blend-inverse)] [--page-ink:var(--color-blend)]">
          <BracketLink href="/gallery">Open the gallery</BracketLink>
        </div>
      </Frame>
    </ComponentSpecimen>
  )
}

export function ComponentLibrary() {
  return (
    <div className="space-y-16">
      <div className="space-y-12">
        <GroupLabel>components/ui — primitives</GroupLabel>
        <BracketSpecimen />
        <div className="grid gap-12 lg:grid-cols-2">
          <CheckboxSpecimen />
          <InputSpecimen />
        </div>
        <SheetSpecimen />
        <TextMotionSpecimens />
      </div>
      <div className="space-y-12">
        <GroupLabel>Composed — the frame of every page</GroupLabel>
        <HeaderSpecimen />
        <FooterSpecimen />
        <IntroSpecimen />
        <GridSpecimen />
        <GallerySpecimen />
      </div>
      <div className="space-y-12">
        <GroupLabel>Composed — the list and the about page</GroupLabel>
        <ListRowSpecimen />
        <AboutSpecimens />
      </div>
      <div className="space-y-12">
        <GroupLabel>Composed — a profile, piece by piece</GroupLabel>
        <StorySpecimens />
      </div>
    </div>
  )
}
