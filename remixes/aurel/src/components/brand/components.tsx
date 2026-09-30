import { useEffect, useRef, useState, type ReactNode } from "react"
import { ShoppingBag, X } from "lucide-react"
import { toast } from "sonner"
import { useCanvasAction } from "@canvas/react"

import { ComponentSpecimen, GroupLabel, LABEL, StateLabel } from "@/components/brand/specimen"
import { ClosingCall } from "@/components/blocks/closing-call"
import { PageIntro } from "@/components/blocks/page-intro"
import { ProductCard } from "@/components/blocks/product-card"
import { CountUp } from "@/components/motion/count-up"
import { HoverPreview } from "@/components/motion/hover-preview"
import { ClipReveal, FadeUp, ParallaxImage } from "@/components/motion/reveal"
import { euro, useBag } from "@/components/site/bag"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { ButtonLink } from "@/components/ui/button-link"
import { Container } from "@/components/ui/container"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MixedTitle } from "@/components/ui/mixed-title"
import { Photo } from "@/components/ui/photo"
import { SectionHeading } from "@/components/ui/section-heading"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Wordmark } from "@/components/ui/wordmark"
import { appointments, atelier, collection, home, journal, productDetails, products } from "@/content"
import { field } from "@/pages/appointments"
import { StepCard } from "@/pages/atelier"
import { FeatureCard } from "@/pages/journal"
import { BASE } from "@/router"
import { cn } from "@/lib/utils"

/* ─── Buttons ─────────────────────────────────────────────────────────── */

const HOUSE = [
  { variant: "chip", hover: "bg-white shadow-chip-hover", label: "Book _a_ FITTING" },
  { variant: "ink", hover: "bg-ink-soft", label: "Add _to_ BAG" },
] as const
const FOCUS = "border-ring ring-[3px] ring-ring/50"
const BASE_VARIANTS = [
  { variant: "default", hover: "bg-primary/90" },
  { variant: "secondary", hover: "bg-secondary/80" },
  { variant: "outline", hover: "bg-accent text-accent-foreground" },
  { variant: "ghost", hover: "bg-accent text-accent-foreground" },
  { variant: "destructive", hover: "bg-destructive/90" },
  { variant: "link", hover: "underline" },
] as const
const BASE_SIZES = ["xs", "sm", "default", "lg"] as const

function ButtonSpecimen() {
  return (
    <ComponentSpecimen
      name="Button"
      source="components/ui/button.tsx"
      description="shadcn’s button with the house’s two added: chip — a square bone chip with a warm, wide halo and a serif label — and ink. Hover brightens over 240ms; a press scales to 0.97 in 140ms. The shadcn variants remain for small parts (the bag’s close is ghost)."
      code={`import { Button } from "@/components/ui/button"

<Button variant="chip" size="chip">
  <MixedTitle as="span" text="Book _a_ FITTING" />
</Button>
<Button variant="ink" size="chip" disabled>…</Button>
<Button variant="ghost" size="icon" aria-label="Close bag"><X /></Button>`}
    >
      <div className="space-y-10">
        {HOUSE.map(({ variant, hover, label }) => (
          <div key={variant} className="flex flex-wrap items-end gap-x-6 gap-y-5">
            <span className="w-full font-mono text-[11px] text-ink-muted sm:w-14">{variant}</span>
            <StateLabel label="default">
              <Button variant={variant} size="chip">
                <MixedTitle as="span" text={label} />
              </Button>
            </StateLabel>
            <StateLabel label="hover">
              <Button variant={variant} size="chip" className={hover}>
                <MixedTitle as="span" text={label} />
              </Button>
            </StateLabel>
            <StateLabel label="focus">
              <Button variant={variant} size="chip" className={FOCUS}>
                <MixedTitle as="span" text={label} />
              </Button>
            </StateLabel>
            <StateLabel label="pressed">
              <Button variant={variant} size="chip" className="scale-[0.97]">
                <MixedTitle as="span" text={label} />
              </Button>
            </StateLabel>
            <StateLabel label="disabled">
              <Button variant={variant} size="chip" disabled>
                <MixedTitle as="span" text={label} />
              </Button>
            </StateLabel>
            <StateLabel label="chip-sm">
              <Button variant={variant} size="chip-sm">
                MENU
              </Button>
            </StateLabel>
            <StateLabel label="with icon">
              <Button variant={variant} size="chip-sm" className="gap-2 px-5">
                <ShoppingBag className="size-4" strokeWidth={1.25} />
                <span className="tabular-nums">2</span>
              </Button>
            </StateLabel>
          </div>
        ))}
        <div className="space-y-4 border-t border-ink/15 pt-8">
          <p className={cn(LABEL, "text-ink-muted")}>shadcn variants — default, hover, focus, disabled</p>
          {BASE_VARIANTS.map(({ variant, hover }) => (
            <div key={variant} className="flex flex-wrap items-center gap-3">
              <span className="w-full font-mono text-[11px] text-ink-muted sm:w-20">{variant}</span>
              <Button variant={variant}>Continue</Button>
              <Button variant={variant} className={hover}>
                Continue
              </Button>
              <Button variant={variant} className={FOCUS}>
                Continue
              </Button>
              <Button variant={variant} disabled>
                Continue
              </Button>
            </div>
          ))}
          <div className="flex flex-wrap items-end gap-4 pt-2">
            <span className="w-full font-mono text-[11px] text-ink-muted sm:w-20">sizes</span>
            {BASE_SIZES.map((size) => (
              <StateLabel key={size} label={size}>
                <Button variant="outline" size={size}>
                  Continue
                </Button>
              </StateLabel>
            ))}
            {(["icon-xs", "icon-sm", "icon", "icon-lg"] as const).map((size) => (
              <StateLabel key={size} label={size}>
                <Button variant="ghost" size={size} aria-label="Close">
                  <X />
                </Button>
              </StateLabel>
            ))}
          </div>
        </div>
      </div>
    </ComponentSpecimen>
  )
}

/* ─── Forms ───────────────────────────────────────────────────────────── */

function FieldSpecimen() {
  const [open, setOpen] = useState(false)
  useCanvasAction("Sample select open", (next) => setOpen(next ?? !open), { on: open, group: "Brand guidelines" })
  const label = "font-sans text-[13px] font-normal uppercase tracking-[0.06em]"
  return (
    <ComponentSpecimen
      name="Input, Textarea, Select and Label"
      source="components/ui/input.tsx · textarea.tsx · select.tsx · label.tsx"
      description="shadcn’s fields, set the house way on the appointments form: no box, an ink underline at 30% that darkens on focus, grotesk capitals for the label. An invalid field takes the destructive colour."
      code={`<Label htmlFor="name" className="font-sans text-[13px] font-normal uppercase tracking-[0.06em]">Name</Label>
<Input id="name" className={field} />
<Select defaultValue="fitting">
  <SelectTrigger className={\`\${field} w-full data-[size=default]:h-12\`}><SelectValue /></SelectTrigger>
  <SelectContent className="rounded-none border-line bg-chip">…</SelectContent>
</Select>`}
    >
      <div className="grid gap-8 sm:grid-cols-2">
        <StateLabel label="default" className="items-stretch">
          <Label htmlFor="bg-name" className={label}>Name</Label>
          <Input id="bg-name" placeholder="Your name" className={field} />
        </StateLabel>
        <StateLabel label="focused" className="items-stretch">
          <Label htmlFor="bg-focus" className={label}>Email</Label>
          <Input id="bg-focus" defaultValue="ines@example.com" className={cn(field, "border-ink")} />
        </StateLabel>
        <StateLabel label="invalid" className="items-stretch">
          <Label htmlFor="bg-invalid" className={label}>Email</Label>
          <Input id="bg-invalid" aria-invalid defaultValue="ines@" className={field} />
          <p role="alert" className="font-serif text-[15px] text-ember-deep">
            That address is missing its end — try name@domain.
          </p>
        </StateLabel>
        <StateLabel label="disabled" className="items-stretch">
          <Label htmlFor="bg-disabled" className={label}>Preferred day</Label>
          <Input id="bg-disabled" disabled defaultValue="Saturday" className={field} />
        </StateLabel>
        <StateLabel label="Select — “Sample select open” in the editor" className="items-stretch sm:col-span-2">
          <Label htmlFor="bg-kind" className={label}>Appointment</Label>
          <Select defaultValue={appointments.kinds[0].value} open={open} onOpenChange={setOpen}>
            <SelectTrigger id="bg-kind" className={`${field} w-full data-[size=default]:h-12`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-none border-line bg-chip">
              {appointments.kinds.map((kind) => (
                <SelectItem key={kind.value} value={kind.value} className="rounded-none py-3 font-sans text-[15px]">
                  {kind.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </StateLabel>
        <StateLabel label="Textarea" className="items-stretch sm:col-span-2">
          <Label htmlFor="bg-notes" className={label}>What would you like to see?</Label>
          <Textarea
            id="bg-notes"
            rows={3}
            defaultValue="A winter coat, in something heavier than the Vale."
            className="min-h-24 rounded-none border-0 border-b border-ink/30 bg-transparent px-0 font-sans text-[16px] shadow-none focus-visible:border-ink focus-visible:ring-0"
          />
        </StateLabel>
      </div>
    </ComponentSpecimen>
  )
}

const HOUSE_TOGGLE =
  "h-12 min-w-14 flex-1 rounded-none border border-line-strong bg-transparent font-sans text-[14px] text-ink transition-[background-color,border-color,color] duration-(--duration-hover) hover:border-ink hover:bg-transparent data-[state=on]:border-ink data-[state=on]:bg-ink data-[state=on]:text-paper"

function ToggleSpecimen() {
  const product = products[0]
  const [size, setSize] = useState("")
  return (
    <ComponentSpecimen
      name="ToggleGroup and Toggle"
      source="components/ui/toggle-group.tsx · toggle.tsx"
      description="The size picker and the time of day: square cells with a strong hairline that fill with ink when chosen. Toggle is the single switch underneath, in shadcn’s two variants."
      code={`<ToggleGroup type="single" value={size} onValueChange={setSize} className="flex w-full flex-wrap gap-2">
  {sizes.map((s) => <ToggleGroupItem key={s} value={s} className="h-12 … data-[state=on]:bg-ink">{s}</ToggleGroupItem>)}
</ToggleGroup>`}
    >
      <div className="space-y-8">
        <StateLabel label={size ? `chosen: ${size}` : "none chosen — pick one"} className="items-stretch">
          <ToggleGroup type="single" value={size} onValueChange={setSize} className="flex w-full flex-wrap gap-2" aria-label="Size">
            {product.sizes.map((each) => (
              <ToggleGroupItem key={each} value={each} className={HOUSE_TOGGLE}>
                {each}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </StateLabel>
        <div className="grid gap-6 sm:grid-cols-4">
          <StateLabel label="rest" className="items-stretch">
            <span className={cn(HOUSE_TOGGLE, "flex items-center justify-center")}>M</span>
          </StateLabel>
          <StateLabel label="hover" className="items-stretch">
            <span className={cn(HOUSE_TOGGLE, "flex items-center justify-center border-ink")}>M</span>
          </StateLabel>
          <StateLabel label="chosen" className="items-stretch">
            <span className={cn(HOUSE_TOGGLE, "flex items-center justify-center border-ink bg-ink text-paper")}>M</span>
          </StateLabel>
          <StateLabel label="disabled" className="items-stretch">
            <ToggleGroup type="single" disabled className="flex w-full">
              <ToggleGroupItem value="m" className={HOUSE_TOGGLE}>
                M
              </ToggleGroupItem>
            </ToggleGroup>
          </StateLabel>
        </div>
        <div className="flex flex-wrap items-end gap-4 border-t border-ink/15 pt-6">
          <StateLabel label="Toggle · default">
            <Toggle aria-label="Gift wrap">Gift wrap</Toggle>
          </StateLabel>
          <StateLabel label="Toggle · pressed">
            <Toggle defaultPressed aria-label="Gift wrap">
              Gift wrap
            </Toggle>
          </StateLabel>
          <StateLabel label="Toggle · outline">
            <Toggle variant="outline" aria-label="Gift wrap">
              Gift wrap
            </Toggle>
          </StateLabel>
          <StateLabel label="sm · lg">
            <div className="flex gap-2">
              <Toggle size="sm" variant="outline">
                S
              </Toggle>
              <Toggle size="lg" variant="outline">
                L
              </Toggle>
            </div>
          </StateLabel>
          <StateLabel label="disabled">
            <Toggle disabled variant="outline">
              Gift wrap
            </Toggle>
          </StateLabel>
        </div>
      </div>
    </ComponentSpecimen>
  )
}

/* ─── Disclosure and overlays ─────────────────────────────────────────── */

function SheetSample() {
  const [open, setOpen] = useState(false)
  const bag = useBag()
  useCanvasAction("Sample sheet", (next) => setOpen(next ?? !open), { on: open, group: "Brand guidelines" })
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="chip" size="chip-sm" onClick={() => setOpen(true)}>
        <MixedTitle as="span" text="_open a_ SHEET" />
      </Button>
      <Button variant="chip" size="chip-sm" onClick={() => bag.setOpen(true)}>
        <MixedTitle as="span" text="_open the_ BAG" />
      </Button>
      <Button
        variant="ink"
        size="chip-sm"
        onClick={() => {
          bag.add(products[1].slug, products[1].sizes[2])
          toast(`${products[1].name}, size ${products[1].sizes[2]}, is in your bag.`, { action: { label: "View bag", onClick: () => bag.setOpen(true) } })
        }}
      >
        <MixedTitle as="span" text="Add _a_ PIECE" />
      </Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" showCloseButton={false} className="w-full gap-0 border-l-line bg-paper p-0 sm:max-w-[440px]">
          <SheetHeader className="flex-row items-center justify-between border-b border-line px-6 py-5">
            <SheetTitle className="font-display text-[26px] font-normal leading-none">
              <MixedTitle as="span" text="_a_ SHEET" />
            </SheetTitle>
            <SheetDescription className="sr-only">A sample sheet</SheetDescription>
            <Button variant="ghost" size="icon" className="size-11" onClick={() => setOpen(false)} aria-label="Close">
              <X className="size-5" />
            </Button>
          </SheetHeader>
          <p className="px-6 py-8 font-serif text-[17px] leading-[1.6] text-ink-soft">
            Sheets come in from the side on paper, with a line under the title and a ghost close. The bag and the menu
            are both built this way.
          </p>
          <SheetFooter className="border-t border-line p-6">
            <Button variant="ink" size="chip" onClick={() => setOpen(false)}>
              <MixedTitle as="span" text="_close the_ SHEET" />
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}

function DisclosureLibrary() {
  return (
    <div className="grid gap-6 xl:grid-cols-2 [&>*]:min-w-0">
      <ComponentSpecimen
        name="Accordion"
        source="components/ui/accordion.tsx"
        description="shadcn’s accordion on Radix, ruled in line with grotesk questions and serif answers — the product details and the appointments FAQ."
        code={`<Accordion type="multiple" className="border-t border-line">
  <AccordionItem value="cloth" className="border-line">
    <AccordionTrigger className="rounded-none py-4 font-sans text-[15px] font-normal hover:no-underline">Cloth and care</AccordionTrigger>
    <AccordionContent className="font-serif text-[16px] leading-[1.6] text-ink-soft">…</AccordionContent>
  </AccordionItem>
</Accordion>`}
      >
        <Accordion type="multiple" defaultValue={[productDetails[0].title]} className="border-t border-line">
          {productDetails.map((detail) => (
            <AccordionItem key={detail.title} value={detail.title} className="border-line">
              <AccordionTrigger className="rounded-none py-4 font-sans text-[15px] font-normal hover:no-underline">{detail.title}</AccordionTrigger>
              <AccordionContent className="font-serif text-[16px] leading-[1.6] text-ink-soft">{detail.body}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Tabs"
        source="components/ui/tabs.tsx"
        description="The collection’s filter: display capitals, muted at rest; the chosen one sits on a chip with its halo. Below, shadcn’s default track."
        code={`<Tabs value={category} onValueChange={setCategory}>
  <TabsList className="h-auto flex-wrap gap-1 rounded-none bg-transparent p-0">
    <TabsTrigger value="Outerwear" className="h-11 rounded-none px-5 font-display text-[17px] … data-[state=active]:bg-chip data-[state=active]:shadow-chip">OUTERWEAR</TabsTrigger>
  </TabsList>
</Tabs>`}
      >
        <div className="space-y-10">
          <Tabs defaultValue={collection.categories[1]} className="items-start">
            <TabsList className="h-auto flex-wrap justify-start gap-1 rounded-none bg-transparent p-0">
              {collection.categories.map((each) => (
                <TabsTrigger
                  key={each}
                  value={each}
                  className="h-11 flex-none rounded-none border-0 px-5 font-display text-[17px] tracking-[0.02em] text-ink-muted shadow-none transition-[color,background-color,box-shadow] duration-(--duration-hover) hover:text-ink data-[state=active]:bg-chip data-[state=active]:text-ink data-[state=active]:shadow-chip"
                >
                  {each.toUpperCase()}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <StateLabel label="shadcn default · last disabled" className="items-stretch">
            <Tabs defaultValue="fit">
              <TabsList>
                <TabsTrigger value="fit">Fit</TabsTrigger>
                <TabsTrigger value="cloth">Cloth</TabsTrigger>
                <TabsTrigger value="care" disabled>
                  Care
                </TabsTrigger>
              </TabsList>
              <TabsContent value="fit" className="pt-3 font-serif text-[16px] text-ink-soft">
                Cut close at the shoulder, easy through the body.
              </TabsContent>
              <TabsContent value="cloth" className="pt-3 font-serif text-[16px] text-ink-soft">
                Loden wool, woven in the Tyrol.
              </TabsContent>
            </Tabs>
          </StateLabel>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Sheet, the bag and the toast"
        source="components/ui/sheet.tsx · site/bag-sheet.tsx · ui/sonner.tsx"
        description="A sheet from the side; the bag is one, opened from the header or here. Adding a piece raises a toast at the foot with a way to the bag. In the editor: “Sample sheet”, “Bag” and “Bag with a piece in it”."
        code={`const bag = useBag()
bag.add(product.slug, "M")
toast("Vale Overcoat, size M, is in your bag.", { action: { label: "View bag", onClick: () => bag.setOpen(true) } })`}
      >
        <SheetSample />
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Separator and Label"
        source="components/ui/separator.tsx · label.tsx"
        description="A hairline in the border colour, either way; and the label every field sits under."
        code={`<Separator />
<Separator orientation="vertical" />`}
      >
        <div className="space-y-6">
          <div className="space-y-3">
            <p className={cn(LABEL, "text-ink")}>Hours</p>
            <Separator />
            <p className="font-serif text-[17px] text-ink-soft">Tuesday to Saturday, ten until six.</p>
          </div>
          <div className="flex h-8 items-center gap-4 font-sans text-[14px] text-ink-muted">
            <span>Lisbon</span>
            <Separator orientation="vertical" />
            <span>Est. 2011</span>
            <Separator orientation="vertical" />
            <span>{euro(1480)}</span>
          </div>
        </div>
      </ComponentSpecimen>
    </div>
  )
}

/* ─── Type components ─────────────────────────────────────────────────── */

function TypeLibrary() {
  return (
    <div className="grid gap-6 xl:grid-cols-2 [&>*]:min-w-0">
      <ComponentSpecimen
        name="MixedTitle"
        source="components/ui/mixed-title.tsx"
        description="The house’s type trick as a component: capitals in the display serif, words between underscores in its italic. text is a plain string, so the editor can change it."
        code={`<MixedTitle as="h2" text="_where_ PATTERN _meets_ PATIENCE" className="text-[64px] leading-[0.9]" />`}
      >
        <div className="space-y-4">
          <MixedTitle as="p" text="_where_ PATTERN _meets_ PATIENCE" className="text-[clamp(34px,4vw,56px)] leading-[0.9] text-ink" />
          <MixedTitle as="p" text="ALL CAPITALS" className="text-[28px] leading-none text-ink" />
          <MixedTitle as="p" text="_all italic_" className="text-[28px] leading-none text-ink" />
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="SectionHeading"
        source="components/ui/section-heading.tsx"
        description="The eyebrow and the big mixed title every section opens with — three sizes, centred or left."
        code={`<SectionHeading eyebrow="_the_ ARCHIVE" title="MOOD _and_ MEMORY" size="lg" align="left" />`}
      >
        <div className="space-y-10">
          {(["md", "lg"] as const).map((size) => (
            <StateLabel key={size} label={`size="${size}" · align="left"`} className="items-stretch">
              <SectionHeading eyebrow="_the_ ARCHIVE" title="MOOD _and_ MEMORY" size={size} align="left" />
            </StateLabel>
          ))}
          <StateLabel label={`size="md" · centre · no eyebrow`} className="items-stretch">
            <SectionHeading title="_the_ REST _of the_ EDIT" size="md" />
          </StateLabel>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Wordmark"
        source="components/ui/wordmark.tsx"
        description="The name in the display serif. Sized by className — 26–30px in the header, 35vw in the footer."
        code={`<Wordmark className="text-[30px]" />`}
      >
        <div className="flex flex-wrap items-end gap-10">
          <StateLabel label="header">
            <Wordmark className="text-[30px] text-ink" />
          </StateLabel>
          <StateLabel label="80px">
            <Wordmark className="text-[80px] text-ink" />
          </StateLabel>
          <StateLabel label="on ink">
            <span className="bg-ink p-4">
              <Wordmark className="text-[40px] text-paper" />
            </span>
          </StateLabel>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="ButtonLink"
        source="components/ui/button-link.tsx"
        description="A house button that goes somewhere, its label in the mixed-title markup. The same chip and ink variants."
        code={`<ButtonLink href="/appointments" label="Book _a_ FITTING" />
<ButtonLink href="/collection" label="_see the_ COLLECTION" variant="ink" />`}
      >
        <div className="flex flex-wrap gap-4">
          <ButtonLink href="/appointments" label="Book _a_ FITTING" />
          <ButtonLink href="/collection" label="_see the_ COLLECTION" variant="ink" />
          <ButtonLink href="/appointments" label="MENU" size="chip-sm" />
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="Photo and Container"
        source="components/ui/photo.tsx · container.tsx"
        description="Photo fills its box, lazy, on paper deep while it loads. Container holds a section to the page’s gutters at up to 1920px, and is marked data-canvas-ignore so the editor clicks through it."
        code={`<div className="aspect-[3/4]"><Photo src={src} alt="…" /></div>
<Container>…</Container>`}
        previewClassName="px-0 sm:px-0"
      >
        <Container className="outline-1 outline-dashed outline-ember/50">
          <div className="grid grid-cols-3 gap-2">
            {home.archive.images.slice(0, 3).map((image) => (
              <div key={image.src} className="aspect-[3/4]">
                <Photo src={image.src} alt={image.alt} />
              </div>
            ))}
          </div>
        </Container>
      </ComponentSpecimen>
    </div>
  )
}

/* ─── Blocks ──────────────────────────────────────────────────────────── */

function BlockLibrary() {
  return (
    <div className="space-y-6">
      <ComponentSpecimen
        name="ProductCard"
        source="components/blocks/product-card.tsx"
        description="A piece in the grid: on hover the photograph eases in by 3% and the second one wipes up over it (on a pointer; hover one to see it)."
        code={`<ProductCard product={product} />`}
      >
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 3).map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </ComponentSpecimen>

      <div className="grid gap-6 xl:grid-cols-2 [&>*]:min-w-0">
        <ComponentSpecimen
          name="PageIntro"
          source="components/blocks/page-intro.tsx"
          description="How every inner page opens — this one included: eyebrow, the xl mixed title, one paragraph."
          code={`<PageIntro eyebrow="_the_ HOUSE STYLE" title="BRAND _guidelines_" intro="…" />`}
          previewClassName="p-0 sm:p-0 [&>div]:pt-12"
        >
          <PageIntro eyebrow={atelier.eyebrow} title={atelier.title} intro={atelier.intro} />
        </ComponentSpecimen>

        <ComponentSpecimen
          name="ClosingCall"
          source="components/blocks/closing-call.tsx"
          description="The last word on every page: a short title, one line and the way to the workroom."
          code={`<ClosingCall title="See where your coat is made" body="…" cta="Book _a_ VISIT" />`}
          previewClassName="p-0 sm:p-0 [&>section]:py-16"
        >
          <ClosingCall />
        </ComponentSpecimen>
      </div>

      <ComponentSpecimen
        name="StepCard"
        source="pages/atelier.tsx"
        description="One step of the making, as a card in the atelier’s stack: its name and number, the mixed title, and the photograph beside it."
        code={`<StepCard {...atelier.steps[0]} />`}
        previewClassName="p-3 sm:p-6"
      >
        <StepCard {...atelier.steps[0]} />
      </ComponentSpecimen>

      <ComponentSpecimen
        name="FeatureCard"
        source="pages/journal.tsx"
        description="A journal feature on the sideways row; every other one sits lower and narrower."
        code={`<FeatureCard {...journal.features[0]} index={0} />`}
      >
        <div className="flex flex-col gap-10 md:flex-row md:gap-[4vw]">
          {journal.features.slice(0, 2).map((feature, index) => (
            <FeatureCard key={feature.slug} {...feature} index={index} />
          ))}
        </div>
      </ComponentSpecimen>
    </div>
  )
}

/* ─── Motion ──────────────────────────────────────────────────────────── */

function Replay({ children, label = "_play_ AGAIN" }: { children: (run: number) => ReactNode; label?: string }) {
  const [run, setRun] = useState(0)
  return (
    <div className="space-y-5">
      <Button variant="chip" size="chip-sm" onClick={() => setRun((r) => r + 1)}>
        <MixedTitle as="span" text={label} />
      </Button>
      <div key={run}>{children(run)}</div>
    </div>
  )
}

function MotionLibrary() {
  return (
    <div className="grid gap-6 xl:grid-cols-2 [&>*]:min-w-0">
      <ComponentSpecimen
        name="FadeUp"
        source="components/motion/reveal.tsx"
        description="A block fading up 24px over 0.9s on the house ease-out, the first time it is seen. Held at its end state while designing and for reduced motion."
        code={`<FadeUp delay={0.12}>…</FadeUp>`}
      >
        <Replay>
          {() => (
            <div className="grid grid-cols-3 gap-2">
              {[0, 0.12, 0.24].map((delay) => (
                <FadeUp key={delay} delay={delay}>
                  <div className="flex aspect-square items-center justify-center bg-chip font-mono text-[11px] text-ink-muted shadow-chip">delay {delay}</div>
                </FadeUp>
              ))}
            </div>
          )}
        </Replay>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="ClipReveal"
        source="components/motion/reveal.tsx"
        description="A photograph uncovered by a wipe as it enters, settling from a slight zoom behind it. Four directions."
        code={`<ClipReveal src={src} alt="…" direction="up" className="aspect-[3/4]" />`}
      >
        <Replay>
          {() => (
            <div className="grid grid-cols-4 gap-2">
              {(["up", "down", "left", "right"] as const).map((direction, index) => (
                <StateLabel key={direction} label={direction} className="items-stretch">
                  <ClipReveal src={home.archive.images[index + 4].src} alt={home.archive.images[index + 4].alt} direction={direction} className="aspect-[3/4]" />
                </StateLabel>
              ))}
            </div>
          )}
        </Replay>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="CountUp"
        source="components/motion/count-up.tsx"
        description="A number counting up once it is seen — the atelier’s figures."
        code={`<CountUp value={12} suffix=" hands" />`}
      >
        <Replay>
          {() => (
            <dl className="grid grid-cols-2 gap-6">
              {atelier.stats.slice(0, 2).map((stat) => (
                <div key={stat.label}>
                  <dd className="font-display text-[clamp(56px,6vw,96px)] leading-[0.85] tracking-[-0.02em]">
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </dd>
                  <dt className="mt-2 font-serif text-[16px] text-ink-muted">{stat.label}</dt>
                </div>
              ))}
            </dl>
          )}
        </Replay>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="ParallaxImage"
        source="components/motion/reveal.tsx"
        description="A photograph moving slower than the page inside its frame — scroll past it. strength is the travel in %."
        code={`<ParallaxImage src={src} alt="…" strength={14} className="aspect-[3/4]" />`}
      >
        <div className="grid grid-cols-2 gap-2">
          <StateLabel label="strength={8}" className="items-stretch">
            <ParallaxImage src={home.wardrobe.small[0].src} alt={home.wardrobe.small[0].alt} strength={8} className="aspect-[3/4]" />
          </StateLabel>
          <StateLabel label="strength={14}" className="items-stretch">
            <ParallaxImage src={home.wardrobe.small[1].src} alt={home.wardrobe.small[1].alt} strength={14} className="aspect-[3/4]" />
          </StateLabel>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="HoverPreview"
        source="components/motion/hover-preview.tsx"
        description="An index of rows with the hovered one’s picture trailing the cursor on a soft spring. On touch, each row carries its own thumbnail."
        code={`<HoverPreview rows={rows} stiffness={260} damping={30} />`}
        className="xl:col-span-2"
      >
        <HoverPreview
          rows={products.slice(0, 4).map((product) => ({
            href: `/collection/${product.slug}`,
            title: product.line,
            meta: `${product.category} · ${product.cloth}`,
            aside: euro(product.price),
            image: product.images[0].src,
            alt: product.images[0].alt,
          }))}
        />
      </ComponentSpecimen>

      <ComponentSpecimen
        name="SectionRail and SmoothScroll"
        source="components/motion/section-rail.tsx · smooth-scroll.tsx"
        description="The column of diamonds on the left edge, one per section, the current one lit and blended with difference — it is running on this page, one diamond per chapter (wide screens). Lenis carries the scroll underneath."
        code={`<SectionRail sections="top,piece,craft,process" />
<SmoothScroll lerp={0.08} resetKey={pathname}>…</SmoothScroll>`}
        className="xl:col-span-2"
      >
        <div className="flex items-center gap-6">
          <div className="flex flex-col gap-3 bg-ink p-4">
            {[1, 0.35, 0.35, 0.35].map((opacity, index) => (
              <span key={index} className="block size-[7px] rotate-45 bg-white" style={{ opacity, scale: index === 0 ? 1.25 : 1 }} />
            ))}
          </div>
          <p className="max-w-[48ch] font-serif text-[16px] leading-[1.6] text-ink-soft">
            Look to the left edge of the window at desktop width: that is the real one, following these chapters.
          </p>
        </div>
      </ComponentSpecimen>
    </div>
  )
}

/* ─── Pinned scenes, in a frame ───────────────────────────────────────── */

/**
 * A pinned, scroll-driven scene can only play against a whole window of
 * scroll, so it is shown on its own page in a frame, scrolled to it: scroll
 * inside the frame to play it.
 */
function Stage({ path, target, height = 640 }: { path: string; target: string; height?: number }) {
  const frame = useRef<HTMLIFrameElement>(null)
  const [ready, setReady] = useState(false)
  useEffect(() => {
    // Polled rather than waiting for "load", which a film's poster can hold
    // back long after the page inside has rendered. The frame always opens
    // the site's own index (a static host has no file for "/atelier") and
    // is sent to its page through the router, as the back button would.
    const timer = window.setInterval(() => {
      const iframe = frame.current
      const doc = iframe?.contentDocument
      const win = iframe?.contentWindow
      if (!doc?.getElementById("root")?.firstElementChild || !win) return
      if (win.location.pathname.replace(/\/$/, "") !== `${BASE}${path}`.replace(/\/$/, "")) {
        win.history.replaceState(null, "", `${BASE}${path}`)
        win.dispatchEvent(new PopStateEvent("popstate"))
        return
      }
      const element = doc && (target.startsWith("#") ? doc.getElementById(target.slice(1)) : doc.querySelector(target))
      if (!element || !win) return
      win.scrollTo(0, element.getBoundingClientRect().top + win.scrollY)
      setReady(true)
      window.clearInterval(timer)
    }, 250)
    return () => window.clearInterval(timer)
  }, [path, target])
  return (
    <div className="relative bg-paper-deep" style={{ height }}>
      <iframe
        ref={frame}
        src={`${BASE}/`}
        title={`${path} — live`}
        loading="lazy"
        className={cn("size-full border-0 transition-opacity duration-(--duration-enter) ease-(--ease-out-soft)", ready ? "opacity-100" : "opacity-0")}
      />
      {!ready && <p className={cn(LABEL, "absolute inset-0 grid place-items-center text-ink-muted")}>Loading the scene…</p>}
    </div>
  )
}

const SCENES = [
  { name: "HeroFilm", section: "HomeHero", source: "components/motion/hero-film.tsx · sections/home/home-hero.tsx", path: "/", target: "#top", code: `<HeroFilm src={film.src} poster={film.poster} wordmark="AUREL" tagline="_the_ HOUSE _of_ SLOW TAILORING" length={220} tuck={16} />`, description: "The film, the wordmark over it, and the fold: scrolling tucks the film’s sides in and hands the wordmark up to the header." },
  { name: "PieceReveal", section: "PieceIntro", source: "components/motion/piece-reveal.tsx · sections/home/piece-intro.tsx", path: "/", target: "#piece", code: `<PieceReveal first="YOUR MOST _considered_ PIECE" second="DESERVES TO LAST _for years._" image={src} alt="…" />`, description: "A garment rising through two lines of the title, then the paragraph on its fading hem." },
  { name: "GrowFrame", section: "CraftFrame", source: "components/motion/grow-frame.tsx · sections/home/craft-frame.tsx", path: "/", target: "#craft", code: `<GrowFrame image={src} alt="…" start={28} heading={<SectionHeading … />} />`, description: "The studio photograph opening from a card to the whole screen." },
  { name: "WordSweep", section: "ProcessBand", source: "components/motion/word-sweep.tsx · sections/home/process-band.tsx", path: "/", target: "#process", code: `<WordSweep words="_From_ SKETCH, _to_ TOILE, _to_ YOU." length={180} />`, description: "The grey band: the process read out word by word as it scrolls." },
  { name: "WardrobeSplit", section: "WardrobeSplit", source: "components/sections/home/wardrobe-split.tsx", path: "/", target: "#wardrobe", code: `<WardrobeSplit />`, description: "A large photograph pinned on the left, easing out of a zoom, while the right column scrolls past." },
  { name: "DriftGallery", section: "ArchiveWall", source: "components/motion/drift-gallery.tsx · sections/home/archive-wall.tsx", path: "/", target: "#archive", code: `<DriftGallery images={images} columns={5}><ButtonLink … /></DriftGallery>`, description: "Twenty small pictures drifting past a pinned button, columns at different speeds." },
  { name: "SealVerse", section: "HouseVerse", source: "components/motion/seal-verse.tsx · sections/home/house-verse.tsx", path: "/", target: "#verse", code: `<SealVerse lines={lines} by="…" monogram="A" turns={3} />`, description: "The verse scrolling up past the silver seal, which turns on its axis." },
  { name: "StackCards", section: "the atelier’s steps", source: "components/motion/stack-cards.tsx · pages/atelier.tsx", path: "/atelier", target: "main article", code: `<StackCards top={96}>{steps.map((s) => <StepCard {...s} />)}</StackCards>`, description: "The five steps stacking as you read them, each one receding under the next." },
  { name: "HorizontalTrack", section: "the journal’s features", source: "components/motion/horizontal-track.tsx · pages/journal.tsx", path: "/journal", target: "main section", code: `<HorizontalTrack>{features.map((f, i) => <FeatureCard {...f} index={i} />)}</HorizontalTrack>`, description: "Features on a sideways row, driven by the vertical scroll (a plain column on phones)." },
  { name: "Timeline", section: "the house’s years", source: "pages/house.tsx", path: "/house", target: "main ol", code: `<Timeline />`, description: "The current year pinned large on the left, swapped up and out as each row reaches the middle." },
]

function SceneLibrary() {
  return (
    <div className="space-y-6">
      <p className="max-w-[62ch] font-serif text-[17px] leading-[1.6] text-ink-soft">
        These pieces are pinned and tied to the scroll of a whole window, so they are shown here only in part: each one
        runs live on its own page inside a frame, scrolled to it. Scroll inside a frame to play the scene.
      </p>
      {SCENES.map((scene) => (
        <ComponentSpecimen
          key={scene.name}
          name={scene.name === scene.section ? scene.name : `${scene.name} · ${scene.section}`}
          source={scene.source}
          description={scene.description}
          code={scene.code}
          previewClassName="p-0 sm:p-0"
        >
          <Stage path={scene.path} target={scene.target} />
        </ComponentSpecimen>
      ))}
    </div>
  )
}

/* ─── The chapter ─────────────────────────────────────────────────────── */

function SiteLibrary() {
  return (
    <ComponentSpecimen
      name="SiteHeader, MenuOverlay and SiteFooter"
      source="components/site/site-header.tsx · menu-overlay.tsx · site-footer.tsx"
      description="The header is the two chips and the wordmark pinned above this page; MENU opens the overlay (the “Menu” action), the bag chip opens the bag. The footer below is the real one — its newsletter’s done state is “Newsletter joined”."
      code={`<SiteHeader onMenu={() => setMenuOpen(true)} menuOpen={menuOpen} />
<MenuOverlay open={menuOpen} onOpenChange={setMenuOpen} pathname={pathname} />
<SiteFooter />`}
    >
      <div className="flex flex-wrap items-center justify-between gap-4 bg-paper-deep/60 p-4">
        <span className="inline-flex h-11 items-center bg-chip px-6 font-display text-[15px] shadow-chip">MENU</span>
        <Wordmark className="text-[26px]" />
        <span className="inline-flex h-11 items-center gap-2 bg-chip px-4 font-display text-[15px] shadow-chip">
          <ShoppingBag className="size-4" strokeWidth={1.25} /> 0
        </span>
      </div>
      <p className="mt-4 font-serif text-[15px] text-ink-muted">A picture of the header’s layout; the live one is above.</p>
    </ComponentSpecimen>
  )
}

const GROUPS = [
  { id: "buttons", title: "Buttons", Body: ButtonSpecimen },
  { id: "forms", title: "Forms", Body: () => (
      <div className="grid gap-6 xl:grid-cols-2 [&>*]:min-w-0">
        <FieldSpecimen />
        <ToggleSpecimen />
      </div>
    ) },
  { id: "disclosure", title: "Disclosure and overlays", Body: DisclosureLibrary },
  { id: "type-components", title: "Type and frame", Body: TypeLibrary },
  { id: "blocks", title: "Blocks", Body: BlockLibrary },
  { id: "motion-components", title: "Motion", Body: MotionLibrary },
  { id: "scenes", title: "Pinned scenes", Body: SceneLibrary },
  { id: "site", title: "The site’s frame", Body: SiteLibrary },
]

export function ComponentLibrary() {
  return (
    <div className="space-y-20">
      <nav aria-label="Component groups" className="flex flex-wrap gap-2">
        {GROUPS.map((g) => (
          <a
            key={g.id}
            href={`#${g.id}`}
            className="inline-flex h-11 items-center bg-chip px-5 font-display text-[15px] tracking-[0.01em] text-ink shadow-chip transition-[box-shadow,background-color] duration-(--duration-hover) ease-(--ease-out-soft) hover:bg-white hover:shadow-chip-hover"
          >
            {g.title.toUpperCase()}
          </a>
        ))}
      </nav>
      {GROUPS.map(({ id, title, Body }) => (
        <div key={id} id={id} className="scroll-mt-[120px]">
          <GroupLabel className="mb-8 font-display text-[clamp(28px,2.4vw,40px)] normal-case tracking-[-0.01em]">{title}</GroupLabel>
          <Body />
        </div>
      ))}
    </div>
  )
}
