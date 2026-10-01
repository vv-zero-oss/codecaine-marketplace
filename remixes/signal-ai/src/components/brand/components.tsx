import { ArrowRight } from "lucide-react"

import { PixelEdge } from "@/components/motion/pixel-edge"
import { WordRotator } from "@/components/motion/word-rotator"
import { CountUp } from "@/components/motion/count-up"
import { VoiceOrb } from "@/components/motion/voice-orb"
import { ChatPreview } from "@/components/previews/chat-preview"
import { BotPreview } from "@/components/previews/bot-preview"
import { AnnouncementPill } from "@/components/sections/hero"
import { Button } from "@/components/ui/button"
import { CodeWindow } from "@/components/ui/code-window"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArtTile } from "@/components/ui/art-tile"
import { TestimonialCard } from "@/components/ui/testimonial-card"
import { Gauge } from "lucide-react"
import { PlanCard } from "@/components/ui/plan-card"
import { ProductCard } from "@/components/ui/product-card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ComponentSpecimen, StateLabel } from "./specimen"

export function ComponentLibrary() {
  return (
    <>
      <ComponentSpecimen
        name="Button"
        source="components/ui/button.tsx"
        description="Sharp, small-caps buttons. Filled for the one main action, outline for the second, ghost for quiet ones."
        code={`<Button>Get API Access <ArrowRight /></Button>\n<ButtonLink href="#start" variant="outline" size="lg">Contact Sales</ButtonLink>`}
      >
        <div className="flex flex-wrap gap-6">
          <StateLabel label="default"><Button>Get API Access <ArrowRight /></Button></StateLabel>
          <StateLabel label="outline"><Button variant="outline">View Documentation</Button></StateLabel>
          <StateLabel label="ghost"><Button variant="ghost">Sign in</Button></StateLabel>
          <StateLabel label="sm"><Button size="sm">Small</Button></StateLabel>
          <StateLabel label="lg"><Button size="lg">Large</Button></StateLabel>
          <StateLabel label="focus-visible (Tab)"><Button>Focus me</Button></StateLabel>
          <StateLabel label="disabled"><Button disabled>Disabled</Button></StateLabel>
        </div>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="AnnouncementPill"
        source="components/sections/hero.tsx"
        description="What is new, in a line, above the headline."
        code={`<AnnouncementPill tag="New" text="Meet Vantage 4" detail="Our new model" />`}
      >
        <AnnouncementPill />
      </ComponentSpecimen>
      <ComponentSpecimen
        name="WordRotator"
        source="components/motion/word-rotator.tsx"
        description="Types a word, holds, clears, types the next. Knobs: words, hold, typeSpeed, gap, paused."
        code={`<WordRotator words="build,reason,imagine" hold={3000} typeSpeed={100} />`}
      >
        <p className="font-serif text-[44px] leading-none tracking-[-0.02em]">for everything you <WordRotator /></p>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="ProductCard"
        source="components/ui/product-card.tsx"
        description="A live preview with its name and an Explore link. Light and dark tones."
        code={`<ProductCard product="chat" label="Chat" />\n<ProductCard product="build" label="Build" tone="dark" />`}
        previewClassName="grid gap-3 sm:grid-cols-2"
      >
        <ProductCard product="chat" label="Chat" />
        <ProductCard product="build" label="Build" tone="dark" />
      </ComponentSpecimen>
      <ComponentSpecimen
        name="Previews"
        source="components/previews/"
        description="The chat thread, the bot's turn and the voice orb — each its own component with its own knobs."
        code={`<ChatPreview duration={28} />\n<BotPreview cycle={7000} />\n<VoiceOrb size={140} speed={80} />`}
        previewClassName="grid items-center gap-4 sm:grid-cols-3"
      >
        <div className="h-48 overflow-hidden"><ChatPreview /></div>
        <div className="h-48"><BotPreview /></div>
        <div className="grid h-48 place-items-center"><VoiceOrb size={140} /></div>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="CodeWindow"
        source="components/ui/code-window.tsx"
        description="Traffic lights, highlighted code and a Copy button that confirms."
        code={`<CodeWindow code={snippet} />`}
      >
        <CodeWindow code={'const { text } = await generateText({\n  model: vantage.responses("vantage-4"),\n});'} />
      </ComponentSpecimen>
      <ComponentSpecimen
        name="Tabs"
        source="components/ui/tabs.tsx"
        description="Pill tabs for switching a code sample's language."
        code={`<Tabs defaultValue="python"><TabsList>…</TabsList></Tabs>`}
      >
        <Tabs defaultValue="typescript">
          <TabsList>
            <TabsTrigger value="python">Python</TabsTrigger>
            <TabsTrigger value="typescript">TypeScript</TabsTrigger>
            <TabsTrigger value="curl">cURL</TabsTrigger>
          </TabsList>
        </Tabs>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="CountUp"
        source="components/motion/count-up.tsx"
        description="A figure that counts up once when it scrolls into view."
        code={`<CountUp to={400} suffix="M+" duration={1.6} />`}
      >
        <CountUp to={400} suffix="M+" className="text-[40px] font-semibold tracking-[-0.03em]" />
      </ComponentSpecimen>
      <ComponentSpecimen
        name="PixelEdge"
        source="components/motion/pixel-edge.tsx"
        description="A mosaic of square pixels along a section edge: sparse toward the content, dense at the edge. A few squares flicker. Knobs: cell, rows, color, altColor, altShare, edge, density, seed, flicker, interval."
        code={`<section className="relative pb-[170px]">…<PixelEdge rows={5} cell={30} color="var(--sky)" /></section>`}
        previewClassName="p-0"
      >
        <div className="relative h-56 bg-paper">
          <PixelEdge rows={5} cell={30} />
        </div>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="ArtTile"
        source="components/ui/art-tile.tsx"
        description="A framed sky tile with a pixel mosaic and one large line icon, for numbered lists."
        code={`<ArtTile icon={Gauge} seed={3} tilt={160} />`}
      >
        <div className="max-w-md"><ArtTile icon={Gauge} seed={3} /></div>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="TestimonialCard"
        source="components/ui/testimonial-card.tsx"
        description="A serif quote, then who said it."
        code={`<TestimonialCard quote="…" name="Maya Lindqvist" role="Head of Platform, Northwind Health" />`}
      >
        <div className="max-w-md"><TestimonialCard quote="We had it in front of customers by Thursday." name="Maya Lindqvist" role="Head of Platform, Northwind Health" /></div>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="Accordion"
        source="components/ui/accordion.tsx"
        description="Questions on hairlines; the plus turns to a cross when open."
        code={`<Accordion type="single" collapsible>…</Accordion>`}
      >
        <Accordion type="single" collapsible defaultValue="a" className="border-t border-line">
          <AccordionItem value="a"><AccordionTrigger>Which models can I use?</AccordionTrigger><AccordionContent>Every model is on the same API.</AccordionContent></AccordionItem>
          <AccordionItem value="b"><AccordionTrigger>How is pricing calculated?</AccordionTrigger><AccordionContent>By usage, with no seats.</AccordionContent></AccordionItem>
        </Accordion>
      </ComponentSpecimen>
      <ComponentSpecimen
        name="PlanCard"
        source="components/ui/plan-card.tsx"
        description="One way to get started: what you get, then one button."
        code={`<PlanCard title="Build on your own" blurb="…" features={[…]} cta="Start Building" primary />`}
      >
        <div className="max-w-sm">
          <PlanCard title="Build on your own" blurb="Launch your AI-powered product with:" features={["Usage-based pricing", "Automatically increasing rate limits"]} cta="Start Building" primary />
        </div>
      </ComponentSpecimen>
    </>
  )
}
