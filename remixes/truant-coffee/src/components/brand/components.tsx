import { useState } from "react"
import { ArrowRight, Plus } from "lucide-react"

import { ComponentSpecimen, StateLabel } from "@/components/brand/specimen"
import { ProductCard } from "@/components/blocks/product-card"
import { CoffeeBag } from "@/components/mock/coffee-bag"
import { OriginMap } from "@/components/mock/origin-map"
import { RoastCurve } from "@/components/mock/roast-curve"
import { CountUp } from "@/components/motion/count-up"
import { LineReveal } from "@/components/motion/line-reveal"
import { Marquee } from "@/components/motion/marquee"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { coffeeById } from "@/content/coffees"
import { ORIGINS } from "@/content/origins"
import { useStore } from "@/lib/store"
import { cn } from "@/lib/utils"

const VARIANTS = ["solid", "outline", "tomato", "paper", "ghost"] as const

/**
 * Every component the site is built from, live and in its states, each with
 * the line that puts it on a page.
 */
export function ComponentLibrary() {
  const { setDrawer } = useStore()
  const [replay, setReplay] = useState(0)
  const [dose, setDose] = useState(20)
  const [origin, setOrigin] = useState(ORIGINS[0].id)
  const [drop, setDrop] = useState(210)
  const [bag, setBag] = useState("half-day-4")
  const [n, setN] = useState(19)
  const [field, setField] = useState<"default" | "error">("default")

  return (
    <div className="flex flex-col gap-6">
      <ComponentSpecimen name="Button" source="components/ui/button.tsx" description="Labels in the poster face: solid ink, outlined, tomato for the one thing to press, paper on photographs, ghost for the rest. Four sizes; presses sink to 97%." code={`<Button variant="tomato" size="lg">Check out</Button>\n<ButtonLink href="/shop" variant="paper">Shop now</ButtonLink>`}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-end gap-4">
            {VARIANTS.map((v) => (
              <StateLabel key={v} label={v}>
                <div className={cn(v === "paper" && "rounded-[var(--radius-card)] bg-sky p-3")}>
                  <Button variant={v}>Shop now</Button>
                </div>
              </StateLabel>
            ))}
          </div>
          <div className="flex flex-wrap items-end gap-4">
            {(["sm", "md", "lg"] as const).map((s) => (
              <StateLabel key={s} label={s}>
                <Button size={s}>Subscribe</Button>
              </StateLabel>
            ))}
            <StateLabel label="icon">
              <Button variant="outline" size="icon" aria-label="Add">
                <Plus />
              </Button>
            </StateLabel>
            <StateLabel label="with icon">
              <Button variant="outline">
                Read the notes <ArrowRight />
              </Button>
            </StateLabel>
            <StateLabel label="disabled">
              <Button disabled>Sold out</Button>
            </StateLabel>
            <StateLabel label="loading">
              <Button variant="tomato" disabled>
                <span className="size-4 animate-spin rounded-full border-2 border-paper/40 border-t-paper" /> Placing order
              </Button>
            </StateLabel>
          </div>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen name="CoffeeBag" source="components/mock/coffee-bag.tsx" description="The drawn, live-typeset pouch. Every coffee gets its own label from the catalogue; props: coffeeId, weight, tilt, shadow." code={`<CoffeeBag coffeeId="field-trip-10" weight="12 oz" tilt={-3} />`} tone="dots">
        <div className="flex flex-wrap items-end gap-8">
          <div className="w-36">
            <CoffeeBag coffeeId={bag} tilt={-3} />
          </div>
          <ToggleGroup type="single" value={bag} onValueChange={(v) => v && setBag(v)} className="flex flex-wrap gap-1.5" spacing={1}>
            {["half-day-4", "the-long-way", "field-trip-10", "snow-day"].map((id) => (
              <ToggleGroupItem key={id} value={id} className="type-display h-9 rounded-[var(--radius-button)] px-3 pt-1 text-[17px] shadow-[inset_0_0_0_1.5px_var(--color-ink)] data-[state=on]:bg-ink data-[state=on]:text-paper">
                {coffeeById[id].name}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen name="ProductCard" source="components/blocks/product-card.tsx" description="A coffee on the shelf. Hover leans the bag; the round + adds a 12 oz bag (and confirms); the card opens the quick view." code={`<ProductCard coffee={coffee} onOpen={setOpen} />`}>
        <div className="grid max-w-[560px] grid-cols-2 gap-4">
          <ProductCard coffee={coffeeById["field-trip-10"]} onOpen={() => setDrawer("cart")} />
          <ProductCard coffee={coffeeById["last-bell"]} onOpen={() => setDrawer("cart")} />
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen name="RoastCurve" source="components/mock/roast-curve.tsx" description="The roast logger: bean temperature and rate of rise, phases shaded, scrub to read any second. Change the drop and it redraws." code={`<RoastCurve duration={640} drop={213} charge={206} />`}>
        <div className="max-w-[720px]">
          <div className="mb-4 flex items-center gap-4">
            <span className="text-caption text-ink-3">Drop {drop}°</span>
            <Slider className="max-w-[240px]" min={200} max={228} step={1} value={[drop]} onValueChange={([v]) => setDrop(v)} aria-label="Drop temperature" />
          </div>
          <RoastCurve duration={600 + (drop - 200) * 6} drop={drop} charge={204} />
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen name="OriginMap" source="components/mock/origin-map.tsx" description="The coffee belt with every origin and its route to the roastery; `active` lights one." code={`<OriginMap active="kenya" />`} tone="night">
        <ToggleGroup type="single" value={origin} onValueChange={(v) => v && setOrigin(v)} className="mb-4 flex flex-wrap gap-1.5" spacing={1}>
          {ORIGINS.map((o) => (
            <ToggleGroupItem key={o.id} value={o.id} className="h-8 rounded-full px-3 text-[12.58px] text-night-fg shadow-[inset_0_0_0_1px_var(--color-night-line)] data-[state=on]:bg-recess data-[state=on]:text-ink">
              {o.country}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <OriginMap active={origin} className="max-w-[720px]" />
      </ComponentSpecimen>

      <ComponentSpecimen name="LineReveal · Marquee · CountUp" source="components/motion/" description="The motion pieces, each a named component with scalar props: headlines rising line by line, the endless ticker, numbers that count." code={`<LineReveal text="Take|the|long|way" stagger={0.08} />\n<Marquee speed={22}>…</Marquee>\n<CountUp value={213} suffix="°" />`}>
        <div className="flex flex-col gap-6">
          <div className="flex items-end gap-6">
            <LineReveal key={replay} text="Take|the long|way" className="type-display text-d3" />
            <Button size="sm" variant="outline" onClick={() => setReplay((r) => r + 1)}>
              Replay
            </Button>
          </div>
          <Marquee speed={18} className="type-display rounded-[var(--radius-card)] bg-ink py-3 text-[22px] text-paper">
            {[0, 1].map((i) => (
              <span key={i} className="px-6">
                New ✶ Fresh off the drum ✶ New ✶
              </span>
            ))}
          </Marquee>
          <div className="flex items-center gap-4">
            <span className="type-display text-d3">
              <CountUp value={n} prefix="$" decimals={2} duration={0.6} />
            </span>
            <Button size="sm" variant="outline" onClick={() => setN(n === 19 ? 38 : 19)}>
              Change value
            </Button>
          </div>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen name="Toggle group · Tabs · Slider" source="components/ui/" description="Chips for filters and options (outlined, solid when on), tabs on a paper track, the dose slider." code={`<ToggleGroup type="multiple">…</ToggleGroup>\n<Tabs value={id} onValueChange={setId}>…</Tabs>\n<Slider min={12} max={40} value={[dose]} />`} tone="panel">
        <div className="flex flex-col gap-6">
          <ToggleGroup type="multiple" defaultValue={["recess"]} className="flex gap-1.5" spacing={1}>
            {["recess", "detour", "field", "latebell"].map((s) => (
              <ToggleGroupItem key={s} value={s} className="type-display h-9 rounded-[var(--radius-button)] px-3 pt-1 text-[17px] capitalize shadow-[inset_0_0_0_1.5px_var(--color-ink)] data-[state=on]:bg-ink data-[state=on]:text-paper">
                {s === "latebell" ? "Late Bell" : s === "field" ? "Field Trip" : s}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          <Tabs defaultValue="a">
            <TabsList className="h-auto gap-1 rounded-[var(--radius-button)] bg-paper p-1">
              {["Half Day #4", "The Long Way", "Last Bell"].map((t, i) => (
                <TabsTrigger key={t} value={"abc"[i]} className="type-display h-9 rounded-[var(--radius-tag)] px-3 pt-1 text-[17px] data-[state=active]:bg-raised data-[state=active]:shadow-card">
                  {t}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <div className="max-w-[360px]">
            <p className="mb-3 text-caption text-ink-3 tabular-nums">Dose {dose} g</p>
            <Slider min={12} max={40} value={[dose]} onValueChange={([v]) => setDose(v)} aria-label="Dose" />
          </div>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen name="Field" source="index.css tokens" description="Inputs sit on paper with a 1px line-strong ring; focus thickens it to 1.5px ink; an error rings tomato, shakes once and says how to fix it." code={`<input className="h-12 rounded-[var(--radius-field)] bg-paper px-4 shadow-[inset_0_0_0_1px_var(--color-line-strong)]" />`}>
        <div className="flex max-w-[420px] flex-col gap-2">
          <input
            placeholder="you@somewhere.else"
            aria-invalid={field === "error"}
            className={cn("h-12 rounded-[var(--radius-field)] bg-paper px-4 text-[16px] shadow-[inset_0_0_0_1px_var(--color-line-strong)] outline-none placeholder:text-ink-4 focus:shadow-[inset_0_0_0_1.5px_var(--color-ink)]", field === "error" && "shake shadow-[inset_0_0_0_1.5px_var(--color-tomato)]")}
          />
          <p className={cn("h-5 text-[13px] text-tomato", field === "error" ? "opacity-100" : "opacity-0")}>That address is missing something — check the @ and the ending.</p>
          <Button variant="outline" size="sm" className="self-start" onClick={() => setField(field === "error" ? "default" : "error")}>
            {field === "error" ? "Clear error" : "Show error"}
          </Button>
        </div>
      </ComponentSpecimen>

      <ComponentSpecimen name="Accordion" source="components/ui/accordion.tsx" description="Questions in the poster face on hairlines; answers open on a 260ms ease-out." code={`<Accordion type="single" collapsible>…</Accordion>`}>
        <Accordion type="single" collapsible defaultValue="0" className="max-w-[640px] border-t border-ink">
          {[
            ["Can I skip a delivery?", "Yes — from the rail, press Skip next to the date."],
            ["Is shipping really free?", "On every subscription delivery, any size."],
          ].map(([q, a], i) => (
            <AccordionItem key={q} value={String(i)} className="border-ink/20">
              <AccordionTrigger className="type-display py-4 text-d1 font-normal hover:no-underline hover:text-tomato">{q}</AccordionTrigger>
              <AccordionContent className="text-body text-ink-2">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ComponentSpecimen>

      <ComponentSpecimen name="Drawers" source="components/site/*-sheet.tsx" description="Menu, bag and subscription — one right-hand drawer on the drawer curve. Each is also an editor action." code={`const { setDrawer } = useStore()\nsetDrawer("cart")`}>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" onClick={() => setDrawer("menu")}>
            Open menu
          </Button>
          <Button variant="outline" onClick={() => setDrawer("cart")}>
            Open bag
          </Button>
          <Button variant="outline" onClick={() => setDrawer("account")}>
            Open subscription
          </Button>
        </div>
      </ComponentSpecimen>
    </div>
  )
}
