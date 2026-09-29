import { cn } from "@/lib/utils"

/**
 * The story's voice: two short lines, centred, in the scene size. Every white
 * scene on the page speaks through this, so the page reads as one voice.
 */
export function SceneText({ first, second, className }: { first: string; second?: string; className?: string }) {
  return (
    <p className={cn("text-center text-scene font-medium tracking-scene text-ink text-balance", className)}>
      {first}
      {second && (
        <>
          <br />
          {second}
        </>
      )}
    </p>
  )
}
