import { cn } from "@/lib/utils"
import { OrraMark } from "@/components/ui/wordmark"

const FINISH = {
  void: "bg-void text-bone",
  graphite: "bg-graphite text-bone",
  raised: "bg-raised text-bone",
  glass: "bg-glass text-bone backdrop-blur-md",
  snow: "bg-snow text-on-snow",
} as const

/**
 * A meeting note as a card: a title, a date and a few lines of summary, in one
 * of five finishes — the shape every note takes in Orra's shared memory.
 */
export function NoteCard({
  finish = "graphite",
  title = "Weekly planning",
  date = "Tue · 32 min",
  className,
}: {
  finish?: keyof typeof FINISH
  title?: string
  date?: string
  className?: string
}) {
  return (
    <div
      className={cn(
        "relative flex aspect-[1.4] w-[200px] flex-col overflow-hidden rounded-card p-4 shadow-subtle sm:w-[230px]",
        FINISH[finish],
        className,
      )}
    >
      <span className="flex items-center justify-between text-[10px] opacity-70">
        {date}
        <OrraMark className="size-3.5" />
      </span>
      <span className="mt-2 text-[17px] font-medium tracking-[-0.03em]">{title}</span>
      <span className="mt-auto flex flex-col gap-1.5" aria-hidden>
        <span className="h-1.5 w-[86%] rounded-pill bg-current opacity-25" />
        <span className="h-1.5 w-[70%] rounded-pill bg-current opacity-25" />
        <span className="h-1.5 w-[48%] rounded-pill bg-current opacity-25" />
      </span>
    </div>
  )
}
