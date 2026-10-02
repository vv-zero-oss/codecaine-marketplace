import { useCanvasAction } from "@canvas/react"
import { motion } from "motion/react"
import { Play } from "lucide-react"
import { useEffect, useState, type ReactNode } from "react"

import { contrast, toHex, useComputed } from "@/components/brand/read-style"
import { Button, ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Accent } from "@/components/ui/heading"
import { Tag } from "@/components/ui/tag"
import { Mark, Wordmark } from "@/components/ui/wordmark"
import { CountUp } from "@/components/motion/count-up"
import { Marquee } from "@/components/motion/marquee"
import { CallTile, QuoteTile } from "@/components/sections/founders"
import { ProgramCard } from "@/components/sections/programs"
import { StatCell } from "@/components/sections/network"
import { COLLAGE, PROGRAMS, STATS } from "@/content"
import { Link } from "@/lib/router"
import { cn } from "@/lib/utils"

/** Read a CSS custom property off the root, live. */
function useToken(name: string) {
  const [value, setValue] = useState("")
  useEffect(() => {
    setValue(getComputedStyle(document.documentElement).getPropertyValue(name).trim())
  }, [name])
  return value
}

function Chapter({ id, title, blurb, children }: { id: string; title: string; blurb: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-line py-14">
      <h2 className="text-2xl font-medium tracking-[-0.03em]">{title}</h2>
      <p className="mt-2 max-w-xl text-sm text-fg-muted">{blurb}</p>
      <div className="mt-8 space-y-8">{children}</div>
    </section>
  )
}

function Swatch({ name, token, role }: { name: string; token: string; role: string }) {
  const value = useToken(token)
  const hex = value ? toHex(value) : "—"
  return (
    <figure className="overflow-hidden rounded-card border border-line bg-surface">
      <div className="h-16 border-b border-line" style={{ background: `var(${token})` }} />
      <figcaption className="space-y-0.5 p-3 text-xs">
        <p className="font-medium">{name}</p>
        <p className="text-fg-muted">{role}</p>
        <p className="pt-1 font-mono text-[11px] text-fg-subtle">{token}</p>
        <p className="font-mono text-[11px] text-fg-subtle">{value.startsWith("rgb") ? value : hex}</p>
      </figcaption>
    </figure>
  )
}

const COLOURS: { group: string; items: { name: string; token: string; role: string }[] }[] = [
  {
    group: "Surface",
    items: [
      { name: "Ink", token: "--color-ink", role: "Page background" },
      { name: "Surface", token: "--color-surface", role: "Drawers, footer" },
      { name: "Surface raised", token: "--color-surface-raised", role: "Tiles and cards" },
      { name: "Paper", token: "--color-paper", role: "Solid buttons" },
      { name: "Glass", token: "--color-glass", role: "Glass buttons, tags" },
      { name: "Warm glass", token: "--color-warm-glass", role: "Film button" },
    ],
  },
  {
    group: "Text",
    items: [
      { name: "Foreground", token: "--color-fg", role: "Primary text" },
      { name: "Muted", token: "--color-fg-muted", role: "Body copy" },
      { name: "Subtle", token: "--color-fg-subtle", role: "Labels, meta" },
      { name: "On paper", token: "--color-on-paper", role: "Text on solid buttons" },
    ],
  },
  {
    group: "Border",
    items: [
      { name: "Line", token: "--color-line", role: "Hairlines" },
      { name: "Line strong", token: "--color-line-strong", role: "Glass button edge" },
    ],
  },
]

const TYPE_SCALE = [
  { name: "Display", cls: "text-[clamp(2.5rem,6.2vw,4.5rem)] leading-[0.98] font-medium tracking-[-0.045em]", spec: "40–72px · 500 · 0.98 · −0.045em", use: "Hero headline" },
  { name: "Heading", cls: "text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.1] font-medium tracking-[-0.035em]", spec: "28–40px · 500 · 1.1 · −0.035em", use: "Section titles" },
  { name: "Stat", cls: "text-[2.5rem] font-light tracking-[-0.04em] tabular-nums", spec: "40px · 300 · −0.04em · tabular", use: "Numbers" },
  { name: "Card title", cls: "text-lg font-medium tracking-[-0.02em]", spec: "18px · 500 · −0.02em", use: "Card headings" },
  { name: "Body", cls: "text-[15px] leading-relaxed text-fg-muted", spec: "15px · 400 · 1.625", use: "Paragraphs" },
  { name: "Button", cls: "text-[13px] font-medium tracking-[-0.01em]", spec: "13px · 500 · −0.01em", use: "Buttons, nav" },
  { name: "Label", cls: "text-[9px] font-medium tracking-[0.12em] uppercase text-fg-muted", spec: "9px · 500 · +0.12em · caps", use: "Tags, captions" },
]

function Specimen({ label, children, code }: { label: string; children: ReactNode; code?: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <div className="rounded-card border border-line bg-surface">
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <p className="text-xs font-medium">{label}</p>
        {code && (
          <button
            className="text-[11px] text-fg-subtle transition-colors hover:text-fg"
            onClick={() => {
              void navigator.clipboard?.writeText(code)
              setCopied(true)
              setTimeout(() => setCopied(false), 1400)
            }}
          >
            {copied ? "Copied" : "Copy usage"}
          </button>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-3 p-5">{children}</div>
      {code && <pre className="overflow-x-auto border-t border-line px-4 py-3 font-mono text-[11px] text-fg-subtle">{code}</pre>}
    </div>
  )
}

function Brand() {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex h-44 items-center justify-center rounded-card bg-ink ring-1 ring-line">
          <Wordmark className="scale-150" />
        </div>
        <div className="flex h-44 items-center justify-center rounded-card bg-paper text-on-paper">
          <Wordmark className="scale-150 !text-on-paper" />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-card border border-line p-5 text-sm">
          <p className="font-medium">Mark</p>
          <Mark className="mt-3 size-10" />
          <p className="mt-3 text-fg-muted">Two nested arches. Minimum 14px; clear space of one mark-width.</p>
        </div>
        <div className="rounded-card border border-line p-5 text-sm sm:col-span-2">
          <p className="font-medium">Voice</p>
          <ul className="mt-3 space-y-1.5 text-fg-muted">
            <li><span className="text-fg">Do</span> — speak plainly, in the long term, about people.</li>
            <li><span className="text-fg">Do</span> — set one word per headline in italic serif.</li>
            <li><span className="text-fg">Don’t</span> — promise returns or lean on finance jargon.</li>
            <li><span className="text-fg">Don’t</span> — use exclamation marks or emoji.</li>
          </ul>
        </div>
      </div>
    </>
  )
}

function Colour() {
  const pairs: [string, string, string][] = [
    ["Foreground on ink", "--color-fg", "--color-ink"],
    ["Muted on ink", "--color-fg-muted", "--color-ink"],
    ["Subtle on ink", "--color-fg-subtle", "--color-ink"],
    ["On paper on paper", "--color-on-paper", "--color-paper"],
  ]
  return (
    <>
      {COLOURS.map(({ group, items }) => (
        <div key={group}>
          <h3 className="mb-3 text-xs font-medium tracking-[0.14em] text-fg-subtle uppercase">{group}</h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {items.map((item) => (
              <Swatch key={item.token} {...item} />
            ))}
          </div>
        </div>
      ))}
      <div>
        <h3 className="mb-3 text-xs font-medium tracking-[0.14em] text-fg-subtle uppercase">Contrast</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {pairs.map(([label, fg, bg]) => (
            <ContrastPair key={label} label={label} fg={fg} bg={bg} />
          ))}
        </div>
      </div>
    </>
  )
}

function ContrastPair({ label, fg, bg }: { label: string; fg: string; bg: string }) {
  const f = useToken(fg)
  const b = useToken(bg)
  // Translucent whites are measured over the page's own black.
  const ratio = f && b ? contrast(f.startsWith("rgb") ? `color-mix(in srgb, ${f}, #000 0%)` : f, b) : null
  const flat = f.startsWith("rgb") && b ? flatten(f, b) : null
  const shown = flat ? contrast(flat, b) : ratio
  return (
    <div className="flex items-center justify-between rounded-card border border-line px-4 py-3" style={{ background: `var(${bg})`, color: `var(${fg})` }}>
      <span className="text-sm">{label}</span>
      <span className="font-mono text-xs tabular-nums">{shown ? `${shown.toFixed(1)}:1` : "—"}</span>
    </div>
  )
}

/** A translucent white over a solid background, as the solid colour it looks like. */
function flatten(rgba: string, bg: string): string | null {
  const m = rgba.match(/[\d.]+/g)?.map(Number)
  const base = toHex(bg)
  if (!m || m.length < 4 || base === "—") return null
  const [r, g, b, a] = m
  const [br, bg2, bb] = [1, 3, 5].map((i) => parseInt(base.slice(i, i + 2), 16))
  return `rgb(${Math.round(r * a + br * (1 - a))} ${Math.round(g * a + bg2 * (1 - a))} ${Math.round(b * a + bb * (1 - a))})`
}

function Typography() {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-3">
        <FontCard name="Instrument Sans" className="font-sans" sample="Aa" note="Everything you read. 400, 500, 600." />
        <FontCard name="Instrument Serif" className="font-serif italic" sample="Aa" note="One italic accent per heading." />
        <FontCard name="JetBrains Mono" className="font-mono" sample="Aa" note="Tokens and code only." />
      </div>
      <div className="divide-y divide-line rounded-card border border-line">
        {TYPE_SCALE.map((row) => (
          <div key={row.name} className="grid gap-3 p-5 md:grid-cols-[11rem_1fr] md:gap-8">
            <div>
              <p className="text-sm font-medium">{row.name}</p>
              <p className="text-fg-muted text-xs">{row.use}</p>
              <p className="mt-2 font-mono text-[11px] text-fg-subtle">{row.spec}</p>
            </div>
            <p className={cn("min-w-0 break-words", row.cls)}>
              Build what endures, with <Accent>patient</Accent> partners.
            </p>
          </div>
        ))}
      </div>
      <p className="text-sm text-fg-muted">
        Numerals are tabular in stats: <span className="font-mono tabular-nums text-fg">0123456789 $1.2bn 240+</span>
      </p>
    </>
  )
}

function FontCard({ name, className, sample, note }: { name: string; className: string; sample: string; note: string }) {
  const [ref, values] = useComputed<HTMLParagraphElement>(["font-family"])
  return (
    <div className="rounded-card border border-line p-5">
      <p ref={ref} className={cn("text-6xl", className)}>{sample}</p>
      <p className="mt-4 text-sm font-medium">{name}</p>
      <p className="mt-1 text-xs text-fg-muted">{note}</p>
      <p className="mt-3 truncate font-mono text-[11px] text-fg-subtle">{values["font-family"]}</p>
    </div>
  )
}

function Surfaces() {
  const steps = [4, 8, 12, 16, 24, 32, 48, 64]
  return (
    <>
      <Specimen label="Spacing — a 4px grid">
        <div className="flex w-full flex-wrap items-end gap-4">
          {steps.map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <div className="bg-paper" style={{ width: s, height: s }} />
              <span className="font-mono text-[11px] text-fg-subtle">{s}</span>
            </div>
          ))}
        </div>
      </Specimen>
      <div className="grid gap-4 sm:grid-cols-3">
        {[["Card", "rounded-card", "--radius-card"], ["Tile", "rounded-tile", "--radius-tile"], ["Pill", "rounded-pill", "--radius-pill"]].map(([n, c, t]) => (
          <div key={n} className="rounded-card border border-line p-4">
            <div className={cn("h-20 border border-line-strong bg-surface-raised", c)} />
            <p className="mt-3 text-sm font-medium">{n}</p>
            <p className="font-mono text-[11px] text-fg-subtle">{t}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {[["Pill", "shadow-pill", "--shadow-pill"], ["Card", "shadow-card", "--shadow-card"], ["Glass", "shadow-glass", "--shadow-glass"]].map(([n, c, t]) => (
          <div key={n} className="rounded-card border border-line p-4">
            <div className={cn("h-20 rounded-tile bg-surface-raised", c)} />
            <p className="mt-3 text-sm font-medium">{n}</p>
            <p className="font-mono text-[11px] text-fg-subtle">{t}</p>
          </div>
        ))}
      </div>
      <Specimen label="Borders — 1px hairlines, never heavier">
        <div className="h-12 w-28 rounded-tile border border-line" />
        <div className="h-12 w-28 rounded-tile border border-line-strong" />
        <div className="h-12 w-28 border-l border-line pl-3 text-xs text-fg-muted">Stat rule</div>
      </Specimen>
    </>
  )
}

const EASINGS = [
  { name: "Soft out", curve: [0.22, 1, 0.36, 1] as const, token: "--ease-soft", use: "Entrances, hovers" },
  { name: "Soft in-out", curve: [0.65, 0, 0.35, 1] as const, token: "--ease-in-out-soft", use: "Photograph crossfades" },
]

function Motion() {
  const [run, setRun] = useState(0)
  useCanvasAction("Replay motion demo", () => setRun((n) => n + 1), { group: "Brand" })
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        {EASINGS.map((e) => (
          <div key={e.name} className="rounded-card border border-line p-5">
            <p className="text-sm font-medium">{e.name}</p>
            <p className="font-mono text-[11px] text-fg-subtle">{e.token} · cubic-bezier({e.curve.join(", ")})</p>
            <p className="mt-1 text-xs text-fg-muted">{e.use}</p>
            <div className="relative mt-5 h-8 rounded-pill bg-surface-raised">
              <motion.div
                key={run}
                className="absolute top-1 size-6 rounded-pill bg-paper"
                initial={{ left: "0.25rem" }}
                animate={{ left: "calc(100% - 1.75rem)" }}
                transition={{ duration: 1.2, ease: e.curve }}
              />
            </div>
          </div>
        ))}
      </div>
      <Specimen label="Durations" code={`--duration-reveal: 0.9s   --duration-fade: 1.6s   --duration-press: 0.16s`}>
        <Button variant="glass" onClick={() => setRun((n) => n + 1)}>
          <Play className="fill-current" aria-hidden /> Replay
        </Button>
        <CountUp key={run} value={240} suffix="+" className="text-3xl font-light tabular-nums" />
      </Specimen>
    </>
  )
}

function Iconography() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-card border border-line p-5 text-sm text-fg-muted">
        <p className="font-medium text-fg">Icons</p>
        <p className="mt-2">Lucide, 14px, 2px stroke inside buttons. A trailing arrow marks a call to action; it nudges 2px on hover.</p>
        <div className="mt-4"><ButtonLink href="#brand" variant="glass" size="sm">Arrow</ButtonLink></div>
      </div>
      <div className="rounded-card border border-line p-5 text-sm text-fg-muted">
        <p className="font-medium text-fg">Imagery</p>
        <p className="mt-2">Warm, natural-light photography of people at work, shot candidly. Always darkened under a gradient so type holds 4.5:1. Sourced from Pexels.</p>
      </div>
    </div>
  )
}

function Components() {
  return (
    <>
      <Specimen label="Button" code={`<ButtonLink href="#join" variant="solid">Build the future</ButtonLink>`}>
        <ButtonLink href="#brand">Solid</ButtonLink>
        <ButtonLink href="#brand" variant="glass">Glass</ButtonLink>
        <ButtonLink href="#brand" variant="warm" arrow={false}>Warm</ButtonLink>
        <Button variant="ghost">Ghost</Button>
        <Button disabled>Disabled</Button>
      </Specimen>
      <Specimen label="Button — sizes" code={`<ButtonLink size="sm" | "default" | "lg" />`}>
        <ButtonLink href="#brand" size="sm">Small</ButtonLink>
        <ButtonLink href="#brand">Default</ButtonLink>
        <ButtonLink href="#brand" size="lg">Large</ButtonLink>
      </Specimen>
      <Specimen label="Tag" code={`<Tag>Series A</Tag>`}>
        <Tag>Series A</Tag>
        <Tag>Founders</Tag>
      </Specimen>
      <Specimen label="Heading accent" code={`<BlurWords before="Capital that" accent="remembers." />`}>
        <p className="text-3xl font-medium tracking-[-0.035em]">Capital that <Accent>remembers.</Accent></p>
      </Specimen>
      <Specimen label="Stat cell + CountUp" code={`<StatCell tag="Circle" value={240} suffix="+" label="…" />`}>
        <div className="grid w-full grid-cols-2 gap-y-6 sm:grid-cols-4">
          {STATS.map((s) => <StatCell key={s.tag} {...s} />)}
        </div>
      </Specimen>
      <Specimen label="ProgramCard" code={`<ProgramCard image alt tag title body cta href />`}>
        <div className="w-full max-w-xs"><ProgramCard {...PROGRAMS[0]} /></div>
      </Specimen>
      <Specimen label="CallTile and QuoteTile" code={`<CallTile … />  <QuoteTile … />`}>
        <div className="grid w-full max-w-md grid-cols-2 gap-3">
          <CallTile {...(COLLAGE[0] as Extract<(typeof COLLAGE)[number], { kind: "call" }>)} />
          <QuoteTile {...(COLLAGE[2] as Extract<(typeof COLLAGE)[number], { kind: "quote" }>)} />
        </div>
      </Specimen>
      <Specimen label="Marquee" code={`<Marquee duration={60} direction="left" pauseOnHover>…</Marquee>`}>
        <Marquee duration={30} className="w-full">
          {["Northfield FC", "Aldwych Records", "Kestrel Racing"].map((n) => (
            <span key={n} className="mx-8 text-sm font-semibold tracking-[0.08em] whitespace-nowrap uppercase">{n}</span>
          ))}
        </Marquee>
      </Specimen>
    </>
  )
}

const CHAPTERS = [
  { id: "brand", title: "Brand", blurb: "The mark on dark and on paper, and how Heirloom talks.", Body: Brand },
  { id: "colour", title: "Colour", blurb: "Every token, read from the stylesheet as it is now.", Body: Colour },
  { id: "type", title: "Typography", blurb: "A grotesque for reading, an italic serif for one word, a mono for tokens.", Body: Typography },
  { id: "space", title: "Spacing, radii, shadows, borders", blurb: "A 4px grid, small radii, hairlines and quiet shadows.", Body: Surfaces },
  { id: "motion", title: "Motion", blurb: "Slow, soft and eased out. Press replay.", Body: Motion },
  { id: "icons", title: "Iconography and imagery", blurb: "One icon set, one photographic voice.", Body: Iconography },
  { id: "components", title: "Components", blurb: "Live, in their variants, with how to use them.", Body: Components },
]

export function BrandPage() {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line bg-ink/80 backdrop-blur-xl">
        <Container className="flex h-14 items-center gap-3">
          <Link href="/" aria-label="Heirloom home"><Wordmark /></Link>
          <span className="text-fg-subtle">/</span>
          <span className="text-sm text-fg-muted">Brand guidelines</span>
        </Container>
      </header>
      <main data-canvas-ignore>
        <Container className="py-16 sm:py-24">
          <p className="text-[10px] font-medium tracking-[0.2em] text-fg-subtle uppercase">Style guide</p>
          <h1 className="mt-3 max-w-2xl text-[clamp(2rem,5vw,3.5rem)] leading-none font-medium tracking-[-0.045em]">
            Heirloom, as a <Accent>system</Accent>
          </h1>
          <p className="mt-4 max-w-xl text-fg-muted">The tokens, type and components the site is built from, read live from the stylesheet.</p>
          <div className="mt-14 grid gap-12 lg:grid-cols-[12rem_minmax(0,1fr)]">
            <nav aria-label="Style guide" className="hidden lg:block">
              <ul className="sticky top-24 space-y-1 text-sm">
                {CHAPTERS.map((c) => (
                  <li key={c.id}>
                    <a href={`#${c.id}`} className="block rounded-pill px-3 py-1.5 text-fg-muted transition-colors hover:bg-glass hover:text-fg">{c.title}</a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="min-w-0">
              {CHAPTERS.map(({ id, title, blurb, Body }) => (
                <Chapter key={id} id={id} title={title} blurb={blurb}>
                  <Body />
                </Chapter>
              ))}
            </div>
          </div>
        </Container>
      </main>
    </>
  )
}
