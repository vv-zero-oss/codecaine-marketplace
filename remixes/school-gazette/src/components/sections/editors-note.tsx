import { Container } from "@/components/ui/container"
import { Figure } from "@/components/ui/section-heading"
import { Photo } from "@/components/ui/photo"
import { Manicule } from "@/components/ui/retro"
import { PHOTOS } from "@/data/photos"

/** A paragraph that opens with a boxed drop cap, as the columns of a broadsheet do. */
function DropCapParagraph({ letter, children }: { letter: string; children: string }) {
  return (
    <p className="text-[1rem] leading-snug">
      <span aria-hidden className="mt-1 mr-2 float-left grid size-10 place-items-center bg-ink font-display text-3xl leading-none text-paper">{letter}</span>
      <span className="sr-only">{letter}</span>
      {children}
    </p>
  )
}

/**
 * The editor’s page: who makes this magazine. A narrow column of headline, a
 * tall photo and a drop-cap paragraph beside a wide portrait with the numbers
 * set huge underneath on ruled lines.
 */
export function EditorsNote() {
  return (
    <section id="editors" aria-labelledby="editors-title" className="border-t-4 border-double border-ink">
      <Container className="grid gap-8 py-10 md:grid-cols-[minmax(0,0.5fr)_minmax(0,1fr)] md:gap-0 md:divide-x md:divide-ink [&>*]:md:px-8 [&>*:first-child]:md:pl-0 [&>*:last-child]:md:pr-0">
        <div className="flex flex-col gap-5">
          <h2 id="editors-title" className="display text-[clamp(2.4rem,5vw,3.8rem)]">
            Student-made <span className="block text-[1.18em]">Edition!</span>
          </h2>
          <Figure caption="Fig. 1 — Priya, 11C, checking the proofs">
            <Photo src={PHOTOS.railing} alt="A girl in glasses and a school uniform looking through a railing" className="aspect-[4/5] w-full" />
          </Figure>
          <DropCapParagraph letter="E">
            very word in this issue was written, photographed and laid out by pupils between lessons, lunches and the odd free period. The staff room only sees it when it is printed.
          </DropCapParagraph>
          <p className="text-[0.9rem] text-ink-soft"><Manicule /> Meets Wednesdays, Room 9. Bring a pencil, an opinion and a snack.</p>
        </div>
        <div className="flex flex-col gap-5">
          <Figure caption="The editor-in-chief, moments before deadline.">
            <Photo src={PHOTOS.portrait} alt="A student with glasses standing in front of a school blackboard" className="aspect-[16/9] w-full" imgClassName="object-[50%_25%]" />
          </Figure>
          <p className="ledger display text-[clamp(2rem,5.6vw,4.4rem)] leading-[0.88]">
            Four issues a year.<br />
            Thirty-eight writers.<br />
            Twelve photographers.<br />
            One very loud printer.
          </p>
        </div>
      </Container>
    </section>
  )
}
