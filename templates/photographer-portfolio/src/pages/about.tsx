import { CallToBook } from "@/components/call-to-book"
import { Photo } from "@/components/photo"
import { Container } from "@/components/ui/container"
import { Eyebrow } from "@/components/ui/section-heading"
import { photo, studio } from "@/content"

const facts = [
  { value: "12", label: "years behind a camera" },
  { value: "240+", label: "weddings photographed" },
  { value: "31", label: "countries worked in" },
]

export function Fact({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-t border-ink/15 pt-6">
      <p className="font-display text-5xl">{value}</p>
      <p className="mt-2 text-xs uppercase tracking-[0.2em] text-ink-400">{label}</p>
    </div>
  )
}

export function AboutPage() {
  return (
    <>
      <Container className="grid gap-14 pt-20 md:grid-cols-12">
        <div className="md:col-span-5">
          <Photo src={photo("mara-portrait")} alt={`${studio.name}, photographer`} ratio="tall" />
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <Eyebrow>About</Eyebrow>
          <h1 className="mt-5 font-display text-6xl leading-[0.95]">Hello, I'm Mara.</h1>
          <div className="mt-10 space-y-6 leading-relaxed text-ink-600">
            <p>
              I started as a newspaper photographer in Porto, which taught me two things: nothing
              happens twice, and the best picture is usually just to the left of the one everyone is
              taking.
            </p>
            <p>
              I photograph weddings, portraits and editorial stories the same way — quietly, with one
              camera and two lenses, and without asking anyone to do anything they wouldn't have done
              anyway.
            </p>
            <p>
              When I'm not working I'm printing in the darkroom I share with two friends in Marvila,
              or swimming somewhere far too cold.
            </p>
          </div>
          <div className="mt-14 grid grid-cols-3 gap-6">
            {facts.map((fact) => (
              <Fact key={fact.label} {...fact} />
            ))}
          </div>
        </div>
      </Container>
      <CallToBook title="Let's make something honest." />
    </>
  )
}
