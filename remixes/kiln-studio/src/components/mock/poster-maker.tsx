import { useLayoutEffect, useRef, useState } from "react"
import { useCanvasAction } from "@canvas/react"

import { BillboardFrame, FitScreen } from "@/components/mock/frames"
import { Input } from "@/components/ui/input"
import { play } from "@/lib/sound"
import { cn } from "@/lib/utils"

/**
 * "Communication", shown working: a billboard you write. Type a headline and
 * it is set as large as the board allows, live; pick a colourway; or start
 * from one of the studio's lines.
 */
const THEMES = {
  ember: { face: "bg-ember text-bone-ink", small: "text-bone-ink/70", swatch: "var(--color-ember)" },
  bone: { face: "bg-bone text-bone-ink", small: "text-bone-ink/60", swatch: "var(--color-bone)" },
  night: { face: "bg-page text-ember", small: "text-ink-3", swatch: "var(--color-page)" },
} as const
type Theme = keyof typeof THEMES

const PRESETS = ["Fly the long way round.", "Say no.", "Hold music is over.", "Quiet is a feature."]

/** Shrinks the headline until it fits the board — measured at the board's real size. */
function useFitText(text: string, max = 260, min = 56) {
  const ref = useRef<HTMLParagraphElement>(null)
  const [size, setSize] = useState(max)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    let s = max
    el.style.fontSize = `${s}px`
    while (s > min && (el.scrollHeight > el.clientHeight + 1 || el.scrollWidth > el.clientWidth + 1)) {
      s -= 6
      el.style.fontSize = `${s}px`
    }
    setSize(s)
  }, [text, max, min])
  return [ref, size] as const
}

export function PosterMaker({ defaultHeadline = PRESETS[0], defaultTheme = "ember", client = "Nordvik Air" }: { defaultHeadline?: string; defaultTheme?: Theme; client?: string }) {
  const [headline, setHeadline] = useState(defaultHeadline)
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [ref, size] = useFitText(headline || " ")
  const t = THEMES[theme]
  useCanvasAction("Billboard: colourway", () => setTheme((x) => (x === "ember" ? "bone" : x === "bone" ? "night" : "ember")), { group: "What we make" })

  return (
    <div className="flex w-full flex-col gap-5">
      <BillboardFrame>
        <FitScreen width={1200} height={600}>
          <div className={cn("flex size-full flex-col justify-between p-14 transition-colors duration-(--duration-rise)", t.face)}>
            <p className={cn("flex justify-between font-mono text-[22px] tracking-[0.04em] uppercase", t.small)}>
              <span>{client}</span>
              <span>Nightly, from €49</span>
            </p>
            <p
              ref={ref}
              className="h-[400px] overflow-hidden font-sans leading-[0.86] font-bold tracking-[-0.06em] break-words"
              style={{ fontSize: size }}
            >
              {headline || "Write something."}
            </p>
          </div>
        </FitScreen>
      </BillboardFrame>
      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <label className="sr-only" htmlFor="headline">
          Headline
        </label>
        <Input id="headline" value={headline} maxLength={48} onChange={(e) => setHeadline(e.target.value)} placeholder="Write the headline" className="rounded-full" />
        <div role="radiogroup" aria-label="Colourway" className="flex items-center gap-2">
          {(Object.keys(THEMES) as Theme[]).map((k) => (
            <button
              key={k}
              type="button"
              role="radio"
              aria-checked={theme === k}
              aria-label={k}
              onClick={() => {
                setTheme(k)
                play("tick")
              }}
              className={cn(
                "size-11 rounded-full transition-[transform,box-shadow] duration-(--duration-hover) ease-(--ease-out-strong) active:scale-90",
                theme === k ? "shadow-[0_0_0_2px_var(--color-page),0_0_0_3.5px_var(--color-ink)]" : "scale-90 shadow-[inset_0_0_0_1px_var(--color-line-3)] hover:scale-100",
              )}
              style={{ background: THEMES[k].swatch }}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => {
              setHeadline(p)
              play("tick")
            }}
            className={cn(
              "h-9 rounded-full px-3.5 text-[14px] transition-colors duration-(--duration-hover)",
              headline === p ? "bg-panel-2 text-ink" : "text-ink-3 shadow-[inset_0_0_0_1px_var(--color-line-2)] hover:text-ink",
            )}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  )
}
