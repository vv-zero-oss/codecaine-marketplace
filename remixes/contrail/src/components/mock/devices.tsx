import { Plane } from "lucide-react"

import { FlightRow, TailMark } from "@/components/mock/app-ui"
import { FlightMap } from "@/components/mock/flight-map"
import { ContrailMark } from "@/components/site/logo"
import { MY_FLIGHTS } from "@/lib/flights"
import { cn } from "@/lib/utils"

/**
 * The rest of the family of screens — laptop, tablet, watch — drawn in CSS
 * and SVG, each running the real map and list. Like `Phone`, each one is a
 * container and sizes its screen in `em` off its own width.
 */

export function Laptop({ className }: { className?: string }) {
  return (
    <div className={cn("@container w-[520px]", className)}>
      <div className="rounded-t-[2.6cqw] bg-[#1b1b20] p-[1.4cqw] pb-[1cqw] shadow-(--shadow-lift)">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[0.8cqw] bg-page text-[1.6cqw]">
          <div className="absolute inset-0 grid grid-cols-[34%_1fr]">
            <div className="flex flex-col bg-page pt-[1.2em]">
              <p className="px-[1.1em] text-[1.25em] font-bold tracking-[-0.03em]">Today</p>
              <div className="mx-[1.1em] my-[0.6em] rounded-[0.5em] bg-panel px-[0.6em] py-[0.35em] text-[0.7em] text-ink-3">Search to add flights</div>
              {MY_FLIGHTS.map((f, i) => <FlightRow key={f.number} flight={f} countdown={["1h", "2d", "5d"][i]} unit={["54 min", "days", "days"][i]} className="px-[0.9em] py-[0.6em]" />)}
            </div>
            <FlightMap region="atlantic" routes="SFO-JFK,JFK-LIS,LIS-OSL" width={480} height={400} labels={false} duration={20} />
          </div>
        </div>
      </div>
      <div className="relative mx-auto h-[2.4cqw] w-[112%] -translate-x-[5.4%] rounded-b-[2cqw] bg-[linear-gradient(180deg,#d6d6dc,#a9a9b2)] shadow-(--shadow-float)">
        <span className="absolute top-0 left-1/2 h-[0.9cqw] w-[16%] -translate-x-1/2 rounded-b-[1cqw] bg-[#9a9aa4]" />
      </div>
    </div>
  )
}

export function Tablet({ className }: { className?: string }) {
  return (
    <div className={cn("@container w-[300px]", className)}>
      <div className="rounded-[6cqw] bg-[#1b1b20] p-[2.4cqw] shadow-(--shadow-lift)">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[3.8cqw] text-[3cqw]">
          <FlightMap region="europe" routes="LIS-OSL,LHR-VIE,CDG-AMS" width={400} height={300} duration={12} />
          <div className="absolute top-[6%] left-[4%] w-[36%] rounded-[0.8em] bg-page/95 p-[0.6em] shadow-(--shadow-card)">
            <p className="text-[0.8em] font-bold">Friends' Flights</p>
            <p className="mt-[0.3em] flex items-center gap-[0.3em] text-[0.55em] text-ink-2"><TailMark airline="MD" className="size-[1.2em]" /> Ines · LIS → OSL</p>
            <p className="text-[0.55em] font-semibold text-green">Lands 16:05 · on time</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function WatchFace({ className }: { className?: string }) {
  return (
    <div className={cn("@container w-[120px]", className)}>
      <div className="relative mx-auto h-[18cqw] w-[62%] rounded-t-[6cqw] bg-[#2a2a30]" />
      <div className="relative aspect-[4/5] rounded-[26cqw] bg-[linear-gradient(145deg,#3a3a40,#121216)] p-[5cqw] shadow-(--shadow-float)">
        <div className="relative size-full overflow-hidden rounded-[20cqw] bg-black px-[10cqw] pt-[12cqw] text-[9cqw] text-white">
          <p className="flex items-center gap-[0.3em] text-[0.8em] text-white/60"><Plane className="size-[1em]" /> LAX</p>
          <p className="text-[1.6em] leading-none font-semibold text-green-bright tabular-nums">11:20</p>
          <p className="mt-[0.2em] text-[0.7em] text-white/70">Gate 54B · on time</p>
          <div className="mt-[0.5em] h-[0.3em] overflow-hidden rounded-full bg-white/15"><div className="h-full w-[62%] rounded-full bg-green-bright" /></div>
        </div>
        <span className="absolute top-[30%] -right-[4cqw] h-[16%] w-[5cqw] rounded-r-md bg-[#2a2a30]" />
      </div>
      <div className="relative mx-auto h-[18cqw] w-[62%] rounded-b-[6cqw] bg-[#2a2a30]" />
    </div>
  )
}

/** A passport booklet, violet, with the mark on the cover. */
export function PassportBooklet({ className }: { className?: string }) {
  return (
    <div className={cn("@container w-[150px]", className)}>
      <div className="relative aspect-[5/7] rounded-[6cqw] bg-[linear-gradient(150deg,#3b1fa8,var(--color-violet-deep))] p-[10cqw] text-center text-[#e8d9a8] shadow-(--shadow-lift)">
        <p className="font-data text-[11cqw] font-semibold tracking-[0.18em]">PASSPORT</p>
        <div className="mx-auto mt-[12cqw] grid size-[42cqw] place-items-center rounded-full border-[1.2cqw] border-dashed border-[#e8d9a8]/70">
          <ContrailMark tone="light" className="size-[22cqw] opacity-90" />
        </div>
        <p className="mt-[12cqw] font-data text-[10cqw] font-semibold tracking-[0.2em]">CONTRAIL</p>
        <span className="absolute inset-y-[4cqw] left-[4cqw] w-px bg-white/15" />
      </div>
    </div>
  )
}
