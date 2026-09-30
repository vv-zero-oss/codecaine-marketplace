import { useState, type ComponentType, type ReactNode } from "react"
import { ArrowRight, Laptop } from "lucide-react"
import { BorderBeam } from "border-beam"
import { useCanvasAction } from "@canvas/react"

import { Doodle, Hearts, Spark } from "@/components/blocks/doodle"
import { DuotonePhoto } from "@/components/blocks/duotone-photo"
import { EmailCapture } from "@/components/blocks/email-capture"
import { QuoteBlock } from "@/components/blocks/quote-block"
import { ScaledFrame } from "@/components/blocks/scaled-frame"
import { SectionTitle } from "@/components/blocks/section-title"
import { CodeSnippet, ComponentSpecimen, GroupLabel, StateLabel } from "@/components/brand/specimen"
import { DashboardMock } from "@/components/mock/dashboard-mock"
import { DeckMock } from "@/components/mock/deck-mocks"
import { InboxMock } from "@/components/mock/inbox-mock"
import { AppWindow, Initials, Tag } from "@/components/mock/parts"
import { FeatureDeck } from "@/components/motion/feature-deck"
import { GradientBlob } from "@/components/motion/gradient-blob"
import { Marquee } from "@/components/motion/marquee"
import { ParallaxColumns } from "@/components/motion/parallax-columns"
import { ParallaxImage } from "@/components/motion/parallax-image"
import { Reveal } from "@/components/motion/reveal"
import { RiseIn } from "@/components/motion/rise-in"
import { TiltCard } from "@/components/motion/tilt-card"
import { Typewriter } from "@/components/motion/typewriter"
import { Articles, ArticleCard } from "@/components/sections/articles"
import { Copilot } from "@/components/sections/copilot"
import { Faq } from "@/components/sections/faq"
import { Hero } from "@/components/sections/hero"
import { HowItWorks, StepCard } from "@/components/sections/how-it-works"
import { JourneyCta } from "@/components/sections/journey-cta"
import { LogoCloud } from "@/components/sections/logo-cloud"
import { LoveCard, LoveWall } from "@/components/sections/love-wall"
import { Numbers, Stat } from "@/components/sections/numbers"
import { Personas } from "@/components/sections/personas"
import { Platform } from "@/components/sections/platform"
import { PlanCard, Pricing } from "@/components/sections/pricing"
import { QuoteSection } from "@/components/sections/quote-section"
import { ResultCard, Results } from "@/components/sections/results"
import { Showcase } from "@/components/sections/showcase"
import { Stories, StoryCard } from "@/components/sections/stories"
import { UnlockCta } from "@/components/sections/unlock-cta"
import { SiteHeader } from "@/components/site/site-header"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { BrandLogo } from "@/components/ui/brand-logo"
import { Button, ButtonLink } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Container } from "@/components/ui/container"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogoMark, Wordmark } from "@/components/ui/wordmark"
import { FAQ, LOGO_ROW, LOVE, NAV, NUMBERS, PERSONAS, PLATFORM, PRICING, QUOTES, RESULTS, SHOWCASE, STEPS, STORIES, ARTICLES } from "@/content"
import { pexels } from "@/lib/photos"
import { cn } from "@/lib/utils"

/* ─── Primitives: components/ui ───────────────────────────────────────── */

const VARIANTS = [
  { variant: "default", hover: "bg-ink-soft", night: false },
  { variant: "outline", hover: "bg-paper", night: false },
  { variant: "ghost", hover: "bg-paper-deep text-ink", night: false },
  { variant: "link", hover: "underline", night: false },
  { variant: "light", hover: "bg-paper", night: true },
  { variant: "night", hover: "bg-night-line", night: true },
] as const

const FOCUS = "ring-[3px] ring-ring/40"
const SIZES = ["sm", "default", "lg", "icon"] as const

export function ButtonSpecimen() {
  return (
    <ComponentSpecimen
      name="Button · ButtonLink"
      source="components/ui/button.tsx"
      description="Six variants and four sizes on a cva recipe. 8px corners, 15px medium type, a colour change on hover, a 0.97 press and a soft focus ring. `light` and `night` are for the dark grounds. ButtonLink is the same recipe on an anchor."
      code={`import { Button, ButtonLink } from "@/components/ui/button"

<Button>Get free trial</Button>
<ButtonLink href="#app" variant="outline" size="sm">Open app</ButtonLink>
<Button variant="light">Get free trial</Button>  {/* on night / lagoon */}`}
      previewClassName="p-0 sm:p-0"
    >
      <div className="divide-y divide-line">
        {VARIANTS.map(({ variant, hover, night }) => (
          <div
            key={variant}
            className={cn("flex flex-wrap items-end gap-x-6 gap-y-4 p-5 sm:px-8", night ? "bg-night" : "bg-paper")}
          >
            <span className={cn("w-full font-mono text-[11px]", night ? "text-night-subtle" : "text-ink-subtle")}>{variant}</span>
            {(["default", "hover", "focus", "pressed", "disabled"] as const).map((state) => (
              <StateLabel key={state} label={state} tone={night ? "night" : "paper"}>
                <Button
                  variant={variant}
                  disabled={state === "disabled"}
                  className={cn(state === "hover" && hover, state === "focus" && FOCUS, state === "pressed" && "scale-[0.97]")}
                >
                  Get free trial
                </Button>
              </StateLabel>
            ))}
            <StateLabel label="with icon" tone={night ? "night" : "paper"}>
              <Button variant={variant}>
                Read story <ArrowRight />
              </Button>
            </StateLabel>
          </div>
        ))}
        <div className="flex flex-wrap items-end gap-6 bg-paper p-5 sm:px-8">
          <span className="w-full font-mono text-[11px] text-ink-subtle">sizes</span>
          {SIZES.map((size) => (
            <StateLabel key={size} label={size}>
              <Button size={size} variant="outline" aria-label={size === "icon" ? "Next" : undefined}>
                {size === "icon" ? <ArrowRight /> : "Open app"}
              </Button>
            </StateLabel>
          ))}
          <StateLabel label="ButtonLink">
            <ButtonLink href="#components">As a link</ButtonLink>
          </StateLabel>
          <StateLabel label="pill (steps)">
            <ButtonLink href="#components" className="h-11 rounded-full px-5 shadow-(--shadow-float)">
              {STEPS.primary}
            </ButtonLink>
          </StateLabel>
          <StateLabel label="plan">
            <ButtonLink href="#components" className="h-12 rounded-[8px] px-5 text-[16px]">
              <Laptop className="size-4" /> Download
            </ButtonLink>
          </StateLabel>
        </div>
        <div className="flex flex-wrap items-end gap-6 bg-lagoon p-5 sm:px-8">
          <span className="w-full font-mono text-[11px] text-night-subtle">on lagoon</span>
          <StateLabel label="go" tone="night">
            <ButtonLink href="#components" size="lg" className="h-12 rounded-full bg-go px-6 text-[17px] text-lagoon shadow-none hover:bg-go-hover">
              {SHOWCASE.primary}
            </ButtonLink>
          </StateLabel>
          <StateLabel label="go outline" tone="night">
            <ButtonLink href="#components" size="lg" className="h-12 rounded-full border-2 border-go bg-transparent px-6 text-[17px] text-go shadow-none hover:bg-go/10">
              {SHOWCASE.secondary}
            </ButtonLink>
          </StateLabel>
        </div>
      </div>
    </ComponentSpecimen>
  )
}

export function InputSpecimen() {
  return (
    <ComponentSpecimen
      name="Input"
      source="components/ui/input.tsx"
      description="shadcn’s input on the page’s tokens. On the page it lives inside EmailCapture, borderless; on its own it keeps its hairline."
      code={`import { Input } from "@/components/ui/input"

<Input type="email" placeholder="Enter your work email" />
<Input aria-invalid placeholder="name@company" />`}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <StateLabel label="default" className="w-full">
          <Input placeholder="Enter your work email" className="bg-card" />
        </StateLabel>
        <StateLabel label="filled" className="w-full">
          <Input defaultValue="amara@northwind.co" className="bg-card" />
        </StateLabel>
        <StateLabel label="focus" className="w-full">
          <Input placeholder="Enter your work email" className="border-ring bg-card ring-[3px] ring-ring/50" />
        </StateLabel>
        <StateLabel label="error" className="w-full">
          <Input aria-invalid defaultValue="amara@" className="bg-card" />
        </StateLabel>
        <StateLabel label="disabled" className="w-full">
          <Input disabled placeholder="Enter your work email" className="bg-card" />
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
      description="Radix accordion: the FAQ and the mobile menu. Opens in 200ms on the out-quint curve; the chevron turns."
      code={`<Accordion type="single" collapsible>
  <AccordionItem value="q0" className="border-line">
    <AccordionTrigger className="py-5 text-[17px] font-normal hover:no-underline">…</AccordionTrigger>
    <AccordionContent className="pb-5 text-ink-muted">…</AccordionContent>
  </AccordionItem>
</Accordion>`}
      tone="card"
    >
      <Accordion type="single" collapsible defaultValue="q0" className="border-t border-line">
        {FAQ.items.slice(0, 2).map((item, i) => (
          <AccordionItem key={item.q} value={`q${i}`} className="border-line">
            <AccordionTrigger className="py-5 text-[17px] font-normal tracking-[-0.01em] text-ink hover:no-underline">{item.q}</AccordionTrigger>
            <AccordionContent className="pb-5 text-[15px] leading-[1.6] text-ink-muted">{item.a}</AccordionContent>
          </AccordionItem>
        ))}
        <AccordionItem value="disabled" disabled className="border-line">
          <AccordionTrigger className="py-5 text-[17px] font-normal tracking-[-0.01em] text-ink hover:no-underline">
            A disabled question
          </AccordionTrigger>
          <AccordionContent>—</AccordionContent>
        </AccordionItem>
      </Accordion>
      <p className="mt-3 font-mono text-[11px] text-ink-subtle">open · closed · disabled</p>
    </ComponentSpecimen>
  )
}

export function TabsSpecimen() {
  const [billing, setBilling] = useState("monthly")
  return (
    <ComponentSpecimen
      name="Tabs"
      source="components/ui/tabs.tsx"
      description="Radix tabs in shadcn’s two variants, and as the page dresses them: the mono billing switch and the persona tiles."
      code={`<Tabs defaultValue="monthly">
  <TabsList>
    <TabsTrigger value="monthly">Monthly</TabsTrigger>
    <TabsTrigger value="yearly">Yearly</TabsTrigger>
  </TabsList>
</Tabs>
<TabsList variant="line">…</TabsList>`}
    >
      <div className="flex flex-col gap-8">
        <StateLabel label="variant default">
          <Tabs defaultValue="triage">
            <TabsList>
              <TabsTrigger value="triage">Triage</TabsTrigger>
              <TabsTrigger value="drafts">Drafts</TabsTrigger>
              <TabsTrigger value="sent" disabled>
                Sent
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </StateLabel>
        <StateLabel label="variant line">
          <Tabs defaultValue="drafts">
            <TabsList variant="line">
              <TabsTrigger value="triage">Triage</TabsTrigger>
              <TabsTrigger value="drafts">Drafts</TabsTrigger>
              <TabsTrigger value="sent">Sent</TabsTrigger>
            </TabsList>
          </Tabs>
        </StateLabel>
        <StateLabel label="billing switch (Pricing)">
          <Tabs value={billing} onValueChange={setBilling}>
            <TabsList className="h-auto gap-0 rounded-[6px] border border-line-strong bg-paper-deep/60 p-0.5 group-data-[orientation=horizontal]/tabs:h-auto">
              {(["monthly", "yearly"] as const).map((key) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className={cn(
                    "h-9 rounded-[4px] border-0 px-3.5 font-mono text-[12.5px] font-normal tracking-[0.06em] text-ink-subtle uppercase sm:px-4 sm:text-[13px]",
                    "data-[state=active]:bg-card data-[state=active]:text-ink data-[state=active]:shadow-(--shadow-field)",
                  )}
                >
                  {key === "monthly" ? PRICING.monthly : PRICING.yearly}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </StateLabel>
        <p className="text-[14px] text-ink-muted">
          The persona tiles ({PERSONAS.items.length} tabs with a lit glow) are live in the Personas section below.
        </p>
      </div>
    </ComponentSpecimen>
  )
}

export function NavigationMenuSpecimen() {
  const [menu, setMenu] = useState("")
  useCanvasAction("Style guide · Navigation menu", (next) => setMenu((next ?? menu !== "product") ? "product" : ""), {
    on: menu === "product",
    group: "Brand guidelines",
  })
  return (
    <ComponentSpecimen
      name="NavigationMenu"
      source="components/ui/navigation-menu.tsx"
      description="Radix navigation menu without the shared viewport, so each panel drops from its own trigger — the header’s Product and Why us menus."
      code={`<NavigationMenu viewport={false}>
  <NavigationMenuList>
    <NavigationMenuItem value="product">
      <NavigationMenuTrigger>Product</NavigationMenuTrigger>
      <NavigationMenuContent>…</NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`}
      previewClassName="min-h-[320px]"
    >
      <NavigationMenu viewport={false} value={menu} onValueChange={setMenu} className="justify-start">
        <NavigationMenuList className="gap-0">
          <NavigationMenuItem value="product">
            <NavigationMenuTrigger className="h-9 bg-transparent px-3 text-[14px] font-normal text-ink-soft hover:bg-transparent hover:text-ink data-[state=open]:bg-transparent data-[state=open]:text-ink">
              {NAV.product.label}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="!mt-3 !rounded-[var(--radius-panel)] !border-line !bg-card !p-0 !shadow-(--shadow-float)">
              <ul className="flex w-[min(300px,80vw)] flex-col p-2">
                {NAV.product.features.map((item) => (
                  <li key={item.title}>
                    <NavigationMenuLink href="#components" className="gap-0.5 rounded-[var(--radius-field)] px-3 py-2 hover:bg-paper focus:bg-paper">
                      <span className="flex items-center gap-2 text-[14px] font-medium text-ink">
                        <span className={cn("size-2 rotate-45 rounded-[2px]", item.dot)} />
                        {item.title}
                      </span>
                      <span className="pl-4 text-[12.5px] text-ink-subtle">{item.body}</span>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#components" className="h-9 justify-center px-3 text-[14px] text-ink-soft hover:bg-transparent hover:text-ink">
              Pricing
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </ComponentSpecimen>
  )
}

export function SheetSpecimen() {
  const [open, setOpen] = useState(false)
  useCanvasAction("Style guide · Sheet", (next) => setOpen(next ?? !open), { on: open, group: "Brand guidelines" })
  return (
    <ComponentSpecimen
      name="Sheet"
      source="components/ui/sheet.tsx"
      description="Radix dialog as a side sheet — the mobile menu. Slides in from the right on paper, with a close button."
      code={`<Sheet open={open} onOpenChange={setOpen}>
  <SheetTrigger asChild><Button variant="outline">Open menu</Button></SheetTrigger>
  <SheetContent side="right" className="border-line bg-paper">…</SheetContent>
</Sheet>`}
    >
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline">Open the sheet</Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full gap-0 border-line bg-paper sm:max-w-md">
          <SheetHeader className="px-6 pt-10">
            <SheetTitle className="type-display text-[28px] font-normal text-ink">Menu</SheetTitle>
            <SheetDescription className="text-ink-muted">The same sheet the header opens below 1024px.</SheetDescription>
          </SheetHeader>
          <ul className="flex flex-col px-6">
            {NAV.links.map((link) => (
              <li key={link} className="border-b border-line py-4 text-[20px] text-ink">
                {link}
              </li>
            ))}
          </ul>
          <SheetFooter className="px-6 pb-8">
            <Button size="lg" onClick={() => setOpen(false)}>
              Get free trial
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <p className="mt-3 font-mono text-[11px] text-ink-subtle">closed · open with the button or the “Style guide · Sheet” action</p>
    </ComponentSpecimen>
  )
}

export function CarouselSpecimen() {
  return (
    <ComponentSpecimen
      name="Carousel"
      source="components/ui/carousel.tsx"
      description="shadcn’s Embla carousel. The stories section uses it looped and centred, its API held in state; here with the arrow buttons, which disable at the ends."
      code={`<Carousel opts={{ align: "start" }}>
  <CarouselContent>
    <CarouselItem className="basis-2/3">…</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`}
    >
      <div className="px-10 sm:px-12">
        <Carousel opts={{ align: "start" }}>
          <CarouselContent>
            {STORIES.items.map((story) => (
              <CarouselItem key={story.name} className="basis-2/3 sm:basis-1/3">
                <DuotonePhoto src={pexels(story.photo, 400)} alt={story.name} tone={story.tone} className="aspect-[4/5] rounded-[20px]" />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-10 sm:-left-12" />
          <CarouselNext className="-right-10 sm:-right-12" />
        </Carousel>
      </div>
    </ComponentSpecimen>
  )
}

export function IdentitySpecimens() {
  return (
    <>
      <ComponentSpecimen
        name="Wordmark · LogoMark"
        source="components/ui/wordmark.tsx"
        description="The mark and the name, linking to the top of the page. `compact` drops the name, as the floating nav does. LogoMark alone is the tile, 20px by default."
        code={`<Wordmark />
<Wordmark compact />
<LogoMark className="size-10" />`}
      >
        <div className="flex flex-wrap items-end gap-8 text-ink">
          <StateLabel label="default">
            <Wordmark />
          </StateLabel>
          <StateLabel label="compact">
            <Wordmark compact />
          </StateLabel>
          <StateLabel label="LogoMark size-10">
            <LogoMark className="size-10" />
          </StateLabel>
          <div className="flex items-end gap-8 rounded-[var(--radius-card)] bg-night px-4 py-3 text-night-fg">
            <StateLabel label="on night" tone="night">
              <Wordmark />
            </StateLabel>
          </div>
        </div>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="BrandLogo"
        source="components/ui/brand-logo.tsx"
        description="A customer’s logo from SVGL, flattened to one ink. `tone` light inverts it for night; `scale` sizes it from its own height."
        code={`<BrandLogo logo="stripe" />
<BrandLogo logo="notion" tone="light" scale={1.25} />`}
      >
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-end gap-x-8 gap-y-4">
            {[0.8, 1, 1.25].map((scale) => (
              <StateLabel key={scale} label={`scale ${scale}`}>
                <BrandLogo logo="stripe" scale={scale} />
              </StateLabel>
            ))}
          </div>
          <div className="flex flex-wrap items-end gap-x-8 gap-y-4 rounded-[var(--radius-card)] bg-night px-4 py-3">
            <StateLabel label="tone light" tone="night">
              <BrandLogo logo="notion" tone="light" />
            </StateLabel>
            <StateLabel label="tone light" tone="night">
              <BrandLogo logo="linear" tone="light" />
            </StateLabel>
          </div>
        </div>
      </ComponentSpecimen>
    </>
  )
}

export function ContainerSpecimen() {
  return (
    <ComponentSpecimen
      name="Container"
      source="components/ui/container.tsx"
      description="Centres every section at 1120px with the fluid gutter. Marked data-canvas-ignore, so the editor looks through it; pass data-canvas-ignore={false} to opt one use back in."
      code={`<Container className="max-w-[1240px]">…</Container>`}
      previewClassName="px-0 sm:px-0"
    >
      <Container className="max-w-[560px]">
        <div className="rounded-[var(--radius-card)] border border-dashed border-line-strong bg-card p-4 text-center text-[13px] text-ink-muted">
          max-w-[560px] here · px-gutter either side
        </div>
      </Container>
    </ComponentSpecimen>
  )
}

/* ─── Blocks ──────────────────────────────────────────────────────────── */

export function SectionTitleSpecimen() {
  return (
    <ComponentSpecimen
      name="SectionTitle"
      source="components/blocks/section-title.tsx"
      description="The heading every block opens with: light, tight, one italic word. Sizes md · lg · xl, tones paper · night, aligned centre or left, the accent before, after or on line two."
      code={`<SectionTitle
  lineOne="Meet Scribe, your"
  accent="copilot"
  accentPosition="line-two"
  lineTwo="for email"
  body="…"
  tone="night"
/>`}
      previewClassName="p-0 sm:p-0"
    >
      <div className="grid gap-px bg-line">
        <div className="bg-paper p-5 sm:p-8">
          <StateLabel label="size xl · accent end · centre" className="items-stretch">
            <SectionTitle size="xl" lineOne="Your inbox," accent="handled" />
          </StateLabel>
        </div>
        <div className="bg-paper p-5 sm:p-8">
          <StateLabel label="size lg · accent start · left · body" className="items-stretch">
            <SectionTitle size="lg" align="left" accent="Every" accentPosition="start" lineOne=" reply, in your voice" body="Scribe learns from what you’ve sent, not what you’ve received." />
          </StateLabel>
        </div>
        <div className="bg-night p-5 sm:p-8">
          <StateLabel label="size md · tone night · line two" tone="night" className="items-stretch">
            <SectionTitle size="md" tone="night" lineOne="Meet Scribe, your" accent="copilot" accentPosition="line-two" lineTwo="for email" />
          </StateLabel>
        </div>
      </div>
    </ComponentSpecimen>
  )
}

export function EmailCaptureSpecimen() {
  return (
    <ComponentSpecimen
      name="EmailCapture"
      source="components/blocks/email-capture.tsx"
      description="The trial form every ask uses: the field with its button inside, the rating under it. Three tones; submitting swaps in the sent state. Each one’s sent state is an editor action."
      code={`<EmailCapture name="Hero" />
<EmailCapture name="Journey" tone="lagoon" showRating={false} />
<EmailCapture name="Closing" tone="night" />`}
      previewClassName="p-0 sm:p-0"
    >
      <div className="grid gap-px bg-line">
        <div className="flex flex-col items-center gap-8 bg-paper p-5 sm:p-8">
          <StateLabel label="paper · default" className="w-full items-center">
            <EmailCapture name="Style guide paper" />
          </StateLabel>
          <StateLabel label="paper · sent" className="w-full items-center">
            <EmailCapture name="Style guide sent" startSent />
          </StateLabel>
        </div>
        <div className="flex flex-col items-center bg-night p-5 sm:p-8">
          <StateLabel label="night" tone="night" className="w-full items-center">
            <EmailCapture name="Style guide night" tone="night" />
          </StateLabel>
        </div>
        <div className="flex flex-col items-center bg-lagoon p-5 sm:p-8">
          <StateLabel label="lagoon · no rating" tone="night" className="w-full items-center">
            <EmailCapture name="Style guide lagoon" tone="lagoon" showRating={false} />
          </StateLabel>
        </div>
      </div>
    </ComponentSpecimen>
  )
}

export function QuoteBlockSpecimen() {
  return (
    <ComponentSpecimen
      name="QuoteBlock"
      source="components/blocks/quote-block.tsx"
      description="One large quote, a hairline that draws in from the left, and the speaker with their company’s logo. Paper or night."
      code={`<QuoteBlock {...QUOTES.first} />
<QuoteBlock {...QUOTES.second} tone="night" />`}
      previewClassName="p-0 sm:p-0"
    >
      <div className="grid gap-px bg-line">
        <div className="bg-paper p-5 sm:p-10">
          <QuoteBlock {...QUOTES.first} />
        </div>
        <div className="bg-night p-5 sm:p-10">
          <QuoteBlock {...QUOTES.second} tone="night" />
        </div>
      </div>
    </ComponentSpecimen>
  )
}

export function DoodleSpecimen() {
  return (
    <ComponentSpecimen
      name="Doodle · Spark · Hearts"
      source="components/blocks/doodle.tsx"
      description="The hand in the margin. Doodle is a note with a looping arrow that draws itself in once; three arrows, two tones. Spark flicks out from a word, Hearts sits after a heading."
      code={`<Doodle text="click me!" arrow="down-left" />
<Doodle text="see the numbers!" arrow="down-right" tone="night" />
<Spark /> <em>perfect</em> <Spark side="right" />`}
      previewClassName="p-0 sm:p-0"
    >
      <div className="grid gap-px bg-line sm:grid-cols-2">
        <div className="flex flex-wrap items-end justify-around gap-6 bg-paper p-6">
          {(["down-left", "down", "down-right"] as const).map((arrow) => (
            <StateLabel key={arrow} label={arrow} className="items-center">
              <Doodle text="click me!" arrow={arrow} />
            </StateLabel>
          ))}
        </div>
        <div className="flex flex-wrap items-end justify-around gap-6 bg-night p-6">
          <StateLabel label="tone night" tone="night" className="items-center">
            <Doodle text="see the numbers!" arrow="down-right" tone="night" />
          </StateLabel>
          <StateLabel label="Spark · Hearts" tone="night">
            <p className="type-display text-[32px] text-night-fg">
              <Spark /> <em className="font-light italic">loved</em> <Spark side="right" /> <Hearts />
            </p>
          </StateLabel>
        </div>
      </div>
    </ComponentSpecimen>
  )
}

export function DuotoneSpecimen() {
  const photo = STORIES.items[0].photo
  return (
    <ComponentSpecimen
      name="DuotonePhoto"
      source="components/blocks/duotone-photo.tsx"
      description="A photograph printed in two colours: greyscale multiplied onto a pale paper, the ink screened over it, and a faint studio grid on top (optional)."
      code={`<DuotonePhoto src={pexels(5717729, 640)} alt="…" tone="apricot" className="aspect-[4/5]" />`}
    >
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {(["teal", "apricot", "sky"] as const).map((tone) => (
          <StateLabel key={tone} label={`tone ${tone}`} className="items-stretch">
            <DuotonePhoto src={pexels(photo, 400)} alt="" tone={tone} className="aspect-[4/5] rounded-[16px]" />
          </StateLabel>
        ))}
        <StateLabel label="grid off" className="items-stretch">
          <DuotonePhoto src={pexels(photo, 400)} alt="" tone="teal" grid={false} className="aspect-[4/5] rounded-[16px]" />
        </StateLabel>
      </div>
    </ComponentSpecimen>
  )
}

/* ─── Mock-ups ────────────────────────────────────────────────────────── */

export function MockSpecimens() {
  const [card, setCard] = useState<(typeof PLATFORM.cards)[number]["key"]>("triage")
  return (
    <>
      <ComponentSpecimen
        name="AppWindow · Initials · Tag"
        source="components/mock/parts.tsx"
        description="The parts every product screen is built from: the white window with its lift, a sender’s initials in a tinted square, and a pill with a signal dot."
        code={`<AppWindow className="p-4">
  <Initials name="Ana Ferreira" tone="bg-dot-red" />
  <Tag dot="bg-dot-amber">Quiet 4 days</Tag>
</AppWindow>`}
      >
        <AppWindow className="flex max-w-[360px] flex-wrap items-center gap-3 p-4 text-[12px]">
          <Initials name="Ana Ferreira" tone="bg-dot-red" />
          <Initials name="Leah Kim" tone="bg-dot-blue" />
          <Initials name="Jacob Moreno" tone="bg-app-accent" />
          <Tag dot="bg-dot-amber">Quiet 4 days</Tag>
          <Tag dot="bg-dot-green">Draft ready</Tag>
          <Tag dot="bg-dot-violet">Opened 4 times</Tag>
        </AppWindow>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="InboxMock · ScaledFrame"
        source="components/mock/inbox-mock.tsx · components/blocks/scaled-frame.tsx"
        description="The product screen of the hero and the copilot, laid out at 1040px and scaled to its column by ScaledFrame, so it reads the same at 360px as at 1440px. `showPlay` adds the demo button."
        code={`<ScaledFrame width={1040}>
  <InboxMock showPlay={false} />
</ScaledFrame>`}
      >
        <ScaledFrame width={1040}>
          <InboxMock />
        </ScaledFrame>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="DashboardMock"
        source="components/mock/dashboard-mock.tsx"
        description="The team view in the showcase, at 1320px, scaled to fit."
        code={`<ScaledFrame width={1320}>
  <DashboardMock />
</ScaledFrame>`}
      >
        <ScaledFrame width={1320}>
          <DashboardMock />
        </ScaledFrame>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="DeckMock"
        source="components/mock/deck-mocks.tsx"
        description="The small screen on each card of the platform deck, one per feature. `paused` holds the drafting card’s typewriter."
        code={`<DeckMock card="drafting" />`}
      >
        <div className="flex flex-wrap gap-2">
          {PLATFORM.cards.map((item) => (
            <Button key={item.key} size="sm" variant={card === item.key ? "default" : "outline"} onClick={() => setCard(item.key)}>
              {item.label}
            </Button>
          ))}
        </div>
        <div className="mt-5 overflow-hidden rounded-t-[12px] border border-b-0 border-line bg-card">
          <ScaledFrame width={560}>
            <div className="h-[360px] w-[560px]">
              <DeckMock card={card} />
            </div>
          </ScaledFrame>
        </div>
      </ComponentSpecimen>
    </>
  )
}

/* ─── Motion ──────────────────────────────────────────────────────────── */

/** Remounts its child, so an entrance can be seen again. */
function Replay({ children }: { children: (key: number) => ReactNode }) {
  const [key, setKey] = useState(0)
  return (
    <div className="flex flex-col gap-4">
      <Button size="sm" variant="outline" className="w-fit" onClick={() => setKey((k) => k + 1)}>
        Replay
      </Button>
      {children(key)}
    </div>
  )
}

export function MotionSpecimens() {
  return (
    <>
      <ComponentSpecimen
        name="GradientBlob"
        source="components/motion/gradient-blob.tsx"
        description="The hero’s sea-glass light, drifting and reshaping on CSS keyframes. Props: speed (s per drift), blur, intensity. Shown here in a frame; on the page it fills the first screen."
        code={`<GradientBlob speed={18} blur={36} intensity={1} />`}
        previewClassName="p-0 sm:p-0"
      >
        <div className="relative h-72 overflow-hidden bg-paper">
          <GradientBlob className="h-full" />
          <p className="type-display relative grid h-full place-items-center text-[clamp(28px,4vw,44px)] text-ink">
            <span>
              The inbox that <em className="font-light italic">writes</em> back
            </span>
          </p>
        </div>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="RiseIn"
        source="components/motion/rise-in.tsx"
        description="The hero product rising out of a 16px blur (0.8s, out-quint), then scaling from 0.9 to 1 as it scrolls up to meet you."
        code={`<RiseIn delay={0.1} duration={0.8} blur={16} distance={24} scaleFrom={0.9}>
  <ScaledFrame width={1040}><InboxMock /></ScaledFrame>
</RiseIn>`}
      >
        <Replay>
          {(key) => (
            <RiseIn key={key}>
              <AppWindow className="grid h-40 place-items-center text-[14px] text-ink-muted">The product rises in</AppWindow>
            </RiseIn>
          )}
        </Replay>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="Reveal"
        source="components/motion/reveal.tsx"
        description="Content rising 24px into place the first time it scrolls into view. Easing out · in-out · spring; shown at rest while designing and for reduced motion."
        code={`<Reveal y={24} delay={0.08} duration={0.7} easing="out">…</Reveal>`}
      >
        <Replay>
          {(key) => (
            <div className="grid gap-3 sm:grid-cols-3">
              {(["out", "in-out", "spring"] as const).map((easing, i) => (
                <Reveal key={`${key}-${easing}`} easing={easing} delay={i * 0.08}>
                  <div className="rounded-[var(--radius-card)] border border-line bg-card p-4 text-[13px] text-ink-muted">easing “{easing}”</div>
                </Reveal>
              ))}
            </div>
          )}
        </Replay>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="FeatureDeck"
        source="components/motion/feature-deck.tsx"
        description="The platform as a stack: one card in front, the rest peeking out by their tabs, 30px higher and 4% narrower each. Click the stack or a tab to bring the next forward; each card is an editor action."
        code={`<FeatureDeck start="triage" step={30} shrink={0.04} duration={0.35} autoplay={false} />`}
      >
        <FeatureDeck />
      </ComponentSpecimen>
      <ComponentSpecimen
        name="Marquee"
        source="components/motion/marquee.tsx"
        description="A row that drifts forever, doubled so the loop has no seam; pauses on hover. Direction left or right, speed in seconds per loop."
        code={`<Marquee speed={45}>{logos}</Marquee>
<Marquee speed={60} direction="right">{chips}</Marquee>`}
      >
        <div className="flex flex-col gap-4 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
          <Marquee speed={45}>
            {LOGO_ROW.map((logo) => (
              <BrandLogo key={logo} logo={logo} className="mx-6" />
            ))}
          </Marquee>
          <Marquee speed={30} direction="right">
            {NAV.product.features.map((item) => (
              <span key={item.title} className="mx-1.5 inline-flex h-9 items-center gap-2 rounded-[var(--radius-field)] bg-card px-3.5 text-[13px] whitespace-nowrap text-ink shadow-(--shadow-field)">
                <span className={cn("size-2 rounded-[2px]", item.dot)} />
                {item.title}
              </span>
            ))}
          </Marquee>
        </div>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="ParallaxColumns"
        source="components/motion/parallax-columns.tsx"
        description="Cards in three columns that slide against each other as you scroll, the middle one faster. Flat on phones, while designing and with reduced motion."
        code={`<ParallaxColumns columns={3} distance={60} items={cards} />`}
        tone="night"
      >
        <div className="max-h-[420px] overflow-hidden [mask-image:linear-gradient(180deg,#000_80%,transparent)]">
          <ParallaxColumns items={LOVE.items.slice(0, 6).map((item) => <LoveCard key={item.name} {...item} />)} />
        </div>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="ParallaxImage"
        source="components/motion/parallax-image.tsx"
        description="A photograph drifting slower than the page, oversized by `distance` so no edge shows. Behind the team dashboard."
        code={`<ParallaxImage src={pexels(SHOWCASE.photo, 1800)} alt="…" distance={48} />`}
        previewClassName="p-0 sm:p-0"
      >
        <div className="relative h-64">
          <ParallaxImage src={pexels(SHOWCASE.photo, 1200)} alt="A sunlit desk with a laptop by a window" />
        </div>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="TiltCard · Typewriter"
        source="components/motion/tilt-card.tsx · components/motion/typewriter.tsx"
        description="TiltCard lifts and turns a few degrees on a spring under the pointer (hover one). Typewriter types a line, holds, and types again — the drafting card’s prompt."
        code={`<TiltCard tilt={2} lift={4}>…</TiltCard>
<Typewriter text="Tell Ana we can ship Friday" speed={38} hold={2400} />`}
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="grid grid-cols-2 gap-3">
            <TiltCard tilt={2} tabIndex={0} className="grid aspect-square place-items-center rounded-[var(--radius-card)] bg-sand p-4 text-[13px] text-ink/70 outline-none">
              tilt 2
            </TiltCard>
            <TiltCard tilt={-2} tabIndex={0} className="grid aspect-square place-items-center rounded-[var(--radius-card)] bg-sky p-4 text-[13px] text-ink/70 outline-none">
              tilt −2
            </TiltCard>
          </div>
          <div className="flex flex-col gap-3">
            <div className="rounded-[var(--radius-field)] bg-card p-3 text-[14px] text-ink shadow-(--shadow-field)">
              <Typewriter text="Tell Ana we can ship the proposal Friday, and thank her for waiting." />
            </div>
            <div className="rounded-[var(--radius-field)] bg-card p-3 text-[14px] text-ink-muted shadow-(--shadow-field)">
              <Typewriter text="paused — shown whole" paused />
            </div>
          </div>
        </div>
      </ComponentSpecimen>
    </>
  )
}

/* ─── Section cards ───────────────────────────────────────────────────── */

export function CardSpecimens() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly")
  const pro = PRICING.individualPlans.find((plan) => plan.featured) ?? PRICING.individualPlans[1]
  const stats = RESULTS.items.filter((item) => item.kind === "stat")
  const quote = RESULTS.items.find((item) => item.kind === "quote")
  return (
    <>
      <ComponentSpecimen
        name="Stat"
        source="components/sections/numbers.tsx"
        description="One figure in the numbers band: a quiet label over a number set in mono."
        code={`<Stat label="Emails drafted" value="48M" />`}
      >
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {NUMBERS.stats.map((stat) => (
            <Stat key={stat.label} {...stat} />
          ))}
        </div>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="StepCard"
        source="components/sections/how-it-works.tsx"
        description="One step: its drawing on a soft tile that lifts on hover, the title and a line. `index` picks the drawing — connect, voice, menu bar."
        code={`<StepCard index={0} title="Connect your inbox" body="…" />`}
        tone="card"
        previewClassName="px-0 sm:px-8"
      >
        <div className="grid gap-10 md:grid-cols-3 md:gap-6">
          {STEPS.items.map((step, i) => (
            <StepCard key={step.title} index={i} {...step} />
          ))}
        </div>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="PlanCard"
        source="components/sections/pricing.tsx"
        description="One plan: name, a price that rolls when billing changes, what’s included and the buttons. The featured plan carries a sea-glass wash and, on the page, the one border beam."
        code={`<BorderBeam size="md" colorVariant="forest" theme="light" strength={0.6} duration={9} borderRadius={24}>
  <PlanCard plan={plan} billing="yearly" />
</BorderBeam>`}
      >
        <div className="mb-6 flex flex-wrap gap-2">
          {(["monthly", "yearly"] as const).map((key) => (
            <Button key={key} size="sm" variant={billing === key ? "default" : "outline"} onClick={() => setBilling(key)}>
              {key === "monthly" ? PRICING.monthly : PRICING.yearly}
            </Button>
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <StateLabel label="with secondary" className="items-stretch">
            <PlanCard plan={PRICING.individualPlans[0]} billing={billing} />
          </StateLabel>
          <StateLabel label="featured · border beam" className="items-stretch">
            <BorderBeam size="md" colorVariant="forest" theme="light" strength={0.6} duration={9} borderRadius={24} className="h-full">
              <PlanCard plan={pro} billing={billing} />
            </BorderBeam>
          </StateLabel>
          <StateLabel label="custom price" className="items-stretch">
            <PlanCard plan={PRICING.teamPlans[1]} billing={billing} />
          </StateLabel>
        </div>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="ResultCard"
        source="components/sections/results.tsx"
        description="A cell of the results bento: a number on one of four colours, or a quote on paper. It tilts on hover and offers the story; `showStory` holds that face."
        code={`<ResultCard item={RESULTS.items[0]} tilt={2} />
<ResultCard item={RESULTS.items[2]} showStory />`}
      >
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {stats.slice(0, 4).map((item, i) => (
            <StateLabel key={i} label={item.kind === "stat" ? `tone ${item.tone}` : ""} className="items-stretch">
              <ResultCard item={item} tilt={i % 2 ? -2 : 2} />
            </StateLabel>
          ))}
          <StateLabel label="showStory" className="items-stretch">
            <ResultCard item={stats[4] ?? stats[0]} showStory />
          </StateLabel>
          {quote && (
            <StateLabel label="quote" className="col-span-2 items-stretch">
              <ResultCard item={quote} />
            </StateLabel>
          )}
        </div>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="StoryCard"
        source="components/sections/stories.tsx"
        description="A customer story: logo, what changed, who, and the film — a duotone portrait with a play button. The card washes in its photo’s tone."
        code={`<StoryCard logo="stripe" title="…" name="Amara Lewis" role="Head of Partnerships" photo={5717729} tone="teal" />`}
      >
        <div className="grid gap-6">
          {STORIES.items.slice(0, 3).map((story) => (
            <StateLabel key={story.name} label={`tone ${story.tone}`} className="items-stretch">
              <div className="mx-auto w-full max-w-[800px]">
                <StoryCard {...story} cta={STORIES.cta} />
              </div>
            </StateLabel>
          ))}
        </div>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="ArticleCard"
        source="components/sections/articles.tsx"
        description="An article: a photograph that eases in on hover, its tag, and the headline."
        code={`<ArticleCard title="…" tag="Guide" photo={5208348} href="#blog" />`}
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {ARTICLES.items.map((item) => (
            <ArticleCard key={item.title} {...item} />
          ))}
        </div>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="LoveCard"
        source="components/sections/love-wall.tsx"
        description="A customer’s note on the wall of love: who they are, then what they said, on night."
        code={`<LoveCard name="…" role="…" company="…" photo={16160809} text="…" />`}
        tone="night"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {LOVE.items.slice(0, 3).map((item) => (
            <LoveCard key={item.name} {...item} />
          ))}
        </div>
      </ComponentSpecimen>
    </>
  )
}

/* ─── Site chrome ─────────────────────────────────────────────────────── */

export function ChromeSpecimens() {
  return (
    <>
      <ComponentSpecimen
        name="SiteHeader"
        source="components/site/site-header.tsx"
        description="Full width at the top of the page; once you scroll it folds into a floating pill and turns dark over night sections. Below 1024px its menus move into a sheet. Shown in a frame: it follows this page’s scroll, and the “Floating nav”, “Product menu” and “Mobile menu” actions reach every state."
        code={`<SiteHeader condenseAt={80} />`}
        previewClassName="p-0 sm:p-0"
      >
        {/* A transform makes the frame the containing block of the fixed header. */}
        <div className="relative h-24 bg-paper [transform:translateZ(0)]">
          <SiteHeader />
        </div>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="SiteFooter"
        source="components/site/site-footer.tsx"
        description="The night footer: the mark, four columns, an ask-an-assistant row and the legal line, with the link to this page. It is live at the foot of this page."
        code={`<SiteFooter />`}
      >
        <p className="text-[14px] text-ink-muted">
          Scroll to the end of the page to see it in place.
        </p>
      </ComponentSpecimen>
    </>
  )
}

/* ─── Sections ────────────────────────────────────────────────────────── */

const SECTIONS: { id: string; label: string; Section: ComponentType }[] = [
  { id: "hero", label: "Hero", Section: Hero },
  { id: "logos", label: "LogoCloud", Section: LogoCloud },
  { id: "numbers", label: "Numbers", Section: Numbers },
  { id: "quote", label: "QuoteSection", Section: QuoteSection },
  { id: "copilot", label: "Copilot", Section: Copilot },
  { id: "how", label: "HowItWorks", Section: HowItWorks },
  { id: "platform", label: "Platform", Section: Platform },
  { id: "journey", label: "JourneyCta", Section: JourneyCta },
  { id: "personas", label: "Personas", Section: Personas },
  { id: "showcase", label: "Showcase", Section: Showcase },
  { id: "results", label: "Results", Section: Results },
  { id: "stories", label: "Stories", Section: Stories },
  { id: "pricing", label: "Pricing", Section: Pricing },
  { id: "faq", label: "Faq", Section: Faq },
  { id: "articles", label: "Articles", Section: Articles },
  { id: "love", label: "LoveWall", Section: LoveWall },
  { id: "unlock", label: "UnlockCta", Section: UnlockCta },
]

/**
 * Every section of the home page, live, one at a time in a frame — the same
 * component the page renders, with its own motion and editor actions.
 */
export function SectionViewer() {
  const [active, setActive] = useState(SECTIONS[0].id)
  const index = SECTIONS.findIndex((entry) => entry.id === active)
  useCanvasAction("Style guide · Next section", () => setActive(SECTIONS[(index + 1) % SECTIONS.length].id), {
    group: "Brand guidelines",
  })
  return (
    <article className="overflow-hidden rounded-[var(--radius-panel)] border border-line bg-card shadow-(--shadow-card)">
      <header className="border-b border-line px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="text-[17px] font-medium tracking-[-0.01em] text-ink">Sections</h3>
          <code className="font-mono text-[11.5px] text-ink-subtle">components/sections/*.tsx</code>
        </div>
        <p className="mt-1 text-[14px] leading-[1.5] text-ink-muted">
          All {SECTIONS.length} sections of the home page, live and whole, one at a time. Their cards and blocks are above;
          the pieces private to a section (the news badge, the copilot’s floating notes and signal chips, the step
          drawings) are seen here, in place.
        </p>
      </header>
      <Tabs value={active} onValueChange={setActive} className="gap-0">
        <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1.5 rounded-none border-b border-line bg-card-soft p-3 group-data-[orientation=horizontal]/tabs:h-auto">
          {SECTIONS.map((entry) => (
            <TabsTrigger
              key={entry.id}
              value={entry.id}
              className="h-8 flex-none rounded-[var(--radius-chip)] border border-line bg-card px-2.5 font-mono text-[11.5px] font-normal text-ink-muted data-[state=active]:border-ink data-[state=active]:bg-ink data-[state=active]:text-white data-[state=active]:shadow-none"
            >
              {entry.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {SECTIONS.map(({ id, Section }) => (
          <TabsContent key={id} value={id}>
            {/* The transform keeps anything fixed or full-bleed inside the frame. */}
            <div className="relative isolate overflow-hidden bg-paper [transform:translateZ(0)]">
              <Section />
            </div>
          </TabsContent>
        ))}
      </Tabs>
      <div className="border-t border-line p-3">
        <CodeSnippet
          code={`import { Hero } from "@/components/sections/hero"

<Hero />
<Copilot signalSpeed={60} />
<Personas start="sales" />
<Pricing start="yearly" />
<Stories start={1} />
<QuoteSection quote="third" tone="night" />`}
        />
      </div>
    </article>
  )
}

/* ─── The chapter ─────────────────────────────────────────────────────── */

export function ComponentLibrary() {
  return (
    <div className="space-y-14">
      <div className="space-y-6">
        <GroupLabel>Primitives — components/ui</GroupLabel>
        <ButtonSpecimen />
        <div className="grid gap-6 lg:grid-cols-2">
          <InputSpecimen />
          <TabsSpecimen />
          <NavigationMenuSpecimen />
          <SheetSpecimen />
          <IdentitySpecimens />
        </div>
        <AccordionSpecimen />
        <CarouselSpecimen />
        <ContainerSpecimen />
      </div>
      <div className="space-y-6">
        <GroupLabel>Blocks — components/blocks</GroupLabel>
        <SectionTitleSpecimen />
        <EmailCaptureSpecimen />
        <QuoteBlockSpecimen />
        <DoodleSpecimen />
        <DuotoneSpecimen />
      </div>
      <div className="space-y-6">
        <GroupLabel>Product mock-ups — components/mock</GroupLabel>
        <MockSpecimens />
      </div>
      <div className="space-y-6">
        <GroupLabel>Motion — components/motion</GroupLabel>
        <MotionSpecimens />
        <p className="text-[14px] text-ink-muted">
          <code className="font-mono text-[12px]">SmoothScroll</code> (Lenis, lerp 0.1) has nothing to draw: it is carrying this
          page’s scroll.
        </p>
      </div>
      <div className="space-y-6">
        <GroupLabel>Section cards — components/sections</GroupLabel>
        <CardSpecimens />
      </div>
      <div className="space-y-6">
        <GroupLabel>Site chrome — components/site</GroupLabel>
        <ChromeSpecimens />
      </div>
      <div className="space-y-6">
        <GroupLabel>Sections, whole</GroupLabel>
        <SectionViewer />
      </div>
    </div>
  )
}
