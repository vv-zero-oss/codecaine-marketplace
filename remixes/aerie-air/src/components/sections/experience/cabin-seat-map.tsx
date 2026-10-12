import { useState } from "react"
import { Backpack, Briefcase, Check, Eye, Luggage } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { RadioGroup as RadioGroupPrimitive } from "radix-ui"
import { useCanvasAction } from "@canvas/react"

import { Photo } from "@/components/blocks/photo"
import { CornerLabels } from "@/components/blocks/corner-label"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import type { PhotoName } from "@/lib/photos"
import { cn } from "@/lib/utils"

export type SeatId = "1A" | "1B" | "2A" | "2B"

/** The four passenger seats, as they sit on the plan (x/y in % of the map). */
export const SEATS: { id: SeatId; x: number; y: number; side: string; view: PhotoName; title: string; copy: string; perk: string }[] = [
  { id: "1A", x: 34, y: 48, side: "Front row, left window", view: "window-city", title: "The way in.", copy: "Over the shoulder of the pilot and out over the water. The city arrives in front of you before it passes under you.", perk: "Forward view past the pilot" },
  { id: "1B", x: 66, y: 48, side: "Front row, right window", view: "cabin-dusk", title: "The low sun.", copy: "On the evening flights this side faces west. Towers go gold, then orange, then a row of lit windows.", perk: "Faces the sunset after 17:00" },
  { id: "2A", x: 34, y: 66, side: "Back row, left window", view: "river-gold", title: "The river.", copy: "The back row sits a step higher, so the window drops below your shoulder and the river runs the length of it.", perk: "Most legroom in the cabin" },
  { id: "2B", x: 66, y: 66, side: "Back row, right window", view: "window-glow", title: "The quiet one.", copy: "Furthest from the door and the rotors' arc. People who board with a laptop open tend to end up here.", perk: "Quietest seat, 61 dB in cruise" },
]

/** One switch per seat, so the editor can show any seat's view. */
function SeatAction({ id, on, onPick }: { id: SeatId; on: boolean; onPick: (id: SeatId) => void }) {
  useCanvasAction(`Seat ${id} chosen`, () => onPick(id), { on, group: "Cabin" })
  return null
}

/**
 * The cabin from above — a pilot up front and four seats behind, every one
 * a window. Picking a seat (click, tap, or the arrow keys: it is a radio
 * group) changes the view beside it and what you can bring.
 */
export function CabinSeatMap({ initialSeat = "1A", title = "Every seat is a window seat." }: { initialSeat?: SeatId; title?: string }) {
  const [seatId, setSeatId] = useState<SeatId>(initialSeat)
  const seat = SEATS.find((s) => s.id === seatId) ?? SEATS[0]

  return (
    <section data-header-tone="light" className="relative bg-dusk py-(--spacing-section) text-dusk-fg">
      {SEATS.map((s) => (
        <SeatAction key={s.id} id={s.id} on={s.id === seatId} onPick={setSeatId} />
      ))}
      <Container>
        <Reveal className="grid gap-6 lg:grid-cols-12">
          <p className="text-micro text-dusk-muted lg:col-span-3">The cabin</p>
          <div className="lg:col-span-9">
            <h2 className="type-head max-w-[14ch] text-display text-balance">{title}</h2>
            <p className="mt-6 max-w-[46ch] text-lead text-dusk-muted">
              Four passengers, one pilot, glass to the floor on both sides. Choose where you sit when you book, or let us pick the one with the view.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-10 md:grid-cols-2 md:items-start lg:mt-24 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-4 lg:col-start-2">
            <CabinPlan seatId={seatId} onPick={setSeatId} />
          </div>

          <div className="lg:col-span-6 lg:col-start-7" aria-live="polite">
            <div className="relative aspect-[4/3] overflow-hidden rounded-(--radius-photo) shadow-(--shadow-photo)">
              <AnimatePresence initial={false}>
                <motion.div
                  key={seat.id}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  className="absolute inset-0"
                >
                  <Photo name={seat.view} className="size-full" rounded={false} />
                </motion.div>
              </AnimatePresence>
              <span className="absolute top-3 left-3 rounded-full bg-dusk/70 px-2.5 py-1 text-micro text-dusk-fg backdrop-blur-sm">
                From seat {seat.id}
              </span>
            </div>

            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={seat.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                className="mt-8"
              >
                <p className="text-micro text-dusk-muted">
                  Seat {seat.id} · {seat.side}
                </p>
                <h3 className="type-head mt-2 text-h3">{seat.title}</h3>
                <p className="mt-3 max-w-[48ch] text-body text-dusk-muted">{seat.copy}</p>
                <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-dusk-2 px-3 py-1.5 text-micro">
                  <Eye className="size-3.5 text-sky-200" /> {seat.perk}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 border-t border-white/12 pt-6">
              <p className="text-micro text-dusk-muted">What comes with every seat</p>
              <ul className="mt-4 grid gap-4 sm:grid-cols-3">
                <Allowance icon={<Luggage className="size-4" />} title="One cabin bag" note="55 × 40 × 23 cm, up to 12 kg, in the hold" />
                <Allowance icon={<Backpack className="size-4" />} title="One personal item" note="A laptop bag or handbag, under the seat" />
                <Allowance icon={<Briefcase className="size-4" />} title="Shared hold" note="48 kg across the cabin; we weigh at the lift" />
              </ul>
            </div>
          </div>
        </div>

        <CornerLabels left="Cabin plan" right="Seat pitch 96 cm" className="mt-20 text-dusk-muted" />
      </Container>
    </section>
  )
}

function Allowance({ icon, title, note }: { icon: React.ReactNode; title: string; note: string }) {
  return (
    <li className="flex gap-3">
      <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-dusk-2 text-sky-200">{icon}</span>
      <span>
        <span className="block text-body">{title}</span>
        <span className="mt-0.5 block text-micro text-dusk-muted">{note}</span>
      </span>
    </li>
  )
}

/** The plan itself: the fuselage in SVG, the seats as a real radio group. */
export function CabinPlan({ seatId, onPick }: { seatId: SeatId; onPick: (id: SeatId) => void }) {
  return (
    <div className="relative mx-auto aspect-[3/5] w-full max-w-[340px]">
      <svg viewBox="0 0 300 500" className="absolute inset-0 size-full" aria-hidden>
        {/* wing stub and tail, faint */}
        <path d="M18 250 L282 250 L282 268 L18 268 Z" fill="var(--color-dusk-2)" />
        <path d="M110 452 L190 452 L176 478 L124 478 Z" fill="var(--color-dusk-2)" />
        {/* fuselage */}
        <path
          d="M150 20 C214 20 246 96 248 180 L248 380 C248 432 206 470 150 470 C94 470 52 432 52 380 L52 180 C54 96 86 20 150 20 Z"
          fill="var(--color-dusk-2)"
          stroke="var(--color-dusk-muted)"
          strokeOpacity="0.4"
        />
        {/* canopy glass */}
        <path d="M150 34 C200 34 228 92 232 150 L68 150 C72 92 100 34 150 34 Z" fill="var(--color-sky)" opacity="0.22" />
        {/* side windows, floor to shoulder */}
        {[200, 290].map((y) => (
          <g key={y} fill="var(--color-sky)" opacity="0.32">
            <rect x="52" y={y} width="6" height="64" rx="3" />
            <rect x="242" y={y} width="6" height="64" rx="3" />
          </g>
        ))}
        {/* pilot */}
        <rect x="128" y="120" width="44" height="46" rx="12" fill="var(--color-dusk)" stroke="var(--color-dusk-muted)" strokeOpacity="0.5" />
        <text x="150" y="190" textAnchor="middle" fontSize="11" fill="var(--color-dusk-muted)">Pilot</text>
        {/* door */}
        <path d="M52 236 L52 284" stroke="var(--color-ember)" strokeWidth="3" strokeLinecap="round" />
        <text x="66" y="300" fontSize="10" fill="var(--color-dusk-muted)">Door</text>
        {/* hold */}
        <rect x="104" y="392" width="92" height="40" rx="8" fill="none" stroke="var(--color-dusk-muted)" strokeOpacity="0.5" strokeDasharray="4 4" />
        <text x="150" y="416" textAnchor="middle" fontSize="10" fill="var(--color-dusk-muted)">Hold, 48 kg</text>
      </svg>

      <RadioGroupPrimitive.Root
        value={seatId}
        onValueChange={(v) => onPick(v as SeatId)}
        aria-label="Choose a seat"
        className="absolute inset-0"
      >
        {SEATS.map((s) => (
          <RadioGroupPrimitive.Item
            key={s.id}
            value={s.id}
            aria-label={`Seat ${s.id}, ${s.side}`}
            style={{ left: `${s.x}%`, top: `${s.y}%` }}
            className={cn(
              "group absolute grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[16px] text-[13px] font-medium outline-none sm:size-16",
              "transition-[background-color,color,box-shadow,transform] duration-(--duration-hover) ease-(--ease-out-strong) active:scale-[0.95]",
              "focus-visible:ring-[3px] focus-visible:ring-sky/60",
              "data-[state=checked]:bg-sky data-[state=checked]:text-on-sky data-[state=checked]:shadow-(--shadow-sky)",
              "data-[state=unchecked]:bg-dusk data-[state=unchecked]:text-dusk-fg data-[state=unchecked]:shadow-[inset_0_0_0_1px_rgb(181_174_154/0.45)] data-[state=unchecked]:hover:bg-[rgb(244_241_218/0.08)]",
            )}
          >
            <span className="flex flex-col items-center leading-none">
              {s.id}
              <Check aria-hidden className="mt-1 size-3 opacity-0 transition-opacity duration-(--duration-hover) group-data-[state=checked]:opacity-70" />
            </span>
          </RadioGroupPrimitive.Item>
        ))}
      </RadioGroupPrimitive.Root>
    </div>
  )
}
