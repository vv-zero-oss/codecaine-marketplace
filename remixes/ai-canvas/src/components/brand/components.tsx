import { useState, type ReactNode } from "react"
import { useMotionValue, type MotionValue } from "motion/react"
import { ArrowRight, Sparkles } from "lucide-react"

import { ComponentSpecimen, CopyButton, Replay, StateLabel } from "@/components/brand/specimen"
import { CursorChip, type CursorTone } from "@/components/blocks/cursor-chip"
import { Logo, LogoMark } from "@/components/blocks/logo"
import { SceneText } from "@/components/blocks/scene-text"
import { BlurText } from "@/components/motion/blur-text"
import { CyclingImage } from "@/components/motion/cycling-image"
import { FlyingCursors } from "@/components/motion/flying-cursors"
import { InfiniteCanvas } from "@/components/motion/infinite-canvas"
import { ScatterTiles } from "@/components/motion/scatter-tiles"
import { SteppedWords } from "@/components/motion/stepped-words"
import { Typewriter } from "@/components/motion/typewriter"
import { CallToAction } from "@/components/sections/call-to-action"
import { KnowsYourSystem } from "@/components/sections/knows-your-system"
import { PublishedCard, StatusToast, StepList } from "@/components/sections/live-pages"
import { Place, Problem, RunFree, Scatter } from "@/components/sections/scenes"
import { SiteFooter } from "@/components/sections/site-footer"
import { SiteHeader } from "@/components/sections/site-header"
import { Button, ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { live, mockups, scenes, together } from "@/content"
import { HeroWashContext } from "@/hooks/use-hero-wash"
import { cn } from "@/lib/utils"

/* ─── Button ──────────────────────────────────────────────────────────── */

const VARIANTS = ["ink", "paper", "ghost"] as const
const SIZES = ["nav", "default", "hero"] as const

/** Hover and focus drawn on, so both can be seen without a pointer. */
const HOVER = { ink: "bg-button-hover", paper: "bg-field", ghost: "opacity-70" } as const
const FOCUS = "ring-2 ring-ring ring-offset-2"

export function ButtonSpecimen() {
  return (
    <ComponentSpecimen
      name="Button and ButtonLink"
      source="components/ui/button.tsx"
      description="The page’s pills, on a cva recipe. Ink on paper, paper on night, and a ghost for text actions. Press is a 0.97 scale in 140ms; hover is a colour change on devices that can hover. ButtonLink is the same recipe on an anchor, so the layers panel names it."
      code={`import { Button, ButtonLink } from "@/components/ui/button"

<ButtonLink href="#start" size="nav">Sign up</ButtonLink>
<ButtonLink href="#start" variant="paper" size="hero">Start building</ButtonLink>
<ButtonLink href="#start" size="cta">Get started <ArrowRight /></ButtonLink>`}
      previewClassName="p-0 sm:p-0"
    >
      {VARIANTS.map((variant) => (
        <div
          key={variant}
          className={cn(
            "flex flex-wrap items-end gap-x-6 gap-y-4 border-b border-hairline p-5 last:border-b-0 sm:p-8",
            variant === "paper" && "bg-night text-on-night [&_span.font-mono]:text-mist",
          )}
        >
          <span className="w-full font-mono text-[11px] text-mist sm:w-14">{variant}</span>
          <StateLabel label="default">
            <Button variant={variant}>Start building</Button>
          </StateLabel>
          <StateLabel label="hover">
            <Button variant={variant} className={HOVER[variant]}>
              Start building
            </Button>
          </StateLabel>
          <StateLabel label="focus">
            <Button variant={variant} className={cn(FOCUS, variant === "paper" && "ring-offset-night")}>
              Start building
            </Button>
          </StateLabel>
          <StateLabel label="pressed">
            <Button variant={variant} className="scale-[0.97]">
              Start building
            </Button>
          </StateLabel>
          <StateLabel label="disabled">
            <Button variant={variant} disabled>
              Start building
            </Button>
          </StateLabel>
          <StateLabel label="with icon">
            <Button variant={variant}>
              Start building
              <ArrowRight />
            </Button>
          </StateLabel>
        </div>
      ))}
      <div className="flex flex-wrap items-end gap-6 border-t border-hairline p-5 sm:p-8">
        <span className="w-full font-mono text-[11px] text-mist sm:w-14">sizes</span>
        {SIZES.map((size) => (
          <StateLabel key={size} label={size}>
            <Button size={size}>{size === "nav" ? "Sign up" : "Start building"}</Button>
          </StateLabel>
        ))}
        <StateLabel label="ButtonLink">
          <ButtonLink href="#components" variant="ink" size="default">
            As a link
          </ButtonLink>
        </StateLabel>
      </div>
      <div className="border-t border-hairline p-5 sm:p-8">
        <StateLabel label="cta — the closing call, fluid 72 → 146px tall">
          <ButtonLink href="#components" size="cta" className="group/cta">
            Get started
            <ArrowRight
              className="transition-transform duration-(--duration-hover) ease-out-strong group-hover/cta:translate-x-1.5"
              aria-hidden
            />
          </ButtonLink>
        </StateLabel>
      </div>
    </ComponentSpecimen>
  )
}

/* ─── Header faces ────────────────────────────────────────────────────── */

/** A frame with a transform, so the header's `position: fixed` pins to the
 *  frame instead of the window. */
function HeaderFrame({ wash, night }: { wash: MotionValue<number>; night: boolean }) {
  return (
    <HeroWashContext.Provider value={wash}>
      <div className={cn("relative h-nav overflow-hidden rounded-frame [transform:translateZ(0)]", night ? "bg-night" : "bg-paper shadow-chip")}>
        <SiteHeader />
      </div>
    </HeroWashContext.Provider>
  )
}

export function HeaderSpecimen() {
  const nightWash = useMotionValue(0)
  const paperWash = useMotionValue(1)
  return (
    <ComponentSpecimen
      name="SiteHeader"
      source="components/sections/site-header.tsx"
      description="Two faces: white over the night canvas, ink on paper — it changes face when the hero has washed half way, as a 400ms colour transition. The agent’s prompt sits where a search would be. Below 1024px the links move into a Sheet (the “Mobile menu” action)."
      code={`<HeroWashContext.Provider value={wash}>
  <SiteHeader />
</HeroWashContext.Provider>`}
    >
      <div className="space-y-6">
        <StateLabel label="night face — wash < 0.5" className="[&>div]:w-full">
          <HeaderFrame wash={nightWash} night />
        </StateLabel>
        <StateLabel label="paper face — wash ≥ 0.5" className="[&>div]:w-full">
          <HeaderFrame wash={paperWash} night={false} />
        </StateLabel>
      </div>
    </ComponentSpecimen>
  )
}

/* ─── Motion pieces with a knob ───────────────────────────────────────── */

function Slider({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <label className="flex w-full items-center gap-3 text-[13px] text-ink-soft">
      <span className="w-20 shrink-0">{label}</span>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-11 min-w-0 flex-1 accent-(--mauve-900)"
      />
      <span className="w-10 text-right font-mono text-[11px] text-mist tabular-nums">{value.toFixed(2)}</span>
    </label>
  )
}

export function CanvasSpecimen() {
  const wash = useMotionValue(0)
  const [value, setValue] = useState(0)
  const [direction, setDirection] = useState<"diagonal" | "left" | "up">("diagonal")
  return (
    <ComponentSpecimen
      name="InfiniteCanvas"
      source="components/motion/infinite-canvas.tsx"
      description={
        <>
          The hero’s WebGL canvas: photos, frames, live pages and agents drifting forever, with motion blur that follows
          velocity. Drag it. The drift is a GSAP tween held in a ref, so the editor’s Motion switch stops it (“Canvas
          drift”). Shown here in a frame; on the home page it is pinned for two screens while it washes out to paper —
          that hand-over (the <code className="font-mono text-[12px]">Hero</code> section) is only on the home page.
        </>
      }
      code={`<InfiniteCanvas speed={18} direction="diagonal" motionBlur={1} intro="warp" wash={wash} className="absolute inset-0" />`}
      previewClassName="space-y-4"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-frame bg-night sm:aspect-video">
        <InfiniteCanvas wash={wash} direction={direction} className="absolute inset-0" />
      </div>
      <Slider
        label="wash"
        value={value}
        onChange={(v) => {
          setValue(v)
          wash.set(v)
        }}
      />
      <div className="flex flex-wrap gap-2">
        {(["diagonal", "left", "up"] as const).map((d) => (
          <Button key={d} size="nav" variant={d === direction ? "ink" : "paper"} className={cn(d !== direction && "shadow-chip")} onClick={() => setDirection(d)}>
            {d}
          </Button>
        ))}
      </div>
    </ComponentSpecimen>
  )
}

export function CursorsSpecimen() {
  const progress = useMotionValue(0.2)
  const [value, setValue] = useState(0.2)
  return (
    <ComponentSpecimen
      name="FlyingCursors"
      source="components/motion/flying-cursors.tsx"
      description="People and agents drifting on their own, gathering round the headline as progress goes 0 → 1; they blur with the speed of the change. On the home page progress is the scroll through the pinned “Together” section — here it is the slider."
      code={`<FlyingCursors cursors={together.cursors} progress={gather} wander={10} />`}
      previewClassName="space-y-4"
    >
      <div className="relative h-80 overflow-hidden rounded-frame bg-paper shadow-chip">
        <FlyingCursors cursors={together.cursors} progress={progress} />
        <div className="absolute inset-0 grid place-items-center px-6">
          <SceneText first={value < 0.5 ? together.before : together.after} className="text-[clamp(20px,2.2vw,30px)]" />
        </div>
      </div>
      <Slider
        label="progress"
        value={value}
        onChange={(v) => {
          setValue(v)
          progress.set(v)
        }}
      />
    </ComponentSpecimen>
  )
}

export function LivePagesSpecimen() {
  const [step, setStep] = useState(0)
  return (
    <ComponentSpecimen
      name="StepList, StatusToast and PublishedCard"
      source="components/sections/live-pages.tsx"
      description="The pieces of the pinned three-step product walk (“Live pages” — Prompt / Shape / Publish in the editor’s Actions). Each step swaps the shot, the toast and the copy with a blur crossfade. Here the tabs pick the step; on the home page the scroll does."
      code={`<StepList step={step} />
<StatusToast status={live.steps[step].status} version={live.steps[step].version} step={step} />
<PublishedCard shown={step === 2} />`}
      previewClassName="space-y-6"
    >
      <div role="tablist" aria-label="Step" className="flex flex-wrap gap-2">
        {live.steps.map((item, i) => (
          <Button
            key={item.title}
            role="tab"
            aria-selected={i === step}
            size="nav"
            variant={i === step ? "ink" : "paper"}
            className={cn(i !== step && "shadow-chip")}
            onClick={() => setStep(i)}
          >
            {["Prompt", "Shape", "Publish"][i]}
          </Button>
        ))}
      </div>
      <div className="grid items-center gap-8 pb-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,8fr)] lg:gap-12">
        <StepList step={step} />
        <div className="relative">
          <div aria-hidden className="absolute inset-x-[-8%] -top-1/4 bottom-[-18%] bg-mauve-glow opacity-80" />
          <div className="relative aspect-[1600/918] overflow-hidden rounded-frame bg-paper shadow-card">
            <img src={step === 0 ? mockups.dark.src : mockups.light.src} alt={step === 0 ? mockups.dark.alt : mockups.light.alt} className="absolute inset-0 size-full object-cover" />
            <StatusToast status={live.steps[step].status} version={live.steps[step].version} step={step} />
          </div>
          <PublishedCard shown={step === 2} />
        </div>
      </div>
    </ComponentSpecimen>
  )
}

/* ─── The library ─────────────────────────────────────────────────────── */

const TONES: CursorTone[] = ["1", "2", "3", "4", "5", "6"]

/** A scene section shown shorter than its full screen. */
function SceneFrame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <StateLabel label={label} className="[&>div:first-child]:w-full">
      <div className="overflow-hidden rounded-frame bg-paper shadow-chip [&>section]:min-h-[22rem]">{children}</div>
    </StateLabel>
  )
}

export function ComponentLibrary() {
  return (
    <div className="space-y-8">
      <ButtonSpecimen />

      <div className="grid items-start gap-8 lg:grid-cols-2">
        <ComponentSpecimen
          name="Sheet"
          source="components/ui/sheet.tsx"
          description="shadcn’s sheet on Radix Dialog. Slides in on the drawer curve in 320ms and out the way it came in 220ms; under reduced motion it only fades."
          code={`<Sheet open={open} onOpenChange={setOpen}>
  <SheetTrigger>Menu</SheetTrigger>
  <SheetContent side="right">
    <SheetTitle>Menu</SheetTitle>
  </SheetContent>
</Sheet>`}
        >
          <div className="flex flex-wrap gap-3">
            {(["right", "left", "bottom"] as const).map((side) => (
              <Sheet key={side}>
                <SheetTrigger asChild>
                  <Button variant="paper" className="shadow-chip">
                    Open {side}
                  </Button>
                </SheetTrigger>
                <SheetContent side={side} className={cn(side === "bottom" ? "p-6 pb-10" : "p-6 pt-16")}>
                  <SheetHeader className="p-0">
                    <SheetTitle>Menu</SheetTitle>
                    <SheetDescription>A sheet from the {side}.</SheetDescription>
                  </SheetHeader>
                  <p className="text-[22px] font-medium tracking-scene">Product</p>
                  <p className="text-[22px] font-medium tracking-scene">Agents</p>
                </SheetContent>
              </Sheet>
            ))}
          </div>
        </ComponentSpecimen>

        <ComponentSpecimen
          name="Logo and LogoMark"
          source="components/blocks/logo.tsx"
          description="Mark and name, as the header shows them; the mark alone in the footer. The name inherits the text colour, so one component serves both faces."
          code={`<Logo />
<Logo showName={false} />
<LogoMark className="size-5 rounded-[6px]" />`}
          previewClassName="p-0 sm:p-0"
        >
          <div className="grid grid-cols-2">
            <div className="flex flex-wrap items-center gap-6 p-5 sm:p-8">
              <StateLabel label="Logo">
                <Logo />
              </StateLabel>
              <StateLabel label="showName=false">
                <Logo showName={false} />
              </StateLabel>
              <StateLabel label="LogoMark">
                <LogoMark className="size-5 rounded-[6px]" />
              </StateLabel>
            </div>
            <div className="flex items-center gap-6 bg-night p-5 text-on-night sm:p-8">
              <StateLabel label="on night">
                <Logo />
              </StateLabel>
            </div>
          </div>
        </ComponentSpecimen>

        <ComponentSpecimen
          name="CursorChip"
          source="components/blocks/cursor-chip.tsx"
          description="A collaborator’s pointer and name. Six tones; an agent’s name carries the sparkle."
          code={`<CursorChip name="Maya" tone="2" />
<CursorChip name="Layout agent" agent tone="1" />`}
        >
          <div className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3">
            {TONES.map((tone, i) => (
              <StateLabel key={tone} label={`tone ${tone}${i % 3 === 1 ? " · agent" : ""}`}>
                <CursorChip name={together.cursors[i].name} agent={i % 3 === 1} tone={tone} />
              </StateLabel>
            ))}
          </div>
        </ComponentSpecimen>

        <ComponentSpecimen
          name="SceneText"
          source="components/blocks/scene-text.tsx"
          description="The story’s voice: one or two short lines, centred, in the scene size. Every white scene speaks through it."
          code={`<SceneText first="Great work isn't prompted." second="It's shaped." />`}
          previewClassName="bg-paper"
        >
          <div className="space-y-8 py-4">
            <SceneText first={scenes.opening.first} second={scenes.opening.second} />
            <SceneText first={together.after} className="text-[clamp(20px,2.2vw,30px)]" />
          </div>
        </ComponentSpecimen>

        <ComponentSpecimen
          name="CopyButton"
          source="components/brand/specimen.tsx"
          description="Copies text and swaps to a check for a moment — the copied state. It is on every snippet on this page."
          code={`<CopyButton text="npm run dev" />`}
          previewClassName="bg-night"
        >
          <div className="flex items-center gap-3 font-mono text-[13px] text-on-night">
            npm run dev
            <CopyButton text="npm run dev" />
          </div>
        </ComponentSpecimen>

        <ComponentSpecimen
          name="Container"
          source="components/ui/container.tsx"
          description="The page’s measure: 1440px, the fluid gutter each side. Marked data-canvas-ignore, so the editor clicks through it."
          code={`<Container className="flex flex-col gap-6">…</Container>`}
          previewClassName="p-0 sm:p-0"
        >
          <Container className="border-x border-dashed border-mauve-500/60 py-6">
            <div className="rounded-frame bg-paper p-4 text-center text-[13px] text-ink-soft shadow-chip">
              max-w-[1440px] · px-gutter · mx-auto
            </div>
          </Container>
        </ComponentSpecimen>
      </div>

      <HeaderSpecimen />

      <ComponentSpecimen
        name="SiteFooter"
        source="components/sections/site-footer.tsx"
        description="Small and quiet: the mark, the name and the year on the left, two groups of links on the right. “Brand guidelines” leads here."
        code={`<SiteFooter />`}
        previewClassName="p-0 sm:p-0 bg-paper"
      >
        <SiteFooter />
      </ComponentSpecimen>

      <h3 className="pt-8 text-[22px] font-medium tracking-scene">Motion</h3>

      <div className="grid items-start gap-8 lg:grid-cols-2">
        <ComponentSpecimen
          name="BlurText"
          source="components/motion/blur-text.tsx"
          description="Words that arrive out of focus and sharpen — no travel, only blur and opacity, 0.6s each. By word (staggered), by line (one beat), or from the muted ink. It plays when it scrolls into view; Replay plays it again."
          code={`<BlurText text="Frame by frame." by="line" />
<BlurText text="They were built to hand off, not to ship." delay={0.35} />
<BlurText text="A place to begin." by="line" from="muted" />`}
          previewClassName="bg-paper"
        >
          <Replay>
            {(key) => (
              <div key={key} className="space-y-5 text-[clamp(22px,2.2vw,30px)] font-medium tracking-scene">
                <StateLabel label='by="word"'>
                  <BlurText text={scenes.problem.second} />
                </StateLabel>
                <StateLabel label='by="line"'>
                  <BlurText text={scenes.scatter.first} by="line" />
                </StateLabel>
                <StateLabel label='from="muted"'>
                  <BlurText text={scenes.place.fourth} by="line" from="muted" />
                </StateLabel>
              </div>
            )}
          </Replay>
        </ComponentSpecimen>

        <ComponentSpecimen
          name="Typewriter"
          source="components/motion/typewriter.tsx"
          description="A prompt typed a character at a time with a blinking caret. done shows the whole line — the editor’s end state and reduced motion."
          code={`<Typewriter text="Create a primary button" play={inView} done={finished} speed={38} />`}
          previewClassName="bg-paper"
        >
          <div className="flex flex-col gap-6">
            <Replay>
              {(key) => (
                <StateLabel label="playing">
                  <div key={key} className="flex h-11 items-center gap-2 rounded-pill bg-paper px-4 text-[14px] shadow-chip">
                    <Sparkles className="size-3.5 text-mauve-900" aria-hidden />
                    <Typewriter text="Create a primary button" play />
                  </div>
                </StateLabel>
              )}
            </Replay>
            <StateLabel label="done">
              <div className="flex h-11 items-center gap-2 rounded-pill bg-paper px-4 text-[14px] shadow-chip">
                <Sparkles className="size-3.5 text-mauve-900" aria-hidden />
                <Typewriter text="Create a primary button" play={false} done />
              </div>
            </StateLabel>
          </div>
        </ComponentSpecimen>

        <ComponentSpecimen
          name="CyclingImage"
          source="components/motion/cycling-image.tsx"
          description="A round photograph set into a line of text, changing every 1.4s with a blur crossfade. It holds still under reduced motion and whenever the editor’s Motion switch is not on Playing."
          code={`And every frame <CyclingImage interval={1.4} /> evolves.`}
          previewClassName="bg-paper"
        >
          <p className="text-[clamp(22px,2.2vw,30px)] font-medium tracking-scene">
            {scenes.free.before}
            <CyclingImage />
            {scenes.free.after}
          </p>
        </ComponentSpecimen>

        <ComponentSpecimen
          name="ScatterTiles"
          source="components/motion/scatter-tiles.tsx"
          description="Small photographs arriving one by one round a line of text, each on its own clock over spread seconds — a moodboard filling up. The middle stays clear for the words."
          code={`<ScatterTiles count={30} spread={2.2} size={56} seed={3} />`}
          previewClassName="bg-paper"
        >
          <Replay>
            {(key) => (
              <div key={key} className="relative h-72 w-full overflow-hidden rounded-frame bg-paper shadow-chip">
                <ScatterTiles count={18} size={48} />
                <div className="absolute inset-0 grid place-items-center">
                  <SceneText first={scenes.scatter.first} className="text-[clamp(20px,2.2vw,28px)]" />
                </div>
              </div>
            )}
          </Replay>
        </ComponentSpecimen>
      </div>

      <CanvasSpecimen />
      <CursorsSpecimen />

      <ComponentSpecimen
        name="SteppedWords"
        source="components/motion/stepped-words.tsx"
        description="The manifesto: a sentence laid down the mauve panel a word at a time as you scroll, each word sharpening where it lands. The panel pins for the length of the sentence — scroll through this one; it is shorter here (length 1.4) than on the home page."
        code={`<SteppedWords words={["Boundless", "is", "where", "ideas", "go live."]} length={2.6} />`}
        previewClassName="p-0 sm:p-0"
        bleed
      >
        <SteppedWords words={scenes.manifesto} length={1.4} />
      </ComponentSpecimen>

      <LivePagesSpecimen />

      <ComponentSpecimen
        name="ScrollScene and the scenes"
        source="components/motion/scroll-scene.tsx · sections/scenes.tsx"
        description="One screen of the story: words centred, blurring and fading with the scroll as the scene leaves the top. Scatter, Problem, RunFree and Place are built from it and BlurText. On the page each is a full screen; here they are shown shorter."
        code={`<ScrollScene id="problem" backdrop={<ScatterTiles />}>
  <p className="text-scene font-medium tracking-scene">…</p>
</ScrollScene>`}
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <SceneFrame label="Scatter">
            <Scatter />
          </SceneFrame>
          <SceneFrame label="Problem">
            <Problem />
          </SceneFrame>
          <SceneFrame label="RunFree">
            <RunFree />
          </SceneFrame>
          <SceneFrame label="Place">
            <Place />
          </SceneFrame>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="KnowsYourSystem"
        source="components/sections/knows-your-system.tsx"
        description="An agent building from your system: a prompt is typed, the button appears, and wires draw to the tokens it was made from. Plays once in view; “Generated” (group Agent) holds it finished. Shown shorter than its full screen."
        code={`<KnowsYourSystem />`}
        previewClassName="p-0 sm:p-0 bg-paper"
      >
        <Replay className="items-center pb-6">
          {(key) => (
            <div key={key} className="w-full [&>section]:min-h-0 [&>section]:py-12">
              <KnowsYourSystem />
            </div>
          )}
        </Replay>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="CallToAction"
        source="components/sections/call-to-action.tsx"
        description="The close: one line and the enormous ink pill; the arrow steps forward on hover. Shown shorter than its full screen."
        code={`<CallToAction />`}
        previewClassName="p-0 sm:p-0 bg-paper"
      >
        <div className="[&>section]:min-h-0 [&>section]:py-16">
          <CallToAction />
        </div>
      </ComponentSpecimen>

      <p className="rounded-card border border-dashed border-hairline-strong p-5 text-[14px] text-ink-soft">
        <span className="font-medium text-ink">Hero, Together and LivePages</span> are pinned for two to three
        screens of scroll each, so they are shown here by the pieces they are made of — InfiniteCanvas, SceneText,
        FlyingCursors, StepList, StatusToast and PublishedCard. The mobile menu opens from the editor’s Actions row
        (“Mobile menu”, group Header).
      </p>
    </div>
  )
}
