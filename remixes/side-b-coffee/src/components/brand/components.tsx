import { useState } from "react"
import { ShoppingBag } from "lucide-react"

import { ComponentSpecimen, StateLabel } from "@/components/brand/specimen"
import { Arrows } from "@/components/blocks/arrows"
import { CoffeeCard } from "@/components/blocks/coffee-card"
import { FlavorDial, RoastBar } from "@/components/blocks/flavor"
import { SectionHeading } from "@/components/blocks/section-heading"
import { Sticker } from "@/components/blocks/sticker"
import { CoffeeBag } from "@/components/mock/coffee-bag"
import { MerchArt } from "@/components/mock/merch-art"
import { Turntable } from "@/components/mock/turntable"
import { PhotoCarousel } from "@/components/motion/photo-carousel"
import { EqBars, MusicPlayer } from "@/components/site/now-playing"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { COFFEES, MERCH, type LabelTone } from "@/content/products"
import { cart } from "@/lib/cart"
import { PHOTOS } from "@/lib/photos"
import { quickView } from "@/lib/quick-view"
import { radio, useRadio } from "@/lib/radio"

const VARIANTS = ["rust", "ember", "honey", "sky", "ink", "paper", "outline", "ghost", "link"] as const
const SIZES = ["chip", "sm", "default", "lg"] as const
const TONES: LabelTone[] = ["honey", "sky", "moss", "lilac", "ember", "paper"]

function Buttons() {
  return (
    <ComponentSpecimen
      name="Button"
      source="components/ui/button.tsx"
      description="Printed labels: mono caps, 3px shoulders, a shaded lower edge. Hover darkens one step, press sinks to 0.97. Rust is the one to press; ember, honey and sky label cards; paper sits on photos."
      code={`import { Button, ButtonLink } from "@/components/ui/button"

<Button>Add to cart</Button>
<Button variant="sky" size="chip">Quick view</Button>
<ButtonLink href="/shop" variant="paper">Shop coffee</ButtonLink>`}
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-end gap-4">
          {VARIANTS.map((v) => (
            <StateLabel key={v} label={v}>
              <Button variant={v}>{v === "link" ? "Read more" : "Add to cart"}</Button>
            </StateLabel>
          ))}
        </div>
        <div className="flex flex-wrap items-end gap-4 border-t border-line pt-6">
          {SIZES.map((s) => (
            <StateLabel key={s} label={`size ${s}`}>
              <Button size={s}>Quick view</Button>
            </StateLabel>
          ))}
          <StateLabel label="size icon">
            <Button size="icon" variant="outline" aria-label="Cart">
              <ShoppingBag />
            </Button>
          </StateLabel>
          <StateLabel label="disabled">
            <Button disabled>Sold out</Button>
          </StateLabel>
          <StateLabel label="focus (tab to it)">
            <Button variant="outline">Tab here</Button>
          </StateLabel>
        </div>
      </div>
    </ComponentSpecimen>
  )
}

function Toggles() {
  const [size, setSize] = useState("12oz")
  const [grind, setGrind] = useState("Whole bean")
  return (
    <ComponentSpecimen
      name="ToggleGroup"
      source="components/ui/toggle-group.tsx"
      description="shadcn's toggle group, restyled: the chosen option fills with ink. Joined for sizes, spaced for grinds."
      code={`<ToggleGroup type="single" variant="outline" value={size} onValueChange={(v) => v && setSize(v)}>
  <ToggleGroupItem value="12oz">12 oz</ToggleGroupItem>
  <ToggleGroupItem value="2lb">2 lb</ToggleGroupItem>
</ToggleGroup>`}
    >
      <div className="flex flex-col gap-6">
        <StateLabel label={`joined · ${size}`} className="w-full max-w-md">
          <ToggleGroup type="single" variant="outline" value={size} onValueChange={(v) => v && setSize(v)} className="w-full">
            {["12oz", "2lb", "5lb"].map((v) => (
              <ToggleGroupItem key={v} value={v} className="h-10 flex-1">
                {v.replace("oz", " oz").replace("lb", " lb")}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </StateLabel>
        <StateLabel label={`spaced · ${grind}`}>
          <ToggleGroup type="single" variant="outline" spacing={1} value={grind} onValueChange={(v) => v && setGrind(v)} className="flex flex-wrap">
            {["Whole bean", "Espresso", "Pour-over", "French press"].map((g) => (
              <ToggleGroupItem key={g} value={g} className="h-9 normal-case">
                {g}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </StateLabel>
      </div>
    </ComponentSpecimen>
  )
}

function Inputs() {
  return (
    <ComponentSpecimen
      name="Input"
      source="components/ui/input.tsx"
      description="44px tall on a raised cream fill with a strong hairline. Invalid turns the edge rust and the hint underneath says how to fix it."
      code={`<Input placeholder="you@yourcafe.com" aria-invalid={!!error} />
{error && <span className="text-[12.5px] text-rust">{error}</span>}`}
    >
      <div className="grid gap-6 sm:grid-cols-3">
        <StateLabel label="default" className="w-full">
          <Input placeholder="Ada Okafor" aria-label="Default" />
        </StateLabel>
        <StateLabel label="invalid" className="w-full">
          <Input defaultValue="ada@" aria-invalid aria-label="Invalid" />
          <span className="text-[12.5px] text-rust">An email we can reply to, like you@yourcafe.com.</span>
        </StateLabel>
        <StateLabel label="disabled" className="w-full">
          <Input placeholder="Roasted Tuesday" disabled aria-label="Disabled" />
        </StateLabel>
      </div>
    </ComponentSpecimen>
  )
}

function Stickers() {
  return (
    <ComponentSpecimen
      name="Sticker"
      source="components/blocks/sticker.tsx"
      description="A round printed sticker on the corner of a new or limited coffee. The ring of words turns once every 18s."
      tone="panel"
      code={`<Sticker text="new" tone="sky" />
<Sticker text="limited" tone="rust" spin={false} />`}
    >
      <div className="flex flex-wrap gap-6">
        {(["ember", "sky", "honey", "rust"] as const).map((tone) => (
          <StateLabel key={tone} label={tone}>
            <Sticker text={tone === "rust" ? "limited" : "new"} tone={tone} className="size-20" />
          </StateLabel>
        ))}
        <StateLabel label="spin off">
          <Sticker text="new" tone="ember" spin={false} className="size-20" />
        </StateLabel>
      </div>
    </ComponentSpecimen>
  )
}

function Tasting() {
  return (
    <ComponentSpecimen
      name="FlavorDial · RoastBar"
      source="components/blocks/flavor.tsx"
      description="Three stopwatch dials score sweetness, acidity and complexity from 1 to 5; the roast bar places a coffee between light and dark."
      code={`<FlavorDial label="Acidity" value={4} />
<RoastBar level={0.52} roast="Medium" />`}
    >
      <div className="flex flex-wrap items-end gap-10">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((v) => (
            <StateLabel key={v} label={`value ${v}`}>
              <FlavorDial label="Acidity" value={v} />
            </StateLabel>
          ))}
        </div>
        <div className="grid w-full max-w-md gap-4 sm:grid-cols-3">
          <RoastBar level={0.16} roast="Light" />
          <RoastBar level={0.52} roast="Medium" />
          <RoastBar level={0.84} roast="Dark" />
        </div>
      </div>
    </ComponentSpecimen>
  )
}

function Bags() {
  return (
    <ComponentSpecimen
      name="CoffeeBag"
      source="components/mock/coffee-bag.tsx"
      description="The bag, drawn in SVG: every label colour, roast dots, name and notes from props. A new coffee is a new bag without an illustration tool."
      tone="panel"
      code={`<CoffeeBag name="Liner Notes" label="moss" roast="Light"
  origin="Kenya" notes="Blackcurrant · Grapefruit · Raw sugar" />`}
    >
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
        {TONES.map((tone, i) => {
          const c = COFFEES.find((x) => x.label === tone) ?? COFFEES[i]
          return (
            <StateLabel key={tone} label={`label ${tone}`} className="items-center">
              <CoffeeBag name={c.name} label={tone} roast={c.roast} origin={c.origin} notes={c.notes.join(" · ")} artwork={tone === "honey" ? "honey" : "cream"} />
            </StateLabel>
          )
        })}
      </div>
    </ComponentSpecimen>
  )
}

function Merch() {
  return (
    <ComponentSpecimen
      name="MerchArt"
      source="components/mock/merch-art.tsx"
      description="Every piece of merch as an SVG with the sun-in-grooves mark printed on it; recolour with one prop."
      tone="panel"
      code={`<MerchArt kind="mug" tone="ember" />`}
    >
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
        {MERCH.map((m) => (
          <StateLabel key={m.id} label={`${m.kind} · ${m.tone}`} className="items-center">
            <MerchArt kind={m.kind} tone={m.tone} />
          </StateLabel>
        ))}
      </div>
    </ComponentSpecimen>
  )
}

function Cards() {
  return (
    <ComponentSpecimen
      name="CoffeeCard"
      source="components/blocks/coffee-card.tsx"
      description="One coffee on the shelf. Hover floods the cell rust and lifts the bag; the whole card opens quick view."
      code={`<CoffeeCard coffeeId="slow-fade" accent="sky" />`}
      previewClassName="p-0 sm:p-0"
    >
      <div className="grid divide-line sm:grid-cols-3 sm:divide-x">
        <CoffeeCard coffeeId="side-b-blend" accent="rust" />
        <CoffeeCard coffeeId="liner-notes" accent="ember" />
        <CoffeeCard coffeeId="hidden-track" accent="sky" />
      </div>
    </ComponentSpecimen>
  )
}

function Headings() {
  return (
    <ComponentSpecimen
      name="SectionHeading · Arrows"
      source="components/blocks/section-heading.tsx · arrows.tsx"
      description="A serif title with one phrase in colour and a doodle on its last word; arrows page a shelf and grey out at the ends."
      code={`<SectionHeading before="Rep the" highlight="house band!" tone="ember" doodle="record"
  actions={<Arrows tone="line" onPrev={prev} onNext={next} />} />`}
    >
      <div className="space-y-8">
        <SectionHeading before="Rep the" highlight="house band!" tone="ember" doodle="record" actions={<Arrows tone="line" />} />
        <SectionHeading kicker="With a kicker · h1" before="Five tracks from" highlight="cherry to cup." tone="rust" doodle="bean" size="h1" />
        <div className="flex flex-wrap gap-6">
          <StateLabel label="tone line">
            <Arrows tone="line" />
          </StateLabel>
          <StateLabel label="at the start">
            <Arrows tone="line" prevDisabled />
          </StateLabel>
          <div className="rounded-(--radius-field) bg-cocoa p-3">
            <StateLabel label="tone paper, on a photo" light>
              <Arrows />
            </StateLabel>
          </div>
        </div>
      </div>
    </ComponentSpecimen>
  )
}

function Audio() {
  const { playing } = useRadio()
  return (
    <>
      <ComponentSpecimen
        name="Turntable"
        source="components/mock/turntable.tsx"
        description="It plays. Press the record or Start: the arm swings in over 600ms, the record turns at 33⅓ and the shop radio starts. Same radio as the footer player."
        tone="panel"
        code={`<Turntable />  // reads and drives lib/radio`}
      >
        <div className="mx-auto max-w-lg rounded-(--radius-frame) bg-page p-3 shadow-(--shadow-float)">
          <Turntable />
        </div>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="MusicPlayer · EqBars"
        source="components/site/now-playing.tsx"
        description="The footer's playlist card — play, pause, skip, a live progress bar and the tracklist. EqBars are driven by the radio's real output."
        tone="rust"
        code={`<MusicPlayer playlist="Autumn rotation" />
<EqBars playing={playing} />`}
      >
        <div className="grid gap-6 md:grid-cols-[minmax(0,420px)_1fr] md:items-start">
          <MusicPlayer />
          <div className="flex flex-wrap gap-6 rounded-(--radius-card) bg-raised p-5 text-ink">
            <StateLabel label="EqBars · resting">
              <EqBars />
            </StateLabel>
            <StateLabel label={`EqBars · ${playing ? "playing" : "press play"}`}>
              <EqBars playing={playing} />
            </StateLabel>
            <Button variant="outline" size="sm" onClick={() => radio.toggle()}>
              {playing ? "Pause radio" : "Play radio"}
            </Button>
          </div>
        </div>
      </ComponentSpecimen>
    </>
  )
}

function Carousel() {
  return (
    <ComponentSpecimen
      name="PhotoCarousel"
      source="components/motion/photo-carousel.tsx"
      description="A crossfade (700ms) with a 104% → 100% settle, autoplaying every 6s and pausing under the pointer."
      code={`<PhotoCarousel headline="Good coffee and slow afternoons." doodle="bike"
  slides={[{ photo: PHOTOS.barInterior, alt: "…" }, …]} interval={6} />`}
    >
      <PhotoCarousel
        slides={[
          { photo: PHOTOS.barInterior, alt: "A barista behind the counter" },
          { photo: PHOTOS.crateDig, alt: "Hands flicking through records" },
          { photo: PHOTOS.cornerDusk, alt: "The roastery bar at dusk" },
        ]}
      />
    </ComponentSpecimen>
  )
}

function Overlays() {
  return (
    <ComponentSpecimen
      name="Quick view · Cart drawer"
      source="components/blocks/quick-view.tsx · components/site/cart-drawer.tsx"
      description="One quick-view dialog and one cart drawer for the whole site, opened from anywhere through their stores. Both are real: sizes, grinds and quantities price live; the cart persists."
      code={`import { quickView } from "@/lib/quick-view"
import { cart } from "@/lib/cart"

quickView.open("slow-fade")
cart.add({ id: "side-b-blend", name: "Side B Blend", detail: "12 oz · Whole bean", price: 19, kind: "coffee" })`}
    >
      <div className="flex flex-wrap gap-3">
        <Button variant="sky" onClick={() => quickView.open("slow-fade")}>
          Open quick view
        </Button>
        <Button variant="outline" onClick={() => cart.setOpen(true)}>
          Open cart drawer
        </Button>
        <Button onClick={() => cart.add({ id: "side-b-blend", name: "Side B Blend", detail: "12 oz · Whole bean", price: 19, kind: "coffee" })}>
          Add a bag and open
        </Button>
      </div>
    </ComponentSpecimen>
  )
}

export function ComponentLibrary() {
  return (
    <div className="space-y-8">
      <Buttons />
      <Toggles />
      <Inputs />
      <Stickers />
      <Tasting />
      <Bags />
      <Merch />
      <Cards />
      <Headings />
      <Audio />
      <Carousel />
      <Overlays />
    </div>
  )
}
