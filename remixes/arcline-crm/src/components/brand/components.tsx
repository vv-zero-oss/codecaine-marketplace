import { useState, type ReactNode } from "react"
import { ArrowRight, Check } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { ComponentSpecimen, GroupLabel, SectionFrame, StateLabel } from "@/components/brand/specimen"
import { Button as PillButton } from "@/components/atoms/Button"
import { EntityChip, Monogram } from "@/components/atoms/EntityChip"
import { Shimmer } from "@/components/atoms/Shimmer"
import { ValuePill } from "@/components/atoms/ValuePill"
import { Isocon } from "@/components/icons/isocon"
import { AgentRun, DealSuggestion, PersonaSuggestion, StreamingAnswer } from "@/components/mockups/agent-ui"
import { AutoLog, CompaniesTable, EnrichmentRadar, IntentScore, PromptList } from "@/components/mockups/capture"
import { Avatar, Card, Chip, CompanyMark, Fit, Kbd, Window } from "@/components/mockups/kit"
import {
  AnalystCard,
  HealthBars,
  LineChart,
  PipelineBoard,
  RecordStack,
  RiskList,
  SequenceSteps,
  SignalsFeed,
  WorkflowCanvas,
} from "@/components/mockups/pipeline"
import { RecordPage } from "@/components/mockups/record-page"
import { Marquee } from "@/components/motion/marquee"
import { Reveal } from "@/components/motion/reveal"
import GlideMenu from "@/components/primitives/GlideMenu"
import StreamingText from "@/components/primitives/StreamingText"
import TaskRows from "@/components/primitives/TaskRows"
import { ChangelogCard, ChangelogStrip, FinalCta, Newsletter, Ruler } from "@/components/sections/closing"
import { Developers } from "@/components/sections/developers"
import { Hero } from "@/components/sections/hero"
import { AppTile, Integrations } from "@/components/sections/integrations"
import { Horizon, Memory } from "@/components/sections/memory"
import { Platform } from "@/components/sections/platform"
import { Quote } from "@/components/sections/quote"
import { Record } from "@/components/sections/record"
import { GrowthCurve, Scale } from "@/components/sections/scale"
import { FramedPhoto, Stories } from "@/components/sections/stories"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { BorderBeam } from "@/components/ui/border-beam"
import { BrandLogo } from "@/components/ui/brand-logo"
import { Button, ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Heading, Lede } from "@/components/ui/heading"
import { LogoWall } from "@/components/ui/logo-wall"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Section } from "@/components/ui/section"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArclineMark, Wordmark } from "@/components/ui/wordmark"
import { LOGOS } from "@/content/home"
import { AGENTS, CHANGELOG, PRICING } from "@/content/pages"
import { CompanyName } from "@/pages/customers"
import { PinWave, Personas, PromptCard } from "@/pages/agents"
import { BillingToggle, CompareTable, PlanCard, RollingPrice } from "@/pages/pricing"
import { cn } from "@/lib/utils"

/* ─── The shadcn-based primitives in components/ui ────────────────────── */

const VARIANTS = ["primary", "outline", "ghost"] as const
const SIZES = ["sm", "md", "lg"] as const

/** Hover, focus and pressed drawn on, so each can be seen without a pointer. */
const HOVER = {
  primary: "before:opacity-100",
  outline: "border-line-bold bg-surface",
  ghost: "bg-hover-2 text-ink",
} as const
const PRESSED = {
  primary: "bg-ink-soft border-ink-soft",
  outline: "border-ink-3 bg-hover",
  ghost: "bg-line-bold",
} as const
const FOCUS = "ring-2 ring-accent/60 ring-offset-2 ring-offset-page"

function ButtonSpecimen() {
  return (
    <ComponentSpecimen
      name="Button and ButtonLink"
      source="components/ui/button.tsx"
      description="36px, 10px corners, a 1px border, no shadow. Hovers arrive in 50ms and leave over 300ms; the primary fill carries a light rising from its top edge. ButtonLink is the same recipe on the router’s Link."
      code={`import { Button, ButtonLink } from "@/components/ui/button"

<ButtonLink href="/pricing" variant="primary">Start for free</ButtonLink>
<ButtonLink href="/agents" size="sm" arrow>Meet the agents</ButtonLink>
<Button variant="ghost" disabled>Sign in</Button>`}
    >
      <div className="space-y-8">
        {VARIANTS.map((variant) => (
          <div key={variant} className="flex flex-wrap items-end gap-x-6 gap-y-4">
            <span className="w-full font-mono text-micro text-ink-3 sm:w-16">{variant}</span>
            <StateLabel label="default">
              <Button variant={variant}>Start for free</Button>
            </StateLabel>
            <StateLabel label="hover">
              <Button variant={variant} className={HOVER[variant]}>
                Start for free
              </Button>
            </StateLabel>
            <StateLabel label="focus">
              <Button variant={variant} className={FOCUS}>
                Start for free
              </Button>
            </StateLabel>
            <StateLabel label="pressed">
              <Button variant={variant} className={PRESSED[variant]}>
                Start for free
              </Button>
            </StateLabel>
            <StateLabel label="disabled">
              <Button variant={variant} disabled>
                Start for free
              </Button>
            </StateLabel>
            <StateLabel label="arrow">
              <Button variant={variant} arrow>
                Book a demo
              </Button>
            </StateLabel>
          </div>
        ))}
        <div className="flex flex-wrap items-end gap-6">
          <span className="w-full font-mono text-micro text-ink-3 sm:w-16">sizes</span>
          {SIZES.map((size) => (
            <StateLabel key={size} label={size}>
              <Button size={size} variant="primary">
                Start for free
              </Button>
            </StateLabel>
          ))}
          <StateLabel label="ButtonLink">
            <ButtonLink href="#components" size="sm" arrow>
              See the components
            </ButtonLink>
          </StateLabel>
        </div>
      </div>
    </ComponentSpecimen>
  )
}

function SheetSample() {
  const [open, setOpen] = useState(false)
  useCanvasAction("Sample sheet", (next) => setOpen(next ?? !open), { on: open, group: "Brand guidelines" })
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open a sheet
      </Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="border-line-strong bg-surface">
          <SheetHeader className="p-6">
            <SheetTitle className="text-h4 font-medium text-ink">Northwind Supply</SheetTitle>
            <SheetDescription className="text-sm text-ink-2">
              Three calls logged this week. The agent drafted a renewal note for Friday.
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-wrap gap-2 px-6">
            <Chip tone="green">Healthy</Chip>
            <Chip tone="accent">$48k ARR</Chip>
            <Chip>Renews in 21 days</Chip>
          </div>
          <SheetFooter className="p-6">
            <Button variant="primary" onClick={() => setOpen(false)}>
              Send the note
            </Button>
            <Button onClick={() => setOpen(false)}>Later</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  )
}

function NavigationMenuSample() {
  const [value, setValue] = useState("")
  useCanvasAction("Sample menu", (next) => setValue((next ?? !value) ? "platform" : ""), {
    on: value === "platform",
    group: "Brand guidelines",
  })
  return (
    <NavigationMenu viewport={false} value={value} onValueChange={setValue}>
      <NavigationMenuList className="gap-0.5">
        <NavigationMenuItem value="platform">
          <NavigationMenuTrigger className="h-8 rounded-button bg-transparent px-2.5 text-[15px] font-medium text-ink-soft hover:bg-hover-2 data-[state=open]:bg-hover-2 data-[state=open]:text-ink [&>svg]:size-3 [&>svg]:text-ink-3">
            Platform
          </NavigationMenuTrigger>
          <NavigationMenuContent className="!mt-3 !rounded-window !border-0 !bg-surface !p-0 !shadow-overlay">
            <GlideMenu className="w-[260px] p-2" highlightClassName="inset-x-2 rounded-card bg-hover">
              {[
                { title: "Capture", body: "Every touch, logged", icon: "sync" as const },
                { title: "Forecast", body: "The number, with reasons", icon: "trending-up" as const },
              ].map((item) => (
                <NavigationMenuLink key={item.title} asChild>
                  <a href="#components" data-menu-row className="group/iso relative z-10 flex items-start gap-3 rounded-card p-3 hover:bg-transparent focus:bg-transparent">
                    <span className="mt-0.5 w-7 shrink-0 text-ink-2 group-hover/iso:text-accent-ink">
                      <Isocon name={item.icon} draw />
                    </span>
                    <span>
                      <span className="block text-base font-medium text-ink">{item.title}</span>
                      <span className="block text-sm text-ink-2">{item.body}</span>
                    </span>
                  </a>
                </NavigationMenuLink>
              ))}
            </GlideMenu>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <a href="#components" className="flex h-8 items-center rounded-button px-2.5 text-[15px] font-medium text-ink-soft hover:bg-hover-2 hover:text-ink">
              Pricing
            </a>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function UiLibrary() {
  return (
    <div className="space-y-6">
      <ButtonSpecimen />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 [&>*]:min-w-0">
        <ComponentSpecimen
          name="Eyebrow"
          source="components/ui/eyebrow.tsx"
          description="The small tinted label above a section heading. Accent ink on the accent tint, 8px corners."
          code={`<Eyebrow>Platform</Eyebrow>`}
        >
          <div className="flex flex-wrap gap-3">
            <Eyebrow>Platform</Eyebrow>
            <Eyebrow>Deal Memory</Eyebrow>
            <Eyebrow>Developers</Eyebrow>
          </div>
        </ComponentSpecimen>

        <ComponentSpecimen
          name="Heading and Lede"
          source="components/ui/heading.tsx"
          description="Two tones: the first sentence in full ink, the rest muted. Either half can be left out. Lede is the body under it — never above 18px."
          code={`<Heading lead="Selling, handled." rest="The rest is logged." />
<Heading as="h1" size="h1" lead="Pricing that scales with seats." />
<Lede>Arcline logs every touch and drafts every next step.</Lede>`}
        >
          <div className="space-y-6">
            <StateLabel label="lead + rest">
              <Heading size="h3" lead="Selling, handled." rest="The rest is logged." />
            </StateLabel>
            <StateLabel label="lead only">
              <Heading size="h3" lead="Selling, handled." />
            </StateLabel>
            <StateLabel label="rest only">
              <Heading size="h3" rest="The rest is logged." />
            </StateLabel>
            <StateLabel label="Lede">
              <Lede>Arcline logs every touch, qualifies every lead and drafts every next step.</Lede>
            </StateLabel>
          </div>
        </ComponentSpecimen>

        <ComponentSpecimen
          name="Wordmark and ArclineMark"
          source="components/ui/wordmark.tsx"
          description="The symbol and name, as header and footer set them; always a link home. The mark alone for small places."
          code={`<Wordmark />
<ArclineMark className="h-4 w-auto" />`}
        >
          <div className="flex flex-wrap items-end gap-8">
            <StateLabel label="Wordmark">
              <Wordmark />
            </StateLabel>
            <StateLabel label="ArclineMark">
              <ArclineMark className="h-5 w-auto text-ink" />
            </StateLabel>
            <StateLabel label="ArclineMark · muted">
              <ArclineMark className="h-5 w-auto text-ink-3" />
            </StateLabel>
          </div>
        </ComponentSpecimen>

        <ComponentSpecimen
          name="BrandLogo"
          source="components/ui/brand-logo.tsx"
          description="An SVGL logo in one flat colour through a mask. Symbol-only marks are set beside their name unless label is off; fit caps the width."
          code={`<BrandLogo brand="stripe" />
<BrandLogo brand="figma" label={false} scale={0.8} />`}
        >
          <div className="flex flex-wrap items-end gap-x-8 gap-y-4 text-ink-soft">
            <StateLabel label="wordmark">
              <BrandLogo brand="stripe" />
            </StateLabel>
            <StateLabel label="symbol + name">
              <BrandLogo brand="figma" />
            </StateLabel>
            <StateLabel label="label={false}">
              <BrandLogo brand="figma" label={false} />
            </StateLabel>
            <StateLabel label="scale={0.6}">
              <BrandLogo brand="vercel" scale={0.6} />
            </StateLabel>
            <StateLabel label="ink-3">
              <BrandLogo brand="linear" className="text-ink-3" />
            </StateLabel>
          </div>
        </ComponentSpecimen>
      </div>

      <ComponentSpecimen
        name="LogoWall"
        source="components/ui/logo-wall.tsx"
        description="Logos on a hairline grid. The first cells lead to a story: a small ↗, and they lift to the surface on hover. Five or six columns at desktop."
        code={`<LogoWall brands={LOGOS} />
<LogoWall brands={LOGOS} columns={6} withStories={0} />`}
        previewClassName="p-0 sm:p-0"
      >
        <LogoWall brands={LOGOS} />
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Section and Container"
        source="components/ui/section.tsx · container.tsx"
        description="A Section is one band: a hairline on top, in one of three tones. Container is the content column inside the frame — 20, 32, then 58px of air a side — and is marked data-canvas-ignore so the editor clicks through it."
        code={`<Section id="records" tone="canvas">
  <Container className="py-[var(--spacing-section)]">…</Container>
</Section>`}
        previewClassName="p-0 sm:p-0"
      >
        {(["page", "canvas", "void"] as const).map((tone) => (
          <Section key={tone} tone={tone}>
            <Container className="py-8">
              <div className="flex items-center justify-between gap-4 outline-1 outline-accent/30 outline-dashed">
                <span className="font-mono text-micro text-ink-3">tone="{tone}"</span>
                <span className="text-sm text-ink-2">Container</span>
              </div>
            </Container>
          </Section>
        ))}
      </ComponentSpecimen>

      <ComponentSpecimen
        name="BorderBeam"
        source="components/ui/border-beam.tsx"
        description="A glow riding a card’s border — one or two per page, on what is live or new. A CSS animation, so the editor’s Motion switch stops it; active={false} holds it."
        code={`<BorderBeam size="md" colorVariant="ocean" strength={0.5} className="rounded-panel">
  <PlanCard plan={plan} billing="annual" />
</BorderBeam>`}
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(
            [
              ["md", "ocean", true],
              ["sm", "colorful", true],
              ["line", "mono", true],
              ["pulse-inner", "sunset", true],
              ["pulse-outside", "ocean", true],
              ["md", "ocean", false],
            ] as const
          ).map(([size, color, active]) => (
            <StateLabel key={`${size}-${color}-${active}`} label={`${size} · ${color}${active ? "" : " · active={false}"}`} className="items-stretch">
              <BorderBeam size={size} colorVariant={color} active={active} className="rounded-card">
                <div className="flex h-24 items-center justify-center rounded-card border border-line-strong bg-surface text-sm text-ink-2">
                  Forecast is live
                </div>
              </BorderBeam>
            </StateLabel>
          ))}
        </div>
      </ComponentSpecimen>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 [&>*]:min-w-0">
        <ComponentSpecimen
          name="Tabs"
          source="components/ui/tabs.tsx"
          description="shadcn tabs on Radix. The default list sits in a muted track; the line variant marks the active tab with a bar — what the persona and story tabs build on."
          code={`<Tabs defaultValue="sales">
  <TabsList variant="line">
    <TabsTrigger value="sales">Sales</TabsTrigger>
    <TabsTrigger value="revops">RevOps</TabsTrigger>
  </TabsList>
  <TabsContent value="sales">…</TabsContent>
</Tabs>`}
        >
          <div className="space-y-8">
            {(["default", "line"] as const).map((variant) => (
              <StateLabel key={variant} label={`variant="${variant}" · last tab disabled`}>
                <Tabs defaultValue="sales">
                  <TabsList variant={variant}>
                    <TabsTrigger value="sales">Sales</TabsTrigger>
                    <TabsTrigger value="revops">RevOps</TabsTrigger>
                    <TabsTrigger value="success" disabled>
                      Success
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="sales" className="pt-2 text-sm text-ink-2">
                    Follow-ups drafted before the call ends.
                  </TabsContent>
                  <TabsContent value="revops" className="pt-2 text-sm text-ink-2">
                    The forecast, with every number’s reason.
                  </TabsContent>
                </Tabs>
              </StateLabel>
            ))}
          </div>
        </ComponentSpecimen>

        <ComponentSpecimen
          name="Sheet"
          source="components/ui/sheet.tsx"
          description="shadcn’s sheet on Radix Dialog — the mobile menu is one, from the top. Open it here, or from the editor’s Actions row (“Sample sheet”)."
          code={`<Sheet open={open} onOpenChange={setOpen}>
  <SheetContent side="right">
    <SheetTitle>Northwind Supply</SheetTitle>
  </SheetContent>
</Sheet>`}
        >
          <SheetSample />
        </ComponentSpecimen>

        <ComponentSpecimen
          name="NavigationMenu"
          source="components/ui/navigation-menu.tsx"
          description="The header’s menus: open on hover, the panel’s rows under one gliding highlight. Open it from the editor with “Sample menu”."
          code={`<NavigationMenu viewport={false}>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Platform</NavigationMenuTrigger>
      <NavigationMenuContent>…</NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`}
          previewClassName="min-h-[260px]"
        >
          <NavigationMenuSample />
        </ComponentSpecimen>

        <ComponentSpecimen
          name="Accordion"
          source="components/ui/accordion.tsx"
          description="shadcn’s accordion on Radix; the panel opens over 300ms on in-out cubic. The pricing FAQ swaps the chevron for a mono [+] / [−]."
          code={`<Accordion type="single" collapsible>
  <AccordionItem value="seats">
    <AccordionTrigger>Can I change seats mid-year?</AccordionTrigger>
    <AccordionContent>…</AccordionContent>
  </AccordionItem>
</Accordion>`}
        >
          <div className="space-y-8">
            <StateLabel label="default · first open" className="items-stretch">
              <Accordion type="single" collapsible defaultValue={PRICING.faq[0].q} className="w-full">
                {PRICING.faq.slice(0, 3).map((f) => (
                  <AccordionItem key={f.q} value={f.q}>
                    <AccordionTrigger className="text-ink">{f.q}</AccordionTrigger>
                    <AccordionContent className="text-ink-2">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </StateLabel>
            <StateLabel label="pricing FAQ" className="items-stretch">
              <Accordion type="single" collapsible className="w-full border-t border-line-strong">
                {PRICING.faq.slice(3, 5).map((f) => (
                  <AccordionItem key={f.q} value={f.q} className="border-line-strong">
                    <AccordionTrigger className="group/faq items-center py-5 text-base font-semibold text-ink hover:no-underline [&>svg]:hidden">
                      {f.q}
                      <span className="ml-auto font-mono text-sm font-normal text-ink-3 transition-colors group-hover/faq:text-ink">
                        <span className="group-data-[state=open]/faq:hidden">[+]</span>
                        <span className="hidden group-data-[state=open]/faq:inline">[−]</span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-sm text-ink-2">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </StateLabel>
          </div>
        </ComponentSpecimen>
      </div>
    </div>
  )
}

/* ─── Agent-UI atoms and primitives ───────────────────────────────────── */

const PILL_VARIANTS = ["primary", "secondary", "ghost", "accent", "success", "quiet"] as const
const PILL_HOVER = {
  primary: "opacity-90",
  secondary: "bg-inset",
  ghost: "bg-line-strong",
  accent: "bg-accent-ink",
  success: "brightness-95",
  quiet: "bg-hover",
} as const

function AgentLibrary() {
  return (
    <div className="space-y-6">
      <ComponentSpecimen
        name="Pill button"
        source="components/atoms/Button.tsx"
        description="The agent UI’s own button: pill-shaped, 150ms, a 0.96 press. Six variants in three sizes — for suggestion cards and toolbars, never for page CTAs."
        code={`import { Button } from "@/components/atoms/Button"

<Button variant="accent" size="sm">Accept</Button>
<Button variant="quiet" size="xs">Alternatives</Button>`}
      >
        <div className="space-y-5">
          {PILL_VARIANTS.map((variant) => (
            <div key={variant} className="flex flex-wrap items-end gap-x-5 gap-y-3">
              <span className="w-full font-mono text-micro text-ink-3 sm:w-20">{variant}</span>
              <StateLabel label="md">
                <PillButton variant={variant}>Accept</PillButton>
              </StateLabel>
              <StateLabel label="hover">
                <PillButton variant={variant} className={PILL_HOVER[variant]}>
                  Accept
                </PillButton>
              </StateLabel>
              <StateLabel label="pressed">
                <PillButton variant={variant} className="scale-[0.96]">
                  Accept
                </PillButton>
              </StateLabel>
              <StateLabel label="sm">
                <PillButton variant={variant} size="sm">
                  Accept
                </PillButton>
              </StateLabel>
              <StateLabel label="xs">
                <PillButton variant={variant} size="xs">
                  Accept
                </PillButton>
              </StateLabel>
              <StateLabel label="disabled">
                <PillButton variant={variant} disabled>
                  Accept
                </PillButton>
              </StateLabel>
            </div>
          ))}
        </div>
      </ComponentSpecimen>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 [&>*]:min-w-0">
        <ComponentSpecimen
          name="EntityChip and Monogram"
          source="components/atoms/EntityChip.tsx"
          description="Names a company, person or record inside running text: a monogram in a soft field pill."
          code={`<EntityChip name="Northwind" color="var(--accent-strong)" />
<Monogram color="var(--green)">M</Monogram>`}
        >
          <p className="text-sm leading-7 text-ink-2">
            Maya moved
            <EntityChip name="Northwind" color="var(--accent-strong)" />
            to proposal after the call with
            <EntityChip name="Jonah Pike" color="var(--purple)" monogram="JP" />.
          </p>
          <div className="mt-4 flex gap-2">
            <Monogram color="var(--green)">M</Monogram>
            <Monogram color="var(--orange)">R</Monogram>
            <Monogram>A</Monogram>
          </div>
        </ComponentSpecimen>

        <ComponentSpecimen
          name="ValuePill"
          source="components/atoms/ValuePill.tsx"
          description="A plain value — a date, an amount, a count — set off in prose. Five tones."
          code={`<ValuePill tone="green">$48,000</ValuePill>`}
        >
          <p className="text-sm leading-8 text-ink-2">
            Close by <ValuePill>Oct 14</ValuePill> for <ValuePill tone="green">$48,000</ValuePill>, down from{" "}
            <ValuePill tone="orange">$52,000</ValuePill>; <ValuePill tone="red">2 risks</ValuePill> and{" "}
            <ValuePill tone="accent">3 drafts</ValuePill> waiting.
          </p>
        </ComponentSpecimen>

        <ComponentSpecimen
          name="Shimmer"
          source="components/atoms/Shimmer.tsx"
          description="A light passing through text while the agent works — the thinking state."
          code={`<Shimmer>Reading 14 threads…</Shimmer>`}
        >
          <p className="text-base">
            <Shimmer>Reading 14 threads and 3 call notes…</Shimmer>
          </p>
        </ComponentSpecimen>

        <ComponentSpecimen
          name="GlideMenu"
          source="components/primitives/GlideMenu.tsx"
          description="One hover layer that glides between rows marked data-menu-row, instead of a highlight per row. Point at the rows."
          code={`<GlideMenu highlightClassName="inset-x-0 rounded-card bg-hover">
  <a data-menu-row className="relative z-10 …">Capture</a>
</GlideMenu>`}
        >
          <GlideMenu className="max-w-[280px] rounded-card bg-surface p-1.5 shadow-card" highlightClassName="inset-x-1.5 rounded-control bg-hover">
            {["Log a call", "Draft a follow-up", "Move to proposal", "Ask about this deal"].map((row) => (
              <button key={row} type="button" data-menu-row className="relative z-10 flex h-9 w-full items-center rounded-control px-3 text-left text-sm text-ink-soft">
                {row}
              </button>
            ))}
          </GlideMenu>
        </ComponentSpecimen>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3 [&>*]:min-w-0">
        <ComponentSpecimen
          name="RecommendationCard"
          source="components/primitives/RecommendationCard.tsx"
          description="A suggestion with a signal meter, alternatives in a drawer and an accept. Open the alternatives, then accept — both states are live."
          code={`<RecommendationCard options={options} labels={{ title: "Update the Fieldwork deal?" }} />`}
        >
          <div className="flex justify-center">
            <DealSuggestion />
          </div>
        </ComponentSpecimen>

        <ComponentSpecimen
          name="TaskRows"
          source="components/primitives/TaskRows.tsx"
          description="An agent’s run as rows: pending ring, running, failed with a retry, done. It plays through its states on a timer."
          code={`<TaskRows rows={RUN} labels={{ title: "Follow-up run" }} />`}
        >
          <AgentRun />
        </ComponentSpecimen>

        <ComponentSpecimen
          name="StreamingText"
          source="components/primitives/StreamingText.tsx"
          description="An answer streaming in word by word, with source chips, then follow-ups. Loops after a hold."
          code={`<StreamingText content={TOKENS} sources={SOURCES} loop />`}
        >
          <StreamingAnswer />
        </ComponentSpecimen>
      </div>
      <p className="text-caption text-ink-3">
        The three above are shown as the site configures them (<code className="font-mono">mockups/agent-ui.tsx</code>);{" "}
        <code className="font-mono">StreamingText</code> is also used bare:
      </p>
      <div className="max-w-[420px]">
        <StreamingText loop />
      </div>
      <div className="max-w-[420px]">
        <TaskRows />
      </div>
    </div>
  )
}

/* ─── The mockup kit and the product mockups ──────────────────────────── */

const TONES = ["accent", "green", "orange", "red", "purple", "yellow"] as const
const CHIP_TONES = ["neutral", "green", "accent", "orange", "red", "purple", "yellow"] as const

function KitLibrary() {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 [&>*]:min-w-0">
      <ComponentSpecimen
        name="Window"
        source="components/mockups/kit.tsx"
        description="An app window: a frosted frame with traffic lights around a surface. Light (on hover) or dark (on void)."
        code={`<Window title="Arcline — Pipeline">…</Window>
<Window dark title="Terminal">…</Window>`}
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <Window title="Arcline — Pipeline">
            <div className="h-24 p-3 text-caption text-ink-2">Surface body</div>
          </Window>
          <Window dark title="Terminal">
            <div className="h-24 p-3 font-mono text-caption text-green">$ arcline sync</div>
          </Window>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Card, Kbd and Fit"
        source="components/mockups/kit.tsx"
        description="Card is the soft floating card inside a mockup. Kbd is a key hint. Fit draws a child at a fixed design width and scales it to the width it is given."
        code={`<Fit width={400}><Card className="p-4">…</Card></Fit>
<Kbd>⌘</Kbd><Kbd>K</Kbd>`}
      >
        <div className="space-y-5">
          <Card className="p-4 text-sm text-ink-2">
            Ask Arcline anything <span className="ml-2 inline-flex gap-1 align-middle"><Kbd>⌘</Kbd><Kbd>K</Kbd></span>
          </Card>
          <StateLabel label="Fit width={600} — scaled to this column" className="items-stretch">
            <Fit width={600}>
              <Card className="flex h-16 items-center justify-between px-5 text-sm text-ink-2">
                <span>600px design width</span>
                <Chip tone="accent">scaled</Chip>
              </Card>
            </Fit>
          </StateLabel>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Avatar and CompanyMark"
        source="components/mockups/kit.tsx"
        description="Initials in a tinted circle, in six tones and any size. CompanyMark uses the company’s logo when there is one, else its initial."
        code={`<Avatar initials="MV" tone="green" size={24} />
<CompanyMark name="Stripe" brand="stripe" size={20} />`}
      >
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            {TONES.map((tone) => (
              <Avatar key={tone} initials="MV" tone={tone} size={24} />
            ))}
            <Avatar initials="JP" size={16} />
            <Avatar initials="JP" size={32} />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <CompanyMark name="Stripe" brand="stripe" size={20} />
            <CompanyMark name="Vercel" brand="vercel" size={20} tone="green" />
            <CompanyMark name="Fieldwork" size={20} tone="orange" />
            <CompanyMark name="Northwind" size={28} tone="purple" />
          </div>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Chip"
        source="components/mockups/kit.tsx"
        description="A small tinted label — a score, a stage, a status — with a 1px inner ring in its own colour."
        code={`<Chip tone="green">Won</Chip>`}
      >
        <div className="flex flex-wrap gap-2">
          {CHIP_TONES.map((tone) => (
            <Chip key={tone} tone={tone}>
              {tone}
            </Chip>
          ))}
        </div>
      </ComponentSpecimen>
    </div>
  )
}

/** A mockup at its design width, in the dotted panel the site shows it in. */
function Mockup({ name, source, width, children, code }: { name: string; source: string; width?: number; children: ReactNode; code?: string }) {
  return (
    <ComponentSpecimen
      name={name}
      source={source}
      description={width ? `Drawn at ${width}px and scaled with Fit.` : "Set at its natural width."}
      code={code ?? `<Fit width={${width ?? 400}}><${name} /></Fit>`}
      previewClassName="p-4 sm:p-6"
    >
      {width ? <Fit width={width}>{children}</Fit> : <div className="flex justify-center">{children}</div>}
    </ComponentSpecimen>
  )
}

function MockupLibrary() {
  return (
    <div className="space-y-6">
      <Mockup name="CompaniesTable" source="components/mockups/capture.tsx" width={1000}>
        <CompaniesTable />
      </Mockup>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 [&>*]:min-w-0">
        <Mockup name="AutoLog" source="components/mockups/capture.tsx" width={400}>
          <AutoLog />
        </Mockup>
        <Mockup name="EnrichmentRadar" source="components/mockups/capture.tsx" width={400}>
          <EnrichmentRadar />
        </Mockup>
        <Mockup name="IntentScore" source="components/mockups/capture.tsx" width={400}>
          <IntentScore />
        </Mockup>
        <Mockup name="PromptList" source="components/mockups/capture.tsx" width={520}>
          <PromptList />
        </Mockup>
        <Mockup name="SequenceSteps" source="components/mockups/pipeline.tsx" width={400}>
          <SequenceSteps />
        </Mockup>
        <Mockup name="AnalystCard" source="components/mockups/pipeline.tsx" width={440}>
          <AnalystCard />
        </Mockup>
        <Mockup name="LineChart" source="components/mockups/pipeline.tsx" width={560}>
          <LineChart />
        </Mockup>
        <Mockup name="SignalsFeed" source="components/mockups/pipeline.tsx" width={380}>
          <SignalsFeed />
        </Mockup>
        <Mockup name="RecordStack" source="components/mockups/pipeline.tsx" width={380}>
          <RecordStack />
        </Mockup>
      </div>
      <Mockup name="WorkflowCanvas" source="components/mockups/pipeline.tsx" width={1120}>
        <WorkflowCanvas />
      </Mockup>
      <Mockup name="PipelineBoard" source="components/mockups/pipeline.tsx" width={1160}>
        <PipelineBoard />
      </Mockup>
      <Mockup
        name="HealthBars and RiskList"
        source="components/mockups/pipeline.tsx"
        width={1080}
        code={`<Fit width={1080}>
  <div className="flex items-start gap-6"><HealthBars /><RiskList /></div>
</Fit>`}
      >
        <div className="flex items-start gap-6">
          <HealthBars />
          <RiskList />
        </div>
      </Mockup>
      <Mockup name="RecordPage" source="components/mockups/record-page.tsx" width={1120}>
        <RecordPage />
      </Mockup>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 [&>*]:min-w-0">
        {AGENTS.personas.items.slice(0, 2).map((persona) => (
          <Mockup
            key={persona.id}
            name={`PersonaSuggestion · ${persona.label}`}
            source="components/mockups/agent-ui.tsx"
            code={`<PersonaSuggestion persona={AGENTS.personas.items[0]} />`}
          >
            <PersonaSuggestion persona={persona} />
          </Mockup>
        ))}
      </div>
      <p className="text-caption text-ink-3">
        HeroApp — the hero’s scripted app window — is shown live inside the Hero section below, where it registers its
        “Hero scene” action.
      </p>
    </div>
  )
}

/* ─── Motion components ───────────────────────────────────────────────── */

function RevealSample() {
  const [run, setRun] = useState(0)
  return (
    <div className="space-y-4">
      <Button size="sm" onClick={() => setRun((r) => r + 1)}>
        Replay
      </Button>
      <div key={run} className="grid grid-cols-3 gap-3">
        {[0, 0.1, 0.2].map((delay) => (
          <Reveal key={delay} onMount delay={delay}>
            <Card className="flex h-20 items-center justify-center text-caption text-ink-2">delay {delay}s</Card>
          </Reveal>
        ))}
      </div>
    </div>
  )
}

function MotionLibrary() {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 [&>*]:min-w-0">
      <ComponentSpecimen
        name="Reveal"
        source="components/motion/reveal.tsx"
        description="Content coming into focus: an 8px rise, a fade, a 1.5px blur clearing, 0.6s on Out. onMount plays on load, otherwise on first view. Held at its end state while designing and for reduced motion."
        code={`<Reveal delay={0.1}>…</Reveal>
<Reveal onMount y={12} blur={2}>…</Reveal>`}
      >
        <RevealSample />
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Marquee"
        source="components/motion/marquee.tsx"
        description="A row drifting sideways forever, doubled so the loop has no seam. speed is seconds per loop; pauses on hover; stops for reduced motion."
        code={`<Marquee speed={40} direction="left">
  {brands.map((b) => <AppTile key={b} brand={b} />)}
</Marquee>`}
        previewClassName="px-0 sm:px-0"
      >
        <div className="space-y-4">
          <Marquee speed={30} className="fade-x">
            {(["stripe", "vercel", "slack", "linear", "figma", "gmail"] as const).map((b) => (
              <span key={b} className="px-3">
                <AppTile brand={b} />
              </span>
            ))}
          </Marquee>
          <Marquee speed={24} direction="right" pauseOnHover={false} className="fade-x">
            {LOGOS.map((b) => (
              <span key={b} className="px-6 text-ink-3">
                <BrandLogo brand={b} scale={0.7} />
              </span>
            ))}
          </Marquee>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Isocon"
        source="components/icons/isocon.tsx"
        description="An isometric line icon, hairline at any size. draw traces the outline in when the nearest group/iso is hovered."
        code={`<span className="group/iso w-12">
  <Isocon name="trending-up" draw />
</span>`}
      >
        <div className="flex flex-wrap items-end gap-8">
          <StateLabel label="static">
            <span className="block w-14 text-ink-2">
              <Isocon name="trending-up" />
            </span>
          </StateLabel>
          <StateLabel label="draw — hover me">
            <span className="group/iso block w-14 text-ink-2 transition-colors hover:text-accent-ink">
              <Isocon name="trending-up" draw />
            </span>
          </StateLabel>
          <StateLabel label="stroke={2}">
            <span className="block w-14 text-ink-2">
              <Isocon name="star" stroke={2} />
            </span>
          </StateLabel>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="SmoothScroll"
        source="components/motion/smooth-scroll.tsx"
        description="Lenis, mounted once in App and held in a ref so the editor’s Motion switch can pause it. lerp 0.1; not created for reduced motion. It is carrying this page’s scroll now."
        code={`<SmoothScroll lerp={0.1} />`}
      >
        <p className="flex items-center gap-2 text-sm text-ink-2">
          <Check className="size-4 text-green" /> Running on this page — scroll to feel it.
        </p>
      </ComponentSpecimen>
    </div>
  )
}

/* ─── Blocks from the sections and pages ──────────────────────────────── */

function PricingBlocks() {
  const [billing, setBilling] = useState<"monthly" | "annual">("annual")
  const featured = PRICING.plans.find((p) => "featured" in p && p.featured) ?? PRICING.plans[1]
  const plain = PRICING.plans[0]
  return (
    <ComponentSpecimen
      name="BillingToggle, RollingPrice and PlanCard"
      source="pages/pricing.tsx"
      description="The monthly/annual switch — a sliding thumb — drives the price, which rolls to its new value, and the “Save 20%” tag. The featured plan wears the accent border and a BorderBeam."
      code={`<BillingToggle value={billing} onChange={setBilling} />
<PlanCard plan={plan} billing={billing} />
<RollingPrice value={48} />`}
    >
      <div className="space-y-6">
        <BillingToggle value={billing} onChange={setBilling} />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <StateLabel label="default" className="items-stretch">
            <PlanCard plan={plain} billing={billing} />
          </StateLabel>
          <StateLabel label="featured · in BorderBeam" className="items-stretch">
            <BorderBeam size="md" colorVariant="ocean" strength={0.5} duration={9} className="h-full rounded-panel">
              <PlanCard plan={featured} billing={billing} />
            </BorderBeam>
          </StateLabel>
        </div>
        <StateLabel label="RollingPrice · custom">
          <RollingPrice value={null} />
        </StateLabel>
      </div>
    </ComponentSpecimen>
  )
}

function BlockLibrary() {
  return (
    <div className="space-y-6">
      <PricingBlocks />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 [&>*]:min-w-0">
        <ComponentSpecimen
          name="ChangelogCard and Ruler"
          source="components/sections/closing.tsx"
          description="An entry as a card — date, tag in its colour, an isocon that draws in, the title firming up on hover. The ruler ticks every 8px, taller every 64."
          code={`<ChangelogCard entry={CHANGELOG.entries[0]} />
<Ruler className="border-t border-line-strong" />`}
          previewClassName="p-0 sm:p-0"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            {CHANGELOG.entries.slice(0, 2).map((entry) => (
              <ChangelogCard key={entry.title} entry={entry} />
            ))}
          </div>
          <Ruler className="border-t border-line-strong" />
        </ComponentSpecimen>

        <ComponentSpecimen
          name="PromptCard"
          source="pages/agents.tsx"
          description="A saved prompt: an icon tile, a title and the prompt. Lifts 2px on hover and copies on click, with a copied state."
          code={`<PromptCard item={AGENTS.library.items[0]} />`}
        >
          <div className="flex flex-wrap gap-4">
            {AGENTS.library.items.slice(0, 2).map((item) => (
              <PromptCard key={item.title} item={item} />
            ))}
          </div>
        </ComponentSpecimen>

        <ComponentSpecimen
          name="AppTile"
          source="components/sections/integrations.tsx"
          description="One integration as a lit square with its mark — the integrations marquee is made of these."
          code={`<AppTile brand="slack-mark" />`}
        >
          <div className="flex flex-wrap gap-4">
            {(["slack-mark", "gmail", "linear", "figma"] as const).map((b) => (
              <AppTile key={b} brand={b} />
            ))}
          </div>
        </ComponentSpecimen>

        <ComponentSpecimen
          name="FramedPhoto and CompanyName"
          source="components/sections/stories.tsx · pages/customers.tsx"
          description="A photograph in a surface mat with a hairline, like a print; a customer’s name set as a wordmark."
          code={`<FramedPhoto image="team" />
<CompanyName name="Fieldwork" />`}
        >
          <div className="space-y-4">
            <FramedPhoto image="team" className="max-w-[360px]" />
            <div className="flex flex-wrap gap-8">
              <CompanyName name="Fieldwork" />
              <CompanyName name="Northwind" />
            </div>
          </div>
        </ComponentSpecimen>

        <ComponentSpecimen
          name="GrowthCurve"
          source="components/sections/scale.tsx"
          description="The scale section’s curve: a line-textured fill under a stroke that draws left to right on the Reveal curve."
          code={`<GrowthCurve />`}
        >
          <GrowthCurve />
        </ComponentSpecimen>

        <ComponentSpecimen
          name="Horizon and PinWave"
          source="components/sections/memory.tsx · pages/agents.tsx"
          description="Two backgrounds: a planet’s glowing rim rising under a headline (scroll-linked), and a wave of pins behind the Agents hero."
          code={`<div className="relative h-[320px] overflow-hidden"><Horizon /></div>
<div className="relative h-[420px] overflow-hidden"><PinWave count={80} /></div>`}
          previewClassName="p-0 sm:p-0"
        >
          <div className="relative h-[260px] overflow-hidden bg-void">
            <Horizon />
          </div>
          <div className="relative h-[240px] overflow-hidden border-t border-line-strong">
            <PinWave count={80} />
          </div>
        </ComponentSpecimen>
      </div>
    </div>
  )
}

/* ─── Whole sections ──────────────────────────────────────────────────── */

const SECTIONS: { name: string; source: string; code: string; note?: string; node: ReactNode }[] = [
  {
    name: "Hero",
    source: "components/sections/hero.tsx",
    code: `<Hero />`,
    note: "With HeroApp, the scripted app window: home → typing → thinking → answer. “Hero scene” steps it from the editor.",
    node: <Hero />,
  },
  { name: "Platform", source: "components/sections/platform.tsx", code: `<Platform />`, note: "The five-chapter tour. Its sticky chapter list only sticks at full page height.", node: <Platform /> },
  { name: "Record", source: "components/sections/record.tsx", code: `<Record />`, node: <Record /> },
  { name: "Memory", source: "components/sections/memory.tsx", code: `<Memory />`, note: "Deal Memory, with the signals accordion (“Signal” action).", node: <Memory /> },
  { name: "Integrations", source: "components/sections/integrations.tsx", code: `<Integrations />`, node: <Integrations /> },
  { name: "Developers", source: "components/sections/developers.tsx", code: `<Developers />`, note: "With CodeBlock, which copies itself (“Code copied” action).", node: <Developers /> },
  { name: "Quote", source: "components/sections/quote.tsx", code: `<Quote text="…" name="…" role="…" />`, note: "Words brighten as the quote scrolls through the window.", node: <Quote /> },
  { name: "Scale", source: "components/sections/scale.tsx", code: `<Scale />`, node: <Scale /> },
  { name: "Stories", source: "components/sections/stories.tsx", code: `<Stories />`, note: "Four customers as tabs (“Next story” action).", node: <Stories /> },
  { name: "ChangelogStrip", source: "components/sections/closing.tsx", code: `<ChangelogStrip />`, node: <ChangelogStrip /> },
  { name: "Newsletter", source: "components/sections/closing.tsx", code: `<Newsletter />`, note: "Its subscribed state is the “Subscribed” action.", node: <Newsletter /> },
  { name: "FinalCta", source: "components/sections/closing.tsx", code: `<FinalCta title={["Let the agents", "work the pipeline."]} />`, node: <FinalCta /> },
  { name: "Personas", source: "pages/agents.tsx", code: `<Personas />`, note: "Persona tabs over a tick ruler (“Next persona” action).", node: <Personas /> },
  {
    name: "CompareTable",
    source: "pages/pricing.tsx",
    code: `<CompareTable billing="annual" />`,
    note: "Every feature side by side; it scrolls sideways inside itself below 760px.",
    node: (
      <Container className="py-10">
        <CompareTable billing="annual" />
      </Container>
    ),
  },
]

function SectionLibrary() {
  return (
    <div className="space-y-6">
      <p className="max-w-[62ch] text-sm text-ink-2">
        Each section of the site, live and composed from the parts above. They are held to a window’s height here —
        open one to see it whole. The header and footer are the ones framing this page; the header’s announcement bar
        and mobile menu are the “Announcement” and “Mobile menu” actions.
      </p>
      {SECTIONS.map((s) => (
        <SectionFrame key={s.name} name={s.name} source={s.source} code={s.code} note={s.note}>
          {s.node}
        </SectionFrame>
      ))}
    </div>
  )
}

/* ─── The chapter ─────────────────────────────────────────────────────── */

const GROUPS = [
  { id: "ui", title: "Interface — components/ui", Body: UiLibrary },
  { id: "agent", title: "Agent UI — atoms and primitives", Body: AgentLibrary },
  { id: "kit", title: "Mockup kit", Body: KitLibrary },
  { id: "mockups", title: "Product mockups", Body: MockupLibrary },
  { id: "motion-components", title: "Motion", Body: MotionLibrary },
  { id: "blocks", title: "Blocks from sections and pages", Body: BlockLibrary },
  { id: "sections", title: "Sections", Body: SectionLibrary },
]

export function ComponentLibrary() {
  return (
    <div className="space-y-16">
      <nav aria-label="Component groups" className="flex flex-wrap gap-1.5">
        {GROUPS.map((g) => (
          <a
            key={g.id}
            href={`#${g.id}`}
            className="group/link inline-flex h-8 items-center gap-1 rounded-button border border-line-strong px-3 text-sm text-ink-2 transition-colors duration-300 hover:bg-surface hover:text-ink hover:duration-[50ms]"
          >
            {g.title.split(" — ")[0]}
            <ArrowRight className="size-3 text-ink-3 transition-transform duration-200 group-hover/link:translate-x-0.5" />
          </a>
        ))}
      </nav>
      {GROUPS.map(({ id, title, Body }) => (
        <div key={id} id={id} className="scroll-mt-[120px]">
          <GroupLabel className={cn("mb-6 text-h4 text-ink")}>{title}</GroupLabel>
          <Body />
        </div>
      ))}
    </div>
  )
}
