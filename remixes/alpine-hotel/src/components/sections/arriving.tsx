import { TrainFront } from "lucide-react"
import { Container } from "@/components/ui/container"
import { Chapter } from "@/components/ui/chapter"
import { TornEdge } from "@/components/ui/torn-edge"
import { Reveal } from "@/components/motion/reveal"
import { included, onRequest, routes } from "@/content"

/**
 * The practical page: how to get to a car-free village, and exactly what the
 * rate covers and what it doesn't — printed in white on the pine sheet.
 */
export function Arriving({
  title = "No cars in Zermatt. It is easier than it sounds.",
  lede = "Tell us which train you are on. The electric car meets it and brings your bags up the hill.",
}: {
  title?: string
  lede?: string
}) {
  return (
    <section id="arriving" className="relative">
      <TornEdge tone="pine" seed={5} className="-mb-px" />
      <div className="bg-pine pt-16 pb-(--spacing-section) text-pine-ink">
        <Container>
          <Chapter number="06" label="Arriving & included" title={title} lede={lede} tone="light" />

          <div className="mt-14 grid gap-14 lg:grid-cols-12">
            <Reveal className="lg:col-span-6">
              <p className="label flex items-center gap-2 border-b border-pine-ink/40 pb-2">
                <TrainFront className="size-3.5" /> To Zermatt station
              </p>
              <table className="w-full border-collapse text-left">
                <caption className="sr-only">Journey times to Zermatt</caption>
                <thead>
                  <tr className="border-b border-pine-ink/20">
                    <th className="label py-2 font-normal text-pine-ink/55">From</th>
                    <th className="label py-2 text-right font-normal text-pine-ink/55">Time</th>
                    <th className="label hidden py-2 text-right font-normal text-pine-ink/55 sm:table-cell">Runs</th>
                  </tr>
                </thead>
                <tbody>
                  {routes.map((r) => (
                    <tr key={r.from} className="border-b border-pine-ink/20">
                      <td className="py-4">
                        <span className="font-serif text-xl">{r.from}</span>
                        <span className="block text-sm text-pine-ink/60">{r.via}</span>
                      </td>
                      <td className="py-4 text-right font-mono tabular-nums">{r.time}</td>
                      <td className="hidden py-4 text-right font-mono text-sm text-pine-ink/70 sm:table-cell">{r.every}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-5 text-sm leading-relaxed text-pine-ink/70">
                Parking at the Täsch terminal is CHF 16.50 a day. From Zermatt station the house is 1.1 km uphill — ten minutes in the car, twenty on foot.
              </p>
            </Reveal>

            <div className="grid gap-12 sm:grid-cols-2 lg:col-span-6 lg:gap-8">
              <Reveal delay={0.05}>
                <p className="label border-b border-pine-ink/40 pb-2">In the rate</p>
                <ul>
                  {included.map((item) => (
                    <li key={item} className="flex gap-3 border-b border-pine-ink/20 py-3 text-[15px]">
                      <span aria-hidden className="font-mono text-pine-ink/50">+</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="label border-b border-pine-ink/40 pb-2">On request</p>
                <ul>
                  {onRequest.map((item) => (
                    <li key={item.what} className="flex items-baseline gap-2 border-b border-pine-ink/20 py-3 text-[15px]">
                      {item.what}
                      <span className="flex-1 translate-y-[-0.3em] border-b border-dotted border-pine-ink/30" aria-hidden />
                      <span className="font-mono text-sm tabular-nums">{item.price}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </Container>
      </div>
      <TornEdge tone="pine" seed={17} flip className="-mt-px" />
    </section>
  )
}
