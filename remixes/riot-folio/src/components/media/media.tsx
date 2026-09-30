import { Lock } from "lucide-react"

import { FACES, pexels, type Media as MediaSpec, type Tone } from "@/content"
import { TONE_FILL } from "@/components/media/tone"
import { cn } from "@/lib/utils"

/**
 * A photograph printed in one ink: grey, contrasty, multiplied onto a tone.
 * Every photo on the site goes through this, which is what makes a page of
 * unrelated pictures read as one loud set.
 */
export function Duotone({
  src,
  alt,
  tone = "pink",
  className,
}: {
  src: string
  alt: string
  tone?: Tone
  className?: string
}) {
  return (
    <div className={cn("relative overflow-hidden", TONE_FILL[tone], className)}>
      <img src={src} alt={alt} loading="lazy" decoding="async" className="duotone-ink absolute inset-0 size-full object-cover" />
    </div>
  )
}

/** A spiral of faces — a community, drawn as its members. */
export function AvatarCloud({ count = 34, tone = "pink", className }: { count?: number; tone?: Tone; className?: string }) {
  const golden = Math.PI * (3 - Math.sqrt(5))
  return (
    <div className={cn("relative overflow-hidden bg-ink", className)} aria-hidden>
      {Array.from({ length: count }, (_, i) => {
        const r = Math.sqrt((i + 0.5) / count) * 46
        const a = i * golden
        const size = 7 + (i % 5) * 1.6 + (r / 46) * 4
        const face = FACES[i % FACES.length]
        return (
          <span
            key={i}
            className={cn("absolute overflow-hidden rounded-full", TONE_FILL[tone])}
            style={{
              left: `${50 + Math.cos(a) * r}%`,
              top: `${50 + Math.sin(a) * r}%`,
              width: `${size}%`,
              aspectRatio: "1",
              transform: "translate(-50%, -50%)",
            }}
          >
            {i % 3 !== 1 ? (
              <img src={pexels(face, 120)} alt="" loading="lazy" className="duotone-ink size-full object-cover" />
            ) : null}
          </span>
        )
      })}
    </div>
  )
}

/** Rows of pay buttons, the product as a pattern. */
export function PayPattern({ className }: { className?: string }) {
  return (
    <div className={cn("relative overflow-hidden bg-night", className)} aria-hidden>
      <div className="absolute inset-[-10%] flex -rotate-6 flex-col justify-center gap-[5%]">
        {Array.from({ length: 8 }, (_, row) => (
          <div key={row} className="flex gap-[6%]" style={{ marginLeft: `${(row % 2) * -22}%` }}>
            {Array.from({ length: 4 }, (_, col) => (
              <span key={col} className="flex shrink-0 basis-[40%] flex-col items-center gap-[3px]">
                <span className="flex h-4 w-full items-center justify-center rounded-[4px] bg-lime text-[7px] font-semibold text-night">
                  Pay with Tapwise
                </span>
                <span className="text-[5px] text-ink-faint">Straight from your bank</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/** A locked pot, the bank's one promise. */
export function LockCard({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-3 bg-ink text-night", className)} aria-hidden>
      <span className="flex size-12 items-center justify-center rounded-full bg-sun">
        <Lock className="size-5" strokeWidth={2.25} />
      </span>
      <span className="text-[11px] font-medium">Tax pot · locked</span>
      <span className="text-[10px] text-night/60">Unlocks 31 Jan</span>
    </div>
  )
}

/** A name set in type, for a brand whose mark is its word. */
export function WordmarkCard({ word, sub, className }: { word: string; sub: string; className?: string }) {
  return (
    <div className={cn("flex items-center justify-center bg-ink text-night", className)} aria-hidden>
      <span className="text-center leading-none">
        <span className="block text-[1.9rem] font-light tracking-[-0.03em] italic">{word}</span>
        <span className="mt-1 block text-[0.55rem] font-semibold tracking-[0.35em] uppercase">{sub}</span>
      </span>
    </div>
  )
}

/** Whatever a project shows in its frame. */
export function ProjectMedia({ media, tone, className }: { media: MediaSpec; tone: Tone; className?: string }) {
  const frame = cn("aspect-[4/5] w-full rounded-[var(--radius-media)] shadow-[var(--shadow-media)]", className)
  switch (media.kind) {
    case "avatars":
      return <AvatarCloud tone={tone} className={frame} />
    case "pay":
      return <PayPattern className={frame} />
    case "lock":
      return <LockCard className={frame} />
    case "wordmark":
      return <WordmarkCard word={media.word} sub={media.sub} className={frame} />
    case "photo":
      return <Duotone src={pexels(media.id, 600)} alt={media.alt} tone={tone} className={frame} />
  }
}
