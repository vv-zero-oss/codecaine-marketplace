import { useState, type ComponentType, type ReactNode } from "react"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { BorderBeam } from "border-beam"
import { useCanvasAction } from "@canvas/react"

import { EmailCapture } from "@/components/blocks/email-capture"
import { GiantWordmark } from "@/components/blocks/giant-wordmark"
import { SectionHeading } from "@/components/blocks/section-heading"
import { CodeSnippet, ComponentSpecimen, GroupLabel, StateLabel } from "@/components/brand/specimen"
import { BillsArt, CardsArt, ControlsArt, CurrenciesArt, TreasuryArt } from "@/components/mock/feature-art"
import { CountUp } from "@/components/motion/count-up"
import { Marquee } from "@/components/motion/marquee"
import { MetalCard } from "@/components/motion/metal-card"
import { Reveal } from "@/components/motion/reveal"
import { Sparkline } from "@/components/motion/sparkline"
import { LiftCard } from "@/components/motion/tilt-card"
import { YieldChart } from "@/components/motion/yield-chart"
import { Closing } from "@/components/sections/closing"
import { Faq } from "@/components/sections/faq"
import { FeatureCell, Features } from "@/components/sections/features"
import { Hero } from "@/components/sections/hero"
import { LogoCloud } from "@/components/sections/logo-cloud"
import { Figure, Numbers } from "@/components/sections/numbers"
import { PlanCard, Pricing } from "@/components/sections/pricing"
import { Guarantee, Security } from "@/components/sections/security"
import { Step, Steps } from "@/components/sections/steps"
import { Treasury, YieldCalculator } from "@/components/sections/treasury"
import { VoiceCard, Voices } from "@/components/sections/voices"
import { SiteHeader } from "@/components/site/site-header"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { BrandLogo } from "@/components/ui/brand-logo"
import { Button, ButtonLink } from "@/components/ui/button"
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
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogoMark, Wordmark } from "@/components/ui/wordmark"
import { ACCOUNT, FAQ, FEATURES, LOGO_ROW, NAV, NUMBERS, PRICING, SECURITY, STEPS, TREASURY, VOICES } from "@/content"
import { cn } from "@/lib/utils"

/* ─── Primitives: components/ui ───────────────────────────────────────── */

const VARIANTS = [
  { variant: "default", hover: "bg-maroon", night: false },
  { variant: "outline", hover: "bg-ink text-paper", night: false },
  { variant: "coral", hover: "bg-coral-soft", night: false },
  { variant: "ghost", hover: "bg-paper-deep text-ink", night: false },
  { variant: "link", hover: "underline", night: false },
  { variant: "pink", hover: "bg-pink-hover", night: true },
  { variant: "ghostNight", hover: "bg-night-fg text-night", night: true },
] as const

const FOCUS = "ring-[3px] ring-ring/40"
const SIZES = ["sm", "default", "lg", "icon"] as const

export function ButtonSpecimen() {
  return (
    <ComponentSpecimen
      name="Button · ButtonLink"
      source="components/ui/button.tsx"
      description="Seven variants and four sizes on a cva recipe. Square, flat, wide caps at 13px; a fill on hover, a 0.97 press and a soft focus ring. `pink` and `ghostNight` are for the oxblood grounds. ButtonLink is the same recipe on an anchor."
      code={`import { Button, ButtonLink } from "@/components/ui/button"

<Button>Open an account</Button>
<ButtonLink href="#start" variant="outline">Start your application</ButtonLink>
<Button variant="pink">Open an account</Button>  {/* on night */}`}
      previewClassName="p-0 sm:p-0"
    >
      <div className="divide-y divide-line">
        {VARIANTS.map(({ variant, hover, night }) => (
          <div key={variant} className={cn("flex flex-wrap items-end gap-x-6 gap-y-4 p-5 sm:px-8", night ? "bg-night" : "bg-paper")}>
            <span className={cn("w-full font-mono text-[11px]", night ? "text-night-muted" : "text-ink-subtle")}>{variant}</span>
            {(["default", "hover", "focus", "pressed", "disabled"] as const).map((state) => (
              <StateLabel key={state} label={state} tone={night ? "night" : "paper"}>
                <Button
                  variant={variant}
                  disabled={state === "disabled"}
                  className={cn(state === "hover" && hover, state === "focus" && FOCUS, state === "pressed" && "scale-[0.97]")}
                >
                  Open account
                </Button>
              </StateLabel>
            ))}
            <StateLabel label="with icon" tone={night ? "night" : "paper"}>
              <Button variant={variant}>
                Log in <ArrowUpRight />
              </Button>
            </StateLabel>
          </div>
        ))}
        <div className="flex flex-wrap items-end gap-6 bg-paper p-5 sm:px-8">
          <span className="w-full font-mono text-[11px] text-ink-subtle">sizes</span>
          {SIZES.map((size) => (
            <StateLabel key={size} label={size}>
              <Button size={size} variant="outline" aria-label={size === "icon" ? "Next" : undefined}>
                {size === "icon" ? <ArrowRight /> : "Talk to us"}
              </Button>
            </StateLabel>
          ))}
          <StateLabel label="ButtonLink · full width (plans)" className="w-full max-w-[320px]">
            <ButtonLink href="#components" className="w-full">
              Start Growth
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
      description="shadcn’s input on the page’s tokens. On the page it lives inside EmailCapture, borderless; alone it keeps its hairline."
      code={`<Input type="email" placeholder="Work email" />
<Input aria-invalid defaultValue="lena@" />`}
    >
      <div className="grid gap-5">
        <StateLabel label="default" className="w-full">
          <Input placeholder="Work email" className="rounded-none bg-card" />
        </StateLabel>
        <StateLabel label="filled" className="w-full">
          <Input defaultValue="lena@brightfold.co" className="rounded-none bg-card" />
        </StateLabel>
        <StateLabel label="focus" className="w-full">
          <Input placeholder="Work email" className="rounded-none border-ring bg-card ring-[3px] ring-ring/50" />
        </StateLabel>
        <StateLabel label="error" className="w-full">
          <Input aria-invalid defaultValue="lena@" className="rounded-none bg-card" />
        </StateLabel>
        <StateLabel label="disabled" className="w-full">
          <Input disabled placeholder="Work email" className="rounded-none bg-card" />
        </StateLabel>
      </div>
    </ComponentSpecimen>
  )
}

export function TabsSpecimen() {
  const [billing, setBilling] = useState("monthly")
  return (
    <ComponentSpecimen
      name="Tabs"
      source="components/ui/tabs.tsx"
      description="Radix tabs in shadcn’s two variants, and as the page dresses them: the square billing switch, ink with pink when active."
      code={`<Tabs value={billing} onValueChange={setBilling}>
  <TabsList className="rounded-none border border-ink bg-transparent p-0">
    <TabsTrigger value="monthly" className="type-caps rounded-none data-[state=active]:bg-ink data-[state=active]:text-pink">Monthly</TabsTrigger>
  </TabsList>
</Tabs>`}
    >
      <div className="flex flex-col gap-8">
        <StateLabel label="variant default · one disabled">
          <Tabs defaultValue="accounts">
            <TabsList>
              <TabsTrigger value="accounts">Accounts</TabsTrigger>
              <TabsTrigger value="cards">Cards</TabsTrigger>
              <TabsTrigger value="loans" disabled>
                Loans
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </StateLabel>
        <StateLabel label="variant line">
          <Tabs defaultValue="cards">
            <TabsList variant="line">
              <TabsTrigger value="accounts">Accounts</TabsTrigger>
              <TabsTrigger value="cards">Cards</TabsTrigger>
              <TabsTrigger value="bills">Bills</TabsTrigger>
            </TabsList>
          </Tabs>
        </StateLabel>
        <StateLabel label="billing switch (Pricing)">
          <Tabs value={billing} onValueChange={setBilling}>
            <TabsList className="h-auto rounded-none border border-ink bg-transparent p-0 group-data-[orientation=horizontal]/tabs:h-auto">
              {(["monthly", "yearly"] as const).map((key) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="type-caps h-10 rounded-none border-0 px-3 text-[11px] text-ink data-[state=active]:bg-ink data-[state=active]:text-pink data-[state=active]:shadow-none sm:px-5 sm:text-[12px]"
                >
                  {key === "monthly" ? PRICING.monthly : PRICING.yearly}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </StateLabel>
      </div>
    </ComponentSpecimen>
  )
}

export function SliderSpecimen() {
  const [value, setValue] = useState(40)
  return (
    <ComponentSpecimen
      name="Slider"
      source="components/ui/slider.tsx"
      description="Radix slider. Plain on cream; on the calculator it goes square and pink on an oxblood track."
      code={`<Slider min={50000} max={5000000} step={50000} value={[amount]} onValueChange={([v]) => setAmount(v)} />`}
      previewClassName="p-0 sm:p-0"
    >
      <div className="flex flex-col gap-6 p-5 sm:p-8">
        <StateLabel label={`default · ${value}`} className="w-full">
          <Slider value={[value]} onValueChange={([v]) => setValue(v)} />
        </StateLabel>
        <StateLabel label="disabled" className="w-full">
          <Slider defaultValue={[70]} disabled />
        </StateLabel>
      </div>
      <div className="bg-night p-5 sm:p-8">
        <StateLabel label="as the calculator dresses it" tone="night" className="w-full">
          <Slider
            defaultValue={[20]}
            aria-label="Balance"
            className="py-3 [&_[data-slot=slider-range]]:rounded-none [&_[data-slot=slider-range]]:bg-pink [&_[data-slot=slider-thumb]]:size-6 [&_[data-slot=slider-thumb]]:rounded-none [&_[data-slot=slider-thumb]]:border-2 [&_[data-slot=slider-thumb]]:border-pink [&_[data-slot=slider-thumb]]:bg-night-deep [&_[data-slot=slider-track]]:rounded-none [&_[data-slot=slider-track]]:bg-night-line"
          />
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
      description="Radix accordion: the FAQ and the mobile menu. Opens in 220ms and closes in 180ms on the strong out-curve; the chevron turns."
      code={`<Accordion type="single" collapsible>
  <AccordionItem value="q0" className="border-line">
    <AccordionTrigger className="py-6 text-[19px] font-medium hover:no-underline">…</AccordionTrigger>
    <AccordionContent className="pb-6 text-[16px] text-ink-muted">…</AccordionContent>
  </AccordionItem>
</Accordion>`}
      tone="card"
    >
      <Accordion type="single" collapsible defaultValue="q0" className="border-t border-line">
        {FAQ.items.slice(0, 2).map((item, i) => (
          <AccordionItem key={item.q} value={`q${i}`} className="border-line">
            <AccordionTrigger className="py-6 text-[19px] font-medium tracking-[-0.01em] text-ink hover:no-underline">{item.q}</AccordionTrigger>
            <AccordionContent className="pb-6 text-[16px] leading-[1.6] text-ink-muted">{item.a}</AccordionContent>
          </AccordionItem>
        ))}
        <AccordionItem value="disabled" disabled className="border-line">
          <AccordionTrigger className="py-6 text-[19px] font-medium tracking-[-0.01em] text-ink hover:no-underline">A disabled question</AccordionTrigger>
          <AccordionContent>—</AccordionContent>
        </AccordionItem>
      </Accordion>
      <p className="mt-3 font-mono text-[11px] text-ink-subtle">open · closed · disabled</p>
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
      description="Radix navigation menu without the shared viewport: pink caps triggers on oxblood, each panel a square cream sheet with a lift."
      code={`<NavigationMenu viewport={false}>
  <NavigationMenuList>
    <NavigationMenuItem value="company">
      <NavigationMenuTrigger className="type-caps text-pink">Company</NavigationMenuTrigger>
      <NavigationMenuContent className="!rounded-none !bg-paper">…</NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`}
      tone="night"
      previewClassName="min-h-[300px]"
    >
      <NavigationMenu viewport={false} value={menu} onValueChange={setMenu} className="justify-start">
        <NavigationMenuList className="gap-0">
          <NavigationMenuItem value="product">
            <NavigationMenuTrigger className="type-caps h-9 bg-transparent px-2.5 text-[15px] text-pink hover:bg-transparent hover:text-pink-hover focus:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-pink-hover data-[state=open]:hover:bg-transparent data-[state=open]:focus:bg-transparent [&>svg]:size-3">
              {NAV.company.label}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="!mt-3 !rounded-none !border-0 !bg-paper !p-0 !shadow-(--shadow-float)">
              <ul className="flex w-[min(260px,75vw)] flex-col p-2">
                {NAV.company.items.map((item) => (
                  <li key={item.title}>
                    <NavigationMenuLink href="#components" className="gap-0.5 rounded-none px-3 py-2 hover:bg-paper-deep focus:bg-paper-deep">
                      <span className="text-[14px] font-medium text-ink">{item.title}</span>
                      <span className="text-[12.5px] text-ink-muted">{item.body}</span>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#components" className="type-caps h-9 justify-center px-2.5 text-[15px] text-pink hover:bg-transparent hover:text-pink-hover focus:bg-transparent">
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
      description="Radix dialog as a side sheet — the mobile menu, on oxblood with pink caps."
      code={`<Sheet open={open} onOpenChange={setOpen}>
  <SheetTrigger asChild><Button variant="outline">Menu</Button></SheetTrigger>
  <SheetContent side="right" className="border-0 bg-night text-pink">…</SheetContent>
</Sheet>`}
    >
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline">Open the sheet</Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full gap-0 border-0 bg-night text-pink sm:max-w-md [&>button]:text-pink">
          <SheetHeader className="px-6 pt-12">
            <SheetTitle className="type-display text-[32px] text-pink">Menu</SheetTitle>
            <SheetDescription className="text-night-muted">The same sheet the header opens below 1024px.</SheetDescription>
          </SheetHeader>
          <ul className="flex flex-col px-6">
            {NAV.links.map((link) => (
              <li key={link} className="type-caps border-b border-night-line py-4 text-[24px]">
                {link}
              </li>
            ))}
          </ul>
          <SheetFooter className="px-6 pb-8">
            <Button size="lg" variant="pink" onClick={() => setOpen(false)}>
              {NAV.cta}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <p className="mt-3 font-mono text-[11px] text-ink-subtle">closed · open with the button or the “Style guide · Sheet” action</p>
    </ComponentSpecimen>
  )
}

export function IdentitySpecimens() {
  return (
    <>
      <ComponentSpecimen
        name="Wordmark · LogoMark"
        source="components/ui/wordmark.tsx"
        description="The name in wide caps, linking to the top of the page, 17 → 22px across breakpoints. LogoMark is the ring and tide line, 24px by default."
        code={`<Wordmark className="text-pink" />
<LogoMark className="size-10" />`}
        tone="night"
      >
        <div className="flex flex-wrap items-end gap-8">
          <StateLabel label="on night" tone="night">
            <span className="text-pink">
              <Wordmark />
            </span>
          </StateLabel>
          <StateLabel label="LogoMark" tone="night">
            <LogoMark className="size-10 text-pink" />
          </StateLabel>
          <div className="bg-card px-4 py-3 text-ink">
            <StateLabel label="on cream">
              <Wordmark />
            </StateLabel>
          </div>
        </div>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="BrandLogo"
        source="components/ui/brand-logo.tsx"
        description="A customer’s logo from SVGL, flattened to one ink. `tone` light inverts it for night; `scale` sizes it."
        code={`<BrandLogo logo="vercel" />
<BrandLogo logo="notion" tone="light" scale={1.25} />`}
      >
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-end gap-x-8 gap-y-4">
            {[0.8, 1, 1.25].map((scale) => (
              <StateLabel key={scale} label={`scale ${scale}`}>
                <BrandLogo logo="vercel" scale={scale} />
              </StateLabel>
            ))}
          </div>
          <div className="flex flex-wrap items-end gap-x-8 gap-y-4 bg-night px-4 py-3">
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
      description="Centres every section at 1200px with the fluid gutter. Marked data-canvas-ignore, so the editor looks through it; data-canvas-ignore={false} opts one use back in."
      code={`<Container className="grid gap-10 md:grid-cols-2">…</Container>`}
      previewClassName="px-0 sm:px-0"
    >
      <Container className="max-w-[560px]">
        <div className="border border-dashed border-ink bg-card p-4 text-center text-[13px] text-ink-muted">max-w-[560px] here · px-gutter either side</div>
      </Container>
    </ComponentSpecimen>
  )
}

/* ─── Blocks ──────────────────────────────────────────────────────────── */

export function SectionHeadingSpecimen() {
  return (
    <ComponentSpecimen
      name="SectionHeading"
      source="components/blocks/section-heading.tsx"
      description="Every section opens with it: a wide-caps eyebrow in coral (pink on night), the title in heavy extended caps with one word in colour, and an optional line of body. Left or centred."
      code={`<SectionHeading eyebrow="Treasury" title="Your runway, working" accent="overtime" body="…" tone="night" />`}
      previewClassName="p-0 sm:p-0"
    >
      <div className="grid gap-px bg-line">
        <div className="bg-paper p-5 sm:p-8">
          <StateLabel label="paper · left · eyebrow" className="items-stretch">
            <SectionHeading eyebrow={SECURITY.eyebrow} title={SECURITY.title} />
          </StateLabel>
        </div>
        <div className="bg-paper p-5 sm:p-8">
          <StateLabel label="paper · centre · accent + titleEnd + body" className="items-stretch">
            <SectionHeading align="center" eyebrow={VOICES.eyebrow} title="Companies that stopped" accent="worrying" titleEnd="about their bank" body={PRICING.body} />
          </StateLabel>
        </div>
        <div className="bg-night p-5 sm:p-8">
          <StateLabel label="night · accent · body" tone="night" className="items-stretch">
            <SectionHeading tone="night" eyebrow={TREASURY.eyebrow} title={TREASURY.title} accent={TREASURY.titleAccent} body={TREASURY.body} />
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
      description="The account form every ask uses: a square field with the button inside it. Paper or night; submitting swaps in the sent state, which is also an editor action."
      code={`<EmailCapture name="Hero" />
<EmailCapture name="Closing" tone="night" cta="Open an account" />`}
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
        <div className="flex flex-col items-center gap-8 bg-night p-5 sm:p-8">
          <StateLabel label="night · default" tone="night" className="w-full items-center">
            <EmailCapture name="Style guide night" tone="night" />
          </StateLabel>
        </div>
      </div>
    </ComponentSpecimen>
  )
}

export function GiantWordmarkSpecimen() {
  return (
    <ComponentSpecimen
      name="GiantWordmark"
      source="components/blocks/giant-wordmark.tsx"
      description="The name set edge to edge — an SVG line fitted to its box — and cropped at the foot by `crop` (0–0.4), the way a poster runs off the sheet."
      code={`<GiantWordmark className="text-pink" crop={0.24} />`}
      tone="night"
      previewClassName="px-5 pb-0 sm:px-8 sm:pb-0"
    >
      <div className="flex flex-col gap-6 text-pink">
        <StateLabel label="crop 0.24 (default)" tone="night" className="items-stretch">
          <GiantWordmark />
        </StateLabel>
        <StateLabel label="crop 0" tone="night" className="items-stretch">
          <GiantWordmark crop={0} />
        </StateLabel>
        <StateLabel label="crop 0.4" tone="night" className="items-stretch">
          <GiantWordmark crop={0.4} />
        </StateLabel>
      </div>
    </ComponentSpecimen>
  )
}

/* ─── Product art ─────────────────────────────────────────────────────── */

export function ArtSpecimen() {
  const arts: [string, ComponentType, string][] = [
    ["CurrenciesArt", CurrenciesArt, "bg-card"],
    ["CardsArt", CardsArt, "bg-pink"],
    ["TreasuryArt", TreasuryArt, "bg-night"],
    ["BillsArt", BillsArt, "bg-coral"],
    ["ControlsArt", ControlsArt, "bg-paper-deep"],
  ]
  return (
    <ComponentSpecimen
      name="Feature art"
      source="components/mock/feature-art.tsx"
      description="The small working UIs at the foot of each bento cell — balances in four currencies, cards with limits, the treasury line, a bill waiting on approval, spend rules — each on the cell colour it sits on."
      code={`<FeatureCell tone="coral" title="…" body="…">
  <BillsArt />
</FeatureCell>`}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {arts.map(([name, Art, bg]) => (
          <StateLabel key={name} label={name} className="items-stretch">
            <div className={cn("p-5", bg)}>
              <Art />
            </div>
          </StateLabel>
        ))}
      </div>
    </ComponentSpecimen>
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
        name="MetalCard"
        source="components/motion/metal-card.tsx"
        description="The Tidemark card in brushed oxblood metal. It turns up to `tilt` degrees toward a mouse on a spring, a sheen following; `frozen` greys it and adds the badge. Still while designing and with reduced motion."
        code={`<MetalCard holder="Amara Lewis" last4="4821" expiry="09/29" tilt={10} frozen={false} />`}
        tone="night"
      >
        <div className="grid gap-8 sm:grid-cols-2">
          <StateLabel label="default — move the pointer over it" tone="night" className="items-stretch">
            <MetalCard {...ACCOUNT.card} className="mx-auto w-full max-w-[340px]" />
          </StateLabel>
          <StateLabel label="frozen" tone="night" className="items-stretch">
            <MetalCard {...ACCOUNT.card} frozen className="mx-auto w-full max-w-[340px]" />
          </StateLabel>
        </div>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="CountUp"
        source="components/motion/count-up.tsx"
        description="A figure that counts up to its value once, the first time it comes into view (1.2s, strong out-curve). Prefix and decimals are props."
        code={`<CountUp value={2418902.14} duration={1.2} prefix="$" decimals={2} />`}
      >
        <Replay>
          {(key) => (
            <div key={key} className="grid gap-4 sm:grid-cols-2">
              <p className="font-mono text-[clamp(26px,3vw,34px)] leading-none tracking-[-0.03em] text-ink">
                <CountUp value={ACCOUNT.balance} />
              </p>
              <p className="type-display text-[40px] text-coral">
                <CountUp value={4.1} prefix="" decimals={2} />%
              </p>
            </div>
          )}
        </Replay>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="Sparkline · YieldChart"
        source="components/motion/sparkline.tsx · components/motion/yield-chart.tsx"
        description="Sparkline: one series with a soft fill, drawn left to right once; light or night. YieldChart: a year of compounding, recessive grid, crosshair and tooltip on hover or touch, redrawn when the amount changes."
        code={`<Sparkline tone="light" points="10,12,13,15,18,21,24" />
<YieldChart amount={1000000} rate={0.041} months={12} />`}
        previewClassName="p-0 sm:p-0"
      >
        <div className="grid gap-px bg-line sm:grid-cols-2">
          <div className="bg-card p-5 sm:p-8">
            <StateLabel label="tone light" className="items-stretch">
              <Sparkline points="10,12,11,14,16,15,18,21,20,24,27,29,31" />
            </StateLabel>
          </div>
          <div className="bg-night p-5 sm:p-8">
            <StateLabel label="tone night" tone="night" className="items-stretch">
              <Sparkline tone="night" points="10,12,13,15,16,18,21,23,24,27,29,31,34" />
            </StateLabel>
          </div>
        </div>
        <div className="bg-night-card p-5 sm:p-8">
          <StateLabel label="YieldChart — hover for the tooltip" tone="night" className="items-stretch">
            <YieldChart amount={1000000} rate={TREASURY.calculator.rate} />
          </StateLabel>
        </div>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="LiftCard · Reveal"
        source="components/motion/tilt-card.tsx · components/motion/reveal.tsx"
        description="LiftCard rises a few pixels under the pointer on a spring (hover one). Reveal brings content up 24px the first time it scrolls into view — out, in-out or spring."
        code={`<LiftCard lift={4}>…</LiftCard>
<Reveal y={24} delay={0.06} easing="out">…</Reveal>`}
      >
        <div className="grid gap-6">
          <div className="grid grid-cols-3 gap-3">
            {(["bg-pink", "bg-coral", "bg-card"] as const).map((bg, i) => (
              <LiftCard key={bg} lift={4 + i * 2} className={cn("grid aspect-square place-items-center text-[13px] text-ink", bg)}>
                lift {4 + i * 2}
              </LiftCard>
            ))}
          </div>
          <Replay>
            {(key) => (
              <div className="grid gap-3 sm:grid-cols-3">
                {(["out", "in-out", "spring"] as const).map((easing, i) => (
                  <Reveal key={`${key}-${easing}`} easing={easing} delay={i * 0.06}>
                    <div className="bg-card p-4 text-[13px] text-ink-muted shadow-(--shadow-card)">easing “{easing}”</div>
                  </Reveal>
                ))}
              </div>
            )}
          </Replay>
        </div>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="Marquee"
        source="components/motion/marquee.tsx"
        description="A row that drifts forever, doubled so the loop has no seam; pauses on hover. Left or right."
        code={`<Marquee speed={50}>{logos}</Marquee>
<Marquee direction="right">{…}</Marquee>`}
      >
        <div className="flex flex-col gap-4 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
          <Marquee speed={50}>
            {LOGO_ROW.map((logo) => (
              <BrandLogo key={logo} logo={logo} className="mx-7 opacity-80" />
            ))}
          </Marquee>
          <Marquee direction="right">
            {NAV.product.items.map((item) => (
              <span key={item.title} className="type-caps mx-1.5 bg-card px-3 py-2 text-[11px] whitespace-nowrap text-ink shadow-(--shadow-card)">
                {item.title}
              </span>
            ))}
          </Marquee>
        </div>
      </ComponentSpecimen>
    </>
  )
}

/* ─── Section cards ───────────────────────────────────────────────────── */

export function CardSpecimens() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly")
  const f = FEATURES
  return (
    <>
      <ComponentSpecimen
        name="Figure"
        source="components/sections/numbers.tsx"
        description="One figure in the numbers band: a big mono number over the line that explains it."
        code={`<Figure value="$4.2B" label="held for 9,000+ companies" />`}
      >
        <div className="grid grid-cols-2 md:grid-cols-4">
          {NUMBERS.map((n) => (
            <Figure key={n.label} {...n} />
          ))}
        </div>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="FeatureCell"
        source="components/sections/features.tsx"
        description="A cell of the product bento: caps title, a line, then its art — flat colour in five tones (cream, pink, night, coral, sand). It lifts under the pointer."
        code={`<FeatureCell tone="pink" title="Cards with limits that think" body="…">
  <CardsArt />
</FeatureCell>`}
      >
        <div className="grid md:grid-cols-6">
          <div className="md:col-span-3 lg:col-span-2"><FeatureCell tone="cream" {...f.accounts}><CurrenciesArt /></FeatureCell></div>
          <div className="md:col-span-3 lg:col-span-2"><FeatureCell tone="pink" {...f.cards}><CardsArt /></FeatureCell></div>
          <div className="md:col-span-6 lg:col-span-2"><FeatureCell tone="night" {...f.treasury}><TreasuryArt /></FeatureCell></div>
          <div className="md:col-span-3"><FeatureCell tone="coral" {...f.bills}><BillsArt /></FeatureCell></div>
          <div className="md:col-span-3"><FeatureCell tone="sand" {...f.controls}><ControlsArt /></FeatureCell></div>
        </div>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="YieldCalculator"
        source="components/sections/treasury.tsx"
        description="Pick how much you keep, read what a year earns against a typical checking account, and see the year as a line. Live: drag the slider."
        code={`<YieldCalculator start={1000000} />`}
        tone="night"
      >
        <YieldCalculator />
      </ComponentSpecimen>
      <ComponentSpecimen
        name="Step"
        source="components/sections/steps.tsx"
        description="One step: its number in coral display caps under an ink rule, then what happens."
        code={`<Step n="01" title="Apply online" body="…" />`}
      >
        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {STEPS.items.map((s) => (
            <Step key={s.n} {...s} />
          ))}
        </div>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="Guarantee"
        source="components/sections/security.tsx"
        description="One promise: its icon on an oxblood square, the promise, the detail. Six of them sit in a hairline grid."
        code={`<Guarantee icon="shield" title="FDIC coverage to $5M" body="…" />`}
      >
        <div className="grid gap-px bg-line shadow-(--shadow-hairline) sm:grid-cols-2 lg:grid-cols-3">
          {SECURITY.items.map((item) => (
            <Guarantee key={item.title} {...item} />
          ))}
        </div>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="VoiceCard"
        source="components/sections/voices.tsx"
        description="A short customer quote on cream, with a square portrait and who said it."
        code={`<VoiceCard quote="…" name="Marcus Hale" role="Co-founder, Oakline" photo={33857898} />`}
      >
        <div className="grid md:grid-cols-3">
          {VOICES.items.map((v) => (
            <VoiceCard key={v.name} {...v} />
          ))}
        </div>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="PlanCard"
        source="components/sections/pricing.tsx"
        description="One plan: name, blurb, a price that rolls when billing changes, what’s included, the button. The featured plan is set in coral with an ink badge and, on the page, the one border beam."
        code={`<BorderBeam size="md" colorVariant="sunset" theme="light" strength={0.7} duration={10} borderRadius={0}>
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
        <div className="grid gap-4 lg:grid-cols-3">
          {PRICING.plans.map((plan) => (
            <StateLabel key={plan.name} label={plan.featured ? "featured · border beam" : plan.label ? "label price" : "default"} className="items-stretch">
              {plan.featured ? (
                <BorderBeam size="md" colorVariant="sunset" theme="light" strength={0.7} duration={10} borderRadius={0} className="h-full">
                  <PlanCard plan={plan} billing={billing} />
                </BorderBeam>
              ) : (
                <PlanCard plan={plan} billing={billing} />
              )}
            </StateLabel>
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
        description="Oxblood and sticky, the name and every link in pink wide caps; a hairline comes up under it once the page scrolls. Below 1024px the menus move into a sheet. The “Product menu” and “Mobile menu” actions reach its hidden states."
        code={`<SiteHeader />`}
        previewClassName="p-0 sm:p-0"
      >
        <SiteHeader />
      </ComponentSpecimen>
      <ComponentSpecimen
        name="SiteFooter"
        source="components/site/site-footer.tsx"
        description="The deep oxblood footer: the wordmark in pink, four columns, the disclosures a bank page owes its reader, and the link to this page. It is live at the foot of this page."
        code={`<SiteFooter />`}
      >
        <p className="text-[14px] text-ink-muted">Scroll to the end of the page to see it in place.</p>
      </ComponentSpecimen>
    </>
  )
}

/* ─── Sections ────────────────────────────────────────────────────────── */

const SECTIONS: { id: string; label: string; Section: ComponentType }[] = [
  { id: "hero", label: "Hero", Section: Hero },
  { id: "logos", label: "LogoCloud", Section: LogoCloud },
  { id: "numbers", label: "Numbers", Section: Numbers },
  { id: "features", label: "Features", Section: Features },
  { id: "treasury", label: "Treasury", Section: Treasury },
  { id: "steps", label: "Steps", Section: Steps },
  { id: "security", label: "Security", Section: Security },
  { id: "voices", label: "Voices", Section: Voices },
  { id: "pricing", label: "Pricing", Section: Pricing },
  { id: "faq", label: "Faq", Section: Faq },
  { id: "closing", label: "Closing", Section: Closing },
]

/** Every section of the home page, live, one at a time in a frame. */
export function SectionViewer() {
  const [active, setActive] = useState(SECTIONS[0].id)
  const index = SECTIONS.findIndex((entry) => entry.id === active)
  useCanvasAction("Style guide · Next section", () => setActive(SECTIONS[(index + 1) % SECTIONS.length].id), { group: "Brand guidelines" })
  return (
    <article className="overflow-hidden bg-card shadow-(--shadow-card)">
      <header className="border-b border-line px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="type-caps text-[17px] text-ink">Sections</h3>
          <code className="font-mono text-[11.5px] text-ink-subtle">components/sections/*.tsx</code>
        </div>
        <p className="mt-1 text-[14.5px] leading-[1.5] text-ink-muted">
          All {SECTIONS.length} sections of the home page, live and whole, one at a time. The pieces private to a section — the hero’s
          balance strip, freeze switch and payment toast — are seen here, in place; the hero’s “Payment notification” and “Card frozen”
          actions reach them.
        </p>
      </header>
      <Tabs value={active} onValueChange={setActive} className="gap-0">
        <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1.5 rounded-none border-b border-line bg-paper-deep/60 p-3 group-data-[orientation=horizontal]/tabs:h-auto">
          {SECTIONS.map((entry) => (
            <TabsTrigger
              key={entry.id}
              value={entry.id}
              className="type-caps h-8 flex-none rounded-none border border-ink bg-transparent px-2.5 text-[11px] text-ink data-[state=active]:bg-ink data-[state=active]:text-pink data-[state=active]:shadow-none"
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
      <CodeSnippet
        code={`import { Hero } from "@/components/sections/hero"

<Hero toastDelay={1.4} />
<LogoCloud speed={50} />
<Pricing start="yearly" />
<YieldCalculator start={2500000} />`}
      />
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
          <SliderSpecimen />
          <NavigationMenuSpecimen />
          <SheetSpecimen />
          <ContainerSpecimen />
          <IdentitySpecimens />
        </div>
        <AccordionSpecimen />
      </div>
      <div className="space-y-6">
        <GroupLabel>Blocks — components/blocks</GroupLabel>
        <SectionHeadingSpecimen />
        <EmailCaptureSpecimen />
        <GiantWordmarkSpecimen />
      </div>
      <div className="space-y-6">
        <GroupLabel>Product art — components/mock</GroupLabel>
        <ArtSpecimen />
      </div>
      <div className="space-y-6">
        <GroupLabel>Motion — components/motion</GroupLabel>
        <MotionSpecimens />
        <p className="text-[14px] text-ink-muted">
          <code className="font-mono text-[12px]">SmoothScroll</code> (Lenis, lerp 0.1) has nothing to draw: it is carrying this page’s scroll.
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
