import { Check, Dna, Droplets, FlaskConical, HeartPulse, Hospital, Pill, Stethoscope, type LucideIcon } from "lucide-react"
import { useState } from "react"

import { PhoneFrame } from "@/components/device/phone-frame"
import { Reveal } from "@/components/motion/reveal"
import { RecordsScreen } from "@/components/screens/records"
import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"

const PROVIDERS: { name: string; icon: LucideIcon; color: string; angle: number; ring: number }[] = [
  { name: "Northside Labs", icon: Droplets, color: "text-rose", angle: -58, ring: 0 },
  { name: "Helix Genomics", icon: Dna, color: "text-accent", angle: -84, ring: 1 },
  { name: "Cardio Clinic", icon: HeartPulse, color: "text-rose", angle: 4, ring: 0 },
  { name: "Riverside Hospital", icon: Hospital, color: "text-ocean", angle: -34, ring: 1 },
  { name: "Apothecary Rx", icon: Pill, color: "text-violet", angle: 62, ring: 0 },
  { name: "Dr. Okafor’s office", icon: Stethoscope, color: "text-mint", angle: 22, ring: 1 },
  { name: "LifePanel", icon: FlaskConical, color: "text-amber", angle: 78, ring: 1 },
]

/** Connect a provider by tapping its tile — the count updates, and the phone stays live beside it. */
export function Records() {
  const [connected, setConnected] = useState<string[]>(["Northside Labs"])
  const toggle = (name: string) => setConnected((c) => (c.includes(name) ? c.filter((x) => x !== name) : [...c, name]))
  return (
    <section className="px-1.5 pt-24 sm:px-2 sm:pt-32">
      <div className="mx-auto max-w-[1120px] overflow-hidden rounded-card bg-[linear-gradient(135deg,#e6edfb,#d7eef0)]">
        <div className="grid items-center gap-8 px-6 pt-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-12 lg:pt-0">
          <div className="relative min-h-[460px] lg:min-h-[560px]">
            {/* rings, and tiles on them */}
            {[0, 1].map((r) => (
              <span key={r} aria-hidden="true" className="absolute top-[48%] left-[56%] origin-center scale-75 rounded-full sm:scale-100 border border-white/70" style={{ width: 250 + r * 140, height: 250 + r * 140, translate: "-50% -50%" }} />
            ))}
            <div className="absolute top-[48%] left-[56%] h-0 w-0 origin-center scale-75 sm:scale-100">
              {PROVIDERS.map((p) => {
                const rad = 125 + p.ring * 70
                const a = (p.angle * Math.PI) / 180
                const on = connected.includes(p.name)
                return (
                  <button
                    key={p.name}
                    onClick={() => toggle(p.name)}
                    aria-pressed={on}
                    aria-label={`${on ? "Disconnect" : "Connect"} ${p.name}`}
                    title={p.name}
                    className="group absolute grid size-12 place-items-center rounded-2xl bg-paper shadow-chip transition-transform duration-200 hover:scale-110 active:scale-90 sm:size-14"
                    style={{ left: Math.cos(a) * rad - 28, top: Math.sin(a) * rad - 28 }}
                  >
                    <p.icon className={cn("size-6", p.color)} />
                    <span className={cn("absolute -top-1.5 -right-1.5 grid size-5 place-items-center rounded-full bg-mint text-white transition-[opacity,transform] duration-200", on ? "scale-100 opacity-100" : "scale-50 opacity-0")}><Check className="size-3" /></span>
                  </button>
                )
              })}
            </div>
            <div className="absolute bottom-6 left-[4%] w-[min(260px,62%)] origin-bottom lg:bottom-0 lg:translate-y-10">
              <PhoneFrame><RecordsScreen /></PhoneFrame>
            </div>
          </div>
          <Reveal className="pb-12 lg:pb-0">
            <h2 className="display text-[clamp(2rem,5vw,3.25rem)]">Connect your health records</h2>
            <p className="mt-3 max-w-[32ch] text-lg leading-snug text-ink-2">Keep labs, clinical notes and scans in one private place — and let your coach read them.</p>
            <p className="mt-6 inline-flex items-center gap-2 rounded-pill bg-paper/80 px-4 py-2 text-sm font-medium shadow-chip" aria-live="polite">
              <span className="size-2 rounded-full bg-mint" />
              <span className="tabular-nums">{connected.length}</span> of {PROVIDERS.length} providers connected
            </p>
            <p className="mt-2 text-sm text-ink-3">Tap a tile to connect it.</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
