import type * as React from "react"
import { Check, Copy, Dices, Palette as PaletteIcon, RotateCcw, Timer } from "lucide-react"
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import { useCanvasAction } from "@canvas/react"
import { toast } from "sonner"

import { IsoCube } from "@/components/motion/iso-cube"
import { TiltCard } from "@/components/motion/tilt-card"
import { PageHero } from "@/components/page-hero"
import { PixelCode } from "@/components/pixel/pixel-code"
import { PixelSprite } from "@/components/pixel/pixel-sprite"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Switch } from "@/components/ui/switch"
import { newSeed } from "@/lib/rng"
import { replaceSearch } from "@/lib/router"
import { applyTheme, themeIsApplied } from "@/lib/theme"
import { generate, newSeeds, paletteVars, paramToSeeds, seedsToParam, type Spec } from "@/lib/template-generator"
import { cn } from "@/lib/utils"
import sky from "@/assets/sky-pixel.png"

const HEADING: Record<Spec["face"], string> = {
  sans: "font-sans font-bold text-5xl leading-[0.95]",
  display: "font-display uppercase text-3xl leading-tight",
  mono: "font-mono uppercase text-7xl leading-[0.9]",
}

/** The generated page, drawn at a fixed 1100px and scaled to fit its frame. */
function Page({ spec }: { spec: Spec }) {
  const heading = HEADING[spec.face]
  const hero = (
    <div className="relative isolate overflow-hidden px-10 pb-14 pt-12">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,var(--color-sky-1),var(--color-sky-2)_30%,var(--color-sky-3)_58%,var(--color-sky-4)_82%,var(--color-bg))]" />
      <div aria-hidden className="pixelated absolute inset-0 -z-10 bg-cover bg-center opacity-30 mix-blend-soft-light" style={{ backgroundImage: `url(${sky})` }} />
      {spec.layout === "center" ? (
        <div className="mx-auto max-w-2xl text-center">
          <h1 className={heading}>{spec.tagline}</h1>
          <p className="mt-5 text-xl text-fg/80">{spec.sub}</p>
          <div className="mt-8 flex justify-center gap-3"><Button variant="primary">{spec.cta}</Button><Button variant="glass">Demo</Button></div>
          <PixelSprite name="plane" scale={4} className="mx-auto mt-10 rotate-90" />
        </div>
      ) : spec.layout === "split" ? (
        <div className="grid grid-cols-[1.2fr_1fr] items-center gap-10">
          <div>
            <h1 className={heading}>{spec.tagline}</h1>
            <p className="mt-5 text-xl text-fg/80">{spec.sub}</p>
            <div className="mt-8 flex gap-3"><Button variant="primary">{spec.cta}</Button><Button variant="glass">Demo</Button></div>
          </div>
          <div className="relative bg-fg/10 p-6 pr-20 shadow-px [--px-edge:color-mix(in_oklab,var(--color-fg)_60%,transparent)]">
            <p className="font-display text-[10px] uppercase text-fg/60">Access pass</p>
            <p className="mt-16 text-2xl font-semibold">{spec.cta}</p>
            <PixelCode seed={spec.seeds.copy} className="absolute bottom-5 right-5 top-5 w-12" />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-[auto_1fr] items-center gap-10">
          <IsoCube size={110} tone="accent" speed={10} />
          <div>
            <h1 className={heading}>{spec.tagline}</h1>
            <p className="mt-4 text-xl text-fg/80">{spec.sub}</p>
            <Button variant="primary" className="mt-6">{spec.cta}</Button>
          </div>
        </div>
      )}
    </div>
  )
  return (
    <div className="w-[1100px] bg-bg text-fg">
      <div className="flex items-center justify-between border-b-2 border-line px-10 py-4">
        <span className="flex items-center gap-2"><PixelSprite name="shield" scale={2} /><b className="font-display text-xs uppercase">{spec.name}</b></span>
        <span className="flex gap-6 font-display text-[9px] uppercase text-fg-muted"><span>Product</span><span>Pricing</span><span>Docs</span></span>
      </div>
      {hero}
      {spec.sections.map((kind) => {
        if (kind === "features")
          return (
            <div key={kind} className="grid grid-cols-3 gap-6 px-10 py-12">
              {spec.features.map((f) => (
                <div key={f.title} className="bg-surface p-6 shadow-px [--px-edge:var(--color-line)]">
                  <PixelSprite name={f.sprite} scale={4} />
                  <p className="mt-4 font-display text-[10px] uppercase leading-snug">{f.title}</p>
                  <p className="mt-2 text-lg text-fg-muted">{f.body}</p>
                </div>
              ))}
            </div>
          )
        if (kind === "stats")
          return (
            <div key={kind} className="grid grid-cols-3 gap-6 border-y-4 border-line bg-surface px-10 py-10 text-center">
              {spec.stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-3xl text-accent-hi">{s.value}</p>
                  <p className="mt-2 font-mono text-xl text-fg-muted">{s.label}</p>
                </div>
              ))}
            </div>
          )
        if (kind === "quote")
          return (
            <div key={kind} className="px-10 py-12">
              <blockquote className="mx-auto max-w-2xl bg-surface p-8 text-2xl leading-snug shadow-px [--px-edge:var(--color-accent)]">
                “{spec.quote.text}”
                <p className="mt-4 font-display text-[10px] uppercase text-fg-muted">{spec.quote.name}</p>
              </blockquote>
            </div>
          )
        if (kind === "pricing")
          return (
            <div key={kind} className="grid grid-cols-2 gap-6 px-10 py-12">
              {spec.plans.map((p, i) => (
                <div key={p.name} className={cn("bg-surface p-6 shadow-px", i ? "[--px-edge:var(--color-accent)]" : "[--px-edge:var(--color-line)]")}>
                  <p className="font-display text-[10px] uppercase">{p.name}</p>
                  <p className="mt-3 font-display text-3xl">{p.price}</p>
                </div>
              ))}
            </div>
          )
        if (kind === "faq")
          return (
            <div key={kind} className="grid gap-3 px-10 py-12">
              {spec.faqs.map((q) => (
                <p key={q} className="bg-surface px-5 py-4 text-xl shadow-px-sm [--px-edge:var(--color-line)]">{q}</p>
              ))}
            </div>
          )
        return (
          <div key={kind} className="px-10 py-14 text-center">
            <p className="font-display text-2xl uppercase">{spec.cta}<span className="animate-blink">_</span></p>
          </div>
        )
      })}
      <div className="border-t-4 border-line bg-surface px-10 py-6 font-mono text-xl text-fg-subtle">© 2026 {spec.name}</div>
    </div>
  )
}

/** Scales `Page` to whatever width the frame is, keeping its aspect. */
function Preview({ spec }: { spec: Spec }) {
  const frame = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.7)
  const [height, setHeight] = useState(900)
  useLayoutEffect(() => {
    const fit = () => {
      if (!frame.current || !inner.current) return
      const s = frame.current.clientWidth / 1100
      setScale(s)
      setHeight(inner.current.offsetHeight * s)
    }
    fit()
    const ro = new ResizeObserver(fit)
    if (frame.current) ro.observe(frame.current)
    if (inner.current) ro.observe(inner.current)
    return () => ro.disconnect()
  }, [])
  const vars = paletteVars(spec.palette) as React.CSSProperties
  return (
    <div ref={frame} className="w-full overflow-hidden" style={{ ...vars, height }}>
      <div ref={inner} style={{ transform: `scale(${scale})`, transformOrigin: "top left", width: 1100 }}>
        <Page spec={spec} />
      </div>
    </div>
  )
}

function Swatches({ spec }: { spec: Spec }) {
  const colours = [spec.palette.bg, spec.palette.surface, spec.palette.accent, spec.palette.accentHi, ...spec.palette.sky.slice(1, 4)]
  return (
    <span className="flex">
      {colours.map((c, i) => (
        <span key={i} className="size-4 border-2 border-bg" style={{ background: c }} />
      ))}
    </span>
  )
}

type Locks = { palette: boolean; layout: boolean; copy: boolean }

/**
 * `/generator` — a random landing page, rolled from three seeds.
 *
 * Roll it, lock the parts you like, share the URL, or apply the palette to this
 * very site. Auto-roll keeps rolling every few seconds.
 */
export function GeneratorPage() {
  const [seeds, setSeeds] = useState<Spec["seeds"]>(() => {
    const params = new URLSearchParams(window.location.search)
    return (params.get("roll") ? null : paramToSeeds(params.get("seed"))) ?? newSeeds()
  })
  const [locks, setLocks] = useState<Locks>({ palette: false, layout: false, copy: false })
  const [history, setHistory] = useState<Spec["seeds"][]>([])
  const [auto, setAuto] = useState(false)
  const [applied, setApplied] = useState(themeIsApplied())
  const [copied, setCopied] = useState(false)
  const spec = generate(seeds)

  useEffect(() => replaceSearch(`seed=${seedsToParam(seeds)}`), [seeds])

  const roll = useCallback(() => {
    setHistory((h) => [seeds, ...h.filter((x) => seedsToParam(x) !== seedsToParam(seeds))].slice(0, 7))
    setSeeds((cur) => ({
      palette: locks.palette ? cur.palette : newSeed(),
      layout: locks.layout ? cur.layout : newSeed(),
      copy: locks.copy ? cur.copy : newSeed(),
    }))
  }, [locks, seeds])

  useEffect(() => {
    if (!auto || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = setInterval(roll, 4000)
    return () => clearInterval(id)
  }, [auto, roll])

  useCanvasAction("Roll template", () => roll(), { group: "Generator" })
  useCanvasAction("Auto-roll", (next) => setAuto(next ?? !auto), { on: auto, group: "Generator" })

  const copy = async (text: string, message: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1400)
      toast.success(message)
    } catch {
      toast.error("Copy was blocked by the browser")
    }
  }

  const lockRows: { key: keyof Locks; label: string }[] = [
    { key: "palette", label: "Lock palette" },
    { key: "layout", label: "Lock layout" },
    { key: "copy", label: "Lock copy" },
  ]

  return (
    <>
      <PageHero kicker="generator" title="Roll a landing page. Keep the good one." blurb="Every roll builds a whole template — palette, layout, headline and sections — from three seeds. Lock what you like, share the link, or paint this site with it." />
      <section className="bg-bg py-16 sm:py-24">
        <Container className="grid gap-10 xl:grid-cols-[22rem_minmax(0,1fr)]">
          <aside className="grid content-start gap-6 xl:sticky xl:top-24 xl:self-start">
            <div className="grid gap-4 bg-surface p-5 shadow-px [--px-edge:var(--color-line)]">
              <Button variant="accent" size="lg" onClick={roll}><Dices /> Roll template</Button>
              <p className="font-mono text-xl text-fg-muted">
                seed <span className="text-fg">{seedsToParam(seeds).slice(0, 9)}…</span>
              </p>
              <div className="grid gap-3 border-t-2 border-line pt-4">
                {lockRows.map(({ key, label }) => (
                  <label key={key} className="flex min-h-11 items-center justify-between gap-3 text-lg">
                    {label}
                    <Switch checked={locks[key]} onCheckedChange={(v) => setLocks((l) => ({ ...l, [key]: v }))} />
                  </label>
                ))}
                <label className="flex min-h-11 items-center justify-between gap-3 text-lg">
                  <span className="flex items-center gap-2"><Timer className="size-4" /> Auto-roll</span>
                  <Switch checked={auto} onCheckedChange={setAuto} />
                </label>
              </div>
            </div>

            <div className="grid gap-3 bg-surface p-5 shadow-px [--px-edge:var(--color-line)]">
              <p className="font-display text-[10px] uppercase text-fg-subtle">This roll</p>
              <p className="text-2xl font-semibold">{spec.name}</p>
              <div className="flex flex-wrap gap-2">
                <Badge tone="accent">{spec.palette.name}</Badge>
                <Badge tone="outline">{spec.layout}</Badge>
                <Badge tone="outline">{spec.face}</Badge>
              </div>
              <Swatches spec={spec} />
              <div className="mt-2 grid gap-3">
                <Button variant="outline" onClick={() => copy(window.location.href, "Share link copied")}>
                  {copied ? <Check /> : <Copy />} Copy share link
                </Button>
                <Button variant="outline" onClick={() => copy(JSON.stringify({ ...spec, palette: spec.palette.name }, null, 2), "Template JSON copied")}>
                  <Copy /> Copy JSON
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    applyTheme(paletteVars(spec.palette))
                    setApplied(true)
                    toast.success(`${spec.palette.name} applied to the whole site`)
                  }}
                >
                  <PaletteIcon /> Paint this site
                </Button>
                {applied ? (
                  <Button
                    variant="ghost"
                    onClick={() => {
                      applyTheme(null)
                      setApplied(false)
                    }}
                  >
                    <RotateCcw /> Reset theme
                  </Button>
                ) : null}
              </div>
            </div>

            {history.length ? (
              <div className="grid gap-2 bg-surface p-5 shadow-px [--px-edge:var(--color-line)]">
                <p className="font-display text-[10px] uppercase text-fg-subtle">Earlier rolls</p>
                {history.map((h) => {
                  const s = generate(h)
                  return (
                    <button key={seedsToParam(h)} onClick={() => setSeeds(h)} className="flex min-h-11 items-center justify-between gap-3 px-2 text-left text-lg hover:bg-surface-2">
                      <span className="truncate">{s.name}</span>
                      <Swatches spec={s} />
                    </button>
                  )
                })}
              </div>
            ) : null}
          </aside>

          <div className="min-w-0">
            <TiltCard maxTilt={2.5} glare={false} perspective={1800}>
              <div className="bg-surface shadow-px-lift [--px-drop:rgba(0,0,0,0.5)] [--px-edge:var(--color-line-strong)]">
                <div className="flex items-center gap-3 border-b-2 border-line px-4 py-2.5">
                  <span className="size-3 bg-bad" /><span className="size-3 bg-warn" /><span className="size-3 bg-good" />
                  <span className="ml-3 truncate font-mono text-xl text-fg-muted">https://{spec.name.toLowerCase()}.example</span>
                </div>
                <div aria-live="polite" aria-label={`Preview of ${spec.name}`}>
                  <Preview spec={spec} />
                </div>
              </div>
            </TiltCard>
          </div>
        </Container>
      </section>
    </>
  )
}
