import { Copy, Check } from "lucide-react"
import { motion } from "motion/react"
import { useEffect, useState } from "react"

import { ActivationCard, AskComposer, MetricsCard, RegistrationsCard } from "@/components/mocks/widgets"
import { Marquee } from "@/components/motion/marquee"
import { Button, ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Eyebrow, Lede, SectionTitle } from "@/components/ui/section-title"
import { Mark, Wordmark } from "@/components/ui/wordmark"
import { SiteFooter } from "@/components/site-footer"
import { EASE_OUT } from "@/lib/motion-tokens"
import { Link } from "@/lib/router"
import { cn } from "@/lib/utils"

/** Token names, grouped. Values are read from the live stylesheet, so this can't drift. */
const COLOURS: Record<string, string[]> = {
  Surface: ["paper", "surface", "surface-2", "window", "sky", "peach", "night", "night-2", "night-3"],
  Text: ["ink", "ink-2", "ink-3", "ink-inverse", "ink-inverse-2"],
  Border: ["line", "line-strong", "line-inverse"],
  Accent: ["chart", "chart-soft", "ember", "ember-soft", "mint", "lilac", "glow", "sky-ink"],
  Wash: ["wash-peach", "wash-rose", "wash-lilac"],
}
const RADII = ["chip", "card", "window", "pill"]
const SHADOWS = ["card", "float", "window", "night"]
const EASES = [["out-soft", "Entrances, hovers, pins"], ["in-out-soft", "Things that move across the screen"]]

const css = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim()

function toRgb(value: string): [number, number, number] | null {
  const hex = value.match(/^#([0-9a-f]{6})$/i)
  if (hex) return [0, 2, 4].map((i) => parseInt(hex[1].slice(i, i + 2), 16)) as [number, number, number]
  return null
}
function lum([r, g, b]: [number, number, number]) {
  const f = (c: number) => ((c /= 255) <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
}
function contrast(a: string, b: string) {
  const x = toRgb(a), y = toRgb(b)
  if (!x || !y) return null
  const [hi, lo] = [lum(x), lum(y)].sort((m, n) => n - m)
  return ((hi + 0.05) / (lo + 0.05)).toFixed(1)
}

function Chapter({ id, title, blurb, children }: { id: string; title: string; blurb: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-line py-14">
      <h2 className="display text-3xl">{title}</h2>
      <p className="mt-2 mb-8 max-w-xl text-ink-2">{blurb}</p>
      {children}
    </section>
  )
}

function Snippet({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <div className="mt-3 flex items-start justify-between gap-2 rounded-lg bg-night p-3 font-mono text-[11px] text-ink-inverse-2">
      <code className="min-w-0 break-words whitespace-pre-wrap">{code}</code>
      <button aria-label="Copy snippet" className="grid size-8 shrink-0 place-items-center rounded-md hover:bg-white/10" onClick={() => { void navigator.clipboard?.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1400) }}>
        {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
      </button>
    </div>
  )
}

function Specimen({ name, children, code }: { name: string; children: React.ReactNode; code: string }) {
  return (
    <div className="rounded-card border border-line bg-window p-5">
      <p className="mb-4 text-[13px] font-medium">{name}</p>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
      <Snippet code={code} />
    </div>
  )
}

function Swatches() {
  const [vals, setVals] = useState<Record<string, string>>({})
  useEffect(() => {
    const next: Record<string, string> = {}
    Object.values(COLOURS).flat().forEach((n) => (next[n] = css(`--color-${n}`)))
    setVals(next)
  }, [])
  return (
    <div className="space-y-8">
      {Object.entries(COLOURS).map(([group, names]) => (
        <div key={group}>
          <p className="mb-3 text-[13px] font-medium">{group}</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {names.map((n) => (
              <div key={n} className="overflow-hidden rounded-card border border-line">
                <div className="h-16" style={{ background: `var(--color-${n})` }} />
                <div className="p-3 text-[11px]"><p className="font-medium">{n}</p><p className="font-mono text-ink-3">{vals[n]}</p></div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div>
        <p className="mb-3 text-[13px] font-medium">Text contrast</p>
        <ul className="grid gap-2 text-[13px] sm:grid-cols-2">
          {[["ink", "paper"], ["ink-2", "paper"], ["ink-3", "paper"], ["ink-inverse", "night"], ["ink-inverse-2", "night"], ["sky-ink", "sky"]].map(([fg, bg]) => (
            <li key={fg + bg} className="flex items-center justify-between rounded-lg border border-line px-3 py-2"><span style={{ color: `var(--color-${fg})`, background: `var(--color-${bg})` }} className="rounded px-2 py-0.5">{fg} on {bg}</span><span className="tnum font-mono text-ink-2">{vals[fg] && contrast(vals[fg], vals[bg]) ? `${contrast(vals[fg], vals[bg])}:1` : "—"}</span></li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function MotionDemo() {
  const [n, setN] = useState(0)
  return (
    <div className="space-y-4">
      {EASES.map(([name, use]) => (
        <div key={name} className="rounded-card border border-line p-4">
          <p className="text-[13px]"><b className="font-medium">ease-{name}</b> <span className="text-ink-2">· {use}</span></p>
          <div className="relative mt-3 h-8 rounded-pill bg-surface"><div key={n} className="absolute top-1 left-1 size-6 rounded-full bg-ink" style={{ animation: `brand-slide 900ms var(--ease-${name}) both` }} /></div>
        </div>
      ))}
      <style>{`@keyframes brand-slide{from{transform:translateX(0)}to{transform:translateX(calc(min(100vw - 8rem, 36rem)))}}`}</style>
      <p className="tnum font-mono text-xs text-ink-2">fast 160ms · base 320ms · slow 700ms</p>
      <Button variant="soft" onClick={() => setN(n + 1)}>Play</Button>
    </div>
  )
}

const TYPE = [["Display XL", "display text-[clamp(2.5rem,6.6vw,4.9rem)]", "AI analytics for faster insights"], ["Display L", "display text-5xl", "Ship metrics, not dashboards"], ["Display M", "display text-3xl", "Answers you can trust"], ["Lede", "text-lg text-ink-2", "Ask complex questions and get deep, reliable insights."], ["UI", "text-[13px] font-medium", "Book a demo · Get started"], ["Numerals", "tnum font-mono text-2xl", "3 503   2.4k   46.2%   567k"]]

export function BrandPage() {
  return (
    <>
      <header className="border-b border-line">
        <Container className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-3"><Link href="/" aria-label="Fathom home"><Wordmark /></Link><span className="text-ink-3">/</span><span className="text-[13px] text-ink-2">Brand guidelines</span></div>
          <ButtonLink href="/" size="sm" variant="soft">Back to site</ButtonLink>
        </Container>
      </header>
      <main data-canvas-ignore>
        <Container className="py-16">
          <Eyebrow>Style guide</Eyebrow>
          <SectionTitle as="h1" className="mt-4 text-[clamp(2.4rem,6vw,4rem)]">Fathom, <em>as a system</em></SectionTitle>
          <Lede className="mt-4">Every swatch, scale and component below is read from the real stylesheet and the real components. Change a token in <code className="font-mono text-sm">index.css</code> and it changes here.</Lede>

          <Chapter id="brand" title="Brand" blurb="A plumb line dropped into a ring: measuring depth, quietly. Keep one icon-width of clear space around the mark; never use it under 16px.">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="grid place-items-center gap-6 rounded-card bg-window p-10 shadow-card"><Wordmark className="scale-150" /><Mark className="size-10" /></div>
              <div className="grid place-items-center gap-6 rounded-card bg-night p-10 text-ink-inverse"><Wordmark className="scale-150" /><Mark className="size-10" /></div>
            </div>
            <div className="mt-6 grid gap-3 text-[13px] sm:grid-cols-2">
              <p className="rounded-card bg-surface p-4"><b className="font-medium">Do</b> — write plainly: “Ask complex questions and get deep, reliable insights.”</p>
              <p className="rounded-card bg-surface p-4"><b className="font-medium">Don’t</b> — say “revolutionary”, “supercharge” or use exclamation marks.</p>
            </div>
          </Chapter>
          <Chapter id="colour" title="Colour" blurb="Light sections use paper, dark sections use night. Chart, ember and sky tint the product's own widgets."><Swatches /></Chapter>
          <Chapter id="type" title="Typography" blurb="Newsreader for display, with an italic accent for the one phrase that matters. Inter for everything read at size. Tabular numerals for data.">
            <div className="divide-y divide-line rounded-card border border-line">
              {TYPE.map(([n, cls, sample]) => <div key={n} className="p-5"><p className="mb-2 font-mono text-[11px] text-ink-3">{n}</p><p className={cn(cls)}>{sample.includes("insights") ? <>AI analytics for faster insights and <em>zero chaos</em></> : sample}</p></div>)}
            </div>
          </Chapter>
          <Chapter id="space" title="Spacing, radii, shadows, borders" blurb="Sections breathe on a 4px grid with generous vertical rhythm; cards take soft 16px corners, hairline borders and stacked low shadows.">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {RADII.map((r) => <div key={r} className="grid h-24 place-items-center border border-line-strong bg-surface text-xs" style={{ borderRadius: `var(--radius-${r})` }}>radius-{r}</div>)}
              {SHADOWS.map((s) => <div key={s} className="grid h-24 place-items-center rounded-card bg-window text-xs" style={{ boxShadow: `var(--shadow-${s})` }}>shadow-{s}</div>)}
            </div>
            <p className="mt-4 text-[13px] text-ink-2">Hairlines: <code className="font-mono">line</code> (8% ink) between rows, <code className="font-mono">line-strong</code> (16%) around controls.</p>
          </Chapter>
          <Chapter id="motion" title="Motion" blurb="Everything eases out, and anything scrubbed by scroll does so for a reason — see each scene's comment. Reduced motion stacks the pinned scenes."><MotionDemo /></Chapter>
          <Chapter id="icons" title="Iconography and imagery" blurb="Lucide at 1.4–1.5px stroke for interface; hand-drawn isometric line art in currentColor for illustration. Photography is greyscale, human and unposed (Pexels), played in 4:4.4 frames.">
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">{["/photos/18969806.jpg", "/photos/14816709.jpg", "/photos/27086922.jpg"].map((s) => <img key={s} src={s} alt="" className="aspect-[4/4.4] w-full rounded-lg object-cover grayscale" />)}</div>
          </Chapter>
          <Chapter id="components" title="Components" blurb="Everything in components/, live. Pinned scenes (hero, tabs, stories, film, stacked cards, door) are shown on the home page and described in their source.">
            <div className="grid gap-4">
              <Specimen name="Button — variants & sizes" code={'<ButtonLink variant="soft" size="lg">Learn more →</ButtonLink>'}>
                <Button>Default</Button><Button variant="soft">Soft</Button><Button variant="ghost">Ghost</Button><Button disabled>Disabled</Button>
                <span className="rounded-window bg-night p-3"><Button variant="inverse">Inverse</Button></span><Button size="lg">Large</Button><Button size="sm">Small</Button>
              </Specimen>
              <Specimen name="Eyebrow + SectionTitle + Lede" code={'<SectionTitle>Engage <em>everyone</em></SectionTitle>'}>
                <div><Eyebrow>Product</Eyebrow><SectionTitle className="mt-2">Engage <em>everyone</em></SectionTitle><Lede className="mt-2">AI-powered workflows for all users.</Lede></div>
              </Specimen>
              <Specimen name="Product widgets" code="<MetricsCard /> <RegistrationsCard /> <ActivationCard /> <AskComposer />">
                <div className="grid w-full gap-3 sm:grid-cols-2"><MetricsCard className="h-44" /><RegistrationsCard className="h-44" /><ActivationCard className="h-36" /><AskComposer className="h-36" /></div>
              </Specimen>
              <Specimen name="Marquee — duration, direction" code={'<Marquee duration={38} direction="left">…</Marquee>'}>
                <Marquee duration={18} className="w-full">{["Montara", "bounce", "HAIRBURST", "alkry", "JUNZ"].map((n) => <span key={n} className="text-xl text-ink/70">{n}</span>)}</Marquee>
              </Specimen>
              <Specimen name="StickyScene / StickyTabs / Stories / VideoExpand / UseCases / CtaDoor" code={'<StickyScene heightVh={240}>{(progress, pinned) => …}</StickyScene>'}>
                <motion.p initial={{ opacity: 0.4 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5, ease: EASE_OUT }} className="text-[13px] text-ink-2">Each takes a scalar <code className="font-mono">heightVh</code> (or <code className="font-mono">holdVh</code>) and registers its steps as editor actions.</motion.p>
              </Specimen>
            </div>
          </Chapter>
        </Container>
      </main>
      <SiteFooter />
    </>
  )
}
