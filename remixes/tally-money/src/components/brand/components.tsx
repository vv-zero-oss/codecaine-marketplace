import { Coffee, Landmark } from "lucide-react"

import { ComponentSpecimen, CopyButton, StateLabel } from "@/components/brand/specimen"
import { BankLinkCard } from "@/components/sections/bank-link"
import { TransactionRow } from "@/components/sections/auto-log"
import { FooterColumn } from "@/components/site-footer"
import { NavLink } from "@/components/site-header"
import { Badge } from "@/components/ui/badge"
import { ArrowIcon } from "@/components/ui/icon"
import { Button, ButtonLink } from "@/components/ui/button"
import { AppIcon } from "@/components/ui/app-icon"
import { Container } from "@/components/ui/container"
import { PhoneFrame } from "@/components/ui/phone-frame"
import { SectionHeading } from "@/components/ui/section-heading"
import { Wordmark } from "@/components/ui/wordmark"
import { Switch } from "@/components/ui/switch"
import { Magnetic } from "@/components/motion/magnetic"
import { Tilt } from "@/components/motion/tilt"
import { SplitText } from "@/components/motion/split-text"
import { useState } from "react"
import { QrCode } from "@/components/qr-code"
import { CountUp } from "@/components/motion/count-up"
import { CashFlowChart } from "@/components/motion/cash-flow-chart"
import { MerchantMatch } from "@/components/motion/merchant-match"
import { SearchDemo } from "@/components/motion/search-demo"
import { SpinningCoin } from "@/components/motion/coin"
import { FallingObjects } from "@/components/falling-objects"

const VARIANTS = ["default", "primary", "outline", "ghost", "link"] as const
const SIZES = ["sm", "default", "lg", "icon"] as const

/** Hover and focus drawn on, so both can be seen without a pointer. */
const HOVER = {
  default: "bg-ink-950",
  primary: "bg-brand-700",
  outline: "bg-ink-50",
  ghost: "bg-ink-100 text-ink-900",
  link: "underline",
} as const
const FOCUS = "ring-2 ring-brand-500 ring-offset-2"

export function ButtonSpecimen() {
  return (
    <ComponentSpecimen
      name="Button"
      source="components/ui/button.tsx"
      description="Five variants and four sizes on a cva recipe. Pill-shaped, 14px semibold, a colour change on hover, a 0.97 press and a brand focus ring. ButtonLink is the same recipe on an anchor."
      code={`import { Button, ButtonLink } from "@/components/ui/button"

<Button variant="primary">Get the app</Button>
<ButtonLink href="#demo" variant="outline" size="lg">Read the manifesto</ButtonLink>`}
    >
      <div className="space-y-8">
        <div className="space-y-4">
          {VARIANTS.map((variant) => (
            <div key={variant} className="flex flex-wrap items-end gap-x-6 gap-y-4">
              <span className="w-full font-mono text-[11px] text-ink-400 sm:w-16">{variant}</span>
              <StateLabel label="default">
                <Button variant={variant}>Get started</Button>
              </StateLabel>
              <StateLabel label="hover">
                <Button variant={variant} className={HOVER[variant]}>
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
                  Get started
                  <ArrowIcon />
                </Button>
              </StateLabel>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-end gap-6">
          <span className="w-full font-mono text-[11px] text-ink-400 sm:w-16">sizes</span>
          {SIZES.map((size) => (
            <StateLabel key={size} label={size}>
              <Button size={size} aria-label={size === "icon" ? "Continue" : undefined}>
                {size === "icon" ? <ArrowIcon /> : "Get started"}
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

export function ComponentLibrary() {
  const [on, setOn] = useState(true)
  return (
    <div className="space-y-8">
      <ButtonSpecimen />

      <div className="grid gap-8 lg:grid-cols-2">
        <ComponentSpecimen name="Badge" source="components/ui/badge.tsx" description="A status dot and a short sentence." code={`<Badge>Now in public beta</Badge>`}>
          <Badge>Now in public beta</Badge>
        </ComponentSpecimen>

        <ComponentSpecimen name="AppIcon" source="components/ui/app-icon.tsx" description="The glossy tile above a section heading. Takes any Lucide icon." code={`<AppIcon icon={Landmark} />`}>
          <div className="flex gap-3">
            <AppIcon icon={Landmark} />
            <AppIcon icon={Coffee} />
          </div>
        </ComponentSpecimen>

        <ComponentSpecimen name="Wordmark" source="components/ui/wordmark.tsx" description="The mark and the word, as a link or as plain text." code={`<Wordmark href="#top" />`}>
          <Wordmark />
        </ComponentSpecimen>

        <ComponentSpecimen name="QrCode" source="components/qr-code.tsx" description="A decorative get-the-app tile. Swap it for a real code before launch." code={`<QrCode className="size-20" />`}>
          <QrCode className="size-20" />
        </ComponentSpecimen>

        <ComponentSpecimen name="SectionHeading" source="components/ui/section-heading.tsx" description="Centred title and one soft line." code={`<SectionHeading title="…" blurb="…" />`}>
          <SectionHeading title="Search. Recall. Filter." blurb="One line under it." />
        </ComponentSpecimen>

        <ComponentSpecimen name="NavLink and FooterColumn" source="components/site-header.tsx" description="Quiet links that darken on hover." code={`<NavLink href="#features">Features</NavLink>`}>
          <div className="flex flex-wrap items-start gap-8">
            <NavLink href="#features">Features</NavLink>
            <FooterColumn title="Product" links={[["Features", "#features"], ["Download", "#download"]]} />
          </div>
        </ComponentSpecimen>
      </div>

      <ComponentSpecimen name="TransactionRow" source="components/sections/auto-log.tsx" description="One payment: merchant, time, amount and category." code={`<TransactionRow merchant="Blue Bottle" when="Today" amount="$5" tag="Food & drinks" />`}>
        <div className="max-w-sm">
          <TransactionRow merchant="Blue Bottle" when="Today, 11:17 AM" amount="$5" tag="Food & drinks" />
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen name="BankLinkCard" source="components/sections/bank-link.tsx" description="The bank row and its switch; flips on by itself the first time it is seen. Editor action: Bank linked." code={`<BankLinkCard delay={900} />`}>
        <BankLinkCard />
      </ComponentSpecimen>

      <ComponentSpecimen name="MerchantMatch" source="components/motion/merchant-match.tsx" description="Cycles payments, pins and categories. Props: interval (ms), paused." code={`<MerchantMatch interval={3200} paused={false} />`}>
        <MerchantMatch />
      </ComponentSpecimen>

      <ComponentSpecimen name="SearchDemo" source="components/motion/search-demo.tsx" description="Types a query and shows its result. Props: typingSpeed, hold. Editor action: Search result." code={`<SearchDemo typingSpeed={110} hold={2600} />`}>
        <SearchDemo />
      </ComponentSpecimen>

      <div className="grid gap-8 lg:grid-cols-2">
        <ComponentSpecimen name="PhoneFrame and CashFlowChart" source="components/ui/phone-frame.tsx" description="A dark phone with the cash-flow chart drawing itself in. Props: duration, stagger." code={`<PhoneFrame tone="dark"><CashFlowChart /></PhoneFrame>`}>
          <div className="mx-auto w-48">
            <PhoneFrame tone="dark">
              <div className="px-4 pt-6 text-white">
                <CashFlowChart />
              </div>
            </PhoneFrame>
          </div>
        </ComponentSpecimen>

        <ComponentSpecimen name="CountUp and SpinningCoin" source="components/motion/" description="A number that counts up on view; a coin that turns. Props: value, prefix, duration · duration, tilt." code={`<CountUp value={71034} />\n<SpinningCoin duration={3.2} />`}>
          <div className="flex items-center gap-8">
            <CountUp value={71034} className="tabular text-4xl font-extrabold tracking-tight" />
            <SpinningCoin className="w-20" />
          </div>
        </ComponentSpecimen>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <ComponentSpecimen name="Switch" source="components/ui/switch.tsx" description="A pill switch on transitions, so a quick double flip retargets. 44px tall hit area." code={`<Switch checked={on} onCheckedChange={setOn} label="Keep phone plan" />`}>
          <Switch checked={on} onCheckedChange={setOn} label="Keep phone plan" />
        </ComponentSpecimen>

        <ComponentSpecimen name="Magnetic" source="components/motion/magnetic.tsx" description="Leans toward a mouse pointer and springs back. Off on touch and in reduced motion. Prop: strength." code={`<Magnetic strength={0.25}><ButtonLink …/></Magnetic>`}>
          <Magnetic>
            <ButtonLink href="#" variant="primary" size="lg">Move the pointer near me</ButtonLink>
          </Magnetic>
        </ComponentSpecimen>

        <ComponentSpecimen name="Tilt" source="components/motion/tilt.tsx" description="Tilts a device toward the pointer. Props: max (deg), lift (scale)." code={`<Tilt max={9} lift={1.03}><PhoneFrame/></Tilt>`}>
          <Tilt max={10} lift={1.04} className="mx-auto w-28">
            <PhoneFrame />
          </Tilt>
        </ComponentSpecimen>

        <ComponentSpecimen name="SplitText" source="components/motion/split-text.tsx" description="Words rise out of a mask in reading order. Props: text, as, delay, stagger, duration." code={`<SplitText text="Spend with your eyes open." delay={0.2} />`}>
          <SplitText text="Spend with your eyes open." as="p" delay={0.1} className="text-3xl font-extrabold tracking-tight" />
        </ComponentSpecimen>
      </div>

      <ComponentSpecimen name="FallingObjects" source="components/falling-objects.tsx" description="The hero pile. Props: stagger, distance, bounce." code={`<FallingObjects stagger={0.09} distance={520} bounce={0.28} />`} previewClassName="bg-ink-100">
        <FallingObjects className="max-w-xs" />
      </ComponentSpecimen>

      <div className="rounded-2xl border border-ink-200 bg-white p-5 text-sm text-ink-600">
        <p className="font-medium text-ink-900">Layout</p>
        <p className="mt-1">
          <code className="font-mono text-xs">Container</code> centres every section at 72rem with a
          20px (32px from sm) gutter, and is marked <code className="font-mono text-xs">data-canvas-ignore</code>.
        </p>
        <div className="mt-3 flex items-center gap-3">
          <Container className="rounded-lg bg-ink-100 py-3 text-center text-xs">Container</Container>
          <CopyButton text={'<Container className="py-16">…</Container>'} />
        </div>
      </div>
    </div>
  )
}
