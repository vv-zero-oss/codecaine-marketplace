import { useCanvasAction } from "@canvas/react"
import { Menu, RotateCcw, X } from "lucide-react"
import { lazy, Suspense, useState, type ReactNode } from "react"

import { ComponentSpecimen, GroupLabel, StateLabel } from "@/components/brand/specimen"
import { FooterColumn } from "@/components/layout/site-footer"
import { NavLink, SiteHeader } from "@/components/layout/site-header"
import { Reveal, type RevealEasing } from "@/components/motion/reveal"
import { ScrollText } from "@/components/motion/scroll-text"
import { SplitText } from "@/components/motion/split-text"
import { PriceCard, Step, StepsCard } from "@/components/sections/call-to-action"
import { DottedMap, FlagChip, FlagCloud } from "@/components/sections/coverage"
import { PhotoGlow } from "@/components/sections/hero"
import { FeeWidget, NumberWidget, PrivacyWidget, TickTag } from "@/components/sections/highlight-widgets"
import { HighlightCard } from "@/components/sections/highlights"
import { Perk } from "@/components/sections/perks"
import { StepCard, StepItem } from "@/components/sections/sticky-steps"
import { Testimonial } from "@/components/sections/testimonials"
import { UseCaseCard } from "@/components/sections/use-cases"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button, ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Logo, LogoMark } from "@/components/ui/logo"
import { MetalCard, type MetalFinish } from "@/components/ui/metal-card"
import { SectionHeading } from "@/components/ui/section-heading"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet"
import {
  BRAND,
  COVERAGE,
  CTA,
  FAQ,
  FOOTER,
  HERO,
  HIGHLIGHTS,
  MANIFESTO,
  NAV,
  PERKS,
  STEPS,
  STORY,
  TESTIMONIALS,
  USES,
} from "@/content"
import { cn } from "@/lib/utils"

// Three.js is most of the page's weight: load it only when this frame is reached.
const CtaPhone = lazy(() => import("@/components/phone/cta-phone").then((m) => ({ default: m.CtaPhone })))

const USE_PHOTOS = import.meta.glob<string>("@/assets/uses/*.jpg", { eager: true, query: "?url", import: "default" })
const usePhoto = (key: string) => USE_PHOTOS[`/src/assets/uses/${key}.jpg`]

/** A quiet chip that restarts whatever sits beside it. */
function Replay({ onClick, label = "Replay" }: { onClick: () => void; label?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-11 items-center gap-1.5 rounded-chip bg-surface-raised px-4 text-[0.8125rem] font-medium text-ink shadow-item transition-[background-color,transform] duration-(--duration-hover) ease-out hover:bg-hairline focus-visible:ring-2 focus-visible:ring-ink/30 focus-visible:outline-none active:scale-[0.97] active:duration-(--duration-press) sm:h-9"
    >
      <RotateCcw className="size-3.5" />
      {label}
    </button>
  )
}

function Split({ children }: { children: ReactNode }) {
  return <div className="grid gap-6 xl:grid-cols-2">{children}</div>
}

/* ─── Button ──────────────────────────────────────────────────────────── */

const VARIANTS = ["default", "inverse", "light", "ghost"] as const
const SIZES = ["sm", "default", "lg"] as const
const HOVER = {
  default: "bg-button-hover",
  inverse: "bg-black",
  light: "bg-surface-raised",
  ghost: "text-ink",
} as const
const FOCUS = "ring-2 ring-ink/40 ring-offset-2 ring-offset-canvas"

function ButtonSpecimen() {
  return (
    <ComponentSpecimen
      name="Button"
      source="components/ui/button.tsx"
      description="The page’s one button: a soft pill on a cva recipe. Bone with a lit top edge by default, dark on bone for the price card, graphite on dark panels, bare for icons. Hover lightens in 200ms; press scales to 97% in 140ms. ButtonLink is the same recipe on an anchor."
      code={`import { Button, ButtonLink } from "@/components/ui/button"

<ButtonLink href="#get-started">Get a card</ButtonLink>
<Button variant="inverse" size="sm">Get a card</Button>`}
    >
      <div className="space-y-8">
        {VARIANTS.map((variant) => (
          <div
            key={variant}
            className={cn("flex flex-wrap items-end gap-x-6 gap-y-4 rounded-item p-4", variant === "inverse" && "bg-inverse [&_span.font-mono]:text-inverse-muted")}
          >
            <span className="w-full font-mono text-[11px] text-subtle">variant="{variant}"</span>
            <StateLabel label="default">
              <Button variant={variant}>Get a card</Button>
            </StateLabel>
            <StateLabel label="hover">
              <Button variant={variant} className={HOVER[variant]}>
                Get a card
              </Button>
            </StateLabel>
            <StateLabel label="focus">
              <Button variant={variant} className={cn(FOCUS, variant === "inverse" && "ring-inverse-ink/40 ring-offset-inverse")}>
                Get a card
              </Button>
            </StateLabel>
            <StateLabel label="pressed">
              <Button variant={variant} className={cn("scale-[0.97]", HOVER[variant])}>
                Get a card
              </Button>
            </StateLabel>
            <StateLabel label="disabled">
              <Button variant={variant} disabled>
                Get a card
              </Button>
            </StateLabel>
          </div>
        ))}
        <div className="flex flex-wrap items-end gap-6 px-4">
          <span className="w-full font-mono text-[11px] text-subtle">size</span>
          {SIZES.map((size) => (
            <StateLabel key={size} label={size}>
              <Button size={size}>Get a card</Button>
            </StateLabel>
          ))}
          <StateLabel label="icon (ghost)">
            <Button variant="ghost" className="size-11 px-0" aria-label="Open menu">
              <Menu className="size-5!" />
            </Button>
          </StateLabel>
          <StateLabel label="ButtonLink">
            <ButtonLink href="#components" variant="light" size="sm">
              As a link
            </ButtonLink>
          </StateLabel>
        </div>
      </div>
    </ComponentSpecimen>
  )
}

/* ─── MetalCard ───────────────────────────────────────────────────────── */

const FINISHES: MetalFinish[] = ["chrome", "titanium", "champagne", "graphite", "copper"]

function MetalCardSpecimen() {
  return (
    <ComponentSpecimen
      name="MetalCard"
      source="components/ui/metal-card.tsx"
      description="An Ember card in machined metal: banded finish, brushing, grain and engraved type. Under a mouse the highlight follows the cursor and the card leans up to maxTilt degrees — move over one. Five finishes, two sizes."
      code={`<MetalCard finish="champagne" holder="Nora Lindqvist" last4="4821" />
<MetalCard size="sm" finish="graphite" last4="9034" interactive={false} />`}
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {FINISHES.map((finish, i) => (
          <StateLabel key={finish} label={`finish="${finish}"`} className="[&>div]:w-full">
            <MetalCard finish={finish} last4={USES.items[i].last4} />
          </StateLabel>
        ))}
        <StateLabel label='label="Burned" · interactive={false}' className="[&>div]:w-full">
          <MetalCard finish="graphite" label="Burned" interactive={false} className="opacity-45" />
        </StateLabel>
      </div>
      <div className="mt-8 flex flex-wrap items-end gap-6">
        {FINISHES.map((finish) => (
          <StateLabel key={finish} label={`sm · ${finish}`}>
            <MetalCard size="sm" finish={finish} interactive={false} className="w-24" />
          </StateLabel>
        ))}
      </div>
    </ComponentSpecimen>
  )
}

/* ─── Motion components ───────────────────────────────────────────────── */

function MotionSpecimens() {
  const [reveal, setReveal] = useState(0)
  const [split, setSplit] = useState(0)
  const easings: RevealEasing[] = ["out", "in-out", "spring"]
  return (
    <>
      <Split>
        <ComponentSpecimen
          name="Reveal"
          source="components/motion/reveal.tsx"
          description="The page’s one entrance: a blur that clears as the block fades in and rises. 600ms, 16px, 8px of blur by default; easing out, in-out or a spring. Plays once in view; holds its end state in the editor."
          code={`<Reveal delay={0.08} distance={16} blur={8} easing="out">
  <HighlightCard … />
</Reveal>`}
        >
          <div className="space-y-5">
            <div key={reveal} className="grid gap-3 sm:grid-cols-3">
              {easings.map((easing, i) => (
                <StateLabel key={easing} label={`easing="${easing}"`} className="[&>div]:w-full">
                  <Reveal delay={i * 0.08} easing={easing}>
                    <div className="grid h-20 place-items-center rounded-item bg-surface font-serif text-[1.3125rem] text-ink shadow-item">
                      {["Free", "Instant", "Private"][i]}
                    </div>
                  </Reveal>
                </StateLabel>
              ))}
            </div>
            <Replay onClick={() => setReveal((n) => n + 1)} />
          </div>
        </ComponentSpecimen>

        <ComponentSpecimen
          name="SplitText"
          source="components/motion/split-text.tsx"
          description="A headline that arrives word by word, each clearing from a blur 50ms after the one before. Line breaks (\n) are kept from sm up."
          code={`<SplitText as="h2" text={"Four taps to\\nsleeping soundly."} className="font-serif text-headline" />`}
        >
          <div className="space-y-5">
            <SplitText key={split} text={STEPS.title} className="font-serif text-headline text-ink" />
            <Replay onClick={() => setSplit((n) => n + 1)} />
          </div>
        </ComponentSpecimen>
      </Split>

      <ComponentSpecimen
        name="ScrollText"
        source="components/motion/scroll-text.tsx · sections/manifesto.tsx"
        description="A paragraph that lights up word by word at the pace of the scroll; accent words light in champagne. This is the Manifesto — scroll past it to read it in."
        code={`<ScrollText text={MANIFESTO.text} accent="own,shrug" dim={0.14} />`}
      >
        <Eyebrow label={MANIFESTO.eyebrow} className="mb-6" />
        <ScrollText text={MANIFESTO.text} accent={MANIFESTO.accent} className="text-[clamp(1.75rem,1rem+2.6vw,3.25rem)] leading-[1.08]" />
      </ComponentSpecimen>
    </>
  )
}

/* ─── Sheet: the phone menu ───────────────────────────────────────────── */

function MenuSheetSpecimen() {
  const [open, setOpen] = useState(false)
  useCanvasAction("Menu sheet", (next) => setOpen(next ?? !open), { on: open, group: "Brand guidelines" })
  return (
    <ComponentSpecimen
      name="Sheet — the phone menu"
      source="components/ui/sheet.tsx · layout/site-header.tsx"
      description="shadcn’s sheet on Radix, dropping from the top edge in 320ms with rounded lower corners: the logo, the links in serif on hairline rows, and the button. Below md the header’s links fold into it."
      code={`<Sheet open={open} onOpenChange={setOpen}>
  <SheetTrigger asChild><Button variant="ghost" aria-label="Open menu">…</Button></SheetTrigger>
  <SheetContent className="rounded-b-[28px] px-4 pb-8 shadow-widget">…</SheetContent>
</Sheet>`}
    >
      <div className="flex flex-wrap items-center gap-5">
        <Button variant="light" onClick={() => setOpen(true)}>
          <Menu />
          Open the menu
        </Button>
        <p className="max-w-[18rem] text-[0.8125rem] text-muted">Also “Menu sheet” in the editor’s Actions row.</p>
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="rounded-b-[28px] px-4 pb-8 shadow-widget">
          <Container className="px-0 sm:px-2">
            <div className="flex h-[4.5rem] items-center justify-between">
              <SheetTitle asChild>
                <span>
                  <Logo name={BRAND} href="#components" />
                </span>
              </SheetTitle>
              <SheetClose asChild>
                <Button variant="ghost" className="size-11 px-0" aria-label="Close menu">
                  <X className="size-5!" />
                </Button>
              </SheetClose>
            </div>
            <SheetDescription className="sr-only">Site navigation</SheetDescription>
            <nav className="flex flex-col" aria-label="Menu preview">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href="#components"
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center border-b border-hairline font-serif text-2xl text-ink"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <ButtonLink href="#components" size="lg" className="mt-6 w-full" onClick={() => setOpen(false)}>
              {HERO.cta}
            </ButtonLink>
          </Container>
        </SheetContent>
      </Sheet>
    </ComponentSpecimen>
  )
}

/* ─── How it works: StepCard and StepItem ─────────────────────────────── */

function StepsSpecimen() {
  const [step, setStep] = useState(0)
  return (
    <ComponentSpecimen
      name="StepCard and StepItem"
      source="components/sections/sticky-steps.tsx"
      description="How it works, in its four states: the same card turns and changes metal as the steps pass, and once burned it goes to cold graphite and dims. Beside it the list — the current row lit, with its icon in champagne metal and its body open."
      note="Shown in part: StickySteps pins these for four screens of scroll. Here the steps are buttons."
      code={`<StepCard step={2} holder="Nora Lindqvist" last4="4821" />
<StepItem index={2} active title="Limit" body="…" />`}
    >
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <ol>
            {STEPS.items.map((item, i) => (
              <StepItem key={item.title} index={i} active={i === step} title={item.title} body={item.body} />
            ))}
          </ol>
          <div className="mt-6 flex flex-wrap gap-2">
            {STEPS.items.map((item, i) => (
              <button
                key={item.title}
                type="button"
                aria-pressed={i === step}
                onClick={() => setStep(i)}
                className={cn(
                  "h-11 rounded-chip px-4 text-[0.8125rem] font-medium transition-[background-color,color,transform] duration-(--duration-hover) ease-out active:scale-[0.97] sm:h-9",
                  i === step ? "bg-button text-button-ink shadow-button" : "bg-surface-raised text-ink-soft shadow-item hover:text-ink",
                )}
              >
                {i + 1}. {item.title}
              </button>
            ))}
          </div>
        </div>
        <div className="px-4 py-6 sm:px-10">
          <StepCard step={step} />
        </div>
      </div>
    </ComponentSpecimen>
  )
}

/* ─── The sections ────────────────────────────────────────────────────── */

const SECTIONS: { id: string; name: string; body: string; parts: string; partial?: boolean }[] = [
  { id: "top", name: "Hero", body: "The eyebrow, the display headline, one button, and two live 3D phones standing in a chrome glow.", parts: "SectionHeading, ButtonLink, Reveal, PhotoGlow, HeroPhones", partial: true },
  { id: "cards", name: "Perks", body: "Three promises straight under the phones.", parts: "Perk, Reveal" },
  { id: "why", name: "Manifesto", body: "Why Ember exists, lighting up word by word.", parts: "Eyebrow, ScrollText" },
  { id: "security", name: "Highlights", body: "Free, instant, private — three panels holding a widget each.", parts: "SectionHeading, HighlightCard, FeeWidget, NumberWidget, PrivacyWidget" },
  { id: "how", name: "StickySteps", body: "Four screens of scroll pinned: the list lights up and the card changes state.", parts: "StepItem, StepCard, SplitText", partial: true },
  { id: "uses", name: "UseCases", body: "A row that moves sideways while the page scrolls down; a swipeable row on phones.", parts: "UseCaseCard, MetalCard (sm), SplitText", partial: true },
  { id: "coverage", name: "Coverage", body: "The dotted world behind the headline, and the flags dropped on it.", parts: "DottedMap, FlagCloud, FlagChip" },
  { id: "story", name: "VideoStory", body: "A customer’s video opens from a small window to the full screen; the quote arrives when it is open.", parts: "Eyebrow, video, play/pause button", partial: true },
  { id: "reviews", name: "Testimonials", body: "A panel that rounds up out of the page with three short quotes.", parts: "SectionHeading, Testimonial" },
  { id: "pricing", name: "Faq", body: "Six questions, one open at a time.", parts: "SectionHeading, Accordion" },
  { id: "get-started", name: "CallToAction", body: "Steps on steel, the price on champagne metal, a 3D phone leaning across both.", parts: "StepsCard, Step, PriceCard, CtaPhone" },
]

function SectionIndex() {
  const home = import.meta.env.BASE_URL
  return (
    <ComponentSpecimen
      name="Sections"
      source="components/sections/*.tsx"
      description="The home page is these sections in this order, between SiteHeader and SiteFooter. Every part they are built from is live on this page."
      note="Shown in part: Hero, StickySteps, UseCases and VideoStory pin to the window’s scroll or carry full-screen 3D and video, so they appear here through their parts, with a link to each in place."
      code={`<main data-canvas-ignore>
  <Hero /> <Perks /> <Manifesto /> <Highlights /> <StickySteps /> <UseCases />
  <Coverage /> <VideoStory /> <Testimonials /> <Faq /> <CallToAction />
</main>`}
    >
      <ol className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {SECTIONS.map((section, i) => (
          <li key={section.id} className="flex flex-col rounded-item bg-surface p-5 shadow-item">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</span>
              {section.partial ? <TickTag label="Shown in part" /> : null}
            </div>
            <p className="mt-3 font-serif text-[1.5rem] leading-tight text-ink">{section.name}</p>
            <p className="mt-1 text-[0.875rem] leading-relaxed text-muted">{section.body}</p>
            <p className="mt-3 font-mono text-[11px] text-subtle">{section.parts}</p>
            <a
              href={`${home}#${section.id}`}
              className="mt-auto inline-flex min-h-11 items-end pt-4 text-[0.8125rem] font-medium text-ink-soft transition-colors duration-(--duration-hover) ease-out hover:text-ink"
            >
              See it in place →
            </a>
          </li>
        ))}
      </ol>
    </ComponentSpecimen>
  )
}

/* ─── Library ─────────────────────────────────────────────────────────── */

export function ComponentLibrary() {
  const [faqOpen, setFaqOpen] = useState("q0")
  const [flags, setFlags] = useState(0)
  return (
    <div className="space-y-6">
      <ButtonSpecimen />

      <Split>
        <ComponentSpecimen
          name="Eyebrow"
          source="components/ui/eyebrow.tsx"
          description="The small label over a heading: a graphite chip with a faint champagne glow behind it."
          code={`<Eyebrow label="How it works" className="mb-5" />`}
        >
          <div className="flex flex-wrap gap-4">
            <Eyebrow label={HERO.eyebrow} />
            <Eyebrow label={STEPS.eyebrow} />
            <StateLabel label="over video">
              <span className="block rounded-item bg-[#3a3b3f] p-3">
                <Eyebrow label={STORY.eyebrow} className="bg-white/10 text-white" />
              </span>
            </StateLabel>
          </div>
        </ComponentSpecimen>

        <ComponentSpecimen
          name="Logo and LogoMark"
          source="components/ui/logo.tsx"
          description="Two virtual cards, one stacked behind the other, and the name in Inter medium. Logo is a link home; LogoMark is the mark alone, sized with a size-* class."
          code={`<Logo name="Ember" href="#top" />
<LogoMark className="size-9" />`}
        >
          <div className="flex flex-wrap items-end gap-8">
            <StateLabel label="Logo">
              <Logo name={BRAND} href="#components" />
            </StateLabel>
            {["size-4", "size-7", "size-9"].map((size) => (
              <StateLabel key={size} label={`LogoMark ${size}`}>
                <LogoMark className={cn(size, "text-ink")} />
              </StateLabel>
            ))}
          </div>
        </ComponentSpecimen>
      </Split>

      <MetalCardSpecimen />

      <ComponentSpecimen
        name="SectionHeading"
        source="components/ui/section-heading.tsx"
        description="The centred eyebrow, serif headline (display as h1, headline as h2) and muted blurb most sections open with, each part revealed in turn."
        code={`<SectionHeading as="h1" eyebrow="Now issuing in 40+ countries" title={"One card per purchase.\\nZero exposure."} blurb="…" />
<SectionHeading title="People switched. They stayed." />`}
      >
        <div className="space-y-14">
          <SectionHeading as="h1" eyebrow={HERO.eyebrow} title={HERO.title} blurb={HERO.blurb} />
          <SectionHeading eyebrow={COVERAGE.eyebrow} title={COVERAGE.title} blurb={COVERAGE.blurb} />
        </div>
      </ComponentSpecimen>

      <MotionSpecimens />

      <Split>
        <ComponentSpecimen
          name="Accordion"
          source="components/ui/accordion.tsx · sections/faq.tsx"
          description="shadcn’s accordion on Radix, dressed as graphite question cards: a serif question and a + that turns 45° into a bone disc. Opens in 240ms, one at a time."
          code={`<Accordion type="single" collapsible className="flex flex-col gap-2.5">
  <AccordionItem value="q0">
    <AccordionTrigger>What is Ember?</AccordionTrigger>
    <AccordionContent>…</AccordionContent>
  </AccordionItem>
</Accordion>`}
        >
          <Accordion type="single" collapsible value={faqOpen} onValueChange={setFaqOpen} className="flex flex-col gap-2.5">
            {FAQ.items.slice(0, 3).map((item, i) => (
              <AccordionItem key={item.q} value={`q${i}`}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
            <AccordionItem value="disabled" disabled className="opacity-50">
              <AccordionTrigger>Disabled question</AccordionTrigger>
              <AccordionContent>—</AccordionContent>
            </AccordionItem>
          </Accordion>
        </ComponentSpecimen>

        <MenuSheetSpecimen />
      </Split>

      <ComponentSpecimen
        name="SiteHeader and NavLink"
        source="components/layout/site-header.tsx"
        description="The logo and links on the left, the button on the right; below md the links fold into the sheet above. NavLink is muted, ink on hover, and the current page carries a short underline."
        code={`<SiteHeader />
<NavLink href="#how" label="How it works" active />`}
        previewClassName="p-0 sm:p-0"
      >
        <SiteHeader />
        <div className="flex flex-wrap items-end gap-8 border-t border-hairline p-5 sm:p-8">
          <StateLabel label="active">
            <NavLink href="#components" label="Home" active />
          </StateLabel>
          <StateLabel label="default">
            <NavLink href="#components" label="How it works" />
          </StateLabel>
          <StateLabel label="hover">
            <span className="[&>a]:text-ink">
              <NavLink href="#components" label="Security" />
            </span>
          </StateLabel>
        </div>
      </ComponentSpecimen>

      <div className="space-y-6">
        <ComponentSpecimen
          name="Perk"
          source="components/sections/perks.tsx"
          description="A small icon in a surface well on a champagne glow, over a two-line serif promise."
          code={`<Perk icon="flame" title={"Freeze or burn\\nanytime"} />`}
        >
          <div className="grid gap-8 sm:grid-cols-3">
            {PERKS.map((perk) => (
              <Perk key={perk.title} icon={perk.icon} title={perk.title} />
            ))}
          </div>
        </ComponentSpecimen>

        <ComponentSpecimen
          name="TickTag"
          source="components/sections/highlight-widgets.tsx"
          description="A small tag with a tick — champagne for “included”, sage for “safe”."
          code={`<TickTag label="Unlimited cards" />
<TickTag label="Never shared" tone="positive" />`}
        >
          <div className="flex flex-wrap gap-6">
            <StateLabel label='tone="accent"'>
              <TickTag label="Unlimited cards" />
            </StateLabel>
            <StateLabel label='tone="positive"'>
              <TickTag label="Never shared" tone="positive" />
            </StateLabel>
          </div>
        </ComponentSpecimen>
      </div>

      <ComponentSpecimen
        name="HighlightCard and its widgets"
        source="components/sections/highlights.tsx · highlight-widgets.tsx"
        description="A graphite panel with the faintest cast of a metal, holding up a widget: the fee, a card number that re-rolls digit by digit (press “New number”), and the real card hidden behind stand-ins."
        code={`<HighlightCard tone="sky" title="Instant" body="…">
  <NumberWidget initial="7302" button="New number" />
</HighlightCard>`}
        previewClassName="p-3 sm:p-5"
      >
        <div className="grid gap-5 lg:grid-cols-3">
          <HighlightCard tone={HIGHLIGHTS.items[0].tone} title={HIGHLIGHTS.items[0].title} body={HIGHLIGHTS.items[0].body}>
            <FeeWidget />
          </HighlightCard>
          <HighlightCard tone={HIGHLIGHTS.items[1].tone} title={HIGHLIGHTS.items[1].title} body={HIGHLIGHTS.items[1].body}>
            <NumberWidget />
          </HighlightCard>
          <HighlightCard tone={HIGHLIGHTS.items[2].tone} title={HIGHLIGHTS.items[2].title} body={HIGHLIGHTS.items[2].body}>
            <PrivacyWidget />
          </HighlightCard>
        </div>
      </ComponentSpecimen>

      <StepsSpecimen />

      <ComponentSpecimen
        name="UseCaseCard"
        source="components/sections/use-cases.tsx"
        description="A tall photo card, darkened at the foot, with the Ember card that lives there pinned in a frosted row. The photo eases up 4% on hover."
        note="Shown in part: UseCases pins this row and drives it sideways with the page’s scroll. Here it simply swipes."
        code={`<UseCaseCard image={src} title="Travel" body="A card per trip, in the local currency." last4="6630" rule="EUR · 14 days" finish="champagne" />`}
        previewClassName="px-0 sm:px-0"
      >
        <div data-lenis-prevent className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 [scrollbar-width:none] sm:scroll-px-8 sm:px-8">
          {USES.items.map((item, i) => (
            <UseCaseCard
              key={item.key}
              image={usePhoto(item.key)}
              title={item.title}
              body={item.body}
              last4={item.last4}
              rule={item.rule}
              finish={FINISHES[i % FINISHES.length]}
              className="w-[min(70vw,300px)]"
            />
          ))}
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="DottedMap, FlagCloud and FlagChip"
        source="components/sections/coverage.tsx"
        description="The world in dots, faded at its edges, and the countries dropped in one after another on a soft spring, each resting at its own angle. A chip lifts under a mouse."
        code={`<DottedMap dot={0.3} className="absolute …" />
<FlagCloud stagger={0.04} drop={28} />
<FlagChip code="jp" name="Japan" rotate={-4} />`}
        previewClassName="relative overflow-hidden"
      >
        <DottedMap className="absolute top-0 left-1/2 w-[max(700px,110%)] -translate-x-1/2" />
        <div className="relative space-y-6">
          <FlagCloud key={flags} />
          <div className="flex flex-wrap items-center justify-center gap-4">
            <StateLabel label="FlagChip">
              <FlagChip code="jp" name="Japan" />
            </StateLabel>
            <StateLabel label="no flag">
              <FlagChip code={null} name="150+ More" />
            </StateLabel>
            <Replay onClick={() => setFlags((n) => n + 1)} label="Drop again" />
          </div>
        </div>
      </ComponentSpecimen>

      <Split>
        <ComponentSpecimen
          name="Testimonial"
          source="components/sections/testimonials.tsx"
          description="Champagne stars, a serif quote and the handle it came from."
          code={`<Testimonial quote="“I burn a card after every single online order”" author="devonk_" stars={5} />`}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {TESTIMONIALS.items.slice(0, 2).map((item) => (
              <Testimonial key={item.author} quote={item.quote} author={item.author} />
            ))}
          </div>
        </ComponentSpecimen>

        <ComponentSpecimen
          name="PhotoGlow"
          source="components/sections/hero.tsx"
          description="A liquid-chrome photograph blurred, desaturated and faded at its edges: the light the hero’s phones stand in."
          code={`<PhotoGlow blur={34} opacity={0.55} className="top-[4%] left-1/2 h-[94%] w-[min(96vw,600px)] -translate-x-1/2" />`}
          previewClassName="relative h-64 overflow-hidden p-0 sm:p-0"
        >
          <PhotoGlow className="inset-0 size-full" />
          <span className="absolute bottom-3 left-4 font-mono text-[11px] text-subtle">blur 34 · opacity 0.55</span>
        </ComponentSpecimen>
      </Split>

      <ComponentSpecimen
        name="StepsCard, Step and PriceCard"
        source="components/sections/call-to-action.tsx"
        description="The closing offer: numbered frosted steps on steel with a tilted “timed it” chip, and the price engraved in champagne metal with the inverse button."
        code={`<StepsCard title={"Get your first card\\nin 60 seconds"} timed="Timed it: 58s" />
<PriceCard price="$0" button="Get a card" />
<ol><Step index={1} label="Download the app" /></ol>`}
      >
        <div className="grid gap-5 md:grid-cols-2">
          <StepsCard />
          <PriceCard />
        </div>
        <ol className="mt-6 flex max-w-[272px] flex-col gap-2">
          <Step index={1} label={CTA.steps[0]} />
        </ol>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="CtaPhone and HeroPhones"
        source="components/phone/*.tsx"
        description="The Ember app on a live 3D phone (React Three Fiber): the screen is drawn in Canvas 2D, so holder, last four digits and spend are props. It turns as the page scrolls and leans towards the pointer. HeroPhones is the same model twice, with spread and float."
        note="HeroPhones is shown on the home page only; the single phone below is the same PhoneModel and PhoneRig."
        code={`<CtaPhone holder="Nora Lindqvist" last4="4821" spent="$1,284" finish="titanium" tilt={-14} />
<HeroPhones finish="graphite" spread={0.54} float />`}
        previewClassName="relative p-0 sm:p-0"
      >
        <PhotoGlow className="top-0 left-1/2 h-full w-[min(90%,480px)] -translate-x-1/2" opacity={0.4} />
        <Suspense fallback={<div className="h-[420px]" />}>
          <CtaPhone className="h-[420px] w-full" tilt={-8} />
        </Suspense>
      </ComponentSpecimen>

      <Split>
        <ComponentSpecimen
          name="FooterColumn"
          source="components/layout/site-footer.tsx"
          description="A small ink heading and its footer-muted links, ink on hover. SiteFooter — live at the bottom of this page — sets three of them beside the mark and ends in the name set huge."
          code={`<FooterColumn title="Product" links={["Home", "Cards", "Security", "Pricing"]} />`}
          previewClassName="bg-footer"
        >
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {FOOTER.columns.map((column) => (
              <FooterColumn key={column.title} title={column.title} links={column.links} />
            ))}
          </div>
        </ComponentSpecimen>

        <ComponentSpecimen
          name="Container"
          source="components/ui/container.tsx"
          description="Centres every section at 1176px with 16px gutters (24px from sm). Marked data-canvas-ignore, so the editor clicks through it."
          code={`<Container className="grid gap-10">…</Container>`}
          previewClassName="px-0 sm:px-0"
        >
          <Container className="border-x border-dashed border-ink/20 py-4">
            <div className="rounded-item bg-surface p-4 text-center font-mono text-xs text-muted shadow-item">max-w-[1176px] · px-4 / sm:px-6</div>
          </Container>
        </ComponentSpecimen>
      </Split>

      <SectionIndex />

      <p className="rounded-card p-5 text-[0.875rem] leading-relaxed text-muted shadow-item">
        <span className="font-medium text-ink">SmoothScroll</span> draws nothing: it is the Lenis instance carrying
        this page’s scroll, held in a ref. <span className="font-medium text-ink">VideoStory</span>’s footage is{" "}
        <code className="font-mono text-xs">{STORY.video}</code>, opened from a {`30%`} inset window; its states are
        “Play video” and “Quote shown” in the editor’s Actions row.
      </p>
    </div>
  )
}
