import { Bug, Eye, Globe, Lock, Mail, Zap, KeyRound } from "lucide-react"
import { useRef, useState } from "react"

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
    <li className="grid gap-2">
      <span className="h-16 shadow-px-sm [--px-edge:var(--color-line-strong)]" style={{ background: `var(--color-${token})` }} />
      <span className="font-display text-[8px] uppercase leading-snug">--color-{token}</span>
      <span className="break-all font-mono text-lg leading-none text-fg-muted">{hex}</span>
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
      <td className="p-3"><span className="px-3 py-1.5 text-lg" style={{ color: `var(--color-${fg})`, background: `var(--color-${bg})`, boxShadow: "0 0 0 2px var(--color-line)" }}>Aa</span></td>
      <td className="p-3 text-lg">{label}</td>
      <td className="p-3 font-mono text-xl tabular-nums">{ratio.toFixed(2)} : 1</td>
      <td className="p-3 font-mono text-xl">{grade}</td>
    </tr>
  )
}

export function BrandIdentity() {
  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="grid min-h-48 place-items-center bg-bg p-10 shadow-px [--px-edge:var(--color-line)]"><div className="scale-150"><Wordmark /></div></div>
        <div className="grid min-h-48 place-items-center bg-fg p-10 text-bg shadow-px [--px-edge:var(--color-fg)]"><div className="scale-150"><Wordmark /></div></div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <SubHeading>clear space</SubHeading>
          <div className="mt-4 inline-block bg-surface p-4 shadow-px-sm [--px-edge:var(--color-line)]">
            <div className="bg-bg p-6 outline-2 outline-dashed outline-accent"><Wordmark /></div>
          </div>
          <p className="mt-3 text-lg text-fg-muted">Keep one shield-width (16px at the standard size) clear on every side. The minimum size is the shield at 2× — 24px wide.</p>
        </div>
        <div>
          <SubHeading>voice</SubHeading>
          <div className="mt-4 grid gap-3 text-lg sm:grid-cols-2">
            <ul className="grid gap-2 bg-surface p-4 shadow-px-sm [--px-edge:var(--color-good)]">
              <li className="font-display text-[9px] uppercase text-good">Do</li>
              <li>Short, plain, a little playful.</li><li>Game words as seasoning: run, level, loot.</li><li>Say what it does, then stop.</li>
            </ul>
            <ul className="grid gap-2 bg-surface p-4 shadow-px-sm [--px-edge:var(--color-bad)]">
              <li className="font-display text-[9px] uppercase text-bad">Don’t</li>
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
      <p className="text-lg text-fg-muted">Pixelkeep ships one night theme. Every colour below is read from the stylesheet as it is now — roll a palette on the generator, paint the site, and these swatches follow.</p>
      {GROUPS.map((group) => (
        <div key={group.title}>
          <SubHeading>{group.title}</SubHeading>
          <ul className="mt-4 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {group.tokens.map((t) => <Swatch key={t} token={t} />)}
          </ul>
        </div>
      ))}
      <div>
        <SubHeading>contrast</SubHeading>
        <div className="mt-4 overflow-x-auto shadow-px-sm [--px-edge:var(--color-line)]">
          <table className="w-full min-w-[30rem] border-collapse bg-surface text-left">
            <thead className="bg-surface-2 font-display text-[8px] uppercase"><tr><th className="p-3">Pair</th><th className="p-3">Use</th><th className="p-3">Ratio</th><th className="p-3">Grade</th></tr></thead>
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
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {PALETTES.map((p) => (
            <li key={p.name} className="flex items-center justify-between gap-4 bg-surface p-3 shadow-px-sm [--px-edge:var(--color-line)]">
              <span className="font-display text-[9px] uppercase">{p.name}</span>
              <span className="flex">{[p.bg, p.surface, p.fg, p.accent, p.accentHi, ...p.sky].map((c, i) => <span key={i} className="size-5 border-2 border-bg" style={{ background: c }} />)}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

const SCALE = [
  { name: "Display", cls: "font-display text-[clamp(1.5rem,4vw,2.5rem)] uppercase leading-none", spec: "Press Start 2P · 24–40 · 400 · 1.0 · 0", sample: "PRESS START" },
  { name: "Headline", cls: "text-[clamp(2.75rem,8.6vw,6.25rem)] font-bold leading-[0.92] tracking-tight", spec: "Pixelify Sans · 44–100 · 700 · 0.92 · −0.025em", sample: "Play safe" },
  { name: "Title", cls: "text-[clamp(2rem,5vw,3.6rem)] font-bold leading-[0.95] tracking-tight", spec: "Pixelify Sans · 32–58 · 700 · 0.95 · −0.025em", sample: "Three jobs, one dashboard" },
  { name: "Lead", cls: "text-2xl font-semibold leading-tight", spec: "Pixelify Sans · 24 · 600 · 1.25 · 0", sample: "Every request is checked on the device." },
  { name: "Body", cls: "text-lg leading-snug", spec: "Pixelify Sans · 18 · 400 · 1.35 · 0", sample: "Checks run beside the browser, so pages load at their normal speed." },
  { name: "Label", cls: "font-display text-[10px] uppercase", spec: "Press Start 2P · 10 · 400 · 1.0 · 0.02em", sample: "BOOK A DEMO" },
  { name: "Readout", cls: "font-mono text-xl", spec: "VT323 · 20 · 400 · 1.0 · 0", sample: "37.3861° N, -122.0839° W" },
]

export function Typography() {
  return (
    <>
      <div className="grid gap-5 md:grid-cols-3">
        {[
          { name: "Pixelify Sans", cls: "font-sans", use: "Reading, headlines, buttons' neighbours", sample: "Aa Bb 0123" },
          { name: "Press Start 2P", cls: "font-display", use: "Labels, the decrypting list, numbers", sample: "AA BB 0123" },
          { name: "VT323", cls: "font-mono", use: "Readouts, coordinates, code", sample: "Aa Bb 0123" },
        ].map((f) => (
          <div key={f.name} className="bg-surface p-5 shadow-px [--px-edge:var(--color-line)]">
            <p className={cn("text-4xl", f.cls)}>{f.sample}</p>
            <p className="mt-4 font-display text-[9px] uppercase">{f.name}</p>
            <p className="mt-1 text-lg text-fg-muted">{f.use}</p>
          </div>
        ))}
      </div>
      <div className="overflow-hidden shadow-px [--px-edge:var(--color-line)]">
        {SCALE.map((row) => (
          <div key={row.name} className="grid gap-2 border-t-2 border-line bg-surface p-5 first:border-t-0 lg:grid-cols-[10rem_1fr]">
            <div><p className="font-display text-[9px] uppercase">{row.name}</p><p className="mt-1.5 font-mono text-lg text-fg-subtle">{row.spec}</p></div>
            <p className={cn("min-w-0 break-words", row.cls)}>{row.sample}</p>
          </div>
        ))}
      </div>
      <div className="bg-surface p-5 shadow-px-sm [--px-edge:var(--color-line)]">
        <SubHeading>numerals</SubHeading>
        <p className="mt-3 font-display text-3xl tabular-nums">0123456789</p>
        <p className="mt-2 font-mono text-3xl tabular-nums text-fg-muted">99.99% · 3ms · 14,200</p>
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
    <div className="grid gap-3">
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
        <SubHeading>spacing · 4px grid</SubHeading>
        <div className="mt-4 flex flex-wrap items-end gap-4">
          {[4, 8, 12, 16, 24, 32, 48, 64].map((n) => (
            <div key={n} className="grid justify-items-center gap-2"><span className="bg-accent" style={{ width: n, height: n }} /><span className="font-mono text-lg text-fg-muted">{n}</span></div>
          ))}
        </div>
      </div>
      <div>
        <SubHeading>radii</SubHeading>
        <p className="mt-3 max-w-xl text-lg text-fg-muted">There are none. Every radius token resolves to 0 — corners are notched with the border shadows instead, which is what makes a box read as a sprite.</p>
      </div>
      <div>
        <SubHeading>shadows</SubHeading>
        <ul className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {SHADOWS.map((s) => (
            <li key={s.name} className="grid gap-3">
              <div className={cn("grid h-24 place-items-center bg-surface-2 [--px-drop:rgba(0,0,0,0.5)] [--px-edge:var(--color-line-strong)] [--px-halo:rgba(139,92,246,0.4)]", s.name)}>
                <span className="font-display text-[8px] uppercase">{s.name}</span>
              </div>
              <p className="text-lg text-fg-muted">{s.note}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <SubHeading>borders</SubHeading>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="border-2 border-line bg-surface p-4 text-lg">2px hairline — section edges, table rows</div>
          <div className="border-4 border-line-strong bg-surface p-4 text-lg">4px rule — footer and strip edges</div>
          <div className="border-4 border-dotted border-fg/40 bg-surface p-4 text-lg">4px dotted — the tear line on the pass</div>
        </div>
      </div>
      <div>
        <SubHeading>motion</SubHeading>
        <div className="mt-4 grid gap-8 md:grid-cols-3">
          {EASINGS.map((e) => (
            <div key={e.name} className="grid gap-3 bg-surface p-4 shadow-px-sm [--px-edge:var(--color-line)]">
              <p className="font-display text-[9px] uppercase">{e.name}</p>
              <p className="font-mono text-lg text-fg-muted">{e.value}</p>
              <EasingDemo ease={e.ease} duration={600} />
              <p className="text-lg text-fg-muted">{e.note}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 font-mono text-xl text-fg-muted">Durations: fast 120ms · base 240ms · slow 600ms. Reduced motion collapses every one of them.</p>
      </div>
    </>
  )
}

export function Iconography() {
  return (
    <>
      <div>
        <SubHeading>sprites</SubHeading>
        <ul className="mt-4 grid grid-cols-3 gap-4 sm:grid-cols-5 lg:grid-cols-7">
          {(Object.keys(SPRITES) as SpriteName[]).map((name) => (
            <li key={name} className="grid justify-items-center gap-3 bg-surface p-4 shadow-px-sm [--px-edge:var(--color-line)]">
              <PixelSprite name={name} scale={4} />
              <span className="font-mono text-lg text-fg-muted">{name}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-lg text-fg-muted">Drawn as text in <code className="font-mono">pixel/sprites.ts</code>, one character per pixel, coloured by token. Use scale 2–6; never a fractional one.</p>
      </div>
      <div>
        <SubHeading>interface icons</SubHeading>
        <div className="mt-4 flex flex-wrap gap-5 bg-surface p-5 shadow-px-sm [--px-edge:var(--color-line)]">
          {[Bug, Eye, Globe, Lock, Mail, Zap, KeyRound].map((Icon, i) => <Icon key={i} className="size-6" strokeWidth={2.5} />)}
        </div>
        <p className="mt-3 text-lg text-fg-muted">Lucide, at 2.5 stroke, for controls and chrome. Sprites are for things with a character.</p>
      </div>
      <div>
        <SubHeading>imagery</SubHeading>
        <ul className="mt-4 grid gap-4 sm:grid-cols-3">
          {[sky, city, peaks].map((src, i) => (
            <li key={i}><img src={src} alt="" className="pixelated aspect-[3/2] w-full object-cover shadow-px-sm [--px-edge:var(--color-line)]" /></li>
          ))}
        </ul>
        <p className="mt-3 max-w-2xl text-lg text-fg-muted">Photography from Pexels, scaled down to 256px wide, reduced to a 28-colour palette with an ordered dither and shown with <code className="font-mono">image-rendering: pixelated</code>. Always under a token-coloured wash.</p>
      </div>
    </>
  )
}
