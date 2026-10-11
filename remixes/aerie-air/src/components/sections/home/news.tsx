import { useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { Photo } from "@/components/blocks/photo"
import { Reveal } from "@/components/motion/reveal"
import { Button } from "@/components/ui/button"
import type { PhotoName } from "@/lib/photos"

const NOTES: { date: string; title: string; photo: PhotoName; tag: string }[] = [
  { date: "Sep 24, 2026", title: "Our second aircraft completes 1,000 piloted hover-to-cruise transitions", photo: "wing-pink", tag: "Flight test" },
  { date: "Aug 12, 2026", title: "Midtown Roof breaks ground: the first pad on a working office tower", photo: "pad-aerial", tag: "Vertiports" },
  { date: "Jul 03, 2026", title: "A new battery line, and 140 new jobs, in the old rail quarter", photo: "hangar", tag: "Company" },
  { date: "May 19, 2026", title: "What a pilot hears at 500 metres: our first public noise survey", photo: "cockpit", tag: "Noise" },
  { date: "Apr 02, 2026", title: "Harbour Pier plans approved, with a public garden on the deck below", photo: "pad-garden", tag: "Vertiports" },
  { date: "Feb 26, 2026", title: "Meet the technicians keeping every motor honest between flights", photo: "engineer", tag: "People" },
]

/**
 * "Notes from above": three dated notes, each a photograph that lifts a
 * little on hover. The reference's news row, kept small and quiet.
 */
export function News({ initial = 3 }: { /** Notes shown before "All notes". */ initial?: number }) {
  const [all, setAll] = useState(false)
  useCanvasAction("All notes", (next) => setAll(next ?? !all), { on: all, group: "News" })
  const shown = all ? NOTES : NOTES.slice(0, initial)
  return (
    <section id="news" data-header-tone="dark" className="bg-page px-(--spacing-gutter) py-(--spacing-section)">
      <div className="flex items-end justify-between gap-6">
        <h2 className="type-head text-h2">Notes from above</h2>
        <Button variant="ink" size="sm" aria-expanded={all} onClick={() => setAll((v) => !v)}>
          {all ? "Fewer notes" : "All notes"}
        </Button>
      </div>
      <div className="mt-12 grid gap-x-4 gap-y-12 md:grid-cols-3">
        {shown.map((note, i) => (
          <Reveal key={note.title} delay={(i % 3) * 0.08} as="article" className="group flex flex-col gap-4 border-l border-line pl-4">
            <p className="text-micro text-ink-3">
              {note.date} · {note.tag}
            </p>
            <a href="#news" onClick={(e) => e.preventDefault()} className="flex flex-1 flex-col gap-6 outline-none">
              <h3 className="max-w-[26ch] text-lead font-medium tracking-[-0.02em] transition-colors group-hover:text-sky">
                {note.title}
                <ArrowUpRight className="ml-1 inline size-4 -translate-y-px opacity-0 transition-[opacity,transform] duration-(--duration-hover) group-hover:translate-x-0.5 group-hover:opacity-100" />
              </h3>
              <div className="mt-auto overflow-hidden rounded-(--radius-card)">
                <Photo
                  name={note.photo}
                  rounded={false}
                  className="aspect-[4/3] transition-transform duration-(--duration-scene) ease-(--ease-out-strong) group-hover:scale-[1.03]"
                />
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
