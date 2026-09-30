import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { format } from "date-fns"
import { AnimatePresence, motion } from "motion/react"
import { Check, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useCanvasAction } from "@canvas/react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EASE_OUT } from "@/components/motion/smooth-scroll"
import { useBooking } from "@/components/booking/booking-context"
import { DateRangeField, GuestsField, RoomField, fieldClass, nightsOf } from "@/components/booking/fields"
import { hotel, rooms } from "@/content"
import { cn } from "@/lib/utils"

const schema = z.object({
  name: z.string().min(2, "Tell us your name."),
  email: z.string().email("That email doesn't look right."),
  phone: z.string().optional(),
  arrival: z.string().min(1, "How are you coming up?"),
  requests: z.string().max(600).optional(),
})
type Values = z.infer<typeof schema>

const darkInput =
  "h-11 rounded-field border-snow/25 bg-snow/5 text-snow placeholder:text-snow/50 focus-visible:border-snow/60 focus-visible:ring-rust/40 aria-invalid:border-alert-soft"

/**
 * The reservation itself: a summary of what has been picked on the left, the
 * form on the right. Dates, room and guests are shared with the hero card and
 * the room shelf, so whatever was chosen up there is already filled in here.
 */
export function Book({
  title = "Reserve your room",
  lede = "No deposit today. We confirm within the hour and hold the room for 24 hours while you decide.",
}: {
  title?: string
  lede?: string
}) {
  const { range, setRange, room, setRoom, guests, setGuests } = useBooking()
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle")
  const [missing, setMissing] = useState({ dates: false, room: false })
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", arrival: "", requests: "" },
  })

  useCanvasAction("Booking confirmed", (next) => setStatus((next ?? status !== "sent") ? "sent" : "idle"), {
    on: status === "sent",
    group: "Booking",
  })
  useCanvasAction("Show form errors", (next) => {
    if (next === false) {
      form.clearErrors()
      setMissing({ dates: false, room: false })
    } else {
      void form.trigger()
      setMissing({ dates: !range?.to, room: !room })
    }
  }, { group: "Booking" })

  const chosen = rooms.find((r) => r.id === room)
  const nights = nightsOf(range)
  const total = chosen && nights ? chosen.price * nights : 0

  const onSubmit = async () => {
    const miss = { dates: !range?.from || !range?.to, room: !room }
    setMissing(miss)
    if (miss.dates || miss.room) return
    setStatus("sending")
    await new Promise((r) => setTimeout(r, 900))
    setStatus("sent")
    toast.success("Request received", { description: `We'll write to ${form.getValues("email")} within the hour.` })
  }

  return (
    <section id="book" className="bg-pine py-(--spacing-section) text-snow">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
        <div className="flex flex-col">
          <p className="text-[13px] text-snow/60">Book direct</p>
          <h2 className="font-headline mt-4 max-w-[12ch] text-title">{title}</h2>
          <p className="mt-4 max-w-[40ch] text-lg text-snow/75">{lede}</p>

          <dl className="mt-10 rounded-card border border-snow/15 bg-snow/5 p-5 text-sm">
            <SummaryRow label="Room" value={chosen ? chosen.name : "Not chosen yet"} />
            <SummaryRow
              label="Dates"
              value={range?.from && range?.to ? `${format(range.from, "EEE d MMM")} — ${format(range.to, "EEE d MMM")}` : "Not chosen yet"}
            />
            <SummaryRow label="Guests" value={`${guests} guest${guests === "1" ? "" : "s"}`} />
            <SummaryRow label="Included" value="Breakfast, spa, station shuttle" />
            <div className="mt-3 flex items-baseline justify-between border-t border-snow/15 pt-4">
              <dt className="text-snow/70">{nights ? `${nights} night${nights === 1 ? "" : "s"}` : "Total"}</dt>
              <dd className="font-headline text-3xl tracking-tighter">{total ? `CHF ${total.toLocaleString("en-CH")}` : "—"}</dd>
            </div>
          </dl>
          <p className="mt-4 text-sm text-snow/60">
            Rather talk? {hotel.phone} · {hotel.email}
          </p>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait" initial={false}>
            {status === "sent" ? (
              <motion.div
                key="sent"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: EASE_OUT }}
                className="flex h-full min-h-96 flex-col items-start justify-center rounded-[1.5rem] bg-snow p-8 text-ink sm:p-10"
              >
                <span className="flex size-12 items-center justify-center rounded-pill bg-rust text-snow">
                  <Check className="size-6" />
                </span>
                <p className="font-headline mt-6 text-4xl tracking-tighter">See you up the mountain.</p>
                <p className="mt-3 max-w-[40ch] text-ink-soft">
                  Your request for the {chosen?.name ?? "room"} is with us. Reference <b className="text-ink">ARV-{(total || 2604) % 9000 + 1000}</b>. A confirmation is on its way.
                </p>
                <Button variant="outline" className="mt-8" onClick={() => setStatus("idle")}>
                  Make another request
                </Button>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="grid gap-5 sm:grid-cols-2">
                    <div className="grid gap-2 sm:col-span-2">
                      <label className="text-sm text-snow/80" htmlFor="book-dates">
                        Dates
                      </label>
                      <DateRangeField id="book-dates" value={range} onChange={(r) => { setRange(r); setMissing((m) => ({ ...m, dates: false })) }} tone="dark" invalid={missing.dates} />
                      {missing.dates && <p className="text-sm text-alert-soft">Choose a check-in and a check-out.</p>}
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm text-snow/80" htmlFor="book-room">
                        Room
                      </label>
                      <RoomField id="book-room" value={room} onChange={(v) => { setRoom(v); setMissing((m) => ({ ...m, room: false })) }} tone="dark" invalid={missing.room} />
                      {missing.room && <p className="text-sm text-alert-soft">Pick a room.</p>}
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm text-snow/80" htmlFor="book-guests">
                        Guests
                      </label>
                      <GuestsField id="book-guests" value={guests} onChange={setGuests} tone="dark" />
                    </div>
                    <TextField form={form} name="name" label="Full name" autoComplete="name" />
                    <TextField form={form} name="email" label="Email" type="email" autoComplete="email" />
                    <TextField form={form} name="phone" label="Phone (optional)" type="tel" autoComplete="tel" />
                    <FormField
                      control={form.control}
                      name="arrival"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-normal text-snow/80">Arriving by</FormLabel>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger className={cn(fieldClass("dark"), "data-[size=default]:h-11 [&_svg:not([class*='text-'])]:text-current")}>
                                <SelectValue placeholder="Choose one" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent position="popper">
                              <SelectItem value="train">Train to Zermatt</SelectItem>
                              <SelectItem value="car">Car, parking in Täsch</SelectItem>
                              <SelectItem value="transfer">Private transfer from the airport</SelectItem>
                              <SelectItem value="unsure">Not sure yet</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-alert-soft" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="requests"
                      render={({ field }) => (
                        <FormItem className="sm:col-span-2">
                          <FormLabel className="font-normal text-snow/80">Anything we should know?</FormLabel>
                          <FormControl>
                            <Textarea {...field} rows={4} placeholder="Ski hire sizes, a cot, a table for a birthday…" className={cn(darkInput, "h-auto min-h-28")} />
                          </FormControl>
                          <FormMessage className="text-alert-soft" />
                        </FormItem>
                      )}
                    />
                    <div className="flex flex-col items-start gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-xs text-snow/55">Free cancellation up to 14 days before arrival.</p>
                      <Button type="submit" size="lg" className="w-full min-w-48 sm:w-auto" disabled={status === "sending"}>
                        {status === "sending" ? (
                          <>
                            <Loader2 className="animate-spin" /> Sending
                          </>
                        ) : (
                          "Request booking"
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-1.5">
      <dt className="text-snow/60">{label}</dt>
      <dd className="text-right">{value}</dd>
    </div>
  )
}

function TextField({
  form,
  name,
  label,
  type = "text",
  autoComplete,
}: {
  form: ReturnType<typeof useForm<Values>>
  name: "name" | "email" | "phone"
  label: string
  type?: string
  autoComplete?: string
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-normal text-snow/80">{label}</FormLabel>
          <FormControl>
            <Input {...field} type={type} autoComplete={autoComplete} className={darkInput} />
          </FormControl>
          <FormMessage className="text-alert-soft" />
        </FormItem>
      )}
    />
  )
}
