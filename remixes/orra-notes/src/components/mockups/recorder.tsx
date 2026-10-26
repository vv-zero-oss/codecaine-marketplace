import { Mic } from "lucide-react"

import { OrraMark } from "@/components/ui/wordmark"
import { cn } from "@/lib/utils"

const WAVE = [30, 62, 44, 80, 56, 92, 38, 70, 50, 86, 34, 64, 48, 74, 40]

/**
 * A device mid-recording, drawn in HTML: a body, a screen with the timer and a
 * waveform. Three shapes cover where Orra records — a phone, a desk
 * microphone and a clip-on pin.
 */
export function Recorder({
  time = "12:48",
  finish = "graphite",
  shape = "phone",
  className,
}: {
  time?: string
  finish?: "graphite" | "silver"
  shape?: "pin" | "desk" | "phone"
  className?: string
}) {
  const silver = finish === "silver"
  return (
    <div
      className={cn(
        "relative flex flex-col p-[7%] shadow-float",
        shape === "desk" ? "rounded-[28px] pb-[34%]" : "rounded-[22px]",
        shape === "phone" && "rounded-[26px] p-[4%]",
        silver
          ? "bg-gradient-to-b from-glass to-slate ring-1 ring-white/60 ring-inset"
          : "bg-gradient-to-b from-device to-device-deep ring-1 ring-white/10 ring-inset",
        className,
      )}
    >
      {shape === "desk" ? <span className="mx-auto mb-[6%] size-2 rounded-pill bg-bone/70" /> : null}
      <div
        className={cn(
          "flex flex-1 flex-col items-center justify-center gap-2 rounded-[14px] bg-gradient-to-b from-screen to-void px-3 py-6 text-snow",
          shape === "phone" && "rounded-[20px]",
        )}
      >
        <span className="flex items-center gap-1.5 text-[10px] text-snow/70">
          <span className="size-1.5 rounded-pill bg-rose" /> Recording
        </span>
        <span className="text-xl font-medium tracking-[-0.03em] tabular-nums sm:text-2xl">{time}</span>
        <span className="flex h-6 items-center gap-[2px]" aria-hidden>
          {WAVE.map((height, index) => (
            <span key={index} className="w-[2px] rounded-pill bg-bone" style={{ height: `${height}%` }} />
          ))}
        </span>
        <Mic className="mt-1 size-4 opacity-70" strokeWidth={1.4} />
        <span className="mt-2 flex items-center gap-1 text-[8px] text-snow/50">
          <OrraMark className="size-2.5" /> notes by orra
        </span>
      </div>
    </div>
  )
}
