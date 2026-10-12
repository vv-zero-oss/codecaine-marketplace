import { useState } from "react"
import { Disc3 } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { Container } from "@/components/ui/container"
import { photo, PHOTOS } from "@/lib/photos"
import { cn } from "@/lib/utils"

type Member = { name: string; role: string; order: string; record: string; artist: string; photo: number; sleeve: string }

const BAND: Member[] = [
  {
    name: "Marguerite Ilunga",
    role: "Head roaster",
    order: "Liner Notes, as a pour-over, no milk, no talking",
    record: "Kind of Blue",
    artist: "Miles Davis",
    photo: PHOTOS.beanie,
    sleeve: "var(--color-sky)",
  },
  {
    name: "Theo Brannigan",
    role: "Head of the Elm Street bar",
    order: "A cortado with Feedback Loop",
    record: "Songs in the Key of Life",
    artist: "Stevie Wonder",
    photo: PHOTOS.bartender,
    sleeve: "var(--color-honey)",
  },
  {
    name: "Paloma Ruiz-Ambe",
    role: "Green buyer",
    order: "Whatever Rosa Elena sent last",
    record: "Buena Vista Social Club",
    artist: "Buena Vista Social Club",
    photo: PHOTOS.regular,
    sleeve: "var(--color-ember)",
  },
  {
    name: "Jonah Okeke",
    role: "Wholesale & training",
    order: "Flat white, Side B Blend, oat",
    record: "Blue Lines",
    artist: "Massive Attack",
    photo: PHOTOS.friendsTalk,
    sleeve: "var(--color-moss)",
  },
]

/**
 * The band: the four people you'll meet most, each a card with their role
 * and their order. Hover (or tap) and a record slides out of the card's
 * sleeve with their desert-island album — a 420ms ease-out pull, the
 * gesture of sliding an LP from its jacket.
 */
export function TheBand() {
  const [revealed, setRevealed] = useState<number | null>(null)
  useCanvasAction("Desert island record", (next) => setRevealed((r) => ((next ?? r == null) ? 0 : null)), {
    on: revealed != null,
    group: "The band",
  })

  return (
    <section className="border-b border-line py-(--spacing-section)">
      <Container>
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <h2 className="type-display text-h1">
            Meet <span className="text-rust">the band.</span>
          </h2>
          <p className="max-w-[36ch] text-[15px] text-ink-2">Hover a card — or tap it — for the one record each of us would save from a fire.</p>
        </div>
        <div className="grid gap-(--spacing-gutter) sm:grid-cols-2 xl:grid-cols-4">
          {BAND.map((m, i) => (
            <MemberCard
              key={m.name}
              member={m}
              open={revealed === i}
              onOpen={(o) => setRevealed(o ? i : null)}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}

function MemberCard({ member, open, onOpen }: { member: Member; open: boolean; onOpen: (o: boolean) => void }) {
  return (
    <article
      className="group/member flex cursor-pointer flex-col gap-4 outline-none"
      tabIndex={0}
      onPointerEnter={(e) => e.pointerType === "mouse" && onOpen(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && onOpen(false)}
      onClick={(e) => (e.nativeEvent as PointerEvent).pointerType !== "mouse" && onOpen(!open)}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onOpen(!open))}
      aria-expanded={open}
      aria-label={`${member.name}, ${member.role}`}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-(--radius-card) bg-panel shadow-(--shadow-card) group-focus-visible/member:ring-[3px] group-focus-visible/member:ring-ember/40">
        <img src={photo(member.photo, 900)} alt={member.name} loading="lazy" className={cn("size-full object-cover transition-transform duration-700 ease-(--ease-out-strong)", open && "scale-[1.04]")} />
        {/* the record sliding out of its sleeve */}
        <div
          className="absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-(--radius-field) bg-raised p-3 shadow-(--shadow-float) transition-[transform,opacity] duration-[420ms] ease-(--ease-out-strong)"
          style={{ transform: open ? "translateY(0)" : "translateY(calc(100% + 16px))", opacity: open ? 1 : 0 }}
          aria-hidden={!open}
        >
          <span className="relative grid size-14 shrink-0 place-items-center rounded-(--radius-chip)" style={{ background: member.sleeve }}>
            <span
              className="grid size-10 place-items-center rounded-full bg-cocoa transition-transform duration-[600ms] ease-(--ease-out-strong)"
              style={{ transform: open ? "translateX(10px) rotate(120deg)" : "translateX(0) rotate(0deg)" }}
            >
              <span className="size-3 rounded-full bg-page" />
            </span>
          </span>
          <span className="min-w-0">
            <span className="type-label flex items-center gap-1 text-[10px] text-ink-3">
              <Disc3 className="size-3" /> Desert island record
            </span>
            <span className="type-display block truncate text-[19px] leading-tight">{member.record}</span>
            <span className="block truncate text-[12.5px] text-ink-3">{member.artist}</span>
          </span>
        </div>
      </div>
      <div className="space-y-1">
        <h3 className="type-display text-h4">{member.name}</h3>
        <p className="type-label text-[11px] text-ember-ink">{member.role}</p>
        <p className="text-[14px] text-ink-2">Their order: {member.order}</p>
      </div>
    </article>
  )
}
