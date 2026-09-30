import { ComponentSpecimen, CopyButton, StateLabel } from "@/components/brand/specimen"
import { FeatureCard } from "@/components/sections/features"
import { HeroGlow } from "@/components/sections/hero"
import { IntegrationTile } from "@/components/sections/integrations"
import { LogoName } from "@/components/sections/logo-cloud"
import { PlanCard, PlanFeature } from "@/components/sections/pricing"
import { Stat } from "@/components/sections/stats"
import { TestimonialCard } from "@/components/sections/testimonials"
import { FooterColumn } from "@/components/site-footer"
import { NavLink } from "@/components/site-header"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge, RibbonBadge } from "@/components/ui/badge"
import { Button, ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { ArrowIcon, CheckIcon } from "@/components/ui/icon"
import { SectionHeading } from "@/components/ui/section-heading"
import { Wordmark } from "@/components/ui/wordmark"
import { FAQS, FEATURES, PLANS, STATS, TESTIMONIALS } from "@/content"

const VARIANTS = ["default", "primary", "outline", "ghost", "link"] as const
const SIZES = ["sm", "default", "lg", "icon"] as const

/** Hover and focus drawn on, so both can be seen without a pointer. */
const HOVER = {
  default: "bg-quartz-950",
  primary: "bg-indigo-700",
  outline: "bg-quartz-50",
  ghost: "bg-quartz-50 text-quartz-900",
  link: "underline",
} as const
const FOCUS = "ring-2 ring-indigo-500 ring-offset-2"

export function ButtonSpecimen() {
  return (
    <ComponentSpecimen
      name="Button"
      source="components/ui/button.tsx"
      description="Five variants and four sizes on a cva recipe. Pill-shaped, 14px medium text, a colour change on hover and an indigo focus ring. ButtonLink is the same recipe on an anchor."
      code={`import { Button, ButtonLink } from "@/components/ui/button"

<Button variant="primary">Start free</Button>
<ButtonLink href="#demo" variant="outline" size="lg">Book a demo</ButtonLink>`}
    >
      <div className="space-y-8">
        <div className="space-y-4">
          {VARIANTS.map((variant) => (
            <div key={variant} className="flex flex-wrap items-end gap-x-6 gap-y-4">
              <span className="w-full font-mono text-[11px] text-quartz-400 sm:w-16">{variant}</span>
              <StateLabel label="default">
                <Button variant={variant}>Deploy</Button>
              </StateLabel>
              <StateLabel label="hover">
                <Button variant={variant} className={HOVER[variant]}>
                  Deploy
                </Button>
              </StateLabel>
              <StateLabel label="focus">
                <Button variant={variant} className={FOCUS}>
                  Deploy
                </Button>
              </StateLabel>
              <StateLabel label="disabled">
                <Button variant={variant} disabled>
                  Deploy
                </Button>
              </StateLabel>
              <StateLabel label="with icon">
                <Button variant={variant}>
                  Deploy
                  <ArrowIcon />
                </Button>
              </StateLabel>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-end gap-6">
          <span className="w-full font-mono text-[11px] text-quartz-400 sm:w-16">sizes</span>
          {SIZES.map((size) => (
            <StateLabel key={size} label={size}>
              <Button size={size} aria-label={size === "icon" ? "Continue" : undefined}>
                {size === "icon" ? <ArrowIcon /> : "Deploy"}
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
  return (
    <div className="space-y-8">
      <ButtonSpecimen />

      <div className="grid gap-8 lg:grid-cols-2">
        <ComponentSpecimen
          name="Badge"
          source="components/ui/badge.tsx"
          description="A status dot and a short sentence. Sits above headlines."
          code={`<Badge>Quartz 3.0 is out</Badge>`}
        >
          <div className="flex flex-wrap gap-3">
            <Badge>Quartz 3.0 is out</Badge>
            <Badge>Traces are live</Badge>
          </div>
        </ComponentSpecimen>

        <ComponentSpecimen
          name="RibbonBadge"
          source="components/ui/badge.tsx"
          description="Positioned over the top edge of a relative parent — the featured plan."
          code={`<div className="relative …">
  <RibbonBadge>Most popular</RibbonBadge>
</div>`}
        >
          <div className="relative mt-3 h-16 rounded-2xl border-2 border-indigo-600 bg-white">
            <RibbonBadge>Most popular</RibbonBadge>
          </div>
        </ComponentSpecimen>

        <ComponentSpecimen
          name="Wordmark"
          source="components/ui/wordmark.tsx"
          description="The mark and the name. A link with href, plain text without."
          code={`<Wordmark href="#top" />
<Wordmark />`}
        >
          <div className="flex flex-wrap items-center gap-8">
            <StateLabel label="with href">
              <Wordmark href="#brand" />
            </StateLabel>
            <StateLabel label="plain">
              <Wordmark />
            </StateLabel>
          </div>
        </ComponentSpecimen>

        <ComponentSpecimen
          name="Icon"
          source="components/ui/icon.tsx"
          description="An inline 24px SVG in currentColor, with ArrowIcon and CheckIcon made from it."
          code={`<Icon><path d="M4 12h16M12 4v16" strokeWidth="1.5" strokeLinecap="round" /></Icon>
<ArrowIcon />
<CheckIcon />`}
        >
          <div className="flex items-center gap-6 text-quartz-900">
            <ArrowIcon />
            <span className="text-indigo-600">
              <CheckIcon />
            </span>
          </div>
        </ComponentSpecimen>

        <ComponentSpecimen
          name="NavLink"
          source="components/site-header.tsx"
          description="Header navigation. Quartz 600, darkening on hover."
          code={`<NavLink href="#pricing">Pricing</NavLink>`}
        >
          <nav className="flex gap-8 text-sm text-quartz-600">
            <NavLink href="#components">Features</NavLink>
            <NavLink href="#components">Pricing</NavLink>
            <NavLink href="#components">FAQ</NavLink>
          </nav>
        </ComponentSpecimen>

        <ComponentSpecimen
          name="CopyButton"
          source="components/brand/specimen.tsx"
          description="Copies text and swaps to a check for a moment — the copied state."
          code={`<CopyButton text="npm run dev" />`}
          previewClassName="bg-quartz-950"
        >
          <div className="flex items-center gap-3 font-mono text-sm text-quartz-100">
            npm run dev
            <CopyButton text="npm run dev" />
          </div>
        </ComponentSpecimen>
      </div>

      <ComponentSpecimen
        name="SectionHeading"
        source="components/ui/section-heading.tsx"
        description="The centred title and blurb most sections open with."
        code={`<SectionHeading title="Everything the deploy actually needs" blurb="…" />`}
      >
        <SectionHeading
          title="Everything the deploy actually needs"
          blurb="Built for teams who would rather ship than babysit a pipeline."
        />
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Accordion"
        source="components/ui/accordion.tsx"
        description="shadcn’s accordion on Radix. One open at a time; the panel animates its height in 200ms."
        code={`<Accordion type="single" collapsible>
  <AccordionItem value="byo">
    <AccordionTrigger>Can I bring my own cloud?</AccordionTrigger>
    <AccordionContent>Yes. …</AccordionContent>
  </AccordionItem>
</Accordion>`}
        previewClassName="bg-white"
      >
        <Accordion type="single" collapsible defaultValue={FAQS[0].q} className="mx-auto max-w-2xl">
          {FAQS.map((item) => (
            <AccordionItem key={item.q} value={item.q}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Container"
        source="components/ui/container.tsx"
        description="Centres content at 72rem with 24px gutters. Marked data-canvas-ignore, so the editor clicks through it."
        code={`<Container className="flex items-center justify-between">…</Container>`}
        previewClassName="p-0 sm:p-0"
      >
        <Container className="border-x border-dashed border-indigo-500/40 py-6">
          <div className="rounded-xl bg-white p-4 text-center text-sm text-quartz-600">
            max-w-6xl · px-6 · mx-auto
          </div>
        </Container>
      </ComponentSpecimen>

      <div className="grid gap-8 lg:grid-cols-2">
        <ComponentSpecimen
          name="FeatureCard"
          source="components/sections/features.tsx"
          description="An icon well, a title and a line. Lifts on hover with a soft shadow."
          code={`<FeatureCard title="Ship on every merge" body="…" icon="M4 12h16M12 4v16" />`}
        >
          <div className="grid gap-4">
            <FeatureCard {...FEATURES[0]} />
            <StateLabel label="hover">
              <div className="w-full [&>div]:shadow-lg [&>div]:shadow-quartz-900/5">
                <FeatureCard {...FEATURES[1]} />
              </div>
            </StateLabel>
          </div>
        </ComponentSpecimen>

        <ComponentSpecimen
          name="TestimonialCard"
          source="components/sections/testimonials.tsx"
          description="A quote, a person and their role."
          code={`<TestimonialCard quote="…" name="Priya Raman" role="Staff Engineer, Northwind" />`}
        >
          <TestimonialCard {...TESTIMONIALS[0]} />
        </ComponentSpecimen>
      </div>

      <ComponentSpecimen
        name="PlanCard"
        source="components/sections/pricing.tsx"
        description="A plan, its price and what it includes. The featured one gets the indigo border, a shadow and the ribbon."
        code={`<PlanCard {...plan} featured />`}
      >
        <div className="grid gap-6 pt-3 md:grid-cols-3">
          {PLANS.map((plan) => (
            <PlanCard key={plan.name} {...plan} />
          ))}
        </div>
      </ComponentSpecimen>

      <div className="grid gap-8 lg:grid-cols-2">
        <ComponentSpecimen
          name="Stat"
          source="components/sections/stats.tsx"
          description="A number and what it counts."
          code={`<dl><Stat value="42ms" label="p50 edge response, worldwide" /></dl>`}
        >
          <dl className="grid gap-8 text-center sm:grid-cols-2">
            <Stat {...STATS[0]} />
            <Stat {...STATS[1]} />
          </dl>
        </ComponentSpecimen>

        <ComponentSpecimen
          name="IntegrationTile and LogoName"
          source="components/sections/…"
          description="The names in the integrations grid and the customer row."
          code={`<IntegrationTile>GitHub</IntegrationTile>
<LogoName>Northwind</LogoName>`}
        >
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-3">
              <IntegrationTile>GitHub</IntegrationTile>
              <IntegrationTile>Slack</IntegrationTile>
              <IntegrationTile>Sentry</IntegrationTile>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <LogoName>Northwind</LogoName>
              <LogoName>Lumen</LogoName>
              <LogoName>Kestrel</LogoName>
            </div>
          </div>
        </ComponentSpecimen>

        <ComponentSpecimen
          name="FooterColumn"
          source="components/site-footer.tsx"
          description="A heading and its links."
          code={`<FooterColumn heading="Product" links={["Features", "Pricing", "Changelog"]} />`}
        >
          <div className="grid grid-cols-2 gap-10 text-sm">
            <FooterColumn heading="Product" links={["Features", "Pricing", "Changelog"]} />
            <FooterColumn heading="Company" links={["About", "Careers", "Blog"]} />
          </div>
        </ComponentSpecimen>

        <ComponentSpecimen
          name="HeroGlow and PlanFeature"
          source="components/sections/hero.tsx · pricing.tsx"
          description="The soft glow behind the hero, and the check-and-line bullet in plans."
          code={`<div className="relative overflow-hidden"><HeroGlow /></div>`}
          previewClassName="bg-white"
        >
          <div className="relative h-32 overflow-hidden rounded-xl">
            <HeroGlow />
            <ul className="relative space-y-3 p-2 text-sm">
              <PlanFeature>Preview environments</PlanFeature>
              <PlanFeature>Rollbacks and checkpoints</PlanFeature>
            </ul>
          </div>
        </ComponentSpecimen>
      </div>

      <p className="rounded-2xl border border-dashed border-quartz-200 p-5 text-sm text-quartz-600">
        <span className="font-medium text-quartz-900">SupportDrawer</span> has no trigger on the
        page on purpose: open it from the editor’s Actions row (“Support drawer”).
      </p>
    </div>
  )
}
