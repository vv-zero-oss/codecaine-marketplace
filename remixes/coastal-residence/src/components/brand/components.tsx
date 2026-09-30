import { useCanvasAction } from "@canvas/react"
import { Menu, Plus, RotateCcw, X } from "lucide-react"
import { motion, useMotionValue, useTransform } from "motion/react"
import { useEffect, useState, type ChangeEvent, type ReactNode } from "react"

import { ComponentSpecimen, GroupLabel, StateLabel } from "@/components/brand/specimen"
import { EASE_OUT } from "@/components/motion"
import { CoastMap } from "@/components/sections/coast-story"
import { Credits } from "@/components/sections/credits"
import { DayNight } from "@/components/sections/hero"
import { IntroCentre, ReasonPhotos } from "@/components/sections/reasons"
import { Figure } from "@/components/sections/residences"
import { Drift, SpaceTitle } from "@/components/sections/space"
import { Badge } from "@/components/site-header"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Bloom } from "@/components/ui/bloom"
import { Button } from "@/components/ui/button"
import { CircleLink } from "@/components/ui/circle-link"
import { Container } from "@/components/ui/container"
import { Emblem } from "@/components/ui/emblem"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Sheet, SheetClose, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { ScriptReveal, StretchText } from "@/components/ui/stretch-text"
import {
  amenities,
  architecture,
  brand,
  hero,
  nav,
  notes,
  quote,
  reasons,
  reasonsIntro,
  residences,
  seaViews,
  space,
  story,
} from "@/content"
import { cn } from "@/lib/utils"

/** The same photograph, smaller, for a thumbnail. */
const thumb = (src: string) => src.replace(/w=\d+/, "w=900")

/** A light button that restarts whatever sits beside it. */
function Replay({ onClick, label = "Replay" }: { onClick: () => void; label?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="label inline-flex h-11 items-center gap-2 rounded-pill border border-current px-5 transition-[background-color,color,transform] duration-300 ease-[var(--ease-out-soft)] hover:bg-ink hover:text-pale focus-visible:ring-1 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.97]"
    >
      <RotateCcw className="size-3.5" strokeWidth={1.5} />
      {label}
    </button>
  )
}

/* ─── Button ──────────────────────────────────────────────────────────── */

const STOCK = ["default", "secondary", "outline", "ghost", "link", "destructive"] as const
const STOCK_SIZES = ["xs", "sm", "default", "lg"] as const

function ButtonSpecimen() {
  return (
    <ComponentSpecimen
      name="Button"
      source="components/ui/button.tsx"
      description="shadcn’s button, with the site’s own pill added to its cva recipe: a hairline in the current colour, small caps, and on hover it fills with ink and the text turns sand. It presses to 97%."
      code={`import { Button } from "@/components/ui/button"

<Button variant="pill" size="pill">Explore penthouses</Button>`}
    >
      <div className="space-y-10">
        <div>
          <GroupLabel>variant="pill" · size="pill" — on sand</GroupLabel>
          <div className="flex flex-wrap items-end gap-x-6 gap-y-5 bg-pale p-5 text-ink">
            <StateLabel label="default">
              <Button variant="pill" size="pill">
                Explore
              </Button>
            </StateLabel>
            <StateLabel label="hover">
              <Button variant="pill" size="pill" className="bg-ink text-pale">
                Explore
              </Button>
            </StateLabel>
            <StateLabel label="focus">
              <Button variant="pill" size="pill" className="ring-[3px] ring-ink/30">
                Explore
              </Button>
            </StateLabel>
            <StateLabel label="pressed">
              <Button variant="pill" size="pill" className="scale-[0.97] bg-ink text-pale">
                Explore
              </Button>
            </StateLabel>
            <StateLabel label="disabled">
              <Button variant="pill" size="pill" disabled>
                Explore
              </Button>
            </StateLabel>
          </div>
        </div>
        <div>
          <GroupLabel>The same pill over olive — it takes the colour it sits in</GroupLabel>
          <div className="flex flex-wrap items-end gap-6 bg-deep p-5 text-shell [&_span.font-mono]:text-shell/60">
            <StateLabel label="default">
              <Button variant="pill" size="pill">
                Book a viewing
              </Button>
            </StateLabel>
            <StateLabel label="hover">
              <Button variant="pill" size="pill" className="bg-shell text-deep">
                Book a viewing
              </Button>
            </StateLabel>
          </div>
        </div>
        <div>
          <GroupLabel>shadcn’s stock variants — kept, not used on the site</GroupLabel>
          <p className="mb-4 max-w-[40rem] text-[0.8125rem] text-ink-soft">
            The palette sets no <code className="font-mono text-xs">--primary</code>,{" "}
            <code className="font-mono text-xs">--secondary</code> or <code className="font-mono text-xs">--accent</code>, so these
            render unthemed. Map those tokens onto olive and sand in <code className="font-mono text-xs">index.css</code> before
            using one.
          </p>
          <div className="flex flex-wrap items-end gap-5">
            {STOCK.map((variant) => (
              <StateLabel key={variant} label={variant}>
                <Button variant={variant}>Button</Button>
              </StateLabel>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap items-end gap-5">
            {STOCK_SIZES.map((size) => (
              <StateLabel key={size} label={`size ${size}`}>
                <Button variant="outline" size={size}>
                  Button
                </Button>
              </StateLabel>
            ))}
            <StateLabel label="size icon">
              <Button variant="outline" size="icon" aria-label="Add">
                <Plus strokeWidth={1.5} />
              </Button>
            </StateLabel>
          </div>
        </div>
      </div>
    </ComponentSpecimen>
  )
}

/* ─── Text motion ─────────────────────────────────────────────────────── */

function TextMotionSpecimens() {
  const [run, setRun] = useState(0)
  const [script, setScript] = useState(0)
  return (
    <div className="grid gap-8 xl:grid-cols-2">
      <ComponentSpecimen
        name="StretchText"
        source="components/ui/stretch-text.tsx"
        description="Letters arrive tall, faint and blurred and settle one after another. Words stay whole so lines break between them. Plays in view by default, on mount, or holds hidden."
        code={`<StretchText as="h2" text="Made to last" className="font-condensed text-[clamp(3.2rem,8.6vw,10.5rem)]" />
<StretchText text="Luna" play="mount" delay={0.12} />
<StretchText text="Residence" play={false} /> {/* held hidden */}`}
      >
        <div className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-3">
            <StateLabel label='play="view"'>
              <StretchText key={`v${run}`} text="Made" className="font-condensed text-[3.4rem] leading-none" />
            </StateLabel>
            <StateLabel label='play="mount"'>
              <StretchText key={`m${run}`} text="to last" play="mount" delay={0.2} className="font-condensed text-[3.4rem] leading-none" />
            </StateLabel>
            <StateLabel label="play={false} — hidden">
              <span className="relative block">
                <StretchText text="Luna" play={false} className="font-condensed text-[3.4rem] leading-none" />
                <span className="absolute inset-0 border border-dashed border-ink/20" />
              </span>
            </StateLabel>
          </div>
          <Replay onClick={() => setRun((n) => n + 1)} />
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="ScriptReveal"
        source="components/ui/stretch-text.tsx"
        description="The italic word written on from left to right, like a pen crossing the line. One per headline, tilted a few degrees, for the warm part of the sentence."
        code={`<span className="-rotate-[4deg] font-script italic normal-case">
  <ScriptReveal delay={0.4}>yours</ScriptReveal>
</span>`}
      >
        <div className="space-y-6">
          <p className="font-condensed text-[3.2rem] leading-[0.9]">
            {story.coast.lines[0]}
            <span className="ml-[1.2em] block -rotate-[4deg] font-script text-[0.95em] normal-case italic">
              <ScriptReveal key={script} play="mount" delay={0.2}>
                {story.coast.lines[1]}
              </ScriptReveal>
            </span>
          </p>
          <Replay onClick={() => setScript((n) => n + 1)} />
        </div>
      </ComponentSpecimen>
    </div>
  )
}

/* ─── Disc and centres (CircleReveal, in part) ─────────────────────────── */

function CircleRevealPreview() {
  const progress = useMotionValue(0.6)
  const [value, setValue] = useState(0.6)
  const [which, setWhich] = useState<"reasons" | "space">("reasons")
  // The same curve the real one runs, against a 448px frame instead of the window.
  const top = useTransform(progress, [0, 0.45, 0.8], ["100%", "42%", "-45%"])
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const next = Number(event.target.value)
    setValue(next)
    progress.set(next)
  }
  return (
    <ComponentSpecimen
      name="CircleReveal"
      source="components/ui/circle-reveal.tsx · sections/reasons.tsx · sections/space.tsx"
      description="A disc of sand or limestone rises over a photograph until it fills the window, words riding its rim — the turn from one chapter to the next. What fades in once it has covered (IntroCentre, SpaceTitle) is passed as a render function of the scroll progress."
      note="Shown in part: the real component pins a 260vh section to the window’s scroll, so here the disc and both centres are scrubbed by the slider."
      code={`<CircleReveal id="reasons-intro" image={src} imageAlt="…" arc={["Three", "reasons", "to", "choose", "Luna"]}>
  {(progress) => <IntroCentre progress={progress} />}
</CircleReveal>`}
      previewClassName="p-0 sm:p-0"
    >
      <div className="relative h-[30rem] overflow-hidden bg-ink">
        <img
          src={thumb(which === "reasons" ? reasonsIntro.image : amenities[amenities.length - 1].image)}
          alt=""
          className="absolute inset-0 size-full object-cover"
        />
        <motion.div
          className={cn("absolute left-1/2 aspect-square w-[max(180%,60rem)] -translate-x-1/2 rounded-full", which === "reasons" ? "bg-pale" : "bg-shell")}
          style={{ top }}
        />
        <div className="pointer-events-none absolute inset-0 [&_h2]:text-[clamp(2.6rem,6vw,4.5rem)]">
          {which === "reasons" ? <IntroCentre progress={progress} /> : <SpaceTitle progress={progress} />}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-4 border-t border-ink/10 px-5 py-4">
        <label className="label flex min-w-0 flex-1 items-center gap-4">
          Progress
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={value}
            onChange={onChange}
            className="h-11 min-w-0 flex-1 accent-deep"
          />
          <span className="w-10 font-mono tabular-nums">{value.toFixed(2)}</span>
        </label>
        <div className="flex gap-2">
          {(["reasons", "space"] as const).map((id) => (
            <button
              key={id}
              type="button"
              aria-pressed={which === id}
              onClick={() => setWhich(id)}
              className={cn(
                "label h-11 rounded-pill border border-current px-4 transition-[background-color,color] duration-300 ease-[var(--ease-out-soft)]",
                which === id ? "bg-ink text-pale" : "hover:bg-ink/5",
              )}
            >
              {id === "reasons" ? "IntroCentre" : "SpaceTitle"}
            </button>
          ))}
        </div>
      </div>
    </ComponentSpecimen>
  )
}

/* ─── Popover: the note card ──────────────────────────────────────────── */

function NoteCardSpecimen() {
  const [open, setOpen] = useState<string | null>(null)
  const first = notes.points[0].id
  useCanvasAction("Note card", (next) => setOpen((next ?? !open) ? first : null), { on: open !== null, group: "Brand guidelines" })
  return (
    <ComponentSpecimen
      name="Popover — the note card"
      source="components/ui/popover.tsx · sections/notes.tsx"
      description="Pulsing points pinned to a photograph. Each is a Radix popover trigger; its card is limestone with a 6px inset hairline frame and the page’s one shadow. Closed, hover (grows to 110%) and open (fills paper, shows ×)."
      code={`<Popover open={open} onOpenChange={setOpen}>
  <PopoverTrigger aria-label="Built in limestone" className="group …">…</PopoverTrigger>
  <PopoverContent side="right" sideOffset={20}
    className="w-[min(20.5rem,calc(100vw-2rem))] rounded-[var(--radius-card)] border-0 bg-shell p-0 shadow-[var(--shadow-card)]">
    …
  </PopoverContent>
</Popover>`}
      previewClassName="p-0 sm:p-0"
    >
      <div className="relative h-80 overflow-hidden bg-ink">
        <img src={thumb(notes.image)} alt="" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-ink/20" />
        {notes.points.map((point, i) => (
          <Popover key={point.id} open={open === point.id} onOpenChange={(o) => setOpen(o ? point.id : null)}>
            <PopoverTrigger
              aria-label={point.title}
              className="group absolute grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full"
              style={{ left: `${[22, 50, 78][i]}%`, top: "50%" }}
            >
              <span className="absolute inset-1 animate-pulse-ring rounded-full border border-paper/70" />
              <span
                className={cn(
                  "relative grid size-7 place-items-center rounded-full border border-paper/80 text-paper transition-[background-color,transform] duration-300 ease-[var(--ease-out-soft)] group-hover:scale-110 group-active:scale-95",
                  open === point.id ? "bg-paper text-ink" : "bg-paper/10 backdrop-blur-[2px]",
                  i === 1 && open !== point.id && "scale-110",
                )}
              >
                {open === point.id ? <X className="size-3.5" strokeWidth={1.5} /> : <Plus className="size-3.5" strokeWidth={1.5} />}
              </span>
              <span className="label absolute top-full mt-1 whitespace-nowrap text-paper">
                {open === point.id ? "open" : i === 1 ? "hover" : "closed"}
              </span>
            </PopoverTrigger>
            <PopoverContent
              side="bottom"
              align="center"
              sideOffset={20}
              collisionPadding={16}
              className="w-[min(20.5rem,calc(100vw-2rem))] rounded-[var(--radius-card)] border-0 bg-shell p-0 text-ink shadow-[var(--shadow-card)] outline-none"
            >
              <motion.div
                initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.45, ease: EASE_OUT }}
                className="m-1.5 flex min-h-[16rem] flex-col justify-between border border-ink/10 p-6"
              >
                <h3 className="font-condensed text-[2.4rem]">{point.title}</h3>
                <p className="text-body">{point.body}</p>
              </motion.div>
            </PopoverContent>
          </Popover>
        ))}
      </div>
    </ComponentSpecimen>
  )
}

/* ─── Sheet: the phone menu ───────────────────────────────────────────── */

function MenuSheetSpecimen() {
  const [open, setOpen] = useState(false)
  useCanvasAction("Menu sheet", (next) => setOpen(next ?? !open), { on: open, group: "Brand guidelines" })
  return (
    <ComponentSpecimen
      name="Sheet — the phone menu"
      source="components/ui/sheet.tsx · site-header.tsx"
      description="Under 768px the header’s links fold into a 44px round trigger that opens a full-height olive sheet from the right: the emblem, the primary link in the condensed face, then the labels."
      code={`<Sheet>
  <SheetTrigger aria-label="Open menu" className="grid size-11 place-items-center rounded-full border border-current/30">
    <Menu className="size-5" strokeWidth={1.5} />
  </SheetTrigger>
  <SheetContent side="right" className="w-full border-none bg-deep text-shell sm:max-w-sm">…</SheetContent>
</Sheet>`}
    >
      <div className="flex flex-wrap items-end gap-8">
        <StateLabel label="trigger, on light">
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="grid size-11 place-items-center rounded-full border border-current/30 text-ink backdrop-blur-sm"
          >
            <Menu className="size-5" strokeWidth={1.5} />
          </button>
        </StateLabel>
        <StateLabel label="trigger, on a photograph" className="bg-ink p-3 text-paper [&>span]:text-paper/70">
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="grid size-11 place-items-center rounded-full border border-current/30 backdrop-blur-sm"
          >
            <Menu className="size-5" strokeWidth={1.5} />
          </button>
        </StateLabel>
        <p className="max-w-[18rem] text-[0.8125rem] text-ink-soft">
          Tap either to open the real sheet (also “Menu sheet” in the editor’s Actions row).
        </p>
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-full border-none bg-deep text-shell sm:max-w-sm [&>button]:text-shell">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <div className="flex h-full flex-col justify-center gap-10 px-8">
            <Emblem className="size-12" />
            <SheetClose asChild>
              <a href="#components" className="font-condensed text-5xl">
                {nav.primary.label.join(" ")}
              </a>
            </SheetClose>
            {nav.secondary.map((item) => (
              <SheetClose asChild key={item.label}>
                <a href="#components" className="label text-sm tracking-[0.3em]">
                  {item.label}
                </a>
              </SheetClose>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </ComponentSpecimen>
  )
}

/* ─── The sections ────────────────────────────────────────────────────── */

const SECTIONS: { id: string; name: string; image: string; body: string; parts: string }[] = [
  { id: "top", name: "Hero", image: hero.image, body: "The arrival: an arch rises out of deep olive, the name writes itself in, and the arch opens to the window. By day / by night regrades the scene.", parts: "StretchText, ScriptReveal, DayNight" },
  { id: "gardens", name: "Notes", image: notes.image, body: "The gardens at dusk with three pulsing points, each opening a note card.", parts: "Popover, CircleLink" },
  { id: "reasons-intro", name: "Reasons", image: reasonsIntro.image, body: "A sand disc with the chapter round its rim, then three pinned reasons that re-letter the headline as you scroll.", parts: "CircleReveal, IntroCentre, ReasonPhotos" },
  { id: "studio", name: "QuoteBand", image: quote.image, body: "The studio’s line over a full-bleed photograph drifting against the scroll.", parts: "StretchText" },
  { id: "location", name: "CoastStory", image: story.mile.image, body: "The idea, the place and the coast, pinned and scrolled sideways on wide screens; stacked on phones.", parts: "Bloom, StretchText, ScriptReveal, CoastMap, CircleLink" },
  { id: "residences", name: "Residences", image: residences.aerial, body: "The bay from the air, then a sand panel slides over it with the three home types.", parts: "Figure, Button (pill), StretchText, Bloom, Emblem" },
  { id: "amenities", name: "Amenities", image: amenities[1].image, body: "A pinned full-screen list that steps through the grounds; each name also jumps to itself.", parts: "CircleLink" },
  { id: "space", name: "Space", image: space.interior, body: "A limestone disc, the chapter title, then a loose collage of the rooms, specs and upgrades.", parts: "CircleReveal, SpaceTitle, Drift, CircleLink" },
  { id: "architecture", name: "Architecture", image: architecture.image, body: "One enormous word over white walls, rising into place while the frame is pinned.", parts: "StretchText" },
  { id: "views", name: "SeaViews", image: seaViews.image, body: "The last photograph before the contact details: the view from the roof.", parts: "StretchText, CircleLink" },
]

function SectionIndex() {
  const home = import.meta.env.BASE_URL
  return (
    <ComponentSpecimen
      name="Sections"
      source="components/sections/*.tsx"
      description="The home page is these chapters in this order, with Credits and SiteFooter (both live on this page). Their parts are shown live above and below."
      note="Shown in part: these are full-bleed, pinned and scroll-scrubbed, so each is listed with the pieces it is built from and a link to it in place."
      code={`<main data-canvas-ignore>
  <Hero onReady={() => setReady(true)} />
  <Notes />
  <Reasons />
  <QuoteBand />
  <CoastStory />
  <Residences />
  <Amenities />
  <Space />
  <Architecture />
  <Credits />
  <SeaViews />
</main>`}
    >
      <ol className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {SECTIONS.map((section, i) => (
          <li key={section.id} className="group flex flex-col bg-paper">
            <div className="relative aspect-[4/3] overflow-hidden bg-ink">
              <img
                src={thumb(section.image)}
                alt=""
                loading="lazy"
                className="size-full object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
              />
              <span className="label absolute top-3 left-3 text-paper tabular-nums">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <p className="font-condensed text-[1.9rem] leading-none">{section.name}</p>
              <p className="mt-3 text-[0.875rem] leading-snug text-ink-soft">{section.body}</p>
              <p className="mt-3 font-mono text-[11px] text-ink-soft">{section.parts}</p>
              <a href={`${home}#${section.id}`} className="label mt-auto inline-flex min-h-11 items-end pt-4 underline-offset-4 hover:underline">
                See it in place →
              </a>
            </div>
          </li>
        ))}
      </ol>
    </ComponentSpecimen>
  )
}

/* ─── Library ─────────────────────────────────────────────────────────── */

function Split({ children }: { children: ReactNode }) {
  return <div className="grid gap-8 xl:grid-cols-2">{children}</div>
}

function DayNightSpecimen() {
  const [mode, setMode] = useState<"day" | "night">("night")
  return (
    <ComponentSpecimen
      name="DayNight"
      source="components/sections/hero.tsx"
      description="Two spaced labels and a dot that springs along a hairline between them. The pressed one is full strength, the other 45% (80% on hover)."
      code={`<DayNight mode={mode} onChange={setMode} />`}
      previewClassName="bg-deep text-paper"
    >
      <div className="flex flex-col items-start gap-4">
        <DayNight mode={mode} onChange={setMode} />
        <span className="font-mono text-[11px] text-paper/60">mode="{mode}"</span>
      </div>
    </ComponentSpecimen>
  )
}

function FigureSpecimen() {
  return (
    <ComponentSpecimen
      name="Figure"
      source="components/sections/residences.tsx"
      description="A small-caps label over a number in the display face — bedrooms and area for each residence type."
      code={`<Figure label="Bedrooms">3</Figure>
<Figure label="Area up to">188 — 240 m<sup className="text-[0.5em]">2</sup></Figure>`}
      previewClassName="bg-pale"
    >
      <div className="grid gap-8 sm:grid-cols-3">
        {residences.types.map((type) => (
          <div key={type.name} className="space-y-6">
            <p className="label text-ink-soft">{type.name}</p>
            <Figure label="Bedrooms">{type.bedrooms}</Figure>
            <Figure label="Area up to">
              {type.area} m<sup className="text-[0.5em]">2</sup>
            </Figure>
          </div>
        ))}
      </div>
    </ComponentSpecimen>
  )
}

function useSpinHint() {
  // The badge turns with the page's scroll; nudge the reader to try it.
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(true)
    window.addEventListener("scroll", on, { once: true, passive: true })
    return () => window.removeEventListener("scroll", on)
  }, [])
  return scrolled
}

export function ComponentLibrary() {
  const scrolled = useSpinHint()
  return (
    <div className="space-y-8">
      <ButtonSpecimen />

      <Split>
        <ComponentSpecimen
          name="CircleLink"
          source="components/ui/circle-link.tsx"
          description="The round call to action: a faint ring and two short arcs turning slowly. On hover the ring and arcs close in; on press the words shrink to 95%. Ink on light grounds, paper on photographs."
          code={`<CircleLink href="#residences">View available residences</CircleLink>
<CircleLink href="#contact" tone="light" className="size-44">Book a viewing now</CircleLink>`}
        >
          <div className="flex flex-wrap items-end justify-center gap-6 sm:justify-start">
            <StateLabel label='tone="ink"'>
              <CircleLink href="#components" className="size-36 sm:size-40">
                {notes.cta}
              </CircleLink>
            </StateLabel>
            <StateLabel label="hover">
              <CircleLink href="#components" className="size-36 sm:size-40 [&>span:first-child]:scale-95 [&>svg]:scale-90">
                {notes.cta}
              </CircleLink>
            </StateLabel>
            <StateLabel label='tone="light"' className="bg-ink p-3 [&>span]:text-paper/70">
              <CircleLink href="#components" tone="light" className="size-36 sm:size-40">
                Book a viewing now
              </CircleLink>
            </StateLabel>
          </div>
        </ComponentSpecimen>

        <ComponentSpecimen
          name="Emblem"
          source="components/ui/emblem.tsx"
          description="Four petals and four leaves round a still centre, drawn in currentColor. Sized with a size-* class; it closes chapters and marks Luna on the map."
          code={`<Emblem className="size-14" />
<Emblem className="size-12" aria-label="Luna" />`}
        >
          <div className="flex flex-wrap items-end gap-6">
            {["size-10", "size-12", "size-14", "size-16"].map((size) => (
              <StateLabel key={size} label={size}>
                <Emblem className={cn(size, "text-ink")} />
              </StateLabel>
            ))}
            <StateLabel label="on olive" className="bg-deep p-3 text-shell [&>span]:text-shell/60">
              <Emblem className="size-14" />
            </StateLabel>
          </div>
        </ComponentSpecimen>
      </Split>

      <TextMotionSpecimens />

      <Split>
        <ComponentSpecimen
          name="Badge"
          source="components/site-header.tsx"
          description="The logo in use: the name set round a ring about the emblem, top left of every screen. It turns with the scroll — faster the harder the page is thrown — and takes paper or ink from whatever passes under it."
          code={`<Badge tone="light" />  {/* over photographs */}
<Badge tone="dark" />   {/* over limestone and sand */}`}
        >
          <div className="flex flex-wrap items-center gap-6">
            <StateLabel label='tone="dark"'>
              <Badge tone="dark" />
            </StateLabel>
            <StateLabel label='tone="light"' className="bg-deep p-3 [&>span]:text-shell/60">
              <Badge tone="light" />
            </StateLabel>
            <p className="max-w-[14rem] text-[0.8125rem] text-ink-soft">
              {scrolled ? "Turning with your scroll." : "Scroll the page to see it turn."}
            </p>
          </div>
        </ComponentSpecimen>

        <DayNightSpecimen />
      </Split>

      <CircleRevealPreview />

      <Split>
        <NoteCardSpecimen />
        <MenuSheetSpecimen />
      </Split>

      <ComponentSpecimen
        name="Carousel — ReasonPhotos"
        source="components/ui/carousel.tsx · sections/reasons.tsx"
        description="shadcn’s Embla carousel, looping, with the page’s own counter underneath: ‹ 1 —— 2 ›, the track filling in ink as you go. Swipe, or the 44px chevrons."
        code={`<ReasonPhotos images={reason.images} title={reason.title} />`}
        previewClassName="flex justify-center bg-pale"
      >
        <ReasonPhotos images={reasons[1].images} title={reasons[1].title} />
      </ComponentSpecimen>

      <Split>
        <FigureSpecimen />
        <ComponentSpecimen
          name="Drift"
          source="components/sections/space.tsx"
          description="A photograph that drifts against the scroll by amount pixels — the collage in the space chapter. Scroll past it."
          code={`<Drift src={src} alt="A quiet walled courtyard" className="aspect-[4/5] w-full object-cover" amount={30} />`}
          previewClassName="p-0 sm:p-0"
        >
          <div className="relative flex h-80 items-center justify-end overflow-hidden bg-deep">
            <Drift src={thumb(space.images[2])} alt="A quiet walled courtyard" className="mr-[12%] aspect-[4/5] h-[115%] object-cover" amount={40} />
          </div>
        </ComponentSpecimen>
      </Split>

      <ComponentSpecimen
        name="Bloom"
        source="components/ui/bloom.tsx"
        description="A spray of bougainvillea tucked into a corner. Shot on a white wall and multiplied, so the wall disappears into any light ground; it fades away from its corner and drifts a little against the scroll."
        code={`<Bloom src={story.bloom} corner="top-left" className="-left-10 -top-24 h-[62vh] w-[44vw] min-w-72" />
<Bloom src={story.bloomAlt} flip corner="bottom-right" drift={40} className="…" />`}
        previewClassName="p-0 sm:p-0"
      >
        <div className="grid sm:grid-cols-2">
          <div className="relative h-72 overflow-hidden bg-shell">
            <Bloom src={thumb(story.bloom)} corner="top-left" drift={30} className="-top-6 -left-6 h-64 w-72" />
            <span className="label absolute right-4 bottom-4">corner="top-left" · on shell</span>
          </div>
          <div className="relative h-72 overflow-hidden bg-pale">
            <Bloom src={thumb(story.bloomAlt)} flip corner="bottom-right" drift={30} className="-right-6 -bottom-6 h-64 w-72" />
            <span className="label absolute top-4 left-4">flip · corner="bottom-right" · on pale</span>
          </div>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="CoastMap"
        source="components/sections/coast-story.tsx"
        description="The coastline as one drawn line that traces itself in when it comes into view, with each town and the drive to it; Luna is the emblem. It keeps 720px and scrolls sideways on a phone."
        code={`<div className="overflow-x-auto lg:overflow-visible">
  <div className="min-w-[720px] pt-24 lg:min-w-0"><CoastMap /></div>
</div>`}
      >
        <div className="overflow-x-auto">
          <div className="min-w-[720px] px-12 pt-24 pb-2">
            <CoastMap />
          </div>
        </div>
      </ComponentSpecimen>

      <Split>
        <ComponentSpecimen
          name="Accordion"
          source="components/ui/accordion.tsx"
          description="shadcn’s accordion on Radix, as shipped: a chevron, an underline on hover, and a 260ms height open on the page’s ease. The team chapter restyles it below."
          code={`<Accordion type="single" collapsible>
  <AccordionItem value="stone">
    <AccordionTrigger>Built in limestone</AccordionTrigger>
    <AccordionContent>…</AccordionContent>
  </AccordionItem>
</Accordion>`}
        >
          <Accordion type="single" collapsible defaultValue={notes.points[0].id} className="border-y border-ink/10">
            {notes.points.map((point) => (
              <AccordionItem key={point.id} value={point.id} className="border-ink/10">
                <AccordionTrigger className="text-[0.95rem] font-semibold">{point.title}</AccordionTrigger>
                <AccordionContent className="text-body text-ink-soft">{point.body}</AccordionContent>
              </AccordionItem>
            ))}
            <AccordionItem value="disabled" disabled className="border-ink/10">
              <AccordionTrigger className="text-[0.95rem] font-semibold">Disabled item</AccordionTrigger>
              <AccordionContent>—</AccordionContent>
            </AccordionItem>
          </Accordion>
        </ComponentSpecimen>

        <ComponentSpecimen
          name="Container"
          source="components/ui/container.tsx"
          description="Centres content at 1400px with 20px gutters on phones, 32px from sm and 13.5rem from lg. Marked data-canvas-ignore, so the editor clicks through it."
          code={`<Container className="flex flex-col gap-10">…</Container>`}
          previewClassName="p-0 sm:p-0"
        >
          <Container className="border-x border-dashed border-deep-soft/40 py-8 lg:px-10">
            <div className="bg-paper p-4 text-center font-mono text-xs text-ink-soft">max-w-[1400px] · px-5 / sm:px-8 / lg:px-[13.5rem]</div>
          </Container>
        </ComponentSpecimen>
      </Split>

      <ComponentSpecimen
        name="Credits"
        source="components/sections/credits.tsx"
        description="Who is behind it, live: a tagline, a hairline drawn down in 1.4s, and three names in the condensed face that open to a line each — the accordion restyled, its chevron swapped for a + that turns to ×."
        code={`<Credits />`}
        previewClassName="p-0 sm:p-0"
      >
        <Credits />
      </ComponentSpecimen>

      <SectionIndex />

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-[var(--radius-card)] border border-dashed border-ink/20 p-5">
          <p className="label">SiteHeader and ScrollRail</p>
          <p className="mt-2 text-body text-ink-soft">
            Fixed to the window over the home page, so they are shown in part here: the Badge and the phone Sheet
            above. On wide screens the header adds “{nav.primary.label.join(" ")}” in the condensed face with an
            underline that draws back on hover, and the rail on the left counts 00–100 down a hairline. Both take
            paper or ink from the section underneath (<code className="font-mono text-xs">useToneAt</code>).
          </p>
        </div>
        <div className="rounded-[var(--radius-card)] border border-dashed border-ink/20 p-5">
          <p className="label">SiteFooter</p>
          <p className="mt-2 text-body text-ink-soft">
            Live at the bottom of this page: the pergola strip, the phone number lettering itself in, the office, the
            small print and the Pexels credit. {brand.name} ends every page on it.
          </p>
        </div>
      </div>
    </div>
  )
}
