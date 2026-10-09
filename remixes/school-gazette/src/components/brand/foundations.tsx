import { BookOpen, Headphones, Mic, Newspaper, Pencil, Radio, Scissors, Send, Trophy, Volume2 } from "lucide-react"
import { useEffect, useState } from "react"

import { Masthead } from "@/components/masthead"
import { Button } from "@/components/ui/button"
import { Photo } from "@/components/ui/photo"
import { Starburst } from "@/components/ui/retro"
import { PHOTOS } from "@/data/photos"
import { cn } from "@/lib/utils"
import { contrast, toHex, useComputed, useToken } from "./read-style"
import { GroupLabel } from "./specimen"

/* ─── Brand ─────────────────────────────────────────────────────────────── */

export function BrandIdentity() {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="flex min-w-0 flex-col gap-6">
        <div>
          <GroupLabel>Nameplate and clear space</GroupLabel>
          <div className="paper-card relative border-2 border-ink p-4 text-center sm:p-10">
            <div className="relative mx-auto w-fit max-w-full border border-dashed border-rust p-3 sm:p-6">
              <p className="font-display text-2xl sm:text-4xl">The Marlowe Gazette</p>
              <span aria-hidden className="absolute -top-0.5 -left-0.5 size-6 border-t-2 border-l-2 border-rust" />
            </div>
            <p className="kicker mt-4 text-ink-faint">Clear space = the height of the “M” on every side. Minimum width 120px.</p>
          </div>
        </div>
        <div>
          <GroupLabel>Masthead block — light and dark</GroupLabel>
          <div className="grid gap-3 sm:grid-cols-2">
            <Masthead text="GAZETTE" />
            <div className="bg-paper-light p-2"><Masthead text="GAZETTE" tone="rust" /></div>
          </div>
        </div>
        <div>
          <GroupLabel>Badge</GroupLabel>
          <div className="flex items-center gap-6"><Starburst label="New!" sub="issue 3" size={104} /><Starburst label="Vol. 42" size={88} spin={false} /></div>
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
        <div className="border-2 border-ink bg-paper-light p-5 shadow-card">
          <GroupLabel>Voice — do</GroupLabel>
          <ul className="flex list-disc flex-col gap-2 pl-5 text-[1rem] leading-snug">
            <li>Write like a pupil who has noticed something, with a dry joke at the end.</li>
            <li>Short sentences. Specific rooms, times and names.</li>
            <li>Use the printed-page words: issue, column, strip, desk, deadline.</li>
          </ul>
        </div>
        <div className="border-2 border-ink bg-ink p-5 text-paper-light">
          <GroupLabel>Voice — don’t</GroupLabel>
          <ul className="flex list-disc flex-col gap-2 pl-5 text-[1rem] leading-snug text-paper-light/85">
            <li>Corporate warmth: “We’re thrilled to announce…”</li>
            <li>Exclamation marks in running text. Save them for headlines.</li>
            <li>Anything a teacher would have to proofread out of it.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

/* ─── Colour ────────────────────────────────────────────────────────────── */

const COLOUR_GROUPS: { title: string; tokens: string[] }[] = [
  { title: "Paper", tokens: ["--paper", "--paper-light", "--paper-bright", "--paper-dark", "--paper-fold"] },
  { title: "Ink", tokens: ["--ink", "--ink-soft", "--ink-faint", "--ink-reverse"] },
  { title: "Spot colours", tokens: ["--rust", "--rust-deep", "--rust-light", "--brass", "--brass-deep", "--teal", "--teal-deep", "--sky", "--cocoa"] },
  { title: "Objects — radio, desk", tokens: ["--bakelite", "--bakelite-light", "--wood", "--wood-light", "--wood-dark", "--desk"] },
  { title: "LED", tokens: ["--led-amber", "--led-red", "--led-green", "--lcd-glass"] },
]

function Swatch({ token }: { token: string }) {
  const value = useToken(token)
  const hex = toHex(value)
  return (
    <div className="flex flex-col overflow-hidden border-2 border-ink bg-paper-bright">
      <div className="h-16 border-b-2 border-ink" style={{ background: `var(${token})` }} />
      <div className="flex flex-col gap-0.5 p-2">
        <code className="font-type text-[0.7rem]">{token}</code>
        <span className="font-type text-[0.7rem] text-ink-faint uppercase">{hex}</span>
      </div>
    </div>
  )
}

const PAIRS: [string, string, string][] = [
  ["Ink on paper", "--ink", "--paper"],
  ["Ink on paper light", "--ink", "--paper-light"],
  ["Paper on ink", "--paper", "--ink"],
  ["Bright paper on rust", "--paper-bright", "--rust"],
  ["Ink on brass", "--ink", "--brass"],
  ["Bright paper on teal", "--paper-bright", "--teal"],
  ["Amber LED on glass", "--led-amber", "--lcd-glass"],
]

function ContrastRow({ label, fg, bg }: { label: string; fg: string; bg: string }) {
  const fgv = useToken(fg)
  const bgv = useToken(bg)
  const ratio = contrast(fgv, bgv)
  return (
    <div className="flex items-center gap-3 border-2 border-ink p-3" style={{ background: `var(${bg})`, color: `var(${fg})` }}>
      <span className="font-condensed text-2xl leading-none">Aa</span>
      <span className="flex-1 font-type text-[0.72rem]">{label}</span>
      <span className="font-type text-[0.72rem] tabular-nums">{ratio ? `${ratio.toFixed(1)}:1` : "—"} {ratio && ratio >= 4.5 ? "AA" : ratio && ratio >= 3 ? "AA large" : "—"}</span>
    </div>
  )
}

export function ColourTokens() {
  return (
    <div className="flex flex-col gap-8">
      {COLOUR_GROUPS.map((group) => (
        <div key={group.title}>
          <GroupLabel>{group.title}</GroupLabel>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {group.tokens.map((token) => <Swatch key={token} token={token} />)}
          </div>
        </div>
      ))}
      <p className="max-w-2xl text-[0.95rem] text-ink-soft">There is one theme — paper — and one dark surface, the desk, which the radio and footer sit on. No colour is used on a page that is not in this list.</p>
      <div>
        <GroupLabel>Text pairs and contrast</GroupLabel>
        <div className="grid gap-2 sm:grid-cols-2">{PAIRS.map(([label, fg, bg]) => <ContrastRow key={label} label={label} fg={fg} bg={bg} />)}</div>
      </div>
    </div>
  )
}

/* ─── Typography ────────────────────────────────────────────────────────── */

const FAMILIES = [
  { name: "Abril Fatface", token: "--font-display", role: "Mastheads, drop caps, big numerals", sample: "Gazette 0123456789", cls: "font-display text-5xl" },
  { name: "Instrument Serif", token: "--font-condensed", role: "Condensed headlines (uppercase, thickened)", sample: "ALL NEWS! Interactive artist", cls: "display text-5xl" },
  { name: "Newsreader", token: "--font-serif", role: "Body copy, decks and answers", sample: "As a multidisciplinary freelancer, I’m passionate about creating iconic experiences.", cls: "font-serif text-xl" },
  { name: "Special Elite", token: "--font-type", role: "Labels, captions, form fields, keys", sample: "TIP! Press the key. No. 042", cls: "font-type text-xl" },
]

const SCALE = [
  ["Masthead", "font-display text-[clamp(4rem,12vw,9rem)]", "clamp(64–144px) · 1.0 · stretched to the block"],
  ["Display XL", "display text-[clamp(2.4rem,6.5vw,5rem)]", "38–80px · 0.88 · −0.015em · stroke 0.045em"],
  ["Display L", "display text-[clamp(2rem,5.6vw,4.4rem)]", "32–70px · 0.88"],
  ["Display M", "display text-[clamp(1.8rem,3vw,2.5rem)]", "29–40px · 0.88"],
  ["Deck", "font-serif text-[clamp(1rem,1.5vw,1.2rem)] leading-snug", "16–19px · 1.375"],
  ["Body", "font-serif text-[1rem] leading-snug", "16px · 1.375"],
  ["Caption", "font-type text-[0.68rem]", "11px · 1.25"],
  ["Kicker", "kicker", "11.5px · 0.14em · uppercase"],
] as const

function ScaleRow({ name, cls, spec }: { name: string; cls: string; spec: string }) {
  const [ref, v] = useComputed<HTMLParagraphElement>(["font-size", "line-height", "letter-spacing", "font-weight"])
  return (
    <div className="grid gap-2 border-b border-ink/40 py-4 md:grid-cols-[8rem_1fr_auto] md:items-baseline md:gap-6">
      <span className="kicker text-ink-faint">{name}</span>
      <p ref={ref} className={cn("min-w-0 truncate", cls)}>The quick brown fox</p>
      <span className="font-type text-[0.68rem] text-ink-faint md:text-right">{spec}<br />rendered {v["font-size"]} / {v["line-height"]} / ls {v["letter-spacing"]}</span>
    </div>
  )
}

export function Typography() {
  return (
    <div className="flex flex-col gap-10">
      <div className="grid gap-4 md:grid-cols-2">
        {FAMILIES.map((f) => (
          <div key={f.name} className="border-2 border-ink bg-paper-light p-5 shadow-card">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-condensed text-2xl uppercase">{f.name}</h3>
              <code className="font-type text-xs text-ink-faint">{f.token}</code>
            </div>
            <p className="mt-1 mb-4 text-[0.9rem] text-ink-soft">{f.role}</p>
            <p className={cn("leading-tight", f.cls)}>{f.sample}</p>
          </div>
        ))}
      </div>
      <div>
        <GroupLabel>Scale</GroupLabel>
        {SCALE.map(([name, cls, spec]) => <ScaleRow key={name} name={name} cls={cls} spec={spec} />)}
      </div>
      <div>
        <GroupLabel>Numerals</GroupLabel>
        <p className="font-type text-3xl tabular-nums">0123456789 · 1962 · 42.5 MHz</p>
      </div>
    </div>
  )
}

/* ─── Spacing, radii, shadows, borders ──────────────────────────────────── */

const SHADOWS = ["--shadow-key", "--shadow-key-down", "--shadow-card", "--shadow-stamp", "--shadow-emboss", "--shadow-deboss", "--shadow-cabinet", "--shadow-knob"]
const RADII = ["--radius-sharp", "--radius-card", "--radius-key", "--radius-cabinet"]
const BORDERS = [["--border-ink", "Ink, 2px — cards, keys, frames"], ["--border-hair", "Hairline, 1px — photos, column rules"], ["--border-faint", "Faint, 1px — ledger lines"]]

function ShadowSample({ token }: { token: string }) {
  const v = useToken(token)
  return (
    <div className={cn("flex flex-col gap-3 p-3", token === "--shadow-deboss" ? "bg-ink" : "bg-paper")}>
      <div className="h-16 rounded-key border-2 border-ink bg-paper-bright" style={{ boxShadow: `var(${token})`, background: token === "--shadow-deboss" ? "var(--lcd-glass)" : undefined }} />
      <code className="font-type text-[0.7rem]">{token}</code>
      <span className="line-clamp-2 font-type text-[0.62rem] text-ink-faint" title={v}>{v}</span>
    </div>
  )
}

export function SpaceAndSurface() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <GroupLabel>Spacing — a 4px grid</GroupLabel>
        <div className="flex flex-wrap items-end gap-3">
          {[1, 2, 3, 4, 6, 8, 12, 16].map((n) => (
            <div key={n} className="flex flex-col items-center gap-1">
              <div className="bg-rust" style={{ width: n * 4, height: n * 4 }} />
              <span className="font-type text-[0.66rem] text-ink-faint">{n * 4}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 max-w-xl text-[0.92rem] text-ink-soft">Sections breathe at 56px (py-14); columns sit 24–32px apart with a hairline between; a key’s hit area is never under 44px.</p>
      </div>
      <div>
        <GroupLabel>Radii</GroupLabel>
        <div className="flex flex-wrap gap-4">
          {RADII.map((r) => (
            <div key={r} className="flex flex-col items-start gap-2">
              <div className="size-20 border-2 border-ink bg-paper-bright" style={{ borderRadius: `var(${r})` }} />
              <code className="font-type text-[0.68rem]">{r}</code>
            </div>
          ))}
        </div>
      </div>
      <div>
        <GroupLabel>Shadows</GroupLabel>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{SHADOWS.map((s) => <ShadowSample key={s} token={s} />)}</div>
      </div>
      <div>
        <GroupLabel>Borders</GroupLabel>
        <div className="grid gap-3 sm:grid-cols-3">
          {BORDERS.map(([t, d]) => (
            <div key={t} className="flex flex-col gap-2 bg-paper-bright p-4" style={{ border: `var(${t})` }}>
              <code className="font-type text-[0.7rem]">{t}</code>
              <span className="text-[0.88rem] text-ink-soft">{d}</span>
            </div>
          ))}
          <div className="rule-double bg-paper-bright p-4"><code className="font-type text-[0.7rem]">.rule-double</code><p className="text-[0.88rem] text-ink-soft">Section break.</p></div>
        </div>
      </div>
    </div>
  )
}

/* ─── Motion ────────────────────────────────────────────────────────────── */

const EASES: [string, string, string][] = [
  ["--ease-out", "cubic-bezier(0.23, 1, 0.32, 1)", "Entrances, knobs, anything that arrives"],
  ["--ease-in-out", "cubic-bezier(0.77, 0, 0.175, 1)", "Things that move across the screen"],
  ["--ease-press", "cubic-bezier(0.2, 0, 0, 1)", "Keys going down and up"],
]
const DURATIONS = [["--duration-press", "90ms"], ["--duration-fast", "160ms"], ["--duration-base", "280ms"], ["--duration-toss", "1150ms"]]

function EasePlayer({ name, curve, use, run }: { name: string; curve: string; use: string; run: number }) {
  const [x, setX] = useState(false)
  useEffect(() => {
    if (!run) return
    setX(false)
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setX(true)))
    return () => cancelAnimationFrame(id)
  }, [run])
  return (
    <div className="flex flex-col gap-2 border-2 border-ink bg-paper-light p-4">
      <div className="flex items-baseline justify-between gap-3"><code className="font-type text-[0.74rem]">{name}</code><span className="font-type text-[0.62rem] text-ink-faint">{curve}</span></div>
      <div className="relative h-10 border-b-2 border-dashed border-ink/50">
        <div className="absolute top-0 left-0 size-9 rounded-key border-2 border-ink bg-rust shadow-[0_3px_0_var(--ink)]" style={{ transform: `translateX(${x ? "calc(min(100vw - 8rem, 18rem) - 100%)" : "0"})`, transition: `transform 900ms var(${name})` }} />
      </div>
      <p className="text-[0.86rem] text-ink-soft">{use}</p>
    </div>
  )
}

export function Motion() {
  const [run, setRun] = useState(0)
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-4"><Button variant="rust" onClick={() => setRun((n) => n + 1)}>Play all three</Button><p className="text-[0.92rem] text-ink-soft">Keys press in 90ms; things arrive on ease-out; the page toss is 1.15s with a 6° overshoot.</p></div>
      <div className="grid gap-4 lg:grid-cols-3">{EASES.map(([n, c, u]) => <EasePlayer key={n} name={n} curve={c} use={u} run={run} />)}</div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {DURATIONS.map(([n, v]) => (
          <div key={n} className="border-2 border-ink bg-paper-bright p-3"><code className="font-type text-[0.7rem]">{n}</code><p className="font-display text-2xl">{v}</p></div>
        ))}
      </div>
    </div>
  )
}

/* ─── Iconography and imagery ───────────────────────────────────────────── */

const ICONS = [[Newspaper, "Newspaper"], [Radio, "Radio"], [Volume2, "Volume"], [Headphones, "Headphones"], [Mic, "Mic"], [Pencil, "Pencil"], [BookOpen, "BookOpen"], [Trophy, "Trophy"], [Scissors, "Scissors"], [Send, "Send"]] as const

export function Iconography() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div>
        <GroupLabel>Lucide — 1.5–2px stroke, 16–20px</GroupLabel>
        <div className="grid grid-cols-5 gap-3">
          {ICONS.map(([Icon, name]) => (
            <div key={name} className="flex flex-col items-center gap-2 border-2 border-ink bg-paper-bright p-3"><Icon className="size-6" /><span className="font-type text-[0.58rem]">{name}</span></div>
          ))}
        </div>
        <p className="mt-3 text-[0.92rem] text-ink-soft">Icons come from Lucide. For emphasis, use type instead: stars, manicules ☞ and numerals set in Abril Fatface.</p>
      </div>
      <div>
        <GroupLabel>Photography — as printed</GroupLabel>
        <div className="grid grid-cols-2 gap-3">
          <div><img src={PHOTOS.friends} alt="Friends outside school, untreated" className="aspect-[4/3] w-full border border-ink object-cover" /><p className="mt-1 font-type text-[0.66rem] text-ink-faint">Original</p></div>
          <div><Photo src={PHOTOS.friends} alt="The same photo with the print treatment" className="aspect-[4/3] w-full" /><p className="mt-1 font-type text-[0.66rem] text-ink-faint">Sepia 0.5 · halftone 3px · hairline frame</p></div>
        </div>
        <p className="mt-3 text-[0.92rem] text-ink-soft">Real photography from Pexels, always people or places in the school. It wakes to full colour on hover. Credit sits in the footer.</p>
      </div>
    </div>
  )
}
