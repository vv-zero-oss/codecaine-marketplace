import { useMemo, useState, type FormEvent } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowUpRight, Check, Search, X } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { Container } from "@/components/ui/container"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { SectionHeading } from "@/components/blocks/section-heading"
import { Reveal } from "@/components/motion/reveal"
import { cn } from "@/lib/utils"

type Role = { id: string; title: string; team: string; city: string; type: string; text: string }

const ROLES: Role[] = [
  { id: "line-pilot", title: "Line pilot", team: "Flight operations", city: "Harbour Pier", type: "Full time", text: "Fly the first scheduled routes across the city. Commercial licence and 1,500 hours; we train you on the type and the network." },
  { id: "training-captain", title: "Training captain", team: "Flight operations", city: "Midtown", type: "Full time", text: "Write and run the course every Aerie pilot passes, in the simulator and over the river. You have trained pilots before." },
  { id: "battery-engineer", title: "Battery systems engineer", team: "Engineering", city: "Northgate hangar", type: "Full time", text: "Own the pack from cell to charger: thermal behaviour, health over thousands of cycles, and how fast a turn at the pad can be." },
  { id: "flight-software", title: "Flight software engineer", team: "Engineering", city: "Midtown, hybrid", type: "Full time", text: "Work on the code between the pilot's hands and six motors. Rust or C++, a taste for proofs, patience for certification." },
  { id: "acoustics", title: "Acoustics researcher", team: "Engineering", city: "Northgate hangar", type: "Contract", text: "Measure what the street hears as we pass. Microphones on rooftops, models of the canyon between towers, and the rotor changes that follow." },
  { id: "vertiport-lead", title: "Vertiport lead", team: "Ground", city: "International", type: "Full time", text: "Run the busiest pad on the network: turns, charging, passengers, weather calls and the team that makes a six-minute stop feel unhurried." },
  { id: "passenger-host", title: "Passenger host", team: "Ground", city: "Harbour Pier", type: "Part time", text: "The first face on the roof. Check people in, walk them to the craft, and make the first flight of their life feel like the hundredth." },
  { id: "product-designer", title: "Product designer, booking", team: "Design", city: "Midtown, hybrid", type: "Full time", text: "Design the app that books a seat in three taps and tells you, calmly, when your craft is two minutes out." },
]

const TEAMS = ["Flight operations", "Engineering", "Ground", "Design"]

/**
 * Careers: every open role, filtered by team and by what you type, each one
 * opening to a short description and an Apply button. Applying is a real
 * form — validated, with a sent state.
 */
export function Careers({
  title = "The network needs people before it needs passengers.",
}: {
  title?: string
}) {
  const [team, setTeam] = useState("all")
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState<string>("")
  const [applying, setApplying] = useState<Role | null>(null)
  const [sent, setSent] = useState(false)

  const roles = useMemo(() => {
    const q = query.trim().toLowerCase()
    return ROLES.filter(
      (r) =>
        (team === "all" || r.team === team) &&
        (!q || [r.title, r.team, r.city, r.type].some((field) => field.toLowerCase().includes(q))),
    )
  }, [team, query])

  const reset = () => {
    setTeam("all")
    setQuery("")
  }

  const startApply = (role: Role) => {
    setSent(false)
    setApplying(role)
  }

  useCanvasAction("Apply dialog", (next) => ((next ?? !applying) ? startApply(ROLES[0]) : setApplying(null)), {
    on: !!applying && !sent,
    group: "Careers",
  })
  useCanvasAction(
    "Application sent",
    (next) => {
      if (next ?? !sent) {
        setApplying(applying ?? ROLES[0])
        setSent(true)
      } else setSent(false)
    },
    { on: !!applying && sent, group: "Careers" },
  )
  useCanvasAction("No roles match", (next) => ((next ?? roles.length > 0) ? (setTeam("all"), setQuery("underwater")) : reset()), {
    on: roles.length === 0,
    group: "Careers",
  })
  useCanvasAction("First role open", (next) => setOpen((next ?? !open) ? roles[0]?.id ?? "" : ""), { on: !!open, group: "Careers" })

  return (
    <section id="careers" data-header-tone="dark" className="relative scroll-mt-24 bg-page py-(--spacing-section) text-ink">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-4">
          <SectionHeading
            eyebrow="Careers — 06"
            title={title}
            lead="Pilots, engineers, people on the roof and people behind the app. Eight roles open now, all in the city."
            className="lg:sticky lg:top-28"
          />
        </div>

        <div className="flex min-w-0 flex-col gap-6 lg:col-span-8">
          <Reveal className="flex flex-col gap-4">
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink-3" />
              <Input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search roles, teams or places"
                aria-label="Search open roles"
                className="pl-11"
              />
            </div>
            <div className="-mx-(--spacing-gutter) overflow-x-auto px-(--spacing-gutter) [scrollbar-width:none]">
              <ToggleGroup
                type="single"
                value={team}
                onValueChange={(v) => setTeam(v || "all")}
                spacing={2}
                aria-label="Filter by team"
                className="flex-nowrap"
              >
                {["all", ...TEAMS].map((t) => {
                  const count = t === "all" ? ROLES.length : ROLES.filter((r) => r.team === t).length
                  return (
                    <ToggleGroupItem
                      key={t}
                      value={t}
                      className="h-11 rounded-(--radius-button) px-4 text-[14px] text-ink-2 shadow-[inset_0_0_0_1px_var(--color-line-strong)] transition-[background-color,color,box-shadow,transform] duration-(--duration-hover) hover:bg-panel hover:text-ink active:scale-[0.97] data-[state=on]:bg-ink data-[state=on]:text-page data-[state=on]:shadow-none"
                    >
                      {t === "all" ? "All teams" : t}
                      <span className="font-mono text-[11px] opacity-60">{count}</span>
                    </ToggleGroupItem>
                  )
                })}
              </ToggleGroup>
            </div>
            <p className="text-micro text-ink-3" aria-live="polite">
              {roles.length} {roles.length === 1 ? "role" : "roles"}
              {team !== "all" ? ` in ${team}` : ""}
              {query.trim() ? ` matching “${query.trim()}”` : ""}
            </p>
          </Reveal>

          {roles.length === 0 ? (
            <div className="flex flex-col items-start gap-4 rounded-(--radius-card) border border-dashed border-line-strong p-8">
              <p className="type-head text-h4">Nothing open that matches, yet.</p>
              <p className="max-w-[44ch] text-body text-ink-3">
                Try a different word or team. Or send us a note anyway — the network grows every season, and so do the roles.
              </p>
              <Button variant="outline" size="sm" onClick={reset}>
                <X /> Clear filters
              </Button>
            </div>
          ) : (
            <Accordion type="single" collapsible value={open} onValueChange={setOpen} className="border-t border-line">
              <AnimatePresence initial={false}>
                {roles.map((role) => (
                  <motion.div
                    key={role.id}
                    layout="position"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <AccordionItem value={role.id} className="border-line">
                      <AccordionTrigger className="group items-center gap-4 rounded-none py-5 hover:no-underline focus-visible:ring-sky/35 [&>svg]:size-5 [&>svg]:text-ink-3">
                        <span className="flex min-w-0 flex-1 flex-col gap-1 md:flex-row md:items-baseline md:gap-6">
                          <span className="type-head text-h4 transition-colors duration-(--duration-hover) md:flex-1 md:group-hover:text-sky">{role.title}</span>
                          <span className="text-micro font-normal text-ink-3 md:w-[46%] md:shrink-0">
                            {role.team} · {role.city} · {role.type}
                          </span>
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="flex flex-col items-start gap-5 pb-7 md:flex-row md:items-end md:justify-between">
                        <p className="max-w-[54ch] text-body text-ink-2">{role.text}</p>
                        <Button variant="sky" size="sm" onClick={() => startApply(role)}>
                          Apply <ArrowUpRight />
                        </Button>
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </AnimatePresence>
            </Accordion>
          )}
        </div>
      </Container>

      <ApplyDialog
        role={applying}
        sent={sent}
        onSent={() => setSent(true)}
        onClose={() => {
          setApplying(null)
          setSent(false)
        }}
      />
    </section>
  )
}

type Fields = { name: string; email: string; link: string }
const EMPTY: Fields = { name: "", email: "", link: "" }

function validate(f: Fields): Partial<Record<keyof Fields, string>> {
  const errors: Partial<Record<keyof Fields, string>> = {}
  if (f.name.trim().length < 2) errors.name = "Tell us your name, at least two letters."
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) errors.email = "That email looks incomplete — check for the @ and the domain."
  const link = f.link.trim()
  if (!/^(https?:\/\/)?[\w-]+(\.[\w-]+)+(\/\S*)?$/i.test(link)) errors.link = "Add a link to your work or profile, like yoursite.com."
  return errors
}

/** The application form: name, email and a link, checked as you go once you have tried to send it. */
function ApplyDialog({ role, sent, onSent, onClose }: { role: Role | null; sent: boolean; onSent: () => void; onClose: () => void }) {
  const [fields, setFields] = useState<Fields>(EMPTY)
  const [tried, setTried] = useState(false)
  const [sending, setSending] = useState(false)
  const errors = validate(fields)
  const show = tried ? errors : {}

  const submit = (e: FormEvent) => {
    e.preventDefault()
    setTried(true)
    if (Object.keys(errors).length) return
    setSending(true)
    window.setTimeout(() => {
      setSending(false)
      onSent()
    }, 700)
  }

  const close = () => {
    onClose()
    setFields(EMPTY)
    setTried(false)
  }

  const set = (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement>) => setFields((f) => ({ ...f, [key]: e.target.value }))
  const first = fields.name.trim().split(" ")[0] || "there"

  return (
    <Dialog open={!!role} onOpenChange={(o) => !o && close()}>
      <DialogContent className="rounded-(--radius-photo) border-line bg-page p-6 shadow-(--shadow-device) sm:max-w-md sm:p-8">
        {sent ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col items-start gap-4"
          >
            <span className="flex size-11 items-center justify-center rounded-full bg-signal-green-soft text-signal-green">
              <Check className="size-5" />
            </span>
            <DialogHeader className="text-left">
              <DialogTitle className="type-head text-h3 leading-tight">Thank you, {first}.</DialogTitle>
              <DialogDescription className="text-body text-ink-3">
                Your application for {role?.title} is with the {role?.team} team. A person reads every one, and you will hear from us within
                ten days either way.
              </DialogDescription>
            </DialogHeader>
            <Button variant="ink" onClick={close}>
              Back to the roles
            </Button>
          </motion.div>
        ) : (
          <form onSubmit={submit} noValidate className="flex flex-col gap-5">
            <DialogHeader className="text-left">
              <p className="text-micro text-ink-3">
                {role?.team} · {role?.city}
              </p>
              <DialogTitle className="type-head text-h3 leading-tight">Apply: {role?.title}</DialogTitle>
              <DialogDescription className="text-body text-ink-3">Three things to start. We will ask for the rest if it is a fit.</DialogDescription>
            </DialogHeader>
            <Field id="apply-name" label="Full name" error={show.name}>
              <Input id="apply-name" autoComplete="name" value={fields.name} onChange={set("name")} aria-invalid={!!show.name} />
            </Field>
            <Field id="apply-email" label="Email" error={show.email}>
              <Input id="apply-email" type="email" autoComplete="email" value={fields.email} onChange={set("email")} aria-invalid={!!show.email} />
            </Field>
            <Field id="apply-link" label="Portfolio, CV or profile link" error={show.link}>
              <Input id="apply-link" type="url" inputMode="url" placeholder="yoursite.com" value={fields.link} onChange={set("link")} aria-invalid={!!show.link} />
            </Field>
            <Button type="submit" variant="sky" disabled={sending} className="mt-1 w-full">
              {sending ? "Sending…" : "Send application"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className="text-micro font-medium text-ink-2">
        {label}
      </Label>
      {children}
      <p id={`${id}-error`} className={cn("min-h-[1lh] text-micro text-signal-red", !error && "invisible")} aria-live="polite">
        {error || "ok"}
      </p>
    </div>
  )
}
