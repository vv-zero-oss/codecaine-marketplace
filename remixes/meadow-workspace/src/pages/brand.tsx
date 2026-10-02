import { useState } from "react"
import { Zap } from "lucide-react"

import { CodeSnippet, ComponentSpecimen, GroupLabel, GuideSection, StateLabel } from "@/components/brand/specimen"
import { contrast, toHex, useComputed } from "@/components/brand/read-style"
import { Button, ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mark, Wordmark } from "@/components/ui/wordmark"
import { Link } from "@/lib/router"

const GROUPS: { name: string; tokens: string[] }[] = [
  { name: "Surface", tokens: ["page", "surface", "surface-muted"] },
  { name: "Text and borders", tokens: ["ink-950", "ink-900", "ink-700", "ink-500", "ink-400", "ink-200", "ink-100", "ink-50"] },
  { name: "Sky", tokens: ["sky-100", "sky-200", "sky-300", "sky-400", "sky-500", "sky-600"] },
  { name: "Accent and status", tokens: ["teal", "periwinkle", "apricot", "coral", "lilac", "leaf", "highlight", "terminal"] },
]

function Swatch({ token }: { token: string }) {
  const [ref, v] = useComputed<HTMLDivElement>(["background-color"])
  const value = v["background-color"] ?? ""
  const onWhite = contrast(value, "#ffffff")
  const onInk = contrast(value, "#1f1b19")
  return (
    <div className="overflow-hidden rounded-xl bg-surface shadow-card">
      <div ref={ref} className="h-16" style={{ backgroundColor: `var(--color-${token})` }} />
      <div className="p-3 text-[12px]">
        <p className="font-medium">{token}</p>
        <p className="font-mono text-ink-500">{toHex(value)}</p>
        <p className="mt-1 text-ink-400 tabular-nums">
          {onWhite ? `${onWhite.toFixed(1)}:1 on white` : ""} · {onInk ? `${onInk.toFixed(1)}:1 on ink` : ""}
        </p>
      </div>
    </div>
  )
}

const SCALE = [
  ["Display", "font-display text-[64px] leading-[0.98] font-semibold tracking-[-0.045em]", "64 / 0.98 · 600 · −4.5%"],
  ["Heading", "font-display text-[38px] leading-[1.08] font-semibold tracking-[-0.035em]", "38 / 1.08 · 600 · −3.5%"],
  ["Title", "font-display text-[20px] font-semibold tracking-[-0.02em]", "20 / 1.3 · 600 · −2%"],
  ["Body", "text-[15px] leading-relaxed", "15 / 1.6 · 400"],
  ["UI", "text-[13px] font-medium", "13 / 1.4 · 500"],
  ["Mono", "font-mono text-[12px]", "12 / 1.6 · 400"],
]

const RADII = [["control", "var(--radius-control)"], ["card", "var(--radius-card)"], ["window", "var(--radius-window)"]]
const SHADOWS = ["card", "lift", "window", "key", "button"]

function MotionDemo({ name, curve, label }: { name: string; curve: string; label: string }) {
  const [on, setOn] = useState(false)
  return (
    <div className="flex flex-col gap-3 rounded-xl bg-surface p-4 shadow-card">
      <div className="h-8 rounded-lg bg-ink-50 p-1">
        <div className="size-6 rounded-md bg-sky-500" style={{ transform: `translateX(${on ? "calc(var(--w) - 100%)" : "0"})`, transition: `transform 700ms ${curve}`, ["--w" as string]: "100%" }} />
      </div>
      <div className="flex items-center justify-between text-[12px]">
        <span><span className="font-medium">{name}</span> <span className="font-mono text-ink-400">{label}</span></span>
        <Button size="sm" variant="light" onClick={() => setOn((v) => !v)}>Play</Button>
      </div>
    </div>
  )
}

export function BrandHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink-200/70 bg-page/85 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <Link href="/" aria-label="Meadow home"><Wordmark className="text-[22px]" /></Link>
          <span className="text-ink-200">/</span>
          <span className="truncate text-sm text-ink-500">Brand guidelines</span>
        </div>
        <ButtonLink href="#components" size="sm" variant="light" className="hidden sm:inline-flex">Components</ButtonLink>
      </Container>
    </header>
  )
}

/** The style guide. Every value is read from the stylesheet at runtime, so it
 *  follows the tokens in `index.css` and cannot drift from the page. */
export function BrandPage() {
  return (
    <>
      <BrandHeader />
      <Container className="py-12">
        <SectionHeading title="Brand guidelines" description="The system Meadow is built on: colour, type, space, motion and every component, rendered live from the real tokens." />
        <div className="mt-10">
          <GuideSection id="brand" title="Brand" blurb="A ring on a sky. Calm, specific and a little pastoral — it never shouts.">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="grid h-40 place-items-center rounded-xl bg-gradient-to-b from-sky-400 to-sky-300 text-white"><Wordmark /></div>
              <div className="grid h-40 place-items-center rounded-xl bg-surface text-ink-900 shadow-card"><Wordmark /></div>
              <div className="grid h-40 place-items-center rounded-xl bg-ink-900 text-white"><Mark className="size-8 border-[7px]" /></div>
            </div>
            <ul className="mt-6 grid gap-2 text-[14px] text-ink-700 sm:grid-cols-2">
              <li><strong>Do</strong> write plainly: “Meadow files it for you.”</li>
              <li><strong>Don’t</strong> promise magic: no “supercharge”, no exclamation marks.</li>
              <li><strong>Do</strong> leave a ring’s width of clear space around the mark; minimum size 16px.</li>
              <li><strong>Don’t</strong> recolour the mark outside white, ink or sky.</li>
            </ul>
          </GuideSection>
          <GuideSection id="colour" title="Colour" blurb="Read from the stylesheet as it is now. Contrast ratios are against white and ink.">
            <div className="flex flex-col gap-8">
              {GROUPS.map((g) => (
                <div key={g.name}><GroupLabel>{g.name}</GroupLabel><div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">{g.tokens.map((t) => <Swatch key={t} token={t} />)}</div></div>
              ))}
            </div>
          </GuideSection>
          <GuideSection id="type" title="Typography" blurb="Inter for everything — headlines set tight at 600, body at 400–500; JetBrains Mono for code and keys. Numerals are tabular in tables and counts.">
            <div className="flex flex-col divide-y divide-ink-200 rounded-xl bg-surface shadow-card">
              {SCALE.map(([name, cls, spec]) => (
                <div key={name} className="flex flex-col gap-1 p-4 sm:flex-row sm:items-baseline sm:justify-between"><span className={cls + " min-w-0 truncate"}>{name} — Open space</span><code className="shrink-0 font-mono text-[11px] text-ink-400">{spec}</code></div>
              ))}
            </div>
            <p className="mt-4 font-mono text-[13px] tabular-nums text-ink-500">0123456789 · $142K · 9:12 AM</p>
          </GuideSection>
          <GuideSection id="space" title="Spacing, radii, shadows, borders" blurb="A 4px grid, soft corners, one-pixel hairlines, and shadows only where something lifts.">
            <GroupLabel>Radii</GroupLabel>
            <div className="flex flex-wrap gap-4">{RADII.map(([n, r]) => <StateLabel key={n} label={n}><div className="size-20 bg-sky-300" style={{ borderRadius: r }} /></StateLabel>)}</div>
            <div className="mt-8"><GroupLabel>Shadows</GroupLabel></div>
            <div className="flex flex-wrap gap-5">{SHADOWS.map((s) => <StateLabel key={s} label={`shadow-${s}`}><div className="size-24 rounded-xl bg-surface" style={{ boxShadow: `var(--shadow-${s})` }} /></StateLabel>)}</div>
            <div className="mt-8"><GroupLabel>Spacing</GroupLabel></div>
            <div className="flex flex-wrap items-end gap-3">{[4, 8, 12, 16, 24, 32, 48].map((n) => <StateLabel key={n} label={`${n}px`}><div className="bg-sky-400" style={{ width: n, height: n }} /></StateLabel>)}</div>
            <div className="mt-8"><GroupLabel>Borders</GroupLabel></div>
            <div className="flex gap-4"><StateLabel label="hairline ink-200"><div className="h-14 w-32 rounded-lg border border-ink-200 bg-surface" /></StateLabel><StateLabel label="ring sky-600"><div className="h-14 w-32 rounded-lg ring-2 ring-sky-600" /></StateLabel></div>
          </GuideSection>
          <GuideSection id="motion" title="Motion" blurb="Quick, eased out, and only where it says something changed. Reduced motion shows everything at rest.">
            <div className="grid gap-3 sm:grid-cols-2">
              <MotionDemo name="ease-out" curve="var(--ease-out)" label="cubic-bezier(.23,1,.32,1)" />
              <MotionDemo name="ease-in-out" curve="var(--ease-in-out)" label="cubic-bezier(.77,0,.175,1)" />
            </div>
            <p className="mt-3 text-[13px] text-ink-500">Durations: fast 150ms (press, hover) · base 420ms (tabs, cards) · slow 700ms (entrances).</p>
          </GuideSection>
          <GuideSection id="icons" title="Iconography and imagery" blurb="Lucide at 1.5–1.75 stroke, 16px in the UI. Photography is open sky and grass from Pexels; skies carry the colour, people stay candid.">
            <div className="flex flex-wrap gap-4 text-ink-700">{[Zap, Mark].map((I, i) => <span key={i} className="grid size-12 place-items-center rounded-xl bg-surface shadow-card"><I className="size-5" /></span>)}</div>
            <div className="mt-4 grid grid-cols-2 gap-3"><img src="/images/hero-b.jpg" alt="Green field under a blue sky" className="aspect-[16/9] rounded-xl object-cover" /><img src="/images/picnic.jpg" alt="Friends in tall grass" className="aspect-[16/9] rounded-xl object-cover" /></div>
          </GuideSection>
          <GuideSection id="components" title="Components" blurb="Each one live, in its variants and states, with how to use it.">
            <div className="flex flex-col gap-6">
              <ComponentSpecimen name="Button" source="components/ui/button.tsx" description="Dark is the primary action; light sits on sky and paper." code={`<ButtonLink href="#start" size="lg">Sign up</ButtonLink>\n<Button variant="light">Talk to sales</Button>`}>
                <div className="flex flex-wrap gap-6">
                  <StateLabel label="default"><Button>Sign up</Button></StateLabel>
                  <StateLabel label="light"><Button variant="light">Talk to sales</Button></StateLabel>
                  <StateLabel label="ghost"><Button variant="ghost">Log in</Button></StateLabel>
                  <StateLabel label="link"><Button variant="link">Read more</Button></StateLabel>
                  <StateLabel label="small"><Button size="sm">Sign up</Button></StateLabel>
                  <StateLabel label="disabled"><Button disabled>Sign up</Button></StateLabel>
                </div>
              </ComponentSpecimen>
              <ComponentSpecimen name="Tabs" source="components/ui/tabs.tsx" description="Filters a group in place. Arrow keys move between triggers." code={`<Tabs value={v} onValueChange={setV}>\n  <TabsList><TabsTrigger value="a">A</TabsTrigger></TabsList>\n</Tabs>`}>
                <Tabs defaultValue="a"><TabsList>{["Featured", "Sales", "Mail"].map((t, i) => <TabsTrigger key={t} value={i ? t : "a"}>{t}</TabsTrigger>)}</TabsList></Tabs>
              </ComponentSpecimen>
              <ComponentSpecimen name="Section heading" source="components/ui/section-heading.tsx" description="Serif title over a muted line; opens every section." code={`<SectionHeading title="Everything in one clearing" description="…" />`}>
                <SectionHeading title="Everything in one clearing" description="One line that says what the section is for." />
              </ComponentSpecimen>
              <CodeSnippet code={`// Tokens live in src/index.css under @theme.\nclassName="bg-sky-400 text-ink-900 shadow-lift rounded-card"`} />
            </div>
          </GuideSection>
        </div>
      </Container>
    </>
  )
}
