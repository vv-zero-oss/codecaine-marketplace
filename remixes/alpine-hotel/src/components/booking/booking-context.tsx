import { createContext, useContext, useState, type ReactNode } from "react"
import type { DateRange } from "react-day-picker"

/** What a guest has chosen so far, shared by the hero widget, the room cards and the form. */
type Booking = {
  range: DateRange | undefined
  setRange: (range: DateRange | undefined) => void
  guests: string
  setGuests: (guests: string) => void
  room: string
  setRoom: (room: string) => void
}

const BookingContext = createContext<Booking | null>(null)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [range, setRange] = useState<DateRange | undefined>()
  const [guests, setGuests] = useState("2")
  const [room, setRoom] = useState("")
  return (
    <BookingContext.Provider value={{ range, setRange, guests, setGuests, room, setRoom }}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const booking = useContext(BookingContext)
  if (!booking) throw new Error("useBooking outside BookingProvider")
  return booking
}
