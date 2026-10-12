import { useEffect, useRef, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { Check, Code2, Monitor, Smartphone } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { FeatureRow } from "@/components/blocks/feature-row"
import { BrowserFrame, SkyPanel } from "@/components/map/frames"
import { MapGuide } from "@/components/map/map-guide"
import { Button } from "@/components/ui/button"
import { placesById } from "@/content/places"
import { pexels, SKIES } from "@/lib/photos"
import { cn } from "@/lib/utils"

const PLACES = placesById(["room-eleven", "salt-house", "wheelhouse", "kiln", "second-shelf"])
const EMBED = `<iframe src="https://cairn.page/e/open-studios" width="100%" height="480" style="border:0;border-radius:12px" loading="lazy"></iframe>`

/**
 * Where a map ends up: inside somebody else's page. A newsletter post in a
 * browser window, with a working Cairn map in the middle of it. Switch the
 * window to a phone's width and the post and the map reflow; copy the line
 * of code that put it there.
 */
export function Embed() {
  const reduced = useReducedMotion()
  const [device, setDevice] = useState<"desktop" | "phone">("desktop")
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])
  useCanvasAction("Embed: phone width", (next) => setDevice((next ?? device === "desktop") ? "phone" : "desktop"), { on: device === "phone", group: "Embed" })
  useCanvasAction("Embed: code copied", (next) => setCopied(next ?? !copied), { on: copied, group: "Embed" })

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMBED)
    } catch {
      /* a denied clipboard still shows the state; the code is visible below */
    }
    setCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 1800)
  }

  const phone = device === "phone"

  return (
    <FeatureRow
      id="embed"
      flip
      title="Embed it on your website."
      body="Paste one line into any site, newsletter or Notion page that takes an iframe. The map fits the space it's given and keeps up when you edit it."
      action={
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" onClick={copy} className="min-w-[178px]">
            <span className="relative grid size-4 place-items-center">
              <Code2 className={cn("absolute transition-[opacity,transform,filter] duration-200 ease-(--ease-out-strong)", copied ? "scale-50 opacity-0 blur-[2px]" : "opacity-100")} />
              <Check className={cn("absolute text-signal-green transition-[opacity,transform,filter] duration-200 ease-(--ease-out-strong)", copied ? "scale-100 opacity-100" : "scale-50 opacity-0 blur-[2px]")} />
            </span>
            {copied ? "Copied to clipboard" : "Copy embed code"}
          </Button>
        </div>
      }
      media={
        <div>
          <SkyPanel photo={pexels(SKIES.candy, 1100, 1000)} className="flex aspect-[476/430] items-center justify-center p-5 sm:p-7">
            <motion.div
              layout={!reduced}
              transition={{ type: "spring", stiffness: 260, damping: 32 }}
              className={cn("h-full", phone ? "w-[min(260px,62%)]" : "w-full")}
            >
              <BrowserFrame url="lanternletter.example/open-studios" className="h-full" bodyClassName="overflow-y-auto no-scrollbar">
                <article data-lenis-prevent className={cn("mx-auto px-5 py-5", phone ? "max-w-none" : "max-w-[420px]")}>
                  <p className="text-[10px] font-semibold tracking-[0.08em] text-ink-3 uppercase">The Lantern Letter · Issue 41</p>
                  <h3 className="type-serif mt-2 text-[22px] leading-[1.05] tracking-[-0.03em] text-ink">Open studios weekend: where to start</h3>
                  <p className="mt-2 text-[11.5px] leading-relaxed text-ink-3">
                    Five studios are opening their doors on Saturday. We asked the organisers where they'd go first, then put it all on one map so you don't have to.
                  </p>
                  <MapGuide
                    heading="Open studios"
                    intro="Saturday 10–6. Free."
                    cover={9304545}
                    places={PLACES}
                    theme="meadow"
                    zoom={1.35}
                    centerX={500}
                    centerY={470}
                    compact
                    panel={!phone}
                    controls={!phone}
                    className={cn("mt-4 rounded-[10px] shadow-(--shadow-hairline)", phone ? "h-[220px]" : "h-[230px]")}
                  />
                  <p className="mt-4 text-[11.5px] leading-relaxed text-ink-3">
                    Start at the Wheelhouse — the wheel sessions fill up by eleven — then walk up through the Terraces to Room Eleven for the new show.
                  </p>
                </article>
              </BrowserFrame>
            </motion.div>
          </SkyPanel>
          <div className="mt-4 flex justify-center">
            <div role="radiogroup" aria-label="Preview width" className="relative flex rounded-[10px] bg-panel p-1">
              {(["desktop", "phone"] as const).map((d) => (
                <button
                  key={d}
                  type="button"
                  role="radio"
                  aria-checked={device === d}
                  onClick={() => setDevice(d)}
                  className={cn(
                    "relative flex h-9 items-center gap-1.5 rounded-[7px] px-3.5 text-[13.5px] font-medium transition-colors duration-(--duration-hover)",
                    device === d ? "text-ink" : "text-ink-3 hover:text-ink",
                  )}
                >
                  {device === d ? (
                    <motion.span layoutId="embed-device" className="absolute inset-0 rounded-[7px] bg-raised shadow-(--shadow-xs)" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
                  ) : null}
                  <span className="relative flex items-center gap-1.5">
                    {d === "desktop" ? <Monitor className="size-3.5" /> : <Smartphone className="size-3.5" />}
                    {d === "desktop" ? "Desktop" : "Phone"}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      }
    />
  )
}
