import { useState } from "react"
import { format, differenceInCalendarDays, startOfToday } from "date-fns"
import { CalendarDays } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { useCanvasAction } from "@canvas/react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useMediaQuery } from "@/components/motion/smooth-scroll"
import { cn } from "@/lib/utils"
import { rooms } from "@/content"

/** A fill-in line, as on a printed form: no box, just a rule to write on. */
export const fieldClass = (tone: "light" | "dark" = "light") =>
  cn(
    "flex h-11 w-full items-center justify-between gap-2 rounded-none border-0 border-b bg-transparent px-0 text-left font-serif text-[1.0625rem] shadow-none transition-[border-color] outline-none focus-visible:ring-0",
    tone === "light"
      ? "border-ink text-ink hover:border-signal focus-visible:border-signal data-[placeholder]:text-ink-faint"
      : "border-pine-ink/45 text-pine-ink hover:border-pine-ink focus-visible:border-pine-ink data-[placeholder]:text-pine-ink/55",
  )

export function nightsOf(range: DateRange | undefined) {
  if (!range?.from || !range?.to) return 0
  return differenceInCalendarDays(range.to, range.from)
}

/** Check-in and check-out on one calendar, in a popover. */
export function DateRangeField({
  value,
  onChange,
  tone = "light",
  label = "Arrival — departure",
  id,
  invalid,
}: {
  value: DateRange | undefined
  onChange: (range: DateRange | undefined) => void
  tone?: "light" | "dark"
  label?: string
  id?: string
  invalid?: boolean
}) {
  const [open, setOpen] = useState(false)
  const wide = useMediaQuery("(min-width: 768px)")
  useCanvasAction("Date picker", (next) => setOpen(next ?? !open), { on: open, group: "Booking" })
  const nights = nightsOf(value)
  const text =
    value?.from && value?.to
      ? `${format(value.from, "d MMM")} — ${format(value.to, "d MMM")} · ${nights} night${nights === 1 ? "" : "s"}`
      : value?.from
        ? `${format(value.from, "d MMM")} — choose check-out`
        : label

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        id={id}
        aria-invalid={invalid || undefined}
        className={cn(fieldClass(tone), invalid && "border-signal")}
        data-placeholder={value?.from ? undefined : ""}
      >
        <span className="truncate">{text}</span>
        <CalendarDays className="size-4 shrink-0 opacity-70" />
      </PopoverTrigger>
      <PopoverContent className="w-auto rounded-print border-rule bg-sheet p-0 shadow-(--shadow-sheet)" align="start">
        <Calendar
          mode="range"
          numberOfMonths={wide ? 2 : 1}
          selected={value}
          onSelect={(range) => {
            onChange(range)
            if (range?.from && range?.to && range.from.getTime() !== range.to.getTime()) setOpen(false)
          }}
          disabled={{ before: startOfToday() }}
          defaultMonth={value?.from ?? startOfToday()}
        />
      </PopoverContent>
    </Popover>
  )
}

export function GuestsField({
  value,
  onChange,
  tone = "light",
  id,
  max = 6,
}: {
  value: string
  onChange: (v: string) => void
  tone?: "light" | "dark"
  id?: string
  max?: number
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger id={id} className={cn(fieldClass(tone), "data-[size=default]:h-11 [&_svg:not([class*='text-'])]:text-current")}>
        <SelectValue placeholder="Guests" />
      </SelectTrigger>
      <SelectContent position="popper">
        {Array.from({ length: max }, (_, i) => String(i + 1)).map((n) => (
          <SelectItem key={n} value={n}>
            {n} guest{n === "1" ? "" : "s"}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export function RoomField({
  value,
  onChange,
  tone = "light",
  id,
  invalid,
}: {
  value: string
  onChange: (v: string) => void
  tone?: "light" | "dark"
  id?: string
  invalid?: boolean
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        id={id}
        aria-invalid={invalid || undefined}
        className={cn(fieldClass(tone), "data-[size=default]:h-11 [&_svg:not([class*='text-'])]:text-current", invalid && "border-signal")}
      >
        <SelectValue placeholder="Choose a room" />
      </SelectTrigger>
      <SelectContent position="popper">
        {rooms.map((room) => (
          <SelectItem key={room.id} value={room.id}>
            {room.name} · from CHF {room.summer}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
