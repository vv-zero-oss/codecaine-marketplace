import { useState, type ReactNode } from "react"
import { ArrowRight, LoaderCircle, RotateCcw } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { ComponentSpecimen, GroupLabel, StateLabel } from "@/components/brand/specimen"
import { BookObject } from "@/components/mock/book-object"
import { CLOTH, CoverArt } from "@/components/mock/cover-art"
import { Envelope, PrintStack, ProductVisual, Slipcase } from "@/components/mock/product-visual"
import { CountUp } from "@/components/motion/count-up"
import { Marquee } from "@/components/motion/marquee"
import { Reveal } from "@/components/motion/reveal"
import { ScrollWords } from "@/components/motion/scroll-words"
import { AddToBag } from "@/components/sections/add-to-bag"
import { Postcard } from "@/components/sections/letters-signup"
import { SectionTitle, SerifHead } from "@/components/sections/section-title"
import { StoryCard } from "@/components/sections/story-card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button, ButtonLink } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PRODUCTS, VOLUMES, type Cloth } from "@/content/shop"
import { STORIES } from "@/content/stories"
import { PHOTOS } from "@/lib/photos"
import { cn } from "@/lib/utils"

const GROUP = "Brand"

/* ─── Button ──────────────────────────────────────────────────────────── */

/** Each variant with the classes its hover resolves to, so the hover state
 *  can be shown at rest. Written out whole so Tailwind generates them. */
const VARIANTS = [
  { variant: "ink", hover: "bg-ink-2", label: "Read the story", night: false },
  { variant: "outline", hover: "bg-ink text-page", label: "Read the story", night: false },
  { variant: "quiet", hover: "bg-line", label: "Read the story", night: false },
  { variant: "paper", hover: "bg-raised", label: "Read the story", night: false },
  { variant: "ghost", hover: "bg-sheet text-ink", label: "Read the story", night: false },
  { variant: "link", hover: "[&_svg]:translate-x-0.5", label: "View more", night: false },
  { variant: "night", hover: "bg-raised", label: "Send me the letters", night: true },
] as const

function ButtonRow({ variant, hover, label, night }: (typeof VARIANTS)[number]) {
  const tone = night ? "night" : "page"
  const content = variant === "link" ? (
    <>
      {label} <ArrowRight />
    </>
  ) : (
    label
  )
  return (
    <div className={cn("p-5", night ? "bg-night" : "bg-page shadow-(--shadow-hairline)")}>
      <p className={cn("mb-4 font-mono text-[12px]", night ? "text-night-muted" : "text-ink-3")}>variant="{variant}"</p>
      <div className="flex flex-wrap items-start gap-x-6 gap-y-5">
        <StateLabel label="default" tone={tone}>
          <Button variant={variant}>{content}</Button>
        </StateLabel>
        <StateLabel label="hover" tone={tone}>
          <Button variant={variant} className={hover}>
            {content}
          </Button>
        </StateLabel>
        <StateLabel label="focus" tone={tone}>
          <Button variant={variant} className={cn("ring-2 ring-offset-2", night ? "ring-night-fg ring-offset-night" : "ring-ink ring-offset-page")}>
            {content}
          </Button>
        </StateLabel>
        {variant !== "link" && (
          <StateLabel label="loading" tone={tone}>
            <Button variant={variant} disabled aria-busy>
              <LoaderCircle className="animate-spin" />
              Posting…
            </Button>
          </StateLabel>
        )}
        <StateLabel label="disabled" tone={tone}>
          <Button variant={variant} disabled>
            {content}
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
      description="Print-square buttons in the grotesk, seven variants and four sizes. Ink is the one to press; outline and quiet sit beside it; paper floats on photographs; night lives on the letters band. Every one scales to 0.97 on a 140ms press."
      code={`import { Button } from "@/components/ui/button"

<Button>Read the story</Button>
<Button variant="outline" size="lg">Visit the shop</Button>
<Button variant="quiet" size="sm">Ceramics</Button>
<Button variant="link">View more <ArrowRight /></Button>`}
      previewClassName="space-y-4"
    >
      {VARIANTS.map((row) => (
        <ButtonRow key={row.variant} {...row} />
      ))}
      <div className="bg-page p-5 shadow-(--shadow-hairline)">
        <p className="mb-4 font-mono text-[12px] text-ink-3">size</p>
        <div className="flex flex-wrap items-end gap-6">
          <StateLabel label='size="sm" · 36px'>
            <Button size="sm">Read the story</Button>
          </StateLabel>
          <StateLabel label='size="default" · 44px'>
            <Button>Read the story</Button>
          </StateLabel>
          <StateLabel label='size="lg" · 52px'>
            <Button size="lg">Read the story</Button>
          </StateLabel>
          <StateLabel label='size="icon" · 44px'>
            <Button size="icon" variant="outline" aria-label="Next story">
              <ArrowRight />
            </Button>
          </StateLabel>
        </div>
      </div>
    </ComponentSpecimen>
  )
}

function ButtonLinkSpecimen() {
  return (
    <ComponentSpecimen
      name="ButtonLink"
      source="components/ui/button.tsx"
      description="A Button that is a link, routed through the site's router — same variants and sizes. A component of its own rather than asChild, so the editor's layers read ButtonLink."
      code={`import { ButtonLink } from "@/components/ui/button"

<ButtonLink href="/stories">All the stories</ButtonLink>
<ButtonLink href="/shop" variant="link">Visit the shop <ArrowRight /></ButtonLink>`}
    >
      <div className="flex flex-wrap items-center gap-5">
        <ButtonLink href="/stories">All the stories</ButtonLink>
        <ButtonLink href="/about" variant="outline">
          About the publication
        </ButtonLink>
        <ButtonLink href="/shop" variant="link">
          Visit the shop <ArrowRight />
        </ButtonLink>
      </div>
    </ComponentSpecimen>
  )
}

/* ─── Badge ───────────────────────────────────────────────────────────── */

function BadgeSpecimen() {
  return (
    <ComponentSpecimen
      name="Badge"
      source="components/ui/badge.tsx"
      description="Small caps on a chip — the one place the corners go fully round. Default for trades and volumes; timber, moss and ink mark a product; outline for a quiet tag."
      code={`import { Badge } from "@/components/ui/badge"

<Badge>Ceramics</Badge>
<Badge variant="timber">New</Badge>
<Badge variant="moss">Members</Badge>`}
    >
      <div className="flex flex-wrap items-start gap-6">
        <StateLabel label="default">
          <Badge>Ceramics</Badge>
        </StateLabel>
        <StateLabel label="ink">
          <Badge variant="ink">Volume 3</Badge>
        </StateLabel>
        <StateLabel label="timber">
          <Badge variant="timber">New</Badge>
        </StateLabel>
        <StateLabel label="moss">
          <Badge variant="moss">Members</Badge>
        </StateLabel>
        <StateLabel label="outline">
          <Badge variant="outline">Last copies</Badge>
        </StateLabel>
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
      description="A field drawn as a single rule, the way a form on paper is: the rule darkens to ink on focus and turns clay when aria-invalid. The serif, at 17px, so typing reads like writing."
      code={`import { Input } from "@/components/ui/input"

<label>
  <span className="type-label text-ink-3">Email</span>
  <Input type="email" placeholder="you@example.com" />
</label>
<Input aria-invalid defaultValue="you@example" />`}
    >
      <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <StateLabel label="live — type here" className="w-full">
          <label className="block w-full">
            <span className="type-label text-ink-3">Your name</span>
            <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Optional" />
          </label>
        </StateLabel>
        <StateLabel label="focus" className="w-full">
          <label className="block w-full">
            <span className="type-label text-ink-3">Email</span>
            <Input placeholder="you@example.com" className="border-ink" />
          </label>
        </StateLabel>
        <StateLabel label="aria-invalid" className="w-full">
          <label className="block w-full">
            <span className="type-label text-ink-3">Email</span>
            <Input aria-invalid defaultValue="you@example" />
            <span className="mt-2 block font-serif text-[14px] text-clay">That address doesn’t look complete — check the part after the @.</span>
          </label>
        </StateLabel>
        <StateLabel label="disabled" className="w-full">
          <label className="block w-full">
            <span className="type-label text-ink-3">Email</span>
            <Input disabled placeholder="you@example.com" />
          </label>
        </StateLabel>
      </div>
    </ComponentSpecimen>
  )
}

function SwitchSpecimen() {
  const [on, setOn] = useState(true)
  return (
    <ComponentSpecimen
      name="Switch"
      source="components/ui/switch.tsx"
      description="Radix switch: an ink track when on, a strong line when off, the paper thumb sliding on the hover curve."
      code={`import { Switch } from "@/components/ui/switch"

<label className="flex items-center gap-3">
  <Switch checked={letters} onCheckedChange={setLetters} />
  Send me the letters by post
</label>`}
    >
      <div className="flex flex-wrap items-start gap-8">
        <StateLabel label={on ? "checked — live" : "unchecked — live"}>
          <label className="flex items-center gap-3 font-serif text-[16px] text-ink">
            <Switch checked={on} onCheckedChange={setOn} />
            Send the letters by post
          </label>
        </StateLabel>
        <StateLabel label="unchecked">
          <Switch checked={false} aria-label="Unchecked" />
        </StateLabel>
        <StateLabel label="checked">
          <Switch checked aria-label="Checked" />
        </StateLabel>
        <StateLabel label="disabled">
          <Switch disabled aria-label="Disabled" />
        </StateLabel>
      </div>
    </ComponentSpecimen>
  )
}

/* ─── Disclosure ──────────────────────────────────────────────────────── */

function TabsSpecimen() {
  const [tab, setTab] = useState("volumes")
  useCanvasAction("Tabs: prints", (next) => setTab((next ?? tab !== "prints") ? "prints" : "volumes"), { on: tab === "prints", group: GROUP })
  return (
    <ComponentSpecimen
      name="Tabs"
      source="components/ui/tabs.tsx"
      description="Radix tabs in two variants: a segmented control on the sheet, and a rule under the active label for filtering a list."
      code={`import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

<Tabs defaultValue="volumes">
  <TabsList variant="line">
    <TabsTrigger value="volumes">Volumes</TabsTrigger>
    <TabsTrigger value="prints">Prints</TabsTrigger>
  </TabsList>
  <TabsContent value="volumes">…</TabsContent>
</Tabs>`}
    >
      <div className="grid gap-10 md:grid-cols-2">
        <StateLabel label='variant="default"' className="w-full">
          <Tabs defaultValue="online" className="w-full">
            <TabsList className="rounded-(--radius-button) bg-sheet">
              <TabsTrigger value="online" className="type-title rounded-(--radius-field) px-3 text-[14px]">
                Online
              </TabsTrigger>
              <TabsTrigger value="print" className="type-title rounded-(--radius-field) px-3 text-[14px]">
                In print
              </TabsTrigger>
            </TabsList>
            <TabsContent value="online" className="pt-3 font-serif text-[16px] text-ink-2">
              A new story every fortnight, free to read.
            </TabsContent>
            <TabsContent value="print" className="pt-3 font-serif text-[16px] text-ink-2">
              Twelve longer stories a volume, once a year.
            </TabsContent>
          </Tabs>
        </StateLabel>
        <StateLabel label='variant="line"' className="w-full">
          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <TabsList variant="line">
              {["volumes", "prints", "letters"].map((value) => (
                <TabsTrigger key={value} value={value} className="type-title px-2 text-[14px] capitalize">
                  {value}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="volumes" className="pt-3 font-serif text-[16px] text-ink-2">
              Three volumes, cloth-bound, sewn.
            </TabsContent>
            <TabsContent value="prints" className="pt-3 font-serif text-[16px] text-ink-2">
              Four photographs on cotton rag, signed.
            </TabsContent>
            <TabsContent value="letters" className="pt-3 font-serif text-[16px] text-ink-2">
              Four letters a year, by post.
            </TabsContent>
          </Tabs>
        </StateLabel>
      </div>
    </ComponentSpecimen>
  )
}

const FAQ = [
  ["signed", "Are the volumes signed?", "The first two hundred copies of each printing carry a card signed by the photographer. After that, they are simply very well made."],
  ["shipping", "Where do you ship from?", "From a bindery outside Porto, in recycled board and paper tape. Everywhere, usually inside a week."],
  ["pitch", "Can I suggest someone?", "Please. Most of the people in these pages were suggested by a reader. Write to us with who they are and what they make."],
] as const

function AccordionSpecimen() {
  const [open, setOpen] = useState<string>("signed")
  useCanvasAction("Accordion: all closed", (next) => setOpen((next ?? open !== "") ? "" : "signed"), { on: open === "", group: GROUP })
  return (
    <ComponentSpecimen
      name="Accordion"
      source="components/ui/accordion.tsx"
      description="Questions set in the serif on strong rules. The plus turns into a cross; the answer opens on the accordion-down curve (220ms) and closes a touch quicker."
      code={`import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

<Accordion type="single" collapsible>
  <AccordionItem value="signed">
    <AccordionTrigger>Are the volumes signed?</AccordionTrigger>
    <AccordionContent>The first two hundred copies…</AccordionContent>
  </AccordionItem>
</Accordion>`}
    >
      <Accordion type="single" collapsible value={open} onValueChange={setOpen} className="max-w-2xl">
        {FAQ.map(([value, q, a]) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger>{q}</AccordionTrigger>
            <AccordionContent>{a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </ComponentSpecimen>
  )
}

function SheetSpecimen() {
  const [open, setOpen] = useState(false)
  useCanvasAction("Sample sheet", (next) => setOpen(next ?? !open), { on: open, group: GROUP })
  return (
    <ComponentSpecimen
      name="Sheet"
      source="components/ui/sheet.tsx"
      description="Radix dialog as a side sheet — the bag and the mobile menu are both one. It slides in on the drawer curve with a soft shadow on its leading edge, traps focus, and closes on Esc or the scrim."
      code={`import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

<Sheet>
  <SheetTrigger asChild><Button variant="outline">Open</Button></SheetTrigger>
  <SheetContent side="right">
    <SheetTitle>Your bag</SheetTitle>
  </SheetContent>
</Sheet>`}
    >
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline">Open the sheet</Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full max-w-sm">
          <SheetHeader className="p-6 pt-8">
            <SheetTitle className="text-[20.35px]">A side sheet</SheetTitle>
            <SheetDescription className="font-serif text-[16px] text-ink-2">The bag opens the same way, from the edge the reader’s hand is nearest.</SheetDescription>
          </SheetHeader>
          <SheetFooter className="p-6">
            <Button onClick={() => setOpen(false)}>Done</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </ComponentSpecimen>
  )
}

function DialogSpecimen() {
  const [open, setOpen] = useState(false)
  useCanvasAction("Sample dialog", (next) => setOpen(next ?? !open), { on: open, group: GROUP })
  return (
    <ComponentSpecimen
      name="Dialog"
      source="components/ui/dialog.tsx"
      description="A modal centred on the page — the story reader is one. Centred, so it scales from the middle (0.96 → 1) over 240ms on the out-curve, on the sheet radius with the float shadow."
      code={`import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

<Dialog>
  <DialogTrigger asChild><Button>Open</Button></DialogTrigger>
  <DialogContent className="max-w-lg p-8">
    <DialogTitle>Suggest a maker</DialogTitle>
    <DialogDescription>…</DialogDescription>
  </DialogContent>
</Dialog>`}
    >
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Open the dialog</Button>
        </DialogTrigger>
        <DialogContent className="max-w-lg p-8 pt-10">
          <DialogTitle>Suggest a maker</DialogTitle>
          <DialogDescription className="mt-3 font-serif text-[16px]">
            Most of the people in these pages were suggested by a reader. Tell us who they are and what they make.
          </DialogDescription>
          <label className="mt-6 block">
            <span className="type-label text-ink-3">Who, and where</span>
            <Input placeholder="A weaver in Bergen…" />
          </label>
          <div className="mt-8 flex flex-wrap justify-end gap-3">
            <DialogClose asChild>
              <Button variant="ghost">Not now</Button>
            </DialogClose>
            <Button onClick={() => setOpen(false)}>Send the suggestion</Button>
          </div>
        </DialogContent>
      </Dialog>
    </ComponentSpecimen>
  )
}

/* ─── Composed ────────────────────────────────────────────────────────── */

function HeadingsSpecimen() {
  return (
    <ComponentSpecimen
      name="SectionTitle · SerifHead"
      source="components/sections/section-title.tsx"
      description="The two section heads. SectionTitle: a medium grotesk title with “View more” in small caps at the far end and a 1px rule under both. SerifHead: the larger serif title with a blurb beside it."
      code={`import { SectionTitle, SerifHead } from "@/components/sections/section-title"

<SectionTitle title="The Makers" href="/stories" />
<SerifHead
  title="Selected Stories"
  blurb="People in their own rooms, told over a few days with each of them."
  href="/stories"
/>`}
      previewClassName="space-y-12"
    >
      <StateLabel label="<SectionTitle /> — hover “View more”" className="w-full">
        <SectionTitle title="The Makers" href="/stories" className="w-full" />
      </StateLabel>
      <StateLabel label="<SerifHead />" className="w-full">
        <SerifHead
          title="Selected Stories"
          blurb="People in their own rooms, told over a few days with each of them — the work, the house, and what one has made of the other."
          href="/stories"
          className="w-full"
        />
      </StateLabel>
    </ComponentSpecimen>
  )
}

function StoryCardSpecimen() {
  const stories = STORIES.slice(0, 3)
  return (
    <ComponentSpecimen
      name="StoryCard"
      source="components/sections/story-card.tsx"
      description="A person: the photograph, “Name, Role” in the serif, the place in small caps. Click to open the reader. The photograph eases up 3% under the pointer over 900ms — slow, so it reads as light shifting."
      code={`import { StoryCard } from "@/components/sections/story-card"

<StoryCard story={story} />
<StoryCard story={story} ratio="wide" />
<StoryCard story={story} ratio="tall" />`}
    >
      <div className="grid gap-x-5 gap-y-8 sm:grid-cols-3">
        {(["portrait", "tall", "wide"] as const).map((ratio, i) => (
          <StateLabel key={ratio} label={`ratio="${ratio}"`} className="w-full">
            <StoryCard story={stories[i]} ratio={ratio} sizes="(min-width: 640px) 30vw, 90vw" />
          </StateLabel>
        ))}
      </div>
    </ComponentSpecimen>
  )
}

function AddToBagSpecimen() {
  return (
    <ComponentSpecimen
      name="AddToBag"
      source="components/sections/add-to-bag.tsx"
      description="“Add to bag” that answers: the label swaps to “Added to bag” with a check (a 180ms vertical swap), the header count nudges, and the bag stays shut so the reader keeps their place. These really add — watch the bag in the header."
      code={`import { AddToBag } from "@/components/sections/add-to-bag"

<AddToBag id="vol-3" edition="moss" price={58} />
<AddToBag id="prints" price={64} variant="outline" size="sm" openBag />`}
      tone="stone"
    >
      <div className="flex flex-wrap items-start gap-6">
        <StateLabel label='variant="ink"'>
          <AddToBag id="vol-3" edition="moss" price={58} />
        </StateLabel>
        <StateLabel label='variant="outline" size="sm"'>
          <AddToBag id="notebook" edition="kraft" price={24} variant="outline" size="sm" />
        </StateLabel>
        <StateLabel label='variant="paper" openBag'>
          <AddToBag id="prints" price={64} variant="paper" openBag />
        </StateLabel>
      </div>
    </ComponentSpecimen>
  )
}

const CLOTHS = Object.keys(CLOTH) as Cloth[]

function ClothPicker({ value, onChange }: { value: Cloth; onChange: (cloth: Cloth) => void }) {
  return (
    <div role="radiogroup" aria-label="Cloth" className="flex flex-wrap gap-2">
      {CLOTHS.map((cloth) => (
        <button
          key={cloth}
          type="button"
          role="radio"
          aria-checked={value === cloth}
          onClick={() => onChange(cloth)}
          className={cn(
            "type-label inline-flex h-11 items-center gap-2 rounded-(--radius-button) px-3 transition-[background-color,box-shadow,transform] duration-(--duration-hover) ease-(--ease-out-strong) active:scale-[0.97] active:duration-(--duration-press)",
            value === cloth ? "bg-raised text-ink shadow-[inset_0_0_0_1px_var(--color-ink)]" : "bg-sheet text-ink-2 hover:bg-line",
          )}
        >
          <span aria-hidden className="size-3.5 rounded-(--radius-chip) shadow-(--shadow-hairline)" style={{ background: CLOTH[cloth].bg }} />
          {CLOTH[cloth].label}
        </button>
      ))}
    </div>
  )
}

function BookObjectSpecimen() {
  const [cloth, setCloth] = useState<Cloth>("moss")
  const [volume, setVolume] = useState<1 | 2 | 3>(3)
  const [draggable, setDraggable] = useState(true)
  const v = VOLUMES.find((x) => x.number === volume)!
  return (
    <ComponentSpecimen
      name="BookObject"
      source="components/mock/book-object.tsx"
      description="A volume as a real object in CSS 3D: front board, spine, page block and back. It turns toward the pointer; with draggable it spins under a drag and springs back to rest — drag it round to read the back. Every knob is a scalar prop."
      code={`import { BookObject } from "@/components/mock/book-object"

<BookObject
  volume={3}
  title="Salt & Timber"
  subtitle="On making at the water's edge"
  cloth="moss"   // "cloth" | "moss" | "clay" | "kraft"
  angle={-22}
  thickness={7}
  draggable
/>`}
      tone="stone"
    >
      <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="mx-auto w-full max-w-[300px] py-6">
          <BookObject volume={volume} title={v.title} subtitle={v.subtitle} cloth={cloth} draggable={draggable} />
        </div>
        <div className="space-y-6">
          <div>
            <p className="type-label mb-2 text-ink-2">Cloth</p>
            <ClothPicker value={cloth} onChange={setCloth} />
          </div>
          <div>
            <p className="type-label mb-2 text-ink-2">Volume</p>
            <div className="flex flex-wrap gap-2">
              {VOLUMES.map((x) => (
                <Button key={x.number} size="sm" variant={volume === x.number ? "ink" : "paper"} aria-pressed={volume === x.number} onClick={() => setVolume(x.number)}>
                  {x.number} · {x.title}
                </Button>
              ))}
            </div>
          </div>
          <label className="flex items-center gap-3 font-serif text-[16px] text-ink">
            <Switch checked={draggable} onCheckedChange={setDraggable} />
            Draggable
          </label>
        </div>
      </div>
    </ComponentSpecimen>
  )
}

function CoverArtSpecimen() {
  return (
    <ComponentSpecimen
      name="CoverArt"
      source="components/mock/cover-art.tsx"
      description="A front cover, drawn rather than photographed: the cloth's weave, the title in the serif, the volume's numeral debossed. Every length is in container units, so the same cover reads at 120px in the bag and 600px on a stage."
      code={`import { CoverArt } from "@/components/mock/cover-art"

<div className="aspect-[4/5] w-48">
  <CoverArt volume={2} title="Slow Hands" cloth="clay" />
</div>
<CoverArt variant="notebook" title="Visit Notebook" cloth="kraft" />`}
      tone="sheet"
    >
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
        {CLOTHS.map((cloth, i) => {
          const v = VOLUMES[i % VOLUMES.length]
          return (
            <StateLabel key={cloth} label={`cloth="${cloth}"`} className="w-full">
              <div className="aspect-[4/5] w-full shadow-(--shadow-book)">
                <CoverArt volume={v.number} title={v.title} subtitle={v.subtitle} cloth={cloth} />
              </div>
            </StateLabel>
          )
        })}
        <StateLabel label='variant="notebook"' className="w-full">
          <div className="aspect-[7/10] w-full shadow-(--shadow-book)">
            <CoverArt variant="notebook" title="Visit Notebook" cloth="kraft" />
          </div>
        </StateLabel>
      </div>
    </ComponentSpecimen>
  )
}

function ProductVisualSpecimen() {
  const [id, setId] = useState("vol-3")
  const product = PRODUCTS.find((p) => p.id === id) ?? PRODUCTS[0]
  return (
    <ComponentSpecimen
      name="ProductVisual · Slipcase · PrintStack · Envelope"
      source="components/mock/product-visual.tsx"
      description="Every product drawn live: the books in 3D, the slipcase in timber (hover lifts Volume 3 out), the prints as a fan that spreads, the membership as an envelope whose letter rises. ProductVisual picks the right one for a product."
      code={`import { Envelope, PrintStack, ProductVisual, Slipcase } from "@/components/mock/product-visual"

<ProductVisual product={productById("vol-3")} edition="moss" draggable />
<Slipcase />
<PrintStack photos={[PHOTOS.houseboats, PHOTOS.loom, PHOTOS.teacup, PHOTOS.cabinLamp]} />
<Envelope />`}
      tone="stone"
      previewClassName="space-y-8"
    >
      <div className="grid items-center gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="mx-auto w-full max-w-[340px] bg-stone-deep">
          <ProductVisual product={product} draggable />
        </div>
        <div>
          <p className="type-label mb-3 text-ink-2">ProductVisual — product</p>
          <div className="flex flex-wrap gap-2">
            {PRODUCTS.map((p) => (
              <Button key={p.id} size="sm" variant={p.id === id ? "ink" : "paper"} aria-pressed={p.id === id} onClick={() => setId(p.id)}>
                {p.kind === "book" ? `Vol. ${p.volume}` : p.kind === "subscription" ? "Membership" : p.kind[0].toUpperCase() + p.kind.slice(1)}
              </Button>
            ))}
          </div>
          <p className="mt-4 font-serif text-[16px] text-ink-2">{product.name}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 border-t border-stone-deep pt-8 sm:grid-cols-3">
        <StateLabel label="<Slipcase />" className="w-full">
          <Slipcase />
        </StateLabel>
        <StateLabel label="<PrintStack />" className="w-full">
          <PrintStack photos={[PHOTOS.houseboats, PHOTOS.loom, PHOTOS.teacup, PHOTOS.cabinLamp]} />
        </StateLabel>
        <StateLabel label="<Envelope />" className="w-full">
          <Envelope />
        </StateLabel>
      </div>
    </ComponentSpecimen>
  )
}

function PostcardSpecimen() {
  const [name, setName] = useState("Maren")
  const [email, setEmail] = useState("maren@example.com")
  const [posted, setPosted] = useState(false)
  useCanvasAction("Postcard posted", (next) => setPosted(next ?? !posted), { on: posted, group: GROUP })
  return (
    <ComponentSpecimen
      name="Postcard"
      source="components/sections/letters-signup.tsx"
      description="The postcard a reader addresses to themselves on the letters band: what they type is written onto the card as they type it, and sending it lands a postmark on a small spring. Type below."
      code={`import { Postcard } from "@/components/sections/letters-signup"

<Postcard name={name} email={email} posted={status === "sent"} />`}
      tone="night"
    >
      <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
        <div className="space-y-6">
          <label className="block">
            <span className="type-label text-night-muted">Your name</span>
            <Input value={name} onChange={(e) => setName(e.target.value)} className="border-night-line text-night-fg focus-visible:border-night-fg" />
          </label>
          <label className="block">
            <span className="type-label text-night-muted">Email</span>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} className="border-night-line text-night-fg focus-visible:border-night-fg" />
          </label>
          <Button variant="night" onClick={() => setPosted((p) => !p)}>
            {posted ? "Take the postmark off" : "Post it"}
          </Button>
        </div>
        <div className="mx-auto w-full max-w-[480px] px-2 py-4">
          <Postcard name={name} email={email} posted={posted} />
        </div>
      </div>
    </ComponentSpecimen>
  )
}

/* ─── Motion components ───────────────────────────────────────────────── */

/** Remounts its child, so a once-only animation can be watched again. */
function Replay({ children }: { children: (key: number) => ReactNode }) {
  const [key, setKey] = useState(0)
  return (
    <div className="flex flex-col items-start gap-5">
      {children(key)}
      <Button variant="quiet" size="sm" onClick={() => setKey((k) => k + 1)}>
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
      description="A row that drifts sideways forever, its content doubled so the loop has no seam. CSS keyframes, so reduced motion and the editor's Motion switch stop it; it pauses under the pointer."
      code={`import { Marquee } from "@/components/motion/marquee"

<Marquee speed={40} direction="left" pauseOnHover>
  {names.map((n) => <span key={n}>{n}</span>)}
</Marquee>`}
      tone="sheet"
      previewClassName="px-0 sm:px-0"
    >
      <Marquee speed={30}>
        {STORIES.slice(0, 8).map((story) => (
          <span key={story.slug} className="flex items-baseline gap-3 pr-10 whitespace-nowrap">
            <span className="type-display text-h3 text-ink">{story.name}</span>
            <span className="type-label text-ink-3">{story.place}</span>
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
      description="A figure that counts to its value the first time it scrolls into view, on the out-curve. Its final value at once for reduced motion and while designing."
      code={`import { CountUp } from "@/components/motion/count-up"

<CountUp value={296} prefix="" decimals={0} duration={1.2} />`}
    >
      <Replay>
        {(key) => (
          <div key={key} className="flex flex-wrap gap-x-12 gap-y-6">
            <div>
              <p className="type-display text-display leading-none text-ink">
                <CountUp value={296} prefix="" decimals={0} />
              </p>
              <p className="type-label mt-3 text-ink-3">Pages in Volume 3</p>
            </div>
            <div>
              <p className="type-display text-display leading-none text-ink">
                <CountUp value={58} prefix="$" decimals={0} duration={0.9} />
              </p>
              <p className="type-label mt-3 text-ink-3">Cloth-bound</p>
            </div>
          </div>
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
      description="Content that rises 24px into place once, as it enters the view, so a section arrives rather than performs. At rest while designing and for reduced motion — nobody styles an invisible element."
      code={`import { Reveal } from "@/components/motion/reveal"

<Reveal y={24} delay={0.08} easing="out">
  <StoryCard story={story} />
</Reveal>`}
    >
      <Replay>
        {(key) => (
          <div key={key} className="grid w-full gap-3 sm:grid-cols-3">
            {["The visit", "The room", "The work"].map((label, i) => (
              <Reveal key={label} delay={i * 0.08} className="border-t border-rule pt-4">
                <p className="type-label text-ink-3">Part {i + 1}</p>
                <p className="type-display mt-2 text-h4 text-ink">{label}</p>
              </Reveal>
            ))}
          </div>
        )}
      </Replay>
    </ComponentSpecimen>
  )
}

function ScrollWordsSpecimen() {
  return (
    <ComponentSpecimen
      name="ScrollWords"
      source="components/motion/scroll-words.tsx"
      description="A sentence that inks itself in, word by word, as it crosses the window — scrubbed to the scroll, so the reading speed is the reader's. Scroll past it. Fully inked while designing and for reduced motion."
      code={`import { ScrollWords } from "@/components/motion/scroll-words"

<ScrollWords
  text="We visit people who make things by hand…"
  dim={0.14}
  className="type-display text-h2"
/>`}
    >
      <ScrollWords
        text="We visit people who make things by hand, stay a few days, and write down what we saw: the work, the room, and what one has made of the other."
        className="type-display max-w-[24ch] text-h2 text-ink"
      />
    </ComponentSpecimen>
  )
}

/* ─── The library ─────────────────────────────────────────────────────── */

export function ComponentLibrary() {
  return (
    <div className="space-y-14">
      <div className="space-y-6">
        <GroupLabel>Primitives — components/ui</GroupLabel>
        <ButtonSpecimen />
        <ButtonLinkSpecimen />
        <BadgeSpecimen />
        <InputSpecimen />
        <SwitchSpecimen />
        <TabsSpecimen />
        <AccordionSpecimen />
        <SheetSpecimen />
        <DialogSpecimen />
      </div>
      <div className="space-y-6">
        <GroupLabel>Composed — components/sections</GroupLabel>
        <HeadingsSpecimen />
        <StoryCardSpecimen />
        <AddToBagSpecimen />
        <PostcardSpecimen />
      </div>
      <div className="space-y-6">
        <GroupLabel>Drawn objects — components/mock</GroupLabel>
        <BookObjectSpecimen />
        <CoverArtSpecimen />
        <ProductVisualSpecimen />
      </div>
      <div className="space-y-6">
        <GroupLabel>Motion — components/motion</GroupLabel>
        <RevealSpecimen />
        <ScrollWordsSpecimen />
        <CountUpSpecimen />
        <MarqueeSpecimen />
      </div>
    </div>
  )
}
