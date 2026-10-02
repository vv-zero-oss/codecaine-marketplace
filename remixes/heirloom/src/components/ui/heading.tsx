import { cn } from "@/lib/utils"

/** A heading's words, with one italic serif accent in the middle. Plain text
 *  here; `BlurWords` is the one that animates it. */
export function Accent({ children, className }: { children: string; className?: string }) {
  return <em className={cn("font-serif font-normal tracking-normal italic", className)}>{children}</em>
}
