import { useState, type ReactNode } from "react"
import { ArrowRight, RotateCcw } from "lucide-react"

import { ComponentSpecimen, GroupLabel, Mono, StateLabel } from "@/components/brand/specimen"
import { CardRail, RailCard, ServerPanel } from "@/components/blocks/card-rail"
import { PageHero } from "@/components/blocks/page-hero"
import { PixelIcon } from "@/components/icons/pixel-icon"
import { IsoServer } from "@/components/marks/iso-server"
import { LifeCycle } from "@/components/motion/life-cycle"
import { ServerFarm } from "@/components/motion/server-farm"
import { ChangelogEntry, ChangelogList } from "@/components/sections/changelog"
import { Compare } from "@/components/sections/compare"
import { FeatureCell, Features } from "@/components/sections/features"
import { LifeSteps } from "@/components/sections/flow"
import { CityCard, CityEdges, NetworkStats, RegionTable } from "@/components/sections/network"
import { CodePanel, SpecFile } from "@/components/sections/spec-file"
import { CityLine } from "@/components/site/city-line"
import { MenuCard } from "@/components/site/site-header"
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu"
import { Prose, SplitHeading, SplitSection } from "@/components/blocks/split-section"
import { StepItem, StepRow } from "@/components/blocks/step-row"
import { PixelFace, PixelMark, StepBadge } from "@/components/marks/pixel-marks"
import { GhostyImage } from "@/components/motion/ghosty-image"
import { PixelMarquee } from "@/components/motion/pixel-marquee"
import { PixelStream } from "@/components/motion/pixel-stream"
import { TyperText } from "@/components/motion/typer-text"
import { Changed, Verdict } from "@/components/sections/changed"
import { Closing } from "@/components/sections/closing"
import { Faq } from "@/components/sections/faq"
import { Flow } from "@/components/sections/flow"
import { Intro } from "@/components/sections/intro"
import { LevelRung, Levels } from "@/components/sections/levels"
import { Masthead } from "@/components/sections/masthead"
import { Origin } from "@/components/sections/origin"
import { PlanColumn, Pricing } from "@/components/sections/pricing"
import { Spec } from "@/components/sections/spec"
import { Stack } from "@/components/sections/stack"
import { Workloads } from "@/components/sections/workloads"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button, ButtonLink, RouteButton } from "@/components/ui/button"
import { Chip, type ChipTone } from "@/components/ui/chip"
import { Container } from "@/components/ui/container"
import { changed, changelogPage, flow, levels, nav, pricing, productPage, stack, workloads } from "@/content"
import { cn } from "@/lib/utils"

/* ─── Helpers ─────────────────────────────────────────────────────────── */

/** A group of specimens under a heading and a rule. */
function Group({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <h3 className="label min-w-0 text-ink">{label}</h3>
        <span className="hidden h-px min-w-8 flex-1 bg-hairline sm:block" />
      </div>
      {children}
    </div>
  )
}

/** Remounts its children, so a once-only entrance can be watched again. */
function Replay({ children }: { children: (key: number) => ReactNode }) {
  const [key, setKey] = useState(0)
  return (
    <div className="flex flex-col items-start gap-6">
      {children(key)}
      <Button variant="paper" size="sm" onClick={() => setKey((k) => k + 1)}>
        <RotateCcw /> Replay
      </Button>
    </div>
  )
}

/** A whole section of the page, set in a hairline frame with its name over it. */
function SectionFrame({ name, source, note, children }: { name: string; source: string; note: string; children: ReactNode }) {
  return (
    <article className="border border-hairline">
      <header className="flex flex-col gap-1.5 border-b border-hairline px-5 py-4 md:px-7">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="text-title text-ink">{name}</h3>
          <span className="label text-faint">{source}</span>
        </div>
        <p className="max-w-[40rem] text-small text-ink-soft">{note}</p>
      </header>
      <div className="overflow-hidden">{children}</div>
    </article>
  )
}

/* ─── Primitives ──────────────────────────────────────────────────────── */

const HOVER = { ink: "bg-navy", paper: "bg-lime" } as const
const FOCUS = "shadow-(--shadow-focus)"

function ButtonRow({ variant }: { variant: "ink" | "paper" }) {
  return (
    <div className="flex flex-wrap items-end gap-x-6 gap-y-5">
      <span className="label w-full text-mute sm:w-16">{variant}</span>
      <StateLabel label="default">
        <Button variant={variant}>Open a workspace</Button>
      </StateLabel>
      <StateLabel label="hover">
        <Button variant={variant} className={HOVER[variant]}>
          Open a workspace
        </Button>
      </StateLabel>
      <StateLabel label="focus · see note">
        <Button variant={variant} className={FOCUS}>
          Open a workspace
        </Button>
      </StateLabel>
      <StateLabel label="pressed">
        <Button variant={variant} className="scale-[0.97]">
          Open a workspace
        </Button>
      </StateLabel>
      <StateLabel label="disabled">
        <Button variant={variant} disabled>
          Open a workspace
        </Button>
      </StateLabel>
    </div>
  )
}

function Primitives() {
  return (
    <Group label="Primitives — components/ui">
      <ComponentSpecimen
        name="Button and ButtonLink"
        source="components/ui/button.tsx"
        description="The site’s one button: a flat slab with pixel-notched corners, in ink or paper, at three sizes. Hover lifts ink to navy and paper to lime, only under a real pointer; every press scales to 0.97 in 140ms. ButtonLink is the same recipe on an anchor; RouteButton on the router’s Link, for pages of this site."
        code={`import { Button, ButtonLink, RouteButton } from "@/components/ui/button"

<ButtonLink href="#pricing">See the pricing</ButtonLink>
<Button variant="paper" size="sm">Talk to us</Button>`}
      >
        <div className="flex flex-col gap-8">
          <ButtonRow variant="ink" />
          <ButtonRow variant="paper" />
          <div className="flex flex-wrap items-end gap-6">
            <span className="label w-full text-mute sm:w-16">sizes</span>
            <StateLabel label="default">
              <Button>Open console</Button>
            </StateLabel>
            <StateLabel label="sm">
              <Button size="sm">Open console</Button>
            </StateLabel>
            <StateLabel label="icon">
              <Button size="icon" aria-label="Next">
                <ArrowRight />
              </Button>
            </StateLabel>
            <StateLabel label="ButtonLink">
              <ButtonLink href="#components" variant="paper" size="sm">
                As a link
              </ButtonLink>
            </StateLabel>
            <StateLabel label="RouteButton">
              <RouteButton href="/pricing" size="sm">
                To a page
              </RouteButton>
            </StateLabel>
          </div>
          <p className="text-[0.8125rem] leading-snug text-mute">
            Focus is an inset ring (--shadow-focus: a 2px cobalt edge, then a 2px paper line), drawn inside the notch — an outline would be cut
            away by the notch’s clip-path. Every notched control uses it through the focus-notch class.
          </p>
        </div>
      </ComponentSpecimen>
      <div className="grid gap-8 xl:grid-cols-2">
        <ComponentSpecimen
          name="Chip"
          source="components/ui/chip.tsx"
          description="A tool tag: mono caps on a small-notched block of one pixel colour, in five tones."
          code={`<Chip tone="blue">TypeScript</Chip>
<Chip tone="lime">Most teams</Chip>`}
        >
          <div className="flex flex-wrap gap-4">
            {(["red", "blue", "violet", "ink", "lime"] as ChipTone[]).map((tone) => (
              <StateLabel key={tone} label={tone}>
                <Chip tone={tone}>{tone === "lime" ? "Most teams" : "Postgres"}</Chip>
              </StateLabel>
            ))}
          </div>
        </ComponentSpecimen>
        <ComponentSpecimen
          name="Container"
          source="components/ui/container.tsx"
          description="Centres every section at --container-page between two gutters. Marked data-canvas-ignore, so the editor clicks through it."
          code={`<Container className="grid lg:grid-cols-2">…</Container>`}
          previewClassName="px-0 md:px-0"
        >
          <Container className="border-x border-dashed border-cobalt/50">
            <p className="label bg-wash/60 p-4 text-center text-mute">max-w-page · px-gutter · mx-auto</p>
          </Container>
        </ComponentSpecimen>
      </div>
      <ComponentSpecimen
        name="Accordion"
        source="components/ui/accordion.tsx"
        description="shadcn’s accordion on Radix, drawn as hairline rows: body-size questions, a plus that turns 45° when open, answers opening in 240ms. Focus underlines the question."
        code={`<Accordion type="multiple">
  <AccordionItem value="q0">
    <AccordionTrigger>Do we have to move everything?</AccordionTrigger>
    <AccordionContent>No. …</AccordionContent>
  </AccordionItem>
</Accordion>`}
      >
        <Accordion type="multiple" defaultValue={["open"]} className="max-w-[40.25rem]">
          {[
            { value: "open", q: "Open", a: "The answer, in small reading copy, with room on the right for the plus." },
            { value: "closed", q: "Closed", a: "Hidden until the question is pressed." },
            { value: "focus", q: "Focus (underlined)", a: "Keyboard focus underlines the question.", className: "underline" },
            { value: "disabled", q: "Disabled", a: "Never shown.", disabled: true },
          ].map((item) => (
            <AccordionItem key={item.value} value={item.value} disabled={item.disabled}>
              <AccordionTrigger className={cn(item.className, item.disabled && "opacity-50")}>{item.q}</AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ComponentSpecimen>
    </Group>
  )
}

/* ─── Marks and blocks ────────────────────────────────────────────────── */

function MarksAndBlocks() {
  return (
    <Group label="Marks and blocks — components/marks, components/blocks">
      <div className="grid gap-8 xl:grid-cols-3">
        <ComponentSpecimen
          name="PixelMark"
          source="marks/pixel-marks.tsx"
          description="The cloud, nine squares wide. Sized by height; coloured by currentColor."
          code={`<PixelMark className="h-8 text-cobalt" />`}
        >
          <div className="flex flex-wrap items-end gap-6">
            <StateLabel label="default">
              <PixelMark />
            </StateLabel>
            <StateLabel label="h-8">
              <PixelMark className="h-8" />
            </StateLabel>
            <StateLabel label="cobalt">
              <PixelMark className="h-8 text-cobalt" />
            </StateLabel>
          </div>
        </ComponentSpecimen>
        <ComponentSpecimen
          name="PixelFace"
          source="marks/pixel-marks.tsx"
          description="A face in eight squares, glad about one thing and hopeless at another."
          code={`<PixelFace mood="sad" />`}
        >
          <div className="flex gap-10">
            <StateLabel label="happy">
              <PixelFace />
            </StateLabel>
            <StateLabel label="sad">
              <PixelFace mood="sad" />
            </StateLabel>
          </div>
        </ComponentSpecimen>
        <ComponentSpecimen
          name="StepBadge"
          source="marks/pixel-marks.tsx"
          description="A step number in a small-notched navy tile, zero-padded."
          code={`<StepBadge n={1} />`}
        >
          <div className="flex gap-3">
            {[1, 2, 3, 4].map((n) => (
              <StepBadge key={n} n={n} />
            ))}
          </div>
        </ComponentSpecimen>
      </div>
      <ComponentSpecimen
        name="SplitSection, SplitHeading and Prose"
        source="blocks/split-section.tsx"
        description="The page’s main rhythm: a typed heading and mono label on the left, justified reading on the right, set wide apart with half a section of paper above and below. Below lg they stack."
        code={`<SplitSection id="origin" heading="Where it started" label="The origin">
  <Prose><p>…</p></Prose>
</SplitSection>`}
        previewClassName="p-0 md:p-0"
      >
        <SplitSection id="split-sample" heading={changed.heading} label={changed.label} className="py-12 md:py-16">
          <Prose>
            <p>{changed.body[0]}</p>
          </Prose>
        </SplitSection>
        <div className="border-t border-hairline p-5 md:p-8">
          <SplitHeading heading="SplitHeading alone" label="With its label" />
        </div>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="StepRow and StepItem"
        source="blocks/step-row.tsx"
        description="Four numbered steps in a row under a diagram — two up on tablets, stacked on phones."
        code={`<StepRow steps={[{ title: "Clone", body: "…" }, …]} />
<StepItem n={1} title="Clone" body="…" />`}
      >
        <StepRow steps={flow.steps} />
      </ComponentSpecimen>
      <ComponentSpecimen
        name="RailCard"
        source="blocks/card-rail.tsx"
        description="One card of a rail: a photograph that bleeds in, a centred title, a line under it and, on the stack rail, tool chips."
        code={`<RailCard card={workloads[0]} />`}
      >
        <div className="flex flex-wrap justify-center gap-7">
          <RailCard card={workloads[3]} className="w-[min(100%,20rem)]" />
          <RailCard card={stack.cards[0]} className="w-[min(100%,20rem)]" delay={120} />
        </div>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="CardRail"
        source="blocks/card-rail.tsx"
        description="A row of RailCards that starts at the page column’s left edge and runs off the right, scrolled by swipe, trackpad or the floating arrow (from sm). Its end state is an editor switch — here “Style guide rail: scrolled to the end”."
        code={`<CardRail name="Workloads" cards={workloads} />`}
        previewClassName="px-0 md:px-0"
      >
        <CardRail name="Style guide rail" cards={workloads.slice(0, 4)} />
      </ComponentSpecimen>
      <ComponentSpecimen
        name="SiteHeader, MenuCard and NavigationMenu"
        source="site/site-header.tsx · ui/navigation-menu.tsx · ui/sheet.tsx"
        description="The menubar pinned to the top of every page: the mark, a Product menu (shadcn’s navigation menu, square and hairlined) of MenuCards with pixel icons, the pages, Sign in and Start free. Below lg it folds into a shadcn Sheet from the right. Both are editor switches: “Product menu” and “Mobile menu”."
        code={`<SiteHeader pathname="/" />
<MenuCard title="Edge network" href="/network" icon="globe" body="…" />`}
      >
        <NavigationMenu viewport={false} className="max-w-none justify-start">
          <NavigationMenuList className="grid w-full max-w-[34rem] grid-cols-1 gap-px bg-hairline p-px sm:grid-cols-2">
            {nav.product.map((item) => (
              <NavigationMenuItem key={item.title} className="bg-paper">
                <MenuCard {...item} />
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <Mono className="mt-3 block">The live menubar is at the top of this page; open its Product menu, or narrow the window for the sheet.</Mono>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="PageHero"
        source="blocks/page-hero.tsx"
        description="The top of every page: its name in heavy caps, a strapline whose words are pushed to fill the column, the mark and a one-line promise — and whatever the page hangs under it (the server room, on home and network)."
        code={`<PageHero title={["Every region,", "one hop."]} strap={[["Fourteen", "edge", "regions"]]} blurb="…" />`}
        previewClassName="p-0 md:p-0"
      >
        <PageHero id="hero-sample" title={productPage.hero.title} strap={productPage.hero.strap} blurb={productPage.hero.blurb} />
      </ComponentSpecimen>
      <div className="grid gap-8 xl:grid-cols-2">
        <ComponentSpecimen
          name="ServerPanel and IsoServer"
          source="blocks/card-rail.tsx · marks/iso-server.tsx"
          description="An isometric voxel server on a flat panel over the 9px grid — the art of the workload cards. Five models; five panel tones. It lifts 6px when its card is hovered."
          code={`<ServerPanel model="sandbox" tone="lime" />
<IsoServer model="rack" className="h-40 w-40" />`}
        >
          <div className="grid grid-cols-3 gap-3">
            <div className="aspect-square">
              <ServerPanel model="rack" tone="cobalt" />
            </div>
            <div className="aspect-square">
              <ServerPanel model="sandbox" tone="lime" />
            </div>
            <div className="flex aspect-square items-center justify-center border border-hairline">
              <IsoServer model="board" className="h-2/3 w-2/3" />
            </div>
          </div>
        </ComponentSpecimen>
        <ComponentSpecimen
          name="PixelIcon"
          source="icons/pixel-icon.tsx"
          description="One icon from the Pixel Icon Library, crisp on its 24px grid in the current colour; decorative unless given a label."
          code={`<PixelIcon name="globe" className="size-5 text-cobalt" />`}
        >
          <div className="flex flex-wrap items-end gap-6">
            <StateLabel label="size-4">
              <PixelIcon name="globe" />
            </StateLabel>
            <StateLabel label="size-6 cobalt">
              <PixelIcon name="bolt" className="size-6 text-cobalt" />
            </StateLabel>
            <StateLabel label="on a night tile">
              <span className="notch notch-sm flex size-10 items-center justify-center bg-night text-lime">
                <PixelIcon name="robot" className="size-5" />
              </span>
            </StateLabel>
          </div>
        </ComponentSpecimen>
        <ComponentSpecimen
          name="CityLine and CityCard"
          source="site/city-line.tsx · sections/network.tsx"
          description="A city skyline in line art, drawn as an alpha mask over one token colour. In the footer, one per page; on the network page, a CityCard per edge."
          code={`<CityLine city="miami" tone="navy" />
<CityCard city="london" note="…" />`}
        >
          <ul className="grid gap-px border border-hairline bg-hairline">
            <CityCard city="miami" note="The gateway to everything south." />
          </ul>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <CityLine city="manhattan" tone="ink" />
            <CityLine city="los-angeles" tone="cobalt" />
          </div>
        </ComponentSpecimen>
        <ComponentSpecimen
          name="CodePanel"
          source="sections/spec-file.tsx"
          description="A file on the night panel: numbered lines, TOML tinted in the palette (tables lime, keys cyan, strings gold) and a copy button whose Copied state is an editor switch."
          code={`<CodePanel filename="cirrus.toml" code={code} />`}
        >
          <CodePanel filename="cirrus.toml" code={productPage.file.code.split("\n").slice(0, 9).join("\n")} />
        </ComponentSpecimen>
      </div>
      <div className="grid gap-8 xl:grid-cols-2">
        <ComponentSpecimen
          name="FeatureCell"
          source="sections/features.tsx"
          description="A feature in a hairline cell: a pixel icon on a night tile, a title and a line. Wash on hover under a real pointer."
          code={`<FeatureCell icon="lock" title="Scoped secrets" body="…" />`}
        >
          <ul className="grid gap-px border border-hairline bg-hairline sm:grid-cols-2">
            {productPage.features.items.slice(0, 2).map((item) => (
              <FeatureCell key={item.title} icon={item.icon as never} title={item.title} body={item.body} />
            ))}
          </ul>
        </ComponentSpecimen>
        <ComponentSpecimen
          name="ChangelogEntry"
          source="sections/changelog.tsx"
          description="A release: the date and version on the left, an icon tile, a tag chip, a typed title and a paragraph."
          code={`<ChangelogEntry date="Sep 24, 2026" version="2026.39" icon="globe" tag={{ label: "Network", tone: "blue" }} title="…" body="…" />`}
        >
          <ol>
            <ChangelogEntry
              {...changelogPage.entries[1]}
              icon={changelogPage.entries[1].icon}
              tag={{ label: changelogPage.entries[1].tag.label, tone: changelogPage.entries[1].tag.tone }}
            />
          </ol>
        </ComponentSpecimen>
      </div>
    </Group>
  )
}

/* ─── Motion ──────────────────────────────────────────────────────────── */

function MotionComponents() {
  return (
    <Group label="Motion — components/motion">
      <div className="grid gap-8 xl:grid-cols-2">
        <ComponentSpecimen
          name="TyperText"
          source="motion/typer-text.tsx"
          description="A heading that types itself in: a wave runs across it and each letter flickers through an ink bar, a lime highlight and an outline before it lands. Pure CSS keyframes, so the Motion switch finishes it."
          code={`<TyperText text="What changed" as="h2" duration={420} stagger={22} className="text-heading" />`}
        >
          <Replay>
            {(key) => <TyperText key={key} text="Laptops are good at some things" as="p" once={false} className="text-heading text-ink" />}
          </Replay>
        </ComponentSpecimen>
        <ComponentSpecimen
          name="GhostyImage"
          source="motion/ghosty-image.tsx"
          description="A photograph that bleeds in through fog: a feathered mask slides across it in 1400ms on the ghost ease while a blur clears. Four directions; softness sets how cloudy the front is."
          code={`<GhostyImage src={card.image} alt={card.alt} direction="up" softness={0.5} />`}
        >
          <Replay>
            {(key) => (
              <div key={key} className="grid w-full grid-cols-2 gap-3">
                {(["up", "down", "left", "right"] as const).map((direction, i) => (
                  <StateLabel key={direction} label={`${direction}${i === 3 ? " · softness 1" : ""}`} className="[&>div]:w-full">
                    <div className="aspect-[420/374] w-full overflow-hidden bg-hairline/40">
                      <GhostyImage src={stack.cards[i].image} alt={stack.cards[i].alt} direction={direction} softness={i === 3 ? 1 : 0.5} />
                    </div>
                  </StateLabel>
                ))}
              </div>
            )}
          </Replay>
        </ComponentSpecimen>
      </div>
      <ComponentSpecimen
        name="ServerFarm"
        source="motion/server-farm.tsx"
        description="The server room at night, on the 9px grid: edge racks hanging off a fibre backbone with the origin in the middle. Requests run origin → backbone → edge → people (cyan hits), misses climb back to the origin (red), replication runs rack to rack (violet), and every rack’s lights blink on their own clock. Its ragged foot erodes as the page scrolls past. Below: the page’s traffic, and a busier room that misses half the time."
        code={`<ServerFarm speed={1} traffic={1} missRate={0.14} erodeOnScroll />
<ServerFarm traffic={2.2} missRate={0.5} erodeOnScroll={false} />`}
        previewClassName="p-0 md:p-0"
      >
        <ServerFarm erodeOnScroll={false} className="h-[clamp(240px,26vw,380px)]" />
        <div className="border-t border-hairline">
          <ServerFarm traffic={2.2} missRate={0.5} erodeOnScroll={false} className="h-[clamp(200px,20vw,300px)]" />
        </div>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="LifeCycle and LifeSteps"
        source="motion/life-cycle.tsx · sections/flow.tsx"
        description="Clone, boot, build, ship as life: one swarm of squares is a DNA helix, unzips and replicates (new strands in lime), gathers into an organism with beating cilia, grows into a tree and lets its seeds go. LifeSteps follow it; pick one to jump there. Held still while designing; “Next life-cycle step” is its switch."
        code={`<LifeCycle step={2} jump={n} autoplay speed={1} count={560} onStepChange={setStep} />
<LifeSteps steps={flow.steps} active={step} onPick={pick} />`}
      >
        <LifeCycleSample />
      </ComponentSpecimen>
      <ComponentSpecimen
        name="PixelStream"
        source="motion/pixel-stream.tsx"
        description="A diagram drawn in pixels. explore: a loose cobalt cloud narrows to a thread, then opens into a twisting gold double strand. spec: navy scatter, cobalt streams, a gold body and a lime plume shedding red sparks."
        code={`<PixelStream variant="explore" />
<PixelStream variant="spec" speed={1} density={1} />`}
      >
        <div className="flex flex-col gap-8">
          <StateLabel label="variant explore" className="[&>canvas]:w-full">
            <PixelStream variant="explore" />
          </StateLabel>
          <StateLabel label="variant spec · density 0.6" className="[&>canvas]:w-full">
            <PixelStream variant="spec" density={0.6} />
          </StateLabel>
        </div>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="PixelMarquee"
        source="motion/pixel-marquee.tsx"
        description="A lower-case line drawn tiny, thresholded, and each surviving pixel blown up into a square that flickers through the palette, scrolling past forever. Left at 160px/s, or right, smaller and slower."
        code={`<PixelMarquee text="the answer is yes, it runs in the cloud" speed={160} direction="left" />`}
        previewClassName="px-0 md:px-0"
      >
        <div className="flex flex-col gap-6">
          <PixelMarquee text="it runs in the cloud" cell={7} rows={11} />
          <PixelMarquee text="nine seconds to boot" direction="right" speed={90} cell={5} rows={10} flicker={0.2} />
        </div>
      </ComponentSpecimen>
      <div className="grid gap-8 xl:grid-cols-2">
        <ComponentSpecimen
          name="TetrisSkyline"
          source="motion/tetris-skyline.tsx"
          description="The foot of the page: a skyline of squares with pieces dropping onto it — and a button that hands you the next one (arrows to move, up to turn, space to drop). It is live in the footer below; its play mode is the editor switch “Play Tetris”."
          code={`<TetrisSkyline cell={9} rows={18} fall={7} skyline={0.6} />`}
        >
          <Mono>Shown once, in the footer, so the keyboard drives a single game.</Mono>
        </ComponentSpecimen>
        <ComponentSpecimen
          name="SmoothScroll"
          source="motion/smooth-scroll.tsx"
          description="Lenis carries this page’s scroll: soft and slightly heavy. It renders nothing; it is held in a ref the editor can stop, and not created under reduced motion."
          code={`<SmoothScroll lerp={0.085} wheelMultiplier={1} enabled />`}
        >
          <div className="grid border-t border-l border-hairline sm:grid-cols-3">
            {[
              ["lerp", "0.085"],
              ["wheelMultiplier", "1"],
              ["anchors", "true"],
            ].map(([k, v]) => (
              <div key={k} className="border-r border-b border-hairline p-4">
                <p className="label text-mute">{k}</p>
                <p className="mt-1 font-mono text-lg text-ink">{v}</p>
              </div>
            ))}
          </div>
        </ComponentSpecimen>
      </div>
    </Group>
  )
}

/** A life cycle with its own steps, so the sample can be driven here. */
function LifeCycleSample() {
  const [step, setStep] = useState(0)
  const [picked, setPicked] = useState<number | undefined>(undefined)
  const [jump, setJump] = useState(0)
  return (
    <div className="flex flex-col gap-8">
      <LifeCycle step={picked} jump={jump} onStepChange={setStep} className="h-[clamp(240px,26vw,360px)]" />
      <LifeSteps
        steps={flow.steps}
        active={step}
        onPick={(i) => {
          setPicked(i)
          setJump((n) => n + 1)
          setStep(i)
        }}
      />
    </div>
  )
}

/* ─── Sections ────────────────────────────────────────────────────────── */

function Sections() {
  return (
    <Group label="Sections — components/sections, components/site">
      <div className="grid gap-8 xl:grid-cols-2">
        <ComponentSpecimen
          name="Verdict"
          source="sections/changed.tsx"
          description="A face, a mono label and a line — what a laptop is good and hopeless at."
          code={`<Verdict mood="happy" label="Good at" body="…" />`}
        >
          <div className="grid gap-10 sm:grid-cols-2">
            <Verdict mood="happy" label={changed.good.label} body={changed.good.body} />
            <Verdict mood="sad" label={changed.bad.label} body={changed.bad.body} />
          </div>
        </ComponentSpecimen>
        <ComponentSpecimen
          name="LevelRung"
          source="sections/levels.tsx"
          description="One rung of the ladder off local machines: a mono level, a name, a line."
          code={`<ol><LevelRung level="L2" title="…" body="…" /></ol>`}
        >
          <ol className="border-t border-hairline">
            {levels.rungs.slice(0, 3).map((rung) => (
              <LevelRung key={rung.level} {...rung} />
            ))}
          </ol>
        </ComponentSpecimen>
      </div>
      <ComponentSpecimen
        name="PlanColumn"
        source="sections/pricing.tsx"
        description="A plan between hairlines: title, blurb, a heading-size price with a mono unit, cobalt checks and a button — ink and a lime chip for the featured one, paper for the rest."
        code={`<PlanColumn plan={pricing.plans[1]} />`}
      >
        <div className="grid border-t border-hairline md:grid-cols-3">
          {pricing.plans.map((plan) => (
            <PlanColumn key={plan.name} plan={plan} />
          ))}
        </div>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="StepItem"
        source="blocks/step-row.tsx"
        description="A single step, on its own."
        code={`<StepItem n={2} title="Boot" body="…" />`}
      >
        <ol>
          <StepItem n={2} title={flow.steps[1].title} body={flow.steps[1].body} />
        </ol>
      </ComponentSpecimen>

      <GroupLabel className="mt-6">The page’s sections, whole and in order — each the real component</GroupLabel>
      <SectionFrame
        name="Masthead"
        source="sections/masthead.tsx"
        note="A PageHero — the name in heavy caps, the strapline, the mark and a promise — over the server room at night, edge to edge, with its legend."
      >
        <Masthead />
      </SectionFrame>
      <SectionFrame name="Intro" source="sections/intro.tsx" note="A paragraph set big, as the opening line of the argument.">
        <Intro />
      </SectionFrame>
      <SectionFrame
        name="Workloads"
        source="sections/workloads.tsx"
        note="What teams run on it: a CardRail of isometric servers on coloured panels. Its rail indents to the page column, measured against the window, so here it starts a little in from the frame."
      >
        <Workloads />
      </SectionFrame>
      <SectionFrame name="Origin" source="sections/origin.tsx" note="Where it started: a SplitSection of justified prose and a quiet aside.">
        <Origin />
      </SectionFrame>
      <SectionFrame name="Changed" source="sections/changed.tsx" note="What changed: prose, the two Verdicts, and the conclusion.">
        <Changed />
      </SectionFrame>
      <SectionFrame name="Flow" source="sections/flow.tsx" note="How it works: four verbs as a life cycle — DNA, cell, tree, seeds — with the steps following it.">
        <Flow />
      </SectionFrame>
      <SectionFrame name="Spec" source="sections/spec.tsx" note="The product: the Environment Spec, a button, the spec stream and its steps.">
        <Spec />
      </SectionFrame>
      <SectionFrame name="Levels" source="sections/levels.tsx" note="The levels of remote development, as LevelRungs between prose.">
        <Levels />
      </SectionFrame>
      <SectionFrame name="Stack" source="sections/stack.tsx" note="The stacks it runs: a second CardRail, with tool chips under each card.">
        <Stack />
      </SectionFrame>
      <SectionFrame name="Pricing" source="sections/pricing.tsx" note="Per-minute pricing: a SplitSection intro and three PlanColumns.">
        <Pricing />
      </SectionFrame>
      <SectionFrame name="Faq and FaqItem" source="sections/faq.tsx" note="Questions in the Accordion, any number open at once; each question is an editor switch in the FAQ group.">
        <Faq />
      </SectionFrame>
      <SectionFrame name="Closing" source="sections/closing.tsx" note="The answer in pixel lights, the one ask, the address.">
        <Closing />
      </SectionFrame>

      <GroupLabel className="mt-6">The other pages’ sections</GroupLabel>
      <SectionFrame name="SpecFile" source="sections/spec-file.tsx · /product" note="The spec as the file it is, beside why it matters: a SplitSection with a CodePanel.">
        <SpecFile />
      </SectionFrame>
      <SectionFrame name="Features" source="sections/features.tsx · /product" note="Six FeatureCells in a hairline grid under a typed heading.">
        <Features />
      </SectionFrame>
      <SectionFrame name="NetworkStats" source="sections/network.tsx · /network" note="Four numbers the network is held to, between hairlines.">
        <NetworkStats />
      </SectionFrame>
      <SectionFrame name="RegionTable" source="sections/network.tsx · /network" note="Every region: code, city, a live or new chip, and its p50 in mono.">
        <RegionTable />
      </SectionFrame>
      <SectionFrame name="CityEdges" source="sections/network.tsx · /network" note="Five edges as CityCards, London across the top.">
        <CityEdges />
      </SectionFrame>
      <SectionFrame name="Compare" source="sections/compare.tsx · /pricing" note="Every plan’s limits row by row, with cobalt checks and faint dashes.">
        <Compare />
      </SectionFrame>
      <SectionFrame name="ChangelogList" source="sections/changelog.tsx · /changelog" note="Releases, newest first, as ChangelogEntries between hairlines.">
        <ChangelogList />
      </SectionFrame>
      <p className="border border-dashed border-hairline p-5 text-small text-ink-soft">
        <span className="text-ink">SiteHeader</span> is the live menubar at the top of this page, and <span className="text-ink">SiteFooter</span> —
        the links, an edge region’s skyline and the TetrisSkyline — is the live footer at the bottom, with the “Brand guidelines” link.
      </p>
    </Group>
  )
}

export function ComponentLibrary() {
  return (
    <div className="flex flex-col gap-20">
      <Primitives />
      <MarksAndBlocks />
      <MotionComponents />
      <Sections />
    </div>
  )
}
