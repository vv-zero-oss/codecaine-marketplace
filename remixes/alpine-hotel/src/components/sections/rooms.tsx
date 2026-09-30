import { useState } from "react"
import { BorderBeam } from "border-beam"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { Reveal } from "@/components/motion/reveal"
import { useScrollTo } from "@/components/motion/smooth-scroll"
import { useBooking } from "@/components/booking/booking-context"
import { GuestsField, nightsOf } from "@/components/booking/fields"
import { rooms, type Room } from "@/content"
import { cn } from "@/lib/utils"

const chf = (n: number) =>
  `CHF ${n.toLocaleString("en-CH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

/**
 * The rooms, as a shop shelf: a tall photograph, the name large and light,
 * the nightly price, the small print, a hairline select and a rust pill.
 * A stone-pine wash runs down from the top of the section behind the title.
 */
export function Rooms({
  title = "Rooms that face the mountain",
  lede = "Larch floors, wool blankets and windows cut to frame the peak. Every rate includes breakfast and the spa.",
}: {
  title?: string
  lede?: string
}) {
  return (
    <section id="rooms" className="relative overflow-hidden bg-ice pb-(--spacing-section)">
      <div aria-hidden className="absolute inset-x-0 top-0 h-[40rem] bg-gradient-to-b from-pine from-40% to-ice" />
      <Container className="relative pt-(--spacing-section)">
        <SectionHeading tone="snow" eyebrow="Rooms & suites" title={title} lede={lede} />
        <div className="mt-16 grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-x-12">
          {rooms.map((room, i) => (
            <Reveal key={room.id} delay={i * 0.08}>
              <RoomCard room={room} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

export function RoomCard({ room, cta = "Reserve" }: { room: Room; cta?: string }) {
  const { range, setRoom, setGuests } = useBooking()
  const [guests, setLocalGuests] = useState(String(Math.min(2, room.sleeps)))
  const scrollTo = useScrollTo()
  const nights = nightsOf(range)

  const image = (
    <div className="group/image relative aspect-[343/398] overflow-hidden bg-pine-soft">
      <img
        src={room.image}
        alt={room.alt}
        loading="lazy"
        className="size-full object-cover transition-transform duration-700 ease-(--ease-out) group-hover/image:scale-[1.03]"
      />
      {room.featured && (
        <span className="absolute top-3 left-3 rounded-pill bg-snow px-3 py-1 text-xs font-medium text-ink">
          Our favourite
        </span>
      )}
    </div>
  )

  return (
    <article className="flex flex-col text-ink">
      {room.featured ? (
        <BorderBeam size="md" colorVariant="sunset" strength={0.7} borderRadius={0}>
          {image}
        </BorderBeam>
      ) : (
        image
      )}
      <h3 className="mt-5 text-room font-normal tracking-[-0.02em]">{room.name}</h3>
      <p className="mt-3 text-xl">
        {chf(room.price)} <span className="text-sm text-ink-mute">/ night</span>
      </p>
      <p className={cn("mt-1 h-5 text-sm text-rust", !nights && "invisible")}>
        {chf(room.price * nights)} for {nights} night{nights === 1 ? "" : "s"}
      </p>
      <p className="mt-3 text-[15px]">
        {room.note} · sleeps {room.sleeps} · {room.size}
      </p>
      <label className="mt-1 text-[13px]" htmlFor={`guests-${room.id}`}>
        Guests:
      </label>
      <div className="mt-2">
        <GuestsField id={`guests-${room.id}`} value={guests} onChange={setLocalGuests} max={room.sleeps} />
      </div>
      <Button
        size="lg"
        className="mt-2 w-full"
        onClick={() => {
          setRoom(room.id)
          setGuests(guests)
          scrollTo("#book")
        }}
      >
        {cta}
      </Button>
    </article>
  )
}
