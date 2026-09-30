import { useCanvasAction } from "@canvas/react"
import { ArrowRight, CircleCheck, Landmark, Plus } from "lucide-react"
import { useRef, useState, type ReactNode } from "react"
import { useScroll } from "motion/react"

import { ComponentSpecimen, GroupLabel, StateLabel } from "@/components/brand/specimen"
import { EmailCapture } from "@/components/blocks/email-capture"
import { ClaimCard, InsurerMonogram, PhotoTile, RenewalCard, ReviewCard } from "@/components/blocks/mini-cards"
import { TaskPanel, TaskRow } from "@/components/blocks/task-panel"
import { TestimonialCard } from "@/components/blocks/testimonial-card"
import { ClipCard } from "@/components/motion/clip-card"
import { ClipZoomVideo } from "@/components/motion/clip-zoom-video"
import { DotMap } from "@/components/motion/dot-map"
import { FloatTile } from "@/components/motion/float-tile"
import { StageProgress } from "@/components/motion/progress"
import { Reveal } from "@/components/motion/reveal"
import { Ticker } from "@/components/motion/ticker"
import { TypeLine } from "@/components/motion/type-line"
import { Closing } from "@/components/sections/closing"
import { Faq } from "@/components/sections/faq"
import { AskPanel, LoopPanel, PoliciesPanel } from "@/components/sections/features"
import { HowItWorks } from "@/components/sections/how-it-works"
import { StoryButton, stories } from "@/components/sections/proof"
import { SiteNav } from "@/components/site-nav"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button, ButtonLink } from "@/components/ui/button"
import { Chip } from "@/components/ui/chip"
import { Container } from "@/components/ui/container"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { LogoMark, Wordmark } from "@/components/ui/logo-mark"
import { SectionHeading } from "@/components/ui/section-heading"
import { faqs, media, photo } from "@/content"

/* ─── Primitives: components/ui ───────────────────────────────────────── */

const VARIANTS = ["ink", "white", "ghost"] as const
const SIZES = ["default", "sm", "icon"] as const

/** Hover, press and focus drawn on, so they can be seen without a pointer. */
const HOVER = { ink: "bg-ink", white: "bg-surface-soft", ghost: "bg-sand-deep" } as const
const FOCUS = "ring-2 ring-ink/30 ring-offset-2 ring-offset-paper"

export function ButtonSpecimen() {
  return (
    <ComponentSpecimen
      name="Button"
      source="components/ui/button.tsx"
      description="shadcn's button in Glovebox's hand: a small square-shouldered pill with a 10px radius, 15px text, a quiet 0.97 press and no shadow of its own — except the white key's lit edge. ButtonLink is the same recipe on an anchor."
      code={`import { Button, ButtonLink } from "@/components/ui/button"

<Button>Get started</Button>
<Button variant="white">Get started</Button>
<ButtonLink href="#top" variant="ink">Get started</ButtonLink>`}
    >
      <div className="space-y-8">
        {VARIANTS.map((variant) => (
          <div key={variant} className="flex flex-wrap items-end gap-x-6 gap-y-4">
            <span className="w-full font-mono text-[11px] text-muted sm:w-14">{variant}</span>
            <StateLabel label="default">
              <Button variant={variant}>Get started</Button>
            </StateLabel>
            <StateLabel label="hover">
              <Button variant={variant} className={HOVER[variant]}>
                Get started
              </Button>
            </StateLabel>
            <StateLabel label="pressed">
              <Button variant={variant} className="scale-[0.97]">
                Get started
              </Button>
            </StateLabel>
            <StateLabel label="focus">
              <Button variant={variant} className={FOCUS}>
                Get started
              </Button>
            </StateLabel>
            <StateLabel label="disabled">
              <Button variant={variant} disabled>
                Get started
              </Button>
            </StateLabel>
            <StateLabel label="with icon">
              <Button variant={variant}>
                Get started <ArrowRight />
              </Button>
            </StateLabel>
          </div>
        ))}
        <div className="flex flex-wrap items-end gap-6">
          <span className="w-full font-mono text-[11px] text-muted sm:w-14">sizes</span>
          {SIZES.map((size) => (
            <StateLabel key={size} label={size}>
              <Button size={size} aria-label={size === "icon" ? "Add" : undefined}>
                {size === "icon" ? <Plus /> : "Get started"}
              </Button>
            </StateLabel>
          ))}
          <StateLabel label="ButtonLink">
            <ButtonLink href="#components" variant="white">
              As a link
            </ButtonLink>
          </StateLabel>
        </div>
      </div>
    </ComponentSpecimen>
  )
}

export function ChipSpecimen() {
  return (
    <ComponentSpecimen
      name="Chip"
      source="components/ui/chip.tsx"
      description="A small monospaced status tag in three tones — link for what happened, money for what it's worth, neutral for a car's plate. Takes an icon at 12px."
      code={`<Chip tone="link"><Landmark />Imported</Chip>
<Chip tone="money"><CircleCheck />2 cars covered</Chip>
<Chip>2021 Honda Civic</Chip>`}
    >
      <div className="flex flex-wrap items-end gap-6">
        <StateLabel label="link">
          <Chip tone="link">
            <Landmark />
            Imported
          </Chip>
        </StateLabel>
        <StateLabel label="money">
          <Chip tone="money">
            <CircleCheck />2 cars covered
          </Chip>
        </StateLabel>
        <StateLabel label="neutral">
          <Chip>2021 Honda Civic</Chip>
        </StateLabel>
        <StateLabel label="neutral on surface">
          <span className="rounded-tile bg-surface p-2 shadow-card">
            <Chip className="bg-surface">Quote</Chip>
          </span>
        </StateLabel>
      </div>
    </ComponentSpecimen>
  )
}

export function AccordionSpecimen() {
  return (
    <ComponentSpecimen
      name="Accordion"
      source="components/ui/accordion.tsx"
      description="shadcn's accordion on Radix: each item a white tile on paper, the chevron turning and the panel opening in 260ms, closing in 200ms."
      code={`<Accordion type="single" collapsible className="space-y-2">
  <AccordionItem value="q0">
    <AccordionTrigger>How do I get started?</AccordionTrigger>
    <AccordionContent>Enter your email, then connect your insurer…</AccordionContent>
  </AccordionItem>
</Accordion>`}
    >
      <Accordion type="single" collapsible defaultValue="g1" className="mx-auto max-w-[38rem] space-y-2">
        {faqs.slice(0, 3).map((item, index) => (
          <AccordionItem key={item.q} value={`g${index}`}>
            <AccordionTrigger>{item.q}</AccordionTrigger>
            <AccordionContent>{item.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="mx-auto mt-6 grid max-w-[38rem] gap-2">
        <StateLabel label="focus" className="items-stretch">
          <div className="rounded-panel bg-surface shadow-hairline">
            <div className="flex min-h-14 items-center justify-between rounded-panel px-5 text-[15px] text-ink ring-2 ring-ink/20 sm:px-6">
              Is my data secure?
            </div>
          </div>
        </StateLabel>
      </div>
    </ComponentSpecimen>
  )
}

export function DialogSpecimen() {
  const [open, setOpen] = useState(false)
  useCanvasAction("Dialog open", (next) => setOpen(next ?? !open), { on: open, group: "Brand guidelines" })
  return (
    <ComponentSpecimen
      name="Dialog"
      source="components/ui/dialog.tsx"
      description="shadcn's dialog on Radix, dark and frameless for film: an ink overlay with a light blur, the panel scaling up from 0.96 over 260ms, a frosted close button."
      code={`<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger>Watch Hana's story</DialogTrigger>
  <DialogContent>
    <DialogTitle>Hana's story</DialogTitle>
    <video src={media.story.src} controls className="aspect-video w-full" />
  </DialogContent>
</Dialog>`}
    >
      <Dialog open={open} onOpenChange={setOpen}>
        <div className="flex flex-wrap items-center gap-4">
          <DialogTrigger asChild>
            <Button variant="white">Open the dialog</Button>
          </DialogTrigger>
          <span className="text-[14px] text-muted">Also a switch in the editor's Actions row.</span>
        </div>
        <DialogContent>
          <DialogTitle>Sample dialog</DialogTitle>
          <div className="relative aspect-video w-full">
            <img src={media.story.poster} alt="" className="absolute inset-0 size-full object-cover" />
            <div className="absolute inset-0 bg-scrim" />
            <p className="absolute inset-x-6 bottom-6 font-display text-[clamp(1.5rem,2vw+1rem,2.5rem)] leading-tight text-surface">
              A member's film plays here.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </ComponentSpecimen>
  )
}

export function SmallPrimitives() {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <ComponentSpecimen
        name="LogoMark · Wordmark"
        source="components/ui/logo-mark.tsx"
        description="The mark in currentColor, and the mark with the name in Newsreader as the nav's first key shows it."
        code={`<LogoMark className="size-10 text-ink" />
<Wordmark />`}
      >
        <div className="flex flex-wrap items-center gap-8">
          <StateLabel label="LogoMark">
            <LogoMark className="size-10 text-ink" />
          </StateLabel>
          <StateLabel label="Wordmark">
            <Wordmark className="text-ink" />
          </StateLabel>
          <StateLabel label="on ink">
            <span className="rounded-control bg-ink-strong px-3 py-2 text-surface">
              <Wordmark />
            </span>
          </StateLabel>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Container"
        source="components/ui/container.tsx"
        description="Centres every section at 120rem with 16 / 24 / 32px gutters. Marked data-canvas-ignore, so the editor clicks through it."
        code={`<Container className="flex flex-col items-center">…</Container>`}
        previewClassName="px-0 sm:px-0"
      >
        <Container className="border-x border-dashed border-faint py-2">
          <div className="rounded-tile bg-surface p-4 text-center font-mono text-[12px] text-muted shadow-hairline">
            max-w-[120rem] · px-4 sm:px-6 lg:px-8
          </div>
        </Container>
      </ComponentSpecimen>

      <div className="lg:col-span-2">
        <ComponentSpecimen
          name="SectionHeading"
          source="components/ui/section-heading.tsx"
          description="Every serif headline: balanced, tight, italic where an <em> says so. Two sizes, centred or left."
          code={`<SectionHeading>How Glovebox works</SectionHeading>
<SectionHeading size="lg">AI that runs your<br />car insurance</SectionHeading>
<SectionHeading align="left">FAQ</SectionHeading>`}
        >
          <div className="grid gap-10 md:grid-cols-2">
            <StateLabel label="md · center" className="items-stretch">
              <SectionHeading>How Glovebox works</SectionHeading>
            </StateLabel>
            <StateLabel label="lg · center" className="items-stretch">
              <SectionHeading size="lg">
                AI that runs your <em>car insurance</em>
              </SectionHeading>
            </StateLabel>
            <StateLabel label="md · left" className="items-stretch">
              <SectionHeading align="left">Trusted by 40,000+ drivers</SectionHeading>
            </StateLabel>
          </div>
        </ComponentSpecimen>
      </div>
    </div>
  )
}

/* ─── Blocks ──────────────────────────────────────────────────────────── */

function Footage({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-panel bg-ink ${className ?? ""}`}>
      <img src={media.hero.poster} alt="" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-scrim" />
      <div className="relative">{children}</div>
    </div>
  )
}

export function EmailCaptureSpecimen() {
  return (
    <ComponentSpecimen
      name="EmailCapture"
      source="components/blocks/email-capture.tsx"
      description="The sign-up: an email field and a button in one tray — frosted glass on footage, sand on paper. Sending swaps the tray for a confirmation in place, so nothing jumps. Try it; nothing is sent."
      code={`<EmailCapture tone="glass" group="Hero" />
<EmailCapture tone="paper" cta="Join" group="Footer" />`}
    >
      <div className="grid gap-6 md:grid-cols-2">
        <StateLabel label="glass — on footage" className="items-stretch">
          <Footage className="flex justify-center p-8">
            <EmailCapture tone="glass" group="Brand guidelines" />
          </Footage>
        </StateLabel>
        <StateLabel label="paper" className="items-stretch">
          <div className="flex justify-center rounded-panel bg-surface p-8 shadow-hairline">
            <EmailCapture tone="paper" group="Brand guidelines (paper)" />
          </div>
        </StateLabel>
      </div>
    </ComponentSpecimen>
  )
}

export function TaskSpecimen() {
  return (
    <ComponentSpecimen
      name="TaskPanel · TaskRow"
      source="components/blocks/task-panel.tsx"
      description="The “Glovebox working…” card that floats over each feature's footage, and one job in it: running (a slow spinner), queued (a dashed ring) or done (a green tick, the status turning money green)."
      code={`<TaskPanel>
  <TaskRow icon="search" label="Reading policy from Harbor Mutual" state="done" status="3 cars, 4 drivers" />
  <TaskRow icon="shield" label="Checking the excess" state="running" status="Reading…" />
  <TaskRow icon="gauge" label="Update the Civic's mileage" state="queued" status="Next week" />
</TaskPanel>`}
      previewClassName="bg-sand"
    >
      <TaskPanel className="mx-auto">
        <TaskRow icon="search" label="Reading policy from Harbor Mutual" state="done" status="3 cars, 4 drivers" />
        <TaskRow icon="shield" label="Checking the excess on the Outback" state="running" status="Reading…" />
        <TaskRow icon="filter" label="Compare 41 renewal quotes" state="done" status="$312 cheaper" />
        <TaskRow icon="refresh" label="Switch the Outback to Northway" state="running" status="Waiting on you" />
        <TaskRow icon="gauge" label="Update the Civic's mileage" state="queued" status="Next week" />
      </TaskPanel>
    </ComponentSpecimen>
  )
}

export function MiniCardSpecimens() {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <ComponentSpecimen
        name="RenewalCard · ClaimCard · ReviewCard"
        source="components/blocks/mini-cards.tsx"
        description="The glances at Glovebox's work that drift around the statistic. Every field is a prop."
        code={`<RenewalCard insurer="Northway Direct" amount="$892.00" />
<ClaimCard item="Windscreen repair" amount="$340.00" />
<ReviewCard />`}
        previewClassName="bg-paper"
      >
        <div className="flex flex-wrap justify-center gap-5">
          <RenewalCard />
          <ClaimCard />
          <ReviewCard />
        </div>
      </ComponentSpecimen>

      <div className="grid min-w-0 gap-8">
        <ComponentSpecimen
          name="InsurerMonogram"
          source="components/blocks/mini-cards.tsx"
          description="An insurer's initial in Newsreader on an ink tile; recoloured and resized by the caller."
          code={`<InsurerMonogram letter="N" />
<InsurerMonogram letter="N" className="size-9 rounded-[0.5rem] bg-link text-base" />`}
        >
          <div className="flex items-center gap-4">
            <InsurerMonogram letter="H" />
            <InsurerMonogram letter="N" className="size-9 rounded-[0.5rem] bg-link text-base" />
            <InsurerMonogram letter="H" className="size-9 rounded-[0.5rem] text-base" />
          </div>
        </ComponentSpecimen>
        <ComponentSpecimen
          name="PhotoTile"
          source="components/blocks/mini-cards.tsx"
          description="A photograph in the scatter: tile radius, float shadow, sized by the caller."
          code={`<PhotoTile src={photo(97079, 500)} alt="…" className="h-44 w-40" />`}
        >
          <div className="flex gap-4">
            <PhotoTile src={photo(97079, 400)} alt="A hand holding out a set of car keys" className="h-32 w-28" />
            <PhotoTile src={photo(19477337, 400)} alt="Hands resting on a steering wheel" className="h-32 w-28" />
          </div>
        </ComponentSpecimen>
      </div>

      <div className="lg:col-span-2">
        <ComponentSpecimen
          name="TestimonialCard"
          source="components/blocks/testimonial-card.tsx"
          description="A member's words beside their photo, on a white card with the float shadow; the car in a neutral chip."
          code={`<TestimonialCard quote="…" name="Priya Raman" car="2021 Honda Civic" image={photo(3783083, 900)} alt="…" />`}
        >
          <div className="flex justify-center">
            <TestimonialCard {...stories[0]} />
          </div>
        </ComponentSpecimen>
      </div>
    </div>
  )
}

/* ─── Motion components ───────────────────────────────────────────────── */

export function ReplaySpecimens() {
  const [reveal, setReveal] = useState(0)
  const [typed, setTyped] = useState(0)
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <ComponentSpecimen
        name="Reveal"
        source="components/motion/reveal.tsx"
        description="The page's one entrance: a short rise with a slight de-blur, once. distance, duration, delay and blur are props; 0 blur is a plain fade-up."
        code={`<Reveal delay={0.08}>
  <SectionHeading>FAQ</SectionHeading>
</Reveal>`}
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div key={reveal} className="grid gap-2">
            <Reveal>
              <SectionHeading align="left">Every policy</SectionHeading>
            </Reveal>
            <Reveal delay={0.12} blur={0}>
              <p className="text-[15px] text-muted">…and a line after it, blur 0.</p>
            </Reveal>
          </div>
          <Button variant="white" size="sm" onClick={() => setReveal((n) => n + 1)}>
            Replay
          </Button>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="TypeLine"
        source="components/motion/type-line.tsx"
        description="A question typed a character at a time the first time it is seen, with a blinking caret. speed in characters a second; whole at once under reduced motion or in the editor."
        code={`<TypeLine text="Am I covered if Sam drives the Outback this weekend?" speed={38} />`}
      >
        <div className="flex flex-col items-start gap-4">
          <div className="flex min-h-14 w-full items-center gap-3 rounded-full bg-surface py-2 pr-2 pl-4 shadow-panel">
            <Plus className="size-5 shrink-0 text-muted" strokeWidth={1.4} />
            <TypeLine key={typed} text="What's my excess on the Civic?" className="min-w-0 flex-1 text-[15px] text-ink" />
          </div>
          <Button variant="white" size="sm" onClick={() => setTyped((n) => n + 1)}>
            Type again
          </Button>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Ticker"
        source="components/motion/ticker.tsx"
        description="What Glovebox just did, rolling up to the next line every interval seconds. White on footage; paused holds it."
        code={`<Ticker interval={2.6} />`}
      >
        <Footage className="px-4 py-10">
          <Ticker />
        </Footage>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="DotMap"
        source="components/motion/dot-map.tsx"
        description="The country as pale dots with members' cities in ink, sweeping in west to east the first time it is seen. columns sets the grain, sweep the seconds."
        code={`<DotMap columns={76} sweep={1.4} />`}
      >
        <DotMap />
      </ComponentSpecimen>
    </div>
  )
}

/** A small pinned-looking stage for FloatTile: its progress is this frame's
 *  own pass through the window, handed down the way a pinned section does. */
function FloatStage() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  return (
    <StageProgress.Provider value={scrollYProgress}>
      <div ref={ref} className="relative h-[26rem] overflow-hidden rounded-panel bg-paper shadow-hairline">
        <FloatTile x={4} y={30} depth={0.3}>
          <PhotoTile src={photo(97079, 400)} alt="A hand holding out a set of car keys" className="h-28 w-24" />
        </FloatTile>
        <FloatTile x={62} y={40} depth={0.55} className="hidden sm:block">
          <RenewalCard />
        </FloatTile>
        <FloatTile x={30} y={62} depth={0.8}>
          <PhotoTile src={photo(19477337, 400)} alt="Hands resting on a steering wheel" className="h-24 w-24" />
        </FloatTile>
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <p className="font-display text-[clamp(3rem,4vw+1.5rem,5rem)] leading-none tracking-[-0.03em] text-ink tabular">92%</p>
        </div>
      </div>
    </StageProgress.Provider>
  )
}

export function StageSpecimens() {
  return (
    <div className="space-y-8">
      <ComponentSpecimen
        name="ClipZoomVideo"
        source="components/motion/clip-zoom-video.tsx"
        description="A video in a frame that clip-path closes toward the centre (close) or opens from it (open) as the page scrolls, while the footage zooms against it. pin holds it for extra screens; insetX, insetY, radius, openRadius, zoom, scrim and paused are all scalar props."
        note="Shown unpinned (pin 0) in frames — scroll past them to see each move. The hero's pinned version runs on the home page."
        code={`<ClipZoomVideo src={media.hero.src} poster={media.hero.poster} mode="close" pin={0.9} insetX={9} insetY={11} radius={44} zoom={1.32}>
  …copy over the footage…
</ClipZoomVideo>`}
        previewClassName="p-3 sm:p-4"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <StateLabel label='mode="close"' className="items-stretch">
            <ClipZoomVideo src={media.hero.src} poster={media.hero.poster} mode="close" pin={0} insetX={9} insetY={11} radius={44} zoom={1.32} label="Close sample" className="h-[22rem]">
              <p className="absolute inset-0 grid place-items-center px-4 text-center font-display text-[2rem] leading-tight text-surface">
                You drive the car.
              </p>
            </ClipZoomVideo>
          </StateLabel>
          <StateLabel label='mode="open"' className="items-stretch">
            <ClipZoomVideo src={media.closing.src} poster={media.closing.poster} mode="open" pin={0} insetX={14} insetY={16} radius={80} openRadius={24} zoom={1.35} scrim={0.22} label="Open sample" className="h-[22rem]">
              <p className="absolute inset-0 grid place-items-center px-4 text-center font-display text-[2rem] leading-tight text-surface">
                One quiet place
              </p>
            </ClipZoomVideo>
          </StateLabel>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="ClipCard"
        source="components/motion/clip-card.tsx"
        description="A rounded card of blurred footage that waits narrowed by a clip inset and widens to full as it reaches the middle of the screen, the footage easing back from a zoom. insetX, radius, zoom, blur and paused are props."
        note="Shown on its own; on the home page three of them pin and stack over one another."
        code={`<ClipCard src={media.policies.src} poster={media.policies.poster} radius={48} className="grid aspect-[3/2] place-items-center">
  <TaskPanel>…</TaskPanel>
</ClipCard>`}
        previewClassName="p-3 sm:p-4"
      >
        <ClipCard src={media.policies.src} poster={media.policies.poster} radius={40} className="grid aspect-[4/5] place-items-center px-4 sm:aspect-[16/10] sm:px-10">
          <PoliciesPanel />
        </ClipCard>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="FloatTile"
        source="components/motion/float-tile.tsx"
        description="A photo or card floating around a pinned statement, drifting upward at its own rate. x and y place it in % of the stage; depth is how far it travels — higher reads as nearer."
        note="Here the stage is this frame's own pass through the window; on the home page it is the pinned statistic."
        code={`<FloatTile x={40} y={-14} depth={0.45}>
  <PhotoTile src={photo(97079, 500)} alt="…" className="h-44 w-40" />
</FloatTile>`}
      >
        <FloatStage />
      </ComponentSpecimen>
    </div>
  )
}

/* ─── Sections ────────────────────────────────────────────────────────── */

export function SectionSpecimens() {
  return (
    <div className="space-y-8">
      <ComponentSpecimen
        name="SiteNav"
        source="components/site-nav.tsx"
        description="One small tray of white keys at the top centre. Frosted glass with the name beside the mark over the hero's footage; sand, mark only, once the footage is behind you."
        note="Drawn in a frame over footage. Which tray it shows follows how far this page is scrolled, as it does on the home page."
        code={`<SiteNav />`}
        previewClassName="p-3 sm:p-4"
      >
        <div className="relative h-28 overflow-hidden rounded-tile bg-ink [transform:translateZ(0)]">
          <img src={media.hero.poster} alt="" className="absolute inset-0 size-full object-cover" />
          <div className="absolute inset-0 bg-scrim" />
          <SiteNav />
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Hero"
        source="components/sections/hero.tsx"
        description="Full-bleed driving footage with the promise over it; scrolling holds the frame while it closes in and the camera pushes in. Built from ClipZoomVideo (close, pin 0.9), Ticker and EmailCapture, all above."
        note="Shown by its parts — the pinned section is two screens tall and runs on the home page."
        code={`<Hero />`}
      >
        <Footage className="px-4 py-12 text-center text-surface">
          <h4 className="font-display text-[clamp(2.25rem,3vw+1rem,3.75rem)] leading-[0.98] tracking-[-0.03em] text-balance">
            You drive the car.
            <br />
            <em>Not the paperwork.</em>
          </h4>
          <p className="mt-6 text-[15px] sm:text-[17px]">Let Glovebox run your car insurance</p>
          <Ticker className="mt-2 w-full" />
          <div className="mt-6 flex justify-center">
            <EmailCapture tone="glass" group="Brand guidelines (hero)" />
          </div>
        </Footage>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Features · panels"
        source="components/sections/features.tsx"
        description="Three pinned stages that stack; each card's footage carries a live panel that steps through its jobs once, and the third types a question and shows the answer."
        note="Shown in part: the three panels on sand. The pinned, stacking stages run on the home page (ClipCard above is one of them)."
        code={`<Features />`}
        previewClassName="bg-sand"
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <PoliciesPanel />
          <LoopPanel />
          <div className="mx-auto w-full max-w-[35rem] lg:col-span-2">
            <AskPanel />
          </div>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Stat · Proof"
        source="components/sections/stat.tsx · proof.tsx"
        description="The statistic held still while work drifts past it (FloatTile, mini cards), and the member map with stories sliding over it and one member's film behind a button."
        note="Shown by their parts — both sections are pinned for several screens on the home page. The story button opens the real dialog."
        code={`<Stat />
<Proof />`}
      >
        <div className="flex flex-col items-center gap-6">
          <SectionHeading>
            Trusted by 40,000+
            <br />
            drivers nationwide
          </SectionHeading>
          <DotMap className="max-w-3xl" />
          <TestimonialCard {...stories[1]} />
          <StoryButton name="Hana" />
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="HowItWorks"
        source="components/sections/how-it-works.tsx"
        description="Three sand cards, each showing the thing Glovebox produces — a garage, a better quote, a settled claim — built from tiles, dashed threads and chips."
        code={`<HowItWorks />`}
        previewClassName="p-0 sm:p-0"
      >
        <HowItWorks />
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Faq"
        source="components/sections/faq.tsx"
        description="The accordion on white tiles under a centred heading. Its first answer is a switch in the editor's Actions row."
        code={`<Faq />`}
        previewClassName="p-0 pt-12 sm:p-0 sm:pt-16"
      >
        <Faq />
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Closing"
        source="components/sections/closing.tsx"
        description="The hero's move in reverse: the frame opens out from a small window as it arrives, the footage settles back, and the last ask fades in."
        code={`<Closing />`}
        previewClassName="p-0 sm:p-0"
      >
        <Closing />
      </ComponentSpecimen>

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-panel bg-surface p-5 shadow-card">
        <div>
          <p className="font-display text-[1.625rem] leading-tight text-ink">SiteFooter</p>
          <p className="mt-1 text-[15px] text-ink-soft">
            components/site-footer.tsx — live at the foot of this page: the promise again, the links, the small print
            and this guide's link.
          </p>
        </div>
        <code className="rounded-tile bg-ink-strong px-3 py-2 font-mono text-[12px] text-surface">{"<SiteFooter />"}</code>
      </div>
    </div>
  )
}

export function ComponentLibrary() {
  return (
    <div className="space-y-14">
      <div className="space-y-8">
        <GroupLabel>Primitives — components/ui</GroupLabel>
        <ButtonSpecimen />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <ChipSpecimen />
          <DialogSpecimen />
        </div>
        <AccordionSpecimen />
        <SmallPrimitives />
      </div>
      <div className="space-y-8">
        <GroupLabel>Blocks — components/blocks</GroupLabel>
        <EmailCaptureSpecimen />
        <TaskSpecimen />
        <MiniCardSpecimens />
      </div>
      <div className="space-y-8">
        <GroupLabel>Motion — components/motion</GroupLabel>
        <ReplaySpecimens />
        <StageSpecimens />
      </div>
      <div className="space-y-8">
        <GroupLabel>Sections</GroupLabel>
        <SectionSpecimens />
      </div>
    </div>
  )
}
