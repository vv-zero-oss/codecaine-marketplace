import { useState } from "react"
import { toast } from "sonner"

import { CodeSnippet, ComponentSpecimen, StateLabel } from "@/components/brand/specimen"
import { PAYMENT_MARKS } from "@/components/brand-marks"
import { useContactSales } from "@/components/contact-sales"
import { AssistantPanel, InsightsPanel, TeamPanel } from "@/components/mockups/dashboard-window"
import { OrraCard } from "@/components/mockups/orra-card"
import { GenericTile, PaymentTile } from "@/components/mockups/payment-tile"
import { FundingOffer, LedgerPhone, PaymentLinkCard } from "@/components/mockups/rail-mockups"
import { Terminal } from "@/components/mockups/terminal"
import { BinaryOrb, OrbitMark } from "@/components/motion/binary-orb"
import { Marquee } from "@/components/motion/marquee"
import { Reveal } from "@/components/motion/reveal"
import { RotatingLine } from "@/components/motion/rotating-line"
import { CardFan } from "@/components/sections/accounts"
import { McpCard } from "@/components/sections/developers"
import { HeroShowcase } from "@/components/sections/hero"
import { MerchantMark, ProductLink } from "@/components/sections/merchants"
import { MethodWall, ProductCard } from "@/components/sections/payments"
import { AvatarStack, Rating } from "@/components/sections/support"
import { StoryCarousel } from "@/components/sections/customers"
import { ArrowLink } from "@/components/ui/arrow-link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SectionHeading } from "@/components/ui/section-heading"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SurfaceCard } from "@/components/ui/surface-card"
import { Textarea } from "@/components/ui/textarea"
import { Wordmark } from "@/components/ui/wordmark"
import { CUSTOMERS, HERO, MERCHANTS, PAYMENTS, PRODUCTS } from "@/content"

const LINES = HERO.scenes.map((scene) => scene.line)

/** Every component in the project, live, in its variants and states. */
export function ComponentLibrary() {
  const contact = useContactSales()
  const [line, setLine] = useState(0)
  const [scene, setScene] = useState(0)

  return (
    <div className="space-y-8">
      <ComponentSpecimen
        name="Button"
        source="components/ui/button.tsx"
        description="shadcn's button on Orra's tokens. Cocoa for the one thing to do, secondary beside it. Presses scale to 0.97."
        code={`<Button size="lg">Start for free</Button>\n<Button variant="secondary" size="lg">Talk to sales</Button>\n<ButtonLink href="#signup" size="sm">Sign up</ButtonLink>`}
      >
        <div className="flex flex-wrap items-end gap-6">
          <StateLabel label="default · lg">
            <Button size="lg">Start for free</Button>
          </StateLabel>
          <StateLabel label="secondary · lg">
            <Button size="lg" variant="secondary">Talk to sales</Button>
          </StateLabel>
          <StateLabel label="sm">
            <Button size="sm">Sign up</Button>
          </StateLabel>
          <StateLabel label="outline">
            <Button variant="outline">Outline</Button>
          </StateLabel>
          <StateLabel label="ghost">
            <Button variant="ghost">Ghost</Button>
          </StateLabel>
          <StateLabel label="focus">
            <Button className="ring-[3px] ring-ring/40">Focused</Button>
          </StateLabel>
          <StateLabel label="disabled">
            <Button disabled>Disabled</Button>
          </StateLabel>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="ArrowLink"
        source="components/ui/arrow-link.tsx"
        description="The ember text link with a hairline underline and a chevron that steps right on hover."
        code={`<ArrowLink href="/payments">See online payments</ArrowLink>\n<ArrowLink tone="ink" href="/pricing">See pricing</ArrowLink>`}
      >
        <div className="flex flex-wrap items-center gap-8">
          <ArrowLink href="#">See online payments</ArrowLink>
          <ArrowLink href="#" tone="ink">See pricing</ArrowLink>
          <span className="rounded-md bg-espresso p-3">
            <ArrowLink href="#" tone="inverse">Read the docs</ArrowLink>
          </span>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Eyebrow, SectionHeading, Badge"
        source="components/ui/eyebrow.tsx · section-heading.tsx · badge.tsx"
        description="A mono label over a light, tight headline. Badges are pills; honey marks something new."
        code={`<SectionHeading eyebrow="Customers" title="Made for high volume." />\n<Badge variant="secondary">Owner</Badge>`}
      >
        <div className="space-y-8">
          <SectionHeading eyebrow="Business accounts" title="Run your whole cash flow" align="left" size="title" />
          <div className="flex flex-wrap items-center gap-3">
            <Eyebrow>Online payments</Eyebrow>
            <Badge>Default</Badge>
            <Badge variant="secondary">Owner</Badge>
            <Badge variant="outline">Outline</Badge>
            <span className="rounded-full bg-honey-bg px-2.5 py-0.5 text-[13px] text-honey-ink">Beta</span>
          </div>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Form controls"
        source="components/ui/input.tsx · select.tsx · textarea.tsx · label.tsx"
        description="shadcn's inputs, 44px tall, with errors written under the field. Used in the Talk to sales dialog."
        code={`<Label htmlFor="email">Work email</Label>\n<Input id="email" aria-invalid />\n<p className="text-[13px] text-rose">Use an address like you@company.com.</p>`}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="bg-name">Default</Label>
            <Input id="bg-name" placeholder="Your name" className="h-11" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="bg-email">Error</Label>
            <Input id="bg-email" defaultValue="sofie@" aria-invalid className="h-11" />
            <p className="text-[13px] text-rose">Use an address like you@company.com.</p>
          </div>
          <div className="grid gap-2">
            <Label>Select</Label>
            <Select defaultValue="b">
              <SelectTrigger className="h-11 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a">Under €50k a month</SelectItem>
                <SelectItem value="b">€50k – €250k a month</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="bg-disabled">Disabled</Label>
            <Input id="bg-disabled" disabled placeholder="Read only" className="h-11" />
          </div>
          <div className="grid gap-2 sm:col-span-2">
            <Label htmlFor="bg-msg">Textarea</Label>
            <Textarea id="bg-msg" placeholder="Opening two new markets in spring…" />
          </div>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Dialog, Sheet, Toast"
        source="components/contact-sales.tsx · site-header.tsx · ui/sonner.tsx"
        description="Talk to sales opens a dialog (validation, sending, sent). The mobile menu is a sheet. Confirmations are Sonner toasts. Each is a switch in the editor's Actions row."
        code={`const contact = useContactSales()\n<Button onClick={contact}>Talk to sales</Button>\ntoast.success("Saved")`}
      >
        <div className="flex flex-wrap gap-3">
          <Button onClick={contact}>Open “Talk to sales”</Button>
          <Button variant="secondary" onClick={() => toast.success("Payout scheduled for tomorrow.")}>
            Show a toast
          </Button>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="SurfaceCard and ProductCard"
        source="components/ui/surface-card.tsx · sections/payments.tsx"
        description="Warm, barely-lifted, 16px corners. Espresso and night tones for product shots and the developer pitch."
        code={`<SurfaceCard className="p-10">…</SurfaceCard>\n<SurfaceCard tone="espresso">…</SurfaceCard>`}
      >
        <div className="grid gap-4 sm:grid-cols-3">
          <SurfaceCard className="h-28 p-4 text-sm">warm</SurfaceCard>
          <SurfaceCard tone="espresso" className="h-28 p-4 text-sm">espresso</SurfaceCard>
          <SurfaceCard tone="night" className="h-28 p-4 text-sm">night</SurfaceCard>
          <div className="sm:col-span-2">
            <ProductCard {...PAYMENTS.online} href="#">
              <MethodWall className="absolute inset-x-0 bottom-8 sm:bottom-12" />
            </ProductCard>
          </div>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="RotatingLine"
        source="components/motion/rotating-line.tsx"
        description="A headline line that sinks and blurs out as the next one rises in. 360ms, --ease-out-soft. Props: text, distance (em), duration, blur."
        code={`<h1 className="text-display">\n  One platform for\n  <RotatingLine text={scene.line} />\n</h1>`}
      >
        <div className="space-y-4">
          <p className="text-headline">
            One platform for
            <RotatingLine text={LINES[line]} />
          </p>
          <Button variant="secondary" onClick={() => setLine((value) => (value + 1) % LINES.length)}>
            Next line
          </Button>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="HeroShowcase"
        source="components/sections/hero.tsx"
        description="Scenes that crossfade on a timer, chips that stagger in, and thumbnails whose progress bar is the timer. Props: interval, autoplay, chipStagger."
        code={`<HeroShowcase scenes={HERO.scenes} active={scene} onChange={setScene} interval={6} />`}
        previewClassName="p-3 sm:p-4"
      >
        <HeroShowcase scenes={HERO.scenes} active={scene} onChange={setScene} />
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Marquee and MethodWall"
        source="components/motion/marquee.tsx · sections/payments.tsx"
        description="A linear CSS drift (speed = seconds per loop, direction, paused). The method wall tilts two of them."
        code={`<Marquee speed={45} gap={48}>{items}</Marquee>\n<MethodWall speed={48} tilt={-8} />`}
      >
        <Marquee speed={30} gap={40}>
          {MERCHANTS.map((merchant) => (
            <MerchantMark key={merchant.name} {...merchant} />
          ))}
        </Marquee>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Payment tiles, terminals, cards"
        source="components/mockups/*"
        description="HTML product pictures: a method as an app-icon tile, a terminal in three shapes, a card in five finishes."
        code={`<PaymentTile mark={PAYMENT_MARKS[0]} />\n<Terminal shape="tower" finish="silver" amount="€25.00" />\n<OrraCard finish="iris" />`}
      >
        <div className="flex flex-wrap items-end gap-6">
          <PaymentTile mark={PAYMENT_MARKS[0]} />
          <GenericTile kind="card" />
          <div className="w-32"><Terminal shape="handheld" className="aspect-[3/4]" /></div>
          <div className="w-32"><Terminal shape="tower" finish="silver" className="aspect-[5/8]" /></div>
          <div className="w-28"><Terminal shape="phone" className="aspect-[1/2]" /></div>
          <OrraCard finish="iris" />
          <OrraCard finish="tan" />
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="CardFan"
        source="components/sections/accounts.tsx"
        description="Five cards spread from a stack into a fan when scrolled into view. Props: spread (0 keeps them stacked), stagger."
        code={`<CardFan spread={1} stagger={0.05} />`}
      >
        <div className="flex justify-center overflow-hidden">
          <CardFan />
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Dashboard panels"
        source="components/mockups/dashboard-window.tsx"
        description="The three windows the feature tabs switch between."
        code={`<TeamPanel />  <InsightsPanel />  <AssistantPanel />`}
      >
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="h-[420px]"><TeamPanel /></div>
          <div className="h-[420px]"><InsightsPanel /></div>
          <div className="h-[420px]"><AssistantPanel /></div>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="StoryCarousel"
        source="components/sections/customers.tsx"
        description="Centre story at full size, neighbours a step back carrying the arrows. CSS transform transition, --ease-in-out-soft, 600ms; swipes on touch."
        code={`<StoryCarousel stories={CUSTOMERS.stories} start={1} />`}
        previewClassName="p-0 sm:p-0 py-6 sm:py-8"
      >
        <StoryCarousel stories={CUSTOMERS.stories} />
      </ComponentSpecimen>

      <ComponentSpecimen
        name="BinaryOrb, OrbitMark, McpCard"
        source="components/motion/binary-orb.tsx · sections/developers.tsx"
        description="CSS-only atmosphere for the developer pitch: a lit sphere of flickering digits, and three turning ellipses. Props: size, flicker, seed; spinning."
        code={`<BinaryOrb size={680} flicker />\n<OrbitMark spinning />`}
        previewClassName="bg-night"
      >
        <div className="relative flex h-[420px] flex-col items-center justify-end overflow-hidden text-ink-inverse">
          <BinaryOrb size={380} className="absolute top-0 left-1/2 -translate-x-1/2" />
          <McpCard />
        </div>
        <OrbitMark className="mt-6" />
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Merchants, product links, ratings, avatars"
        source="sections/merchants.tsx · sections/support.tsx"
        description="Type-set merchant marks, the product index link, the star rating and the team stack."
        code={`<MerchantMark name="Terra Vessel" style="serif" />\n<ProductLink {...PRODUCTS[0]} />\n<Rating value={4.7} />\n<AvatarStack />`}
      >
        <div className="flex flex-wrap items-center gap-8">
          <MerchantMark name="Terra Vessel" style="serif" />
          <MerchantMark name="FIELDBLOOM" style="spaced" />
          <ProductLink {...PRODUCTS[0]} />
          <Rating value={4.7} />
          <AvatarStack />
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Rail mockups"
        source="components/mockups/rail-mockups.tsx"
        description="The product pictures in the espresso rail."
        code={`<LedgerPhone />  <FundingOffer />  <PaymentLinkCard />`}
        previewClassName="bg-espresso"
      >
        <div className="grid items-center justify-items-center gap-6 lg:grid-cols-3">
          <LedgerPhone />
          <FundingOffer />
          <PaymentLinkCard />
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Reveal and Wordmark"
        source="components/motion/reveal.tsx · ui/wordmark.tsx"
        description="Reveal fades a block up 16px on first view (640ms, --ease-out-soft); held still in the editor and under reduced motion."
        code={`<Reveal delay={0.08}>…</Reveal>\n<Wordmark />`}
      >
        <Reveal className="flex items-center gap-6">
          <Wordmark className="text-3xl" />
          <OrbitMark spinning={false} className="size-10 text-ink [&_div_div]:border-ink" />
        </Reveal>
      </ComponentSpecimen>

      <CodeSnippet code={`// Every section is a component — the home page is this list:\n<Hero /> <MerchantStrip /> <ProductIndex /> <Payments /> <Accounts />\n<Dashboard /> <Customers /> <Developers /> <Support /> <CallToAction /> <ProductRail />`} />
    </div>
  )
}
