export function TestimonialCard({ quote, name, role }: { quote: string; name: string; role: string }) {
  return (
    <figure className="flex h-full flex-col justify-between gap-8 border border-line bg-paper p-6 shadow-card transition-shadow duration-300 hover:shadow-pop sm:p-8">
      <blockquote className="font-serif text-[22px] leading-[1.2] tracking-[-0.005em] text-balance">“{quote}”</blockquote>
      <figcaption className="flex items-center gap-3">
        <span className="grid size-9 shrink-0 place-items-center bg-sky text-[13px] font-medium text-sky-ink">{name.slice(0, 1)}</span>
        <span className="text-[12px] leading-tight">
          <span className="block font-medium text-ink">{name}</span>
          <span className="text-ink-3">{role}</span>
        </span>
      </figcaption>
    </figure>
  )
}
