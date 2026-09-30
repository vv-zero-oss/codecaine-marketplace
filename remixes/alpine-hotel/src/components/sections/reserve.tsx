import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { format } from "date-fns"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Loader2 } from "lucide-react"
import { useCanvasAction } from "@canvas/react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Chapter } from "@/components/ui/chapter"
import { Stamp } from "@/components/ui/stamp"
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
  name: z.string().min(2, "Please write your name."),
  email: z.string().email("That email doesn't look right."),
  phone: z.string().optional(),
  arrival: z.string().min(1, "Tell us how you are coming."),
  requests: z.string().max(600).optional(),
})
type Values = z.infer<typeof schema>

const line =
  "h-11 rounded-none border-0 border-b border-ink bg-transparent px-0 font-serif text-[1.0625rem] shadow-none placeholder:text-ink-faint focus-visible:border-signal focus-visible:ring-0 aria-invalid:border-signal"

/**
 * The reservation, as the registration card a guest fills in at the desk:
 * blanks to write on, the room and dates already filled in from above, and
 * the house stamp pressed on it when the request goes through.
 */
export function Reserve({
  title = "Ask for a room.",
  lede = "No deposit now. The front desk confirms by email within the hour, and holds the room for a day while you decide.",
}: {
  title?: string
  lede?: string
}) {
  const { range, setRange, room, setRoom, guests, setGuests } = useBooking()
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle")
  const [missing, setMissing] = useState({ dates: false, room: false })
  const reduce = useReducedMotion()
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", arrival: "", requests: "" },
  })

  useCanvasAction("Request received", (next) => setStatus((next ?? status !== "sent") ? "sent" : "idle"), {
    on: status === "sent",
    group: "Reserve",
  })
  useCanvasAction("Show form errors", (next) => {
    if (next === false) {
      form.clearErrors()
      setMissing({ dates: false, room: false })
    } else {
      void form.trigger()
      setMissing({ dates: !range?.to, room: !room })
    }
  }, { group: "Reserve" })

  const chosen = rooms.find((r) => r.id === room)
  const nights = nightsOf(range)
  const winter = range?.from ? [11, 0, 1, 2, 3].includes(range.from.getMonth()) : true
  const rate = chosen ? (winter ? chosen.winter : chosen.summer) : 0
  const total = rate * nights

  const onSubmit = async () => {
    const miss = { dates: !range?.from || !range?.to, room: !room }
    setMissing(miss)
    if (miss.dates || miss.room) return
    setStatus("sending")
    await new Promise((r) => setTimeout(r, 900))
    setStatus("sent")
  }

  return (
    <section id="reserve" className="pb-(--spacing-section)">
      <Container>
        <Chapter number="08" label="Reserve" title={title} lede={lede} />

        <div className="relative mt-12 rounded-print bg-sheet shadow-(--shadow-sheet)">
          {/* The card's printed head */}
          <div className="flex flex-wrap items-baseline justify-between gap-3 border-b-2 border-ink px-5 py-4 sm:px-10">
            <p className="font-serif text-2xl">{hotel.full} — registration</p>
            <p className="label text-ink-faint">Card no. {String(2604 + (total % 97)).padStart(5, "0")}</p>
          </div>

          <div className="grid lg:grid-cols-12">
            <div className="px-5 py-8 sm:px-10 lg:col-span-8 lg:border-r lg:border-rule">
              <AnimatePresence mode="wait" initial={false}>
                {status === "sent" ? (
                  <motion.div
                    key="sent"
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="relative flex min-h-[26rem] flex-col justify-center"
                  >
                    <motion.div
                      initial={reduce ? false : { opacity: 0, scale: 1.25, rotate: -4 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ duration: 0.22, ease: EASE_OUT, delay: 0.1 }}
                      className="absolute top-0 right-0 w-36 sm:w-44"
                    >
                      <Stamp ring="Received · Hotel Arven · " top="Front desk" middle={format(new Date(), "d.M.")} bottom="Zermatt" rotate={9} />
                    </motion.div>
                    <p className="label text-signal">Request received</p>
                    <p className="mt-3 max-w-[18ch] font-serif text-4xl leading-tight sm:text-5xl">See you up the hill, {form.getValues("name").split(" ")[0] || "then"}.</p>
                    <p className="mt-4 max-w-[46ch] text-ink-soft">
                      We have your request for the {chosen?.name ?? "room"}. A confirmation goes to {form.getValues("email") || "your inbox"} within the hour — reply to it with the train you are catching.
                    </p>
                    <Button variant="outline" className="mt-8 w-fit" onClick={() => setStatus("idle")}>
                      Start another card
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={false} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
                        <Field label="Dates" htmlFor="res-dates" className="sm:col-span-2" error={missing.dates ? "Choose an arrival and a departure." : undefined}>
                          <DateRangeField id="res-dates" value={range} onChange={(r) => { setRange(r); setMissing((m) => ({ ...m, dates: false })) }} invalid={missing.dates} />
                        </Field>
                        <Field label="Room" htmlFor="res-room" error={missing.room ? "Pick a room." : undefined}>
                          <RoomField id="res-room" value={room} onChange={(v) => { setRoom(v); setMissing((m) => ({ ...m, room: false })) }} invalid={missing.room} />
                        </Field>
                        <Field label="Guests" htmlFor="res-guests">
                          <GuestsField id="res-guests" value={guests} onChange={setGuests} />
                        </Field>
                        <LineField form={form} name="name" label="Full name" autoComplete="name" />
                        <LineField form={form} name="email" label="Email" type="email" autoComplete="email" />
                        <LineField form={form} name="phone" label="Phone (optional)" type="tel" autoComplete="tel" />
                        <FormField
                          control={form.control}
                          name="arrival"
                          render={({ field }) => (
                            <FormItem className="gap-1">
                              <FormLabel className="label font-normal text-ink-faint">Arriving by</FormLabel>
                              <Select value={field.value} onValueChange={field.onChange}>
                                <FormControl>
                                  <SelectTrigger className={cn(fieldClass(), "data-[size=default]:h-11 [&_svg:not([class*='text-'])]:text-current")}>
                                    <SelectValue placeholder="Choose one" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent position="popper" className="rounded-print bg-sheet">
                                  <SelectItem value="train">Train to Zermatt</SelectItem>
                                  <SelectItem value="car">Car, parking in Täsch</SelectItem>
                                  <SelectItem value="transfer">Transfer from the airport</SelectItem>
                                  <SelectItem value="unsure">Not sure yet</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage className="text-signal" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="requests"
                          render={({ field }) => (
                            <FormItem className="gap-1 sm:col-span-2">
                              <FormLabel className="label font-normal text-ink-faint">Anything we should know</FormLabel>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  rows={3}
                                  placeholder="Ski sizes, a cot, a table for a birthday…"
                                  className={cn(line, "h-auto min-h-24 resize-none bg-[repeating-linear-gradient(transparent,transparent_2.2rem,var(--color-rule)_2.2rem,var(--color-rule)_calc(2.2rem+1px))] leading-[2.2rem]")}
                                />
                              </FormControl>
                              <FormMessage className="text-signal" />
                            </FormItem>
                          )}
                        />
                        <div className="flex flex-col items-start gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                          <p className="text-[13px] text-ink-faint">Free cancellation until 14 days before arrival.</p>
                          <Button type="submit" variant="signal" size="lg" className="w-full sm:w-auto" disabled={status === "sending"}>
                            {status === "sending" ? (
                              <>
                                <Loader2 className="animate-spin" /> Sending
                              </>
                            ) : (
                              "Send the card"
                            )}
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* The desk's column: what has been asked for, and what it comes to. */}
            <aside className="border-t border-rule px-5 py-8 sm:px-10 lg:col-span-4 lg:border-t-0">
              <p className="label text-ink-faint">For the desk</p>
              <dl className="mt-4 text-[15px]">
                <Row label="Room" value={chosen?.name ?? "—"} />
                <Row label="Arrive" value={range?.from ? format(range.from, "EEE d MMM yyyy") : "—"} />
                <Row label="Leave" value={range?.to ? format(range.to, "EEE d MMM yyyy") : "—"} />
                <Row label="Guests" value={guests} />
                <Row label="Rate" value={rate ? `CHF ${rate} · ${winter ? "winter" : "summer"}` : "—"} />
              </dl>
              <div className="mt-6 flex items-baseline justify-between border-t-2 border-ink pt-4">
                <span className="label">{nights ? `${nights} night${nights === 1 ? "" : "s"}` : "Total"}</span>
                <span className="font-serif text-4xl tabular-nums">{total ? `CHF ${total.toLocaleString("en-CH")}` : "—"}</span>
              </div>
              <p className="mt-6 text-[13px] leading-relaxed text-ink-soft">
                Rather speak to someone? {hotel.phone}, 8:00–21:00, or write to {hotel.email}.
              </p>
            </aside>
          </div>
        </div>
      </Container>
    </section>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-2 border-b border-rule py-2.5">
      <dt className="text-ink-faint">{label}</dt>
      <span className="leader" aria-hidden />
      <dd className="text-right font-serif">{value}</dd>
    </div>
  )
}

function Field({
  label,
  htmlFor,
  error,
  className,
  children,
}: {
  label: string
  htmlFor: string
  error?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn("grid gap-1", className)}>
      <label className="label text-ink-faint" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
      {error && <p className="text-sm text-signal">{error}</p>}
    </div>
  )
}

function LineField({
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
        <FormItem className="gap-1">
          <FormLabel className="label font-normal text-ink-faint">{label}</FormLabel>
          <FormControl>
            <Input {...field} type={type} autoComplete={autoComplete} className={line} />
          </FormControl>
          <FormMessage className="text-signal" />
        </FormItem>
      )}
    />
  )
}
