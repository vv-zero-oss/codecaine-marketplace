import { useEffect, useState } from "react"

import { Asterisk, ClassifiedFolder, Doodle } from "@/components/motion/classified-folder"
import { Button, ButtonLink } from "@/components/ui/button"
import { Link } from "@/lib/router"

/**
 * The style guide, read from the stylesheet as it is now: every swatch, size
 * and curve below comes from the tokens in `index.css` at runtime, so a token
 * changed there changes here.
 */

const COLOURS = [
  { group: "Surface", tokens: ["desk", "desk-deep"] },
  { group: "Folder", tokens: ["folder", "folder-low", "folder-back"] },
  { group: "Sheet", tokens: ["sheet", "sheet-ink", "sheet-mute"] },
  { group: "Text and lines", tokens: ["ink", "ink-mute", "line"] },
]

function useToken(name: string) {
  const [value, setValue] = useState("")
  useEffect(() => setValue(getComputedStyle(document.documentElement).getPropertyValue(name).trim()), [name])
  return value
}

function Swatch({ token }: { token: string }) {
  const value = useToken(`--color-${token}`)
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-sheet">
      <div className="h-16" style={{ background: `var(--color-${token})` }} />
      <div className="px-3 py-2">
        <p className="m-0 font-mono text-[12px] text-ink">{token}</p>
        <p className="m-0 font-mono text-[11px] text-ink-mute">{value}</p>
      </div>
    </div>
  )
}

function Token({ name }: { name: string }) {
  const value = useToken(name)
  return (
    <span className="font-mono text-[11px] text-ink-mute">
      {name}: {value}
    </span>
  )
}

function Chapter({ id, title, blurb, children }: { id: string; title: string; blurb: string; children: React.ReactNode }) {
  return (
    <section id={id} className="border-t border-line py-12">
      <h2 className="m-0 text-2xl font-semibold tracking-[-0.02em]">{title}</h2>
      <p className="mt-2 mb-8 max-w-[60ch] text-[15px] text-ink-mute">{blurb}</p>
      {children}
    </section>
  )
}

export function BrandPage() {
  const [replay, setReplay] = useState(0)
  return (
    <div className="mx-auto max-w-[1100px] px-5 py-10 sm:px-8">
      <header className="flex flex-wrap items-center justify-between gap-4 pb-8">
        <Link href="/" className="flex items-center gap-2 text-ink">
          <span className="grid size-8 place-items-center rounded-lg bg-folder">
            <Asterisk className="size-5" />
          </span>
          <span className="font-mono text-sm uppercase tracking-[0.04em]">Classified</span>
        </Link>
        <ButtonLink href="/" variant="outline" size="sm">
          Back to the folder
        </ButtonLink>
      </header>

      <h1 className="m-0 text-[clamp(2.2rem,6vw,4rem)] leading-none font-semibold tracking-[-0.04em]">Brand guidelines</h1>
      <p className="mt-3 max-w-[56ch] text-[15px] text-ink-mute">
        One cobalt folder on a warm desk. Everything here is read from the live tokens.
      </p>

      <Chapter id="brand" title="Brand" blurb="The mark is the six-petal asterisk, white on cobalt. Give it its own height of space on every side.">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="grid h-40 place-items-center rounded-2xl bg-folder">
            <Asterisk className="size-14" />
          </div>
          <div className="grid h-40 place-items-center rounded-2xl border border-line bg-sheet">
            <span className="grid size-14 place-items-center rounded-xl bg-folder">
              <Asterisk className="size-9" />
            </span>
          </div>
          <ul className="m-0 flex list-none flex-col justify-center gap-2 rounded-2xl border border-line bg-sheet p-5 text-sm">
            <li>Do: say little, in capitals and mono, like a stamp.</li>
            <li>Do: let the one secret be a little funny.</li>
            <li className="text-ink-mute">Don't: add a second colour to the folder.</li>
          </ul>
        </div>
      </Chapter>

      <Chapter id="colour" title="Colour" blurb="Every colour on the page, read from index.css as it is now.">
        <div className="grid gap-8">
          {COLOURS.map((group) => (
            <div key={group.group}>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.06em] text-ink-mute">{group.group}</p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {group.tokens.map((token) => (
                  <Swatch key={token} token={token} />
                ))}
              </div>
            </div>
          ))}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-folder p-4 text-white">White on folder — about 6:1</div>
            <div className="rounded-xl bg-sheet p-4 text-sheet-ink">Sheet ink on sheet — about 17:1</div>
          </div>
        </div>
      </Chapter>

      <Chapter id="type" title="Typography" blurb="Inter for anything read, JetBrains Mono for anything stamped.">
        <div className="grid gap-5 rounded-2xl border border-line bg-sheet p-6">
          <div>
            <p className="m-0 font-mono text-lg uppercase tracking-[0.02em]">Confidential files</p>
            <span className="font-mono text-[11px] text-ink-mute">Mono 18 / 400 / +0.02em, uppercase — the cover label</span>
          </div>
          <div>
            <p className="m-0 text-sm">Internal use only</p>
            <span className="font-mono text-[11px] text-ink-mute">Inter 14 / 400 — the sub-label</span>
          </div>
          <div>
            <p className="m-0 max-w-[40ch] text-[14.5px] leading-[1.32]">This document is classified and intended solely for authorized personnel.</p>
            <span className="font-mono text-[11px] text-ink-mute">Inter 14.5 / 1.32 — the note</span>
          </div>
          <p className="m-0 font-mono text-sm tabular-nums">0123456789</p>
        </div>
      </Chapter>

      <Chapter id="surface" title="Radii, shadows, borders" blurb="Soft corners, one contact shadow under the folder, one lift under the sheet, hairlines elsewhere.">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex h-32 flex-col justify-end rounded-folder bg-folder p-4 shadow-folder">
            <Token name="--radius-folder" />
          </div>
          <div className="flex h-32 flex-col justify-end rounded-sheet bg-sheet p-4 shadow-sheet">
            <Token name="--shadow-sheet" />
          </div>
          <div className="flex h-32 flex-col justify-end rounded-xl border border-line bg-sheet p-4">
            <Token name="--color-line" />
          </div>
        </div>
      </Chapter>

      <Chapter id="motion" title="Motion" blurb="A quick peek on hover, and one longer pull on click: out to the side, turned over in the air, laid on top.">
        <div className="grid gap-2 rounded-2xl border border-line bg-sheet p-6">
          <Token name="--ease-out-soft" />
          <Token name="--ease-in-out-soft" />
          <Token name="--duration-peek" />
          <Token name="--duration-pull" />
          <div className="mt-4">
            <Button variant="primary" size="sm" onClick={() => setReplay((n) => n + 1)}>
              Play the pull
            </Button>
          </div>
          <div className="mt-6 grid place-items-center rounded-xl bg-desk py-10">
            <ClassifiedFolder key={replay} size={240} initial={replay ? "out" : "closed"} />
          </div>
        </div>
      </Chapter>

      <Chapter id="icons" title="Iconography and imagery" blurb="One mark, and one hand-drawn doodle on the sheet. No photography: the secret is the picture.">
        <div className="flex items-center gap-8 rounded-2xl border border-line bg-sheet p-6 text-sheet-ink">
          <span className="grid size-16 place-items-center rounded-xl bg-folder">
            <Asterisk className="size-10" />
          </span>
          <Doodle style={{ width: 110, height: 66 }} />
        </div>
      </Chapter>

      <Chapter id="components" title="Components" blurb="The folder in each of its states, and the buttons. Hover and click the live ones.">
        <div className="grid gap-6 sm:grid-cols-3">
          {(["closed", "peek", "out"] as const).map((state) => (
            <div key={state} className="grid place-items-center gap-4 rounded-2xl bg-desk-deep py-10">
              <ClassifiedFolder size={200} initial={state} />
              <span className="font-mono text-[11px] uppercase text-ink-mute">{state}</span>
            </div>
          ))}
        </div>
        <pre className="mt-6 overflow-x-auto rounded-xl bg-sheet-ink p-4 font-mono text-[12px] text-desk">{`<ClassifiedFolder label="Confidential files" sublabel="Internal use only" stamp="Do not open" tilt={28} peek={64} duration={0.9} />`}</pre>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button>Default</Button>
          <Button variant="primary">Primary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button disabled>Disabled</Button>
        </div>
      </Chapter>
    </div>
  )
}
