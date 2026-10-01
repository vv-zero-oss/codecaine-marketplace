import { motion } from "motion/react"
import { ArrowRight, Check, ChevronDown, Menu, Moon, Play, X } from "lucide-react"
import { useState } from "react"

import { Mark, Wordmark } from "@/components/ui/wordmark"
import { cn } from "@/lib/utils"
import { contrast, toHex, useComputed } from "./read-style"
import { GroupLabel } from "./specimen"

const GROUPS: { title: string; tokens: string[] }[] = [
  { title: "Surface", tokens: ["paper", "surface", "surface-2", "bubble", "bubble-dark", "terminal", "code-bg"] },
  { title: "Text", tokens: ["ink", "ink-2", "ink-3", "terminal-ink", "terminal-dim", "code-ink"] },
  { title: "Border", tokens: ["line", "line-strong"] },
  { title: "Sky and accent", tokens: ["sky", "sky-2", "sky-ink", "accent", "accent-2", "accent-3", "frame-from", "frame-to"] },
  { title: "Status and diff", tokens: ["good", "good-soft", "warn", "warn-soft", "diff-add", "diff-del"] },
  { title: "Code", tokens: ["code-key", "code-str", "code-var"] },
]

/** One swatch in both themes: a wrapper with `data-theme` recomputes every token under its own value. */
function Swatch({ token, theme }: { token: string; theme: "light" | "dark" }) {
  const [ref, v] = useComputed<HTMLDivElement>([`--${token}`])
  const value = v[`--${token}`] ?? ""
  return (
    <div ref={ref} data-theme={theme} className="flex items-center gap-2">
      <span className="size-9 shrink-0 rounded-lg border border-line-strong" style={{ background: `var(--${token})` }} />
      <span className="min-w-0 font-mono text-[10px] leading-tight text-ink-2">
        <span className="block text-ink-3">{theme}</span>
        {toHex(value)}
      </span>
    </div>
  )
}

function ContrastRow({ fg, bg, label }: { fg: string; bg: string; label: string }) {
  const [ref, v] = useComputed<HTMLDivElement>([`--${fg}`, `--${bg}`])
  const ratio = contrast(v[`--${fg}`], v[`--${bg}`])
  const pass = ratio !== null && ratio >= 4.5
  return (
    <div ref={ref} className="flex items-center justify-between rounded-lg border border-line px-3 py-2 text-[12px]" style={{ background: `var(--${bg})`, color: `var(--${fg})` }}>
      <span>{label}</span>
      <span className="font-mono text-[11px]">
        {ratio ? ratio.toFixed(2) : "—"}:1 {pass ? "AA" : "large text only"}
      </span>
    </div>
  )
}

export function BrandIdentity() {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        {(["light", "dark"] as const).map((t) => (
          <div key={t} data-theme={t} className="flex flex-col items-center gap-6 rounded-panel border border-line bg-paper p-10 text-ink">
            <Wordmark />
            <div className="flex items-center gap-4">
              <Mark className="size-10" />
              <Mark className="size-6" />
              <Mark className="size-4" />
            </div>
            <span className="font-mono text-[10px] text-ink-3">{t} · minimum mark size 16px</span>
          </div>
        ))}
      </div>
      <div>
        <GroupLabel>Clear space</GroupLabel>
        <p className="max-w-xl text-[13px] text-ink-2">Keep one mark-height of empty space on every side of the logo. Never recolour the arc; it is the only place the accent appears in the mark.</p>
      </div>
      <div>
        <GroupLabel>Voice</GroupLabel>
        <div className="grid gap-3 sm:grid-cols-2">
          <ul className="space-y-2 rounded-panel bg-surface p-5 text-[13px]">
            <li className="flex gap-2"><Check className="mt-0.5 size-3.5 shrink-0 text-good" />Plain, specific and calm: "Usage-based pricing".</li>
            <li className="flex gap-2"><Check className="mt-0.5 size-3.5 shrink-0 text-good" />Lead with what you can do, then how.</li>
            <li className="flex gap-2"><Check className="mt-0.5 size-3.5 shrink-0 text-good" />Short sentences, sentence case, no exclamation marks.</li>
          </ul>
          <ul className="space-y-2 rounded-panel bg-surface p-5 text-[13px]">
            <li className="flex gap-2"><X className="mt-0.5 size-3.5 shrink-0 text-accent" />No hype: "revolutionary", "magical", "game-changing".</li>
            <li className="flex gap-2"><X className="mt-0.5 size-3.5 shrink-0 text-accent" />No emoji as decoration.</li>
            <li className="flex gap-2"><X className="mt-0.5 size-3.5 shrink-0 text-accent" />No claims without a number behind them.</li>
          </ul>
        </div>
      </div>
    </>
  )
}

export function ColourTokens() {
  return (
    <>
      {GROUPS.map((g) => (
        <div key={g.title}>
          <GroupLabel>{g.title}</GroupLabel>
          <div className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
            {g.tokens.map((t) => (
              <div key={t} className="rounded-xl border border-line p-3">
                <code className="font-mono text-[11px] text-ink">--{t}</code>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  <Swatch token={t} theme="light" />
                  <Swatch token={t} theme="dark" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div>
        <GroupLabel>Text contrast (current theme)</GroupLabel>
        <div className="grid gap-2 sm:grid-cols-2">
          <ContrastRow fg="ink" bg="paper" label="Ink on paper" />
          <ContrastRow fg="ink-2" bg="paper" label="Ink-2 on paper" />
          <ContrastRow fg="ink-3" bg="paper" label="Ink-3 on paper" />
          <ContrastRow fg="paper" bg="ink" label="Paper on ink (buttons)" />
          <ContrastRow fg="ink-2" bg="surface" label="Ink-2 on surface" />
          <ContrastRow fg="terminal-ink" bg="terminal" label="Terminal text" />
        </div>
      </div>
    </>
  )
}

const SCALE = [
  { name: "Display (serif)", cls: "font-serif text-[72px] leading-[0.9] tracking-[-0.02em]", sample: "Frontier AI models" },
  { name: "Section title (serif)", cls: "font-serif text-[48px] leading-[0.92] tracking-[-0.02em]", sample: "One API. Every modality." },
  { name: "Heading (serif)", cls: "font-serif text-[38px] leading-none tracking-[-0.01em]", sample: "Latest news" },
  { name: "Card title", cls: "text-[19px] font-semibold tracking-[-0.03em]", sample: "Built by teams who ship." },
  { name: "Body", cls: "text-[15px] leading-relaxed tracking-[-0.01em]", sample: "Reasoning, code, voice, images, and video." },
  { name: "UI", cls: "text-[13px]", sample: "Get API Access" },
  { name: "Caption", cls: "text-[11px]", sample: "API calls per day" },
]

function ScaleRow({ name, cls, sample }: (typeof SCALE)[number]) {
  const [ref, v] = useComputed<HTMLParagraphElement>(["font-size", "line-height", "letter-spacing", "font-weight"])
  return (
    <div className="grid items-baseline gap-2 border-b border-line py-4 sm:grid-cols-[9rem_1fr]">
      <div className="font-mono text-[10px] text-ink-3">
        <span className="block text-ink-2">{name}</span>
        {v["font-size"]} / {v["line-height"]} · {v["letter-spacing"]} · {v["font-weight"]}
      </div>
      <p ref={ref} className={cn("min-w-0 break-words", cls)}>{sample}</p>
    </div>
  )
}

export function Typography() {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-panel bg-surface p-6">
          <p className="font-serif text-[64px] leading-none">Aa</p>
          <p className="mt-3 text-[13px] text-ink-2">Instrument Serif for display: the hero, section titles and the product names on news covers. Inter Tight for everything else — 400, 500 and 600.</p>
        </div>
        <div className="rounded-panel bg-surface p-6">
          <p className="font-mono text-[40px] leading-none">{"{ }"}</p>
          <p className="mt-3 text-[13px] text-ink-2">JetBrains Mono, 400 and 500. Code, the terminal and tokens only.</p>
        </div>
      </div>
      <div>
        <GroupLabel>Scale</GroupLabel>
        {SCALE.map((s) => (
          <ScaleRow key={s.name} {...s} />
        ))}
      </div>
      <div>
        <GroupLabel>Numerals</GroupLabel>
        <p className="text-[32px] tracking-[-0.04em] tabular-nums">0123456789 · 400M+ · 200K · &lt;200ms</p>
      </div>
    </>
  )
}

const RADII = [
  ["rounded-[3px]", "3px — buttons, tabs, tags: the sharp control"],
  ["rounded-lg", "8px — thumbnails, grouped rows"],
  ["rounded-card", "12px — product cards"],
  ["rounded-panel", "16px — plan cards, menus"],
  ["rounded-full", "circle — avatars, dots"],
]
const SHADOWS = [
  ["shadow-card", "Resting cards"],
  ["shadow-pop", "Menus and hovered cards"],
  ["shadow-button", "Filled buttons"],
  ["shadow-frame", "Code window on its frame"],
]
const SPACING = [4, 8, 12, 16, 24, 32, 48, 64, 96]

export function SpaceAndSurface() {
  return (
    <>
      <div>
        <GroupLabel>Spacing (4px grid)</GroupLabel>
        <div className="space-y-2">
          {SPACING.map((s) => (
            <div key={s} className="flex items-center gap-3 font-mono text-[10px] text-ink-3">
              <span className="w-8">{s}px</span>
              <span className="h-2 rounded-sm bg-ink/80" style={{ width: s * 2 }} />
            </div>
          ))}
        </div>
      </div>
      <div>
        <GroupLabel>Radii</GroupLabel>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          {RADII.map(([cls, note]) => (
            <div key={cls}>
              <div className={cn("h-20 border border-line-strong bg-surface", cls)} />
              <p className="mt-2 font-mono text-[10px] text-ink-2">{cls}</p>
              <p className="text-[11px] text-ink-3">{note}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <GroupLabel>Shadows</GroupLabel>
        <div className="grid grid-cols-2 gap-4 rounded-panel bg-surface-2 p-6 sm:grid-cols-4">
          {SHADOWS.map(([cls, note]) => (
            <div key={cls}>
              <div className={cn("h-20 rounded-card bg-paper", cls)} />
              <p className="mt-3 font-mono text-[10px] text-ink-2">{cls}</p>
              <p className="text-[11px] text-ink-3">{note}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <GroupLabel>Borders</GroupLabel>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-card border border-line p-4 text-[12px]">Hairline · <code className="font-mono text-[10px]">border-line</code><br /><span className="text-ink-3">cards, header, footer</span></div>
          <div className="rounded-card border border-line-strong p-4 text-[12px]">Strong · <code className="font-mono text-[10px]">border-line-strong</code><br /><span className="text-ink-3">outline buttons</span></div>
          <div className="rounded-card border border-dashed border-line-strong p-4 text-[12px]">Dashed · <br /><span className="text-ink-3">the footer column rule</span></div>
        </div>
      </div>
    </>
  )
}

const EASES = [
  { name: "ease-out", css: "var(--ease-out)", bezier: [0.22, 1, 0.36, 1] as const, note: "Entrances and anything the visitor triggers." },
  { name: "ease-in-out", css: "var(--ease-in-out)", bezier: [0.65, 0, 0.35, 1] as const, note: "Looping pulses." },
]

export function Motion() {
  const [round, setRound] = useState(0)
  return (
    <>
      <div className="space-y-5">
        {EASES.map((e) => (
          <div key={e.name}>
            <div className="mb-2 flex items-center justify-between font-mono text-[10px] text-ink-3">
              <span>{e.name} · cubic-bezier({e.bezier.join(", ")})</span>
              <span>{e.note}</span>
            </div>
            <div className="relative h-12 overflow-hidden rounded-full bg-surface">
              <motion.span
                key={`${e.name}-${round}`}
                className="absolute top-1/2 left-1 size-8 -translate-y-1/2 rounded-full bg-ink"
                initial={{ left: 4 }}
                animate={{ left: "calc(100% - 36px)" }}
                transition={{ duration: 0.9, ease: [...e.bezier] }}
              />
            </div>
          </div>
        ))}
        <button onClick={() => setRound((r) => r + 1)} className="inline-flex h-9 items-center gap-1.5 rounded-full bg-ink px-4 text-[13px] text-paper transition-transform active:scale-95">
          <Play className="size-3 fill-current" /> Play
        </button>
      </div>
      <div className="grid gap-3 text-[13px] sm:grid-cols-3">
        {[
          ["150ms", "Press, hover and toggle feedback"],
          ["240ms", "Menus, popovers, state swaps"],
          ["600ms", "Section entrances, with a 60–70ms stagger"],
        ].map(([d, n]) => (
          <div key={d} className="rounded-xl border border-line p-4">
            <p className="font-mono text-[15px]">{d}</p>
            <p className="mt-1 text-[12px] text-ink-3">{n}</p>
          </div>
        ))}
      </div>
      <p className="text-[12px] text-ink-3">Every animation respects reduced motion; the editor's Motion switch (Playing / Stop / Reduced) drives them all.</p>
    </>
  )
}

export function Iconography() {
  const icons = [ArrowRight, Check, ChevronDown, Menu, Moon, Play, X]
  return (
    <>
      <div>
        <GroupLabel>Icons — Lucide, 1.5–2px stroke, 12–16px</GroupLabel>
        <div className="flex flex-wrap gap-3">
          {icons.map((I, i) => (
            <span key={i} className="grid size-11 place-items-center rounded-xl border border-line text-ink-2">
              <I className="size-4" />
            </span>
          ))}
        </div>
      </div>
      <div>
        <GroupLabel>Imagery</GroupLabel>
        <p className="max-w-xl text-[13px] text-ink-2">
          Real photography from Pexels, art-directed to the product it illustrates: clean, high-contrast subjects on simple backdrops. Blue gradients are reserved for the news covers and the code frame; the voice orb is the only illustration. The pixel mosaic — square cells, sparse toward the content and dense at the edge — is the page's one graphic motif.
        </p>
      </div>
    </>
  )
}
