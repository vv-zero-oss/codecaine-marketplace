import { useState, type ReactNode } from "react"
import { ArrowRight, CalendarClock, Clapperboard, MessageCircle, PenLine, RotateCcw, ShieldCheck, Sparkles } from "lucide-react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"

import { useCanvasAction } from "@canvas/react"
import { ComponentSpecimen, GroupLabel, Mono, StateLabel } from "@/components/brand/specimen"
import { AppWindow, Face, Frame, StatusPill, type Status } from "@/components/mockups/kit"
import { CommandCenter } from "@/components/mockups/command-center"
import { StudioPreview } from "@/components/mockups/studio-preview"
import { WeekCalendar } from "@/components/mockups/week-calendar"
import { WeeklyBrief } from "@/components/mockups/weekly-brief"
import { CountUp } from "@/components/motion/count-up"
import { FloatingChip } from "@/components/motion/floating-chip"
import { PixelSteps } from "@/components/motion/pixel-steps"
import { Reveal } from "@/components/motion/reveal"
import { ScrollGrow } from "@/components/motion/scroll-grow"
import { StreamingText } from "@/components/motion/streaming-text"
import { TypeReveal } from "@/components/motion/type-reveal"
import { Channels, ChannelCell } from "@/components/sections/home/channels"
import { DepthBox, InfoPanel, Node, Pill, STEPS } from "@/components/sections/home/how-it-works"
import { Insights } from "@/components/sections/home/insights"
import { Outcomes } from "@/components/sections/home/outcomes"
import { Pillars } from "@/components/sections/home/pillars"
import { AgentRoster } from "@/components/sections/manager/agent-roster"
import { WeekTimeline } from "@/components/sections/manager/week-timeline"
import { ComparePlans } from "@/components/sections/pricing/compare"
import { PricingFaq } from "@/components/sections/pricing/faq"
import { Plans, Price } from "@/components/sections/pricing/plans"
import { Approvals } from "@/components/sections/scheduler/approvals"
import { BestTime } from "@/components/sections/scheduler/best-time"
import { PageHero } from "@/components/sections/shared/page-hero"
import { PillarCard } from "@/components/sections/shared/pillar-grid"
import { Section } from "@/components/sections/shared/section"
import { StatBand } from "@/components/sections/shared/stat-band"
import { TrustStrip } from "@/components/sections/shared/trust-strip"
import { TemplateGallery } from "@/components/sections/studio/template-gallery"
import { WorkflowSteps } from "@/components/sections/studio/workflow-steps"
import { CtaBand } from "@/components/site/cta-band"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { BrandLogo } from "@/components/ui/brand-logo"
import { Button, ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Eyebrow } from "@/components/ui/eyebrow"
import { LogoMark, Wordmark } from "@/components/ui/logo-mark"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { ArtDisc, PixelArt } from "@/components/ui/pixel-art"
import { PixelIcon } from "@/components/ui/pixel-icon"
import { PixelList } from "@/components/ui/pixel-list"
import { SectionHeading } from "@/components/ui/section-heading"
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NAV, type NavGroup } from "@/content/site"
import { Link } from "@/lib/router"
import { cn } from "@/lib/utils"

/* ─── Helpers ─────────────────────────────────────────────────────────── */

/** A group of specimens under a small label. */
function Group({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <h3 className="font-serif text-heading font-light text-ink">{label}</h3>
        <span className="h-px flex-1 bg-line" />
      </div>
      {children}
    </div>
  )
}

/** Remounts its children, so a once-only entrance can be watched again. */
function Replay({ children, label = "Replay" }: { children: (key: number) => ReactNode; label?: string }) {
  const [key, setKey] = useState(0)
  return (
    <div className="flex flex-col items-start gap-5">
      {children(key)}
      <Button variant="outline" size="sm" onClick={() => setKey((k) => k + 1)}>
        <RotateCcw /> {label}
      </Button>
    </div>
  )
}

/**
 * Cancels the page-scroll parallax a FloatingChip applies, so a sample far
 * down this page stays in its box. On the pages the chip drifts as designed.
 */
function HoldStill({ depth, children, className }: { depth: number; children: ReactNode; className?: string }) {
  const { scrollY } = useScroll()
  const reduce = useReducedMotion()
  const y = useTransform(scrollY, (v) => (reduce ? 0 : v * depth * 0.55))
  return (
    <motion.div style={{ y }} className={cn("relative", className)}>
      {children}
    </motion.div>
  )
}

/** A full section, set in a hairline frame so it reads as a sample. */
function SectionFrame({ children, note }: { children: ReactNode; note?: string }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="overflow-hidden border border-line">{children}</div>
      {note ? <p className="text-[12px] text-muted">{note}</p> : null}
    </div>
  )
}

/* ─── Primitives ──────────────────────────────────────────────────────── */

const VARIANTS = ["primary", "outline", "ghost", "mint", "link"] as const
const NIGHT_VARIANTS = ["night", "night-outline"] as const
const SIZES = ["sm", "md", "lg", "icon"] as const

/** Hover and focus drawn on, so both can be seen without a pointer. */
const HOVER: Record<(typeof VARIANTS)[number] | (typeof NIGHT_VARIANTS)[number], string> = {
  primary: "bg-ink-soft",
  outline: "border-ink",
  ghost: "bg-sage",
  mint: "bg-mint-soft",
  link: "underline",
  night: "bg-white",
  "night-outline": "border-night-ink",
}
const FOCUS = "ring-2 ring-ring ring-offset-2 ring-offset-background"

function ButtonRow({ variant }: { variant: keyof typeof HOVER }) {
  return (
    <div className="flex flex-wrap items-end gap-x-6 gap-y-4">
      <Mono className="w-full sm:w-24">{variant}</Mono>
      <StateLabel label="default">
        <Button variant={variant}>Start free</Button>
      </StateLabel>
      <StateLabel label="hover">
        <Button variant={variant} className={HOVER[variant]}>
          Start free
        </Button>
      </StateLabel>
      <StateLabel label="focus">
        <Button variant={variant} className={FOCUS}>
          Start free
        </Button>
      </StateLabel>
      <StateLabel label="pressed">
        <Button variant={variant} className="scale-[0.97]">
          Start free
        </Button>
      </StateLabel>
      <StateLabel label="disabled">
        <Button variant={variant} disabled>
          Start free
        </Button>
      </StateLabel>
      <StateLabel label="with icon">
        <Button variant={variant}>
          Start free <ArrowRight />
        </Button>
      </StateLabel>
    </div>
  )
}

export function ButtonSpecimen() {
  return (
    <ComponentSpecimen
      name="Button and ButtonLink"
      source="components/ui/button.tsx"
      description="Square, flat, 14px medium. Seven variants — two of them for night sections — and four sizes on one cva recipe. Every press scales to 0.97 in 140ms. ButtonLink is the same recipe on the site router’s anchor."
      code={`import { Button, ButtonLink } from "@/components/ui/button"

<ButtonLink href="/pricing">Start free <ArrowRight /></ButtonLink>
<Button variant="outline" size="lg">Talk to sales</Button>
<Button variant="night-outline">See the agents</Button>`}
    >
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-5">
          {VARIANTS.map((variant) => (
            <ButtonRow key={variant} variant={variant} />
          ))}
        </div>
        <div className="night night-grid flex flex-col gap-5 bg-night p-5 text-night-ink md:p-6">
          {NIGHT_VARIANTS.map((variant) => (
            <ButtonRow key={variant} variant={variant} />
          ))}
        </div>
        <div className="flex flex-wrap items-end gap-6">
          <Mono className="w-full sm:w-24">sizes</Mono>
          {SIZES.map((size) => (
            <StateLabel key={size} label={size}>
              <Button size={size} aria-label={size === "icon" ? "Next" : undefined}>
                {size === "icon" ? <ArrowRight /> : "Start free"}
              </Button>
            </StateLabel>
          ))}
          <StateLabel label="ButtonLink">
            <ButtonLink href="#components" variant="outline">
              As a link
            </ButtonLink>
          </StateLabel>
        </div>
      </div>
    </ComponentSpecimen>
  )
}

const MENU_GROUP = NAV.find((item): item is NavGroup => "items" in item)!

export function NavigationSpecimen() {
  return (
    <ComponentSpecimen
      name="NavigationMenu"
      source="components/ui/navigation-menu.tsx"
      description="shadcn’s navigation menu on Radix. The header uses it without a viewport: a filled caret, a square panel on the menu shadow, and each link a title over one muted line. Hover or focus the trigger."
      code={`<NavigationMenu viewport={false}>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>AI Team</NavigationMenuTrigger>
      <NavigationMenuContent className="!rounded-none !shadow-menu">…</NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`}
      previewClassName="min-h-[340px]"
    >
      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap items-end gap-6">
          <StateLabel label="shadcn trigger style">
            <span className={navigationMenuTriggerStyle()}>Platform</span>
          </StateLabel>
          <StateLabel label="as the header draws it">
            <span className="text-sm font-medium text-ink">Pricing</span>
          </StateLabel>
          <StateLabel label="current page">
            <span className="text-sm font-medium text-ink underline decoration-1 underline-offset-[6px]">Scheduler</span>
          </StateLabel>
        </div>
        <NavigationMenu viewport={false} className="justify-start">
          <NavigationMenuList className="gap-6">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="h-auto gap-1.5 bg-transparent p-0 text-sm font-medium text-ink hover:bg-transparent hover:text-ink-soft focus:bg-transparent data-[state=open]:bg-transparent data-[state=open]:hover:bg-transparent data-[state=open]:focus:bg-transparent">
                {MENU_GROUP.label}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="!mt-5 !w-[min(340px,80vw)] !rounded-none !border-line !p-2 !shadow-menu">
                <ul className="flex flex-col">
                  {MENU_GROUP.items.map((link) => (
                    <li key={link.title}>
                      <NavigationMenuLink asChild>
                        <Link href={link.href} className="flex flex-col gap-1 rounded-none px-3 py-2.5 transition-colors duration-150 hover:bg-sage">
                          <span className="text-sm font-medium text-ink">{link.title}</span>
                          <span className="text-[13px] leading-snug text-muted">{link.description}</span>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </ComponentSpecimen>
  )
}

export function SheetSpecimen() {
  const [open, setOpen] = useState(false)
  useCanvasAction("Sheet sample", (next) => setOpen(next ?? !open), { on: open, group: "Brand guidelines" })
  return (
    <ComponentSpecimen
      name="Sheet"
      source="components/ui/sheet.tsx"
      description="shadcn’s sheet on Radix Dialog — the mobile menu slides in from the right on it. Square, hairline-edged, on cream. The header’s own menu is switched from the editor as “Mobile menu”; this sample as “Sheet sample”."
      code={`<Sheet open={open} onOpenChange={setOpen}>
  <SheetTrigger asChild><Button variant="outline">Open</Button></SheetTrigger>
  <SheetContent side="right" className="border-line bg-page p-0">…</SheetContent>
</Sheet>`}
    >
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline">Open the sheet</Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full max-w-sm gap-0 border-line bg-page p-0 sm:max-w-sm">
          <div className="flex h-[60px] items-center border-b border-line px-5">
            <SheetTitle className="text-sm font-medium text-muted">Menu</SheetTitle>
            <SheetDescription className="sr-only">A sample sheet</SheetDescription>
          </div>
          <nav className="flex flex-col px-5 py-4">
            {["AI Marketing Manager", "AI Video Studio", "Scheduler", "Pricing"].map((label) => (
              <span key={label} className="flex min-h-14 items-center border-b border-line font-serif text-xl font-light text-ink">
                {label}
              </span>
            ))}
          </nav>
          <div className="mt-auto grid grid-cols-2 border-t border-line">
            <Button variant="ghost" size="lg" onClick={() => setOpen(false)}>
              Close
            </Button>
            <Button size="lg" onClick={() => setOpen(false)}>
              Start free <ArrowRight />
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </ComponentSpecimen>
  )
}

export function SwitchSpecimen() {
  const [on, setOn] = useState(true)
  return (
    <ComponentSpecimen
      name="Switch"
      source="components/ui/switch.tsx"
      description="shadcn’s switch, the one rounded control. Ink when it sets billing, mint when it turns an approval rule on."
      code={`<Switch checked={yearly} onCheckedChange={setYearly} className="data-[state=checked]:bg-ink" />
<Switch checked={on} onCheckedChange={setOn} className="data-[state=checked]:bg-mint" />`}
    >
      <div className="flex flex-wrap items-end gap-8">
        <StateLabel label="live">
          <Switch checked={on} onCheckedChange={setOn} aria-label="Sample" className="data-[state=checked]:bg-ink" />
        </StateLabel>
        <StateLabel label="off">
          <Switch checked={false} aria-label="Off" />
        </StateLabel>
        <StateLabel label="on · ink">
          <Switch checked aria-label="On" className="data-[state=checked]:bg-ink" />
        </StateLabel>
        <StateLabel label="on · mint">
          <Switch checked aria-label="On" className="data-[state=checked]:bg-mint" />
        </StateLabel>
        <StateLabel label="focus">
          <Switch checked aria-label="Focus" className="border-ring ring-[3px] ring-ring/50 data-[state=checked]:bg-mint" />
        </StateLabel>
        <StateLabel label="disabled">
          <Switch checked disabled aria-label="Disabled" className="data-[state=checked]:bg-mint" />
        </StateLabel>
        <StateLabel label="size sm">
          <Switch size="sm" checked aria-label="Small" className="data-[state=checked]:bg-ink" />
        </StateLabel>
      </div>
    </ComponentSpecimen>
  )
}

export function TabsSpecimen() {
  return (
    <ComponentSpecimen
      name="Tabs"
      source="components/ui/tabs.tsx"
      description="shadcn’s tabs. The template gallery uses the line variant, squared off, with an ink rule under the active tab; the default variant is kept for dense UI."
      code={`<Tabs defaultValue="food">
  <TabsList variant="line" className="border-b border-line-strong/70 p-0">
    <TabsTrigger value="food" className="h-11 rounded-none px-4">Food & drink</TabsTrigger>
  </TabsList>
  <TabsContent value="food">…</TabsContent>
</Tabs>`}
    >
      <div className="flex flex-col gap-8">
        <Tabs defaultValue="reel">
          <TabsList variant="line" className="h-auto max-w-full flex-wrap justify-start gap-1 border-b border-line-strong/70 bg-transparent p-0">
            {["Reel", "Short", "Story", "Ad"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab.toLowerCase()}
                disabled={tab === "Ad"}
                className="h-11 flex-none rounded-none px-4 text-[14px] text-muted after:bottom-[-1px] data-[state=active]:text-ink"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
          {["reel", "short", "story"].map((tab) => (
            <TabsContent key={tab} value={tab} className="pt-4 text-[14px] text-ink-soft">
              The {tab} template set. “Ad” is disabled here to show the state.
            </TabsContent>
          ))}
        </Tabs>
        <Tabs defaultValue="week">
          <TabsList>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
          </TabsList>
          <Mono>variant default</Mono>
        </Tabs>
      </div>
    </ComponentSpecimen>
  )
}

export function TableSpecimen() {
  return (
    <ComponentSpecimen
      name="Table"
      source="components/ui/table.tsx"
      description="shadcn’s table: hairline rows, a sage hover, a serif plan name in the header. The comparison under Sections is built on it."
      code={`<Table>
  <TableHeader><TableRow><TableHead>Post</TableHead>…</TableRow></TableHeader>
  <TableBody><TableRow><TableCell>…</TableCell></TableRow></TableBody>
</Table>`}
      previewClassName="p-0 md:p-0"
    >
      <Table>
        <TableHeader>
          <TableRow className="border-line hover:bg-transparent">
            <TableHead className="px-4 text-[12px] text-muted md:px-6">Post</TableHead>
            <TableHead className="text-[12px] text-muted">Status</TableHead>
            <TableHead className="pr-4 text-right text-[12px] text-muted md:pr-6">Slot</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(
            [
              ["Autumn drop teaser", "scheduled", "Tue 18:30", ""],
              ["Hiring carousel", "review", "Wed 09:15", "hover"],
              ["Weekend recipe pin", "queued", "Sat 10:00", "selected"],
            ] as [string, Status, string, string][]
          ).map(([post, status, slot, state]) => (
            <TableRow
              key={post}
              data-state={state === "selected" ? "selected" : undefined}
              className={cn("border-line hover:bg-sage/50 data-[state=selected]:bg-sage", state === "hover" && "bg-sage/50")}
            >
              <TableCell className="px-4 text-[13px] text-ink md:px-6">
                {post} {state && <Mono className="ml-2">{state}</Mono>}
              </TableCell>
              <TableCell>
                <StatusPill status={status} />
              </TableCell>
              <TableCell className="pr-4 text-right text-[12px] text-muted tabular-nums md:pr-6">{slot}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ComponentSpecimen>
  )
}

export function AccordionSpecimen() {
  return (
    <ComponentSpecimen
      name="Accordion"
      source="components/ui/accordion.tsx"
      description="shadcn’s accordion on Radix: serif questions between hairlines, the panel opening in 220ms on the strong ease-out and closing in 180ms."
      code={`<Accordion type="single" collapsible className="border-t border-line">
  <AccordionItem value="q1" className="border-line">
    <AccordionTrigger className="font-serif text-[1.35rem] font-light hover:no-underline">…</AccordionTrigger>
    <AccordionContent className="text-[15px] text-ink-soft">…</AccordionContent>
  </AccordionItem>
</Accordion>`}
    >
      <Accordion type="single" collapsible defaultValue="open" className="max-w-2xl border-t border-line">
        {[
          { value: "open", q: "Open", a: "An answer, in body copy, at 15px on a relaxed line." },
          { value: "closed", q: "Closed", a: "Hidden until the trigger is pressed." },
          { value: "disabled", q: "Disabled", a: "Never shown.", disabled: true },
        ].map((item) => (
          <AccordionItem key={item.value} value={item.value} disabled={item.disabled} className="border-line">
            <AccordionTrigger className="min-h-14 cursor-pointer rounded-none py-5 font-serif text-[1.2rem] leading-snug font-light text-ink hover:no-underline md:text-[1.35rem]">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="max-w-xl pb-6 text-[15px] leading-relaxed text-ink-soft">{item.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </ComponentSpecimen>
  )
}

function Primitives() {
  return (
    <Group label="Primitives — components/ui">
      <ButtonSpecimen />
      <div className="grid gap-8 xl:grid-cols-2">
        <ComponentSpecimen
          name="LogoMark and Wordmark"
          source="components/ui/logo-mark.tsx"
          description="The mark alone, and mark plus name linking home — 22px on phones, 26px from md."
          code={`<Wordmark />
<LogoMark className="size-20 text-ink" />`}
        >
          <div className="flex flex-wrap items-end gap-8">
            <StateLabel label="Wordmark">
              <Wordmark />
            </StateLabel>
            <StateLabel label="LogoMark 24">
              <LogoMark className="text-ink" />
            </StateLabel>
            <StateLabel label="footer size">
              <LogoMark className="size-20 text-ink" />
            </StateLabel>
          </div>
        </ComponentSpecimen>
        <ComponentSpecimen
          name="Eyebrow"
          source="components/ui/eyebrow.tsx"
          description="The small grey label above every title. Night muted on night grounds."
          code={`<Eyebrow>Channels</Eyebrow>`}
        >
          <div className="flex flex-col gap-4">
            <Eyebrow>Channels</Eyebrow>
            <div className="night bg-night p-4">
              <Eyebrow className="text-night-muted">From the knowledge base</Eyebrow>
            </div>
          </div>
        </ComponentSpecimen>
      </div>
      <ComponentSpecimen
        name="SectionHeading"
        source="components/ui/section-heading.tsx"
        description="Eyebrow, serif title, one line of support — centred or from the left, on page or night. It rises in once through Reveal."
        code={`<SectionHeading eyebrow="Channels" title="Channel-agnostic by design" description="…" />
<SectionHeading align="left" tone="night" eyebrow="…" title="…" />`}
        previewClassName="p-0 md:p-0"
      >
        <div className="grid gap-px bg-line lg:grid-cols-2">
          <div className="bg-page p-6 md:p-10">
            <SectionHeading eyebrow="align center · tone light" title="Channel-agnostic by design" description="Post once, format everywhere." />
          </div>
          <div className="night night-grid bg-night p-6 md:p-10">
            <SectionHeading align="left" tone="night" eyebrow="align left · tone night" title="What happens while you’re in meetings" />
          </div>
        </div>
      </ComponentSpecimen>
      <div className="grid gap-8 xl:grid-cols-2">
        <ComponentSpecimen
          name="PixelIcon"
          source="components/ui/pixel-icon.tsx"
          description="Ten 9×9 bitmaps in currentColor. Sized by class; set on a mint tile."
          code={`<PixelIcon name="brain" className="size-7" />`}
        >
          <div className="flex flex-wrap items-end gap-4">
            <StateLabel label="size-8 (default)">
              <PixelIcon name="send" />
            </StateLabel>
            <StateLabel label="on tile">
              <span className="grid size-[72px] place-items-center bg-mint-tile text-ink">
                <PixelIcon name="film" />
              </span>
            </StateLabel>
            <StateLabel label="coloured">
              <PixelIcon name="chart" className="size-12 text-indigo" />
            </StateLabel>
          </div>
        </ComponentSpecimen>
        <ComponentSpecimen
          name="PixelList"
          source="components/ui/pixel-list.tsx"
          description="The notched-square bullet, in five accents, loose or ruled."
          code={`<PixelList items={["Campaign calendars", "Weekly briefs"]} accent="mint" ruled />`}
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <StateLabel label="accent ink">
              <PixelList items={["Campaign calendars", "Weekly briefs"]} className="text-ink-soft" />
            </StateLabel>
            <StateLabel label="ruled · mint">
              <PixelList items={["Nine channels", "One login"]} ruled accent="mint" className="w-full text-ink-soft" />
            </StateLabel>
            <div className="night col-span-full flex flex-wrap gap-6 bg-night p-4 text-night-ink/85">
              {(["coral", "butter", "periwinkle"] as const).map((accent) => (
                <StateLabel key={accent} label={accent} className="[&>span]:text-night-muted">
                  <PixelList items={["On night"]} accent={accent} />
                </StateLabel>
              ))}
            </div>
          </div>
        </ComponentSpecimen>
        <ComponentSpecimen
          name="PixelArt and ArtDisc"
          source="components/ui/pixel-art.tsx"
          description="A seeded field of square cells in one of four palettes — article and template covers — with icons in light or dark discs on top."
          code={`<PixelArt palette="mint" seed={3} className="aspect-[1.45]" icons={<ArtDisc><Sparkles /></ArtDisc>} />`}
        >
          <div className="grid grid-cols-2 gap-3">
            {(["mint", "graphite", "sage", "coral"] as const).map((palette, i) => (
              <StateLabel key={palette} label={palette} className="[&>div]:w-full">
                <PixelArt
                  palette={palette}
                  seed={i * 4 + 3}
                  className="aspect-[1.45] w-full"
                  icons={
                    <ArtDisc tone={i % 2 ? "dark" : "light"}>
                      <Sparkles />
                    </ArtDisc>
                  }
                />
              </StateLabel>
            ))}
          </div>
        </ComponentSpecimen>
        <ComponentSpecimen
          name="BrandLogo"
          source="components/ui/brand-logo.tsx"
          description="A channel’s SVGL logo. theme “dark” swaps in the variant drawn for night grounds where one exists."
          code={`<BrandLogo channel="tiktok" theme="dark" className="size-6" />`}
        >
          <div className="grid grid-cols-2 gap-px border border-line bg-line">
            {(["light", "dark"] as const).map((theme) => (
              <div key={theme} className={cn("flex flex-wrap items-center gap-4 p-4", theme === "dark" ? "bg-night" : "bg-page")}>
                {(["tiktok", "x", "threads", "instagram"] as const).map((channel) => (
                  <BrandLogo key={channel} channel={channel} theme={theme} className="size-6" />
                ))}
                <Mono className={cn("w-full", theme === "dark" && "text-night-muted")}>theme {theme}</Mono>
              </div>
            ))}
          </div>
        </ComponentSpecimen>
      </div>
      <div className="grid gap-8 xl:grid-cols-2">
        <SwitchSpecimen />
        <SheetSpecimen />
      </div>
      <NavigationSpecimen />
      <div className="grid gap-8 xl:grid-cols-2">
        <TabsSpecimen />
        <TableSpecimen />
      </div>
      <AccordionSpecimen />
      <ComponentSpecimen
        name="Container"
        source="components/ui/container.tsx"
        description="Centres a band’s content at 1440px between the --spacing-gutter clamps. Marked data-canvas-ignore, so the editor clicks through it."
        code={`<Container className="grid gap-10 md:grid-cols-2">…</Container>`}
        previewClassName="p-0 md:p-0"
      >
        <Container className="border-x border-dashed border-mint-ink/40 py-6">
          <p className="bg-sage p-4 text-center font-mono text-[12px] text-ink-soft">max-w-[1440px] · px-(--spacing-gutter) · mx-auto</p>
        </Container>
      </ComponentSpecimen>
    </Group>
  )
}

/* ─── Motion components ───────────────────────────────────────────────── */

const CHIP_TONES = ["mint", "mint-soft", "coral", "butter", "periwinkle", "sage"] as const
const CHIP_ICONS = [<Clapperboard key="a" />, <CalendarClock key="b" />, <MessageCircle key="c" />, <ShieldCheck key="d" />, <PenLine key="e" />, <Sparkles key="f" />]

function MotionComponents() {
  return (
    <Group label="Motion — components/motion">
      <div className="grid gap-8 xl:grid-cols-2">
        <ComponentSpecimen
          name="Reveal"
          source="motion/reveal.tsx"
          description="Fades and lifts its content 16px in 0.7s on the strong ease-out, once, as it scrolls in. Held at rest while designing and under reduced motion."
          code={`<Reveal delay={0.06} distance={16} duration={0.7}>…</Reveal>`}
        >
          <Replay>
            {(key) => (
              <div key={key} className="grid w-full grid-cols-3 gap-2">
                {[0, 1, 2].map((i) => (
                  <Reveal key={i} delay={i * 0.06} className="grid h-20 place-items-center bg-sage font-mono text-[11px] text-muted">
                    delay {i * 0.06}s
                  </Reveal>
                ))}
              </div>
            )}
          </Replay>
        </ComponentSpecimen>
        <ComponentSpecimen
          name="CountUp"
          source="motion/count-up.tsx"
          description="Counts to its value once, on scroll-in, over 1.4s on the strong ease-out. Prefix, suffix and decimals are props."
          code={`<CountUp value={31} prefix="+" suffix="%" />
<CountUp value={4.2} decimals={1} suffix="×" />`}
        >
          <Replay>
            {(key) => (
              <div key={key} className="flex flex-wrap items-baseline gap-8 font-serif text-[3.5rem] leading-none font-light text-ink">
                <CountUp value={31} prefix="+" suffix="%" />
                <CountUp value={4.2} decimals={1} suffix="×" />
                <CountUp value={248310} duration={2} />
              </div>
            )}
          </Replay>
        </ComponentSpecimen>
        <ComponentSpecimen
          name="TypeReveal"
          source="motion/type-reveal.tsx"
          description="Types a line in behind a solid block, 55ms a letter, and underlines the last word when done. Used once: “How it works”."
          code={`<TypeReveal text="How it works" speed={55} underline />`}
          tone="night"
        >
          <Replay>
            {(key) => (
              <p key={key} className="font-serif text-title font-light text-night-ink">
                <TypeReveal text="How it works" />
              </p>
            )}
          </Replay>
        </ComponentSpecimen>
        <ComponentSpecimen
          name="StreamingText"
          source="motion/streaming-text.tsx"
          description="Writes an answer out word by word with a blinking caret, as the Monday brief arrives. The editor switch “<label>: finished” shows it whole."
          code={`<StreamingText label="Monday brief" text="Last week reach grew 18%…" speed={38} />`}
        >
          <Replay>
            {(key) => (
              <StreamingText
                key={key}
                label="Style guide sample"
                className="min-h-[5.5rem] font-serif text-[1.35rem] leading-snug font-light text-ink"
                text="Saves on carousels dropped, so I’ve shortened them to six slides. This week: test three hooks."
              />
            )}
          </Replay>
        </ComponentSpecimen>
      </div>
      <ComponentSpecimen
        name="FloatingChip"
        source="motion/floating-chip.tsx"
        description="A workflow chip around a hero: an icon disc and a label pill in six tones and three sizes. depth sets its parallax against the page scroll; at 0.7 and above it becomes a blurred shape with no label. Hidden below md on the pages; held still here so the samples stay in their box."
        code={`<FloatingChip label="Caption drafting" tone="periwinkle" icon={<PenLine />} size="sm" depth={0.3} className="left-[66%] top-[86%]" />
<FloatingChip tone="mint" depth={0.9} size="lg" />`}
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap gap-x-4 gap-y-6">
            {CHIP_TONES.map((tone, i) => (
              <StateLabel key={tone} label={tone}>
                <HoldStill depth={0.3} className="h-10 w-56">
                  <FloatingChip label="Caption drafting" tone={tone} icon={CHIP_ICONS[i]} className="top-0 left-0 flex" />
                </HoldStill>
              </StateLabel>
            ))}
          </div>
          <div className="flex flex-wrap items-end gap-x-6 gap-y-6">
            {(["sm", "md", "lg"] as const).map((size) => (
              <StateLabel key={size} label={`size ${size}`}>
                <HoldStill depth={0.3} className="h-10 w-52">
                  <FloatingChip label="Approvals" tone="butter" size={size} icon={<ShieldCheck />} className="top-0 left-0 flex" />
                </HoldStill>
              </StateLabel>
            ))}
            <StateLabel label="depth ≥ 0.7 · ghost md, lg">
              <HoldStill depth={0.8} className="h-10 w-48">
                <FloatingChip tone="mint" depth={0.8} className="top-3 left-0 block" />
                <FloatingChip tone="periwinkle" depth={0.8} size="lg" className="top-3 left-20 block" />
              </HoldStill>
            </StateLabel>
          </div>
        </div>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="PixelSteps"
        source="motion/pixel-steps.tsx"
        description="The stepped block wipe between light and night bands: columns of cells climb in a staircase as the boundary scrolls past, snapped to whole cells. rise “up” grows night from below, “down” hangs it from above; lead picks the side it climbs from. Scroll to watch it."
        code={`<PixelSteps rise="up" columns={15} rows={5} lead="right" />
<PixelSteps rise="down" columns={15} rows={5} />`}
        previewClassName="p-0 md:p-0"
      >
        <div className="flex flex-col">
          <Mono className="px-5 py-3">rise up · lead right</Mono>
          <PixelSteps rise="up" columns={15} rows={5} lead="right" />
          <div className="night bg-night px-5 py-8 font-mono text-[11px] text-night-muted">a night band</div>
          <PixelSteps rise="down" columns={15} rows={5} />
          <Mono className="px-5 py-3">rise down · lead left</Mono>
        </div>
      </ComponentSpecimen>
      <div className="grid gap-8 xl:grid-cols-2">
        <ComponentSpecimen
          name="ScrollGrow"
          source="motion/scroll-grow.tsx"
          description="Clips its content from the bottom and opens it as it rises up the screen — the product window under the home hero starts as an 18% strip."
          code={`<ScrollGrow start={18}><CommandCenter /></ScrollGrow>`}
          tone="sage"
        >
          <ScrollGrow start={18}>
            <PixelArt palette="mint" seed={5} className="aspect-[1.6]" icons={<ArtDisc><Clapperboard /></ArtDisc>} />
          </ScrollGrow>
        </ComponentSpecimen>
        <ComponentSpecimen
          name="SmoothScroll"
          source="motion/smooth-scroll.tsx"
          description="Lenis, carrying this page’s scroll at lerp 0.09. It renders nothing: it is mounted once in App, held in a ref the editor can pause, and not created at all under reduced motion."
          code={`<SmoothScroll lerp={0.09} wheelMultiplier={1} enabled />`}
        >
          <div className="grid gap-px border border-line bg-line font-mono text-[12px] text-ink-soft sm:grid-cols-3">
            {[
              ["lerp", "0.09"],
              ["wheelMultiplier", "1"],
              ["anchors.offset", "-84px"],
            ].map(([k, v]) => (
              <div key={k} className="bg-page p-4">
                <p className="text-muted">{k}</p>
                <p className="mt-1 text-lg text-ink">{v}</p>
              </div>
            ))}
          </div>
        </ComponentSpecimen>
      </div>
    </Group>
  )
}

/* ─── Mockups ─────────────────────────────────────────────────────────── */

const STATUSES: Status[] = ["scheduled", "drafting", "rendering", "review", "queued", "published"]

function Mockups() {
  return (
    <Group label="Product mockups — components/mockups">
      <ComponentSpecimen
        name="Mockup kit"
        source="mockups/kit.tsx"
        description="The parts every product window is made of: StatusPill in six states, Face, Frame on light and night, and the AppWindow chrome."
        code={`<AppWindow>
  <Frame title="This week"><StatusPill status="review" /> <Face who="maya" /></Frame>
</AppWindow>`}
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap gap-3">
            {STATUSES.map((status) => (
              <StateLabel key={status} label={status}>
                <StatusPill status={status} />
              </StateLabel>
            ))}
          </div>
          <div className="flex flex-wrap items-end gap-6">
            <StateLabel label="Face">
              <span className="flex items-center gap-2 text-[12px] text-ink">
                <Face who="maya" /> Maya R.
              </span>
            </StateLabel>
            <StateLabel label="Face size-8">
              <Face who="theo" className="size-8" />
            </StateLabel>
          </div>
          <AppWindow className="grid gap-3 p-4 sm:grid-cols-2">
            <Frame title="Frame · light">
              <p className="text-[13px]">Hairline box with a small title.</p>
            </Frame>
            <Frame title="Frame · night" tone="night">
              <p className="text-[13px]">The same, on night.</p>
            </Frame>
          </AppWindow>
        </div>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="CommandCenter"
        source="mockups/command-center.tsx"
        description="The home hero’s product window: this week’s progress by stage and channel, and the queue the AI team is working through."
        code={`<ScrollGrow start={18}><CommandCenter /></ScrollGrow>`}
        tone="sage"
      >
        <CommandCenter />
      </ComponentSpecimen>
      <ComponentSpecimen
        name="WeeklyBrief"
        source="mockups/weekly-brief.tsx"
        description="The Monday brief the AI Marketing Manager writes, streamed in; the plan for the week and a post waiting on a yes."
        code={`<WeeklyBrief />`}
        tone="sage"
      >
        <WeeklyBrief />
      </ComponentSpecimen>
      <ComponentSpecimen
        name="StudioPreview"
        source="mockups/studio-preview.tsx"
        description="The video studio: brief, storyboard and render queue. The format tabs swap the storyboard with a short blur; each format is an editor switch (“Format: Reel” …)."
        code={`<StudioPreview />`}
        tone="sage"
      >
        <StudioPreview />
      </ComponentSpecimen>
      <ComponentSpecimen
        name="WeekCalendar"
        source="mockups/week-calendar.tsx"
        description="A week of posts on a time grid, three, five or seven days wide by breakpoint. Post chips lift on hover with the float shadow."
        code={`<WeekCalendar />`}
        tone="sage"
      >
        <WeekCalendar />
      </ComponentSpecimen>
    </Group>
  )
}

/* ─── Sections ────────────────────────────────────────────────────────── */

function SectionBlocks() {
  return (
    <Group label="Sections and site — components/sections, components/site">
      <ComponentSpecimen
        name="SiteHeader and SiteFooter"
        source="site/site-header.tsx · site/site-footer.tsx"
        description="Both are live on this page: the sticky header above (wordmark, the navigation menu, two hairline cells, a sheet below lg) and the footer below (the big mark, six link columns, credits). They are not repeated here."
        code={`<SiteHeader />
<main>…</main>
<SiteFooter />`}
      >
        <div className="flex flex-wrap items-center gap-4">
          <Wordmark />
          <Mono>Scroll to the top for the header, to the end for the footer. Below lg the header’s menu is a sheet (editor switch “Mobile menu”).</Mono>
        </div>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="Section"
        source="sections/shared/section.tsx"
        description="A band of the page with the section rhythm and a ground: page, sage or night."
        code={`<Section id="channels" tone="sage">…</Section>`}
        previewClassName="p-0 md:p-0"
      >
        <div className="grid sm:grid-cols-3">
          {(["page", "sage", "night"] as const).map((tone) => (
            <Section key={tone} tone={tone} className="py-10 md:py-12">
              <p className="px-6 font-mono text-[12px]">tone “{tone}”</p>
            </Section>
          ))}
        </div>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="PageHero"
        source="sections/shared/page-hero.tsx"
        description="Every page opens with it: eyebrow, serif display line, one sentence, a black button and an outline one, with FloatingChips around it and the page’s product visual as children. The top of this page is one; here, the compact variant."
        code={`<PageHero eyebrow="Pricing" title="…" description="…" secondary="Talk to sales" chips={CHIPS} compact />`}
        previewClassName="p-0 md:p-0"
      >
        <PageHero
          compact
          eyebrow="Scheduler"
          title="Every channel, every market, one calendar."
          description="The compact hero, for pages whose content starts right under it."
          ctaHref="#components"
          secondary="Secondary"
          secondaryHref="#components"
          chips={[
            { label: "Time zones", tone: "periwinkle", icon: <CalendarClock />, depth: 0, className: "left-[4%] top-[14%]" },
            { label: "Approvals", tone: "butter", icon: <ShieldCheck />, depth: 0, size: "sm", className: "right-[5%] top-[78%]" },
          ]}
        />
      </ComponentSpecimen>
      <ComponentSpecimen
        name="TrustStrip"
        source="sections/shared/trust-strip.tsx"
        description="One row of customer marks under a hero, with a label that changes per page."
        code={`<TrustStrip label="Scheduling 40,000 posts a week for teams like" />`}
        previewClassName="p-0 md:p-0"
      >
        <TrustStrip />
      </ComponentSpecimen>
      <ComponentSpecimen
        name="PillarGrid and PillarCard — Pillars"
        source="sections/shared/pillar-grid.tsx · home/pillars.tsx"
        description="Three or four columns between hairlines: a mint tile with a pixel icon, a serif name, a promise and a pixel list. Pillars is Home’s use of it; the manager, scheduler and studio pages use it with their own copy."
        code={`<PillarGrid pillars={[{ icon: <PixelIcon name="brain" />, title: "Plan", lede: "…", items: ["…"] }]} />`}
        previewClassName="p-0 md:p-0"
      >
        <Pillars />
        <div className="grid border-t border-line md:grid-cols-2">
          <PillarCard
            index={0}
            pillar={{ icon: <PixelIcon name="shield" />, title: "Approvals", lede: "Your rules decide what needs a yes.", items: ["Per-channel sign-off", "Legal review for paid posts"] }}
          />
          <PillarCard
            index={1}
            pillar={{ icon: <PixelIcon name="clock" />, title: "Audit trail", lede: "Every draft, edit and post, on record.", items: ["Who changed what", "Exportable"] }}
          />
        </div>
      </ComponentSpecimen>
      <SectionFrame>
        <Outcomes />
      </SectionFrame>
      <ComponentSpecimen
        name="Outcomes and OutcomesCarousel"
        source="sections/home/outcomes.tsx"
        description="Above: a counted-up number and the customer who earned it, advancing every 7s while the timer bars fill; arrows and bars to step through. Each slide is an editor switch (“Slide 1 — Priya Anand” …)."
        code={`<Outcomes eyebrow="Customer stories" title="Teams that handed over the busywork" />
<OutcomesCarousel interval={7} autoplay />`}
      >
        <Mono>Rendered in full above.</Mono>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="How it works — the tour’s parts"
        source="sections/home/how-it-works.tsx"
        description="HowItWorksTour pins a night section for five screens on desktop, so it is shown here in part: its Node labels, Pill tones, DepthBox, the four step visuals and their InfoPanel cards. Below 1024px the home page stacks exactly these pieces."
        code={`<Node label="Unified inbox" tone="mint" />
<DepthBox title="Connected">…</DepthBox>
<InfoPanel step={STEPS[0]} index={0} />`}
        tone="night"
      >
        <div className="flex flex-col gap-10">
          <div className="flex flex-wrap gap-6">
            {STEPS.map((step, i) => (
              <Node key={step.key} label={step.node} tone={step.tone} active={i !== 3} />
            ))}
            <Mono className="w-full text-night-muted">Node · the last one inactive (45%)</Mono>
          </div>
          <div className="flex flex-wrap gap-2">
            {(["outline", "dim", "mint", "coral", "butter"] as const).map((tone) => (
              <Pill key={tone} tone={tone}>
                {tone}
              </Pill>
            ))}
          </div>
          <DepthBox title="DepthBox — a hairline box with a second outline behind it" className="max-w-md">
            <p className="text-[13px] text-night-muted">The building block of every step visual.</p>
          </DepthBox>
          {STEPS.map((step, i) => (
            <div key={step.key} className="grid gap-6 border-t border-night-line pt-8 lg:grid-cols-[1.35fr_1fr] lg:items-center">
              <step.Visual />
              <InfoPanel step={step} index={i} />
            </div>
          ))}
        </div>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="Channels and ChannelCell"
        source="sections/home/channels.tsx"
        description="The channel grid: each cell a logo, its name and a quiet “Explore” whose arrow nudges on hover, over a sage fill."
        code={`<ChannelCell channel="linkedin" />`}
        previewClassName="p-0 md:p-0"
      >
        <div className="grid grid-cols-2 border-t border-l border-line">
          <ChannelCell channel="linkedin" />
          <ChannelCell channel="youtube" />
        </div>
        <Channels />
      </ComponentSpecimen>
      <SectionFrame note="Insights and InsightCard — sections/home/insights.tsx: pixel covers, date and tag, a title that turns mint soft on hover.">
        <Insights />
      </SectionFrame>
      <SectionFrame note="AgentRoster and AgentCard — sections/manager/agent-roster.tsx: five agents with a live status ping, and a sage cell for the people.">
        <AgentRoster />
      </SectionFrame>
      <SectionFrame note="WeekTimeline — sections/manager/week-timeline.tsx: a working week on the night ground, one row a day.">
        <WeekTimeline />
      </SectionFrame>
      <SectionFrame note="StatBand — sections/shared/stat-band.tsx: serif numbers that count up on the night grid.">
        <StatBand
          eyebrow="Short-form, at volume"
          title="More video than your team could cut."
          stats={[
            { value: 14, label: "Clips from one 40-minute interview", tone: "bg-coral" },
            { value: 38, label: "Languages for captions and voiceover", tone: "bg-mint" },
            { value: 90, suffix: "s", label: "Average time from brief to render", tone: "bg-butter" },
          ]}
        />
      </SectionFrame>
      <SectionFrame note="WorkflowSteps — sections/studio/workflow-steps.tsx: a numbered process between hairlines, four or five wide.">
        <WorkflowSteps
          eyebrow="How the studio works"
          title="Brief in, finished video out"
          steps={[
            { title: "Brief", body: "A sentence, a link or a long video.", tone: "bg-mint-tile" },
            { title: "Script", body: "Hook, beats and call to action.", tone: "bg-periwinkle" },
            { title: "Storyboard", body: "Scenes matched to your footage.", tone: "bg-coral-soft" },
            { title: "Render", body: "Voice, music and captions in 90s.", tone: "bg-butter" },
          ]}
        />
      </SectionFrame>
      <SectionFrame note="TemplateGallery and TemplateCard — sections/studio/template-gallery.tsx: line tabs over 9:16 posters that zoom and show a play disc on hover. Each tab is an editor switch.">
        <TemplateGallery />
      </SectionFrame>
      <SectionFrame note="BestTime and Heatmap — sections/scheduler/best-time.tsx: hover or focus a slot to read it.">
        <BestTime />
      </SectionFrame>
      <SectionFrame note="Approvals and RuleRow — sections/scheduler/approvals.tsx: the path a post takes, and rules each switched from the page or the editor.">
        <Approvals />
      </SectionFrame>
      <SectionFrame note="Plans, PlanCard and Price — sections/pricing/plans.tsx: the billing switch rolls every price; the featured plan carries the border beam.">
        <Plans />
      </SectionFrame>
      <ComponentSpecimen
        name="Price"
        source="sections/pricing/plans.tsx"
        description="A figure that rolls up and blurs through to its new value in 350ms — or “Custom” when a plan has no list price."
        code={`<Price value={yearly ? 82 : 99} />
<Price value={null} />`}
      >
        <PriceDemo />
      </ComponentSpecimen>
      <SectionFrame note="ComparePlans — sections/pricing/compare.tsx: the Table primitive, grouped rows on panel, the featured column tinted mint.">
        <ComparePlans />
      </SectionFrame>
      <SectionFrame note="PricingFaq — sections/pricing/faq.tsx: each question is an editor switch in the FAQ group.">
        <PricingFaq />
      </SectionFrame>
      <SectionFrame note="CtaBand — site/cta-band.tsx: the closing line of every page, the button set into a cluster of ink blocks.">
        <CtaBand title="Move from posting every day to growing the brand." />
      </SectionFrame>
      <p className="border border-dashed border-line-strong p-5 text-[14px] text-ink-soft">
        <span className="font-medium text-ink">HomeHero</span> is PageHero + ScrollGrow + CommandCenter with the home chips, and{" "}
        <span className="font-medium text-ink">HowItWorks</span> is HowItWorksTour on the night grid — both shown above by their parts. The full
        versions are on the home page.
      </p>
    </Group>
  )
}

function PriceDemo() {
  const [yearly, setYearly] = useState(true)
  return (
    <div className="flex flex-wrap items-end gap-10">
      <StateLabel label={yearly ? "yearly" : "monthly"}>
        <Price value={yearly ? 82 : 99} />
      </StateLabel>
      <StateLabel label="custom">
        <Price value={null} />
      </StateLabel>
      <Button variant="outline" size="sm" onClick={() => setYearly((y) => !y)}>
        Switch billing
      </Button>
    </div>
  )
}

export function ComponentLibrary() {
  return (
    <div className="flex flex-col gap-20">
      <Primitives />
      <MotionComponents />
      <Mockups />
      <SectionBlocks />
      <GroupLabel>Every component above is the real one, imported from where the pages import it.</GroupLabel>
    </div>
  )
}
