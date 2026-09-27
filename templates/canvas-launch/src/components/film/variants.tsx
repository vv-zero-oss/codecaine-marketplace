import { Pause, Play } from "lucide-react"

import { cn } from "@/lib/utils"
import { Cover } from "./longwave"

/*
 * Four takes on Longwave's album screen, for the "ask for variations" beat:
 * the one on the board, then three the assistant might come back with — a
 * light one, a poster, a warm one. Each is 180 × 380, a phone screen.
 */

export type Take = "original" | "light" | "poster" | "warm"

export function VariantCard({ take, className }: { take: Take; className?: string }) {
  return (
    <div className={cn("relative h-[380px] w-[180px] overflow-hidden rounded-[10px] shadow-window", className)}>
      {take === "original" && (
        <div className="size-full bg-app-bg p-3 text-app-ink">
          <p className="text-[8px] text-app-muted">Mara Ellis · 11 songs</p>
          <Cover i={0} className="mt-3 aspect-square rounded-[6px]" />
          <p className="mt-3 text-[13px] font-semibold">Low Tide Hours</p>
          <p className="text-[8px] text-app-muted">Warm, slow records for the last hour of the day.</p>
          <span className="mt-4 flex size-8 items-center justify-center rounded-full bg-app-accent text-app-bg">
            <Play className="size-3 fill-current" strokeWidth={0} />
          </span>
        </div>
      )}
      {take === "light" && (
        <div className="size-full bg-app-light p-3 text-app-light-ink">
          <p className="border-b border-app-light-ink/15 pb-2 text-[8px] tracking-[0.2em] uppercase">Longwave · Album</p>
          <p className="mt-4 font-serif text-[22px] leading-none italic">Low Tide Hours</p>
          <p className="mt-2 text-[8px] leading-snug">Warm, slow records for the last hour of the day. Eleven songs, forty minutes.</p>
          <Cover i={2} className="mt-4 aspect-[4/5] rounded-[2px] grayscale" />
          <p className="mt-2 text-[7px] tracking-[0.2em] uppercase">Side A · Harbour Lights</p>
        </div>
      )}
      {take === "poster" && (
        <div className="size-full bg-art-6 p-3 text-app-light">
          <p className="text-[34px] leading-[0.85] font-black tracking-[-0.05em] uppercase">Low tide hours</p>
          <div className="mt-4 h-[120px] rounded-[4px] bg-gradient-to-br from-art-5 to-app-accent" />
          <p className="mt-3 text-[8px] leading-snug">Mara Ellis. Eleven songs for the last hour of the day.</p>
          <span className="mt-3 inline-flex items-center gap-1 rounded-[3px] bg-art-1 px-2 py-1 text-[8px] font-bold text-app-light-ink">
            <Play className="size-2.5 fill-current" strokeWidth={0} /> LISTEN
          </span>
        </div>
      )}
      {take === "warm" && (
        <div className="size-full bg-art-1 p-3 text-app-light-ink">
          <p className="text-[8px] font-medium">Mara Ellis</p>
          <p className="mt-1 text-[16px] font-semibold tracking-tight">Low Tide Hours</p>
          <div className="relative mt-3 aspect-square overflow-hidden rounded-[12px] bg-gradient-to-br from-art-2 to-art-5">
            <span className="absolute -right-4 -bottom-4 size-24 rounded-full bg-app-light/30" />
          </div>
          <div className="mt-3 flex items-center gap-2 rounded-full bg-app-light/70 p-1.5 text-[8px]">
            <span className="grid size-5 place-items-center rounded-full bg-app-light-ink text-app-light">
              <Pause className="size-2.5 fill-current" strokeWidth={0} />
            </span>
            Harbour Lights · 3:40
          </div>
        </div>
      )}
    </div>
  )
}
