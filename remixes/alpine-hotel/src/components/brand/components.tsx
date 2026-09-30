import { useState, type ComponentType } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { addDays, startOfToday } from "date-fns"
import { ArrowRight, Loader2, Menu } from "lucide-react"
import type { DateRange } from "react-day-picker"

import { ComponentSpecimen, StateLabel } from "@/components/brand/specimen"
import { DateRangeField, GuestsField, RoomField } from "@/components/booking/fields"
import { Reveal } from "@/components/motion/reveal"
import { TextClipParallax } from "@/components/motion/text-clip-parallax"
import { Around, TrailMap } from "@/components/sections/around"
import { Arriving } from "@/components/sections/arriving"
import { AvailabilityLine, Cover } from "@/components/sections/cover"
import { Day } from "@/components/sections/day"
import { Faq, FaqQuestion } from "@/components/sections/faq"
import { GuestBook } from "@/components/sections/guest-book"
import { House } from "@/components/sections/house"
import { RateRow, Rooms } from "@/components/sections/rooms"
import { Reserve } from "@/components/sections/reserve"
import { SeasonTag, Seasons } from "@/components/sections/seasons"
import { SiteHeader } from "@/components/site-header"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Chapter } from "@/components/ui/chapter"
import { Container } from "@/components/ui/container"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "@/components/ui/popover"
import { Print } from "@/components/ui/print"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Stamp } from "@/components/ui/stamp"
import { Textarea } from "@/components/ui/textarea"
import { TornEdge } from "@/components/ui/torn-edge"
import { Wordmark } from "@/components/ui/wordmark"
import { cover, faqs, firstTracks, house, rooms, seasons, spots } from "@/content"
import { cn } from "@/lib/utils"

/* ─── Button ──────────────────────────────────────────────────────────── */

const VARIANTS = ["default", "signal", "outline", "outline-light", "ghost", "link", "secondary", "destructive"] as const
const SIZES = ["sm", "default", "lg", "icon-sm", "icon"] as const

/** Hover and focus drawn on, so both can be seen without a pointer. */
const HOVER: Record<(typeof VARIANTS)[number], string> = {
  default: "bg-ink-soft",
  signal: "bg-signal-deep",
  outline: "bg-ink text-paper",
  "outline-light": "border-pine-ink bg-pine-ink/10",
  ghost: "bg-paper-deep",
  link: "decoration-ink",
  secondary: "bg-paper-edge",
  destructive: "bg-signal-deep",
}
const FOCUS = "ring-[3px] ring-signal/35"

export function ButtonSpecimen() {
  return (
    <ComponentSpecimen
      name="Button"
      source="components/ui/button.tsx"
      description="shadcn’s button on a cva recipe, squared to the 3px control radius. Ink for the plain action, signal red for Reserve and nothing else, outlines on paper and on pine. Press is a 0.97 scale in 140ms; focus is a soft red ring."
      code={`import { Button } from "@/components/ui/button"

<Button variant="signal" size="lg">Reserve a room</Button>
<Button size="lg">See rooms & rates <ArrowRight /></Button>
<Button variant="outline">Start another card</Button>`}
      previewClassName="p-0 sm:p-0"
    >
      {VARIANTS.map((variant) => (
        <div
          key={variant}
          className={cn(
            "flex flex-wrap items-end gap-x-6 gap-y-4 border-b border-rule p-5 sm:p-8",
            variant === "outline-light" && "bg-pine [&_.label]:text-pine-ink/60",
          )}
        >
          <span className="label w-full text-ink-faint sm:w-28">{variant}</span>
          <StateLabel label="default">
            <Button variant={variant}>Reserve</Button>
          </StateLabel>
          <StateLabel label="hover">
            <Button variant={variant} className={HOVER[variant]}>
              Reserve
            </Button>
          </StateLabel>
          <StateLabel label="focus">
            <Button variant={variant} className={FOCUS}>
              Reserve
            </Button>
          </StateLabel>
          <StateLabel label="disabled">
            <Button variant={variant} disabled>
              Reserve
            </Button>
          </StateLabel>
          <StateLabel label="with icon">
            <Button variant={variant}>
              See rates <ArrowRight />
            </Button>
          </StateLabel>
        </div>
      ))}
      <div className="flex flex-wrap items-end gap-6 p-5 sm:p-8">
        <span className="label w-full text-ink-faint sm:w-28">sizes</span>
        {SIZES.map((size) => (
          <StateLabel key={size} label={size}>
            <Button size={size} aria-label={size.startsWith("icon") ? "Open menu" : undefined} variant={size.startsWith("icon") ? "ghost" : "default"}>
              {size.startsWith("icon") ? <Menu /> : "Reserve"}
            </Button>
          </StateLabel>
        ))}
        <StateLabel label="loading">
          <Button variant="signal" size="lg" disabled>
            <Loader2 className="animate-spin" /> Sending
          </Button>
        </StateLabel>
        <StateLabel label="asChild — an anchor">
          <Button asChild variant="outline">
            <a href="#components">As a link</a>
          </Button>
        </StateLabel>
      </div>
    </ComponentSpecimen>
  )
}

/* ─── Form controls ───────────────────────────────────────────────────── */

const LINE =
  "h-11 rounded-none border-0 border-b border-ink bg-transparent px-0 font-serif text-[1.0625rem] shadow-none placeholder:text-ink-faint focus-visible:border-signal focus-visible:ring-0 aria-invalid:border-signal"

const schema = z.object({
  name: z.string().min(2, "Please write your name."),
  email: z.string().email("That email doesn't look right."),
})

/** The registration card's fields on their own: blanks on a rule, with the
 *  validation the card uses. */
function FormDemo() {
  const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema), defaultValues: { name: "", email: "" } })
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle")
  const submit = async () => {
    setStatus("sending")
    await new Promise((r) => setTimeout(r, 900))
    setStatus("sent")
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} noValidate className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="gap-1">
              <FormLabel className="label font-normal text-ink-faint">Full name</FormLabel>
              <FormControl>
                <Input {...field} autoComplete="name" className={LINE} />
              </FormControl>
              <FormMessage className="text-signal" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="gap-1">
              <FormLabel className="label font-normal text-ink-faint">Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" autoComplete="email" className={LINE} />
              </FormControl>
              <FormDescription className="text-[13px] text-ink-faint">The confirmation goes here.</FormDescription>
              <FormMessage className="text-signal" />
            </FormItem>
          )}
        />
        <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
          <Button type="submit" variant="signal" disabled={status === "sending"}>
            {status === "sending" ? (
              <>
                <Loader2 className="animate-spin" /> Sending
              </>
            ) : status === "sent" ? (
              "Sent — send again"
            ) : (
              "Send the card"
            )}
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              form.reset()
              setStatus("idle")
            }}
          >
            Clear
          </Button>
          <span className="text-[13px] text-ink-faint">Send it empty to see the errors.</span>
        </div>
      </form>
    </Form>
  )
}

export function FieldsSpecimen() {
  return (
    <ComponentSpecimen
      name="Input, Textarea, Label and Form"
      source="components/ui/input.tsx · textarea.tsx · label.tsx · form.tsx"
      description="shadcn’s fields, set as blanks on a printed card: no box, a rule to write on in the serif, red when focused or wrong. Form wires react-hook-form and zod to labels and messages."
      code={`<FormField control={form.control} name="name" render={({ field }) => (
  <FormItem className="gap-1">
    <FormLabel className="label font-normal text-ink-faint">Full name</FormLabel>
    <FormControl><Input {...field} className={line} /></FormControl>
    <FormMessage className="text-signal" />
  </FormItem>
)} />`}
    >
      <div className="space-y-10">
        <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          <StateLabel label="default" className="[&>div]:w-full">
            <div className="grid w-full gap-1">
              <Label htmlFor="b-in-1" className="label font-normal text-ink-faint">
                Full name
              </Label>
              <Input id="b-in-1" placeholder="Anna Perren" className={LINE} />
            </div>
          </StateLabel>
          <StateLabel label="focus" className="[&>div]:w-full">
            <div className="grid w-full gap-1">
              <Label htmlFor="b-in-2" className="label font-normal text-ink-faint">
                Email
              </Label>
              <Input id="b-in-2" defaultValue="anna@example.ch" className={cn(LINE, "border-signal")} />
            </div>
          </StateLabel>
          <StateLabel label="error" className="[&>div]:w-full">
            <div className="grid w-full gap-1">
              <Label htmlFor="b-in-3" className="label font-normal text-ink-faint">
                Email
              </Label>
              <Input id="b-in-3" defaultValue="anna@" aria-invalid className={LINE} />
              <p className="text-sm text-signal">That email doesn’t look right.</p>
            </div>
          </StateLabel>
          <StateLabel label="disabled" className="[&>div]:w-full">
            <div className="grid w-full gap-1">
              <Label htmlFor="b-in-4" className="label font-normal text-ink-faint">
                Card no.
              </Label>
              <Input id="b-in-4" defaultValue="02604" disabled className={LINE} />
            </div>
          </StateLabel>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          <StateLabel label="Textarea — ruled, as on the card" className="[&>div]:w-full">
            <div className="grid w-full gap-1">
              <Label htmlFor="b-ta" className="label font-normal text-ink-faint">
                Anything we should know
              </Label>
              <Textarea
                id="b-ta"
                rows={3}
                placeholder="Ski sizes, a cot, a table for a birthday…"
                className={cn(LINE, "h-auto min-h-24 resize-none bg-[repeating-linear-gradient(transparent,transparent_2.2rem,var(--color-rule)_2.2rem,var(--color-rule)_calc(2.2rem+1px))] leading-[2.2rem]")}
              />
            </div>
          </StateLabel>
          <StateLabel label="shadcn defaults — Input, Textarea" className="[&>div]:w-full">
            <div className="grid w-full gap-3">
              <Input placeholder="Boxed input" />
              <Textarea placeholder="Boxed textarea" />
            </div>
          </StateLabel>
        </div>
        <div className="border-t border-ink pt-6">
          <p className="label mb-5 text-ink-faint">Form — live, with validation and loading</p>
          <FormDemo />
        </div>
      </div>
    </ComponentSpecimen>
  )
}

export function BookingSpecimen() {
  const [range, setRange] = useState<DateRange | undefined>({ from: addDays(startOfToday(), 14), to: addDays(startOfToday(), 18) })
  const [empty, setEmpty] = useState<DateRange | undefined>()
  const [guests, setGuests] = useState("2")
  const [room, setRoom] = useState("")
  return (
    <ComponentSpecimen
      name="DateRangeField, GuestsField, RoomField"
      source="components/booking/fields.tsx"
      description="The fill-in lines on the cover and the card: a range calendar in a popover, and two selects. Light on paper, dark on pine; red when something is missing. The date picker is also the “Date picker” action (group Booking)."
      code={`<DateRangeField value={range} onChange={setRange} />
<GuestsField value={guests} onChange={setGuests} />
<RoomField value={room} onChange={setRoom} invalid={!room} />`}
      previewClassName="p-0 sm:p-0"
    >
      <div className="grid gap-x-8 gap-y-6 p-5 sm:grid-cols-2 sm:p-8 lg:grid-cols-4">
        <StateLabel label="dates — filled" className="[&>*]:w-full">
          <DateRangeField value={range} onChange={setRange} />
        </StateLabel>
        <StateLabel label="dates — empty, invalid" className="[&>*]:w-full">
          <DateRangeField value={empty} onChange={setEmpty} invalid />
        </StateLabel>
        <StateLabel label="guests" className="[&>*]:w-full">
          <GuestsField value={guests} onChange={setGuests} />
        </StateLabel>
        <StateLabel label="room — placeholder" className="[&>*]:w-full">
          <RoomField value={room} onChange={setRoom} />
        </StateLabel>
      </div>
      <div className="grid gap-x-8 gap-y-6 bg-pine p-5 sm:grid-cols-2 sm:p-8 [&_.label]:text-pine-ink/60">
        <StateLabel label="tone dark — dates" className="[&>*]:w-full">
          <DateRangeField value={range} onChange={setRange} tone="dark" />
        </StateLabel>
        <StateLabel label="tone dark — guests" className="[&>*]:w-full">
          <GuestsField value={guests} onChange={setGuests} tone="dark" />
        </StateLabel>
      </div>
    </ComponentSpecimen>
  )
}

/* ─── Sections, one at a time ─────────────────────────────────────────── */

const SECTIONS: { id: string; label: string; Section: ComponentType; note?: string }[] = [
  { id: "cover", label: "Cover", Section: Cover },
  { id: "house", label: "House", Section: House },
  {
    id: "seasons",
    label: "Seasons",
    Section: Seasons,
    note: "Pinned for three and a half screens: scroll on through it. “Show split cards” (group Valley) jumps to the end.",
  },
  { id: "day", label: "Day", Section: Day },
  { id: "rooms", label: "Rooms", Section: Rooms },
  { id: "around", label: "Around", Section: Around },
  { id: "arriving", label: "Arriving", Section: Arriving },
  { id: "guest-book", label: "Guest book", Section: GuestBook },
  { id: "faq", label: "FAQ", Section: Faq },
  { id: "reserve", label: "Reserve", Section: Reserve, note: "Send it empty for the errors, or fill it for the stamp." },
]

export function SectionViewer() {
  const [current, setCurrent] = useState(SECTIONS[0].id)
  const entry = SECTIONS.find((s) => s.id === current) ?? SECTIONS[0]
  const Section = entry.Section
  return (
    <ComponentSpecimen
      name="The sections"
      source="components/sections/*"
      description="Every chapter of the guide, live, exactly as the home page renders it — one at a time, with the page’s own content and props (title, lede…). Pick one."
      code={`<Rooms title="Four kinds of room, one price list." lede="…" />
<Reserve title="Ask for a room." />`}
      previewClassName="p-0 sm:p-0"
      bleed
    >
      <div role="tablist" aria-label="Section" className="flex flex-wrap gap-2 border-b border-rule bg-sheet p-4 sm:px-8">
        {SECTIONS.map((s) => (
          <Button
            key={s.id}
            role="tab"
            aria-selected={s.id === current}
            size="sm"
            variant={s.id === current ? "default" : "outline"}
            onClick={() => setCurrent(s.id)}
          >
            {s.label}
          </Button>
        ))}
      </div>
      {entry.note && <p className="border-b border-rule px-5 py-3 font-serif text-lg text-ink-soft italic sm:px-8">{entry.note}</p>}
      <div key={entry.id} className="bg-paper pt-10">
        <Section />
      </div>
    </ComponentSpecimen>
  )
}

/* ─── The library ─────────────────────────────────────────────────────── */

export function ComponentLibrary() {
  const [active, setActive] = useState(rooms[1].id)
  const [spot, setSpot] = useState(spots[0].id)
  return (
    <div className="space-y-10">
      <ButtonSpecimen />

      <ComponentSpecimen
        name="Chapter"
        source="components/ui/chapter.tsx"
        description="How every section opens: a numbered label on a rule, the title in the serif, an optional lede beside it. Ink on paper, or light on pine."
        code={`<Chapter number="04" label="Rooms & rates" title="Four kinds of room, one price list." lede="…" />`}
        previewClassName="p-0 sm:p-0"
      >
        <div className="p-5 sm:p-8">
          <Chapter number="04" label="Rooms & rates" title="Four kinds of room, one price list." lede="No packages and no dynamic pricing. What it says here is what it costs." />
        </div>
        <div className="bg-pine p-5 sm:p-8">
          <Chapter number="06" label="Arriving & included" title="No cars in Zermatt." tone="light" />
        </div>
      </ComponentSpecimen>

      <div className="grid items-start gap-10 lg:grid-cols-2">
        <ComponentSpecimen
          name="Wordmark"
          source="components/ui/wordmark.tsx"
          description="The house’s name as it is painted over the door, with the year set small beside it."
          code={`<Wordmark />
<Wordmark name="Arven" since="1911" />`}
        >
          <div className="flex flex-wrap items-end gap-10">
            <StateLabel label="default">
              <Wordmark />
            </StateLabel>
            <StateLabel label="large">
              <Wordmark className="[&>span:first-child]:text-4xl" />
            </StateLabel>
          </div>
        </ComponentSpecimen>

        <ComponentSpecimen
          name="Stamp"
          source="components/ui/stamp.tsx"
          description="A rubber stamp in signal red, its ink broken up so it reads as pressed. Ring, three lines and a rotation are props."
          code={`<Stamp />
<Stamp ring="Received · Hotel Arven · " top="Front desk" middle="12.1." bottom="Zermatt" rotate={9} />`}
        >
          <div className="flex flex-wrap items-center gap-8">
            <StateLabel label="the house">
              <Stamp className="w-32" />
            </StateLabel>
            <StateLabel label="received">
              <Stamp ring="Received · Hotel Arven · " top="Front desk" middle="12.1." bottom="Zermatt" rotate={9} className="w-32" />
            </StateLabel>
          </div>
        </ComponentSpecimen>

        <ComponentSpecimen
          name="Print"
          source="components/ui/print.tsx"
          description="A photograph printed with a white border, lying on the page, with a numbered caption. Six ratios."
          code={`<Print src={src} alt="…" fig="2" caption="The east wing in January." ratio="4/3" />`}
        >
          <div className="grid grid-cols-2 gap-5">
            <Print src={house.image} alt={house.imageAlt} fig="2" caption={house.caption} ratio="4/3" />
            <Print src={cover.image} alt={cover.imageAlt} fig="1" ratio="3/4" />
          </div>
        </ComponentSpecimen>

        <ComponentSpecimen
          name="TornEdge"
          source="components/ui/torn-edge.tsx"
          description="The ragged edge of the next sheet, in its colour. Four tones, a seed for the tear, and flip for the bottom."
          code={`<TornEdge tone="pine" seed={5} className="-mb-px" />
<TornEdge tone="paper-deep" seed={23} flip className="-mt-px" />`}
          previewClassName="p-0 sm:p-0"
        >
          <div className="space-y-6 py-6">
            {(["pine", "paper-deep", "sheet"] as const).map((tone, i) => (
              <StateLabel key={tone} label={`tone="${tone}"${i === 1 ? " · flip" : ""}`} className="w-full px-5 sm:px-8 [&>div]:w-full">
                <div className="w-full">
                  {i !== 1 && <TornEdge tone={tone} seed={3 + i * 7} className="-mb-px" />}
                  <div className={cn("h-8", tone === "pine" && "bg-pine", tone === "paper-deep" && "bg-paper-deep", tone === "sheet" && "bg-sheet")} />
                  {i === 1 && <TornEdge tone={tone} seed={23} flip className="-mt-px" />}
                </div>
              </StateLabel>
            ))}
          </div>
        </ComponentSpecimen>

        <ComponentSpecimen
          name="Container"
          source="components/ui/container.tsx"
          description="Centres every section at 84rem with a 20 / 32 / 40px gutter. Marked data-canvas-ignore, so the editor clicks through it."
          code={`<Container className="pb-8">…</Container>`}
          previewClassName="p-0 sm:p-0"
        >
          <Container className="border-x border-dashed border-signal/50 py-6">
            <div className="bg-sheet p-4 text-center font-mono text-[12px] text-ink-soft shadow-(--shadow-print)">max-w-[84rem] · px-5 sm:px-8 lg:px-10</div>
          </Container>
        </ComponentSpecimen>

        <ComponentSpecimen
          name="Reveal"
          source="components/motion/reveal.tsx"
          description="Fades and lifts its content the first time it scrolls into view; delay staggers siblings. Holds its end state in the editor and under reduced motion."
          code={`<Reveal delay={0.06} distance={24}>…</Reveal>`}
        >
          <ReplayReveal />
        </ComponentSpecimen>
      </div>

      <FieldsSpecimen />
      <BookingSpecimen />

      <div className="grid items-start gap-10 lg:grid-cols-2">
        <ComponentSpecimen
          name="Select"
          source="components/ui/select.tsx"
          description="shadcn’s select on Radix: trigger, grouped items, a label and a separator."
          code={`<Select>
  <SelectTrigger><SelectValue placeholder="Choose one" /></SelectTrigger>
  <SelectContent>
    <SelectItem value="train">Train to Zermatt</SelectItem>
  </SelectContent>
</Select>`}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <StateLabel label="default" className="[&>*]:w-full">
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Arriving by" />
                </SelectTrigger>
                <SelectContent position="popper" className="rounded-print bg-sheet">
                  <SelectGroup>
                    <SelectLabel>Rail</SelectLabel>
                    <SelectItem value="train">Train to Zermatt</SelectItem>
                  </SelectGroup>
                  <SelectSeparator />
                  <SelectGroup>
                    <SelectLabel>Road</SelectLabel>
                    <SelectItem value="car">Car, parking in Täsch</SelectItem>
                    <SelectItem value="transfer">Transfer from the airport</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </StateLabel>
            <StateLabel label="disabled" className="[&>*]:w-full">
              <Select disabled>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Arriving by" />
                </SelectTrigger>
                <SelectContent />
              </Select>
            </StateLabel>
          </div>
        </ComponentSpecimen>

        <ComponentSpecimen
          name="Popover and Calendar"
          source="components/ui/popover.tsx · calendar.tsx"
          description="shadcn’s popover and react-day-picker calendar, on a sheet with the sheet shadow. Past days are disabled."
          code={`<Popover>
  <PopoverTrigger asChild><Button variant="outline">Opening days</Button></PopoverTrigger>
  <PopoverContent>…</PopoverContent>
</Popover>
<Calendar mode="range" selected={range} onSelect={setRange} />`}
        >
          <div className="flex flex-col items-start gap-5">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Opening days</Button>
              </PopoverTrigger>
              <PopoverContent className="rounded-print border-rule bg-sheet shadow-(--shadow-sheet)">
                <PopoverHeader>
                  <PopoverTitle className="font-serif text-lg">Winter 2026/27</PopoverTitle>
                  <PopoverDescription>Opens 29 November; the desk is staffed 8:00–21:00.</PopoverDescription>
                </PopoverHeader>
              </PopoverContent>
            </Popover>
            <div className="max-w-full overflow-x-auto rounded-print bg-sheet shadow-(--shadow-print)">
              <Calendar
                mode="range"
                selected={{ from: addDays(startOfToday(), 3), to: addDays(startOfToday(), 7) }}
                defaultMonth={addDays(startOfToday(), 3)}
                disabled={{ before: startOfToday() }}
                className="bg-transparent"
              />
            </div>
          </div>
        </ComponentSpecimen>

        <ComponentSpecimen
          name="Sheet"
          source="components/ui/sheet.tsx"
          description="shadcn’s sheet. The header’s chapter list on phones (the “Mobile menu” action)."
          code={`<Sheet>
  <SheetTrigger asChild><Button variant="ghost" size="icon-sm"><Menu /></Button></SheetTrigger>
  <SheetContent side="right">…</SheetContent>
</Sheet>`}
        >
          <div className="flex flex-wrap gap-3">
            {(["right", "left", "bottom"] as const).map((side) => (
              <Sheet key={side}>
                <SheetTrigger asChild>
                  <Button variant="outline">Open {side}</Button>
                </SheetTrigger>
                <SheetContent side={side} className="border-rule bg-paper text-ink">
                  <SheetHeader>
                    <SheetTitle>
                      <Wordmark />
                    </SheetTitle>
                    <SheetDescription>A sheet from the {side}.</SheetDescription>
                  </SheetHeader>
                  <SheetFooter>
                    <Button variant="signal">Reserve</Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            ))}
          </div>
        </ComponentSpecimen>

        <ComponentSpecimen
          name="Accordion and FaqQuestion"
          source="components/ui/accordion.tsx · sections/faq.tsx"
          description="shadcn’s accordion. The page opens questions with FaqQuestion — a serif row whose plus turns to a cross; the plain AccordionTrigger is shown last."
          code={`<Accordion type="single" collapsible>
  <AccordionItem value="q0">
    <FaqQuestion question="Can we check in early?" />
    <AccordionContent>…</AccordionContent>
  </AccordionItem>
</Accordion>`}
        >
          <Accordion type="single" collapsible defaultValue="q0" className="border-t border-ink">
            {faqs.slice(0, 2).map((f, i) => (
              <AccordionItem key={f.q} value={`q${i}`} className="border-rule">
                <FaqQuestion question={f.q} />
                <AccordionContent className="pb-6 text-base leading-relaxed text-ink-soft">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
            <AccordionItem value="plain" className="border-rule">
              <AccordionTrigger>AccordionTrigger (shadcn default)</AccordionTrigger>
              <AccordionContent className="text-ink-soft">{faqs[2]?.a}</AccordionContent>
            </AccordionItem>
          </Accordion>
        </ComponentSpecimen>
      </div>

      <ComponentSpecimen
        name="SiteHeader"
        source="components/site-header.tsx"
        description="The masthead: wordmark, the chapters, one red button, on its own strip of paper over a double rule. Below 1024px the chapters move into a Sheet. The footer at the bottom of this page is the live SiteFooter."
        code={`<SiteHeader cta="Reserve" />`}
        previewClassName="p-0 sm:p-0"
      >
        <SiteHeader />
      </ComponentSpecimen>

      <ComponentSpecimen
        name="AvailabilityLine"
        source="components/sections/cover.tsx"
        description="“Staying … for … guests” — a sentence with blanks to fill, sending you on to the rate card. Shares its dates and guests with the card through BookingContext."
        code={`<AvailabilityLine cta="See rooms & rates" />`}
      >
        <div className="-mt-14">
          <AvailabilityLine />
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen
        name="RateRow"
        source="components/sections/rooms.tsx"
        description="One room on the rate card. Rows lift to paper deep when in hand; “Chosen” appears once a room is picked; with dates set, the winter rate shows the stay’s total. On phones each row stacks with its photograph."
        code={`<RateRow room={room} active={active} chosen={chosen} nights={nights} onFocus={…} onReserve={…} />`}
      >
        <table className="w-full border-collapse text-left">
          <tbody className="border-t border-ink">
            {rooms.map((r, i) => (
              <RateRow key={r.id} room={r} active={active === r.id} chosen={i === 2} nights={i === 3 ? 4 : 0} onFocus={() => setActive(r.id)} onReserve={() => setActive(r.id)} />
            ))}
          </tbody>
        </table>
        <p className="label mt-4 text-ink-faint">States: active (row 2) · chosen (row 3) · with 4 nights (row 4)</p>
      </ComponentSpecimen>

      <div className="grid items-start gap-10 lg:grid-cols-2">
        <ComponentSpecimen
          name="TrailMap"
          source="components/sections/around.tsx"
          description="The drawn map: contours, the river, the railway, the house, and a numbered pin per spot. Point at a pin to make it the active one."
          code={`<TrailMap active={active} onPick={setActive} />`}
        >
          <TrailMap active={spot} onPick={setSpot} />
        </ComponentSpecimen>

        <ComponentSpecimen
          name="SeasonTag"
          source="components/sections/seasons.tsx"
          description="The paper tag pinned to each panel of the season film."
          code={`<SeasonTag dates="Dec — Apr" title="Winter" note="…" />`}
          previewClassName="bg-pine"
        >
          <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {seasons.cards.map((card) => (
              <SeasonTag key={card.title} {...card} />
            ))}
          </div>
        </ComponentSpecimen>
      </div>

      <ComponentSpecimen
        name="TextClipParallax"
        source="components/motion/text-clip-parallax.tsx"
        description="Two lines of display type with a film running inside the letters; on scroll the footage drifts against the page and the lines slide apart. Halved on phones, still under reduced motion. The words stay real text."
        code={`<TextClipParallax lineOne="First" lineTwo="tracks" src={film.src} poster={film.poster} parallax={160} drift={120} tone="paper-deep" />`}
        previewClassName="p-0 sm:p-0 bg-paper-deep"
      >
        <TextClipParallax lineOne={firstTracks.lineOne} lineTwo={firstTracks.lineTwo} src={firstTracks.film.src} poster={firstTracks.film.poster} tone="paper-deep" />
      </ComponentSpecimen>

      <SectionViewer />

      <p className="border-t border-ink pt-4 font-serif text-lg leading-relaxed text-ink-soft italic">
        VideoZoomSplit — the pinned season film — runs inside Seasons above, since it only makes sense at the size of
        the screen. SmoothScroll and BookingProvider wrap the page and draw nothing of their own.
      </p>
    </div>
  )
}

function ReplayReveal() {
  const [key, setKey] = useState(0)
  return (
    <div className="flex flex-col items-start gap-5">
      <div key={key} className="grid w-full grid-cols-3 gap-3">
        {[0, 1, 2].map((i) => (
          <Reveal key={i} delay={i * 0.06}>
            <div className="h-20 rounded-print bg-sheet shadow-(--shadow-print)" />
          </Reveal>
        ))}
      </div>
      <Button variant="outline" size="sm" onClick={() => setKey((k) => k + 1)}>
        Replay
      </Button>
    </div>
  )
}
