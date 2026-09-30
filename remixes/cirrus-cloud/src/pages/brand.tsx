import { useEffect, useState, type ReactNode } from "react"
import { useCanvasAction } from "@canvas/react"

import { RailCard, ServerPanel } from "@/components/blocks/card-rail"
import { PageHero } from "@/components/blocks/page-hero"
import { PixelIcon } from "@/components/icons/pixel-icon"
import { PIXEL_ICONS, type PixelIconName } from "@/components/icons/pixel-icon-data"
import { IsoServer, type IsoModel } from "@/components/marks/iso-server"
import { PixelFace, PixelMark, StepBadge } from "@/components/marks/pixel-marks"
import { GhostyImage } from "@/components/motion/ghosty-image"
import { FeatureCell } from "@/components/sections/features"
import { LevelRung } from "@/components/sections/levels"
import { CodePanel } from "@/components/sections/spec-file"
import { CityLine, CITIES, type City } from "@/components/site/city-line"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Chip, type ChipTone } from "@/components/ui/chip"
import { Container } from "@/components/ui/container"
import { brandPage, stack, workloads } from "@/content"
import { cn } from "@/lib/utils"

/**
 * Brand guidelines: the system the site is built on, rendered from its real
 * tokens (read from the stylesheet at runtime) and its real components.
 */

const SECTIONS = [
  ["brand", "Brand"],
  ["colour", "Colour"],
  ["type", "Typography"],
  ["space", "Spacing & shape"],
  ["shadow", "Shadows"],
  ["motion", "Motion"],
  ["icons", "Iconography"],
  ["imagery", "Imagery"],
  ["components", "Components"],
] as const

const COLOURS: { group: string; tokens: string[] }[] = [
  { group: "Paper & ink", tokens: ["paper", "ink", "ink-soft", "mute", "faint", "hairline", "wash"] },
  { group: "Pixel palette", tokens: ["navy", "cobalt", "cobalt-soft", "cobalt-pale", "violet", "gold", "gold-soft", "gold-pale", "signal", "lime"] },
  { group: "Server room", tokens: ["night", "night-cell", "night-line", "rack", "rack-unit", "rack-label", "cyan"] },
  { group: "Chips", tokens: ["chip-red", "chip-blue", "chip-violet", "chip-ink", "chip-lime"] },
]

const TYPE = ["display", "lede", "heading", "title", "body", "small", "label"] as const
const EASES = ["ease-out", "ease-in-out", "ease-ghost", "ease-drawer"] as const
const DURATIONS = ["duration-press", "duration-hover", "duration-typer", "duration-ghost"] as const

/** Reads custom properties off :root, after the stylesheet has loaded. */
function useTokens(names: string[]) {
  const [values, setValues] = useState<Record<string, string>>({})
  const key = names.join(",")
  useEffect(() => {
    const css = getComputedStyle(document.documentElement)
    setValues(Object.fromEntries(key.split(",").map((n) => [n, css.getPropertyValue(`--${n}`).trim()])))
  }, [key])
  return values
}

function luminance(color: string) {
  const probe = document.createElement("canvas").getContext("2d")!
  probe.fillStyle = color
  const hex = probe.fillStyle as string
  if (!hex.startsWith("#")) return 1
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
const contrast = (a: string, b: string) => {
  const [x, y] = [luminance(a), luminance(b)].sort((m, n) => n - m)
  return (x + 0.05) / (y + 0.05)
}

export function BrandPage() {
  const { hero } = brandPage
  return (
    <>
      <PageHero title={hero.title} strap={hero.strap} blurb={hero.blurb} />
      <Container className="grid gap-12 py-16 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-16">
        <nav aria-label="On this page" className="lg:sticky lg:top-20 lg:self-start">
          <ul className="flex flex-wrap gap-x-4 gap-y-1 lg:flex-col">
            {SECTIONS.map(([id, title]) => (
              <li key={id}>
                <a href={`#${id}`} className="label inline-flex min-h-9 items-center text-mute transition-colors duration-(--duration-hover) hover:text-ink">
                  {title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="min-w-0 space-y-28">
          <BrandSection />
          <ColourSection />
          <TypeSection />
          <SpaceSection />
          <ShadowSection />
          <MotionSection />
          <IconSection />
          <ImagerySection />
          <ComponentSection />
        </div>
      </Container>
    </>
  )
}

function Block({ id, title, intro, children }: { id: string; title: string; intro?: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24">
      <p className="label text-faint">{String(SECTIONS.findIndex(([s]) => s === id) + 1).padStart(2, "0")}</p>
      <h2 className="mt-2 text-heading text-ink">{title}</h2>
      {intro && <p className="mt-4 max-w-[38rem] text-body text-ink-soft">{intro}</p>}
      <div className="mt-10">{children}</div>
    </section>
  )
}

/** A usage line with a copy button that says it copied. */
function Snippet({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <div className="mt-3 flex items-center justify-between gap-3 border-t border-hairline pt-3">
      <code className="truncate font-mono text-[0.75rem] text-ink-soft">{code}</code>
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(code)
          } catch {
            /* no clipboard in a frame; still show the state */
          }
          setCopied(true)
          window.setTimeout(() => setCopied(false), 1400)
        }}
        className="label inline-flex min-h-9 shrink-0 items-center gap-1.5 text-mute transition-colors duration-(--duration-hover) hover:text-ink"
      >
        <PixelIcon name={copied ? "check" : "copy"} className={copied ? "text-cobalt" : undefined} />
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  )
}

function Specimen({ label, children, code, className }: { label: string; children: ReactNode; code?: string; className?: string }) {
  return (
    <div className={cn("min-w-0 border border-hairline bg-paper p-5", className)}>
      <p className="label mb-5 text-faint">{label}</p>
      {children}
      {code && <Snippet code={code} />}
    </div>
  )
}

/* ── Brand ───────────────────────────────────────────────────────────── */

function BrandSection() {
  return (
    <Block id="brand" title="Brand" intro="A cloud in nine squares' width, set beside the name in spaced mono caps. Keep one square of clear space on every side; never draw it smaller than 18px tall.">
      <div className="grid gap-px border border-hairline bg-hairline sm:grid-cols-3 [&>*]:min-w-0">
        <div className="flex flex-col items-center justify-center gap-6 bg-paper p-8">
          <div className="outline-1 outline-offset-[9px] outline-dashed outline-cobalt-soft">
            <PixelMark className="h-9" />
          </div>
          <p className="label text-faint">Clear space · 1 cell</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-6 bg-night p-8">
          <PixelMark className="h-9 text-paper" />
          <p className="label text-rack-label">On night</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-5 bg-paper p-8">
          <div className="flex flex-wrap items-end justify-center gap-5">
            <PixelMark className="h-[1.125rem]" />
            <PixelMark className="h-9" />
            <PixelMark className="h-[4.5rem]" />
          </div>
          <p className="label text-faint">18 · 36 · 72 px</p>
        </div>
      </div>
      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        <VoiceList title="Do" tone="text-cobalt" items={brandPage.voice.do} icon="check" />
        <VoiceList title="Don't" tone="text-signal" items={brandPage.voice.dont} icon="times" />
      </div>
    </Block>
  )
}

function VoiceList({ title, items, tone, icon }: { title: string; items: readonly string[]; tone: string; icon: PixelIconName }) {
  return (
    <div>
      <p className="label text-ink">{title}</p>
      <ul className="mt-4 border-t border-hairline">
        {items.map((item) => (
          <li key={item} className="flex gap-3 border-b border-hairline py-3 text-small text-ink-soft">
            <PixelIcon name={icon} className={cn("mt-0.5", tone)} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ── Colour ──────────────────────────────────────────────────────────── */

function ColourSection() {
  const values = useTokens(COLOURS.flatMap((g) => g.tokens.map((t) => `color-${t}`)))
  const paper = values["color-paper"] || "#ffffff"
  const ink = values["color-ink"] || "#0c0c0c"
  return (
    <Block id="colour" title="Colour" intro="White paper and near-black ink carry the reading. The pixel palette only ever appears as squares — in canvases, chips and marks — and the server room's colours only on the night band. Ratios are against paper and against ink.">
      <div className="space-y-10">
        {COLOURS.map((group) => (
          <div key={group.group}>
            <p className="label text-ink">{group.group}</p>
            <ul className="mt-4 grid grid-cols-2 gap-px border border-hairline bg-hairline sm:grid-cols-3 xl:grid-cols-5">
              {group.tokens.map((token) => {
                const value = values[`color-${token}`] ?? ""
                return (
                  <li key={token} className="bg-paper">
                    <div className="h-20 border-b border-hairline" style={{ background: `var(--color-${token})` }} />
                    <div className="p-3">
                      <p className="text-[0.8125rem] text-ink">{token}</p>
                      <p className="font-mono text-[0.6875rem] text-mute uppercase">{value}</p>
                      {value && (
                        <p className="mt-1 font-mono text-[0.6875rem] text-faint">
                          {contrast(value, paper).toFixed(1)} · {contrast(value, ink).toFixed(1)}
                        </p>
                      )}
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </Block>
  )
}

/* ── Typography ──────────────────────────────────────────────────────── */

function TypeSection() {
  const values = useTokens(TYPE.flatMap((t) => [`text-${t}`, `text-${t}--line-height`, `text-${t}--letter-spacing`]).concat(["font-sans", "font-mono"]))
  return (
    <Block id="type" title="Typography" intro="Geist for everything read, Geist Mono for labels, numbers in tables and code — both from Google Fonts. Regular weight almost everywhere; hierarchy comes from size and space, not bold.">
      <div className="grid gap-px border border-hairline bg-hairline sm:grid-cols-2">
        <Specimen label="Sans · Geist" className="border-0">
          <p className="text-heading text-ink">Aa Bb Cc 0123</p>
          <p className="mt-2 truncate font-mono text-[0.6875rem] text-mute">{values["font-sans"]}</p>
        </Specimen>
        <Specimen label="Mono · Geist Mono" className="border-0">
          <p className="font-mono text-heading text-ink">Aa Bb 0123</p>
          <p className="mt-2 truncate font-mono text-[0.6875rem] text-mute">{values["font-mono"]}</p>
        </Specimen>
      </div>
      <ul className="mt-8 border-t border-hairline">
        {TYPE.map((t) => (
          <li key={t} className="grid gap-3 border-b border-hairline py-6 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-8">
            <div>
              <p className="text-[0.8125rem] text-ink">text-{t}</p>
              <p className="mt-1 font-mono text-[0.6875rem] leading-[1.6] text-mute">
                {values[`text-${t}`]}
                <br />
                lh {values[`text-${t}--line-height`] || "—"} · ls {values[`text-${t}--letter-spacing`] || "0"}
              </p>
            </div>
            <p className={cn(`text-${t}`, t === "label" && "label", "min-w-0 truncate text-ink")}>
              {t === "display" ? "Workspaces" : "The machine makes the options; you make the calls."}
            </p>
          </li>
        ))}
      </ul>
    </Block>
  )
}

/* ── Spacing & shape ─────────────────────────────────────────────────── */

function SpaceSection() {
  const values = useTokens(["spacing-pixel", "spacing-gutter", "spacing-section", "container-page", "notch"])
  const steps = [
    ["spacing-pixel", "One cell of the grid: an 8px square and a 1px gap."],
    ["spacing-gutter", "Page side padding, fluid from 16 to 32px."],
    ["spacing-section", "Paper between sections, fluid from 112 to 280px."],
    ["container-page", "The widest a line of content runs."],
  ] as const
  return (
    <Block id="space" title="Spacing & shape" intro="Everything sits on the 9px grid the paper is ruled with. Nothing is rounded: corners are notched one step at a time, and hairlines are 1px of the hairline colour.">
      <ul className="border-t border-hairline">
        {steps.map(([token, note]) => (
          <li key={token} className="grid gap-3 border-b border-hairline py-5 md:grid-cols-[12rem_minmax(0,1fr)]">
            <div>
              <p className="text-[0.8125rem] text-ink">{token}</p>
              <p className="font-mono text-[0.6875rem] text-mute">{values[token]}</p>
            </div>
            <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-4">
              <span className="h-3 max-w-full shrink-0 bg-cobalt" style={{ width: `min(100%, var(--${token}))` }} />
              <span className="text-small text-ink-soft">{note}</span>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-8 grid gap-px border border-hairline bg-hairline sm:grid-cols-3">
        <Specimen label={`notch · ${values["notch"]}`} className="border-0" code='className="notch"'>
          <div className="notch h-16 w-full bg-ink" />
        </Specimen>
        <Specimen label="notch-sm · 2px" className="border-0" code='className="notch notch-sm"'>
          <div className="notch notch-sm h-16 w-full bg-cobalt" />
        </Specimen>
        <Specimen label="hairline · 1px" className="border-0" code='className="border border-hairline"'>
          <div className="h-16 w-full border border-hairline" />
        </Specimen>
      </div>
    </Block>
  )
}

/* ── Shadows ─────────────────────────────────────────────────────────── */

function ShadowSection() {
  const values = useTokens(["shadow-float", "shadow", "shadow-lg"])
  return (
    <Block id="shadow" title="Shadows" intro="The page is flat. A shadow only lifts something that floats over other content: the rail's arrow over a picture, a menu, a sheet.">
      <div className="grid gap-6 sm:grid-cols-3">
        {(["shadow-float", "shadow", "shadow-lg"] as const).map((token) => (
          <div key={token}>
            <div className="h-28 bg-paper" style={{ boxShadow: `var(--${token})` }} />
            <p className="mt-4 text-[0.8125rem] text-ink">{token}</p>
            <p className="mt-1 font-mono text-[0.6875rem] leading-[1.6] text-mute">{values[token]}</p>
          </div>
        ))}
      </div>
    </Block>
  )
}

/* ── Motion ──────────────────────────────────────────────────────────── */

function MotionSection() {
  const values = useTokens([...EASES, ...DURATIONS])
  const [played, setPlayed] = useState(false)
  useCanvasAction("Play motion demo", (on) => setPlayed(on ?? !played), { on: played, group: "Brand" })
  return (
    <Block id="motion" title="Motion" intro="UI answers in 140–200ms on a strong ease-out; arrivals take longer on softer curves. Canvases loop on an endless GSAP tween the editor can pause, and everything honours reduced motion.">
      <div className="flex items-center justify-between gap-4">
        <p className="label text-ink">Easings, over 900ms</p>
        <Button size="sm" variant="paper" onClick={() => setPlayed((p) => !p)}>
          {played ? "Reset" : "Play"}
        </Button>
      </div>
      <ul className="mt-5 border-t border-hairline">
        {EASES.map((ease) => (
          <li key={ease} className="grid gap-3 border-b border-hairline py-4 md:grid-cols-[12rem_minmax(0,1fr)]">
            <div>
              <p className="text-[0.8125rem] text-ink">{ease}</p>
              <p className="font-mono text-[0.6875rem] text-mute">{values[ease]}</p>
            </div>
            <div className="relative h-6">
              <span
                className="absolute top-0 left-0 size-6 bg-lime"
                style={{
                  transform: played ? "translateX(calc(min(34rem, 60vw) - 1.5rem))" : "translateX(0)",
                  transition: `transform 900ms var(--${ease})`,
                }}
              />
            </div>
          </li>
        ))}
      </ul>
      <ul className="mt-8 grid grid-cols-2 gap-px border border-hairline bg-hairline sm:grid-cols-4">
        {DURATIONS.map((d) => (
          <li key={d} className="bg-paper p-4">
            <p className="text-[0.8125rem] text-ink">{d}</p>
            <p className="font-mono text-[0.6875rem] text-mute">{values[d]}</p>
          </li>
        ))}
      </ul>
    </Block>
  )
}

/* ── Iconography ─────────────────────────────────────────────────────── */

const MODELS: { model: IsoModel; tone: "cobalt" | "night" | "gold" | "lime" | "signal" }[] = [
  { model: "rack", tone: "cobalt" },
  { model: "branches", tone: "night" },
  { model: "gpu", tone: "gold" },
  { model: "sandbox", tone: "lime" },
  { model: "board", tone: "signal" },
]

function IconSection() {
  const names = Object.keys(PIXEL_ICONS) as PixelIconName[]
  return (
    <Block id="icons" title="Iconography" intro="Pixel icons from the Pixel Icon Library on their 24px grid, in the current text colour — lime on a night tile where an icon leads a card. Servers are drawn as isometric voxels on a flat panel.">
      <ul className="grid grid-cols-3 gap-px border border-hairline bg-hairline sm:grid-cols-6 lg:grid-cols-8">
        {names.map((name) => (
          <li key={name} className="flex flex-col items-center gap-3 bg-paper px-2 py-5">
            <PixelIcon name={name} className="size-6 text-ink" />
            <span className="w-full truncate text-center font-mono text-[0.625rem] text-mute">{name}</span>
          </li>
        ))}
      </ul>
      <Snippet code='<PixelIcon name="globe" className="size-5" />' />
      <ul className="mt-10 grid grid-cols-2 gap-px border border-hairline bg-hairline sm:grid-cols-5">
        {MODELS.map(({ model, tone }) => (
          <li key={model} className="bg-paper">
            <div className="aspect-square">
              <ServerPanel model={model} tone={tone} />
            </div>
            <p className="p-3 font-mono text-[0.6875rem] text-mute">{model}</p>
          </li>
        ))}
      </ul>
      <Snippet code='<IsoServer model="rack" className="h-40 w-40" />' />
    </Block>
  )
}

/* ── Imagery ─────────────────────────────────────────────────────────── */

function ImagerySection() {
  const cities = Object.keys(CITIES) as City[]
  return (
    <Block id="imagery" title="Imagery" intro="Three kinds of picture, never mixed in one card: the pixel canvases (server room, life cycle, marquee, skyline); photography from Pexels, which bleeds in through a feathered mask; and city line art, one edge region per page footer, drawn in a single token colour.">
      <div className="grid gap-px border border-hairline bg-hairline sm:grid-cols-2">
        <Specimen label="Photography · GhostyImage" className="border-0" code='<GhostyImage src={src} alt={alt} direction="up" />'>
          <div className="aspect-[4/3] overflow-hidden">
            <GhostyImage src={stack.cards[0].image!} alt={stack.cards[0].alt!} />
          </div>
        </Specimen>
        <Specimen label="City line art · CityLine" className="border-0" code='<CityLine city="london" tone="ink" />'>
          <div className="flex aspect-[4/3] items-end">
            <CityLine city="london" />
          </div>
        </Specimen>
      </div>
      <ul className="mt-px grid grid-cols-2 gap-px border border-t-0 border-hairline bg-hairline sm:grid-cols-5">
        {cities.map((city) => (
          <li key={city} className="bg-paper p-3">
            <CityLine city={city} tone="navy" />
            <p className="mt-2 font-mono text-[0.6875rem] text-mute">
              {CITIES[city].code} · {CITIES[city].name}
            </p>
          </li>
        ))}
      </ul>
    </Block>
  )
}

/* ── Components ──────────────────────────────────────────────────────── */

const TONES: ChipTone[] = ["red", "blue", "violet", "ink", "lime"]

function ComponentSection() {
  return (
    <Block id="components" title="Components" intro="The pieces the pages are made of, live. Hover, focus and press them.">
      <div className="grid gap-6 lg:grid-cols-2">
        <Specimen label="Button · ink / paper · default / sm / icon" code='<Button variant="ink" size="sm">Start free</Button>'>
          <div className="flex flex-wrap items-center gap-3">
            <Button>Start a workspace</Button>
            <Button variant="paper">Talk to us</Button>
            <Button size="sm">Start free</Button>
            <Button size="icon" aria-label="Next">
              <PixelIcon name="arrow-right" />
            </Button>
            <Button size="sm" disabled>
              Disabled
            </Button>
          </div>
        </Specimen>
        <Specimen label="Chip · five tones" code='<Chip tone="blue">Postgres</Chip>'>
          <div className="flex flex-wrap gap-2">
            {TONES.map((tone) => (
              <Chip key={tone} tone={tone}>
                {tone}
              </Chip>
            ))}
          </div>
        </Specimen>
        <Specimen label="StepBadge · PixelFace" code="<StepBadge n={1} /> <PixelFace mood=&quot;happy&quot; />">
          <div className="flex items-center gap-6">
            <StepBadge n={1} />
            <StepBadge n={2} className="bg-lime text-ink" />
            <PixelFace mood="happy" className="h-8" />
            <PixelFace mood="sad" className="h-8" />
          </div>
        </Specimen>
        <Specimen label="Accordion" code="<Accordion type=&quot;multiple&quot;>…</Accordion>">
          <Accordion type="multiple">
            <AccordionItem value="a">
              <AccordionTrigger>Do I have to change editors?</AccordionTrigger>
              <AccordionContent>No. Cirrus connects to the editor you already use.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="b">
              <AccordionTrigger>Where does my code live?</AccordionTrigger>
              <AccordionContent>In your git host, as it does now.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </Specimen>
        <Specimen label="FeatureCell" code='<FeatureCell icon="lock" title="Scoped secrets" body="…" />'>
          <ul className="border border-hairline">
            <FeatureCell icon="lock" title="Scoped secrets" body="Per branch and per person, injected at boot." />
          </ul>
        </Specimen>
        <Specimen label="LevelRung" code='<LevelRung level="L3" title="Per-branch environments." body="…" />'>
          <ol className="border-t border-hairline">
            <LevelRung level="L1" title="Shared staging." body="One server, everybody's changes." />
            <LevelRung level="L3" title="Per-branch environments." body="Every branch gets a machine." />
          </ol>
        </Specimen>
        <Specimen label="RailCard · isometric art" code="<RailCard card={card} />">
          <div className="flex justify-center">
            <RailCard card={workloads[2]} className="w-full max-w-[20rem]" />
          </div>
        </Specimen>
        <Specimen label="CodePanel" code='<CodePanel filename="cirrus.toml" code={code} />'>
          <CodePanel filename="cirrus.toml" code={'[machine]\nimage = "cirrus/base:2026.09"\ncpu   = 8'} />
        </Specimen>
        <Specimen label="IsoServer" code='<IsoServer model="sandbox" />' className="lg:col-span-2">
          <div className="grid grid-cols-5 gap-6">
            {MODELS.map(({ model }) => (
              <IsoServer key={model} model={model} className="h-24 w-full" />
            ))}
          </div>
        </Specimen>
      </div>
    </Block>
  )
}
