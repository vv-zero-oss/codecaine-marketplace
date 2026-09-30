import { ChevronLeft, ChevronRight, Globe2 } from "lucide-react"

import { AppWindow } from "@/components/mockups/kit"
import { BrandLogo, type Channel } from "@/components/ui/brand-logo"
import { photo, type PhotoKey } from "@/photos"
import { cn } from "@/lib/utils"

const DAYS = ["Mon 5", "Tue 6", "Wed 7", "Thu 8", "Fri 9", "Sat 10", "Sun 11"]
const HOURS = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"]

type Post = { day: number; hour: number; span?: number; title: string; channel: Channel; img?: PhotoKey; tone: string }

const POSTS: Post[] = [
  { day: 0, hour: 0, title: "Monday motivation", channel: "linkedin", tone: "border-periwinkle" },
  { day: 0, hour: 5, title: "Recipe reel", channel: "instagram", img: "vlogKitchen", tone: "border-mint", span: 2 },
  { day: 1, hour: 2, title: "Founder Q&A — 1", channel: "youtube", img: "theo", tone: "border-coral" },
  { day: 1, hour: 5, title: "Autumn drop teaser", channel: "tiktok", img: "street", tone: "border-mint", span: 2 },
  { day: 2, hour: 1, title: "Hiring carousel", channel: "linkedin", tone: "border-periwinkle" },
  { day: 2, hour: 4, title: "Thread: 5 lessons", channel: "x", tone: "border-butter" },
  { day: 3, hour: 3, title: "Trend remix", channel: "tiktok", img: "ringLight", tone: "border-coral", span: 2 },
  { day: 4, hour: 0, title: "Weekly roundup", channel: "threads", tone: "border-butter" },
  { day: 4, hour: 5, title: "Serum explainer", channel: "instagram", img: "serum", tone: "border-mint", span: 2 },
  { day: 5, hour: 1, title: "Weekend recipe pin", channel: "pinterest", img: "poke", tone: "border-mint", span: 2 },
  { day: 6, hour: 4, title: "Trail diary", channel: "youtube", img: "hiker", tone: "border-coral", span: 2 },
]

/** A week of posts across every channel, laid on a time grid. */
export function WeekCalendar({ className }: { className?: string }) {
  return (
    <AppWindow className={cn("text-left", className)}>
      <div className="flex flex-wrap items-center gap-3 border-b border-line px-4 py-3 md:px-5">
        <p className="text-[15px] font-semibold text-ink">October 2026</p>
        <div className="flex border border-line bg-page">
          <span className="grid size-7 place-items-center border-r border-line text-muted"><ChevronLeft className="size-3.5" /></span>
          <span className="grid size-7 place-items-center text-muted"><ChevronRight className="size-3.5" /></span>
        </div>
        <span className="ml-auto hidden items-center gap-1.5 text-[12px] text-muted sm:flex">
          <Globe2 className="size-3.5" /> Lisbon · Austin · Singapore
        </span>
        <div className="flex border border-line bg-page text-[12px] font-medium">
          <span className="px-3 py-1.5 text-muted">Month</span>
          <span className="bg-ink px-3 py-1.5 text-page">Week</span>
        </div>
      </div>
      <div className="overflow-hidden">
        <div className="grid grid-cols-[44px_repeat(3,minmax(0,1fr))] sm:grid-cols-[52px_repeat(5,minmax(0,1fr))] lg:grid-cols-[56px_repeat(7,minmax(0,1fr))]">
          <span className="border-b border-line" />
          {DAYS.map((d, i) => (
            <span
              key={d}
              className={cn(
                "border-b border-l border-line px-2 py-2 text-[11px] font-medium text-ink md:text-[12px]",
                i >= 3 && "hidden sm:block",
                i >= 5 && "sm:hidden lg:block",
                i === 1 && "bg-mint-soft/40",
              )}
            >
              {d}
            </span>
          ))}
          {HOURS.map((h, hi) => (
            <Row key={h} hour={h} hi={hi} />
          ))}
        </div>
      </div>
    </AppWindow>
  )
}

function Row({ hour, hi }: { hour: string; hi: number }) {
  return (
    <>
      <span className="border-b border-line px-1.5 pt-1.5 text-[10px] text-muted tabular-nums">{hour}</span>
      {DAYS.map((d, di) => {
        const post = POSTS.find((p) => p.day === di && p.hour === hi)
        return (
          <div
            key={d}
            className={cn(
              "relative h-14 border-b border-l border-line md:h-16",
              di >= 3 && "hidden sm:block",
              di >= 5 && "sm:hidden lg:block",
              di === 1 && "bg-mint-soft/20",
            )}
          >
            {post && <PostChip post={post} />}
          </div>
        )
      })}
    </>
  )
}

function PostChip({ post }: { post: Post }) {
  return (
    <div
      className={cn(
        "absolute inset-x-1 top-1 z-10 flex cursor-grab flex-col gap-1 overflow-hidden border border-l-[3px] border-line bg-page p-1.5 shadow-hairline transition-[transform,box-shadow] duration-200 ease-out-strong hover:-translate-y-0.5 hover:shadow-float",
        post.tone,
      )}
      style={{ height: `calc(${post.span ?? 1} * 100% - 0.5rem + ${(post.span ?? 1) - 1}px)` }}
    >
      <span className="flex items-center gap-1.5">
        <BrandLogo channel={post.channel} className="size-3 shrink-0" />
        <span className="truncate text-[10.5px] font-medium text-ink md:text-[11px]">{post.title}</span>
      </span>
      {post.img && (post.span ?? 1) > 1 && (
        <img src={photo(post.img, 300)} alt="" loading="lazy" className="min-h-0 w-full flex-1 object-cover" />
      )}
    </div>
  )
}
