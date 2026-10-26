import { Link2, Lock, Mic, Search, X } from "lucide-react"

import { NoteCard } from "@/components/mockups/note-card"
import { cn } from "@/lib/utils"
import { PHOTOS, pexels } from "@/photos"

const LIBRARY = [
  { name: "Halden check-in", meta: "Today · 24 min" },
  { name: "Design crit", meta: "Today · 41 min" },
  { name: "Call with Mireille", meta: "Yesterday · 12 min" },
  { name: "Hiring sync", meta: "Mon · 30 min" },
  { name: "Voice memo", meta: "Sun · 3 min" },
]

/** The mobile app: the latest note on top, the library below. */
export function LibraryPhone() {
  return (
    <div className="w-[190px] rounded-[30px] bg-void p-1.5 shadow-float ring-1 ring-white/15 sm:w-[200px]">
      <div className="overflow-hidden rounded-[25px] bg-canvas px-3 pt-3 pb-4 text-bone">
        <div className="flex justify-between px-1 text-[8px] font-medium">
          <span>9:41</span>
          <span className="h-3 w-12 rounded-pill bg-void" />
          <span>100%</span>
        </div>
        <p className="mt-2 text-center text-[9px] font-medium">Notes</p>
        <NoteCard finish="snow" title="Design crit" date="Today · 41 min" className="mt-2 w-full! rounded-[10px] p-3 [&>span:nth-child(2)]:text-[13px]" />
        <div className="mt-3 flex items-center gap-1.5 rounded-ui bg-glass px-2 py-1.5 text-[8px] text-mist">
          <Search className="size-2.5" /> Search all notes
        </div>
        <ul className="mt-3 flex flex-col gap-2">
          {LIBRARY.map((row) => (
            <li key={row.name} className="flex items-center gap-2 text-[8px]">
              <span className="flex size-4 items-center justify-center rounded-[4px] bg-raised">
                <Mic className="size-2" />
              </span>
              <span className="flex-1 truncate">{row.name}</span>
              <span className="text-mist tabular-nums">{row.meta}</span>
            </li>
          ))}
        </ul>
        <span className="mx-auto mt-3 flex size-8 items-center justify-center rounded-pill bg-rose text-snow">
          <Mic className="size-3.5" />
        </span>
      </div>
    </div>
  )
}

/** Someone on a walk, the phone mid-recording. */
export function WalkingRecorder() {
  return (
    <>
      <img src={pexels(PHOTOS.walking, 900)} alt="" className="absolute inset-0 size-full object-cover" />
      <div className="absolute top-[40%] left-1/2 w-[50%] -translate-x-1/2 rotate-[6deg] rounded-[22px] bg-void p-1 shadow-float">
        <div className="flex aspect-[9/11] flex-col items-center justify-center gap-1.5 rounded-[18px] bg-canvas text-bone">
          <span className="flex items-center gap-1.5 text-[9px] text-mist">
            <span className="size-1.5 rounded-pill bg-rose" /> Recording
          </span>
          <span className="text-2xl tracking-[-0.03em] tabular-nums">04:12</span>
          <span className="text-[9px] text-mist">Idea for the spring launch</span>
        </div>
      </div>
    </>
  )
}

const CHAPTERS = [
  { time: "00:00", title: "Where onboarding stands" },
  { time: "08:40", title: "Pricing and the free plan" },
  { time: "19:15", title: "Who owns what this week" },
]
const TALK = [
  { name: "Sofie", share: 38 },
  { name: "Marco", share: 27 },
  { name: "Ines", share: 21 },
  { name: "Kwame", share: 14 },
]

/** A recap document: chapters on the left, talk time on the right. */
export function RecapDoc() {
  return (
    <div className="grid w-[92%] grid-cols-1 overflow-hidden rounded-ui bg-canvas text-bone shadow-subtle sm:grid-cols-[1.1fr_0.9fr]">
      <div className="relative p-6 text-[11px]">
        <X className="absolute top-3 right-3 size-3 text-mist" />
        <p className="text-[10px] tracking-[0.08em] text-mist uppercase">Recap · 32 min · 4 people</p>
        <p className="mt-1 text-[15px] tracking-[-0.02em]">Weekly product review</p>
        <p className="mt-4 text-mist">Chapters</p>
        <ul className="mt-2 flex flex-col gap-1.5">
          {CHAPTERS.map((chapter, index) => (
            <li
              key={chapter.time}
              className={cn("flex gap-3 rounded-[6px] border px-2.5 py-2", index === 1 ? "border-bone" : "border-hairline")}
            >
              <span className="text-mist tabular-nums">{chapter.time}</span>
              {chapter.title}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-mist">Next step</p>
        <p className="mt-1">Ines drafts pricing copy by Thursday.</p>
        <span className="mt-4 flex h-8 items-center justify-center rounded-[6px] bg-graphite text-snow">Send recap</span>
        <span className="mt-1.5 flex h-8 items-center justify-center rounded-[6px] bg-graphite">Edit</span>
      </div>
      <div className="hidden flex-col justify-end gap-3 bg-glass p-6 text-[10px] sm:flex">
        <p className="text-[10px] tracking-[0.08em] text-mist uppercase">Talk time</p>
        {TALK.map((person) => (
          <div key={person.name}>
            <div className="flex justify-between">
              <span>{person.name}</span>
              <span className="text-mist tabular-nums">{person.share}%</span>
            </div>
            <span className="mt-1 block h-1.5 rounded-pill bg-raised">
              <span className="block h-full rounded-pill bg-mint/80" style={{ width: `${person.share * 2}%` }} />
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/** A share link for one recap, with who can see what. */
export function ShareCard() {
  return (
    <div className="w-[78%] rounded-ui bg-canvas p-5 text-bone shadow-subtle">
      <p className="text-[11px] text-mist">Share recap</p>
      <p className="mt-1 text-[20px] leading-tight tracking-[-0.03em]">Halden check-in</p>
      <div className="mt-4 flex items-center gap-2 rounded-ui border border-hairline px-3 py-2 text-[11px] text-ash">
        <Link2 className="size-3.5" /> orra.app/r/halden-0412
      </div>
      <ul className="mt-3 flex flex-col gap-2 text-[12px]">
        <li className="flex items-center justify-between">
          Summary and action items <span className="text-mint">Shared</span>
        </li>
        <li className="flex items-center justify-between">
          Full transcript <span className="text-mist">Team only</span>
        </li>
        <li className="flex items-center justify-between">
          Recording
          <span className="flex items-center gap-1 text-mist">
            <Lock className="size-3" /> Private
          </span>
        </li>
      </ul>
      <span className="mt-4 flex h-9 items-center justify-center rounded-ui bg-snow text-[12px] text-on-snow">Copy link</span>
    </div>
  )
}
