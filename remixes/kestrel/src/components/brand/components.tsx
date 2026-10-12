import { useState, type ReactNode } from "react"
import { ArrowRight, Loader2, RotateCcw } from "lucide-react"
import { runCanvasAction, useCanvasAction } from "@canvas/react"

import { EmailCapture } from "@/components/blocks/email-capture"
import { SectionHeading } from "@/components/blocks/section-heading"
import { ComponentSpecimen, GroupLabel, StateLabel } from "@/components/brand/specimen"
import { CountUp } from "@/components/motion/count-up"
import { Marquee } from "@/components/motion/marquee"
import { Reveal } from "@/components/motion/reveal"
import { KestrelMark, Logo } from "@/components/site/logo"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button, ButtonLink } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

/* ─── Button ──────────────────────────────────────────────────────────── */

/** Each variant with the classes its hover resolves to, so the hover state
 *  can be shown at rest. Written out whole so Tailwind generates them. */
const VARIANTS = [
  { variant: "lime", hover: "bg-lime-hover", night: false },
  { variant: "ink", hover: "bg-ink-2", night: false },
  { variant: "outline", hover: "bg-panel", night: false },
  { variant: "ghost", hover: "bg-panel text-ink", night: false },
  { variant: "link", hover: "text-ink", night: false },
  { variant: "night", hover: "bg-white", night: true },
] as const

function ButtonRow({ variant, hover, night }: (typeof VARIANTS)[number]) {
  const tone = night ? "night" : "page"
  return (
    <div className={cn("rounded-(--radius-card) p-5", night ? "bg-night" : "bg-page shadow-(--shadow-hairline)")}>
      <p className={cn("mb-4 font-mono text-[12px]", night ? "text-night-muted" : "text-ink-3")}>variant="{variant}"</p>
      <div className="flex flex-wrap items-start gap-x-5 gap-y-4">
        <StateLabel label="default" tone={tone}>
          <Button variant={variant}>Book a demo</Button>
        </StateLabel>
        <StateLabel label="hover" tone={tone}>
          <Button variant={variant} className={hover}>Book a demo</Button>
        </StateLabel>
        <StateLabel label="focus" tone={tone}>
          <Button variant={variant} className="ring-[3px] ring-ink/15">Book a demo</Button>
        </StateLabel>
        <StateLabel label="loading" tone={tone}>
          <Button variant={variant} disabled aria-busy>
            <Loader2 className="animate-spin" />
            Sending
          </Button>
        </StateLabel>
        <StateLabel label="disabled" tone={tone}>
          <Button variant={variant} disabled>Book a demo</Button>
        </StateLabel>
        <StateLabel label="with icon" tone={tone}>
          <Button variant={variant}>
            Start for free <ArrowRight />
          </Button>
        </StateLabel>
      </div>
    </div>
  )
}

function ButtonSpecimen() {
  return (
    <ComponentSpecimen
      name="Button"
      source="components/ui/button.tsx"
      description="Six variants, four sizes. Lime is the one thing to press on a screen — one per view. Every variant scales to 0.97 on press, fills on hover, and shows a soft ring on keyboard focus."
      code={`import { Button } from "@/components/ui/button"

<Button>Book a demo</Button>
<Button variant="ink" size="lg">Start for free <ArrowRight /></Button>
<Button variant="outline" size="sm">Sign in</Button>
<Button variant="link">Read the story <ArrowRight /></Button>`}
      previewClassName="space-y-4"
    >
      {VARIANTS.map((row) => (
        <ButtonRow key={row.variant} {...row} />
      ))}
      <div className="rounded-(--radius-card) p-5 shadow-(--shadow-hairline)">
        <p className="mb-4 font-mono text-[12px] text-ink-3">size</p>
        <div className="flex flex-wrap items-end gap-5">
          <StateLabel label='size="sm" · 32px'>
            <Button size="sm">Book a demo</Button>
          </StateLabel>
          <StateLabel label='size="default" · 40px'>
            <Button>Book a demo</Button>
          </StateLabel>
          <StateLabel label='size="lg" · 48px'>
            <Button size="lg">Book a demo</Button>
          </StateLabel>
          <StateLabel label='size="icon"'>
            <Button size="icon" variant="outline" aria-label="Next">
              <ArrowRight />
            </Button>
          </StateLabel>
        </div>
      </div>
    </ComponentSpecimen>
  )
}

/* ─── Fields ──────────────────────────────────────────────────────────── */

function InputSpecimen() {
  const [value, setValue] = useState("")
  return (
    <ComponentSpecimen
      name="Input"
      source="components/ui/input.tsx"
      description="shadcn's input on the page's tokens: a strong hairline at rest, a soft ring on focus, red when aria-invalid."
      code={`import { Input } from "@/components/ui/input"

<Input type="email" placeholder="name@company.com" />
<Input aria-invalid placeholder="name@company" />`}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <StateLabel label="live — type here" className="w-full">
          <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="name@company.com" className="h-10" />
        </StateLabel>
        <StateLabel label="focus" className="w-full">
          <Input placeholder="name@company.com" className="h-10 border-ring ring-[3px] ring-ring/50" />
        </StateLabel>
        <StateLabel label="aria-invalid" className="w-full">
          <Input aria-invalid defaultValue="name@company" className="h-10" />
        </StateLabel>
        <StateLabel label="disabled" className="w-full">
          <Input disabled placeholder="name@company.com" className="h-10" />
        </StateLabel>
      </div>
    </ComponentSpecimen>
  )
}

const CAPTURE = "Brand specimen"

function EmailCaptureSpecimen() {
  const show = (state: "idle" | "error" | "sent") => {
    runCanvasAction(`${CAPTURE}: error`, state === "error")
    runCanvasAction(`${CAPTURE}: sent`, state === "sent")
  }
  return (
    <ComponentSpecimen
      name="EmailCapture"
      source="components/blocks/email-capture.tsx"
      description="The work-email field with the lime button inside it. Submitting validates; a bad address shakes once and says how to fix it; a good one blurs into a confirmation. Try it, or jump between its states — the same switches the editor's Actions row gets."
      code={`import { EmailCapture } from "@/components/blocks/email-capture"

<EmailCapture
  cta="Start for free"
  name="Hero signup" // labels its states in the editor
/>`}
      tone="dots"
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap gap-2">
          {(["idle", "error", "sent"] as const).map((state) => (
            <Button key={state} variant="outline" size="sm" onClick={() => show(state)}>
              Show {state}
            </Button>
          ))}
        </div>
        <EmailCapture name={CAPTURE} />
      </div>
    </ComponentSpecimen>
  )
}

/* ─── Headings ────────────────────────────────────────────────────────── */

function SectionHeadingSpecimen() {
  return (
    <ComponentSpecimen
      name="SectionHeading"
      source="components/blocks/section-heading.tsx"
      description="The page's headline voice: the claim in ink and its reason in grey, at any step of the golden scale. Optional kicker above and a body line below; rises into place once on scroll."
      code={`import { SectionHeading } from "@/components/blocks/section-heading"

<SectionHeading
  kicker="50,000 teams and counting"
  title="One platform for the back office."
  continuation="Agents that work while you don’t."
  size="h1"
/>`}
      previewClassName="space-y-12"
    >
      <SectionHeading title="One platform for the back office." continuation="Agents that work while you don’t." />
      <SectionHeading
        kicker="50,000 teams and counting"
        title="We kept the receipts."
        body="What finance teams say after their first close on Kestrel."
        size="h1"
        align="center"
      />
      <SectionHeading title="Scale the team." continuation="Shrink the paperwork." size="display" />
    </ComponentSpecimen>
  )
}

/* ─── Disclosure ──────────────────────────────────────────────────────── */

function AccordionSpecimen() {
  return (
    <ComponentSpecimen
      name="Accordion"
      source="components/ui/accordion.tsx"
      description="Radix accordion: one open at a time, the chevron turns, the panel opens on the accordion-down curve (220ms) and closes a touch quicker."
      code={`import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

<Accordion type="single" collapsible>
  <AccordionItem value="fees">
    <AccordionTrigger>Are there card fees?</AccordionTrigger>
    <AccordionContent>No. Cards are free, physical and virtual.</AccordionContent>
  </AccordionItem>
</Accordion>`}
    >
      <Accordion type="single" collapsible defaultValue="fees" className="max-w-xl">
        {[
          ["fees", "Are there card fees?", "No. Physical and virtual cards are free, and so is issuing a thousand of them."],
          ["switch", "How long does switching take?", "Most teams issue their first cards the same day and run their first close on Kestrel within a month."],
          ["erp", "Does it work with our ERP?", "Kestrel syncs both ways with the common ERPs and accounting tools, and codes to your chart of accounts."],
        ].map(([value, q, a]) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-[16px]">{q}</AccordionTrigger>
            <AccordionContent className="text-[15px] text-ink-2">{a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </ComponentSpecimen>
  )
}

function TabsSpecimen() {
  return (
    <ComponentSpecimen
      name="Tabs"
      source="components/ui/tabs.tsx"
      description="Radix tabs in two variants: a segmented control on a panel, and a line under the active label."
      code={`import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

<Tabs defaultValue="monthly">
  <TabsList>
    <TabsTrigger value="monthly">Monthly</TabsTrigger>
    <TabsTrigger value="annual">Annual</TabsTrigger>
  </TabsList>
  <TabsContent value="monthly">…</TabsContent>
</Tabs>`}
    >
      <div className="grid gap-8 md:grid-cols-2">
        <StateLabel label='variant="default"' className="w-full">
          <Tabs defaultValue="monthly" className="w-full">
            <TabsList className="bg-panel">
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="annual">Annual</TabsTrigger>
            </TabsList>
            <TabsContent value="monthly" className="pt-3 text-[15px] text-ink-2">Billed each month. Cancel any time.</TabsContent>
            <TabsContent value="annual" className="pt-3 text-[15px] text-ink-2">Two months free, billed once a year.</TabsContent>
          </Tabs>
        </StateLabel>
        <StateLabel label='variant="line"' className="w-full">
          <Tabs defaultValue="cards" className="w-full">
            <TabsList variant="line">
              <TabsTrigger value="cards">Cards</TabsTrigger>
              <TabsTrigger value="bills">Bills</TabsTrigger>
              <TabsTrigger value="close">Close</TabsTrigger>
            </TabsList>
            <TabsContent value="cards" className="pt-3 text-[15px] text-ink-2">Limits that set themselves.</TabsContent>
            <TabsContent value="bills" className="pt-3 text-[15px] text-ink-2">Invoices read, coded and paid.</TabsContent>
            <TabsContent value="close" className="pt-3 text-[15px] text-ink-2">Books that close in days.</TabsContent>
          </Tabs>
        </StateLabel>
      </div>
    </ComponentSpecimen>
  )
}

function SliderSpecimen() {
  const [value, setValue] = useState([120])
  return (
    <ComponentSpecimen
      name="Slider"
      source="components/ui/slider.tsx"
      description="Radix slider for calculators: drag, click the track, or use the arrow keys. The figure beside it is the value it reports."
      code={`import { Slider } from "@/components/ui/slider"

const [people, setPeople] = useState([120])
<Slider value={people} onValueChange={setPeople} min={10} max={1000} step={10} />`}
      tone="panel"
    >
      <div className="flex max-w-xl flex-col gap-4">
        <div className="flex items-baseline justify-between">
          <span className="text-[15px] text-ink-2">People who spend</span>
          <span className="font-mono text-h4 text-ink tabular-nums">{value[0]}</span>
        </div>
        <Slider value={value} onValueChange={setValue} min={10} max={1000} step={10} aria-label="People who spend" />
        <StateLabel label="disabled" className="w-full">
          <Slider defaultValue={[40]} disabled className="w-full" />
        </StateLabel>
      </div>
    </ComponentSpecimen>
  )
}

function SheetSpecimen() {
  const [open, setOpen] = useState(false)
  useCanvasAction("Brand: sample sheet", (next) => setOpen(next ?? !open), { on: open, group: "Brand guidelines" })
  return (
    <ComponentSpecimen
      name="Sheet"
      source="components/ui/sheet.tsx"
      description="Radix dialog as a side sheet — the mobile menu is one. It slides in on the drawer curve, traps focus and closes on Esc or the scrim."
      code={`import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

<Sheet>
  <SheetTrigger asChild><Button variant="outline">Open</Button></SheetTrigger>
  <SheetContent side="right">
    <SheetTitle>Menu</SheetTitle>
  </SheetContent>
</Sheet>`}
    >
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline">Open the sheet</Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full max-w-sm border-l border-line bg-raised">
          <SheetHeader>
            <SheetTitle className="type-head text-h4">A side sheet</SheetTitle>
            <SheetDescription className="text-ink-2">The mobile menu opens the same way.</SheetDescription>
          </SheetHeader>
          <SheetFooter>
            <Button onClick={() => setOpen(false)}>Done</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </ComponentSpecimen>
  )
}

function NavigationMenuSpecimen() {
  return (
    <ComponentSpecimen
      name="NavigationMenu"
      source="components/ui/navigation-menu.tsx · components/site/site-header.tsx"
      description="Radix navigation menu. In the site header it opens full-width mega panels (link groups and a featured card) under the bar, and collapses into the Sheet below lg. A small one here; hover or focus Product."
      code={`import { NavigationMenu, NavigationMenuContent, NavigationMenuItem,
  NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"

<NavigationMenu viewport={false}>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Product</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink href="/platform">Corporate cards</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`}
      previewClassName="min-h-56"
    >
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent text-[15px] font-normal hover:bg-panel data-[state=open]:bg-panel">Product</NavigationMenuTrigger>
            <NavigationMenuContent className="!rounded-(--radius-card) !border-line !shadow-(--shadow-float)">
              <ul className="flex w-64 flex-col p-1">
                {[
                  ["Corporate cards", "Limits that set themselves"],
                  ["Bill pay", "Invoices read, coded, paid"],
                  ["Accounting", "Books that close in days"],
                ].map(([title, blurb]) => (
                  <li key={title}>
                    <NavigationMenuLink href="#components" className="gap-0 rounded-(--radius-field) px-2 py-1.5 hover:bg-panel">
                      <span className="text-[15px] font-medium text-ink">{title}</span>
                      <span className="text-[13px] text-ink-3">{blurb}</span>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </ComponentSpecimen>
  )
}

/* ─── Motion components ───────────────────────────────────────────────── */

/** Remounts its child, so a once-only animation can be watched again. */
function Replay({ children }: { children: (key: number) => ReactNode }) {
  const [key, setKey] = useState(0)
  return (
    <div className="flex flex-col items-start gap-4">
      {children(key)}
      <Button variant="outline" size="sm" onClick={() => setKey((k) => k + 1)}>
        <RotateCcw /> Replay
      </Button>
    </div>
  )
}

function MarqueeSpecimen() {
  return (
    <ComponentSpecimen
      name="Marquee"
      source="components/motion/marquee.tsx"
      description="A row that drifts sideways forever, content doubled so the loop has no seam. CSS keyframes, so reduced motion and the editor's Motion switch stop it; it pauses under the pointer."
      code={`import { Marquee } from "@/components/motion/marquee"

<Marquee speed={40} direction="left" pauseOnHover>
  {quotes.map((q) => <QuoteCard key={q.name} {...q} />)}
</Marquee>`}
      tone="panel"
      previewClassName="px-0 sm:px-0"
    >
      <Marquee speed={24}>
        {["Receipts matched", "Bills coded", "Cards issued", "Policies checked", "Books closed", "Vendors paid"].map((label) => (
          <span key={label} className="mr-3 rounded-(--radius-card) bg-raised px-4 py-3 text-[15px] whitespace-nowrap text-ink shadow-(--shadow-card)">
            {label}
          </span>
        ))}
      </Marquee>
    </ComponentSpecimen>
  )
}

function CountUpSpecimen() {
  return (
    <ComponentSpecimen
      name="CountUp"
      source="components/motion/count-up.tsx"
      description="A figure that counts to its value the first time it scrolls into view, on the strong ease-out. Final value at once for reduced motion and while designing."
      code={`import { CountUp } from "@/components/motion/count-up"

<CountUp value={184220} prefix="$" decimals={0} duration={1.2} />`}
    >
      <Replay>
        {(key) => (
          <p key={key} className="type-head text-display text-ink">
            <CountUp value={184220} prefix="$" decimals={0} />
          </p>
        )}
      </Replay>
    </ComponentSpecimen>
  )
}

function RevealSpecimen() {
  return (
    <ComponentSpecimen
      name="Reveal"
      source="components/motion/reveal.tsx"
      description="Content that rises 24px into place once, as it enters the viewport. Shown at rest while designing and for reduced motion — nobody styles an invisible element."
      code={`import { Reveal } from "@/components/motion/reveal"

<Reveal y={24} delay={0.1} easing="out">
  <FeatureCard />
</Reveal>`}
      tone="dots"
    >
      <Replay>
        {(key) => (
          <div key={key} className="grid w-full gap-3 sm:grid-cols-3">
            {["Swipe", "Capture", "Close"].map((label, i) => (
              <Reveal key={label} delay={i * 0.06} className="rounded-(--radius-card) bg-raised p-5 shadow-(--shadow-card)">
                <p className="font-mono text-[12.58px] text-ink-3">0{i + 1}</p>
                <p className="type-head mt-2 text-h4 text-ink">{label}</p>
              </Reveal>
            ))}
          </div>
        )}
      </Replay>
    </ComponentSpecimen>
  )
}

function LogoSpecimen() {
  return (
    <ComponentSpecimen
      name="Logo · KestrelMark"
      source="components/site/logo.tsx"
      description="The lowercase wordmark with the mark beside it, or the mark alone. currentColor throughout."
      code={`import { KestrelMark, Logo } from "@/components/site/logo"

<Logo />
<Logo mark={false} />
<KestrelMark className="size-6" />`}
    >
      <div className="flex flex-wrap items-end gap-8">
        <StateLabel label="<Logo />">
          <Logo />
        </StateLabel>
        <StateLabel label="mark={false}">
          <Logo mark={false} />
        </StateLabel>
        <StateLabel label="<KestrelMark />">
          <KestrelMark className="size-6 text-ink" />
        </StateLabel>
        <StateLabel label="on ink">
          <span className="grid size-10 place-items-center rounded-(--radius-field) bg-ink text-lime">
            <KestrelMark className="size-5" />
          </span>
        </StateLabel>
      </div>
    </ComponentSpecimen>
  )
}

function ButtonLinkSpecimen() {
  return (
    <ComponentSpecimen
      name="ButtonLink"
      source="components/ui/button.tsx"
      description="A Button that is a link, routed through the site's router — same variants and sizes. Its own component rather than asChild, so the editor's layers read ButtonLink."
      code={`import { ButtonLink } from "@/components/ui/button"

<ButtonLink href="/pricing">See pricing</ButtonLink>
<ButtonLink href="/customers" variant="link">Read the stories <ArrowRight /></ButtonLink>`}
    >
      <div className="flex flex-wrap items-center gap-4">
        <ButtonLink href="/pricing">See pricing</ButtonLink>
        <ButtonLink href="/platform" variant="outline">Tour the platform</ButtonLink>
        <ButtonLink href="/customers" variant="link">
          Read the stories <ArrowRight />
        </ButtonLink>
      </div>
    </ComponentSpecimen>
  )
}

/* ─── The library ─────────────────────────────────────────────────────── */

export function ComponentLibrary() {
  return (
    <div className="space-y-12">
      <div className="space-y-6">
        <GroupLabel>Primitives — components/ui</GroupLabel>
        <ButtonSpecimen />
        <ButtonLinkSpecimen />
        <InputSpecimen />
        <AccordionSpecimen />
        <TabsSpecimen />
        <SliderSpecimen />
        <SheetSpecimen />
        <NavigationMenuSpecimen />
      </div>
      <div className="space-y-6">
        <GroupLabel>Composed — components/blocks and site</GroupLabel>
        <EmailCaptureSpecimen />
        <SectionHeadingSpecimen />
        <LogoSpecimen />
      </div>
      <div className="space-y-6">
        <GroupLabel>Motion — components/motion</GroupLabel>
        <RevealSpecimen />
        <CountUpSpecimen />
        <MarqueeSpecimen />
      </div>
    </div>
  )
}
