import { Prose, SplitSection } from "@/components/blocks/split-section"
import { PixelFace } from "@/components/marks/pixel-marks"
import { changed } from "@/content"

/** What a laptop is for and what it is not, with a face for each. */
export function Changed() {
  return (
    <SplitSection id="changed" heading={changed.heading} label={changed.label}>
      <Prose>
        {changed.body.map((p) => (
          <p key={p.slice(0, 20)}>{p}</p>
        ))}
      </Prose>
      <div className="my-16 grid gap-12 sm:my-24 sm:grid-cols-2 sm:gap-6">
        <Verdict mood="happy" label={changed.good.label} body={changed.good.body} />
        <Verdict mood="sad" label={changed.bad.label} body={changed.bad.body} />
      </div>
      <Prose>
        <p>{changed.closing}</p>
      </Prose>
    </SplitSection>
  )
}

export function Verdict({ mood, label, body }: { mood: "happy" | "sad"; label: string; body: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <PixelFace mood={mood} />
      <p className="label mt-14 text-mute">{label}</p>
      <p className="mt-3 max-w-[14.5rem] text-small text-ink-soft">{body}</p>
    </div>
  )
}
