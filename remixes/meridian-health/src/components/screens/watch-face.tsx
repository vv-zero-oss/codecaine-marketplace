import { Heart, Moon, Wind } from "lucide-react"
import { useEffect, useState } from "react"

import { ScrubChart } from "@/components/screens/kit"

const FACES = ["Heart", "Recovery", "Sleep"] as const
export type WatchFaceName = (typeof FACES)[number]
export const WATCH_FACES = FACES

/** What the watch shows. `face` cycles with the crown; the heart rate ticks live. */
export function WatchFace({ face }: { face: WatchFaceName }) {
  const [bpm, setBpm] = useState(64)
  useEffect(() => {
    const id = window.setInterval(() => setBpm((b) => Math.max(58, Math.min(74, b + (Math.random() > 0.5 ? 1 : -1)))), 1100)
    return () => window.clearInterval(id)
  }, [])
  return (
    <div className="absolute inset-0 bg-black px-4 pt-4 text-white">
      <div className="flex items-center justify-between text-[13px] font-semibold"><span className="text-mint">{face}</span><span className="tabular-nums">9:41</span></div>
      {face === "Heart" && (
        <>
          <div className="mt-5 flex items-end gap-1.5"><Heart className="mb-2 size-6 animate-[blink_1.1s_infinite] fill-rose text-rose" /><span className="text-[54px] leading-none font-semibold tabular-nums">{bpm}</span><span className="mb-1.5 text-[14px] text-white/60">bpm</span></div>
          <ScrubChart data={[62, 64, 63, 66, 65, 68, 64, 63, 66, 64]} height={80} color="var(--color-rose)" className="mt-5" />
        </>
      )}
      {face === "Recovery" && (
        <div className="mt-5"><div className="text-[54px] leading-none font-semibold tabular-nums">70<span className="text-[20px] text-white/60">%</span></div><div className="mt-2 flex items-center gap-1.5 text-[14px] text-mint"><Wind className="size-4" /> Ready to train</div><div className="mt-4 h-2 overflow-hidden rounded-full bg-white/15"><div className="h-full w-[70%] rounded-full bg-mint" /></div></div>
      )}
      {face === "Sleep" && (
        <div className="mt-5"><div className="text-[44px] leading-none font-semibold tabular-nums">8h 30m</div><div className="mt-2 flex items-center gap-1.5 text-[14px] text-ocean"><Moon className="size-4" /> Score 92</div><div className="mt-4 flex h-10 items-end gap-1">{[3, 4, 2, 5, 3, 4, 6, 3, 2, 4].map((h, i) => <span key={i} className="flex-1 rounded-sm bg-ocean/80" style={{ height: h * 6 }} />)}</div></div>
      )}
      <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">{FACES.map((f) => <span key={f} className={`size-1.5 rounded-full ${f === face ? "bg-white" : "bg-white/25"}`} />)}</div>
    </div>
  )
}
