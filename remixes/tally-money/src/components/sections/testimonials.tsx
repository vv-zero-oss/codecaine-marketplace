import { Container } from "@/components/ui/container"
import { Display } from "@/components/ui/display"
import { Reveal } from "@/components/motion/reveal"
import { cn } from "@/lib/utils"

const BASE = import.meta.env.BASE_URL

const QUOTES = [
  { name: "Amara Okafor", role: "Product designer", photo: "amara.jpg", quote: "I opened Tally to check one payment and ended up cancelling three subscriptions I had forgotten about.", chip: "Cancelled 3 plans", offset: "" },
  { name: "Theo Lindqvist", role: "Freelance developer", photo: "theo.jpg", quote: "Invoices land on odd days. Seeing a whole month of cash flow on one line is the first time I have not dreaded the 1st.", chip: "Calmer rent day", offset: "md:mt-10" },
  { name: "Priya Raman", role: "Clinic manager", photo: "priya.jpg", quote: "I stopped keeping a spreadsheet in March. I have not missed it once, and the totals are never wrong.", chip: "0 spreadsheets", offset: "md:mt-20" },
]

export function QuoteCard({ name, role, photo, quote, chip, className }: (typeof QUOTES)[number] & { className?: string }) {
  return (
    <figure className={cn("flex h-full flex-col rounded-3xl bg-ink-50 p-6 transition-[transform,box-shadow] duration-200 ease-[var(--ease-out)] sm:p-8 [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-lift", className)}>
      <span className="w-fit rounded-full bg-leaf-200 px-3 py-1 text-[11px] font-bold tracking-wide text-night-950 uppercase">{chip}</span>
      <blockquote className="mt-5 flex-1 text-xl leading-snug font-bold tracking-tight text-balance">“{quote}”</blockquote>
      <figcaption className="mt-8 flex items-center gap-3">
        <img src={`${BASE}people/${photo}`} alt={`Portrait of ${name}`} width="48" height="48" loading="lazy" className="size-12 rounded-full object-cover ring-2 ring-white" />
        <span>
          <span className="block text-sm font-bold">{name}</span>
          <span className="block text-sm text-ink-600">{role}</span>
        </span>
      </figcaption>
    </figure>
  )
}

export function Testimonials() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container>
        <Reveal>
          <p className="text-sm font-semibold tracking-wider text-ink-400 uppercase">In their words</p>
          <Display className="mt-3 max-w-3xl">People who stopped wondering where it went.</Display>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {QUOTES.map((quote, i) => (
            <Reveal key={quote.name} delay={i * 0.1} className={quote.offset}>
              <QuoteCard {...quote} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
