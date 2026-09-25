import { ArrowRight, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/**
 * The reference's primary call to action: a pine pill with a white disc on
 * its left holding the icon. On hover (pointer devices only) the icon swaps to
 * an arrow — a small promise of where the click goes.
 */
export function StartButton({ label, href = "#", className }: { label: string; href?: string; className?: string }) {
  return (
    <Button asChild variant="pill" size="cta" className={cn("group/start gap-2.5 pl-1.5", className)}>
      <a href={href}>
        <span className="relative grid size-7 place-items-center overflow-hidden rounded-full bg-surface text-pine max-md:size-8">
          <Sparkles className="size-3.5 transition-[transform,opacity] duration-200 ease-(--ease-out) [@media(hover:hover)]:group-hover/start:-translate-y-full [@media(hover:hover)]:group-hover/start:opacity-0" />
          <ArrowRight className="absolute size-3.5 translate-y-full opacity-0 transition-[transform,opacity] duration-200 ease-(--ease-out) [@media(hover:hover)]:group-hover/start:translate-y-0 [@media(hover:hover)]:group-hover/start:opacity-100" />
        </span>
        {label}
      </a>
    </Button>
  )
}
