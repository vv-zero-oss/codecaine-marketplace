import { Bug, Eye, Globe, Lock, Mail, Zap, KeyRound } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import { PixelSprite } from "@/components/pixel/pixel-sprite"
import { SPRITES, type SpriteName } from "@/components/pixel/sprites"
import { Wordmark } from "@/components/pixel/wordmark"
import { Button } from "@/components/ui/button"
import { PALETTES } from "@/lib/template-generator"
import { cn } from "@/lib/utils"
import city from "@/assets/city-pixel.png"
import peaks from "@/assets/peaks-pixel.png"
import sky from "@/assets/sky-pixel.png"
import { contrast, toHex, toRgb, useToken } from "./read-style"
import { SubHeading } from "./specimen"

const GROUPS: { title: string; tokens: string[] }[] = [
  { title: "Surface", tokens: ["bg", "surface", "surface-2", "surface-3"] },
  { title: "Text", tokens: ["fg", "fg-muted", "fg-subtle"] },
  { title: "Border", tokens: ["line", "line-strong"] },
  { title: "Accent", tokens: ["accent", "accent-hi", "accent-fg"] },
  { title: "Sky", tokens: ["sky-1", "sky-2", "sky-3", "sky-4", "sky-5", "cloud"] },
  { title: "Status", tokens: ["good", "warn", "bad"] },
  { title: "Chart", tokens: ["chart-1", "chart-2", "chart-3", "chart-4"] },
]

function Swatch({ token }: { token: string }) {
  const raw = useToken(`--color-${token}`)
  const hex = raw ? toHex(toRgb(raw)) : ""
  return (
    <li className="grid gap-phi-1">
      <span className="h-16 shadow-px-sm [--px-edge:var(--color-line-strong)]" style={{ background: `var(--color-${token})` }} />
      <span className="font-display text-label-sm uppercase leading-snug">--color-{token}</span>
      <span className="break-all font-mono text-base leading-none text-fg-muted">{hex}</span>
    </li>
  )
}

function Pair({ label, fg, bg }: { label: string; fg: string; bg: string }) {
  const f = useToken(`--color-${fg}`)
  const b = useToken(`--color-${bg}`)
  const ratio = f && b ? contrast(toRgb(f), toRgb(b)) : 0
  const grade = ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : ratio >= 3 ? "AA large" : "Fail"
  return (
    <tr className="border-t-2 border-line">
      <td className="p-phi-2"><span className="px-phi-2 py-1.5 text-base" style={{ color: `var(--color-${fg})`, background: `var(--color-${bg})`, boxShadow: "0 0 0 2px var(--color-line)" }}>Aa</span></td>
      <td className="p-phi-2 text-base">{label}</td>
      <td className="p-phi-2 font-mono text-lg tabular-nums">{ratio.toFixed(2)} : 1</td>
      <td className="p-phi-2 font-mono text-lg">{grade}</td>
    </tr>
  )
}

export function BrandIdentity() {
  return (
    <>
      <div className="grid gap-phi-3 md:grid-cols-2">
        <div className="grid min-h-48 place-items-center bg-bg p-phi-4 shadow-px [--px-edge:var(--color-line)]"><div className="scale-150"><Wordmark /></div></div>
        <div className="grid min-h-48 place-items-center bg-fg p-phi-4 text-bg shadow-px [--px-edge:var(--color-fg)]"><div className="scale-150"><Wordmark /></div></div>
      </div>
      <div className="grid gap-phi-3 lg:grid-cols-2">
        <div>
          <SubHeading>clear space</SubHeading>
          <div className="mt-phi-2 inline-block bg-surface p-phi-2 shadow-px-sm [--px-edge:var(--color-line)]">
            <div className="bg-bg p-phi-3 outline-2 outline-dashed outline-accent"><Wordmark /></div>
          </div>
          <p className="mt-phi-2 text-base text-fg-muted">Keep one shield-width (16px at the standard size) clear on every side. The minimum size is the shield at 2× — 24px wide.</p>
        </div>
        <div>
          <SubHeading>voice</SubHeading>
          <div className="mt-phi-2 grid gap-phi-2 text-base sm:grid-cols-2">
            <ul className="grid gap-phi-1 bg-surface p-phi-2 shadow-px-sm [--px-edge:var(--color-good)]">
              <li className="font-display text-label-sm uppercase text-good">Do</li>
              <li>Short, plain, a little playful.</li><li>Game words as seasoning: run, level, loot.</li><li>Say what it does, then stop.</li>
            </ul>
            <ul className="grid gap-phi-1 bg-surface p-phi-2 shadow-px-sm [--px-edge:var(--color-bad)]">
              <li className="font-display text-label-sm uppercase text-bad">Don’t</li>
              <li>Fear or doom-scrolling statistics.</li><li>A joke on every line.</li><li>Jargon without a sentence of help.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export function ColourTokens() {
  return (
    <>
      <p className="text-base text-fg-muted">Pixelkeep ships one night theme. Every colour below is read from the stylesheet as it is now — roll a palette on the generator, paint the site, and these swatches follow.</p>
      {GROUPS.map((group) => (
        <div key={group.title}>
          <SubHeading>{group.title}</SubHeading>
          <ul className="mt-phi-2 grid grid-cols-2 gap-phi-3 sm:grid-cols-3 lg:grid-cols-4">
            {group.tokens.map((t) => <Swatch key={t} token={t} />)}
          </ul>
        </div>
      ))}
      <div>
        <SubHeading>contrast</SubHeading>
        <div className="mt-phi-2 overflow-x-auto shadow-px-sm [--px-edge:var(--color-line)]">
          <table className="w-full min-w-[30rem] border-collapse bg-surface text-left">
            <thead className="bg-surface-2 font-display text-label-sm uppercase"><tr><th className="p-phi-2">Pair</th><th className="p-phi-2">Use</th><th className="p-phi-2">Ratio</th><th className="p-phi-2">Grade</th></tr></thead>
            <tbody>
              <Pair label="Text on background" fg="fg" bg="bg" />
              <Pair label="Muted text on background" fg="fg-muted" bg="bg" />
              <Pair label="Subtle text on background" fg="fg-subtle" bg="bg" />
              <Pair label="Accent link on background" fg="accent-hi" bg="bg" />
              <Pair label="Text on accent button" fg="accent-fg" bg="accent" />
              <Pair label="Text on primary button" fg="bg" bg="fg" />
              <Pair label="Status good on background" fg="good" bg="bg" />
              <Pair label="Status bad on background" fg="bad" bg="bg" />
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <SubHeading>generator palettes</SubHeading>
        <ul className="mt-phi-2 grid gap-phi-2 sm:grid-cols-2">
          {PALETTES.map((p) => (
            <li key={p.name} className="flex items-center justify-between gap-phi-2 bg-surface p-phi-2 shadow-px-sm [--px-edge:var(--color-line)]">
              <span className="font-display text-label-sm uppercase">{p.name}</span>
              <span className="flex">{[p.bg, p.surface, p.fg, p.accent, p.accentHi, ...p.sky].map((c, i) => <span key={i} className="size-5 border-2 border-bg" style={{ background: c }} />)}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

const SCALE = [
  { token: "7xl", use: "Hero statement", cls: "text-7xl font-bold", sample: "Play safe" },
  { token: "5xl", use: "Hero headline", cls: "text-5xl font-bold", sample: "Play safe on the web" },
  { token: "4xl", use: "Page and section titles", cls: "text-4xl font-bold", sample: "Nothing in the way." },
  { token: "3xl", use: "Sub-section titles", cls: "text-3xl font-bold", sample: "Stop the bad level" },
  { token: "2xl", use: "Card figures", cls: "text-2xl font-bold", sample: "Three jobs, one screen" },
  { token: "xl", use: "Card titles", cls: "text-xl font-semibold", sample: "Install the agent" },
  { token: "lg", use: "Lead and blurbs", cls: "text-lg", sample: "Every request is checked on the device." },
  { token: "base", use: "Body", cls: "text-base", sample: "Checks run beside the browser, so pages load at their normal speed." },
  { token: "sm", use: "Captions", cls: "text-sm", sample: "Estimate only, your numbers will differ." },
  { token: "label", use: "8-bit labels", cls: "font-display text-label uppercase", sample: "BOOK A DEMO" },
]

/** One row of the scale, measured off the rendered element, not typed in. */
function ScaleRow({ token, use, cls, sample }: (typeof SCALE)[number]) {
  const ref = useRef<HTMLParagraphElement>(null)
  const [m, setM] = useState({ size: "", lh: "", ls: "" })
  useEffect(() => {
    const read = () => {
      if (!ref.current) return
      const c = getComputedStyle(ref.current)
      setM({ size: `${Math.round(parseFloat(c.fontSize) * 10) / 10}px`, lh: (parseFloat(c.lineHeight) / parseFloat(c.fontSize)).toFixed(2), ls: c.letterSpacing === "normal" ? "0" : `${Math.round((parseFloat(c.letterSpacing) / parseFloat(c.fontSize)) * 1000) / 1000}em` })
    }
    read()
    window.addEventListener("resize", read)
    return () => window.removeEventListener("resize", read)
  }, [])
  return (
    <div className="grid gap-phi-1 border-t-2 border-line bg-surface p-phi-3 first:border-t-0 lg:grid-cols-[13rem_1fr] lg:gap-phi-4">
      <div>
        <p className="font-display text-label-sm uppercase">text-{token}</p>
        <p className="mt-phi-1 font-mono text-lg text-fg-subtle">{m.size} · lh {m.lh} · ls {m.ls}</p>
        <p className="font-mono text-lg text-fg-subtle">{use}</p>
      </div>
      <p ref={ref} className={cn("min-w-0 break-words", cls)}>{sample}</p>
    </div>
  )
}

export function Typography() {
  return (
    <>
      <p className="max-w-measure text-base text-fg-muted">The scale is golden: the base is 18px and every step up is the one before times √φ (1.272), so any two steps make one φ (1.618). Above <code className="font-mono">2xl</code> the sizes are fluid between 360px and 1440px. Line-height tightens as size grows, from 1.5 on body to under 1 on the biggest.</p>
      <div className="grid gap-phi-3 md:grid-cols-3">
        {[
          { name: "Pixelify Sans", cls: "font-sans", use: "Reading and headlines", sample: "Aa Bb 0123" },
          { name: "Press Start 2P", cls: "font-display", use: "Labels and figures only", sample: "AA BB 0123" },
          { name: "VT323", cls: "font-mono", use: "Readouts, coordinates, code", sample: "Aa Bb 0123" },
        ].map((f) => (
          <div key={f.name} className="bg-surface p-phi-3 shadow-px [--px-edge:var(--color-line)]">
            <p className={cn("text-3xl", f.cls)}>{f.sample}</p>
            <p className="mt-phi-3 font-display text-label-sm uppercase">{f.name}</p>
            <p className="mt-phi-1 text-base text-fg-muted">{f.use}</p>
          </div>
        ))}
      </div>
      <div className="overflow-hidden shadow-px [--px-edge:var(--color-line)]">
        {SCALE.map((row) => <ScaleRow key={row.token} {...row} />)}
      </div>
      <div className="bg-surface p-phi-3 shadow-px-sm [--px-edge:var(--color-line)]">
        <SubHeading>numerals</SubHeading>
        <p className="mt-phi-2 font-display text-2xl tabular-nums">0123456789</p>
        <p className="mt-phi-1 font-mono text-xl tabular-nums text-fg-muted">99.99% · 3ms · 14,200</p>
      </div>
    </>
  )
}

const SHADOWS = [
  { name: "shadow-px", note: "Hard border: four 4px offsets, notched corners" },
  { name: "shadow-px-sm", note: "Same, at 2px" },
  { name: "shadow-px-drop", note: "Border + one 8px hard drop" },
  { name: "shadow-px-lift", note: "Border + 12px drop, for cards that tilt" },
  { name: "shadow-px-glow", note: "Border + 8px halo, for what to touch first" },
]

const EASINGS = [
  { name: "step", value: "steps(4, end)", ease: "steps(4, end)", note: "Sprites, toggles, chevrons" },
  { name: "out", value: "cubic-bezier(.22,.9,.24,1)", ease: "cubic-bezier(.22,.9,.24,1)", note: "Panels and entrances" },
  { name: "in-out", value: "cubic-bezier(.65,0,.35,1)", ease: "cubic-bezier(.65,0,.35,1)", note: "Loops and tweens" },
]

function EasingDemo({ ease, duration }: { ease: string; duration: number }) {
  const [on, setOn] = useState(false)
  return (
    <div className="grid gap-phi-2">
      <div className="relative h-8 bg-bg shadow-px-sm [--px-edge:var(--color-line)]">
        <span className="absolute left-1 top-1 size-6 bg-accent" style={{ transform: `translateX(${on ? "calc(var(--track, 100%) - 0px)" : "0px"})`, left: on ? "calc(100% - 28px)" : "4px", transition: `left ${duration}ms ${ease}` }} />
      </div>
      <Button variant="outline" size="sm" onClick={() => setOn((v) => !v)}>Play</Button>
    </div>
  )
}

export function SpaceAndSurface() {
  const ref = useRef(null)
  return (
    <>
      <div ref={ref}>
        <SubHeading>spacing · φ steps</SubHeading>
        <p className="mt-phi-2 max-w-measure text-base text-fg-muted">Each space is the last times φ, starting at 8px: 8 · 13 · 21 · 34 · 55 · 89 · 144. Padding, gaps and section rhythm all use these and nothing else, so negative space grows in proportion. Sections breathe at 89px on a phone and 144px on a desktop.</p>
        <div className="mt-phi-3 flex flex-wrap items-end gap-phi-3">
          {[["phi-1", 8], ["phi-2", 13], ["phi-3", 21], ["phi-4", 34], ["phi-5", 55], ["phi-6", 89], ["phi-7", 144]].map(([n, px]) => (
            <div key={n} className="grid justify-items-center gap-phi-1"><span className="bg-accent" style={{ width: Number(px), height: Number(px) }} /><span className="font-mono text-lg text-fg-muted">{n}</span><span className="font-mono text-lg text-fg-subtle">{px}px</span></div>
          ))}
        </div>
      </div>
      <div>
        <SubHeading>layout · 1 : φ</SubHeading>
        <p className="mt-phi-2 max-w-measure text-base text-fg-muted">Two-column sections split 38.2 : 61.8, with the heading or story in the narrow column and the content in the wide one, alternating down a page. A reading line is capped at 36rem, about 62 characters.</p>
        <div className="mt-phi-3 grid h-24 grid-cols-[1fr_1.618fr] gap-phi-3"><span className="bg-surface-3 shadow-px-sm [--px-edge:var(--color-line-strong)]" /><span className="bg-accent/40 shadow-px-sm [--px-edge:var(--color-accent)]" /></div>
      </div>
      <div>
        <SubHeading>radii</SubHeading>
        <p className="mt-phi-2 max-w-measure text-base text-fg-muted">There are none. Every radius token resolves to 0 — corners are notched with the border shadows instead, which is what makes a box read as a sprite.</p>
      </div>
      <div>
        <SubHeading>shadows</SubHeading>
        <ul className="mt-phi-3 grid gap-phi-4 sm:grid-cols-2 lg:grid-cols-3">
          {SHADOWS.map((s) => (
            <li key={s.name} className="grid gap-phi-2">
              <div className={cn("grid h-24 place-items-center bg-surface-2 [--px-drop:rgba(0,0,0,0.5)] [--px-edge:var(--color-line-strong)] [--px-halo:rgba(139,92,246,0.4)]", s.name)}>
                <span className="font-display text-label-sm uppercase">{s.name}</span>
              </div>
              <p className="text-base text-fg-muted">{s.note}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <SubHeading>borders</SubHeading>
        <div className="mt-phi-2 grid gap-phi-2 sm:grid-cols-3">
          <div className="border-2 border-line bg-surface p-phi-2 text-base">2px hairline — section edges, table rows</div>
          <div className="border-4 border-line-strong bg-surface p-phi-2 text-base">4px rule — footer and strip edges</div>
          <div className="border-4 border-dotted border-fg/40 bg-surface p-phi-2 text-base">4px dotted — the tear line on the pass</div>
        </div>
      </div>
      <div>
        <SubHeading>motion</SubHeading>
        <div className="mt-phi-2 grid gap-phi-4 md:grid-cols-3">
          {EASINGS.map((e) => (
            <div key={e.name} className="grid gap-phi-2 bg-surface p-phi-2 shadow-px-sm [--px-edge:var(--color-line)]">
              <p className="font-display text-label-sm uppercase">{e.name}</p>
              <p className="font-mono text-base text-fg-muted">{e.value}</p>
              <EasingDemo ease={e.ease} duration={600} />
              <p className="text-base text-fg-muted">{e.note}</p>
            </div>
          ))}
        </div>
        <p className="mt-phi-2 font-mono text-lg text-fg-muted">Durations: fast 120ms · base 240ms · slow 600ms. Reduced motion collapses every one of them.</p>
      </div>
    </>
  )
}

export function Iconography() {
  return (
    <>
      <div>
        <SubHeading>sprites</SubHeading>
        <ul className="mt-phi-2 grid grid-cols-3 gap-phi-2 sm:grid-cols-5 lg:grid-cols-7">
          {(Object.keys(SPRITES) as SpriteName[]).map((name) => (
            <li key={name} className="grid justify-items-center gap-phi-2 bg-surface p-phi-2 shadow-px-sm [--px-edge:var(--color-line)]">
              <PixelSprite name={name} scale={4} />
              <span className="font-mono text-base text-fg-muted">{name}</span>
            </li>
          ))}
        </ul>
        <p className="mt-phi-2 text-base text-fg-muted">Drawn as text in <code className="font-mono">pixel/sprites.ts</code>, one character per pixel, coloured by token. Use scale 2–6; never a fractional one.</p>
      </div>
      <div>
        <SubHeading>interface icons</SubHeading>
        <div className="mt-phi-2 flex flex-wrap gap-phi-3 bg-surface p-phi-3 shadow-px-sm [--px-edge:var(--color-line)]">
          {[Bug, Eye, Globe, Lock, Mail, Zap, KeyRound].map((Icon, i) => <Icon key={i} className="size-6" strokeWidth={2.5} />)}
        </div>
        <p className="mt-phi-2 text-base text-fg-muted">Lucide, at 2.5 stroke, for controls and chrome. Sprites are for things with a character.</p>
      </div>
      <div>
        <SubHeading>imagery</SubHeading>
        <ul className="mt-phi-2 grid gap-phi-2 sm:grid-cols-3">
          {[sky, city, peaks].map((src, i) => (
            <li key={i}><img src={src} alt="" className="pixelated aspect-[3/2] w-full object-cover shadow-px-sm [--px-edge:var(--color-line)]" /></li>
          ))}
        </ul>
        <p className="mt-phi-2 max-w-measure text-base text-fg-muted">Photography from Pexels, scaled down to 256px wide, reduced to a 28-colour palette with an ordered dither and shown with <code className="font-mono">image-rendering: pixelated</code>. Always under a token-coloured wash.</p>
      </div>
    </>
  )
}
