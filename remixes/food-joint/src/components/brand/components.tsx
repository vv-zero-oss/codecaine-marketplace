import { useCanvasAction } from "@canvas/react"
import { ArrowRight, Menu as MenuIcon, Plus } from "lucide-react"
import { motion } from "motion/react"
import { Fragment, useState, type ReactNode } from "react"

import { ComponentSpecimen, CopyButton, GroupLabel, SectionFrame, StateLabel } from "@/components/brand/specimen"
import { ClipShape } from "@/components/blocks/clip-shape"
import { CtaEllipse } from "@/components/blocks/cta-ellipse"
import { Eyebrow } from "@/components/blocks/eyebrow"
import { Film } from "@/components/blocks/film"
import { Marquee } from "@/components/blocks/marquee"
import { Photo } from "@/components/blocks/photo"
import { RiseText } from "@/components/blocks/rise-text"
import { SpinBadge } from "@/components/blocks/spin-badge"
import { Wordmark } from "@/components/blocks/wordmark"
import { Booking, Chip, PartySize } from "@/components/sections/booking"
import { Hero } from "@/components/sections/hero"
import { Heat, MenuSection } from "@/components/sections/menu"
import { StillCutout } from "@/components/sections/oak"
import { Preloader } from "@/components/sections/preloader"
import { StepCard } from "@/components/sections/process"
import { Reviews } from "@/components/sections/reviews"
import { Room } from "@/components/sections/room"
import { SiteHeader } from "@/components/sections/site-header"
import { Statement } from "@/components/sections/statement"
import { Star, Ticker } from "@/components/sections/ticker"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { booking, brand, cta, films, menu, nav, process, ticker } from "@/content"
import { EASE_OUT } from "@/lib/motion"
import { homeHref } from "@/lib/router"
import { BLOBS } from "@/lib/shapes"

/* ─── Primitives: components/ui ───────────────────────────────────────── */

const VARIANTS = ["default", "orange", "outline", "ghost", "link"] as const
const SIZES = ["default", "sm", "icon", "icon-sm", "icon-lg"] as const

/** Hover and focus drawn on, so both can be seen without a pointer. Variants
 *  with no hover of their own say so. */
const HOVER: Record<(typeof VARIANTS)[number], string | null> = {
  default: null,
  orange: null,
  outline: "bg-forest text-lime",
  ghost: null,
  link: "underline",
}
const FOCUS = "ring-2 ring-ring ring-offset-2 ring-offset-lime"

export function ButtonSpecimen() {
  return (
    <ComponentSpecimen
      name="Button"
      source="components/ui/button.tsx"
      description="shadcn's Button on a cva recipe: the forest pill, the orange one, an outlined chip for choices, a bare icon button and a text link. Condensed uppercase labels; the press scales to 0.96 over the press duration."
      code={`import { Button } from "@/components/ui/button"

<Button>Book another</Button>
<Button variant="orange">Book another</Button>
<Button variant="outline" size="sm">Tonight</Button>
<Button size="icon" aria-label="One more"><Plus /></Button>`}
    >
      <div className="space-y-8">
        {VARIANTS.map((variant) => (
          <div key={variant} className="flex flex-wrap items-end gap-x-6 gap-y-4">
            <span className="w-full font-mono text-[11px] text-ink-soft sm:w-16">{variant}</span>
            <StateLabel label="default">
              <Button variant={variant}>Book it</Button>
            </StateLabel>
            <StateLabel label={HOVER[variant] ? "hover" : "hover — none"}>
              <Button variant={variant} className={HOVER[variant] ?? undefined}>
                Book it
              </Button>
            </StateLabel>
            <StateLabel label="pressed">
              <Button variant={variant} className="scale-[0.96]">
                Book it
              </Button>
            </StateLabel>
            <StateLabel label="focus">
              <Button variant={variant} className={FOCUS}>
                Book it
              </Button>
            </StateLabel>
            <StateLabel label="disabled">
              <Button variant={variant} disabled>
                Book it
              </Button>
            </StateLabel>
            <StateLabel label="with icon">
              <Button variant={variant}>
                Book it <ArrowRight className="size-4" />
              </Button>
            </StateLabel>
          </div>
        ))}
        <div className="flex flex-wrap items-end gap-6">
          <span className="w-full font-mono text-[11px] text-ink-soft sm:w-16">sizes</span>
          {SIZES.map((size) => (
            <StateLabel key={size} label={size}>
              <Button size={size} aria-label={size.startsWith("icon") ? "One more" : undefined}>
                {size.startsWith("icon") ? <Plus className="size-5" /> : "Book it"}
              </Button>
            </StateLabel>
          ))}
          <StateLabel label="none (sized by caller)">
            <Button size="none" variant="link">
              Back to top
            </Button>
          </StateLabel>
        </div>
      </div>
    </ComponentSpecimen>
  )
}

export function FieldSpecimen() {
  const field = "h-14 rounded-field border-2 border-forest bg-lime/40 px-4 text-body focus-visible:bg-lime/70"
  return (
    <ComponentSpecimen
      name="Input + Label"
      source="components/ui/input.tsx · label.tsx"
      description="shadcn's Input, bare by default and dressed by the booking form: a forest rule, a field radius and a lime wash that deepens on focus. Label is the condensed uppercase face."
      note="The booking form has no error state — every field has a default and nothing can be sent wrong — so none is drawn here."
      code={`<Label htmlFor="book-name">Name on the table</Label>
<Input
  id="book-name"
  placeholder="Your name"
  className="h-14 rounded-field border-2 border-forest bg-lime/40 px-4 text-body focus-visible:bg-lime/70"
/>`}
      previewClassName="bg-cream"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <StateLabel label="placeholder" className="items-stretch">
          <Label htmlFor="guide-name">Name on the table</Label>
          <Input id="guide-name" placeholder="Your name" className={field} />
        </StateLabel>
        <StateLabel label="filled" className="items-stretch">
          <Label htmlFor="guide-name-2">Name on the table</Label>
          <Input id="guide-name-2" defaultValue="Priya" className={field} />
        </StateLabel>
        <StateLabel label="focus" className="items-stretch">
          <Label htmlFor="guide-name-3">Name on the table</Label>
          <Input id="guide-name-3" defaultValue="Priya" className={`${field} bg-lime/70 ring-2 ring-ring ring-offset-2 ring-offset-cream`} />
        </StateLabel>
        <StateLabel label="disabled" className="items-stretch">
          <Label htmlFor="guide-name-4">Name on the table</Label>
          <Input id="guide-name-4" placeholder="Your name" disabled className={field} />
        </StateLabel>
        <StateLabel label="bare Input" className="items-stretch">
          <Input placeholder="Unstyled, as shadcn ships it here" />
        </StateLabel>
      </div>
    </ComponentSpecimen>
  )
}

export function TabsSpecimen() {
  const [tab, setTab] = useState(menu.tabs[0].id)
  return (
    <ComponentSpecimen
      name="Tabs"
      source="components/ui/tabs.tsx"
      description="shadcn's Tabs as chunky condensed labels, faded until active. The orange underline is drawn by the caller with a shared layoutId, so it slides from tab to tab."
      code={`<Tabs value={tab} onValueChange={setTab}>
  <TabsList aria-label="Menu sections">
    <TabsTrigger value="birds">
      Birds
      {tab === "birds" && <motion.span layoutId="underline" className="absolute inset-x-0 bottom-0 h-1 rounded-pill bg-orange" />}
    </TabsTrigger>
  </TabsList>
  <TabsContent value="birds">…</TabsContent>
</Tabs>`}
    >
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList aria-label="Menu sections, sample">
          {menu.tabs.map((t) => (
            <TabsTrigger key={t.id} value={t.id}>
              {t.label}
              {tab === t.id && (
                <motion.span
                  layoutId="guide-tabs-underline"
                  className="absolute inset-x-0 bottom-0 h-1 rounded-pill bg-orange"
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                />
              )}
            </TabsTrigger>
          ))}
        </TabsList>
        {menu.tabs.map((t) => (
          <TabsContent key={t.id} value={t.id}>
            <p className="text-body text-ink-soft">
              {t.items.length} dishes · {t.items.map((item) => item.name).join(", ")}
            </p>
          </TabsContent>
        ))}
      </Tabs>
      <div className="mt-6 flex flex-wrap gap-6">
        <StateLabel label="inactive">
          <span className="font-condensed text-tab text-forest/45 uppercase">Sides</span>
        </StateLabel>
        <StateLabel label="hover / active">
          <span className="font-condensed text-tab text-forest uppercase">Sides</span>
        </StateLabel>
        <StateLabel label="focus">
          <span className="font-condensed text-tab text-forest uppercase ring-2 ring-forest ring-offset-2 ring-offset-lime">Sides</span>
        </StateLabel>
      </div>
    </ComponentSpecimen>
  )
}

export function SheetSpecimen() {
  const [open, setOpen] = useState(false)
  useCanvasAction("Sheet open", (next) => setOpen(next ?? !open), { on: open, group: "Brand guidelines" })
  return (
    <ComponentSpecimen
      name="Sheet"
      source="components/ui/sheet.tsx"
      description="shadcn's Sheet on Radix Dialog: the phone menu. It slides in on the drawer curve (320ms) and leaves faster than it came (220ms); reduced motion keeps only the fade."
      code={`<Sheet>
  <SheetTrigger asChild>
    <Button variant="ghost" size="icon" aria-label="Open menu"><Menu /></Button>
  </SheetTrigger>
  <SheetContent side="right" className="bg-lime pt-16">
    <SheetHeader><SheetTitle>Oakbird</SheetTitle></SheetHeader>
    …
  </SheetContent>
</Sheet>`}
    >
      <Sheet open={open} onOpenChange={setOpen}>
        <div className="flex flex-wrap items-center gap-4">
          <SheetTrigger asChild>
            <Button variant="outline">
              <MenuIcon className="size-5" /> Open the phone menu
            </Button>
          </SheetTrigger>
          <span className="text-ui text-ink-soft">Also a switch in the editor's Actions row.</span>
        </div>
        <SheetContent side="right" className="bg-lime pt-16">
          <SheetHeader className="px-6">
            <SheetTitle className="font-heavy text-[22px] leading-none">{brand.name}</SheetTitle>
          </SheetHeader>
          <nav aria-label="Mobile, sample" className="flex flex-col px-6">
            {[...nav, { label: "Reservations", href: cta.href }].map((item) => (
              <SheetClose asChild key={item.label}>
                <a href={homeHref(item.href, "/brand")} className="flex min-h-16 items-center border-b border-hairline font-heavy text-[40px] leading-none">
                  {item.label}
                </a>
              </SheetClose>
            ))}
          </nav>
          <p className="mt-auto px-6 pb-8 font-condensed text-label uppercase">
            {brand.address.join(", ")} · {brand.phone}
          </p>
        </SheetContent>
      </Sheet>
    </ComponentSpecimen>
  )
}

/* ─── Blocks ──────────────────────────────────────────────────────────── */

export function CtaSpecimen() {
  const tilt = "-rotate-3 scale-[1.04]"
  return (
    <ComponentSpecimen
      name="CtaEllipse"
      source="components/blocks/cta-ellipse.tsx"
      description="The call to action: a stamp more than a button. Orange or forest, a link with href or a button without. It tips and swells on hover, the underline pulls back, and it presses in."
      code={`<CtaEllipse href="#book">Book a table</CtaEllipse>
<CtaEllipse type="submit" tone="forest">Book it</CtaEllipse>`}
    >
      <div className="flex flex-wrap items-end gap-8">
        {(["orange", "forest"] as const).map((tone) => (
          <Fragment key={tone}>
            <StateLabel label={`${tone} · default`}>
              <CtaEllipse tone={tone} className="text-[28px] leading-none">
                Book it
              </CtaEllipse>
            </StateLabel>
            <StateLabel label={`${tone} · hover`}>
              <CtaEllipse tone={tone} className={`text-[28px] leading-none ${tilt}`}>
                Book it
              </CtaEllipse>
            </StateLabel>
            <StateLabel label={`${tone} · focus`}>
              <CtaEllipse tone={tone} className="text-[28px] leading-none ring-2 ring-forest ring-offset-4 ring-offset-lime">
                Book it
              </CtaEllipse>
            </StateLabel>
          </Fragment>
        ))}
        <StateLabel label="as a link">
          <CtaEllipse href="#components" className="text-[28px] leading-none">
            {cta.label}
          </CtaEllipse>
        </StateLabel>
      </div>
    </ComponentSpecimen>
  )
}

export function ClipShapeSpecimen() {
  const [blob, setBlob] = useState(0)
  return (
    <ComponentSpecimen
      name="ClipShape + Photo"
      source="components/blocks/clip-shape.tsx · photo.tsx"
      description="Clips whatever it holds to one of the page's shapes. Photo fills its box with a Pexels picture at the width asked of the CDN. Pass a changing d and the path is tweened — press the button to re-form the blob."
      code={`<ClipShape shape="arch" className="aspect-[3/4] w-56">
  <Photo photo={booking.photo} width={500} className="absolute inset-0" />
</ClipShape>
<ClipShape shape="blob" d={BLOBS[i]} className="size-64 bg-orange">…</ClipShape>`}
    >
      <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <div className="grid grid-cols-3 gap-4">
          <StateLabel label="arch" className="items-stretch">
            <ClipShape shape="arch" className="aspect-[3/4]">
              <Photo photo={booking.photo} width={400} className="absolute inset-0" />
            </ClipShape>
          </StateLabel>
          <StateLabel label="scallop" className="items-stretch">
            <ClipShape shape="scallop" className="aspect-square">
              <Photo photo={menu.tabs[2].items[0].photo} width={400} className="absolute inset-0" />
            </ClipShape>
          </StateLabel>
          <StateLabel label="ticket" className="items-stretch">
            <ClipShape shape="ticket" className="aspect-[3/4] bg-forest" />
          </StateLabel>
        </div>
        <div className="flex flex-col items-start gap-3">
          <ClipShape shape="blob" d={BLOBS[blob]} className="size-44 bg-orange">
            <Photo photo={menu.tabs[1].items[0].photo} width={400} className="absolute inset-0" imgClassName="scale-125" />
          </ClipShape>
          <Button variant="outline" size="sm" onClick={() => setBlob((b) => (b + 1) % BLOBS.length)}>
            Re-form blob ({blob + 1}/{BLOBS.length})
          </Button>
        </div>
      </div>
    </ComponentSpecimen>
  )
}

export function FilmSpecimen() {
  return (
    <ComponentSpecimen
      name="Film"
      source="components/blocks/film.tsx"
      description="A short, silent Pexels loop filling its box. Loads near the window, plays only while in view, and stays on its poster frame under reduced motion."
      code={`<ClipShape shape="pill" className="aspect-[2/1] w-full">
  <Film film={films.embers} />
</ClipShape>`}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <StateLabel label="in a pill" className="items-stretch">
          <ClipShape shape="pill" className="aspect-[2/1] w-full bg-forest-deep">
            <Film film={films.embers} />
          </ClipShape>
        </StateLabel>
        <StateLabel label="in a blob" className="items-stretch">
          <ClipShape shape="blob" className="mx-auto aspect-square w-40 bg-forest-deep">
            <Film film={films.fryer} />
          </ClipShape>
        </StateLabel>
      </div>
    </ComponentSpecimen>
  )
}

export function RiseTextSpecimen() {
  const [run, setRun] = useState(0)
  return (
    <ComponentSpecimen
      name="RiseText"
      source="components/blocks/rise-text.tsx"
      description="Display words rising letter by letter out of a masked line, the first time they are seen (or when play flips true). Screen readers get the word once."
      code={`<h2 className="font-heavy text-title">
  <RiseText text="Book a" />
  <br />
  <RiseText text="table" delay={0.1} />
</h2>`}
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h4 key={run} className="font-heavy text-[clamp(48px,7vw,104px)] leading-[0.86]">
          <RiseText text="Pick a" />
          <br />
          <RiseText text="pile" delay={0.1} />
        </h4>
        <Button variant="outline" size="sm" onClick={() => setRun((r) => r + 1)}>
          Replay
        </Button>
      </div>
    </ComponentSpecimen>
  )
}

export function MarqueeSpecimen() {
  return (
    <ComponentSpecimen
      name="Marquee"
      source="components/blocks/marquee.tsx"
      description="A band that runs sideways for ever, pushed by the scroll: scroll faster and it hurries, scroll up and it turns round. Stands still under reduced motion. speed in px/s, direction 1 or -1."
      code={`<Marquee speed={60} className="-rotate-2 bg-orange py-3">
  {words.map((word) => <span key={word}>{word}</span>)}
</Marquee>`}
      previewClassName="px-0 sm:px-0 overflow-hidden"
    >
      <div className="space-y-4">
        <Marquee speed={60} className="bg-orange py-3">
          {ticker.words.map((word) => (
            <Fragment key={word}>
              <span className="px-5 font-heavy text-[36px] leading-none">{word}</span>
              <Star className="size-6 text-forest" />
            </Fragment>
          ))}
        </Marquee>
        <Marquee speed={30} direction={-1} className="bg-forest py-3 text-lime">
          {ticker.words.map((word) => (
            <span key={word} className="px-4 font-condensed text-[24px] leading-none uppercase">
              {word}
            </span>
          ))}
        </Marquee>
      </div>
    </ComponentSpecimen>
  )
}

/* ─── Section parts ───────────────────────────────────────────────────── */

export function PreloaderSpecimen() {
  const [curtain, setCurtain] = useState(false)
  useCanvasAction("Preloader", (next) => setCurtain(next ?? !curtain), { on: curtain, group: "Brand guidelines" })
  return (
    <ComponentSpecimen
      name="Preloader"
      source="components/sections/preloader.tsx"
      description="The curtain the home page opens behind: a scalloped plate flicking through the menu and a count to 100. It waits on the fonts and the hero photograph (1.8–5s), then lifts as a clip-path wipe."
      code={`{curtain && <Preloader onLift={() => setLoaded(true)} onDone={() => setCurtain(false)} />}`}
      previewClassName="bg-forest"
    >
      <div className="flex flex-wrap items-center gap-4 text-cream">
        <Button variant="orange" onClick={() => setCurtain(true)} disabled={curtain}>
          Play the preloader
        </Button>
        <span className="text-ui text-on-forest-muted">It covers the whole window, as it does on arrival.</span>
      </div>
      {curtain && <Preloader onLift={() => {}} onDone={() => setCurtain(false)} />}
    </ComponentSpecimen>
  )
}

export function SmallPartsSpecimens() {
  const [day, setDay] = useState("tonight")
  const [size, setSize] = useState(2)
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <ComponentSpecimen
        name="Wordmark"
        source="components/blocks/wordmark.tsx"
        description="The name in the heavy face with a flame-coloured dot. A link to the top; it takes its colour from its parent."
        code={`<Wordmark />
<Wordmark className="text-[40px]" />`}
      >
        <div className="flex flex-wrap items-center gap-8">
          <StateLabel label="default">
            <Wordmark />
          </StateLabel>
          <StateLabel label="large">
            <Wordmark className="text-[40px]" />
          </StateLabel>
          <div className="rounded-field bg-forest px-4 text-cream">
            <Wordmark />
          </div>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Eyebrow"
        source="components/blocks/eyebrow.tsx"
        description="The condensed label above every section title, with its orange dot — forest on the orange board."
        code={`<Eyebrow>The menu</Eyebrow>
<Eyebrow className="[&>span]:bg-forest">Word of mouth</Eyebrow>`}
      >
        <div className="flex flex-wrap gap-8">
          <Eyebrow>The menu</Eyebrow>
          <div className="rounded-field bg-orange px-4 py-2">
            <Eyebrow className="[&>span]:bg-forest">Word of mouth</Eyebrow>
          </div>
          <div className="rounded-field bg-forest px-4 py-2">
            <Eyebrow className="text-lime">The difference</Eyebrow>
          </div>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="SpinBadge"
        source="components/blocks/spin-badge.tsx"
        description="A lavender sticker with words round the edge and an orange star. It turns with the scroll, not on its own."
        code={`<SpinBadge className="absolute -top-3 right-[4%]" show={loaded} />`}
      >
        <div className="flex justify-center">
          <SpinBadge />
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Heat"
        source="components/sections/menu.tsx"
        description="0–3 filled flames beside a dish. Nothing at 0, and a label that says the number."
        code={`<Heat level={2} />`}
      >
        <div className="flex flex-wrap items-end gap-8">
          {[0, 1, 2, 3].map((level) => (
            <StateLabel key={level} label={`level ${level}${level === 0 ? " — renders nothing" : ""}`}>
              <span className="flex h-6 items-center">
                <Heat level={level} />
              </span>
            </StateLabel>
          ))}
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Chip"
        source="components/sections/booking.tsx"
        description="A booking choice: an outlined pill (Button outline, sm) that fills forest when picked."
        code={`<Chip active={day === d.value} onClick={() => setDay(d.value)}>Tonight</Chip>`}
      >
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {["tonight", "tomorrow", "fri 3"].map((d) => (
              <Chip key={d} active={day === d} onClick={() => setDay(d)}>
                {d}
              </Chip>
            ))}
          </div>
          <div className="flex flex-wrap items-end gap-4">
            <StateLabel label="idle">
              <Chip active={false}>18:00</Chip>
            </StateLabel>
            <StateLabel label="hover">
              <span className="[&>button]:bg-forest [&>button]:text-lime">
                <Chip active={false}>18:00</Chip>
              </span>
            </StateLabel>
            <StateLabel label="active">
              <Chip active>18:00</Chip>
            </StateLabel>
            <StateLabel label="focus">
              <span className="[&>button]:ring-2 [&>button]:ring-ring [&>button]:ring-offset-2 [&>button]:ring-offset-lime">
                <Chip active={false}>18:00</Chip>
              </span>
            </StateLabel>
            <StateLabel label="disabled">
              <Chip active={false} disabled>
                18:00
              </Chip>
            </StateLabel>
          </div>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="PartySize"
        source="components/sections/booking.tsx"
        description="The counter: the number rolls the way the count went. The buttons disable at 1 and 8."
        code={`<PartySize value={size} onChange={setSize} />`}
      >
        <div className="flex flex-wrap items-end gap-8">
          <StateLabel label="live">
            <PartySize value={size} onChange={setSize} />
          </StateLabel>
          <StateLabel label="at the minimum">
            <PartySize value={1} onChange={() => {}} />
          </StateLabel>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Star"
        source="components/sections/ticker.tsx"
        description="The ticker's twelve-point star between words, in currentColor."
        code={`<Star className="size-8 text-forest" />`}
      >
        <div className="flex items-center gap-6">
          <Star className="size-8 text-forest" />
          <Star className="size-8 text-orange" />
          <span className="rounded-pill bg-forest p-2 text-lime">
            <Star className="size-6" />
          </span>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Container"
        source="components/ui/container.tsx"
        description="The page's gutter and nothing else — the page runs edge to edge. Marked data-canvas-ignore, so the editor clicks through it."
        code={`<Container className="grid gap-row lg:grid-cols-2">…</Container>`}
        previewClassName="px-0 sm:px-0"
      >
        <Container className="border-x-2 border-dashed border-forest/40 py-2">
          <div className="rounded-field bg-cream p-4 text-center font-mono text-caption">w-full · px-gutter</div>
        </Container>
      </ComponentSpecimen>
    </div>
  )
}

/** A whole section, live, in a frame the width of the guide. */
function LiveSection({
  name,
  source,
  description,
  code,
  note,
  children,
}: {
  name: string
  source: string
  description: string
  code: string
  note?: string
  children: ReactNode
}) {
  return (
    <ComponentSpecimen name={name} source={source} description={description} code={code} note={note} previewClassName="p-3 sm:p-4">
      <SectionFrame>{children}</SectionFrame>
    </ComponentSpecimen>
  )
}

export function SectionSpecimens() {
  return (
    <div className="space-y-8">
      <LiveSection
        name="SiteHeader"
        source="components/sections/site-header.tsx"
        description="The name on the left, condensed links on the right; a Sheet on phones. On the home page it slides away while you read down and turns cream over dark sections."
        note="Drawn in a frame with hideOnScroll off, so it stays put while you read this page."
        code={`<SiteHeader />
<SiteHeader hideOnScroll={false} />`}
      >
        <div className="relative h-20 bg-lime [transform:translateZ(0)]">
          <SiteHeader hideOnScroll={false} />
        </div>
      </LiveSection>

      <LiveSection
        name="Hero"
        source="components/sections/hero.tsx"
        description="The food in a lopsided cushion that swells as you scroll, two enormous words fitted to the width, the spin badge and the stamp to book."
        note="Framed shorter than the home page's full screen with its className."
        code={`<Hero />`}
      >
        <Hero className="h-[min(86svh,760px)] min-h-[560px] sm:min-h-[560px]" />
      </LiveSection>

      <LiveSection
        name="Ticker"
        source="components/sections/ticker.tsx"
        description="Two crossing bands — orange words one way, forest pictures in little shapes the other — both answering the scroll."
        code={`<Ticker />`}
      >
        <div className="bg-lime">
          <Ticker />
        </div>
      </LiveSection>

      <LiveSection
        name="Statement"
        source="components/sections/statement.tsx"
        description="One sentence inked in word by word as you scroll, with photos and a film set into the line."
        code={`<Statement />`}
      >
        <Statement />
      </LiveSection>

      <LiveSection
        name="MenuSection"
        source="components/sections/menu.tsx"
        description="Tabs of dishes dealt in with a stagger. With a mouse, the dish you point at follows the pointer in a re-forming blob; on touch, each row carries its picture."
        code={`<MenuSection />`}
      >
        <MenuSection />
      </LiveSection>

      <ComponentSpecimen
        name="Oak"
        source="components/sections/oak.tsx"
        description="The word cut out of a forest sheet over the embers film. On wide screens it pins for three screens while you zoom through the letters; phones get StillCutout, shown here."
        note="Shown in part: StillCutout. The pinned zoom-through and the three film scenes under it run only on the home page."
        code={`<Oak />`}
        previewClassName="bg-forest p-0 sm:p-0 text-cream pb-8"
      >
        <StillCutout />
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Process · StepCard"
        source="components/sections/process.tsx"
        description="One step of the kitchen walk: a picture or film in its own shape, the number and time chip, a heavy title and a line."
        note="Shown in part: the step cards. The pinned sideways walk runs only on the home page."
        code={`<StepCard step={process.steps[0]} index={0} />`}
        previewClassName="bg-lavender"
      >
        <div className="grid gap-8 md:grid-cols-3">
          {process.steps.slice(0, 3).map((step, i) => (
            <StepCard key={step.n} step={step} index={i} />
          ))}
        </div>
      </ComponentSpecimen>

      <LiveSection
        name="Reviews"
        source="components/sections/reviews.tsx"
        description="Stickers on an orange board, dealt in one by one. With a mouse you can pick them up and throw them; on touch they sit in a column."
        code={`<Reviews />`}
      >
        <Reviews />
      </LiveSection>

      <LiveSection
        name="Room"
        source="components/sections/room.tsx"
        description="Four photos in four shapes drifting at four depths beside a short line about the room."
        code={`<Room />`}
      >
        <Room />
      </LiveSection>

      <LiveSection
        name="Booking"
        source="components/sections/booking.tsx"
        description="Name, party size, evening and time in a cream card with the sticker shadow; sending swaps it for a ticket stub whose tick draws itself. Try it — nothing is sent."
        code={`<Booking />`}
      >
        <Booking />
      </LiveSection>

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-card border-2 border-forest bg-cream p-5">
        <div>
          <p className="font-heavy text-[clamp(22px,2vw,30px)] leading-none">SiteFooter</p>
          <p className="mt-1 text-ui text-ink-soft">
            components/sections/site-footer.tsx — live at the foot of this page, with the name the full width and the
            chicken showing through the letters.
          </p>
        </div>
        <div className="flex items-center gap-1">
          <code className="rounded-field bg-forest px-3 py-2 font-mono text-caption text-cream">{"<SiteFooter />"}</code>
          <CopyButton text="<SiteFooter />" className="text-forest [@media(hover:hover)]:hover:text-orange" />
        </div>
      </div>
    </div>
  )
}

export function ComponentLibrary() {
  return (
    <div className="space-y-12">
      <div className="space-y-8">
        <GroupLabel>Primitives — components/ui</GroupLabel>
        <ButtonSpecimen />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <FieldSpecimen />
          <div className="min-w-0 space-y-8">
            <TabsSpecimen />
            <SheetSpecimen />
          </div>
        </div>
      </div>
      <div className="space-y-8">
        <GroupLabel>Blocks — components/blocks</GroupLabel>
        <CtaSpecimen />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <ClipShapeSpecimen />
          <FilmSpecimen />
          <RiseTextSpecimen />
          <MarqueeSpecimen />
        </div>
        <SmallPartsSpecimens />
      </div>
      <div className="space-y-8">
        <GroupLabel>Sections — components/sections</GroupLabel>
        <PreloaderSpecimen />
        <SectionSpecimens />
      </div>
    </div>
  )
}

