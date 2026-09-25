import { Container } from "@/components/ui/container"
import { TESTIMONIALS } from "@/content"

export function TestimonialCard({
  quote,
  name,
  role,
}: {
  quote: string
  name: string
  role: string
}) {
  return (
    <figure className="testimonial flex h-full flex-col justify-between rounded-2xl border border-quartz-200 bg-white p-8">
      <blockquote className="text-lg leading-relaxed tracking-tight text-quartz-900">
        “{quote}”
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <span className="size-9 rounded-full bg-gradient-to-br from-indigo-200 to-violet-300" />
        <span className="text-sm">
          <span className="block font-medium">{name}</span>
          <span className="block text-quartz-400">{role}</span>
        </span>
      </figcaption>
    </figure>
  )
}

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24">
      <Container>
        <div className="grid gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((item) => (
            <TestimonialCard key={item.name} {...item} />
          ))}
        </div>
      </Container>
    </section>
  )
}
