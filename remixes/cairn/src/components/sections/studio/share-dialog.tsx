import { useEffect, useRef, useState } from "react"
import { Check, Copy, Link2 } from "lucide-react"

import type { MapTheme } from "@/components/map/map-base"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

const slug = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 48) || "my-map"

/** Copies a value and says so: the icon swaps, the label changes, then both
 *  settle back after a moment. */
function CopyField({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      /* the value is selectable below if the clipboard is blocked */
    }
    setCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 1600)
  }
  return (
    <div>
      <p className="mb-1.5 text-[13px] font-medium text-ink-2">{label}</p>
      <div className="flex items-stretch gap-2">
        <code
          className={cn(
            "min-w-0 flex-1 rounded-[9px] px-3 py-2.5 text-[12.5px] break-all select-all",
            mono ? "bg-ink font-mono leading-relaxed text-ink-4" : "flex items-center gap-2 bg-panel font-sans text-ink-2",
          )}
        >
          {!mono ? <Link2 className="size-3.5 shrink-0 text-ink-3" /> : null}
          {value}
        </code>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "Copied" : `Copy ${label.toLowerCase()}`}
          className={cn(
            "grid w-11 shrink-0 place-items-center rounded-[9px] transition-[background-color,color,transform] duration-(--duration-hover) active:scale-95",
            copied ? "bg-signal-green-soft text-signal-green" : "bg-accent text-white hover:bg-accent-hover",
          )}
        >
          <span className="relative grid size-4 place-items-center">
            <Copy className={cn("absolute size-4 transition-[opacity,transform,filter] duration-200 ease-(--ease-out-strong)", copied ? "scale-50 opacity-0 blur-[2px]" : "opacity-100")} />
            <Check className={cn("absolute size-4 transition-[opacity,transform,filter] duration-200 ease-(--ease-out-strong)", copied ? "scale-100 opacity-100" : "scale-50 opacity-0 blur-[2px]")} />
          </span>
        </button>
      </div>
    </div>
  )
}

/**
 * Where a finished map goes: a link to send, and the line of code to put
 * it on a page. The code follows the options — height and whether the
 * guide panel shows — as they change.
 */
export function ShareDialog({
  open,
  onOpenChange,
  title,
  theme,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  theme: MapTheme
}) {
  const [height, setHeight] = useState(480)
  const [guide, setGuide] = useState(true)
  const id = slug(title)
  const link = `https://cairn.page/${id}`
  const params = [`theme=${theme}`, guide ? null : "guide=0"].filter(Boolean).join("&")
  const embed = `<iframe src="https://cairn.page/e/${id}?${params}" width="100%" height="${height}" style="border:0;border-radius:12px" loading="lazy" title="${title.replace(/"/g, "&quot;")}"></iframe>`

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogTitle>Share “{title}”</DialogTitle>
        <DialogDescription className="mt-1.5">Anyone with the link can view. Edit the map any time — every copy updates.</DialogDescription>
        <div className="mt-6 flex flex-col gap-5">
          <CopyField label="Link" value={link} />
          <div className="flex flex-col gap-3 rounded-[12px] bg-panel p-3.5">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[13px] font-medium text-ink-2">Height</span>
              <div className="flex rounded-[8px] bg-raised p-0.5 shadow-(--shadow-xs)">
                {[360, 480, 640].map((h) => (
                  <button
                    key={h}
                    type="button"
                    aria-pressed={height === h}
                    onClick={() => setHeight(h)}
                    className={cn(
                      "h-7 rounded-[6px] px-2.5 text-[12px] font-medium tabular-nums transition-colors duration-(--duration-hover)",
                      height === h ? "bg-ink text-page" : "text-ink-3 hover:text-ink",
                    )}
                  >
                    {h}px
                  </button>
                ))}
              </div>
            </div>
            <label className="flex items-center justify-between gap-3">
              <span className="text-[13px] font-medium text-ink-2">Show the guide panel</span>
              <Switch checked={guide} onCheckedChange={setGuide} />
            </label>
          </div>
          <CopyField label="Embed code" value={embed} mono />
        </div>
      </DialogContent>
    </Dialog>
  )
}
