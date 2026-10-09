import { EyeOff, KeyRound, Lock, Trash2, type LucideIcon } from "lucide-react"
import { useState } from "react"

import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"

const PROMISES: { id: string; label: string; icon: LucideIcon; body: string }[] = [
  { id: "encrypted", label: "Encrypted", icon: KeyRound, body: "Everything is encrypted on your phone before it syncs, and only your devices hold the key." },
  { id: "never-sold", label: "Never sold", icon: EyeOff, body: "No ads, no data brokers, no “anonymised” resale. Our only customer is the person using the app." },
  { id: "delete", label: "Yours to delete", icon: Trash2, body: "One tap erases your account and every record from our servers within 24 hours." },
]

/** Three promises; tap one to read what it means in practice. */
const PERMISSIONS = [
  { id: "coach", label: "Coach can read my lab results", note: "Used only to answer your questions", on: true },
  { id: "doctor", label: "Share a weekly summary with my doctor", note: "A PDF you can review first", on: false },
  { id: "research", label: "Contribute anonymised data to research", note: "Off by default, always opt-in", on: false },
] as const

export function Privacy() {
  const [perm, setPerm] = useState<Record<string, boolean>>(Object.fromEntries(PERMISSIONS.map((p) => [p.id, p.on])))
  const [open, setOpen] = useState(PROMISES[0].id)
  const current = PROMISES.find((p) => p.id === open)!
  return (
    <section id="privacy" className="mx-auto mt-24 max-w-[1120px] scroll-mt-10 px-1.5 sm:mt-32 sm:px-2">
      <div className="relative overflow-hidden rounded-card bg-[radial-gradient(120%_90%_at_50%_100%,var(--color-forest-2),var(--color-forest)_60%,#08211c)] px-6 py-20 text-center text-paper sm:py-28">
        <Lock aria-hidden="true" className="pointer-events-none absolute top-1/2 left-1/2 size-[420px] -translate-x-1/2 -translate-y-1/2 text-white/[0.06]" strokeWidth={0.6} />
        <Container className="relative">
          <Reveal>
            <h2 className="display text-[clamp(2rem,5vw,3.25rem)]">Built for privacy</h2>
            <p className="mx-auto mt-3 max-w-md text-white/65">Your data is yours. We never sell it, and we protect it with industry-standard security.</p>
          </Reveal>
          <div className="mt-8 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Privacy promises">
            {PROMISES.map((p) => (
              <button key={p.id} role="tab" aria-selected={p.id === open} onClick={() => setOpen(p.id)} className={cn("inline-flex h-11 items-center gap-2 rounded-pill border px-5 text-sm font-medium transition-[background-color,border-color,transform] duration-200 active:scale-95", p.id === open ? "border-white/30 bg-white/15" : "border-white/10 text-white/60 hover:bg-white/5")}>
                <p.icon className="size-4" /> {p.label}
              </button>
            ))}
          </div>
          <p key={current.id} className="mx-auto mt-6 min-h-12 max-w-md animate-[pop-in_260ms_var(--ease-out)] text-[15px] leading-snug text-white/75">{current.body}</p>
          <ul className="mx-auto mt-8 max-w-lg divide-y divide-white/10 overflow-hidden rounded-3xl bg-white/[0.07] text-left backdrop-blur ring-1 ring-white/10">
            {PERMISSIONS.map((p) => (
              <li key={p.id}>
                <button role="switch" aria-checked={perm[p.id]} onClick={() => setPerm({ ...perm, [p.id]: !perm[p.id] })} className="flex min-h-16 w-full items-center gap-4 px-5 py-3 text-left">
                  <span className="flex-1"><span className="block text-[15px] font-medium">{p.label}</span><span className="text-xs text-white/55">{p.note}</span></span>
                  <span className={cn("relative h-7 w-12 shrink-0 rounded-full transition-colors duration-200", perm[p.id] ? "bg-mint" : "bg-white/20")}><span className={cn("absolute top-0.5 left-0.5 size-6 rounded-full bg-white shadow transition-transform duration-200 ease-out", perm[p.id] && "translate-x-5")} /></span>
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-white/50" aria-live="polite">{Object.values(perm).filter(Boolean).length} of {PERMISSIONS.length} permissions on — change them any time.</p>
        </Container>
      </div>
    </section>
  )
}
